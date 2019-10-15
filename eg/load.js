const parser = require('..');

var s = '';

s = '{ }'; console.log(s, ' => ', parser(s));
s = '{ .class }'; console.log(s, ' => ', parser(s));
s = '{ #id }'; console.log(s, ' => ', parser(s));
s = '{ key=value #id .class.x.y }'; console.log(s, ' => ', parser(s));
