const mongoose = require("mongoose");

const schema = mongoose.Schema;

const portfolioSchema = new schema({
  schemeCode: { type: String, required: true },
  transactions: { type: Array, default: [] },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
