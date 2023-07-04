import m from 'mithril';

import { conformanceUI } from './ui/conformance';
import { performanceUI } from './ui/performance';
import { collapsible } from './ui/collapsible';

import { parse as parse_native } from './implementations/01-native';
import { parse as parse_jsonCustomNumbers } from './implementations/02-json-custom-numbers';
import { 
  parseConform as parseConform_jsonBigint,
  parsePerform as parsePerform_jsonBigint,
} from './implementations/04-json-bigint';
import { parse as parse_losslessJson } from './implementations/05-lossless-json';
import { parse as parse_crockford } from './implementations/03-crockford';
import { parse as parse_stringsIndexOf } from './implementations/09-strings-indexOf';
import { parse as parse_stringsRegexpTest } from './implementations/10-strings-regexp-test';


import boolNull from './json-docs/bool-null-array.json';
import longNumbers from './json-docs/long-numbers-array.json';
import longStrings from './json-docs/long-strings-array.json';
import shortNumbers from './json-docs/short-numbers-array.json';
import shortStrings from './json-docs/short-strings-object.json';
import stringEscapes from './json-docs/string-escapes.json';



const jsonLongStrings = JSON.stringify(longStrings);
const jsonShortStrings = JSON.stringify(shortStrings);
const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function main() {
  conformanceUI(document.querySelector('#conform-json-bigint')!, parseConform_jsonBigint, 'json-bigint');
  performanceUI(
    document.querySelector('#compare-json-bigint')!,
    [
      () => parse_native(jsonMixed),
      () => parsePerform_jsonBigint(jsonMixed),
    ],
    'json-bigint vs JSON.parse, mixed JSON',
    ['Native JSON.parse', 'json-bigint']
  );

  conformanceUI(document.querySelector('#conform-lossless-json')!, parse_losslessJson, 'lossless-json');
  performanceUI(
    document.querySelector('#compare-lossless-json')!,
    [
      () => parse_native(jsonMixed),
      () => parse_losslessJson(jsonMixed),
    ],
    'lossless-json vs JSON.parse, mixed JSON',
    ['Native JSON.parse', 'lossless-json']
  );

  conformanceUI(document.querySelector('#conform-crockford')!, parse_crockford, 'Crockford');
  performanceUI(
    document.querySelector('#compare-crockford')!,
    [
      () => parse_native(jsonMixed),
      () => parse_crockford(jsonMixed),
    ],
    'Crockford vs JSON.parse, mixed JSON',
    ['Native JSON.parse', 'Crockford reference']
  );
    
  performanceUI(
    document.querySelector('#long-strings')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_crockford(jsonLongStrings),
    ],
    'Crockford vs JSON.parse, long strings',
    ['Native JSON.parse', 'Crockford reference']
  );

  // conformanceUI(document.querySelector('#indexOf-long-strings-conform')!, parse_stringsIndexOf, 'Strings with <code>indexOf</code>');
  performanceUI(
    document.querySelector('#indexOf-long-strings-perform')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_stringsIndexOf(jsonLongStrings),
    ],
    'Strings with <code>indexOf</code> vs JSON.parse, long strings',
    ['Native JSON.parse', 'Strings with <code>indexOf</code>']
  );




  performanceUI(
    document.querySelector('#short-strings')!,
    [
      () => parse_native(jsonShortStrings),
      () => parse_crockford(jsonShortStrings),
    ],
    'Crockford vs JSON.parse, short strings',
    ['Native JSON.parse', 'Crockford reference']
  );

  m.render(document.querySelector('#original-strings')!, collapsible(m('div', 'See the code'), m('pre', 
`while (next()) {
  if (ch === "\"") {
    next();
    return value;
  }
  if (ch === "\\") {
    next();
    if (ch === "u") {
      uffff = 0;
      for (i = 0; i < 4; i += 1) {
        hex = parseInt(next(), 16);
        if (!isFinite(hex)) {
          break;
        }
        uffff = uffff * 16 + hex;
      }
      value += String.fromCharCode(uffff);
    } else if (typeof escapee[ch] === "string") {
      value += escapee[ch];
    } else {
      break;
    }
  } else {
    value += ch;
  }
}`)));

  conformanceUI(document.querySelector('#conform-json-custom-numbers')!, parse_jsonCustomNumbers, 'json-custom-numbers');
  performanceUI(
    document.querySelector('#compare-json-custom-numbers')!,
    [
      () => parse_native(jsonMixed),
      () => parse_jsonCustomNumbers(jsonMixed),
    ],
    'json-custom-numbers vs JSON.parse, mixed JSON',
    ['Native JSON.parse', 'json-custom-numbers']
  );




  performanceUI(
    document.querySelector('#long-strings-quicker')!,
    [
      () => parse_crockford(jsonLongStrings),
      () => parse_stringsRegexpTest(jsonLongStrings),
    ],
    'Parse long JSON strings',
    ['Crockford', 'Strings with /.../y.test()']
  );

  conformanceUI(document.querySelector('#conform2')!, parse_jsonCustomNumbers, 'json-custom-numbers');

  performanceUI(
    document.querySelector('#compare2')!,
    [
      () => parse_native(jsonMixed),
      () => parse_jsonCustomNumbers(jsonMixed),
    ],
    'Parse mixed JSON',
    ['Native JSON.parse', 'json-custom-numbers']
  );
}

window.addEventListener('load', main);
