const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating scheme name and code schema
const AllMutualFundsSchema = new Schema({
  all_mutual_funds: [],
});

//creating model
const AllMutualFunds = mongoose.model("allmutualfund", AllMutualFundsSchema);

module.exports = AllMutualFunds;
