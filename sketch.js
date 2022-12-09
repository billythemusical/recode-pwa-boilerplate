var canvas
let x = 100, y = 100, r = 100
let xSpeed = 3, ySpeed = 4

function setup () {
  // turns off p5's (rather verbose but) friendly errors
  p5.disableFriendlyErrors = true;
  // Create the canvas
  canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent('sketch-holder') // from https://github.com/processing/p5.js/wiki/Positioning-your-canvas
};

function draw () {
  background(255, 192, 203);

  if (x >= (width - r / 2) || x <= r / 2) xSpeed *= -1
  if (y >= (height - r / 2) || y <= r / 2) ySpeed *= -1
  x += xSpeed
  y += ySpeed
  ellipse(x, y, r)

  text('This is a p5 canvas; do with it what you will.', 100, 100)
  text('To install this web app, click the install button in the URL window.', 100, 120)
  text('(Remember to only use Chrome...)', 100, 140)

}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}
