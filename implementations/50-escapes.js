"use strict";

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

var at;     // The index of the current character
var ch;     // The current character code
var text;

var stringChunkRegExp = /[^"\\\u0000-\u001f]*/y;
var wordRegExp = /-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][-+]?[0-9]+)?|true|false|null/y;

// this array is indexed by the char code of an escape character 
// e.g. \n -> 'n'.charCodeAt() === 110, so escapes[110] === '\n'
var
  x = "",
  escapes = [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, "\"", x, x, x, x, x, x, x, x, x, x, x, x, "/", x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, "\\", x, x, x, x, x, "\b", x, x, x, "\f", x, x, x, x, x, x, x, "\n", x, x, x, "\r", x, "\t"];

// these arrays are indexed by the char code of a hex digit, used for \uXXXX escapes
var
  y = 65536,
  hexLookup1 = new Uint32Array([y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 4096, 8192, 12288, 16384, 20480, 24576, 28672, 32768, 36864, y, y, y, y, y, y, y, 40960, 45056, 49152, 53248, 57344, 61440, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 40960, 45056, 49152, 53248, 57344, 61440]),
  hexLookup2 = new Uint32Array([y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 256, 512, 768, 1024, 1280, 1536, 1792, 2048, 2304, y, y, y, y, y, y, y, 2560, 2816, 3072, 3328, 3584, 3840, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 2560, 2816, 3072, 3328, 3584, 3840]),
  hexLookup3 = new Uint32Array([y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, y, y, y, y, y, y, y, 160, 176, 192, 208, 224, 240, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 160, 176, 192, 208, 224, 240]),
  hexLookup4 = new Uint32Array([y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, y, y, y, y, y, y, y, 10, 11, 12, 13, 14, 15, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 10, 11, 12, 13, 14, 15]);

var error = function (m) {

  // Call error when something is wrong.

  throw {
    name: "SyntaxError",
    message: m,
    at: at,
    text: text
  };
};

function string() {  // note: it's on you to check that ch == '"'.charCodeAt() before you call this
  var str = "";

  for (; ;) {
    stringChunkRegExp.lastIndex = at;  // find next chunk without \ or " or invalid chars
    stringChunkRegExp.test(text);

    var { lastIndex } = stringChunkRegExp;
    if (lastIndex > at) {
      str += text.slice(at, lastIndex);
      at = lastIndex;
    }

    ch = text.charCodeAt(at++);  // what comes after it?
    switch (ch) {
      case 34 /* " */:  // end of string
        ch = text.charCodeAt(at++);
        return str;

      case 92 /* \ */:  // backslash escape
        ch = text.charCodeAt(at++);
        if (ch === 117 /* u */) {
          var charCode =
            hexLookup1[text.charCodeAt(at++)] |
            hexLookup2[text.charCodeAt(at++)] |
            hexLookup3[text.charCodeAt(at++)] |
            hexLookup4[text.charCodeAt(at++)];

          if (charCode < 65536) {  // NaN fails this test
            str += String.fromCharCode(charCode);
            continue;
          }
          error("Invalid \\uXXXX escape in string");
        }

        var esc = escapes[ch];
        if (esc) {
          str += esc;
          continue;
        }
        error("Bad escape sequence");

      default:
        if (ch >= 0) error("Invalid character in string");
        error("Unterminated string");
    }
  }
};

var word = function () {
  var val;

  var startAt = at - 1;  // the first digit/varter was already consumed, so go back 1
  wordRegExp.lastIndex = startAt;
  wordRegExp.test(text) || error("Unexpected character or end of input");

  var { lastIndex } = wordRegExp;
  if (ch < 102 /* f */) {  // it's a number
    var string = text.slice(startAt, lastIndex);
    val = +string;

  } else {  // must be null/true/false
    val = ch === 110 /* n */ ? null : ch === 116 /* t */;
  }

  at = lastIndex;
  ch = text.charCodeAt(at++)
  return val;
};

function array() {
  var arr = [];
  do { ch = text.charCodeAt(at++) } while (ch <= 32);
  if (ch === 93 /* ] */) {
    ch = text.charCodeAt(at++);
    return arr;  // empty array
  }
  while (ch >= 0) {  // i.e. !isNaN(ch)
    arr.push(value());
    while (ch <= 32) ch = text.charCodeAt(at++);
    if (ch === 93 /* ] */) {
      ch = text.charCodeAt(at++);
      return arr;
    }
    if (ch !== 44 /* , */) error("Expected ',' after array element");
    do { ch = text.charCodeAt(at++) } while (ch <= 32);
  }
  error("Unterminated array");
};

function object() {
  var obj = {};
  do { ch = text.charCodeAt(at++) } while (ch <= 32);
  if (ch === 125 /* } */) {
    ch = text.charCodeAt(at++);
    return obj;  // empty object
  }
  while (ch === 34 /* " */) {
    var key = string();
    while (ch <= 32) ch = text.charCodeAt(at++);
    if (ch !== 58 /* : */) error("Expected ':' after key in object");
    ch = text.charCodeAt(at++);
    if (Object.hasOwnProperty.call(obj, key)) {
      error("Duplicate key '" + key + "'");
    }
    obj[key] = value();
    while (ch <= 32) ch = text.charCodeAt(at++);
    if (ch === 125 /* } */) {
      ch = text.charCodeAt(at++);
      return obj;
    }
    if (ch !== 44 /* , */) error("Expected ',' after value in object");
    do { ch = text.charCodeAt(at++) } while (ch <= 32);
  }
  error("Expected '\"' in object");
};

function value() {

  // Parse a JSON value. It could be an object, an array, a string, a number,
  // or a word.

  while (ch <= 32) ch = text.charCodeAt(at++);
  switch (ch) {
    case 123 /* { */: return object();
    case 91 /*  [ */: return array();
    case 34 /*  " */: return string();
    default: /*    */ return word();
  }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

export function parse(source, reviver) {
  var result;

  text = source;
  at = 0;
  ch = 32;
  result = value();
  while (ch <= 32) ch = text.charCodeAt(at++);
  if (ch >= 0) {
    error("Syntax error");
  }

  // If there is a reviver function, we recursively walk the new structure,
  // passing each name/value pair to the reviver function for possible
  // transformation, starting with a temporary root object that holds the result
  // in an empty key. If there is not a reviver function, we simply return the
  // result.

  return (typeof reviver === "function")
    ? (function walk(holder, key) {
      var k;
      var v;
      var val = holder[key];
      if (val && typeof val === "object") {
        for (k in val) {
          if (Object.prototype.hasOwnProperty.call(val, k)) {
            v = walk(val, k);
            if (v !== undefined) {
              val[k] = v;
            } else {
              delete val[k];
            }
          }
        }
      }
      return reviver.call(holder, key, val);
    }({ "": result }, ""))
    : result;
};

