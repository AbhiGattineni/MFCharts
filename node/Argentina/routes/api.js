const express = require("express");
const router = express.Router();
const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");

//get all mutual funds from DB which is stored only with nav data
router.get("/mutualfunds", function (req, res) {
  MutualFund.find({}).then(function (mutualfunds) {
    res.send(mutualfunds);
  });
});

//get all mutual funds from DB which is stored with scheme name and scheme code
router.get("/allmutualfunds", function (req, res) {
  AllMutualFunds.find({}).then(function (mutualfunds) {
    res.send(mutualfunds);
  });
});

//get single mutual fund data from DB
router.get("/mutualfund/:name", function (req, res) {
  MutualFund.findOne({
    scheme_name: req.params.name,
  })
    .then(function (mutualfund) {
      res.send(mutualfund);
    })
    .catch((error) => {
      res.send("no data available on selected search" + error);
    });
});

//get single mutual fund nav data from DB based on selection in dropdown
router.get("/mutualfund/nav/:id", function (req, res, next) {
  MutualFund.findOne({
    scheme_code: Number(req.params.id),
    scheme_name: req.query.name,
  })
    .then(function (mutualfund) {
      let navdata = [];
      mutualfund.nav.map((nav) => {
        navdata.push(Number(nav.nav));
      });
      navdata = navdata.reverse();
      res.send(navdata);
    })
    .catch((error) => {
      res.send("no data available on selected search" + error);
    });
});

//get single mutual fund nav data dates from DB based on selection in dropdown
router.get("/mutualfund/date/:id", function (req, res, next) {
  MutualFund.findOne({
    scheme_code: Number(req.params.id),
    scheme_name: req.query.name,
  })
    .then(function (mutualfund) {
      let navdate = [];
      mutualfund.nav.map((nav) => {
        navdate.push(nav.date);
      });
      navdate = navdate.reverse();
      res.send(navdate);
    })
    .catch((error) => {
      res.send("no data available on selected search" + error);
    });
});

// //get single mutual fund nav data from DB based on given start and end date
// router.get("/mutualfund/:id", function (req, res, next) {
//   //finding the mutual fund data based on the id
//   MutualFund.findOne({
//     scheme_code: Number(req.params.id),
//   }).then(function (mutualfund) {
//     let nav = [];
//     let startreq = req.query.start;
//     let endreq = req.query.end;
//     const [startday, startmonth, startyear] = startreq.split("-");
//     const start = new Date(+startyear, +startmonth - 1, +startday);

//     const [endday, endmonth, endyear] = endreq.split("-");
//     const end = new Date(+endyear, +endmonth - 1, +endday);

//     mutualfund.nav.map((data) => {
//       let date = data.date;
//       const [day, month, year] = date.split("-");
//       const datadate = new Date(+year, +month - 1, +day);
//       if (datadate <= start && datadate >= end) {
//         nav.push(data);
//       }
//     });
//     var mutual = {
//       scheme_name: mutualfund.scheme_name,
//       scheme_code: mutualfund.scheme_code,
//       scheme_category: mutualfund.scheme_category,
//       scheme_type: mutualfund.scheme_type,
//       fund_house: mutualfund.fund_house,
//       nav: nav,
//     };
//     res.send(mutual);
//   });
// });

module.exports = router;
