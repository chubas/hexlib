'use strict';

// const Binstruct = require('binstruct');

class HexGeometry {
  constructor(hexSize) {
    this.hexSize = hexSize;
  }

  hexToPoint(hx, hy) {

  }

  pointToHex(x, y) {

  }
}

class HexCoordinateSystem {

}

class Snowflake {
  constructor(config) {
    Object.assign(this, config)
  }

  generate() {
    console.log('Generating...');
    return this;
  }

  render() {
    console.log('Rendering...');
    return this;
  }

}

module.exports = Snowflake;