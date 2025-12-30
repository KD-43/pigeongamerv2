import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";
import watchlistsRoutes from "./routes/watchlists.routes.js";
import dealsRoutes from "./routes/deals.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const origin = process.env.ORIGIN;

app.use(express.json());
app.use(
    cors({
        origin: origin,
    })
);
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log("[REQ]", req.method, req.originalUrl);
  next();
});

app.use("/api/watchlists", watchlistsRoutes);
app.use("/api/deals", dealsRoutes);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started on PORT:", port);
    });
}).catch((err) => {
    console.error("Failed to connect to DB", err);
});