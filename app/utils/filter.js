'use strict';

module.exports = (fn, iterable) => {
  var result = [];

  iterable.forEach((item) => {
    if(fn(item)) {
      result.push(item);
    }
  });

  return result;
};
