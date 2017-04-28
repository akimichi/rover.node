var five = require("johnny-five");
// var board = new five.Board();
var board = new five.Board({
	port: "/dev/ttyACM0",
	// port: "/dev/ttyUSB1",
	// port: "/dev/ttyAMA0",
	repl: false,
	// debug: false,
})
/* var board = new five.Board({ */
/*     port: new SerialPort("/dev/ttyACM1", { */
/*         baudrate: 9600, */
/*         buffersize: 1 */
/*     }) */
/* }); */

board.on("ready", function() {
  var lcd = new five.LCD({ 
    pins: [12, 11, 5, 4, 3, 2],
    // backlight: 13,
    rows: 2,
    cols: 16
  });
  lcd.clear();
  lcd.print("hello");
  // lcd.cursor(0, 0).print("hello :heart:");
  lcd.blink();
  // lcd.cursor(1, 0).print("Blinking? ");
});
