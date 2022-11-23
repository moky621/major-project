let floor;
let ufoX, ufoY;
let ufo;
let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  ufo = new Sprite(width/2, 0, 10, 80);
  ufo.addImage("ufo.png");
  ball = new Sprite(50, 50, 50);



  floor = new Sprite(width/2, height-100, width, 5, "static");

  ufo = loadImage("ufo.png");
}


function draw() {
  clear();
  if (kb.presses('w')) {
    //    (direction, speed, distance)
    ball.move('up', 3, 50);
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