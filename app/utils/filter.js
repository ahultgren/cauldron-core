'use strict';

var R = require('ramda');

module.exports = R.curry((fn, iterable) => {
  var result = [];

  iterable.forEach((item) => {
    if(fn(item)) {
      result.push(item);
    }
  });

  return result;
});
