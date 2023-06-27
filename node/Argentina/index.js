const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dashBoardApi = require('./routes/dashBoardApi')

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
app.use("/watchlistapi", require("./routes/dashBoardApi"));

// userDashboard API
app.use("/api", dashBoardApi)

//listen for requests
const port = 5000;

app.listen(process.env.port || port , function () {
  console.log(`server started on port ${port}`);
});
