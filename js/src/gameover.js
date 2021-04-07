class Gameover {
  constructor(score) {
    if (score > 0) {
      this.statustext = 'YOU SCORE IS: ' + score;
    } else {
      this.statustext = 'GAME OVER';
    }
  }
  draw() {
    background('#CCDEC5');
    textAlign(CENTER, CENTER);
    textSize(100);
    text(this.statustext, width / 2, height / 2);
  }
}
