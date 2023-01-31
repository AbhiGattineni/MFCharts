const express = require("express");
const router = express.Router();
const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const Portfolio = require("../models/portfolio");

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

//post the transaction data to DB
router.post("/transaction", function (req, res) {
  User.findOne({ userId: req.body.userId }).then((userData) => {
    if (userData.portfolios.length) {
      userData.portfolios.map((portfolio) => {
        Portfolio.findOne({ _id: portfolio }).then((portfolioData) => {
          let updateTransactions = portfolioData.transactions;
          let pdata = {
            date: req.body.date,
            quantity: req.body.quantity,
            navValue: req.body.navValue,
            transactionValue: req.body.transactionValue,
            transactionType: req.body.transactionType,
          };

          updateTransactions.push(pdata);

          Portfolio.updateOne(
            { _id: portfolio },
            { $set: { transactions: updateTransactions } }
          )
            .then((data) => {
              res.send(data);
            })
            .catch((error) => console.log(error));
        });
      });
    } else {
      let pdata = {
        date: req.body.date,
        quantity: req.body.quantity,
        navValue: req.body.navValue,
        transactionValue: req.body.transactionValue,
        transactionType: req.body.transactionType,
      };
      var portfolio = new Portfolio({
        schemeCode: req.body.schemeCode,
        transactions: [pdata],
      });

      portfolio.save().then((p) => {
        User.findOne({ userId: req.body.userId }).then((data) => {
          let portfolioIds = data.portfolios;
          portfolioIds.push(p._id.toString());

          User.updateOne(
            { userId: req.body.userId },
            { $set: { portfolios: portfolioIds } }
          )
            .then((data) => res.send(data))
            .catch((error) => console.log(error));
        });
      });
    }
  });
});

module.exports = router;
