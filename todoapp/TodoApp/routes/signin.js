var express = require('express');
const knexfile = require('../knexfile');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.id) {
    res.redirect('/');
  } else {
    res.render('signin', {
      title: 'ログイン'
    });
  }
});

router.post('/', function(req, res, next) {
  var username = req.body.user;
  var password = req.body.password;
  //var query = 'SELECT user_id FROM users WHERE username = "' + username + '" AND password = "' + password + '" LIMIT 1';
  knex("user")
  .where({username: username,password: password,})
  .limit(1)
  .select("id")
  .then(function(rows) {
    //var userId = rows.length? rows[0].id: false;
    console.log(rows);
    req.session.id = userId;
    res.redirect('/');
  })
  .catch(function(error) {
    console.error(error)
    res.render('signin', {
      title: 'ログイン',
      noUser: 'パスワードが一致するユーザーはいません'
  });
  })
});

module.exports = router;