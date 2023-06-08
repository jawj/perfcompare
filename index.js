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
    const dataAll = [...data0, ...data1];
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2pzb24tY3VzdG9tLW51bWJlcnMvZGlzdC9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvanNvbi1jdXN0b20tbnVtYmVycy9kaXN0L3BhcnNlLm1qcyIsICJzdGF0cy50cyIsICJpbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7dmFyIHA9T2JqZWN0LmRlZmluZVByb3BlcnR5O3ZhciBqPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7dmFyIG09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7dmFyIEk9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIgVT0obixjKT0+e2Zvcih2YXIgaSBpbiBjKXAobixpLHtnZXQ6Y1tpXSxlbnVtZXJhYmxlOiEwfSl9LFM9KG4sYyxpLHMpPT57aWYoYyYmdHlwZW9mIGM9PVwib2JqZWN0XCJ8fHR5cGVvZiBjPT1cImZ1bmN0aW9uXCIpZm9yKGxldCBkIG9mIG0oYykpIUkuY2FsbChuLGQpJiZkIT09aSYmcChuLGQse2dldDooKT0+Y1tkXSxlbnVtZXJhYmxlOiEocz1qKGMsZCkpfHxzLmVudW1lcmFibGV9KTtyZXR1cm4gbn07dmFyIE49bj0+UyhwKHt9LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLG4pO3ZhciBGPXt9O1UoRix7SlNPTlBhcnNlRXJyb3I6KCk9PmsscGFyc2U6KCk9PkJ9KTttb2R1bGUuZXhwb3J0cz1OKEYpO2NsYXNzIGsgZXh0ZW5kcyBFcnJvcnt9bGV0IHIsdCxvLEMsQTtjb25zdCB4PS9bXlwiXFxcXFxcblxcdFxcdTAwMDAtXFx1MDAxZl0qL3ksdz0vLT8oMHxbMS05XVswLTldKikoWy5dWzAtOV0rKT8oW2VFXVstK10/WzAtOV0rKT98dHJ1ZXxmYWxzZXxudWxsL3ksZT1cIlwiLE89W2UsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsJ1wiJyxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxcIi9cIixlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsXCJcXFxcXCIsZSxlLGUsZSxlLFwiXFxiXCIsZSxlLGUsXCJcXGZcIixlLGUsZSxlLGUsZSxlLGBcbmAsZSxlLGUsXCJcXHJcIixlLFwiXHRcIl0sUj1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSw0MDk3LDgxOTMsMTIyODksMTYzODUsMjA0ODEsMjQ1NzcsMjg2NzMsMzI3NjksMzY4NjUsMCwwLDAsMCwwLDAsMCw0MDk2MSw0NTA1Nyw0OTE1Myw1MzI0OSw1NzM0NSw2MTQ0MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNDA5NjEsNDUwNTcsNDkxNTMsNTMyNDksNTczNDUsNjE0NDFdLEw9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMjU3LDUxMyw3NjksMTAyNSwxMjgxLDE1MzcsMTc5MywyMDQ5LDIzMDUsMCwwLDAsMCwwLDAsMCwyNTYxLDI4MTcsMzA3MywzMzI5LDM1ODUsMzg0MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMjU2MSwyODE3LDMwNzMsMzMyOSwzNTg1LDM4NDFdLFg9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMTcsMzMsNDksNjUsODEsOTcsMTEzLDEyOSwxNDUsMCwwLDAsMCwwLDAsMCwxNjEsMTc3LDE5MywyMDksMjI1LDI0MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTYxLDE3NywxOTMsMjA5LDIyNSwyNDFdLEo9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDAsMCwwLDAsMCwwLDAsMTEsMTIsMTMsMTQsMTUsMTYsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDExLDEyLDEzLDE0LDE1LDE2XTtmdW5jdGlvbiBhKG4pe3Rocm93IG5ldyBrKG4rYFxuQXQgY2hhcmFjdGVyIGArcitcIiBpbiBKU09OOiBcIitvKX1mdW5jdGlvbiB1KG4pe3JldHVybiB0Pj0wP1wiJ1wiKyhufHxcIlwiKStTdHJpbmcuZnJvbUNoYXJDb2RlKHQpK1wiJ1wiOlwiZW5kIG9mIGlucHV0XCJ9ZnVuY3Rpb24gRCgpe2xldCBuO2NvbnN0IGM9ci0xO3cubGFzdEluZGV4PWMsdy50ZXN0KG8pfHxhKFwiVW5leHBlY3RlZCBjaGFyYWN0ZXIgb3IgZW5kIG9mIGlucHV0XCIpO2NvbnN0e2xhc3RJbmRleDppfT13O2lmKHQ8MTAyKXtjb25zdCBzPW8uc2xpY2UoYyxpKTtuPUM/QyhzKTorc31lbHNlIG49dD09PTExMD9udWxsOnQ9PT0xMTY7cmV0dXJuIHI9aSx0PW8uY2hhckNvZGVBdChyKyspLG59ZnVuY3Rpb24gZigpe2EoXCJJbnZhbGlkIFxcXFx1WFhYWCBlc2NhcGUgaW4gc3RyaW5nXCIpfWZ1bmN0aW9uIEUoKXtsZXQgbj1cIlwiO2Zvcig7Oyl7eC5sYXN0SW5kZXg9cix4LnRlc3Qobyk7Y29uc3R7bGFzdEluZGV4OmN9PXg7c3dpdGNoKGM+ciYmKG4rPW8uc2xpY2UocixjKSxyPWMpLHQ9by5jaGFyQ29kZUF0KHIrKyksdCl7Y2FzZSAzNDpyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Nhc2UgOTI6dD1vLmNoYXJDb2RlQXQocisrKSxuKz10PT09MTE3P1N0cmluZy5mcm9tQ2hhckNvZGUoKFJbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpKyhMW28uY2hhckNvZGVBdChyKyspXXx8ZigpKSsoWFtvLmNoYXJDb2RlQXQocisrKV18fGYoKSkrKEpbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpLTQpOk9bdF18fGEoXCJJbnZhbGlkIGVzY2FwZSBzZXF1ZW5jZSBcIit1KFwiXFxcXFwiKStcIiBpbiBzdHJpbmdcIik7Y29udGludWU7ZGVmYXVsdDppc05hTih0KSYmYShcIlVudGVybWluYXRlZCBzdHJpbmdcIik7Y29uc3QgaT10PT09MTA/XCJuZXdsaW5lXCI6dD09PTk/XCJ0YWJcIjpcImNvbnRyb2wgY2hhcmFjdGVyXCIscz10LnRvU3RyaW5nKDE2KSxkPVwiMDAwMFwiLnNsaWNlKHMubGVuZ3RoKStzO2EoXCJJbnZhbGlkIHVuZXNjYXBlZCBcIitpK1wiIChcXFxcdVwiK2QrXCIpIGluIHN0cmluZ1wiKX19fWZ1bmN0aW9uIFAoKXtjb25zdCBuPVtdO2xldCBjPTA7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKTtpZih0PT09OTMpcmV0dXJuIHQ9by5jaGFyQ29kZUF0KHIrKyksbjtmb3IoO3Q+PTA7KXtmb3IobltjKytdPWcoKTt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2lmKHQ9PT05MylyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO3QhPT00NCYmYShcIkV4cGVjdGVkICcsJyBidXQgZ290IFwiK3UoKStcIiBhZnRlciBhcnJheSBlbGVtZW50XCIpO2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSl9YShcIlVudGVybWluYXRlZCBhcnJheVwiKX1mdW5jdGlvbiBxKCl7Y29uc3Qgbj17fTtkbyB0PW8uY2hhckNvZGVBdChyKyspO3doaWxlKHQ8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSkpO2lmKHQ9PT0xMjUpcmV0dXJuIHQ9by5jaGFyQ29kZUF0KHIrKyksbjtmb3IoO3Q9PT0zNDspe2NvbnN0IGM9RSgpO2Zvcig7dDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KTspdD1vLmNoYXJDb2RlQXQocisrKTtmb3IodCE9PTU4JiZhKFwiRXhwZWN0ZWQgJzonIGJ1dCBnb3QgXCIrdSgpK1wiIGFmdGVyIGtleSBpbiBvYmplY3RcIiksdD1vLmNoYXJDb2RlQXQocisrKSxuW2NdPWcoKTt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2lmKHQ9PT0xMjUpcmV0dXJuIHQ9by5jaGFyQ29kZUF0KHIrKyksbjt0IT09NDQmJmEoXCJFeHBlY3RlZCAnLCcgYnV0IGdvdCBcIit1KCkrXCIgYWZ0ZXIgdmFsdWUgaW4gb2JqZWN0XCIpO2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSl9YShgRXhwZWN0ZWQgJ1wiJyBidXQgZ290IGArdSgpK1wiIGluIG9iamVjdFwiKX1mdW5jdGlvbiBnKCl7Zm9yKDt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO3N3aXRjaCh0KXtjYXNlIDM0OnJldHVybiBFKCk7Y2FzZSAxMjM6cmV0dXJuIHEoKTtjYXNlIDkxOnJldHVybiBQKCk7ZGVmYXVsdDpyZXR1cm4gRCgpfX1mdW5jdGlvbiBCKG4sYyxpKXtuIGluc3RhbmNlb2YgVWludDhBcnJheSYmKG49KEEhPW51bGw/QTpBPW5ldyBUZXh0RGVjb2RlcikuZGVjb2RlKG4pKSx0eXBlb2YgbiE9XCJzdHJpbmdcIiYmYShcIkpTT04gbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyIG9yIFVpbnQ4QXJyYXlcIikscj0wLHQ9MzIsbz1uLEM9aTtjb25zdCBzPWcoKTtmb3IoO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7cmV0dXJuIHQ+PTAmJmEoXCJVbmV4cGVjdGVkIGRhdGEgYXQgZW5kIG9mIGlucHV0XCIpLHR5cGVvZiBjPT1cImZ1bmN0aW9uXCI/ZnVuY3Rpb24gZChiLHkpe2NvbnN0IGw9Ylt5XTtpZihsJiZ0eXBlb2YgbD09XCJvYmplY3RcIil7Zm9yKGNvbnN0IGggaW4gbClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobCxoKSl7Y29uc3Qgdj1kKGwsaCk7diE9PXZvaWQgMD9sW2hdPXY6ZGVsZXRlIGxbaF19fXJldHVybiBjLmNhbGwoYix5LGwpfSh7XCJcIjpzfSxcIlwiKTpzfVxuIiwgImltcG9ydCBtb2QgZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgbW9kO1xuZXhwb3J0IGNvbnN0IEpTT05QYXJzZUVycm9yID0gbW9kLkpTT05QYXJzZUVycm9yO1xuZXhwb3J0IGNvbnN0IHBhcnNlID0gbW9kLnBhcnNlO1xuIiwgIlxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhbmNlKGRhdGE6IG51bWJlcltdLCBtZWFuID0gZGF0YS5yZWR1Y2UoKG1lbW8sIG4pID0+IG1lbW8gKyBuLCAwKSAvIGRhdGEubGVuZ3RoKSB7XG4gIHJldHVybiBkYXRhLnJlZHVjZSgobWVtbywgbikgPT4ge1xuICAgIGNvbnN0IGRldiA9IG4gLSBtZWFuO1xuICAgIGNvbnN0IHNxRGV2ID0gZGV2ICogZGV2O1xuICAgIHJldHVybiBtZW1vICsgc3FEZXY7XG4gIH0sIDApIC8gKGRhdGEubGVuZ3RoIC0gMSk7ICAvLyBuIC0gMSBpcyB0aGUgYXBwcm9wcmlhdGUgZGVub21pbmF0b3Igd2hlbiB3b3JraW5nIHdpdGggYSBzYW1wbGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lZGlhbihkYXRhOiBudW1iZXJbXSwgZGVzdHJ1Y3RpdmUgPSBmYWxzZSkge1xuICBpZiAoIWRlc3RydWN0aXZlKSBkYXRhID0gZGF0YS5zbGljZSgpO1xuICBjb25zdCB7IGxlbmd0aCB9ID0gZGF0YTtcbiAgZGF0YS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gIHJldHVybiBsZW5ndGggJSAyID09PSAxID9cbiAgICBkYXRhWyhsZW5ndGggLSAxKSAqIC41XSA6XG4gICAgLjUgKiBkYXRhW2xlbmd0aCAqIC41IC0gMV0gKyAuNSAqIGRhdGFbbGVuZ3RoICogLjVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFubldoaXRuZXlVKGRhdGE6IFtudW1iZXJbXSwgbnVtYmVyW11dKSB7XG4gIC8vIGhhbmR5IGZvciBjb21wYXJpc29uOiBSIG9yIGh0dHBzOi8vd3d3LnN0YXRza2luZ2RvbS5jb20vMTcwbWVkaWFuX21hbm5fd2hpdG5leS5odG1sXG4gIGNvbnN0IGRhdGEwID0gZGF0YVswXS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIHNvdXJjZTogMCwgcmFuazogMCB9KSk7XG4gIGNvbnN0IGRhdGExID0gZGF0YVsxXS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIHNvdXJjZTogMSwgcmFuazogMCB9KSk7XG4gIGNvbnN0IGRhdGFBbGwgPSBbLi4uZGF0YTAsIC4uLmRhdGExXTtcbiAgZGF0YUFsbC5zb3J0KChhLCBiKSA9PiBhLnZhbHVlIC0gYi52YWx1ZSk7XG4gIGNvbnN0IG4gPSBkYXRhQWxsLmxlbmd0aDtcbiAgLy8gaXRlcmF0ZSBmb3J3YXJkcywgY291bnRpbmcgaWRlbnRpY2FsIHByZXZpb3VzIHZhbHVlcyAoYW5kIHN0dWZmaW5nIHRoZW0gaW4gdGhlIHJhbmsgZmllbGQpXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRhdGFBbGxbaV07XG4gICAgY29uc3QgcHJldiA9IGRhdGFBbGxbaSAtIDFdO1xuICAgIGN1cnJlbnQucmFuayA9IHByZXYudmFsdWUgPT09IGN1cnJlbnQudmFsdWUgPyBwcmV2LnJhbmsgKyAxIDogMDtcbiAgfVxuICAvLyBpdGVyYXRlIGJhY2t3YXJkcywgZmlsbGluZyBpbiB0aGUgcmFuayBmaWVsZCBjb3JyZWN0bHksIGluY2x1ZGluZyB0aWVzXG4gIGxldCB0aWVTdW0gPSAwO1xuICBmb3IgKGxldCBpID0gbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgcmFuayA9IGkgKyAxO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBkYXRhQWxsW2ldO1xuICAgIGNvbnN0IHByZXZTYW1lID0gY3VycmVudC5yYW5rO1xuICAgIGlmIChwcmV2U2FtZSA9PT0gMCkge1xuICAgICAgY3VycmVudC5yYW5rID0gcmFuaztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0aWVTdW0gKz0gcHJldlNhbWUgKiBwcmV2U2FtZSAqIHByZXZTYW1lIC0gcHJldlNhbWU7XG4gICAgY29uc3QgdGllZFJhbmsgPSByYW5rIC0gcHJldlNhbWUgKiAuNTtcbiAgICBjb25zdCBsb3dlc3RUaWVkID0gaSAtIHByZXZTYW1lIC0gMTtcbiAgICB3aGlsZSAoaSA+IGxvd2VzdFRpZWQpIGRhdGFBbGxbaS0tXS5yYW5rID0gdGllZFJhbms7XG4gICAgaSsrOyAgLy8gYmVjYXVzZSBpdCdzIGFib3V0IHRvIGJlIGRlY3JlbWVudGVkIGFnYWluXG4gIH1cblxuICAvLyBzdW0gcmFua3MgYnkgZGF0YSBzb3VyY2VcbiAgY29uc3QgcnMgPSBkYXRhQWxsLnJlZHVjZSgoW3IwLCByMV0sIHsgc291cmNlLCByYW5rIH0pID0+XG4gICAgc291cmNlID09PSAwID8gW3IwICsgcmFuaywgcjFdIDogW3IwLCByMSArIHJhbmtdLCBbMCwgMF0pO1xuXG4gIC8vIGNhbGN1bGF0ZSBVXG4gIGNvbnN0IG4wID0gZGF0YTAubGVuZ3RoO1xuICBjb25zdCBuMSA9IGRhdGExLmxlbmd0aDtcbiAgY29uc3QgdTAgPSByc1swXSAtIG4wICogKG4wICsgMSkgKiAuNTtcbiAgY29uc3QgdTEgPSByc1sxXSAtIG4xICogKG4xICsgMSkgKiAuNTtcbiAgY29uc3QgdSA9IE1hdGgubWluKHUwLCB1MSk7XG5cbiAgLy8gY2FsY3VsYXRlIHogYW5kIHNvbWUgdHdvLXRhaWxlZCB0ZXN0IHRocmVzaG9sZHNcbiAgLy8gaHR0cDovL3VzZXJzLnN1c3NleC5hYy51ay9+Z3JhaGFtaC9STTF3ZWIvV2lsY294b24lMjBMYXJnZSUyME4lMjAyMDA5LnBkZlxuICBjb25zdCBtdSA9IC41ICogbjAgKiBuMTtcbiAgY29uc3Qgc3RkRGV2ID0gTWF0aC5zcXJ0KCgobjAgKiBuMSkgKiAobiAqIG4gKiBuIC0gbiAtIHRpZVN1bSkpIC8gKDEyICogbiAqIChuIC0gMSkpKTtcbiAgY29uc3QgeiA9IChtdSAtIHUgLSAuNSkgLyBzdGREZXY7XG4gIGNvbnN0IHA5NSA9IHogPiAxLjk2O1xuICBjb25zdCBwOTkgPSB6ID4gMi41ODtcbiAgXG4gIHJldHVybiB7IHUsIHosIHA5NSwgcDk5LCB1MCwgdTEsIGRhdGFBbGwgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRUZXN0VChtZWFuczogbnVtYmVyW10sIHZhcmlhbmNlczogbnVtYmVyW10sIG5zOiBudW1iZXJbXSkge1xuICAvLyBodHRwczovL3BzeXRlYWNoci5naXRodWIuaW8vaGFuZHl3b3JrYm9vay9iZXR3ZWVuLXN1YmplY3RzLXdlbGNocy10LXRlc3QuaHRtbFxuICByZXR1cm4gKG1lYW5zWzBdIC0gbWVhbnNbMV0pIC8gTWF0aC5zcXJ0KCh2YXJpYW5jZXNbMF0gLyBuc1swXSkgKyAodmFyaWFuY2VzWzFdIC8gbnNbMV0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRUZXN0RGYodmFyaWFuY2VzOiBudW1iZXJbXSwgbnM6IG51bWJlcltdKSB7XG4gIGNvbnN0IGEwID0gdmFyaWFuY2VzWzBdIC8gbnNbMF07XG4gIGNvbnN0IGExID0gdmFyaWFuY2VzWzFdIC8gbnNbMV07XG4gIGNvbnN0IGIgPSBhMCArIGExO1xuICBjb25zdCBjMCA9IGEwICogYTA7XG4gIGNvbnN0IGMxID0gYTEgKiBhMTtcbiAgcmV0dXJuIChiICogYikgLyAoKGMwIC8gKG5zWzBdIC0gMSkpICsgKGMxIC8gKG5zWzFdIC0gMSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ0dhbW1hKHo6IG51bWJlcikge1xuICByZXR1cm4gKHogLSAwLjUpICogTWF0aC5sb2coeiArIDQuNSkgLSAoeiArIDQuNSkgKyBNYXRoLmxvZygoMSArIDc2LjE4MDA5MTczIC8geiAtIDg2LjUwNTMyMDMzIC8gKHogKyAxKSArIDI0LjAxNDA5ODIyIC8gKHogKyAyKSAtIDEuMjMxNzM5NTE2IC8gKHogKyAzKSArIDAuMDAxMjA4NTgwMDMgLyAoeiArIDQpIC0gMC4wMDAwMDUzNjM4MiAvICh6ICsgNSkpICogMi41MDY2MjgyNzQ2NSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiZXRJbmMoeDogbnVtYmVyLCBhOiBudW1iZXIsIGI6IG51bWJlcikge1xuICBsZXQgYTAsIGExLCBhMiwgYjAsIGIxLCBjOSwgbTk7XG4gIGEwID0gKG05ID0gKGEyID0gMCkpO1xuICBiMCA9IChhMSA9IChiMSA9IDEpKTtcbiAgd2hpbGUgKE1hdGguYWJzKChhMSAtIGEyKSAvIGExKSA+IDAuMDAwMDEpIHtcbiAgICBhMiA9IGExO1xuICAgIGM5ID0gLShhICsgbTkpICogKGEgKyBiICsgbTkpICogeCAvIChhICsgMiAqIG05KSAvIChhICsgMiAqIG05ICsgMSk7XG4gICAgYTAgPSBhMSArIGM5ICogYTA7XG4gICAgYjAgPSBiMSArIGM5ICogYjA7XG4gICAgbTkgPSBtOSArIDE7XG4gICAgYzkgPSBtOSAqIChiIC0gbTkpICogeCAvIChhICsgMiAqIG05IC0gMSkgLyAoYSArIDIgKiBtOSk7XG4gICAgYTEgPSBhMCArIGM5ICogYTE7XG4gICAgYjEgPSBiMCArIGM5ICogYjE7XG4gICAgYTAgPSBhMCAvIGIxO1xuICAgIGIwID0gYjAgLyBiMTtcbiAgICBhMSA9IGExIC8gYjE7XG4gICAgYjEgPSAxO1xuICB9XG4gIHJldHVybiBhMSAvIGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwRm9yVCh4djogbnVtYmVyLCBkZjogbnVtYmVyLCB0YWlsczogbnVtYmVyKSB7XG4gIC8vIGFkYXB0ZWQgZnJvbSBodHRwOi8vd3d3Lm1hdGgudWNsYS5lZHUvfnRvbS9kaXN0cmlidXRpb25zL3REaXN0Lmh0bWxcbiAgbGV0IGEsIHMsIHosIGJ0LCBiZXRhY2RmO1xuICBhID0gZGYgLyAyO1xuICBzID0gYSArIDAuNTtcbiAgeiA9IGRmIC8gKGRmICsgeHYgKiB4dik7XG4gIGJ0ID0gTWF0aC5leHAobG9nR2FtbWEocykgLSBsb2dHYW1tYSgwLjUpIC0gbG9nR2FtbWEoYSkgKyBhICogTWF0aC5sb2coeikgKyAwLjUgKiBNYXRoLmxvZygxIC0geikpO1xuICBiZXRhY2RmID0geiA8IChhICsgMSkgLyAocyArIDIpID8gYnQgKiBiZXRJbmMoeiwgYSwgMC41KSA6IDEgLSBidCAqIGJldEluYygxIC0geiwgMC41LCBhKTtcbiAgcmV0dXJuIHRhaWxzICogYmV0YWNkZiAvIDI7XG59OyIsICJcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnanNvbi1jdXN0b20tbnVtYmVycyc7XG5pbXBvcnQgeyB2YXJpYW5jZSwgdFRlc3RULCB0VGVzdERmLCBwRm9yVCwgbWVkaWFuLCBtYW5uV2hpdG5leVUgfSBmcm9tICcuL3N0YXRzJztcblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSEuaW5uZXJUZXh0ICs9XG4gICAgYXJncy5tYXAoYSA9PiB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhIDogSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJyAnKSArICdcXG4nO1xufVxuXG5sZXQgdDAsIHQxO1xudDAgPSB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xud2hpbGUgKHQwID09PSB0MSkgeyB0MSA9IHBlcmZvcm1hbmNlLm5vdygpIH07XG5jb25zdCBtc1JlcyA9IHQxIC0gdDA7XG5jb25zdCB1c1JlcyA9IE1hdGgucm91bmQobXNSZXMgKiAxZTMpO1xubG9nKGBSZXNvbHV0aW9uOiAke3VzUmVzfVxcdTAzYmNzYCk7XG5cbmNvbnN0IHRyaWFsRHVyYXRpb24gPSBNYXRoLm1heChtc1JlcyAqIDEwMCwgMjUpO1xubG9nKGBUcmlhbCBkdXJhdGlvbjogJHt0cmlhbER1cmF0aW9ufW1zYCk7XG5cbmNvbnN0IHRyaWFscyA9IDEwMDtcblxuZnVuY3Rpb24gb3BzUGVyRHVyYXRpb25NcyhmbjogKCkgPT4gYW55LCBkdXJhdGlvbk1zOiBudW1iZXIsIHRvTmVhcmVzdCA9IDEwLCBtYXhPcHMgPSAyZTkpIHtcbiAgY29uc3QgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXhPcHM7IGkrKykgeyAgLy8gaXQncyBpbXBvcnRhbnQgZm9yIHZhcmlvdXMgcmVhc29ucyB0aGF0IGkgc3RhcnRzIGF0IDEsIG5vdCAwXG4gICAgZm4oKTtcbiAgICBpZiAoaSAlIHRvTmVhcmVzdCA9PT0gMCAmJiBwZXJmb3JtYW5jZS5ub3coKSAtIHQwID49IGR1cmF0aW9uTXMpIHJldHVybiBpO1xuICB9XG4gIHJldHVybiBtYXhPcHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZvcnR5V2lua3MoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMCkpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGNvbXBhcmUoLi4uZm5zOiAoKCkgPT4gYW55KVtdKSB7XG4gIGNvbnN0IGZuc0xlbmd0aCA9IGZucy5sZW5ndGg7XG5cbiAgbGV0IHJlcHMgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZuc0xlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZm4gPSBmbnNbaV07XG4gICAgY29uc3QgZm5SZXBzID0gb3BzUGVyRHVyYXRpb25NcyhmbiwgdHJpYWxEdXJhdGlvbik7XG4gICAgbG9nKGZuLnRvU3RyaW5nKCksIGAtPiAke2ZuUmVwc30gcmVwcy90cmlhbGApO1xuICAgIGlmIChmblJlcHMgPiByZXBzKSByZXBzID0gZm5SZXBzO1xuICAgIGF3YWl0IGZvcnR5V2lua3MoKTtcbiAgfVxuXG4gIGxvZyhgVXNpbmcgJHtyZXBzfSByZXBzL3RyaWFsYCk7XG5cbiAgY29uc3QgdFJlcHM6IFtudW1iZXJbXSwgbnVtYmVyW11dID0gW1tdLCBbXV07XG4gIGNvbnN0IHRSZXBzU3VtOiBudW1iZXJbXSA9IFswLCAwXTtcbiAgY29uc3QgdFJlcHNNZWFuOiBudW1iZXJbXSA9IFswLCAwXTtcblxuICBmb3IgKGxldCB0cmlhbCA9IDA7IHRyaWFsIDwgdHJpYWxzOyB0cmlhbCsrKSB7XG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IGZuc0xlbmd0aDsgX2krKykge1xuICAgICAgLy8gYWx0ZXJuYXRlIGZ1bmN0aW9ucyAobm90ZTogc3RyYW5nZWx5LCByYW5kb20gYXNzaWdubWVudCBkb2Vzbid0IGFwcGVhciB0byB3b3JrKVxuICAgICAgY29uc3QgaSA9IHRyaWFsICUgMiA/IF9pIDogMSAtIF9pO1xuXG4gICAgICBjb25zdCBmbiA9IGZuc1tpXTtcbiAgICAgIGNvbnN0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBmb3IgKGxldCByZXAgPSAwOyByZXAgPCByZXBzOyByZXArKykgZm4oKTtcbiAgICAgIGNvbnN0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBjb25zdCB0ID0gdDEgLSB0MDtcbiAgICAgIGNvbnN0IHRSZXAgPSAxIC8gKHQgLyByZXBzKTtcbiAgICAgIHRSZXBzW2ldW3RyaWFsXSA9IHRSZXA7XG4gICAgICB0UmVwc1N1bVtpXSArPSB0UmVwO1xuICAgICAgdFJlcHNNZWFuW2ldID0gdFJlcHNTdW1baV0gLyAodHJpYWwgKyAxKTtcbiAgICB9O1xuICAgIC8vIGxvZyh0cmlhbCwgdFJlcHNNZWFuKTtcbiAgICBhd2FpdCBmb3J0eVdpbmtzKCk7XG4gIH1cblxuICBjb25zdCB0UmVwc01lZGlhbnMgPSB0UmVwcy5tYXAodFJlcCA9PiBtZWRpYW4odFJlcCkpO1xuICBjb25zdCB0UmVwc1VTdGF0cyA9IG1hbm5XaGl0bmV5VSh0UmVwcyk7XG5cbiAgcmV0dXJuIHsgbWVkaWFuczogdFJlcHNNZWRpYW5zLCAuLi50UmVwc1VTdGF0cyB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBqc29uRG9jID0gYHtcIm51bWJlclwiOjEsXCJzdHJpbmdcIjpcIlRoZSBxdWljayBicm93biBmb3hcXFxcbmp1bXBzIG92ZXIgdGhlIGxhenkgZG9nIFxcXFx1MDNiY1wiLFwiYm9vbGVhblwiOnRydWUsXCJudWxsXCI6bnVsbH1gO1xuICBjb25zdCBqc29uRG9jU3BhY2VkID0gSlNPTi5zdHJpbmdpZnkoSlNPTi5wYXJzZShqc29uRG9jKSwgbnVsbCwgMik7XG5cbiAgY29uc3QgeyBtZWRpYW5zLCB1LCB6LCBwOTUsIHA5OSB9ID0gYXdhaXQgY29tcGFyZSgoKSA9PiBwYXJzZShqc29uRG9jKSwgKCkgPT4gcGFyc2UoanNvbkRvY1NwYWNlZCkpO1xuICBsb2coYG1lZGlhbjogJHttZWRpYW5zLmpvaW4oJywnKX0gIHU6ICR7dX0gIHo6ICR7en1gKTtcblxuICBsZXQgc2lnMSA9IDAsIHNpZzUgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3QgeyBtZWRpYW5zLCB1LCB6LCBwOTUsIHA5OSB9ID0gYXdhaXQgY29tcGFyZSgoKSA9PiBwYXJzZShqc29uRG9jKSwgKCkgPT4gcGFyc2UoanNvbkRvYykpO1xuICAgIGxvZyhgbWVkaWFuOiAke21lZGlhbnMuam9pbignLCcpfSAgdTogJHt1fSAgejogJHt6fWApO1xuICAgIGlmIChwOTkpIHNpZzErKztcbiAgICBpZiAocDk1KSBzaWc1Kys7XG4gICAgbG9nKGAke3NpZzF9IGF0IDElIGxldmVsLCAke3NpZzV9IGF0IDUlIGxldmVsIGFmdGVyICR7aSArIDF9IHJvdW5kc2ApO1xuICB9XG59XG5cbm1haW4oKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFhLFVBQUksSUFBRSxPQUFPO0FBQWUsVUFBSSxJQUFFLE9BQU87QUFBeUIsVUFBSSxJQUFFLE9BQU87QUFBb0IsVUFBSSxJQUFFLE9BQU8sVUFBVTtBQUFlLFVBQUksSUFBRSx3QkFBQyxHQUFFLE1BQUk7QUFBQyxpQkFBUSxLQUFLO0FBQUUsWUFBRSxHQUFFLEdBQUUsRUFBQyxLQUFJLEVBQUUsQ0FBQyxHQUFFLFlBQVcsS0FBRSxDQUFDO0FBQUEsTUFBQyxHQUF0RDtBQUFOLFVBQThELElBQUUsd0JBQUMsR0FBRSxHQUFFLEdBQUUsTUFBSTtBQUFDLFlBQUcsS0FBRyxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUc7QUFBVyxtQkFBUSxLQUFLLEVBQUUsQ0FBQztBQUFFLGFBQUMsRUFBRSxLQUFLLEdBQUUsQ0FBQyxLQUFHLE1BQUksS0FBRyxFQUFFLEdBQUUsR0FBRSxFQUFDLEtBQUksTUFBSSxFQUFFLENBQUMsR0FBRSxZQUFXLEVBQUUsSUFBRSxFQUFFLEdBQUUsQ0FBQyxNQUFJLEVBQUUsV0FBVSxDQUFDO0FBQUUsZUFBTztBQUFBLE1BQUMsR0FBcks7QUFBdUssVUFBSSxJQUFFLDhCQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUUsY0FBYSxFQUFDLE9BQU0sS0FBRSxDQUFDLEdBQUUsQ0FBQyxHQUFwQztBQUFzQyxVQUFJLElBQUUsQ0FBQztBQUFFLFFBQUUsR0FBRSxFQUFDLGdCQUFlLE1BQUksR0FBRSxPQUFNLE1BQUksRUFBQyxDQUFDO0FBQUUsYUFBTyxVQUFRLEVBQUUsQ0FBQztBQUFFLFVBQU0sSUFBTixjQUFnQixNQUFLO0FBQUEsTUFBQztBQUFoQjtBQUFpQixVQUFJO0FBQUosVUFBTTtBQUFOLFVBQVE7QUFBUixVQUFVO0FBQVYsVUFBWTtBQUFFLFVBQU0sSUFBRTtBQUFSLFVBQW9DLElBQUU7QUFBdEMsVUFBeUcsSUFBRTtBQUEzRyxVQUE4RyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUEsR0FDMzJCLEdBQUUsR0FBRSxHQUFFLE1BQUssR0FBRSxHQUFHO0FBRGlnQixVQUMvZixJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxNQUFLLE1BQUssT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sS0FBSztBQUQ2TixVQUMzTixJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxLQUFJLEtBQUksS0FBSSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssSUFBSTtBQURqRCxVQUNtRCxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRztBQUR2UyxVQUN5UyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FB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QUM7QUFFakMsYUFBUyxRQUFRLEdBQUcsUUFBUSxRQUFRLFNBQVM7QUFDM0MsZUFBUyxLQUFLLEdBQUcsS0FBSyxXQUFXLE1BQU07QUFFckMsY0FBTSxJQUFJLFFBQVEsSUFBSSxLQUFLLElBQUk7QUFFL0IsY0FBTSxLQUFLLElBQUksQ0FBQztBQUNoQixjQUFNQSxNQUFLLFlBQVksSUFBSTtBQUMzQixpQkFBUyxNQUFNLEdBQUcsTUFBTSxNQUFNO0FBQU8sYUFBRztBQUN4QyxjQUFNQyxNQUFLLFlBQVksSUFBSTtBQUMzQixjQUFNLElBQUlBLE1BQUtEO0FBQ2YsY0FBTSxPQUFPLEtBQUssSUFBSTtBQUN0QixjQUFNLENBQUMsRUFBRSxLQUFLLElBQUk7QUFDbEIsaUJBQVMsQ0FBQyxLQUFLO0FBQ2Ysa0JBQVUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLFFBQVE7QUFBQSxNQUN4QztBQUFDO0FBRUQsWUFBTSxXQUFXO0FBQUEsSUFDbkI7QUFFQSxVQUFNLGVBQWUsTUFBTSxJQUFJLFVBQVEsT0FBTyxJQUFJLENBQUM7QUFDbkQsVUFBTSxjQUFjLGFBQWEsS0FBSztBQUV0QyxXQUFPLEVBQUUsU0FBUyxjQUFjLEdBQUcsWUFBWTtBQUFBLEVBQ2pEO0FBekNlO0FBMkNmLGlCQUFlLE9BQU87QUFDcEIsVUFBTSxVQUFVO0FBQ2hCLFVBQU0sZ0JBQWdCLEtBQUssVUFBVSxLQUFLLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUVqRSxVQUFNLEVBQUUsU0FBUyxHQUFHLEdBQUcsS0FBSyxJQUFJLElBQUksTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNsRyxRQUFJLFdBQVcsUUFBUSxLQUFLLEdBQUcsU0FBUyxTQUFTLEdBQUc7QUFFcEQsUUFBSSxPQUFPLEdBQUcsT0FBTztBQUNyQixhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixZQUFNLEVBQUUsU0FBQUUsVUFBUyxHQUFBQyxJQUFHLEdBQUFDLElBQUcsS0FBQUMsTUFBSyxLQUFBQyxLQUFJLElBQUksTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUM1RixVQUFJLFdBQVdKLFNBQVEsS0FBSyxHQUFHLFNBQVNDLFVBQVNDLElBQUc7QUFDcEQsVUFBSUU7QUFBSztBQUNULFVBQUlEO0FBQUs7QUFDVCxVQUFJLEdBQUcscUJBQXFCLDBCQUEwQixJQUFJLFVBQVU7QUFBQSxJQUN0RTtBQUFBLEVBQ0Y7QUFmZTtBQWlCZixPQUFLOyIsCiAgIm5hbWVzIjogWyJtb2QiLCAidDAiLCAidDEiLCAibWVkaWFucyIsICJ1IiwgInoiLCAicDk1IiwgInA5OSJdCn0K
