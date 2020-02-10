const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  movieLog: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],
  wishList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
