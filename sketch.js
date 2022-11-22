let ball, floor;

let ufo;
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 10;
	
  ball = new Sprite(50, 30, 50);
  ball.img = ufo;

  rocket = new Sprite();

  floor = new Sprite(width/2, height, width, 5, 'static');

  ufo = loadImage("ufo.png");
}

function draw() {
  clear();
  if (kb.presses('w')) {
    //    (direction, speed, distance)
    ball.move('up', 5, 50);
  }
}

function mousePressed() {
  ball.y -= 50;
}