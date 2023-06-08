
export function variance(data: number[], mean = data.reduce((memo, n) => memo + n, 0) / data.length) {
  return data.reduce((memo, n) => {
    const dev = n - mean;
    const sqDev = dev * dev;
    return memo + sqDev;
  }, 0) / (data.length - 1);  // n - 1 is the appropriate denominator when working with a sample
}

export function median(data: number[], destructive = false) {
  if (!destructive) data = data.slice();
  const { length } = data;
  data.sort((a, b) => a - b);
  return length % 2 === 1 ?
    data[(length - 1) * .5] :
    .5 * data[length * .5 - 1] + .5 * data[length * .5];
}

export function mannWhitneyU(data: [number[], number[]]) {
  // handy for comparison: R or https://www.statskingdom.com/170median_mann_whitney.html
  const data0 = data[0].map(value => ({ value, source: 0, rank: 0 }));
  const data1 = data[1].map(value => ({ value, source: 1, rank: 0 }));
  const dataAll = data0.concat(data1) as typeof data0;
  dataAll.sort((a, b) => a.value - b.value);
  const n = dataAll.length;
  // iterate forwards, counting identical previous values (and stuffing them in the rank field)
  for (let i = 1; i < n; i++) {
    const current = dataAll[i];
    const prev = dataAll[i - 1];
    current.rank = prev.value === current.value ? prev.rank + 1 : 0;
  }
  // iterate backwards, filling in the rank field correctly, including ties
  let tieSum = 0;
  for (let i = n - 1; i >= 0; i--) {
    const rank = i + 1;
    const current = dataAll[i];
    const prevSame = current.rank;
    if (prevSame === 0) {
      current.rank = rank;
      continue;
    }
    tieSum += prevSame * prevSame * prevSame - prevSame;
    const tiedRank = rank - prevSame * .5;
    const lowestTied = i - prevSame - 1;
    while (i > lowestTied) dataAll[i--].rank = tiedRank;
    i++;  // because it's about to be decremented again
  }

  // sum ranks by data source
  const rs = dataAll.reduce(([r0, r1], { source, rank }) =>
    source === 0 ? [r0 + rank, r1] : [r0, r1 + rank], [0, 0]);

  // calculate U
  const n0 = data0.length;
  const n1 = data1.length;
  const u0 = rs[0] - n0 * (n0 + 1) * .5;
  const u1 = rs[1] - n1 * (n1 + 1) * .5;
  const u = Math.min(u0, u1);

  // http://users.sussex.ac.uk/~grahamh/RM1web/Wilcoxon%20Large%20N%202009.pdf
  const mu = .5 * n0 * n1;
  const stdDev = Math.sqrt(((n0 * n1) * (n * n * n - n - tieSum)) / (12 * n * (n - 1)));
  const z = (mu - u - .5) / stdDev;
  const p95 = z > 1.96;
  const p99 = z > 2.58;

  // now (for a two-tailed test), if z > 1.96, p < 0.5 and if z > 2.58, p < 0.01
  return { u, z, p95, p99, u0, u1, dataAll };
}

export function tTestT(means: number[], variances: number[], ns: number[]) {
  // https://psyteachr.github.io/handyworkbook/between-subjects-welchs-t-test.html
  return (means[0] - means[1]) / Math.sqrt((variances[0] / ns[0]) + (variances[1] / ns[1]));
}

export function tTestDf(variances: number[], ns: number[]) {
  const a0 = variances[0] / ns[0];
  const a1 = variances[1] / ns[1];
  const b = a0 + a1;
  const c0 = a0 * a0;
  const c1 = a1 * a1;
  return (b * b) / ((c0 / (ns[0] - 1)) + (c1 / (ns[1] - 1)));
}

export function logGamma(z: number) {
  return (z - 0.5) * Math.log(z + 4.5) - (z + 4.5) + Math.log((1 + 76.18009173 / z - 86.50532033 / (z + 1) + 24.01409822 / (z + 2) - 1.231739516 / (z + 3) + 0.00120858003 / (z + 4) - 0.00000536382 / (z + 5)) * 2.50662827465);
}

export function betInc(x: number, a: number, b: number) {
  let a0, a1, a2, b0, b1, c9, m9;
  a0 = (m9 = (a2 = 0));
  b0 = (a1 = (b1 = 1));
  while (Math.abs((a1 - a2) / a1) > 0.00001) {
    a2 = a1;
    c9 = -(a + m9) * (a + b + m9) * x / (a + 2 * m9) / (a + 2 * m9 + 1);
    a0 = a1 + c9 * a0;
    b0 = b1 + c9 * b0;
    m9 = m9 + 1;
    c9 = m9 * (b - m9) * x / (a + 2 * m9 - 1) / (a + 2 * m9);
    a1 = a0 + c9 * a1;
    b1 = b0 + c9 * b1;
    a0 = a0 / b1;
    b0 = b0 / b1;
    a1 = a1 / b1;
    b1 = 1;
  }
  return a1 / a;
}

export function pForT(xv: number, df: number, tails: number) {
  // adapted from http://www.math.ucla.edu/~tom/distributions/tDist.html
  let a, s, z, bt, betacdf;
  a = df / 2;
  s = a + 0.5;
  z = df / (df + xv * xv);
  bt = Math.exp(logGamma(s) - logGamma(0.5) - logGamma(a) + a * Math.log(z) + 0.5 * Math.log(1 - z));
  betacdf = z < (a + 1) / (s + 2) ? bt * betInc(z, a, 0.5) : 1 - bt * betInc(1 - z, 0.5, a);
  return tails * betacdf / 2;
};