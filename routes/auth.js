const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

router.get("/login", (req, res, next) => {
  res.render("login.hbs", { errorMessage: req.flash("error") });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  req.redirect("/");
});

const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    res.render("signup.hbs", {
      errorMessage: "Please provide username"
    });
    return;
  }

  if (password.length < 8) {
    res.render("signup.hbs", {
      errorMessage: "Password needs to be at least 8 characters long"
    });
    return;
  }

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.render("signup.hbs", {
          errorMessage: "Username already taken"
        });
        return;
      }

      bcrypt
        .hash(password, 10)
        .then(hash => {
          return User.create({ username: username, password: hash });
        })
        .then(createdUser => {
          req.login(createdUser, err => {
            if (err) {
              next(err);
              return;
            }
            res.redirect("/");
          });
        });
    })
    .catch(err => {
      next(err);
    });
});
