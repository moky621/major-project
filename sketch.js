let ball, floor;

function setup() {
  createCanvas(80, 160);
  world.gravity.y = 10;
	
  ball = new Sprite(40, 30, 50);

  floor = new Sprite(40, 155, 80, 5, "static");
}

function draw() {
  clear();
}