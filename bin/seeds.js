require("dotenv").config();

const mongoose = require("mongoose");

const moviesJSON = require("../moviesJSON.json");

const axios = require("axios");

const tmdbKEY = process.env.KEY;

mongoose
  .connect("mongodb://localhost:27017/moviepound", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(response => console.log("Created to Database"))
  .catch(err => console.log(err));

const Movie = require("../models/Movie");
const Hashtag = require("../models/Hashtag");

Hashtag.collection.drop();
Movie.collection.drop();

//replace key with env value

//axios
//     .get(
//         `https://api.themoviedb.org/3/genre/movie/list?api_key=945edfeb81929f1fb50b3191c1073571&language=en-US`
//     )
//     .then(response => {
//         // console.log(response.data.genres);
//         response.data.genres.forEach(genre => {
//             Hashtag.create({ tag: genre.name, deletable: false })
//                 .then(response => console.log(response))
//                 .catch(err => console.log(err));
//         });
//     })
//     .catch(err => console.log(err));
