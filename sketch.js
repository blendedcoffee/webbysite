let currentPage = "Main";
let pages = {};
let menuItems = ["Main", "Calendar", "Posts", "Media"];
let mediaSubpages = ["Films & TV", "Books", "Music"];
let pixelFont;

function preload() {
  pixelFont = loadFont('assets/PixelifySans-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  textSize(24);

  if (pages[currentPage] && pages[currentPage].setup) {
    pages[currentPage].setup();
  }
}

function draw() {
  clear();
  background('#F8F6EE');

  drawNav();

  if (pages[currentPage] && pages[currentPage].draw) {
    pages[currentPage].draw();
  }
}

function drawNav() {
  let navHeight = 60;
  let totalItems = menuItems.length + (currentPage === "Media" ? mediaSubpages.length : 0);
  let itemWidth = width / totalItems;

  fill('#FFF4B1');
  noStroke();
  rect(0, 0, width, navHeight);

  textFont(pixelFont);
  fill(0);

  for (let i = 0; i < menuItems.length; i++) {
    let label = menuItems[i];
    let x = i * itemWidth + itemWidth / 2;
    let y = navHeight / 2;

    if (isMouseOver(x, y, itemWidth, navHeight)) {
      fill('#FFD6E8');
      if (mouseIsPressed) {
        changePage(label);
      }
    } else {
      fill(0);
    }

    text(label, x, y);
  }

  if (currentPage === "Media") {
    for (let i = 0; i < mediaSubpages.length; i++) {
      let label = mediaSubpages[i];
      let x = (menuItems.length + i) * itemWidth + itemWidth / 2;
      let y = navHeight / 2;

      if (isMouseOver(x, y, itemWidth, navHeight)) {
        fill('#F6C1B0');
        if (mouseIsPressed) {
          changePage(label);
        }
      } else {
        fill(0);
      }

      text(label, x, y);
    }
  }
}

function isMouseOver(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 &&
         mouseY > y - h / 2 && mouseY < y + h / 2;
}

function changePage(newPage) {
  if (newPage !== currentPage) {
    currentPage = newPage;
    if (pages[currentPage] && pages[currentPage].setup) {
      pages[currentPage].setup();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
