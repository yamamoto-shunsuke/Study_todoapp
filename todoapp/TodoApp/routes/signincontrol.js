var passport = require("passport");
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

passport.serializeUser((username, done) => {
  done(null, username);
});



passport.deserializeUser((username, done) => {
  //knex記述処理
  //SQL文：select * from user where username = username;
  knex(user)
      .where({ username: username})
      .then((user) => {
        done(null, user);
      }).catch((error) => {
        done(error);
      }).then(() => {
        client.close();
    });
 });

passport.use("local-strategy",
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  }, (req, username, password, done) => {

    //knex記述処理
    //SQL文：select * from user where username = username, password = password;
    knex(user)
      .where({ username, password: username, password })
      .then((user) => {
        if (user) {
          req.session.regenerate((error) => {
            if (error) {
              done(error);
            } else {
              done(null, user.username);
            }
          });
        } else {
          done(null, false, req.flash("message", "ユーザー名 または パスワード が間違っています。"));
        }
      }).catch((error) => {
        done(error);
      }).then(() => {
        client.close();
      });
    })
);

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
  authorize
};