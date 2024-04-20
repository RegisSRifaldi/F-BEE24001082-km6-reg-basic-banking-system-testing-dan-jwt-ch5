const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/v1/authController");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const user = require("./userRoute");
router.use("/api/v1", user);
const account = require("./accountRoute");
router.use("/api/v1", account);
const transaction = require("./transactionRoute");
router.use("/api/v1", transaction);

let restrict = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization || !authorization.split(" ")[1]) {
    return res.status(401).json({
      status: false,
      message: "token not provided!",
      data: null,
    });
  }

  let token = authorization.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
    delete user.iat;
    req.user = user;
    next();
  });
};

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/whoami", restrict, authController.whoami);

module.exports = router;
