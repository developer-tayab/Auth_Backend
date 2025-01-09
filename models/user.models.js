const { Schema, model, mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Auth_Backend").then(() => {
  console.log("MongoDb is connected successfully");
}).catch((err) => {
  console.log(err)
})

const userModel = Schema({
  username: String,
  email: String,
  password: String,
  age: Number
})

module.exports = model("User", userModel)