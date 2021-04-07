class Score {
  constructor() {
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
  broadcastReachedTarget() {
    this.score++;
    return this.shouldLooseALive();
  }
  shouldLooseALive() {
    this.lives--;
    return this.lives > 0;
  }
}
