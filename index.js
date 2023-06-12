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
    const smallLabelStyle = "font: bold 9px sans-serif";
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
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${0}" style="${smallLabelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][i % 2 === lowestFirst ? 0 : 1]}">${String.fromCharCode(65 + i)}</text>
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2pzb24tY3VzdG9tLW51bWJlcnMvZGlzdC9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvanNvbi1jdXN0b20tbnVtYmVycy9kaXN0L3BhcnNlLm1qcyIsICJub24tcGFyYW1ldHJpYy50cyIsICJkaXN0cmliLnRzIiwgImluZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjt2YXIgcD1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIGo9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjt2YXIgbT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lczt2YXIgST1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciBVPShuLGMpPT57Zm9yKHZhciBpIGluIGMpcChuLGkse2dldDpjW2ldLGVudW1lcmFibGU6ITB9KX0sUz0obixjLGkscyk9PntpZihjJiZ0eXBlb2YgYz09XCJvYmplY3RcInx8dHlwZW9mIGM9PVwiZnVuY3Rpb25cIilmb3IobGV0IGQgb2YgbShjKSkhSS5jYWxsKG4sZCkmJmQhPT1pJiZwKG4sZCx7Z2V0OigpPT5jW2RdLGVudW1lcmFibGU6IShzPWooYyxkKSl8fHMuZW51bWVyYWJsZX0pO3JldHVybiBufTt2YXIgTj1uPT5TKHAoe30sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksbik7dmFyIEY9e307VShGLHtKU09OUGFyc2VFcnJvcjooKT0+ayxwYXJzZTooKT0+Qn0pO21vZHVsZS5leHBvcnRzPU4oRik7Y2xhc3MgayBleHRlbmRzIEVycm9ye31sZXQgcix0LG8sQyxBO2NvbnN0IHg9L1teXCJcXFxcXFxuXFx0XFx1MDAwMC1cXHUwMDFmXSoveSx3PS8tPygwfFsxLTldWzAtOV0qKShbLl1bMC05XSspPyhbZUVdWy0rXT9bMC05XSspP3x0cnVlfGZhbHNlfG51bGwveSxlPVwiXCIsTz1bZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSwnXCInLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLFwiL1wiLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxcIlxcXFxcIixlLGUsZSxlLGUsXCJcXGJcIixlLGUsZSxcIlxcZlwiLGUsZSxlLGUsZSxlLGUsYFxuYCxlLGUsZSxcIlxcclwiLGUsXCJcdFwiXSxSPVswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDQwOTcsODE5MywxMjI4OSwxNjM4NSwyMDQ4MSwyNDU3NywyODY3MywzMjc2OSwzNjg2NSwwLDAsMCwwLDAsMCwwLDQwOTYxLDQ1MDU3LDQ5MTUzLDUzMjQ5LDU3MzQ1LDYxNDQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw0MDk2MSw0NTA1Nyw0OTE1Myw1MzI0OSw1NzM0NSw2MTQ0MV0sTD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyNTcsNTEzLDc2OSwxMDI1LDEyODEsMTUzNywxNzkzLDIwNDksMjMwNSwwLDAsMCwwLDAsMCwwLDI1NjEsMjgxNywzMDczLDMzMjksMzU4NSwzODQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyNTYxLDI4MTcsMzA3MywzMzI5LDM1ODUsMzg0MV0sWD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxNywzMyw0OSw2NSw4MSw5NywxMTMsMTI5LDE0NSwwLDAsMCwwLDAsMCwwLDE2MSwxNzcsMTkzLDIwOSwyMjUsMjQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxNjEsMTc3LDE5MywyMDksMjI1LDI0MV0sSj1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMCwwLDAsMCwwLDAsMCwxMSwxMiwxMywxNCwxNSwxNiwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTEsMTIsMTMsMTQsMTUsMTZdO2Z1bmN0aW9uIGEobil7dGhyb3cgbmV3IGsobitgXG5BdCBjaGFyYWN0ZXIgYCtyK1wiIGluIEpTT046IFwiK28pfWZ1bmN0aW9uIHUobil7cmV0dXJuIHQ+PTA/XCInXCIrKG58fFwiXCIpK1N0cmluZy5mcm9tQ2hhckNvZGUodCkrXCInXCI6XCJlbmQgb2YgaW5wdXRcIn1mdW5jdGlvbiBEKCl7bGV0IG47Y29uc3QgYz1yLTE7dy5sYXN0SW5kZXg9Yyx3LnRlc3Qobyl8fGEoXCJVbmV4cGVjdGVkIGNoYXJhY3RlciBvciBlbmQgb2YgaW5wdXRcIik7Y29uc3R7bGFzdEluZGV4Oml9PXc7aWYodDwxMDIpe2NvbnN0IHM9by5zbGljZShjLGkpO249Qz9DKHMpOitzfWVsc2Ugbj10PT09MTEwP251bGw6dD09PTExNjtyZXR1cm4gcj1pLHQ9by5jaGFyQ29kZUF0KHIrKyksbn1mdW5jdGlvbiBmKCl7YShcIkludmFsaWQgXFxcXHVYWFhYIGVzY2FwZSBpbiBzdHJpbmdcIil9ZnVuY3Rpb24gRSgpe2xldCBuPVwiXCI7Zm9yKDs7KXt4Lmxhc3RJbmRleD1yLHgudGVzdChvKTtjb25zdHtsYXN0SW5kZXg6Y309eDtzd2l0Y2goYz5yJiYobis9by5zbGljZShyLGMpLHI9YyksdD1vLmNoYXJDb2RlQXQocisrKSx0KXtjYXNlIDM0OnJldHVybiB0PW8uY2hhckNvZGVBdChyKyspLG47Y2FzZSA5Mjp0PW8uY2hhckNvZGVBdChyKyspLG4rPXQ9PT0xMTc/U3RyaW5nLmZyb21DaGFyQ29kZSgoUltvLmNoYXJDb2RlQXQocisrKV18fGYoKSkrKExbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpKyhYW28uY2hhckNvZGVBdChyKyspXXx8ZigpKSsoSltvLmNoYXJDb2RlQXQocisrKV18fGYoKSktNCk6T1t0XXx8YShcIkludmFsaWQgZXNjYXBlIHNlcXVlbmNlIFwiK3UoXCJcXFxcXCIpK1wiIGluIHN0cmluZ1wiKTtjb250aW51ZTtkZWZhdWx0OmlzTmFOKHQpJiZhKFwiVW50ZXJtaW5hdGVkIHN0cmluZ1wiKTtjb25zdCBpPXQ9PT0xMD9cIm5ld2xpbmVcIjp0PT09OT9cInRhYlwiOlwiY29udHJvbCBjaGFyYWN0ZXJcIixzPXQudG9TdHJpbmcoMTYpLGQ9XCIwMDAwXCIuc2xpY2Uocy5sZW5ndGgpK3M7YShcIkludmFsaWQgdW5lc2NhcGVkIFwiK2krXCIgKFxcXFx1XCIrZCtcIikgaW4gc3RyaW5nXCIpfX19ZnVuY3Rpb24gUCgpe2NvbnN0IG49W107bGV0IGM9MDtkbyB0PW8uY2hhckNvZGVBdChyKyspO3doaWxlKHQ8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSkpO2lmKHQ9PT05MylyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Zvcig7dD49MDspe2ZvcihuW2MrK109ZygpO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7aWYodD09PTkzKXJldHVybiB0PW8uY2hhckNvZGVBdChyKyspLG47dCE9PTQ0JiZhKFwiRXhwZWN0ZWQgJywnIGJ1dCBnb3QgXCIrdSgpK1wiIGFmdGVyIGFycmF5IGVsZW1lbnRcIik7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKX1hKFwiVW50ZXJtaW5hdGVkIGFycmF5XCIpfWZ1bmN0aW9uIHEoKXtjb25zdCBuPXt9O2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSk7aWYodD09PTEyNSlyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Zvcig7dD09PTM0Oyl7Y29uc3QgYz1FKCk7Zm9yKDt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2Zvcih0IT09NTgmJmEoXCJFeHBlY3RlZCAnOicgYnV0IGdvdCBcIit1KCkrXCIgYWZ0ZXIga2V5IGluIG9iamVjdFwiKSx0PW8uY2hhckNvZGVBdChyKyspLG5bY109ZygpO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7aWYodD09PTEyNSlyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO3QhPT00NCYmYShcIkV4cGVjdGVkICcsJyBidXQgZ290IFwiK3UoKStcIiBhZnRlciB2YWx1ZSBpbiBvYmplY3RcIik7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKX1hKGBFeHBlY3RlZCAnXCInIGJ1dCBnb3QgYCt1KCkrXCIgaW4gb2JqZWN0XCIpfWZ1bmN0aW9uIGcoKXtmb3IoO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7c3dpdGNoKHQpe2Nhc2UgMzQ6cmV0dXJuIEUoKTtjYXNlIDEyMzpyZXR1cm4gcSgpO2Nhc2UgOTE6cmV0dXJuIFAoKTtkZWZhdWx0OnJldHVybiBEKCl9fWZ1bmN0aW9uIEIobixjLGkpe24gaW5zdGFuY2VvZiBVaW50OEFycmF5JiYobj0oQSE9bnVsbD9BOkE9bmV3IFRleHREZWNvZGVyKS5kZWNvZGUobikpLHR5cGVvZiBuIT1cInN0cmluZ1wiJiZhKFwiSlNPTiBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIgb3IgVWludDhBcnJheVwiKSxyPTAsdD0zMixvPW4sQz1pO2NvbnN0IHM9ZygpO2Zvcig7dDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KTspdD1vLmNoYXJDb2RlQXQocisrKTtyZXR1cm4gdD49MCYmYShcIlVuZXhwZWN0ZWQgZGF0YSBhdCBlbmQgb2YgaW5wdXRcIiksdHlwZW9mIGM9PVwiZnVuY3Rpb25cIj9mdW5jdGlvbiBkKGIseSl7Y29uc3QgbD1iW3ldO2lmKGwmJnR5cGVvZiBsPT1cIm9iamVjdFwiKXtmb3IoY29uc3QgaCBpbiBsKWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsLGgpKXtjb25zdCB2PWQobCxoKTt2IT09dm9pZCAwP2xbaF09djpkZWxldGUgbFtoXX19cmV0dXJuIGMuY2FsbChiLHksbCl9KHtcIlwiOnN9LFwiXCIpOnN9XG4iLCAiaW1wb3J0IG1vZCBmcm9tIFwiLi9wYXJzZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBtb2Q7XG5leHBvcnQgY29uc3QgSlNPTlBhcnNlRXJyb3IgPSBtb2QuSlNPTlBhcnNlRXJyb3I7XG5leHBvcnQgY29uc3QgcGFyc2UgPSBtb2QucGFyc2U7XG4iLCAiXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFuKGRhdGE6IG51bWJlcltdLCBkZXN0cnVjdGl2ZSA9IGZhbHNlKSB7XG4gIGlmICghZGVzdHJ1Y3RpdmUpIGRhdGEgPSBkYXRhLnNsaWNlKCk7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBkYXRhO1xuICBkYXRhLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgcmV0dXJuIGxlbmd0aCAlIDIgPT09IDEgP1xuICAgIGRhdGFbKGxlbmd0aCAtIDEpICogLjVdIDpcbiAgICAuNSAqIGRhdGFbbGVuZ3RoICogLjUgLSAxXSArIC41ICogZGF0YVtsZW5ndGggKiAuNV07XG59XG5cbmZ1bmN0aW9uIG5vcm1hbENERih6OiBudW1iZXIpIHsgIC8vIGh0dHBzOi8vd3d3Lm1hdGgudWNsYS5lZHUvfnRvbS9kaXN0cmlidXRpb25zL25vcm1hbC5odG1sXG4gIGNvbnN0IHQgPSAxIC8gKDEgKyAuMjMxNjQxOSAqIE1hdGguYWJzKHopKTtcbiAgY29uc3QgZCA9IC4zOTg5NDIzICogTWF0aC5leHAoLXogKiB6IC8gMik7XG4gIGxldCBwID0gZCAqIHQgKiAoLjMxOTM4MTUgKyB0ICogKC0uMzU2NTYzOCArIHQgKiAoMS43ODE0NzggKyB0ICogKC0xLjgyMTI1NiArIHQgKiAxLjMzMDI3NCkpKSk7XG4gIGlmICh6ID4gMCkgcCA9IDEgLSBwO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hbm5XaGl0bmV5VShkYXRhOiBbbnVtYmVyW10sIG51bWJlcltdXSkge1xuICAvLyBoYW5keSBmb3IgY29tcGFyaXNvbjogUiBvciBodHRwczovL3d3dy5zdGF0c2tpbmdkb20uY29tLzE3MG1lZGlhbl9tYW5uX3doaXRuZXkuaHRtbFxuICBjb25zdCBkYXRhMCA9IGRhdGFbMF0ubWFwKHZhbHVlID0+ICh7IHZhbHVlLCBzb3VyY2U6IDAsIHJhbms6IDAgfSkpO1xuICBjb25zdCBkYXRhMSA9IGRhdGFbMV0ubWFwKHZhbHVlID0+ICh7IHZhbHVlLCBzb3VyY2U6IDEsIHJhbms6IDAgfSkpO1xuICBjb25zdCBkYXRhQWxsID0gWy4uLmRhdGEwLCAuLi5kYXRhMV07XG4gIGRhdGFBbGwuc29ydCgoYSwgYikgPT4gYS52YWx1ZSAtIGIudmFsdWUpO1xuICBjb25zdCBuID0gZGF0YUFsbC5sZW5ndGg7XG5cbiAgLy8gaXRlcmF0ZSBmb3J3YXJkcywgY291bnRpbmcgaWRlbnRpY2FsIHByZXZpb3VzIHZhbHVlcyAoYW5kIHN0dWZmaW5nIHRoZW0gaW4gdGhlIHJhbmsgZmllbGQpXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRhdGFBbGxbaV07XG4gICAgY29uc3QgcHJldiA9IGRhdGFBbGxbaSAtIDFdO1xuICAgIGN1cnJlbnQucmFuayA9IHByZXYudmFsdWUgPT09IGN1cnJlbnQudmFsdWUgPyBwcmV2LnJhbmsgKyAxIDogMDtcbiAgfVxuICBcbiAgLy8gaXRlcmF0ZSBiYWNrd2FyZHMsIGZpbGxpbmcgaW4gdGhlIHJhbmsgZmllbGQgY29ycmVjdGx5IChpbmNsdWRpbmcgdGllcylcbiAgbGV0IHRpZVN1bSA9IDA7XG4gIGxldCBpID0gbiAtIDE7XG4gIHdoaWxlIChpID49IDApIHtcbiAgICBjb25zdCByYW5rID0gaSArIDE7XG4gICAgY29uc3QgY3VycmVudCA9IGRhdGFBbGxbaV07XG4gICAgY29uc3QgcHJldlNhbWUgPSBjdXJyZW50LnJhbms7XG4gICAgaWYgKHByZXZTYW1lID09PSAwKSB7XG4gICAgICBjdXJyZW50LnJhbmsgPSByYW5rO1xuICAgICAgaS0tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWVTdW0gKz0gcHJldlNhbWUgKiBwcmV2U2FtZSAqIHByZXZTYW1lIC0gcHJldlNhbWU7XG4gICAgICBjb25zdCB0aWVkUmFuayA9IHJhbmsgLSBwcmV2U2FtZSAqIC41O1xuICAgICAgY29uc3QgbG93ZXN0VGllZCA9IGkgLSBwcmV2U2FtZTtcbiAgICAgIHdoaWxlIChpID49IGxvd2VzdFRpZWQpIGRhdGFBbGxbaS0tXS5yYW5rID0gdGllZFJhbms7XG4gICAgfVxuICB9XG5cbiAgLy8gc3VtIHJhbmtzIGJ5IGRhdGEgc291cmNlXG4gIGNvbnN0IFtyMCwgcjFdID0gZGF0YUFsbC5yZWR1Y2UoKFtyMCwgcjFdLCB7IHNvdXJjZSwgcmFuayB9KSA9PlxuICAgIHNvdXJjZSA9PT0gMCA/IFtyMCArIHJhbmssIHIxXSA6IFtyMCwgcjEgKyByYW5rXSwgWzAsIDBdKTtcblxuICAvLyBjYWxjdWxhdGUgVVxuICBjb25zdCBuMCA9IGRhdGEwLmxlbmd0aDtcbiAgY29uc3QgbjEgPSBkYXRhMS5sZW5ndGg7XG4gIGNvbnN0IHUwID0gcjAgLSBuMCAqIChuMCArIDEpICogLjU7XG4gIGNvbnN0IHUxID0gcjEgLSBuMSAqIChuMSArIDEpICogLjU7XG4gIGNvbnN0IHUgPSBNYXRoLm1pbih1MCwgdTEpO1xuXG4gIC8vIGNhbGN1bGF0ZSB6IGFuZCBzb21lIHR3by10YWlsZWQgdGVzdCB0aHJlc2hvbGRzXG4gIC8vIGh0dHA6Ly91c2Vycy5zdXNzZXguYWMudWsvfmdyYWhhbWgvUk0xd2ViL1dpbGNveG9uJTIwTGFyZ2UlMjBOJTIwMjAwOS5wZGZcbiAgY29uc3QgbXUgPSAuNSAqIG4wICogbjE7XG4gIGNvbnN0IHN0ZERldiA9IE1hdGguc3FydCgoKG4wICogbjEpICogKG4gKiBuICogbiAtIG4gLSB0aWVTdW0pKSAvICgxMiAqIG4gKiAobiAtIDEpKSk7XG4gIGNvbnN0IHogPSAobXUgLSB1IC0gLjUpIC8gc3RkRGV2O1xuICBjb25zdCBwID0gMiAvKiB0d28tdGFpbGVkIHRlc3QgKi8gKiBub3JtYWxDREYoLXopO1xuXG4gIHJldHVybiB7IHUsIHosIHAsIGRhdGFBbGwgfTtcbn1cbiIsICJcbmltcG9ydCB7IG1lZGlhbiB9IGZyb20gJy4vbm9uLXBhcmFtZXRyaWMnO1xuXG5mdW5jdGlvbiByb3VuZChuOiBudW1iZXIpIHtcbiAgcmV0dXJuIG4gPCAxMCA/IG4udG9QcmVjaXNpb24oMikgOiBuIDwgMTAwID8gbi50b0ZpeGVkKDEpIDogbi50b0ZpeGVkKDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdHJpYihkYXRhOiBudW1iZXJbXVtdLCBiaW5Db3VudCA9IDI0LCBzaXplID0gWzMwMCwgMTUwXSwgY29sb3JzID0gWycjZTMwJywgJyMwM2UnXSwgbWFyZ2lucyA9IFszMCwgMjAsIDIwLCAyMF0sIHh0aXRsZT1cIm9wcy9zZWNcIikge1xuICBsZXQgbWluID0gSW5maW5pdHksIG1heCA9IC1JbmZpbml0eTtcbiAgZm9yIChsZXQgZGF0YVNldCBvZiBkYXRhKSB7XG4gICAgbWluID0gTWF0aC5taW4obWluLCAuLi5kYXRhU2V0KTtcbiAgICBtYXggPSBNYXRoLm1heChtYXgsIC4uLmRhdGFTZXQpO1xuICB9XG5cbiAgY29uc3QgbWVkaWFucyA9IGRhdGEubWFwKGRhdGFTZXQgPT4gbWVkaWFuKGRhdGFTZXQpKTtcbiAgY29uc3QgbG93ZXN0Rmlyc3QgPSBtZWRpYW5zWzBdIDw9IG1lZGlhbnNbMV0gPyAxIDogMDtcblxuICBjb25zdCByYW5nZSA9IG1heCAtIG1pbjtcbiAgY29uc3QgYmluU2l6ZSA9IHJhbmdlIC8gYmluQ291bnQ7XG4gIGNvbnN0IGFsbEJpbnMgPSBkYXRhLm1hcCgoKSA9PiBuZXcgQXJyYXkoYmluQ291bnQpLmZpbGwoMCkpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGRhdGFTZXQgPSBkYXRhW2ldO1xuICAgIGNvbnN0IGJpbnMgPSBhbGxCaW5zW2ldO1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgZGF0YVNldCkgYmluc1tNYXRoLm1pbihNYXRoLmZsb29yKCh2YWx1ZSAtIG1pbikgLyBiaW5TaXplKSwgYmluQ291bnQgLSAxKV0rKztcbiAgfVxuXG4gIGxldCBncmVhdGVzdCA9IDA7XG4gIGZvciAoY29uc3QgYmlucyBvZiBhbGxCaW5zKSBncmVhdGVzdCA9IE1hdGgubWF4KGdyZWF0ZXN0LCAuLi5iaW5zKTtcblxuICBjb25zdCBwbG90V2lkdGhQeCA9IHNpemVbMF0gLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXTtcbiAgY29uc3QgYmluV2lkdGhQeCA9IHBsb3RXaWR0aFB4IC8gYmluQ291bnQ7XG4gIGNvbnN0IHBsb3RIZWlnaHRQeCA9IHNpemVbMV0gLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXTtcbiAgY29uc3QgYmluVW5pdEhlaWdodFB4ID0gcGxvdEhlaWdodFB4IC8gZ3JlYXRlc3Q7XG5cbiAgY29uc3QgYmFzZWxpbmUgPSBzaXplWzFdIC0gbWFyZ2luc1syXTtcbiAgY29uc3Qgc21hbGxMYWJlbFN0eWxlID0gJ2ZvbnQ6IGJvbGQgOXB4IHNhbnMtc2VyaWYnO1xuICBjb25zdCBsYWJlbFN0eWxlID0gJ2ZvbnQ6IDEycHggc2Fucy1zZXJpZjsgbWFyZ2luOiAwIDRweDsnO1xuXG4gIHJldHVybiBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgXCItLy9XM0MvL0RURCBTVkcgMS4xLy9FTlwiIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkXCI+XG48c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgdmlld0JveD1cIjAgMCAke3NpemVbMF19ICR7c2l6ZVsxXX1cIiAgd2lkdGg9XCIke3NpemVbMF19XCIgaGVpZ2h0PVwiJHtzaXplWzFdfVwiPlxuXG4gIDwhLS0geCBheGlzIC0tPlxuICA8bGluZSB4MT1cIjBcIiB5MT1cIiR7YmFzZWxpbmV9XCIgeDI9XCIke3NpemVbMF19XCIgeTI9XCIke2Jhc2VsaW5lfVwiIHN0cm9rZT1cIiMwMDBcIi8+XG4gIDx0ZXh0IGRvbWluYW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgeD1cIiR7c2l6ZVswXSAqIC41fVwiIHk9XCIke2Jhc2VsaW5lICsgNn1cIiBzdHlsZT1cIiR7bGFiZWxTdHlsZX07IGZvbnQtd2VpZ2h0OiBib2xkXCI+JHt4dGl0bGV9PC90ZXh0PlxuXG4gIDxsaW5lIHgxPVwiJHttYXJnaW5zWzNdfVwiIHkxPVwiJHtiYXNlbGluZX1cIiB4Mj1cIiR7bWFyZ2luc1szXX1cIiB5Mj1cIiR7YmFzZWxpbmUgKyAzfVwiIHN0cm9rZT1cIiMwMDBcIi8+XG4gIDx0ZXh0IGRvbWluYW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgeD1cIiR7bWFyZ2luc1szXX1cIiB5PVwiJHtiYXNlbGluZSArIDZ9XCIgc3R5bGU9XCIke2xhYmVsU3R5bGV9XCI+JHtyb3VuZChtaW4pfTwvdGV4dD5cblxuICA8bGluZSB4MT1cIiR7c2l6ZVswXSAtIG1hcmdpbnNbMV19XCIgeTE9XCIke2Jhc2VsaW5lfVwiIHgyPVwiJHtzaXplWzBdIC0gbWFyZ2luc1sxXX1cIiB5Mj1cIiR7YmFzZWxpbmUgKyAzfVwiIHN0cm9rZT1cIiMwMDBcIi8+XG4gIDx0ZXh0IGRvbWluYW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgeD1cIiR7c2l6ZVswXSAtIG1hcmdpbnNbMV19XCIgeT1cIiR7YmFzZWxpbmUgKyA2fVwiIHN0eWxlPVwiJHtsYWJlbFN0eWxlfVwiPiR7cm91bmQobWF4KX08L3RleHQ+XG5cbiAgPCEtLSBkaXN0cmlidXRpb25zIC0tPlxuICAke2FsbEJpbnMubWFwKChiaW5zLCBpKSA9PiBgXG4gIDxwb2x5Z29uIHBvaW50cz1cIiR7bWFyZ2luc1szXX0sJHtiYXNlbGluZX0gJHtiaW5zLm1hcCgoY291bnQsIGopID0+IHtcbiAgICBjb25zdCB4MSA9IG1hcmdpbnNbM10gKyBqICogYmluV2lkdGhQeDtcbiAgICBjb25zdCB4MiA9IHgxICsgYmluV2lkdGhQeDtcbiAgICBjb25zdCB5ID0gc2l6ZVsxXSAtIG1hcmdpbnNbMl0gLSBjb3VudCAqIGJpblVuaXRIZWlnaHRQeDtcblxuICAgIHJldHVybiBgJHt4MX0sJHt5fSAke3gyfSwke3l9YFxuICB9KS5qb2luKCcgJyl9ICR7c2l6ZVswXSAtIG1hcmdpbnNbMV19LCR7YmFzZWxpbmV9XCIgZmlsbD1cIiR7Y29sb3JzW2ldfVwiIG9wYWNpdHk9XCIwLjVcIi8+XG4gIGApLmpvaW4oJ1xcbicpfVxuXG4gIDwhLS0gbWVkaWFucyAtLT5cbiAgJHttZWRpYW5zLm1hcCgobWVkaWFuLCBpKSA9PiB7XG4gICAgY29uc3QgeCA9IG1hcmdpbnNbM10gKyAobWVkaWFuIC0gbWluKSAvIHJhbmdlICogcGxvdFdpZHRoUHg7XG5cbiAgICByZXR1cm4gYFxuICA8bGluZSB4MT1cIiR7eH1cIiB5MT1cIiR7YmFzZWxpbmUgKyAzfVwiIHgyPVwiJHt4fVwiIHkyPVwiMFwiIHN0cm9rZT1cIiR7Y29sb3JzW2ldfVwiLz5cbiAgPHRleHQgZG9taW5hbnQtYmFzZWxpbmU9XCJoYW5naW5nXCIgeD1cIiR7eCArIChpICUgMiA9PT0gbG93ZXN0Rmlyc3QgPyAzIDogLTMpfVwiIHk9XCIkezB9XCIgc3R5bGU9XCIke3NtYWxsTGFiZWxTdHlsZX1cIiBmaWxsPVwiJHtjb2xvcnNbaV19XCIgdGV4dC1hbmNob3I9XCIke1tcInN0YXJ0XCIsIFwiZW5kXCJdWyhpICUgMiA9PT0gbG93ZXN0Rmlyc3QgPyAwIDogMSldfVwiPiR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfTwvdGV4dD5cbiAgPHRleHQgZG9taW5hbnQtYmFzZWxpbmU9XCJoYW5naW5nXCIgeD1cIiR7eCArIChpICUgMiA9PT0gbG93ZXN0Rmlyc3QgPyAzIDogLTMpfVwiIHk9XCIkezEwfVwiIHN0eWxlPVwiJHtsYWJlbFN0eWxlfVwiIGZpbGw9XCIke2NvbG9yc1tpXX1cIiB0ZXh0LWFuY2hvcj1cIiR7W1wic3RhcnRcIiwgXCJlbmRcIl1bKGkgJSAyID09PSBsb3dlc3RGaXJzdCA/IDAgOiAxKV19XCI+JHtyb3VuZChtZWRpYW4pfTwvdGV4dD5gXG4gIFxuICB9KX1cblxuPC9zdmc+YDtcbn1cbiIsICJcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnanNvbi1jdXN0b20tbnVtYmVycyc7XG5pbXBvcnQgeyBtZWRpYW4sIG1hbm5XaGl0bmV5VSB9IGZyb20gJy4vbm9uLXBhcmFtZXRyaWMnO1xuaW1wb3J0IHsgZGlzdHJpYiB9IGZyb20gJy4vZGlzdHJpYic7XG5cbmZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZycpIGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgKz1cbiAgICBhcmdzLm1hcChhID0+IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEgOiBKU09OLnN0cmluZ2lmeShhKSkuam9pbignICcpICsgJ1xcbic7XG59XG5cbmxldCB0MCwgdDE7XG50MCA9IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG53aGlsZSAodDAgPT09IHQxKSB7IHQxID0gcGVyZm9ybWFuY2Uubm93KCkgfTtcbmNvbnN0IG1zUmVzID0gdDEgLSB0MDtcbmNvbnN0IHVzUmVzID0gTWF0aC5yb3VuZChtc1JlcyAqIDFlMyk7XG5sb2coYFJlc29sdXRpb246ICR7dXNSZXN9XFx1MDNiY3NgKTtcblxuY29uc3QgdHJpYWxEdXJhdGlvbiA9IE1hdGgubWF4KG1zUmVzICogMTAwLCAyNSk7XG5sb2coYFRyaWFsIGR1cmF0aW9uOiAke3RyaWFsRHVyYXRpb259bXNgKTtcblxuY29uc3QgdHJpYWxzID0gMTAwO1xuXG5mdW5jdGlvbiBvcHNQZXJEdXJhdGlvbk1zKGZuOiAoKSA9PiBhbnksIGR1cmF0aW9uTXM6IG51bWJlciwgdG9OZWFyZXN0ID0gMTAsIG1heE9wcyA9IDJlOSkge1xuICBjb25zdCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG1heE9wczsgaSsrKSB7ICAvLyBpdCdzIGltcG9ydGFudCBmb3IgdmFyaW91cyByZWFzb25zIHRoYXQgaSBzdGFydHMgYXQgMSwgbm90IDBcbiAgICBmbigpO1xuICAgIGlmIChpICUgdG9OZWFyZXN0ID09PSAwICYmIHBlcmZvcm1hbmNlLm5vdygpIC0gdDAgPj0gZHVyYXRpb25NcykgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIG1heE9wcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZm9ydHlXaW5rcygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAwKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gY29tcGFyZSguLi5mbnM6ICgoKSA9PiBhbnkpW10pIHtcbiAgY29uc3QgZm5zTGVuZ3RoID0gZm5zLmxlbmd0aDtcblxuICBsZXQgcmVwcyA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm5zTGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmbiA9IGZuc1tpXTtcbiAgICBjb25zdCBmblJlcHMgPSBvcHNQZXJEdXJhdGlvbk1zKGZuLCB0cmlhbER1cmF0aW9uKTtcbiAgICBsb2coZm4udG9TdHJpbmcoKSwgYC0+ICR7Zm5SZXBzfSByZXBzL3RyaWFsYCk7XG4gICAgaWYgKGZuUmVwcyA+IHJlcHMpIHJlcHMgPSBmblJlcHM7XG4gICAgYXdhaXQgZm9ydHlXaW5rcygpO1xuICB9XG5cbiAgbG9nKGBVc2luZyAke3JlcHN9IHJlcHMvdHJpYWxgKTtcblxuICBjb25zdCB0UmVwczogW251bWJlcltdLCBudW1iZXJbXV0gPSBbW10sIFtdXTtcbiAgY29uc3QgdFJlcHNTdW06IG51bWJlcltdID0gWzAsIDBdO1xuICBjb25zdCB0UmVwc01lYW46IG51bWJlcltdID0gWzAsIDBdO1xuXG4gIGZvciAobGV0IHRyaWFsID0gMDsgdHJpYWwgPCB0cmlhbHM7IHRyaWFsKyspIHtcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgZm5zTGVuZ3RoOyBfaSsrKSB7XG4gICAgICAvLyBhbHRlcm5hdGUgZnVuY3Rpb25zIChub3RlOiBzdHJhbmdlbHksIHJhbmRvbSBhc3NpZ25tZW50IGRvZXNuJ3QgYXBwZWFyIHRvIHdvcmspXG4gICAgICBjb25zdCBpID0gdHJpYWwgJSAyID8gX2kgOiAxIC0gX2k7XG5cbiAgICAgIGNvbnN0IGZuID0gZm5zW2ldO1xuICAgICAgY29uc3QgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGZvciAobGV0IHJlcCA9IDA7IHJlcCA8IHJlcHM7IHJlcCsrKSBmbigpO1xuICAgICAgY29uc3QgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGNvbnN0IHQgPSB0MSAtIHQwO1xuICAgICAgY29uc3QgdFJlcCA9IDEgLyAodCAvIHJlcHMpO1xuICAgICAgdFJlcHNbaV1bdHJpYWxdID0gdFJlcDtcbiAgICAgIHRSZXBzU3VtW2ldICs9IHRSZXA7XG4gICAgICB0UmVwc01lYW5baV0gPSB0UmVwc1N1bVtpXSAvICh0cmlhbCArIDEpO1xuICAgIH07XG4gICAgLy8gbG9nKHRyaWFsLCB0UmVwc01lYW4pO1xuICAgIGF3YWl0IGZvcnR5V2lua3MoKTtcbiAgfVxuXG4gIGNvbnN0IHRSZXBzTWVkaWFucyA9IHRSZXBzLm1hcCh0UmVwID0+IG1lZGlhbih0UmVwKSk7XG4gIGNvbnN0IHRSZXBzVVN0YXRzID0gbWFubldoaXRuZXlVKHRSZXBzKTtcblxuICByZXR1cm4geyBtZWRpYW5zOiB0UmVwc01lZGlhbnMsIC4uLnRSZXBzVVN0YXRzLCB0UmVwcyB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBqc29uRG9jID0gYHtcIm51bWJlclwiOjEsXCJzdHJpbmdcIjpcIlRoZSBxdWljayBicm93biBmb3hcXFxcbmp1bXBzIG92ZXIgdGhlIGxhenkgZG9nIFxcXFx1MDNiY1wiLFwiYm9vbGVhblwiOnRydWUsXCJudWxsXCI6bnVsbH1gO1xuICBjb25zdCBqc29uRG9jU3BhY2VkID0gSlNPTi5zdHJpbmdpZnkoSlNPTi5wYXJzZShqc29uRG9jKSwgbnVsbCwgMik7XG5cbiAgY29uc3QgeyBtZWRpYW5zLCB1LCB6LCBwLCB0UmVwcyB9ID0gYXdhaXQgY29tcGFyZSgoKSA9PiBwYXJzZShqc29uRG9jKSwgKCkgPT4gcGFyc2UoanNvbkRvY1NwYWNlZCkpO1xuICBsb2coYG1lZGlhbjogJHttZWRpYW5zLmpvaW4oJywnKX0gIHU6ICR7dX0gIHo6ICR7en0gIHA6ICR7cH1gKTtcblxuICBjb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3ZnJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgY29uc3QgeG1sID0gZGlzdHJpYih0UmVwcyk7XG4gIGltZy5zcmMgPSAnZGF0YTppbWFnZS9zdmcreG1sLCcgKyBlbmNvZGVVUklDb21wb25lbnQoeG1sKTtcbiAgLy8gY29uc29sZS5sb2coeG1sKTtcblxuXG4gIGxldCBzaWcxID0gMCwgc2lnNSA9IDAsIHNpZzEwID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IHsgbWVkaWFucywgdSwgeiwgcCB9ID0gYXdhaXQgY29tcGFyZSgoKSA9PiBwYXJzZShqc29uRG9jKSwgKCkgPT4gcGFyc2UoanNvbkRvYykpO1xuICAgIGxvZyhgbWVkaWFuOiAke21lZGlhbnMuam9pbignLCcpfSAgdTogJHt1fSAgejogJHt6fSAgcDogJHtwfWApO1xuICAgIGlmIChwIDwgMC4wMSkgc2lnMSsrO1xuICAgIGlmIChwIDwgMC4wNSkgc2lnNSsrO1xuICAgIGlmIChwIDwgMC4xKSBzaWcxMCsrO1xuICAgIGxvZyhgJHtzaWcxfSBhdCAxJSwgJHtzaWc1fSBhdCA1JSwgJHtzaWcxMH0gYXQgMTAlIGFmdGVyICR7aSArIDF9IHJvdW5kc2ApO1xuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbWFpbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBYSxVQUFJLElBQUUsT0FBTztBQUFlLFVBQUksSUFBRSxPQUFPO0FBQXlCLFVBQUksSUFBRSxPQUFPO0FBQW9CLFVBQUksSUFBRSxPQUFPLFVBQVU7QUFBZSxVQUFJLElBQUUsd0JBQUMsR0FBRSxNQUFJO0FBQUMsaUJBQVEsS0FBSztBQUFFLFlBQUUsR0FBRSxHQUFFLEVBQUMsS0FBSSxFQUFFLENBQUMsR0FBRSxZQUFXLEtBQUUsQ0FBQztBQUFBLE1BQUMsR0FBdEQ7QUFBTixVQUE4RCxJQUFFLHdCQUFDLEdBQUUsR0FBRSxHQUFFLE1BQUk7QUFBQyxZQUFHLEtBQUcsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHO0FBQVcsbUJBQVEsS0FBSyxFQUFFLENBQUM7QUFBRSxhQUFDLEVBQUUsS0FBSyxHQUFFLENBQUMsS0FBRyxNQUFJLEtBQUcsRUFBRSxHQUFFLEdBQUUsRUFBQyxLQUFJLE1BQUksRUFBRSxDQUFDLEdBQUUsWUFBVyxFQUFFLElBQUUsRUFBRSxHQUFFLENBQUMsTUFBSSxFQUFFLFdBQVUsQ0FBQztBQUFFLGVBQU87QUFBQSxNQUFDLEdBQXJLO0FBQXVLLFVBQUksSUFBRSw4QkFBRyxFQUFFLEVBQUUsQ0FBQyxHQUFFLGNBQWEsRUFBQyxPQUFNLEtBQUUsQ0FBQyxHQUFFLENBQUMsR0FBcEM7QUFBc0MsVUFBSSxJQUFFLENBQUM7QUFBRSxRQUFFLEdBQUUsRUFBQyxnQkFBZSxNQUFJLEdBQUUsT0FBTSxNQUFJLEVBQUMsQ0FBQztBQUFFLGFBQU8sVUFBUSxFQUFFLENBQUM7QUFBRSxVQUFNLElBQU4sY0FBZ0IsTUFBSztBQUFBLE1BQUM7QUFBaEI7QUFBaUIsVUFBSTtBQUFKLFVBQU07QUFBTixVQUFRO0FBQVIsVUFBVTtBQUFWLFVBQVk7QUFBRSxVQUFNLElBQUU7QUFBUixVQUFvQyxJQUFFO0FBQXRDLFVBQXlHLElBQUU7QUFBM0csVUFBOEcsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLE1BQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFBLEdBQzMyQixHQUFFLEdBQUUsR0FBRSxNQUFLLEdBQUUsR0FBRztBQURpZ0IsVUFDL2YsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxNQUFLLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLEtBQUs7QUFENk4sVUFDM04sSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxLQUFJLEtBQUksTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLElBQUk7QUFEakQsVUFDbUQsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEdBQUc7QUFEdlMs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LFVBQU0sZ0JBQWdCLEtBQUssVUFBVSxLQUFLLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUVqRSxVQUFNLEVBQUUsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNLElBQUksTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNsRyxRQUFJLFdBQVcsUUFBUSxLQUFLLEdBQUcsU0FBUyxTQUFTLFNBQVMsR0FBRztBQUU3RCxVQUFNLE1BQU0sU0FBUyxjQUFjLE1BQU07QUFDekMsVUFBTSxNQUFNLFFBQVEsS0FBSztBQUN6QixRQUFJLE1BQU0sd0JBQXdCLG1CQUFtQixHQUFHO0FBSXhELFFBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxRQUFRO0FBQ2hDLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLFlBQU0sRUFBRSxTQUFBRSxVQUFTLEdBQUFDLElBQUcsR0FBQUMsSUFBRyxHQUFBQyxHQUFFLElBQUksTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUNyRixVQUFJLFdBQVdILFNBQVEsS0FBSyxHQUFHLFNBQVNDLFVBQVNDLFVBQVNDLElBQUc7QUFDN0QsVUFBSUEsS0FBSTtBQUFNO0FBQ2QsVUFBSUEsS0FBSTtBQUFNO0FBQ2QsVUFBSUEsS0FBSTtBQUFLO0FBQ2IsVUFBSSxHQUFHLGVBQWUsZUFBZSxzQkFBc0IsSUFBSSxVQUFVO0FBQUEsSUFDM0U7QUFBQSxFQUNGO0FBdEJlO0FBd0JmLFNBQU8saUJBQWlCLFFBQVEsSUFBSTsiLAogICJuYW1lcyI6IFsibW9kIiwgImkiLCAicjAiLCAicjEiLCAibWVkaWFuIiwgInQwIiwgInQxIiwgIm1lZGlhbnMiLCAidSIsICJ6IiwgInAiXQp9Cg==
