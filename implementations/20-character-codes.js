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

var next = function (c) {

  // If a c parameter is provided, verify that it matches the current character.

  if (c && c !== ch) {
    error("Expected '" + String.fromCharCode(c) + "' instead of '" + String.fromCharCode(c) + "'");
  }

  // Get the next character. When there are no more characters,
  // return the empty string.

  ch = text.charCodeAt(at);
  at += 1;
  return ch;
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

    next();  // what comes after it?
    switch (ch) {
      case 34 /* " */:  // end of string
        next();
        return str;

      case 92 /* \ */:  // backslash escape
        next();
        if (ch === 117 /* u */) {
          let uffff = 0;
          for (let i = 0; i < 4; i += 1) {
            var hex = parseInt(String.fromCharCode(next()), 16);
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
        error("Invalid escape sequence in string");
    }
  }
};

var white = function () {

  // Skip whitespace.

  while (ch >= 0 && ch <= 32) {
    next();
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
  next();
  return val;
};

var value;  // Place holder for the value function.

var array = function () {

  // Parse an array value.

  var arr = [];

  if (ch === 91 /* [ */) {
    next(91);
    white();
    if (ch === 93 /* ] */) {
      next(93);
      return arr;   // empty array
    }
    while (ch >= 0) {
      arr.push(value());
      white();
      if (ch === 93 /* ] */) {
        next(93);
        return arr;
      }
      next(44 /* , */);
      white();
    }
  }
  error("Bad array");
};

var object = function () {

  // Parse an object value.

  var key;
  var obj = {};

  if (ch === 123 /* { */) {
    next(123);
    white();
    if (ch === 125 /* } */) {
      next(125);
      return obj;   // empty object
    }
    while (ch >= 0) {
      if (ch !== 34) error('Expected " to start object key');
      key = string();
      white();
      next(58 /* : */);
      if (Object.hasOwnProperty.call(obj, key)) {
        error("Duplicate key '" + key + "'");
      }
      obj[key] = value();
      white();
      if (ch === 125 /* } */) {
        next(125);
        return obj;
      }
      next(44 /* , */);
      white();
    }
  }
  error("Bad object");
};

value = function () {

  // Parse a JSON value. It could be an object, an array, a string, a number,
  // or a word.

  white();
  switch (ch) {
    case 123 /* { */: return object();
    case 91 /*  [ */: return array();
    case 34 /*  " */: return string();
    default: /*    */ return word();
    // case "{":
    //   return object();
    // case "[":
    //   return array();
    // case "\"":
    //   return string();
    // default:
    //   return word();
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
  white();
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
