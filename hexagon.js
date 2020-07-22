class Hexagon {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.v1 = createVector(0, this.size);
    this.v2 = createVector(this.v1.x, this.v1.y).rotate(60);
    this.v3 = createVector(this.v2.x, this.v2.y).rotate(60);
    this.v4 = createVector(this.v3.x, this.v3.y).rotate(60);
    this.v5 = createVector(this.v4.x, this.v4.y).rotate(60);
    this.v6 = createVector(this.v5.x, this.v5.y).rotate(60);

    this.harborType = harborTypes.NONE;
    this.harborDirection = harborDirections.NONE
    this.terrainType = terrainTypes.NONE;
    this.terrainNumber = 0;
  }

  setHarborType(harborType) {
    this.harborType = harborType;
  }

  setHarborDirection(harborDirection) {
    this.harborDirection = harborDirection;
  }

  setTerrainType(terrainType) {
    this.terrainType = terrainType;
  }

  setTerrainNumber(terrainNumber) {
    this.terrainNumber = terrainNumber;
  }

  draw() {
    this.drawTerrainType();
    this.drawTerrainNumber();
    this.drawHarborDirection();
    this.drawHarborType();
  }

  drawTerrainType() {
    // TODO BB 2020-07-16. Add ressource icon to terrain tile.
    stroke('white');
    strokeWeight(this.size / 5);
    switch (this.terrainType) {
      case terrainTypes.HILLS:
        // fill('#BC4F0A');
        fill('#E2A054');
        break;
      case terrainTypes.FOREST:
        // fill('#4C4C1A');
        fill('#A69A5E');
        break;
      case terrainTypes.MOUNTAINS:
        // fill('#732850');
        fill('#B69177');
        break;
      case terrainTypes.FIELDS:
        // fill('#DFBB4B');
        fill('#DFBB4B');
        break;
      case terrainTypes.PASTURE:
        // fill('#4B8521');
        fill('#A9B466');
        break;
      case terrainTypes.DESERT:
        fill('#FFE699');
        break;
      case terrainTypes.SEA:
        fill('#BDD7EE');
        break;
      default:
        fill('white');
    }
    beginShape();
    vertex(this.x + this.v1.x, this.y + this.v1.y);
    vertex(this.x + this.v2.x, this.y + this.v2.y);
    vertex(this.x + this.v3.x, this.y + this.v3.y);
    vertex(this.x + this.v4.x, this.y + this.v4.y);
    vertex(this.x + this.v5.x, this.y + this.v5.y);
    vertex(this.x + this.v6.x, this.y + this.v6.y);
    endShape(CLOSE);

    // Icon
    stroke('black');
    strokeWeight(this.size / 50);
    fill('black');
    textSize(this.size / 3);
    textAlign(CENTER, CENTER);
    textFont('monospace');

    switch (this.terrainType) {
      case terrainTypes.HILLS:
        text('Sten', this.x, this.y - (this.size / 2.8)); // Brick
        break;
      case terrainTypes.FOREST:
        text('Træ', this.x, this.y - (this.size / 2.8)); // Lumber
        break;
      case terrainTypes.MOUNTAINS:
        text('Jern', this.x, this.y - (this.size / 2.8)); // Ore
        break;
      case terrainTypes.FIELDS:
        text('Korn', this.x, this.y - (this.size / 2.8)); // Grain
        break;
      case terrainTypes.PASTURE:
        text('Uld', this.x, this.y - (this.size / 2.8)); // Wool
        break;
      case terrainTypes.DESERT:
        text('Ørken', this.x, this.y); // Desert
        break;
    }
  }

  drawTerrainNumber() {
    if (this.terrainNumber != 0) {
      let offsetX = 0;//-this.size / 4;
      let offsetY = this.size / 4;

      // Circle
      stroke('black');
      strokeWeight(this.size / 25);
      fill('#FFFFFF88');
      circle(this.x + offsetX, this.y + offsetY, this.size / 1.5);

      // Number
      stroke('black');
      strokeWeight(this.size / 50);
      fill('black');
      if (this.terrainNumber == 2 || this.terrainNumber == 12) {
        textSize(this.size / 4);
      } else if (this.terrainNumber == 3 || this.terrainNumber == 11) {
        textSize(this.size / 3.5);
      } else if (this.terrainNumber == 4 || this.terrainNumber == 10) {
        textSize(this.size / 3);
      } else if (this.terrainNumber == 5 || this.terrainNumber == 9) {
        textSize(this.size / 2.5);
      } else if (this.terrainNumber == 6 || this.terrainNumber == 8) {
        stroke('red');
        fill('red');
        textSize(this.size / 2);
      }
      textAlign(CENTER, CENTER);
      textFont('monospace');
      text(this.terrainNumber.toString(), this.x + offsetX, this.y + offsetY);

      // Dots
      stroke('black');
      strokeWeight(this.size / 10);
      if (this.terrainNumber == 2 || this.terrainNumber == 12) {
        let dotV = createVector(0, this.size / 4.5);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
      } else if (this.terrainNumber == 3 || this.terrainNumber == 11) {
        let dotV = createVector(0, this.size / 4.5);
        dotV.rotate(-20);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
      } else if (this.terrainNumber == 4 || this.terrainNumber == 10) {
        let dotV = createVector(0, this.size / 4.5);
        dotV.rotate(-40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
      } else if (this.terrainNumber == 5 || this.terrainNumber == 9) {
        let dotV = createVector(0, this.size / 4.5);
        dotV.rotate(-60);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
      } else if (this.terrainNumber == 6 || this.terrainNumber == 8) {
        stroke('red');
        let dotV = createVector(0, this.size / 4.5);
        dotV.rotate(-80);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
        dotV.rotate(40);
        point(this.x + offsetX + dotV.x, this.y + offsetY + dotV.y);
      }
    }
  }

  drawHarborDirection() {
    if (this.harborDirection != harborDirections.NONE) {
      stroke('white');
      strokeWeight(this.size / 5);
      let v1Begin = createVector(0, this.size / 2);
      let v1End = createVector(0, this.size);
      let v2Begin = createVector(0, this.size / 2);
      let v2End = createVector(0, this.size);
      switch (this.harborDirection) {
        case harborDirections.NORTH_EAST:
          v1Begin.rotate(180);
          v1End.rotate(180);
          v2Begin.rotate(240);
          v2End.rotate(240);
          break;
        case harborDirections.EAST:
          v1Begin.rotate(240);
          v1End.rotate(240);
          v2Begin.rotate(300);
          v2End.rotate(300);
          break;
        case harborDirections.SOUTH_EAST:
          v1Begin.rotate(300);
          v1End.rotate(300);
          break;
        case harborDirections.NORTH_WEST:
          v1Begin.rotate(120);
          v1End.rotate(120);
          v2Begin.rotate(180);
          v2End.rotate(180);
          break;
        case harborDirections.WEST:
          v1Begin.rotate(60);
          v1End.rotate(60);
          v2Begin.rotate(120);
          v2End.rotate(120);
          break;
        case harborDirections.SOUTH_WEST:
          v2Begin.rotate(60);
          v2End.rotate(60);
          break;
      }
      line(this.x + v1Begin.x, this.y + v1Begin.y,
        this.x + v1End.x, this.y + v1End.y);
      line(this.x + v2Begin.x, this.y + v2Begin.y,
        this.x + v2End.x, this.y + v2End.y);
    }
  }

  drawHarborType() {
    // TODO BB 2020-07-16. Draw harbor icon.
    if (this.harborType != harborTypes.NONE) {
      let scale = gridSize / 50;

      stroke('black');
      strokeWeight(this.size / 25);
      switch (this.harborType) {
        case harborTypes.BRICK:
          fill('#E2A054');
          break;
        case harborTypes.LUMBER:
          fill('#A69A5E');
          break;
        case harborTypes.ORE:
          fill('#B69177');
          break;
        case harborTypes.GRAIN:
          fill('#DFBB4B');
          break;
        case harborTypes.WOOL:
          fill('#A9B466');
          break;
        case harborTypes.NORMAL:
          fill(240);
          break;
      }

      beginShape();
      vertex(this.x, this.y - (10 * scale));
      vertex(this.x, this.y + (20 * scale));
      endShape();

      beginShape();
      vertex(this.x - (20 * scale), this.y + (15 * scale));
      bezierVertex(this.x - (20 * scale), this.y + (30 * scale),
        this.x + (20 * scale), this.y + (30 * scale),
        this.x + (20 * scale), this.y + (15 * scale));
      endShape(CLOSE);

      beginShape();
      vertex(this.x - (25 * scale), this.y - (20 * scale));
      vertex(this.x + (25 * scale), this.y - (20 * scale));
      vertex(this.x + (25 * scale), this.y + (10 * scale));
      vertex(this.x - (25 * scale), this.y + (10 * scale));
      endShape(CLOSE);

      stroke('black');
      strokeWeight(this.size / 50);
      fill('black');
      textSize(this.size / 4);
      textAlign(CENTER, CENTER);
      textFont('monospace');

      switch (this.harborType) {
        case harborTypes.BRICK:
          // text('2:1\nBrick', this.x, this.y - (scale * 4));
          text('2:1\nSten', this.x, this.y - (scale * 4));
          break;
        case harborTypes.LUMBER:
          // text('2:1\nLumber', this.x, this.y - (scale * 4));
          text('2:1\nTræ', this.x, this.y - (scale * 4));
          break;
        case harborTypes.ORE:
          // text('2:1\nOre', this.x, this.y - (scale * 4));
          text('2:1\nJern', this.x, this.y - (scale * 4));
          break;
        case harborTypes.GRAIN:
          // text('2:1\nGrain', this.x, this.y - (scale * 4));
          text('2:1\nKorn', this.x, this.y - (scale * 4));
          break;
        case harborTypes.WOOL:
          // text('2:1\nWool', this.x, this.y - (scale * 4));
          text('2:1\nUld', this.x, this.y - (scale * 4));
          break;
        case harborTypes.NORMAL:
          text('?\n3:1', this.x, this.y - (scale * 4));
          break;
      }
    }
  }
}