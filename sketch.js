let font;
let words = ["Zara Hussain", "Zara Hussain", "Zara Hussain", "Zara Hussain"];
let colors = ['#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', '#F6C1B0', '#E6E6FA', '#FAF0D7'];

let rows = 10;
let cols;
let frameHold = 60; // Hold each frame for ~0.75s at 60fps
let frameCounter = 0;

function preload() {
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf');
  if (!font) {
    console.error("Font failed to load!");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#F8F6EE');
  noFill();
  strokeWeight(height / 300);
  strokeJoin(ROUND);
  cols = words.length;

  // Dispatch event to hide loading screen
  window.dispatchEvent(new Event('sketchReady'));
}

function draw() {
  if (frameCounter < frameHold) {
    frameCounter++;
    return;
  }
  frameCounter = 0;

  clear();
  background('#F8F6EE');
  blendMode(MULTIPLY);

  push();
  translate(.03 * width, .025 * height);
  scale(0.8);

  for (let h = 0; h < cols; h++) {
    let myWord = words[h];
    let myH = h % 2 === 0 ? 1.52 : 1.15;

    for (let i = 0; i < rows; i++) {
      let yOffset = height * (i + myH) / rows;
      let textSize = height / rows;

      let points = font.textToPoints(myWord, width / 15 + width * h / cols, yOffset, textSize, {
        sampleFactor: 0.5,
        simplifyThreshold: map(i, 0, rows - 1, 0.01, 3.5)
      });

      stroke(random(colors));

      push();
      beginShape();
      for (let pt of points) {
        vertex(pt.x, pt.y);
      }
      endShape();
      pop();
    }
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
