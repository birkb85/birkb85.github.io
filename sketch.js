// gridSize determins resolution of image.
const gridSize = 330;//330; //50;

function setup() {
  angleMode(DEGREES);

  grid = new Grid(gridSize / pixelDensity());

  canvas = createCanvas(
    ceil(grid.getGridWidth() + (gridSize * 2.3)),
    ceil(grid.getGridHeight()));
  canvas.parent('sketch-holder');

  generateBoard();
}

function draw() {

}