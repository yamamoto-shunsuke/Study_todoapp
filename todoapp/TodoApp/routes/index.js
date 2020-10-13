var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection'); // 追加

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
    //res.render("index.ejs");
});


router.post('/', function(req, res, next) { //フォーム情報をデータベースへ追加。
  var title = req.body.title;
  var content = req.body.content;
  var query = 'INSERT INTO task (title, content) VALUES ("' + title + '", ' + '"' + content + '")';
  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

// router.get('/todo', function(req, res, next) {
//   res.render('todo', { title: 'Express' });
//   res.render("todo.ejs");
// });

router.get('/todo', function(req, res, next) {
  var query = 'SELECT * FROM task';
  connection.query(query, function(err, rows) {
    res.render('todo', {
      title: 'Todoアプリ',
      taskList: rows
    });
  });
});

router.post('/todo', function(req, res, next) {
  const id = req.body.id;
  connection.query('DELETE FROM task WHERE id=?', id, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/todo');
  });
});

// router.post('/delete', function(req, res, next) {
//   const id = req.body.id;
//   connection.query('DELETE FROM  WHERE id=?', id, function (error, results, fields) {
//     if (error) throw error;
//     res.redirect('/todo');
//   });
// });

module.exports = router;
