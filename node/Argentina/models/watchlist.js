const mongoose = require("mongoose");

const schema = mongoose.Schema;

const watchlistSchema = new schema({
  watchlistName: { type: String, required: true },
  watchlistFunds: { type: Object, default: {} },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
