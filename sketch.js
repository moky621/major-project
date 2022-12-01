let floor;
let ufoX, ufoY;
let ufo;
let ball;
let wall1;
let thrust;
let coins;
let score = 0;
let scoreboard;

function preload() {
  ufo = loadImage("ufo.png");
  thrust = loadImage("rocket-thrust.gif")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ufo = new Sprite(width/2, 0, 175, 85);
  ufo.addImage("ufo.png");
  ball = new Sprite(50, 50, 50, 50, "dynamic");

  
  
  floor = new Sprite(width/2, height-100, width, 5, "static");
  
  ufo = loadImage("ufo.png");
  image(thrust, 300, 300);
  
  
  createCoins();
  
  displayScoreboard();
  createWall();
  
}
function createCoins() {
  coins = new Group();
  coins.color = 'yellow';
  for (let i = 0; i<20; i++){
    new coins.Sprite(i *100, 25, 10);
  }
}

function draw() {
  clear();
  camera.on();
  camera.x = ball.x;
  camera.y = ball.y;
  ufoMove();
  checkCollide();
  collectCoin()
  cameraToggle()
  if (ball.colliding(floor)) {
    ball.color = "red";
    score += 1;
  }
  else if (ball.collides(wall1)) {
    ball.color = "red";
  }
  else {
    ball.color = "blue";
  }
  
  
  
}

function ufoMove(){
  if (kb.pressing("w")) {
    ball.vel.y = - 3;
  }

  if (kb.pressing("d")) {
    ball.vel.x = 2;
    if (ball.rotation <= 30){
      ball.rotation += 3;
    }
  }
  
  if (kb.pressing("a")) {
    ball.vel.x = -3;
    if (ball.rotation >= -30){
      ball.rotation -= 2;
    }
  }
}

function createWall(){
  wall1 = new Sprite(150, 400, 23, 360, "static");
  wall1.addImage("stonewall.png");
  
}

function checkCollide(){
  if (ball.colliding(floor)) {
    ball.color = "red";
    score += 1;
  }
  else {
    ball.color = "blue";
  }
  if (ball.collides(wall1)) {
    ball.color = "red";
  }
  else {
    ball.color = "blue";
  }
  
}

function collectCoin() {
  if (ball.overlaps(coins)){
    coins.remove();
    score += 1;
  }
}

function createUFO(x, y) {
  ufo = new Sprite(x, y);
  ufo.addImage(ufo);
  
  image(ufo, x, y);
  
  
}

function cameraToggle() {
  if (key === 'c' && camera.on()) {
    camera.off();
  }
  else if(key === 'c' && camera.off()) {
    camera.on();
    camera.x = ball.x;
    camera.y = ball.y;
  }
}

function displayScoreboard() {
  scoreboard = new Sprite(width/2, 100, 200, 75, 'static');
  scoreboard.color = 'black';
  scoreboard.text = str(score);
  scoreboard.textColor = 'white';
  scoreboard.textSize = 40;
}
