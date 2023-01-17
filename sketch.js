let floor, ceiling, barrier;
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
let state = "life";
let hitCount = 0;
let gameOverSound;
let instructions;
let coinImg;
let gameOver;
let thrustAni;


function preload() {
  ufo = loadImage("assets/ufo.png");
  thrust = loadImage("assets/rocket-thrust.gif")
  bg00 = loadImage("assets/bg00.png");
  bg01 = loadImage("assets/bg01.png");
  bg02 = loadImage("assets/bg02.png");
  bg03 = loadImage("assets/bg03.png");
  space = loadImage("assets/space.png");
  coinImg = loadImage("assets/coin.png");
  gameOver = loadImage("assets/gameover.png")
  bang = loadSound("assets/bangsound.mp3");
  money = loadSound("assets/moneysound.mp3");
  gameOverSound = loadSound("assets/gameOverSound.mp3");
  asteroidImg = loadImage("assets/asteroidstuff/asteroid.png");
  asteroidsound = loadSound("assets/asteroidsound.mp3");
  explosionAni = loadAnimation("assets/asteroidstuff/explosion.png", { frameSize: [2176/17, 2176/17], frames: 17 });
  fireballAni = loadAnimation("assets/asteroidstuff/fireballsheet1.png", {frameSize: [500/2, 153/2], frames: 4});
  thrustAni = loadAnimation("assets/thrustsheet.png" , {frameSize: [87, 158 ], frames: 8} );
  fireballAni.frameDelay = 8;
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ufo = new Sprite(50, 50, 40, "dynamic");
  ufo.addImage("assets/ufo.png");
  floor = new Sprite(width, height, width*10, 5, "static");
  ceiling = new Sprite(width, 0, width*10, 5, "static");
  scoreboard = new Sprite(ufo.x, 100, 300, 75, 'dynamic');
  barrier = new Sprite(-100, height/2, 5, height, "static");
  drawInstructions();
  
  image(thrust, 300, 300);
  createCoins();
  displayScoreboard();
  createWall();
  
  createAsteroidFixed(100+width, height/2 -100, 10);
}

function draw() {
  clear();
  drawBg();
  cameraMode();
  ufoMove();
  
  collectCoin();
  cameraToggle();
  updateScore();
  getRidOf();
  // drawAnimation();
  checkCollide();
  blows();
  // endGame();
  reload();
 
}
function drawBg(){
  image(space, 0, 0, width, height);
  // image(bg02, 0, 0, width, height);
  // image(bg01, 0, 0, width, height);
  // image(bg00, 0, 0, width, height);
}

function drawInstructions() {
  // instructions = new Sprite (-400, height/2 +100, 500, 300, "static");
  // instructions.color = "black";
  textSize(20);
  textWrap(WORD);
  text("INSTRUCTIONS \
  // WASD TO MOVE UFO\
  // COLLECT COINS AND AVOID ASTEROIDS\
  // CLICK MOUSE TO RESTART IF YOU DIE", 0, height/2, 100);

  // instructions.text = "INSTRUCTIONS \
  // WASD TO MOVE UFO\
  // COLLECT COINS AND AVOID ASTEROIDS\
  // CLICK MOUSE TO RESTART IF YOU DIE";
  // instructions.textSize = 15;
  // instructions.textColor = "white";
  
}
function spawnNewAsteroid(){
  if (score % 15 === 0) {
    // createAsteroidFixed(width + ufo.x, height/2 - 100, 70);
    asteroid = new Sprite(width + ufo.x, height/2 - 100, 70);
    asteroid.visible = true;
    asteroid.vel.x -= 0.2;
    asteroid.vel.y = -1;
    asteroidsound.play();
    asteroidAnimation();
    asteroid.addImage(asteroidImg);
    if (asteroid.overlaps(walls)){
      asteroid.x -= 10;
    }
    asteroid.overlaps(coins);
  }

  if (score > 100) {
    asteroid.vel.x -= 1;
  }
  
}

function createAsteroidFixed(x, y, size) {
  asteroid = new Group();
  asteroid.x = x;
  asteroid.y = y;
  asteroid.size = size;
  asteroid.overlaps(coins);
  
}

function ufoMove(){
  if (state === "life"){
    if (kb.pressing("w")) {
      ufo.vel.y = - 3;
      animation(thrustAni, ufo.x- 10, ufo.y+50);
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
}

function cameraMode() {
  camera.on();
  camera.x = ufo.x;
  camera.y = ufo.y;
}


function createCoins() {
  coins = new Group();
  coins.addImage(coinImg);
  coins.color = 'yellow';
  for (let i = 0; i<200; i++){
    new coins.Sprite(i *100+50, height/2 -25, 10, 'static');
  }
}


function createWall(){
  walls = new Group();
  walls.addImage("assets/stonewall.png");
  for (let i = 0; i<200; i++){
    // new walls.Sprite(i *100, 100, 23, 360, 'static');
    new walls.Sprite(i *100, random(height-100, height-200), 23, 360, 'static');
    new walls.Sprite(i *100, random(100, 150), 23, 360, 'static');
  }
  walls.layer = 0;
  walls.overlaps(scoreboard);
  
}

function checkCollide(){
  if (ufo.colliding(floor)) {
    // bang.play();
    
  }
  else if (ufo.collided(walls)) {
    bang.play();
    hitCount++;
    state = "blows";
  }
  else {
    ufo.color = "blue";
  }
  if (asteroid.overlaps(walls)){
    asteroid.x -= 20;
  }
  if (asteroid.collides(ufo)) {
    bang.play();
    state = "blows";
    hitCount++;
  }
}

function drawAnimation() {
  animation(explosionAni, ufo.x, ufo.y, 3, 3, 3);
  animation(fireballAni, asteroid.x, asteroid.y);
  asteroid.visible = false;
  ufo.visible = false;
  
}

function asteroidAnimation() {
  animation(fireballAni, asteroid.x, asteroid.y);
  asteroid.addAni(fireballAni);
  asteroid.ani = fireballAni
}

function blows(){
  if (state === "blows") {
    drawAnimation();
    scoreboard.text = "YOU DIED";
    const myTimeout = setTimeout(endGame(), 5000);
    myTimeout;

  }
}

function endGame() {
  if (ufo.colliding(floor)){
    world.gravity.y = 1000;
    walls.visible = false;
    barrier.visible = false;
    ceiling.visible = false;
    floor.visible = false;
    asteroid.delete;
    animation(fireballAni, ufo.x + 2000, height/2);
    imageMode(CENTER);
    image(gameOver, ufo.x, ufo.y, width, height);
    gameOverSound.play();
    noLoop();
  }
  
}


function getRidOf() {
  if (asteroid.collides(barrier) || asteroid.collides(floor)) {
    asteroid.visible = false;
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
  scoreboard.color = 'black';
  scoreboard.text = str(score);
  scoreboard.textColor = 'white';
  scoreboard.textSize = 40;
  scoreboard.layer = 3;
  ufo.overlaps(scoreboard);
  barrier.overlaps(scoreboard);
  scoreboard.y = height * 0.2;
  scoreboard.x = ufo.x;
  // scoreboard.vel.y = 0;
  // fill("white");
  // textSize(60);
  // text("Score: " + score, ufo.x, height*0.2);
  // text.layer = 3;
  // textAlign(CENTER);
  
}

function updateScore() {
  
  displayScoreboard();
  
}

function reload(){
  if (state === "blows" && kb.pressing("r") ){
    location.reload();
    
  }
}
