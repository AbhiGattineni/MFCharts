const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const PortfolioFundsSchema = new Schema({
  portfolio_funds: [],
});

//creating model
const PortfolioFunds = mongoose.model("portfoliofunds", portfolio_funds);

module.exports = PortfolioFunds;
