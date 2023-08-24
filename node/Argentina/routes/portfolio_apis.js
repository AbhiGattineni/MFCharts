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

        let quantity = (
          portfolioData.quantity +
          (transaction.transactionType === "Buy" ? 1 : -1) *
            transaction.quantity
        ).toFixed(2);
        let holdingValue = (
          portfolioData.holdingValue +
          (transaction.transactionType === "Buy" ? 1 : -1) *
            transaction.transactionValue
        ).toFixed(2);
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

  try {
    // Create and save new timeline
    const newTimeline = new Timeline({
      schemeCode,
      userId,
      date,
      description,
      url,
    });
    await newTimeline.save();

    // Fetch timelines matching userId and schemeCode
    const timelines = await Timeline.find({ userId, schemeCode });

    // If no timelines are found, return an error
    if (timelines.length === 0) {
      return res.status(404).json({
        message: "No timelines found for the provided userId and schemeCode.",
      });
    }

    // Return the fetched timelines
    res.json(timelines);
  } catch (err) {
    // Check the type of error and send appropriate status code
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// DELETE endpoint to delete a timeline record
router.delete("/deletetimeline/:id", async (req, res) => {
  try {
    const timeline = await Timeline.findByIdAndDelete(req.params.id);
    if (!timeline) {
      return res.status(404).json({
        message: "No timeline found with the provided ID.",
      });
    }

    const timelines = await Timeline.find({
      userId: timeline.userId,
      schemeCode: timeline.schemeCode,
    });

    res.json(timelines);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
        else {
          await Portfolio.findByIdAndDelete(portfolios[portfolioFund].id);
        }
      }
      await User.updateOne(
        { userId: req.params.id },
        { $set: { portfolios: portfolioId } }
      );
      return res.send(portfolioId);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

router.put("/removetransaction/:userId", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.id);
    const user = await User.findOne({userId : req.params.userId});
    const portfolios = user.portfolios;
    const transaction = portfolio.transactions;
    let Quantity = portfolio.quantity;
    let hValue = portfolio.holdingValue;
    let mValue = portfolio.marketValue;
    let transactionType;
    let Amount;
    for (let fund in transaction) {
      if (transaction[fund].date === req.body.date) {
        Amount = transaction[fund].transactionValue;
        transactionType = transaction[fund].transactionType;
        transaction.splice(fund, 1);
        break;
      }
    }
    if (transaction.length === 0) {
      portfolios.remove(req.body.id);
      await User.findOneAndUpdate({userId:req.params.userId},{$set: {portfolios : portfolios}});
      await Portfolio.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.body.id) });
    }
    else {
      if (transactionType === "Buy") {
        Quantity -= 1;
        hValue -= Amount;
        mValue -= Amount;
      } else {
        Quantity += 1;
        hValue += Amount;
        mValue += Amount;
      }

      const result = await Portfolio.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body.id) },
        { $set: { quantity: Quantity, holdingValue: hValue.toFixed(2), marketValue: mValue.toFixed(2) } },
        { new: true }
      );

    }
    await Portfolio.updateOne({ _id: mongoose.Types.ObjectId(req.body.id) }, { $set: { transactions: transaction } });
    res.status(400).send(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
