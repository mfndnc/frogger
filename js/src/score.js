class Score {
  constructor() {
    this.safeY = 0;
    this.score = 0;
    this.lives = 3;
    this.textHeight = 45;
  }
  preload() {}
  setup() {}
  draw() {
    textAlign(LEFT, BASELINE);
    fill('#1E2C19');
    stroke('#1E2C19');
    rect(0, 0, WIDTH, 70);

    textSize(32);
    fill('white');
    stroke('white');

    text('Score:', 20, this.textHeight);
    text(this.score, 130, this.textHeight);

    text('Lives:', 300, this.textHeight);
    text(this.lives, 400, this.textHeight);
  }

  setTargetYPosition(num) {
    this.safeY = num;
  }
  getReachedTarget(frog) {
    return frog.y < this.safeY;
  }

  setReachedTarget() {
    this.score++;
    this.shouldLooseALive();
  }
  shouldLooseALive() {
    this.lives--;
  }
  hasLivesLeft() {
    return this.lives > 0;
  }
  getScore() {
    return this.score;
  }
}
