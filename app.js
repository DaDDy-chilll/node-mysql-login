const express = require("express");
const cookie = require("cookie-parser");
const path = require("path");
const db = require("./database");
const PORT = process.env.PORT;

const router = require("./routes/pages");
const auth = require("./routes/auth");

const app = express();
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Mysql Connected");
  }
});
// const publicDirectory = path.join(__dirname, "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie());
app.set("view engine", "hbs");
app.use("/", router);
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
