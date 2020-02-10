const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const movieSchema = new Schema({
    omdbId: String
  title: String,
  year: Number
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
