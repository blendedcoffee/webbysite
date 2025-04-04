const loadingSketch = (p) => {
  let font;
  let colors = ['#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', '#F6C1B0', '#E6E6FA', '#FAF0D7'];
  let currentIndex = 0;
  let nextIndex = 1;
  let lerpAmt = 0;
  let textColor;
  let wordPoints = [];
  let loadingText = "Loading... I promise...";
  let loaded = false;

  p.preload = () => {
    font = p.loadFont('assets/PixelifySans-VariableFont_wght.ttf');
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont(font);
    p.textSize(80);
    p.textAlign(p.CENTER, p.CENTER);

    // Generate word points
    wordPoints = font.textToPoints(loadingText, 0, 0, 80, { sampleFactor: 0.5, simplifyThreshold: 0 });

    wordPoints.forEach(point => {
      point.x += p.width / 2;
      point.y += p.height / 2;
    });

    window.addEventListener('sketchReady', () => {
      loaded = true;
      p.remove(); // Remove loading sketch when main is ready
    });
  };

  p.draw = () => {
    if (loaded) return;

    lerpAmt += 0.01;
    if (lerpAmt >= 1) {
      lerpAmt = 0;
      currentIndex = nextIndex;
      nextIndex = (nextIndex + 1) % colors.length;
    }

    let bg = p.lerpColor(p.color(colors[currentIndex]), p.color(colors[nextIndex]), lerpAmt);
    p.background(bg);

    textColor = p.brightness(bg) > 60 ? p.color(30) : p.color(255);
    p.stroke(textColor);
    p.noFill();
    p.strokeWeight(4);

    let offsetX = p.mouseX - p.width / 2;
    let offsetY = p.mouseY - p.height / 2;

    wordPoints.forEach(point => {
      let distance = p.dist(p.mouseX, p.mouseY, point.x, point.y);
      let factor = p.map(distance, 0, p.width / 3, 0.2, 1);
      let xPos = point.x + offsetX * factor;
      let yPos = point.y + offsetY * factor;

      p.point(xPos, yPos);
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// Launch the loading sketch instance
new p5(loadingSketch, 'loading-container');
