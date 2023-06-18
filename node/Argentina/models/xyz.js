const mongoose = require("mongoose");

const schema = mongoose.Schema;

const xyzSchema = new schema({
  Name: { type: String, required: true },
  Phone : {type: String}
});

const XYZ = mongoose.model("xyz", xyzSchema);

module.exports = XYZ;
