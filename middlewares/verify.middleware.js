const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.render("message", {
      message: "You Need To Authenticate!",
    });
  }
  jwt.verify(accessToken, process.env.SECRET, (error, result) => {
    console.log(result);
    if (!error) {
      return res.render("index");
    } else {
      return res.render("message", {
        message: "Please Login",
      });
    }
  });
  next();
};
module.exports = checkToken;
