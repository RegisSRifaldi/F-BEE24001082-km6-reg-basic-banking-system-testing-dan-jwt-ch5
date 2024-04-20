const express = require("express");
const router = express.Router();
const { restrict } = require("../../../middlewares/auth.middlewares");

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/authenticate", restrict, (req, res) => {
  console.info(req.user);
  res.render("authenticate", { user: req.user });
});

module.exports = router;
