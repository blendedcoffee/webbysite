let currentPage = "Main";
let pages = {};

function preload() {
  if (pages[currentPage]?.preload) {
    pages[currentPage].preload();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont('sans-serif'); // fallback

  if (pages[currentPage]?.setup) {
    pages[currentPage].setup();
  }
}

function draw() {
  background('#F8F6EE');
  drawVerticalMenu();

  if (pages[currentPage]?.draw) {
    pages[currentPage].draw();
  }
}

function mousePressed() {
  if (mouseX < 150) {
    let menuItems = Object.keys(pages);
    let itemHeight = 50;
    for (let i = 0; i < menuItems.length; i++) {
      let y = i * itemHeight + 50;
      if (mouseY > y - 25 && mouseY < y + 25) {
        currentPage = menuItems[i];
        if (pages[currentPage]?.setup) {
          pages[currentPage].setup();
        }
        break;
      }
    }
  }
}

function drawVerticalMenu() {
  let menuItems = Object.keys(pages);
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(0);
  for (let i = 0; i < menuItems.length; i++) {
    let x = 20;
    let y = i * 50 + 50;

    if (mouseX < 150 && mouseY > y - 25 && mouseY < y + 25) {
      fill(200, 100, 50);
    } else {
      fill(0);
    }

    text(menuItems[i], x, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
