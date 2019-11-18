# // Markdown Attribute Grammar
# // designed/initial testing online @ <https://pegjs.org/online>
# // spell-checker:ignore charSeq concat retVal typeOf

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

attribute_list ->
  "<!--" _ "{" _ escape_sequence:+ _ "}" _ "-->" {% (d) => d[4].join("") %}
  | "{" _ hex_number _ "}" {% (d) => d[2].join("") %}

# // use javascript-type string escapes (except deprecated octal escapes); ref: <https://mathiasbynens.be/notes/javascript-escapes> @@ <https://archive.is/uuty4>

escape_sequence -> escape_char (
  escape_char
  | "b" {% () => "\b" %}
  | "f" {% () => "\f" %}
  | "n" {% () => "\n" %}
  | "r" {% () => "\r" %}
  | "t" {% () => "\t" %}
  | "v" {% () => "\v" %}
  | "0" {% () => "" %}
#  | Qd
#  | Qs
  | "x" ( hex_digit hex_digit ) {% (d) => String.fromCharCode(parseInt(d[1].join(""), 16)) %}
  | "u" ( hex_digit hex_digit hex_digit hex_digit ) {% (d) => String.fromCharCode(parseInt(d[1].join(""), 16)) %}
  | "u{" ( hex_number ) "}" {% (d) => String.fromCharCode(parseInt(d[1].join(""), 16)) %}
  | .
  ) {% (d) => d[1] %}

escape_char -> "\\"
hex_number -> hex_digit:+ {% (d) => d[0].join("") %}
hex_digit -> [0-9a-fA-F]
