"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const config = require('config');
const morgan = require('morgan');

const five = require("johnny-five"); // Load the node library that lets us talk JS to the Arduino
const board = new five.Board(); // Connect to the Arduino using that library

// view setting
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('GET /');
  res.render('index', { 
    title: 'コントローラ',
  });
});
//
// 5000番を指定
const port = process.env.PORT || 5000;
http.listen(port);
// app.listen(port);
