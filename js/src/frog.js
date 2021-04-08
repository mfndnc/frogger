class Frog {
  constructor() {
    this.width;
    this.height;
    this.imgName = './img/frog.png';
    this.img;
    this.iniX = WIDTH / 2;
    this.iniY = HEIGHT - 45;

    // remove. only for testing
    //this.iniX = 20; // 480
    //this.iniY = 400; //400 320 205

    this.x = this.iniX;
    this.y = this.iniY;

    this.someFrogStatusForLog;
    this.keyArrowSpeedIni = 1.5;
    this.jumpBehavior = false;
    this.woodSpeed = 0;
    this.jumpYsforFrog = [];
    this.keyArrowSpeed = this.keyArrowSpeedIni;
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
    if (!this.jumpBehavior) {
      if (keyIsDown(UP_ARROW)) {
        this.moveUp();
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.moveDown();
      }
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
  moveLimited(direction) {
    // rewrite this for better understanding
    const frogArrayindex = this.jumpYsforFrog.indexOf(this.y);
    if (frogArrayindex < 0) {
      if (direction > 0 && this.y < this.jumpYsforFrog[2]) {
        const frogArrayindex2 = this.jumpYsforFrog.findIndex(
          (el) => el < this.y
        );
        return this.jumpYsforFrog[frogArrayindex2 + direction];
      }
      if (direction < 0 && this.y > this.jumpYsforFrog[2]) {
        const frogArrayindex2 = this.jumpYsforFrog.findIndex(
          (el) => el > this.y
        );
        return this.jumpYsforFrog[frogArrayindex2 + direction];
      }
      return this.y + direction * 3;
    } else {
      return this.jumpYsforFrog[frogArrayindex + direction];
    }
  }

  // basics
  moveUp() {
    if (this.jumpBehavior) {
      this.y = this.moveLimited(-1);
    } else {
      this.y -= this.keyArrowSpeed;
    }
  }
  moveDown() {
    if (this.jumpBehavior) {
      this.y = this.moveLimited(1);
    } else {
      this.y += this.keyArrowSpeed;
    }
  }
  moveLeft() {
    this.x -= this.keyArrowSpeed;
  }
  moveRight() {
    this.x += this.keyArrowSpeed;
  }

  // game
  isOnLog(wood) {
    if (this.someFrogStatusForLog != 'isOnLog') {
      this.someFrogStatusForLog = 'isOnLog';
      //console.log('isOnLog', wood);
    }

    this.woodSpeed = wood.speed;
  }
  isNotOnLog() {
    if (this.someFrogStatusForLog != 'isNotOnLog') {
      this.someFrogStatusForLog = 'isNotOnLog';
      //console.log('isNotOnLog');
    }
    this.woodSpeed = 0;
  }
  isNotOnWater() {
    if (this.someFrogStatusForLog != 'isNotOnWater') {
      this.someFrogStatusForLog = 'isNotOnWater';
      //console.log('isNotOnWater');
    }
  }

  updateRefs(gameRefs) {
    //console.log('inside frog gameRefs', gameRefs);
    gameRefs.frogHeight = this.height;
    gameRefs.frogWidth = this.width;
    this.jumpYsforFrog = gameRefs.jumpYsforFrog;
    return gameRefs;
  }
  resetPosition() {
    this.x = this.iniX;
    this.y = this.iniY;
    this.jumpBehavior = false;
    this.woodSpeed = 0;
    this.keyArrowSpeed = this.keyArrowSpeedIni;
  }

  isInsideJumpArea(gameRefs) {
    if (
      this.y < gameRefs.beginJumpArea - gameRefs.frogHeight &&
      this.y > gameRefs.endJumpArea
    ) {
      this.jumpBehavior = true;
      this.keyArrowSpeed = 1;
      return true;
    } else {
      this.jumpBehavior = false;
      this.woodSpeed = 0;
      this.keyArrowSpeed = this.keyArrowSpeedIni;
      return false;
    }

    return (
      this.frog.y < this.gameRefs.beginJumpArea - this.gameRefs.frogHeight &&
      this.frog.y > this.gameRefs.endJumpArea
    );
  }
}
