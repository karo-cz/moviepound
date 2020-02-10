const mongoose = require("mongoose")

const moviesJSON = require("../moviesJSON.json"); 

mongoose.connect("mongodb://localhost:27017/moviepound", () =>
  console.log("Created to Database")
);

const Movie = require("../models/Movie")

Movie.collection.drop()

for (let i = 0; i < 10; i++){
    Movie.create({title: moviesJSON.i.original_title, omdbID: moviesJSON.i.id})
    .then(movieDocument => {console.log("Movie created: "); console.log(movieDocument)})
    .catch(err => console.log(err))
}