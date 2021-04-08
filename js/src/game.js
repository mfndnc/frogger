class Game {
  constructor() {
    this.timerTrick = 3;
    this.timersecond = 2;
    this.baseRoad = new BaseRoad();
    this.baseRiver = new BaseRiver();
    this.obstacles = new Obstacles();
    this.tokens = new Tokens();
    this.frog = new Frog();
    this.score = new Score();

    this.gameRefs = {
      leftMost: 0,
      rightMost: WIDTH,
      targetY: 0,
      beginRiver: 0,
      endRiver: 0,
      beginJumpArea: 0,
      endJumpArea: 0,
      endRoad: 0,
      beginRoad: 0,
      frogHeight: 0,
    };

    this.safeY = 0;
    this.frogappears = false;
    this.gameOverAndTimer;

    this.testingImagesInsteadOfGame = false;
    // ALL BELOW CAN BE DELETED SOON
    this.testingImagesInsteadOfGame = false;
    this.testImages = new TestImages();
  }
  preload() {
    if (this.testingImagesInsteadOfGame) {
      this.testImages.preload();
    }

    // ALL ABOVE CAN BE DELETED SOON
    this.baseRoad.preload();
    this.obstacles.preload();
    this.tokens.preload();
    this.frog.preload();
    this.score.preload();
  }

  setup() {
    if (this.testingImagesInsteadOfGame) {
      this.testImages.setup();
    }

    // ALL ABOVE CAN BE DELETED SOON
    this.baseRoad.setup();
    this.obstacles.setup();
    this.tokens.setup();
    this.frog.setup();
    this.score.setup();

    this.gameRefs = this.tokens.updatePositions(
      this.baseRiver.getXYWH(),
      this.gameRefs
    );

    this.gameRefs = this.obstacles.updatePositions(
      this.baseRoad.getXYWH(),
      this.gameRefs
    );

    this.gameRefs = this.frog.updateRefs(this.gameRefs);
    console.log('line69', this.gameRefs);
    this.gameRefs.targetY =
      this.gameRefs.endRoad - this.gameRefs.frogHeight - 20;

    console.log(this.gameRefs.endRoad);
    /// *****TMP TMP TMP TMP
    this.gameRefs.targetY = 150;
    this.score.setTargetYPosition(this.gameRefs.targetY);
  }

  draw() {
    if (!this.testingImagesInsteadOfGame) {
      // draw part

      clear();

      background('#567d46');
      this.baseRoad.draw();

      // *********** tmp tmp tmp BEGIN - drawing visual helps
      stroke('red');
      fill('red');
      rect(
        0,
        this.gameRefs.endJumpArea,
        WIDTH,
        this.gameRefs.beginJumpArea - this.gameRefs.endJumpArea
      );
      stroke('yellow');
      fill('yellow');
      rect(
        0,
        this.gameRefs.endRiver,
        WIDTH,
        this.gameRefs.beginRiver - this.gameRefs.endRiver
      );

      stroke('white');
      fill('white');
      // *********** tmp tmp tmp END - drawing visual helps

      this.obstacles.draw();
      this.tokens.draw();
      if (this.frogappears) {
        this.frog.draw();
        // detection part
        this.evaluateFrogJouney();
      } else {
        if (this.gameOverAndTimer) {
          this.gameOverAndTimer.draw();
          if (this.gameOverAndTimer.finished) {
            this.frogappears = true;
            this.gameOverAndTimer = null;
          }
        } else {
          this.gameOverAndTimer = new Timer(this.timerTrick);
          // so the first time it takes longer
          this.timerTrick = this.timersecond;
        }
      }

      this.score.draw();
    }
  }

  keyPressed(keyCode) {
    this.frog.keyPressed(keyCode);
  }

  evalueateRestartEndGame() {
    this.frogappears = false;
    this.frog.resetPosition();
    if (!this.score.hasLivesLeft()) {
      this.gameOverAndTimer = new Gameover(this.score.getScore());
    }
  }

  getFrogOutsideCanvas() {
    return (
      this.frog.x < this.gameRefs.leftMost - this.gameRefs.frogWidth ||
      this.frog.x > this.gameRefs.rightMost
    );
  }
  getFrogInsideJumpArea() {
    // NOT USED
    return (
      this.frog.y < this.gameRefs.beginJumpArea - this.gameRefs.frogHeight &&
      this.frog.y > this.gameRefs.endJumpArea
    );
  }

  evaluateFrogJouney() {
    // change the order so it has less checks to do
    // ie, is frog in water region (bigger then river itself)
    // or in car region
    // maybe start with is frog on target so the other are not done
    // add if frog is outside the canvas

    if (this.frogappears && this.score.getReachedTarget(this.frog)) {
      // process the frog reached its goal
      console.log('EVAL FROG getReachedTarget', this.frog.y);
      this.score.setReachedTarget();
      this.evalueateRestartEndGame();
    } else if (this.frogappears && this.getFrogOutsideCanvas()) {
      // process frog went outside canvas
      this.score.shouldLooseALive();
      this.evalueateRestartEndGame();
    } else if (this.frogappears && this.frog.isInsideJumpArea(this.gameRefs)) {
      // process frog is inside jump area - an area a bit bigger than the river

      console.log('EVAL FROG ', this.frog.y);

      // process frog hit water
      const checkFrogOnLog = this.tokens.jumpSucceed(this.frog);
      if (checkFrogOnLog === false && this.frogappears) {
        console.log('dsadsad');
        //this.score.shouldLooseALive();
        //this.evalueateRestartEndGame();
      } else if (checkFrogOnLog === true && this.frogappears) {
        this.frog.isNotOnLog();
      } else {
        this.frog.isOnLog(checkFrogOnLog);
      }
    } else {
      // frog behaves normally, ie, should check if it gets hit
      // process frog hit a car
      if (this.frogappears && !this.obstacles.avoidedCollision(this.frog)) {
        this.score.shouldLooseALive();
        this.evalueateRestartEndGame();
      }
    }
  }
}
