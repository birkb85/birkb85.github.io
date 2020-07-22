let imgQRCode;

const harborTypes = {
  NONE: 0,
  BRICK: 1,
  LUMBER: 2,
  ORE: 3,
  GRAIN: 4,
  WOOL: 5,
  NORMAL: 6
}

const harborDirections = {
  NONE: 0,
  NORTH_EAST: 1,
  EAST: 2,
  SOUTH_EAST: 3,
  NORTH_WEST: 4,
  WEST: 5,
  SOUTH_WEST: 6
}

const terrainTypes = {
  NONE: 0,
  HILLS: 1,
  FOREST: 2,
  MOUNTAINS: 3,
  FIELDS: 4,
  PASTURE: 5,
  DESERT: 6,
  SEA: 7
}

let harborsOrg = [
  harborTypes.BRICK,
  harborTypes.LUMBER,
  harborTypes.ORE,
  harborTypes.GRAIN,
  harborTypes.WOOL,
  harborTypes.NORMAL,
  harborTypes.NORMAL,
  harborTypes.NORMAL,
  harborTypes.NORMAL
];
let harbors = [
  harborTypes.BRICK,
  harborTypes.LUMBER,
  harborTypes.ORE,
  harborTypes.GRAIN,
  harborTypes.WOOL,
  harborTypes.NORMAL,
  harborTypes.NORMAL,
  harborTypes.NORMAL,
  harborTypes.NORMAL
];
let terrainsOrg = [
  terrainTypes.HILLS,
  terrainTypes.HILLS,
  terrainTypes.HILLS,
  terrainTypes.FOREST,
  terrainTypes.FOREST,
  terrainTypes.FOREST,
  terrainTypes.FOREST,
  terrainTypes.MOUNTAINS,
  terrainTypes.MOUNTAINS,
  terrainTypes.MOUNTAINS,
  terrainTypes.FIELDS,
  terrainTypes.FIELDS,
  terrainTypes.FIELDS,
  terrainTypes.FIELDS,
  terrainTypes.PASTURE,
  terrainTypes.PASTURE,
  terrainTypes.PASTURE,
  terrainTypes.PASTURE,
  terrainTypes.DESERT
];
let terrains = [
  terrainTypes.HILLS,
  terrainTypes.HILLS,
  terrainTypes.HILLS,
  terrainTypes.FOREST,
  terrainTypes.FOREST,
  terrainTypes.FOREST,
  terrainTypes.FOREST,
  terrainTypes.MOUNTAINS,
  terrainTypes.MOUNTAINS,
  terrainTypes.MOUNTAINS,
  terrainTypes.FIELDS,
  terrainTypes.FIELDS,
  terrainTypes.FIELDS,
  terrainTypes.FIELDS,
  terrainTypes.PASTURE,
  terrainTypes.PASTURE,
  terrainTypes.PASTURE,
  terrainTypes.PASTURE,
  terrainTypes.DESERT
];
let numbersOrg = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
let numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
let canvas;
let grid;
let hexagons = [];

function initGame() {
  harbors = harborsOrg.slice();
  terrains = terrainsOrg.slice();
  numbers = numbersOrg.slice();
}

function shuffleGame() {
  shuffle(harbors, true);
  shuffle(terrains, true);
  shuffleNumbers();
}

