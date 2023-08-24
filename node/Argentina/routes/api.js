const express = require("express");
const router = express.Router();
const yahooFinance = require("yahoo-finance");
const {
  yahooEquityDayToDay,
  yahooEquitySearch,
} = require("./yahooFinance2/yahooFinance2");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// const fetch = require("node-fetch");
let fetch;
(async () => {
  const fetchModule = await import("node-fetch");
  fetch = fetchModule.default;
})();
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

//example for equity data from yahoo finance 2
router.get("/equitydata", function (req, res) {
  let equityData = {};
  yahooEquityDayToDay("2000-01-01", "2023-12-31")
    .then((data) => {
      data.map((nav) => {
        // Create a Date object
        let dateObj = new Date(nav.date);

        // Extract day, month, and year
        let day = String(dateObj.getDate()).padStart(2, "0");
        let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        let year = dateObj.getFullYear();

        // Construct the desired format
        let formattedDate = `${day}-${month}-${year}`;
        equityData[formattedDate] = nav.close;
      });
      res.send(equityData);
    })
    .catch((err) => {
      res.send(err);
    });
});

//get all the watchlists of specific user
router.get("/watchlists/:userId", async function (req, res) {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    let wlNames = [];

    if (user) {
      if (user.watchlists.length) {
        const watchlistIds = user.watchlists.map((wl) => wl.watchlistid); // extracting watchlistids

        const records = await Watchlist.find()
          .where("_id")
          .in(watchlistIds)
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
router.get("/allmutualfunds/:searchTerm", async (req, res) => {
  try {
    // Fetching equities from Yahoo based on search term
    const yahooData = await yahooEquitySearch(req.params.searchTerm);

    // Extract relevant details from the Yahoo data
    const validExchanges = [
      "NSI",
      "NSE",
      "BSE",
      "Bombay",
      "NMS",
      "NASDAQ",
      "NYQ",
      "NYSE",
    ];

    const yahooEquities = yahooData.quotes
      .filter(
        (quote) =>
          quote.isYahooFinance && validExchanges.includes(quote.exchange)
      )
      .map((quote) => ({
        schemeCode: quote.symbol,
        schemeName: quote.longname || quote.shortname,
        exchange: quote.exchDisp,
        type: "EQ",
      }));

    // Fetching all mutual funds from DB
    const mutualfunds = await AllMutualFunds.find({});
    if (!mutualfunds || !mutualfunds[0] || !mutualfunds[0].all_mutual_funds) {
      return res.status(404).send({ message: "Mutual funds not found." });
    }

    // Extracting the mutual funds that match the searchTerm
    const searchTerm = req.params.searchTerm.toLowerCase();
    const mfData = mutualfunds[0].all_mutual_funds
      .filter((mf) => mf.schemeName.toLowerCase().includes(searchTerm))
      .map((mf) => ({
        schemeCode: mf.schemeCode,
        schemeName: mf.schemeName,
        type: "MF",
      }));

    // Combine both Yahoo data and mutual funds data
    const combinedData = [...mfData, ...yahooEquities];

    res.send(combinedData);
  } catch (error) {
    console.error("Error fetching mutual funds:", error);
    res.status(500).send({ message: "Failed to fetch mutual funds." });
  }
});

//get mutual fund meta data based on mutual fund selection
router.get("/mutualfund/:id/metadata", function (req, res) {
  console.log("id", typeof req.params.id);
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
  fetch(`https://api.mfapi.in/mf/${req.params.id}`)
    .then((response) => response.json())
    .then((response) => {
      let navValue;
      response.data.map((data) => {
        if (data.date === req.params.date) {
          navValue = data.nav;
        }
      });

      if (navValue === undefined) {
        res.status(404).send("No NAV data found for the given date");
      } else {
        res.send(navValue);
      }
    })
    .catch(function (error) {
      // Add some error handling for the database query
      res.status(500).send("Database error: " + error);
    });
});

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
//get mutual fund navdata based on dropdown selection and dates
router.get("/equityfund/:id/navdata", function (req, res) {
  let start_date = req.query.start || null;
  let end_date = req.query.end || null;
  let obj = {};

  function formatDate(date) {
    return new Date(date).toISOString().slice(0, 10);
  }
  if (start_date != null) {
    start_date = new Date(start_date);
    start_date.setUTCHours(0, 0, 0, 0);
    start_date = formatDate(start_date);
  }

  if (end_date != null) {
    end_date = new Date(end_date);
    end_date.setUTCHours(23, 59, 59, 999); //Set to end of day
    end_date = formatDate(end_date);
  }

  console.log(start_date, end_date);
  if (start_date === null) start_date = "1990-01-01";
  if (end_date === null) {
    // Get today's date
    const today = new Date();

    // Format today's date as "YYYY-MM-DD"
    end_date = today.toISOString().slice(0, 10);
  }
  console.log(start_date, end_date);

  let equityData = {};
  yahooEquityDayToDay(start_date, end_date)
    .then((data) => {
      data.map((nav) => {
        // Create a Date object
        let dateObj = new Date(nav.date);

        // Extract day, month, and year
        let day = String(dateObj.getDate()).padStart(2, "0");
        let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        let year = dateObj.getFullYear();

        // Construct the desired format
        let formattedDate = `${day}-${month}-${year}`;
        equityData[formattedDate] = nav.close;
      });
      console.log(equityData);
      res.send(equityData);
    })
    .catch((err) => {
      res.send(err);
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
          category: portfolio.category,
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
