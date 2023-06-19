const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const Portfolio = require("../models/portfolio");

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
    let portfolioCreated = false;
    let userData = await User.findOne({ userId: req.body.userId });

    for (let portfolioId of userData.portfolios) {
      let portfolioData = await Portfolio.findOne({
        _id: portfolioId,
        schemeCode: req.body.schemeCode,
      });

      if (portfolioData) {
        let updateTransactions = portfolioData.transactions;
        let pdata = {
          date: req.body.date,
          quantity: req.body.quantity,
          navValue: req.body.navValue,
          transactionValue: req.body.transactionValue,
          transactionType: req.body.transactionType,
        };
        updateTransactions.push(pdata);

        if (req.body.transactionType === "Buy") {
          var quantity = (portfolioData.quantity + req.body.quantity).toFixed(
            2
          );
          var holdingValue = (
            portfolioData.holdingValue + req.body.transactionValue
          ).toFixed(2);
        } else {
          var quantity = (portfolioData.quantity - req.body.quantity).toFixed(
            2
          );
          var holdingValue = (
            portfolioData.holdingValue - req.body.transactionValue
          ).toFixed(2);
        }
        var averageFundValue = (holdingValue / quantity).toFixed(2);
        var marketValue = (quantity * req.body.navValue).toFixed(2);
        var totalProfitAndLoss = 0;
        await Portfolio.updateOne(
          { _id: portfolioId },
          {
            $set: {
              transactions: updateTransactions,
              quantity: quantity,
              holdingValue: holdingValue,
              averageFundValue: averageFundValue,
              marketValue: marketValue,
              totalProfitAndLoss: totalProfitAndLoss,
            },
          }
        );
        portfolioCreated = true;
        break;
      }
    }

    if (!portfolioCreated) {
      let pdata = {
        date: req.body.date,
        quantity: req.body.quantity,
        navValue: req.body.navValue,
        transactionValue: req.body.transactionValue,
        transactionType: req.body.transactionType,
      };
      var portfolio = new Portfolio({
        schemeCode: req.body.schemeCode,
        quantity: req.body.quantity,
        holdingValue: (req.body.quantity * req.body.navValue).toFixed(2),
        averageFundValue: req.body.navValue,
        marketValue: req.body.transactionValue,
        totalProfitAndLoss: 0,
        transactions: [pdata],
      });

      let p = await portfolio.save();
      await User.updateOne(
        { userId: req.body.userId },
        { $push: { portfolios: p._id.toString() } }
      );
      res.send("successfully posted data");
    } else if (portfolioCreated) {
      res.send("portfolio updated successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("error", error);
  }
});

module.exports = router;
