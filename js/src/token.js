class Token {
  constructor(info) {
    this.src = info.src;
    this.img = info.img;
    this.width = info.img.width;
    this.height = info.img.height;
    this.iniY = info.iniY;
    this.iniX = info.iniX;
    this.speed = info.speed;
    this.x = this.iniX;
    this.y = this.iniY;

    this.collisionDist = 20;
  }
  setup() {}
  draw() {
    this.x += this.speed;
    //console.log('Token', this.img, this.x, this.y);
    image(this.img, this.x, this.y);
    if (this.x > WIDTH) this.x = this.iniX - WIDTH;
  }
  withinRange() {
    return this.x >= -this.width && this.x <= WIDTH;
  }
  jumpSucceed(frog) {
    //console.log('avoidedCollision', frog.y, this.y);
    const obstacleX = this.x + this.width / 2;
    const obstacleY = this.y + this.height / 2;

    const frogX = frog.x + frog.width / 2;
    const frogY = frog.y + frog.height / 2;

    if (dist(obstacleX, obstacleY, frogX, frogY) > this.collisionDist) {
      return true;
    } else {
      console.log('colision', this.checkin);
      return false;
    }
  }
}
