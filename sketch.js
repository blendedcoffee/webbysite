let font;
let words = ["Zara Hussain", "Zara Hussain", "Zara Hussain", "Zara Hussain"];
let colors = ['#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', '#F6C1B0', '#E6E6FA', '#FAF0D7'];
let wordPoints = [];
let rows = 10;
let cols = 5;

function preload() {
  // Load the custom font from assets
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf');
  
  if (!font) {
    console.error("Font failed to load!");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#F8F6EE');
  
  // Dispatch the 'sketchReady' event to let the loading screen know the sketch is ready
  window.dispatchEvent(new Event('sketchReady'));
  
  // Set properties for drawing
  noFill();
  strokeWeight(height / 300);
  strokeJoin(ROUND);
}

function draw() {
  cols = words.length;  // Set the number of columns based on the number of words
  clear();
  background('#F8F6EE');
  
  frameRate(0.75);  // Control the speed of animation
  blendMode(MULTIPLY);
  
  push();
  translate(.03 * width, .025 * height);  // Adjust the starting point for drawing
  scale(0.8);  // Scale the drawing

  // Loop over each word and render it
  for (let h = 0; h < cols; h++) {
    let myWord = words[h % words.length];  // Select the word to draw
    let myH = 1.15;
    if (h % 2 == 0) {
      myH = 1.52;
    }

    // Generate the points for the current word
    wordPoints = font.textToPoints(myWord, width / 15 + width * h / cols, height * (myH) / rows, height / rows, {
      sampleFactor: 0.5,
      simplifyThreshold: 0.1
    });

    // Check if wordPoints are being generated
    console.log(wordPoints);

    // Loop through rows and draw each line of points for the word
    for (let i = 0; i < rows; i++) {
      stroke(colors[int(random(colors.length))]);  // Random color from pastel palette
      push();
      beginShape();  // Start the shape to connect the points
      for (let j = 0; j < wordPoints.length; j++) {
        const p1 = wordPoints[j];
        vertex(p1.x, p1.y);  // Draw a point at (x, y)
      }
      endShape();  // End the shape
      pop();
    }
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
