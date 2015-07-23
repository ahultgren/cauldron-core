'use strict';

var R = require('ramda');

module.exports = R.curry((fn, iterable) => {
  var result = [];

  iterable.forEach((item) => {
    result.push(fn(item));
  });

  return result;
});
