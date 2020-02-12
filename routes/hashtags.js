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

  Hashtag.create({ tag: req.body.newTag });
});

router.patch("/hashtag", (req, res, next) => {
  console.log("edited an existing hashtag");
});

module.exports = router;
