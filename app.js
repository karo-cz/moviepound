require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

const app = express();

mongoose
  .connect("mongodb://localhost/moviepound", { useNewUrlParser: true })
  .then(response => {
    console.log("Connected to the DB! Yay!");
  })
  .catch(err => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(path.join(__dirname, "/views/partials"));

// needs to go to WWW file!!!

const http = require("http");
let server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log("Listening on the Port");
});

// app.get("/", (req, res) => {
//   console.log("GET request to index.js made");
//   res.render("index");
// });

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
