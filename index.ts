import { conformanceUI } from './ui/conformance';
import { performanceUI } from './ui/performance';

import { parse as parse_native } from './implementations/01-native';
import { parse as parse_jsonCustomNumbers } from './implementations/02-json-custom-numbers';
import { parse as parse_jsonBigint } from './implementations/04-json-bigint';
import { parse as parse_losslessJson } from './implementations/05-lossless-json';

import boolNull from './json-docs/bool-null-array.json';
import longNumbers from './json-docs/long-numbers-array.json';
import longStrings from './json-docs/long-strings-array.json';
import shortNumbers from './json-docs/short-numbers-array.json';
import shortStrings from './json-docs/short-strings-object.json';
import stringEscapes from './json-docs/string-escapes.json';

const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function main() {

  conformanceUI(document.querySelector('#conform-json-bigint')!, parse_jsonBigint, 'json-bigint');
  performanceUI(
    document.querySelector('#compare-json-bigint')!,
    [
      () => parse_native(jsonMixed),
      () => parse_jsonBigint(jsonMixed),
    ],
    'json-bigint vs <code>JSON.parse</code>, mixed JSON',
    ['Native <code>JSON.parse</code>', 'json-bigint']
  );

  conformanceUI(document.querySelector('#conform-lossless-json')!, parse_losslessJson, 'lossless-json');
  performanceUI(
    document.querySelector('#compare-lossless-json')!,
    [
      () => parse_native(jsonMixed),
      () => parse_losslessJson(jsonMixed),
    ],
    'lossless-json vs <code>JSON.parse</code>, mixed JSON',
    ['Native <code>JSON.parse</code>', 'lossless-json']
  );

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
}

window.addEventListener('load', main);
