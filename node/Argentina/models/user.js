const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  userId: { type: String, required: true },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  watchlists: { type: Array, default: [] },
  portfolios: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
