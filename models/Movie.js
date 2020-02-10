const mongoose = require("mongoose");

// const Schema = mongoose.Schema();

const movieSchema = new mongoose.Schema({

  title: String,
   omdbId: String,
  releaseDate: String, 
  genre: Array,
  image: String, 
  trailer: String 

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
