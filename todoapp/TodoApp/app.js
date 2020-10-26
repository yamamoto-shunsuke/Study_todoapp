var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup'); // 追加
var signinRouter = require('./routes/signin');　// 追加
var signincontrolRouter = require('./routes/signincontrol');//追加
var passport = require('passport'); // 追記
var session = require('express-session');//追加
var flash = require("connect-flash");//追加
var bodyParser = require("body-parser");//追加
var cookieParser = require("cookie-parser");//追加
var app = express();
var sessionStore = new session.MemoryStore;

//　セッション情報設定 追加部分ここから                                                                                               
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());//追加

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter); // 追加
app.use('/signin', signinRouter); // 追加
app.use(...signincontrolRouter.initialize());//配列をカンマ区切りで割り当て
app.use(bodyParser.json());
app.use(passport.initialize());// 追加
app.use(passport.session());// 追加

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
