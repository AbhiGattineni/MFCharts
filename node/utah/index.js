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

// app.get("/api/:schemeCode", async function (req, res) {
//   const schemeCode = req.params.schemeCode;
//   fetch(`https://api.mfapi.in/mf/${schemeCode}`).then((result) => {
//     result.json().then((data) => {
//       res.send(data);
//     });
//   });

//   fetch("https://api.mfapi.in/mf/100416")
//     .then((res) => res.json())
//     .then((data) => console.log(data));

//   console.log(result);

//   let result = await fetch("https://api.mfapi.in/mf/${schemeCode}");
//   const json = await result.json();
//   console.log(json);
// });

//listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});
