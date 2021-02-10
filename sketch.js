var balloonAnimation,balloonImage;
var balloon;
var database;
var backImage;
var position;
function preload(){
  balloonAnimation = loadAnimation("images/Hot Air Ballon-02.png",
  "images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
  backImage = loadImage("images/Hot Air Ballon-01.png");

  balloonImage = loadAnimation("images/Hot Air Ballon-02.png");
}

function setup() {
  createCanvas(1200,800);
  balloon = createSprite(250,650);
  balloon.addAnimation("notMoving",balloonImage);
  balloon.addAnimation("moving",balloonAnimation);
  balloon.scale=0.5;

  database = firebase.database();

  var balloonPosRef = database.ref('balloon/position');
  balloonPosRef.on("value", readPosition, showError);


 
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
 // console.log( "x : " + position.x + "  y : " + position.y);
}

function showError(){
  console.log("Error while reading the data");
}

function draw() {
  background(backImage);  

  textSize(20);
  text("**Use Arrow keys to move Hot Air Balloon!",50,50);

  if(position!=undefined){
    if(keyDown("left")){
      balloon.changeAnimation("moving",balloonAnimation);
      changePosition(-5,0);
    }
    else if(keyDown("right")){
      balloon.changeAnimation("moving",balloonAnimation);
      changePosition(5,0);
    }
    else if(keyDown("up")){
      balloon.changeAnimation("moving",balloonAnimation);
      balloon.scale = balloon.scale-0.01;
      changePosition(0,-5);
    }
    else if(keyDown("down")){
      balloon.changeAnimation("moving",balloonAnimation);
      balloon.scale = balloon.scale+0.01;
      changePosition(0,5);
    }else{
      balloon.changeAnimation("notMoving",balloonImage);
    }
  }
  drawSprites();
}

function changePosition(x,y){
  var balloonPosRef = database.ref("balloon/position");
  balloonPosRef.set({
    'x' : position.x+x,
    'y' : position.y+y
  })
}