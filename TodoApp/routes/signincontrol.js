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
  //knex記述処理
  //SQL文：select * from user where username = username;
  // knex("user")
  //     .where({ username: username})
  //     //.then((user) => {
  //     .then(function(rows) {
  //       if(rows.length != 0){
  //       done(null, username);
  //       }
  //     }).catch((error) => {
  //       done(error);
  //     // }).then(() => {
  //     //   client.close();
  //   });
});

passport.use("local-strategy",
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  }, (req, username, password, done) => {

    //knex記述処理
    //SQL文：select * from user where username = username, password = password;
    knex("user")
      .where({ username: username})
      .then(async function (rows) {
        console.log(password);
        console.log(rows[0].password);
        const comparedPassword = await bcrypt.compare(password, rows[0].password);
        console.log(comparedPassword);
        if (comparedPassword) {
          req.session.username = username;
          done(null, username);
          // req.session.regenerate((err) => {
          //   req.session.username = username;
          // });
        } else {
          done(null, false, req.flash("message", "ユーザー名 または パスワード が間違っています。"));
        }
      });
  }));


// .then((user) => {
//   if (user) {
//     req.session.regenerate((error) => {
//       if (error) {
//         done(error);
//       } else {
//         done(null, user.username);
//       }
//     });
//   } else {
//     done(null, false, req.flash("message", "ユーザー名 または パスワード が間違っています。"));
//   }
// }).catch((error) => {
//   done(error);
// }).then(() => {
//   console.log(user);
//   client.close();
// });


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