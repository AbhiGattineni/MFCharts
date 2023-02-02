const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating Mutual Fund Meta schema & model
const MutualFundMetaData = new Schema({
  scheme_name: {
    type: String,
  },
  scheme_code: {
    type: Number,
  },
  scheme_category: {
    type: String,
  },
  scheme_type: {
    type: String,
  },
  fund_house: {
    type: String,
  },
  // mutual_fund_lastest_date: {
  //   type: Date,
  // },
});

//creating mutual fund nav data
const MutualFundNavData = new Schema({
  date: {
    type: Date,
  },
  nav: {
    type: Number,
  },
});

//creating mutual fund schema & model
const MutualFundSchema = new Schema({
  scheme_name: String,
  scheme_code: Number,
  scheme_category: String,
  scheme_type: String,
  fund_house: String,
  fund_latest_date: String,
  fund_latest_nav: Number,
  nav: [],
});

//creating model
const MutualFund = mongoose.model("mutualfund", MutualFundSchema);

module.exports = MutualFund;
