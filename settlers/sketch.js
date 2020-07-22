// gridSize determins resolution of image.
const gridSize = 330;//330; //50;

function setup() {
  angleMode(DEGREES);
  pixelDensity(1);

  grid = new Grid(gridSize);

  canvas = createCanvas(
    ceil(grid.getGridWidth() + (gridSize * 2.3)),
    ceil(grid.getGridHeight()));
  canvas.parent('sketch-holder');

  generateBoard();
}

function draw() {

}