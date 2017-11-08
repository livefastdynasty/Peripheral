var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;                             // for incoming serial data 
//Moving sprites
var body1, body2, body3, gem, eye1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create the sprites
  gem = createSprite(600, 200);
  gem.addImage("normal", loadImage("assets/gem.png"));
  gem.addImage("eye", loadImage("assets/eye01.png"));
  
  body1 = createSprite(400, 200);
  body1.addImage(loadImage("assets/body01.png"))

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  
var gemX = map(inData, 0, 255, 0, width);

  background(255,255,255);  
  console.log(gemX);
  //aside of setting the velocity directly you can move a sprite
  //by providing a speed and an angle
  
  
  //you can rotate the sprite according the directio it is moving
  //uncomment this
  //circle.rotateToDirection = true;
  
  gem.position.x = gemX;
  gem.position.y = mouseY;
  //since the force keeps incrementing the speed you can 
  //set a limit to it with maxSpeed
 
  if(gem.overlap(body1))
    gem.changeAnimation("eye");
  else
    gem.changeAnimation("normal");
  
  //draw the sprite
  drawSprites();
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  inData = Number(serial.read());
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}
