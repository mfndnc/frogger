class Frog {
  constructor() {
    this.width;
    this.height;
    this.imgName = './img/frog.png';
    this.img;
    this.iniX = WIDTH - 400;
    this.iniY = HEIGHT - 45;

    // remove. only for testing
    //this.iniX = 480;
    //this.iniY = 320;

    this.x = this.iniX;
    this.y = this.iniY;
    this.speed = 0;
    this.mouseSpeed = 1.5;
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
    this.x += this.speed;
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
    this.y -= this.mouseSpeed;
  }
  moveDown() {
    this.y += this.mouseSpeed;
  }
  moveLeft() {
    this.x -= this.mouseSpeed;
  }
  moveRight() {
    this.x += this.mouseSpeed;
  }

  // game
  isOnLog(wood) {
    this.speed = wood.speed;
  }
  isNotOnLog() {
    this.speed = 0;
  }

  getHeight() {
    return this.height;
  }
  resetPosition() {
    this.x = this.iniX;
    this.y = this.iniY;
  }
}
