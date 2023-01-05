var five = require("johnny-five");

// var board = new five.Board({
// 	port: "/dev/ttyACM0",
// 	// port: "/dev/ttyUSB1",
// 	// port: "/dev/ttyAMA0",
// 	repl: false,
// 	// debug: false,
// })

var board = new five.Board();

board.on("ready", function() {
  console.log("Connected");

  // Initialize the servo
  var servo = new five.Servo({
    address: 0x40,
    controller: "PCA9685",
    pin: 0,
    type: "continuous"
  });

  servo.cw(1)
  this.wait(5000,function(){
    //フルスピードで反時計回りに回転
    servo.ccw(1);
  });
  // Add servo to REPL for live control (optional)
  this.repl.inject({
    servo: servo
  });
});


