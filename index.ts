import m from 'mithril';

import { histogram } from './histogram';
import { compare } from './compare';

import { parse as parse_native } from './implementations/01-native';
import { parse as parse_jsonCustomNumbers } from './implementations/02-json-custom-numbers';
import { parse as parse_crockford } from './implementations/03-crockford';
import { parse as parse_longStringsQuicker } from './implementations/10-strings';

import boolNull from './json-docs/bool-null-array.json';
import longNumbers from './json-docs/long-numbers-array.json';
import longStrings from './json-docs/long-strings-array.json';
import shortNumbers from './json-docs/short-numbers-array.json';
import shortStrings from './json-docs/short-strings-object.json';
import stringEscapes from './json-docs/string-escapes.json';

import { base64Decode } from './base64';
import testsJson from './testsJson.json';

type TestKey = keyof typeof testsJson;
const textDec = new TextDecoder();
for (const key in testsJson) testsJson[key as TestKey] = textDec.decode(base64Decode(testsJson[key as TestKey]));

function testParse(parse: (json: string) => any, json: string) {
  let trueErr = undefined;
  let trueResult = undefined;
  try { trueResult = JSON.parse(json); }
  catch (err) { trueErr = err; }

  let testErr = undefined;
  let testResult = undefined;
  try { testResult = parse(json); }
  catch (err) { testErr = err; }

  if (!!testErr !== !!trueErr) {
    const description = `JSON.parse ${trueErr ? 'error' : 'OK'}, custom function ${testErr ? 'error' : 'OK'}`;
    return { description, error: trueErr ? (trueErr as Error).message : (testErr as Error).message };
  }

  const trueResultJson = JSON.stringify(trueResult)
  const testResultJson = JSON.stringify(testResult);
  if (trueResultJson !== testResultJson) {
    const description = 'Parse result mismatch';
    return { description, expected: trueResultJson, actual: testResultJson };
  }
}

function testParseAll(parse: (json: string) => any) {
  let matchedOutcomeCount = 0;
  let validJSONUnexpectedErrors = [];
  let validJSONDifferentResults = [];
  let invalidJSONUnexpectedSuccesses = [];
  let indeterminateJSONDifferentOutcomes = [];

  for (const key in testsJson) {
    const json = testsJson[key as TestKey];
    const result = testParse(parse, json);

    if (result === undefined) {
      matchedOutcomeCount++;
      continue;
    }

    const prefix = key.match(/^[^_]+/)![0];  // y, n, i, number, object, string
    const details = {key, json, ...result};
    switch (prefix) {
      case 'y':
        if (result.error) validJSONUnexpectedErrors.push(details);
        else validJSONDifferentResults.push(details);
        break;

      case 'n':
        invalidJSONUnexpectedSuccesses.push(details);
        break;

      default:
        indeterminateJSONDifferentOutcomes.push(details);
        break;
    }
  }

  return {
    matchedOutcomeCount,
    validJSONUnexpectedErrors,
    validJSONDifferentResults,
    invalidJSONUnexpectedSuccesses,
    indeterminateJSONDifferentOutcomes,
  };
}

console.log(testParseAll(parse_crockford));

const jsonLongStrings = JSON.stringify(longStrings);
const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function speedCompare([a, b]: [number, number]) {
  return b > a ?
    (b / a).toFixed(1) + 'x faster' :
    (a / b).toFixed(1) + 'x slower';
}

async function compareUI(el: HTMLElement, fns: (() => any)[], title: string, names: string[]) {
  let reps: number | undefined;
  let trials: number | undefined;
  let trial: number | undefined;
  let dataURI: string | undefined;
  let nameA: string;
  let nameB: string;

  function reset() {
    reps = trials = trial = dataURI = undefined;
    nameA = `A. ${names[0]}`;
    nameB = `B. ${names[1]}`;
  }
  reset();

  m.mount(el, {
    view: () => m('.compare',
      m('.title', title),
      m('.nameA', nameA),
      m('.nameB', nameB),
      dataURI ?
        m('.hist', m('img', { src: dataURI })) :
        [
          m('.progress-outer', m('.progress-inner', {
            style: { width: 100 * (trial && trials ? trial / trials : 0) + '%' }
          })),
          m('.trials', `${trial ?? '—'}/${trials ?? '—'} trials`),
          m('.reps', `${reps ?? '—'} reps/trial`),
        ],
      m('button', {
        disabled: trial && trials && trial < trials,
        onclick: () => {
          reset();
          m.redraw();

          compare(
            fns,
            (newReps, newTrials, newTrial) => {
              reps = newReps;
              trials = newTrials;
              trial = newTrial;
              m.redraw();
            }
          ).then(({ medians, u, z, p, tReps }) => {
            const xml = histogram(tReps);
            dataURI = 'data:image/svg+xml,' + encodeURIComponent(xml);
            nameB += ': ' + (
              p! >= 0.01 ? 'no significant difference' :
                speedCompare(medians as [number, number])
            ) + ` (U = ${u}, p = ${p!.toPrecision(2)})`;
            m.redraw();
          });
        }
      }, trial && trials && trial < trials ? 'Comparing …' : 'Compare' + (reps ? ' again' : ''))
    )
  });
}

async function main() {
  compareUI(
    document.querySelector('#compare1')!,
    [
      () => parse_native(jsonMixed),
      () => parse_crockford(jsonMixed),
    ],
    'Parse mixed JSON',
    ['Native JSON.parse', 'Crockford reference']
  );

  compareUI(
    document.querySelector('#long-strings')!,
    [
      () => parse_native(jsonLongStrings),
      () => parse_crockford(jsonLongStrings),
    ],
    'Parse long JSON strings',
    ['Native JSON.parse', 'Crockford reference']
  );

  compareUI(
    document.querySelector('#long-strings-quicker')!,
    [
      () => parse_crockford(jsonLongStrings),
      () => parse_longStringsQuicker(jsonLongStrings),
    ],
    'Parse long JSON strings',
    ['Crockford', 'Strings with /.../y.test()']
  );

  compareUI(
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
