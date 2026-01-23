import { sanitizeTitle } from "../utils/sanitize.js";
import mongoose from "mongoose";
import Watchlist from "../models/Watchlist.js";
import { getCheapestDealForTitle, getDealById } from "../services/cheapshark.service.js";
import { response } from "express";

const MAX_WATCHLISTS_PER_USER = 10;
const MAX_ITEMS_PER_WATCHLIST = 100;

export const getAllWatchlists = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const lists = await Watchlist.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(lists);
    } catch(err) {
        next(err);
    }
};

export const getSpecificWatchlist = async (req, res, next) => {
    console.log("[getSpecificWatchlist] HIT", req.originalUrl);

    try {
        const userId = req.anonUserId;
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: `Invalid watchlist id ${id}` });
        };

        const list = await Watchlist.findOne({ _id: id, userId });
        if (!list) return res.status(404).json({ message: "Watchlist not found!" });

        const { items } = list;
        if (items.length === 0) {
            return res.status(200).json({
                id: list._id,
                name: list.name,
                items: [],
                updatedAt: list.updatedAt,
            });
        }

        const now = new Date();
        const DB_WRITE_TTL_MS = 60 * 1000;

        const isStale = (d, staleMs) => {
            if (!d) return true;
            const t = new Date(d).getTime();
            return Number.isFinite(t) ? (Date.now() - t > staleMs) : true;
        };

        const resolveCheapest = async (item) => {

            try {
                const cheapest = await getCheapestDealForTitle(item.title, req.signal, { forceRefresh: false });

                if (!cheapest) {
                    return {
                        dealID: null,
                        storeID: null,
                        currentPrice: null,
                        normalPrice: null,
                        redirectUrl: null,
                        source: "service_none",
                        didFetch: false,
                    };
                };

                console.log("[resolveCheapest - Try Block] cheapest: ", cheapest);
                return {
                    dealID: cheapest.dealID ?? null,
                    storeID: cheapest.storeID ?? null,
                    currentPrice: Number.isFinite(cheapest.currentPrice) ? Number(cheapest.currentPrice) : null,
                    normalPrice: Number.isFinite(cheapest.normalPrice) ? Number(cheapest.normalPrice) : null,
                    redirectUrl: cheapest.redirectUrl ?? null,
                    source: "service_cache_or_upstream",
                };
            } catch (err) {
                console.error(`[cheapest] Error for "${item.title}":`, err.message);
                return {
                    dealID: null,
                    storeID: null,
                    currentPrice: null,
                    normalPrice: null,
                    redirectUrl: null,
                    source: "service_error",
                };
            };
        };

        const results = await Promise.all(items.map(resolveCheapest));

        const responseItems = items.map((item, index) => {
            console.log("[responseItems] resultsItem: ", results[index]);
            console.log("[responseItems] mappedItem: ", item);
            const r = results[index] ?? {};
            const currPrice = r.currentPrice ?? null;
            const prevPrice =
                item.lastSeenPrice !== null && item.lastSeenPrice !== undefined
                ? Number(item.lastSeenPrice)
                : null;
            const isCadenceDue = isStale(item.lastSeenAt, DB_WRITE_TTL_MS);
            const hasValidPrice = Number.isFinite(currPrice);
            if (isCadenceDue && hasValidPrice) {
                if (prevPrice === null || currPrice !== prevPrice) {
                    item.lastSeenPrice = currPrice;
                };
                item.lastSeenAt = now;
            }

            let priceChange = "same";
            let delta = 0;

            if (currPrice === null) {
                priceChange = "unknown";
            } else if (prevPrice === null) {
                priceChange = "new";
            } else if (currPrice !== prevPrice) {
                priceChange = currPrice < prevPrice ? "down" : "up";
                delta = currPrice - prevPrice;
            }

            return {
                gameID: item.gameID ?? null,
                title: item.title ?? null,
                dealID: r.dealID ?? null,
                storeID: r.storeID ?? null,
                redirectUrl: r.redirectUrl ?? null,
                retailPrice: r.normalPrice ?? null,
                currentPrice: currPrice ?? null,
                lastSeenPrice: prevPrice ?? null,
                lastSeenAt: item.lastSeenAt ?? null,
                priceChange,
                delta,
                source: r.source ?? "none",
                ui: { priceChanged: priceChange !== "same" && priceChange !== "unknown" },
            };
        });

        await list.save();
        res.status(200).json({
            id: list._id,
            name: list.name,
            items: responseItems,
            updatedAt: now,
        });
    } catch(err) {
        next(err);
    }
};

export const createWatchlist = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const rawName = req.body.name ?? 'My Watchlist';
        const name = sanitizeTitle(rawName);

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const existing = await Watchlist.findOne({
            userId,
            name: name.trim(),
        });
        if (existing) {
            return res.status(400).json({
                error: 'You already have a watchlist with this name',
            });
        };

        const count = await Watchlist.countDocuments({ userId });
        if (count >= MAX_WATCHLISTS_PER_USER) {
            return res.status(400).json({
                error: `Watchlist limit reached (${MAX_WATCHLISTS_PER_USER}).`
            });
        };

        const createList = await Watchlist.create({
            userId,
            name,
            items: [],
        });

        res.status(201).json(createList);
    } catch (err) {
        next(err);
    }
};

