const express = require("express");
const router = express.Router();
const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");

//get all mutual funds from DB which is stored only with nav data
router.get("/mutualfunds", function (req, res) {
  MutualFund.find({}).then(function (mutualfunds) {
    res.send(mutualfunds);
  });
});

//post the user data
router.post("/adduser", function (req, res) {
  //checking whether user exists or not
  User.findOne({ userId: req.body.userId }).then(function (data) {
    if (!data) {
      //creating User if user does not exists.
      var userDetails = new User({
        userId: req.body.userId,
        watchlists: [],
        portfolios: [],
      });

      userDetails.save().then(function (user) {
        res.send(user);
      });
    }
  });
});

//get the watchlist navdata requested by user
router.get("/wlnavdata/:id", function (req, res) {
  Watchlist.findById(req.params.id).then(function (data) {
    res.send(data.watchlistFunds);
  });
});

//get all the watchlists of specific users
router.post("/watchlists", function (req, res) {
  User.findOne({ userId: req.body.userId }).then(function (data) {
    // console.log(data);
    let wlNames = [];
    if (data.watchlists.length) {
      Watchlist.find()
        .where("_id")
        .in(data.watchlists)
        .exec((err, records) => {
          records.map((data) => {
            // wlNames.push(data.watchlistName);
            wlNames.push({ value: data._id, label: data.watchlistName });
          });
          res.send(wlNames);
        });
    } else {
      res.send(wlNames);
    }
  });
});

//post the watchlist into user watchlists
router.post("/addwatchlist", function (req, res) {
  let wlfunds = {};

  Object.keys(req.body.navData).map((value) => {
    wlfunds[value] = req.body.navData[value];
  });

  //adding watchlist to user watchlists, if not data available in array

  var watchlist = new Watchlist({
    watchlistName: req.body.watchlist_name,
    watchlistFunds: wlfunds,
  });

  watchlist.save().then(function (wl) {
    User.findOne({ userId: req.body.userId }).then((data) => {
      let watchlistsIds = data.watchlists;
      watchlistsIds.push(wl._id.toString());

      User.updateOne(
        { userId: req.body.userId },
        { $set: { watchlists: watchlistsIds } }
      )
        .then((data) => res.send(data))
        .catch((error) => console.log(error));
    });
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

//get single nav value based on date
router.get("/mutualfund/:id/navdata/:date", function (req, res) {
  let reqDate = req.params.date || null;

  function reverseDate(date) {
    return new Date(date);
  }

  if (reqDate != null) reqDate = reverseDate(req.params.date);
  reqDate = reqDate.setUTCHours(0, 0, 0, 0);
  MutualFund.findOne({ scheme_code: req.params.id }).then(function (mf) {
    mf.nav.map((m) => {
      const [day, month, year] = m.date.split("-");
      date = new Date(+year, +month - 1, +day);
      date = date.setUTCHours(0, 0, 0, 0);

      //start and end dates are equal
      if (reqDate == date) {
        res.send(m.nav);
      }
    });
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
  start_date = start_date.setUTCHours(0, 0, 0, 0);
  end_date = end_date.setUTCHours(0, 0, 0, 0);
  MutualFund.findOne({ scheme_code: req.params.id }).then(function (mf) {
    mf.nav.map((m, index) => {
      const [day, month, year] = m.date.split("-");
      date = new Date(+year, +month - 1, +day);
      date = date.setUTCHours(0, 0, 0, 0);

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
      //only when end date is given
      if ((start_date == date) & (date == end_date)) {
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
