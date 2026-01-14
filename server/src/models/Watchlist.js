import mongoose from "mongoose";
const { Schema } = mongoose;

const watchlistItemSchema = new Schema({
    gameID: { type: String, required: true },
    title: { type: String, required: true },
    storeID: { type: String, default: null },
    dealID: { type: String, default: null },

    lastSeenPrice: { type: Number, default: null },
    lastSeenAt: { type: Date, default: null },
}, { _id: false });

const watchlistSchema = new Schema({
    userId: { type: String, required: true, index: true },
    name: { type: String, default: 'My Watchlist' },
    items: [watchlistItemSchema],
}, { timestamps: true });

watchlistSchema.index({ userId: 1, name: 1 }, { unique: true });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;