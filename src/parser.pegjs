// Markdown Attribute Grammar
// designed/initial testing online @ <https://pegjs.org/online>
// spell-checker:ignore charSeq concat nonChar retVal typeOf ufdef ufeff uffd ufff uffff

{
    function default_value(key) {
        return options.defaultValue ? options.defaultValue(key) : undefined;
    }

    function normalize_attribute_list(a, consumed) {
        // note: .class == aggregate all unique classes
        // note: #id == first id 'wins' (and tags have priority over 'id=...' keys)
        // note: keys == first key 'wins'
        // ToDO: move to main code for better code coverage semantics
        let retval = {};
        retval.prop = {};
        retval.eaten = consumed;
        // * set id from first id tag
        // ... empty IDs are not allowed
        let id_elem = a && a.find( elem => elem.id );
        if (id_elem) { retval.prop.id = id_elem.id; }
        a.forEach( elem => {
            // ToDO: HTMLStringEncode() elem.value
            // ToDO: replace any whitespace sequence in class name with '-'
            //   ... for sanity, replace any invisible characters with '-', as well
            // ToDO: replace any illegal ID characters with '-'; for HTML5, IDs may not contain any kind of space character and may not be empty, per <http://xahlee.info/js/html_allowed_chars_in_attribute.html>
            //   ... for sanity, replace any invisible characters with '-', as well
            // * convert class key to class type value
            if (elem.key === 'class') { elem.class = [ elem.value ]; delete elem.key; delete elem.value; }
            if (elem.class) {
                // * concat any new unique classes
                retval.prop.class = retval.prop.class || [];
                retval.prop.class = retval.prop.class.concat(elem.class.filter( item => retval.prop.class.indexOf(item) < 0 ));
            }
            else if (elem.id) {
                // * first id tag already used
            }
            else {
                if (elem.key === 'id') {
                  // ... empty IDs are discarded
                  if (typeof elem.value !== 'undefined' && elem.value !== '') { retval.prop.id = retval.prop.id || elem.value; }
                  }
                else {
                  // ToDO: discard if case-insensitive elem.key matches any already set property per <https://html.spec.whatwg.org/multipage/syntax.html#attributes-2>
                  retval.prop[elem.key] = retval.prop[elem.key] || elem.value;
                }
            }
            });
        // retval._trace = a;
        return retval;
    }
}

embedded_list =
    a:attribute_list .* { return a; }
    // / a:bare_attribute_list y:(x:(w:_* eol? {return w.join('');}) .* {return x;})? { y = y || ''; a.eaten += y;return a; }

attribute_list =
    _* '<!--' _* '{' _* a:attr_list? _* '}' _* '-->' { return normalize_attribute_list(a, text()); }
    / _* '{' _* a:attr_list? _* '}' { return normalize_attribute_list(a, text()); }

// bare_attribute_list =
//     _* a:attr_list { return normalize_attribute_list(a, text()); }

attr_list =
    // _* a:attr? b:(_+ c:attr { return c; })* { a = a || []; return [].concat(a).concat(b); }
    _* a:attr b:(_+ c:attr { return c; })* { a = a || []; return [].concat(a).concat(b); }

attr =
    c:class_name+ { return {class: c}; }
    / i:id_name { return {id: i}; }
    / k:key_name '=' v:string { return {key: k, value: v}; }
    / k:key_name '=' v:value { return {key: k, value: v}; }
    / k:key_name '=' { return {key: k, value: ''}; }
    / k:key_name { let retval = {key: k}; let v = default_value(k); if (typeof(v) !== 'undefined') { retval.value = v; }; return retval; }

class_name = '.' n:('.'* (c:(!'.' class_name_charset)+ { return c.join(''); } / string) { return text(); }) { return n; }
id_name = '#' n:(id_name_charseq / string) { return n; }
key_name = n:(c:(key_name_charset)+ { return c.join('') } / string) { return n; }

class_name_charset = [^.\0-\u001f ={}]
id_name_charseq = c:(escape_sequence / name_char)+ { return c.join(''); }
key_name_charset = [^.#\0-\u001f =<>{}]
value = text:(c:value_char)+ { return text.join(''); }

BOM "unicode byte-order-mark" = [\ufeff]
UC0 "unicode '[C0] C0 controls'" = [\0-\u001f]
UZs "unicode '[Zs] Separator,Space'" = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]
Usl "unicode line separator" = [\u2028]
Usp "unicode paragraph separator" = [\u2029]
Qs "single quote" = "'"
Qd "double quote" = '"'

_ "whitespace" = [ \t\f\v] / UZs / BOM
del = [\u007f]
eol = [\n\r] / Usl / Usp
escape_char = '\\'
nonchar = [\uffd0\ufdef\ufff3\uffff\u1FFFE\u1FFFF\u2FFFE\u2FFFF\u3FFFE\u3FFFF\u4FFFE\u4FFFF\u5FFFE\u5FFFF\u6FFFE\u6FFFF\u7FFFE\u7FFFF\u8FFFE\u8FFFF\u9FFFE\u9FFFF\uAFFFE\uAFFFF\uBFFFE\uBFFFF\uCFFFE\uCFFFF\uDFFFE\uDFFFF\uEFFFE\uEFFFF\uFFFFE\uFFFFF\u10FFFE\u10FFFF]

char = [^\0-\u001f]
name_char = [^\0-\u001f "'=<>{}]
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

string =
    (Qd) s:((!Qd)c:(quoted_chars / eol {return expected('non-EOL character');}) {return c;})+ (Qd) { return s.join(''); }
    / (Qs) s:((!Qs)c:(quoted_chars / eol {return expected('non-EOL character');}) {return c;})+ (Qs) { return s.join(''); }
