// spell-checker:ignore retVal
const parser = require('..');

function stringify(s) {
  var retval = JSON.stringify(s);
  if (retval.search("'") >= 0) { return retval; }
  retval = retval.replace(/^"(.*)"$/, "'$1'").replace(/\\"/g, '"');
  return retval
}

function log_parsed(s) {
  console.log(stringify(s), ' => ', parser(s)); // eslint-disable-line unicorn/no-console-spaces
}

log_parsed('{ }');
log_parsed(' {key=value}');
log_parsed('{.class}');
log_parsed('{ ."class with  spaces +\\r\\n EOLs\\x03\\n" }');
log_parsed('{ ##id }');
log_parsed('{ key=value #"id with space" .class.x.y }');
log_parsed("{ key=value #'id with space (single-quoted)' .class.x.y }");
