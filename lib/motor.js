var five = require("johnny-five");
var board = new five.Board({
	port: "/dev/ttyACM0",
	// port: "/dev/ttyUSB1",
	// port: "/dev/ttyAMA0",
	repl: false,
	// debug: false,
})


board.on("ready", function() {
  var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;
  // var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  var motorL = new five.Motor(configs.A);
  var motorR = new five.Motor(configs.B);

  // Start the motor at maximum speed
  // motorR.start(100);
  // motorL.start(100);
  motorR.stop();
  motorL.stop();

});


