const express = require("express");
const router = express.Router();
const moongoose = require("mongoose");

const MutualFund = require("../models/mutualFund.js");
const MutualFundData = require("../data/mutualfunddatanew");
const AllMutualFunds = require("../models/allMutualFunds.js");

router.get("/ninjas", function (req, res) {
  res.send({ type: "GET" });
});

//get single mutual fund data
router.get("/api/:mutualfundcode", function (req, res) {
  fetch(`https://api.mfapi.in/mf/${req.params.mutualfundcode}`).then(
    (result) => {
      result.json().then((data) => {
        let nav = data.data.map((mf) => {
          return mf;
        });
        var mutual = new MutualFund({
          scheme_name: data.meta.scheme_name,
          scheme_code: data.meta.scheme_code,
          scheme_category: data.meta.scheme_category,
          scheme_type: data.meta.scheme_type,
          fund_house: data.meta.fund_house,
          fund_latest_date: nav[0].date,
          fund_latest_nav: nav[0].nav,
          nav: nav,
        });
        mutual.save().then(function (mutualfund) {
          res.send(mutualfund);
        });
      });
    }
  );
});

//update single mutual fund data
router.get("/api/update/:mutualfundcode", function (req, res) {
  //   var date = MutualFundData.data[0].date;
  //   date = date.replaceAll("/", "-");
  //   MutualFund.findOne({
  //     scheme_code: Number(req.params.mutualfundcode),
  //   }).then(function (mutualfund) {
  //     if (mutualfund.fund_latest_date === date) {
  //     } else {
  //       let nav = [];
  //       MutualFundData.data.map((mf) => {
  //         if (date >= mf.date) {
  //           nav.push(mf);
  //         } else {
  //           return;
  //         }
  //       });
  //       nav = nav.concat(mutualfund.nav);
  //       MutualFund.findByIdAndUpdate(mutualfund._id, {
  //         nav: nav,
  //         fund_latest_date: nav[0].date,
  //       }).then(function (data) {
  //         MutualFund.findOne({
  //           scheme_code: Number(req.params.mutualfundcode),
  //         }).then((data) => {
  //           res.send(data);
  //         });
  //       });
  //     }
  //   });
  fetch(`https://api.mfapi.in/mf/${req.params.mutualfundcode}`).then(
    (result) => {
      result.json().then((data) => {
        var date = new Date().toLocaleDateString("en-GB");
        date = date.replaceAll("/", "-");

        MutualFund.findOne({
          scheme_code: Number(req.params.mutualfundcode),
        }).then(function (mutualfund) {
          if (mutualfund.fund_latest_date != date) {
            let nav = [];
            MutualFundData.data.map((mf) => {
              if (date >= mf.date) {
                nav.push(mf);
              } else {
                return;
              }
            });
            nav = nav.concat(mutualfund.nav);
            MutualFund.findByIdAndUpdate(mutualfund._id, {
              nav: nav,
              fund_latest_date: nav[0].date,
            }).then(function (data) {
              console.log(data);
              MutualFund.findOne({
                scheme_code: Number(req.params.mutualfundcode),
              }).then((data) => {
                res.send(data);
              });
            });
          }
        });
      });
    }
  );
});

//get all mutual funds key value pairs
router.get("/api/get/allmutualfunds", function (req, res) {
  fetch("https://api.mfapi.in/mf").then((result) => {
    result.json().then((data) => {
      let nav = [];
      data.map((mf) => {
        nav.push(mf);
      });
      var allmutualfunds = new AllMutualFunds({
        all_mutual_funds: nav,
      });

      allmutualfunds.save().then(function (mutualfund) {
        res.send(mutualfund);
      });
    });
  });
});

router.post("/ninjas", function (req, res) {
  res.send({ type: " POST" });
});

router.put("/ninjas/:id", function (req, res) {
  res.send({ type: GET });
});

router.delete("/ninjas/:id", function (req, res) {
  res.send({ type: "DELETE" });
});

module.exports = router;

// {
//     "meta": {
//         "fund_house": "Tata Mutual Fund",
//         "scheme_type": "Open Ended Schemes",
//         "scheme_category": "Income",
//         "scheme_code": 100416,
//         "scheme_name": "Tata Long Term Debt Fund - Regular Plan - Quarterly Dividend"
//     },
//     "data": [
//         {
//             "date": "27-10-2017",
//             "nav": "11.66090"
//         },
//         {
//             "date": "26-10-2017",
//             "nav": "11.66590"
//         },

//     ],
// }
