class Grid {
  constructor(size) {
    this.size = size;
    this.offsetX = size + (size / 4);
    this.offsetY = size + (size / 4);
    this.spaceX = createVector(0, -this.size).rotate(60).x;
    this.spaceY = createVector(0, this.size).rotate(60).y;
    // print('spaceY: ' + this.spaceY)
  }
  
  getGridWidth() {
    this.tempW = (this.offsetX * 2) + (6 * this.spaceX * 2);
    // print('getGridWidth: ' + this.tempW)
    return this.tempW;
  }
  
  getGridHeight() {
    this.tempH = (this.offsetY * 2) + (6 * this.spaceY * 3);
    // print('getGridHeight: ' + this.tempH)
    return this.tempH;
  }
  
  getGridPos(indexX, indexY) {
    this.tempX = 0;
    this.tempY = this.offsetY + (indexY * this.spaceY * 3);
    if (indexY % 2 == 0) {
      this.tempX = this.offsetX + this.spaceX + (indexX * this.spaceX * 2);
    } else {
      this.tempX = this.offsetX + (indexX * this.spaceX * 2);
    }
    
    return new GridPos(this.tempX, this.tempY);
  }
  
  draw() {
    stroke('purple');
    strokeWeight(10);
    for (let iX = 0; iX < 7; iX++) {
      for (let iY = 0; iY < 7; iY++) {
        let gridPos = this.getGridPos(iX, iY);
        point(gridPos.x, gridPos.y);
      }
    }
  }
}