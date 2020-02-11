const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  tag: { type: String, unique: true },
  movies: Object,
  deletable: {
    type: Boolean,
    default: "true"
  }
});

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

module.exports = Hashtag;
