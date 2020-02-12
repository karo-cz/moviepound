const mongoose = require("mongoose");
const hashtagSchema = new mongoose.Schema({
  tag: {
    type: String,
    unique: true
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  deletable: {
    type: Boolean,
    default: "true"
  }
});

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

module.exports = Hashtag;
