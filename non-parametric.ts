
export function median(data: number[], destructive = false) {
  if (!destructive) data = data.slice();
  const { length } = data;
  data.sort((a, b) => a - b);
  return length % 2 === 1 ?
    data[(length - 1) * .5] :
    .5 * data[length * .5 - 1] + .5 * data[length * .5];
}

function normalCDF(z: number) {  // https://www.math.ucla.edu/~tom/distributions/normal.html
  const t = 1 / (1 + .2316419 * Math.abs(z));
  const d = .3989423 * Math.exp(-z * z / 2);
  let p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  return p;
}

export function mannWhitneyU(data: [number[], number[]]) {
  // handy for comparison: R or https://www.statskingdom.com/170median_mann_whitney.html
  const data0 = data[0].map(value => ({ value, source: 0, rank: 0 }));
  const data1 = data[1].map(value => ({ value, source: 1, rank: 0 }));
  const dataAll = [...data0, ...data1];
  dataAll.sort((a, b) => a.value - b.value);
  const n = dataAll.length;

  // iterate forwards, counting identical previous values (and stuffing them in the rank field)
  for (let i = 1; i < n; i++) {
    const current = dataAll[i];
    const prev = dataAll[i - 1];
    current.rank = prev.value === current.value ? prev.rank + 1 : 0;
  }
  
  // iterate backwards, filling in the rank field correctly (including ties)
  let tieSum = 0;
  let i = n - 1;
  while (i >= 0) {
    const rank = i + 1;
    const current = dataAll[i];
    const prevSame = current.rank;
    if (prevSame === 0) {
      current.rank = rank;
      i--;
    } else {
      tieSum += prevSame * prevSame * prevSame - prevSame;
      const tiedRank = rank - prevSame * .5;
      const lowestTied = i - prevSame;
      while (i >= lowestTied) dataAll[i--].rank = tiedRank;
    }
  }

  // sum ranks by data source
  const [r0, r1] = dataAll.reduce(([r0, r1], { source, rank }) =>
    source === 0 ? [r0 + rank, r1] : [r0, r1 + rank], [0, 0]);

  // calculate U
  const n0 = data0.length;
  const n1 = data1.length;
  const u0 = r0 - n0 * (n0 + 1) * .5;
  const u1 = r1 - n1 * (n1 + 1) * .5;
  const u = Math.min(u0, u1);

  // calculate z and some two-tailed test thresholds
  // http://users.sussex.ac.uk/~grahamh/RM1web/Wilcoxon%20Large%20N%202009.pdf
  const mu = .5 * n0 * n1;
  const stdDev = Math.sqrt(((n0 * n1) * (n * n * n - n - tieSum)) / (12 * n * (n - 1)));
  const z = (mu - u - .5) / stdDev;
  const p = 2 /* two-tailed test */ * normalCDF(-z);

  return { u, z, p, dataAll };
}
