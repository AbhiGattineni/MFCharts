const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watchlist = require("../models/watchlist");
const User = require("../models/user");

router.use(express.json());

// GET all the watchlist data under dropdown
router.get("/allWatchlist/:id", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        const watchlistNames = [];
        for (const name of data.watchlists) {
            const allWatchlist = await Watchlist.findById(name);
            // console.log(allWatchlist.watchlistName);
            const watchlistdata = {};
            watchlistdata.watchlistid = name;
            watchlistdata.wlname = allWatchlist.watchlistName;
            watchlistNames.push(watchlistdata);
        }
        return res.send(watchlistNames);
    }
    catch (err) {
        console.log(err.message);
    }
})

// GET a specific watchlist selected by the user 
router.get("/getWatchlist/:id/:watchlistid", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        let watchlistData;
        for (const name of data.watchlists) {
            if (name === req.params.watchlistid) {
                watchlistData = await Watchlist.findById(name);
            }
        }
        return res.send(watchlistData);
    }
    catch (err) {
        console.log(err.message);
    }
})

// PUT to delete a specific fund in allWatchlist 
router.put("/deleteWatchlist/:id/:watchlistid/:fundid", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        let watchlist;
        for (const name of data.watchlists) {
            if (name === req.params.watchlistid) {
                watchlist = await Watchlist.findById(name);
            }
        }
        const arr = watchlist.watchlistFunds;
        if (req.params.fundid in arr) {
            delete arr[req.params.fundid];
        }
        const update = await Watchlist.findByIdAndUpdate(req.params.watchlistid, { $set: { watchlistFunds: arr } });
        await update.save();
        return res.send(arr);
    }
    catch (err) {
        console.log(err.message);
    }
})

// DELETE a watclist in watchlist page 
router.delete("/deleteallWatclist/:id/:watchlistid", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        const watchlist = data.watchlists;
        console.log(watchlist);
        for (const name of data.watchlists) {
            if (name === req.params.watchlistid) {
                const index = watchlist.indexOf(name);
                watchlist.splice(index, 1);
                console.log(watchlist);
                const deletewl = await User.findOneAndUpdate({ userId : req.params.id}, { $set: { watchlists: watchlist } });
                await deletewl.save();
                await Watchlist.findByIdAndDelete(req.params.watchlistid);
            }
        }
        return res.send(watchlist);
    }
    catch (err) {
        console.log(err.message);
    }
})


module.exports = router;