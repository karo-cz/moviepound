const express = require("express");
const router = express.Router();
const Hashtag = require("../models/Hashtag");
const axios = require("axios");
const tmdbKEY = process.env.NORA_KEY;

router.get("/hashtag", (req, res, next) => {
  //   console.log("Query to hashtags made");
  //   console.log(req.query.hashtag);
  let regex = new RegExp(`^#${req.query.hashtag}`);
  console.log(regex);

  Hashtag.find({ tag: { $regex: regex } })
    .then(hashtagDocment => {
      console.log(hashtagDocment);
      res.send(hashtagDocment);
    })
    .catch(err => console.log(err));
});

router.get("/hashtag/:id", (req, res, next) => {
  console.log("hashtag opened");
  console.log(req.params.id);
  Hashtag.findById(req.params.id)
    .then(hashTagDocument => {
      console.log(hashTagDocument);
      let movies = [];

      for (movie in hashTagDocument.movies) {
        console.log(movie);
        let result = axios.get(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=${tmdbKEY}`
        );
        movies.push(result);
      }

      Promise.all(movies)
        .then(responses => {
          let cleanMovies = [];
          responses.forEach(response => {
            // console.log(response.data);
            cleanMovies.push(response.data);
          });
          res.render("hashtag", {
            hashtag: hashTagDocument,
            movies: cleanMovies,
            user: req.user
            // user: req.user
          });
        })
        .catch(err => console.log(err));
      // console.log(movies);
    })
    .catch(err => console.log(err));
});

router.post("/hashtag", (req, res, next) => {
  console.log("posted a new hashtag");
  console.log(req.body.newTag);

  Hashtag.create({ tag: "#" + req.body.newTag, movies: {} })
    .then(hashtagDocument => {
      res.send(hashtagDocument);
    })
    .catch(err => console.log(err));
});

router.patch("/hashtag", (req, res, next) => {
  console.log("edited an existing hashtag");
  console.log(req.body);
  console.log(req.query.hashtag);
  Hashtag.updateOne(
    { tag: "#" + req.query.hashtag },
    {
      $push: {
        [`movies.${req.body.movieId}`]: req.user._id
      }
    }
  )
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => console.log(err));
});

// router.patch("/hashtag/vote", (req, res, next) => {
//   console.log("voted an existing hashtag");
//   console.log(req.body);
//   Hashtag.update(
//     { tag: req.query.hashtag },
//     {
//       $push: {
//         [`movies.${req.body.movieId}`]: req.user._id
//       }
//     }
//   )
//     .then(response => {
//       res.send(response);
//     })
//     .catch(err => console.log(err));
// });

router.get("/hashtags", (req, res, next) => {
  console.log("search called");
  console.log(req.query.hashtag);

  let regex = new RegExp(`^#${req.query.hashtag}`);
  Hashtag.find({ tag: { $regex: regex } })
    .then(response => {
      res.render("searchResultsHashtag", {
        hashtagResults: response,
        user: req.user
      });
      console.log(response);
    })
    .catch(err => console.log(err));
});

module.exports = router;
