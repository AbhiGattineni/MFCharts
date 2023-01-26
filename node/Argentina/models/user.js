import mongoose from "mongoose";
const schema = mongoose.Schema;
const userSchema = new schema({
  userId: { type: String, required: true },
  watchlists: { type: Array, default: [] },
  portfolios: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);
export default User;
