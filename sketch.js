// GAY WITCHCRAFT BY TOMMY TING //

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;                             // for incoming serial data 

// sprites
var body1, body2, body3, body4, body5, gem, stonehenge1, stonehenge2, stonehenge3, stonehenge4, stonehenge5, stonehenge6, stonehenge7, eye;
      

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  //create the sprites
  gem = createSprite(600, 200);
  gem.addImage("normal", loadImage("assets/gem.png"));
  gem.addImage("eye", loadImage("assets/eye01.png"));
  
  stonehenge1 = createSprite(300, 150);
  stonehenge1.addImage(loadImage("assets/stonehenge01.png"))
  
  stonehenge2 = createSprite(550, 100);
  stonehenge2.addImage(loadImage("assets/stonehenge02.png"))
  
  stonehenge3 = createSprite(800, 120);
  stonehenge3.addImage(loadImage("assets/stonehenge03.png"))
  
  stonehenge4 = createSprite(1050, 250);
  stonehenge4.addImage(loadImage("assets/stonehenge04.png"))
  
  stonehenge5 = createSprite(480, 300);
  stonehenge5.addImage(loadImage("assets/stonehenge06.png"))
  
  stonehenge6 = createSprite(750, 350);
  stonehenge6.addImage(loadImage("assets/stonehenge05.png"))
  
  stonehenge7 = createSprite(300, 420);
  stonehenge7.addImage(loadImage("assets/stonehenge07.png"))
  
  body1 = createSprite(100, 370);
  body1.addImage("normal", loadImage("assets/body01.png"));
  body1.addImage("poppers", loadImage("assets/poppers.png"));
  
  body2 = createSprite(900, 450);
  body2.addImage("normal", loadImage("assets/body02.png"));
  body2.addImage("jockstrap", loadImage("assets/jockstrap.png"));
  
  body3 = createSprite(600, 450);
  body3.addImage("normal", loadImage("assets/body03.png"));
  body3.addImage("collar", loadImage("assets/collar.png"));
  
  body4 = createSprite(650, 500);
  body4.addImage("normal", loadImage("assets/body04.png"));
  body4.addImage("truvada", loadImage("assets/truvada.png"));
  
  body5 = createSprite(1150, 400);
  body5.addImage("normal", loadImage("assets/body05.png"));
  body5.addImage("jockstrap", loadImage("assets/jockstrap.png"));

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
  
var gemX = map(inData, 0, 255, 0, width); //set the var so the data from arduino is used to control the x-axis, set to the whole width of canvas

  background(255,182,193);  //background colour is pink
  console.log(gemX); //to see if the potentiometer is reading
  
  //use the potentiometer to control the x-axis of the gem while the mouse controls the y
  gem.position.x = mouseX;
  gem.position.y = mouseY;
  
  //set the sprites to change animation when on top of another
 
  if(body1.overlap(stonehenge4))
    body1.changeAnimation("poppers");
  else
    body1.changeAnimation("normal");
  
   if(body2.overlap(stonehenge1))
    body2.changeAnimation("jockstrap");
  else
    body2.changeAnimation("normal");
  
  if(body3.overlap(stonehenge2))
    body3.changeAnimation("collar");
  else
    body3.changeAnimation("normal");
  
  if(body4.overlap(stonehenge3))
    body4.changeAnimation("truvada");
  else
    body4.changeAnimation("normal");
  
  if(body5.overlap(stonehenge5))
    body5.changeAnimation("jockstrap");
  else
    body5.changeAnimation("normal");
  
//when all objects overlap then load image of dionysus
if ((body1.overlap(stonehenge4)) && (body2.overlap(stonehenge1)) && (body3.overlap(stonehenge2)) && (body4.overlap(stonehenge3)) && (body5.overlap(stonehenge5)))
    {
    dionysus = createSprite(500,500);
  dionysus.addImage(loadImage("assets/dionysus.png"));    
    }
                                                                                 
  //  displacer so gem can move the bodies around
  gem.displace(body1);
  gem.displace(body2);
  gem.displace(body3);
  gem.displace(body4);
  gem.displace(body5);
  
  //draw the sprites
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
  
