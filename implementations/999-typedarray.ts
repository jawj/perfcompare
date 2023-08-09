/*
  2023-05-26 / George MacKerron (mackerron.com)
  Based on https://github.com/douglascrockford/JSON-js/blob/03157639c7a7cddd2e9f032537f346f1a87c0f6d/json_parse.js
  Public Domain
  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

"use strict";

export class JSONParseError extends Error { }

// global state
let at: number;  // the index of the current character
let ch: number;  // the current character code
let source: Uint8Array;  // JSON source string
let numericReviverFn: undefined | ((s: string) => any);  // function that transforms numeric strings ("123") to numbers (123)
let textDec = new TextDecoder();  // a TextDecoder instance, if one becomes necessary
let textEnc: TextEncoder;  // a TextDecoder instance, if one becomes necessary


// these 'sticky' RegExps are used to parse (1) strings and (2) numbers, true/false and null
const stringChunkRegExp = /[^\\"\u0000-\u001f]*/y;
const wordRegExp = /-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][-+]?[0-9]+)?|true|false|null/y;

// this array is indexed by the char code of an escape character 
// e.g. \n -> 'n'.charCodeAt() === 110, so escapes[110] === '\n'
const x = "";
const escapes = [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, "\"", x, x, x, x, x, x, x, x, x, x, x, x, "/", x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, "\\", x, x, x, x, x, "\b", x, x, x, "\f", x, x, x, x, x, x, x, "\n", x, x, x, "\r", x, "\t"];

var y = -65536;
var hexLookup1 = [y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 4096, 8192, 12288, 16384, 20480, 24576, 28672, 32768, 36864, y, y, y, y, y, y, y, 40960, 45056, 49152, 53248, 57344, 61440, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 40960, 45056, 49152, 53248, 57344, 61440];
var hexLookup2 = [y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 256, 512, 768, 1024, 1280, 1536, 1792, 2048, 2304, y, y, y, y, y, y, y, 2560, 2816, 3072, 3328, 3584, 3840, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 2560, 2816, 3072, 3328, 3584, 3840];
var hexLookup3 = [y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, y, y, y, y, y, y, y, 160, 176, 192, 208, 224, 240, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 160, 176, 192, 208, 224, 240];
var hexLookup4 = [y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, y, y, y, y, y, y, y, 10, 11, 12, 13, 14, 15, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, y, 10, 11, 12, 13, 14, 15];


function error(m: string) {
  throw new JSONParseError(m + "\nAt character " + at + " in JSON: " + source);
};

function chDesc(prefix?: string) {
  return ch >= 0 ? "'" + (prefix || '') + String.fromCharCode(ch) + "'" : "end of input";
}

function number() {
  const startAt = at - 1;
  for (; (ch > 47 && ch < 58) || ch === 46 || ch === 101 || ch === 45 || ch === 43 || ch === 69; ch = source[at++]) { }
  const str = textDec.decode(source.subarray(startAt, at - 1));
  return +str;
};

function string() {  // note: it's on you to check that ch == '"'.charCodeAt() before you call this
  let str = "";
  var startAt = at;

  for (; ;) {
    ch = source[at++]
    switch (ch) {
      case 34 /* " */:  // end of string
        if (at - 1 > startAt) str += textDec.decode(source.subarray(startAt, at - 1));
        ch = source[at++];
        return str;

      case 92 /* \ */:  // backslash escape
        if (at - 1 > startAt) str += textDec.decode(source.subarray(startAt, at - 1));
        ch = source[at++];
        if (ch === 117 /* u */) {
          var charCode =
            hexLookup1[source[at++]] +
            hexLookup2[source[at++]] +
            hexLookup3[source[at++]] +
            hexLookup4[source[at++]];

          if (!(charCode >= 0)) error("Invalid \\uXXXX escape in string");
          str += String.fromCharCode(charCode);
          startAt = at;
          continue;
        }

        str += escapes[ch] || error("Invalid escape sequence " + chDesc("\\") + " in string");
        startAt = at;
        continue;

      default:
        if (ch < 32) error("Illegal control character");
        if (ch === undefined) error("Unterminated string");
    }
  }
};

function array() {
  const arr: any[] = [];
  let i = 0;
  // the '< 33' helps performance by short-circuiting the four other conditions in most cases
  do { ch = source[at++] } while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9));
  if (ch === 93 /* ] */) {
    ch = source[at++];
    return arr;  // empty array
  }
  while (ch >= 0) {  // i.e. !isNaN(ch)
    arr[i++] = value();
    while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9)) ch = source[at++];
    if (ch === 93 /* ] */) {
      ch = source[at++];
      return arr;
    }
    if (ch !== 44 /* , */) error("Expected ',' but got " + chDesc() + " after array element");
    do { ch = source[at++] } while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9));
  }
  error("Unterminated array");
};

function object() {
  const obj: Record<string, any> = {};
  do { ch = source[at++] } while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9));
  if (ch === 125 /* } */) {
    ch = source[at++];
    return obj;  // empty object
  }
  while (ch === 34 /* " */) {
    const key = string();
    while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9)) ch = source[at++];
    if (ch !== 58 /* : */) error("Expected ':' but got " + chDesc() + " after key in object");
    ch = source[at++];
    obj[key] = value();
    while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9)) ch = source[at++];
    if (ch === 125 /* } */) {
      ch = source[at++];
      return obj;
    }
    if (ch !== 44 /* , */) error("Expected ',' but got " + chDesc() + " after value in object");
    do { ch = source[at++] } while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9));
  }
  error("Expected '\"' but got " + chDesc() + " in object");
};

function value() {
  while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9)) ch = source[at++];
  switch (ch) {
    case 34 /*  " */:
      return string();
    case 123 /* { */:
      return object();
    case 91 /*  [ */:
      return array();
    case 102 /* f */:
      if (source[at++] === 97 && source[at++] === 108 && source[at++] === 115 && source[at++] === 101) {
        ch = source[at++];
        return false;
      }
      error("Bad value");
    case 116 /* t */:
      if (source[at++] === 114 && source[at++] === 117 && source[at++] === 101) {
        ch = source[at++];
        return true;
      }
      error("Bad value");
    case 110 /* n */:
      if (source[at++] === 117 && source[at++] === 108 && source[at++] === 108) {
        ch = source[at++];
        return null;
      }
      error("Bad value");
    default: /*    */
      return number();
  }
};

export function parse(json: string | Uint8Array, reviver?: (...x: any[]) => any, numericReviver?: (s: string) => any) {
  source = typeof json === 'string' ? (textEnc ??= new TextEncoder()).encode(json) : json;

  at = 0;
  ch = 32;
  numericReviverFn = numericReviver;

  const result = value();
  while (ch < 33 && (ch === 32 || ch === 10 || ch === 13 || ch === 9)) ch = source[at++];
  if (ch >= 0) error("Unexpected data at end of input");  // i.e. !isNaN(ch)

  return (typeof reviver === "function")
    ? (function walk(holder: any, key: any) {
      const val = holder[key];
      if (val && typeof val === "object") {
        for (const k in val) {
          if (Object.prototype.hasOwnProperty.call(val, k)) {
            const v = walk(val, k);
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
