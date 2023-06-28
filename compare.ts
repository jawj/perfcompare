import { median } from './median';
import { mannWhitneyU } from './mann-whitney-u';
import { log } from './log';

let t0, t1;
t0 = t1 = performance.now();
while (t0 === t1) { t1 = performance.now() };
const msRes = t1 - t0;
const usRes = Math.round(msRes * 1e3);
log(`Resolution: ${usRes}\u03bcs`);

const trialDuration = Math.max(msRes * 100, 10);
log(`Target trial duration: ${trialDuration}ms`);

const trials = 50;

function opsPerDurationMs(fn: () => any, durationMs: number, toNearest = 10, maxOps = 2e9) {
  const t0 = performance.now();
  for (let i = 1; i < maxOps; i++) {  // it's important for various reasons that i starts at 1, not 0
    fn();
    if (i % toNearest === 0 && performance.now() - t0 >= durationMs) return i;
  }
  return maxOps;
}

async function catchBreath() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

export async function compare(fns: (() => any)[], cb: (reps: number, trials: number, trial: number) => void = () => void 0) {
  const fnsLength = fns.length;

  let reps = 0;
  for (let i = 0; i < fnsLength; i++) {
    const fn = fns[i];
    const fnReps = opsPerDurationMs(fn, trialDuration);
    log(fn.toString(), `-> ${fnReps} reps/trial`);
    if (fnReps > reps) reps = fnReps;
    await catchBreath();
  }

  log(`Using ${reps} reps/trial`);

  const tReps: number[][] = new Array(fnsLength);
  for (let i = 0; i < fnsLength; i++) tReps[i] = [];  // can't Array.fill, as every [] would be same reference
  const tRepsSum: number[] = new Array(fnsLength).fill(0);
  const tRepsMean: number[] = new Array(fnsLength).fill(0);

  cb(reps, trials, 0);
  await catchBreath();
  
  for (let trial = 0; trial < trials; trial++) {
    for (let _i = 0; _i < fnsLength; _i++) {
      const i = (trial + _i) % fnsLength;  // rotate starting function (random assignment doesn't work so well)
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

    cb(reps, trials, trial + 1);
    await catchBreath();
  }

  const tRepsMedians = tReps.map(tRep => median(tRep));
  const tRepsUStats = (fnsLength === 2 ? mannWhitneyU(tReps as [number[], number[]]) : {}) as Partial<ReturnType<typeof mannWhitneyU>>;

  return { medians: tRepsMedians, ...tRepsUStats, tReps };
}
