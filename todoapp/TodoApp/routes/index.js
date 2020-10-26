var express = require('express');
var router = express.Router();


var passport = require('passport');//追加
router.use(passport.initialize());//追加
LocalStrategy = require('passport-local').Strategy;//追加
var flash = require('connect-flash');//追加
router.use(flash());//追加
router.use(passport.session());//追加


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


/* GET home page. */
router.get('/', function (req, res, next) {
  if(req.session.username){
  res.render("index.ejs");
  }else{
    res.redirect("signin");
  }
});


router.post('/', function (req, res, next) { //フォーム情報をデータベースへ追加。
  var title = req.body.title;
  var content = req.body.content;
  knex.insert({ title, content: title, content })
    .into('task')
    .then(function (rows) {
      console.log(rows[0]);
    })
    .catch(function (error) {
      console.error(error)
    });
  res.redirect('/');
});


router.get('/todo', function(req, res, next) {
  if(req.session.username){
  knex
  .select()
  .from('task')
  .then(function(rows) {
    res.render("todo",{title: "TODOアプリ",taskList: rows})
    console.log(rows);
  })
  .catch(function(error) {
    console.error(error)
  });
}else{
  res.redirect("signin");
}
});



router.post('/todo', function (req, res, next) {
  var id = req.body.id;
  //var query = DELETE FROM task WHERE id=?;
  knex('task')
  .where('id',id)
  .del()
  .then(function(rows){
    console.log(rows);
    res.redirect('/todo');
  })
  .catch(function(error) {
    console.error(error)
  });
  //connection.query(query, function (error, results, fields) {
  //if (error) throw error;
  //});
  //res.redirect('/todo');
});




router.get("/logout", function(req, res, next) {
  req.session.destroy(function(err) {
    if(err) {
        console.log(err);
    } else {
       res.redirect("signin");
    }
});    
});


module.exports = router;
