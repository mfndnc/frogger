class TestImages {
  constructor() {
    this.testImages = [];
    this.testimg;
  }

  preload() {
    this.testImages[0] = {
      src: loadImage('./img/wip/trees/tree_01.png'),
    };
    this.testImages[1] = {
      src: loadImage('./img/wip/trees/tree_02.png'),
    };
    this.testImages[2] = {
      src: loadImage('./img/wip/trees/tree_46.png'),
    };

    this.testImages[8] = {
      src: loadImage('./img/wip/more/car2.png'),
      scaleW: 38,
      scaleH: 16,
    };

    this.testImages[9] = {
      src: loadImage('./img/wip/trees/tree_55.png'),
      aa: true,
    };

    this.testImages[11] = {
      src: loadImage('./img/wip/building-block-assets/stone_brick_alt.png'),
    };
    this.testImages[12] = {
      src: loadImage('./img/wip/building-block-assets/stonebrickwall.png'),
    };
    this.testImages[19] = {
      src: loadImage('./img/wip/building-block-assets/Brickwallbrick.png'),
      aa: true,
    };

    this.testImages[21] = {
      src: loadImage('./img/wip/water_00_strip13.png'),
    };
    this.testImages[22] = {
      src: loadImage('./img/wip/water16x16.gif'),
      aa: true,
    };

    this.testImages[31] = {
      src: loadImage('./img/wip/woodsmalls.png'),
      aa: true,
    };
    this.testImages[41] = {
      src: loadImage('./img/wip/woodmediums.png'),
      aa: true,
    };
    this.testImages[51] = {
      src: loadImage('./img/wip/woodbigs.png'),
      aa: true,
    };
    this.testimg = loadImage('./img/wip/trees/tree_13.png');
  }

  setup() {
    // temp just so we can see it
    background('rgba(0,255,0, 0.25)');
    //imageMode(CENTER);
    let x = 0;
    let y = 0;
    this.testImages.forEach((img) => {
      if (img.scaleW) {
        image(img.src, x, y, img.scaleW, img.scaleH);
      } else {
        image(img.src, x, y);
      }
      if (img.aa) {
        x = 0;
        y += img.src.height;
      } else {
        x += img.src.width;
      }
      console.log(img, img.src.width, img.src.height);
    });

    // single

    image(this.testimg, 0, 40);
    rotate(90);
  }
}
