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

  let basePoints = font.textToPoints(loadingText, 0, 0, 80, {
    sampleFactor: 0.4,
    simplifyThreshold: 0
  });

  let numRows = 6;
  let spacingY = 90;

  for (let r = 0; r < numRows; r++) {
    let rowPoints = basePoints.map(pt => ({
      x: pt.x + p.width / 2,
      y: pt.y + p.height / 2 + r * spacingY,
      row: r
    }));
    wordPoints.push(...rowPoints);
  }

  window.addEventListener('sketchReady', () => {
    loaded = true;
    p.remove();
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
  p.strokeWeight(3);

  let offsetX = p.mouseX - p.width / 2;
  let offsetY = p.mouseY - p.height / 2;

  wordPoints.forEach(point => {
    // Introduce a delay per row
    let rowLag = p.map(point.row, 0, 6, 0.1, 1.0);
    let distance = p.dist(p.mouseX, p.mouseY, point.x, point.y);
    let factor = p.map(distance, 0, p.width / 2, 0.3, 1);

    let xPos = point.x + offsetX * factor * rowLag;
    let yPos = point.y + offsetY * factor * rowLag;

    p.point(xPos, yPos);
  });
};


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// Launch the loading sketch instance
new p5(loadingSketch, 'loading-container');
