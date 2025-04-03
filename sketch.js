let font;

function preload() {
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#F8F6EE');

  // Now, dispatch the event to let the loading screen know the sketch is ready
  window.dispatchEvent(new Event('sketchReady'));

let words;
let colors = [
  '#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', 
  '#F6C1B0', '#E6E6FA', '#FAF0D7'
];

let wordPoints = [];
let rows = 10;
let cols = 5;

function preload() {
  font = loadFont('PixelifySans-VariableFont_wght.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#F8F6EE');
}

function draw() {
  words = ['Zara Hussain', 'Zara Hussain', 'Zara Hussain', 'Zara Hussain'];
  cols = words.length;

  clear();
  background('#F8F6EE');
  frameRate(0.75);
  blendMode(MULTIPLY);
  noFill();
  strokeWeight(height / 300);
  strokeJoin(ROUND);  
  push();
  translate(0.03 * width, 0.025 * height);
  scale(0.8);

  for (let h = 0; h < cols; h++) {
    let myWord = words[h % words.length]; 
    let myH = (h % 2 == 0) ? 1.52 : 1.15;
    
    for (let i = 0; i <= rows; i++) {
      wordPoints[i] = font.textToPoints(myWord, width / 15 + width * h / cols, height * (i + myH) / rows, height / rows, {
        sampleFactor: 0.5,
        simplifyThreshold: map(i, 0, rows - 1, 0.01, 3.5)
      });

      stroke(colors[int(random(colors.length))]);

      push();
      beginShape();
      for (let j = 0; j < wordPoints[i].length; j++) {
        vertex(wordPoints[i][j].x, wordPoints[i][j].y);
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