function shuffleNumbers() {
  let shuffleValid = false;
  while (!shuffleValid) {
    shuffleValid = true;
    
    shuffle(numbers, true);

    let desertIndex = -1;
    for (let i = 0; i < terrains.length; i++) {
      if (terrains[i] == terrainTypes.DESERT) {
        desertIndex = i;
      }
    }

    let addToIndex = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] == 6 || numbers[i] == 8) {
        if (i >= desertIndex) addToIndex = 1;
        let realIndex = i + addToIndex;
        // print('hit: ' + realIndex);
        switch (realIndex) {
          case 0:
            // print('Check: 0');
            if (shuffleValid) shuffleValid = checkAdjacentValid(1, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(3, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(4, desertIndex);
            break;
          case 1:
            // print('Check: 1');
            if (shuffleValid) shuffleValid = checkAdjacentValid(0, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(2, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(4, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(5, desertIndex);
            break;
          case 2:
            // print('Check: 2');
            if (shuffleValid) shuffleValid = checkAdjacentValid(1, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(5, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(6, desertIndex);
            break;
          case 3:
            // print('Check: 3');
            if (shuffleValid) shuffleValid = checkAdjacentValid(0, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(4, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(7, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(8, desertIndex);
            break;
          case 4:
            // print('Check: 4');
            if (shuffleValid) shuffleValid = checkAdjacentValid(0, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(1, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(3, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(5, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(8, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(9, desertIndex);
            break;
          case 5:
            // print('Check: 5');
            if (shuffleValid) shuffleValid = checkAdjacentValid(1, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(2, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(4, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(6, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(9, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(10, desertIndex);
            break;
          case 6:
            // print('Check: 6');
            if (shuffleValid) shuffleValid = checkAdjacentValid(2, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(5, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(10, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(11, desertIndex);
            break;
          case 7:
            // print('Check: 7');
            if (shuffleValid) shuffleValid = checkAdjacentValid(3, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(8, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(12, desertIndex);
            break;
          case 8:
            // print('Check: 8');
            if (shuffleValid) shuffleValid = checkAdjacentValid(3, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(4, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(7, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(9, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(12, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(13, desertIndex);
            break;
          case 9:
            // print('Check: 9');
            if (shuffleValid) shuffleValid = checkAdjacentValid(4, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(5, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(8, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(10, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(13, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(14, desertIndex);
            break;
          case 10:
            // print('Check: 10');
            if (shuffleValid) shuffleValid = checkAdjacentValid(5, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(6, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(9, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(11, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(14, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(15, desertIndex);
            break;
          case 11:
            // print('Check: 11');
            if (shuffleValid) shuffleValid = checkAdjacentValid(6, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(10, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(15, desertIndex);
            break;
          case 12:
            // print('Check: 12');
            if (shuffleValid) shuffleValid = checkAdjacentValid(7, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(8, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(13, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(16, desertIndex);
            break;
          case 13:
            // print('Check: 13');
            if (shuffleValid) shuffleValid = checkAdjacentValid(8, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(9, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(12, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(14, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(16, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(17, desertIndex);
            break;
          case 14:
            // print('Check: 14');
            if (shuffleValid) shuffleValid = checkAdjacentValid(9, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(10, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(13, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(15, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(17, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(18, desertIndex);
            break;
          case 15:
            // print('Check: 15');
            if (shuffleValid) shuffleValid = checkAdjacentValid(10, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(11, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(14, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(18, desertIndex);
            break;
          case 16:
            // print('Check: 16');
            if (shuffleValid) shuffleValid = checkAdjacentValid(12, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(13, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(17, desertIndex);
            break;
          case 17:
            // print('Check: 17');
            if (shuffleValid) shuffleValid = checkAdjacentValid(13, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(14, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(16, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(18, desertIndex);
            break;
          case 18:
            // print('Check: 18');
            if (shuffleValid) shuffleValid = checkAdjacentValid(14, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(15, desertIndex);
            if (shuffleValid) shuffleValid = checkAdjacentValid(17, desertIndex);
            break;
        }
      }
    }
  }
}

function checkAdjacentValid(arrayIndex, desertIndex) {
  // print('checkAdjacentValid: ' + arrayIndex + ', ' + desertIndex);
  if (arrayIndex == desertIndex) {
    // print('Adjacent is desert: Valid');
    return true;
  } else {
    let realIndex = arrayIndex;
    if (arrayIndex > desertIndex) realIndex -= 1;
    if (numbers[realIndex] == 6 || numbers[realIndex] == 8) {
      // print('Adjacent is 6 or 8: NOT valid');
      return false;
    } else {
      // print('Adjacent is NOT 6 or 8: Valid: ' + numbers[realIndex]);
      return true;
    }
  }
}

function createSea() {
  addSeaHexagon(1, 0, harborDirections.SOUTH_EAST);
  addSeaHexagon(2, 0, harborDirections.NONE);
  addSeaHexagon(3, 0, harborDirections.SOUTH_WEST);
  addSeaHexagon(4, 0, harborDirections.NONE);

  addSeaHexagon(1, 1, harborDirections.NONE);
  addSeaHexagon(5, 1, harborDirections.SOUTH_WEST);

  addSeaHexagon(0, 2, harborDirections.EAST);
  addSeaHexagon(5, 2, harborDirections.NONE);

  addSeaHexagon(0, 3, harborDirections.NONE);
  addSeaHexagon(6, 3, harborDirections.WEST);

  addSeaHexagon(0, 4, harborDirections.EAST);
  addSeaHexagon(5, 4, harborDirections.NONE);

  addSeaHexagon(1, 5, harborDirections.NONE);
  addSeaHexagon(5, 5, harborDirections.NORTH_WEST);

  addSeaHexagon(1, 6, harborDirections.NORTH_EAST);
  addSeaHexagon(2, 6, harborDirections.NONE);
  addSeaHexagon(3, 6, harborDirections.NORTH_WEST);
  addSeaHexagon(4, 6, harborDirections.NONE);
}

function createLand() {
  for (let i = 2; i <= 4; i++) {
    addLandHexagon(i, 1);
  }
  for (let i = 1; i <= 4; i++) {
    addLandHexagon(i, 2);
  }
  for (let i = 1; i <= 5; i++) {
    addLandHexagon(i, 3);
  }
  for (let i = 1; i <= 4; i++) {
    addLandHexagon(i, 4);
  }
  for (let i = 2; i <= 4; i++) {
    addLandHexagon(i, 5);
  }
}

function addLandHexagon(indexX, indexY) {
  let type = terrains.pop();
  let gridPos = grid.getGridPos(indexX, indexY);
  let hexagon = new Hexagon(gridPos.x, gridPos.y, grid.size);
  hexagon.setTerrainType(type);
  if (type == terrainTypes.DESERT) {
    hexagon.setTerrainNumber(0)
  } else {
    hexagon.setTerrainNumber(numbers.pop().toString());
  }
  hexagons.push(hexagon);
}

function addSeaHexagon(indexX, indexY, harborDirection) {
  let gridPos = grid.getGridPos(indexX, indexY);
  let hexagon = new Hexagon(gridPos.x, gridPos.y, grid.size);
  hexagon.setTerrainType(terrainTypes.SEA);
  if (harborDirection != harborDirections.NONE) {
    let type = harbors.pop();
    hexagon.setHarborType(type);
    hexagon.setHarborDirection(harborDirection);
  }
  hexagons.push(hexagon);
}

function drawTitle() {
  stroke('black');
  strokeWeight(gridSize / 50);
  fill('black');
  textSize(gridSize / 2);
  textAlign(LEFT, BASELINE);
  textFont('monospace');
  let gridPos = grid.getGridPos(0, 0);

  text('Settlers\nof\nRoll\nand\nWrite', gridPos.x - (gridSize * 1.8), gridPos.y - (gridSize / 1.8));

  // gridPos = grid.getGridPos(0, 6);
  // textSize(gridSize / 4);
  // text('(work in\nprogress)', gridPos.x - (gridSize * 1.8), gridPos.y);
}

function drawDiceOdds() {
  stroke('black');
  strokeWeight(gridSize / 50);
  fill('black');
  textSize(gridSize / 2.5);
  textAlign(LEFT, BASELINE);
  textFont('monospace');
  let gridPos = grid.getGridPos(6, 4);

  // text('Odds for\nDice Rolls', gridPos.x - (gridSize / 2), gridPos.y);
  text('Odds for\nTerningekast', gridPos.x - (gridSize / 2), gridPos.y);

  textSize(gridSize / 3);
  text('2 & 12 = 3%\n3 & 11 = 6%\n4 & 10 = 8%\n5 & 9 = 11%\n6 & 8 = 14%\n    7 = 17%', gridPos.x - (gridSize / 2), gridPos.y + gridSize);
}

function drawQRCode() {
  stroke('black');
  strokeWeight(gridSize / 50);
  fill('black');
  textSize(gridSize / 3);
  textAlign(LEFT, BASELINE);
  textFont('monospace');
  let gridPos = grid.getGridPos(6, 0);

  text('Link til print:', gridPos.x - (gridSize / 2), gridPos.y - (gridSize / 4));

  image(imgQRCode, gridPos.x - (gridSize / 2), gridPos.y);
}

function generateBoard() {
  initGame();

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
  drawQRCode();
}

function saveBoard() {
  saveCanvas(canvas, 'Settlers of Roll and Write', 'png');
}

function printBoard() {
  var dataUrl = document.getElementById('defaultCanvas0').toDataURL(); //attempt to save base64 string to server using this var  
  var windowContent = '<!DOCTYPE html>';
  windowContent += '<html>'
  windowContent += '<head><title>Print canvas</title></head>';
  windowContent += '<body>'
  windowContent += '<img src="' + dataUrl + '">';
  windowContent += '</body>';
  windowContent += '</html>';
  var printWin = window.open('', '', 'width=340,height=260');
  printWin.document.open();
  printWin.document.write(windowContent);
  printWin.document.close();
  printWin.focus();
  printWin.print();
  printWin.close();
}