
import { parse } from 'json-custom-numbers';
import { median, mannWhitneyU } from './non-parametric';
import { distrib } from './distrib';

function log(...args: any[]) {
  (document.querySelector('#log') as HTMLDivElement).innerText +=
    args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ') + '\n';
}

let t0, t1;
t0 = t1 = performance.now();
while (t0 === t1) { t1 = performance.now() };
const msRes = t1 - t0;
const usRes = Math.round(msRes * 1e3);
log(`Resolution: ${usRes}\u03bcs`);

const trialDuration = Math.max(msRes * 100, 25);
log(`Trial duration: ${trialDuration}ms`);

const trials = 100;

function opsPerDurationMs(fn: () => any, durationMs: number, toNearest = 10, maxOps = 2e9) {
  const t0 = performance.now();
  for (let i = 1; i < maxOps; i++) {  // it's important for various reasons that i starts at 1, not 0
    fn();
    if (i % toNearest === 0 && performance.now() - t0 >= durationMs) return i;
  }
  return maxOps;
}

async function fortyWinks() {
  return new Promise(resolve => setTimeout(resolve, 0));
}


async function compare(...fns: (() => any)[]) {
  const fnsLength = fns.length;

  let reps = 0;
  for (let i = 0; i < fnsLength; i++) {
    const fn = fns[i];
    const fnReps = opsPerDurationMs(fn, trialDuration);
    log(fn.toString(), `-> ${fnReps} reps/trial`);
    if (fnReps > reps) reps = fnReps;
    await fortyWinks();
  }

  log(`Using ${reps} reps/trial`);

  const tReps: [number[], number[]] = [[], []];
  const tRepsSum: number[] = [0, 0];
  const tRepsMean: number[] = [0, 0];

  for (let trial = 0; trial < trials; trial++) {
    for (let _i = 0; _i < fnsLength; _i++) {
      // alternate functions (note: strangely, random assignment doesn't appear to work)
      const i = trial % 2 ? _i : 1 - _i;

      const fn = fns[i];
      const t0 = performance.now();
      for (let rep = 0; rep < reps; rep++) fn();
      const t1 = performance.now();
      const t = t1 - t0;
      const tRep = 1 / (t / reps);
      tReps[i][trial] = tRep;
      tRepsSum[i] += tRep;
      tRepsMean[i] = tRepsSum[i] / (trial + 1);
    };
    // log(trial, tRepsMean);
    await fortyWinks();
  }

  const tRepsMedians = tReps.map(tRep => median(tRep));
  const tRepsUStats = mannWhitneyU(tReps);

  return { medians: tRepsMedians, ...tRepsUStats, tReps };
}

async function main() {
  const jsonDoc = `{"number":1,"string":"The quick brown fox\\njumps over the lazy dog \\u03bc","boolean":true,"null":null}`;
  const jsonDocSpaced = JSON.stringify(JSON.parse(jsonDoc), null, 2);

  const { medians, u, z, p, tReps } = await compare(() => parse(jsonDoc), () => parse(jsonDocSpaced));
  log(`median: ${medians.join(',')}  u: ${u}  z: ${z}  p: ${p}`);

  const img = document.querySelector('#svg') as HTMLImageElement;
  const xml = distrib(tReps);
  img.src = 'data:image/svg+xml,' + encodeURIComponent(xml);
  // console.log(xml);


  let sig1 = 0, sig5 = 0, sig10 = 0;
  for (let i = 0; i < 100; i++) {
    const { medians, u, z, p } = await compare(() => parse(jsonDoc), () => parse(jsonDoc));
    log(`median: ${medians.join(',')}  u: ${u}  z: ${z}  p: ${p}`);
    if (p < 0.01) sig1++;
    if (p < 0.05) sig5++;
    if (p < 0.1) sig10++;
    log(`${sig1} at 1%, ${sig5} at 5%, ${sig10} at 10% after ${i + 1} rounds`);
  }
}

window.addEventListener('load', main);
