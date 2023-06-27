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


app.use("/searchapi", require("./routes/search_api"));
app.use("/api/portfolio", require("./routes/portfolio_apis"));
app.use("/api/timeline", require("./routes/timeline_api"));
app.use("/api/contact", require("./routes/contactapi"));
app.use("/api/user", require("./routes/userdataapi"));

// userDashboard API
app.use("/api", dashBoardApi)

//listen for requests
const port = 5000;

app.listen(process.env.port || port , function () {
  console.log(`server started on port ${port}`);
});
