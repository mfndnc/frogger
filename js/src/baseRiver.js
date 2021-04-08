class BaseRiver {
  constructor() {
    this.imgName = './img/water.png';
    this.imgSideName = './img/tree_24.png';
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
    this.imgSide = loadImage(this.imgSideName);
  }
  setup() {
    this.width = this.img.width;
    this.height = this.img.height;
    this.repeatX = Math.ceil(WIDTH / this.width);
    this.repeatY = 10;
    this.sideRepeatX = 60;
  }
  draw() {
    // *********** tmp tmp tmp BEGIN - drawing visual helps
    /*
    stroke('brown');
    fill('brown');
    rect(
      0,
      this.gameRefs.endJumpArea,
      WIDTH,
      this.gameRefs.beginJumpArea - this.gameRefs.endJumpArea
    );
    stroke('#5C9CE2');
    fill('#5C9CE2');
    rect(
      0,
      this.gameRefs.endRiver,
      WIDTH,
      this.gameRefs.beginRiver - this.gameRefs.endRiver
    );
    stroke('white');
    fill('white');
    */
    // *********** tmp tmp tmp END - drawing visual helps

    for (let i = 0; i < this.repeatX; i++) {
      for (let j = 0; j < this.repeatY; j++) {
        image(this.img, i * this.width, j * this.height + this.iniY);
      }
    }

    for (let i = -1; i < this.sideRepeatX; i++) {
      image(this.imgSide, i * (this.imgSide.width - 15), this.sideYtop);
      image(this.imgSide, i * (this.imgSide.width - 15), this.sideYbottom);
    }
  }
  drawOLD() {
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
  updatePositions(gameRefs) {
    //console.log('this.imgSide.width', this.imgSide.width);
    this.iniY = gameRefs.endRiver - 5;

    this.sideYtop = gameRefs.endJumpArea - 15;
    this.sideYbottom = gameRefs.beginJumpArea - 25;

    this.gameRefs = gameRefs;
    /*
    gameRefs.beginRiver = this.endY;
    gameRefs.endRiver = this.iniY;
    gameRefs.beginJumpArea = this.endY + 25;
    gameRefs.endJumpArea = this.iniY - 25;
    gameRefs.jumpYsforFrog = this.frogYpositionsArray;
*/
    return gameRefs;
  }
}
