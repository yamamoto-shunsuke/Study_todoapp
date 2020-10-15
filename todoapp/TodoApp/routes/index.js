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


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  //res.render("index.ejs");
});


router.post('/', function (req, res, next) { //フォーム情報をデータベースへ追加。
  var title = req.body.title;
  var content = req.body.content;
  //var query = 'INSERT INTO task (title, content) VALUES ("' + title + '", ' + '"' + content + '")';
  //var query = knex('task').returning('id').insert(title,content);
  //var query = knex('task').returning('id').insert({title: 'title',content: 'content'});
  knex.insert({ title, content: title, content })
    .into('task')
    .then(function (rows) {
      console.log(rows[0]);
    })
    .catch(function (error) {
      console.error(error)
    });
  // , {content: 'test'}
  //knex.insert([{title: 'title'}, {content: 'content'}], ['id']).into('task');
  //returning('id')
  //connection.query(query, function(err, rows) {
  res.redirect('/');
  //});
});

// router.get('/todo', function(req, res, next) {
//   res.render('todo', { title: 'Express' });
//   res.render("todo.ejs");
// });

//insertの時と同じように.thenと.catchを書き、.then内に正常処理 (DBから取得した結果をres.renderで渡す) を書いてください。
router.get('/todo', function(req, res, next) {
  knex
  .select()
  .from('task')
  //.then(res.render('todo', function(rows) {
  .then(function(rows) {
    res.render("todo",{title: "TODOアプリ",taskList: rows})
    console.log(rows);
    // title: "TODOアプリ"
    // taskList: rows
  })
  .catch(function(error) {
    console.error(error)
  });
});
  
  // res.render("todo", {title: 'title',content: 'content'});
  //var query = 'SELECT * FROM task';
  //res.render("todo",knex.select('*').from('task'));
  //var query = knex.select('*').from('task') //.catch(function(error) {console.error(error)});
  //connection.knex(query, function(err, rows) {
  //connection.query(query,function(err, rows) {
  //res.render("todo");
  // res.render("todo", function (err, rows) {
    // title: 'Todoアプリ'
    // taskList: rows
    // console.log();
  //});


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

// router.post('/delete', function(req, res, next) {
//   const id = req.body.id;
//   connection.query('DELETE FROM  WHERE id=?', id, function (error, results, fields) {
//     if (error) throw error;
//     res.redirect('/todo');
//   });
// });
// router.post('/todo', function (req, res, next) {

// });

// router.get('/', function(req, res, next) {
//   res.render('register', {
//     title: '新規会員登録'
//   });
// });

// router.post('/', function(req, res, next) {
//   var userName = req.body.username;
//   var password = req.body.password;
//   knex.insert({ username, password: username, password })
//     .into('user')
//     .then(function (rows) {
//       res.redirect('/login');
//       console.log(rows[0]);
//     })
//     .catch(function (error) {
//       console.error(error)
//     });
// });



module.exports = router;
