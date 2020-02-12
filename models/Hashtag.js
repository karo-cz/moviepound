const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
<<<<<<< HEAD
  tag: {
    type: String,
    unique: true
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
=======
  tag: { type: String, unique: true },
  movies: Object,
>>>>>>> bc3adc251de12990cd1b670274454cfae63166f1
  deletable: {
    type: Boolean,
    default: "true"
  }
});

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

module.exports = Hashtag;
