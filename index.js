const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user.models.js")


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine" , "ejs")
app.use(cookie());








app.get("/", (req, res) => {
  res.render("index");
});






app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});