class Obstacle {
  constructor(info) {
    this.src = info.src;
    this.rllr = info.rllr;
    this.img = info.img;
    this.iniY = info.iniY;
    if (this.rllr == 'rl') {
      this.iniX = WIDTH;
      this.direction = -1;
    } else {
      this.iniX = 0;
      this.direction = 1;
    }
    this.offsetSpeed = info.offsetSpeed;
    this.speed = 2 * this.offsetSpeed;
    this.x = this.iniX;
    this.y = this.iniY;
  }
  setup() {}
  draw() {
    this.x += this.direction * this.speed;
    image(this.img, this.x, this.y);
  }
}
