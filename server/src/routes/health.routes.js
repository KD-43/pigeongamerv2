import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ ok: true, ts: Date.now() });
});

export default router;