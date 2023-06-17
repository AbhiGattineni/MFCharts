const mongoose = require("mongoose");

const schema = mongoose.Schema;

const portfolioSchema = new schema({
  schemeCode: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  holdingValue: { type: Number, default: 0 },
  averageFundValue: { type: Number, default: 0 },
  marketValue: { type: Number, default: 0 },
  totalProfitAndLoss: { type: Number, default: 0 },
  transactions: { type: Array, default: [] },
  timeline: { type: Array, default: [] },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
