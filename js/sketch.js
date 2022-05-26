
function setup () {
  // turns off p5's (rather verbose but) friendly errors
  p5.disableFriendlyErrors = true;
  // Create the canvas
  canvas = createCanvas(800, 600);
  canvas.parent('sketch-holder') // from https://github.com/processing/p5.js/wiki/Positioning-your-canvas
};

function draw () {
  background(220);
  text('this is your canvas', 100, 100)
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

const setFavicon = (iconUrl) => {
  // From https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
  }
  // link.href = iconUrl;  // http could be effecting the PWA install
}
