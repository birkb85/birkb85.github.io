// gridSize determins resolution of image.
const gridSize = 300;//330; //50;

function preload() {
  imgQRCode = loadImage('qr_code.jpg');
}

function setup() {
  angleMode(DEGREES);
  pixelDensity(1);

  grid = new Grid(gridSize);

  canvas = createCanvas(
    ceil(grid.getGridWidth() + (gridSize * 2.3)),
    ceil(grid.getGridHeight() + (gridSize * 10)));
  canvas.parent('sketch-holder');

  generateBoard();
}

function draw() {

}