"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/json-custom-numbers/dist/parse.js
  var require_parse = __commonJS({
    "node_modules/json-custom-numbers/dist/parse.js"(exports, module) {
      "use strict";
      var p = Object.defineProperty;
      var j = Object.getOwnPropertyDescriptor;
      var m = Object.getOwnPropertyNames;
      var I = Object.prototype.hasOwnProperty;
      var U = /* @__PURE__ */ __name((n, c) => {
        for (var i in c)
          p(n, i, { get: c[i], enumerable: true });
      }, "U");
      var S = /* @__PURE__ */ __name((n, c, i, s) => {
        if (c && typeof c == "object" || typeof c == "function")
          for (let d of m(c))
            !I.call(n, d) && d !== i && p(n, d, { get: () => c[d], enumerable: !(s = j(c, d)) || s.enumerable });
        return n;
      }, "S");
      var N = /* @__PURE__ */ __name((n) => S(p({}, "__esModule", { value: true }), n), "N");
      var F = {};
      U(F, { JSONParseError: () => k, parse: () => B });
      module.exports = N(F);
      var k = class extends Error {
      };
      __name(k, "k");
      var r;
      var t;
      var o;
      var C;
      var A;
      var x = /[^"\\\n\t\u0000-\u001f]*/y;
      var w = /-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][-+]?[0-9]+)?|true|false|null/y;
      var e = "";
      var O = [e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, '"', e, e, e, e, e, e, e, e, e, e, e, e, "/", e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, "\\", e, e, e, e, e, "\b", e, e, e, "\f", e, e, e, e, e, e, e, `
`, e, e, e, "\r", e, "	"];
      var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4097, 8193, 12289, 16385, 20481, 24577, 28673, 32769, 36865, 0, 0, 0, 0, 0, 0, 0, 40961, 45057, 49153, 53249, 57345, 61441, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40961, 45057, 49153, 53249, 57345, 61441];
      var L = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 257, 513, 769, 1025, 1281, 1537, 1793, 2049, 2305, 0, 0, 0, 0, 0, 0, 0, 2561, 2817, 3073, 3329, 3585, 3841, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2561, 2817, 3073, 3329, 3585, 3841];
      var X = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 33, 49, 65, 81, 97, 113, 129, 145, 0, 0, 0, 0, 0, 0, 0, 161, 177, 193, 209, 225, 241, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 161, 177, 193, 209, 225, 241];
      var J = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 0, 0, 0, 0, 0, 11, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 13, 14, 15, 16];
      function a(n) {
        throw new k(n + `
At character ` + r + " in JSON: " + o);
      }
      __name(a, "a");
      function u(n) {
        return t >= 0 ? "'" + (n || "") + String.fromCharCode(t) + "'" : "end of input";
      }
      __name(u, "u");
      function D() {
        let n;
        const c = r - 1;
        w.lastIndex = c, w.test(o) || a("Unexpected character or end of input");
        const { lastIndex: i } = w;
        if (t < 102) {
          const s = o.slice(c, i);
          n = C ? C(s) : +s;
        } else
          n = t === 110 ? null : t === 116;
        return r = i, t = o.charCodeAt(r++), n;
      }
      __name(D, "D");
      function f() {
        a("Invalid \\uXXXX escape in string");
      }
      __name(f, "f");
      function E() {
        let n = "";
        for (; ; ) {
          x.lastIndex = r, x.test(o);
          const { lastIndex: c } = x;
          switch (c > r && (n += o.slice(r, c), r = c), t = o.charCodeAt(r++), t) {
            case 34:
              return t = o.charCodeAt(r++), n;
            case 92:
              t = o.charCodeAt(r++), n += t === 117 ? String.fromCharCode((R[o.charCodeAt(r++)] || f()) + (L[o.charCodeAt(r++)] || f()) + (X[o.charCodeAt(r++)] || f()) + (J[o.charCodeAt(r++)] || f()) - 4) : O[t] || a("Invalid escape sequence " + u("\\") + " in string");
              continue;
            default:
              isNaN(t) && a("Unterminated string");
              const i = t === 10 ? "newline" : t === 9 ? "tab" : "control character", s = t.toString(16), d = "0000".slice(s.length) + s;
              a("Invalid unescaped " + i + " (\\u" + d + ") in string");
          }
        }
      }
      __name(E, "E");
      function P() {
        const n = [];
        let c = 0;
        do
          t = o.charCodeAt(r++);
        while (t < 33 && (t === 32 || t === 10 || t === 13 || t === 9));
        if (t === 93)
          return t = o.charCodeAt(r++), n;
        for (; t >= 0; ) {
          for (n[c++] = g(); t < 33 && (t === 32 || t === 10 || t === 13 || t === 9); )
            t = o.charCodeAt(r++);
          if (t === 93)
            return t = o.charCodeAt(r++), n;
          t !== 44 && a("Expected ',' but got " + u() + " after array element");
          do
            t = o.charCodeAt(r++);
          while (t < 33 && (t === 32 || t === 10 || t === 13 || t === 9));
        }
        a("Unterminated array");
      }
      __name(P, "P");
      function q() {
        const n = {};
        do
          t = o.charCodeAt(r++);
        while (t < 33 && (t === 32 || t === 10 || t === 13 || t === 9));
        if (t === 125)
          return t = o.charCodeAt(r++), n;
        for (; t === 34; ) {
          const c = E();
          for (; t < 33 && (t === 32 || t === 10 || t === 13 || t === 9); )
            t = o.charCodeAt(r++);
          for (t !== 58 && a("Expected ':' but got " + u() + " after key in object"), t = o.charCodeAt(r++), n[c] = g(); t < 33 && (t === 32 || t === 10 || t === 13 || t === 9); )
            t = o.charCodeAt(r++);
          if (t === 125)
            return t = o.charCodeAt(r++), n;
          t !== 44 && a("Expected ',' but got " + u() + " after value in object");
          do
            t = o.charCodeAt(r++);
          while (t < 33 && (t === 32 || t === 10 || t === 13 || t === 9));
        }
        a(`Expected '"' but got ` + u() + " in object");
      }
      __name(q, "q");
      function g() {
        for (; t < 33 && (t === 32 || t === 10 || t === 13 || t === 9); )
          t = o.charCodeAt(r++);
        switch (t) {
          case 34:
            return E();
          case 123:
            return q();
          case 91:
            return P();
          default:
            return D();
        }
      }
      __name(g, "g");
      function B(n, c, i) {
        n instanceof Uint8Array && (n = (A != null ? A : A = new TextDecoder()).decode(n)), typeof n != "string" && a("JSON must be a string, Buffer or Uint8Array"), r = 0, t = 32, o = n, C = i;
        const s = g();
        for (; t < 33 && (t === 32 || t === 10 || t === 13 || t === 9); )
          t = o.charCodeAt(r++);
        return t >= 0 && a("Unexpected data at end of input"), typeof c == "function" ? (/* @__PURE__ */ __name(function d(b, y) {
          const l = b[y];
          if (l && typeof l == "object") {
            for (const h in l)
              if (Object.prototype.hasOwnProperty.call(l, h)) {
                const v = d(l, h);
                v !== void 0 ? l[h] = v : delete l[h];
              }
          }
          return c.call(b, y, l);
        }, "d"))({ "": s }, "") : s;
      }
      __name(B, "B");
    }
  });

  // node_modules/json-custom-numbers/dist/parse.mjs
  var import_parse = __toESM(require_parse(), 1);
  var JSONParseError = import_parse.default.JSONParseError;
  var parse = import_parse.default.parse;

  // non-parametric.ts
  function median(data, destructive = false) {
    if (!destructive)
      data = data.slice();
    const { length } = data;
    data.sort((a, b) => a - b);
    return length % 2 === 1 ? data[(length - 1) * 0.5] : 0.5 * data[length * 0.5 - 1] + 0.5 * data[length * 0.5];
  }
  __name(median, "median");
  function normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (z > 0)
      p = 1 - p;
    return p;
  }
  __name(normalCDF, "normalCDF");
  function mannWhitneyU(data) {
    const data0 = data[0].map((value) => ({ value, source: 0, rank: 0 }));
    const data1 = data[1].map((value) => ({ value, source: 1, rank: 0 }));
    const dataAll = [...data0, ...data1];
    dataAll.sort((a, b) => a.value - b.value);
    const n = dataAll.length;
    for (let i2 = 1; i2 < n; i2++) {
      const current = dataAll[i2];
      const prev = dataAll[i2 - 1];
      current.rank = prev.value === current.value ? prev.rank + 1 : 0;
    }
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
        const tiedRank = rank - prevSame * 0.5;
        const lowestTied = i - prevSame;
        while (i >= lowestTied)
          dataAll[i--].rank = tiedRank;
      }
    }
    const [r0, r1] = dataAll.reduce(([r02, r12], { source, rank }) => source === 0 ? [r02 + rank, r12] : [r02, r12 + rank], [0, 0]);
    const n0 = data0.length;
    const n1 = data1.length;
    const u0 = r0 - n0 * (n0 + 1) * 0.5;
    const u1 = r1 - n1 * (n1 + 1) * 0.5;
    const u = Math.min(u0, u1);
    const mu = 0.5 * n0 * n1;
    const stdDev = Math.sqrt(n0 * n1 * (n * n * n - n - tieSum) / (12 * n * (n - 1)));
    const z = (mu - u - 0.5) / stdDev;
    const p = 2 * normalCDF(-z);
    return { u, z, p, dataAll };
  }
  __name(mannWhitneyU, "mannWhitneyU");

  // distrib.ts
  function round(n) {
    return n < 10 ? n.toPrecision(2) : n < 100 ? n.toFixed(1) : n.toFixed(0);
  }
  __name(round, "round");
  function distrib(data, binCount = 24, size = [300, 150], colors = ["#e30", "#03e"], margins = [30, 20, 20, 20], xtitle = "ops/sec") {
    let min = Infinity, max = -Infinity;
    for (let dataSet of data) {
      min = Math.min(min, ...dataSet);
      max = Math.max(max, ...dataSet);
    }
    const medians = data.map((dataSet) => median(dataSet));
    const lowestFirst = medians[0] <= medians[1] ? 1 : 0;
    const range = max - min;
    const binSize = range / binCount;
    const allBins = data.map(() => new Array(binCount).fill(0));
    for (let i = 0, len = data.length; i < len; i++) {
      const dataSet = data[i];
      const bins = allBins[i];
      for (const value of dataSet)
        bins[Math.min(Math.floor((value - min) / binSize), binCount - 1)]++;
    }
    let greatest = 0;
    for (const bins of allBins)
      greatest = Math.max(greatest, ...bins);
    const plotWidthPx = size[0] - margins[1] - margins[3];
    const binWidthPx = plotWidthPx / binCount;
    const plotHeightPx = size[1] - margins[0] - margins[2];
    const binUnitHeightPx = plotHeightPx / greatest;
    const baseline = size[1] - margins[2];
    const smallLabelStyle = "font: 9px sans-serif";
    const labelStyle = "font: 12px sans-serif; margin: 0 4px;";
    return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size[0]} ${size[1]}"  width="${size[0]}" height="${size[1]}">

  <!-- x axis -->
  <line x1="0" y1="${baseline}" x2="${size[0]}" y2="${baseline}" stroke="#000"/>
  <text dominant-baseline="hanging" text-anchor="middle" x="${size[0] * 0.5}" y="${baseline + 6}" style="${labelStyle}; font-weight: bold">${xtitle}</text>

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
      return `${x1},${y} ${x2},${y}`;
    }).join(" ")} ${size[0] - margins[1]},${baseline}" fill="${colors[i]}" opacity="0.5"/>
  `).join("\n")}

  <!-- medians -->
  ${medians.map((median2, i) => {
      const x = margins[3] + (median2 - min) / range * plotWidthPx;
      return `
  <line x1="${x}" y1="${baseline + 3}" x2="${x}" y2="0" stroke="${colors[i]}"/>
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${0}" style="${smallLabelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][i % 2 === lowestFirst ? 0 : 1]}">P50</text>
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${10}" style="${labelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][i % 2 === lowestFirst ? 0 : 1]}">${round(median2)}</text>`;
    })}

