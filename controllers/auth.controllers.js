const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const { name, email, pwd, confpwd } = req.body;
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        return res.render("register", {
          messge: "That Email is aready is use",
        });
      } else if (pwd !== confpwd) {
        return res.render("register", {
          messge: "Password Do Not Match",
        });
      }

      let hashedPassword = await bcrypt.hash(pwd, 8);
      console.log(hashedPassword);
      db.query(
        "INSERT INTO users SET ?",
        {
          username: name,
          email: email,
          password: hashedPassword,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            return res.render("register", {
              messge: "User registerd",
            });
          }
        }
      );
    }
  );
};
