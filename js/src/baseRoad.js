class BaseRoad {
  constructor() {
    this.imgName = './img/road.png';
    this.iniX = 0;
    this.iniY = 0;
    this.repeatX;
    this.repeatY;
    this.img;
    this.width;
    this.height;
  }
  //  p5 equiv funcs
  preload() {
    this.img = loadImage(this.imgName);
  }
  setup() {
    this.width = this.img.width;
    this.height = this.img.height;
    this.repeatX = Math.ceil(WIDTH / this.width);
    this.repeatY = 2;
    this.iniY = HEIGHT - this.repeatY * this.height - 50;
  }
  draw() {
    for (let i = 0; i < this.repeatX; i++) {
      for (let j = 0; j < this.repeatY; j++) {
        image(this.img, i * this.width, j * this.height + this.iniY);
      }
    }
  }

  // game
  signalRoadPosition() {
    return [this.iniX, this.iniY, this.width, this.height];
  }
}
