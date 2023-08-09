"use strict";

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

var at;     // The index of the current character
var ch;     // The current character code

var stringChunkRegExp = /[^"\\\u0000-\u001f]*/y;
var wordRegExp = /-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][-+]?[0-9]+)?|true|false|null/y;

var escapee = {
  34: "\"",
  92: "\\",
  47: "/",
  98: "\b",
  102: "\f",
  110: "\n",
  114: "\r",
  116: "\t"
};

var text;

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
  let str = "";

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
          let uffff = 0;
          for (let i = 0; i < 4; i += 1) {
            var hex = parseInt(String.fromCharCode(ch = text.charCodeAt(at++)), 16);
            if (!isFinite(hex)) {
              error("Invalid \\uXXXX escape sequence in string");
            }
            uffff = uffff * 16 + hex;
          }
          str += String.fromCharCode(uffff);

        } else if (typeof escapee[ch] === "string") {
          str += escapee[ch];

        } else {
          error("Invalid escape sequence in string");
        }
        break;

      default:
        if (isNaN(ch)) error("Unterminated string");
        error("Invalid character in string");
    }
  }
};

var word = function () {
  let val;

  var startAt = at - 1;  // the first digit/letter was already consumed, so go back 1
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
