// GAY WITCHCRAFT BY TOMMY TING //

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
//var inData;                             // for incoming serial data 
var ardVal = [];  //array that will hold all values coming from arduino
var serialStatus = 0;

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
  body5.addImage("jockstrap", loadImage("assets/urinal.png"));


  serial = new p5.SerialPort();     //create the serial port object
  serial.open("/dev/cu.usbmodem1421"); //open the serialport. determined 
  serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
  serial.on('data',dataReceived);   //when data is received execute the dataReceived function
}
function draw(){
  if (serialStatus == 1){
    
    game();
    
  }
}

function game() {
console.log("0: ", ardVal[0],"1: ", ardVal[1]);
  
var gemX = map(ardVal[0], 0, 1023, 0, width); //set the var so the data from arduino is used to control the x-axis, set to the whole width of canvas
var gemY = map(ardVal[1], 0, 1023, 0, height); //set the var so the data from arduino is used to control the x-axis, set to the whole width of canvas
  
  background(255,182,193);  //background colour is pink
  console.log(gemX); //to see if the potentiometer is reading
  
  //use the 1 potentiometer to control the x-axis of the gem while the other potentiometer controls the y
  gem.position.x = gemX;
  gem.position.y = gemY;
  
  //set the sprites to change animation when overlapped on the correct object
 
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
  
//when all sprites make the correct overlap then load image of Dionysus
if ((body1.overlap(stonehenge4)) && (body2.overlap(stonehenge1)) && (body3.overlap(stonehenge2)) && (body4.overlap(stonehenge3)) && (body5.overlap(stonehenge5)))
    {
  dionysus = createSprite(640,290)
  dionysus.addAnimation("normal", "assets/dionysus01.png", "assets/dionysus02.png", "assets/dionysus03.png");  
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

function dataReceived()   //this function is called every time data is received
{
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    if(rawData.length>1)                      //check that there is something in the string
    {                                         //values received in pairs  index,value
      var incoming = rawData.split(",");      //split the string into components using the comma as a delimiter
      for(var i=0;i<incoming.length;i++)
      {
      ardVal[i]=parseInt(incoming[i]);        //convert the values to ints and put them into the ardVal array
      }
    }
}
 
function ardCon()
{
  console.log("connected to the arduino");
  serialStatus = 1;
}
