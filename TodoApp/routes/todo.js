// var express = require('express');
// var router = express.Router();
// //var connection = require('../mysqlConnection'); // 追加
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: '@atomitech12',
//     database: 'todoapp'
//   },
//   useNullAsDefault: true
// });


// router.post('/todo', function (req, res, next) {
//   var id = req.body.id;
//   //var query = DELETE FROM task WHERE id=?;
//   knex('task')
//   .where('id',id)
//   .del()
//   .then(function(rows){
//     console.log(rows);
//     res.redirect('/todo');
//   })
//   .catch(function(error) {
//     console.error(error)
//   });
//   //connection.query(query, function (error, results, fields) {
//   //if (error) throw error;
//   //});
//   //res.redirect('/todo');
// });

// // router.post('/delete', function(req, res, next) {
// //   const id = req.body.id;
// //   connection.query('DELETE FROM  WHERE id=?', id, function (error, results, fields) {
// //     if (error) throw error;
// //     res.redirect('/todo');
// //   });
// // });


// module.exports = router;