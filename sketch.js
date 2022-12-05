let floor;
let ufoX, ufoY;
let ufo;
let ball;
let wall1;
let thrust;
let coins;
let score = 0;
let scoreboard;
let walls;

function preload() {
  ufo = loadImage("ufo.png");
  thrust = loadImage("rocket-thrust.gif")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ball = new Sprite(50, 50, 50, "dynamic");
  
  ball.addImage("ufo.png");

  
  
  floor = new Sprite(width/2, height-100, width, 5, "static");
  
  image(thrust, 300, 300);
  
  
  createCoins();
  
  displayScoreboard();
  createWall();
  
}

function draw() {
  clear();
  // cameraMode();
  ufoMove();
  checkCollide();
  collectCoin();
  cameraToggle();
  updateScore();

  
  
  
  if (ball.colliding(floor)) {
    ball.color = "red";
  }
  else if (ball.collides(walls)) {
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

function cameraMode() {
  camera.on();
  camera.x = ball.x;
  camera.y = ball.y;
}


function createCoins() {
  coins = new Group();
  coins.color = 'yellow';
  for (let i = 0; i<20; i++){
    new coins.Sprite(i *100+50, height/2 - 50, 10, 'static');
  }
}


function createWall(){
  walls = new Group();
  walls.addImage("stonewall.png");
  for (let i = 0; i<20; i++){
    new walls.Sprite(i *100, 100, 23, 360, 'static');
    new walls.Sprite(i *100, random(height-100, height-250), 23, 360, 'static');
  }
  walls.layer = 2;
  
}

function checkCollide(){
  if (ball.colliding(floor)) {
    ball.color = "red";
    
  }
  else if (ball.collides(walls)) {
    ball.color = "red";
    
    
  }
  else {
    ball.color = "blue";
  }
  
}

function collectCoin() {
  if (ball.overlaps(coins)){
    coins[0].remove();
    score += 5;
    displayScoreboard();
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
  scoreboard.layer = 3;
}

function updateScore() {
  if (score !== score) {
    displayScoreboard();
  }
}