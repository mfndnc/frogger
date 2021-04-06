class Obstacle {
  constructor(info) {
    this.name = info.name;
    this.src = info.src;
    this.rllr = info.rllr;
    this.img = info.img;
    this.width = info.img.width;
    this.height = info.img.height;
    this.iniY = info.iniY;
    if (this.rllr == 'rl') {
      this.iniX = WIDTH;
      this.direction = -1;
    } else {
      this.iniX = -200;
      this.direction = 1;
    }
    this.offsetSpeed = info.offsetSpeed;
    this.speed = 2 * this.offsetSpeed;
    this.x = this.iniX;
    this.y = this.iniY;

    this.collisionDist = 20;
  }
  setup() {}
  draw() {
    this.x += this.direction * this.speed;
    //console.log('Obstacle', this.img, this.x, this.y);
    image(this.img, this.x, this.y);
  }
  withinRange() {
    return this.x >= -200 && this.x <= WIDTH;
  }
  avoidedCollision(frog) {
    //console.log('avoidedCollision', frog.y, this.y);
    const obstacleX = this.x + this.width / 2;
    const obstacleY = this.y + this.height / 2;

    const frogX = frog.x + frog.width / 2;
    const frogY = frog.y + frog.height / 2;

    if (dist(obstacleX, obstacleY, frogX, frogY) > this.collisionDist) {
      return true;
    } else {
      console.log('colision', this.name);
      return false;
    }
  }
}
