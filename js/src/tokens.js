class Tokens {
  constructor() {
    this.eachWoodDelta = 40;
    this.iniY = 200;
    this.endY;
    this.frogYpositionsArray = [];
    this.frogYpositionDelta = 5;
    this.imagesRef = {
      logs: [
        { src: './img/woodbigs.png', speed: 1, t: 174, frame: 300 },
        { src: './img/woodsmls.png', speed: 1.2, t: 94, frame: 150 },
      ],
    };
    /* 
         { src: './img/woodbigs.png', speed: 2, t: 174, frame: 190 },
        { src: './img/woodsmls.png', speed: 1.2, t: 94, frame: 150 },
        { src: './img/woodmeds.png', speed: 1.5, t: 135, frame: 210 },
        { src: './img/woodbigs.png', speed: 1.7, t: 174, frame: 190 },   
    */

    /*
        { src: './img/woodbigs.png', speed: 1, t: 174, frame: 300 },
        { src: './img/woodsmls.png', speed: 1.2, t: 94, frame: 150 },

    */
    this.traffic = [];
    this.frameTrigger = 20;
  }
  // p5 equiv funcs
  preload() {
    this.frogYpositionsArray.push(
      this.iniY - this.eachWoodDelta + this.frogYpositionDelta
    );
    this.imagesRef.logs.forEach((img, i) => {
      this.imagesRef.logs[i].img = loadImage(img.src);
      this.imagesRef.logs[i].iniY = this.iniY + i * this.eachWoodDelta;
      this.frogYpositionsArray.push(
        this.imagesRef.logs[i].iniY + this.frogYpositionDelta
      );
    });
    this.frogYpositionsArray.push(
      this.iniY +
        this.imagesRef.logs.length * this.eachWoodDelta +
        this.frogYpositionDelta
    );
    this.endY =
      this.iniY + this.imagesRef.logs.length * this.eachWoodDelta - 10;
    console.log('this.endY', this.endY, this.frogYpositionsArray);
  }
  setup() {
    this.traffic.forEach(function (token) {
      token.setup();
    });
  }
  draw() {
    this.imagesRef.logs.forEach((wood) => {
      if (frameCount % wood.frame === 0) {
        wood.iniX = -wood.img.width;
        this.traffic.push(new Token(wood));
      }
    });
    this.traffic.forEach(function (token) {
      token.draw();
    });

    this.traffic = this.traffic.filter(function (token) {
      return token.withinRange();
    });
  }
  // game

  jumpSucceed(frog) {
    if (frog.y + frog.heigth < this.iniY) console.log('op1', frog.y, this.iniY);
    if (frog.y - frog.heigth > this.endY) console.log('op2', frog.y, this.endY);
    if (frog.y < this.iniY || frog.y > this.endY) return true;
    for (let token of this.traffic) {
      if (token.jumpSucceed(frog)) return token;
    }
    return false;
  }

  updatePositions(arr, gameRefs) {
    gameRefs.beginRiver = this.endY;
    gameRefs.endRiver = this.iniY;
    gameRefs.beginJumpArea = this.endY + 25;
    gameRefs.endJumpArea = this.iniY - 25;
    gameRefs.jumpYsforFrog = this.frogYpositionsArray;

    return gameRefs;
  }
}
