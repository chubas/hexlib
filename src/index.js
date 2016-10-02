'use strict';

const Snowflake = require('./App');
const $ = require('jquery');

var snowflake = new Snowflake({
  radius: 5
});

snowflake
.generate()
.render($('#root canvas'));

