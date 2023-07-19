const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const Portfolio = require("../models/portfolio");

router.use(express.json());

//get all mutual funds from DB which is stored only with nav data
router.get("/mutualfunds", function (req, res) {
  MutualFund.find({}).then(function (mutualfunds) {
    res.send(mutualfunds);
  });
});

// POST request to add a new user and fetch the user's details
router.post("/adduser", async (req, res) => {
  const { userId, firstName, lastName, email, phoneNumber, profilePic } =
    req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ userId });

    // If user does not exist, create a new user
    if (!user) {
      const userDetails = new User({
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        profilePic,
        watchlists: [],
        portfolios: [],
      });

      user = await userDetails.save();
    }

    // Return the saved user details
    res.json({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
      watchlists: user.watchlists,
      portfolios: user.portfolios,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

//get the watchlist navdata requested by user
router.get("/wlnavdata/:id", function (req, res) {
  Watchlist.findById(req.params.id).then(function (data) {
    res.send(data.watchlistFunds);
  });
});

//get all the watchlists of specific user
router.get("/watchlists/:userId", async function (req, res) {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    let wlNames = [];

    if (user) {
      if (user.watchlists.length) {
        const records = await Watchlist.find()
          .where("_id")
          .in(user.watchlists)
          .exec();

        wlNames = records.map((record) => ({
          value: record._id,
          label: record.watchlistName,
        }));
      }
    }

    res.send(wlNames);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
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
  fetch(`https://api.mfapi.in/mf/${req.params.id}`)
    .then((response) => response.json())
    .then((response) => {
      let mutual = {
        scheme_name: response.meta.scheme_name,
        scheme_code: response.meta.scheme_code,
        scheme_category: response.meta.scheme_category,
        scheme_type: response.meta.scheme_type,
        fund_house: response.meta.fund_house,
      };
      res.send(mutual);
    })
    .catch((error) => {
      res.status(500).send("No data available on selected search: " + error);
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

// //get mutual fund navdata based on dropdown selection and dates
// router.get("/mutualfund/:id/navdata", function (req, res) {
//   let start_date = req.query.end || null;
//   let end_date = req.query.start || null;
//   let obj = {};

//   function reverseDate(date) {
//     return new Date(date);
//   }

//   if (start_date != null) {
//     start_date = reverseDate(start_date);
//     start_date = start_date.setUTCHours(0, 0, 0, 0);
//   }
//   if (end_date != null) {
//     end_date = reverseDate(end_date);
//     end_date = end_date.setUTCHours(0, 0, 0, 0);
//   }

//   MutualFund.findOne({ scheme_code: req.params.id }).then(function (mf) {
//     if (mf) {
//       mf.nav.map((m, index) => {
//         const [day, month, year] = m.date.split("-");
//         date = new Date(+year, +month - 1, +day);
//         date = date.setUTCHours(0, 0, 0, 0);

//         //start and end dates are null
//         if ((start_date == null) & (end_date == null)) {
//           obj[m.date] = parseFloat(m.nav);
//         }
//         //start and end dates are given
//         if ((date <= start_date) & (date >= end_date)) {
//           obj[m.date] = parseFloat(m.nav);
//         }
//         //only when start date is given
//         if ((date <= start_date) & (end_date == null)) {
//           obj[m.date] = parseFloat(m.nav);
//         }
//         //only when end date is given
//         if ((start_date == null) & (date >= end_date)) {
//           obj[m.date] = parseFloat(m.nav);
//         }
//         //only when end date is given
//         if ((start_date == date) & (date == end_date)) {
//           obj[m.date] = parseFloat(m.nav);
//         }
//       });
//       let invert_obj = {};
//       reverse_obj = Object.keys(obj).reverse();
//       reverse_obj.forEach(function (x) {
//         invert_obj[x] = obj[x];
//       });
//       res.send(invert_obj);
//     } else {
//       res.send({});
//     }
//   });
// });

//get mutual fund navdata based on dropdown selection and dates
router.get("/mutualfund/:id/navdata", function (req, res) {
  let start_date = req.query.start || null;
  let end_date = req.query.end || null;
  let obj = {};

  function reverseDate(date) {
    return new Date(date);
  }

  if (start_date != null) {
    start_date = reverseDate(start_date);
    start_date = start_date.setUTCHours(0, 0, 0, 0);
  }
  if (end_date != null) {
    end_date = reverseDate(end_date);
    end_date = end_date.setUTCHours(23, 59, 59, 999); //Set to end of day
  }

  fetch(`https://api.mfapi.in/mf/${req.params.id}`)
    .then((response) => response.json())
    .then((mf) => {
      if (mf.status != "FAIL") {
        mf.data.map((m) => {
          const date = new Date(m.date);
          date.setUTCHours(0, 0, 0, 0);

          if (start_date == null && end_date == null) {
            obj[m.date] = parseFloat(m.nav);
          } else if (
            start_date != null &&
            date >= start_date &&
            end_date == null
          ) {
            obj[m.date] = parseFloat(m.nav);
          } else if (
            end_date != null &&
            date <= end_date &&
            start_date == null
          ) {
            obj[m.date] = parseFloat(m.nav);
          } else if (
            start_date != null &&
            end_date != null &&
            date >= start_date &&
            date <= end_date
          ) {
            obj[m.date] = parseFloat(m.nav);
          }
        });

        let invert_obj = {};
        let reverse_obj = Object.keys(obj).reverse();
        reverse_obj.forEach(function (x) {
          invert_obj[x] = obj[x];
        });
        res.send(invert_obj);
      } else {
        res.send({});
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving mutual fund data");
    });
});

// router.get("/mutualfund/:id/navdata", async function (req, res) {
//   const response = await fetch(`https://api.mfapi.in/mf/${req.params.id}`);
//   const jsonData = await response.json();
//   console.log(jsonData);
//   res.send(jsonData);
// });

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

router.get("/userPortfolio/:id", async function (req, res) {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const portfolioFunds = {};
    const portfolioIds = user.portfolios;

    if (portfolioIds.length) {
      const portfolios = await Portfolio.find({
        _id: { $in: portfolioIds.map((id) => mongoose.Types.ObjectId(id)) },
      });

      for (const portfolio of portfolios) {
        const response = await fetch(
          `https://api.mfapi.in/mf/${portfolio.schemeCode}`
        );

        if (!response.ok) {
          console.log(
            `Failed to fetch data for scheme code: ${portfolio.schemeCode}`
          );
          continue;
        }

        const jsonData = await response.json();
        const fundData = {
          schemeCode: jsonData.meta.scheme_code,
          schemeName: jsonData.meta.scheme_name,
          quantity: portfolio.quantity,
          holdingValue: portfolio.holdingValue,
          averageValue: portfolio.averageFundValue,
          marketValue: portfolio.marketValue,
          tProfitLoss: portfolio.totalProfitAndLoss,
          transactions: portfolio.transactions,
        };
        portfolioFunds[portfolio.schemeCode] = fundData;
      }
    }

    res.send(portfolioFunds);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

//fetch only portfolio data with id and label
router.get("/userPortfolioData/:id", async function (req, res) {
  var pfFunds = [];
  const data = await User.findOne({ userId: req.params.id });
  for (const portfolio of data.portfolios) {
    const mutualFundData = await MutualFund.findOne({
      scheme_code: portfolio,
    });
    pfFunds.push({
      value: mutualFundData.scheme_code,
      label: mutualFundData.scheme_name,
    });
  }
  res.send(pfFunds);
});

//get user invested, current and profit and loss data
router.get("/overallPortfolioStat/:id", function (req, res) {
  let totalHoldingValue = 0;
  let totalMarketValue = 0;
  let totalProfitAndLoss = 0;
  User.find({ userId: req.params.id }).then(async (data) => {
    if (data[0]) {
      if (data[0].portfolios.length) {
        for (const portfolio of data[0].portfolios) {
          const mutualFundData = await Portfolio.findOne({
            _id: portfolio,
          });
          totalHoldingValue += mutualFundData.holdingValue;
          totalMarketValue += mutualFundData.marketValue;
          if (totalMarketValue > totalHoldingValue) {
            totalProfitAndLoss = totalMarketValue - totalHoldingValue;
          } else {
            totalProfitAndLoss = totalHoldingValue - totalMarketValue;
          }
        }
        res.send({
          totalHoldingValue: totalHoldingValue.toFixed(2),
          totalMarketValue: totalMarketValue.toFixed(2),
          totalProfitAndLoss: totalProfitAndLoss.toFixed(2),
        });
      } else {
        res.send({
          totalHoldingValue: totalHoldingValue,
          totalMarketValue: totalMarketValue,
          totalProfitAndLoss: totalProfitAndLoss,
        });
      }
    }
  });
});

// updating new watchlist to an existing watchlist
router.put("/addWatchlist", async (req, res) => {
  try {
    Watchlist.findOne({ _id: req.body.wlId }).then((data) => {
      let fundIds = data.watchlistFunds;
      let messages = [];
      Object.keys(req.body.navData).map((value) => {
        if (value in fundIds) {
          let dateDb = fundIds[value];
          let dateNav = req.body.navData[value];
          if (JSON.stringify(dateDb) === JSON.stringify(dateNav)) {
            messages[0] = "Already exist";
            messages[1] = "error";
          } else {
            fundIds[value] = req.body.navData[value];
            messages[0] = "Watchlist updated";
            messages[1] = "success";
          }
        } else {
          fundIds[value] = req.body.navData[value];
          messages[0] = "Added to watchlist";
          messages[1] = "success";
        }
      });
      Watchlist.updateOne(
        { _id: req.body.wlId },
        { $set: { watchlistFunds: fundIds } }
      )
        .then((data) => res.send(data))
        .catch((error) => console.log(error.message));
      res.send(messages);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
