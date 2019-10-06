'use strict';

import test from 'ava';

const parse = require('..');

const nothingHappened = {
  prop: {},
  eaten: '',
};

test('cjs - simple comment', t => {
  const toParse = '<!-- -->';
  const r = parse(toParse);
  t.deepEqual(r.prop, nothingHappened.prop);
  t.is(r.eaten, ''); // It's an error
});

test('simple empty braces', t => {
  const toParse = '{}';
  const r = parse(toParse);
  t.deepEqual(r.prop, nothingHappened.prop);
  t.is(r.eaten, ''); // not parsed/eaten
});

test('line-input', t => {
  const toParse = '{key=value}';
  const r = parse(toParse);
  t.is(r.prop.key, 'value');
  t.is(r.eaten, toParse);
});
