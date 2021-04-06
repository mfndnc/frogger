class Score {
  constructor() {
    this.score = 0;
    this.lives = 3;
  }
  preload() {}
  setup() {}
  draw() {
    textAlign(LEFT, BASELINE);
    fill('black');
    stroke('black');
    rect(0, 0, WIDTH, 70);

    textSize(32);
    fill('white');
    stroke('white');

    text('Score:', 10, 40);
    text(this.score, 120, 40);

    text('Lives:', 300, 40);
    text(this.lives, 400, 40);

    if (false) {
      text('You WON!', 800, 40);
    }
    if (false) {
      text('You LOST!', 800, 40);
    }
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
