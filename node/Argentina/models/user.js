const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  userId: { type: String, required: true },
  watchlists: { type: Array, default: [] },
  portfolios: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
