const express = require("express");
const router = express.Router();
const MutualFund = require("../models/mutualFund");

//get all mutual funds data from DB
router.get("/mutualfunds", function (req, res) {
  MutualFund.find({}).then(function (mutualfunds) {
    res.send(mutualfunds);
  });
});

//get single mutual fund data from DB
// router.get("/mutualfund/:id", function (req, res) {
//   MutualFund.findOne({
//     scheme_code: Number(req.params.id),
//   }).then(function (mutualfund) {
//     res.send(mutualfund);
//   });
// });

//get date by date single mutual fund data from DB
router.get("/mutualfund/:id", function (req, res, next) {
  //finding the mutual fund data based on the id
  MutualFund.findOne({
    scheme_code: Number(req.params.id),
  }).then(function (mutualfund) {
    let nav = [];
    let startreq = req.query.start;
    let endreq = req.query.end;
    const [startday, startmonth, startyear] = startreq.split("-");
    const start = new Date(+startyear, +startmonth - 1, +startday);

    const [endday, endmonth, endyear] = endreq.split("-");
    const end = new Date(+endyear, +endmonth - 1, +endday);

    mutualfund.nav.map((data) => {
      let date = data.date;
      const [day, month, year] = date.split("-");
      const datadate = new Date(+year, +month - 1, +day);
      if (datadate <= start && datadate >= end) {
        nav.push(data);
      }
    });
    var mutual = {
      scheme_name: mutualfund.scheme_name,
      scheme_code: mutualfund.scheme_code,
      scheme_category: mutualfund.scheme_category,
      scheme_type: mutualfund.scheme_type,
      fund_house: mutualfund.fund_house,
      nav: nav,
    };
    res.send(mutual);
  });
});

module.exports = router;
