// spell-checker:ignore retVal
/* eslint quotes: ["error", "single", { "avoidEscape": true }] */
const parser = require('..');

function stringify(s) {
  let retval = JSON.stringify(s);

  if (retval.search("'") >= 0) {
    return retval;
  }

  retval = retval.replace(/^"(.*)"$/, "'$1'").replace(/\\"/g, '"');
  return retval;
}

function showParsed(s) {
  console.log(stringify(s), '=>', parser(s));
}

showParsed('{ }');
showParsed(' {key=value}');
showParsed('{.class}');
showParsed('{ ."class with  spaces +\\r\\n EOLs\\x03\\n" }');
showParsed('{ ##id }');
showParsed('{ key=value #"id with space" .class.x.y }');
showParsed("{ key=value #'id with space (single-quoted)' .class.x.y }");
