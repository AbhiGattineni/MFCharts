const mongoose = require("mongoose");

const schema = mongoose.Schema;

const timelineSchema = new schema({
  schemeCode: { type: String, required: true },
  userId: { type: schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  url: { type: String },
});

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;
