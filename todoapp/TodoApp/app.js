var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var boards = require('./routes/boards');
var signupRouter = require('./routes/signup'); // 追加
var signinRouter = require('./routes/signin');　// 追加
var passport = require('passport'); // 追記
var session = require('express-session');//追加


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
//app.use(passport.initialize());//追加

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/todo', todoRouter);
//app.use('/boards', boards);
app.use('/signup', signupRouter); // 追加
app.use('/signin', signinRouter); // 追加
// app.use(express.static('public'));// 追加
// app.use(express.bodyParser());// 追加
// app.use(express.session({ secret: 'keyboard cat' }));// 追加
 app.use(passport.initialize());// 追加
app.use(passport.session());// 追加
// app.use(app.router);// 追加

// ルーティングの設定
// app.use("/", require("./router.js"));
// app.use("/todo", require("./router.js"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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
