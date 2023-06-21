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

// POST endpoint to create a new timeline
router.post("/", async (req, res) => {
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
  console.log("UserId: ", req.params.userId);
  try {
    const timelines = await Timeline.find({
      userId: mongoose.Types.ObjectId(req.params.userId),
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
