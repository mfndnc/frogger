class Background {
  constructor() {
    this.imgName = './img/wip/road.png';
    this.iniX = 0;
    this.iniY = 0;
    this.repeatX;
    this.repeatY;
    this.img;
  }
  //  p5 equiv funcs
  preload() {
    this.img = loadImage(this.imgName);
  }
  setup() {
    this.repeatX = Math.ceil(WIDTH / this.img.width);
    this.repeatY = 2;
    this.iniY = HEIGHT - this.repeatY * this.img.height - 50;
  }
  draw() {
    for (let i = 0; i < this.repeatX; i++) {
      for (let j = 0; j < this.repeatY; j++) {
        image(this.img, i * this.img.width, j * this.img.height + this.iniY);
      }
    }
  }

  // game
  signalRiverPosition() {
    return [0, 0];
  }
  signalRoadPosition() {
    return [this.iniX, this.iniY, this.img.width, this.img.height];
  }
}
