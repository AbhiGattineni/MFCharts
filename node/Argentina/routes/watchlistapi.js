const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watchlist = require("../models/watchlist");

router.use(express.json());

// GET all the watchlist data under dropdown
router.get("/allWatchlist", async (req, res) => {
    try {
        const allWatchlist = await Watchlist.find();
        console.log(allWatchlist);
        return res.json(allWatchlist);
    }
    catch (err) {
        console.log(err.message);
    }
})

// GET a specific watchlist selected by the user 
router.get("/getWatchlist/:id", async (req, res) => {
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        const arr = watchlist.watchlistFunds;
        console.log(Object.keys(arr));
        return res.json(watchlist);
    }
    catch (err) {
        console.log(err.message);
    }
})

// PUT to delete a specific fund in allWatchlist 
router.put("/deleteWatchlist/:id/:watchlistid", async (req, res) => {
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        const arr = watchlist.watchlistFunds;
        if(arr.hasOwnProperty(req.params.watchlistid)){
            delete arr[req.params.watchlistid];
        }
        const update = await Watchlist.findByIdAndUpdate(req.params.id,{$set : {watchlistFunds : arr}});
        await update.save();
        return res.json(arr);
    }
    catch (err) {
        console.log(err.message);
    }
})

// DELETE a watclist in watchlist page 
router.delete("/deleteallWatclist/:id", async (req, res) => {
    try {
        await Watchlist.findByIdAndDelete(req.params.id);
        return res.json(await Watchlist.find());
    }
    catch (err) {
        console.log(err.message);
    }
})


module.exports = router;