var PLAY = 1;
var END= 0;
var gameSatate = PLAY;

var trex ,trex_running,trex_collided; 
var ground,invisibleGround,groundImage; 
var cloud, cloudsGroup, cloudImage;

var obstacleGroups, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverimg,Restartimg,gameOver,reiniciar;

var jumpSound, checkPointSound, dieSound;

function preload(){ 
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png"); 
    trex_collided = loadImage("trex_collided.png"); 

    groundImage = loadImage("ground2.png"); 

    cloudImage = loadImage("cloud.png");

    obstacle1=loadImage("obstacle1.png");
    obstacle2=loadImage("obstacle2.png");
    obstacle3=loadImage("obstacle3.png");
    obstacle4=loadImage("obstacle4.png");
    obstacle5=loadImage("obstacle5.png");
    obstacle6=loadImage("obstacle6.png");

    gameOverimg=loadImage("gameOver.png");

    Resartimg=loadImage("resart.png");


    jumpSound=loadSound("jump.mp3");
    checkpointSound=loadSound("checkPoint.mp3");
    dieSound=loadSound("die.mp3");
     
} 

function setup(){ 
    createCanvas(600,200); 
    trex=createSprite(50,160,20,50); 
    trex.addAnimation("running",trex_running); 
    trex.scale=(0.5); 
    ground=createSprite(200,180,400,20); 
    ground.addImage("ground",groundImage); 
    ground.x = ground.width /2; 
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible=false; 

    obstacleGroups=createGroup();
    cloudsGroup=createGroup();

    trex.setcollider("circle", 0,0,40);
    trex.debug=true;

    gameOver=createSprite(150,140,30,50);
    gameOver.addImage(Resartimg);
    gameOver.scale=(0.5);

    reiniciar=createSprite= (130,140,30,50);
    reiniciar.scale= (0.5);
    reiniciar.addImage(gameOverimg);


    var rand = Math.round(random(1,100));
    console.log(rand)

    score= 0;
} 


//crear sprite de Trex 
function draw(){ 
   
    background("228"); 

    text("puntuacion: " + score, 500,50);
    




    
 if ( gameState == PLAY) {
     ground.velocityX = -4;

     score=score+Math.round(frameCount/60);

     if (ground.x < 0) { 
          ground.x = ground.width/2; 
        } 


     if (keyDown("space") && trex.y >=100){ 
          trex.velocityY = -10;

          jumpSound.play();

        }
      trex.velocityY = trex.velocityY + 0.8;


      spawnClouds();
     spawnObstacle();

    }


}

  if(obstacleGroups.isTouching(trex)){
      trex.addImage(trex_collided);
      gameSatate = END;


      dieSound.play();

  
    }


 else if (gameSatate === END){
     ground.velocityX= 0;
     gameOver.visible = true;
     resart.visible = true;

     obstacleGroups.setVelocityXeach(0);
     cloudsGroups.setVelocityXeach(0);

     obstacleGroups.setLifetimeEach(-1);
     cloudsGroups.setLifetimeEach(-1);
    }



 if(score > 0 && score %1400 === 0){
     checkPointSound.play();
     
    }












    
    console.log(trex.y);
    
       
    trex.collide(invisibleGround); {
        
      drawSprites();
    }




    function spawnClouds () { 
        if (frameCount %60 === 0) { 
            cloud = createSprite(600,300,40,10); 
            cloud.addImage(cloudImage); 
            cloud.y = Math.round(random(10,100)); 
            cloud.scale = 0.5; 
            cloud.velocityX= -3; 

            cloud.lifetime = 200;


            cloud.depth = trex.depth;
            trex.depth = trex.depth + 1;


            cloudsGroup.add(cloud);
            
        } 

    }
    function spawnObstacle () {
        if (frameCount % 60 === 0)
        {
            var obstacle = createSprite(465,165,10,40);
            obstacle.velocityX = -6;


            var rand= Math.round(random(1,6));
            switch (rand){
                case 1: obstacle.addImage (obstacle1);
                            break;
                case 2: obstacle.addImage (obstacle2);
                         break;
                case 3: obstacle.addImage (obstacle3);
                         break;
                case 4: obstacle.addImage (obstacle4);
                         break;
                case 5: obstacle.addImage (obstacle5);
                         break;
                case 6: obstacle.addImage (obstacle6);
                         break;

                default: break;   
            }

            obstacle.scale= 0.5;


            obstacleGroups.add(obstacle);
         
        }
    }