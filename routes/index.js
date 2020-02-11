const express = require("express");
const router = express.Router();
const axios = require("axios");
const tmdbKEY = process.env.KEY;

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

module.exports = router;
