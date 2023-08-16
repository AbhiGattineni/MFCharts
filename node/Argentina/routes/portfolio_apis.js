const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const Portfolio = require("../models/portfolio");
const Timeline = require("../models/timeline");

// 2.1 -> get user portfolio with fund names, quantity, category, P/L %, P/L Amount, Invested
router.get("/allPortfolioFunds/:id", async function (req, res) {
  let portfolioFunds = {};
  try {
    const data = await User.findOne({ userId: req.params.id });
    for (const portfolio of data.portfolios) {
      const portfolioData = await Portfolio.findOne({
        _id: mongoose.Types.ObjectId(portfolio),
      });
      const mutualFundData = await MutualFund.findOne({
        scheme_code: portfolioData.schemeCode,
      });
      portfolioFunds[portfolioData.schemeCode] = {
        schemeCode: mutualFundData.scheme_code,
        schemeName: mutualFundData.scheme_name,
        quantity: portfolioData.quantity,
        category: "Category",
        pAndLPercentage: "100%",
        holdingValue: portfolioData.holdingValue,
        averageValue: portfolioData.averageFundValue,
        marketValue: portfolioData.marketValue,
        tProfitLoss: portfolioData.totalProfitAndLoss,
        transactions: portfolioData.transactions,
        timeline: portfolioData.timeline,
      };
    }
    res.send(portfolioFunds);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// 2.2 -> post or save fund timeline in portfolios in timeline's array of portfolios
router.post("/addFundTimeline", function (req, res) {
  User.findOne({ userId: req.body.user_id })
    .then((data) => {
      if (data.portfolios.length) {
        Portfolio.findOne({ _id: req.body._id })
          .then((portfolioData) => {
            const timelineObject = {
              date: req.body.date,
              description: req.body.description,
              link: req.body.link,
            };
            Portfolio.updateOne(
              { _id: portfolioData._id },
              { $push: { timeline: timelineObject } }
            )
              .then((data) => {
                res.send("Data updated successfully"); // send response when operation is done
              })
              .catch((error) => {
                console.log(error);
                res.status(500).send("Error", error); // send response when there is an error
              });
          })
          .catch((error) => {
            // Handle the error
            console.log(error);
            res.status(500).send("error", error);
          });
      } else res.status(404).send("No portfolio found for this fund");
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
      res.status(500).send("error", error);
    });
});

// 2.3 -> GET all mutual and equity fund names for adding a transaction

router.get("/allFundNames", function (req, res) {
  AllMutualFunds.find({}).then(function (mutualfunds) {
    res.send(mutualfunds);
  });
});

//2.4 -> POST transaction of a fund to add in the portfolio after buying/selling the funds.
router.post("/transaction", async function (req, res) {
  try {
    let userData = await User.findOne({ userId: req.body.userId });
    let portfolioCreated = false;
    let transaction = {
      date: req.body.date,
      quantity: req.body.quantity,
      navValue: req.body.navValue,
      transactionValue: req.body.transactionValue,
      transactionType: req.body.transactionType,
    };

    for (let portfolioId of userData.portfolios) {
      let portfolioData = await Portfolio.findOne({
        _id: portfolioId,
        schemeCode: req.body.schemeCode,
      });

      if (portfolioData) {
        portfolioData.transactions.push(transaction);

        let quantity = (portfolioData.quantity + (transaction.transactionType === "Buy" ? 1 : -1) * transaction.quantity).toFixed(2);
        let holdingValue = (portfolioData.holdingValue + (transaction.transactionType === "Buy" ? 1 : -1) * transaction.transactionValue).toFixed(2);
        let averageFundValue = (holdingValue / quantity).toFixed(2);
        let marketValue = (quantity * transaction.navValue).toFixed(2);

        await Portfolio.updateOne(
          { _id: portfolioId },
          {
            $set: {
              transactions: portfolioData.transactions,
              quantity: quantity,
              holdingValue: holdingValue,
              averageFundValue: averageFundValue,
              marketValue: marketValue,
              totalProfitAndLoss: 0, // You might want to add logic to calculate this.
            },
          }
        );
        portfolioCreated = true;
        break;
      }
    }

    if (!portfolioCreated) {
      let portfolio = new Portfolio({
        schemeCode: req.body.schemeCode,
        category: req.body.category,
        quantity: transaction.quantity,
        holdingValue: (transaction.quantity * transaction.navValue).toFixed(2),
        averageFundValue: transaction.navValue,
        marketValue: transaction.transactionValue,
        totalProfitAndLoss: 0,
        transactions: [transaction],
      });

      let newPortfolio = await portfolio.save();
      await User.updateOne(
        { userId: req.body.userId },
        { $push: { portfolios: newPortfolio._id.toString() } }
      );
      res.send("Portfolio created successfully");
    } else {
      res.send("Portfolio updated successfully");
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error });
  }
});

//2.5 POST endpoint to create a new timeline
router.post("/addtimeline", async (req, res) => {
  const { schemeCode, userId, date, description, url } = req.body;

  const newTimeline = new Timeline({
    schemeCode,
    userId,
    date,
    description,
    url,
  });

  try {
    const savedTimeline = await newTimeline.save();
    res.status(201).json(savedTimeline);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/deleteTransaction/:id", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    // let portfolioFunds;
    const portfolioId =[];
    const portfolioIds = user.portfolios;

    if (portfolioIds.length) {
      const portfolios = await Portfolio.find({
        _id: { $in: portfolioIds.map((id) => mongoose.Types.ObjectId(id)) },
      });
      for (let portfolioFund in portfolios) {
        if (portfolios[portfolioFund].quantity) {
          portfolioId.push(portfolios[portfolioFund].id);
        }
        else{
          await Portfolio.findByIdAndDelete(portfolios[portfolioFund].id);
        }
      }
      await User.updateOne({ userId: req.params.id }, { $set: { portfolios: portfolioId } });
      return res.send(portfolioId);
    }
  }
  catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

module.exports = router;
