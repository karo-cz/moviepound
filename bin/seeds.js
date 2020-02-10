const mongoose = require("mongoose");

const moviesJSON = require("../moviesJSON.json");

const fetch = require("node-fetch");

const axios = require("axios");

const tmdbKEY = process.env.KEY;

mongoose.connect("mongodb://localhost:27017/moviepound", () =>
  console.log("Created to Database")
);


const Movie = require("../models/Movie");

Movie.collection.drop();

for (movie of moviesJSON) {
  Movie.create({ title: movie.original_title, omdbId: movie.id })
    .then(movieDocument => {
      console.log("Movie created: ", movieDocument);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieDocument.omdbId}?api_key=945edfeb81929f1fb50b3191c1073571`
        )
        .then(response => {
          console.log(response);
          let movieDetails = response.data;

          axios
            .get(
              `http://api.themoviedb.org/3/movie/${movieDocument.omdbId}/videos?api_key=945edfeb81929f1fb50b3191c1073571`
            )
            .then(response => {
              console.log(response.data.results[0].key);
              Movie.updateOne(
                { omdbId: movieDocument.omdbId },
                {
                  releaseDate: movieDetails.release_date,
                  genre: movieDetails.genres,
                  image: `https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}`,
                  trailer: `https://www.youtube.com/watch?v=${response.data.results[0].key}`
                }
              )
                .then(response => console.log(response))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
}