export const addItemToWatchlist = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const { id } = req.params;
        const { gameID, title, storeID, dealID, currentPrice} = req.body;

        if (!gameID || !title || storeID === null || !dealID || currentPrice === null) {
            return res.status(400).json({ error: 'gameID, title, storeID, dealID, and currentPrice are required' });
        };

        const list = await Watchlist.findOne({ _id: id, userId });
        if (!list) {
            return res.status(404).json({ error: 'Watchlist could not be found' });
        };

        const listItemLength = list.items.length;
        if (listItemLength >= MAX_ITEMS_PER_WATCHLIST) {
            return res.status(400).json({ error: 'Max items for watchlist reached' });
        };

        const exists = list.items.some((item) => item.gameID === gameID);
        if (exists) {
            return res.status(409).json({ error: 'Item already in watchlist' });
        };

        console.log("[addItemToWatchlistList]:", { gameID, title, });

        list.items.push({
            gameID,
            title: title,
            lastSeenPrice: null,
            lastSeenAt: null,
        });

        const savedList = await list.save();
        res.status(201).json(savedList);
    } catch (err) {
        next(err);
    }
};

export const deleteItemFromWatchlist = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const { id } = req.params;
        const { gameID } = req.body;

        if (!gameID) {
            return res.status(400).json({ error: 'gameID' });
        };

        const updated = await Watchlist.findOneAndUpdate(
            { _id: id, userId },
            { $pull: { items: { gameID } } },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Watchlist could not be found' });
        };

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const updateWatchlist = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const { id }= req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid watchlist id' });
        };
        
        const rawName = req.body.name;
        const name = sanitizeTitle(rawName);
        console.log("[BACKEND]: ", rawName);
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        };

        const exists = await Watchlist.findOne({
            userId,
            name,
            _id: { $ne: id },
        });
        if (exists) {
            return res.status(409).json({ error: 'Cannot have duplicate watchlist names' });
        };

        const updated = await Watchlist.findOneAndUpdate(
            { _id: id, userId },
            { $set: { name: name.trim() } },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Watchlist not found!" });

        res.status(200).json({ message: "Watchlist updated successfully!" });
    } catch (err) {
        next(err);
    }
};

export const deleteWatchlist = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const { id } = req.params;
        console.log('[ SERVER FUNCTION - DELETE WATCHLIST ]', id);
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid watchlist id' });
        };

        const result = await Watchlist.findOneAndDelete({ _id: id, userId });
        if (!result) return res.status(404).json({ message: "Watchlist not found!" });
        
        res.status(200).json({ message: "Watchlist deleted successfully!" });
    } catch (err) {
        next(err);
    }
};

export const getWatchlistsSummary = async (req, res, next) => {
    console.log("[getWatchlistSummary] HIT", req.originalUrl);
    try {
        const userId = req.anonUserId;

        const lists = await Watchlist.find({ userId }).lean();
        if (!lists.length) {
            return res.json([]);
        };

        const titleSet = new Set();
        for (const list of lists) {
            for (const item of list.items || []) {
                if (item.title) titleSet.add(item.title);
            };
        };
        const titles = Array.from(titleSet);

        const dealsArray = await Promise.all(
            titles.map((title) => 
                getCheapestDealForTitle(title, req.signal).catch((err) => {
                    console.error(`Error fetching price for "${title}":`, err.message);
                    return null;
                })
            )
        );

        const priceByTitle = {};
        titles.forEach((title, index) => {
            const deal = dealsArray[index];
            priceByTitle[title] = deal?.currentPrice ?? null;
        });

        const summary = lists.map((list) => {
            const items = list.items || [];
            const itemCount = items.length;
            const droppedItems = [];
            const updatedAt = new Date(list.updatedAt).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            });

            for (const item of items) {
                const last = item.lastSeenPrice;
                const current = priceByTitle[item.title];

                if (
                    last !== null &&
                    current !== null &&
                    current < last
                ) {
                    droppedItems.push({
                        gameID: item.gameID,
                        title: item.title,
                        storeID: item.storeID ?? null,
                        lastSeenPrice: last,
                        currentPrice: current,
                        delta: current - last,
                    });
                }
            }

            const dropCount = droppedItems.length

            return {
                id: list._id,
                name: list.name,
                itemCount,
                dropCount,
                hasDrop: dropCount > 0,
                droppedItems,
                updatedAt,
                items,
            };
        });

        res.status(200).json(summary);
    } catch(err) {
        next(err);
    }
}

export const replaceItemDeal = async (req, res, next) => {
    try {
        const userId = req.anonUserId;
        const { id, gameID } = req.params;
        const { candidate } = req.body;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid watchlist id' });
        };

        if (!gameID) {
            return res.status(400).json({ error: 'gameID' });
        };

        if (!candidate) {
            return res.status(400).json({ error: 'candidate missing' });
        }

        const nextDealID = decodeURIComponent(candidate.dealID);
        const nextStoreID = candidate.storeID ?? null;
        const nextPrice =
        candidate.currentPrice !== null && candidate.currentPrice !== undefined
            ? Number(candidate.currentPrice)
            : null;

        const list = await Watchlist.findOne({ _id: id, userId });
        if (!list) return res.status(404).json({ error: "Watchlist not found" });

        const item = list.items.find((i) => i.gameID === gameID);
        if (!item) return res.status(404).json({ error: "Watchlist item not found" });

        item.dealID = nextDealID;
        item.storeID = nextStoreID;

        item.lastSeenPrice = nextPrice;
        item.lastSeenAt = new Date();

        item.candidateDealID = null;
        item.candidateStoreID = null;
        item.candidatePrice = null;
        item.candidateSeenAt = null;

        await list.save();

        return res.status(200).json({
            gameID: item.gameID,
            title: item.title,
            storeID: item.storeID ?? null,
            dealID: item.dealID ?? null,
            lastSeenPrice: item.lastSeenPrice ?? null,
            lastSeenAt: item.lastSeenAt ?? null,
        });
    } catch (err) {
        next(err);
    }
}