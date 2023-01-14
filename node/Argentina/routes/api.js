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

//get mutual fund meta data based on mutual fund selection
router.get("/mutualfund/:id/metadata", function (req, res) {
  MutualFund.findOne({ scheme_code: req.params.id })
    .then(function (mf) {
      let mutual = {
        scheme_name: mf.scheme_name,
        scheme_code: mf.scheme_code,
        scheme_category: mf.scheme_category,
        scheme_type: mf.scheme_type,
        fund_house: mf.fund_house,
      };
      res.send(mutual);
    })
    .catch((error) => {
      res.send("no data available on selected search 3" + error);
    });
});

//get mutual fund navdata based on dropdown selection and dates
router.get("/mutualfund/:id/navdata", function (req, res) {
  let start_date = req.query.end || null;
  let end_date = req.query.start || null;
  let obj = {};

  function reverseDate(date) {
    return new Date(date);
  }

  if (start_date != null) start_date = reverseDate(start_date);
  if (end_date != null) end_date = reverseDate(end_date);

  MutualFund.findOne({ scheme_code: req.params.id }).then(function (mf) {
    mf.nav.map((m, index) => {
      const [day, month, year] = m.date.split("-");
      date = new Date(+year, +month - 1, +day);

      //start and end dates are null
      if ((start_date == null) & (end_date == null)) {
        obj[m.date] = parseFloat(m.nav);
      }
      //start and end dates are given
      if ((date <= start_date) & (date >= end_date)) {
        obj[m.date] = parseFloat(m.nav);
      }
      //only when start date is given
      if ((date <= start_date) & (end_date == null)) {
        obj[m.date] = parseFloat(m.nav);
      }
      //only when end date is given
      if ((start_date == null) & (date >= end_date)) {
        obj[m.date] = parseFloat(m.nav);
      }
    });
    let invert_obj = {};
    reverse_obj = Object.keys(obj).reverse();
    reverse_obj.forEach(function (x) {
      invert_obj[x] = obj[x];
    });
    res.send(invert_obj);
  });
});

//get single mutual fund data from DB
router.get("/mutualfund/:id", function (req, res) {
  MutualFund.findOne({
    scheme_code: req.params.id,
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
      res.send("no data available on selected search 3" + error);
    });
});

//get single mutual fund nav data from DB based on selection in dropdown
// router.get("/mutualfund/nav/:id", function (req, res, next) {
//   console.log(req.params.id);
//   MutualFund.findOne({
//     scheme_code: Number(req.params.id),
//   })
//     .then(function (mutualfund) {
//       let navdata = [];
//       mutualfund.nav.map((nav) => {
//         navdata.push(Number(nav.nav));
//       });
//       navdata = navdata.reverse();
//       res.send(navdata);
//     })
//     .catch((error) => {
//       res.send("no data available on selected search ok" + req.params.id);
//     });
// });

// //get single mutual fund nav data dates from DB based on selection in dropdown
// router.get("/mutualfund/date/:id", function (req, res, next) {
//   MutualFund.findOne({
//     scheme_code: Number(req.params.id),
//     scheme_name: req.query.name,
//   })
//     .then(function (mutualfund) {
//       let navdate = [];
//       mutualfund.nav.map((nav) => {
//         navdate.push(nav.date);
//       });
//       navdate = navdate.reverse();
//       res.send(navdate);
//     })
//     .catch((error) => {
//       res.send("no data available on selected search 1" + error);
//     });
// });

// //get single mutual fund nav data from DB for MyCharts Component
// router.get("/mutualfund/navdata/:id", function (req, res, next) {
//   console.log(req.params.id);
//   MutualFund.findOne({
//     scheme_code: Number(req.params.id),
//   })
//     .then(function (mutualfund) {
//       let navdata = [];
//       mutualfund.nav.map((nav) => {
//         navdata.push(Number(nav.nav));
//       });
//       navdata = navdata.reverse();
//       res.send(navdata);
//     })
//     .catch((error) => {
//       res.send("no data available on selected search 2" + error);
//     });
// });

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
