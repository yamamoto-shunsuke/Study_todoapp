var passport = require("passport");
var express = require('express');
var router = express.Router();
var LocalStrategy = require("passport-local").Strategy;
var initialize, authenticate, authorize;
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todoapp'
  },
  useNullAsDefault: true
});
const bcrypt = require("bcrypt");

passport.serializeUser((username, done) => {
  done(null, username);
});



passport.deserializeUser((username, done) => {
  done(null, username);
});

passport.use("local-strategy",
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  }, (req, username, password, done) => {

    knex("user")
      .where({ username: username })
      .then(async function (rows) {
        req.session.user_id = rows[0].id;
        const comparedPassword = await bcrypt.compare(password, rows[0].password);
        if (comparedPassword) {
          req.session.username = username;
          done(null, username);
        } else {
          done(null, false, req.flash("message", "ユーザー名 または パスワード が間違っています。"));
        }
      });
  }));



initialize = function () {
  return [
    passport.initialize(),
    passport.session()
  ];
};

authenticate = function () {
  return passport.authenticate(
    "local-strategy", {
    successRedirect: "/",
    failureRedirect: "/signin"
  }
  );
};

module.exports = {
  initialize,
  authenticate,
  authorize,
  router
};