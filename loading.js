let loadingText = "Loading...";
let font;
let bgColor;
let textColor;
let colors = [
  '#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', 
  '#F6C1B0', '#E6E6FA', '#FAF0D7'
];
let currentIndex = 0;
let nextIndex = 1;
let lerpAmount = 0;
let mouseXPos, mouseYPos;

function preload() {
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(colors[currentIndex]);
  textColor = getContrastingColor(bgColor);
  mouseXPos = width / 2;
  mouseYPos = height / 2;
}

function draw() {
  // Smoothly transition between colors
  lerpAmount += 0.01; // Adjust speed of transition
  if (lerpAmount >= 1) {
    lerpAmount = 0;
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % colors.length;
  }

  bgColor = lerpColor(color(colors[currentIndex]), color(colors[nextIndex]), lerpAmount);
  textColor = getContrastingColor(bgColor);

  background(bgColor);

  // Draw loading text at mouse position
  fill(textColor);
  textFont(font);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(loadingText, mouseXPos, mouseYPos);
}

// Update position based on mouse movement
function mouseMoved() {
  mouseXPos = mouseX;
  mouseYPos = mouseY;
}

// Resize canvas on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Function to determine a contrasting color
function getContrastingColor(bg) {
  let r = red(bg);
  let g = green(bg);
  let b = blue(bg);
  return (r + g + b) / 3 > 127 ? color(30, 30, 30) : color(255);
}
