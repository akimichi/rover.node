"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const fs = require('fs');
const exec = require('child_process').exec;
const config = require('config');
const morgan = require('morgan');
// opencv
// const gm = require('gm');
// const gm = require('gm').subClass({imageMagick: true});
const cv = require('opencv');
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
    const takeshot = () => {
      camera.read((error, image) => {
        if(image) {
          var canny = image.copy();
          // image.gaussianBlur([7,7]);
          canny.convertHSVscale() 
          // const lower_hsv_threshold = [40, 70, 70];
          // const upper_hsv_threshold = [80, 200, 200];
          // const lower_hsv_threshold = [29, 86, 6];
          // const upper_hsv_threshold = [64, 255, 255];
          const lower_hsv_threshold = [0.11*256, 0.60*256, 0.20*256];
          const upper_hsv_threshold = [0.14*256, 1.00*256, 1.00*256];
          canny.inRange(lower_hsv_threshold, upper_hsv_threshold)
          var contours = canny.findContours();
          canny.save('./public/data/shot.jpg');
          fs.readFile('./public/data/shot.jpg', (err, buf) => {
            io.emit('shot', { image: true, buffer: buf.toString('base64')});
          });
          // image.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
          //   for (var i=0;i<faces.length; i++){
          //     var x = faces[i]
          //     image.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
          //   }
          //   image.save('./public/data/shot.jpg');
          //   fs.readFile('./public/data/shot.jpg', (err, buf) => {
          //     io.emit('shot', { image: true, buffer: buf.toString('base64')});
          //   });
          // });
        }
      });
    };
    setInterval(takeshot, 500);
    //takeshot();
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
