import { conformanceUI } from './ui/conformance';
import { performanceUI } from './ui/performance';

import { parse as parse_native } from './implementations/01-native';
import { parse as parse_jsonCustomNumbers } from './implementations/02-json-custom-numbers';
import { parse as parse_jsonBigint } from './implementations/04-json-bigint';
import { parse as parse_losslessJson } from './implementations/05-lossless-json';
import { parse as parse_crockford } from './implementations/03-crockford';
import { parse as parse_longStringsQuicker } from './implementations/10-strings';

import boolNull from './json-docs/bool-null-array.json';
import longNumbers from './json-docs/long-numbers-array.json';
import longStrings from './json-docs/long-strings-array.json';
import shortNumbers from './json-docs/short-numbers-array.json';
import shortStrings from './json-docs/short-strings-object.json';
import stringEscapes from './json-docs/string-escapes.json';


const jsonLongStrings = JSON.stringify(longStrings);
const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function main() {
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

  conformanceUI(document.querySelector('#conform-json-bigint')!, parse_jsonBigint, 'json-bigint');
  performanceUI(
    document.querySelector('#compare-json-bigint')!,
    [
      () => parse_native(jsonMixed),
      () => parse_jsonBigint(jsonMixed),
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
    document.querySelector('#long-strings')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_crockford(jsonLongStrings),
    ],
    'Parse long JSON strings',
    ['Native JSON.parse', 'Crockford reference']
  );

  performanceUI(
    document.querySelector('#long-strings-quicker')!,
    [
      () => parse_crockford(jsonLongStrings),
      () => parse_longStringsQuicker(jsonLongStrings),
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
