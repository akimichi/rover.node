"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const config = require('config');
const morgan = require('morgan');
// opencv
const cv = require('opencv');
// const camera = new cv.VideoCapture(0);
const camera = new cv.VideoCapture(0);
// const camera = capture.open("http://rover.local:8080/?action=stream");

const five = require("johnny-five"); // Load the node library that lets us talk JS to the Arduino
const board = new five.Board(); // Connect to the Arduino using that library

// view setting
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
// bowerでインストールされたライブラリーを利用する
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('GET /');
  res.render('index', { 
    title: 'コントローラ',
  });
});

board.on('ready', () => {
  io.on('connection', (client) => {
    camera.read((error, image) => {
      if(image) {
        image.save('/tmp/test.jpg');
      }
      // fs.readFile('test.jpg', 'base64', (err, image) => {
      //   socket.write(image, 'base64', function(){
      //     socket.end();
      //   });
      // });
    });
    let servo = new five.Servo({
      pin: 6,
      range: [0, 180],
      invert: true,
      startAt: 60
    });
    client.on('slider', (data) => {
      var slider = JSON.parse(data);
      var angle = 100 - slider.value;
      servo.to(angle, 500);
    });
  });
});


// 5000番を指定
const port = process.env.PORT || 5000;
http.listen(port);
// app.listen(port);
