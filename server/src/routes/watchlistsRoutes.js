import express from "express";
import { getAllWatchlists, getSpecificWatchlist, createWatchlist, updateWatchlist, deleteWatchlist } from "../controllers/watchlistsController.js";

const router = express.Router();

router.get("/", getAllWatchlists);
router.get("/:id", getSpecificWatchlist);
router.post("/", createWatchlist);
router.put("/:id", updateWatchlist);
router.delete("/:id", deleteWatchlist);

export default router;