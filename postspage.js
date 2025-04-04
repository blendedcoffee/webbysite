pages["Posts"] = {
  blogPosts: [],  // Array to hold blog posts

  selectedPost: null,  // To store the selected blog post

  async loadBlogPosts() {
    try {
      // Fetch the JSON files for each blog post
      const response1 = await fetch('blog/FirstPost.json');
      const response2 = await fetch('blog/SecondPost.json');
      // Add more posts as needed

      // Convert the response into JSON
      const post1 = await response1.json();
      const post2 = await response2.json();
      
      // Populate the blogPosts array
      this.blogPosts = [post1, post2];
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  },

  draw() {
    background('#F8F6EE');
    
    if (this.selectedPost) {
      // If a post is selected, display its content
      textSize(20);
      fill(0);
      text(this.selectedPost.content, width / 2, height / 2);
    } else {
      // Display the list of blog post titles
      textSize(30);
      fill(0);
      text("Posts Page", width / 2, 50);  // Title of the page
      
      for (let i = 0; i < this.blogPosts.length; i++) {
        let title = this.blogPosts[i].title;
        let y = 100 + i * 60;  // Adjust vertical position of titles
        
        // Draw a "button" for each blog post title
        textSize(20);
        text(title, width / 2, y);
      }
    }
  },

  mousePressed() {
    if (this.selectedPost) {
      // If a post is selected, click anywhere to go back to the list
      this.selectedPost = null;
    } else {
      // Check if any of the titles were clicked
      for (let i = 0; i < this.blogPosts.length; i++) {
        let y = 100 + i * 60;
        
        // Check if the click is within the bounds of the title
        if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > y - 20 && mouseY < y + 10) {
          this.selectedPost = this.blogPosts[i];  // Set the clicked post as the selected one
          break;
        }
      }
    }
  },

  async setup() {
    await this.loadBlogPosts();  // Load blog posts when the page is set up
  }
};
