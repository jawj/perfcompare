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
  let matchedOutcomes = [];
  let validJSONUnexpectedErrors = [];
  let validJSONDifferentResults = [];
  let invalidJSONUnexpectedSuccesses = [];
  let indeterminateJSONDifferentOutcomes = [];

  for (const key in testsJson) {
    const json = testsJson[key as TestKey];
    const result = testParse(parse, json);
    const details = { key, json, ...result };

    if (result === undefined) {
      matchedOutcomes.push(details);
      continue;
    }

    const prefix = key.match(/^[^_]+/)![0];  // y, n, i, number, object, string

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
    }
  }

  return {
    matchedOutcomes,
    validJSONUnexpectedErrors,
    validJSONDifferentResults,
    invalidJSONUnexpectedSuccesses,
    indeterminateJSONDifferentOutcomes,
  };
}

function collapsible(toggle: m.Vnode, content: m.Vnode) {
  return m('.collapsible',
    m('label',
      m('input', { type: 'checkbox' }),
      m('.toggle', toggle),
      m('.content', content)),
  );
}

function conformanceUI(el: HTMLElement, parse: (json: string) => any, title: string) {
  let results = testParseAll(parse);
  let counts = Object.fromEntries(Object.entries(results).map(([k, v]) => [k, v.length])) as Record<keyof typeof results, number>;

  m.render(el, m('.conform',
    m('.matched', `${results.matchedOutcomes.length} outcomes match JSON.parse`),

    counts.invalidJSONUnexpectedSuccesses > 0 &&
    m('.invalid-accepted', collapsible(
      m('div', `${counts.invalidJSONUnexpectedSuccesses} invalid documents accepted`),
      m('ul', results.invalidJSONUnexpectedSuccesses.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Input: ', m('span.code', ue.json)),
            m('li', 'Expected error: ', m('span.code', (ue as any).error))
          )
        )
      )),
    )),

    counts.indeterminateJSONDifferentOutcomes > 0 &&
    counts.validJSONDifferentResults > 0 &&
    m('.ambiguous-different', collapsible(
      m('div', `${counts.indeterminateJSONDifferentOutcomes} ambiguous documents parsed differently`),
      m('ul', results.validJSONDifferentResults.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Expected: ', m('span.code', (ue as any).expected)),
            m('li', 'Actual: ', m('span.code', (ue as any).actual))
          )
        )
      )),
    )),

    counts.validJSONUnexpectedErrors > 0 && m('.valid-throws-error', collapsible(
      m('div', `${counts.validJSONUnexpectedErrors} errors thrown on valid (or ambiguous) documents`),
      m('ul', results.validJSONUnexpectedErrors.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Input: ', m('span.code', ue.json)),
            m('li', 'Error: ', m('span.code', (ue as any).error))
          )
        )
      ))
    )),

    counts.validJSONDifferentResults > 0 &&
    m('.valid-parsed-wrong', collapsible(
      m('div', `${counts.validJSONDifferentResults} valid documents parsed wrongly`),
      m('ul', results.validJSONDifferentResults.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Expected: ', m('span.code', (ue as any).expected)),
            m('li', 'Actual: ', m('span.code', (ue as any).actual))
          )
        )
      )),
    )),
  ));
}


const jsonLongStrings = JSON.stringify(longStrings);
const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function speedCompare([a, b]: [number, number]) {
  return b > a ?
    (b / a).toFixed(1) + 'x faster' :
    (a / b).toFixed(1) + 'x slower';
}

function performanceUI(el: HTMLElement, fns: (() => any)[], title: string, names: string[]) {
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

function main() {
  conformanceUI(document.querySelector('#conform1')!, parse_crockford, 'Crockford reference');

  performanceUI(
    document.querySelector('#compare1')!,
    [
      () => parse_native(jsonMixed),
      () => parse_crockford(jsonMixed),
    ],
    'Parse mixed JSON',
    ['Native JSON.parse', 'Crockford reference']
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
