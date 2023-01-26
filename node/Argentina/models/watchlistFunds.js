const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const WatchlistFundsSchema = new Schema({
  userId: "",
  watchlistFunds: [],
});

//creating model
const watchlistFunds = mongoose.model("watchlistfunds", WatchlistFundsSchema);

module.exports = watchlistFunds;
