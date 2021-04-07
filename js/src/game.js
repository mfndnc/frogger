class Game {
  constructor() {
    this.timerTrick = 3;
    this.timersecond = 2;
    this.baseRoad = new BaseRoad();
    this.obstacles = new Obstacles();
    this.tokens = new Tokens();
    this.frog = new Frog();
    this.score = new Score();

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

    let b = this.obstacles.roadPosition(this.baseRoad.signalRoadPosition());
    let c = this.frog.getHeight();
    this.safeY = b - c - 20;
    /// *****TMP TMP TMP TMP
    this.safeY = 160;
    this.score.setSavePosition(this.safeY);
  }

  draw() {
    if (!this.testingImagesInsteadOfGame) {
      // draw part

      clear();

      background('#567d46');
      this.baseRoad.draw();
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

  evaluateFrogJouney() {
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
    // process frog hit a car
    if (!this.obstacles.avoidedCollision(this.frog) && this.frogappears) {
      this.score.shouldLooseALive();
      this.evalueateRestartEndGame();
    }
    // process the frog reached its goal
    if (this.score.reachedGoal(this.frog) && this.frogappears) {
      this.score.reachedTarget();
      this.evalueateRestartEndGame();
    }
  }
}
