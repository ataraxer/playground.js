#!/usr/bin/env node


var _ = require('./lazy');


var loeb = function (x) {
  var go = function () {
    return x.map(function (z) {
      return z(go);
    });
  };

  return go();
};


var cnst = function (x) {
  return function (y) {
    return x;
  };
};


var succ = function (x) {
  return function (y) {
    return _.get(y).get(x) + 1;
  };
};


var fs = _.List(
  cnst(1),
  succ(0),
  succ(1),
  succ(2));

var fs2 = _.List(
  succ(1),
  succ(3),
  succ(0),
  cnst(5));


_.println(loeb(fs));

_.println(loeb(fs2));
