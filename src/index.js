'use strict';

const Snowflake = require('./App');

var snowflake = new Snowflake({
  radius: 10
});

snowflake
.generate()
.render();
