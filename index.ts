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
import { parse as parse_jcnLocal } from './implementations/100-json-custom-numbers';

import boolNull from './json-docs/bool-null-array.json';
import longNumbers from './json-docs/long-numbers-array.json';
import longStrings from './json-docs/long-strings-array.json';
import shortNumbers from './json-docs/short-numbers-array.json';
import shortStrings from './json-docs/short-strings-object.json';
import stringEscapes from './json-docs/string-escapes.json';



const jsonLongStrings = JSON.stringify(longStrings);
const jsonShortStrings = JSON.stringify(shortStrings);
const jsonStringEscapes = JSON.stringify(stringEscapes);
const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function main() {
  conformanceUI(document.querySelector('#conform-json-bigint')!, parseConform_jsonBigint, 'json-bigint');
  performanceUI(
    document.querySelector('#compare-json-bigint')!,
    [
      () => parse_native(jsonMixed),
      () => parsePerform_jsonBigint(jsonMixed),
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

  conformanceUI(document.querySelector('#conform-crockford')!, parse_crockford, 'Crockford');
  performanceUI(
    document.querySelector('#compare-crockford')!,
    [
      () => parse_native(jsonMixed),
      () => parse_crockford(jsonMixed),
    ],
    'Crockford vs <code>JSON.parse</code>, mixed JSON',
    ['Native <code>JSON.parse</code>', 'Crockford reference']
  );
    
  performanceUI(
    document.querySelector('#long-strings')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_crockford(jsonLongStrings),
    ],
    'Crockford vs <code>JSON.parse</code>, long strings',
    ['Native <code>JSON.parse</code>', 'Crockford reference']
  );

  // conformanceUI(document.querySelector('#indexOf-long-strings-conform')!, parse_stringsIndexOf, 'Strings with <code>indexOf</code>');
  performanceUI(
    document.querySelector('#indexOf-long-strings-perform')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_stringsIndexOf(jsonLongStrings),
    ],
    '<code>indexOf</code> vs <code>JSON.parse</code>, long strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>indexOf</code>']
  );

  performanceUI(
    document.querySelector('#regExpTest-long-strings-perform')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_stringsRegexpTest(jsonLongStrings),
    ],
    ' <code>/.../y.test()</code> vs <code>JSON.parse</code>, long strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>/.../y.test()</code>']
  );

  performanceUI(
    document.querySelector('#regExpTest-short-strings-perform')!,
    [
      () => parse_native(jsonShortStrings),
      () => parse_stringsRegexpTest(jsonShortStrings),
    ],
    '<code>/.../y.test()</code> vs <code>JSON.parse</code>, short strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>/.../y.test()</code>']
  );

  performanceUI(
    document.querySelector('#original-escaped-strings-perform')!,
    [
      () => parse_native(jsonStringEscapes),
      () => parse_stringsRegexpTest(jsonStringEscapes),
    ],
    '<code>/.../y.test()</code> vs <code>JSON.parse</code>, escaped strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>/.../y.test()</code>']
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

  conformanceUI(document.querySelector('#conform-json-custom-numbers-local')!, parse_jcnLocal, 'json-custom-numbers local');
  performanceUI(
    document.querySelector('#compare-json-custom-numbers-local')!,
    [
      () => parse_jsonCustomNumbers(jsonMixed),
      () => parse_jcnLocal(jsonMixed),
    ],
    'json-custom-numbers vs local version, mixed JSON',
    ['json-custom-numbers', 'local version'],
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
