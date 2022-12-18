const express = require("express");
const router = express.Router();
const MutualFund = require("../models/mutualFund.js");

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
  fetch(`https://api.mfapi.in/mf/${req.params.mutualfundcode}`).then(
    (result) => {
      result.json().then((data) => {
        var date = new Date().toLocaleDateString("en-GB");
        date = date.replaceAll("/", "-");
        MutualFund.findOne({
          scheme_code: Number(req.params.mutualfundcode),
        }).then(function (mutualfund) {
          if (mutualfund.fund_latest_date === date) {
          } else {
            let nav = [];
            data.data.map((mf) => {
              if (date >= mf.date) {
                nav.push(mf);
              } else {
                return;
              }
            });
            nav = nav.concat(mutualfund.data);
            var mutual = new MutualFund({
              scheme_name: mutualfund.meta.scheme_name,
              scheme_code: mutualfund.meta.scheme_code,
              scheme_category: mutualfund.meta.scheme_category,
              scheme_type: mutualfund.meta.scheme_type,
              fund_house: mutualfund.meta.fund_house,
              fund_latest_date: nav[0].date,
              nav: nav,
            });
            MutualFund.findByIdAndUpdate(
              { scheme_code: Number(req.params.mutualfundcode) },
              mutual
            ).then(function (data) {
              res.send(data);
            });
          }
        });
      });
    }
  );
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