var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // 追加

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var boards = require('./routes/boards');
var signup = require('./routes/signup'); // 追加
var signin = require('./routes/signin');　// 追加

//var todoRouter = require('./routes/todo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/todo', todoRouter);
//app.use('/boards', boards);
app.use('/signup', signup); // 追加
app.use('/signin', signin); // 追加

// ルーティングの設定
// app.use("/", require("./router.js"));
// app.use("/todo", require("./router.js"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// サーバー起動
//app.listen(3000);
