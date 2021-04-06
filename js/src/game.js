class Game {
  constructor() {
    this.background = new Background();
    this.obstacles = new Obstacles();
    this.frog = new Frog();
    this.testing = false;
    // ALL BELOW CAN BE DELETED SOON
    this.testing = false;
    this.testImages = new TestImages();
  }
  preload() {
    if (this.testing) {
      this.testImages.preload();
    }

    // ALL ABOVE CAN BE DELETED SOON
    this.background.preload();
    this.obstacles.preload();
    this.frog.preload();
  }

  setup() {
    if (this.testing) {
      this.testImages.setup();
    }

    // ALL ABOVE CAN BE DELETED SOON
    this.background.setup();
    this.obstacles.setup();
    this.frog.setup();

    this.obstacles.riverPosition(this.background.signalRiverPosition());
    this.obstacles.roadPosition(this.background.signalRoadPosition());
  }

  draw() {
    if (!this.testing) {
      // draw part
      clear();
      background('#567d46');
      this.background.draw();
      this.obstacles.draw();
      this.frog.draw();
      // detection part
      this.evaluateFrogJouney();
    }
  }

  keyPressed(keyCode) {
    this.frog.keyPressed(keyCode);
  }

  evaluateFrogJouney() {
    // if avoided collision and reached goal, winner
    // if not avoided collision, get new live
    this.obstacles.avoidedCollision(this.frog);
  }
}
