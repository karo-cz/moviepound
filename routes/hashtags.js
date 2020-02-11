const express = require("express");
const router = express.Router();
const Hashtag = require("../models/Hashtag");

router.get("/hashtag/search", (req, res, next) => {
  console.log("Query to hashtags made");
  console.log(req.query.hashtag);

  Hashtag.find({ tag: req.query.hashtag })
    .then(hashtagDocment => {
      console.log(hashtagDocment);
    })
    .catch(err => console.log(err));
});

module.exports = router;
