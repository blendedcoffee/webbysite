let spinningTitles = [];

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

      // Initialize spinning positions for each title
      spinningTitles = this.blogPosts.map((post, i) => ({
        angle: random(TWO_PI),
        radius: random(100, 300),
        speed: random(0.002, 0.008),
        post: post
      }));
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  },

  draw() {
    background(0);  // Dark like Otto Piene

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

      textSize(20);
      for (let title of spinningTitles) {
        let x = width / 2 + cos(title.angle) * title.radius;
        let y = height / 2 + sin(title.angle) * title.radius;
        fill(255);
        text(title.post.title, x, y);

        title.angle += title.speed;  // Keep spinning
      }
    }
  },

  mousePressed() {
    if (this.selectedPost) {
      this.selectedPost = null;
    } else {
      for (let title of spinningTitles) {
        let x = width / 2 + cos(title.angle) * title.radius;
        let y = height / 2 + sin(title.angle) * title.radius;

        let d = dist(mouseX, mouseY, x, y);
        if (d < 50) {  // Click detection radius
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  pages["Posts"].setup();
}

function draw() {
  pages["Posts"].draw();
}

function mousePressed() {
  pages["Posts"].mousePressed();
}
