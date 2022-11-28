const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

register = (req, res) => {
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
      const accessToken = jwt.sign({ email, name }, process.env.SECRET, {
        expiresIn: "10m",
      });
      let hashedPassword = await bcrypt.hash(pwd, 8);
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
            res.cookie("accessToken", accessToken, { httpOnly: true });
            return res.render("index", {
              name,
              action: "SignUp",
            });
          }
        }
      );
    }
  );
};

login = (req, res) => {
  const { email, pwd } = req.body;
  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.render("login", {
          messge: "Incorrect Username and Password",
        });
      } else {
        const solvepwd = await bcrypt.compare(pwd, result[0].password);
        const data = { ...result[0] };
        if (!solvepwd) {
          return res.render("login", { messge: "Incorrect Password" });
        } else {
          const accessToken = jwt.sign(
            { email: data.email, name: data.username },
            process.env.SECRET,
            { expiresIn: "10m" }
          );
          res.cookie("accessToken", accessToken, { httpOnly: true });
          return res.render("index", { name: data.username, action: "Login" });
        }
      }
    }
  );
};

module.exports = {
  register,
  login,
};
