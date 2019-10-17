// spell-checker:ignore retVal
const parser = require('..');

function stringify(s) {
  var retval = JSON.stringify(s);
  if (retval.search("'") >= 0) { return retval; }
  retval = retval.replace(/^"(.*)"$/, "'$1'").replace(/\\"/g, '"');
  return retval
}

function show_parsed(s) {
  console.log(stringify(s), ' => ', parser(s)); // eslint-disable-line unicorn/no-console-spaces
}

show_parsed('{ }');
show_parsed(' {key=value}');
show_parsed('{.class}');
show_parsed('{ ."class with  spaces +\\r\\n EOLs\\x03\\n" }');
show_parsed('{ ##id }');
show_parsed('{ key=value #"id with space" .class.x.y }');
show_parsed("{ key=value #'id with space (single-quoted)' .class.x.y }");