</svg>`;
  }
  __name(distrib, "distrib");

  // index.ts
  function log(...args) {
    document.querySelector("#log").innerText += args.map((a) => typeof a === "string" ? a : JSON.stringify(a)).join(" ") + "\n";
  }
  __name(log, "log");
  var t0;
  var t1;
  t0 = t1 = performance.now();
  while (t0 === t1) {
    t1 = performance.now();
  }
  var msRes = t1 - t0;
  var usRes = Math.round(msRes * 1e3);
  log(`Resolution: ${usRes}\u03BCs`);
  var trialDuration = Math.max(msRes * 100, 25);
  log(`Trial duration: ${trialDuration}ms`);
  var trials = 100;
  function opsPerDurationMs(fn, durationMs, toNearest = 10, maxOps = 2e9) {
    const t02 = performance.now();
    for (let i = 1; i < maxOps; i++) {
      fn();
      if (i % toNearest === 0 && performance.now() - t02 >= durationMs)
        return i;
    }
    return maxOps;
  }
  __name(opsPerDurationMs, "opsPerDurationMs");
  async function fortyWinks() {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }
  __name(fortyWinks, "fortyWinks");
  async function compare(...fns) {
    const fnsLength = fns.length;
    let reps = 0;
    for (let i = 0; i < fnsLength; i++) {
      const fn = fns[i];
      const fnReps = opsPerDurationMs(fn, trialDuration);
      log(fn.toString(), `-> ${fnReps} reps/trial`);
      if (fnReps > reps)
        reps = fnReps;
      await fortyWinks();
    }
    log(`Using ${reps} reps/trial`);
    const tReps = [[], []];
    const tRepsSum = [0, 0];
    const tRepsMean = [0, 0];
    for (let trial = 0; trial < trials; trial++) {
      for (let _i = 0; _i < fnsLength; _i++) {
        const i = trial % 2 ? _i : 1 - _i;
        const fn = fns[i];
        const t02 = performance.now();
        for (let rep = 0; rep < reps; rep++)
          fn();
        const t12 = performance.now();
        const t = t12 - t02;
        const tRep = 1 / (t / reps);
        tReps[i][trial] = tRep;
        tRepsSum[i] += tRep;
        tRepsMean[i] = tRepsSum[i] / (trial + 1);
      }
      ;
      await fortyWinks();
    }
    const tRepsMedians = tReps.map((tRep) => median(tRep));
    const tRepsUStats = mannWhitneyU(tReps);
    return { medians: tRepsMedians, ...tRepsUStats, tReps };
  }
  __name(compare, "compare");
  async function main() {
    const jsonDoc = `{"number":1,"string":"The quick brown fox\\njumps over the lazy dog \\u03bc","boolean":true,"null":null}`;
    const jsonDocSpaced = JSON.stringify(JSON.parse(jsonDoc), null, 2);
    const { medians, u, z, p, tReps } = await compare(() => parse(jsonDoc), () => parse(jsonDocSpaced));
    log(`median: ${medians.join(",")}  u: ${u}  z: ${z}  p: ${p}`);
    const img = document.querySelector("#svg");
    const xml = distrib(tReps);
    img.src = "data:image/svg+xml," + encodeURIComponent(xml);
    let sig1 = 0, sig5 = 0, sig10 = 0;
    for (let i = 0; i < 100; i++) {
      const { medians: medians2, u: u2, z: z2, p: p2 } = await compare(() => parse(jsonDoc), () => parse(jsonDoc));
      log(`median: ${medians2.join(",")}  u: ${u2}  z: ${z2}  p: ${p2}`);
      if (p2 < 0.01)
        sig1++;
      if (p2 < 0.05)
        sig5++;
      if (p2 < 0.1)
        sig10++;
      log(`${sig1} at 1%, ${sig5} at 5%, ${sig10} at 10% after ${i + 1} rounds`);
    }
  }
  __name(main, "main");
  window.addEventListener("load", main);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2pzb24tY3VzdG9tLW51bWJlcnMvZGlzdC9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvanNvbi1jdXN0b20tbnVtYmVycy9kaXN0L3BhcnNlLm1qcyIsICJub24tcGFyYW1ldHJpYy50cyIsICJkaXN0cmliLnRzIiwgImluZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjt2YXIgcD1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIGo9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjt2YXIgbT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lczt2YXIgST1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciBVPShuLGMpPT57Zm9yKHZhciBpIGluIGMpcChuLGkse2dldDpjW2ldLGVudW1lcmFibGU6ITB9KX0sUz0obixjLGkscyk9PntpZihjJiZ0eXBlb2YgYz09XCJvYmplY3RcInx8dHlwZW9mIGM9PVwiZnVuY3Rpb25cIilmb3IobGV0IGQgb2YgbShjKSkhSS5jYWxsKG4sZCkmJmQhPT1pJiZwKG4sZCx7Z2V0OigpPT5jW2RdLGVudW1lcmFibGU6IShzPWooYyxkKSl8fHMuZW51bWVyYWJsZX0pO3JldHVybiBufTt2YXIgTj1uPT5TKHAoe30sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksbik7dmFyIEY9e307VShGLHtKU09OUGFyc2VFcnJvcjooKT0+ayxwYXJzZTooKT0+Qn0pO21vZHVsZS5leHBvcnRzPU4oRik7Y2xhc3MgayBleHRlbmRzIEVycm9ye31sZXQgcix0LG8sQyxBO2NvbnN0IHg9L1teXCJcXFxcXFxuXFx0XFx1MDAwMC1cXHUwMDFmXSoveSx3PS8tPygwfFsxLTldWzAtOV0qKShbLl1bMC05XSspPyhbZUVdWy0rXT9bMC05XSspP3x0cnVlfGZhbHNlfG51bGwveSxlPVwiXCIsTz1bZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSwnXCInLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLFwiL1wiLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxcIlxcXFxcIixlLGUsZSxlLGUsXCJcXGJcIixlLGUsZSxcIlxcZlwiLGUsZSxlLGUsZSxlLGUsYFxuYCxlLGUsZSxcIlxcclwiLGUsXCJcdFwiXSxSPVswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDQwOTcsODE5MywxMjI4OSwxNjM4NSwyMDQ4MSwyNDU3NywyODY3MywzMjc2OSwzNjg2NSwwLDAsMCwwLDAsMCwwLDQwOTYxLDQ1MDU3LDQ5MTUzLDUzMjQ5LDU3MzQ1LDYxNDQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw0MDk2MSw0NTA1Nyw0OTE1Myw1MzI0OSw1NzM0NSw2MTQ0MV0sTD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyNTcsNTEzLDc2OSwxMDI1LDEyODEsMTUzNywxNzkzLDIwNDksMjMwNSwwLDAsMCwwLDAsMCwwLDI1NjEsMjgxNywzMDczLDMzMjksMzU4NSwzODQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyNTYxLDI4MTcsMzA3MywzMzI5LDM1ODUsMzg0MV0sWD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxNywzMyw0OSw2NSw4MSw5NywxMTMsMTI5LDE0NSwwLDAsMCwwLDAsMCwwLDE2MSwxNzcsMTkzLDIwOSwyMjUsMjQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxNjEsMTc3LDE5MywyMDksMjI1LDI0MV0sSj1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMCwwLDAsMCwwLDAsMCwxMSwxMiwxMywxNCwxNSwxNiwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTEsMTIsMTMsMTQsMTUsMTZdO2Z1bmN0aW9uIGEobil7dGhyb3cgbmV3IGsobitgXG5BdCBjaGFyYWN0ZXIgYCtyK1wiIGluIEpTT046IFwiK28pfWZ1bmN0aW9uIHUobil7cmV0dXJuIHQ+PTA/XCInXCIrKG58fFwiXCIpK1N0cmluZy5mcm9tQ2hhckNvZGUodCkrXCInXCI6XCJlbmQgb2YgaW5wdXRcIn1mdW5jdGlvbiBEKCl7bGV0IG47Y29uc3QgYz1yLTE7dy5sYXN0SW5kZXg9Yyx3LnRlc3Qobyl8fGEoXCJVbmV4cGVjdGVkIGNoYXJhY3RlciBvciBlbmQgb2YgaW5wdXRcIik7Y29uc3R7bGFzdEluZGV4Oml9PXc7aWYodDwxMDIpe2NvbnN0IHM9by5zbGljZShjLGkpO249Qz9DKHMpOitzfWVsc2Ugbj10PT09MTEwP251bGw6dD09PTExNjtyZXR1cm4gcj1pLHQ9by5jaGFyQ29kZUF0KHIrKyksbn1mdW5jdGlvbiBmKCl7YShcIkludmFsaWQgXFxcXHVYWFhYIGVzY2FwZSBpbiBzdHJpbmdcIil9ZnVuY3Rpb24gRSgpe2xldCBuPVwiXCI7Zm9yKDs7KXt4Lmxhc3RJbmRleD1yLHgudGVzdChvKTtjb25zdHtsYXN0SW5kZXg6Y309eDtzd2l0Y2goYz5yJiYobis9by5zbGljZShyLGMpLHI9YyksdD1vLmNoYXJDb2RlQXQocisrKSx0KXtjYXNlIDM0OnJldHVybiB0PW8uY2hhckNvZGVBdChyKyspLG47Y2FzZSA5Mjp0PW8uY2hhckNvZGVBdChyKyspLG4rPXQ9PT0xMTc/U3RyaW5nLmZyb21DaGFyQ29kZSgoUltvLmNoYXJDb2RlQXQocisrKV18fGYoKSkrKExbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpKyhYW28uY2hhckNvZGVBdChyKyspXXx8ZigpKSsoSltvLmNoYXJDb2RlQXQocisrKV18fGYoKSktNCk6T1t0XXx8YShcIkludmFsaWQgZXNjYXBlIHNlcXVlbmNlIFwiK3UoXCJcXFxcXCIpK1wiIGluIHN0cmluZ1wiKTtjb250aW51ZTtkZWZhdWx0OmlzTmFOKHQpJiZhKFwiVW50ZXJtaW5hdGVkIHN0cmluZ1wiKTtjb25zdCBpPXQ9PT0xMD9cIm5ld2xpbmVcIjp0PT09OT9cInRhYlwiOlwiY29udHJvbCBjaGFyYWN0ZXJcIixzPXQudG9TdHJpbmcoMTYpLGQ9XCIwMDAwXCIuc2xpY2Uocy5sZW5ndGgpK3M7YShcIkludmFsaWQgdW5lc2NhcGVkIFwiK2krXCIgKFxcXFx1XCIrZCtcIikgaW4gc3RyaW5nXCIpfX19ZnVuY3Rpb24gUCgpe2NvbnN0IG49W107bGV0IGM9MDtkbyB0PW8uY2hhckNvZGVBdChyKyspO3doaWxlKHQ8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSkpO2lmKHQ9PT05MylyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Zvcig7dD49MDspe2ZvcihuW2MrK109ZygpO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7aWYodD09PTkzKXJldHVybiB0PW8uY2hhckNvZGVBdChyKyspLG47dCE9PTQ0JiZhKFwiRXhwZWN0ZWQgJywnIGJ1dCBnb3QgXCIrdSgpK1wiIGFmdGVyIGFycmF5IGVsZW1lbnRcIik7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKX1hKFwiVW50ZXJtaW5hdGVkIGFycmF5XCIpfWZ1bmN0aW9uIHEoKXtjb25zdCBuPXt9O2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSk7aWYodD09PTEyNSlyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Zvcig7dD09PTM0Oyl7Y29uc3QgYz1FKCk7Zm9yKDt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2Zvcih0IT09NTgmJmEoXCJFeHBlY3RlZCAnOicgYnV0IGdvdCBcIit1KCkrXCIgYWZ0ZXIga2V5IGluIG9iamVjdFwiKSx0PW8uY2hhckNvZGVBdChyKyspLG5bY109ZygpO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7aWYodD09PTEyNSlyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO3QhPT00NCYmYShcIkV4cGVjdGVkICcsJyBidXQgZ290IFwiK3UoKStcIiBhZnRlciB2YWx1ZSBpbiBvYmplY3RcIik7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKX1hKGBFeHBlY3RlZCAnXCInIGJ1dCBnb3QgYCt1KCkrXCIgaW4gb2JqZWN0XCIpfWZ1bmN0aW9uIGcoKXtmb3IoO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7c3dpdGNoKHQpe2Nhc2UgMzQ6cmV0dXJuIEUoKTtjYXNlIDEyMzpyZXR1cm4gcSgpO2Nhc2UgOTE6cmV0dXJuIFAoKTtkZWZhdWx0OnJldHVybiBEKCl9fWZ1bmN0aW9uIEIobixjLGkpe24gaW5zdGFuY2VvZiBVaW50OEFycmF5JiYobj0oQSE9bnVsbD9BOkE9bmV3IFRleHREZWNvZGVyKS5kZWNvZGUobikpLHR5cGVvZiBuIT1cInN0cmluZ1wiJiZhKFwiSlNPTiBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIgb3IgVWludDhBcnJheVwiKSxyPTAsdD0zMixvPW4sQz1pO2NvbnN0IHM9ZygpO2Zvcig7dDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KTspdD1vLmNoYXJDb2RlQXQocisrKTtyZXR1cm4gdD49MCYmYShcIlVuZXhwZWN0ZWQgZGF0YSBhdCBlbmQgb2YgaW5wdXRcIiksdHlwZW9mIGM9PVwiZnVuY3Rpb25cIj9mdW5jdGlvbiBkKGIseSl7Y29uc3QgbD1iW3ldO2lmKGwmJnR5cGVvZiBsPT1cIm9iamVjdFwiKXtmb3IoY29uc3QgaCBpbiBsKWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsLGgpKXtjb25zdCB2PWQobCxoKTt2IT09dm9pZCAwP2xbaF09djpkZWxldGUgbFtoXX19cmV0dXJuIGMuY2FsbChiLHksbCl9KHtcIlwiOnN9LFwiXCIpOnN9XG4iLCAiaW1wb3J0IG1vZCBmcm9tIFwiLi9wYXJzZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBtb2Q7XG5leHBvcnQgY29uc3QgSlNPTlBhcnNlRXJyb3IgPSBtb2QuSlNPTlBhcnNlRXJyb3I7XG5leHBvcnQgY29uc3QgcGFyc2UgPSBtb2QucGFyc2U7XG4iLCAiXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFuKGRhdGE6IG51bWJlcltdLCBkZXN0cnVjdGl2ZSA9IGZhbHNlKSB7XG4gIGlmICghZGVzdHJ1Y3RpdmUpIGRhdGEgPSBkYXRhLnNsaWNlKCk7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBkYXRhO1xuICBkYXRhLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgcmV0dXJuIGxlbmd0aCAlIDIgPT09IDEgP1xuICAgIGRhdGFbKGxlbmd0aCAtIDEpICogLjVdIDpcbiAgICAuNSAqIGRhdGFbbGVuZ3RoICogLjUgLSAxXSArIC41ICogZGF0YVtsZW5ndGggKiAuNV07XG59XG5cbmZ1bmN0aW9uIG5vcm1hbENERih6OiBudW1iZXIpIHsgIC8vIGh0dHBzOi8vd3d3Lm1hdGgudWNsYS5lZHUvfnRvbS9kaXN0cmlidXRpb25zL25vcm1hbC5odG1sXG4gIGNvbnN0IHQgPSAxIC8gKDEgKyAuMjMxNjQxOSAqIE1hdGguYWJzKHopKTtcbiAgY29uc3QgZCA9IC4zOTg5NDIzICogTWF0aC5leHAoLXogKiB6IC8gMik7XG4gIGxldCBwID0gZCAqIHQgKiAoLjMxOTM4MTUgKyB0ICogKC0uMzU2NTYzOCArIHQgKiAoMS43ODE0NzggKyB0ICogKC0xLjgyMTI1NiArIHQgKiAxLjMzMDI3NCkpKSk7XG4gIGlmICh6ID4gMCkgcCA9IDEgLSBwO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hbm5XaGl0bmV5VShkYXRhOiBbbnVtYmVyW10sIG51bWJlcltdXSkge1xuICAvLyBoYW5keSBmb3IgY29tcGFyaXNvbjogUiBvciBodHRwczovL3d3dy5zdGF0c2tpbmdkb20uY29tLzE3MG1lZGlhbl9tYW5uX3doaXRuZXkuaHRtbFxuICBjb25zdCBkYXRhMCA9IGRhdGFbMF0ubWFwKHZhbHVlID0+ICh7IHZhbHVlLCBzb3VyY2U6IDAsIHJhbms6IDAgfSkpO1xuICBjb25zdCBkYXRhMSA9IGRhdGFbMV0ubWFwKHZhbHVlID0+ICh7IHZhbHVlLCBzb3VyY2U6IDEsIHJhbms6IDAgfSkpO1xuICBjb25zdCBkYXRhQWxsID0gWy4uLmRhdGEwLCAuLi5kYXRhMV07XG4gIGRhdGFBbGwuc29ydCgoYSwgYikgPT4gYS52YWx1ZSAtIGIudmFsdWUpO1xuICBjb25zdCBuID0gZGF0YUFsbC5sZW5ndGg7XG5cbiAgLy8gaXRlcmF0ZSBmb3J3YXJkcywgY291bnRpbmcgaWRlbnRpY2FsIHByZXZpb3VzIHZhbHVlcyAoYW5kIHN0dWZmaW5nIHRoZW0gaW4gdGhlIHJhbmsgZmllbGQpXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRhdGFBbGxbaV07XG4gICAgY29uc3QgcHJldiA9IGRhdGFBbGxbaSAtIDFdO1xuICAgIGN1cnJlbnQucmFuayA9IHByZXYudmFsdWUgPT09IGN1cnJlbnQudmFsdWUgPyBwcmV2LnJhbmsgKyAxIDogMDtcbiAgfVxuICBcbiAgLy8gaXRlcmF0ZSBiYWNrd2FyZHMsIGZpbGxpbmcgaW4gdGhlIHJhbmsgZmllbGQgY29ycmVjdGx5IChpbmNsdWRpbmcgdGllcylcbiAgbGV0IHRpZVN1bSA9IDA7XG4gIGxldCBpID0gbiAtIDE7XG4gIHdoaWxlIChpID49IDApIHtcbiAgICBjb25zdCByYW5rID0gaSArIDE7XG4gICAgY29uc3QgY3VycmVudCA9IGRhdGFBbGxbaV07XG4gICAgY29uc3QgcHJldlNhbWUgPSBjdXJyZW50LnJhbms7XG4gICAgaWYgKHByZXZTYW1lID09PSAwKSB7XG4gICAgICBjdXJyZW50LnJhbmsgPSByYW5rO1xuICAgICAgaS0tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWVTdW0gKz0gcHJldlNhbWUgKiBwcmV2U2FtZSAqIHByZXZTYW1lIC0gcHJldlNhbWU7XG4gICAgICBjb25zdCB0aWVkUmFuayA9IHJhbmsgLSBwcmV2U2FtZSAqIC41O1xuICAgICAgY29uc3QgbG93ZXN0VGllZCA9IGkgLSBwcmV2U2FtZTtcbiAgICAgIHdoaWxlIChpID49IGxvd2VzdFRpZWQpIGRhdGFBbGxbaS0tXS5yYW5rID0gdGllZFJhbms7XG4gICAgfVxuICB9XG5cbiAgLy8gc3VtIHJhbmtzIGJ5IGRhdGEgc291cmNlXG4gIGNvbnN0IFtyMCwgcjFdID0gZGF0YUFsbC5yZWR1Y2UoKFtyMCwgcjFdLCB7IHNvdXJjZSwgcmFuayB9KSA9PlxuICAgIHNvdXJjZSA9PT0gMCA/IFtyMCArIHJhbmssIHIxXSA6IFtyMCwgcjEgKyByYW5rXSwgWzAsIDBdKTtcblxuICAvLyBjYWxjdWxhdGUgVVxuICBjb25zdCBuMCA9IGRhdGEwLmxlbmd0aDtcbiAgY29uc3QgbjEgPSBkYXRhMS5sZW5ndGg7XG4gIGNvbnN0IHUwID0gcjAgLSBuMCAqIChuMCArIDEpICogLjU7XG4gIGNvbnN0IHUxID0gcjEgLSBuMSAqIChuMSArIDEpICogLjU7XG4gIGNvbnN0IHUgPSBNYXRoLm1pbih1MCwgdTEpO1xuXG4gIC8vIGNhbGN1bGF0ZSB6IGFuZCBzb21lIHR3by10YWlsZWQgdGVzdCB0aHJlc2hvbGRzXG4gIC8vIGh0dHA6Ly91c2Vycy5zdXNzZXguYWMudWsvfmdyYWhhbWgvUk0xd2ViL1dpbGNveG9uJTIwTGFyZ2UlMjBOJTIwMjAwOS5wZGZcbiAgY29uc3QgbXUgPSAuNSAqIG4wICogbjE7XG4gIGNvbnN0IHN0ZERldiA9IE1hdGguc3FydCgoKG4wICogbjEpICogKG4gKiBuICogbiAtIG4gLSB0aWVTdW0pKSAvICgxMiAqIG4gKiAobiAtIDEpKSk7XG4gIGNvbnN0IHogPSAobXUgLSB1IC0gLjUpIC8gc3RkRGV2O1xuICBjb25zdCBwID0gMiAvKiB0d28tdGFpbGVkIHRlc3QgKi8gKiBub3JtYWxDREYoLXopO1xuXG4gIHJldHVybiB7IHUsIHosIHAsIGRhdGFBbGwgfTtcbn1cbiIsICJcbmltcG9ydCB7IG1lZGlhbiB9IGZyb20gJy4vbm9uLXBhcmFtZXRyaWMnO1xuXG5mdW5jdGlvbiByb3VuZChuOiBudW1iZXIpIHtcbiAgcmV0dXJuIG4gPCAxMCA/IG4udG9QcmVjaXNpb24oMikgOiBuIDwgMTAwID8gbi50b0ZpeGVkKDEpIDogbi50b0ZpeGVkKDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdHJpYihkYXRhOiBudW1iZXJbXVtdLCBiaW5Db3VudCA9IDI0LCBzaXplID0gWzMwMCwgMTUwXSwgY29sb3JzID0gWycjZTMwJywgJyMwM2UnXSwgbWFyZ2lucyA9IFszMCwgMjAsIDIwLCAyMF0sIHh0aXRsZT1cIm9wcy9zZWNcIikge1xuICBsZXQgbWluID0gSW5maW5pdHksIG1heCA9IC1JbmZpbml0eTtcbiAgZm9yIChsZXQgZGF0YVNldCBvZiBkYXRhKSB7XG4gICAgbWluID0gTWF0aC5taW4obWluLCAuLi5kYXRhU2V0KTtcbiAgICBtYXggPSBNYXRoLm1heChtYXgsIC4uLmRhdGFTZXQpO1xuICB9XG5cbiAgY29uc3QgbWVkaWFucyA9IGRhdGEubWFwKGRhdGFTZXQgPT4gbWVkaWFuKGRhdGFTZXQpKTtcbiAgY29uc3QgbG93ZXN0Rmlyc3QgPSBtZWRpYW5zWzBdIDw9IG1lZGlhbnNbMV0gPyAxIDogMDtcblxuICBjb25zdCByYW5nZSA9IG1heCAtIG1pbjtcbiAgY29uc3QgYmluU2l6ZSA9IHJhbmdlIC8gYmluQ291bnQ7XG4gIGNvbnN0IGFsbEJpbnMgPSBkYXRhLm1hcCgoKSA9PiBuZXcgQXJyYXkoYmluQ291bnQpLmZpbGwoMCkpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGRhdGFTZXQgPSBkYXRhW2ldO1xuICAgIGNvbnN0IGJpbnMgPSBhbGxCaW5zW2ldO1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgZGF0YVNldCkgYmluc1tNYXRoLm1pbihNYXRoLmZsb29yKCh2YWx1ZSAtIG1pbikgLyBiaW5TaXplKSwgYmluQ291bnQgLSAxKV0rKztcbiAgfVxuXG4gIGxldCBncmVhdGVzdCA9IDA7XG4gIGZvciAoY29uc3QgYmlucyBvZiBhbGxCaW5zKSBncmVhdGVzdCA9IE1hdGgubWF4KGdyZWF0ZXN0LCAuLi5iaW5zKTtcblxuICBjb25zdCBwbG90V2lkdGhQeCA9IHNpemVbMF0gLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXTtcbiAgY29uc3QgYmluV2lkdGhQeCA9IHBsb3RXaWR0aFB4IC8gYmluQ291bnQ7XG4gIGNvbnN0IHBsb3RIZWlnaHRQeCA9IHNpemVbMV0gLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXTtcbiAgY29uc3QgYmluVW5pdEhlaWdodFB4ID0gcGxvdEhlaWdodFB4IC8gZ3JlYXRlc3Q7XG5cbiAgY29uc3QgYmFzZWxpbmUgPSBzaXplWzFdIC0gbWFyZ2luc1syXTtcbiAgY29uc3Qgc21hbGxMYWJlbFN0eWxlID0gJ2ZvbnQ6IDlweCBzYW5zLXNlcmlmJztcbiAgY29uc3QgbGFiZWxTdHlsZSA9ICdmb250OiAxMnB4IHNhbnMtc2VyaWY7IG1hcmdpbjogMCA0cHg7JztcblxuICByZXR1cm4gYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PjwhRE9DVFlQRSBzdmcgUFVCTElDIFwiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU5cIiBcImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZFwiPlxuPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgJHtzaXplWzBdfSAke3NpemVbMV19XCIgIHdpZHRoPVwiJHtzaXplWzBdfVwiIGhlaWdodD1cIiR7c2l6ZVsxXX1cIj5cblxuICA8IS0tIHggYXhpcyAtLT5cbiAgPGxpbmUgeDE9XCIwXCIgeTE9XCIke2Jhc2VsaW5lfVwiIHgyPVwiJHtzaXplWzBdfVwiIHkyPVwiJHtiYXNlbGluZX1cIiBzdHJva2U9XCIjMDAwXCIvPlxuICA8dGV4dCBkb21pbmFudC1iYXNlbGluZT1cImhhbmdpbmdcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIHg9XCIke3NpemVbMF0gKiAuNX1cIiB5PVwiJHtiYXNlbGluZSArIDZ9XCIgc3R5bGU9XCIke2xhYmVsU3R5bGV9OyBmb250LXdlaWdodDogYm9sZFwiPiR7eHRpdGxlfTwvdGV4dD5cblxuICA8bGluZSB4MT1cIiR7bWFyZ2luc1szXX1cIiB5MT1cIiR7YmFzZWxpbmV9XCIgeDI9XCIke21hcmdpbnNbM119XCIgeTI9XCIke2Jhc2VsaW5lICsgM31cIiBzdHJva2U9XCIjMDAwXCIvPlxuICA8dGV4dCBkb21pbmFudC1iYXNlbGluZT1cImhhbmdpbmdcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIHg9XCIke21hcmdpbnNbM119XCIgeT1cIiR7YmFzZWxpbmUgKyA2fVwiIHN0eWxlPVwiJHtsYWJlbFN0eWxlfVwiPiR7cm91bmQobWluKX08L3RleHQ+XG5cbiAgPGxpbmUgeDE9XCIke3NpemVbMF0gLSBtYXJnaW5zWzFdfVwiIHkxPVwiJHtiYXNlbGluZX1cIiB4Mj1cIiR7c2l6ZVswXSAtIG1hcmdpbnNbMV19XCIgeTI9XCIke2Jhc2VsaW5lICsgM31cIiBzdHJva2U9XCIjMDAwXCIvPlxuICA8dGV4dCBkb21pbmFudC1iYXNlbGluZT1cImhhbmdpbmdcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIHg9XCIke3NpemVbMF0gLSBtYXJnaW5zWzFdfVwiIHk9XCIke2Jhc2VsaW5lICsgNn1cIiBzdHlsZT1cIiR7bGFiZWxTdHlsZX1cIj4ke3JvdW5kKG1heCl9PC90ZXh0PlxuXG4gIDwhLS0gZGlzdHJpYnV0aW9ucyAtLT5cbiAgJHthbGxCaW5zLm1hcCgoYmlucywgaSkgPT4gYFxuICA8cG9seWdvbiBwb2ludHM9XCIke21hcmdpbnNbM119LCR7YmFzZWxpbmV9ICR7Ymlucy5tYXAoKGNvdW50LCBqKSA9PiB7XG4gICAgY29uc3QgeDEgPSBtYXJnaW5zWzNdICsgaiAqIGJpbldpZHRoUHg7XG4gICAgY29uc3QgeDIgPSB4MSArIGJpbldpZHRoUHg7XG4gICAgY29uc3QgeSA9IHNpemVbMV0gLSBtYXJnaW5zWzJdIC0gY291bnQgKiBiaW5Vbml0SGVpZ2h0UHg7XG5cbiAgICByZXR1cm4gYCR7eDF9LCR7eX0gJHt4Mn0sJHt5fWBcbiAgfSkuam9pbignICcpfSAke3NpemVbMF0gLSBtYXJnaW5zWzFdfSwke2Jhc2VsaW5lfVwiIGZpbGw9XCIke2NvbG9yc1tpXX1cIiBvcGFjaXR5PVwiMC41XCIvPlxuICBgKS5qb2luKCdcXG4nKX1cblxuICA8IS0tIG1lZGlhbnMgLS0+XG4gICR7bWVkaWFucy5tYXAoKG1lZGlhbiwgaSkgPT4ge1xuICAgIGNvbnN0IHggPSBtYXJnaW5zWzNdICsgKG1lZGlhbiAtIG1pbikgLyByYW5nZSAqIHBsb3RXaWR0aFB4O1xuXG4gICAgcmV0dXJuIGBcbiAgPGxpbmUgeDE9XCIke3h9XCIgeTE9XCIke2Jhc2VsaW5lICsgM31cIiB4Mj1cIiR7eH1cIiB5Mj1cIjBcIiBzdHJva2U9XCIke2NvbG9yc1tpXX1cIi8+XG4gIDx0ZXh0IGRvbWluYW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiIHg9XCIke3ggKyAoaSAlIDIgPT09IGxvd2VzdEZpcnN0ID8gMyA6IC0zKX1cIiB5PVwiJHswfVwiIHN0eWxlPVwiJHtzbWFsbExhYmVsU3R5bGV9XCIgZmlsbD1cIiR7Y29sb3JzW2ldfVwiIHRleHQtYW5jaG9yPVwiJHtbXCJzdGFydFwiLCBcImVuZFwiXVsoaSAlIDIgPT09IGxvd2VzdEZpcnN0ID8gMCA6IDEpXX1cIj5QNTA8L3RleHQ+XG4gIDx0ZXh0IGRvbWluYW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiIHg9XCIke3ggKyAoaSAlIDIgPT09IGxvd2VzdEZpcnN0ID8gMyA6IC0zKX1cIiB5PVwiJHsxMH1cIiBzdHlsZT1cIiR7bGFiZWxTdHlsZX1cIiBmaWxsPVwiJHtjb2xvcnNbaV19XCIgdGV4dC1hbmNob3I9XCIke1tcInN0YXJ0XCIsIFwiZW5kXCJdWyhpICUgMiA9PT0gbG93ZXN0Rmlyc3QgPyAwIDogMSldfVwiPiR7cm91bmQobWVkaWFuKX08L3RleHQ+YFxuICBcbiAgfSl9XG5cbjwvc3ZnPmA7XG59XG4iLCAiXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ2pzb24tY3VzdG9tLW51bWJlcnMnO1xuaW1wb3J0IHsgbWVkaWFuLCBtYW5uV2hpdG5leVUgfSBmcm9tICcuL25vbi1wYXJhbWV0cmljJztcbmltcG9ydCB7IGRpc3RyaWIgfSBmcm9tICcuL2Rpc3RyaWInO1xuXG5mdW5jdGlvbiBsb2coLi4uYXJnczogYW55W10pIHtcbiAgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2cnKSBhcyBIVE1MRGl2RWxlbWVudCkuaW5uZXJUZXh0ICs9XG4gICAgYXJncy5tYXAoYSA9PiB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhIDogSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJyAnKSArICdcXG4nO1xufVxuXG5sZXQgdDAsIHQxO1xudDAgPSB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xud2hpbGUgKHQwID09PSB0MSkgeyB0MSA9IHBlcmZvcm1hbmNlLm5vdygpIH07XG5jb25zdCBtc1JlcyA9IHQxIC0gdDA7XG5jb25zdCB1c1JlcyA9IE1hdGgucm91bmQobXNSZXMgKiAxZTMpO1xubG9nKGBSZXNvbHV0aW9uOiAke3VzUmVzfVxcdTAzYmNzYCk7XG5cbmNvbnN0IHRyaWFsRHVyYXRpb24gPSBNYXRoLm1heChtc1JlcyAqIDEwMCwgMjUpO1xubG9nKGBUcmlhbCBkdXJhdGlvbjogJHt0cmlhbER1cmF0aW9ufW1zYCk7XG5cbmNvbnN0IHRyaWFscyA9IDEwMDtcblxuZnVuY3Rpb24gb3BzUGVyRHVyYXRpb25NcyhmbjogKCkgPT4gYW55LCBkdXJhdGlvbk1zOiBudW1iZXIsIHRvTmVhcmVzdCA9IDEwLCBtYXhPcHMgPSAyZTkpIHtcbiAgY29uc3QgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXhPcHM7IGkrKykgeyAgLy8gaXQncyBpbXBvcnRhbnQgZm9yIHZhcmlvdXMgcmVhc29ucyB0aGF0IGkgc3RhcnRzIGF0IDEsIG5vdCAwXG4gICAgZm4oKTtcbiAgICBpZiAoaSAlIHRvTmVhcmVzdCA9PT0gMCAmJiBwZXJmb3JtYW5jZS5ub3coKSAtIHQwID49IGR1cmF0aW9uTXMpIHJldHVybiBpO1xuICB9XG4gIHJldHVybiBtYXhPcHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZvcnR5V2lua3MoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMCkpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGNvbXBhcmUoLi4uZm5zOiAoKCkgPT4gYW55KVtdKSB7XG4gIGNvbnN0IGZuc0xlbmd0aCA9IGZucy5sZW5ndGg7XG5cbiAgbGV0IHJlcHMgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZuc0xlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZm4gPSBmbnNbaV07XG4gICAgY29uc3QgZm5SZXBzID0gb3BzUGVyRHVyYXRpb25NcyhmbiwgdHJpYWxEdXJhdGlvbik7XG4gICAgbG9nKGZuLnRvU3RyaW5nKCksIGAtPiAke2ZuUmVwc30gcmVwcy90cmlhbGApO1xuICAgIGlmIChmblJlcHMgPiByZXBzKSByZXBzID0gZm5SZXBzO1xuICAgIGF3YWl0IGZvcnR5V2lua3MoKTtcbiAgfVxuXG4gIGxvZyhgVXNpbmcgJHtyZXBzfSByZXBzL3RyaWFsYCk7XG5cbiAgY29uc3QgdFJlcHM6IFtudW1iZXJbXSwgbnVtYmVyW11dID0gW1tdLCBbXV07XG4gIGNvbnN0IHRSZXBzU3VtOiBudW1iZXJbXSA9IFswLCAwXTtcbiAgY29uc3QgdFJlcHNNZWFuOiBudW1iZXJbXSA9IFswLCAwXTtcblxuICBmb3IgKGxldCB0cmlhbCA9IDA7IHRyaWFsIDwgdHJpYWxzOyB0cmlhbCsrKSB7XG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IGZuc0xlbmd0aDsgX2krKykge1xuICAgICAgLy8gYWx0ZXJuYXRlIGZ1bmN0aW9ucyAobm90ZTogc3RyYW5nZWx5LCByYW5kb20gYXNzaWdubWVudCBkb2Vzbid0IGFwcGVhciB0byB3b3JrKVxuICAgICAgY29uc3QgaSA9IHRyaWFsICUgMiA/IF9pIDogMSAtIF9pO1xuXG4gICAgICBjb25zdCBmbiA9IGZuc1tpXTtcbiAgICAgIGNvbnN0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBmb3IgKGxldCByZXAgPSAwOyByZXAgPCByZXBzOyByZXArKykgZm4oKTtcbiAgICAgIGNvbnN0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBjb25zdCB0ID0gdDEgLSB0MDtcbiAgICAgIGNvbnN0IHRSZXAgPSAxIC8gKHQgLyByZXBzKTtcbiAgICAgIHRSZXBzW2ldW3RyaWFsXSA9IHRSZXA7XG4gICAgICB0UmVwc1N1bVtpXSArPSB0UmVwO1xuICAgICAgdFJlcHNNZWFuW2ldID0gdFJlcHNTdW1baV0gLyAodHJpYWwgKyAxKTtcbiAgICB9O1xuICAgIC8vIGxvZyh0cmlhbCwgdFJlcHNNZWFuKTtcbiAgICBhd2FpdCBmb3J0eVdpbmtzKCk7XG4gIH1cblxuICBjb25zdCB0UmVwc01lZGlhbnMgPSB0UmVwcy5tYXAodFJlcCA9PiBtZWRpYW4odFJlcCkpO1xuICBjb25zdCB0UmVwc1VTdGF0cyA9IG1hbm5XaGl0bmV5VSh0UmVwcyk7XG5cbiAgcmV0dXJuIHsgbWVkaWFuczogdFJlcHNNZWRpYW5zLCAuLi50UmVwc1VTdGF0cywgdFJlcHMgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QganNvbkRvYyA9IGB7XCJudW1iZXJcIjoxLFwic3RyaW5nXCI6XCJUaGUgcXVpY2sgYnJvd24gZm94XFxcXG5qdW1wcyBvdmVyIHRoZSBsYXp5IGRvZyBcXFxcdTAzYmNcIixcImJvb2xlYW5cIjp0cnVlLFwibnVsbFwiOm51bGx9YDtcbiAgY29uc3QganNvbkRvY1NwYWNlZCA9IEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2UoanNvbkRvYyksIG51bGwsIDIpO1xuXG4gIGNvbnN0IHsgbWVkaWFucywgdSwgeiwgcCwgdFJlcHMgfSA9IGF3YWl0IGNvbXBhcmUoKCkgPT4gcGFyc2UoanNvbkRvYyksICgpID0+IHBhcnNlKGpzb25Eb2NTcGFjZWQpKTtcbiAgbG9nKGBtZWRpYW46ICR7bWVkaWFucy5qb2luKCcsJyl9ICB1OiAke3V9ICB6OiAke3p9ICBwOiAke3B9YCk7XG5cbiAgY29uc3QgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N2ZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IHhtbCA9IGRpc3RyaWIodFJlcHMpO1xuICBpbWcuc3JjID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHhtbCk7XG4gIC8vIGNvbnNvbGUubG9nKHhtbCk7XG5cblxuICBsZXQgc2lnMSA9IDAsIHNpZzUgPSAwLCBzaWcxMCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCB7IG1lZGlhbnMsIHUsIHosIHAgfSA9IGF3YWl0IGNvbXBhcmUoKCkgPT4gcGFyc2UoanNvbkRvYyksICgpID0+IHBhcnNlKGpzb25Eb2MpKTtcbiAgICBsb2coYG1lZGlhbjogJHttZWRpYW5zLmpvaW4oJywnKX0gIHU6ICR7dX0gIHo6ICR7en0gIHA6ICR7cH1gKTtcbiAgICBpZiAocCA8IDAuMDEpIHNpZzErKztcbiAgICBpZiAocCA8IDAuMDUpIHNpZzUrKztcbiAgICBpZiAocCA8IDAuMSkgc2lnMTArKztcbiAgICBsb2coYCR7c2lnMX0gYXQgMSUsICR7c2lnNX0gYXQgNSUsICR7c2lnMTB9IGF0IDEwJSBhZnRlciAke2kgKyAxfSByb3VuZHNgKTtcbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG1haW4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQWEsVUFBSSxJQUFFLE9BQU87QUFBZSxVQUFJLElBQUUsT0FBTztBQUF5QixVQUFJLElBQUUsT0FBTztBQUFvQixVQUFJLElBQUUsT0FBTyxVQUFVO0FBQWUsVUFBSSxJQUFFLHdCQUFDLEdBQUUsTUFBSTtBQUFDLGlCQUFRLEtBQUs7QUFBRSxZQUFFLEdBQUUsR0FBRSxFQUFDLEtBQUksRUFBRSxDQUFDLEdBQUUsWUFBVyxLQUFFLENBQUM7QUFBQSxNQUFDLEdBQXREO0FBQU4sVUFBOEQsSUFBRSx3QkFBQyxHQUFFLEdBQUUsR0FBRSxNQUFJO0FBQUMsWUFBRyxLQUFHLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRztBQUFXLG1CQUFRLEtBQUssRUFBRSxDQUFDO0FBQUUsYUFBQyxFQUFFLEtBQUssR0FBRSxDQUFDLEtBQUcsTUFBSSxLQUFHLEVBQUUsR0FBRSxHQUFFLEVBQUMsS0FBSSxNQUFJLEVBQUUsQ0FBQyxHQUFFLFlBQVcsRUFBRSxJQUFFLEVBQUUsR0FBRSxDQUFDLE1BQUksRUFBRSxXQUFVLENBQUM7QUFBRSxlQUFPO0FBQUEsTUFBQyxHQUFySztBQUF1SyxVQUFJLElBQUUsOEJBQUcsRUFBRSxFQUFFLENBQUMsR0FBRSxjQUFhLEVBQUMsT0FBTSxLQUFFLENBQUMsR0FBRSxDQUFDLEdBQXBDO0FBQXNDLFVBQUksSUFBRSxDQUFDO0FBQUUsUUFBRSxHQUFFLEVBQUMsZ0JBQWUsTUFBSSxHQUFFLE9BQU0sTUFBSSxFQUFDLENBQUM7QUFBRSxhQUFPLFVBQVEsRUFBRSxDQUFDO0FBQUUsVUFBTSxJQUFOLGNBQWdCLE1BQUs7QUFBQSxNQUFDO0FBQWhCO0FBQWlCLFVBQUk7QUFBSixVQUFNO0FBQU4sVUFBUTtBQUFSLFVBQVU7QUFBVixVQUFZO0FBQUUsVUFBTSxJQUFFO0FBQVIsVUFBb0MsSUFBRTtBQUF0QyxVQUF5RyxJQUFFO0FBQTNHLFVBQThHLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQSxHQUMzMkIsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUc7QUFEaWdCLFVBQy9mLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxLQUFLO0FBRDZOLFVBQzNOLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxJQUFJO0FBRGpELFVBQ21ELElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFHO0FBRHZTLFVBQ3lTLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxH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RSxVQUFNLEVBQUUsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNLElBQUksTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNsRyxRQUFJLFdBQVcsUUFBUSxLQUFLLEdBQUcsU0FBUyxTQUFTLFNBQVMsR0FBRztBQUU3RCxVQUFNLE1BQU0sU0FBUyxjQUFjLE1BQU07QUFDekMsVUFBTSxNQUFNLFFBQVEsS0FBSztBQUN6QixRQUFJLE1BQU0sd0JBQXdCLG1CQUFtQixHQUFHO0FBSXhELFFBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxRQUFRO0FBQ2hDLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLFlBQU0sRUFBRSxTQUFBRSxVQUFTLEdBQUFDLElBQUcsR0FBQUMsSUFBRyxHQUFBQyxHQUFFLElBQUksTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUNyRixVQUFJLFdBQVdILFNBQVEsS0FBSyxHQUFHLFNBQVNDLFVBQVNDLFVBQVNDLElBQUc7QUFDN0QsVUFBSUEsS0FBSTtBQUFNO0FBQ2QsVUFBSUEsS0FBSTtBQUFNO0FBQ2QsVUFBSUEsS0FBSTtBQUFLO0FBQ2IsVUFBSSxHQUFHLGVBQWUsZUFBZSxzQkFBc0IsSUFBSSxVQUFVO0FBQUEsSUFDM0U7QUFBQSxFQUNGO0FBdEJlO0FBd0JmLFNBQU8saUJBQWlCLFFBQVEsSUFBSTsiLAogICJuYW1lcyI6IFsibW9kIiwgImkiLCAicjAiLCAicjEiLCAibWVkaWFuIiwgInQwIiwgInQxIiwgIm1lZGlhbnMiLCAidSIsICJ6IiwgInAiXQp9Cg==
