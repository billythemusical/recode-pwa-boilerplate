var canvas;

function setup () {
  // turns off p5's (rather verbose but) friendly errors
  p5.disableFriendlyErrors = true;
  // Create the canvas
  canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent('sketch-holder') // from https://github.com/processing/p5.js/wiki/Positioning-your-canvas
};

function draw () {
  background(220);
  text('This is a p5 canvas; do with it what you will.', 100, 100)
  text('To install this web app, click the install button in the URL window.', 100, 120)
  text('(Remember to only use Chrome...)', 100, 140)
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}
