let font;
let colors = ['#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', '#F6C1B0', '#E6E6FA', '#FAF0D7'];
let currentIndex = 0;
let nextIndex = 1;
let lerpAmt = 0;
let textColor;
let wordPoints = [];
let loadingText = "Loading... I promise...";
let loaded = false;

function preload() {
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(80); // Make it big
  textAlign(CENTER, CENTER);

  // Pre-calculate the text points (for the collapsing effect)
  wordPoints = font.textToPoints(loadingText, 0, 0, 80, {sampleFactor: 0.5, simplifyThreshold: 0});
  
  // Position the text at the center
  wordPoints.forEach(point => {
    point.x += width / 2;
    point.y += height / 2;
  });

  // Listen for the event that the sketch is ready
  window.addEventListener('sketchReady', () => {
    loaded = true;
    // Once the sketch is ready, remove the loading screen
    remove(); // Removes the loading sketch
  });
}

function draw() {
  if (loaded) return;

  // Smoothly transition between pastel colors
  lerpAmt += 0.01;
  if (lerpAmt >= 1) {
    lerpAmt = 0;
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % colors.length;
  }

  let bg = lerpColor(color(colors[currentIndex]), color(colors[nextIndex]), lerpAmt);
  background(bg);

  // Contrast color (black or white for visibility)
  textColor = brightness(bg) > 60 ? color(30) : color(255);
  stroke(textColor);
  noFill();
  strokeWeight(4); // Stroke width for the typography

  // Animate and draw the collapsing text following the mouse
  let offsetX = mouseX - width / 2;
  let offsetY = mouseY - height / 2;

  wordPoints.forEach((point, i) => {
    let distance = dist(mouseX, mouseY, point.x, point.y);
    let factor = map(distance, 0, width / 3, 0.2, 1); // Collapsing effect
    let xPos = point.x + offsetX * factor;
    let yPos = point.y + offsetY * factor;

    // Draw the point as part of the outline of the text
    point(xPos, yPos);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
