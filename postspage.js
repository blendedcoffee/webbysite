let spinningTitles = [];
let lightOrbs = [];

pages["Posts"] = {
  blogPosts: [],
  selectedPost: null,

  async loadBlogPosts() {
    try {
      const response1 = await fetch('blog/FirstPost.json');
      const response2 = await fetch('blog/SecondPost.json');
      const post1 = await response1.json();
      const post2 = await response2.json();
      this.blogPosts = [post1, post2];

      spinningTitles = this.blogPosts.map((post, i) => ({
        angle: random(TWO_PI),
        radius: 150 + i * 60,
        speed: random(0.001, 0.005),
        post: post
      }));

      // Generate orbs
      lightOrbs = [];
      for (let i = 0; i < 30; i++) {
        lightOrbs.push({
          x: random(width),
          y: random(height),
          size: random(20, 80),
          speedX: random(-0.5, 0.5),
          speedY: random(-0.5, 0.5),
          baseSize: random(20, 80),
          color: color(random(180, 255), random(100, 255), random(180, 255))
        });
      }
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  },

  draw() {
    background(0); // dark gallery vibe

    // Draw light orbs
    noStroke();
    for (let orb of lightOrbs) {
      orb.x += orb.speedX;
      orb.y += orb.speedY;

      // Bounce off walls
      if (orb.x < 0 || orb.x > width) orb.speedX *= -1;
      if (orb.y < 0 || orb.y > height) orb.speedY *= -1;

      let twinkle = sin(frameCount * 0.05 + orb.x * 0.01 + orb.y * 0.01) * 0.5 + 1;
      fill(orb.color.levels[0], orb.color.levels[1], orb.color.levels[2], 100);
      ellipse(orb.x, orb.y, orb.baseSize * twinkle);
    }

    if (this.selectedPost) {
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      text(this.selectedPost.content, width / 2, height / 2);
    } else {
      textAlign(CENTER, CENTER);
      textSize(30);
      fill(255);
      text("Posts Page", width / 2, 50);

      for (let title of spinningTitles) {
        this.drawCurvedText(title);
        title.angle += title.speed;
      }
    }
  },

  drawCurvedText(titleData) {
    let str = titleData.post.title;
    let r = titleData.radius;
    let angleOffset = titleData.angle;

    let twinkle = sin(frameCount * 0.05 + r) * 0.5 + 1.3; // slight size pulse

    push();
    translate(width / 2, height / 2);
    fill(lerpColor(color("#FFD6E8"), color("#E0FFFF"), sin(titleData.angle * 2) * 0.5 + 0.5));
    noStroke();

    for (let i = 0; i < str.length; i++) {
      let charAngle = angleOffset + i * (PI / str.length) * 2;
      let x = cos(charAngle) * r;
      let y = sin(charAngle) * r;
      push();
      translate(x, y);
      rotate(charAngle + HALF_PI);
      textSize(20 * twinkle);
      text(str[i], 0, 0);
      pop();
    }
    pop();
  },

  mousePressed() {
    if (this.selectedPost) {
      this.selectedPost = null;
    } else {
      for (let title of spinningTitles) {
        let mx = width / 2 + cos(title.angle) * title.radius;
        let my = height / 2 + sin(title.angle) * title.radius;
        let d = dist(mouseX, mouseY, mx, my);
        if (d < 50) {
          this.selectedPost = title.post;
          break;
        }
      }
    }
  },

  async setup() {
    await this.loadBlogPosts();
  }
};
