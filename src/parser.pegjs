// Markdown Attribute Grammar
// designed/initial testing online @ <https://pegjs.org/online>
// spell-checker:ignore charSeq concat nonChar retVal typeOf ufdef ufeff uffd ufff uffff

{
  function defaultValue(key) {
    return options.defaultValue ? options.defaultValue(key) : undefined;
  }
}

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
  / k:key_name { let retval = {key: k}; let v = defaultValue(k); if (typeof(v) !== 'undefined') { retval.value = v; }; return retval; }

class_name = '.' n:('.'* (c:(!'.' class_name_charset)+ { return c.join(''); } / string) { return text(); }) { return n; }
id_name = '#' n:(id_name_charseq / string) { return n; }
key_name = n:(c:(key_name_charset)+ { return c.join('') } / string) { return n; }

string =
  (Qd) s:((!Qd)c:(quoted_chars / eol {return expected('non-EOL character');}) {return c;})+ (Qd) { return s.join(''); }
  / (Qs) s:((!Qs)c:(quoted_chars / eol {return expected('non-EOL character');}) {return c;})+ (Qs) { return s.join(''); }

value = text:(c:value_char)+ { return text.join(''); }

class_name_charset = [^.\0-\u001f ={}]
id_name_charseq = c:(escape_sequence / name_char)+ { return c.join(''); }
key_name_charset = [^.#\0-\u001f =<>{}]

// BOM "unicode byte-order-mark" = [\ufeff]
UC0 "unicode '[C0] C0 controls'" = [\0-\u001f]
UZs "unicode '[Zs] Separator,Space'" = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]
Usl "unicode line separator" = [\u2028]
Usp "unicode paragraph separator" = [\u2029]

Qs "single quote" = "'"
Qd "double quote" = '"'

del = [\u007f]
escape_char = '\\'

_ "whitespace" = [ \t\f\v] / UZs
eol = [\n\r] / Usl / Usp
nonchar = [\uffd0\ufdef\ufff3\uffff\u1FFFE\u1FFFF\u2FFFE\u2FFFF\u3FFFE\u3FFFF\u4FFFE\u4FFFF\u5FFFE\u5FFFF\u6FFFE\u6FFFF\u7FFFE\u7FFFF\u8FFFE\u8FFFF\u9FFFE\u9FFFF\uAFFFE\uAFFFF\uBFFFE\uBFFFF\uCFFFE\uCFFFF\uDFFFE\uDFFFF\uEFFFE\uEFFFF\uFFFFE\uFFFFF\u10FFFE\u10FFFF]

char = !(UC0 / del / nonchar) c:. { return c; }
name_char = !(UC0 / del / nonchar / _ / ["'=<>{}]) c:. { return c; }
value_char = name_char
quoted_chars = escape_sequence / char

// escape_sequence = escape_char sequence:(.) { return sequence; }
// use javascript strings with escapes (except deprecated octal escapes); ref: <https://mathiasbynens.be/notes/javascript-escapes> @@ <https://archive.is/uuty4>
escape_sequence = escape_char sequence:(
  '\\' { return '\\'; }
  / 'b' { return '\b'; }
  / 'f' { return '\f'; }
  / 'n' { return '\n'; }
  / 'r' { return '\b'; }
  / 't' { return '\b'; }
  / 'v' { return '\b'; }
  / '0' { return ''; }
  / Qd { return '"'; }
  / Qs { return "'"; }
  / 'x' v:$( hex_digit hex_digit ) { return String.fromCharCode(parseInt(v, 16)); }
  / 'u' v:$( hex_digit hex_digit hex_digit hex_digit ) { return String.fromCharCode(parseInt(v, 16)); }
  / 'u{' v:$( hex_digit+ ) '}' { return String.fromCharCode(parseInt(v, 16)); }
  / .
  ) { return sequence; }

hex_digit = [0-9a-f]i
