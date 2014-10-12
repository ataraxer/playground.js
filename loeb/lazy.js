#!/usr/bin/env node


var def = function (x) {
  return function () {
    return x;
  };
};


var get = function (x) {
  return x();
};


var args = function (xs) {
  if (1 <= xs.length) {
    return Array.prototype.slice.call(xs, 0)
  } else {
    return []
  }
};


var println = function () {
  var xs = args(arguments).map(function (x) {
    return x.toString();
  });

  console.log(xs.join(' '));
};



var list = function (xs) {
  this.__values = xs;

  this.get = function (i) {
    return get(this.__values[i]);
  };

  this.map = function (f) {
    var xs = this.__values.map(function (x) {
      return function () {
        return f(get(x));
      };
    });

    return new list(xs);
  };

  this.toString = function () {
    return 'List(' + this.__values.map(get).join(', ') + ')';
  };
};


var List = function () {
  var xs = args(arguments).map(def);
  return new list(xs);
};


module.exports = {
  println: println,
  def: def,
  get: get,
  List: List,
};
