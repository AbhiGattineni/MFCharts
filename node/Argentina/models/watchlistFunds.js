const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const WatchlistFundsSchema = new Schema({
  user_id: "",
  wlfunds: {},
});

//creating model
const watchlistFunds = mongoose.model("watchlistfunds", WatchlistFundsSchema);

module.exports = watchlistFunds;
