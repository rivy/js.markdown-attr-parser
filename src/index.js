'use strict';

// spell-checker:ignore PEGjs retVal

const parser = require('./parser.pegjs');

// A valid output which means nothing has been parsed.
// Used as error return / invalid output
const nothingHappened = {
  prop: {},
  eaten: '',
};

function normalizeParserOutput(parsed, config) {
  // note: .class == aggregate all unique classes
  // note: #id == first id 'wins' (and tags have priority over 'id=...' keys)
  // note: keys == first key 'wins'

  const {attributes, match} = parsed;

  const retval = {};
  retval.prop = {};
  retval.eaten = match;
  // * set id from first id tag
  // ... empty IDs are not allowed
  const idElement = attributes && attributes.find(elem => elem.id);
  if (idElement) {
    retval.prop.id = idElement.id;
  }

  attributes.forEach(elem => {
    // * convert class key to class type value
    if (elem.key === 'class' || elem.key === '.') {
      elem.class = [elem.value];
      delete elem.key;
      delete elem.value;
    }

    if (elem.class) {
      // * concat any new unique classes
      retval.prop.class = retval.prop.class || [];
      retval.prop.class = retval.prop.class.concat(elem.class.filter(item => item && retval.prop.class.indexOf(item) < 0));
      if (retval.prop.class.length === 0) {
        delete retval.prop.class;
      }
    } else if (elem.id) {
      // * first id tag already found and used
    } else if (elem.key === 'id' || elem.key === '#') {
      // ... empty IDs are discarded
      if (typeof elem.value !== 'undefined' && elem.value !== '') {
        retval.prop.id = retval.prop.id || elem.value;
      }
    } else {
      // ToDO: discard if case-insensitive elem.key matches any already set property per <https://html.spec.whatwg.org/multipage/syntax.html#attributes-2>
      retval.prop[elem.key] = retval.prop[elem.key] || (typeof elem.value === 'undefined' ? config.defaultValue(elem.key) : elem.value);
    }
  });
  // retval._trace = a;

  // ToDO: HTMLStringEncode() elem.value
  // ref: <https://mathiasbynens.be/notes/html5-id-class>
  // ref: <https://stackoverflow.com/questions/9882257/how-to-reference-a-long-class-name-with-spaces-in-css#comment19004253_9882293>
  // class names (ie, class attribute values may contain ANY character except NUL; ... and whitespace because of multiple classnames being separated by whitespace)
  // HTML5 ids are similar; may not be empty, cannot contain spaces, and must be document unique
  // ToDO: replace any whitespace sequence in class name with '-'
  //   ... for sanity, replace any invisible characters with '?', as well
  // ToDO: replace any illegal ID characters with '?'; for HTML5, IDs may not contain any kind of space character and may not be empty, per <http://xahlee.info/js/html_allowed_chars_in_attribute.html>
  //   ... for sanity, replace any invisible characters with '?', as well

  // spell-checker:ignore nonChar ufdef ufeff uffd ufff uffff
  // BOM "unicode byte-order-mark" = [\ufeff]
  // UC0 "unicode '[C0] C0 controls'" = [\0-\u001f]
  // del = [\u007f]
  // nonchar = [\uffd0\ufdef\ufff3\uffff\u1FFFE\u1FFFF\u2FFFE\u2FFFF\u3FFFE\u3FFFF\u4FFFE\u4FFFF\u5FFFE\u5FFFF\u6FFFE\u6FFFF\u7FFFE\u7FFFF\u8FFFE\u8FFFF\u9FFFE\u9FFFF\uAFFFE\uAFFFF\uBFFFE\uBFFFF\uCFFFE\uCFFFF\uDFFFE\uDFFFF\uEFFFE\uEFFFF\uFFFFE\uFFFFF\u10FFFE\u10FFFF]
  // char = !(UC0 / del / nonchar) c:. { return c; }

  // const UC0 = /[\0-\001f]/;
  // const UZs = /[\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/; // "unicode '[Zs] Separator,Space'"
  // const Usl = /[\u2028]/; // "unicode line separator"
  // const Usp = /[\u2029]/; // "unicode paragraph separator"
  // const del = /[\u007f]/;
  // const nonchar = /[\uffd0\ufdef\ufff3\uffff\u1FFFE\u1FFFF\u2FFFE\u2FFFF\u3FFFE\u3FFFF\u4FFFE\u4FFFF\u5FFFE\u5FFFF\u6FFFE\u6FFFF\u7FFFE\u7FFFF\u8FFFE\u8FFFF\u9FFFE\u9FFFF\uAFFFE\uAFFFF\uBFFFE\uBFFFF\uCFFFE\uCFFFF\uDFFFE\uDFFFF\uEFFFE\uEFFFF\uFFFFE\uFFFFF\u10FFFE\u10FFFF]/;
  // const ws =
  // if (retval.prop.class) {
  //   retval.prop.class.forEach(function(c) {})
  // }

  return retval;
}

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
    const eatEmpty = false;
    const parsed = normalizeParserOutput(parser.parse(value), config);
    if (Object.keys(parsed.prop).length === 0 && parsed.prop.constructor === Object) {
      parsed.eaten = eatEmpty ? parsed.eaten : '';
    }

    parsed.eaten = prefix + parsed.eaten;
    return parsed;
  } catch (_) {
    return nothingHappened;
  }
}

module.exports = parse;
