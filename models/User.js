const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  movieLog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],
  role: {
    type: String,
    default: "user",
    enum: ["moderator", "user"]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
