import mongoose from "mongoose";

const schema = mongoose.Schema;

const watchlistSchema = new schema({
  watchlistName: { type: String, required: true },
  watchlistFunds: { type: Array, default: [] },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
