let spinningTitles = [];
let lightOrbs = [];
let lightLines = [];

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

      // Initialize spinning title positions
      spinningTitles = this.blogPosts.map((post, i) => ({
        angle: random(TWO_PI),
        radius: random(150, 300),
        speed: random(0.002, 0.008),
        post: post
      }));

      // Create layered orb systems
      lightOrbs = [];
      for (let i = 0; i < 12; i++) {
        let centerX = random(width);
        let centerY = random(height);
        let baseRadius = random(100, 300);
        let numLayers = floor(random(1, 4));
        let layers = [];

        for (let l = 0; l < numLayers; l++) {
          let numDots = floor(random(30, 60));
          let dots = [];

          for (let j = 0; j < numDots; j++) {
            let angle = map(j, 0, numDots, 0, TWO_PI);
            dots.push({
              angleOffset: angle,
              size: random(2, 4)
            });
          }

          layers.push({
            baseRadius: baseRadius + l * 20,
            speed: random(0.0005, 0.003),
            rotation: random(TWO_PI),
            dots: dots
          });
        }

        lightOrbs.push({
          centerX,
          centerY,
          layers
        });
      }

      // Create dotted light lines
      lightLines = [];
      for (let i = 0; i < 10; i++) {
        let x1 = random(width);
        let y1 = random(height);
        let x2 = random(width);
        let y2 = random(height);
        let numDots = floor(random(20, 50));
        let phase = random(TWO_PI);
        let speed = random(0.001, 0.003);

        lightLines.push({
          x1,
          y1,
          x2,
          y2,
          numDots,
          phase,
          speed
        });
      }

    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  },

  draw() {
    background(0);  // Deep dark background

    let glow = color(255, 248, 204, 180);
    noStroke();

    // Draw layered orb systems
    for (let orb of lightOrbs) {
      for (let layer of orb.layers) {
        layer.rotation += layer.speed;

        for (let dot of layer.dots) {
          let angle = layer.rotation + dot.angleOffset;
          let x = orb.centerX + cos(angle) * layer.baseRadius;
          let y = orb.centerY + sin(angle) * layer.baseRadius;

          let twinkle = sin(frameCount * 0.1 + dot.angleOffset * 8) * 0.5 + 1;
          fill(glow);
          ellipse(x, y, dot.size * twinkle);
        }
      }
    }

    // Draw dotted light lines
    for (let line of lightLines) {
      line.phase += line.speed;

      for (let i = 0; i < line.numDots; i++) {
        let t = (i / line.numDots + sin(line.phase) * 0.5 + 0.5) % 1.0;
        let x = lerp(line.x1, line.x2, t);
        let y = lerp(line.y1, line.y2, t);

        let twinkle = sin(frameCount * 0.1 + i) * 0.5 + 1;
        fill(glow);
        ellipse(x, y, 3 * twinkle);
      }
    }

    // Draw blog post content or spinning titles
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

      // Curved spinning blog post titles
      textSize(20);
      for (let title of spinningTitles) {
        let str = title.post.title;
        let r = title.radius;
        let angleOffset = title.angle;

        for (let i = 0; i < str.length; i++) {
          let charAngle = angleOffset + i * (PI / str.length) * 2;
          let x = width / 2 + cos(charAngle) * r;
          let y = height / 2 + sin(charAngle) * r;

          let twinkle = sin(frameCount * 0.1 + i + angleOffset * 10) * 0.5 + 1;
          fill(255, 248, 204);
          text(str[i], x, y);
        }

        title.angle += title.speed;
      }
    }
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
          if (d < 20) {
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
