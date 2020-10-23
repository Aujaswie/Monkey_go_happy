var monkey, monkey_img;
var ground, invisibleGround;

var stoneGroup, stoneImage,stone;
var bananaGroup, banana_img,banana;

var background_1,background_img;

var score;
var PLAY ;
var END ;
var gameState ; 


function preload(){
  
  monkey_img = loadAnimation("M1.png","M2.png","M3.png","M4.png","M5.png","M6.png","M7.png","M8.png","M9.png","M10.png","M11.png");
 
  
  background_img = loadImage("background.jpg");
  
  stoneImage = loadImage("stone.png");
  
  obstacle1 = loadImage("banana.png");
  
  
}

function setup() {
  createCanvas(400, 400);
  
var PLAY = 1;
var END = 0;
var gameState = PLAY;

  background_1 = createSprite(0,400,10,10);
  background_1.addImage("background",background_img);
  
  monkey = createSprite(200,180,100,20);
  monkey.addAnimation("download", monkey_img);
  monkey.scale = 0.5;
  monkey.shapeColor="red";

  ground = createSprite (200,190,400,10);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.visible=false
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;  
}

function draw() {
  background(180);
  
  if(gameState===PLAY){
    
    //adding score to game
  score = score+1
  text("survival time : "+score,150,50);
     
    //making the monkey jump when space key is pressed
  if(keyDown("space")&& monkey.y >= 315) {
    monkey.velocityY = -10;
 }
  //increasing monkey velocity
  monkey.velocityY = monkey.velocityY + 0.8
  
 if (ground.x < 0){
    ground.x = ground.width/2;
  }
 spawnStone();
 spawnBanana();
  
     if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
    
  if(stoneGroup.isTouching(monkey)){
     gameState = END;
     }
  }
  else if(gameState === END) {
   
    //set velcity of each game object to 0
  ground.velocityX = 0;
  monkey.velocityY = 0;
  stoneGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
  stoneGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  
  }


trex.collide(invisibleGround);
drawSprites();
}


function spawnStone() {

 if (frameCount % 60 === 0) {
 stone = createSprite(400,360,40,10);
 stone.y = Math.round(random(80,120));
 //stone.addImage("stone",stone_img);
 stone.scale = 0.5;
 stone.velocityX = -3;
    
     //assign lifetime to the variable
  stone.lifetime = 200;
     
    //add each cloud to the group
   stoneGroup.add(stone);
  }
  
}

function spawnBanana() {
  if(frameCount % 60 === 0) {
   banana = createSprite(600,165,10,40);
   banana.velocityX =-(6+3*score/100)
  
    //assign scale and lifetime to the obstacle           
  banana.scale = 0.5;
  banana.lifetime = 300;
    
  //add each obstacle to the group
  bananaGroup.add(banana);
  }
}
