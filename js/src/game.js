class Game {
  constructor() {
    this.background = new Background();
    this.obstacles = new Obstacles();
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
    this.background.preload();
    this.obstacles.preload();
    this.frog.preload();
    this.score.preload();
  }

  setup() {
    if (this.testingImagesInsteadOfGame) {
      this.testImages.setup();
    }

    // ALL ABOVE CAN BE DELETED SOON
    this.background.setup();
    this.obstacles.setup();
    this.frog.setup();
    this.score.setup();

    let a = this.obstacles.riverPosition(this.background.signalRiverPosition());
    let b = this.obstacles.roadPosition(this.background.signalRoadPosition());
    let c = this.frog.getHeight();
    this.safeY = a + b - c - 20;
    this.obstacles.setSavePosition(this.safeY);
  }

  draw() {
    if (!this.testingImagesInsteadOfGame) {
      // draw part

      clear();

      this.background.draw();

      if (this.frogappears) {
        this.obstacles.draw();
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
          this.gameOverAndTimer = new Timer();
        }
      }

      this.score.draw();
    }
  }

  keyPressed(keyCode) {
    this.frog.keyPressed(keyCode);
  }

  evaluateFrogJouney() {
    // if avoided collision and reached goal, winner
    // if not avoided collision, get new live
    // create a new class for showing results?

    // process in case frog was hit by a car or fell into the water
    if (!this.obstacles.avoidedCollision(this.frog) && this.frogappears) {
      this.frogappears = false;
      this.frog.resetPosition();
      if (!this.score.shouldLooseALive()) {
        console.log('GAME OVER');
        this.gameOverAndTimer = new Gameover(false);
      }
    }
    // process the frog reached its goal
    if (this.obstacles.reachedGoal(this.frog) && this.frogappears) {
      this.frogappears = false;
      this.frog.resetPosition();
      if (!this.score.broadcastReachedTarget()) {
        console.log('GAME WON');
        this.gameOverAndTimer = new Gameover(true);
      }
    }
  }
}
