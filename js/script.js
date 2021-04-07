const WIDTH = 1000;
const HEIGHT = 800;

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
