const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.render("message", {
      message: "You Need To Authenticate!",
    });
  }
  jwt.verify(accessToken, process.env.SECRET, (error, result) => {
    if (error) {
      return res.render("message", {
        message: "Please Login",
      });
    }
    res.data = result;

    next();
  });
};
module.exports = checkToken;
