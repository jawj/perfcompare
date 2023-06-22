import m from 'mithril';

import { histogram } from './histogram';
import { compare } from './compare';

import { parse as parse_native } from './implementations/01-native';
import { parse as parse_jsonCustomNumbers } from './implementations/02-json-custom-numbers';
import { parse as parse_crockford } from './implementations/03-crockford';

import boolNull from './json-docs/bool-null-array.json';
import longNumbers from './json-docs/long-numbers-array.json';
import longStrings from './json-docs/long-strings-array.json';
import shortNumbers from './json-docs/short-numbers-array.json';
import shortStrings from './json-docs/short-strings-object.json';
import stringEscapes from './json-docs/string-escapes.json';

const jsonMixed = JSON.stringify({ boolNull, longNumbers, longStrings, shortNumbers, shortStrings, stringEscapes });

function speedCompare([a, b]: [number, number]) {
  return b > a ?
    (b / a).toFixed(1) + 'x faster' :
    (a / b).toFixed(1) + 'x slower';
}

async function compareUI(el: HTMLElement, fns: (() => any)[], names: string[]) {
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
    ['Native JSON.parse', 'Crockford reference']
  );

  compareUI(
    document.querySelector('#compare2')!,
    [
      () => parse_native(jsonMixed),
      () => parse_jsonCustomNumbers(jsonMixed),
    ],
    ['Native JSON.parse', 'json-custom-numbers']
  );
}

window.addEventListener('load', main);
