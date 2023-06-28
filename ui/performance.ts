import m from 'mithril';

import { histogram } from '../histogram';
import { compare } from '../compare';

function speedCompare([a, b]: [number, number]) {
  return b > a ?
    (b / a).toFixed(1) + 'x faster' :
    (a / b).toFixed(1) + 'x slower';
}

export function performanceUI(el: HTMLElement, fns: (() => any)[], title: string, names: string[]) {
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