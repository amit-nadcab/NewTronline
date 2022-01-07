const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//var expressWs = require('express-ws')(app);
const env = require("dotenv");
const cors = require("cors");
const port = 3001;
const fetch = require('cross-fetch');

env.config();
const { foreverExcute } = require("./Controller/index");

const mongoose = require("mongoose");
const db = `mongodb+srv://techsavvy:macbook@cluster0.pahku.mongodb.net/tronnine?retryWrites=true&w=majority`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const userRouter = require("./router/userRouter");
const calculate_all_income_from_deposit = require("./Controller/user");
app.use("/api", userRouter);

// ---------------------------- Test  -----------------------
app.get("/get", function (req, res) {
  console.log("error34");
  try {
    return res.json({
      status: 200,
      message: "hello world",
    });
  } catch (error) {
    console.log("error", error.message);
    return res.json({
      status: 400,
      err: error.message,
    });
  }
});
let i = 1; 
// setInterval(()=>{
//   console.log("Number of times executed::", i)
//   fetch("http://localhost:3001/api/calculate_all_income_from_deposit").then(d=>d.json()).then((res)=>
//   {
//     console.log("Response::",res)
//   })
//   i++;
// },20000)
app.get("/foreverExcute", () => foreverExcute(""));
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
