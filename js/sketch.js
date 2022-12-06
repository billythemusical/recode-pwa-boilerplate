
function setup () {
  // turns off p5's (rather verbose but) friendly errors
  p5.disableFriendlyErrors = true;
  // Create the canvas
  canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent('sketch-holder') // from https://github.com/processing/p5.js/wiki/Positioning-your-canvas
};

function draw () {
  background(220);
  text('this is your canvas', 100, 100)
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}
