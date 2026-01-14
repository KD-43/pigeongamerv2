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

        const CANDIDATE_STALE_MS = 1 * 60 * 1000;

        const isStale = (d, staleMs) => {
            // console.log('[isStale] d:', d);
            if (!d) return true;
            const t = new Date(d).getTime();
            return Number.isFinite(t) ? (Date.now() - t > staleMs) : true;
        }

        const resolveCandidate = async (item) => {
            console.log("[resolveCandidate] ENTER", {
                title: item.title,
                candidateSeenAt: item.candidateSeenAt,
                candidateDealID: item.candidateDealID,
            });

            const forceRefresh = isStale(item.candidateSeenAt, CANDIDATE_STALE_MS);

            console.log("[resolveCandidate] STALE CHECK", {
                title: item.title,
                forceRefresh,
                ageMs: item.candidateSeenAt
                ? Date.now() - new Date(item.candidateSeenAt).getTime()
                : null,
            });

            if (!forceRefresh) {
                console.log("[resolveCandidate] USING CACHE / SKIP FETCH", {
                    title: item.title,
                    candidateDealID: item.candidateDealID,
                });

                if (!item.candidateDealID) return null;
                return {
                    dealID: item.candidateDealID ?? null,
                    storeID: item.candidateStoreID ?? null,
                    currentPrice:
                        item.candidatePrice !== null && item.candidatePrice !== undefined
                        ? Number(item.candidatePrice)
                        : null,
                    source: "candidate_cache",
                    didFetch: false,
                    forceRefresh: false,
                };
            };

            console.log("[resolveCandidate] FORCE REFRESH → FETCH", {
                title: item.title,
            });

            try {
                const cheapest = await getCheapestDealForTitle(item.title, req.signal, { forceRefresh });

                console.log("[resolveCandidate] FETCH RESULT", {
                    title: item.title,
                    cheapest,
                });

                if (!cheapest) {
                    console.log("[resolveCandidate] NO DEAL FOUND", { title: item.title });
                    return { 
                        dealID: null, 
                        storeID: null, 
                        currentPrice: null, 
                        source: "candidate_none",
                        forceRefresh: true,
                        didFetch: true,
                    };
                };

                return {
                    dealID: cheapest.dealID ?? null,
                    storeID: cheapest.storeID ?? null,
                    currentPrice: 
                        cheapest.currentPrice !== null && cheapest.currentPrice !== undefined 
                        ? Number(cheapest.currentPrice) 
                        : null,
                    source: "candidate_refresh",
                    didFetch: true,
                }
            } catch (err) {
                console.error(`[candidate] Error fetching cheapest deal for item title "${item.title}": `, err.message);
                return null;
            }
        }

        console.log("[getSpecificWatchlist] items length", items.length);

        const candidateResults = await Promise.all(items.map(resolveCandidate));

        // console.log('candidateResults: ', candidateResults);

        const responseItems = items.map((item, index) => {
            const candidate = candidateResults[index];

            const candidatePrice = candidate?.currentPrice ?? null;
            const lastSeenPrice = 
                item.lastSeenPrice !== null && item.lastSeenPrice !== undefined ? 
                Number(item.lastSeenPrice) 
                : null;

            let priceChange = 'same';
            let delta = 0;

            if (!item.dealID) {
                priceChange = "untracked";
            } else if (candidatePrice === null) {
                priceChange = "unknown";
            } else if (lastSeenPrice === null) {
                priceChange = "new";
            } else if (candidatePrice !== lastSeenPrice) {
                priceChange = candidatePrice < lastSeenPrice ? "down" : "up";
                delta = candidatePrice - lastSeenPrice;
            }

            if (candidatePrice !== null) {
                item.lastSeenPrice = candidatePrice;
                item.lastSeenAt = now;
            };

            const hasCandidatePriceChange = priceChange === "up" || priceChange === "down" || priceChange === "new";
            const shouldShowPriceChange = hasCandidatePriceChange;

            return {
                gameID: item.gameID,
                title: item.title,
                storeID: item.storeID ?? null,
                dealID: item.dealID ?? null,
                lastSeenPrice,
                retailPrice: candidate.retailPrice,
                currentPrice: candidatePrice,
                priceChange,
                delta,
                
                ui: {
                    priceChanged: shouldShowPriceChange,
                }
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

        list.items.push({
            gameID,
            title,
            currentPrice: currentPrice,
            dealID: dealID ?? null,
            storeID: storeID || null,
            lastSeenPrice: null,
            lastSeenAt: null,
            candidateDealID: null,
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