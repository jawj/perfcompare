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

  // stats.ts
  function median(data, destructive = false) {
    if (!destructive)
      data = data.slice();
    const { length } = data;
    data.sort((a, b) => a - b);
    return length % 2 === 1 ? data[(length - 1) * 0.5] : 0.5 * data[length * 0.5 - 1] + 0.5 * data[length * 0.5];
  }
  __name(median, "median");
  function mannWhitneyU(data) {
    const data0 = data[0].map((value) => ({ value, source: 0, rank: 0 }));
    const data1 = data[1].map((value) => ({ value, source: 1, rank: 0 }));
    const dataAll = data0.concat(data1);
    dataAll.sort((a, b) => a.value - b.value);
    const n = dataAll.length;
    for (let i = 1; i < n; i++) {
      const current = dataAll[i];
      const prev = dataAll[i - 1];
      current.rank = prev.value === current.value ? prev.rank + 1 : 0;
    }
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
      const tiedRank = rank - prevSame * 0.5;
      const lowestTied = i - prevSame - 1;
      while (i > lowestTied)
        dataAll[i--].rank = tiedRank;
      i++;
    }
    const rs = dataAll.reduce(([r0, r1], { source, rank }) => source === 0 ? [r0 + rank, r1] : [r0, r1 + rank], [0, 0]);
    const n0 = data0.length;
    const n1 = data1.length;
    const u0 = rs[0] - n0 * (n0 + 1) * 0.5;
    const u1 = rs[1] - n1 * (n1 + 1) * 0.5;
    const u = Math.min(u0, u1);
    const mu = 0.5 * n0 * n1;
    const stdDev = Math.sqrt(n0 * n1 * (n * n * n - n - tieSum) / (12 * n * (n - 1)));
    const z = (mu - u - 0.5) / stdDev;
    const p95 = z > 1.96;
    const p99 = z > 2.58;
    return { u, z, p95, p99, u0, u1, dataAll };
  }
  __name(mannWhitneyU, "mannWhitneyU");

  // index.ts
  function log(...args) {
    document.querySelector("body").innerText += args.map((a) => typeof a === "string" ? a : JSON.stringify(a)).join(" ") + "\n";
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
    return { medians: tRepsMedians, ...tRepsUStats };
  }
  __name(compare, "compare");
  async function main() {
    const jsonDoc = `{"number":1,"string":"The quick brown fox\\njumps over the lazy dog \\u03bc","boolean":true,"null":null}`;
    const jsonDocSpaced = JSON.stringify(JSON.parse(jsonDoc), null, 2);
    const { medians, u, z, p95, p99 } = await compare(() => parse(jsonDoc), () => parse(jsonDocSpaced));
    log(`median: ${medians.join(",")}  u: ${u}  z: ${z}`);
    let sig1 = 0, sig5 = 0;
    for (let i = 0; i < 100; i++) {
      const { medians: medians2, u: u2, z: z2, p95: p952, p99: p992 } = await compare(() => parse(jsonDoc), () => parse(jsonDoc));
      log(`median: ${medians2.join(",")}  u: ${u2}  z: ${z2}`);
      if (p992)
        sig1++;
      if (p952)
        sig5++;
      log(`${sig1} at 1% level, ${sig5} at 5% level after ${i + 1} rounds`);
    }
  }
  __name(main, "main");
  main();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2pzb24tY3VzdG9tLW51bWJlcnMvZGlzdC9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvanNvbi1jdXN0b20tbnVtYmVycy9kaXN0L3BhcnNlLm1qcyIsICJzdGF0cy50cyIsICJpbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7dmFyIHA9T2JqZWN0LmRlZmluZVByb3BlcnR5O3ZhciBqPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7dmFyIG09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7dmFyIEk9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIgVT0obixjKT0+e2Zvcih2YXIgaSBpbiBjKXAobixpLHtnZXQ6Y1tpXSxlbnVtZXJhYmxlOiEwfSl9LFM9KG4sYyxpLHMpPT57aWYoYyYmdHlwZW9mIGM9PVwib2JqZWN0XCJ8fHR5cGVvZiBjPT1cImZ1bmN0aW9uXCIpZm9yKGxldCBkIG9mIG0oYykpIUkuY2FsbChuLGQpJiZkIT09aSYmcChuLGQse2dldDooKT0+Y1tkXSxlbnVtZXJhYmxlOiEocz1qKGMsZCkpfHxzLmVudW1lcmFibGV9KTtyZXR1cm4gbn07dmFyIE49bj0+UyhwKHt9LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLG4pO3ZhciBGPXt9O1UoRix7SlNPTlBhcnNlRXJyb3I6KCk9PmsscGFyc2U6KCk9PkJ9KTttb2R1bGUuZXhwb3J0cz1OKEYpO2NsYXNzIGsgZXh0ZW5kcyBFcnJvcnt9bGV0IHIsdCxvLEMsQTtjb25zdCB4PS9bXlwiXFxcXFxcblxcdFxcdTAwMDAtXFx1MDAxZl0qL3ksdz0vLT8oMHxbMS05XVswLTldKikoWy5dWzAtOV0rKT8oW2VFXVstK10/WzAtOV0rKT98dHJ1ZXxmYWxzZXxudWxsL3ksZT1cIlwiLE89W2UsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsJ1wiJyxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxcIi9cIixlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsXCJcXFxcXCIsZSxlLGUsZSxlLFwiXFxiXCIsZSxlLGUsXCJcXGZcIixlLGUsZSxlLGUsZSxlLGBcbmAsZSxlLGUsXCJcXHJcIixlLFwiXHRcIl0sUj1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSw0MDk3LDgxOTMsMTIyODksMTYzODUsMjA0ODEsMjQ1NzcsMjg2NzMsMzI3NjksMzY4NjUsMCwwLDAsMCwwLDAsMCw0MDk2MSw0NTA1Nyw0OTE1Myw1MzI0OSw1NzM0NSw2MTQ0MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNDA5NjEsNDUwNTcsNDkxNTMsNTMyNDksNTczNDUsNjE0NDFdLEw9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMjU3LDUxMyw3NjksMTAyNSwxMjgxLDE1MzcsMTc5MywyMDQ5LDIzMDUsMCwwLDAsMCwwLDAsMCwyNTYxLDI4MTcsMzA3MywzMzI5LDM1ODUsMzg0MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMjU2MSwyODE3LDMwNzMsMzMyOSwzNTg1LDM4NDFdLFg9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMTcsMzMsNDksNjUsODEsOTcsMTEzLDEyOSwxNDUsMCwwLDAsMCwwLDAsMCwxNjEsMTc3LDE5MywyMDksMjI1LDI0MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTYxLDE3NywxOTMsMjA5LDIyNSwyNDFdLEo9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDAsMCwwLDAsMCwwLDAsMTEsMTIsMTMsMTQsMTUsMTYsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDExLDEyLDEzLDE0LDE1LDE2XTtmdW5jdGlvbiBhKG4pe3Rocm93IG5ldyBrKG4rYFxuQXQgY2hhcmFjdGVyIGArcitcIiBpbiBKU09OOiBcIitvKX1mdW5jdGlvbiB1KG4pe3JldHVybiB0Pj0wP1wiJ1wiKyhufHxcIlwiKStTdHJpbmcuZnJvbUNoYXJDb2RlKHQpK1wiJ1wiOlwiZW5kIG9mIGlucHV0XCJ9ZnVuY3Rpb24gRCgpe2xldCBuO2NvbnN0IGM9ci0xO3cubGFzdEluZGV4PWMsdy50ZXN0KG8pfHxhKFwiVW5leHBlY3RlZCBjaGFyYWN0ZXIgb3IgZW5kIG9mIGlucHV0XCIpO2NvbnN0e2xhc3RJbmRleDppfT13O2lmKHQ8MTAyKXtjb25zdCBzPW8uc2xpY2UoYyxpKTtuPUM/QyhzKTorc31lbHNlIG49dD09PTExMD9udWxsOnQ9PT0xMTY7cmV0dXJuIHI9aSx0PW8uY2hhckNvZGVBdChyKyspLG59ZnVuY3Rpb24gZigpe2EoXCJJbnZhbGlkIFxcXFx1WFhYWCBlc2NhcGUgaW4gc3RyaW5nXCIpfWZ1bmN0aW9uIEUoKXtsZXQgbj1cIlwiO2Zvcig7Oyl7eC5sYXN0SW5kZXg9cix4LnRlc3Qobyk7Y29uc3R7bGFzdEluZGV4OmN9PXg7c3dpdGNoKGM+ciYmKG4rPW8uc2xpY2UocixjKSxyPWMpLHQ9by5jaGFyQ29kZUF0KHIrKyksdCl7Y2FzZSAzNDpyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Nhc2UgOTI6dD1vLmNoYXJDb2RlQXQocisrKSxuKz10PT09MTE3P1N0cmluZy5mcm9tQ2hhckNvZGUoKFJbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpKyhMW28uY2hhckNvZGVBdChyKyspXXx8ZigpKSsoWFtvLmNoYXJDb2RlQXQocisrKV18fGYoKSkrKEpbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpLTQpOk9bdF18fGEoXCJJbnZhbGlkIGVzY2FwZSBzZXF1ZW5jZSBcIit1KFwiXFxcXFwiKStcIiBpbiBzdHJpbmdcIik7Y29udGludWU7ZGVmYXVsdDppc05hTih0KSYmYShcIlVudGVybWluYXRlZCBzdHJpbmdcIik7Y29uc3QgaT10PT09MTA/XCJuZXdsaW5lXCI6dD09PTk/XCJ0YWJcIjpcImNvbnRyb2wgY2hhcmFjdGVyXCIscz10LnRvU3RyaW5nKDE2KSxkPVwiMDAwMFwiLnNsaWNlKHMubGVuZ3RoKStzO2EoXCJJbnZhbGlkIHVuZXNjYXBlZCBcIitpK1wiIChcXFxcdVwiK2QrXCIpIGluIHN0cmluZ1wiKX19fWZ1bmN0aW9uIFAoKXtjb25zdCBuPVtdO2xldCBjPTA7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKTtpZih0PT09OTMpcmV0dXJuIHQ9by5jaGFyQ29kZUF0KHIrKyksbjtmb3IoO3Q+PTA7KXtmb3IobltjKytdPWcoKTt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2lmKHQ9PT05MylyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO3QhPT00NCYmYShcIkV4cGVjdGVkICcsJyBidXQgZ290IFwiK3UoKStcIiBhZnRlciBhcnJheSBlbGVtZW50XCIpO2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSl9YShcIlVudGVybWluYXRlZCBhcnJheVwiKX1mdW5jdGlvbiBxKCl7Y29uc3Qgbj17fTtkbyB0PW8uY2hhckNvZGVBdChyKyspO3doaWxlKHQ8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSkpO2lmKHQ9PT0xMjUpcmV0dXJuIHQ9by5jaGFyQ29kZUF0KHIrKyksbjtmb3IoO3Q9PT0zNDspe2NvbnN0IGM9RSgpO2Zvcig7dDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KTspdD1vLmNoYXJDb2RlQXQocisrKTtmb3IodCE9PTU4JiZhKFwiRXhwZWN0ZWQgJzonIGJ1dCBnb3QgXCIrdSgpK1wiIGFmdGVyIGtleSBpbiBvYmplY3RcIiksdD1vLmNoYXJDb2RlQXQocisrKSxuW2NdPWcoKTt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2lmKHQ9PT0xMjUpcmV0dXJuIHQ9by5jaGFyQ29kZUF0KHIrKyksbjt0IT09NDQmJmEoXCJFeHBlY3RlZCAnLCcgYnV0IGdvdCBcIit1KCkrXCIgYWZ0ZXIgdmFsdWUgaW4gb2JqZWN0XCIpO2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSl9YShgRXhwZWN0ZWQgJ1wiJyBidXQgZ290IGArdSgpK1wiIGluIG9iamVjdFwiKX1mdW5jdGlvbiBnKCl7Zm9yKDt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO3N3aXRjaCh0KXtjYXNlIDM0OnJldHVybiBFKCk7Y2FzZSAxMjM6cmV0dXJuIHEoKTtjYXNlIDkxOnJldHVybiBQKCk7ZGVmYXVsdDpyZXR1cm4gRCgpfX1mdW5jdGlvbiBCKG4sYyxpKXtuIGluc3RhbmNlb2YgVWludDhBcnJheSYmKG49KEEhPW51bGw/QTpBPW5ldyBUZXh0RGVjb2RlcikuZGVjb2RlKG4pKSx0eXBlb2YgbiE9XCJzdHJpbmdcIiYmYShcIkpTT04gbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyIG9yIFVpbnQ4QXJyYXlcIikscj0wLHQ9MzIsbz1uLEM9aTtjb25zdCBzPWcoKTtmb3IoO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7cmV0dXJuIHQ+PTAmJmEoXCJVbmV4cGVjdGVkIGRhdGEgYXQgZW5kIG9mIGlucHV0XCIpLHR5cGVvZiBjPT1cImZ1bmN0aW9uXCI/ZnVuY3Rpb24gZChiLHkpe2NvbnN0IGw9Ylt5XTtpZihsJiZ0eXBlb2YgbD09XCJvYmplY3RcIil7Zm9yKGNvbnN0IGggaW4gbClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobCxoKSl7Y29uc3Qgdj1kKGwsaCk7diE9PXZvaWQgMD9sW2hdPXY6ZGVsZXRlIGxbaF19fXJldHVybiBjLmNhbGwoYix5LGwpfSh7XCJcIjpzfSxcIlwiKTpzfVxuIiwgImltcG9ydCBtb2QgZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgbW9kO1xuZXhwb3J0IGNvbnN0IEpTT05QYXJzZUVycm9yID0gbW9kLkpTT05QYXJzZUVycm9yO1xuZXhwb3J0IGNvbnN0IHBhcnNlID0gbW9kLnBhcnNlO1xuIiwgIlxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhbmNlKGRhdGE6IG51bWJlcltdLCBtZWFuID0gZGF0YS5yZWR1Y2UoKG1lbW8sIG4pID0+IG1lbW8gKyBuLCAwKSAvIGRhdGEubGVuZ3RoKSB7XG4gIHJldHVybiBkYXRhLnJlZHVjZSgobWVtbywgbikgPT4ge1xuICAgIGNvbnN0IGRldiA9IG4gLSBtZWFuO1xuICAgIGNvbnN0IHNxRGV2ID0gZGV2ICogZGV2O1xuICAgIHJldHVybiBtZW1vICsgc3FEZXY7XG4gIH0sIDApIC8gKGRhdGEubGVuZ3RoIC0gMSk7ICAvLyBuIC0gMSBpcyB0aGUgYXBwcm9wcmlhdGUgZGVub21pbmF0b3Igd2hlbiB3b3JraW5nIHdpdGggYSBzYW1wbGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lZGlhbihkYXRhOiBudW1iZXJbXSwgZGVzdHJ1Y3RpdmUgPSBmYWxzZSkge1xuICBpZiAoIWRlc3RydWN0aXZlKSBkYXRhID0gZGF0YS5zbGljZSgpO1xuICBjb25zdCB7IGxlbmd0aCB9ID0gZGF0YTtcbiAgZGF0YS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gIHJldHVybiBsZW5ndGggJSAyID09PSAxID9cbiAgICBkYXRhWyhsZW5ndGggLSAxKSAqIC41XSA6XG4gICAgLjUgKiBkYXRhW2xlbmd0aCAqIC41IC0gMV0gKyAuNSAqIGRhdGFbbGVuZ3RoICogLjVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFubldoaXRuZXlVKGRhdGE6IFtudW1iZXJbXSwgbnVtYmVyW11dKSB7XG4gIC8vIGhhbmR5IGZvciBjb21wYXJpc29uOiBSIG9yIGh0dHBzOi8vd3d3LnN0YXRza2luZ2RvbS5jb20vMTcwbWVkaWFuX21hbm5fd2hpdG5leS5odG1sXG4gIGNvbnN0IGRhdGEwID0gZGF0YVswXS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIHNvdXJjZTogMCwgcmFuazogMCB9KSk7XG4gIGNvbnN0IGRhdGExID0gZGF0YVsxXS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIHNvdXJjZTogMSwgcmFuazogMCB9KSk7XG4gIGNvbnN0IGRhdGFBbGwgPSBkYXRhMC5jb25jYXQoZGF0YTEpIGFzIHR5cGVvZiBkYXRhMDtcbiAgZGF0YUFsbC5zb3J0KChhLCBiKSA9PiBhLnZhbHVlIC0gYi52YWx1ZSk7XG4gIGNvbnN0IG4gPSBkYXRhQWxsLmxlbmd0aDtcbiAgLy8gaXRlcmF0ZSBmb3J3YXJkcywgY291bnRpbmcgaWRlbnRpY2FsIHByZXZpb3VzIHZhbHVlcyAoYW5kIHN0dWZmaW5nIHRoZW0gaW4gdGhlIHJhbmsgZmllbGQpXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRhdGFBbGxbaV07XG4gICAgY29uc3QgcHJldiA9IGRhdGFBbGxbaSAtIDFdO1xuICAgIGN1cnJlbnQucmFuayA9IHByZXYudmFsdWUgPT09IGN1cnJlbnQudmFsdWUgPyBwcmV2LnJhbmsgKyAxIDogMDtcbiAgfVxuICAvLyBpdGVyYXRlIGJhY2t3YXJkcywgZmlsbGluZyBpbiB0aGUgcmFuayBmaWVsZCBjb3JyZWN0bHksIGluY2x1ZGluZyB0aWVzXG4gIGxldCB0aWVTdW0gPSAwO1xuICBmb3IgKGxldCBpID0gbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgcmFuayA9IGkgKyAxO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBkYXRhQWxsW2ldO1xuICAgIGNvbnN0IHByZXZTYW1lID0gY3VycmVudC5yYW5rO1xuICAgIGlmIChwcmV2U2FtZSA9PT0gMCkge1xuICAgICAgY3VycmVudC5yYW5rID0gcmFuaztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0aWVTdW0gKz0gcHJldlNhbWUgKiBwcmV2U2FtZSAqIHByZXZTYW1lIC0gcHJldlNhbWU7XG4gICAgY29uc3QgdGllZFJhbmsgPSByYW5rIC0gcHJldlNhbWUgKiAuNTtcbiAgICBjb25zdCBsb3dlc3RUaWVkID0gaSAtIHByZXZTYW1lIC0gMTtcbiAgICB3aGlsZSAoaSA+IGxvd2VzdFRpZWQpIGRhdGFBbGxbaS0tXS5yYW5rID0gdGllZFJhbms7XG4gICAgaSsrOyAgLy8gYmVjYXVzZSBpdCdzIGFib3V0IHRvIGJlIGRlY3JlbWVudGVkIGFnYWluXG4gIH1cblxuICAvLyBzdW0gcmFua3MgYnkgZGF0YSBzb3VyY2VcbiAgY29uc3QgcnMgPSBkYXRhQWxsLnJlZHVjZSgoW3IwLCByMV0sIHsgc291cmNlLCByYW5rIH0pID0+XG4gICAgc291cmNlID09PSAwID8gW3IwICsgcmFuaywgcjFdIDogW3IwLCByMSArIHJhbmtdLCBbMCwgMF0pO1xuXG4gIC8vIGNhbGN1bGF0ZSBVXG4gIGNvbnN0IG4wID0gZGF0YTAubGVuZ3RoO1xuICBjb25zdCBuMSA9IGRhdGExLmxlbmd0aDtcbiAgY29uc3QgdTAgPSByc1swXSAtIG4wICogKG4wICsgMSkgKiAuNTtcbiAgY29uc3QgdTEgPSByc1sxXSAtIG4xICogKG4xICsgMSkgKiAuNTtcbiAgY29uc3QgdSA9IE1hdGgubWluKHUwLCB1MSk7XG5cbiAgLy8gaHR0cDovL3VzZXJzLnN1c3NleC5hYy51ay9+Z3JhaGFtaC9STTF3ZWIvV2lsY294b24lMjBMYXJnZSUyME4lMjAyMDA5LnBkZlxuICBjb25zdCBtdSA9IC41ICogbjAgKiBuMTtcbiAgY29uc3Qgc3RkRGV2ID0gTWF0aC5zcXJ0KCgobjAgKiBuMSkgKiAobiAqIG4gKiBuIC0gbiAtIHRpZVN1bSkpIC8gKDEyICogbiAqIChuIC0gMSkpKTtcbiAgY29uc3QgeiA9IChtdSAtIHUgLSAuNSkgLyBzdGREZXY7XG4gIGNvbnN0IHA5NSA9IHogPiAxLjk2O1xuICBjb25zdCBwOTkgPSB6ID4gMi41ODtcblxuICAvLyBub3cgKGZvciBhIHR3by10YWlsZWQgdGVzdCksIGlmIHogPiAxLjk2LCBwIDwgMC41IGFuZCBpZiB6ID4gMi41OCwgcCA8IDAuMDFcbiAgcmV0dXJuIHsgdSwgeiwgcDk1LCBwOTksIHUwLCB1MSwgZGF0YUFsbCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdFRlc3RUKG1lYW5zOiBudW1iZXJbXSwgdmFyaWFuY2VzOiBudW1iZXJbXSwgbnM6IG51bWJlcltdKSB7XG4gIC8vIGh0dHBzOi8vcHN5dGVhY2hyLmdpdGh1Yi5pby9oYW5keXdvcmtib29rL2JldHdlZW4tc3ViamVjdHMtd2VsY2hzLXQtdGVzdC5odG1sXG4gIHJldHVybiAobWVhbnNbMF0gLSBtZWFuc1sxXSkgLyBNYXRoLnNxcnQoKHZhcmlhbmNlc1swXSAvIG5zWzBdKSArICh2YXJpYW5jZXNbMV0gLyBuc1sxXSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdFRlc3REZih2YXJpYW5jZXM6IG51bWJlcltdLCBuczogbnVtYmVyW10pIHtcbiAgY29uc3QgYTAgPSB2YXJpYW5jZXNbMF0gLyBuc1swXTtcbiAgY29uc3QgYTEgPSB2YXJpYW5jZXNbMV0gLyBuc1sxXTtcbiAgY29uc3QgYiA9IGEwICsgYTE7XG4gIGNvbnN0IGMwID0gYTAgKiBhMDtcbiAgY29uc3QgYzEgPSBhMSAqIGExO1xuICByZXR1cm4gKGIgKiBiKSAvICgoYzAgLyAobnNbMF0gLSAxKSkgKyAoYzEgLyAobnNbMV0gLSAxKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nR2FtbWEoejogbnVtYmVyKSB7XG4gIHJldHVybiAoeiAtIDAuNSkgKiBNYXRoLmxvZyh6ICsgNC41KSAtICh6ICsgNC41KSArIE1hdGgubG9nKCgxICsgNzYuMTgwMDkxNzMgLyB6IC0gODYuNTA1MzIwMzMgLyAoeiArIDEpICsgMjQuMDE0MDk4MjIgLyAoeiArIDIpIC0gMS4yMzE3Mzk1MTYgLyAoeiArIDMpICsgMC4wMDEyMDg1ODAwMyAvICh6ICsgNCkgLSAwLjAwMDAwNTM2MzgyIC8gKHogKyA1KSkgKiAyLjUwNjYyODI3NDY1KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJldEluYyh4OiBudW1iZXIsIGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gIGxldCBhMCwgYTEsIGEyLCBiMCwgYjEsIGM5LCBtOTtcbiAgYTAgPSAobTkgPSAoYTIgPSAwKSk7XG4gIGIwID0gKGExID0gKGIxID0gMSkpO1xuICB3aGlsZSAoTWF0aC5hYnMoKGExIC0gYTIpIC8gYTEpID4gMC4wMDAwMSkge1xuICAgIGEyID0gYTE7XG4gICAgYzkgPSAtKGEgKyBtOSkgKiAoYSArIGIgKyBtOSkgKiB4IC8gKGEgKyAyICogbTkpIC8gKGEgKyAyICogbTkgKyAxKTtcbiAgICBhMCA9IGExICsgYzkgKiBhMDtcbiAgICBiMCA9IGIxICsgYzkgKiBiMDtcbiAgICBtOSA9IG05ICsgMTtcbiAgICBjOSA9IG05ICogKGIgLSBtOSkgKiB4IC8gKGEgKyAyICogbTkgLSAxKSAvIChhICsgMiAqIG05KTtcbiAgICBhMSA9IGEwICsgYzkgKiBhMTtcbiAgICBiMSA9IGIwICsgYzkgKiBiMTtcbiAgICBhMCA9IGEwIC8gYjE7XG4gICAgYjAgPSBiMCAvIGIxO1xuICAgIGExID0gYTEgLyBiMTtcbiAgICBiMSA9IDE7XG4gIH1cbiAgcmV0dXJuIGExIC8gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBGb3JUKHh2OiBudW1iZXIsIGRmOiBudW1iZXIsIHRhaWxzOiBudW1iZXIpIHtcbiAgLy8gYWRhcHRlZCBmcm9tIGh0dHA6Ly93d3cubWF0aC51Y2xhLmVkdS9+dG9tL2Rpc3RyaWJ1dGlvbnMvdERpc3QuaHRtbFxuICBsZXQgYSwgcywgeiwgYnQsIGJldGFjZGY7XG4gIGEgPSBkZiAvIDI7XG4gIHMgPSBhICsgMC41O1xuICB6ID0gZGYgLyAoZGYgKyB4diAqIHh2KTtcbiAgYnQgPSBNYXRoLmV4cChsb2dHYW1tYShzKSAtIGxvZ0dhbW1hKDAuNSkgLSBsb2dHYW1tYShhKSArIGEgKiBNYXRoLmxvZyh6KSArIDAuNSAqIE1hdGgubG9nKDEgLSB6KSk7XG4gIGJldGFjZGYgPSB6IDwgKGEgKyAxKSAvIChzICsgMikgPyBidCAqIGJldEluYyh6LCBhLCAwLjUpIDogMSAtIGJ0ICogYmV0SW5jKDEgLSB6LCAwLjUsIGEpO1xuICByZXR1cm4gdGFpbHMgKiBiZXRhY2RmIC8gMjtcbn07IiwgIlxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdqc29uLWN1c3RvbS1udW1iZXJzJztcbmltcG9ydCB7IHZhcmlhbmNlLCB0VGVzdFQsIHRUZXN0RGYsIHBGb3JULCBtZWRpYW4sIG1hbm5XaGl0bmV5VSB9IGZyb20gJy4vc3RhdHMnO1xuXG5mdW5jdGlvbiBsb2coLi4uYXJnczogYW55W10pIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIS5pbm5lclRleHQgKz1cbiAgICBhcmdzLm1hcChhID0+IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEgOiBKU09OLnN0cmluZ2lmeShhKSkuam9pbignICcpICsgJ1xcbic7XG59XG5cbmxldCB0MCwgdDE7XG50MCA9IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG53aGlsZSAodDAgPT09IHQxKSB7IHQxID0gcGVyZm9ybWFuY2Uubm93KCkgfTtcbmNvbnN0IG1zUmVzID0gdDEgLSB0MDtcbmNvbnN0IHVzUmVzID0gTWF0aC5yb3VuZChtc1JlcyAqIDFlMyk7XG5sb2coYFJlc29sdXRpb246ICR7dXNSZXN9XFx1MDNiY3NgKTtcblxuY29uc3QgdHJpYWxEdXJhdGlvbiA9IE1hdGgubWF4KG1zUmVzICogMTAwLCAyNSk7XG5sb2coYFRyaWFsIGR1cmF0aW9uOiAke3RyaWFsRHVyYXRpb259bXNgKTtcblxuY29uc3QgdHJpYWxzID0gMTAwO1xuXG5mdW5jdGlvbiBvcHNQZXJEdXJhdGlvbk1zKGZuOiAoKSA9PiBhbnksIGR1cmF0aW9uTXM6IG51bWJlciwgdG9OZWFyZXN0ID0gMTAsIG1heE9wcyA9IDJlOSkge1xuICBjb25zdCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG1heE9wczsgaSsrKSB7ICAvLyBpdCdzIGltcG9ydGFudCBmb3IgdmFyaW91cyByZWFzb25zIHRoYXQgaSBzdGFydHMgYXQgMSwgbm90IDBcbiAgICBmbigpO1xuICAgIGlmIChpICUgdG9OZWFyZXN0ID09PSAwICYmIHBlcmZvcm1hbmNlLm5vdygpIC0gdDAgPj0gZHVyYXRpb25NcykgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIG1heE9wcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZm9ydHlXaW5rcygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAwKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gY29tcGFyZSguLi5mbnM6ICgoKSA9PiBhbnkpW10pIHtcbiAgY29uc3QgZm5zTGVuZ3RoID0gZm5zLmxlbmd0aDtcblxuICBsZXQgcmVwcyA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm5zTGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmbiA9IGZuc1tpXTtcbiAgICBjb25zdCBmblJlcHMgPSBvcHNQZXJEdXJhdGlvbk1zKGZuLCB0cmlhbER1cmF0aW9uKTtcbiAgICBsb2coZm4udG9TdHJpbmcoKSwgYC0+ICR7Zm5SZXBzfSByZXBzL3RyaWFsYCk7XG4gICAgaWYgKGZuUmVwcyA+IHJlcHMpIHJlcHMgPSBmblJlcHM7XG4gICAgYXdhaXQgZm9ydHlXaW5rcygpO1xuICB9XG5cbiAgbG9nKGBVc2luZyAke3JlcHN9IHJlcHMvdHJpYWxgKTtcblxuICBjb25zdCB0UmVwczogW251bWJlcltdLCBudW1iZXJbXV0gPSBbW10sIFtdXTtcbiAgY29uc3QgdFJlcHNTdW06IG51bWJlcltdID0gWzAsIDBdO1xuICBjb25zdCB0UmVwc01lYW46IG51bWJlcltdID0gWzAsIDBdO1xuXG4gIGZvciAobGV0IHRyaWFsID0gMDsgdHJpYWwgPCB0cmlhbHM7IHRyaWFsKyspIHtcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgZm5zTGVuZ3RoOyBfaSsrKSB7XG4gICAgICAvLyBhbHRlcm5hdGUgZnVuY3Rpb25zIChub3RlOiBzdHJhbmdlbHksIHJhbmRvbSBhc3NpZ25tZW50IGRvZXNuJ3QgYXBwZWFyIHRvIHdvcmspXG4gICAgICBjb25zdCBpID0gdHJpYWwgJSAyID8gX2kgOiAxIC0gX2k7XG5cbiAgICAgIGNvbnN0IGZuID0gZm5zW2ldO1xuICAgICAgY29uc3QgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGZvciAobGV0IHJlcCA9IDA7IHJlcCA8IHJlcHM7IHJlcCsrKSBmbigpO1xuICAgICAgY29uc3QgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGNvbnN0IHQgPSB0MSAtIHQwO1xuICAgICAgY29uc3QgdFJlcCA9IDEgLyAodCAvIHJlcHMpO1xuICAgICAgdFJlcHNbaV1bdHJpYWxdID0gdFJlcDtcbiAgICAgIHRSZXBzU3VtW2ldICs9IHRSZXA7XG4gICAgICB0UmVwc01lYW5baV0gPSB0UmVwc1N1bVtpXSAvICh0cmlhbCArIDEpO1xuICAgIH07XG4gICAgLy8gbG9nKHRyaWFsLCB0UmVwc01lYW4pO1xuICAgIGF3YWl0IGZvcnR5V2lua3MoKTtcbiAgfVxuXG4gIGNvbnN0IHRSZXBzTWVkaWFucyA9IHRSZXBzLm1hcCh0UmVwID0+IG1lZGlhbih0UmVwKSk7XG4gIGNvbnN0IHRSZXBzVVN0YXRzID0gbWFubldoaXRuZXlVKHRSZXBzKTtcblxuICByZXR1cm4geyBtZWRpYW5zOiB0UmVwc01lZGlhbnMsIC4uLnRSZXBzVVN0YXRzIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IGpzb25Eb2MgPSBge1wibnVtYmVyXCI6MSxcInN0cmluZ1wiOlwiVGhlIHF1aWNrIGJyb3duIGZveFxcXFxuanVtcHMgb3ZlciB0aGUgbGF6eSBkb2cgXFxcXHUwM2JjXCIsXCJib29sZWFuXCI6dHJ1ZSxcIm51bGxcIjpudWxsfWA7XG4gIGNvbnN0IGpzb25Eb2NTcGFjZWQgPSBKU09OLnN0cmluZ2lmeShKU09OLnBhcnNlKGpzb25Eb2MpLCBudWxsLCAyKTtcblxuICBjb25zdCB7IG1lZGlhbnMsIHUsIHosIHA5NSwgcDk5IH0gPSBhd2FpdCBjb21wYXJlKCgpID0+IHBhcnNlKGpzb25Eb2MpLCAoKSA9PiBwYXJzZShqc29uRG9jU3BhY2VkKSk7XG4gIGxvZyhgbWVkaWFuOiAke21lZGlhbnMuam9pbignLCcpfSAgdTogJHt1fSAgejogJHt6fWApO1xuXG4gIGxldCBzaWcxID0gMCwgc2lnNSA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCB7IG1lZGlhbnMsIHUsIHosIHA5NSwgcDk5IH0gPSBhd2FpdCBjb21wYXJlKCgpID0+IHBhcnNlKGpzb25Eb2MpLCAoKSA9PiBwYXJzZShqc29uRG9jKSk7XG4gICAgbG9nKGBtZWRpYW46ICR7bWVkaWFucy5qb2luKCcsJyl9ICB1OiAke3V9ICB6OiAke3p9YCk7XG4gICAgaWYgKHA5OSkgc2lnMSsrO1xuICAgIGlmIChwOTUpIHNpZzUrKztcbiAgICBsb2coYCR7c2lnMX0gYXQgMSUgbGV2ZWwsICR7c2lnNX0gYXQgNSUgbGV2ZWwgYWZ0ZXIgJHtpICsgMX0gcm91bmRzYCk7XG4gIH1cbn1cblxubWFpbigpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQWEsVUFBSSxJQUFFLE9BQU87QUFBZSxVQUFJLElBQUUsT0FBTztBQUF5QixVQUFJLElBQUUsT0FBTztBQUFvQixVQUFJLElBQUUsT0FBTyxVQUFVO0FBQWUsVUFBSSxJQUFFLHdCQUFDLEdBQUUsTUFBSTtBQUFDLGlCQUFRLEtBQUs7QUFBRSxZQUFFLEdBQUUsR0FBRSxFQUFDLEtBQUksRUFBRSxDQUFDLEdBQUUsWUFBVyxLQUFFLENBQUM7QUFBQSxNQUFDLEdBQXREO0FBQU4sVUFBOEQsSUFBRSx3QkFBQyxHQUFFLEdBQUUsR0FBRSxNQUFJO0FBQUMsWUFBRyxLQUFHLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRztBQUFXLG1CQUFRLEtBQUssRUFBRSxDQUFDO0FBQUUsYUFBQyxFQUFFLEtBQUssR0FBRSxDQUFDLEtBQUcsTUFBSSxLQUFHLEVBQUUsR0FBRSxHQUFFLEVBQUMsS0FBSSxNQUFJLEVBQUUsQ0FBQyxHQUFFLFlBQVcsRUFBRSxJQUFFLEVBQUUsR0FBRSxDQUFDLE1BQUksRUFBRSxXQUFVLENBQUM7QUFBRSxlQUFPO0FBQUEsTUFBQyxHQUFySztBQUF1SyxVQUFJLElBQUUsOEJBQUcsRUFBRSxFQUFFLENBQUMsR0FBRSxjQUFhLEVBQUMsT0FBTSxLQUFFLENBQUMsR0FBRSxDQUFDLEdBQXBDO0FBQXNDLFVBQUksSUFBRSxDQUFDO0FBQUUsUUFBRSxHQUFFLEVBQUMsZ0JBQWUsTUFBSSxHQUFFLE9BQU0sTUFBSSxFQUFDLENBQUM7QUFBRSxhQUFPLFVBQVEsRUFBRSxDQUFDO0FBQUUsVUFBTSxJQUFOLGNBQWdCLE1BQUs7QUFBQSxNQUFDO0FBQWhCO0FBQWlCLFVBQUk7QUFBSixVQUFNO0FBQU4sVUFBUTtBQUFSLFVBQVU7QUFBVixVQUFZO0FBQUUsVUFBTSxJQUFFO0FBQVIsVUFBb0MsSUFBRTtBQUF0QyxVQUF5RyxJQUFFO0FBQTNHLFVBQThHLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQSxHQUMzMkIsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUc7QUFEaWdCLFVBQy9mLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxLQUFLO0FBRDZOLFVBQzNOLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxJQUFJO0FBRGpELFVBQ21ELElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFHO0FBRHZTLFVBQ3lTLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdB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QztBQUNoQyxVQUFNLFlBQXNCLENBQUMsR0FBRyxDQUFDO0FBRWpDLGFBQVMsUUFBUSxHQUFHLFFBQVEsUUFBUSxTQUFTO0FBQzNDLGVBQVMsS0FBSyxHQUFHLEtBQUssV0FBVyxNQUFNO0FBRXJDLGNBQU0sSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJO0FBRS9CLGNBQU0sS0FBSyxJQUFJLENBQUM7QUFDaEIsY0FBTUEsTUFBSyxZQUFZLElBQUk7QUFDM0IsaUJBQVMsTUFBTSxHQUFHLE1BQU0sTUFBTTtBQUFPLGFBQUc7QUFDeEMsY0FBTUMsTUFBSyxZQUFZLElBQUk7QUFDM0IsY0FBTSxJQUFJQSxNQUFLRDtBQUNmLGNBQU0sT0FBTyxLQUFLLElBQUk7QUFDdEIsY0FBTSxDQUFDLEVBQUUsS0FBSyxJQUFJO0FBQ2xCLGlCQUFTLENBQUMsS0FBSztBQUNmLGtCQUFVLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxRQUFRO0FBQUEsTUFDeEM7QUFBQztBQUVELFlBQU0sV0FBVztBQUFBLElBQ25CO0FBRUEsVUFBTSxlQUFlLE1BQU0sSUFBSSxVQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ25ELFVBQU0sY0FBYyxhQUFhLEtBQUs7QUFFdEMsV0FBTyxFQUFFLFNBQVMsY0FBYyxHQUFHLFlBQVk7QUFBQSxFQUNqRDtBQXpDZTtBQTJDZixpQkFBZSxPQUFPO0FBQ3BCLFVBQU0sVUFBVTtBQUNoQixVQUFNLGdCQUFnQixLQUFLLFVBQVUsS0FBSyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFFakUsVUFBTSxFQUFFLFNBQVMsR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLE1BQU0sUUFBUSxNQUFNLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDbEcsUUFBSSxXQUFXLFFBQVEsS0FBSyxHQUFHLFNBQVMsU0FBUyxHQUFHO0FBRXBELFFBQUksT0FBTyxHQUFHLE9BQU87QUFDckIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsWUFBTSxFQUFFLFNBQUFFLFVBQVMsR0FBQUMsSUFBRyxHQUFBQyxJQUFHLEtBQUFDLE1BQUssS0FBQUMsS0FBSSxJQUFJLE1BQU0sUUFBUSxNQUFNLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFDNUYsVUFBSSxXQUFXSixTQUFRLEtBQUssR0FBRyxTQUFTQyxVQUFTQyxJQUFHO0FBQ3BELFVBQUlFO0FBQUs7QUFDVCxVQUFJRDtBQUFLO0FBQ1QsVUFBSSxHQUFHLHFCQUFxQiwwQkFBMEIsSUFBSSxVQUFVO0FBQUEsSUFDdEU7QUFBQSxFQUNGO0FBZmU7QUFpQmYsT0FBSzsiLAogICJuYW1lcyI6IFsibW9kIiwgInQwIiwgInQxIiwgIm1lZGlhbnMiLCAidSIsICJ6IiwgInA5NSIsICJwOTkiXQp9Cg==
