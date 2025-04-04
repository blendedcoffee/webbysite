<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zara Hussain</title>

  <!-- p5.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>

  <!-- Load your loading logic first -->
  <script src="loading.js" defer></script>

  <!-- Your sketch code -->
  <script src="sketch.js" defer></script>

  <!-- Style to remove default margin and make canvas fullscreen -->
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #F8F6EE;
    }

    canvas {
      display: block;
    }

    /* Optional: fallback loading screen */
    #loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      z-index: 1000;
      font-family: 'PixelifySans', sans-serif;
      font-size: 2rem;
      color: #222;
    }
  </style>
</head>
<body>
  <!-- Optional HTML fallback loading screen -->
  <div id="loading-screen">Loading...</div>
</body>
</html>
