const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//dotenv configured
require("dotenv").config();

//setup express app
const app = express();
app.use(cors());

//connect to mongodb
mongoose.connect(process.env.MONGOOSE_URL);

app.use(bodyParser.json());

//initialize routes
app.use("/api", require("./routes/api"));
app.use("/watchlistapi", require("./routes/watchlistapi"));
app.use("/searchapi", require("./routes/search_api"));
app.use("/api/portfolio", require("./routes/portfolio_apis"));
app.use("/api/timeline", require("./routes/timeline_api"));

//listen for requests
app.listen(process.env.port || 5000, function () {
  console.log("now listening for requests");
});
