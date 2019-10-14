// Markdown Attribute Grammar
// designed/initial testing online @ <https://pegjs.org/online>
// spell-checker:ignore charSeq concat retVal typeOf

embedded_list =
    a:attribute_list .* { return a; }
    // / a:bare_attribute_list y:(x:(w:_* eol? {return w.join('');}) .* {return x;})? { y = y || ''; a.eaten += y;return a; }

attribute_list =
  _* '<!--' _* '{' _* a:attr_list? _* '}' _* '-->' { a = a || []; return { attributes: [].concat(a), match: text() }; }
  / _* '{' _* a:attr_list? _* '}' { a = a || []; return { attributes: [].concat(a), match: text() }; }

// bare_attribute_list =
//     _* a:attr_list { return { attribute_list: [].concat(a), match: text() }; }

attr_list =
  // _* a:attr? b:(_+ c:attr { return c; })* { a = a || []; return [].concat(a).concat(b); }
  _* a:attr b:(_+ c:attr { return c; })* { return [].concat(a).concat(b); }

attr =
  c:class_name+ { return {class: c}; }
  / i:id_name { return {id: i}; }
  / k:key_name '=' v:string { return {key: k, value: v}; }
  / k:key_name '=' v:value { return {key: k, value: v}; }
  / k:key_name '=' { return {key: k, value: ''}; }
  / k:key_name { return {key: k}; }

// class_name = '.' n:('.'* (c:(!'.' literal_charset)+ { return c.join(''); } / string) { return text(); })? { return n || ''; }
// id_name = '#' n:(literal_charseq / string)? { return n || ''; }
class_name = '.' n:('.'* (c:(!'.' literal_charset)+ { return c.join(''); } / string) { return text(); }) { return n; }
id_name = '#' n:(literal_charseq / string) { return n; }
key_name = n:(literal_charseq / string) { return n; }

string =
  (Qd) s:((!Qd)c:(eol {return expected('non-EOL character');} / escape_sequence / .) {return c;})+ (Qd) { return s.join(''); }
  / (Qs) s:((!Qs)c:(eol {return expected('non-EOL character');} / escape_sequence / .) {return c;})+ (Qs) { return s.join(''); }

value = literal_charseq

literal_charset = !([=<>{}] / _ / eol) c:. { return c; }
literal_charseq = c:(literal_charset)+ { return c.join(''); }

UZs "unicode '[Zs] Separator,Space'" = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]
Usl "unicode line separator" = [\u2028]
Usp "unicode paragraph separator" = [\u2029]

Qs "single quote" = "'"
Qd "double quote" = '"'

_ "whitespace" = [ \t\f\v] / UZs
eol = [\n\r] / Usl / Usp

// use javascript-type string escapes (except deprecated octal escapes); ref: <https://mathiasbynens.be/notes/javascript-escapes> @@ <https://archive.is/uuty4>
escape_char = '\\'

escape_sequence = escape_char sequence:(
  escape_char
  / 'b' { return '\b'; }
  / 'f' { return '\f'; }
  / 'n' { return '\n'; }
  / 'r' { return '\r'; }
  / 't' { return '\t'; }
  / 'v' { return '\v'; }
  / '0' { return ''; }
  / Qd { return '"'; }
  / Qs { return "'"; }
  / 'x' v:$( hex_digit hex_digit ) { return String.fromCharCode(parseInt(v, 16)); }
  / 'u' v:$( hex_digit hex_digit hex_digit hex_digit ) { return String.fromCharCode(parseInt(v, 16)); }
  / 'u{' v:$( hex_digit+ ) '}' { return String.fromCharCode(parseInt(v, 16)); }
  / .
  ) { return sequence; }

hex_digit = [0-9a-f]i
