const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//dotenv configured
require("dotenv").config();

//setup express app
const app = express();

//connect to mongodb
mongoose.connect(process.env.MONGOOSE_URL);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//initialize routes
app.use("/", require("./routes/api"));

app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});
