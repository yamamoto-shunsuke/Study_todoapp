var express = require('express');
var router = express.Router();
//var connection = require('../mysqlConnection'); // 追加
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '@atomitech12',
    database: 'todoapp'
  },
  useNullAsDefault: true
});



router.get('/', function(req, res, next) {
  res.render('register', {
    title: '新規会員登録'
  });
});

router.post('/', function(req, res, next) {
  var userName = req.body.username;
  var password = req.body.password;
  knex.insert({ username, password: username, password })
    .into('user')
    .then(function (rows) {
      res.redirect('/login');
      console.log(rows[0]);
    })
    .catch(function (error) {
      console.error(error)
    });
});



module.exports = router;
