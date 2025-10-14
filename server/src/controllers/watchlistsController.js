import Watchlist from "../models/Watchlist.js";

export const getAllWatchlists = async (req, res) => {
    try {
        const watchlist = await Watchlist.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(watchlist);
    } catch(err) {
        console.error("Error in getAllWatchlists controller", err);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const getSpecificWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        if (!watchlist) return res.status(404).json({ message: "Watchlist not found!" });
        res.status(200).json(watchlist);
    } catch(err) {
        console.error("Error in getSpecificWatchlist controller", err);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const createWatchlist = async (req, res) => {
    try {
        const { title, content } = req.body;
        const watchlist = new Watchlist({ title, content });

        const savedWatchlist = await watchlist.save();
        res.status(201).json(savedWatchlist);
    } catch (err) {
        console.error("Error in createWatchlist controller", err);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const updateWatchlist = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedWatchlist = await Watchlist.findByIdAndUpdate(req.params.id, { title, content });
        if (!updatedWatchlist) return res.status(404).json({ message: "Watchlist not found!" });
        res.status(200).json({ message: "Watchlist updated successfully!" });
    } catch (err) {
        console.error("Error in updateWatchlist controller", err);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const deleteWatchlist = async (req, res) => {
    try {
        const deletedWatchlist = await Watchlist.findByIdAndDelete(req.params.id);
        if (!deletedWatchlist) return res.status(404).json({ message: "Watchlist not found!" });
        res.status(200).json({ message: "Watchlist deleted successfully!" });
    } catch (err) {
        console.error("Error in deleteWatchlist controller", err);
        res.status(500).json({ message: "Internal server error"});
    }
};