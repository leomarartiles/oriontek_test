var app = require('express')();

var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var validator = require('express-validator');
const dotenv = require('dotenv').config();

const APP_port = process.env.PORT || 4000;
// import controller
// var AuthController = require('./controllers/AuthController');
var ApiServices = require('./controllers/APIServicesController');

// import Router file
var pageRouter = require('./routers/route');

var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var i18n = require("i18n-express");
app.use(bodyParser.json());
var urlencodeParser = bodyParser.urlencoded({ extended: true });

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 1200000
  }
}));

app.use(session({ resave: true, saveUninitialized: true, secret: 'nodedemo' }));
app.use(flash());
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["es"],
  textsVarName: 'translation',
  defaultLang:"es",
  browserEnable:false
}));

app.use('/public', express.static('public'));

app.get('/layouts/', function (req, res) {
  res.render('view');
});

// apply controller
ApiServices(app);

//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
// const fa = require('./public/assets/libs/@fullcalendar/core/locales/fa');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Define All Route 
pageRouter(app);

app.get('/', function (req, res) {
  res.redirect('/');
});

http.listen(APP_port, function () {
  console.log(`listening on http://localhost:${APP_port}`);
});
