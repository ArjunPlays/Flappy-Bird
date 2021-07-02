var bg, bg_image;
var fg, fg_image;
var bird, bird_image;
var pipe1, pipeTop_image;
var pipe2, pipeBot_image;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r_img;


function preload(){
 bg_image = loadImage("bg.png") 
 fg_image =loadImage("fg.png")
 bird_image = loadImage("bird.png")
pipeTop_image = loadImage("pipeNorth.png")
pipeBot_image = loadImage("pipeSouth.png")
r_img = loadImage("restart.png")


}
function setup() {
  createCanvas(288,512);
  
  bg = createSprite(150,250,10,10)
  bg.addImage(bg_image);

  fg = createSprite(150,480,288,50)
  fg.addImage(fg_image);

  bird = createSprite(20,256,15,15)
  bird.addImage(bird_image);

  pipe1Group = new Group();
  pipe2Group = new Group();

  score = 0;

  restart = createSprite(170,250,10,10)
  restart.addImage(r_img);
  restart.visible = false;
  restart.scale = 0.3;

}

function draw() {
  background("green");

  

  if(gameState === PLAY){
    fg.velocityX = -1;

    if(fg.x < 140){

      fg.x = fg.width/2;
    }
  
     if(keyDown("space")){
  bird.y = bird.y -20;
  }
  else{
    bird.velocityY = 4;
  } 
  if(bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
    gameState = END;
  }
  if(bird.isTouching(fg)){
    gameState = END;
  }
  if(frameCount % 80 === 0){
    score = score+1;
  }
  
}
else if(gameState  === END){
fg.velocityX = 0;
bird.visible = false;
bird.x = 20;
bird.y = 256;
pipe1Group.setVelocityXEach(0);
pipe2Group.setVelocityXEach(0);
pipe1Group.setLifetimeEach(-1);
pipe2Group.setLifetimeEach(-1);
restart.visible = true;
}
 
if(mousePressedOver(restart)){
  reset();
}



  
  
  movePipe();
    drawSprites();
  text("score:" + score,150,500)
  
  }


  function movePipe(){
if(frameCount % 80 === 0){
pipe1 = createSprite(130,0,15,20);
pipe1.addImage(pipeTop_image);
pipe1.velocityX = -2;
pipe1.y = random(0,30);
pipe1Group.add(pipe1);

pipe2 = createSprite(130,512,15,20);
pipe2.addImage(pipeBot_image);
pipe2.velocityX = -2;
pipe2.y = random(450,512);
pipe2Group.add(pipe2);




}
  }




  function reset(){
gameState = PLAY;
pipe1Group.destroyEach();
pipe2Group.destroyEach();
score = 0;
bird.visible = true;
restart.visible = false;


  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  