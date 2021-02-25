var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImage,restart,restartImage

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  img=loadImage("bacground.jpg")
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud-1.png");
  restartImage= loadImage("restartGame.png")
  gameOverImage= loadImage("gameOver-1.png")
  obstacle1 = loadImage("cactus.png");
  obstacle2 = loadImage("catus.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  bg=createSprite(250,50)
  bg.addImage(img)
  bg.scale=0.8
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
  trex.setCollider("circle",0,0,40)
  //trex.debug=true
  
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.2
  restart=createSprite(300,150)
  restart.addImage(restartImage)
  restart.scale=0.04
}

function draw() {
  background(180);
 
 console.log(gameState)
  
  if(gameState === PLAY){ 
    //move the ground
    ground.velocityX = -(4+score/100);
    gameOver.visible=false;
    restart.visible=false;
    score = score + Math.round(getFrameRate()/50); 
      if (ground.x < 0){
      ground.x = ground.width/2;
   
    }
    if(score%100===0&&score>0) {
      checkPointSound.play()
    }
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -13;
      jumpSound.play()
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState=END
      dieSound.play()
       //trex.velocityY = -13;
      //jumpSound.play()
    }
    }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.velocityY=0;
    gameOver.visible=true;
    restart.visible=true;
    trex.changeAnimation("collided",trex_collided)
    
    if(mousePressedOver(restart)){
      reset()
    }
    
  }
  
 
  
  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  
  //spawn obstacles on the ground
  
  
  drawSprites(); 
  textSize(20)
  fill("black")
  text("Score: "+ score, 470,70);
   
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
        obstacle.scale=0.065 
              break;
      case 2: obstacle.addImage(obstacle2);
        obstacle.scale=0.015
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}

  function reset(){
    gameState=PLAY
    gameOver.visible=false
    restart.visible=false
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running",trex_running)
    score=0
    
  }


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.08;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 180;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}