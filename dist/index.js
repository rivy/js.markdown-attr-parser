module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports) {

(function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleIndices = { embedded_list: 0 },
        peg$startRuleIndex   = 0,

        peg$consts = [
          peg$FAILED,
          [],
          { type: "any", description: "any character" },
          function(a) { return a; },
          "<!--",
          { type: "literal", value: "<!--", description: "\"<!--\"" },
          "-->",
          { type: "literal", value: "-->", description: "\"-->\"" },
          function() { return normalize_attribute_list([], ''); },
          "{",
          { type: "literal", value: "{", description: "\"{\"" },
          "}",
          { type: "literal", value: "}", description: "\"}\"" },
          function(a) { return normalize_attribute_list(a, text()); },
          null,
          function(c) { return c; },
          function(a, b) { a = a || []; return [].concat(a).concat(b); },
          function(c) { return {class: c}; },
          function(i) { return {id: i}; },
          "=",
          { type: "literal", value: "=", description: "\"=\"" },
          function(k, v) { return {key: k, value: v}; },
          function(k) { return {key: k, value: ''}; },
          function(k) { let retval = {key: k}; let v = default_value(k); if (typeof(v) !== 'undefined') { retval.value = v; }; return retval; },
          { type: "other", description: "whitespace" },
          /^[ \t]/,
          { type: "class", value: "[ \\t]", description: "[ \\t]" },
          { type: "other", description: "eol" },
          /^[\r\n]/,
          { type: "class", value: "[\\r\\n]", description: "[\\r\\n]" },
          "\\",
          { type: "literal", value: "\\", description: "\"\\\\\"" },
          " ",
          { type: "literal", value: " ", description: "\" \"" },
          "\"",
          { type: "literal", value: "\"", description: "\"\\\"\"" },
          "'",
          { type: "literal", value: "'", description: "\"'\"" },
          "<",
          { type: "literal", value: "<", description: "\"<\"" },
          ">",
          { type: "literal", value: ">", description: "\">\"" },
          /^[^\0-\x1F]/,
          { type: "class", value: "[^\\0-\\x1F]", description: "[^\\0-\\x1F]" },
          /^[^\0-\x1F "'=<>{}]/,
          { type: "class", value: "[^\\0-\\x1F \"'=<>{}]", description: "[^\\0-\\x1F \"'=<>{}]" },
          { type: "other", description: "escape sequence" },
          function(sequence) { return sequence; },
          void 0,
          function() {return expected('non-EOL character');},
          function(c) {return c;},
          function(s) { return s.join(''); },
          /^[^.\0-\x1F ={}]/,
          { type: "class", value: "[^.\\0-\\x1F ={}]", description: "[^.\\0-\\x1F ={}]" },
          function(c) { return c.join(''); },
          /^[^.#\0-\x1F =<>{}]/,
          { type: "class", value: "[^.#\\0-\\x1F =<>{}]", description: "[^.#\\0-\\x1F =<>{}]" },
          function(text) { return text.join(''); },
          ".",
          { type: "literal", value: ".", description: "\".\"" },
          function() { return text(); },
          function(n) { return n; },
          "#",
          { type: "literal", value: "#", description: "\"#\"" },
          function(n) { return n.join(''); }
        ],

        peg$bytecode = [
          peg$decode("!7!+D$ !-\"\"1!3\",(&-\"\"1!3\"\"+(%4\"6#\"!!%$\"#  \"#  "),
          peg$decode("! !7$,#&7$\"+Y$.$\"\"2$3%+I% !7$,#&7$\"+7%.&\"\"2&3'+'%4$6($ %$$#  $##  $\"#  \"#  *\u0139 \"! !7$,#&7$\"+\xBA$.$\"\"2$3%+\xAA% !7$,#&7$\"+\x98%.)\"\"2)3*+\x88% !7$,#&7$\"+v%7\"+l% !7$,#&7$\"+Z%.+\"\"2+3,+J% !7$,#&7$\"+8%.&\"\"2&3'+(%4*6-*!$%$*#  $)#  $(#  $'#  $&#  $%#  $$#  $##  $\"#  \"#  *\x89 \"! !7$,#&7$\"+v$.)\"\"2)3*+f% !7$,#&7$\"+T%7\"+J% !7$,#&7$\"+8%.+\"\"2+3,+(%4&6-&!\"%$&#  $%#  $$#  $##  $\"#  \"#  "),
          peg$decode("! !7$,#&7$\"+\x9D$7#*# \" .+\x8D% !! !7$+&$,#&7$\"\"\"  +2$7#+(%4\"6/\"! %$\"#  \"#  ,L&! !7$+&$,#&7$\"\"\"  +2$7#+(%4\"6/\"! %$\"#  \"#  \"+)%4#60#\"! %$##  $\"#  \"#  "),
          peg$decode("! !78+&$,#&78\"\"\"  +' 4!61!! %*\xFF \"!79+' 4!62!! %*\xED \"!7:+U$ !7$,#&7$\"+C%.3\"\"2334+3%73+)%4$65$\"# %$$#  $##  $\"#  \"#  *\xAA \"!7:+U$ !7$,#&7$\"+C%.3\"\"2334+3%77+)%4$65$\"# %$$#  $##  $\"#  \"#  *g \"!7:+J$ !7$,#&7$\"+8%.3\"\"2334+(%4#66#!\"%$##  $\"#  \"#  */ \"!7:+' 4!67!! %"),
          peg$decode("809\"\"1!3:9*\" 38"),
          peg$decode("80<\"\"1!3=9*\" 3;"),
          peg$decode(".>\"\"2>3?"),
          peg$decode(".@\"\"2@3A"),
          peg$decode(".B\"\"2B3C"),
          peg$decode(".D\"\"2D3E"),
          peg$decode(".3\"\"2334"),
          peg$decode(".F\"\"2F3G"),
          peg$decode(".H\"\"2H3I"),
          peg$decode(".)\"\"2)3*"),
          peg$decode(".+\"\"2+3,"),
          peg$decode("0J\"\"1!3K"),
          peg$decode("0L\"\"1!3M"),
          peg$decode("72*# \"7/"),
          peg$decode("8!7&+8$7(*# \"7)+(%4\"6O\"! %$\"#  \"#  9*\" 3N"),
          peg$decode("!7(+\xBD$ !!!87(9*$$\"\" P\"#  +C$71*. \"!7%+& 4!6Q! %+(%4\"6R\"! %$\"#  \"#  +_$,\\&!!87(9*$$\"\" P\"#  +C$71*. \"!7%+& 4!6Q! %+(%4\"6R\"! %$\"#  \"#  \"\"\"  +2%7(+(%4#6S#!!%$##  $\"#  \"#  *\xC8 \"!7)+\xBD$ !!!87)9*$$\"\" P\"#  +C$71*. \"!7%+& 4!6Q! %+(%4\"6R\"! %$\"#  \"#  +_$,\\&!!87)9*$$\"\" P\"#  +C$71*. \"!7%+& 4!6Q! %+(%4\"6R\"! %$\"#  \"#  \"\"\"  +2%7)+(%4#6S#!!%$##  $\"#  \"#  "),
          peg$decode("0T\"\"1!3U"),
          peg$decode("! !72*# \"70+,$,)&72*# \"70\"\"\"  +' 4!6V!! %"),
          peg$decode("0W\"\"1!3X"),
          peg$decode("! !70+&$,#&70\"\"\"  +' 4!6Y!! %"),
          peg$decode("!.Z\"\"2Z3[+\xCC$! !.Z\"\"2Z3[,)&.Z\"\"2Z3[\"+\x9E$! !!!8.Z\"\"2Z3[9*$$\"\" P\"#  +-$74+#%'\"%$\"#  \"#  +O$,L&!!8.Z\"\"2Z3[9*$$\"\" P\"#  +-$74+#%'\"%$\"#  \"#  \"\"\"  +' 4!6V!! %+'%4\"6\\\" %$\"#  \"#  +(%4\"6]\"! %$\"#  \"#  "),
          peg$decode("!.^\"\"2^3_+2$75+(%4\"6]\"! %$\"#  \"#  "),
          peg$decode("! !76+&$,#&76\"\"\"  +' 4!6`!! %")
        ],

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
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
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
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

      function protect(object) {
        return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;
      }

      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(protect(peg$consts[bc[ip + 1]]));
              ip += 2;
              break;

            case 1:
              stack.push(peg$currPos);
              ip++;
              break;

            case 2:
              stack.pop();
              ip++;
              break;

            case 3:
              peg$currPos = stack.pop();
              ip++;
              break;

            case 4:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;

            case 5:
              stack.splice(-2, 1);
              ip++;
              break;

            case 6:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;

            case 7:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;

            case 8:
              stack.pop();
              stack.push(input.substring(stack[stack.length - 1], peg$currPos));
              ip++;
              break;

            case 9:
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

            case 10:
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

            case 11:
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

            case 12:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);

                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }

              break;

            case 13:
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

            case 14:
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

            case 15:
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

            case 16:
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

            case 17:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;

            case 18:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;

            case 19:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;

            case 20:
              peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;

            case 21:
              peg$reportedPos = peg$currPos;
              ip++;
              break;

            case 22:
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

            case 23:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;

            case 24:
              peg$silentFails++;
              ip++;
              break;

            case 25:
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
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})()

/***/ })

/******/ });
//# sourceMappingURL=index.js.map