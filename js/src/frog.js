class Frog {
  constructor() {
    this.width;
    this.height;
    this.imgName = './img/frog.png';
    this.img;
    this.iniX = WIDTH - 400;
    this.iniY = HEIGHT - 45;

    // remove. only for testing
    this.iniX = 480;
    this.iniY = 320;

    this.x = this.iniX;
    this.y = this.iniY;

    this.keyArrowSpeedIni = 1.5;
    this.jumpBehavior = false;
    this.woodSpeed = 0;
    this.keyArrowSpeedLR = this.keyArrowSpeedIni;
    this.keyArrowSpeedTB = this.keyArrowSpeedIni;
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
    this.x += this.woodSpeed;
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
    this.y -= this.keyArrowSpeedTB;
  }
  moveDown() {
    this.y += this.keyArrowSpeedTB;
  }
  moveLeft() {
    this.x -= this.keyArrowSpeedLR;
  }
  moveRight() {
    this.x += this.keyArrowSpeedLR;
  }

  // game
  isOnLog(wood) {
    console.log(wood);
    this.woodSpeed = wood.speed;
  }
  isNotOnLog() {
    this.woodSpeed = 0;
  }
  isInJumpArea() {
    this.jumpBehavior = true;
    this.keyArrowSpeedLR = 1;
    this.keyArrowSpeedTB = 4;
  }
  isOutSideJumpArea() {
    this.jumpBehavior = false;
    this.keyArrowSpeedLR = this.keyArrowSpeedIni;
    this.keyArrowSpeedTB = this.keyArrowSpeedIni;
  }

  updateRefs(gameRefs) {
    gameRefs.frogHeight = this.height;
    gameRefs.frogWidth = this.width;
    return gameRefs;
  }
  resetPosition() {
    this.x = this.iniX;
    this.y = this.iniY;
    this.jumpBehavior = false;
    this.woodSpeed = 0;
    this.keyArrowSpeedLR = this.keyArrowSpeedIni;
    this.keyArrowSpeedTB = this.keyArrowSpeedIni;
  }

  isInsideJumpArea(gameRefs) {
    if (
      this.y < gameRefs.beginJumpArea - gameRefs.frogHeight &&
      this.y > gameRefs.endJumpArea
    ) {
      this.jumpBehavior = true;
      // this.woodSpeed = 0;
      this.keyArrowSpeedLR = 1;
      this.keyArrowSpeedTB = 1;
      return true;
    } else {
      this.jumpBehavior = false;
      this.woodSpeed = 0;
      this.keyArrowSpeedLR = this.keyArrowSpeedIni;
      this.keyArrowSpeedTB = this.keyArrowSpeedIni;
      return false;
    }

    return (
      this.frog.y < this.gameRefs.beginJumpArea - this.gameRefs.frogHeight &&
      this.frog.y > this.gameRefs.endJumpArea
    );
  }
}
