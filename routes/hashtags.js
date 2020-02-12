const express = require("express");
const router = express.Router();
const Hashtag = require("../models/Hashtag");

router.get("/hashtag", (req, res, next) => {
  //   console.log("Query to hashtags made");
  //   console.log(req.query.hashtag);
  let regex = new RegExp(`^${req.query.hashtag}`);
  console.log(regex);

  Hashtag.find({ tag: { $regex: regex } })
    .then(hashtagDocment => {
      //   console.log(hashtagDocment);
      res.send(hashtagDocment);
    })
    .catch(err => console.log(err));
});

router.post("/hashtag", (req, res, next) => {
  console.log("posted a new hashtag");
  console.log(req.body.newTag);

  Hashtag.create({ tag: req.body.newTag })
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
    { tag: req.query.hashtag },
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

module.exports = router;
