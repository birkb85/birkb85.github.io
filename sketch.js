// gridSize determins resolution of image.
const gridSize = 200;//330; //50;

function setup() {
  angleMode(DEGREES);

  grid = new Grid(gridSize);

  canvas = createCanvas(
    ceil(grid.getGridWidth() + (gridSize * 2.3)),
    ceil(grid.getGridHeight()));
  canvas.parent('sketch-holder');

  shuffleGame();
  createSea();
  createLand();

  // Draw one time
  background(255);
  // grid.draw();
  for (let i = 0; i < hexagons.length; i++) {
    hexagons[i].draw();
  }
  drawTitle();
  drawDiceOdds();
}

function draw() {

}