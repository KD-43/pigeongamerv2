import express from "express";
import { requireAnonUser } from "../middleware/anonUser.js";
import { getAllWatchlists, getSpecificWatchlist, createWatchlist, addItemToWatchlist, deleteItemFromWatchlist, updateWatchlist, deleteWatchlist, getWatchlistsSummary, replaceItemDeal } from "../controllers/watchlists.controller.js";

const router = express.Router();

router.use(requireAnonUser);

router.get("/", getAllWatchlists);
router.get("/summary", getWatchlistsSummary);
router.get("/:id", getSpecificWatchlist);
router.post("/", createWatchlist);
router.post("/:id/items", addItemToWatchlist);
router.delete("/:id/items", deleteItemFromWatchlist);
router.patch("/:id", updateWatchlist);
router.delete("/:id", deleteWatchlist);
router.patch("/:id/items/:gameID", replaceItemDeal);

export default router;