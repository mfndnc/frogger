class Game {
  constructor() {
    this.background = new Background();
    this.frog = new Frog();
    this.testImages = [];
    this.testimg;
  }
  preload() {
    this.testImages[0] = {
      src: loadImage('./img/wip/car-left.png'),
    };
    this.testImages[1] = {
      src: loadImage('./img/wip/car-right.png'),
    };
    this.testImages[2] = {
      src: loadImage('./img/wip/car2-left.png'),
    };
    this.testImages[3] = {
      src: loadImage('./img/wip/car2-right.png'),
    };
    this.testImages[4] = {
      src: loadImage('./img/wip/tree.png'),
    };
    this.testImages[9] = {
      src: loadImage('./img/wip/wizard.bmp'),
      aa: true,
    };

    this.testImages[11] = {
      src: loadImage('./img/wip/road.png'),
    };

    this.testimg = loadImage('./img/wip/other/fuel.png');
  }

  preload2() {
    this.frog.preload();
    this.background.preload();
  }
  setup() {
    // temp just so we can see it
    background('rgba(0,255,0, 0.25)');
    //imageMode(CENTER);
    let x = 0;
    let y = 0;
    this.testImages.forEach((img) => {
      image(img.src, x, y);
      if (img.aa) {
        x = 0;
        y += img.src.height;
      } else {
        x += img.src.width;
      }
    });

    // single

    //image(this.testimg, 0, 40);
    rotate(90);
  }
  setup2() {
    this.frog.setup();
    this.background.setup();
  }

  draw() {
    //clear();
  }

  keyPressed(keyCode) {
    if (keyCode === UP_ARROW) {
      this.frog.moveUp(); //38
    }
    if (keyCode === DOWN_ARROW) {
      this.frog.moveDown(); //40
    }
    if (keyCode === LEFT_ARROW) {
      this.frog.moveLeft(); //37
    }
    if (keyCode === RIGHT_ARROW) {
      this.frog.moveRight(); //39
    }

    this.signalFrogPosition();
  }
  signalFrogPosition() {}
}
