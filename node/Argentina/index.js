const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//setup express app
const app = express();
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017");

app.use(bodyParser.json());

//initialize routes
app.use("/api", require("./routes/api"));

//listen for requests
app.listen(process.env.port || 5000, function () {
  console.log("now listening for requests");
});
