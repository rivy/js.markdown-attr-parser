'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parser = require('./parser'); // A valid output which means nothing has been parsed.
// Used as error return / invalid output


var nothingHappened = {
  prop: {},
  eaten: ''
};
var defaultConfig = {
  defaultValue: function defaultValue() {
    return undefined;
  } // Its a function

};

function parse(value, indexNext, userConfig) {
  var config = _objectSpread({}, defaultConfig, {}, userConfig); // Make defaultValue a function if it isn't


  if (typeof config.defaultValue !== 'function') {
    var defaultValue = config.defaultValue;

    config.defaultValue = function () {
      return defaultValue;
    };
  }

  var prefix = indexNext > 0 ? value.substr(0, indexNext) : '';
  value = value.substr(indexNext);

  try {
    var parsed = parser.parse(value, config);
    parsed.eaten = prefix + parsed.eaten;
    return parsed;
  } catch (_unused) {
    return nothingHappened;
  }
}

module.exports = parse;