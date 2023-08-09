import { conformanceUI } from './ui/conformance';
import { performanceUI } from './ui/performance';

import { parse as parse_native } from './implementations/01-native';
import { parse as parse_jsonCustomNumbers } from 'json-custom-numbers';
import { 
  parseConform as parseConform_jsonBigint,
  parsePerform as parsePerform_jsonBigint,
} from './implementations/04-json-bigint';
import { parse as parse_losslessJson } from './implementations/05-lossless-json';
import { parse as parse_crockford } from './implementations/03-crockford';
import { parse as parse_stickyRegExps } from './implementations/10-sticky-regexps';
import { parse as parse_charCodes } from './implementations/20-character-codes';
import { parse as parse_inlining } from './implementations/40-inlining';
import { parse as parse_escapes } from './implementations/50-escapes';


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

// @ts-ignore
window.parse_jsonCustomNumbers = parse_jsonCustomNumbers;

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


  conformanceUI(document.querySelector('#sticky-regexps-conform')!, parse_stickyRegExps, 'Sticky RegExps');
  performanceUI(
    document.querySelector('#sticky-regexps-perform')!,
    [
      () => parse_crockford(jsonMixed),
      () => parse_stickyRegExps(jsonMixed),
    ],
    'Sticky RegExps, mixed JSON',
    ['Previous best (Crockford)', 'Sticky RegExps'],
  );

  conformanceUI(document.querySelector('#char-codes-conform')!, parse_charCodes, 'Character codes');
  performanceUI(
    document.querySelector('#char-codes-perform')!,
    [
      () => parse_stickyRegExps(jsonMixed),
      () => parse_charCodes(jsonMixed),
    ],
    'Character codes, mixed JSON',
    ['Previous best (sticky RegExps)', 'Character codes'],
  );

  conformanceUI(document.querySelector('#inlining-conform')!, parse_inlining, 'Function inlining');
  performanceUI(
    document.querySelector('#inlining-perform')!,
    [
      () => parse_charCodes(jsonMixed),
      () => parse_inlining(jsonMixed),
    ],
    'Function inlining, mixed JSON',
    ['Previous best (character codes)', 'Function inlining'],
  );

  //conformanceUI(document.querySelector('#escapes-conform')!, parse_escapes, 'String escapes: loop unrolling, etc');
  performanceUI(
    document.querySelector('#escapes-perform')!,
    [
      () => parse_inlining(jsonStringEscapes),
      () => parse_escapes(jsonStringEscapes),
    ],
    'Loop unrolling etc., string escapes JSON',
    ['Previous best (function inlining)', 'String escapes: loop unrolling, etc'],
  );




  // conformanceUI(document.querySelector('#typedarray-conform')!, parse_typedArray, 'Typed array');
  // performanceUI(
  //   document.querySelector('#typedarray-perform')!,
  //   [
  //     () => parse_native(jsonMixed),
  //     () => parse_typedArray(jsonMixed),
  //   ],
  //   'Typed array',
  //   ['Native <code>JSON.parse</code>', 'Typed array'],
  // );

  // conformanceUI(document.querySelector('#dupe-keys-conform')!, parse_dupeKeys, 'Ignore duplicate keys');
  // performanceUI(
  //   document.querySelector('#dupe-keys-perform')!,
  //   [
  //     () => parse_charCodes(jsonMixed),
  //     () => parse_dupeKeys(jsonMixed),
  //   ],
  //   'Ignore duplicate keys, mixed JSON',
  //   ['Previous best (character codes)', 'Ignore duplicate keys'],
  // );

  /*
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
      () => parse_stickyRegExps(jsonLongStrings),
    ],
    ' <code>/.../y.test()</code> vs <code>JSON.parse</code>, long strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>/.../y.test()</code>']
  );

  performanceUI(
    document.querySelector('#regExpTest-short-strings-perform')!,
    [
      () => parse_native(jsonShortStrings),
      () => parse_stickyRegExps(jsonShortStrings),
    ],
    '<code>/.../y.test()</code> vs <code>JSON.parse</code>, short strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>/.../y.test()</code>']
  );

  performanceUI(
    document.querySelector('#original-escaped-strings-perform')!,
    [
      () => parse_native(jsonStringEscapes),
      () => parse_stickyRegExps(jsonStringEscapes),
    ],
    '<code>/.../y.test()</code> vs <code>JSON.parse</code>, escaped strings',
    ['Native <code>JSON.parse</code>', 'Strings with <code>/.../y.test()</code>']
  );


  

  */
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

  /*
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
  
  */
  // conformanceUI(document.querySelector('#conform2')!, parse_jsonCustomNumbers, 'json-custom-numbers');
  // performanceUI(
  //   document.querySelector('#compare2')!,
  //   [
  //     () => parse_localJCN(jsonMixed),
  //     () => parse_localJCNMod(jsonMixed),
  //   ],
  //   'Parse mixed JSON',
  //   ['JCN original', 'JCN mod']
  // );
}

window.addEventListener('load', main);
