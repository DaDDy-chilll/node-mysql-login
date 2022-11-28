const express = require("express");
const checkToken = require("../middlewares/verify.middleware");
const router = express.Router();

router.get("/", checkToken, (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
