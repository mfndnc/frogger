class Frog {
  constructor() {
    this.imgName = './img/frog.bmp';
    this.img;
    this.x = WIDTH - 200;
    this.y = HEIGHT - 50;
  }
  //  p5 equiv funcs
  preload() {
    this.img = loadImage(this.imgName);
  }
  setup() {}
  draw() {
    image(this.img, this.x, this.y);

    if (keyIsDown(UP_ARROW)) {
      this.moveUp();
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.moveDown();
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.moveLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.moveRight();
    }
  }
  keyPressed(keyCode) {
    if (keyCode === UP_ARROW) {
      this.moveUp(); //38
    }
    if (keyCode === DOWN_ARROW) {
      this.moveDown(); //40
    }
    if (keyCode === LEFT_ARROW) {
      this.moveLeft(); //37
    }
    if (keyCode === RIGHT_ARROW) {
      this.moveRight(); //39
    }
  }
  // basics
  moveUp() {
    this.y -= 1;
  }
  moveDown() {
    this.y += 1;
  }
  moveLeft() {
    this.x -= 1;
  }
  moveRight() {
    this.x += 1;
  }

  // game
  signalPosition() {
    return [this.x, this.y, this.img.width, this.img.height];
  }
}
