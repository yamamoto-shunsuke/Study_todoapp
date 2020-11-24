var express = require('express');
var router = express.Router();
var passport = require('passport');
router.use(passport.initialize());
LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
router.use(flash());
router.use(passport.session());


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


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.username) {
    res.render("index", { username: req.session.username });
  } else {
    res.render("signin", { message: req.flash("message"), username: req.session.username });
  }
});

router.post('/', function (req, res, next) { 
  var title = req.body.title;
  var content = req.body.content;
  knex.insert({ title: title, content: content, user_id: req.session.user_id })
    .into('task')
    .then(function (rows) {
      console.log(rows);
    })
    .catch(function (error) {
      console.error(error)
    });
  res.redirect('/');
});

/*get処理はuserテーブルのidとtaskテーブルのuser_idをinnerjoinで内部結合で一致した情報を取り出す形にする。*/
router.get('/todo', function (req, res, next) {
  if (req.session.username) {
    knex
      .from('user')
      .innerJoin('task', 'user.id', 'task.user_id')
      .then(function (rows) {
        res.render("todo", { title: "TODOアプリ", taskList: rows, username: req.session.username, user_id: req.session.user_id })
      })
      .catch(function (error) {
        console.error(error)
      });
  } else {
    res.redirect("signin", { username: req.session.username });
  }
});



router.post('/todo', function (req, res, next) {
  var id = req.body.id;
  //var query = DELETE FROM task WHERE id=?;
  knex('task')
    .where('id', id)
    .del()
    .then(function (rows) {
      console.log(rows);
      res.redirect('/todo');
    })
    .catch(function (error) {
      console.error(error)
    });
});




router.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});


module.exports = router;
