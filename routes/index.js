const express = require("express");
const router = express.Router();
const axios = require("axios");
const tmdbKEY = process.env.KEY;
const Movie = require("../models/Movie");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  console.log("GET request to index.js made");
  res.render("index", { user: req.user });
});

router.get("/search", (req, res, next) => {
  console.log("Searched for a movie");
  // console.log(req.query.search);
  let searchQuery = req.query.search;

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`
    )
    .then(response => {
      console.log(response.data);
      // res.send(response.data.results);
      res.render("searchResults", {
        searchResults: response.data.results,
        user: req.user
      });
    })
    .catch(err => console.log(err));
});

router.get("/movies/:id", (req, res, next) => {
  console.log("movie opened");

  let movieId = req.params.id;
  axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKEY}`)
    .then(response => {
      console.log(response.data);
      // res.send(response.data);
      res.render("movie", {
        user: req.user,
        movieDetail: response.data
      });
    })
    .catch(err => console.log(err));
});

router.post("/movielog", (req, res, next) => {
  console.log(req.body.currentMovie);
  console.log(req.user);
  const {
    title,
    imdbId,
    releaseDate,
    image,
    trailer,
    tmdb_id
  } = req.body.currentMovie;

  Movie.findOne({ tmdb_id: tmdb_id }).then(movie => {
    if (!movie) {
      Movie.create({ title, imdbId, releaseDate, image, trailer, tmdb_id })
        .then(newMovie => {
          return User.updateOne(
            { _id: req.user._id },
            { $push: { movieLog: newMovie._id } }
          );
        })
        .catch(err => console.log(err));
    } else {
      let movieLog = req.user.movieLog;

      if (movieLog.includes(movie._id)) {
        return;
      }

      return User.updateOne(
        { _id: req.user._id },
        { $push: { movieLog: movie._id } }
      );
    }
  });
  // .then(() => {});
});

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/profile", loginCheck, (req, res) => {
  console.log(req.user);

  let movieList = req.user.movieLog;
  let userList = [];

  User.findById(req.user._id)
    .populate("movieLog")
    .then(userDoc => {
      console.log(userDoc);
      // res.json(userDoc);
      res.render("partials/profile", { userDoc });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
