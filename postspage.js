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
      
      // Generate orbs arranged in circular patterns
      lightOrbs = [];
      for (let i = 0; i < 80; i++) {
        let centerX = random(width);
        let centerY = random(height);
        let baseRadius = random(20, 200);
        let startAngle = random(TWO_PI);
        let speed = random(0.001, 0.005);
      
        lightOrbs.push({
          centerX,
          centerY,
          baseRadius,
          angle: startAngle,
          speed,
          size: random(3, 5),
          baseSize: random(3, 5),
        });
      }
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  },

  draw() {
    background(0); // dark gallery vibe
    
    // Draw tiny soft-yellow light orbs orbiting invisible centers
    noStroke();
    for (let orb of lightOrbs) {
      let x = orb.centerX + cos(orb.angle) * orb.baseRadius;
      let y = orb.centerY + sin(orb.angle) * orb.baseRadius;
    
      orb.angle += orb.speed;
    
      let twinkle = sin(frameCount * 0.1 + orb.angle * 10) * 0.5 + 1;
      let glow = color(255, 248, 204, 180);  // soft yellow light
    
      fill(glow);
      ellipse(x, y, orb.baseSize * twinkle);
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
        let str = title.post.title;
        let r = title.radius;
        let angleOffset = title.angle;
  
        for (let i = 0; i < str.length; i++) {
          let charAngle = angleOffset + i * (PI / str.length) * 2;
          let x = width / 2 + cos(charAngle) * r;
          let y = height / 2 + sin(charAngle) * r;
  
          let d = dist(mouseX, mouseY, x, y);
          if (d < 20) {  // Smaller hit radius for each letter
            this.selectedPost = title.post;
            return;
          }
        }
      }
    }
  },

  async setup() {
    await this.loadBlogPosts();
  }
};
