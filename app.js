require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const router = require("./routes/api/v1");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(router);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hi");
});

const userRouters = require("./routes/api/v1/userRoute");
app.use("/api/v1/users", userRouters);

// 500 error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: err.message,
    data: null,
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `are you lost? ${req.method} ${req.url} is not registered!`,
    data: null,
  });
});
module.exports = app;