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
        return res.send(data.watchlists);
    }
    catch (err) {
        res.send(err.message);
    }
})

// GET a specific watchlist selected by the user 
router.get("/getWatchlist/:id/:watchlistid", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        let watchlistData;
        for (const name of data.watchlists) {
            const watchlistid = name.watchlistid.toString();
            if (watchlistid === req.params.watchlistid) {
                watchlistData = await Watchlist.findById(watchlistid);
            }
        }
        return res.send(watchlistData);
    }
    catch (err) {
        res.send(err.message);
    }
})

// PUT to delete a specific fund in allWatchlist 
router.put("/deleteWatchlist/:id/:watchlistid/:fundid", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        let watchlistF;
        let watchlist = data.watchlists;
        let message;
        for (const name of data.watchlists) {
            const watchlistid = name.watchlistid.toString();
            if (watchlistid === req.params.watchlistid) {
                watchlistF = await Watchlist.findById(watchlistid);
            }
        }
        const watchlistFunds = watchlistF.watchlistFunds;
        let funds = Object.keys(watchlistFunds);
        if (funds.length === 1) {
            for (const name of data.watchlists) {
                const watchlistid = name.watchlistid.toString();
                if (watchlistid === req.params.watchlistid) {
                    const index = watchlist.indexOf(watchlistid);
                    watchlist.splice(index, 1);
                    const deletewl = await User.findOneAndUpdate({ userId: req.params.id }, { $set: { watchlists: watchlist } });
                    await deletewl.save();
                    await Watchlist.findByIdAndDelete(req.params.watchlistid);
                    message = "Deleted successfull"
                }
                else {
                    message = "watclist already deleted"
                }
            }
        }
        else {
            for (let fundid of funds) {
                if (req.params.fundid == fundid) {
                    delete watchlistFunds[req.params.fundid];
                    message = "Deleted successfull"
                }
                else {
                    message = "Already deleted"
                }
            }
        }
        const update = await Watchlist.findByIdAndUpdate(req.params.watchlistid, { $set: { watchlistFunds: watchlistFunds } });
        await update.save();
        return res.send(message);
    }
    catch (err) {
        res.send(err.message);
    }
})

// DELETE a watclist in watchlist page 
router.delete("/deleteallWatclist/:id/:watchlistid", async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.params.id });
        const watchlist = data.watchlists;
        let message;
        for (const name of data.watchlists) {
            const watchlistid = name.watchlistid.toString();
            if (watchlistid === req.params.watchlistid) {
                const index = watchlist.indexOf(watchlistid);
                watchlist.splice(index, 1);
                const deletewl = await User.findOneAndUpdate({ userId: req.params.id }, { $set: { watchlists: watchlist } });
                await deletewl.save();
                await Watchlist.findByIdAndDelete(req.params.watchlistid);
                message = "Deleted successfull"
            }
            else {
                message = "watclist already deleted"
            }
        }
        return res.send(message);
    }
    catch (err) {
        res.send(err.message);
    }
})


module.exports = router;