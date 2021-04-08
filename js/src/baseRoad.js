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
    // tried but failed to find it pretty
    this.decorations = [];
  }
  //  p5 equiv funcs
  preload() {
    this.img = loadImage(this.imgName);
    this.decorations.forEach((img, i) => {
      this.decorations[i].img = loadImage(img.src);
    });
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

    this.decorations.forEach((deco) =>
      image(deco.img, deco.x, this.iniY + deco.y)
    );
  }
  // game
  getXYWH() {
    return [this.iniX, this.iniY, this.width, this.height];
  }
}
