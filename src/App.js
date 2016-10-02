'use strict';

// Pointy topped, grid arrangement
class HexGeometry {
  constructor(config) {
    Object.assign(this, config);
    this._h = this.size * 2;
    this._w = this._h * Math.sqrt(3) / 2;
  }

  // Returns the center of the hexagon at hx, hy
  hexToPoint(hx, hy) {
    var x = hy % 2 === 0 ?
      (this._w * hx) + this._w / 2 :
      (this._w * hx) + this._w;
    var y = (hy * this._h * 3 / 4) + this._h / 2;
    return [x, y];
  }

  pointToHex(x, y) {
    // TODO
    throw 'not implemented';
  }

  hexToPointVertices(hx, hy) {
    var pointCoords = this.hexToPoint(hx, hy);
    var vertexCoords = [];
    var angleDegree, angleRad, angleX, angleY;
    for(var i = 0; i < 6; i++) {
      angleDegree = 60 * i + 30;
      angleRad = Math.PI / 180 * angleDegree;
      angleX = pointCoords[0] + this.size * Math.cos(angleRad);
      angleY = pointCoords[1] + this.size * Math.sin(angleRad);
      vertexCoords.push([angleX, angleY]);
    }
    return vertexCoords;
  }

}

class HexCoordinateSystem {

  // config.geometry
  constructor(config) {
    Object.assign(this, config);
    this._storage = new Array(this.geometry.height);
    for(var y = 0; y < this.geometry.height; y++) {
      this._storage[y] = new Array(this.geometry.width);
    }
  }

  hexToPointVertices(hx, hy) {
    console.warn('Will probably deprecate, ask for geometry explicitly');
    return this.geometry.hexToPointVertices(hx, hy);
  }

  forEach(fn) {
    for(var hx = 0; hx < this.geometry.width; hx++) {
      for(var hy = 0; hy < this.geometry.height; hy++) {
        fn(hx, hy, this._storage[hy][hx]);
      }
    }
  }

  setValue(hx, hy, value) {
    this._storage[hy][hx] = value;
  }
}

class CanvasRenderer {
  constructor() {

  }

  render(grid, target) {
    var context = target[0].getContext('2d');
    context.strokeStyle = "#FF0000";
    grid.forEach(function(hx, hy, value) {
      if(value) {
        context.fillStyle = value;
      } else {
        context.fillStyle = '#EEFFFF';
      }
      context.beginPath();
      var vertexCoords = grid.hexToPointVertices(hx, hy);
      context.moveTo(vertexCoords[0][0], vertexCoords[0][1]);
      for(var i = 1; i < 6; i++) {
        context.lineTo(vertexCoords[i][0], vertexCoords[i][1]);
      }
      context.closePath();
      context.stroke();
      context.fill();
    });
  }
}

class Snowflake {
  constructor(config) {
    Object.assign(this, config);
    this.grid = new HexCoordinateSystem({
      geometry: new HexGeometry({
        size: 20,
        width: this.radius * 2 + 1,
        height: this.radius * 2 + 1
      })
    });
    this.renderer = new CanvasRenderer();
  }

  generate() {
    this.grid.setValue(this.radius, this.radius, '#ff0000');
    this.grid.setValue(4, 6, '#0000ff');
    return this;
  }

  render(target) {
    this.renderer.render(this.grid, target);
    return this;
  }

}

module.exports = Snowflake;