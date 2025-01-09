const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user.models.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(cookie());


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/create", async (req, res) => {
  const { username, email, password, age } = req.body
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const userCreate = await userModel.create({ username, email, password: hash, age });
      console.log({ User_created_successfully: userCreate })
    });
  });
  const token = jwt.sign({ email: email }, "shaaaaaa",)
  res.cookie("token", token)
  res.redirect("/login")
})


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  const userFind = await userModel.findOne({ email: email });

  if (userFind) {
    const hash = userFind.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        const token = jwt.sign({ email: email }, "shaaaaaa",)
        res.cookie("token", token)
        res.render("home", { username: userFind.username })
      } else {
        res.send("Something is wrong!")
      }
    });
  } else {
    res.send("Something is wrong!")
  }

})

app.get("/home", (req, res) => {
  res.render("home")
})


app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.redirect("/")
})



app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});