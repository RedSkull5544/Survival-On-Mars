var PLAY = 1;
var END = 0;
var gameState = PLAY;
var runner,runnerImg;
var enviornment,enviornmentImg;
var land;
var alien,alienImg,alienGroup;
var minigun,minigunImg,laser,laserGroup;
var key,keyImg,keyGroup;
var sphere,sphereImg,sphereGroup;
var points1,point2,point3,point4,point5;
var score;

function preload(){
enviornmentImg=loadImage("my running game.jpg" );
runnerImg=loadImage("Helicopter.png");
alienImg=loadImage("Spaceship for WHJ.png");
minigunImg=loadImage("Minigun.png");
keyImg=loadImage("Key Gold new.png");
points1Img=loadImage("key Gold new.png");
points2Img=loadImage("key Gold new.png");
points3Img=loadImage("key Gold new.png");
points4Img=loadImage("key Gold new.png");
points5Img=loadImage("key Gold new.png");
}

function setup() {
  createCanvas(570,200);
 enviornment=createSprite(285,100);
 enviornment.addImage("my enviornment",enviornmentImg); 
 enviornment.velocityX=-1;
 
 land=createSprite(285,190,600,45);
 land.debug=true;
 land.visible=false;
  
 runner=createSprite(45,135);
 runner.addImage("my runner",runnerImg);
 runner.scale=0.029;
 runner.setCollider("rectangle",0,0,runner.width,runner.height); 
 runner.debug=true;
  
 minigun=createSprite(50,135);
 minigun.addImage("blaster",minigunImg);
 minigun.scale=0.07;
 minigun.debug=true;
 
  
  
  
 alienGroup=new Group();
 sphereGroup=new Group();
 keyGroup=new Group();
 laserGroup=new Group(); 
  
 score=0;
}

function draw(){
  background(0);
  
  keyGroup.collide(land);
  
  if(gameState===PLAY){
    
    runner.y=World.mouseY;
    
    minigun.y=runner.y+15;
    
    text("Score: "+ score, 10,50);
    
    if(enviornment.x < 200){
      enviornment.x = enviornment.width /2;
      }
    
    if(runner.isTouching(land)){
      runner.X=45;
      runner.Y=155;
    }
    
    if(keyDown("space")){
      minigun.visible=true;
      createlaser();
    }
    else{
      minigun.visible=false;
    }
    
    if(alienGroup.isTouching(runner)){
      gameState=END;
      console.log("knor");
    }
    
    if(laserGroup.isTouching(alienGroup)){
      alienGroup.destroyEach();
      laserGroup.destroyEach();
      console.log("only");
    }
    
    if(keyGroup.isTouching(runner)){
      keyGroup.destroyEach();
    }
  
   UFOspawn();
   createKey();
     
  }
  else if(gameState===END){
    enviornment.velocityX = 0;
    alienGroup.setVelocityEach(0,0);
    alienGroup.setLifetimeEach(-1);
    keyGroup.setVelocityEach(0,0);
    keyGroup.setLifetimeEach(-1);
    //console.log("gameEnd");
  }
  
  
  drawSprites();
}                      

function UFOspawn (){
 if (frameCount % 100 === 0) {
   console.log("whynot")
    alien=createSprite(550,135);
    alien.y = Math.round(random(10,120));
    alien.addImage("gamerAlien",alienImg);
    alien.scale=0.03;
    alien.debug=true;
    alien.setCollider("rectangle",0,0,alien.width,alien.width);
    alien.velocityX=-2;

    alien.lifetime = 610;

    alienGroup.add(alien);
  }
} 

function createlaser() {
  var laser= createSprite(100, 100, 10, 2 );
  laser.shapeColor="red";
  laser.x = 135;
  laser.y=minigun.y;
  laser.velocityX = 4;
  laser.lifetime = 100;
  laserGroup.add(laser);
  return laser;
  
}

function createKey(){
  if (frameCount % 600 === 0) {
   console.log("whyme")
    var key=createSprite(550,135);
    key.y = Math.round(random(0,2));
    key.debug=true;
    key.addImage("key",keyImg);
    key.scale=0.03;
    key.velocityX=-2;

    key.lifetime = 610;

    keyGroup.add(key);
  }
}

function reset(){
  
}