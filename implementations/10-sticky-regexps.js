"use strict";

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

var at;     // The index of the current character
var ch;     // The current character

var stringChunkRegExp = /[^"\\\u0000-\u001f]*/y;
var wordRegExp = /-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][-+]?[0-9]+)?|true|false|null/y;

var escapee = {
  "\"": "\"",
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t"
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
    error("Expected '" + c + "' instead of '" + ch + "'");
  }

  // Get the next character. When there are no more characters,
  // return the empty string.

  ch = text.charAt(at);
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
      case '"':  // end of string
        next();
        return str;

      case '\\':  // backslash escape
        next();
        if (ch === "u") {
          let uffff = 0;
          for (let i = 0; i < 4; i += 1) {
            var hex = parseInt(next(), 16);
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

      case "":
        error("Unterminated string");

      default:
        error("Invalid escape sequence in string");
    }
  }
};

var white = function () {

  // Skip whitespace.

  while (ch && ch <= " ") {
    next();
  }
};

var word = function () {
  let val;

  var startAt = at - 1;  // the first digit/letter was already consumed, so go back 1
  wordRegExp.lastIndex = startAt;
  wordRegExp.test(text) || error("Unexpected character or end of input");

  var { lastIndex } = wordRegExp;
  if (ch < 'f') {  // it's a number
    var string = text.slice(startAt, lastIndex);
    val = +string;

  } else {  // must be null/true/false
    val = ch === 'n' ? null : ch === 't';
  }

  at = lastIndex;
  next();
  return val;
};

var value;  // Place holder for the value function.

var array = function () {

  // Parse an array value.

  var arr = [];

  if (ch === "[") {
    next("[");
    white();
    if (ch === "]") {
      next("]");
      return arr;   // empty array
    }
    while (ch) {
      arr.push(value());
      white();
      if (ch === "]") {
        next("]");
        return arr;
      }
      next(",");
      white();
    }
  }
  error("Bad array");
};

var object = function () {

  // Parse an object value.

  var key;
  var obj = {};

  if (ch === "{") {
    next("{");
    white();
    if (ch === "}") {
      next("}");
      return obj;   // empty object
    }
    while (ch) {
      if (ch !== '"') error('Expected " to start object key');
      key = string();
      white();
      next(":");
      if (Object.hasOwnProperty.call(obj, key)) {
        error("Duplicate key '" + key + "'");
      }
      obj[key] = value();
      white();
      if (ch === "}") {
        next("}");
        return obj;
      }
      next(",");
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
    case "{":
      return object();
    case "[":
      return array();
    case "\"":
      return string();
    default:
      return word();
  }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

export function parse(source, reviver) {
  var result;

  text = source;
  at = 0;
  ch = " ";
  result = value();
  white();
  if (ch) {
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
