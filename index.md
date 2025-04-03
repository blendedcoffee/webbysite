<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zara Hussain Typography Animation</title>
  
  <!-- Add a link to your CSS here (if you have any custom styles) -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- Link to p5.js library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  
  <!-- Your custom loading screen script -->
  <script src="loading.js"></script> <!-- If you have a separate loading.js file for the loading screen -->

  <!-- Link to your custom sketch.js file -->
  <script src="sketch.js"></script>  <!-- This is the main p5.js sketch -->
</head>
<body>
  <!-- Loading screen (it will hide once the sketch is ready) -->
  <div id="loading-screen">
    <div id="loading-text">Loading...</div>
  </div>

  <!-- You can add other content for the page here, such as a title, about text, etc. -->

  <script>
    // Add event listener to hide the loading screen once the sketch is ready
    window.addEventListener('sketchReady', function() {
      document.getElementById('loading-screen').style.display = 'none'; // Hide the loading screen
    });
  </script>
</body>
</html>
