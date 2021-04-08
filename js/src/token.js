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

    this.collisionDist = 30;
  }
  setup() {}
  draw() {
    this.x += this.speed;
    //console.log('Token', this.img, this.x, this.y);

    // *********** tmp tmp tmp BEGIN - drawing visual helps
    stroke('blue');
    fill('blue');
    rect(this.x, this.y, this.width, this.height);

    stroke('white');
    fill('white');
    // *********** tmp tmp tmp END - drawing visual helps
    image(this.img, this.x, this.y);
  }
  withinRange() {
    return this.x >= -this.width && this.x <= WIDTH;
  }
  jumpSucceed(frog) {
    //console.log('jumpSucceed', frog.x, frog.y, this.x, this.y);
    if (
      frog.x > this.x &&
      frog.y >= this.y &&
      frog.x < this.x + this.width - frog.width &&
      frog.y <= this.y + frog.height
    ) {
      //console.log('on top of wood', frog.y, this.y);
      return true;
    } else {
      return false;
    }

    //console.log('avoidedCollision', frog.y, this.y);
    const obstacleX = this.x + this.width / 2;
    const obstacleY = this.y + this.height / 2;

    const frogX = frog.x + frog.width / 2;
    const frogY = frog.y + frog.height / 2;

    if (dist(obstacleX, obstacleY, frogX, frogY) > this.collisionDist) {
      return false;
    } else {
      return true;
    }
  }
}
