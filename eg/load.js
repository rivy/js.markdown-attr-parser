const parser = require('..');

function show(s) {
  console.log(s, ' => ', parser(s)); // eslint-disable-line unicorn/no-console-spaces
}

show('{ }');
show('{ .class }');
show('{ ."class with  spaces +\\r\\n EOLs\\x03\\n" }');
show('{ #id }');
show('{ key=value #id .class.x.y }');
