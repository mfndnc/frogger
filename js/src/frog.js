class Frog {
  constructor() {
    this.width;
    this.height;
    this.imgName = './img/frog.bmp';
    this.img;
    this.iniX = WIDTH - 400;
    this.iniY = HEIGHT - 45;
    this.x = this.iniX;
    this.y = this.iniY;
    this.speed = 1.5;
  }
  //  p5 equiv funcs
  preload() {
    this.img = loadImage(this.imgName);
  }
  setup() {
    this.width = this.img.width;
    this.height = this.img.height;
  }
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
    this.y -= this.speed;
  }
  moveDown() {
    this.y += this.speed;
  }
  moveLeft() {
    this.x -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }

  // game
  getHeight() {
    return this.height;
  }
  resetPosition() {
    this.x = this.iniX;
    this.y = this.iniY;
  }
}
