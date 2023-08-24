import m from 'mithril';

import { histogram } from '../histogram';
import { compare } from '../compare';

function speedCompare([a, b]: [number, number]) {
  return b > a ?
    (b / a).toFixed(2) + '\u00d7 faster' :
    (a / b).toFixed(2) + '\u00d7 slower';
}

export function performanceUI(el: HTMLElement, fns: (() => any)[], title: string, names: string[], colors = ['#FF6666', '#33BBFF']) {
  let reps: number | undefined;
  let trials: number | undefined;
  let trial: number | undefined;
  let SVGDataURI: string | undefined;
  let nameA: string;
  let nameB: string;
  let started = false;

  function reset() {
    reps = trials = trial = SVGDataURI = undefined;
    nameA = `<span style="color: ${colors[0]}; font-weight: bold;">A.</span> ${names[0]}`;
    nameB = `<span style="color: ${colors[1]}; font-weight: bold;">B.</span> ${names[1]}`;
  }
  reset();

  m.mount(el, {
    view: () => m('.compare',
      m('.compare-title', 'Performance'),
      m('.title', m.trust(title)),
      m('.nameA', m.trust(nameA)),
      m('.nameB', m.trust(nameB)),
      SVGDataURI ?
        m('.hist', m('img', { src: SVGDataURI })) :
        [
          m('.progress-outer', m('.progress-inner', {
            style: { width: 100 * (trial && trials ? trial / trials : 0) + '%' }
          })),
          m('.trials', `${trial ?? '—'}/${trials ?? '—'} trials`),
          m('.reps', `${reps ?? (started ? 'Calculating' : '—')} reps/trial`),
        ],
      m('button', {
        disabled: trial && trials && trial < trials,
        onclick: () => {
          reset();
          started = true;
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
            const xml = histogram(tReps, 50, [400, 100], colors);
            SVGDataURI = 'data:image/svg+xml,' + encodeURIComponent(xml);
            nameB += ': ' + (
              p! >= 0.01 ? 'no significant difference' :
                `<b>${speedCompare(medians as [number, number])}</b>`
            ) + ` (<a href="https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test"><i>U</i></a> = ${u}, p ${p! < 0.001 ? '< 0.001' : '= ' + p!.toPrecision(2)})`;
            m.redraw();
          });
        }
      }, trial && trials && trial < trials ? 'Comparing …' : 'Compare' + (reps ? ' again' : ''))
    )
  });
}