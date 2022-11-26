const express = require("express");
const db = require("./database");
const path = require("path");

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
app.set("view engine", "hbs");
app.use("/", router);
app.use("/auth", auth);

app.listen(3000, () => {
  console.log(`Server is running on PORT:3000`);
});
