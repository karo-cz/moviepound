require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost/moviepound", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(response => {
    console.log("Connected to the DB! Yay!");
  })
  .catch(err => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(path.join(__dirname, "/views/partials"));

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

const User = require("./models/User");

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(userDocument => {
      done(null, userDocument);
    })
    .catch(err => {
      done(err);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then(userDocument => {
        if (!userDocument) {
          done(null, false, { message: "Incorrect credentials" });
          return;
        }
        bcrypt.compare(password, userDocument.password).then(match => {
          if (!match) {
            done(null, false, { message: "Incorrect credentials" });
            return;
          }
          done(null, userDocument);
        });
      })
      .catch(err => {
        done(err);
      });
  })
);

// needs to go to WWW file!!!

// const http = require("http");
// let server = http.createServer(app);
// server.listen(process.env.PORT, () => {
//   console.log("Listening on the Port");
// });

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const hashtag = require("./routes/hashtags");
app.use("/", hashtag);

module.exports = app;
