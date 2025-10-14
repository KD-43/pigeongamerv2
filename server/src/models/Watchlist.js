import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    title: {
        type:String,
        require: true
    },
    content: {
        type: Array,
        require: true
    },
}, {timestamps: true });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;