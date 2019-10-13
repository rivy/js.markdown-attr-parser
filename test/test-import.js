'use strict';

import test from 'ava';

import parse from '..';

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
  const expected = {
    prop: {key: 'value'},
    eaten: toParse,
  };
  const r = parse(toParse);
  t.deepEqual(r, expected);
});
