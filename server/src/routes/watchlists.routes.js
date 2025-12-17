import express from "express";
import { requireAnonUser } from "../middleware/anonUser.js";
import { getAllWatchlists, getSpecificWatchlist, createWatchlist, addItemToWatchlist, deleteItemFromWatchlist, updateWatchlist, deleteWatchlist, getWatchlistsSummary } from "../controllers/watchlists.controller.js";

const router = express.Router();

router.use(requireAnonUser);

router.get("/", getAllWatchlists);
router.get("/summary", getWatchlistsSummary);
router.get("/:id", getSpecificWatchlist);
router.post("/", createWatchlist);
router.post("/:id/items", addItemToWatchlist);
router.delete("/:id/items", deleteItemFromWatchlist);
router.put("/:id", updateWatchlist);
router.delete("/:id", deleteWatchlist);

export default router;