var express = require("express");
var router = express.Router();

let { register } = require("../../../controllers/v1/authController");
const passport = require("passport");
router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/authenticate",
    failureRedirect: "/login",
  })
);

module.exports = router;
