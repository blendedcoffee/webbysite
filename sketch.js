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

let font;
let menuItems = ["Calendar", "Posts", "Media"];
let mediaSubpages = ["Films & TV", "Books", "Music"];
let currentPage = "Main"; // Tracks the current page

function preload() {
  font = loadFont('assets/PixelifySans-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#FFF4B1'); // Same yellow background as the main page
  textFont(font);
  textSize(40);
  textAlign(CENTER, CENTER);

  // Draw the navigation menu
  drawMenu();
}

function draw() {
  // Depending on the page, draw different content
  if (currentPage === "Calendar") {
    drawCalendarPage();
  } else if (currentPage === "Posts") {
    drawPostsPage();
  } else if (currentPage === "Media") {
    drawMediaPage();
  }

  // Other page logic...
}

// Draw the navigation menu at the top
function drawMenu() {
  fill(0);
  textSize(30);
  let yOffset = 50;

  // Draw "Main" button
  text("Main", width / 2, yOffset);

  // Draw menu items
  let itemHeight = 60;
  for (let i = 0; i < menuItems.length; i++) {
    let menuItemX = width / 2;
    let menuItemY = yOffset + (i + 1) * itemHeight;

    if (isMouseOver(menuItemX, menuItemY, 200, itemHeight)) {
      fill(200, 100, 50); // Change color on hover
      if (mouseIsPressed) {
        currentPage = menuItems[i]; // Change to the corresponding page on click
      }
    } else {
      fill(0); // Default color
    }

    text(menuItems[i], menuItemX, menuItemY);
  }

  // Draw subpages under "Media"
  if (currentPage === "Media") {
    for (let i = 0; i < mediaSubpages.length; i++) {
      let menuItemX = width / 2;
      let menuItemY = yOffset + (menuItems.length + i + 1) * itemHeight;

      if (isMouseOver(menuItemX, menuItemY, 200, itemHeight)) {
        fill(200, 100, 50);
        if (mouseIsPressed) {
          currentPage = mediaSubpages[i]; // Change to the corresponding media subpage
        }
      } else {
        fill(0);
      }

      text(mediaSubpages[i], menuItemX, menuItemY);
    }
  }
}

// Check if mouse is over the menu item
function isMouseOver(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

// Dummy page content - you can replace with your actual content
function drawCalendarPage() {
  background('#FFF4B1'); // Maintain yellow background
  textSize(50);
  text("Calendar Page", width / 2, height / 2);
}

function drawPostsPage() {
  background('#FFF4B1'); // Maintain yellow background
  textSize(50);
  text("Posts Page", width / 2, height / 2);
}

function drawMediaPage() {
  background('#FFF4B1'); // Maintain yellow background
  textSize(50);
  text("Media Page", width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
