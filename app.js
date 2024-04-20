require("dotenv").config();
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const logger = require("morgan");
const cors = require("cors");
const router = require("./routes/api/v1");
const app = express();
const authController = require("./controllers/v1/authController");
app.post("/login", authController.login);

const { SESSION_SECRET } = process.env;

// const bodyParser = require("body-parser");
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(router);

// app.use(express.urlencoded());
app.use(express.urlencoded());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const passport = require("./libs/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set("view engine", "ejs");

const web = require("./routes/api/v1/webs");
app.use("/", web);
const api = require("./routes/api/v1/api");
app.use("/api/v1", api);

const swaggerUI = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const file = fs.readFileSync("./api-docs.yaml", "utf-8");
const swaggerDocument = YAML.parse(file);

app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const userRouters = require("./routes/api/v1/userRoute");
app.use("/api/v1/users", userRouters);

const authRouters = require("./routes/api/v1/");
app.use("/api/v1/auth", authRouters);

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
