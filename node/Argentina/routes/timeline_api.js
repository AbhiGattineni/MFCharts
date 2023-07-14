const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Timeline = require("../models/timeline");

// GET endpoint to fetch all timelines
router.get("/", async (req, res) => {
  try {
    const timelines = await Timeline.find();
    res.json(timelines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET endpoint to fetch timeline based on userId
router.get("/user/:userId", async (req, res) => {
  try {
    const timelines = await Timeline.find({
      userId: mongoose.Types.ObjectId(req.params.userId),
    });

    if (timelines.length === 0) {
      return res
        .status(404)
        .json({ message: "No timelines found for the provided userId." });
    }

    res.json(timelines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET endpoint to fetch timeline based on userId and schemeCode
router.get("/:userId/:schemeCode", async (req, res) => {
  try {
    const timelines = await Timeline.find({
      userId: req.params.userId,
      schemeCode: req.params.schemeCode,
    });

    if (timelines.length === 0) {
      return res.status(404).json({
        message: "No timelines found for the provided userId and schemeCode.",
      });
    }
    res.json(timelines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
