class Tokens {
  constructor() {
    this.imagesRef = {
      logs: [
        { src: './img/woodbigs.png', speed: 1.6, laneY: 200, t: 174 },
        { src: './img/woodsmls.png', speed: 1, laneY: 240, t: 94 },
        { src: './img/woodmeds.png', speed: 1.2, laneY: 280, t: 135 },
      ],
    };
    this.traffic = [];
    this.frameTrigger = 20;
  }
  // p5 equiv funcs
  preload() {
    this.imagesRef.logs.forEach((img, i) => {
      this.imagesRef.logs[i].img = loadImage(img.src);
    });
  }
  setup() {
    this.imagesRef.logs.forEach((wood, ind) => {
      for (let i = -wood.t; i < WIDTH; i += wood.t * 2) {
        wood.iniY = wood.laneY;
        wood.iniX = i;
        this.traffic.push(new Token(wood));
        console.log(ind, wood.iniX);
      }
    });
  }
  draw() {
    this.traffic.forEach(function (token) {
      token.draw();
    });
  }
  // game

  jumpSucceed(frog) {
    for (let token of this.traffic) {
      if (!token.jumpSucceed(frog)) return false;
    }
    return true;
  }
}
