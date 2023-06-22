const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MutualFund = require("../models/mutualFund");
const AllMutualFunds = require("../models/allmutualFunds");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const Portfolio = require("../models/portfolio");
const Timeline = require("../models/timeline");


// GET all mutual and equity fund names for search
router.get("/allFundNames", function (req, res) {
    AllMutualFunds.find({}).then(function (mutualfunds) {
        res.send(mutualfunds[0]);
    });
});

// GET all mutual fund names for search
router.get("/mutualFundNames", function (req, res) {
    AllMutualFunds.find({}).then(function (mutualfunds) {
        res.send(mutualfunds[0].all_mutual_funds);
    });
});

// GET all equity fund names for search
router.get("/equityFundNames", function (req, res) {
    AllMutualFunds.find({}).then(function (mutualfunds) {
        res.send(mutualfunds[0].all_equity_funds);
    });
});

// POST to save the funds to watchlist page
router.post("/addWatchlist", async (req, res) => {
    try {
        let userData = await User.findOne({ userId: req.body.userId });
        let exist = false;
        if (userData.watchlists.length) {
            for (const watchlistCheck in userData.watchlists) {
                if (req.body.watchlistName == userData.watchlists[watchlistCheck].watchlistName) {
                    exist = true;
                    res.send("Already exist!");
                }
            }
        }
        if (exist == false) {
            const wldata = new Watchlist({
                watchlistName: req.body.watchlistName,
                watchlistFunds: req.body.watchlistFunds,
            })
            wldata.save();
            const watchlist = {
                watchlistName: req.body.watchlistName,
                watchlistid: wldata._id,
            }
            const update = await User.findOneAndUpdate({ userId: req.body.userId }, { $push: { watchlists: watchlist } });
            update.save();
            res.send("Created successfull : )");
        }
    }
    catch (err) {
        res.send(err.message);
    }
})

module.exports = router;