let floor, ceiling;
let ufoX, ufoY;
let ufo;
let wall1;
let thrust;
let coins;
let score = 0;
let scoreboard;
let walls;
let bg00, bg01, bg02, bg03;
let space;
let bang, money;

function preload() {
  ufo = loadImage("ufo.png");
  thrust = loadImage("rocket-thrust.gif")
  bg00 = loadImage("bg00.png");
  bg01 = loadImage("bg01.png");
  bg02 = loadImage("bg02.png");
  bg03 = loadImage("bg03.png");
  space = loadImage("space.png");
  bang = loadSound("bangsound.mp3");
  money = loadSound("moneysound.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ufo = new Sprite(50, 50, 50, "dynamic");
  
  
  ufo.addImage("ufo.png");
  floor = new Sprite(width/2, height, width, 5, "static");
  ceiling = new Sprite(width/2, 0, width, 5, "static");
  
  image(thrust, 300, 300);
  
  
  createCoins();
  
  displayScoreboard();
  createWall();
  
}

function draw() {
  clear();
  drawBg();
  // cameraMode();
  ufoMove();
  checkCollide();
  collectCoin();
  cameraToggle();
  updateScore();

  
  
  
  // if (ufo.colliding(floor)) {
  //   ufo.color = "red";
  // }
  // else if (ufo.collides(walls)) {
  //   ufo.color = "red";
  // }
  // else {
  //   ufo.color = "blue";
  // }
  
  
  
  
}
function drawBg(){
  image(space, 0, 0, width, height);
  // image(bg02, 0, 0, width, height);
  // image(bg01, 0, 0, width, height);
  // image(bg00, 0, 0, width, height);
}
function ufoMove(){
  if (kb.pressing("w")) {
    ufo.vel.y = - 3;
  }
  
  if (kb.pressing("d")) {
    ufo.vel.x = 2;
    if (ufo.rotation <= 30){
      ufo.rotation += 3;
    }
  }
  
  if (kb.pressing("a")) {
    ufo.vel.x = -3;
    if (ufo.rotation >= -30){
      ufo.rotation -= 2;
    }
  }
}

function cameraMode() {
  camera.on();
  camera.x = ufo.x;
  camera.y = ufo.y;
}


function createCoins() {
  coins = new Group();
  coins.color = 'yellow';
  for (let i = 0; i<200; i++){
    new coins.Sprite(i *100+50, height/2 - 50, 10, 'static');
  }
}


function createWall(){
  walls = new Group();
  walls.addImage("stonewall.png");
  for (let i = 0; i<200; i++){
    new walls.Sprite(i *100, 100, 23, 360, 'static');
    new walls.Sprite(i *100, random(height-100, height-250), 23, 360, 'static');
  }
  walls.layer = 2;
  
}

function checkCollide(){
  if (ufo.colliding(floor)) {
    ufo.color = "red";
    
  }
  else if (ufo.collides(walls)) {
    ufo.color = "red";
    bang.play();
  }
  else {
    ufo.color = "blue";
  }
  
}

function collectCoin() {
  if (ufo.overlaps(coins)){
    coins[0].remove();
    score += 5;
    displayScoreboard();
    money.play();
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
    camera.x = ufo.x;
    camera.y = ufo.y;
  }
}

function displayScoreboard() {
  scoreboard = new Sprite(width/2, 100, 300, 75, 'static');
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