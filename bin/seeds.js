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
axios
  .get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=945edfeb81929f1fb50b3191c1073571&language=en-US`
  )
  .then(response => {
    // console.log(response.data.genres);
    response.data.genres.forEach(genre => {
      Hashtag.create({ tag: genre.name.toLowerCase(), deletable: false })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.log(err));

moviesJSON.forEach(movie => {
  Movie.create({ title: movie.original_title, omdbId: movie.id })
    .then(movieDocument => {
      // console.log("Movie created: ", movieDocument);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieDocument.omdbId}?api_key=945edfeb81929f1fb50b3191c1073571`
        )
        .then(response => {
          // console.log(response);
          let movieDetails = response.data;
          axios
            .get(
              `http://api.themoviedb.org/3/movie/${movieDocument.omdbId}/videos?api_key=945edfeb81929f1fb50b3191c1073571`
            )
            .then(response => {
              // console.log(response.data.results[0].key);
              let trailerId = "https://www.youtube.com/watch?v=aDm5WZ3QiIE";
              if (response.data.results[0]) {
                trailerId = `https://www.youtube.com/watch?v=${response.data.results[0].key}`;
              }
              Movie.updateOne(
                { omdbId: movieDocument.omdbId },
                {
                  releaseDate: movieDetails.release_date,
                  genre: movieDetails.genres,
                  image: `https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}`,
                  trailer: trailerId
                }
              )
                .then(response => {
                  console.log("movie done: ", response);
                  // console.log(movieDetails.genres);
                  movieDetails.genres.forEach(genre => {
                    console.log("adding hashtag");
                    Hashtag.updateOne(
                      { tag: genre.name.toLowerCase() },
                      { $push: { movies: movieDocument._id } }
                    ).then(response => {
                      // hashtagDocument.movies.push(movieDocument._id);
                      // console.log(response);
                    });
                  });
                })

                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
