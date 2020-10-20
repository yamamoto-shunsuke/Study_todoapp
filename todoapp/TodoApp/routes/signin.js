var express = require('express');
var router = express.Router();
const knexfile = require('../knexfile');
var passport = require('passport');//追加
router.use(passport.initialize());//追加
LocalStrategy = require('passport-local').Strategy;//追加
var flash = require('connect-flash');//追加
router.use(flash());//追加


// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
function(username, password, done) {
  //routerのpassport.authenticate()が呼ばれたらここの処理が走る。

  if(username == 'username' && password == 'password'){
    //ログイン成功
    //今回はここの判定式をハードコーディングにする
        console.log(username);
        return done(null, username);
  }

  //ログイン失敗
  //messageはログイン失敗時のフラッシュメッセージ。
  //各routerの req.flash() で取得できる。
       return done(null, false);
       // ,{message: 'ID or Passwordが間違っています。'}
}
));

router.get('/', function(req, res) {
  res.render('signin', { username : req.body.username }); //userからusenameに変更
  res.render('signin',{ password : res.body.password });//修正
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  })
);


// router.get('/', function(req, res, next) {
//   // if (req.session.id) {
//   //   res.redirect('/');
//   // } else {
//     res.render('signin', {
//       title: 'ログイン'
//     });
//   //}
// });



// router.post('/', function(req, res, next) {
//   var username = req.body.user;
//   var password = req.body.password;
//   //var query = 'SELECT user_id FROM users WHERE username = "' + username + '" AND password = "' + password + '" LIMIT 1';
//   knex("user")
//   .where({username: username,password: password,})
//   .limit(1)
//   .select("id")
//   .then(function(rows) {
//     //var userId = rows.length? rows[0].id: false;
//     console.log(rows);
//     req.session.id = userId;
//     res.redirect('/');
//   })
//   .catch(function(error) {
//     console.error(error)
//     res.render('signin', {
//       title: 'ログイン',
//       noUser: 'パスワードが一致するユーザーはいません'
//   });
//   })
// });

module.exports = router;