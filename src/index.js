'use strict';

// spell-checker:ignore PEGjs retVal

const parser = require('./parser.pegjs');

// A valid output which means nothing has been parsed.
// Used as error return / invalid output
const nothingHappened = {
  prop: {},
  eaten: '',
};

// spell-checker:ignore nonChar ufdef ufeff uffd ufff uffff

// ref: [Javascript Unicode](https://mathiasbynens.be/notes/javascript-unicode) @ <https://archive.is/AbCR7>
// unicode-aware (including 'astral' unicode code points)
// const BOM = /[\ufeff]/u; // "unicode byte-order-mark"
/* eslint-disable-next-line no-control-regex */
const UC0 = /[\u0000-\u001f]/u; // "unicode '[C0] C0 controls'"
const UZs = /[\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/; // "unicode '[Zs] Separator,Space'"
const Usl = /[\u2028]/u; // "unicode line separator"
const Usp = /[\u2029]/u; // "unicode paragraph separator"
const del = /[\u007f]/u;
const nonchar = /[\uffd0\ufdef\ufff3\uffff\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
const ws = new RegExp(['[ \f\t\v]', UZs.source].join('|'), 'gmu');
const eol = new RegExp(['[\n\r]', Usl.source, Usp.source].join('|'), 'gmu');
const invisible = new RegExp([UC0.source, del.source, nonchar.source].join('|'), 'gmu');

function normalizeParserOutput(parsed, config) {
  // note: .class == aggregate all unique classes
  // note: #id == first id 'wins' (and tags have priority over 'id=...' keys)
  // note: keys == first key 'wins' (case-insensitive)

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

  // ToDO?: HTMLStringEncode() elem.value

  // HTML5 compatible names/values
  // ref: <https://mathiasbynens.be/notes/html5-id-class>
  // ref: <http://xahlee.info/js/html_allowed_chars_in_attribute.html>
  // ref: <https://stackoverflow.com/questions/9882257/how-to-reference-a-long-class-name-with-spaces-in-css#comment19004253_9882293>

  // - class names (ie, class attribute values) may contain ANY character except NUL; ... plus no whitespace because multiple class names are separated by whitespace
  //   + for sanity, replace any EOL with '$' and other invisible characters with '?'
  // - HTML5 ids are similar; may not be empty, cannot contain any kind of space character, and must be unique within the document
  //   + for sanity, replace any EOL with '$' and other invisible characters with '?'

  attributes.forEach(elem => {
    // * convert class key to class type value
    if (elem.key === 'class' || elem.key === '.') {
      elem.class = [elem.value];
      delete elem.key;
      delete elem.value;
    }

    if (elem.class) {
      // concat any new unique classes
      retval.prop.class = retval.prop.class || [];
      // * clean class name(s)
      elem.class = elem.class.map(e => e.replace(ws, '-').replace(eol, '$').replace(invisible, '?'));
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
      // * clean key name
      elem.key = elem.key.replace(ws, '-').replace(eol, '$').replace(invisible, '?');
      retval.prop[elem.key] = retval.prop[elem.key] || (typeof elem.value === 'undefined' ? config.defaultValue(elem.key) : elem.value);
    }
  });

  // * clean ID name
  if (typeof retval.prop.id !== 'undefined' && retval.prop.id !== '') {
    retval.prop.id = retval.prop.id.replace(ws, '-').replace(eol, '$').replace(invisible, '?');
  }

  // retval._trace = a;

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
