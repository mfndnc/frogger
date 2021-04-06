class Gameover {
  constructor(status) {
    if (status) {
      this.statustext = 'YOU WON!';
    } else {
      this.statustext = 'GAME OVER';
    }
  }
  draw() {
    background(220);
    textAlign(CENTER, CENTER);
    textSize(100);

    text(this.statustext, width / 2, height / 2);
  }
}
