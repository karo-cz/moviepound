const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET request to index.js made");
  res.render("index");
});

module.exports = router;
