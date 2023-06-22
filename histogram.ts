import { median } from './median';

function round(n: number) {
  return n < 10 ? n.toPrecision(2) : n < 100 ? n.toFixed(1) : n.toFixed(0);
}

export function histogram(data: number[][], binCount = 50, size = [400, 100], colors = ['#e30', '#03e'], margins = [30, 20, 20, 20], xtitle="ops/sec") {
  let min = Infinity, max = -Infinity;
  for (let dataSet of data) {
    min = Math.min(min, ...dataSet);
    max = Math.max(max, ...dataSet);
  }

  const medians = data.map(dataSet => median(dataSet));
  const lowestFirst = medians[0] <= medians[1] ? 1 : 0;

  const range = max - min;
  const binSize = range / binCount;
  const allBins = data.map(() => new Array(binCount).fill(0));
  for (let i = 0, len = data.length; i < len; i++) {
    const dataSet = data[i];
    const bins = allBins[i];
    for (const value of dataSet) bins[Math.min(Math.floor((value - min) / binSize), binCount - 1)]++;
  }

  let greatest = 0;
  for (const bins of allBins) greatest = Math.max(greatest, ...bins);

  const plotWidthPx = size[0] - margins[1] - margins[3];
  const binWidthPx = plotWidthPx / binCount;
  const plotHeightPx = size[1] - margins[0] - margins[2];
  const binUnitHeightPx = plotHeightPx / greatest;

  const baseline = size[1] - margins[2];
  const smallLabelStyle = 'font: bold 9px sans-serif';
  const labelStyle = 'font: 12px sans-serif; margin: 0 4px;';

  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size[0]} ${size[1]}"  width="${size[0]}" height="${size[1]}">

  <!-- x axis -->
  <line x1="0" y1="${baseline}" x2="${size[0]}" y2="${baseline}" stroke="#000"/>
  <text dominant-baseline="hanging" text-anchor="middle" x="${size[0] * .5}" y="${baseline + 6}" style="${labelStyle}; font-weight: bold">${xtitle}</text>

  <line x1="${margins[3]}" y1="${baseline}" x2="${margins[3]}" y2="${baseline + 3}" stroke="#000"/>
  <text dominant-baseline="hanging" text-anchor="middle" x="${margins[3]}" y="${baseline + 6}" style="${labelStyle}">${round(min)}</text>

  <line x1="${size[0] - margins[1]}" y1="${baseline}" x2="${size[0] - margins[1]}" y2="${baseline + 3}" stroke="#000"/>
  <text dominant-baseline="hanging" text-anchor="middle" x="${size[0] - margins[1]}" y="${baseline + 6}" style="${labelStyle}">${round(max)}</text>

  <!-- distributions -->
  ${allBins.map((bins, i) => `
  <polygon points="${margins[3]},${baseline} ${bins.map((count, j) => {
    const x1 = margins[3] + j * binWidthPx;
    const x2 = x1 + binWidthPx;
    const y = size[1] - margins[2] - count * binUnitHeightPx;

    return `${x1},${y} ${x2},${y}`
  }).join(' ')} ${size[0] - margins[1]},${baseline}" fill="${colors[i]}" opacity="0.5"/>
  `).join('\n')}

  <!-- medians -->
  ${medians.map((median, i) => {
    const x = margins[3] + (median - min) / range * plotWidthPx;

    return `
  <line x1="${x}" y1="${baseline + 3}" x2="${x}" y2="0" stroke="${colors[i]}"/>
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${2}" style="${smallLabelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][(i % 2 === lowestFirst ? 0 : 1)]}">${String.fromCharCode(65 + i)}</text>
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${12}" style="${labelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][(i % 2 === lowestFirst ? 0 : 1)]}">${round(median)}</text>`
  
  })}

</svg>`;
}
