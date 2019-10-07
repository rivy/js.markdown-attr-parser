// Markdown Attribute Grammar
// designed/initial testing online @ <https://pegjs.org/online>
// spell-checker:ignore charSeq concat retVal typeOf ufeff

{
    function default_value(key) {
        return options.defaultValue ? options.defaultValue(key) : undefined;
    }

    function normalize_attribute_list(a, consumed) {
        let retval = {};
        retval.prop = {};
        retval.eaten = consumed;
        // * set id from first id tag
        let id_elem = a && a.find( elem => elem.id );
        if (id_elem) { retval.prop.id = id_elem.id; }
        a.forEach( elem => {
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
                if (elem.key === 'id') { retval.prop.id = retval.prop.id || elem.value; }
                else { retval.prop[elem.key] = retval.prop[elem.key] || elem.value; }
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

BOM "unicode byte-order-mark" = [\ufeff]
UZs "unicode '[Zs] Separator,Space'" = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]
Usl "unicode line separator" = [\u2028]
Usp "unicode paragraph separator" = [\u2029]
Qs "single quote" = "'"
Qd "double quote" = '"'

_ "whitespace" = [ \t\f\v] / UZs / BOM
eol = [\n\r] / Usl / Usp
escape_char = '\\'

char = [^\0-\u001f]
name_char = [^\0-\u001f "'=<>{}]
value_char = name_char
quoted_chars = escape_sequence / char

escape_sequence = escape_char sequence:(Qs / Qd) { return sequence; }

string =
    (Qd) s:((!Qd)c:(quoted_chars / eol {return expected('non-EOL character');}) {return c;})+ (Qd) { return s.join(''); }
    / (Qs) s:((!Qs)c:(quoted_chars / eol {return expected('non-EOL character');}) {return c;})+ (Qs) { return s.join(''); }

class_name_charset = [^.\0-\u001f ={}]
id_name_charseq = c:(escape_sequence / name_char)+ { return c.join(''); }
key_name_charset = [^.#\0-\u001f =<>{}]
value = text:(c:value_char)+ { return text.join(''); }

class_name = '.' n:('.'* (c:(!'.' class_name_charset)+ { return c.join(''); }) { return text(); }) { return n; }
id_name = '#' n:(id_name_charseq) { return n; }
key_name = n:(key_name_charset)+ { return n.join(''); }
