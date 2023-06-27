const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET request to fetch a user's details
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// PUT request to update a user's details
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phoneNumber, profilePic } = req.body;

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if they have been provided
    if (firstName !== undefined) {
      user.firstName = firstName;
    }
    if (lastName !== undefined) {
      user.lastName = lastName;
    }
    if (email !== undefined) {
      user.email = email;
    }
    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber;
    }
    if (profilePic !== undefined) {
      user.profilePic = profilePic;
    }

    // Save the updated user to the database
    await user.save();

    // Return the updated user's details
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
