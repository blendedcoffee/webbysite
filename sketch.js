let font;
let words = ["Zara Hussain", "Zara Hussain", "Zara Hussain", "Zara Hussain"];
let colors = ['#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', '#F6C1B0', '#E6E6FA', '#FAF0D7'];

let rows = 10;
let cols;
let frameHold = 60;
let frameCounter = 0;

let menuItems = ["Calendar", "Posts", "Media"];
let mediaSubpages = ["Films & TV", "Books", "Music"];
let currentPage = "Main";

function preload() {
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf');
  if (!font) {
    console.error("Font failed to load!");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#FFF4B1');
  textFont(font);
  textSize(40);
  textAlign(CENTER, CENTER);
  cols = words.length;
  window.dispatchEvent(new Event('sketchReady'));
}

function draw() {
  clear();
  background('#F8F6EE');
  blendMode(BLEND);

  if (currentPage === "Main") {
    drawMainAnimation();
  } else {
    drawPage(currentPage);
  }

  drawMenu();
}

function drawMainAnimation() {
  if (frameCounter < frameHold) {
    frameCounter++;
    return;
  }
  frameCounter = 0;

  blendMode(MULTIPLY);
  push();
  translate(.03 * width, .025 * height);
  scale(0.8);

  for (let h = 0; h < cols; h++) {
    let myWord = words[h];
    let myH = h % 2 === 0 ? 1.52 : 1.15;

    for (let i = 0; i < rows; i++) {
      let yOffset = height * (i + myH) / rows;
      let textSizeVal = height / rows;

      let points = font.textToPoints(myWord, width / 15 + width * h / cols, yOffset, textSizeVal, {
        sampleFactor: 0.5,
        simplifyThreshold: map(i, 0, rows - 1, 0.01, 3.5)
      });

      stroke(random(colors));
      noFill();
      beginShape();
      for (let pt of points) {
        vertex(pt.x, pt.y);
      }
      endShape();
    }
  }

  pop();
}

function drawMenu() {
  fill(0);
  textSize(30);
  let yOffset = 50;

  // Draw "Main" button
  if (isMouseOver(width / 2, yOffset, 200, 40)) {
    fill(200, 100, 50);
    if (mouseIsPressed) currentPage = "Main";
  } else {
    fill(0);
  }
  text("Main", width / 2, yOffset);

  let itemHeight = 60;
  for (let i = 0; i < menuItems.length; i++) {
    let x = width / 2;
    let y = yOffset + (i + 1) * itemHeight;

    if (isMouseOver(x, y, 200, itemHeight)) {
      fill(200, 100, 50);
      if (mouseIsPressed) currentPage = menuItems[i];
    } else {
      fill(0);
    }

    text(menuItems[i], x, y);
  }

  // Subpages under Media
  if (currentPage === "Media") {
    for (let i = 0; i < mediaSubpages.length; i++) {
      let x = width / 2;
      let y = yOffset + (menuItems.length + i + 1) * itemHeight;

      if (isMouseOver(x, y, 200, itemHeight)) {
        fill(200, 100, 50);
        if (mouseIsPressed) currentPage = mediaSubpages[i];
      } else {
        fill(0);
      }

      text(mediaSubpages[i], x, y);
    }
  }
}

function drawPage(pageName) {
  background('#FFF4B1');
  fill(0);
  textSize(50);
  text(`${pageName} Page`, width / 2, height / 2);
}

function isMouseOver(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
