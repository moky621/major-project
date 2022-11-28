let floor;
let ufoX, ufoY;
let ufo;
let ball;
let wall1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ufo = new Sprite(width/2, 0, 175, 85);
  ufo.addImage("ufo.png");
  ball = new Sprite(50, 50, 50);



  floor = new Sprite(width/2, height-100, width, 5, "static");

  ufo = loadImage("ufo.png");
}


function draw() {
  clear();
  ufoMove();
  createWall();
  // checkCollide();
  
}


function ufoMove(){
  if (kb.pressing('w')) {
    ball.vel.y = -3;
  }

  if (kb.pressing('d')) {
    ball.vel.x = 3;
  }
  
  if (kb.pressing('a')) {
    ball.vel.x = -3;
  }
}

function createWall(){
  wall1 = new Sprite(150, 400, 23, 360, 'static');
  wall1.addImage("stonewall.png");
}

function checkCollide(){
  if (ball.collides(wall1)) {
    ball.color = "red";
  }
  else {
    ball.color = "blue";
  }
}

function createUFO(x, y) {
  ufo = new Sprite(x, y);
  ufo.addImage(ufo);
  
  image(ufo, x, y);
}

function mousePressed() {
  ufo.y += 100;
}