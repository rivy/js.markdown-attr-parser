'use strict';

// spell-checker:ignore PEGjs retVal

const parser = require('./parser.pegjs');

// A valid output which means nothing has been parsed.
// Used as error return / invalid output
const nothingHappened = {
  prop: {},
  eaten: '',
};

function normalizeParserOutput(a, consumed) {
  // note: .class == aggregate all unique classes
  // note: #id == first id 'wins' (and tags have priority over 'id=...' keys)
  // note: keys == first key 'wins'
  // ToDO: move to main code for better code coverage semantics
  const retval = {};
  retval.prop = {};
  retval.eaten = consumed;
  // * set id from first id tag
  // ... empty IDs are not allowed
  const idElement = a && a.find(elem => elem.id);
  if (idElement) {
    retval.prop.id = idElement.id;
  }

  a.forEach(elem => {
    // ToDO: HTMLStringEncode() elem.value
    // ToDO: replace any whitespace sequence in class name with '-'
    //   ... for sanity, replace any invisible characters with '-', as well
    // ToDO: replace any illegal ID characters with '-'; for HTML5, IDs may not contain any kind of space character and may not be empty, per <http://xahlee.info/js/html_allowed_chars_in_attribute.html>
    //   ... for sanity, replace any invisible characters with '-', as well
    // * convert class key to class type value
    if (elem.key === 'class') {
      elem.class = [elem.value];
      delete elem.key;
      delete elem.value;
    }

    if (elem.class) {
      // * concat any new unique classes
      retval.prop.class = retval.prop.class || [];
      retval.prop.class = retval.prop.class.concat(elem.class.filter(item => retval.prop.class.indexOf(item) < 0));
    } else if (elem.id) {
      // * first id tag already used
    } else if (elem.key === 'id') {
      // ... empty IDs are discarded
      if (typeof elem.value !== 'undefined' && elem.value !== '') {
        retval.prop.id = retval.prop.id || elem.value;
      }
    } else {
      // ToDO: discard if case-insensitive elem.key matches any already set property per <https://html.spec.whatwg.org/multipage/syntax.html#attributes-2>
      retval.prop[elem.key] = retval.prop[elem.key] || elem.value;
    }
  });
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
    const {attributes, match} = parser.parse(value, config);
    const parsed = normalizeParserOutput(attributes, (attributes.length > 0) ? match : '');
    parsed.eaten = prefix + parsed.eaten;
    return parsed;
  } catch (_) {
    return nothingHappened;
  }
}

module.exports = parse;
