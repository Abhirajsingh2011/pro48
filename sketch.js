var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie
var zombieGroup
var zombieImage
var bullet
var bulletGroup
var bulletImage
var score=0
var life=3
var bullets=120
var heart1
var heart2
var heart3
var heart1Image
var heart2Image
var heart3Image
var gameState = "play"
var explosion
var lose
var win
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImage = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieImage = loadImage("assets/zombie.png")
  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")
  explosion = loadSound("assets/explosion.mp3")
  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")


}


function setup() {

  zombieGroup = new Group()
  bulletGroup = new Group()
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  heart1=createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Image)
  heart1.scale = 0.5
  heart1.visible = false
 
  heart2=createSprite(displayWidth-150,40,20,20)
  heart2.addImage(heart2Image)
  heart2.scale = 0.5
  heart2.visible = false

  heart3=createSprite(displayWidth-170,40,20,20)
  heart3.addImage(heart3Image)
  heart3.scale = 0.5
  heart3.visible = true
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,250,300)


}

function draw() {
  background(0); 
  if (gameState === "play")
  {
  
  if (life === 3)
  {
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if (life === 2)
  {
  heart2.visible = true
  heart1.visible = false
  heart3.visible = false
  }
  if (life === 1)
  {
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }
spawnZombies()

  

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
  }
  if (life === 0)
  {
    gameState = "lost"
  }
  if (score === 100)
  {
    gameState = "won"
    win.play();
  }

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage("bullet",bulletImage)
 bullet.velocityX=20
 bulletGroup.add(bullet)
 bullet.scale = 0.04
 if (bullets>0)
 {
  bullets=bullets-1
 }
 explosion.play();
}
if (bullets === 0)
{
  gameState = "nobullets"
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (zombieGroup.isTouching(bulletGroup))
{
  for(var i=0; i<zombieGroup.length; i++)
  {
    if (zombieGroup[i].isTouching(bulletGroup))
    {
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score+1
    }
  }
}
if (zombieGroup.isTouching(player))
{
  for(var i=0; i<zombieGroup.length; i++)
  {
    if (zombieGroup[i].isTouching(player))
    {
      zombieGroup.destroyEach()
      life = life-1
      lose.play();
    }
  }
}
drawSprites();
textSize(20)
fill("white")
text("Score : "+score, displayWidth-230, displayHeight/2-280)
text("Life : "+life, displayWidth-230, displayHeight/2-250)
text("Bullet : "+bullets, displayWidth-230, displayHeight/2-220)
if (gameState === "won")
{
  textSize(100)
  fill("green")
  text("YOU WON",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
if (gameState === "lost")
{
  textSize(100)
  fill("red")
  text("YOU LOST",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
if (gameState === "nobullets")
{
textSize(100)
fill("yellow")
text("YOU RAN OUT OF BULLETS",100,400)
zombieGroup.destroyEach()
bulletGroup.destroyEach()
player.destroy()
}
}
function spawnZombies(){
  if (frameCount%60===0)
{
  zombie = createSprite(random(500,1100),random(100,500,50,50))
  zombie.addImage(zombieImage)
  zombie.velocityX=-3
  zombie.scale = 0.15
  zombie.lifetime = 500
  zombieGroup.add(zombie)
  zombie.debug=true
  zombie.setCollider("rectangle",0,0,350,900)
}
}