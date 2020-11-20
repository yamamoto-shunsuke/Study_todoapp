var express = require('express');
var router = express.Router();
//var connection = require('../mysqlConnection'); // 追加
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



router.get('/', function(req, res, next) {
  res.render('signup', {
    title: '新規会員登録',username: req.session.username
  });
});

router.post('/', async function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword) 
  knex.insert({ username: username, password: password})
    .into('user')
    .then(function (rows) {
      res.redirect('/');
      console.log(rows[0]);
    })
    .catch(function (error) {

      console.error(error)
    });
});



module.exports = router;
