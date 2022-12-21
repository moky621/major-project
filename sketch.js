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
let asteroid, asteroidImg, asteroidsound;
let explosionAni, fireballAni;

function preload() {
  ufo = loadImage("assets/ufo.png");
  thrust = loadImage("assets/rocket-thrust.gif")
  bg00 = loadImage("assets/bg00.png");
  bg01 = loadImage("assets/bg01.png");
  bg02 = loadImage("assets/bg02.png");
  bg03 = loadImage("assets/bg03.png");
  space = loadImage("assets/space.png");
  bang = loadSound("assets/bangsound.mp3");
  money = loadSound("assets/moneysound.mp3");
  asteroidImg = loadImage("assets/asteroidstuff/asteroid.png");
  asteroidsound = loadSound("assets/asteroidsound.mp3");
  // explosionAni = loadAnimation("assets/asteroidstuff/explosion.png", { frameSize: [2176/17, 2176/17], frames: 17 });
  fireballAni = loadAnimation("assets/asteroidstuff/fireballsheet1.png", {frameSize: [500/2, 153/2], frames: 4});
  fireballAni.frameDelay = 8;
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ufo = new Sprite(50, 50, 50, "dynamic");
  ufo.addImage("assets/ufo.png");
  floor = new Sprite(width/2, height, width, 5, "static");
  ceiling = new Sprite(width/2, 0, width, 5, "static");
  
  image(thrust, 300, 300);
  createCoins();
  displayScoreboard();
  createWall();
  createAsteroid(100+width, height/2 -100, 10);
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
  
}
function drawBg(){
  image(space, 0, 0, width, height);
  // image(bg02, 0, 0, width, height);
  // image(bg01, 0, 0, width, height);
  // image(bg00, 0, 0, width, height);
}

function spawnNewAsteroid(){
  if (score % 10 === 5) {
    createAsteroid(100 + width, height/2 -100, 50);
    asteroid.vel.x -= 0.1;
    asteroid.vel.y = 0;
    asteroidsound.play();
    if (asteroid.overlaps(walls)){
      asteroid.x -= 12;
    }
    
  }
}


function createAsteroid(x, y, size) {
  asteroid = new Sprite(x, y, size);
  asteroid.addImage(asteroidImg);
  asteroid.addAni(fireballAni);
  asteroid.gravity = 0;
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
  asteroid.vel.x -= 0.1;
  asteroid.vel.y = 0;
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
  walls.addImage("assets/stonewall.png");
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
    // animation(explosionAni, 500, 500);
  }
  else {
    ufo.color = "blue";
  }
  if (asteroid.overlaps(walls)){
    asteroid.x -= 10;
  }
  if (asteroid.collides(ufo)) {
    bang.play();
  }
}

function collectCoin() {
  if (ufo.overlaps(coins)){
    coins[0].remove();
    score += 5;
    displayScoreboard();
    money.play();
    spawnNewAsteroid();
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