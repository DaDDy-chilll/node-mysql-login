const express = require("express");
const checkToken = require("../middlewares/verify.middleware");
const router = express.Router();

router.get("/", checkToken, (req, res) => {
  res.render("index", { name: res.data.name, action: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.render("message", { message: "See You Next Time!" });
});

module.exports = router;
