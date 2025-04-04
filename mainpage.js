pages["Main"] = (() => {
  let font;
  let words = ["Zara Hussain", "Zara Hussain", "Zara Hussain", "Zara Hussain"];
  let colors = ['#FFF4B1', '#FFD6E8', '#C3E8BD', '#AFCBFF', '#F6C1B0', '#E6E6FA', '#FAF0D7'];
  let rows = 10;
  let cols;
  let frameHold = 60;
  let frameCounter = 0;

  return {
    setup() {
      loadFont('assets/PixelifySans-VariableFont_wght.ttf', (loadedFont) => {
        font = loadedFont;
        textFont(font);
        cols = words.length;
      });
    },
    draw() {
      if (!font) return;

      clear();
      background('#F8F6EE');
      blendMode(MULTIPLY);

      push();
      translate(50 + .025 * height);
      scale(0.8);

      for (let h = 0; h < cols; h++) {
        let myWord = words[h];
        let myH = h % 2 === 0 ? 1.52 : 1.15;

        for (let i = 0; i < rows; i++) {
          let yOffset = height * (i + myH) / rows;
          let textSizeVal = height / rows;

          let points = font.textToPoints(myWord, width / 15 + width * h / cols, yOffset, textSizeVal, {
            sampleFactor: 0.5,
            simplifyThreshold: map(i, 0, rows - 1, 0.01, 3.5)
          });

          stroke(random(colors));
          noFill();
          beginShape();
          for (let pt of points) {
            vertex(pt.x, pt.y);
          }
          endShape();
        }
      }

      pop();
      blendMode(BLEND); // ← reset!
    }
  };
})();
