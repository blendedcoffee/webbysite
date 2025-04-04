let currentPage = "Main";
let pages = {};
let menuItems = ["Main", "Calendar", "Posts", "Media"];
let mediaSubpages = ["Films & TV", "Books", "Music"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);

  // Placeholder page draw functions
  pages["Main"] = {
    draw: function () {
      fill(0);
      text("Welcome to the Main Page!", width / 2, height / 2);
    }
  };

  pages["Calendar"] = {
    draw: function () {
      fill(0);
      text("This is the Calendar Page.", width / 2, height / 2);
    }
  };

  pages["Posts"] = {
    draw: function () {
      fill(0);
      text("This is the Posts Page.", width / 2, height / 2);
    }
  };

  pages["Media"] = {
    draw: function () {
      fill(0);
      text("Select a Media Subpage.", width / 2, height / 2);
    }
  };

  pages["Films & TV"] = {
    draw: function () {
      fill(0);
      text("This is the Films & TV Page.", width / 2, height / 2);
    }
  };

  pages["Books"] = {
    draw: function () {
      fill(0);
      text("This is the Books Page.", width / 2, height / 2);
    }
  };

  pages["Music"] = {
    draw: function () {
      fill(0);
      text("This is the Music Page.", width / 2, height / 2);
    }
  };
}

function draw() {
  clear();
  background('#F8F6EE');

  drawNav(); // Always draw nav

  if (pages[currentPage] && pages[currentPage].draw) {
    pages[currentPage].draw();
  }
}

function drawNav() {
  let navHeight = 60;
  let totalItems = menuItems.length + (currentPage === "Media" ? mediaSubpages.length : 0);
  let itemWidth = width / totalItems;

  // Background bar
  fill('#FFF4B1');
  noStroke();
  rect(0, 0, width, navHeight);

  // Draw top-level menu items
  for (let i = 0; i < menuItems.length; i++) {
    let label = menuItems[i];
    let x = i * itemWidth + itemWidth / 2;
    let y = navHeight / 2;

    if (isMouseOver(x, y, itemWidth, navHeight)) {
      fill('#FFD6E8');
      if (mouseIsPressed) {
        currentPage = label;
      }
    } else {
      fill(0);
    }

    text(label, x, y);
  }

  // Draw subpages under "Media" if it's the current page
  if (currentPage === "Media") {
    for (let i = 0; i < mediaSubpages.length; i++) {
      let label = mediaSubpages[i];
      let x = (menuItems.length + i) * itemWidth + itemWidth / 2;
      let y = navHeight / 2;

      if (isMouseOver(x, y, itemWidth, navHeight)) {
        fill('#F6C1B0');
        if (mouseIsPressed) {
          currentPage = label;
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
