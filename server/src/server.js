import express from "express";
import { connectDB } from "./config/db.js";
import watchlistsRoutes from "./routes/watchlistsRoutes.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// middleware- allows us access to the request.body; a function that runs in the middle between the request and the response
app.use(express.json());
app.use(rateLimiter);

app.use("/api/watchlists", watchlistsRoutes);
// app.use("/api/deals", dealsRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started on PORT:", port);
    });
});