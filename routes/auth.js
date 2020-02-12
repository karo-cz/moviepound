const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/signup", (req, res, next) => {
  console.log("Rendering Signup");
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  console.log("Rendering Login");
  res.render("auth/login", { message: req.flash("error") });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
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
  console.log(req.body);
  const { username, password } = req.body;

  if (!username) {
<<<<<<< HEAD
    res.render("signup", {
=======
    console.log("username missing");
    res.render("auth/signup", {
>>>>>>> bc3adc251de12990cd1b670274454cfae63166f1
      message: "Please provide username"
    });
    return;
  }

  if (password.length < 8) {
<<<<<<< HEAD
    res.render("signup", {
=======
    console.log("password not strong enough");
    res.render("auth/signup", {
>>>>>>> bc3adc251de12990cd1b670274454cfae63166f1
      message: "Password needs to be at least 8 characters long"
    });
    return;
  }

  User.findOne({ username: username })
    .then(user => {
      if (user) {
<<<<<<< HEAD
        res.render("signup", {
=======
        res.render("auth/signup", {
>>>>>>> bc3adc251de12990cd1b670274454cfae63166f1
          message: "Username already taken"
        });
        return;
      }

      bcrypt
        .hash(password, 10)
        .then(hash => {
          return User.create({
            username: username,
            password: hash,
            role: "user"
          });
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

module.exports = router;
