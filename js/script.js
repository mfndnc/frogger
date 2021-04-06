const WIDTH = 1000;
const HEIGHT = 500;

const game = new Game();

function preload() {
  console.log('preload');
  game.preload();
}

function setup() {
  console.log('setup');
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('canvas');
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  game.keyPressed(keyCode);
}
