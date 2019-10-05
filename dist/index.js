(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["markdown-attr-parser"] = factory();
	else
		root["markdown-attr-parser"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// spell-checker:ignore PEGjs

const parser = __webpack_require__(/*! ./parser.pegjs */ "./src/parser.pegjs");

// A valid output which means nothing has been parsed.
// Used as error return / invalid output
const nothingHappened = {
  prop: {},
  eaten: '',
};

const defaultConfig = {
  defaultValue: () => undefined, // Its a function
};

function parse(value, indexNext, userConfig) {
  const config = {...defaultConfig, ...userConfig};

  // Make defaultValue a function if it isn't
  if (typeof (config.defaultValue) !== 'function') {
    const {defaultValue} = config;
    config.defaultValue = () => defaultValue;
  }

  const prefix = (indexNext > 0) ? value.substr(0, indexNext) : '';
  value = value.substr(indexNext);

  try {
    const parsed = parser.parse(value, config);
    parsed.eaten = prefix + parsed.eaten;
    return parsed;
  } catch (_) {
    return nothingHappened;
  }
}

module.exports = parse;


/***/ }),

/***/ "./src/parser.pegjs":
/*!**************************!*\
  !*** ./src/parser.pegjs ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */



function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleIndices = { embedded_list: 0 },
      peg$startRuleIndex   = 0,

      peg$consts = [
        peg$anyExpectation(),
        function(a) { return a; },
        "<!--",
        peg$literalExpectation("<!--", false),
        "-->",
        peg$literalExpectation("-->", false),
        function() { return normalize_attribute_list([], ''); },
        "{",
        peg$literalExpectation("{", false),
        "}",
        peg$literalExpectation("}", false),
        function(a) { return normalize_attribute_list(a, text()); },
        function(a, c) { return c; },
        function(a, b) { a = a || []; return [].concat(a).concat(b); },
        function(c) { return {class: c}; },
        function(i) { return {id: i}; },
        "=",
        peg$literalExpectation("=", false),
        function(k, v) { return {key: k, value: v}; },
        function(k) { return {key: k, value: ''}; },
        function(k) { let retval = {key: k}; let v = default_value(k); if (typeof(v) !== 'undefined') { retval.value = v; }; return retval; },
        peg$otherExpectation("whitespace"),
        /^[ \t]/,
        peg$classExpectation([" ", "\t"], false, false),
        peg$otherExpectation("eol"),
        /^[\r\n]/,
        peg$classExpectation(["\r", "\n"], false, false),
        "\\",
        peg$literalExpectation("\\", false),
        " ",
        peg$literalExpectation(" ", false),
        "\"",
        peg$literalExpectation("\"", false),
        "'",
        peg$literalExpectation("'", false),
        "<",
        peg$literalExpectation("<", false),
        ">",
        peg$literalExpectation(">", false),
        /^[^\0-\x1F]/,
        peg$classExpectation([["\0", "\x1F"]], true, false),
        /^[^\0-\x1F "'=<>{}]/,
        peg$classExpectation([["\0", "\x1F"], " ", "\"", "'", "=", "<", ">", "{", "}"], true, false),
        peg$otherExpectation("escape sequence"),
        function(sequence) { return sequence; },
        function() {return expected('non-EOL character');},
        function(c) {return c;},
        function(s) { return s.join(''); },
        /^[^.\0-\x1F ={}]/,
        peg$classExpectation([".", ["\0", "\x1F"], " ", "=", "{", "}"], true, false),
        function(c) { return c.join(''); },
        /^[^.#\0-\x1F =<>{}]/,
        peg$classExpectation([".", "#", ["\0", "\x1F"], " ", "=", "<", ">", "{", "}"], true, false),
        function(text) { return text.join(''); },
        ".",
        peg$literalExpectation(".", false),
        function() { return text(); },
        function(n) { return n; },
        "#",
        peg$literalExpectation("#", false),
        function(n) { return n.join(''); }
      ],

      peg$bytecode = [
        peg$decode("%;!/B#$1\"\"5!7 0(*1\"\"5!7 &/($8\":!\"!!)(\"'#&'#"),
        peg$decode("%$;$0#*;$&/U#2\"\"\"6\"7#/F$$;$0#*;$&/6$2$\"\"6$7%/'$8$:&$ )($'#(#'#(\"'#&'#.\u0121 &%$;$0#*;$&/\xAD#2\"\"\"6\"7#/\x9E$$;$0#*;$&/\x8E$2'\"\"6'7(/\x7F$$;$0#*;$&/o$;\"/f$$;$0#*;$&/V$2)\"\"6)7*/G$$;$0#*;$&/7$2$\"\"6$7%/($8*:+*!$)(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\x80 &%$;$0#*;$&/o#2'\"\"6'7(/`$$;$0#*;$&/P$;\"/G$$;$0#*;$&/7$2)\"\"6)7*/($8&:+&!\")(&'#(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%$;$0#*;$&/\x93#;#.\" &\"/\x85$$%$;$/&#0#*;$&&&#/2#;#/)$8\":,\"\"$ )(\"'#&'#0I*%$;$/&#0#*;$&&&#/2#;#/)$8\":,\"\"$ )(\"'#&'#&/)$8#:-#\"! )(#'#(\"'#&'#"),
        peg$decode("%$;8/&#0#*;8&&&#/' 8!:.!! ).\xF1 &%;9/' 8!:/!! ).\xDF &%;:/Q#$;$0#*;$&/A$20\"\"6071/2$;3/)$8$:2$\"# )($'#(#'#(\"'#&'#.\xA1 &%;:/Q#$;$0#*;$&/A$20\"\"6071/2$;7/)$8$:2$\"# )($'#(#'#(\"'#&'#.c &%;:/G#$;$0#*;$&/7$20\"\"6071/($8#:3#!\")(#'#(\"'#&'#./ &%;:/' 8!:4!! )"),
        peg$decode("<46\"\"5!77=.\" 75"),
        peg$decode("<49\"\"5!7:=.\" 78"),
        peg$decode("2;\"\"6;7<"),
        peg$decode("2=\"\"6=7>"),
        peg$decode("2?\"\"6?7@"),
        peg$decode("2A\"\"6A7B"),
        peg$decode("20\"\"6071"),
        peg$decode("2C\"\"6C7D"),
        peg$decode("2E\"\"6E7F"),
        peg$decode("2'\"\"6'7("),
        peg$decode("2)\"\"6)7*"),
        peg$decode("4G\"\"5!7H"),
        peg$decode("4I\"\"5!7J"),
        peg$decode(";2.# &;/"),
        peg$decode("<%;&/7#;(.# &;)/($8\":L\"! )(\"'#&'#=.\" 7K"),
        peg$decode("%;(/\xB1#$%%<;(=.##&&!&'#/B#;1.. &%;%/& 8!:M! )/($8\":N\"! )(\"'#&'#/[#0X*%%<;(=.##&&!&'#/B#;1.. &%;%/& 8!:M! )/($8\":N\"! )(\"'#&'#&&&#/1$;(/($8#:O#!!)(#'#(\"'#&'#.\xBB &%;)/\xB1#$%%<;)=.##&&!&'#/B#;1.. &%;%/& 8!:M! )/($8\":N\"! )(\"'#&'#/[#0X*%%<;)=.##&&!&'#/B#;1.. &%;%/& 8!:M! )/($8\":N\"! )(\"'#&'#&&&#/1$;)/($8#:O#!!)(#'#(\"'#&'#"),
        peg$decode("4P\"\"5!7Q"),
        peg$decode("%$;2.# &;0/,#0)*;2.# &;0&&&#/' 8!:R!! )"),
        peg$decode("4S\"\"5!7T"),
        peg$decode("%$;0/&#0#*;0&&&#/' 8!:U!! )"),
        peg$decode("%2V\"\"6V7W/\xBE#%$2V\"\"6V7W0)*2V\"\"6V7W&/\x93#%$%%<2V\"\"6V7W=.##&&!&'#/,#;4/#$+\")(\"'#&'#/K#0H*%%<2V\"\"6V7W=.##&&!&'#/,#;4/#$+\")(\"'#&'#&&&#/' 8!:R!! )/'$8\":X\" )(\"'#&'#/($8\":Y\"! )(\"'#&'#"),
        peg$decode("%2Z\"\"6Z7[/1#;5/($8\":Y\"! )(\"'#&'#"),
        peg$decode("%$;6/&#0#*;6&&&#/' 8!:\\!! )")
      ],

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleIndices)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleIndex = peg$startRuleIndices[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$decode(s) {
    var bc = new Array(s.length), i;

    for (i = 0; i < s.length; i++) {
      bc[i] = s.charCodeAt(i) - 32;
    }

    return bc;
  }

  function peg$parseRule(index) {
    var bc    = peg$bytecode[index],
        ip    = 0,
        ips   = [],
        end   = bc.length,
        ends  = [],
        stack = [],
        params, i;

    while (true) {
      while (ip < end) {
        switch (bc[ip]) {
          case 0:
            stack.push(peg$consts[bc[ip + 1]]);
            ip += 2;
            break;

          case 1:
            stack.push(void 0);
            ip++;
            break;

          case 2:
            stack.push(null);
            ip++;
            break;

          case 3:
            stack.push(peg$FAILED);
            ip++;
            break;

          case 4:
            stack.push([]);
            ip++;
            break;

          case 5:
            stack.push(peg$currPos);
            ip++;
            break;

          case 6:
            stack.pop();
            ip++;
            break;

          case 7:
            peg$currPos = stack.pop();
            ip++;
            break;

          case 8:
            stack.length -= bc[ip + 1];
            ip += 2;
            break;

          case 9:
            stack.splice(-2, 1);
            ip++;
            break;

          case 10:
            stack[stack.length - 2].push(stack.pop());
            ip++;
            break;

          case 11:
            stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
            ip += 2;
            break;

          case 12:
            stack.push(input.substring(stack.pop(), peg$currPos));
            ip++;
            break;

          case 13:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (stack[stack.length - 1]) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 14:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (stack[stack.length - 1] === peg$FAILED) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 15:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (stack[stack.length - 1] !== peg$FAILED) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 16:
            if (stack[stack.length - 1] !== peg$FAILED) {
              ends.push(end);
              ips.push(ip);

              end = ip + 2 + bc[ip + 1];
              ip += 2;
            } else {
              ip += 2 + bc[ip + 1];
            }

            break;

          case 17:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (input.length > peg$currPos) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 18:
            ends.push(end);
            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

            if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
              end = ip + 4 + bc[ip + 2];
              ip += 4;
            } else {
              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
              ip += 4 + bc[ip + 2];
            }

            break;

          case 19:
            ends.push(end);
            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

            if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
              end = ip + 4 + bc[ip + 2];
              ip += 4;
            } else {
              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
              ip += 4 + bc[ip + 2];
            }

            break;

          case 20:
            ends.push(end);
            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

            if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
              end = ip + 4 + bc[ip + 2];
              ip += 4;
            } else {
              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
              ip += 4 + bc[ip + 2];
            }

            break;

          case 21:
            stack.push(input.substr(peg$currPos, bc[ip + 1]));
            peg$currPos += bc[ip + 1];
            ip += 2;
            break;

          case 22:
            stack.push(peg$consts[bc[ip + 1]]);
            peg$currPos += peg$consts[bc[ip + 1]].length;
            ip += 2;
            break;

          case 23:
            stack.push(peg$FAILED);
            if (peg$silentFails === 0) {
              peg$fail(peg$consts[bc[ip + 1]]);
            }
            ip += 2;
            break;

          case 24:
            peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
            ip += 2;
            break;

          case 25:
            peg$savedPos = peg$currPos;
            ip++;
            break;

          case 26:
            params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
            for (i = 0; i < bc[ip + 3]; i++) {
              params[i] = stack[stack.length - 1 - params[i]];
            }

            stack.splice(
              stack.length - bc[ip + 2],
              bc[ip + 2],
              peg$consts[bc[ip + 1]].apply(null, params)
            );

            ip += 4 + bc[ip + 3];
            break;

          case 27:
            stack.push(peg$parseRule(bc[ip + 1]));
            ip += 2;
            break;

          case 28:
            peg$silentFails++;
            ip++;
            break;

          case 29:
            peg$silentFails--;
            ip++;
            break;

          default:
            throw new Error("Invalid opcode: " + bc[ip] + ".");
        }
      }

      if (ends.length > 0) {
        end = ends.pop();
        ip = ips.pop();
      } else {
        break;
      }
    }

    return stack[0];
  }


      function default_value(key) {
          return options.defaultValue ? options.defaultValue(key) : undefined;
      }

      function normalize_attribute_list(a, consumed) {
          let retval = {};
          retval.prop = {};
          retval.eaten = consumed;
          // * set id from first id tag
          let id_elem = a && a.find( elem => elem.id );
          if (id_elem) { retval.prop.id = id_elem.id; }
          a.forEach( elem => {
              // * convert class key to class type value
              if (elem.key === 'class') { elem.class = [ elem.value ]; delete elem.key; delete elem.value; }
              if (elem.class) {
                  // * concat any new unique classes
                  retval.prop.class = retval.prop.class || [];
                  retval.prop.class = retval.prop.class.concat(elem.class.filter( item => retval.prop.class.indexOf(item) < 0 ));
              }
              else if (elem.id) {
                  // * first id tag already used
              }
              else {
                  if (elem.key === 'id') { retval.prop.id = retval.prop.id || elem.value; }
                  else { retval.prop[elem.key] = retval.prop[elem.key] || elem.value; }
              }
              });
          // retval._trace = a;
          return retval;
      }


  peg$result = peg$parseRule(peg$startRuleIndex);

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map