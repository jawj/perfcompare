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

  // node_modules/mithril/render/vnode.js
  var require_vnode = __commonJS({
    "node_modules/mithril/render/vnode.js"(exports, module) {
      "use strict";
      function Vnode(tag, key, attrs, children, text, dom) {
        return { tag, key, attrs, children, text, dom, domSize: void 0, state: void 0, events: void 0, instance: void 0 };
      }
      __name(Vnode, "Vnode");
      Vnode.normalize = function(node) {
        if (Array.isArray(node))
          return Vnode("[", void 0, void 0, Vnode.normalizeChildren(node), void 0, void 0);
        if (node == null || typeof node === "boolean")
          return null;
        if (typeof node === "object")
          return node;
        return Vnode("#", void 0, void 0, String(node), void 0, void 0);
      };
      Vnode.normalizeChildren = function(input) {
        var children = [];
        if (input.length) {
          var isKeyed = input[0] != null && input[0].key != null;
          for (var i = 1; i < input.length; i++) {
            if ((input[i] != null && input[i].key != null) !== isKeyed) {
              throw new TypeError(
                isKeyed && (input[i] != null || typeof input[i] === "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys."
              );
            }
          }
          for (var i = 0; i < input.length; i++) {
            children[i] = Vnode.normalize(input[i]);
          }
        }
        return children;
      };
      module.exports = Vnode;
    }
  });

  // node_modules/mithril/render/hyperscriptVnode.js
  var require_hyperscriptVnode = __commonJS({
    "node_modules/mithril/render/hyperscriptVnode.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function() {
        var attrs = arguments[this], start = this + 1, children;
        if (attrs == null) {
          attrs = {};
        } else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
          attrs = {};
          start = this;
        }
        if (arguments.length === start + 1) {
          children = arguments[start];
          if (!Array.isArray(children))
            children = [children];
        } else {
          children = [];
          while (start < arguments.length)
            children.push(arguments[start++]);
        }
        return Vnode("", attrs.key, attrs, children);
      };
    }
  });

  // node_modules/mithril/util/hasOwn.js
  var require_hasOwn = __commonJS({
    "node_modules/mithril/util/hasOwn.js"(exports, module) {
      "use strict";
      module.exports = {}.hasOwnProperty;
    }
  });

  // node_modules/mithril/render/hyperscript.js
  var require_hyperscript = __commonJS({
    "node_modules/mithril/render/hyperscript.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var hyperscriptVnode = require_hyperscriptVnode();
      var hasOwn = require_hasOwn();
      var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
      var selectorCache = {};
      function isEmpty(object) {
        for (var key in object)
          if (hasOwn.call(object, key))
            return false;
        return true;
      }
      __name(isEmpty, "isEmpty");
      function compileSelector(selector) {
        var match, tag = "div", classes = [], attrs = {};
        while (match = selectorParser.exec(selector)) {
          var type = match[1], value = match[2];
          if (type === "" && value !== "")
            tag = value;
          else if (type === "#")
            attrs.id = value;
          else if (type === ".")
            classes.push(value);
          else if (match[3][0] === "[") {
            var attrValue = match[6];
            if (attrValue)
              attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
            if (match[4] === "class")
              classes.push(attrValue);
            else
              attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
          }
        }
        if (classes.length > 0)
          attrs.className = classes.join(" ");
        return selectorCache[selector] = { tag, attrs };
      }
      __name(compileSelector, "compileSelector");
      function execSelector(state, vnode) {
        var attrs = vnode.attrs;
        var hasClass = hasOwn.call(attrs, "class");
        var className = hasClass ? attrs.class : attrs.className;
        vnode.tag = state.tag;
        vnode.attrs = {};
        if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
          var newAttrs = {};
          for (var key in attrs) {
            if (hasOwn.call(attrs, key))
              newAttrs[key] = attrs[key];
          }
          attrs = newAttrs;
        }
        for (var key in state.attrs) {
          if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)) {
            attrs[key] = state.attrs[key];
          }
        }
        if (className != null || state.attrs.className != null)
          attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
        if (hasClass)
          attrs.class = null;
        for (var key in attrs) {
          if (hasOwn.call(attrs, key) && key !== "key") {
            vnode.attrs = attrs;
            break;
          }
        }
        return vnode;
      }
      __name(execSelector, "execSelector");
      function hyperscript(selector) {
        if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
          throw Error("The selector must be either a string or a component.");
        }
        var vnode = hyperscriptVnode.apply(1, arguments);
        if (typeof selector === "string") {
          vnode.children = Vnode.normalizeChildren(vnode.children);
          if (selector !== "[")
            return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
        }
        vnode.tag = selector;
        return vnode;
      }
      __name(hyperscript, "hyperscript");
      module.exports = hyperscript;
    }
  });

  // node_modules/mithril/render/trust.js
  var require_trust = __commonJS({
    "node_modules/mithril/render/trust.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function(html) {
        if (html == null)
          html = "";
        return Vnode("<", void 0, void 0, html, void 0, void 0);
      };
    }
  });

  // node_modules/mithril/render/fragment.js
  var require_fragment = __commonJS({
    "node_modules/mithril/render/fragment.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var hyperscriptVnode = require_hyperscriptVnode();
      module.exports = function() {
        var vnode = hyperscriptVnode.apply(0, arguments);
        vnode.tag = "[";
        vnode.children = Vnode.normalizeChildren(vnode.children);
        return vnode;
      };
    }
  });

  // node_modules/mithril/hyperscript.js
  var require_hyperscript2 = __commonJS({
    "node_modules/mithril/hyperscript.js"(exports, module) {
      "use strict";
      var hyperscript = require_hyperscript();
      hyperscript.trust = require_trust();
      hyperscript.fragment = require_fragment();
      module.exports = hyperscript;
    }
  });

  // node_modules/mithril/promise/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/mithril/promise/polyfill.js"(exports, module) {
      "use strict";
      var PromisePolyfill = /* @__PURE__ */ __name(function(executor) {
        if (!(this instanceof PromisePolyfill))
          throw new Error("Promise must be called with 'new'.");
        if (typeof executor !== "function")
          throw new TypeError("executor must be a function.");
        var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false);
        var instance = self._instance = { resolvers, rejectors };
        var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
        function handler(list, shouldAbsorb) {
          return /* @__PURE__ */ __name(function execute(value) {
            var then;
            try {
              if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
                if (value === self)
                  throw new TypeError("Promise can't be resolved with itself.");
                executeOnce(then.bind(value));
              } else {
                callAsync(function() {
                  if (!shouldAbsorb && list.length === 0)
                    console.error("Possible unhandled promise rejection:", value);
                  for (var i = 0; i < list.length; i++)
                    list[i](value);
                  resolvers.length = 0, rejectors.length = 0;
                  instance.state = shouldAbsorb;
                  instance.retry = function() {
                    execute(value);
                  };
                });
              }
            } catch (e) {
              rejectCurrent(e);
            }
          }, "execute");
        }
        __name(handler, "handler");
        function executeOnce(then) {
          var runs = 0;
          function run(fn) {
            return function(value) {
              if (runs++ > 0)
                return;
              fn(value);
            };
          }
          __name(run, "run");
          var onerror = run(rejectCurrent);
          try {
            then(run(resolveCurrent), onerror);
          } catch (e) {
            onerror(e);
          }
        }
        __name(executeOnce, "executeOnce");
        executeOnce(executor);
      }, "PromisePolyfill");
      PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
        var self = this, instance = self._instance;
        function handle(callback, list, next, state) {
          list.push(function(value) {
            if (typeof callback !== "function")
              next(value);
            else
              try {
                resolveNext(callback(value));
              } catch (e) {
                if (rejectNext)
                  rejectNext(e);
              }
          });
          if (typeof instance.retry === "function" && state === instance.state)
            instance.retry();
        }
        __name(handle, "handle");
        var resolveNext, rejectNext;
        var promise = new PromisePolyfill(function(resolve, reject) {
          resolveNext = resolve, rejectNext = reject;
        });
        handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
        return promise;
      };
      PromisePolyfill.prototype.catch = function(onRejection) {
        return this.then(null, onRejection);
      };
      PromisePolyfill.prototype.finally = function(callback) {
        return this.then(
          function(value) {
            return PromisePolyfill.resolve(callback()).then(function() {
              return value;
            });
          },
          function(reason) {
            return PromisePolyfill.resolve(callback()).then(function() {
              return PromisePolyfill.reject(reason);
            });
          }
        );
      };
      PromisePolyfill.resolve = function(value) {
        if (value instanceof PromisePolyfill)
          return value;
        return new PromisePolyfill(function(resolve) {
          resolve(value);
        });
      };
      PromisePolyfill.reject = function(value) {
        return new PromisePolyfill(function(resolve, reject) {
          reject(value);
        });
      };
      PromisePolyfill.all = function(list) {
        return new PromisePolyfill(function(resolve, reject) {
          var total = list.length, count = 0, values = [];
          if (list.length === 0)
            resolve([]);
          else
            for (var i = 0; i < list.length; i++) {
              (function(i2) {
                function consume(value) {
                  count++;
                  values[i2] = value;
                  if (count === total)
                    resolve(values);
                }
                __name(consume, "consume");
                if (list[i2] != null && (typeof list[i2] === "object" || typeof list[i2] === "function") && typeof list[i2].then === "function") {
                  list[i2].then(consume, reject);
                } else
                  consume(list[i2]);
              })(i);
            }
        });
      };
      PromisePolyfill.race = function(list) {
        return new PromisePolyfill(function(resolve, reject) {
          for (var i = 0; i < list.length; i++) {
            list[i].then(resolve, reject);
          }
        });
      };
      module.exports = PromisePolyfill;
    }
  });

  // node_modules/mithril/promise/promise.js
  var require_promise = __commonJS({
    "node_modules/mithril/promise/promise.js"(exports, module) {
      "use strict";
      var PromisePolyfill = require_polyfill();
      if (typeof window !== "undefined") {
        if (typeof window.Promise === "undefined") {
          window.Promise = PromisePolyfill;
        } else if (!window.Promise.prototype.finally) {
          window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
        }
        module.exports = window.Promise;
      } else if (typeof global !== "undefined") {
        if (typeof global.Promise === "undefined") {
          global.Promise = PromisePolyfill;
        } else if (!global.Promise.prototype.finally) {
          global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
        }
        module.exports = global.Promise;
      } else {
        module.exports = PromisePolyfill;
      }
    }
  });

  // node_modules/mithril/render/render.js
  var require_render = __commonJS({
    "node_modules/mithril/render/render.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function($window) {
        var $doc = $window && $window.document;
        var currentRedraw;
        var nameSpace = {
          svg: "http://www.w3.org/2000/svg",
          math: "http://www.w3.org/1998/Math/MathML"
        };
        function getNameSpace(vnode) {
          return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
        }
        __name(getNameSpace, "getNameSpace");
        function checkState(vnode, original) {
          if (vnode.state !== original)
            throw new Error("'vnode.state' must not be modified.");
        }
        __name(checkState, "checkState");
        function callHook(vnode) {
          var original = vnode.state;
          try {
            return this.apply(original, arguments);
          } finally {
            checkState(vnode, original);
          }
        }
        __name(callHook, "callHook");
        function activeElement() {
          try {
            return $doc.activeElement;
          } catch (e) {
            return null;
          }
        }
        __name(activeElement, "activeElement");
        function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
          for (var i = start; i < end; i++) {
            var vnode = vnodes[i];
            if (vnode != null) {
              createNode(parent, vnode, hooks, ns, nextSibling);
            }
          }
        }
        __name(createNodes, "createNodes");
        function createNode(parent, vnode, hooks, ns, nextSibling) {
          var tag = vnode.tag;
          if (typeof tag === "string") {
            vnode.state = {};
            if (vnode.attrs != null)
              initLifecycle(vnode.attrs, vnode, hooks);
            switch (tag) {
              case "#":
                createText(parent, vnode, nextSibling);
                break;
              case "<":
                createHTML(parent, vnode, ns, nextSibling);
                break;
              case "[":
                createFragment(parent, vnode, hooks, ns, nextSibling);
                break;
              default:
                createElement(parent, vnode, hooks, ns, nextSibling);
            }
          } else
            createComponent(parent, vnode, hooks, ns, nextSibling);
        }
        __name(createNode, "createNode");
        function createText(parent, vnode, nextSibling) {
          vnode.dom = $doc.createTextNode(vnode.children);
          insertNode(parent, vnode.dom, nextSibling);
        }
        __name(createText, "createText");
        var possibleParents = { caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup" };
        function createHTML(parent, vnode, ns, nextSibling) {
          var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
          var temp = $doc.createElement(possibleParents[match[1]] || "div");
          if (ns === "http://www.w3.org/2000/svg") {
            temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + vnode.children + "</svg>";
            temp = temp.firstChild;
          } else {
            temp.innerHTML = vnode.children;
          }
          vnode.dom = temp.firstChild;
          vnode.domSize = temp.childNodes.length;
          vnode.instance = [];
          var fragment = $doc.createDocumentFragment();
          var child;
          while (child = temp.firstChild) {
            vnode.instance.push(child);
            fragment.appendChild(child);
          }
          insertNode(parent, fragment, nextSibling);
        }
        __name(createHTML, "createHTML");
        function createFragment(parent, vnode, hooks, ns, nextSibling) {
          var fragment = $doc.createDocumentFragment();
          if (vnode.children != null) {
            var children = vnode.children;
            createNodes(fragment, children, 0, children.length, hooks, null, ns);
          }
          vnode.dom = fragment.firstChild;
          vnode.domSize = fragment.childNodes.length;
          insertNode(parent, fragment, nextSibling);
        }
        __name(createFragment, "createFragment");
        function createElement(parent, vnode, hooks, ns, nextSibling) {
          var tag = vnode.tag;
          var attrs = vnode.attrs;
          var is = attrs && attrs.is;
          ns = getNameSpace(vnode) || ns;
          var element = ns ? is ? $doc.createElementNS(ns, tag, { is }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, { is }) : $doc.createElement(tag);
          vnode.dom = element;
          if (attrs != null) {
            setAttrs(vnode, attrs, ns);
          }
          insertNode(parent, element, nextSibling);
          if (!maybeSetContentEditable(vnode)) {
            if (vnode.children != null) {
              var children = vnode.children;
              createNodes(element, children, 0, children.length, hooks, null, ns);
              if (vnode.tag === "select" && attrs != null)
                setLateSelectAttrs(vnode, attrs);
            }
          }
        }
        __name(createElement, "createElement");
        function initComponent(vnode, hooks) {
          var sentinel;
          if (typeof vnode.tag.view === "function") {
            vnode.state = Object.create(vnode.tag);
            sentinel = vnode.state.view;
            if (sentinel.$$reentrantLock$$ != null)
              return;
            sentinel.$$reentrantLock$$ = true;
          } else {
            vnode.state = void 0;
            sentinel = vnode.tag;
            if (sentinel.$$reentrantLock$$ != null)
              return;
            sentinel.$$reentrantLock$$ = true;
            vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
          }
          initLifecycle(vnode.state, vnode, hooks);
          if (vnode.attrs != null)
            initLifecycle(vnode.attrs, vnode, hooks);
          vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
          if (vnode.instance === vnode)
            throw Error("A view cannot return the vnode it received as argument");
          sentinel.$$reentrantLock$$ = null;
        }
        __name(initComponent, "initComponent");
        function createComponent(parent, vnode, hooks, ns, nextSibling) {
          initComponent(vnode, hooks);
          if (vnode.instance != null) {
            createNode(parent, vnode.instance, hooks, ns, nextSibling);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
          } else {
            vnode.domSize = 0;
          }
        }
        __name(createComponent, "createComponent");
        function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
          if (old === vnodes || old == null && vnodes == null)
            return;
          else if (old == null || old.length === 0)
            createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
          else if (vnodes == null || vnodes.length === 0)
            removeNodes(parent, old, 0, old.length);
          else {
            var isOldKeyed = old[0] != null && old[0].key != null;
            var isKeyed = vnodes[0] != null && vnodes[0].key != null;
            var start = 0, oldStart = 0;
            if (!isOldKeyed)
              while (oldStart < old.length && old[oldStart] == null)
                oldStart++;
            if (!isKeyed)
              while (start < vnodes.length && vnodes[start] == null)
                start++;
            if (isOldKeyed !== isKeyed) {
              removeNodes(parent, old, oldStart, old.length);
              createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else if (!isKeyed) {
              var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
              start = start < oldStart ? start : oldStart;
              for (; start < commonLength; start++) {
                o = old[start];
                v = vnodes[start];
                if (o === v || o == null && v == null)
                  continue;
                else if (o == null)
                  createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
                else if (v == null)
                  removeNode(parent, o);
                else
                  updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
              }
              if (old.length > commonLength)
                removeNodes(parent, old, start, old.length);
              if (vnodes.length > commonLength)
                createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else {
              var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
              while (oldEnd >= oldStart && end >= start) {
                oe = old[oldEnd];
                ve = vnodes[end];
                if (oe.key !== ve.key)
                  break;
                if (oe !== ve)
                  updateNode(parent, oe, ve, hooks, nextSibling, ns);
                if (ve.dom != null)
                  nextSibling = ve.dom;
                oldEnd--, end--;
              }
              while (oldEnd >= oldStart && end >= start) {
                o = old[oldStart];
                v = vnodes[start];
                if (o.key !== v.key)
                  break;
                oldStart++, start++;
                if (o !== v)
                  updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
              }
              while (oldEnd >= oldStart && end >= start) {
                if (start === end)
                  break;
                if (o.key !== ve.key || oe.key !== v.key)
                  break;
                topSibling = getNextSibling(old, oldStart, nextSibling);
                moveNodes(parent, oe, topSibling);
                if (oe !== v)
                  updateNode(parent, oe, v, hooks, topSibling, ns);
                if (++start <= --end)
                  moveNodes(parent, o, nextSibling);
                if (o !== ve)
                  updateNode(parent, o, ve, hooks, nextSibling, ns);
                if (ve.dom != null)
                  nextSibling = ve.dom;
                oldStart++;
                oldEnd--;
                oe = old[oldEnd];
                ve = vnodes[end];
                o = old[oldStart];
                v = vnodes[start];
              }
              while (oldEnd >= oldStart && end >= start) {
                if (oe.key !== ve.key)
                  break;
                if (oe !== ve)
                  updateNode(parent, oe, ve, hooks, nextSibling, ns);
                if (ve.dom != null)
                  nextSibling = ve.dom;
                oldEnd--, end--;
                oe = old[oldEnd];
                ve = vnodes[end];
              }
              if (start > end)
                removeNodes(parent, old, oldStart, oldEnd + 1);
              else if (oldStart > oldEnd)
                createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
              else {
                var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
                for (i = 0; i < vnodesLength; i++)
                  oldIndices[i] = -1;
                for (i = end; i >= start; i--) {
                  if (map == null)
                    map = getKeyMap(old, oldStart, oldEnd + 1);
                  ve = vnodes[i];
                  var oldIndex = map[ve.key];
                  if (oldIndex != null) {
                    pos = oldIndex < pos ? oldIndex : -1;
                    oldIndices[i - start] = oldIndex;
                    oe = old[oldIndex];
                    old[oldIndex] = null;
                    if (oe !== ve)
                      updateNode(parent, oe, ve, hooks, nextSibling, ns);
                    if (ve.dom != null)
                      nextSibling = ve.dom;
                    matched++;
                  }
                }
                nextSibling = originalNextSibling;
                if (matched !== oldEnd - oldStart + 1)
                  removeNodes(parent, old, oldStart, oldEnd + 1);
                if (matched === 0)
                  createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                else {
                  if (pos === -1) {
                    lisIndices = makeLisIndices(oldIndices);
                    li = lisIndices.length - 1;
                    for (i = end; i >= start; i--) {
                      v = vnodes[i];
                      if (oldIndices[i - start] === -1)
                        createNode(parent, v, hooks, ns, nextSibling);
                      else {
                        if (lisIndices[li] === i - start)
                          li--;
                        else
                          moveNodes(parent, v, nextSibling);
                      }
                      if (v.dom != null)
                        nextSibling = vnodes[i].dom;
                    }
                  } else {
                    for (i = end; i >= start; i--) {
                      v = vnodes[i];
                      if (oldIndices[i - start] === -1)
                        createNode(parent, v, hooks, ns, nextSibling);
                      if (v.dom != null)
                        nextSibling = vnodes[i].dom;
                    }
                  }
                }
              }
            }
          }
        }
        __name(updateNodes, "updateNodes");
        function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
          var oldTag = old.tag, tag = vnode.tag;
          if (oldTag === tag) {
            vnode.state = old.state;
            vnode.events = old.events;
            if (shouldNotUpdate(vnode, old))
              return;
            if (typeof oldTag === "string") {
              if (vnode.attrs != null) {
                updateLifecycle(vnode.attrs, vnode, hooks);
              }
              switch (oldTag) {
                case "#":
                  updateText(old, vnode);
                  break;
                case "<":
                  updateHTML(parent, old, vnode, ns, nextSibling);
                  break;
                case "[":
                  updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                  break;
                default:
                  updateElement(old, vnode, hooks, ns);
              }
            } else
              updateComponent(parent, old, vnode, hooks, nextSibling, ns);
          } else {
            removeNode(parent, old);
            createNode(parent, vnode, hooks, ns, nextSibling);
          }
        }
        __name(updateNode, "updateNode");
        function updateText(old, vnode) {
          if (old.children.toString() !== vnode.children.toString()) {
            old.dom.nodeValue = vnode.children;
          }
          vnode.dom = old.dom;
        }
        __name(updateText, "updateText");
        function updateHTML(parent, old, vnode, ns, nextSibling) {
          if (old.children !== vnode.children) {
            removeHTML(parent, old);
            createHTML(parent, vnode, ns, nextSibling);
          } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
            vnode.instance = old.instance;
          }
        }
        __name(updateHTML, "updateHTML");
        function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
          updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
          var domSize = 0, children = vnode.children;
          vnode.dom = null;
          if (children != null) {
            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child != null && child.dom != null) {
                if (vnode.dom == null)
                  vnode.dom = child.dom;
                domSize += child.domSize || 1;
              }
            }
            if (domSize !== 1)
              vnode.domSize = domSize;
          }
        }
        __name(updateFragment, "updateFragment");
        function updateElement(old, vnode, hooks, ns) {
          var element = vnode.dom = old.dom;
          ns = getNameSpace(vnode) || ns;
          if (vnode.tag === "textarea") {
            if (vnode.attrs == null)
              vnode.attrs = {};
          }
          updateAttrs(vnode, old.attrs, vnode.attrs, ns);
          if (!maybeSetContentEditable(vnode)) {
            updateNodes(element, old.children, vnode.children, hooks, null, ns);
          }
        }
        __name(updateElement, "updateElement");
        function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
          vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
          if (vnode.instance === vnode)
            throw Error("A view cannot return the vnode it received as argument");
          updateLifecycle(vnode.state, vnode, hooks);
          if (vnode.attrs != null)
            updateLifecycle(vnode.attrs, vnode, hooks);
          if (vnode.instance != null) {
            if (old.instance == null)
              createNode(parent, vnode.instance, hooks, ns, nextSibling);
            else
              updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.instance.domSize;
          } else if (old.instance != null) {
            removeNode(parent, old.instance);
            vnode.dom = void 0;
            vnode.domSize = 0;
          } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
          }
        }
        __name(updateComponent, "updateComponent");
        function getKeyMap(vnodes, start, end) {
          var map = /* @__PURE__ */ Object.create(null);
          for (; start < end; start++) {
            var vnode = vnodes[start];
            if (vnode != null) {
              var key = vnode.key;
              if (key != null)
                map[key] = start;
            }
          }
          return map;
        }
        __name(getKeyMap, "getKeyMap");
        var lisTemp = [];
        function makeLisIndices(a) {
          var result = [0];
          var u = 0, v = 0, i = 0;
          var il = lisTemp.length = a.length;
          for (var i = 0; i < il; i++)
            lisTemp[i] = a[i];
          for (var i = 0; i < il; ++i) {
            if (a[i] === -1)
              continue;
            var j = result[result.length - 1];
            if (a[j] < a[i]) {
              lisTemp[i] = j;
              result.push(i);
              continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
              var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
              if (a[result[c]] < a[i]) {
                u = c + 1;
              } else {
                v = c;
              }
            }
            if (a[i] < a[result[u]]) {
              if (u > 0)
                lisTemp[i] = result[u - 1];
              result[u] = i;
            }
          }
          u = result.length;
          v = result[u - 1];
          while (u-- > 0) {
            result[u] = v;
            v = lisTemp[v];
          }
          lisTemp.length = 0;
          return result;
        }
        __name(makeLisIndices, "makeLisIndices");
        function getNextSibling(vnodes, i, nextSibling) {
          for (; i < vnodes.length; i++) {
            if (vnodes[i] != null && vnodes[i].dom != null)
              return vnodes[i].dom;
          }
          return nextSibling;
        }
        __name(getNextSibling, "getNextSibling");
        function moveNodes(parent, vnode, nextSibling) {
          var frag = $doc.createDocumentFragment();
          moveChildToFrag(parent, frag, vnode);
          insertNode(parent, frag, nextSibling);
        }
        __name(moveNodes, "moveNodes");
        function moveChildToFrag(parent, frag, vnode) {
          while (vnode.dom != null && vnode.dom.parentNode === parent) {
            if (typeof vnode.tag !== "string") {
              vnode = vnode.instance;
              if (vnode != null)
                continue;
            } else if (vnode.tag === "<") {
              for (var i = 0; i < vnode.instance.length; i++) {
                frag.appendChild(vnode.instance[i]);
              }
            } else if (vnode.tag !== "[") {
              frag.appendChild(vnode.dom);
            } else if (vnode.children.length === 1) {
              vnode = vnode.children[0];
              if (vnode != null)
                continue;
            } else {
              for (var i = 0; i < vnode.children.length; i++) {
                var child = vnode.children[i];
                if (child != null)
                  moveChildToFrag(parent, frag, child);
              }
            }
            break;
          }
        }
        __name(moveChildToFrag, "moveChildToFrag");
        function insertNode(parent, dom, nextSibling) {
          if (nextSibling != null)
            parent.insertBefore(dom, nextSibling);
          else
            parent.appendChild(dom);
        }
        __name(insertNode, "insertNode");
        function maybeSetContentEditable(vnode) {
          if (vnode.attrs == null || vnode.attrs.contenteditable == null && // attribute
          vnode.attrs.contentEditable == null)
            return false;
          var children = vnode.children;
          if (children != null && children.length === 1 && children[0].tag === "<") {
            var content = children[0].children;
            if (vnode.dom.innerHTML !== content)
              vnode.dom.innerHTML = content;
          } else if (children != null && children.length !== 0)
            throw new Error("Child node of a contenteditable must be trusted.");
          return true;
        }
        __name(maybeSetContentEditable, "maybeSetContentEditable");
        function removeNodes(parent, vnodes, start, end) {
          for (var i = start; i < end; i++) {
            var vnode = vnodes[i];
            if (vnode != null)
              removeNode(parent, vnode);
          }
        }
        __name(removeNodes, "removeNodes");
        function removeNode(parent, vnode) {
          var mask = 0;
          var original = vnode.state;
          var stateResult, attrsResult;
          if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
            var result = callHook.call(vnode.state.onbeforeremove, vnode);
            if (result != null && typeof result.then === "function") {
              mask = 1;
              stateResult = result;
            }
          }
          if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
            var result = callHook.call(vnode.attrs.onbeforeremove, vnode);
            if (result != null && typeof result.then === "function") {
              mask |= 2;
              attrsResult = result;
            }
          }
          checkState(vnode, original);
          if (!mask) {
            onremove(vnode);
            removeChild(parent, vnode);
          } else {
            if (stateResult != null) {
              var next = /* @__PURE__ */ __name(function() {
                if (mask & 1) {
                  mask &= 2;
                  if (!mask)
                    reallyRemove();
                }
              }, "next");
              stateResult.then(next, next);
            }
            if (attrsResult != null) {
              var next = /* @__PURE__ */ __name(function() {
                if (mask & 2) {
                  mask &= 1;
                  if (!mask)
                    reallyRemove();
                }
              }, "next");
              attrsResult.then(next, next);
            }
          }
          function reallyRemove() {
            checkState(vnode, original);
            onremove(vnode);
            removeChild(parent, vnode);
          }
          __name(reallyRemove, "reallyRemove");
        }
        __name(removeNode, "removeNode");
        function removeHTML(parent, vnode) {
          for (var i = 0; i < vnode.instance.length; i++) {
            parent.removeChild(vnode.instance[i]);
          }
        }
        __name(removeHTML, "removeHTML");
        function removeChild(parent, vnode) {
          while (vnode.dom != null && vnode.dom.parentNode === parent) {
            if (typeof vnode.tag !== "string") {
              vnode = vnode.instance;
              if (vnode != null)
                continue;
            } else if (vnode.tag === "<") {
              removeHTML(parent, vnode);
            } else {
              if (vnode.tag !== "[") {
                parent.removeChild(vnode.dom);
                if (!Array.isArray(vnode.children))
                  break;
              }
              if (vnode.children.length === 1) {
                vnode = vnode.children[0];
                if (vnode != null)
                  continue;
              } else {
                for (var i = 0; i < vnode.children.length; i++) {
                  var child = vnode.children[i];
                  if (child != null)
                    removeChild(parent, child);
                }
              }
            }
            break;
          }
        }
        __name(removeChild, "removeChild");
        function onremove(vnode) {
          if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function")
            callHook.call(vnode.state.onremove, vnode);
          if (vnode.attrs && typeof vnode.attrs.onremove === "function")
            callHook.call(vnode.attrs.onremove, vnode);
          if (typeof vnode.tag !== "string") {
            if (vnode.instance != null)
              onremove(vnode.instance);
          } else {
            var children = vnode.children;
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child != null)
                  onremove(child);
              }
            }
          }
        }
        __name(onremove, "onremove");
        function setAttrs(vnode, attrs, ns) {
          if (vnode.tag === "input" && attrs.type != null)
            vnode.dom.setAttribute("type", attrs.type);
          var isFileInput = attrs != null && vnode.tag === "input" && attrs.type === "file";
          for (var key in attrs) {
            setAttr(vnode, key, null, attrs[key], ns, isFileInput);
          }
        }
        __name(setAttrs, "setAttrs");
        function setAttr(vnode, key, old, value, ns, isFileInput) {
          if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object" || key === "type" && vnode.tag === "input")
            return;
          if (key[0] === "o" && key[1] === "n")
            return updateEvent(vnode, key, value);
          if (key.slice(0, 6) === "xlink:")
            vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
          else if (key === "style")
            updateStyle(vnode.dom, old, value);
          else if (hasPropertyKey(vnode, key, ns)) {
            if (key === "value") {
              if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && (isFileInput || vnode.dom === activeElement()))
                return;
              if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value)
                return;
              if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value)
                return;
              if (isFileInput && "" + value !== "") {
                console.error("`value` is read-only on file inputs!");
                return;
              }
            }
            vnode.dom[key] = value;
          } else {
            if (typeof value === "boolean") {
              if (value)
                vnode.dom.setAttribute(key, "");
              else
                vnode.dom.removeAttribute(key);
            } else
              vnode.dom.setAttribute(key === "className" ? "class" : key, value);
          }
        }
        __name(setAttr, "setAttr");
        function removeAttr(vnode, key, old, ns) {
          if (key === "key" || key === "is" || old == null || isLifecycleMethod(key))
            return;
          if (key[0] === "o" && key[1] === "n")
            updateEvent(vnode, key, void 0);
          else if (key === "style")
            updateStyle(vnode.dom, old, null);
          else if (hasPropertyKey(vnode, key, ns) && key !== "className" && key !== "title" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement())) && !(vnode.tag === "input" && key === "type")) {
            vnode.dom[key] = null;
          } else {
            var nsLastIndex = key.indexOf(":");
            if (nsLastIndex !== -1)
              key = key.slice(nsLastIndex + 1);
            if (old !== false)
              vnode.dom.removeAttribute(key === "className" ? "class" : key);
          }
        }
        __name(removeAttr, "removeAttr");
        function setLateSelectAttrs(vnode, attrs) {
          if ("value" in attrs) {
            if (attrs.value === null) {
              if (vnode.dom.selectedIndex !== -1)
                vnode.dom.value = null;
            } else {
              var normalized = "" + attrs.value;
              if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
                vnode.dom.value = normalized;
              }
            }
          }
          if ("selectedIndex" in attrs)
            setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, void 0);
        }
        __name(setLateSelectAttrs, "setLateSelectAttrs");
        function updateAttrs(vnode, old, attrs, ns) {
          if (old && old === attrs) {
            console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");
          }
          if (attrs != null) {
            if (vnode.tag === "input" && attrs.type != null)
              vnode.dom.setAttribute("type", attrs.type);
            var isFileInput = vnode.tag === "input" && attrs.type === "file";
            for (var key in attrs) {
              setAttr(vnode, key, old && old[key], attrs[key], ns, isFileInput);
            }
          }
          var val;
          if (old != null) {
            for (var key in old) {
              if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) {
                removeAttr(vnode, key, val, ns);
              }
            }
          }
        }
        __name(updateAttrs, "updateAttrs");
        function isFormAttribute(vnode, attr) {
          return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement;
        }
        __name(isFormAttribute, "isFormAttribute");
        function isLifecycleMethod(attr) {
          return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
        }
        __name(isLifecycleMethod, "isLifecycleMethod");
        function hasPropertyKey(vnode, key, ns) {
          return ns === void 0 && // If it's a custom element, just keep it.
          (vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is || // If it's a normal element, let's try to avoid a few browser bugs.
          key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height") && key in vnode.dom;
        }
        __name(hasPropertyKey, "hasPropertyKey");
        var uppercaseRegex = /[A-Z]/g;
        function toLowerCase(capital) {
          return "-" + capital.toLowerCase();
        }
        __name(toLowerCase, "toLowerCase");
        function normalizeKey(key) {
          return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase);
        }
        __name(normalizeKey, "normalizeKey");
        function updateStyle(element, old, style) {
          if (old === style) {
          } else if (style == null) {
            element.style.cssText = "";
          } else if (typeof style !== "object") {
            element.style.cssText = style;
          } else if (old == null || typeof old !== "object") {
            element.style.cssText = "";
            for (var key in style) {
              var value = style[key];
              if (value != null)
                element.style.setProperty(normalizeKey(key), String(value));
            }
          } else {
            for (var key in style) {
              var value = style[key];
              if (value != null && (value = String(value)) !== String(old[key])) {
                element.style.setProperty(normalizeKey(key), value);
              }
            }
            for (var key in old) {
              if (old[key] != null && style[key] == null) {
                element.style.removeProperty(normalizeKey(key));
              }
            }
          }
        }
        __name(updateStyle, "updateStyle");
        function EventDict() {
          this._ = currentRedraw;
        }
        __name(EventDict, "EventDict");
        EventDict.prototype = /* @__PURE__ */ Object.create(null);
        EventDict.prototype.handleEvent = function(ev) {
          var handler = this["on" + ev.type];
          var result;
          if (typeof handler === "function")
            result = handler.call(ev.currentTarget, ev);
          else if (typeof handler.handleEvent === "function")
            handler.handleEvent(ev);
          if (this._ && ev.redraw !== false)
            (0, this._)();
          if (result === false) {
            ev.preventDefault();
            ev.stopPropagation();
          }
        };
        function updateEvent(vnode, key, value) {
          if (vnode.events != null) {
            vnode.events._ = currentRedraw;
            if (vnode.events[key] === value)
              return;
            if (value != null && (typeof value === "function" || typeof value === "object")) {
              if (vnode.events[key] == null)
                vnode.dom.addEventListener(key.slice(2), vnode.events, false);
              vnode.events[key] = value;
            } else {
              if (vnode.events[key] != null)
                vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
              vnode.events[key] = void 0;
            }
          } else if (value != null && (typeof value === "function" || typeof value === "object")) {
            vnode.events = new EventDict();
            vnode.dom.addEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = value;
          }
        }
        __name(updateEvent, "updateEvent");
        function initLifecycle(source, vnode, hooks) {
          if (typeof source.oninit === "function")
            callHook.call(source.oninit, vnode);
          if (typeof source.oncreate === "function")
            hooks.push(callHook.bind(source.oncreate, vnode));
        }
        __name(initLifecycle, "initLifecycle");
        function updateLifecycle(source, vnode, hooks) {
          if (typeof source.onupdate === "function")
            hooks.push(callHook.bind(source.onupdate, vnode));
        }
        __name(updateLifecycle, "updateLifecycle");
        function shouldNotUpdate(vnode, old) {
          do {
            if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
              var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
              if (force !== void 0 && !force)
                break;
            }
            if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
              var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
              if (force !== void 0 && !force)
                break;
            }
            return false;
          } while (false);
          vnode.dom = old.dom;
          vnode.domSize = old.domSize;
          vnode.instance = old.instance;
          vnode.attrs = old.attrs;
          vnode.children = old.children;
          vnode.text = old.text;
          return true;
        }
        __name(shouldNotUpdate, "shouldNotUpdate");
        var currentDOM;
        return function(dom, vnodes, redraw) {
          if (!dom)
            throw new TypeError("DOM element being rendered to does not exist.");
          if (currentDOM != null && dom.contains(currentDOM)) {
            throw new TypeError("Node is currently being rendered to and thus is locked.");
          }
          var prevRedraw = currentRedraw;
          var prevDOM = currentDOM;
          var hooks = [];
          var active = activeElement();
          var namespace = dom.namespaceURI;
          currentDOM = dom;
          currentRedraw = typeof redraw === "function" ? redraw : void 0;
          try {
            if (dom.vnodes == null)
              dom.textContent = "";
            vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
            updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? void 0 : namespace);
            dom.vnodes = vnodes;
            if (active != null && activeElement() !== active && typeof active.focus === "function")
              active.focus();
            for (var i = 0; i < hooks.length; i++)
              hooks[i]();
          } finally {
            currentRedraw = prevRedraw;
            currentDOM = prevDOM;
          }
        };
      };
    }
  });

  // node_modules/mithril/render.js
  var require_render2 = __commonJS({
    "node_modules/mithril/render.js"(exports, module) {
      "use strict";
      module.exports = require_render()(typeof window !== "undefined" ? window : null);
    }
  });

  // node_modules/mithril/api/mount-redraw.js
  var require_mount_redraw = __commonJS({
    "node_modules/mithril/api/mount-redraw.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function(render, schedule, console2) {
        var subscriptions = [];
        var pending = false;
        var offset = -1;
        function sync() {
          for (offset = 0; offset < subscriptions.length; offset += 2) {
            try {
              render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw);
            } catch (e) {
              console2.error(e);
            }
          }
          offset = -1;
        }
        __name(sync, "sync");
        function redraw() {
          if (!pending) {
            pending = true;
            schedule(function() {
              pending = false;
              sync();
            });
          }
        }
        __name(redraw, "redraw");
        redraw.sync = sync;
        function mount(root, component) {
          if (component != null && component.view == null && typeof component !== "function") {
            throw new TypeError("m.mount expects a component, not a vnode.");
          }
          var index = subscriptions.indexOf(root);
          if (index >= 0) {
            subscriptions.splice(index, 2);
            if (index <= offset)
              offset -= 2;
            render(root, []);
          }
          if (component != null) {
            subscriptions.push(root, component);
            render(root, Vnode(component), redraw);
          }
        }
        __name(mount, "mount");
        return { mount, redraw };
      };
    }
  });

  // node_modules/mithril/mount-redraw.js
  var require_mount_redraw2 = __commonJS({
    "node_modules/mithril/mount-redraw.js"(exports, module) {
      "use strict";
      var render = require_render2();
      module.exports = require_mount_redraw()(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null);
    }
  });

  // node_modules/mithril/querystring/build.js
  var require_build = __commonJS({
    "node_modules/mithril/querystring/build.js"(exports, module) {
      "use strict";
      module.exports = function(object) {
        if (Object.prototype.toString.call(object) !== "[object Object]")
          return "";
        var args = [];
        for (var key in object) {
          destructure(key, object[key]);
        }
        return args.join("&");
        function destructure(key2, value) {
          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              destructure(key2 + "[" + i + "]", value[i]);
            }
          } else if (Object.prototype.toString.call(value) === "[object Object]") {
            for (var i in value) {
              destructure(key2 + "[" + i + "]", value[i]);
            }
          } else
            args.push(encodeURIComponent(key2) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
        }
        __name(destructure, "destructure");
      };
    }
  });

  // node_modules/mithril/util/assign.js
  var require_assign = __commonJS({
    "node_modules/mithril/util/assign.js"(exports, module) {
      "use strict";
      var hasOwn = require_hasOwn();
      module.exports = Object.assign || function(target, source) {
        for (var key in source) {
          if (hasOwn.call(source, key))
            target[key] = source[key];
        }
      };
    }
  });

  // node_modules/mithril/pathname/build.js
  var require_build2 = __commonJS({
    "node_modules/mithril/pathname/build.js"(exports, module) {
      "use strict";
      var buildQueryString = require_build();
      var assign = require_assign();
      module.exports = function(template, params) {
        if (/:([^\/\.-]+)(\.{3})?:/.test(template)) {
          throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");
        }
        if (params == null)
          return template;
        var queryIndex = template.indexOf("?");
        var hashIndex = template.indexOf("#");
        var queryEnd = hashIndex < 0 ? template.length : hashIndex;
        var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
        var path = template.slice(0, pathEnd);
        var query = {};
        assign(query, params);
        var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m2, key, variadic) {
          delete query[key];
          if (params[key] == null)
            return m2;
          return variadic ? params[key] : encodeURIComponent(String(params[key]));
        });
        var newQueryIndex = resolved.indexOf("?");
        var newHashIndex = resolved.indexOf("#");
        var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
        var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
        var result = resolved.slice(0, newPathEnd);
        if (queryIndex >= 0)
          result += template.slice(queryIndex, queryEnd);
        if (newQueryIndex >= 0)
          result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
        var querystring = buildQueryString(query);
        if (querystring)
          result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
        if (hashIndex >= 0)
          result += template.slice(hashIndex);
        if (newHashIndex >= 0)
          result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
        return result;
      };
    }
  });

  // node_modules/mithril/request/request.js
  var require_request = __commonJS({
    "node_modules/mithril/request/request.js"(exports, module) {
      "use strict";
      var buildPathname = require_build2();
      var hasOwn = require_hasOwn();
      module.exports = function($window, Promise2, oncompletion) {
        var callbackCount = 0;
        function PromiseProxy(executor) {
          return new Promise2(executor);
        }
        __name(PromiseProxy, "PromiseProxy");
        PromiseProxy.prototype = Promise2.prototype;
        PromiseProxy.__proto__ = Promise2;
        function makeRequest(factory) {
          return function(url, args) {
            if (typeof url !== "string") {
              args = url;
              url = url.url;
            } else if (args == null)
              args = {};
            var promise = new Promise2(function(resolve, reject) {
              factory(buildPathname(url, args.params), args, function(data) {
                if (typeof args.type === "function") {
                  if (Array.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                      data[i] = new args.type(data[i]);
                    }
                  } else
                    data = new args.type(data);
                }
                resolve(data);
              }, reject);
            });
            if (args.background === true)
              return promise;
            var count = 0;
            function complete() {
              if (--count === 0 && typeof oncompletion === "function")
                oncompletion();
            }
            __name(complete, "complete");
            return wrap(promise);
            function wrap(promise2) {
              var then = promise2.then;
              promise2.constructor = PromiseProxy;
              promise2.then = function() {
                count++;
                var next = then.apply(promise2, arguments);
                next.then(complete, function(e) {
                  complete();
                  if (count === 0)
                    throw e;
                });
                return wrap(next);
              };
              return promise2;
            }
            __name(wrap, "wrap");
          };
        }
        __name(makeRequest, "makeRequest");
        function hasHeader(args, name) {
          for (var key in args.headers) {
            if (hasOwn.call(args.headers, key) && key.toLowerCase() === name)
              return true;
          }
          return false;
        }
        __name(hasHeader, "hasHeader");
        return {
          request: makeRequest(function(url, args, resolve, reject) {
            var method = args.method != null ? args.method.toUpperCase() : "GET";
            var body = args.body;
            var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData || body instanceof $window.URLSearchParams);
            var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
            var xhr = new $window.XMLHttpRequest(), aborted = false, isTimeout = false;
            var original = xhr, replacedAbort;
            var abort = xhr.abort;
            xhr.abort = function() {
              aborted = true;
              abort.call(this);
            };
            xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : void 0, typeof args.password === "string" ? args.password : void 0);
            if (assumeJSON && body != null && !hasHeader(args, "content-type")) {
              xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            }
            if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) {
              xhr.setRequestHeader("Accept", "application/json, text/*");
            }
            if (args.withCredentials)
              xhr.withCredentials = args.withCredentials;
            if (args.timeout)
              xhr.timeout = args.timeout;
            xhr.responseType = responseType;
            for (var key in args.headers) {
              if (hasOwn.call(args.headers, key)) {
                xhr.setRequestHeader(key, args.headers[key]);
              }
            }
            xhr.onreadystatechange = function(ev) {
              if (aborted)
                return;
              if (ev.target.readyState === 4) {
                try {
                  var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                  var response = ev.target.response, message;
                  if (responseType === "json") {
                    if (!ev.target.responseType && typeof args.extract !== "function") {
                      try {
                        response = JSON.parse(ev.target.responseText);
                      } catch (e) {
                        response = null;
                      }
                    }
                  } else if (!responseType || responseType === "text") {
                    if (response == null)
                      response = ev.target.responseText;
                  }
                  if (typeof args.extract === "function") {
                    response = args.extract(ev.target, args);
                    success = true;
                  } else if (typeof args.deserialize === "function") {
                    response = args.deserialize(response);
                  }
                  if (success)
                    resolve(response);
                  else {
                    var completeErrorResponse = /* @__PURE__ */ __name(function() {
                      try {
                        message = ev.target.responseText;
                      } catch (e) {
                        message = response;
                      }
                      var error = new Error(message);
                      error.code = ev.target.status;
                      error.response = response;
                      reject(error);
                    }, "completeErrorResponse");
                    if (xhr.status === 0) {
                      setTimeout(function() {
                        if (isTimeout)
                          return;
                        completeErrorResponse();
                      });
                    } else
                      completeErrorResponse();
                  }
                } catch (e) {
                  reject(e);
                }
              }
            };
            xhr.ontimeout = function(ev) {
              isTimeout = true;
              var error = new Error("Request timed out");
              error.code = ev.target.status;
              reject(error);
            };
            if (typeof args.config === "function") {
              xhr = args.config(xhr, args, url) || xhr;
              if (xhr !== original) {
                replacedAbort = xhr.abort;
                xhr.abort = function() {
                  aborted = true;
                  replacedAbort.call(this);
                };
              }
            }
            if (body == null)
              xhr.send();
            else if (typeof args.serialize === "function")
              xhr.send(args.serialize(body));
            else if (body instanceof $window.FormData || body instanceof $window.URLSearchParams)
              xhr.send(body);
            else
              xhr.send(JSON.stringify(body));
          }),
          jsonp: makeRequest(function(url, args, resolve, reject) {
            var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
            var script = $window.document.createElement("script");
            $window[callbackName] = function(data) {
              delete $window[callbackName];
              script.parentNode.removeChild(script);
              resolve(data);
            };
            script.onerror = function() {
              delete $window[callbackName];
              script.parentNode.removeChild(script);
              reject(new Error("JSONP request failed"));
            };
            script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
            $window.document.documentElement.appendChild(script);
          })
        };
      };
    }
  });

  // node_modules/mithril/request.js
  var require_request2 = __commonJS({
    "node_modules/mithril/request.js"(exports, module) {
      "use strict";
      var PromisePolyfill = require_promise();
      var mountRedraw = require_mount_redraw2();
      module.exports = require_request()(typeof window !== "undefined" ? window : null, PromisePolyfill, mountRedraw.redraw);
    }
  });

  // node_modules/mithril/querystring/parse.js
  var require_parse = __commonJS({
    "node_modules/mithril/querystring/parse.js"(exports, module) {
      "use strict";
      function decodeURIComponentSave(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return str;
        }
      }
      __name(decodeURIComponentSave, "decodeURIComponentSave");
      module.exports = function(string) {
        if (string === "" || string == null)
          return {};
        if (string.charAt(0) === "?")
          string = string.slice(1);
        var entries = string.split("&"), counters = {}, data = {};
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i].split("=");
          var key = decodeURIComponentSave(entry[0]);
          var value = entry.length === 2 ? decodeURIComponentSave(entry[1]) : "";
          if (value === "true")
            value = true;
          else if (value === "false")
            value = false;
          var levels = key.split(/\]\[?|\[/);
          var cursor = data;
          if (key.indexOf("[") > -1)
            levels.pop();
          for (var j = 0; j < levels.length; j++) {
            var level = levels[j], nextLevel = levels[j + 1];
            var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
            if (level === "") {
              var key = levels.slice(0, j).join();
              if (counters[key] == null) {
                counters[key] = Array.isArray(cursor) ? cursor.length : 0;
              }
              level = counters[key]++;
            } else if (level === "__proto__")
              break;
            if (j === levels.length - 1)
              cursor[level] = value;
            else {
              var desc = Object.getOwnPropertyDescriptor(cursor, level);
              if (desc != null)
                desc = desc.value;
              if (desc == null)
                cursor[level] = desc = isNumber ? [] : {};
              cursor = desc;
            }
          }
        }
        return data;
      };
    }
  });

  // node_modules/mithril/pathname/parse.js
  var require_parse2 = __commonJS({
    "node_modules/mithril/pathname/parse.js"(exports, module) {
      "use strict";
      var parseQueryString = require_parse();
      module.exports = function(url) {
        var queryIndex = url.indexOf("?");
        var hashIndex = url.indexOf("#");
        var queryEnd = hashIndex < 0 ? url.length : hashIndex;
        var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
        var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
        if (!path)
          path = "/";
        else {
          if (path[0] !== "/")
            path = "/" + path;
          if (path.length > 1 && path[path.length - 1] === "/")
            path = path.slice(0, -1);
        }
        return {
          path,
          params: queryIndex < 0 ? {} : parseQueryString(url.slice(queryIndex + 1, queryEnd))
        };
      };
    }
  });

  // node_modules/mithril/pathname/compileTemplate.js
  var require_compileTemplate = __commonJS({
    "node_modules/mithril/pathname/compileTemplate.js"(exports, module) {
      "use strict";
      var parsePathname = require_parse2();
      module.exports = function(template) {
        var templateData = parsePathname(template);
        var templateKeys = Object.keys(templateData.params);
        var keys = [];
        var regexp = new RegExp("^" + templateData.path.replace(
          // I escape literal text so people can use things like `:file.:ext` or
          // `:lang-:locale` in routes. This is all merged into one pass so I
          // don't also accidentally escape `-` and make it harder to detect it to
          // ban it from template parameters.
          /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
          function(m2, key, extra) {
            if (key == null)
              return "\\" + m2;
            keys.push({ k: key, r: extra === "..." });
            if (extra === "...")
              return "(.*)";
            if (extra === ".")
              return "([^/]+)\\.";
            return "([^/]+)" + (extra || "");
          }
        ) + "$");
        return function(data) {
          for (var i = 0; i < templateKeys.length; i++) {
            if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]])
              return false;
          }
          if (!keys.length)
            return regexp.test(data.path);
          var values = regexp.exec(data.path);
          if (values == null)
            return false;
          for (var i = 0; i < keys.length; i++) {
            data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
          }
          return true;
        };
      };
    }
  });

  // node_modules/mithril/util/censor.js
  var require_censor = __commonJS({
    "node_modules/mithril/util/censor.js"(exports, module) {
      "use strict";
      var hasOwn = require_hasOwn();
      var magic = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");
      module.exports = function(attrs, extras) {
        var result = {};
        if (extras != null) {
          for (var key in attrs) {
            if (hasOwn.call(attrs, key) && !magic.test(key) && extras.indexOf(key) < 0) {
              result[key] = attrs[key];
            }
          }
        } else {
          for (var key in attrs) {
            if (hasOwn.call(attrs, key) && !magic.test(key)) {
              result[key] = attrs[key];
            }
          }
        }
        return result;
      };
    }
  });

  // node_modules/mithril/api/router.js
  var require_router = __commonJS({
    "node_modules/mithril/api/router.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var m2 = require_hyperscript();
      var Promise2 = require_promise();
      var buildPathname = require_build2();
      var parsePathname = require_parse2();
      var compileTemplate = require_compileTemplate();
      var assign = require_assign();
      var censor = require_censor();
      var sentinel = {};
      function decodeURIComponentSave(component) {
        try {
          return decodeURIComponent(component);
        } catch (e) {
          return component;
        }
      }
      __name(decodeURIComponentSave, "decodeURIComponentSave");
      module.exports = function($window, mountRedraw) {
        var callAsync = $window == null ? null : typeof $window.setImmediate === "function" ? $window.setImmediate : $window.setTimeout;
        var p = Promise2.resolve();
        var scheduled = false;
        var ready = false;
        var state = 0;
        var compiled, fallbackRoute;
        var currentResolver = sentinel, component, attrs, currentPath, lastUpdate;
        var RouterRoot = {
          onbeforeupdate: function() {
            state = state ? 2 : 1;
            return !(!state || sentinel === currentResolver);
          },
          onremove: function() {
            $window.removeEventListener("popstate", fireAsync, false);
            $window.removeEventListener("hashchange", resolveRoute, false);
          },
          view: function() {
            if (!state || sentinel === currentResolver)
              return;
            var vnode = [Vnode(component, attrs.key, attrs)];
            if (currentResolver)
              vnode = currentResolver.render(vnode[0]);
            return vnode;
          }
        };
        var SKIP = route.SKIP = {};
        function resolveRoute() {
          scheduled = false;
          var prefix = $window.location.hash;
          if (route.prefix[0] !== "#") {
            prefix = $window.location.search + prefix;
            if (route.prefix[0] !== "?") {
              prefix = $window.location.pathname + prefix;
              if (prefix[0] !== "/")
                prefix = "/" + prefix;
            }
          }
          var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponentSave).slice(route.prefix.length);
          var data = parsePathname(path);
          assign(data.params, $window.history.state);
          function reject(e) {
            console.error(e);
            setPath(fallbackRoute, null, { replace: true });
          }
          __name(reject, "reject");
          loop(0);
          function loop(i) {
            for (; i < compiled.length; i++) {
              if (compiled[i].check(data)) {
                var payload = compiled[i].component;
                var matchedRoute = compiled[i].route;
                var localComp = payload;
                var update = lastUpdate = /* @__PURE__ */ __name(function(comp) {
                  if (update !== lastUpdate)
                    return;
                  if (comp === SKIP)
                    return loop(i + 1);
                  component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                  attrs = data.params, currentPath = path, lastUpdate = null;
                  currentResolver = payload.render ? payload : null;
                  if (state === 2)
                    mountRedraw.redraw();
                  else {
                    state = 2;
                    mountRedraw.redraw.sync();
                  }
                }, "lastUpdate");
                if (payload.view || typeof payload === "function") {
                  payload = {};
                  update(localComp);
                } else if (payload.onmatch) {
                  p.then(function() {
                    return payload.onmatch(data.params, path, matchedRoute);
                  }).then(update, path === fallbackRoute ? null : reject);
                } else
                  update("div");
                return;
              }
            }
            if (path === fallbackRoute) {
              throw new Error("Could not resolve default route " + fallbackRoute + ".");
            }
            setPath(fallbackRoute, null, { replace: true });
          }
          __name(loop, "loop");
        }
        __name(resolveRoute, "resolveRoute");
        function fireAsync() {
          if (!scheduled) {
            scheduled = true;
            callAsync(resolveRoute);
          }
        }
        __name(fireAsync, "fireAsync");
        function setPath(path, data, options) {
          path = buildPathname(path, data);
          if (ready) {
            fireAsync();
            var state2 = options ? options.state : null;
            var title = options ? options.title : null;
            if (options && options.replace)
              $window.history.replaceState(state2, title, route.prefix + path);
            else
              $window.history.pushState(state2, title, route.prefix + path);
          } else {
            $window.location.href = route.prefix + path;
          }
        }
        __name(setPath, "setPath");
        function route(root, defaultRoute, routes) {
          if (!root)
            throw new TypeError("DOM element being rendered to does not exist.");
          compiled = Object.keys(routes).map(function(route2) {
            if (route2[0] !== "/")
              throw new SyntaxError("Routes must start with a '/'.");
            if (/:([^\/\.-]+)(\.{3})?:/.test(route2)) {
              throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");
            }
            return {
              route: route2,
              component: routes[route2],
              check: compileTemplate(route2)
            };
          });
          fallbackRoute = defaultRoute;
          if (defaultRoute != null) {
            var defaultData = parsePathname(defaultRoute);
            if (!compiled.some(function(i) {
              return i.check(defaultData);
            })) {
              throw new ReferenceError("Default route doesn't match any known routes.");
            }
          }
          if (typeof $window.history.pushState === "function") {
            $window.addEventListener("popstate", fireAsync, false);
          } else if (route.prefix[0] === "#") {
            $window.addEventListener("hashchange", resolveRoute, false);
          }
          ready = true;
          mountRedraw.mount(root, RouterRoot);
          resolveRoute();
        }
        __name(route, "route");
        route.set = function(path, data, options) {
          if (lastUpdate != null) {
            options = options || {};
            options.replace = true;
          }
          lastUpdate = null;
          setPath(path, data, options);
        };
        route.get = function() {
          return currentPath;
        };
        route.prefix = "#!";
        route.Link = {
          view: function(vnode) {
            var child = m2(
              vnode.attrs.selector || "a",
              censor(vnode.attrs, ["options", "params", "selector", "onclick"]),
              vnode.children
            );
            var options, onclick, href;
            if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
              child.attrs.href = null;
              child.attrs["aria-disabled"] = "true";
            } else {
              options = vnode.attrs.options;
              onclick = vnode.attrs.onclick;
              href = buildPathname(child.attrs.href, vnode.attrs.params);
              child.attrs.href = route.prefix + href;
              child.attrs.onclick = function(e) {
                var result;
                if (typeof onclick === "function") {
                  result = onclick.call(e.currentTarget, e);
                } else if (onclick == null || typeof onclick !== "object") {
                } else if (typeof onclick.handleEvent === "function") {
                  onclick.handleEvent(e);
                }
                if (
                  // Skip if `onclick` prevented default
                  result !== false && !e.defaultPrevented && // Ignore everything but left clicks
                  (e.button === 0 || e.which === 0 || e.which === 1) && // Let the browser handle `target=_blank`, etc.
                  (!e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
                  !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
                ) {
                  e.preventDefault();
                  e.redraw = false;
                  route.set(href, null, options);
                }
              };
            }
            return child;
          }
        };
        route.param = function(key) {
          return attrs && key != null ? attrs[key] : attrs;
        };
        return route;
      };
    }
  });

  // node_modules/mithril/route.js
  var require_route = __commonJS({
    "node_modules/mithril/route.js"(exports, module) {
      "use strict";
      var mountRedraw = require_mount_redraw2();
      module.exports = require_router()(typeof window !== "undefined" ? window : null, mountRedraw);
    }
  });

  // node_modules/mithril/index.js
  var require_mithril = __commonJS({
    "node_modules/mithril/index.js"(exports, module) {
      "use strict";
      var hyperscript = require_hyperscript2();
      var request = require_request2();
      var mountRedraw = require_mount_redraw2();
      var m2 = /* @__PURE__ */ __name(function m3() {
        return hyperscript.apply(this, arguments);
      }, "m");
      m2.m = hyperscript;
      m2.trust = hyperscript.trust;
      m2.fragment = hyperscript.fragment;
      m2.Fragment = "[";
      m2.mount = mountRedraw.mount;
      m2.route = require_route();
      m2.render = require_render2();
      m2.redraw = mountRedraw.redraw;
      m2.request = request.request;
      m2.jsonp = request.jsonp;
      m2.parseQueryString = require_parse();
      m2.buildQueryString = require_build();
      m2.parsePathname = require_parse2();
      m2.buildPathname = require_build2();
      m2.vnode = require_vnode();
      m2.PromisePolyfill = require_polyfill();
      m2.censor = require_censor();
      module.exports = m2;
    }
  });

  // node_modules/json-custom-numbers/dist/parse.js
  var require_parse3 = __commonJS({
    "node_modules/json-custom-numbers/dist/parse.js"(exports, module) {
      "use strict";
      var p = Object.defineProperty;
      var j = Object.getOwnPropertyDescriptor;
      var m2 = Object.getOwnPropertyNames;
      var I = Object.prototype.hasOwnProperty;
      var U = /* @__PURE__ */ __name((n, c) => {
        for (var i in c)
          p(n, i, { get: c[i], enumerable: true });
      }, "U");
      var S = /* @__PURE__ */ __name((n, c, i, s) => {
        if (c && typeof c == "object" || typeof c == "function")
          for (let d of m2(c))
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

  // index.ts
  var import_mithril = __toESM(require_mithril());

  // median.ts
  function median(data, destructive = false) {
    if (!destructive)
      data = [...data];
    const { length } = data;
    data.sort((a, b) => a - b);
    return length % 2 === 1 ? data[(length - 1) * 0.5] : 0.5 * data[length * 0.5 - 1] + 0.5 * data[length * 0.5];
  }
  __name(median, "median");

  // histogram.ts
  function round(n) {
    return n < 10 ? n.toPrecision(2) : n < 100 ? n.toFixed(1) : n.toFixed(0);
  }
  __name(round, "round");
  function histogram(data, binCount = 50, size = [400, 100], colors = ["#e30", "#03e"], margins = [30, 20, 20, 20], xtitle = "ops/sec") {
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
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${2}" style="${smallLabelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][i % 2 === lowestFirst ? 0 : 1]}">${String.fromCharCode(65 + i)}</text>
  <text dominant-baseline="hanging" x="${x + (i % 2 === lowestFirst ? 3 : -3)}" y="${12}" style="${labelStyle}" fill="${colors[i]}" text-anchor="${["start", "end"][i % 2 === lowestFirst ? 0 : 1]}">${round(median2)}</text>`;
    })}

</svg>`;
  }
  __name(histogram, "histogram");

  // mann-whitney-u.ts
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

  // log.ts
  function log(...args) {
    console.log(...args);
  }
  __name(log, "log");

  // compare.ts
  var t0;
  var t1;
  t0 = t1 = performance.now();
  while (t0 === t1) {
    t1 = performance.now();
  }
  var msRes = t1 - t0;
  var usRes = Math.round(msRes * 1e3);
  log(`Resolution: ${usRes}\u03BCs`);
  var trialDuration = Math.max(msRes * 100, 20);
  log(`Target trial duration: ${trialDuration}ms`);
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
  async function catchBreath() {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }
  __name(catchBreath, "catchBreath");
  async function compare(fns, cb = () => void 0) {
    const fnsLength = fns.length;
    let reps = 0;
    for (let i = 0; i < fnsLength; i++) {
      const fn = fns[i];
      const fnReps = opsPerDurationMs(fn, trialDuration);
      log(fn.toString(), `-> ${fnReps} reps/trial`);
      if (fnReps > reps)
        reps = fnReps;
      await catchBreath();
    }
    log(`Using ${reps} reps/trial`);
    const tReps = new Array(fnsLength);
    for (let i = 0; i < fnsLength; i++)
      tReps[i] = [];
    const tRepsSum = new Array(fnsLength).fill(0);
    const tRepsMean = new Array(fnsLength).fill(0);
    cb(reps, trials, 0);
    await catchBreath();
    for (let trial = 0; trial < trials; trial++) {
      for (let _i = 0; _i < fnsLength; _i++) {
        const i = (trial + _i) % fnsLength;
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
      cb(reps, trials, trial + 1);
      await catchBreath();
    }
    const tRepsMedians = tReps.map((tRep) => median(tRep));
    const tRepsUStats = fnsLength === 2 ? mannWhitneyU(tReps) : {};
    return { medians: tRepsMedians, ...tRepsUStats, tReps };
  }
  __name(compare, "compare");

  // implementations/01-native.ts
  var parse = JSON.parse;

  // node_modules/json-custom-numbers/dist/parse.mjs
  var import_parse = __toESM(require_parse3(), 1);
  var JSONParseError = import_parse.default.JSONParseError;
  var parse2 = import_parse.default.parse;

  // implementations/03-crockford.js
  var parse3 = function() {
    "use strict";
    var at;
    var ch;
    var escapee = {
      '"': '"',
      "\\": "\\",
      "/": "/",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	"
    };
    var text;
    var error = /* @__PURE__ */ __name(function(m2) {
      throw {
        name: "SyntaxError",
        message: m2,
        at,
        text
      };
    }, "error");
    var next = /* @__PURE__ */ __name(function(c) {
      if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
      }
      ch = text.charAt(at);
      at += 1;
      return ch;
    }, "next");
    var number = /* @__PURE__ */ __name(function() {
      var value2;
      var string2 = "";
      if (ch === "-") {
        string2 = "-";
        next("-");
      }
      while (ch >= "0" && ch <= "9") {
        string2 += ch;
        next();
      }
      if (ch === ".") {
        string2 += ".";
        while (next() && ch >= "0" && ch <= "9") {
          string2 += ch;
        }
      }
      if (ch === "e" || ch === "E") {
        string2 += ch;
        next();
        if (ch === "-" || ch === "+") {
          string2 += ch;
          next();
        }
        while (ch >= "0" && ch <= "9") {
          string2 += ch;
          next();
        }
      }
      value2 = +string2;
      if (!isFinite(value2)) {
        error("Bad number");
      } else {
        return value2;
      }
    }, "number");
    var string = /* @__PURE__ */ __name(function() {
      var hex;
      var i;
      var value2 = "";
      var uffff;
      if (ch === '"') {
        while (next()) {
          if (ch === '"') {
            next();
            return value2;
          }
          if (ch === "\\") {
            next();
            if (ch === "u") {
              uffff = 0;
              for (i = 0; i < 4; i += 1) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex)) {
                  break;
                }
                uffff = uffff * 16 + hex;
              }
              value2 += String.fromCharCode(uffff);
            } else if (typeof escapee[ch] === "string") {
              value2 += escapee[ch];
            } else {
              break;
            }
          } else {
            value2 += ch;
          }
        }
      }
      error("Bad string");
    }, "string");
    var white = /* @__PURE__ */ __name(function() {
      while (ch && ch <= " ") {
        next();
      }
    }, "white");
    var word = /* @__PURE__ */ __name(function() {
      switch (ch) {
        case "t":
          next("t");
          next("r");
          next("u");
          next("e");
          return true;
        case "f":
          next("f");
          next("a");
          next("l");
          next("s");
          next("e");
          return false;
        case "n":
          next("n");
          next("u");
          next("l");
          next("l");
          return null;
      }
      error("Unexpected '" + ch + "'");
    }, "word");
    var value;
    var array = /* @__PURE__ */ __name(function() {
      var arr = [];
      if (ch === "[") {
        next("[");
        white();
        if (ch === "]") {
          next("]");
          return arr;
        }
        while (ch) {
          arr.push(value());
          white();
          if (ch === "]") {
            next("]");
            return arr;
          }
          next(",");
          white();
        }
      }
      error("Bad array");
    }, "array");
    var object = /* @__PURE__ */ __name(function() {
      var key;
      var obj = {};
      if (ch === "{") {
        next("{");
        white();
        if (ch === "}") {
          next("}");
          return obj;
        }
        while (ch) {
          key = string();
          white();
          next(":");
          if (Object.hasOwnProperty.call(obj, key)) {
            error("Duplicate key '" + key + "'");
          }
          obj[key] = value();
          white();
          if (ch === "}") {
            next("}");
            return obj;
          }
          next(",");
          white();
        }
      }
      error("Bad object");
    }, "object");
    value = /* @__PURE__ */ __name(function() {
      white();
      switch (ch) {
        case "{":
          return object();
        case "[":
          return array();
        case '"':
          return string();
        case "-":
          return number();
        default:
          return ch >= "0" && ch <= "9" ? number() : word();
      }
    }, "value");
    return function(source, reviver) {
      var result;
      text = source;
      at = 0;
      ch = " ";
      result = value();
      white();
      if (ch) {
        error("Syntax error");
      }
      return typeof reviver === "function" ? (/* @__PURE__ */ __name(function walk(holder, key) {
        var k;
        var v;
        var val = holder[key];
        if (val && typeof val === "object") {
          for (k in val) {
            if (Object.prototype.hasOwnProperty.call(val, k)) {
              v = walk(val, k);
              if (v !== void 0) {
                val[k] = v;
              } else {
                delete val[k];
              }
            }
          }
        }
        return reviver.call(holder, key, val);
      }, "walk"))({ "": result }, "") : result;
    };
  }();

  // json-docs/bool-null-array.json
  var bool_null_array_default = [
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    null,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    null,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    null,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    null,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    false,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    true,
    null,
    null,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    null,
    null,
    true,
    false,
    false
  ];

  // json-docs/long-numbers-array.json
  var long_numbers_array_default = [
    12345678998765433e-8,
    123456789876543e111,
    9876543210123454e5,
    9189273645918274e5,
    12345678998765433e-8,
    1234567899876543e-1,
    9876543212012346e5,
    5432101234567899e5,
    1.2345678987654322e6,
    12345678998765433e-8,
    123456789876543e111,
    9876543210123454e5,
    9189273645918274e5,
    12345678998765433e-8,
    1234567899876543e-1,
    9876543212012346e5,
    5432101234567899e5,
    1.2345678987654322e6,
    12345678998765433e-8,
    123456789876543e111,
    9876543210123454e5,
    9189273645918274e5,
    12345678998765433e-8,
    1234567899876543e-1,
    9876543212012346e5,
    5432101234567899e5,
    1.2345678987654322e6,
    12345678998765433e-8,
    123456789876543e111,
    9876543210123454e5,
    9189273645918274e5,
    12345678998765433e-8
  ];

  // json-docs/long-strings-array.json
  var long_strings_array_default = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel est condimentum, aliquet quam id, gravida mi. Nullam maximus rhoncus ex, id sollicitudin sem dapibus at. Curabitur non erat vel sem euismod dapibus sit amet at nisi. Proin gravida quam non massa pulvinar, eu dictum massa iaculis. Fusce tempus finibus efficitur. Duis lacinia tellus nulla, nec eleifend urna posuere nec. Proin eget dui sem. Nam justo odio, dignissim eu nulla eu, euismod lobortis neque.\n\nFusce volutpat fringilla turpis eu porta. Donec lorem neque, maximus et tempor nec, rhoncus sed ligula. Suspendisse potenti. Cras et magna sit amet erat fringilla elementum. Nunc vulputate non magna vel pretium. Integer ac pulvinar mi. Sed quis ex metus.\n\nNulla eu risus suscipit, sagittis dui rutrum, ornare ipsum. Curabitur ut quam commodo, vulputate arcu sed, dictum purus. Fusce mollis et arcu eget commodo. Mauris eu ultrices felis. Phasellus efficitur orci consectetur efficitur semper. Duis quis lorem accumsan, hendrerit nulla nec, aliquam nulla. Cras luctus leo vitae ante auctor, et malesuada sapien aliquam. Vivamus interdum, risus nec tempor consectetur, urna diam tempor lectus, ac tempus tellus ex in nulla. Maecenas tincidunt volutpat felis. Suspendisse cursus pellentesque lacinia. Sed nec enim a eros condimentum luctus ac et purus. Quisque at quam mauris.\n\nVestibulum quis tempor tellus. Suspendisse posuere augue tortor, eu viverra velit ullamcorper nec. Nulla facilisi. Duis nunc diam, gravida a dignissim sed, condimentum in massa. Curabitur molestie non dolor a efficitur. Nulla sit amet risus at eros lacinia tincidunt eget nec eros. Cras aliquam libero a sem iaculis mattis. Curabitur tempor molestie ipsum, eget mollis sapien. Suspendisse potenti. Proin id facilisis turpis. Suspendisse condimentum nisi eu sem gravida mollis. Curabitur vestibulum odio vel rhoncus fermentum. Mauris ornare arcu et est pretium mattis.\n\nMorbi maximus erat lacus, et vulputate urna tempor vel. Curabitur blandit, nibh sit amet laoreet suscipit, felis justo luctus orci, id ultricies risus nulla vitae enim. Donec non tellus arcu. Nunc auctor sit amet augue eget dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut auctor est eu est pellentesque, vel eleifend felis porta. Sed cursus justo neque, eget viverra dolor volutpat vel. Morbi vel lectus interdum, sagittis sapien vitae, rutrum odio. Praesent eu gravida urna, sit amet volutpat mi. Pellentesque euismod enim est, id tincidunt massa suscipit sit amet.\n\nAliquam cursus, justo vitae semper varius, lorem enim rhoncus risus, sit amet iaculis magna tortor ac metus. Aliquam accumsan tortor vel velit volutpat molestie. Sed dapibus odio ac justo porttitor scelerisque. Donec id nisl justo. In non turpis lorem. Vestibulum fermentum suscipit feugiat. Morbi blandit mollis egestas. Proin eget vulputate justo. Suspendisse potenti. Suspendisse eu enim quis odio iaculis pellentesque. Suspendisse potenti. Morbi maximus turpis scelerisque, pretium urna id, vehicula sapien. Phasellus vel dui mauris. Etiam eget molestie nunc, a fringilla neque. Duis quis augue et odio tempor molestie.\n\nInteger at erat ut magna viverra fringilla. Vivamus at nibh in lacus sagittis blandit. Etiam vitae malesuada dui. Duis nec quam vulputate, tempor magna malesuada, tempor nisl. Cras pulvinar tincidunt sagittis. Pellentesque id sapien sed quam vulputate vehicula. Nulla hendrerit leo eu felis tempor, in pellentesque lacus ultricies. Vestibulum et tortor eu felis eleifend euismod ac ut mi. Proin efficitur maximus diam, in egestas sapien. Ut luctus tincidunt neque, ac aliquam purus lacinia efficitur. Maecenas varius diam in blandit facilisis.\n\nVivamus sed odio quis lorem laoreet ultrices. Nam mollis ipsum in fringilla vulputate. Vestibulum non dolor congue, congue enim in, finibus ex. Pellentesque quis euismod neque, sed fermentum dui. Morbi imperdiet nibh a tellus rutrum, sed rutrum nulla luctus. Aenean eu condimentum magna, vitae elementum augue. Maecenas quis metus eget lectus auctor egestas. Vestibulum sodales, neque eget aliquam nam.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut nibh at augue feugiat semper. Aliquam sollicitudin sapien risus, nec dictum ante porta eu. Cras vel tortor vel sapien aliquam blandit vel eu orci. Aenean sit amet metus elementum, efficitur felis quis, condimentum dolor. Suspendisse potenti. Donec ornare, turpis sed ornare eleifend, arcu augue tempus ipsum, eget luctus quam augue eget tellus. Aenean vehicula nibh felis, vel posuere lorem vehicula vitae. Duis imperdiet luctus dolor vel faucibus.\n\nEtiam id tellus elementum, tempor dolor nec, sodales nunc. Quisque at quam pharetra, imperdiet mauris lobortis, hendrerit sapien. Cras suscipit magna quis lacinia molestie. In ullamcorper posuere posuere. Praesent vitae tristique lorem. Donec placerat leo nec tellus vehicula, vitae ultrices ipsum cursus. Duis interdum tristique odio non ultrices. Aenean in fringilla purus. Maecenas posuere faucibus lectus, at mattis augue vulputate sollicitudin. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi scelerisque neque non purus tristique, id sollicitudin felis sollicitudin. Ut vel finibus lorem. Aliquam id tempus dui. Morbi tempus finibus dictum. Nullam eu quam ac leo faucibus convallis.\n\nVestibulum posuere odio augue, quis dictum erat viverra elementum. Cras mattis dui vitae lorem pharetra, ac mattis augue egestas. Morbi tincidunt consequat nunc, ac aliquam ipsum semper in. Sed hendrerit, diam sed facilisis ultrices, ipsum enim placerat dolor, vitae egestas nunc purus id urna. Aliquam neque ex, blandit et sem vel, fermentum luctus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras dictum, ligula sed cursus pretium, tortor turpis auctor sem, quis porta orci metus nec nunc. Phasellus vestibulum dolor sit amet nisl condimentum, nec gravida ante mollis.\n\nPhasellus vel tellus feugiat, posuere justo et, molestie nisi. Proin dignissim lacus at urna tristique condimentum et in purus. Etiam sapien diam, sagittis eu nisi eu tellus.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan nibh in vestibulum tincidunt. Vivamus dictum pulvinar velit ultrices aliquam. Aliquam tempor est orci, ac pretium nisl rhoncus sit amet. Nunc non neque pulvinar risus iaculis auctor. Praesent pretium suscipit nisl id pellentesque. Nam orci augue, tempus sit amet scelerisque quis, iaculis sit amet urna. Proin justo augue, fringilla ut urna tristique, elementum faucibus dolor. Sed nulla justo, tempus vel auctor nec, facilisis ornare ante. Integer auctor laoreet nulla ut condimentum. Maecenas in tincidunt quam, a sodales sapien. Aliquam vestibulum dapibus massa, ultrices suscipit lacus iaculis vitae. Vestibulum libero nisi, vulputate ac risus sed, congue convallis erat. Integer hendrerit mattis mi vel volutpat. Aenean id egestas enim.\n\nVivamus eu auctor tortor, et vestibulum est. Quisque purus ante, venenatis eu pellentesque eget, egestas eu arcu. Suspendisse viverra metus vitae ante tempus malesuada. Nam eget magna mauris. Ut interdum ligula."
  ];

  // json-docs/short-numbers-array.json
  var short_numbers_array_default = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1.1,
    2.2,
    3.3,
    4.4,
    5.5,
    -10,
    -11,
    -12,
    -13,
    -14,
    -15,
    16,
    17,
    18,
    19,
    20,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1e3,
    2235,
    3456,
    4567,
    5678,
    6789,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1.1,
    2.2,
    3.3,
    4.4,
    5.5,
    -10,
    -11,
    -12,
    -13,
    -14,
    -15,
    16,
    17,
    18,
    19,
    20,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1e3,
    2235,
    3456,
    4567,
    5678,
    6789
  ];

  // json-docs/short-strings-object.json
  var short_strings_object_default = { Lorem: "ipsum", dolor1: "sit", amet1: "consectetur", adipiscing: "elit", Etiam: "accumsan", nibh: "in", vestibulum1: "tincidunt", Vivamus: "dictum", pulvinar: "velit", ultrices1: "aliquam", Aliquam1: "tempor", est: "orci", ac: "pretium", nisl1: "rhoncus", sit1: "amet", Nunc: "non", neque: "pulvinar", risus1: "iaculis", auctor1: "Praesent", pretium: "suscipit", nisl: "id", pellentesque: "Nam", orci: "augue", tempus1: "sit", amet: "scelerisque", quis: "iaculis", sit: "amet", urna1: "Proin", justo: "augue", fringilla: "ut", urna: "tristique", elementum: "faucibus", dolor: "Sed", nulla1: "justo", tempus: "vel", auctor2: "nec", facilisis: "ornare", ante1: "Integer", auctor: "laoreet", nulla: "ut", condimentum: "Maecenas", in: "tincidunt", quam: "a", sodales: "sapien", Aliquam: "vestibulum", dapibus: "massa", ultrices: "suscipit", lacus: "iaculis", vitae: "Vestibulum", libero: "nisi", vulputate: "ac", risus: "sed", congue: "convallis", erat: "Integer", hendrerit: "mattis", mi: "vel", volutpat: "Aenean", id: "egestas", enim: "Vivamus", eu1: "auctor", tortor: "et", vestibulum: "est", Quisque: "purus", ante2: "venenatis", eu2: "pellentesque", eget1: "egestas", eu: "arcu", Suspendisse: "viverra", metus: "vitae", ante: "tempus", malesuada: "Nam", eget: "magna", mauris: "Ut", interdum: "ligula" };

  // json-docs/string-escapes.json
  var string_escapes_default = "\u03B1\n\u03B2\n\u03B3\n\u03B4\n\u03B5\n\u03B6\n\u03B7\n\u03B8\n\u03B9\n\u03BA\n\u03BB\n\u03BC\n\u03BD\n\u03BE\n\u03BF\n\u03C0\n\u03C1\n\u03C3\n\u03C4\n\u03C5\n\u03C6\n\u03C7\n\u03C8\n\u03C9\n\u0391\n\u0392\n\u0393\n\u0394\n\u0395\n\u0396\n\u0397\n\u0398\n\u0399\n\u039A\n\u039B\n\u039C\n\u039D\n\u039E\n\u039F\n\u03A0\n\u03A1\n\u03A3\n\u03A4\n\u03A5\n\u03A6\n\u03A7\n\u03A8\n\u03A9\n";

  // index.ts
  var jsonMixed = JSON.stringify({ boolNull: bool_null_array_default, longNumbers: long_numbers_array_default, longStrings: long_strings_array_default, shortNumbers: short_numbers_array_default, shortStrings: short_strings_object_default, stringEscapes: string_escapes_default });
  function speedCompare([a, b]) {
    return b > a ? (b / a).toFixed(1) + "x faster" : (a / b).toFixed(1) + "x slower";
  }
  __name(speedCompare, "speedCompare");
  async function compareUI(el, fns, names) {
    let reps;
    let trials2;
    let trial;
    let dataURI;
    let nameA;
    let nameB;
    function reset() {
      reps = trials2 = trial = dataURI = void 0;
      nameA = `A. ${names[0]}`;
      nameB = `B. ${names[1]}`;
    }
    __name(reset, "reset");
    reset();
    import_mithril.default.mount(el, {
      view: () => (0, import_mithril.default)(
        ".compare",
        (0, import_mithril.default)(".nameA", nameA),
        (0, import_mithril.default)(".nameB", nameB),
        dataURI ? (0, import_mithril.default)(".hist", (0, import_mithril.default)("img", { src: dataURI })) : [
          (0, import_mithril.default)(".progress-outer", (0, import_mithril.default)(".progress-inner", {
            style: { width: 100 * (trial && trials2 ? trial / trials2 : 0) + "%" }
          })),
          (0, import_mithril.default)(".trials", `${trial ?? "\u2014"}/${trials2 ?? "\u2014"} trials`),
          (0, import_mithril.default)(".reps", `${reps ?? "\u2014"} reps/trial`)
        ],
        (0, import_mithril.default)("button", {
          disabled: trial && trials2 && trial < trials2,
          onclick: () => {
            reset();
            import_mithril.default.redraw();
            compare(
              fns,
              (newReps, newTrials, newTrial) => {
                reps = newReps;
                trials2 = newTrials;
                trial = newTrial;
                import_mithril.default.redraw();
              }
            ).then(({ medians, u, z, p, tReps }) => {
              const xml = histogram(tReps);
              dataURI = "data:image/svg+xml," + encodeURIComponent(xml);
              nameB += ": " + (p >= 0.01 ? "no significant difference" : speedCompare(medians)) + ` (U = ${u}, p = ${p.toPrecision(2)})`;
              import_mithril.default.redraw();
            });
          }
        }, trial && trials2 && trial < trials2 ? "Comparing \u2026" : "Compare" + (reps ? " again" : ""))
      )
    });
  }
  __name(compareUI, "compareUI");
  async function main() {
    compareUI(
      document.querySelector("#compare1"),
      [
        () => parse(jsonMixed),
        () => parse3(jsonMixed)
      ],
      ["Native JSON.parse", "Crockford reference"]
    );
    compareUI(
      document.querySelector("#compare2"),
      [
        () => parse(jsonMixed),
        () => parse2(jsonMixed)
      ],
      ["Native JSON.parse", "json-custom-numbers"]
    );
  }
  __name(main, "main");
  window.addEventListener("load", main);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL3Zub2RlLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdFZub2RlLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3V0aWwvaGFzT3duLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdC5qcyIsICJub2RlX21vZHVsZXMvbWl0aHJpbC9yZW5kZXIvdHJ1c3QuanMiLCAibm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL2ZyYWdtZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL2h5cGVyc2NyaXB0LmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3Byb21pc2UvcG9seWZpbGwuanMiLCAibm9kZV9tb2R1bGVzL21pdGhyaWwvcHJvbWlzZS9wcm9taXNlLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9yZW5kZXIuanMiLCAibm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9tb3VudC1yZWRyYXcuanMiLCAibm9kZV9tb2R1bGVzL21pdGhyaWwvbW91bnQtcmVkcmF3LmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3F1ZXJ5c3RyaW5nL2J1aWxkLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3V0aWwvYXNzaWduLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2J1aWxkLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3JlcXVlc3QvcmVxdWVzdC5qcyIsICJub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0LmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3F1ZXJ5c3RyaW5nL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2NvbXBpbGVUZW1wbGF0ZS5qcyIsICJub2RlX21vZHVsZXMvbWl0aHJpbC91dGlsL2NlbnNvci5qcyIsICJub2RlX21vZHVsZXMvbWl0aHJpbC9hcGkvcm91dGVyLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL3JvdXRlLmpzIiwgIm5vZGVfbW9kdWxlcy9taXRocmlsL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9qc29uLWN1c3RvbS1udW1iZXJzL2Rpc3QvcGFyc2UuanMiLCAiaW5kZXgudHMiLCAibWVkaWFuLnRzIiwgImhpc3RvZ3JhbS50cyIsICJtYW5uLXdoaXRuZXktdS50cyIsICJsb2cudHMiLCAiY29tcGFyZS50cyIsICJpbXBsZW1lbnRhdGlvbnMvMDEtbmF0aXZlLnRzIiwgIm5vZGVfbW9kdWxlcy9qc29uLWN1c3RvbS1udW1iZXJzL2Rpc3QvcGFyc2UubWpzIiwgImltcGxlbWVudGF0aW9ucy8wMy1jcm9ja2ZvcmQuanMiLCAianNvbi1kb2NzL2Jvb2wtbnVsbC1hcnJheS5qc29uIiwgImpzb24tZG9jcy9sb25nLW51bWJlcnMtYXJyYXkuanNvbiIsICJqc29uLWRvY3MvbG9uZy1zdHJpbmdzLWFycmF5Lmpzb24iLCAianNvbi1kb2NzL3Nob3J0LW51bWJlcnMtYXJyYXkuanNvbiIsICJqc29uLWRvY3Mvc2hvcnQtc3RyaW5ncy1vYmplY3QuanNvbiIsICJqc29uLWRvY3Mvc3RyaW5nLWVzY2FwZXMuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gVm5vZGUodGFnLCBrZXksIGF0dHJzLCBjaGlsZHJlbiwgdGV4dCwgZG9tKSB7XG5cdHJldHVybiB7dGFnOiB0YWcsIGtleToga2V5LCBhdHRyczogYXR0cnMsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZG9tOiBkb20sIGRvbVNpemU6IHVuZGVmaW5lZCwgc3RhdGU6IHVuZGVmaW5lZCwgZXZlbnRzOiB1bmRlZmluZWQsIGluc3RhbmNlOiB1bmRlZmluZWR9XG59XG5Wbm9kZS5ub3JtYWxpemUgPSBmdW5jdGlvbihub2RlKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSByZXR1cm4gVm5vZGUoXCJbXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihub2RlKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG5cdGlmIChub2RlID09IG51bGwgfHwgdHlwZW9mIG5vZGUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gbnVsbFxuXHRpZiAodHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIpIHJldHVybiBub2RlXG5cdHJldHVybiBWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFN0cmluZyhub2RlKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG5Wbm9kZS5ub3JtYWxpemVDaGlsZHJlbiA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdHZhciBjaGlsZHJlbiA9IFtdXG5cdGlmIChpbnB1dC5sZW5ndGgpIHtcblx0XHR2YXIgaXNLZXllZCA9IGlucHV0WzBdICE9IG51bGwgJiYgaW5wdXRbMF0ua2V5ICE9IG51bGxcblx0XHQvLyBOb3RlOiB0aGlzIGlzIGEgKnZlcnkqIHBlcmYtc2Vuc2l0aXZlIGNoZWNrLlxuXHRcdC8vIEZ1biBmYWN0OiBtZXJnaW5nIHRoZSBsb29wIGxpa2UgdGhpcyBpcyBzb21laG93IGZhc3RlciB0aGFuIHNwbGl0dGluZ1xuXHRcdC8vIGl0LCBub3RpY2VhYmx5IHNvLlxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICgoaW5wdXRbaV0gIT0gbnVsbCAmJiBpbnB1dFtpXS5rZXkgIT0gbnVsbCkgIT09IGlzS2V5ZWQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0XHRpc0tleWVkICYmIChpbnB1dFtpXSAhPSBudWxsIHx8IHR5cGVvZiBpbnB1dFtpXSA9PT0gXCJib29sZWFuXCIpXG5cdFx0XHRcdFx0XHQ/IFwiSW4gZnJhZ21lbnRzLCB2bm9kZXMgbXVzdCBlaXRoZXIgYWxsIGhhdmUga2V5cyBvciBub25lIGhhdmUga2V5cy4gWW91IG1heSB3aXNoIHRvIGNvbnNpZGVyIHVzaW5nIGFuIGV4cGxpY2l0IGtleWVkIGVtcHR5IGZyYWdtZW50LCBtLmZyYWdtZW50KHtrZXk6IC4uLn0pLCBpbnN0ZWFkIG9mIGEgaG9sZS5cIlxuXHRcdFx0XHRcdFx0OiBcIkluIGZyYWdtZW50cywgdm5vZGVzIG11c3QgZWl0aGVyIGFsbCBoYXZlIGtleXMgb3Igbm9uZSBoYXZlIGtleXMuXCJcblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjaGlsZHJlbltpXSA9IFZub2RlLm5vcm1hbGl6ZShpbnB1dFtpXSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNoaWxkcmVuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVm5vZGVcbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbi8vIENhbGwgdmlhIGBoeXBlcnNjcmlwdFZub2RlLmFwcGx5KHN0YXJ0T2Zmc2V0LCBhcmd1bWVudHMpYFxuLy9cbi8vIFRoZSByZWFzb24gSSBkbyBpdCB0aGlzIHdheSwgZm9yd2FyZGluZyB0aGUgYXJndW1lbnRzIGFuZCBwYXNzaW5nIHRoZSBzdGFydFxuLy8gb2Zmc2V0IGluIGB0aGlzYCwgaXMgc28gSSBkb24ndCBoYXZlIHRvIGNyZWF0ZSBhIHRlbXBvcmFyeSBhcnJheSBpbiBhXG4vLyBwZXJmb3JtYW5jZS1jcml0aWNhbCBwYXRoLlxuLy9cbi8vIEluIG5hdGl2ZSBFUzYsIEknZCBpbnN0ZWFkIGFkZCBhIGZpbmFsIGAuLi5hcmdzYCBwYXJhbWV0ZXIgdG8gdGhlXG4vLyBgaHlwZXJzY3JpcHRgIGFuZCBgZnJhZ21lbnRgIGZhY3RvcmllcyBhbmQgZGVmaW5lIHRoaXMgYXNcbi8vIGBoeXBlcnNjcmlwdFZub2RlKC4uLmFyZ3MpYCwgc2luY2UgbW9kZXJuIGVuZ2luZXMgZG8gb3B0aW1pemUgdGhhdCBhd2F5LiBCdXRcbi8vIEVTNSAod2hhdCBNaXRocmlsLmpzIHJlcXVpcmVzIHRoYW5rcyB0byBJRSBzdXBwb3J0KSBkb2Vzbid0IGdpdmUgbWUgdGhhdCBsdXh1cnksXG4vLyBhbmQgZW5naW5lcyBhcmVuJ3QgbmVhcmx5IGludGVsbGlnZW50IGVub3VnaCB0byBkbyBlaXRoZXIgb2YgdGhlc2U6XG4vL1xuLy8gMS4gRWxpZGUgdGhlIGFsbG9jYXRpb24gZm9yIGBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlgIHdoZW4gaXQncyBwYXNzZWQgdG9cbi8vICAgIGFub3RoZXIgZnVuY3Rpb24gb25seSB0byBiZSBpbmRleGVkLlxuLy8gMi4gRWxpZGUgYW4gYGFyZ3VtZW50c2AgYWxsb2NhdGlvbiB3aGVuIGl0J3MgcGFzc2VkIHRvIGFueSBmdW5jdGlvbiBvdGhlclxuLy8gICAgdGhhbiBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YCBvciBgUmVmbGVjdC5hcHBseWAuXG4vL1xuLy8gSW4gRVM2LCBpdCdkIHByb2JhYmx5IGxvb2sgY2xvc2VyIHRvIHRoaXMgKEknZCBuZWVkIHRvIHByb2ZpbGUgaXQsIHRob3VnaCk6XG4vLyBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGF0dHJzLCAuLi5jaGlsZHJlbikge1xuLy8gICAgIGlmIChhdHRycyA9PSBudWxsIHx8IHR5cGVvZiBhdHRycyA9PT0gXCJvYmplY3RcIiAmJiBhdHRycy50YWcgPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShhdHRycykpIHtcbi8vICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGNoaWxkcmVuWzBdKSkgY2hpbGRyZW4gPSBjaGlsZHJlblswXVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIEFycmF5LmlzQXJyYXkoYXR0cnMpID8gYXR0cnMgOiBbYXR0cnMsIC4uLmNoaWxkcmVuXVxuLy8gICAgICAgICBhdHRycyA9IHVuZGVmaW5lZFxuLy8gICAgIH1cbi8vXG4vLyAgICAgaWYgKGF0dHJzID09IG51bGwpIGF0dHJzID0ge31cbi8vICAgICByZXR1cm4gVm5vZGUoXCJcIiwgYXR0cnMua2V5LCBhdHRycywgY2hpbGRyZW4pXG4vLyB9XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgYXR0cnMgPSBhcmd1bWVudHNbdGhpc10sIHN0YXJ0ID0gdGhpcyArIDEsIGNoaWxkcmVuXG5cblx0aWYgKGF0dHJzID09IG51bGwpIHtcblx0XHRhdHRycyA9IHt9XG5cdH0gZWxzZSBpZiAodHlwZW9mIGF0dHJzICE9PSBcIm9iamVjdFwiIHx8IGF0dHJzLnRhZyAhPSBudWxsIHx8IEFycmF5LmlzQXJyYXkoYXR0cnMpKSB7XG5cdFx0YXR0cnMgPSB7fVxuXHRcdHN0YXJ0ID0gdGhpc1xuXHR9XG5cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IHN0YXJ0ICsgMSkge1xuXHRcdGNoaWxkcmVuID0gYXJndW1lbnRzW3N0YXJ0XVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIGNoaWxkcmVuID0gW2NoaWxkcmVuXVxuXHR9IGVsc2Uge1xuXHRcdGNoaWxkcmVuID0gW11cblx0XHR3aGlsZSAoc3RhcnQgPCBhcmd1bWVudHMubGVuZ3RoKSBjaGlsZHJlbi5wdXNoKGFyZ3VtZW50c1tzdGFydCsrXSlcblx0fVxuXG5cdHJldHVybiBWbm9kZShcIlwiLCBhdHRycy5rZXksIGF0dHJzLCBjaGlsZHJlbilcbn1cbiIsICIvLyBUaGlzIGV4aXN0cyBzbyBJJ20gb25seSBzYXZpbmcgaXQgb25jZS5cblwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0ge30uaGFzT3duUHJvcGVydHlcbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG52YXIgaHlwZXJzY3JpcHRWbm9kZSA9IHJlcXVpcmUoXCIuL2h5cGVyc2NyaXB0Vm5vZGVcIilcbnZhciBoYXNPd24gPSByZXF1aXJlKFwiLi4vdXRpbC9oYXNPd25cIilcblxudmFyIHNlbGVjdG9yUGFyc2VyID0gLyg/OihefCN8XFwuKShbXiNcXC5cXFtcXF1dKykpfChcXFsoLis/KSg/Olxccyo9XFxzKihcInwnfCkoKD86XFxcXFtcIidcXF1dfC4pKj8pXFw1KT9cXF0pL2dcbnZhciBzZWxlY3RvckNhY2hlID0ge31cblxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3QpIHtcblx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkgaWYgKGhhc093bi5jYWxsKG9iamVjdCwga2V5KSkgcmV0dXJuIGZhbHNlXG5cdHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVTZWxlY3RvcihzZWxlY3Rvcikge1xuXHR2YXIgbWF0Y2gsIHRhZyA9IFwiZGl2XCIsIGNsYXNzZXMgPSBbXSwgYXR0cnMgPSB7fVxuXHR3aGlsZSAobWF0Y2ggPSBzZWxlY3RvclBhcnNlci5leGVjKHNlbGVjdG9yKSkge1xuXHRcdHZhciB0eXBlID0gbWF0Y2hbMV0sIHZhbHVlID0gbWF0Y2hbMl1cblx0XHRpZiAodHlwZSA9PT0gXCJcIiAmJiB2YWx1ZSAhPT0gXCJcIikgdGFnID0gdmFsdWVcblx0XHRlbHNlIGlmICh0eXBlID09PSBcIiNcIikgYXR0cnMuaWQgPSB2YWx1ZVxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiLlwiKSBjbGFzc2VzLnB1c2godmFsdWUpXG5cdFx0ZWxzZSBpZiAobWF0Y2hbM11bMF0gPT09IFwiW1wiKSB7XG5cdFx0XHR2YXIgYXR0clZhbHVlID0gbWF0Y2hbNl1cblx0XHRcdGlmIChhdHRyVmFsdWUpIGF0dHJWYWx1ZSA9IGF0dHJWYWx1ZS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCBcIiQxXCIpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKVxuXHRcdFx0aWYgKG1hdGNoWzRdID09PSBcImNsYXNzXCIpIGNsYXNzZXMucHVzaChhdHRyVmFsdWUpXG5cdFx0XHRlbHNlIGF0dHJzW21hdGNoWzRdXSA9IGF0dHJWYWx1ZSA9PT0gXCJcIiA/IGF0dHJWYWx1ZSA6IGF0dHJWYWx1ZSB8fCB0cnVlXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIGF0dHJzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIilcblx0cmV0dXJuIHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdID0ge3RhZzogdGFnLCBhdHRyczogYXR0cnN9XG59XG5cbmZ1bmN0aW9uIGV4ZWNTZWxlY3RvcihzdGF0ZSwgdm5vZGUpIHtcblx0dmFyIGF0dHJzID0gdm5vZGUuYXR0cnNcblx0dmFyIGhhc0NsYXNzID0gaGFzT3duLmNhbGwoYXR0cnMsIFwiY2xhc3NcIilcblx0dmFyIGNsYXNzTmFtZSA9IGhhc0NsYXNzID8gYXR0cnMuY2xhc3MgOiBhdHRycy5jbGFzc05hbWVcblxuXHR2bm9kZS50YWcgPSBzdGF0ZS50YWdcblx0dm5vZGUuYXR0cnMgPSB7fVxuXG5cdGlmICghaXNFbXB0eShzdGF0ZS5hdHRycykgJiYgIWlzRW1wdHkoYXR0cnMpKSB7XG5cdFx0dmFyIG5ld0F0dHJzID0ge31cblxuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpKSBuZXdBdHRyc1trZXldID0gYXR0cnNba2V5XVxuXHRcdH1cblxuXHRcdGF0dHJzID0gbmV3QXR0cnNcblx0fVxuXG5cdGZvciAodmFyIGtleSBpbiBzdGF0ZS5hdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChzdGF0ZS5hdHRycywga2V5KSAmJiBrZXkgIT09IFwiY2xhc3NOYW1lXCIgJiYgIWhhc093bi5jYWxsKGF0dHJzLCBrZXkpKXtcblx0XHRcdGF0dHJzW2tleV0gPSBzdGF0ZS5hdHRyc1trZXldXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc05hbWUgIT0gbnVsbCB8fCBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbCkgYXR0cnMuY2xhc3NOYW1lID1cblx0XHRjbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0PyBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0XHQ/IFN0cmluZyhzdGF0ZS5hdHRycy5jbGFzc05hbWUpICsgXCIgXCIgKyBTdHJpbmcoY2xhc3NOYW1lKVxuXHRcdFx0XHQ6IGNsYXNzTmFtZVxuXHRcdFx0OiBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0XHQ/IHN0YXRlLmF0dHJzLmNsYXNzTmFtZVxuXHRcdFx0XHQ6IG51bGxcblxuXHRpZiAoaGFzQ2xhc3MpIGF0dHJzLmNsYXNzID0gbnVsbFxuXG5cdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChhdHRycywga2V5KSAmJiBrZXkgIT09IFwia2V5XCIpIHtcblx0XHRcdHZub2RlLmF0dHJzID0gYXR0cnNcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZub2RlXG59XG5cbmZ1bmN0aW9uIGh5cGVyc2NyaXB0KHNlbGVjdG9yKSB7XG5cdGlmIChzZWxlY3RvciA9PSBudWxsIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygc2VsZWN0b3IgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2Ygc2VsZWN0b3IudmlldyAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJUaGUgc2VsZWN0b3IgbXVzdCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBjb21wb25lbnQuXCIpO1xuXHR9XG5cblx0dmFyIHZub2RlID0gaHlwZXJzY3JpcHRWbm9kZS5hcHBseSgxLCBhcmd1bWVudHMpXG5cblx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHZub2RlLmNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdFx0aWYgKHNlbGVjdG9yICE9PSBcIltcIikgcmV0dXJuIGV4ZWNTZWxlY3RvcihzZWxlY3RvckNhY2hlW3NlbGVjdG9yXSB8fCBjb21waWxlU2VsZWN0b3Ioc2VsZWN0b3IpLCB2bm9kZSlcblx0fVxuXG5cdHZub2RlLnRhZyA9IHNlbGVjdG9yXG5cdHJldHVybiB2bm9kZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGVyc2NyaXB0XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGh0bWwpIHtcblx0aWYgKGh0bWwgPT0gbnVsbCkgaHRtbCA9IFwiXCJcblx0cmV0dXJuIFZub2RlKFwiPFwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaHRtbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIGh5cGVyc2NyaXB0Vm5vZGUgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFZub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciB2bm9kZSA9IGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoMCwgYXJndW1lbnRzKVxuXG5cdHZub2RlLnRhZyA9IFwiW1wiXG5cdHZub2RlLmNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdHJldHVybiB2bm9kZVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBoeXBlcnNjcmlwdCA9IHJlcXVpcmUoXCIuL3JlbmRlci9oeXBlcnNjcmlwdFwiKVxuXG5oeXBlcnNjcmlwdC50cnVzdCA9IHJlcXVpcmUoXCIuL3JlbmRlci90cnVzdFwiKVxuaHlwZXJzY3JpcHQuZnJhZ21lbnQgPSByZXF1aXJlKFwiLi9yZW5kZXIvZnJhZ21lbnRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcnNjcmlwdFxuIiwgIlwidXNlIHN0cmljdFwiXG4vKiogQGNvbnN0cnVjdG9yICovXG52YXIgUHJvbWlzZVBvbHlmaWxsID0gZnVuY3Rpb24oZXhlY3V0b3IpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkpIHRocm93IG5ldyBFcnJvcihcIlByb21pc2UgbXVzdCBiZSBjYWxsZWQgd2l0aCAnbmV3Jy5cIilcblx0aWYgKHR5cGVvZiBleGVjdXRvciAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLlwiKVxuXG5cdHZhciBzZWxmID0gdGhpcywgcmVzb2x2ZXJzID0gW10sIHJlamVjdG9ycyA9IFtdLCByZXNvbHZlQ3VycmVudCA9IGhhbmRsZXIocmVzb2x2ZXJzLCB0cnVlKSwgcmVqZWN0Q3VycmVudCA9IGhhbmRsZXIocmVqZWN0b3JzLCBmYWxzZSlcblx0dmFyIGluc3RhbmNlID0gc2VsZi5faW5zdGFuY2UgPSB7cmVzb2x2ZXJzOiByZXNvbHZlcnMsIHJlamVjdG9yczogcmVqZWN0b3JzfVxuXHR2YXIgY2FsbEFzeW5jID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dFxuXHRmdW5jdGlvbiBoYW5kbGVyKGxpc3QsIHNob3VsZEFic29yYikge1xuXHRcdHJldHVybiBmdW5jdGlvbiBleGVjdXRlKHZhbHVlKSB7XG5cdFx0XHR2YXIgdGhlblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHNob3VsZEFic29yYiAmJiB2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiAodGhlbiA9IHZhbHVlLnRoZW4pID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IHNlbGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLlwiKVxuXHRcdFx0XHRcdGV4ZWN1dGVPbmNlKHRoZW4uYmluZCh2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y2FsbEFzeW5jKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCFzaG91bGRBYnNvcmIgJiYgbGlzdC5sZW5ndGggPT09IDApIGNvbnNvbGUuZXJyb3IoXCJQb3NzaWJsZSB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb246XCIsIHZhbHVlKVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSBsaXN0W2ldKHZhbHVlKVxuXHRcdFx0XHRcdFx0cmVzb2x2ZXJzLmxlbmd0aCA9IDAsIHJlamVjdG9ycy5sZW5ndGggPSAwXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zdGF0ZSA9IHNob3VsZEFic29yYlxuXHRcdFx0XHRcdFx0aW5zdGFuY2UucmV0cnkgPSBmdW5jdGlvbigpIHtleGVjdXRlKHZhbHVlKX1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3RDdXJyZW50KGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGV4ZWN1dGVPbmNlKHRoZW4pIHtcblx0XHR2YXIgcnVucyA9IDBcblx0XHRmdW5jdGlvbiBydW4oZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHRpZiAocnVucysrID4gMCkgcmV0dXJuXG5cdFx0XHRcdGZuKHZhbHVlKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgb25lcnJvciA9IHJ1bihyZWplY3RDdXJyZW50KVxuXHRcdHRyeSB7dGhlbihydW4ocmVzb2x2ZUN1cnJlbnQpLCBvbmVycm9yKX0gY2F0Y2ggKGUpIHtvbmVycm9yKGUpfVxuXHR9XG5cblx0ZXhlY3V0ZU9uY2UoZXhlY3V0b3IpXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3Rpb24pIHtcblx0dmFyIHNlbGYgPSB0aGlzLCBpbnN0YW5jZSA9IHNlbGYuX2luc3RhbmNlXG5cdGZ1bmN0aW9uIGhhbmRsZShjYWxsYmFjaywgbGlzdCwgbmV4dCwgc3RhdGUpIHtcblx0XHRsaXN0LnB1c2goZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgbmV4dCh2YWx1ZSlcblx0XHRcdGVsc2UgdHJ5IHtyZXNvbHZlTmV4dChjYWxsYmFjayh2YWx1ZSkpfSBjYXRjaCAoZSkge2lmIChyZWplY3ROZXh0KSByZWplY3ROZXh0KGUpfVxuXHRcdH0pXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZS5yZXRyeSA9PT0gXCJmdW5jdGlvblwiICYmIHN0YXRlID09PSBpbnN0YW5jZS5zdGF0ZSkgaW5zdGFuY2UucmV0cnkoKVxuXHR9XG5cdHZhciByZXNvbHZlTmV4dCwgcmVqZWN0TmV4dFxuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVzb2x2ZU5leHQgPSByZXNvbHZlLCByZWplY3ROZXh0ID0gcmVqZWN0fSlcblx0aGFuZGxlKG9uRnVsZmlsbGVkLCBpbnN0YW5jZS5yZXNvbHZlcnMsIHJlc29sdmVOZXh0LCB0cnVlKSwgaGFuZGxlKG9uUmVqZWN0aW9uLCBpbnN0YW5jZS5yZWplY3RvcnMsIHJlamVjdE5leHQsIGZhbHNlKVxuXHRyZXR1cm4gcHJvbWlzZVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKG9uUmVqZWN0aW9uKSB7XG5cdHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRyZXR1cm4gdGhpcy50aGVuKFxuXHRcdGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0ZnVuY3Rpb24ocmVhc29uKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2VQb2x5ZmlsbC5yZWplY3QocmVhc29uKTtcblx0XHRcdH0pXG5cdFx0fVxuXHQpXG59XG5Qcm9taXNlUG9seWZpbGwucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkgcmV0dXJuIHZhbHVlXG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUpIHtyZXNvbHZlKHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVqZWN0KHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwuYWxsID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgdG90YWwgPSBsaXN0Lmxlbmd0aCwgY291bnQgPSAwLCB2YWx1ZXMgPSBbXVxuXHRcdGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmVzb2x2ZShbXSlcblx0XHRlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0KGZ1bmN0aW9uKGkpIHtcblx0XHRcdFx0ZnVuY3Rpb24gY29uc3VtZSh2YWx1ZSkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWx1ZVxuXHRcdFx0XHRcdGlmIChjb3VudCA9PT0gdG90YWwpIHJlc29sdmUodmFsdWVzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChsaXN0W2ldICE9IG51bGwgJiYgKHR5cGVvZiBsaXN0W2ldID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBsaXN0W2ldID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiBsaXN0W2ldLnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGxpc3RbaV0udGhlbihjb25zdW1lLCByZWplY3QpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBjb25zdW1lKGxpc3RbaV0pXG5cdFx0XHR9KShpKVxuXHRcdH1cblx0fSlcbn1cblByb21pc2VQb2x5ZmlsbC5yYWNlID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RbaV0udGhlbihyZXNvbHZlLCByZWplY3QpXG5cdFx0fVxuXHR9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2VQb2x5ZmlsbFxuIiwgIi8qIGdsb2JhbCB3aW5kb3cgKi9cblwidXNlIHN0cmljdFwiXG5cbnZhciBQcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wb2x5ZmlsbFwiKVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRpZiAodHlwZW9mIHdpbmRvdy5Qcm9taXNlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0d2luZG93LlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0fSBlbHNlIGlmICghd2luZG93LlByb21pc2UucHJvdG90eXBlLmZpbmFsbHkpIHtcblx0XHR3aW5kb3cuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSA9IFByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuZmluYWxseVxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0gd2luZG93LlByb21pc2Vcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRpZiAodHlwZW9mIGdsb2JhbC5Qcm9taXNlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0Z2xvYmFsLlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0fSBlbHNlIGlmICghZ2xvYmFsLlByb21pc2UucHJvdG90eXBlLmZpbmFsbHkpIHtcblx0XHRnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSA9IFByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuZmluYWxseVxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlByb21pc2Vcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJvbWlzZVBvbHlmaWxsXG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyICRkb2MgPSAkd2luZG93ICYmICR3aW5kb3cuZG9jdW1lbnRcblx0dmFyIGN1cnJlbnRSZWRyYXdcblxuXHR2YXIgbmFtZVNwYWNlID0ge1xuXHRcdHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuXHRcdG1hdGg6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiXG5cdH1cblxuXHRmdW5jdGlvbiBnZXROYW1lU3BhY2Uodm5vZGUpIHtcblx0XHRyZXR1cm4gdm5vZGUuYXR0cnMgJiYgdm5vZGUuYXR0cnMueG1sbnMgfHwgbmFtZVNwYWNlW3Zub2RlLnRhZ11cblx0fVxuXG5cdC8vc2FuaXR5IGNoZWNrIHRvIGRpc2NvdXJhZ2UgcGVvcGxlIGZyb20gZG9pbmcgYHZub2RlLnN0YXRlID0gLi4uYFxuXHRmdW5jdGlvbiBjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbCkge1xuXHRcdGlmICh2bm9kZS5zdGF0ZSAhPT0gb3JpZ2luYWwpIHRocm93IG5ldyBFcnJvcihcIid2bm9kZS5zdGF0ZScgbXVzdCBub3QgYmUgbW9kaWZpZWQuXCIpXG5cdH1cblxuXHQvL05vdGU6IHRoZSBob29rIGlzIHBhc3NlZCBhcyB0aGUgYHRoaXNgIGFyZ3VtZW50IHRvIGFsbG93IHByb3h5aW5nIHRoZVxuXHQvL2FyZ3VtZW50cyB3aXRob3V0IHJlcXVpcmluZyBhIGZ1bGwgYXJyYXkgYWxsb2NhdGlvbiB0byBkbyBzby4gSXQgYWxzb1xuXHQvL3Rha2VzIGFkdmFudGFnZSBvZiB0aGUgZmFjdCB0aGUgY3VycmVudCBgdm5vZGVgIGlzIHRoZSBmaXJzdCBhcmd1bWVudCBpblxuXHQvL2FsbCBsaWZlY3ljbGUgbWV0aG9kcy5cblx0ZnVuY3Rpb24gY2FsbEhvb2sodm5vZGUpIHtcblx0XHR2YXIgb3JpZ2luYWwgPSB2bm9kZS5zdGF0ZVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseShvcmlnaW5hbCwgYXJndW1lbnRzKVxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbClcblx0XHR9XG5cdH1cblxuXHQvLyBJRTExIChhdCBsZWFzdCkgdGhyb3dzIGFuIFVuc3BlY2lmaWVkRXJyb3Igd2hlbiBhY2Nlc3NpbmcgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB3aGVuXG5cdC8vIGluc2lkZSBhbiBpZnJhbWUuIENhdGNoIGFuZCBzd2FsbG93IHRoaXMgZXJyb3IsIGFuZCBoZWF2eS1oYW5kaWRseSByZXR1cm4gbnVsbC5cblx0ZnVuY3Rpb24gYWN0aXZlRWxlbWVudCgpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuICRkb2MuYWN0aXZlRWxlbWVudFxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG5cdC8vY3JlYXRlXG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0Zm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0Y3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgdGFnID0gdm5vZGUudGFnXG5cdFx0aWYgKHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHZub2RlLnN0YXRlID0ge31cblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSBpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0XHRzd2l0Y2ggKHRhZykge1xuXHRcdFx0XHRjYXNlIFwiI1wiOiBjcmVhdGVUZXh0KHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0Y2FzZSBcIjxcIjogY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRjYXNlIFwiW1wiOiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0ZGVmYXVsdDogY3JlYXRlRWxlbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGNyZWF0ZUNvbXBvbmVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpIHtcblx0XHR2bm9kZS5kb20gPSAkZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLmNoaWxkcmVuKVxuXHRcdGluc2VydE5vZGUocGFyZW50LCB2bm9kZS5kb20sIG5leHRTaWJsaW5nKVxuXHR9XG5cdHZhciBwb3NzaWJsZVBhcmVudHMgPSB7Y2FwdGlvbjogXCJ0YWJsZVwiLCB0aGVhZDogXCJ0YWJsZVwiLCB0Ym9keTogXCJ0YWJsZVwiLCB0Zm9vdDogXCJ0YWJsZVwiLCB0cjogXCJ0Ym9keVwiLCB0aDogXCJ0clwiLCB0ZDogXCJ0clwiLCBjb2xncm91cDogXCJ0YWJsZVwiLCBjb2w6IFwiY29sZ3JvdXBcIn1cblx0ZnVuY3Rpb24gY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgbWF0Y2ggPSB2bm9kZS5jaGlsZHJlbi5tYXRjaCgvXlxccyo/PChcXHcrKS9pbSkgfHwgW11cblx0XHQvLyBub3QgdXNpbmcgdGhlIHByb3BlciBwYXJlbnQgbWFrZXMgdGhlIGNoaWxkIGVsZW1lbnQocykgdmFuaXNoLlxuXHRcdC8vICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdC8vICAgICBkaXYuaW5uZXJIVE1MID0gXCI8dGQ+aTwvdGQ+PHRkPmo8L3RkPlwiXG5cdFx0Ly8gICAgIGNvbnNvbGUubG9nKGRpdi5pbm5lckhUTUwpXG5cdFx0Ly8gLS0+IFwiaWpcIiwgbm8gPHRkPiBpbiBzaWdodC5cblx0XHR2YXIgdGVtcCA9ICRkb2MuY3JlYXRlRWxlbWVudChwb3NzaWJsZVBhcmVudHNbbWF0Y2hbMV1dIHx8IFwiZGl2XCIpXG5cdFx0aWYgKG5zID09PSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpIHtcblx0XHRcdHRlbXAuaW5uZXJIVE1MID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+XCIgKyB2bm9kZS5jaGlsZHJlbiArIFwiPC9zdmc+XCJcblx0XHRcdHRlbXAgPSB0ZW1wLmZpcnN0Q2hpbGRcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGVtcC5pbm5lckhUTUwgPSB2bm9kZS5jaGlsZHJlblxuXHRcdH1cblx0XHR2bm9kZS5kb20gPSB0ZW1wLmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gdGVtcC5jaGlsZE5vZGVzLmxlbmd0aFxuXHRcdC8vIENhcHR1cmUgbm9kZXMgdG8gcmVtb3ZlLCBzbyB3ZSBkb24ndCBjb25mdXNlIHRoZW0uXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBbXVxuXHRcdHZhciBmcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdFx0dmFyIGNoaWxkXG5cdFx0d2hpbGUgKGNoaWxkID0gdGVtcC5maXJzdENoaWxkKSB7XG5cdFx0XHR2bm9kZS5pbnN0YW5jZS5wdXNoKGNoaWxkKVxuXHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG5cdFx0fVxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnbWVudCwgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciBmcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdFx0aWYgKHZub2RlLmNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRjcmVhdGVOb2RlcyhmcmFnbWVudCwgY2hpbGRyZW4sIDAsIGNoaWxkcmVuLmxlbmd0aCwgaG9va3MsIG51bGwsIG5zKVxuXHRcdH1cblx0XHR2bm9kZS5kb20gPSBmcmFnbWVudC5maXJzdENoaWxkXG5cdFx0dm5vZGUuZG9tU2l6ZSA9IGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWdtZW50LCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgdGFnID0gdm5vZGUudGFnXG5cdFx0dmFyIGF0dHJzID0gdm5vZGUuYXR0cnNcblx0XHR2YXIgaXMgPSBhdHRycyAmJiBhdHRycy5pc1xuXG5cdFx0bnMgPSBnZXROYW1lU3BhY2Uodm5vZGUpIHx8IG5zXG5cblx0XHR2YXIgZWxlbWVudCA9IG5zID9cblx0XHRcdGlzID8gJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZywge2lzOiBpc30pIDogJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZykgOlxuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnKVxuXHRcdHZub2RlLmRvbSA9IGVsZW1lbnRcblxuXHRcdGlmIChhdHRycyAhPSBudWxsKSB7XG5cdFx0XHRzZXRBdHRycyh2bm9kZSwgYXR0cnMsIG5zKVxuXHRcdH1cblxuXHRcdGluc2VydE5vZGUocGFyZW50LCBlbGVtZW50LCBuZXh0U2libGluZylcblxuXHRcdGlmICghbWF5YmVTZXRDb250ZW50RWRpdGFibGUodm5vZGUpKSB7XG5cdFx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0XHRjcmVhdGVOb2RlcyhlbGVtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgYXR0cnMgIT0gbnVsbCkgc2V0TGF0ZVNlbGVjdEF0dHJzKHZub2RlLCBhdHRycylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gaW5pdENvbXBvbmVudCh2bm9kZSwgaG9va3MpIHtcblx0XHR2YXIgc2VudGluZWxcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZy52aWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gT2JqZWN0LmNyZWF0ZSh2bm9kZS50YWcpXG5cdFx0XHRzZW50aW5lbCA9IHZub2RlLnN0YXRlLnZpZXdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm5cblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IHZvaWQgMFxuXHRcdFx0c2VudGluZWwgPSB2bm9kZS50YWdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm5cblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdFx0dm5vZGUuc3RhdGUgPSAodm5vZGUudGFnLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS50YWcucHJvdG90eXBlLnZpZXcgPT09IFwiZnVuY3Rpb25cIikgPyBuZXcgdm5vZGUudGFnKHZub2RlKSA6IHZub2RlLnRhZyh2bm9kZSlcblx0XHR9XG5cdFx0aW5pdExpZmVjeWNsZSh2bm9kZS5zdGF0ZSwgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSBpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUoY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS52aWV3LCB2bm9kZSkpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRcIilcblx0XHRzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCA9IG51bGxcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdGluaXRDb21wb25lbnQodm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR2bm9kZS5kb20gPSB2bm9kZS5pbnN0YW5jZS5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSB2bm9kZS5kb20gIT0gbnVsbCA/IHZub2RlLmluc3RhbmNlLmRvbVNpemUgOiAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IDBcblx0XHR9XG5cdH1cblxuXHQvL3VwZGF0ZVxuXHQvKipcblx0ICogQHBhcmFtIHtFbGVtZW50fEZyYWdtZW50fSBwYXJlbnQgLSB0aGUgcGFyZW50IGVsZW1lbnRcblx0ICogQHBhcmFtIHtWbm9kZVtdIHwgbnVsbH0gb2xkIC0gdGhlIGxpc3Qgb2Ygdm5vZGVzIG9mIHRoZSBsYXN0IGByZW5kZXIoKWAgY2FsbCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBwYXJ0IG9mIHRoZSB0cmVlXG5cdCAqIEBwYXJhbSB7Vm5vZGVbXSB8IG51bGx9IHZub2RlcyAtIGFzIGFib3ZlLCBidXQgZm9yIHRoZSBjdXJyZW50IGByZW5kZXIoKWAgY2FsbC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbltdfSBob29rcyAtIGFuIGFjY3VtdWxhdG9yIG9mIHBvc3QtcmVuZGVyIGhvb2tzIChvbmNyZWF0ZS9vbnVwZGF0ZSlcblx0ICogQHBhcmFtIHtFbGVtZW50IHwgbnVsbH0gbmV4dFNpYmxpbmcgLSB0aGUgbmV4dCBET00gbm9kZSBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50IHRoYXQgaXMgbm90IHRoZSBsYXN0IGl0ZW0gaW4gaXRzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XG5cdCAqIEBwYXJhbSB7J3N2ZycgfCAnbWF0aCcgfCBTdHJpbmcgfCBudWxsfSBucykgLSB0aGUgY3VycmVudCBYTUwgbmFtZXNwYWNlLCBpZiBhbnlcblx0ICogQHJldHVybnMgdm9pZFxuXHQgKi9cblx0Ly8gVGhpcyBmdW5jdGlvbiBkaWZmcyBhbmQgcGF0Y2hlcyBsaXN0cyBvZiB2bm9kZXMsIGJvdGgga2V5ZWQgYW5kIHVua2V5ZWQuXG5cdC8vXG5cdC8vIFdlIHdpbGw6XG5cdC8vXG5cdC8vIDEuIGRlc2NyaWJlIGl0cyBnZW5lcmFsIHN0cnVjdHVyZVxuXHQvLyAyLiBmb2N1cyBvbiB0aGUgZGlmZiBhbGdvcml0aG0gb3B0aW1pemF0aW9uc1xuXHQvLyAzLiBkaXNjdXNzIERPTSBub2RlIG9wZXJhdGlvbnMuXG5cblx0Ly8gIyMgT3ZlcnZpZXc6XG5cdC8vXG5cdC8vIFRoZSB1cGRhdGVOb2RlcygpIGZ1bmN0aW9uOlxuXHQvLyAtIGRlYWxzIHdpdGggdHJpdmlhbCBjYXNlc1xuXHQvLyAtIGRldGVybWluZXMgd2hldGhlciB0aGUgbGlzdHMgYXJlIGtleWVkIG9yIHVua2V5ZWQgYmFzZWQgb24gdGhlIGZpcnN0IG5vbi1udWxsIG5vZGVcblx0Ly8gICBvZiBlYWNoIGxpc3QuXG5cdC8vIC0gZGlmZnMgdGhlbSBhbmQgcGF0Y2hlcyB0aGUgRE9NIGlmIG5lZWRlZCAodGhhdCdzIHRoZSBicnVudCBvZiB0aGUgY29kZSlcblx0Ly8gLSBtYW5hZ2VzIHRoZSBsZWZ0b3ZlcnM6IGFmdGVyIGRpZmZpbmcsIGFyZSB0aGVyZTpcblx0Ly8gICAtIG9sZCBub2RlcyBsZWZ0IHRvIHJlbW92ZT9cblx0Ly8gXHQgLSBuZXcgbm9kZXMgdG8gaW5zZXJ0P1xuXHQvLyBcdCBkZWFsIHdpdGggdGhlbSFcblx0Ly9cblx0Ly8gVGhlIGxpc3RzIGFyZSBvbmx5IGl0ZXJhdGVkIG92ZXIgb25jZSwgd2l0aCBhbiBleGNlcHRpb24gZm9yIHRoZSBub2RlcyBpbiBgb2xkYCB0aGF0XG5cdC8vIGFyZSB2aXNpdGVkIGluIHRoZSBmb3VydGggcGFydCBvZiB0aGUgZGlmZiBhbmQgaW4gdGhlIGByZW1vdmVOb2Rlc2AgbG9vcC5cblxuXHQvLyAjIyBEaWZmaW5nXG5cdC8vXG5cdC8vIFJlYWRpbmcgaHR0cHM6Ly9naXRodWIuY29tL2xvY2Fsdm9pZC9pdmkvYmxvYi9kZGMwOWQwNmFiYWVmNDUyNDhlNjEzM2Y3MDQwZDAwZDNjNmJlODUzL3BhY2thZ2VzL2l2aS9zcmMvdmRvbS9pbXBsZW1lbnRhdGlvbi50cyNMNjE3LUw4Mzdcblx0Ly8gbWF5IGJlIGdvb2QgZm9yIGNvbnRleHQgb24gbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlLWJhc2VkIGxvZ2ljIGZvciBtb3Zpbmcgbm9kZXMuXG5cdC8vXG5cdC8vIEluIG9yZGVyIHRvIGRpZmYga2V5ZWQgbGlzdHMsIG9uZSBoYXMgdG9cblx0Ly9cblx0Ly8gMSkgbWF0Y2ggbm9kZXMgaW4gYm90aCBsaXN0cywgcGVyIGtleSwgYW5kIHVwZGF0ZSB0aGVtIGFjY29yZGluZ2x5XG5cdC8vIDIpIGNyZWF0ZSB0aGUgbm9kZXMgcHJlc2VudCBpbiB0aGUgbmV3IGxpc3QsIGJ1dCBhYnNlbnQgaW4gdGhlIG9sZCBvbmVcblx0Ly8gMykgcmVtb3ZlIHRoZSBub2RlcyBwcmVzZW50IGluIHRoZSBvbGQgbGlzdCwgYnV0IGFic2VudCBpbiB0aGUgbmV3IG9uZVxuXHQvLyA0KSBmaWd1cmUgb3V0IHdoYXQgbm9kZXMgaW4gMSkgdG8gbW92ZSBpbiBvcmRlciB0byBtaW5pbWl6ZSB0aGUgRE9NIG9wZXJhdGlvbnMuXG5cdC8vXG5cdC8vIFRvIGFjaGlldmUgMSkgb25lIGNhbiBjcmVhdGUgYSBkaWN0aW9uYXJ5IG9mIGtleXMgPT4gaW5kZXggKGZvciB0aGUgb2xkIGxpc3QpLCB0aGVuIGl0ZXJhdGVcblx0Ly8gb3ZlciB0aGUgbmV3IGxpc3QgYW5kIGZvciBlYWNoIG5ldyB2bm9kZSwgZmluZCB0aGUgY29ycmVzcG9uZGluZyB2bm9kZSBpbiB0aGUgb2xkIGxpc3QgdXNpbmdcblx0Ly8gdGhlIG1hcC5cblx0Ly8gMikgaXMgYWNoaWV2ZWQgaW4gdGhlIHNhbWUgc3RlcDogaWYgYSBuZXcgbm9kZSBoYXMgbm8gY29ycmVzcG9uZGluZyBlbnRyeSBpbiB0aGUgbWFwLCBpdCBpcyBuZXdcblx0Ly8gYW5kIG11c3QgYmUgY3JlYXRlZC5cblx0Ly8gRm9yIHRoZSByZW1vdmFscywgd2UgYWN0dWFsbHkgcmVtb3ZlIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiB1cGRhdGVkIGZyb20gdGhlIG9sZCBsaXN0LlxuXHQvLyBUaGUgbm9kZXMgdGhhdCByZW1haW4gaW4gdGhhdCBsaXN0IGFmdGVyIDEpIGFuZCAyKSBoYXZlIGJlZW4gcGVyZm9ybWVkIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZC5cblx0Ly8gVGhlIGZvdXJ0aCBzdGVwIGlzIGEgYml0IG1vcmUgY29tcGxleCBhbmQgcmVsaWVzIG9uIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgKExJUylcblx0Ly8gYWxnb3JpdGhtLlxuXHQvL1xuXHQvLyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIGlzIHRoZSBsaXN0IG9mIG5vZGVzIHRoYXQgY2FuIHJlbWFpbiBpbiBwbGFjZS4gSW1hZ2luZSBnb2luZ1xuXHQvLyBmcm9tIGAxLDIsMyw0LDVgIHRvIGA0LDUsMSwyLDNgIHdoZXJlIHRoZSBudW1iZXJzIGFyZSBub3QgbmVjZXNzYXJpbHkgdGhlIGtleXMsIGJ1dCB0aGUgaW5kaWNlc1xuXHQvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXllZCBub2RlcyBpbiB0aGUgb2xkIGxpc3QgKGtleWVkIG5vZGVzIGBlLGQsYyxiLGFgID0+IGBiLGEsZSxkLGNgIHdvdWxkXG5cdC8vICBtYXRjaCB0aGUgYWJvdmUgbGlzdHMsIGZvciBleGFtcGxlKS5cblx0Ly9cblx0Ly8gSW4gdGhlcmUgYXJlIHR3byBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlczogYDQsNWAgYW5kIGAxLDIsM2AsIHRoZSBsYXR0ZXIgYmVpbmcgdGhlIGxvbmdlc3QuIFdlXG5cdC8vIGNhbiB1cGRhdGUgdGhvc2Ugbm9kZXMgd2l0aG91dCBtb3ZpbmcgdGhlbSwgYW5kIG9ubHkgY2FsbCBgaW5zZXJ0Tm9kZWAgb24gYDRgIGFuZCBgNWAuXG5cdC8vXG5cdC8vIEBsb2NhbHZvaWQgYWRhcHRlZCB0aGUgYWxnbyB0byBhbHNvIHN1cHBvcnQgbm9kZSBkZWxldGlvbnMgYW5kIGluc2VydGlvbnMgKHRoZSBgbGlzYCBpcyBhY3R1YWxseVxuXHQvLyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlICpvZiBvbGQgbm9kZXMgc3RpbGwgcHJlc2VudCBpbiB0aGUgbmV3IGxpc3QqKS5cblx0Ly9cblx0Ly8gSXQgaXMgYSBnZW5lcmFsIGFsZ29yaXRobSB0aGF0IGlzIGZpcmVwcm9vZiBpbiBhbGwgY2lyY3Vtc3RhbmNlcywgYnV0IGl0IHJlcXVpcmVzIHRoZSBhbGxvY2F0aW9uXG5cdC8vIGFuZCB0aGUgY29uc3RydWN0aW9uIG9mIGEgYGtleSA9PiBvbGRJbmRleGAgbWFwLCBhbmQgdGhyZWUgYXJyYXlzIChvbmUgd2l0aCBgbmV3SW5kZXggPT4gb2xkSW5kZXhgLFxuXHQvLyB0aGUgYExJU2AgYW5kIGEgdGVtcG9yYXJ5IG9uZSB0byBjcmVhdGUgdGhlIExJUykuXG5cdC8vXG5cdC8vIFNvIHdlIGNoZWF0IHdoZXJlIHdlIGNhbjogaWYgdGhlIHRhaWxzIG9mIHRoZSBsaXN0cyBhcmUgaWRlbnRpY2FsLCB0aGV5IGFyZSBndWFyYW50ZWVkIHRvIGJlIHBhcnQgb2Zcblx0Ly8gdGhlIExJUyBhbmQgY2FuIGJlIHVwZGF0ZWQgd2l0aG91dCBtb3ZpbmcgdGhlbS5cblx0Ly9cblx0Ly8gSWYgdHdvIG5vZGVzIGFyZSBzd2FwcGVkLCB0aGV5IGFyZSBndWFyYW50ZWVkIG5vdCB0byBiZSBwYXJ0IG9mIHRoZSBMSVMsIGFuZCBtdXN0IGJlIG1vdmVkICh3aXRoXG5cdC8vIHRoZSBleGNlcHRpb24gb2YgdGhlIGxhc3Qgbm9kZSBpZiB0aGUgbGlzdCBpcyBmdWxseSByZXZlcnNlZCkuXG5cdC8vXG5cdC8vICMjIEZpbmRpbmcgdGhlIG5leHQgc2libGluZy5cblx0Ly9cblx0Ly8gYHVwZGF0ZU5vZGUoKWAgYW5kIGBjcmVhdGVOb2RlKClgIGV4cGVjdCBhIG5leHRTaWJsaW5nIHBhcmFtZXRlciB0byBwZXJmb3JtIERPTSBvcGVyYXRpb25zLlxuXHQvLyBXaGVuIHRoZSBsaXN0IGlzIGJlaW5nIHRyYXZlcnNlZCB0b3AtZG93biwgYXQgYW55IGluZGV4LCB0aGUgRE9NIG5vZGVzIHVwIHRvIHRoZSBwcmV2aW91c1xuXHQvLyB2bm9kZSByZWZsZWN0IHRoZSBjb250ZW50IG9mIHRoZSBuZXcgbGlzdCwgd2hlcmVhcyB0aGUgcmVzdCBvZiB0aGUgRE9NIG5vZGVzIHJlZmxlY3QgdGhlIG9sZFxuXHQvLyBsaXN0LiBUaGUgbmV4dCBzaWJsaW5nIG11c3QgYmUgbG9va2VkIGZvciBpbiB0aGUgb2xkIGxpc3QgdXNpbmcgYGdldE5leHRTaWJsaW5nKC4uLiBvbGRTdGFydCArIDEgLi4uKWAuXG5cdC8vXG5cdC8vIEluIHRoZSBvdGhlciBzY2VuYXJpb3MgKHN3YXBzLCB1cHdhcmRzIHRyYXZlcnNhbCwgbWFwLWJhc2VkIGRpZmYpLFxuXHQvLyB0aGUgbmV3IHZub2RlcyBsaXN0IGlzIHRyYXZlcnNlZCB1cHdhcmRzLiBUaGUgRE9NIG5vZGVzIGF0IHRoZSBib3R0b20gb2YgdGhlIGxpc3QgcmVmbGVjdCB0aGVcblx0Ly8gYm90dG9tIHBhcnQgb2YgdGhlIG5ldyB2bm9kZXMgbGlzdCwgYW5kIHdlIGNhbiB1c2UgdGhlIGB2LmRvbWAgIHZhbHVlIG9mIHRoZSBwcmV2aW91cyBub2RlXG5cdC8vIGFzIHRoZSBuZXh0IHNpYmxpbmcgKGNhY2hlZCBpbiB0aGUgYG5leHRTaWJsaW5nYCB2YXJpYWJsZSkuXG5cblxuXHQvLyAjIyBET00gbm9kZSBtb3Zlc1xuXHQvL1xuXHQvLyBJbiBtb3N0IHNjZW5hcmlvcyBgdXBkYXRlTm9kZSgpYCBhbmQgYGNyZWF0ZU5vZGUoKWAgcGVyZm9ybSB0aGUgRE9NIG9wZXJhdGlvbnMuIEhvd2V2ZXIsXG5cdC8vIHRoaXMgaXMgbm90IHRoZSBjYXNlIGlmIHRoZSBub2RlIG1vdmVkIChzZWNvbmQgYW5kIGZvdXJ0aCBwYXJ0IG9mIHRoZSBkaWZmIGFsZ28pLiBXZSBtb3ZlXG5cdC8vIHRoZSBvbGQgRE9NIG5vZGVzIGJlZm9yZSB1cGRhdGVOb2RlIHJ1bnMgYmVjYXVzZSBpdCBlbmFibGVzIHVzIHRvIHVzZSB0aGUgY2FjaGVkIGBuZXh0U2libGluZ2Bcblx0Ly8gdmFyaWFibGUgcmF0aGVyIHRoYW4gZmV0Y2hpbmcgaXQgdXNpbmcgYGdldE5leHRTaWJsaW5nKClgLlxuXHQvL1xuXHQvLyBUaGUgZm91cnRoIHBhcnQgb2YgdGhlIGRpZmYgY3VycmVudGx5IGluc2VydHMgbm9kZXMgdW5jb25kaXRpb25hbGx5LCBsZWFkaW5nIHRvIGlzc3Vlc1xuXHQvLyBsaWtlICMxNzkxIGFuZCAjMTk5OS4gV2UgbmVlZCB0byBiZSBzbWFydGVyIGFib3V0IHRob3NlIHNpdHVhdGlvbnMgd2hlcmUgYWRqYXNjZW50IG9sZFxuXHQvLyBub2RlcyByZW1haW4gdG9nZXRoZXIgaW4gdGhlIG5ldyBsaXN0IGluIGEgd2F5IHRoYXQgaXNuJ3QgY292ZXJlZCBieSBwYXJ0cyBvbmUgYW5kXG5cdC8vIHRocmVlIG9mIHRoZSBkaWZmIGFsZ28uXG5cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZXMocGFyZW50LCBvbGQsIHZub2RlcywgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdGlmIChvbGQgPT09IHZub2RlcyB8fCBvbGQgPT0gbnVsbCAmJiB2bm9kZXMgPT0gbnVsbCkgcmV0dXJuXG5cdFx0ZWxzZSBpZiAob2xkID09IG51bGwgfHwgb2xkLmxlbmd0aCA9PT0gMCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIDAsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0ZWxzZSBpZiAodm5vZGVzID09IG51bGwgfHwgdm5vZGVzLmxlbmd0aCA9PT0gMCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIDAsIG9sZC5sZW5ndGgpXG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgaXNPbGRLZXllZCA9IG9sZFswXSAhPSBudWxsICYmIG9sZFswXS5rZXkgIT0gbnVsbFxuXHRcdFx0dmFyIGlzS2V5ZWQgPSB2bm9kZXNbMF0gIT0gbnVsbCAmJiB2bm9kZXNbMF0ua2V5ICE9IG51bGxcblx0XHRcdHZhciBzdGFydCA9IDAsIG9sZFN0YXJ0ID0gMFxuXHRcdFx0aWYgKCFpc09sZEtleWVkKSB3aGlsZSAob2xkU3RhcnQgPCBvbGQubGVuZ3RoICYmIG9sZFtvbGRTdGFydF0gPT0gbnVsbCkgb2xkU3RhcnQrK1xuXHRcdFx0aWYgKCFpc0tleWVkKSB3aGlsZSAoc3RhcnQgPCB2bm9kZXMubGVuZ3RoICYmIHZub2Rlc1tzdGFydF0gPT0gbnVsbCkgc3RhcnQrK1xuXHRcdFx0aWYgKGlzT2xkS2V5ZWQgIT09IGlzS2V5ZWQpIHtcblx0XHRcdFx0cmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGQubGVuZ3RoKVxuXHRcdFx0XHRjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0tleWVkKSB7XG5cdFx0XHRcdC8vIERvbid0IGluZGV4IHBhc3QgdGhlIGVuZCBvZiBlaXRoZXIgbGlzdCAoY2F1c2VzIGRlb3B0cykuXG5cdFx0XHRcdHZhciBjb21tb25MZW5ndGggPSBvbGQubGVuZ3RoIDwgdm5vZGVzLmxlbmd0aCA/IG9sZC5sZW5ndGggOiB2bm9kZXMubGVuZ3RoXG5cdFx0XHRcdC8vIFJld2luZCBpZiBuZWNlc3NhcnkgdG8gdGhlIGZpcnN0IG5vbi1udWxsIGluZGV4IG9uIGVpdGhlciBzaWRlLlxuXHRcdFx0XHQvLyBXZSBjb3VsZCBhbHRlcm5hdGl2ZWx5IGVpdGhlciBleHBsaWNpdGx5IGNyZWF0ZSBvciByZW1vdmUgbm9kZXMgd2hlbiBgc3RhcnQgIT09IG9sZFN0YXJ0YFxuXHRcdFx0XHQvLyBidXQgdGhhdCB3b3VsZCBiZSBvcHRpbWl6aW5nIGZvciBzcGFyc2UgbGlzdHMgd2hpY2ggYXJlIG1vcmUgcmFyZSB0aGFuIGRlbnNlIG9uZXMuXG5cdFx0XHRcdHN0YXJ0ID0gc3RhcnQgPCBvbGRTdGFydCA/IHN0YXJ0IDogb2xkU3RhcnRcblx0XHRcdFx0Zm9yICg7IHN0YXJ0IDwgY29tbW9uTGVuZ3RoOyBzdGFydCsrKSB7XG5cdFx0XHRcdFx0byA9IG9sZFtzdGFydF1cblx0XHRcdFx0XHR2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHRcdGlmIChvID09PSB2IHx8IG8gPT0gbnVsbCAmJiB2ID09IG51bGwpIGNvbnRpbnVlXG5cdFx0XHRcdFx0ZWxzZSBpZiAobyA9PSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBnZXROZXh0U2libGluZyhvbGQsIHN0YXJ0ICsgMSwgbmV4dFNpYmxpbmcpKVxuXHRcdFx0XHRcdGVsc2UgaWYgKHYgPT0gbnVsbCkgcmVtb3ZlTm9kZShwYXJlbnQsIG8pXG5cdFx0XHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgc3RhcnQgKyAxLCBuZXh0U2libGluZyksIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbGQubGVuZ3RoID4gY29tbW9uTGVuZ3RoKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgc3RhcnQsIG9sZC5sZW5ndGgpXG5cdFx0XHRcdGlmICh2bm9kZXMubGVuZ3RoID4gY29tbW9uTGVuZ3RoKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBrZXllZCBkaWZmXG5cdFx0XHRcdHZhciBvbGRFbmQgPSBvbGQubGVuZ3RoIC0gMSwgZW5kID0gdm5vZGVzLmxlbmd0aCAtIDEsIG1hcCwgbywgdiwgb2UsIHZlLCB0b3BTaWJsaW5nXG5cblx0XHRcdFx0Ly8gYm90dG9tLXVwXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0b2UgPSBvbGRbb2xkRW5kXVxuXHRcdFx0XHRcdHZlID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0XHRpZiAob2Uua2V5ICE9PSB2ZS5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0aWYgKG9lICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gdG9wLWRvd25cblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRvID0gb2xkW29sZFN0YXJ0XVxuXHRcdFx0XHRcdHYgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRcdFx0aWYgKG8ua2V5ICE9PSB2LmtleSkgYnJlYWtcblx0XHRcdFx0XHRvbGRTdGFydCsrLCBzdGFydCsrXG5cdFx0XHRcdFx0aWYgKG8gIT09IHYpIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpLCBucylcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzd2FwcyBhbmQgbGlzdCByZXZlcnNhbHNcblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRpZiAoc3RhcnQgPT09IGVuZCkgYnJlYWtcblx0XHRcdFx0XHRpZiAoby5rZXkgIT09IHZlLmtleSB8fCBvZS5rZXkgIT09IHYua2V5KSBicmVha1xuXHRcdFx0XHRcdHRvcFNpYmxpbmcgPSBnZXROZXh0U2libGluZyhvbGQsIG9sZFN0YXJ0LCBuZXh0U2libGluZylcblx0XHRcdFx0XHRtb3ZlTm9kZXMocGFyZW50LCBvZSwgdG9wU2libGluZylcblx0XHRcdFx0XHRpZiAob2UgIT09IHYpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdiwgaG9va3MsIHRvcFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICgrK3N0YXJ0IDw9IC0tZW5kKSBtb3ZlTm9kZXMocGFyZW50LCBvLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRpZiAobyAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkU3RhcnQrKzsgb2xkRW5kLS1cblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHRcdG8gPSBvbGRbb2xkU3RhcnRdXG5cdFx0XHRcdFx0diA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBib3R0b20gdXAgb25jZSBhZ2FpblxuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdGlmIChvZS5rZXkgIT09IHZlLmtleSkgYnJlYWtcblx0XHRcdFx0XHRpZiAob2UgIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzdGFydCA+IGVuZCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRlbHNlIGlmIChvbGRTdGFydCA+IG9sZEVuZCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQvLyBpbnNwaXJlZCBieSBpdmkgaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aS8gYnkgQm9yaXMgS2F1bFxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbE5leHRTaWJsaW5nID0gbmV4dFNpYmxpbmcsIHZub2Rlc0xlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMSwgb2xkSW5kaWNlcyA9IG5ldyBBcnJheSh2bm9kZXNMZW5ndGgpLCBsaT0wLCBpPTAsIHBvcyA9IDIxNDc0ODM2NDcsIG1hdGNoZWQgPSAwLCBtYXAsIGxpc0luZGljZXNcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgdm5vZGVzTGVuZ3RoOyBpKyspIG9sZEluZGljZXNbaV0gPSAtMVxuXHRcdFx0XHRcdGZvciAoaSA9IGVuZDsgaSA+PSBzdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRpZiAobWFwID09IG51bGwpIG1hcCA9IGdldEtleU1hcChvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRcdFx0dmUgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdHZhciBvbGRJbmRleCA9IG1hcFt2ZS5rZXldXG5cdFx0XHRcdFx0XHRpZiAob2xkSW5kZXggIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRwb3MgPSAob2xkSW5kZXggPCBwb3MpID8gb2xkSW5kZXggOiAtMSAvLyBiZWNvbWVzIC0xIGlmIG5vZGVzIHdlcmUgcmUtb3JkZXJlZFxuXHRcdFx0XHRcdFx0XHRvbGRJbmRpY2VzW2ktc3RhcnRdID0gb2xkSW5kZXhcblx0XHRcdFx0XHRcdFx0b2UgPSBvbGRbb2xkSW5kZXhdXG5cdFx0XHRcdFx0XHRcdG9sZFtvbGRJbmRleF0gPSBudWxsXG5cdFx0XHRcdFx0XHRcdGlmIChvZSAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCsrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5leHRTaWJsaW5nID0gb3JpZ2luYWxOZXh0U2libGluZ1xuXHRcdFx0XHRcdGlmIChtYXRjaGVkICE9PSBvbGRFbmQgLSBvbGRTdGFydCArIDEpIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBvbGRTdGFydCwgb2xkRW5kICsgMSlcblx0XHRcdFx0XHRpZiAobWF0Y2hlZCA9PT0gMCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHBvcyA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gdGhlIGluZGljZXMgb2YgdGhlIGluZGljZXMgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIHBhcnQgb2YgdGhlXG5cdFx0XHRcdFx0XHRcdC8vIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBpbiB0aGUgb2xkSW5kaWNlcyBsaXN0XG5cdFx0XHRcdFx0XHRcdGxpc0luZGljZXMgPSBtYWtlTGlzSW5kaWNlcyhvbGRJbmRpY2VzKVxuXHRcdFx0XHRcdFx0XHRsaSA9IGxpc0luZGljZXMubGVuZ3RoIC0gMVxuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQ7IGkgPj0gc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRcdHYgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdFx0XHRpZiAob2xkSW5kaWNlc1tpLXN0YXJ0XSA9PT0gLTEpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGxpc0luZGljZXNbbGldID09PSBpIC0gc3RhcnQpIGxpLS1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgbW92ZU5vZGVzKHBhcmVudCwgdiwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICh2LmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZub2Rlc1tpXS5kb21cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kOyBpID49IHN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0XHR2ID0gdm5vZGVzW2ldXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9sZEluZGljZXNbaS1zdGFydF0gPT09IC0xKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0XHRpZiAodi5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2bm9kZXNbaV0uZG9tXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZShwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR2YXIgb2xkVGFnID0gb2xkLnRhZywgdGFnID0gdm5vZGUudGFnXG5cdFx0aWYgKG9sZFRhZyA9PT0gdGFnKSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IG9sZC5zdGF0ZVxuXHRcdFx0dm5vZGUuZXZlbnRzID0gb2xkLmV2ZW50c1xuXHRcdFx0aWYgKHNob3VsZE5vdFVwZGF0ZSh2bm9kZSwgb2xkKSkgcmV0dXJuXG5cdFx0XHRpZiAodHlwZW9mIG9sZFRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkge1xuXHRcdFx0XHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHN3aXRjaCAob2xkVGFnKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIiNcIjogdXBkYXRlVGV4dChvbGQsIHZub2RlKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiPFwiOiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiW1wiOiB1cGRhdGVGcmFnbWVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpOyBicmVha1xuXHRcdFx0XHRcdGRlZmF1bHQ6IHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgaG9va3MsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHVwZGF0ZUNvbXBvbmVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmVtb3ZlTm9kZShwYXJlbnQsIG9sZClcblx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlVGV4dChvbGQsIHZub2RlKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbi50b1N0cmluZygpICE9PSB2bm9kZS5jaGlsZHJlbi50b1N0cmluZygpKSB7XG5cdFx0XHRvbGQuZG9tLm5vZGVWYWx1ZSA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbiAhPT0gdm5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdHJlbW92ZUhUTUwocGFyZW50LCBvbGQpXG5cdFx0XHRjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHRcdHZub2RlLmluc3RhbmNlID0gb2xkLmluc3RhbmNlXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHVwZGF0ZU5vZGVzKHBhcmVudCwgb2xkLmNoaWxkcmVuLCB2bm9kZS5jaGlsZHJlbiwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHR2YXIgZG9tU2l6ZSA9IDAsIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHR2bm9kZS5kb20gPSBudWxsXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwgJiYgY2hpbGQuZG9tICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAodm5vZGUuZG9tID09IG51bGwpIHZub2RlLmRvbSA9IGNoaWxkLmRvbVxuXHRcdFx0XHRcdGRvbVNpemUgKz0gY2hpbGQuZG9tU2l6ZSB8fCAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb21TaXplICE9PSAxKSB2bm9kZS5kb21TaXplID0gZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVFbGVtZW50KG9sZCwgdm5vZGUsIGhvb2tzLCBucykge1xuXHRcdHZhciBlbGVtZW50ID0gdm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdG5zID0gZ2V0TmFtZVNwYWNlKHZub2RlKSB8fCBuc1xuXG5cdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSB7XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgPT0gbnVsbCkgdm5vZGUuYXR0cnMgPSB7fVxuXHRcdH1cblx0XHR1cGRhdGVBdHRycyh2bm9kZSwgb2xkLmF0dHJzLCB2bm9kZS5hdHRycywgbnMpXG5cdFx0aWYgKCFtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkpIHtcblx0XHRcdHVwZGF0ZU5vZGVzKGVsZW1lbnQsIG9sZC5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4sIGhvb2tzLCBudWxsLCBucylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHZub2RlLmluc3RhbmNlID0gVm5vZGUubm9ybWFsaXplKGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUudmlldywgdm5vZGUpKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSA9PT0gdm5vZGUpIHRocm93IEVycm9yKFwiQSB2aWV3IGNhbm5vdCByZXR1cm4gdGhlIHZub2RlIGl0IHJlY2VpdmVkIGFzIGFyZ3VtZW50XCIpXG5cdFx0dXBkYXRlTGlmZWN5Y2xlKHZub2RlLnN0YXRlLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAob2xkLmluc3RhbmNlID09IG51bGwpIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdGVsc2UgdXBkYXRlTm9kZShwYXJlbnQsIG9sZC5pbnN0YW5jZSwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR2bm9kZS5kb20gPSB2bm9kZS5pbnN0YW5jZS5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSB2bm9kZS5pbnN0YW5jZS5kb21TaXplXG5cdFx0fVxuXHRcdGVsc2UgaWYgKG9sZC5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRyZW1vdmVOb2RlKHBhcmVudCwgb2xkLmluc3RhbmNlKVxuXHRcdFx0dm5vZGUuZG9tID0gdW5kZWZpbmVkXG5cdFx0XHR2bm9kZS5kb21TaXplID0gMFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBnZXRLZXlNYXAodm5vZGVzLCBzdGFydCwgZW5kKSB7XG5cdFx0dmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0XHRmb3IgKDsgc3RhcnQgPCBlbmQ7IHN0YXJ0KyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tzdGFydF1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBrZXkgPSB2bm9kZS5rZXlcblx0XHRcdFx0aWYgKGtleSAhPSBudWxsKSBtYXBba2V5XSA9IHN0YXJ0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtYXBcblx0fVxuXHQvLyBMaWZ0ZWQgZnJvbSBpdmkgaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aS9cblx0Ly8gdGFrZXMgYSBsaXN0IG9mIHVuaXF1ZSBudW1iZXJzICgtMSBpcyBzcGVjaWFsIGFuZCBjYW5cblx0Ly8gb2NjdXIgbXVsdGlwbGUgdGltZXMpIGFuZCByZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGluZGljZXNcblx0Ly8gb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIHBhcnQgb2YgdGhlIGxvbmdlc3QgaW5jcmVhc2luZ1xuXHQvLyBzdWJzZXF1ZW5jZVxuXHR2YXIgbGlzVGVtcCA9IFtdXG5cdGZ1bmN0aW9uIG1ha2VMaXNJbmRpY2VzKGEpIHtcblx0XHR2YXIgcmVzdWx0ID0gWzBdXG5cdFx0dmFyIHUgPSAwLCB2ID0gMCwgaSA9IDBcblx0XHR2YXIgaWwgPSBsaXNUZW1wLmxlbmd0aCA9IGEubGVuZ3RoXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgaSsrKSBsaXNUZW1wW2ldID0gYVtpXVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWw7ICsraSkge1xuXHRcdFx0aWYgKGFbaV0gPT09IC0xKSBjb250aW51ZVxuXHRcdFx0dmFyIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdXG5cdFx0XHRpZiAoYVtqXSA8IGFbaV0pIHtcblx0XHRcdFx0bGlzVGVtcFtpXSA9IGpcblx0XHRcdFx0cmVzdWx0LnB1c2goaSlcblx0XHRcdFx0Y29udGludWVcblx0XHRcdH1cblx0XHRcdHUgPSAwXG5cdFx0XHR2ID0gcmVzdWx0Lmxlbmd0aCAtIDFcblx0XHRcdHdoaWxlICh1IDwgdikge1xuXHRcdFx0XHQvLyBGYXN0IGludGVnZXIgYXZlcmFnZSB3aXRob3V0IG92ZXJmbG93LlxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHR2YXIgYyA9ICh1ID4+PiAxKSArICh2ID4+PiAxKSArICh1ICYgdiAmIDEpXG5cdFx0XHRcdGlmIChhW3Jlc3VsdFtjXV0gPCBhW2ldKSB7XG5cdFx0XHRcdFx0dSA9IGMgKyAxXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0diA9IGNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFbaV0gPCBhW3Jlc3VsdFt1XV0pIHtcblx0XHRcdFx0aWYgKHUgPiAwKSBsaXNUZW1wW2ldID0gcmVzdWx0W3UgLSAxXVxuXHRcdFx0XHRyZXN1bHRbdV0gPSBpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHUgPSByZXN1bHQubGVuZ3RoXG5cdFx0diA9IHJlc3VsdFt1IC0gMV1cblx0XHR3aGlsZSAodS0tID4gMCkge1xuXHRcdFx0cmVzdWx0W3VdID0gdlxuXHRcdFx0diA9IGxpc1RlbXBbdl1cblx0XHR9XG5cdFx0bGlzVGVtcC5sZW5ndGggPSAwXG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0TmV4dFNpYmxpbmcodm5vZGVzLCBpLCBuZXh0U2libGluZykge1xuXHRcdGZvciAoOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodm5vZGVzW2ldICE9IG51bGwgJiYgdm5vZGVzW2ldLmRvbSAhPSBudWxsKSByZXR1cm4gdm5vZGVzW2ldLmRvbVxuXHRcdH1cblx0XHRyZXR1cm4gbmV4dFNpYmxpbmdcblx0fVxuXG5cdC8vIFRoaXMgY292ZXJzIGEgcmVhbGx5IHNwZWNpZmljIGVkZ2UgY2FzZTpcblx0Ly8gLSBQYXJlbnQgbm9kZSBpcyBrZXllZCBhbmQgY29udGFpbnMgY2hpbGRcblx0Ly8gLSBDaGlsZCBpcyByZW1vdmVkLCByZXR1cm5zIHVucmVzb2x2ZWQgcHJvbWlzZSBpbiBgb25iZWZvcmVyZW1vdmVgXG5cdC8vIC0gUGFyZW50IG5vZGUgaXMgbW92ZWQgaW4ga2V5ZWQgZGlmZlxuXHQvLyAtIFJlbWFpbmluZyBjaGlsZHJlbiBzdGlsbCBuZWVkIG1vdmVkIGFwcHJvcHJpYXRlbHlcblx0Ly9cblx0Ly8gSWRlYWxseSwgSSdkIHRyYWNrIHJlbW92ZWQgbm9kZXMgYXMgd2VsbCwgYnV0IHRoYXQgaW50cm9kdWNlcyBhIGxvdCBtb3JlXG5cdC8vIGNvbXBsZXhpdHkgYW5kIEknbSBub3QgZXhhY3RseSBpbnRlcmVzdGVkIGluIGRvaW5nIHRoYXQuXG5cdGZ1bmN0aW9uIG1vdmVOb2RlcyhwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZhciBmcmFnID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRtb3ZlQ2hpbGRUb0ZyYWcocGFyZW50LCBmcmFnLCB2bm9kZSlcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZywgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gbW92ZUNoaWxkVG9GcmFnKHBhcmVudCwgZnJhZywgdm5vZGUpIHtcblx0XHQvLyBEb2RnZSB0aGUgcmVjdXJzaW9uIG92ZXJoZWFkIGluIGEgZmV3IG9mIHRoZSBtb3N0IGNvbW1vbiBjYXNlcy5cblx0XHR3aGlsZSAodm5vZGUuZG9tICE9IG51bGwgJiYgdm5vZGUuZG9tLnBhcmVudE5vZGUgPT09IHBhcmVudCkge1xuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0dm5vZGUgPSB2bm9kZS5pbnN0YW5jZVxuXHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdH0gZWxzZSBpZiAodm5vZGUudGFnID09PSBcIjxcIikge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmluc3RhbmNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZnJhZy5hcHBlbmRDaGlsZCh2bm9kZS5pbnN0YW5jZVtpXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgIT09IFwiW1wiKSB7XG5cdFx0XHRcdC8vIERvbid0IHJlY3Vyc2UgZm9yIHRleHQgbm9kZXMgKm9yKiBlbGVtZW50cywganVzdCBmcmFnbWVudHNcblx0XHRcdFx0ZnJhZy5hcHBlbmRDaGlsZCh2bm9kZS5kb20pXG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmNoaWxkcmVuWzBdXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG1vdmVDaGlsZFRvRnJhZyhwYXJlbnQsIGZyYWcsIGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50LCBkb20sIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG5leHRTaWJsaW5nICE9IG51bGwpIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9tLCBuZXh0U2libGluZylcblx0XHRlbHNlIHBhcmVudC5hcHBlbmRDaGlsZChkb20pXG5cdH1cblxuXHRmdW5jdGlvbiBtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkge1xuXHRcdGlmICh2bm9kZS5hdHRycyA9PSBudWxsIHx8IChcblx0XHRcdHZub2RlLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA9PSBudWxsICYmIC8vIGF0dHJpYnV0ZVxuXHRcdFx0dm5vZGUuYXR0cnMuY29udGVudEVkaXRhYmxlID09IG51bGwgLy8gcHJvcGVydHlcblx0XHQpKSByZXR1cm4gZmFsc2Vcblx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdGlmIChjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBjaGlsZHJlblswXS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdFx0XHRpZiAodm5vZGUuZG9tLmlubmVySFRNTCAhPT0gY29udGVudCkgdm5vZGUuZG9tLmlubmVySFRNTCA9IGNvbnRlbnRcblx0XHR9XG5cdFx0ZWxzZSBpZiAoY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggIT09IDApIHRocm93IG5ldyBFcnJvcihcIkNoaWxkIG5vZGUgb2YgYSBjb250ZW50ZWRpdGFibGUgbXVzdCBiZSB0cnVzdGVkLlwiKVxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHQvL3JlbW92ZVxuXHRmdW5jdGlvbiByZW1vdmVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCkge1xuXHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbaV1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSByZW1vdmVOb2RlKHBhcmVudCwgdm5vZGUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZU5vZGUocGFyZW50LCB2bm9kZSkge1xuXHRcdHZhciBtYXNrID0gMFxuXHRcdHZhciBvcmlnaW5hbCA9IHZub2RlLnN0YXRlXG5cdFx0dmFyIHN0YXRlUmVzdWx0LCBhdHRyc1Jlc3VsdFxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbmJlZm9yZXJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbmJlZm9yZXJlbW92ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0bWFzayA9IDFcblx0XHRcdFx0c3RhdGVSZXN1bHQgPSByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gY2FsbEhvb2suY2FsbCh2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bWFzayB8PSAyXG5cdFx0XHRcdGF0dHJzUmVzdWx0ID0gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXG5cdFx0Ly8gSWYgd2UgY2FuLCB0cnkgdG8gZmFzdC1wYXRoIGl0IGFuZCBhdm9pZCBhbGwgdGhlIG92ZXJoZWFkIG9mIGF3YWl0aW5nXG5cdFx0aWYgKCFtYXNrKSB7XG5cdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChzdGF0ZVJlc3VsdCAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdFx0aWYgKG1hc2sgJiAxKSB7IG1hc2sgJj0gMjsgaWYgKCFtYXNrKSByZWFsbHlSZW1vdmUoKSB9XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RhdGVSZXN1bHQudGhlbihuZXh0LCBuZXh0KVxuXHRcdFx0fVxuXHRcdFx0aWYgKGF0dHJzUmVzdWx0ICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0XHRpZiAobWFzayAmIDIpIHsgbWFzayAmPSAxOyBpZiAoIW1hc2spIHJlYWxseVJlbW92ZSgpIH1cblx0XHRcdFx0fVxuXHRcdFx0XHRhdHRyc1Jlc3VsdC50aGVuKG5leHQsIG5leHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVhbGx5UmVtb3ZlKCkge1xuXHRcdFx0Y2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpXG5cdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZUhUTUwocGFyZW50LCB2bm9kZSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuaW5zdGFuY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2bm9kZS5pbnN0YW5jZVtpXSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSkge1xuXHRcdC8vIERvZGdlIHRoZSByZWN1cnNpb24gb3ZlcmhlYWQgaW4gYSBmZXcgb2YgdGhlIG1vc3QgY29tbW9uIGNhc2VzLlxuXHRcdHdoaWxlICh2bm9kZS5kb20gIT0gbnVsbCAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmluc3RhbmNlXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHRcdHJlbW92ZUhUTUwocGFyZW50LCB2bm9kZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2bm9kZS50YWcgIT09IFwiW1wiKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZub2RlLmRvbSlcblx0XHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodm5vZGUuY2hpbGRyZW4pKSBicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh2bm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR2bm9kZSA9IHZub2RlLmNoaWxkcmVuWzBdXG5cdFx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSByZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gb25yZW1vdmUodm5vZGUpIHtcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygdm5vZGUuc3RhdGUub25yZW1vdmUgPT09IFwiZnVuY3Rpb25cIikgY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbnJlbW92ZSwgdm5vZGUpXG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbnJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsSG9vay5jYWxsKHZub2RlLmF0dHJzLm9ucmVtb3ZlLCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIG9ucmVtb3ZlKHZub2RlLmluc3RhbmNlKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSBvbnJlbW92ZShjaGlsZClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vYXR0cnNcblx0ZnVuY3Rpb24gc2V0QXR0cnModm5vZGUsIGF0dHJzLCBucykge1xuXHRcdC8vIElmIHlvdSBhc3NpZ24gYW4gaW5wdXQgdHlwZSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUUgMTEgd2l0aCBhbiBhc3NpZ25tZW50IGV4cHJlc3Npb24sIGFuIGVycm9yIHdpbGwgb2NjdXIuXG5cdFx0Ly9cblx0XHQvLyBBbHNvLCB0aGUgRE9NIGRvZXMgdGhpbmdzIHRvIGlucHV0cyBiYXNlZCBvbiB0aGUgdmFsdWUsIHNvIGl0IG5lZWRzIHNldCBmaXJzdC5cblx0XHQvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9NaXRocmlsSlMvbWl0aHJpbC5qcy9pc3N1ZXMvMjYyMlxuXHRcdGlmICh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBhdHRycy50eXBlICE9IG51bGwpIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIGF0dHJzLnR5cGUpXG5cdFx0dmFyIGlzRmlsZUlucHV0ID0gYXR0cnMgIT0gbnVsbCAmJiB2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBhdHRycy50eXBlID09PSBcImZpbGVcIlxuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0c2V0QXR0cih2bm9kZSwga2V5LCBudWxsLCBhdHRyc1trZXldLCBucywgaXNGaWxlSW5wdXQpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldEF0dHIodm5vZGUsIGtleSwgb2xkLCB2YWx1ZSwgbnMsIGlzRmlsZUlucHV0KSB7XG5cdFx0aWYgKGtleSA9PT0gXCJrZXlcIiB8fCBrZXkgPT09IFwiaXNcIiB8fCB2YWx1ZSA9PSBudWxsIHx8IGlzTGlmZWN5Y2xlTWV0aG9kKGtleSkgfHwgKG9sZCA9PT0gdmFsdWUgJiYgIWlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwga2V5KSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IGtleSA9PT0gXCJ0eXBlXCIgJiYgdm5vZGUudGFnID09PSBcImlucHV0XCIpIHJldHVyblxuXHRcdGlmIChrZXlbMF0gPT09IFwib1wiICYmIGtleVsxXSA9PT0gXCJuXCIpIHJldHVybiB1cGRhdGVFdmVudCh2bm9kZSwga2V5LCB2YWx1ZSlcblx0XHRpZiAoa2V5LnNsaWNlKDAsIDYpID09PSBcInhsaW5rOlwiKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsIGtleS5zbGljZSg2KSwgdmFsdWUpXG5cdFx0ZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHVwZGF0ZVN0eWxlKHZub2RlLmRvbSwgb2xkLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucykpIHtcblx0XHRcdGlmIChrZXkgPT09IFwidmFsdWVcIikge1xuXHRcdFx0XHQvLyBPbmx5IGRvIHRoZSBjb2VyY2lvbiBpZiB3ZSdyZSBhY3R1YWxseSBnb2luZyB0byBjaGVjayB0aGUgdmFsdWUuXG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWltcGxpY2l0LWNvZXJjaW9uICovXG5cdFx0XHRcdC8vc2V0dGluZyBpbnB1dFt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSBieSB0eXBpbmcgb24gZm9jdXNlZCBlbGVtZW50IG1vdmVzIGN1cnNvciB0byBlbmQgaW4gQ2hyb21lXG5cdFx0XHRcdC8vc2V0dGluZyBpbnB1dFt0eXBlPWZpbGVdW3ZhbHVlXSB0byBzYW1lIHZhbHVlIGNhdXNlcyBhbiBlcnJvciB0byBiZSBnZW5lcmF0ZWQgaWYgaXQncyBub24tZW1wdHlcblx0XHRcdFx0aWYgKCh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiB8fCB2bm9kZS50YWcgPT09IFwidGV4dGFyZWFcIikgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUgJiYgKGlzRmlsZUlucHV0IHx8IHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpKSkgcmV0dXJuXG5cdFx0XHRcdC8vc2V0dGluZyBzZWxlY3RbdmFsdWVdIHRvIHNhbWUgdmFsdWUgd2hpbGUgaGF2aW5nIHNlbGVjdCBvcGVuIGJsaW5rcyBzZWxlY3QgZHJvcGRvd24gaW4gQ2hyb21lXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgb2xkICE9PSBudWxsICYmIHZub2RlLmRvbS52YWx1ZSA9PT0gXCJcIiArIHZhbHVlKSByZXR1cm5cblx0XHRcdFx0Ly9zZXR0aW5nIG9wdGlvblt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSB3aGlsZSBoYXZpbmcgc2VsZWN0IG9wZW4gYmxpbmtzIHNlbGVjdCBkcm9wZG93biBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiBvbGQgIT09IG51bGwgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUpIHJldHVyblxuXHRcdFx0XHQvL3NldHRpbmcgaW5wdXRbdHlwZT1maWxlXVt2YWx1ZV0gdG8gZGlmZmVyZW50IHZhbHVlIGlzIGFuIGVycm9yIGlmIGl0J3Mgbm9uLWVtcHR5XG5cdFx0XHRcdC8vIE5vdCBpZGVhbCwgYnV0IGl0IGF0IGxlYXN0IHdvcmtzIGFyb3VuZCB0aGUgbW9zdCBjb21tb24gc291cmNlIG9mIHVuY2F1Z2h0IGV4Y2VwdGlvbnMgZm9yIG5vdy5cblx0XHRcdFx0aWYgKGlzRmlsZUlucHV0ICYmIFwiXCIgKyB2YWx1ZSAhPT0gXCJcIikgeyBjb25zb2xlLmVycm9yKFwiYHZhbHVlYCBpcyByZWFkLW9ubHkgb24gZmlsZSBpbnB1dHMhXCIpOyByZXR1cm4gfVxuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWltcGxpY2l0LWNvZXJjaW9uICovXG5cdFx0XHR9XG5cdFx0XHR2bm9kZS5kb21ba2V5XSA9IHZhbHVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSkgdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpXG5cdFx0XHRcdGVsc2Ugdm5vZGUuZG9tLnJlbW92ZUF0dHJpYnV0ZShrZXkpXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGUoa2V5ID09PSBcImNsYXNzTmFtZVwiID8gXCJjbGFzc1wiIDoga2V5LCB2YWx1ZSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlQXR0cih2bm9kZSwga2V5LCBvbGQsIG5zKSB7XG5cdFx0aWYgKGtleSA9PT0gXCJrZXlcIiB8fCBrZXkgPT09IFwiaXNcIiB8fCBvbGQgPT0gbnVsbCB8fCBpc0xpZmVjeWNsZU1ldGhvZChrZXkpKSByZXR1cm5cblx0XHRpZiAoa2V5WzBdID09PSBcIm9cIiAmJiBrZXlbMV0gPT09IFwiblwiKSB1cGRhdGVFdmVudCh2bm9kZSwga2V5LCB1bmRlZmluZWQpXG5cdFx0ZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHVwZGF0ZVN0eWxlKHZub2RlLmRvbSwgb2xkLCBudWxsKVxuXHRcdGVsc2UgaWYgKFxuXHRcdFx0aGFzUHJvcGVydHlLZXkodm5vZGUsIGtleSwgbnMpXG5cdFx0XHQmJiBrZXkgIT09IFwiY2xhc3NOYW1lXCJcblx0XHRcdCYmIGtleSAhPT0gXCJ0aXRsZVwiIC8vIGNyZWF0ZXMgXCJudWxsXCIgYXMgdGl0bGVcblx0XHRcdCYmICEoa2V5ID09PSBcInZhbHVlXCIgJiYgKFxuXHRcdFx0XHR2bm9kZS50YWcgPT09IFwib3B0aW9uXCJcblx0XHRcdFx0fHwgdm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIHZub2RlLmRvbS5zZWxlY3RlZEluZGV4ID09PSAtMSAmJiB2bm9kZS5kb20gPT09IGFjdGl2ZUVsZW1lbnQoKVxuXHRcdFx0KSlcblx0XHRcdCYmICEodm5vZGUudGFnID09PSBcImlucHV0XCIgJiYga2V5ID09PSBcInR5cGVcIilcblx0XHQpIHtcblx0XHRcdHZub2RlLmRvbVtrZXldID0gbnVsbFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbnNMYXN0SW5kZXggPSBrZXkuaW5kZXhPZihcIjpcIilcblx0XHRcdGlmIChuc0xhc3RJbmRleCAhPT0gLTEpIGtleSA9IGtleS5zbGljZShuc0xhc3RJbmRleCArIDEpXG5cdFx0XHRpZiAob2xkICE9PSBmYWxzZSkgdm5vZGUuZG9tLnJlbW92ZUF0dHJpYnV0ZShrZXkgPT09IFwiY2xhc3NOYW1lXCIgPyBcImNsYXNzXCIgOiBrZXkpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldExhdGVTZWxlY3RBdHRycyh2bm9kZSwgYXR0cnMpIHtcblx0XHRpZiAoXCJ2YWx1ZVwiIGluIGF0dHJzKSB7XG5cdFx0XHRpZihhdHRycy52YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggIT09IC0xKSB2bm9kZS5kb20udmFsdWUgPSBudWxsXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgbm9ybWFsaXplZCA9IFwiXCIgKyBhdHRycy52YWx1ZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uXG5cdFx0XHRcdGlmICh2bm9kZS5kb20udmFsdWUgIT09IG5vcm1hbGl6ZWQgfHwgdm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdFx0dm5vZGUuZG9tLnZhbHVlID0gbm9ybWFsaXplZFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChcInNlbGVjdGVkSW5kZXhcIiBpbiBhdHRycykgc2V0QXR0cih2bm9kZSwgXCJzZWxlY3RlZEluZGV4XCIsIG51bGwsIGF0dHJzLnNlbGVjdGVkSW5kZXgsIHVuZGVmaW5lZClcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVBdHRycyh2bm9kZSwgb2xkLCBhdHRycywgbnMpIHtcblx0XHRpZiAob2xkICYmIG9sZCA9PT0gYXR0cnMpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIkRvbid0IHJldXNlIGF0dHJzIG9iamVjdCwgdXNlIG5ldyBvYmplY3QgZm9yIGV2ZXJ5IHJlZHJhdywgdGhpcyB3aWxsIHRocm93IGluIG5leHQgbWFqb3JcIilcblx0XHR9XG5cdFx0aWYgKGF0dHJzICE9IG51bGwpIHtcblx0XHRcdC8vIElmIHlvdSBhc3NpZ24gYW4gaW5wdXQgdHlwZSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUUgMTEgd2l0aCBhbiBhc3NpZ25tZW50IGV4cHJlc3Npb24sIGFuIGVycm9yIHdpbGwgb2NjdXIuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gQWxzbywgdGhlIERPTSBkb2VzIHRoaW5ncyB0byBpbnB1dHMgYmFzZWQgb24gdGhlIHZhbHVlLCBzbyBpdCBuZWVkcyBzZXQgZmlyc3QuXG5cdFx0XHQvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9NaXRocmlsSlMvbWl0aHJpbC5qcy9pc3N1ZXMvMjYyMlxuXHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGF0dHJzLnR5cGUgIT0gbnVsbCkgdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgYXR0cnMudHlwZSlcblx0XHRcdHZhciBpc0ZpbGVJbnB1dCA9IHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGF0dHJzLnR5cGUgPT09IFwiZmlsZVwiXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRcdFx0c2V0QXR0cih2bm9kZSwga2V5LCBvbGQgJiYgb2xkW2tleV0sIGF0dHJzW2tleV0sIG5zLCBpc0ZpbGVJbnB1dClcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIHZhbFxuXHRcdGlmIChvbGQgIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9sZCkge1xuXHRcdFx0XHRpZiAoKCh2YWwgPSBvbGRba2V5XSkgIT0gbnVsbCkgJiYgKGF0dHJzID09IG51bGwgfHwgYXR0cnNba2V5XSA9PSBudWxsKSkge1xuXHRcdFx0XHRcdHJlbW92ZUF0dHIodm5vZGUsIGtleSwgdmFsLCBucylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBpc0Zvcm1BdHRyaWJ1dGUodm5vZGUsIGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJ2YWx1ZVwiIHx8IGF0dHIgPT09IFwiY2hlY2tlZFwiIHx8IGF0dHIgPT09IFwic2VsZWN0ZWRJbmRleFwiIHx8IGF0dHIgPT09IFwic2VsZWN0ZWRcIiAmJiB2bm9kZS5kb20gPT09IGFjdGl2ZUVsZW1lbnQoKSB8fCB2bm9kZS50YWcgPT09IFwib3B0aW9uXCIgJiYgdm5vZGUuZG9tLnBhcmVudE5vZGUgPT09ICRkb2MuYWN0aXZlRWxlbWVudFxuXHR9XG5cdGZ1bmN0aW9uIGlzTGlmZWN5Y2xlTWV0aG9kKGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJvbmluaXRcIiB8fCBhdHRyID09PSBcIm9uY3JlYXRlXCIgfHwgYXR0ciA9PT0gXCJvbnVwZGF0ZVwiIHx8IGF0dHIgPT09IFwib25yZW1vdmVcIiB8fCBhdHRyID09PSBcIm9uYmVmb3JlcmVtb3ZlXCIgfHwgYXR0ciA9PT0gXCJvbmJlZm9yZXVwZGF0ZVwiXG5cdH1cblx0ZnVuY3Rpb24gaGFzUHJvcGVydHlLZXkodm5vZGUsIGtleSwgbnMpIHtcblx0XHQvLyBGaWx0ZXIgb3V0IG5hbWVzcGFjZWQga2V5c1xuXHRcdHJldHVybiBucyA9PT0gdW5kZWZpbmVkICYmIChcblx0XHRcdC8vIElmIGl0J3MgYSBjdXN0b20gZWxlbWVudCwganVzdCBrZWVwIGl0LlxuXHRcdFx0dm5vZGUudGFnLmluZGV4T2YoXCItXCIpID4gLTEgfHwgdm5vZGUuYXR0cnMgIT0gbnVsbCAmJiB2bm9kZS5hdHRycy5pcyB8fFxuXHRcdFx0Ly8gSWYgaXQncyBhIG5vcm1hbCBlbGVtZW50LCBsZXQncyB0cnkgdG8gYXZvaWQgYSBmZXcgYnJvd3NlciBidWdzLlxuXHRcdFx0a2V5ICE9PSBcImhyZWZcIiAmJiBrZXkgIT09IFwibGlzdFwiICYmIGtleSAhPT0gXCJmb3JtXCIgJiYga2V5ICE9PSBcIndpZHRoXCIgJiYga2V5ICE9PSBcImhlaWdodFwiLy8gJiYga2V5ICE9PSBcInR5cGVcIlxuXHRcdFx0Ly8gRGVmZXIgdGhlIHByb3BlcnR5IGNoZWNrIHVudGlsICphZnRlciogd2UgY2hlY2sgZXZlcnl0aGluZy5cblx0XHQpICYmIGtleSBpbiB2bm9kZS5kb21cblx0fVxuXG5cdC8vc3R5bGVcblx0dmFyIHVwcGVyY2FzZVJlZ2V4ID0gL1tBLVpdL2dcblx0ZnVuY3Rpb24gdG9Mb3dlckNhc2UoY2FwaXRhbCkgeyByZXR1cm4gXCItXCIgKyBjYXBpdGFsLnRvTG93ZXJDYXNlKCkgfVxuXHRmdW5jdGlvbiBub3JtYWxpemVLZXkoa2V5KSB7XG5cdFx0cmV0dXJuIGtleVswXSA9PT0gXCItXCIgJiYga2V5WzFdID09PSBcIi1cIiA/IGtleSA6XG5cdFx0XHRrZXkgPT09IFwiY3NzRmxvYXRcIiA/IFwiZmxvYXRcIiA6XG5cdFx0XHRcdGtleS5yZXBsYWNlKHVwcGVyY2FzZVJlZ2V4LCB0b0xvd2VyQ2FzZSlcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVTdHlsZShlbGVtZW50LCBvbGQsIHN0eWxlKSB7XG5cdFx0aWYgKG9sZCA9PT0gc3R5bGUpIHtcblx0XHRcdC8vIFN0eWxlcyBhcmUgZXF1aXZhbGVudCwgZG8gbm90aGluZy5cblx0XHR9IGVsc2UgaWYgKHN0eWxlID09IG51bGwpIHtcblx0XHRcdC8vIE5ldyBzdHlsZSBpcyBtaXNzaW5nLCBqdXN0IGNsZWFyIGl0LlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHN0eWxlICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHQvLyBOZXcgc3R5bGUgaXMgYSBzdHJpbmcsIGxldCBlbmdpbmUgZGVhbCB3aXRoIHBhdGNoaW5nLlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGVcblx0XHR9IGVsc2UgaWYgKG9sZCA9PSBudWxsIHx8IHR5cGVvZiBvbGQgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIGBvbGRgIGlzIG1pc3Npbmcgb3IgYSBzdHJpbmcsIGBzdHlsZWAgaXMgYW4gb2JqZWN0LlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdFx0Ly8gQWRkIG5ldyBzdHlsZSBwcm9wZXJ0aWVzXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gc3R5bGUpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gc3R5bGVba2V5XVxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShub3JtYWxpemVLZXkoa2V5KSwgU3RyaW5nKHZhbHVlKSlcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gQm90aCBvbGQgJiBuZXcgYXJlIChkaWZmZXJlbnQpIG9iamVjdHMuXG5cdFx0XHQvLyBVcGRhdGUgc3R5bGUgcHJvcGVydGllcyB0aGF0IGhhdmUgY2hhbmdlZFxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHN0eWxlKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHN0eWxlW2tleV1cblx0XHRcdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgKHZhbHVlID0gU3RyaW5nKHZhbHVlKSkgIT09IFN0cmluZyhvbGRba2V5XSkpIHtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpLCB2YWx1ZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gUmVtb3ZlIHN0eWxlIHByb3BlcnRpZXMgdGhhdCBubyBsb25nZXIgZXhpc3Rcblx0XHRcdGZvciAodmFyIGtleSBpbiBvbGQpIHtcblx0XHRcdFx0aWYgKG9sZFtrZXldICE9IG51bGwgJiYgc3R5bGVba2V5XSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShub3JtYWxpemVLZXkoa2V5KSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEhlcmUncyBhbiBleHBsYW5hdGlvbiBvZiBob3cgdGhpcyB3b3Jrczpcblx0Ly8gMS4gVGhlIGV2ZW50IG5hbWVzIGFyZSBhbHdheXMgKGJ5IGRlc2lnbikgcHJlZml4ZWQgYnkgYG9uYC5cblx0Ly8gMi4gVGhlIEV2ZW50TGlzdGVuZXIgaW50ZXJmYWNlIGFjY2VwdHMgZWl0aGVyIGEgZnVuY3Rpb24gb3IgYW4gb2JqZWN0XG5cdC8vICAgIHdpdGggYSBgaGFuZGxlRXZlbnRgIG1ldGhvZC5cblx0Ly8gMy4gVGhlIG9iamVjdCBkb2VzIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLCB0byBhdm9pZFxuXHQvLyAgICBhbnkgcG90ZW50aWFsIGludGVyZmVyZW5jZSB3aXRoIHRoYXQgKGUuZy4gc2V0dGVycykuXG5cdC8vIDQuIFRoZSBldmVudCBuYW1lIGlzIHJlbWFwcGVkIHRvIHRoZSBoYW5kbGVyIGJlZm9yZSBjYWxsaW5nIGl0LlxuXHQvLyA1LiBJbiBmdW5jdGlvbi1iYXNlZCBldmVudCBoYW5kbGVycywgYGV2LnRhcmdldCA9PT0gdGhpc2AuIFdlIHJlcGxpY2F0ZVxuXHQvLyAgICB0aGF0IGJlbG93LlxuXHQvLyA2LiBJbiBmdW5jdGlvbi1iYXNlZCBldmVudCBoYW5kbGVycywgYHJldHVybiBmYWxzZWAgcHJldmVudHMgdGhlIGRlZmF1bHRcblx0Ly8gICAgYWN0aW9uIGFuZCBzdG9wcyBldmVudCBwcm9wYWdhdGlvbi4gV2UgcmVwbGljYXRlIHRoYXQgYmVsb3cuXG5cdGZ1bmN0aW9uIEV2ZW50RGljdCgpIHtcblx0XHQvLyBTYXZlIHRoaXMsIHNvIHRoZSBjdXJyZW50IHJlZHJhdyBpcyBjb3JyZWN0bHkgdHJhY2tlZC5cblx0XHR0aGlzLl8gPSBjdXJyZW50UmVkcmF3XG5cdH1cblx0RXZlbnREaWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0RXZlbnREaWN0LnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChldikge1xuXHRcdHZhciBoYW5kbGVyID0gdGhpc1tcIm9uXCIgKyBldi50eXBlXVxuXHRcdHZhciByZXN1bHRcblx0XHRpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikgcmVzdWx0ID0gaGFuZGxlci5jYWxsKGV2LmN1cnJlbnRUYXJnZXQsIGV2KVxuXHRcdGVsc2UgaWYgKHR5cGVvZiBoYW5kbGVyLmhhbmRsZUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIGhhbmRsZXIuaGFuZGxlRXZlbnQoZXYpXG5cdFx0aWYgKHRoaXMuXyAmJiBldi5yZWRyYXcgIT09IGZhbHNlKSAoMCwgdGhpcy5fKSgpXG5cdFx0aWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KClcblx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0fVxuXHR9XG5cblx0Ly9ldmVudFxuXHRmdW5jdGlvbiB1cGRhdGVFdmVudCh2bm9kZSwga2V5LCB2YWx1ZSkge1xuXHRcdGlmICh2bm9kZS5ldmVudHMgIT0gbnVsbCkge1xuXHRcdFx0dm5vZGUuZXZlbnRzLl8gPSBjdXJyZW50UmVkcmF3XG5cdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleV0gPT09IHZhbHVlKSByZXR1cm5cblx0XHRcdGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSA9PSBudWxsKSB2bm9kZS5kb20uYWRkRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdmFsdWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSAhPSBudWxsKSB2bm9kZS5kb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG5cdFx0XHR2bm9kZS5ldmVudHMgPSBuZXcgRXZlbnREaWN0KClcblx0XHRcdHZub2RlLmRvbS5hZGRFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdmFsdWVcblx0XHR9XG5cdH1cblxuXHQvL2xpZmVjeWNsZVxuXHRmdW5jdGlvbiBpbml0TGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKSB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub25pbml0ID09PSBcImZ1bmN0aW9uXCIpIGNhbGxIb29rLmNhbGwoc291cmNlLm9uaW5pdCwgdm5vZGUpXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub25jcmVhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChjYWxsSG9vay5iaW5kKHNvdXJjZS5vbmNyZWF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUxpZmVjeWNsZShzb3VyY2UsIHZub2RlLCBob29rcykge1xuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9udXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIGhvb2tzLnB1c2goY2FsbEhvb2suYmluZChzb3VyY2Uub251cGRhdGUsIHZub2RlKSlcblx0fVxuXHRmdW5jdGlvbiBzaG91bGROb3RVcGRhdGUodm5vZGUsIG9sZCkge1xuXHRcdGRvIHtcblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBmb3JjZSA9IGNhbGxIb29rLmNhbGwodm5vZGUuYXR0cnMub25iZWZvcmV1cGRhdGUsIHZub2RlLCBvbGQpXG5cdFx0XHRcdGlmIChmb3JjZSAhPT0gdW5kZWZpbmVkICYmICFmb3JjZSkgYnJlYWtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBmb3JjZSA9IGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUub25iZWZvcmV1cGRhdGUsIHZub2RlLCBvbGQpXG5cdFx0XHRcdGlmIChmb3JjZSAhPT0gdW5kZWZpbmVkICYmICFmb3JjZSkgYnJlYWtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH0gd2hpbGUgKGZhbHNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBvbGQuaW5zdGFuY2Vcblx0XHQvLyBPbmUgd291bGQgdGhpbmsgaGF2aW5nIHRoZSBhY3R1YWwgbGF0ZXN0IGF0dHJpYnV0ZXMgd291bGQgYmUgaWRlYWwsXG5cdFx0Ly8gYnV0IGl0IGRvZXNuJ3QgbGV0IHVzIHByb3Blcmx5IGRpZmYgYmFzZWQgb24gb3VyIGN1cnJlbnQgaW50ZXJuYWxcblx0XHQvLyByZXByZXNlbnRhdGlvbi4gV2UgaGF2ZSB0byBzYXZlIG5vdCBvbmx5IHRoZSBvbGQgRE9NIGluZm8sIGJ1dCBhbHNvXG5cdFx0Ly8gdGhlIGF0dHJpYnV0ZXMgdXNlZCB0byBjcmVhdGUgaXQsIGFzIHdlIGRpZmYgKnRoYXQqLCBub3QgYWdhaW5zdCB0aGVcblx0XHQvLyBET00gZGlyZWN0bHkgKHdpdGggYSBmZXcgZXhjZXB0aW9ucyBpbiBgc2V0QXR0cmApLiBBbmQsIG9mIGNvdXJzZSwgd2Vcblx0XHQvLyBuZWVkIHRvIHNhdmUgdGhlIGNoaWxkcmVuIGFuZCB0ZXh0IGFzIHRoZXkgYXJlIGNvbmNlcHR1YWxseSBub3Rcblx0XHQvLyB1bmxpa2Ugc3BlY2lhbCBcImF0dHJpYnV0ZXNcIiBpbnRlcm5hbGx5LlxuXHRcdHZub2RlLmF0dHJzID0gb2xkLmF0dHJzXG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBvbGQuY2hpbGRyZW5cblx0XHR2bm9kZS50ZXh0ID0gb2xkLnRleHRcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cblx0dmFyIGN1cnJlbnRET01cblxuXHRyZXR1cm4gZnVuY3Rpb24oZG9tLCB2bm9kZXMsIHJlZHJhdykge1xuXHRcdGlmICghZG9tKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRE9NIGVsZW1lbnQgYmVpbmcgcmVuZGVyZWQgdG8gZG9lcyBub3QgZXhpc3QuXCIpXG5cdFx0aWYgKGN1cnJlbnRET00gIT0gbnVsbCAmJiBkb20uY29udGFpbnMoY3VycmVudERPTSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJOb2RlIGlzIGN1cnJlbnRseSBiZWluZyByZW5kZXJlZCB0byBhbmQgdGh1cyBpcyBsb2NrZWQuXCIpXG5cdFx0fVxuXHRcdHZhciBwcmV2UmVkcmF3ID0gY3VycmVudFJlZHJhd1xuXHRcdHZhciBwcmV2RE9NID0gY3VycmVudERPTVxuXHRcdHZhciBob29rcyA9IFtdXG5cdFx0dmFyIGFjdGl2ZSA9IGFjdGl2ZUVsZW1lbnQoKVxuXHRcdHZhciBuYW1lc3BhY2UgPSBkb20ubmFtZXNwYWNlVVJJXG5cblx0XHRjdXJyZW50RE9NID0gZG9tXG5cdFx0Y3VycmVudFJlZHJhdyA9IHR5cGVvZiByZWRyYXcgPT09IFwiZnVuY3Rpb25cIiA/IHJlZHJhdyA6IHVuZGVmaW5lZFxuXHRcdHRyeSB7XG5cdFx0XHQvLyBGaXJzdCB0aW1lIHJlbmRlcmluZyBpbnRvIGEgbm9kZSBjbGVhcnMgaXQgb3V0XG5cdFx0XHRpZiAoZG9tLnZub2RlcyA9PSBudWxsKSBkb20udGV4dENvbnRlbnQgPSBcIlwiXG5cdFx0XHR2bm9kZXMgPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihBcnJheS5pc0FycmF5KHZub2RlcykgPyB2bm9kZXMgOiBbdm5vZGVzXSlcblx0XHRcdHVwZGF0ZU5vZGVzKGRvbSwgZG9tLnZub2Rlcywgdm5vZGVzLCBob29rcywgbnVsbCwgbmFtZXNwYWNlID09PSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiA/IHVuZGVmaW5lZCA6IG5hbWVzcGFjZSlcblx0XHRcdGRvbS52bm9kZXMgPSB2bm9kZXNcblx0XHRcdC8vIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBjYW4gcmV0dXJuIG51bGw6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2ludGVyYWN0aW9uLmh0bWwjZG9tLWRvY3VtZW50LWFjdGl2ZWVsZW1lbnRcblx0XHRcdGlmIChhY3RpdmUgIT0gbnVsbCAmJiBhY3RpdmVFbGVtZW50KCkgIT09IGFjdGl2ZSAmJiB0eXBlb2YgYWN0aXZlLmZvY3VzID09PSBcImZ1bmN0aW9uXCIpIGFjdGl2ZS5mb2N1cygpXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSBob29rc1tpXSgpXG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGN1cnJlbnRSZWRyYXcgPSBwcmV2UmVkcmF3XG5cdFx0XHRjdXJyZW50RE9NID0gcHJldkRPTVxuXHRcdH1cblx0fVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcmVuZGVyL3JlbmRlclwiKSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbClcbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmVuZGVyLCBzY2hlZHVsZSwgY29uc29sZSkge1xuXHR2YXIgc3Vic2NyaXB0aW9ucyA9IFtdXG5cdHZhciBwZW5kaW5nID0gZmFsc2Vcblx0dmFyIG9mZnNldCA9IC0xXG5cblx0ZnVuY3Rpb24gc3luYygpIHtcblx0XHRmb3IgKG9mZnNldCA9IDA7IG9mZnNldCA8IHN1YnNjcmlwdGlvbnMubGVuZ3RoOyBvZmZzZXQgKz0gMikge1xuXHRcdFx0dHJ5IHsgcmVuZGVyKHN1YnNjcmlwdGlvbnNbb2Zmc2V0XSwgVm5vZGUoc3Vic2NyaXB0aW9uc1tvZmZzZXQgKyAxXSksIHJlZHJhdykgfVxuXHRcdFx0Y2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKSB9XG5cdFx0fVxuXHRcdG9mZnNldCA9IC0xXG5cdH1cblxuXHRmdW5jdGlvbiByZWRyYXcoKSB7XG5cdFx0aWYgKCFwZW5kaW5nKSB7XG5cdFx0XHRwZW5kaW5nID0gdHJ1ZVxuXHRcdFx0c2NoZWR1bGUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHBlbmRpbmcgPSBmYWxzZVxuXHRcdFx0XHRzeW5jKClcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmVkcmF3LnN5bmMgPSBzeW5jXG5cblx0ZnVuY3Rpb24gbW91bnQocm9vdCwgY29tcG9uZW50KSB7XG5cdFx0aWYgKGNvbXBvbmVudCAhPSBudWxsICYmIGNvbXBvbmVudC52aWV3ID09IG51bGwgJiYgdHlwZW9mIGNvbXBvbmVudCAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwibS5tb3VudCBleHBlY3RzIGEgY29tcG9uZW50LCBub3QgYSB2bm9kZS5cIilcblx0XHR9XG5cblx0XHR2YXIgaW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yocm9vdClcblx0XHRpZiAoaW5kZXggPj0gMCkge1xuXHRcdFx0c3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDIpXG5cdFx0XHRpZiAoaW5kZXggPD0gb2Zmc2V0KSBvZmZzZXQgLT0gMlxuXHRcdFx0cmVuZGVyKHJvb3QsIFtdKVxuXHRcdH1cblxuXHRcdGlmIChjb21wb25lbnQgIT0gbnVsbCkge1xuXHRcdFx0c3Vic2NyaXB0aW9ucy5wdXNoKHJvb3QsIGNvbXBvbmVudClcblx0XHRcdHJlbmRlcihyb290LCBWbm9kZShjb21wb25lbnQpLCByZWRyYXcpXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHttb3VudDogbW91bnQsIHJlZHJhdzogcmVkcmF3fVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciByZW5kZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJcIilcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9hcGkvbW91bnQtcmVkcmF3XCIpKHJlbmRlciwgdHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gXCJ1bmRlZmluZWRcIiA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSA6IG51bGwsIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiID8gY29uc29sZSA6IG51bGwpXG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QpIHtcblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSByZXR1cm4gXCJcIlxuXG5cdHZhciBhcmdzID0gW11cblx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuXHRcdGRlc3RydWN0dXJlKGtleSwgb2JqZWN0W2tleV0pXG5cdH1cblxuXHRyZXR1cm4gYXJncy5qb2luKFwiJlwiKVxuXG5cdGZ1bmN0aW9uIGRlc3RydWN0dXJlKGtleSwgdmFsdWUpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ZGVzdHJ1Y3R1cmUoa2V5ICsgXCJbXCIgKyBpICsgXCJdXCIsIHZhbHVlW2ldKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG5cdFx0XHRmb3IgKHZhciBpIGluIHZhbHVlKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleSArIFwiW1wiICsgaSArIFwiXVwiLCB2YWx1ZVtpXSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBhcmdzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIiA/IFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IFwiXCIpKVxuXHR9XG59XG4iLCAiLy8gVGhpcyBleGlzdHMgc28gSSdtIG9ubHkgc2F2aW5nIGl0IG9uY2UuXG5cInVzZSBzdHJpY3RcIlxuXG52YXIgaGFzT3duID0gcmVxdWlyZShcIi4vaGFzT3duXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSkge1xuXHRmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG5cdFx0aWYgKGhhc093bi5jYWxsKHNvdXJjZSwga2V5KSkgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuXHR9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJ1aWxkUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi4vcXVlcnlzdHJpbmcvYnVpbGRcIilcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwiLi4vdXRpbC9hc3NpZ25cIilcblxuLy8gUmV0dXJucyBgcGF0aGAgZnJvbSBgdGVtcGxhdGVgICsgYHBhcmFtc2Bcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGVtcGxhdGUsIHBhcmFtcykge1xuXHRpZiAoKC86KFteXFwvXFwuLV0rKShcXC57M30pPzovKS50ZXN0KHRlbXBsYXRlKSkge1xuXHRcdHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRlbXBsYXRlIHBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCBieSBlaXRoZXIgYSAnLycsICctJywgb3IgJy4nLlwiKVxuXHR9XG5cdGlmIChwYXJhbXMgPT0gbnVsbCkgcmV0dXJuIHRlbXBsYXRlXG5cdHZhciBxdWVyeUluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihcIj9cIilcblx0dmFyIGhhc2hJbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoXCIjXCIpXG5cdHZhciBxdWVyeUVuZCA9IGhhc2hJbmRleCA8IDAgPyB0ZW1wbGF0ZS5sZW5ndGggOiBoYXNoSW5kZXhcblx0dmFyIHBhdGhFbmQgPSBxdWVyeUluZGV4IDwgMCA/IHF1ZXJ5RW5kIDogcXVlcnlJbmRleFxuXHR2YXIgcGF0aCA9IHRlbXBsYXRlLnNsaWNlKDAsIHBhdGhFbmQpXG5cdHZhciBxdWVyeSA9IHt9XG5cblx0YXNzaWduKHF1ZXJ5LCBwYXJhbXMpXG5cblx0dmFyIHJlc29sdmVkID0gcGF0aC5yZXBsYWNlKC86KFteXFwvXFwuLV0rKShcXC57M30pPy9nLCBmdW5jdGlvbihtLCBrZXksIHZhcmlhZGljKSB7XG5cdFx0ZGVsZXRlIHF1ZXJ5W2tleV1cblx0XHQvLyBJZiBubyBzdWNoIHBhcmFtZXRlciBleGlzdHMsIGRvbid0IGludGVycG9sYXRlIGl0LlxuXHRcdGlmIChwYXJhbXNba2V5XSA9PSBudWxsKSByZXR1cm4gbVxuXHRcdC8vIEVzY2FwZSBub3JtYWwgcGFyYW1ldGVycywgYnV0IG5vdCB2YXJpYWRpYyBvbmVzLlxuXHRcdHJldHVybiB2YXJpYWRpYyA/IHBhcmFtc1trZXldIDogZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhwYXJhbXNba2V5XSkpXG5cdH0pXG5cblx0Ly8gSW4gY2FzZSB0aGUgdGVtcGxhdGUgc3Vic3RpdHV0aW9uIGFkZHMgbmV3IHF1ZXJ5L2hhc2ggcGFyYW1ldGVycy5cblx0dmFyIG5ld1F1ZXJ5SW5kZXggPSByZXNvbHZlZC5pbmRleE9mKFwiP1wiKVxuXHR2YXIgbmV3SGFzaEluZGV4ID0gcmVzb2x2ZWQuaW5kZXhPZihcIiNcIilcblx0dmFyIG5ld1F1ZXJ5RW5kID0gbmV3SGFzaEluZGV4IDwgMCA/IHJlc29sdmVkLmxlbmd0aCA6IG5ld0hhc2hJbmRleFxuXHR2YXIgbmV3UGF0aEVuZCA9IG5ld1F1ZXJ5SW5kZXggPCAwID8gbmV3UXVlcnlFbmQgOiBuZXdRdWVyeUluZGV4XG5cdHZhciByZXN1bHQgPSByZXNvbHZlZC5zbGljZSgwLCBuZXdQYXRoRW5kKVxuXG5cdGlmIChxdWVyeUluZGV4ID49IDApIHJlc3VsdCArPSB0ZW1wbGF0ZS5zbGljZShxdWVyeUluZGV4LCBxdWVyeUVuZClcblx0aWYgKG5ld1F1ZXJ5SW5kZXggPj0gMCkgcmVzdWx0ICs9IChxdWVyeUluZGV4IDwgMCA/IFwiP1wiIDogXCImXCIpICsgcmVzb2x2ZWQuc2xpY2UobmV3UXVlcnlJbmRleCwgbmV3UXVlcnlFbmQpXG5cdHZhciBxdWVyeXN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocXVlcnkpXG5cdGlmIChxdWVyeXN0cmluZykgcmVzdWx0ICs9IChxdWVyeUluZGV4IDwgMCAmJiBuZXdRdWVyeUluZGV4IDwgMCA/IFwiP1wiIDogXCImXCIpICsgcXVlcnlzdHJpbmdcblx0aWYgKGhhc2hJbmRleCA+PSAwKSByZXN1bHQgKz0gdGVtcGxhdGUuc2xpY2UoaGFzaEluZGV4KVxuXHRpZiAobmV3SGFzaEluZGV4ID49IDApIHJlc3VsdCArPSAoaGFzaEluZGV4IDwgMCA/IFwiXCIgOiBcIiZcIikgKyByZXNvbHZlZC5zbGljZShuZXdIYXNoSW5kZXgpXG5cdHJldHVybiByZXN1bHRcbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgYnVpbGRQYXRobmFtZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9idWlsZFwiKVxudmFyIGhhc093biA9IHJlcXVpcmUoXCIuLi91dGlsL2hhc093blwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCR3aW5kb3csIFByb21pc2UsIG9uY29tcGxldGlvbikge1xuXHR2YXIgY2FsbGJhY2tDb3VudCA9IDBcblxuXHRmdW5jdGlvbiBQcm9taXNlUHJveHkoZXhlY3V0b3IpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZXhlY3V0b3IpXG5cdH1cblxuXHQvLyBJbiBjYXNlIHRoZSBnbG9iYWwgUHJvbWlzZSBpcyBzb21lIHVzZXJsYW5kIGxpYnJhcnkncyB3aGVyZSB0aGV5IHJlbHkgb25cblx0Ly8gYGZvbyBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3JgLCBgdGhpcy5jb25zdHJ1Y3Rvci5yZXNvbHZlKHZhbHVlKWAsIG9yXG5cdC8vIHNpbWlsYXIuIExldCdzICpub3QqIGJyZWFrIHRoZW0uXG5cdFByb21pc2VQcm94eS5wcm90b3R5cGUgPSBQcm9taXNlLnByb3RvdHlwZVxuXHRQcm9taXNlUHJveHkuX19wcm90b19fID0gUHJvbWlzZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cblx0ZnVuY3Rpb24gbWFrZVJlcXVlc3QoZmFjdG9yeSkge1xuXHRcdHJldHVybiBmdW5jdGlvbih1cmwsIGFyZ3MpIHtcblx0XHRcdGlmICh0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiKSB7IGFyZ3MgPSB1cmw7IHVybCA9IHVybC51cmwgfVxuXHRcdFx0ZWxzZSBpZiAoYXJncyA9PSBudWxsKSBhcmdzID0ge31cblx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRcdGZhY3RvcnkoYnVpbGRQYXRobmFtZSh1cmwsIGFyZ3MucGFyYW1zKSwgYXJncywgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGFyZ3MudHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRhW2ldID0gbmV3IGFyZ3MudHlwZShkYXRhW2ldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGRhdGEgPSBuZXcgYXJncy50eXBlKGRhdGEpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSlcblx0XHRcdFx0fSwgcmVqZWN0KVxuXHRcdFx0fSlcblx0XHRcdGlmIChhcmdzLmJhY2tncm91bmQgPT09IHRydWUpIHJldHVybiBwcm9taXNlXG5cdFx0XHR2YXIgY291bnQgPSAwXG5cdFx0XHRmdW5jdGlvbiBjb21wbGV0ZSgpIHtcblx0XHRcdFx0aWYgKC0tY291bnQgPT09IDAgJiYgdHlwZW9mIG9uY29tcGxldGlvbiA9PT0gXCJmdW5jdGlvblwiKSBvbmNvbXBsZXRpb24oKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gd3JhcChwcm9taXNlKVxuXG5cdFx0XHRmdW5jdGlvbiB3cmFwKHByb21pc2UpIHtcblx0XHRcdFx0dmFyIHRoZW4gPSBwcm9taXNlLnRoZW5cblx0XHRcdFx0Ly8gU2V0IHRoZSBjb25zdHJ1Y3Rvciwgc28gZW5naW5lcyBrbm93IHRvIG5vdCBhd2FpdCBvciByZXNvbHZlXG5cdFx0XHRcdC8vIHRoaXMgYXMgYSBuYXRpdmUgcHJvbWlzZS4gQXQgdGhlIHRpbWUgb2Ygd3JpdGluZywgdGhpcyBpc1xuXHRcdFx0XHQvLyBvbmx5IG5lY2Vzc2FyeSBmb3IgVjgsIGJ1dCB0aGVpciBiZWhhdmlvciBpcyB0aGUgY29ycmVjdFxuXHRcdFx0XHQvLyBiZWhhdmlvciBwZXIgc3BlYy4gU2VlIHRoaXMgc3BlYyBpc3N1ZSBmb3IgbW9yZSBkZXRhaWxzOlxuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9lY21hMjYyL2lzc3Vlcy8xNTc3LiBBbHNvLCBzZWUgdGhlXG5cdFx0XHRcdC8vIGNvcnJlc3BvbmRpbmcgY29tbWVudCBpbiBgcmVxdWVzdC90ZXN0cy90ZXN0LXJlcXVlc3QuanNgIGZvclxuXHRcdFx0XHQvLyBhIGJpdCBtb3JlIGJhY2tncm91bmQgb24gdGhlIGlzc3VlIGF0IGhhbmQuXG5cdFx0XHRcdHByb21pc2UuY29uc3RydWN0b3IgPSBQcm9taXNlUHJveHlcblx0XHRcdFx0cHJvbWlzZS50aGVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y291bnQrK1xuXHRcdFx0XHRcdHZhciBuZXh0ID0gdGhlbi5hcHBseShwcm9taXNlLCBhcmd1bWVudHMpXG5cdFx0XHRcdFx0bmV4dC50aGVuKGNvbXBsZXRlLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRjb21wbGV0ZSgpXG5cdFx0XHRcdFx0XHRpZiAoY291bnQgPT09IDApIHRocm93IGVcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHJldHVybiB3cmFwKG5leHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHByb21pc2Vcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoYXNIZWFkZXIoYXJncywgbmFtZSkge1xuXHRcdGZvciAodmFyIGtleSBpbiBhcmdzLmhlYWRlcnMpIHtcblx0XHRcdGlmIChoYXNPd24uY2FsbChhcmdzLmhlYWRlcnMsIGtleSkgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09IG5hbWUpIHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZXF1ZXN0OiBtYWtlUmVxdWVzdChmdW5jdGlvbih1cmwsIGFyZ3MsIHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIG1ldGhvZCA9IGFyZ3MubWV0aG9kICE9IG51bGwgPyBhcmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpIDogXCJHRVRcIlxuXHRcdFx0dmFyIGJvZHkgPSBhcmdzLmJvZHlcblx0XHRcdHZhciBhc3N1bWVKU09OID0gKGFyZ3Muc2VyaWFsaXplID09IG51bGwgfHwgYXJncy5zZXJpYWxpemUgPT09IEpTT04uc2VyaWFsaXplKSAmJiAhKGJvZHkgaW5zdGFuY2VvZiAkd2luZG93LkZvcm1EYXRhIHx8IGJvZHkgaW5zdGFuY2VvZiAkd2luZG93LlVSTFNlYXJjaFBhcmFtcylcblx0XHRcdHZhciByZXNwb25zZVR5cGUgPSBhcmdzLnJlc3BvbnNlVHlwZSB8fCAodHlwZW9mIGFyZ3MuZXh0cmFjdCA9PT0gXCJmdW5jdGlvblwiID8gXCJcIiA6IFwianNvblwiKVxuXG5cdFx0XHR2YXIgeGhyID0gbmV3ICR3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKSwgYWJvcnRlZCA9IGZhbHNlLCBpc1RpbWVvdXQgPSBmYWxzZVxuXHRcdFx0dmFyIG9yaWdpbmFsID0geGhyLCByZXBsYWNlZEFib3J0XG5cdFx0XHR2YXIgYWJvcnQgPSB4aHIuYWJvcnRcblxuXHRcdFx0eGhyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFib3J0ZWQgPSB0cnVlXG5cdFx0XHRcdGFib3J0LmNhbGwodGhpcylcblx0XHRcdH1cblxuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIGFyZ3MuYXN5bmMgIT09IGZhbHNlLCB0eXBlb2YgYXJncy51c2VyID09PSBcInN0cmluZ1wiID8gYXJncy51c2VyIDogdW5kZWZpbmVkLCB0eXBlb2YgYXJncy5wYXNzd29yZCA9PT0gXCJzdHJpbmdcIiA/IGFyZ3MucGFzc3dvcmQgOiB1bmRlZmluZWQpXG5cblx0XHRcdGlmIChhc3N1bWVKU09OICYmIGJvZHkgIT0gbnVsbCAmJiAhaGFzSGVhZGVyKGFyZ3MsIFwiY29udGVudC10eXBlXCIpKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzLmRlc2VyaWFsaXplICE9PSBcImZ1bmN0aW9uXCIgJiYgIWhhc0hlYWRlcihhcmdzLCBcImFjY2VwdFwiKSkge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvKlwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3Mud2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gYXJncy53aXRoQ3JlZGVudGlhbHNcblx0XHRcdGlmIChhcmdzLnRpbWVvdXQpIHhoci50aW1lb3V0ID0gYXJncy50aW1lb3V0XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlXG5cblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmdzLmhlYWRlcnMpIHtcblx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZ3MuaGVhZGVycywga2V5KSkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgYXJncy5oZWFkZXJzW2tleV0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRcdC8vIERvbid0IHRocm93IGVycm9ycyBvbiB4aHIuYWJvcnQoKS5cblx0XHRcdFx0aWYgKGFib3J0ZWQpIHJldHVyblxuXG5cdFx0XHRcdGlmIChldi50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNCkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IChldi50YXJnZXQuc3RhdHVzID49IDIwMCAmJiBldi50YXJnZXQuc3RhdHVzIDwgMzAwKSB8fCBldi50YXJnZXQuc3RhdHVzID09PSAzMDQgfHwgKC9eZmlsZTpcXC9cXC8vaSkudGVzdCh1cmwpXG5cdFx0XHRcdFx0XHQvLyBXaGVuIHRoZSByZXNwb25zZSB0eXBlIGlzbid0IFwiXCIgb3IgXCJ0ZXh0XCIsXG5cdFx0XHRcdFx0XHQvLyBgeGhyLnJlc3BvbnNlVGV4dGAgaXMgdGhlIHdyb25nIHRoaW5nIHRvIHVzZS5cblx0XHRcdFx0XHRcdC8vIEJyb3dzZXJzIGRvIHRoZSByaWdodCB0aGluZyBhbmQgdGhyb3cgaGVyZSwgYW5kIHdlXG5cdFx0XHRcdFx0XHQvLyBzaG91bGQgaG9ub3IgdGhhdCBhbmQgZG8gdGhlIHJpZ2h0IHRoaW5nIGJ5XG5cdFx0XHRcdFx0XHQvLyBwcmVmZXJyaW5nIGB4aHIucmVzcG9uc2VgIHdoZXJlIHBvc3NpYmxlL3ByYWN0aWNhbC5cblx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IGV2LnRhcmdldC5yZXNwb25zZSwgbWVzc2FnZVxuXG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2VUeXBlID09PSBcImpzb25cIikge1xuXHRcdFx0XHRcdFx0XHQvLyBGb3IgSUUgYW5kIEVkZ2UsIHdoaWNoIGRvbid0IGltcGxlbWVudFxuXHRcdFx0XHRcdFx0XHQvLyBgcmVzcG9uc2VUeXBlOiBcImpzb25cImAuXG5cdFx0XHRcdFx0XHRcdGlmICghZXYudGFyZ2V0LnJlc3BvbnNlVHlwZSAmJiB0eXBlb2YgYXJncy5leHRyYWN0ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgbm8tY29udGVudCB3aGljaCB3aWxsIG5vdCBwYXJzZS5cblx0XHRcdFx0XHRcdFx0XHR0cnkgeyByZXNwb25zZSA9IEpTT04ucGFyc2UoZXYudGFyZ2V0LnJlc3BvbnNlVGV4dCkgfVxuXHRcdFx0XHRcdFx0XHRcdGNhdGNoIChlKSB7IHJlc3BvbnNlID0gbnVsbCB9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09IFwidGV4dFwiKSB7XG5cdFx0XHRcdFx0XHRcdC8vIE9ubHkgdXNlIHRoaXMgZGVmYXVsdCBpZiBpdCdzIHRleHQuIElmIGEgcGFyc2VkXG5cdFx0XHRcdFx0XHRcdC8vIGRvY3VtZW50IGlzIG5lZWRlZCBvbiBvbGQgSUUgYW5kIGZyaWVuZHMgKGFsbFxuXHRcdFx0XHRcdFx0XHQvLyB1bnN1cHBvcnRlZCksIHRoZSB1c2VyIHNob3VsZCB1c2UgYSBjdXN0b21cblx0XHRcdFx0XHRcdFx0Ly8gYGNvbmZpZ2AgaW5zdGVhZC4gVGhleSdyZSBhbHJlYWR5IHVzaW5nIHRoaXMgYXRcblx0XHRcdFx0XHRcdFx0Ly8gdGhlaXIgb3duIHJpc2suXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSA9PSBudWxsKSByZXNwb25zZSA9IGV2LnRhcmdldC5yZXNwb25zZVRleHRcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLmV4dHJhY3QgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGFyZ3MuZXh0cmFjdChldi50YXJnZXQsIGFyZ3MpXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3MgPSB0cnVlXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRlc2VyaWFsaXplID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBhcmdzLmRlc2VyaWFsaXplKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHN1Y2Nlc3MpIHJlc29sdmUocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dmFyIGNvbXBsZXRlRXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRyeSB7IG1lc3NhZ2UgPSBldi50YXJnZXQucmVzcG9uc2VUZXh0IH1cblx0XHRcdFx0XHRcdFx0XHRjYXRjaCAoZSkgeyBtZXNzYWdlID0gcmVzcG9uc2UgfVxuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKVxuXHRcdFx0XHRcdFx0XHRcdGVycm9yLmNvZGUgPSBldi50YXJnZXQuc3RhdHVzXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh4aHIuc3RhdHVzID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gVXNlIHNldFRpbWVvdXQgdG8gcHVzaCB0aGlzIGNvZGUgYmxvY2sgb250byB0aGUgZXZlbnQgcXVldWVcblx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGFsbG93cyBgeGhyLm9udGltZW91dGAgdG8gcnVuIGluIHRoZSBjYXNlIHRoYXQgdGhlcmUgaXMgYSB0aW1lb3V0XG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2l0aG91dCB0aGlzIHNldFRpbWVvdXQsIGB4aHIub250aW1lb3V0YCBkb2Vzbid0IGhhdmUgYSBjaGFuY2UgdG8gcmVqZWN0XG5cdFx0XHRcdFx0XHRcdFx0Ly8gYXMgYHhoci5vbnJlYWR5c3RhdGVjaGFuZ2VgIHdpbGwgcnVuIGJlZm9yZSBpdFxuXHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNUaW1lb3V0KSByZXR1cm5cblx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlRXJyb3JSZXNwb25zZSgpXG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGNvbXBsZXRlRXJyb3JSZXNwb25zZSgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0eGhyLm9udGltZW91dCA9IGZ1bmN0aW9uIChldikge1xuXHRcdFx0XHRpc1RpbWVvdXQgPSB0cnVlXG5cdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgdGltZWQgb3V0XCIpXG5cdFx0XHRcdGVycm9yLmNvZGUgPSBldi50YXJnZXQuc3RhdHVzXG5cdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzLmNvbmZpZyA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHhociA9IGFyZ3MuY29uZmlnKHhociwgYXJncywgdXJsKSB8fCB4aHJcblxuXHRcdFx0XHQvLyBQcm9wYWdhdGUgdGhlIGBhYm9ydGAgdG8gYW55IHJlcGxhY2VtZW50IFhIUiBhcyB3ZWxsLlxuXHRcdFx0XHRpZiAoeGhyICE9PSBvcmlnaW5hbCkge1xuXHRcdFx0XHRcdHJlcGxhY2VkQWJvcnQgPSB4aHIuYWJvcnRcblx0XHRcdFx0XHR4aHIuYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGFib3J0ZWQgPSB0cnVlXG5cdFx0XHRcdFx0XHRyZXBsYWNlZEFib3J0LmNhbGwodGhpcylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGJvZHkgPT0gbnVsbCkgeGhyLnNlbmQoKVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3Muc2VyaWFsaXplID09PSBcImZ1bmN0aW9uXCIpIHhoci5zZW5kKGFyZ3Muc2VyaWFsaXplKGJvZHkpKVxuXHRcdFx0ZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mICR3aW5kb3cuRm9ybURhdGEgfHwgYm9keSBpbnN0YW5jZW9mICR3aW5kb3cuVVJMU2VhcmNoUGFyYW1zKSB4aHIuc2VuZChib2R5KVxuXHRcdFx0ZWxzZSB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShib2R5KSlcblx0XHR9KSxcblx0XHRqc29ucDogbWFrZVJlcXVlc3QoZnVuY3Rpb24odXJsLCBhcmdzLCByZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciBjYWxsYmFja05hbWUgPSBhcmdzLmNhbGxiYWNrTmFtZSB8fCBcIl9taXRocmlsX1wiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWUxNikgKyBcIl9cIiArIGNhbGxiYWNrQ291bnQrK1xuXHRcdFx0dmFyIHNjcmlwdCA9ICR3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuXHRcdFx0JHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdFx0fVxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGVsZXRlICR3aW5kb3dbY2FsbGJhY2tOYW1lXVxuXHRcdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJKU09OUCByZXF1ZXN0IGZhaWxlZFwiKSlcblx0XHRcdH1cblx0XHRcdHNjcmlwdC5zcmMgPSB1cmwgKyAodXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCIpICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3MuY2FsbGJhY2tLZXkgfHwgXCJjYWxsYmFja1wiKSArIFwiPVwiICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGNhbGxiYWNrTmFtZSlcblx0XHRcdCR3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdClcblx0XHR9KSxcblx0fVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBQcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wcm9taXNlL3Byb21pc2VcIilcbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3JlcXVlc3QvcmVxdWVzdFwiKSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbCwgUHJvbWlzZVBvbHlmaWxsLCBtb3VudFJlZHJhdy5yZWRyYXcpXG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gZGVjb2RlVVJJQ29tcG9uZW50U2F2ZShzdHIpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcblx0fSBjYXRjaChlcnIpIHtcblx0XHRyZXR1cm4gc3RyXG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHJpbmcpIHtcblx0aWYgKHN0cmluZyA9PT0gXCJcIiB8fCBzdHJpbmcgPT0gbnVsbCkgcmV0dXJuIHt9XG5cdGlmIChzdHJpbmcuY2hhckF0KDApID09PSBcIj9cIikgc3RyaW5nID0gc3RyaW5nLnNsaWNlKDEpXG5cblx0dmFyIGVudHJpZXMgPSBzdHJpbmcuc3BsaXQoXCImXCIpLCBjb3VudGVycyA9IHt9LCBkYXRhID0ge31cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGVudHJ5ID0gZW50cmllc1tpXS5zcGxpdChcIj1cIilcblx0XHR2YXIga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50U2F2ZShlbnRyeVswXSlcblx0XHR2YXIgdmFsdWUgPSBlbnRyeS5sZW5ndGggPT09IDIgPyBkZWNvZGVVUklDb21wb25lbnRTYXZlKGVudHJ5WzFdKSA6IFwiXCJcblxuXHRcdGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIpIHZhbHVlID0gdHJ1ZVxuXHRcdGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHZhbHVlID0gZmFsc2VcblxuXHRcdHZhciBsZXZlbHMgPSBrZXkuc3BsaXQoL1xcXVxcWz98XFxbLylcblx0XHR2YXIgY3Vyc29yID0gZGF0YVxuXHRcdGlmIChrZXkuaW5kZXhPZihcIltcIikgPiAtMSkgbGV2ZWxzLnBvcCgpXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBsZXZlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBsZXZlbCA9IGxldmVsc1tqXSwgbmV4dExldmVsID0gbGV2ZWxzW2ogKyAxXVxuXHRcdFx0dmFyIGlzTnVtYmVyID0gbmV4dExldmVsID09IFwiXCIgfHwgIWlzTmFOKHBhcnNlSW50KG5leHRMZXZlbCwgMTApKVxuXHRcdFx0aWYgKGxldmVsID09PSBcIlwiKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBsZXZlbHMuc2xpY2UoMCwgaikuam9pbigpXG5cdFx0XHRcdGlmIChjb3VudGVyc1trZXldID09IG51bGwpIHtcblx0XHRcdFx0XHRjb3VudGVyc1trZXldID0gQXJyYXkuaXNBcnJheShjdXJzb3IpID8gY3Vyc29yLmxlbmd0aCA6IDBcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXZlbCA9IGNvdW50ZXJzW2tleV0rK1xuXHRcdFx0fVxuXHRcdFx0Ly8gRGlzYWxsb3cgZGlyZWN0IHByb3RvdHlwZSBwb2xsdXRpb25cblx0XHRcdGVsc2UgaWYgKGxldmVsID09PSBcIl9fcHJvdG9fX1wiKSBicmVha1xuXHRcdFx0aWYgKGogPT09IGxldmVscy5sZW5ndGggLSAxKSBjdXJzb3JbbGV2ZWxdID0gdmFsdWVcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvLyBSZWFkIG93biBwcm9wZXJ0aWVzIGV4Y2x1c2l2ZWx5IHRvIGRpc2FsbG93IGluZGlyZWN0XG5cdFx0XHRcdC8vIHByb3RvdHlwZSBwb2xsdXRpb25cblx0XHRcdFx0dmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN1cnNvciwgbGV2ZWwpXG5cdFx0XHRcdGlmIChkZXNjICE9IG51bGwpIGRlc2MgPSBkZXNjLnZhbHVlXG5cdFx0XHRcdGlmIChkZXNjID09IG51bGwpIGN1cnNvcltsZXZlbF0gPSBkZXNjID0gaXNOdW1iZXIgPyBbXSA6IHt9XG5cdFx0XHRcdGN1cnNvciA9IGRlc2Ncblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGFcbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgcGFyc2VRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuLi9xdWVyeXN0cmluZy9wYXJzZVwiKVxuXG4vLyBSZXR1cm5zIGB7cGF0aCwgcGFyYW1zfWAgZnJvbSBgdXJsYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwpIHtcblx0dmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZihcIj9cIilcblx0dmFyIGhhc2hJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKVxuXHR2YXIgcXVlcnlFbmQgPSBoYXNoSW5kZXggPCAwID8gdXJsLmxlbmd0aCA6IGhhc2hJbmRleFxuXHR2YXIgcGF0aEVuZCA9IHF1ZXJ5SW5kZXggPCAwID8gcXVlcnlFbmQgOiBxdWVyeUluZGV4XG5cdHZhciBwYXRoID0gdXJsLnNsaWNlKDAsIHBhdGhFbmQpLnJlcGxhY2UoL1xcL3syLH0vZywgXCIvXCIpXG5cblx0aWYgKCFwYXRoKSBwYXRoID0gXCIvXCJcblx0ZWxzZSB7XG5cdFx0aWYgKHBhdGhbMF0gIT09IFwiL1wiKSBwYXRoID0gXCIvXCIgKyBwYXRoXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSAmJiBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSBwYXRoID0gcGF0aC5zbGljZSgwLCAtMSlcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHBhdGg6IHBhdGgsXG5cdFx0cGFyYW1zOiBxdWVyeUluZGV4IDwgMFxuXHRcdFx0PyB7fVxuXHRcdFx0OiBwYXJzZVF1ZXJ5U3RyaW5nKHVybC5zbGljZShxdWVyeUluZGV4ICsgMSwgcXVlcnlFbmQpKSxcblx0fVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBwYXJzZVBhdGhuYW1lID0gcmVxdWlyZShcIi4vcGFyc2VcIilcblxuLy8gQ29tcGlsZXMgYSB0ZW1wbGF0ZSBpbnRvIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHJlc29sdmVkIHBhdGggKHdpdGhvdXQgcXVlcnlcbi8vIHN0cmluZ3MpIGFuZCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzIHdpdGggdGhlaXJcbi8vIHBhcnNlZCB2YWx1ZXMuIFRoaXMgZXhwZWN0cyB0aGUgaW5wdXQgb2YgdGhlIGNvbXBpbGVkIHRlbXBsYXRlIHRvIGJlIHRoZVxuLy8gb3V0cHV0IG9mIGBwYXJzZVBhdGhuYW1lYC4gTm90ZSB0aGF0IGl0IGRvZXMgKm5vdCogcmVtb3ZlIHF1ZXJ5IHBhcmFtZXRlcnNcbi8vIHNwZWNpZmllZCBpbiB0aGUgdGVtcGxhdGUuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG5cdHZhciB0ZW1wbGF0ZURhdGEgPSBwYXJzZVBhdGhuYW1lKHRlbXBsYXRlKVxuXHR2YXIgdGVtcGxhdGVLZXlzID0gT2JqZWN0LmtleXModGVtcGxhdGVEYXRhLnBhcmFtcylcblx0dmFyIGtleXMgPSBbXVxuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChcIl5cIiArIHRlbXBsYXRlRGF0YS5wYXRoLnJlcGxhY2UoXG5cdFx0Ly8gSSBlc2NhcGUgbGl0ZXJhbCB0ZXh0IHNvIHBlb3BsZSBjYW4gdXNlIHRoaW5ncyBsaWtlIGA6ZmlsZS46ZXh0YCBvclxuXHRcdC8vIGA6bGFuZy06bG9jYWxlYCBpbiByb3V0ZXMuIFRoaXMgaXMgYWxsIG1lcmdlZCBpbnRvIG9uZSBwYXNzIHNvIElcblx0XHQvLyBkb24ndCBhbHNvIGFjY2lkZW50YWxseSBlc2NhcGUgYC1gIGFuZCBtYWtlIGl0IGhhcmRlciB0byBkZXRlY3QgaXQgdG9cblx0XHQvLyBiYW4gaXQgZnJvbSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzLlxuXHRcdC86KFteXFwvLi1dKykoXFwuezN9fFxcLig/IVxcLil8LSk/fFtcXFxcXiQqKy4oKXxcXFtcXF17fV0vZyxcblx0XHRmdW5jdGlvbihtLCBrZXksIGV4dHJhKSB7XG5cdFx0XHRpZiAoa2V5ID09IG51bGwpIHJldHVybiBcIlxcXFxcIiArIG1cblx0XHRcdGtleXMucHVzaCh7azoga2V5LCByOiBleHRyYSA9PT0gXCIuLi5cIn0pXG5cdFx0XHRpZiAoZXh0cmEgPT09IFwiLi4uXCIpIHJldHVybiBcIiguKilcIlxuXHRcdFx0aWYgKGV4dHJhID09PSBcIi5cIikgcmV0dXJuIFwiKFteL10rKVxcXFwuXCJcblx0XHRcdHJldHVybiBcIihbXi9dKylcIiArIChleHRyYSB8fCBcIlwiKVxuXHRcdH1cblx0KSArIFwiJFwiKVxuXHRyZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuXHRcdC8vIEZpcnN0LCBjaGVjayB0aGUgcGFyYW1zLiBVc3VhbGx5LCB0aGVyZSBpc24ndCBhbnksIGFuZCBpdCdzIGp1c3Rcblx0XHQvLyBjaGVja2luZyBhIHN0YXRpYyBzZXQuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZUtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0ZW1wbGF0ZURhdGEucGFyYW1zW3RlbXBsYXRlS2V5c1tpXV0gIT09IGRhdGEucGFyYW1zW3RlbXBsYXRlS2V5c1tpXV0pIHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHQvLyBJZiBubyBpbnRlcnBvbGF0aW9ucyBleGlzdCwgbGV0J3Mgc2tpcCBhbGwgdGhlIGNlcmVtb255XG5cdFx0aWYgKCFrZXlzLmxlbmd0aCkgcmV0dXJuIHJlZ2V4cC50ZXN0KGRhdGEucGF0aClcblx0XHR2YXIgdmFsdWVzID0gcmVnZXhwLmV4ZWMoZGF0YS5wYXRoKVxuXHRcdGlmICh2YWx1ZXMgPT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRkYXRhLnBhcmFtc1trZXlzW2ldLmtdID0ga2V5c1tpXS5yID8gdmFsdWVzW2kgKyAxXSA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbaSArIDFdKVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxuLy8gTm90ZTogdGhpcyBpcyBtaWxkbHkgcGVyZi1zZW5zaXRpdmUuXG4vL1xuLy8gSXQgZG9lcyAqbm90KiB1c2UgYGRlbGV0ZWAgLSBkeW5hbWljIGBkZWxldGVgcyB1c3VhbGx5IGNhdXNlIG9iamVjdHMgdG8gYmFpbFxuLy8gb3V0IGludG8gZGljdGlvbmFyeSBtb2RlIGFuZCBqdXN0IGdlbmVyYWxseSBjYXVzZSBhIGJ1bmNoIG9mIG9wdGltaXphdGlvblxuLy8gaXNzdWVzIHdpdGhpbiBlbmdpbmVzLlxuLy9cbi8vIElkZWFsbHksIEkgd291bGQndmUgcHJlZmVycmVkIHRvIGRvIHRoaXMsIGlmIGl0IHdlcmVuJ3QgZm9yIHRoZSBvcHRpbWl6YXRpb25cbi8vIGlzc3Vlczpcbi8vXG4vLyBgYGBqc1xuLy8gY29uc3QgaGFzT3duID0gcmVxdWlyZShcIi4vaGFzT3duXCIpXG4vLyBjb25zdCBtYWdpYyA9IFtcbi8vICAgICBcImtleVwiLCBcIm9uaW5pdFwiLCBcIm9uY3JlYXRlXCIsIFwib25iZWZvcmV1cGRhdGVcIiwgXCJvbnVwZGF0ZVwiLFxuLy8gICAgIFwib25iZWZvcmVyZW1vdmVcIiwgXCJvbnJlbW92ZVwiLFxuLy8gXVxuLy8gbW9kdWxlLmV4cG9ydHMgPSAoYXR0cnMsIGV4dHJhcykgPT4ge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgYXR0cnMpXG4vLyAgICAgZm9yIChjb25zdCBrZXkgb2YgbWFnaWMpIGRlbGV0ZSByZXN1bHRba2V5XVxuLy8gICAgIGlmIChleHRyYXMgIT0gbnVsbCkgZm9yIChjb25zdCBrZXkgb2YgZXh0cmFzKSBkZWxldGUgcmVzdWx0W2tleV1cbi8vICAgICByZXR1cm4gcmVzdWx0XG4vLyB9XG4vLyBgYGBcblxudmFyIGhhc093biA9IHJlcXVpcmUoXCIuL2hhc093blwiKVxuLy8gV29yZHMgaW4gUmVnRXhwIGxpdGVyYWxzIGFyZSBzb21ldGltZXMgbWFuZ2xlZCBpbmNvcnJlY3RseSBieSB0aGUgaW50ZXJuYWwgYnVuZGxlciwgc28gdXNlIFJlZ0V4cCgpLlxudmFyIG1hZ2ljID0gbmV3IFJlZ0V4cChcIl4oPzprZXl8b25pbml0fG9uY3JlYXRlfG9uYmVmb3JldXBkYXRlfG9udXBkYXRlfG9uYmVmb3JlcmVtb3ZlfG9ucmVtb3ZlKSRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhdHRycywgZXh0cmFzKSB7XG5cdHZhciByZXN1bHQgPSB7fVxuXG5cdGlmIChleHRyYXMgIT0gbnVsbCkge1xuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpICYmICFtYWdpYy50ZXN0KGtleSkgJiYgZXh0cmFzLmluZGV4T2Yoa2V5KSA8IDApIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSBhdHRyc1trZXldXG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpICYmICFtYWdpYy50ZXN0KGtleSkpIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSBhdHRyc1trZXldXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdFxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcbnZhciBtID0gcmVxdWlyZShcIi4uL3JlbmRlci9oeXBlcnNjcmlwdFwiKVxudmFyIFByb21pc2UgPSByZXF1aXJlKFwiLi4vcHJvbWlzZS9wcm9taXNlXCIpXG5cbnZhciBidWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2J1aWxkXCIpXG52YXIgcGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9wYXJzZVwiKVxudmFyIGNvbXBpbGVUZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9jb21waWxlVGVtcGxhdGVcIilcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwiLi4vdXRpbC9hc3NpZ25cIilcbnZhciBjZW5zb3IgPSByZXF1aXJlKFwiLi4vdXRpbC9jZW5zb3JcIilcblxudmFyIHNlbnRpbmVsID0ge31cblxuZnVuY3Rpb24gZGVjb2RlVVJJQ29tcG9uZW50U2F2ZShjb21wb25lbnQpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudClcblx0fSBjYXRjaChlKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudFxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdywgbW91bnRSZWRyYXcpIHtcblx0dmFyIGNhbGxBc3luYyA9ICR3aW5kb3cgPT0gbnVsbFxuXHRcdC8vIEluIGNhc2UgTWl0aHJpbC5qcycgbG9hZGVkIGdsb2JhbGx5IHdpdGhvdXQgdGhlIERPTSwgbGV0J3Mgbm90IGJyZWFrXG5cdFx0PyBudWxsXG5cdFx0OiB0eXBlb2YgJHdpbmRvdy5zZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/ICR3aW5kb3cuc2V0SW1tZWRpYXRlIDogJHdpbmRvdy5zZXRUaW1lb3V0XG5cdHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKClcblxuXHR2YXIgc2NoZWR1bGVkID0gZmFsc2VcblxuXHQvLyBzdGF0ZSA9PT0gMDogaW5pdFxuXHQvLyBzdGF0ZSA9PT0gMTogc2NoZWR1bGVkXG5cdC8vIHN0YXRlID09PSAyOiBkb25lXG5cdHZhciByZWFkeSA9IGZhbHNlXG5cdHZhciBzdGF0ZSA9IDBcblxuXHR2YXIgY29tcGlsZWQsIGZhbGxiYWNrUm91dGVcblxuXHR2YXIgY3VycmVudFJlc29sdmVyID0gc2VudGluZWwsIGNvbXBvbmVudCwgYXR0cnMsIGN1cnJlbnRQYXRoLCBsYXN0VXBkYXRlXG5cblx0dmFyIFJvdXRlclJvb3QgPSB7XG5cdFx0b25iZWZvcmV1cGRhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0c3RhdGUgPSBzdGF0ZSA/IDIgOiAxXG5cdFx0XHRyZXR1cm4gISghc3RhdGUgfHwgc2VudGluZWwgPT09IGN1cnJlbnRSZXNvbHZlcilcblx0XHR9LFxuXHRcdG9ucmVtb3ZlOiBmdW5jdGlvbigpIHtcblx0XHRcdCR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZpcmVBc3luYywgZmFsc2UpXG5cdFx0XHQkd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIHJlc29sdmVSb3V0ZSwgZmFsc2UpXG5cdFx0fSxcblx0XHR2aWV3OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghc3RhdGUgfHwgc2VudGluZWwgPT09IGN1cnJlbnRSZXNvbHZlcikgcmV0dXJuXG5cdFx0XHQvLyBXcmFwIGluIGEgZnJhZ21lbnQgdG8gcHJlc2VydmUgZXhpc3Rpbmcga2V5IHNlbWFudGljc1xuXHRcdFx0dmFyIHZub2RlID0gW1Zub2RlKGNvbXBvbmVudCwgYXR0cnMua2V5LCBhdHRycyldXG5cdFx0XHRpZiAoY3VycmVudFJlc29sdmVyKSB2bm9kZSA9IGN1cnJlbnRSZXNvbHZlci5yZW5kZXIodm5vZGVbMF0pXG5cdFx0XHRyZXR1cm4gdm5vZGVcblx0XHR9LFxuXHR9XG5cblx0dmFyIFNLSVAgPSByb3V0ZS5TS0lQID0ge31cblxuXHRmdW5jdGlvbiByZXNvbHZlUm91dGUoKSB7XG5cdFx0c2NoZWR1bGVkID0gZmFsc2Vcblx0XHQvLyBDb25zaWRlciB0aGUgcGF0aG5hbWUgaG9saXN0aWNhbGx5LiBUaGUgcHJlZml4IG1pZ2h0IGV2ZW4gYmUgaW52YWxpZCxcblx0XHQvLyBidXQgdGhhdCdzIG5vdCBvdXIgcHJvYmxlbS5cblx0XHR2YXIgcHJlZml4ID0gJHdpbmRvdy5sb2NhdGlvbi5oYXNoXG5cdFx0aWYgKHJvdXRlLnByZWZpeFswXSAhPT0gXCIjXCIpIHtcblx0XHRcdHByZWZpeCA9ICR3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgcHJlZml4XG5cdFx0XHRpZiAocm91dGUucHJlZml4WzBdICE9PSBcIj9cIikge1xuXHRcdFx0XHRwcmVmaXggPSAkd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgcHJlZml4XG5cdFx0XHRcdGlmIChwcmVmaXhbMF0gIT09IFwiL1wiKSBwcmVmaXggPSBcIi9cIiArIHByZWZpeFxuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBUaGlzIHNlZW1pbmdseSB1c2VsZXNzIGAuY29uY2F0KClgIHNwZWVkcyB1cCB0aGUgdGVzdHMgcXVpdGUgYSBiaXQsXG5cdFx0Ly8gc2luY2UgdGhlIHJlcHJlc2VudGF0aW9uIGlzIGNvbnNpc3RlbnRseSBhIHJlbGF0aXZlbHkgcG9vcmx5XG5cdFx0Ly8gb3B0aW1pemVkIGNvbnMgc3RyaW5nLlxuXHRcdHZhciBwYXRoID0gcHJlZml4LmNvbmNhdCgpXG5cdFx0XHQucmVwbGFjZSgvKD86JVthLWY4OV1bYS1mMC05XSkrL2dpbSwgZGVjb2RlVVJJQ29tcG9uZW50U2F2ZSlcblx0XHRcdC5zbGljZShyb3V0ZS5wcmVmaXgubGVuZ3RoKVxuXHRcdHZhciBkYXRhID0gcGFyc2VQYXRobmFtZShwYXRoKVxuXG5cdFx0YXNzaWduKGRhdGEucGFyYW1zLCAkd2luZG93Lmhpc3Rvcnkuc3RhdGUpXG5cblx0XHRmdW5jdGlvbiByZWplY3QoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlKVxuXHRcdFx0c2V0UGF0aChmYWxsYmFja1JvdXRlLCBudWxsLCB7cmVwbGFjZTogdHJ1ZX0pXG5cdFx0fVxuXG5cdFx0bG9vcCgwKVxuXHRcdGZ1bmN0aW9uIGxvb3AoaSkge1xuXHRcdFx0Ly8gc3RhdGUgPT09IDA6IGluaXRcblx0XHRcdC8vIHN0YXRlID09PSAxOiBzY2hlZHVsZWRcblx0XHRcdC8vIHN0YXRlID09PSAyOiBkb25lXG5cdFx0XHRmb3IgKDsgaSA8IGNvbXBpbGVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChjb21waWxlZFtpXS5jaGVjayhkYXRhKSkge1xuXHRcdFx0XHRcdHZhciBwYXlsb2FkID0gY29tcGlsZWRbaV0uY29tcG9uZW50XG5cdFx0XHRcdFx0dmFyIG1hdGNoZWRSb3V0ZSA9IGNvbXBpbGVkW2ldLnJvdXRlXG5cdFx0XHRcdFx0dmFyIGxvY2FsQ29tcCA9IHBheWxvYWRcblx0XHRcdFx0XHR2YXIgdXBkYXRlID0gbGFzdFVwZGF0ZSA9IGZ1bmN0aW9uKGNvbXApIHtcblx0XHRcdFx0XHRcdGlmICh1cGRhdGUgIT09IGxhc3RVcGRhdGUpIHJldHVyblxuXHRcdFx0XHRcdFx0aWYgKGNvbXAgPT09IFNLSVApIHJldHVybiBsb29wKGkgKyAxKVxuXHRcdFx0XHRcdFx0Y29tcG9uZW50ID0gY29tcCAhPSBudWxsICYmICh0eXBlb2YgY29tcC52aWV3ID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIGNvbXAgPT09IFwiZnVuY3Rpb25cIik/IGNvbXAgOiBcImRpdlwiXG5cdFx0XHRcdFx0XHRhdHRycyA9IGRhdGEucGFyYW1zLCBjdXJyZW50UGF0aCA9IHBhdGgsIGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0XHRcdFx0XHRjdXJyZW50UmVzb2x2ZXIgPSBwYXlsb2FkLnJlbmRlciA/IHBheWxvYWQgOiBudWxsXG5cdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT09IDIpIG1vdW50UmVkcmF3LnJlZHJhdygpXG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0c3RhdGUgPSAyXG5cdFx0XHRcdFx0XHRcdG1vdW50UmVkcmF3LnJlZHJhdy5zeW5jKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gVGhlcmUncyBubyB1bmRlcnN0YXRpbmcgaG93IG11Y2ggSSAqd2lzaCogSSBjb3VsZFxuXHRcdFx0XHRcdC8vIHVzZSBgYXN5bmNgL2Bhd2FpdGAgaGVyZS4uLlxuXHRcdFx0XHRcdGlmIChwYXlsb2FkLnZpZXcgfHwgdHlwZW9mIHBheWxvYWQgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0cGF5bG9hZCA9IHt9XG5cdFx0XHRcdFx0XHR1cGRhdGUobG9jYWxDb21wKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChwYXlsb2FkLm9ubWF0Y2gpIHtcblx0XHRcdFx0XHRcdHAudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXlsb2FkLm9ubWF0Y2goZGF0YS5wYXJhbXMsIHBhdGgsIG1hdGNoZWRSb3V0ZSlcblx0XHRcdFx0XHRcdH0pLnRoZW4odXBkYXRlLCBwYXRoID09PSBmYWxsYmFja1JvdXRlID8gbnVsbCA6IHJlamVjdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB1cGRhdGUoXCJkaXZcIilcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocGF0aCA9PT0gZmFsbGJhY2tSb3V0ZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSBkZWZhdWx0IHJvdXRlIFwiICsgZmFsbGJhY2tSb3V0ZSArIFwiLlwiKVxuXHRcdFx0fVxuXHRcdFx0c2V0UGF0aChmYWxsYmFja1JvdXRlLCBudWxsLCB7cmVwbGFjZTogdHJ1ZX0pXG5cdFx0fVxuXHR9XG5cblx0Ly8gU2V0IGl0IHVuY29uZGl0aW9uYWxseSBzbyBgbS5yb3V0ZS5zZXRgIGFuZCBgbS5yb3V0ZS5MaW5rYCBib3RoIHdvcmssXG5cdC8vIGV2ZW4gaWYgbmVpdGhlciBgcHVzaFN0YXRlYCBub3IgYGhhc2hjaGFuZ2VgIGFyZSBzdXBwb3J0ZWQuIEl0J3Ncblx0Ly8gY2xlYXJlZCBpZiBgaGFzaGNoYW5nZWAgaXMgdXNlZCwgc2luY2UgdGhhdCBtYWtlcyBpdCBhdXRvbWF0aWNhbGx5XG5cdC8vIGFzeW5jLlxuXHRmdW5jdGlvbiBmaXJlQXN5bmMoKSB7XG5cdFx0aWYgKCFzY2hlZHVsZWQpIHtcblx0XHRcdHNjaGVkdWxlZCA9IHRydWVcblx0XHRcdC8vIFRPRE86IGp1c3QgZG8gYG1vdW50UmVkcmF3LnJlZHJhdygpYCBoZXJlIGFuZCBlbGlkZSB0aGUgdGltZXJcblx0XHRcdC8vIGRlcGVuZGVuY3kuIE5vdGUgdGhhdCB0aGlzIHdpbGwgbXVjayB3aXRoIHRlc3RzIGEgKmxvdCosIHNvIGl0J3Ncblx0XHRcdC8vIG5vdCBhcyBlYXN5IG9mIGEgY2hhbmdlIGFzIGl0IHNvdW5kcy5cblx0XHRcdGNhbGxBc3luYyhyZXNvbHZlUm91dGUpXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0UGF0aChwYXRoLCBkYXRhLCBvcHRpb25zKSB7XG5cdFx0cGF0aCA9IGJ1aWxkUGF0aG5hbWUocGF0aCwgZGF0YSlcblx0XHRpZiAocmVhZHkpIHtcblx0XHRcdGZpcmVBc3luYygpXG5cdFx0XHR2YXIgc3RhdGUgPSBvcHRpb25zID8gb3B0aW9ucy5zdGF0ZSA6IG51bGxcblx0XHRcdHZhciB0aXRsZSA9IG9wdGlvbnMgPyBvcHRpb25zLnRpdGxlIDogbnVsbFxuXHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXBsYWNlKSAkd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgcm91dGUucHJlZml4ICsgcGF0aClcblx0XHRcdGVsc2UgJHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHJvdXRlLnByZWZpeCArIHBhdGgpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGUucHJlZml4ICsgcGF0aFxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHJvdXRlKHJvb3QsIGRlZmF1bHRSb3V0ZSwgcm91dGVzKSB7XG5cdFx0aWYgKCFyb290KSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRE9NIGVsZW1lbnQgYmVpbmcgcmVuZGVyZWQgdG8gZG9lcyBub3QgZXhpc3QuXCIpXG5cblx0XHRjb21waWxlZCA9IE9iamVjdC5rZXlzKHJvdXRlcykubWFwKGZ1bmN0aW9uKHJvdXRlKSB7XG5cdFx0XHRpZiAocm91dGVbMF0gIT09IFwiL1wiKSB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJSb3V0ZXMgbXVzdCBzdGFydCB3aXRoIGEgJy8nLlwiKVxuXHRcdFx0aWYgKCgvOihbXlxcL1xcLi1dKykoXFwuezN9KT86LykudGVzdChyb3V0ZSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiUm91dGUgcGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggZWl0aGVyICcvJywgJy4nLCBvciAnLScuXCIpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyb3V0ZTogcm91dGUsXG5cdFx0XHRcdGNvbXBvbmVudDogcm91dGVzW3JvdXRlXSxcblx0XHRcdFx0Y2hlY2s6IGNvbXBpbGVUZW1wbGF0ZShyb3V0ZSksXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRmYWxsYmFja1JvdXRlID0gZGVmYXVsdFJvdXRlXG5cdFx0aWYgKGRlZmF1bHRSb3V0ZSAhPSBudWxsKSB7XG5cdFx0XHR2YXIgZGVmYXVsdERhdGEgPSBwYXJzZVBhdGhuYW1lKGRlZmF1bHRSb3V0ZSlcblxuXHRcdFx0aWYgKCFjb21waWxlZC5zb21lKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLmNoZWNrKGRlZmF1bHREYXRhKSB9KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJEZWZhdWx0IHJvdXRlIGRvZXNuJ3QgbWF0Y2ggYW55IGtub3duIHJvdXRlcy5cIilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mICR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0JHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZmlyZUFzeW5jLCBmYWxzZSlcblx0XHR9IGVsc2UgaWYgKHJvdXRlLnByZWZpeFswXSA9PT0gXCIjXCIpIHtcblx0XHRcdCR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgcmVzb2x2ZVJvdXRlLCBmYWxzZSlcblx0XHR9XG5cblx0XHRyZWFkeSA9IHRydWVcblx0XHRtb3VudFJlZHJhdy5tb3VudChyb290LCBSb3V0ZXJSb290KVxuXHRcdHJlc29sdmVSb3V0ZSgpXG5cdH1cblx0cm91dGUuc2V0ID0gZnVuY3Rpb24ocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdGlmIChsYXN0VXBkYXRlICE9IG51bGwpIHtcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cdFx0XHRvcHRpb25zLnJlcGxhY2UgPSB0cnVlXG5cdFx0fVxuXHRcdGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0c2V0UGF0aChwYXRoLCBkYXRhLCBvcHRpb25zKVxuXHR9XG5cdHJvdXRlLmdldCA9IGZ1bmN0aW9uKCkge3JldHVybiBjdXJyZW50UGF0aH1cblx0cm91dGUucHJlZml4ID0gXCIjIVwiXG5cdHJvdXRlLkxpbmsgPSB7XG5cdFx0dmlldzogZnVuY3Rpb24odm5vZGUpIHtcblx0XHRcdC8vIE9taXQgdGhlIHVzZWQgcGFyYW1ldGVycyBmcm9tIHRoZSByZW5kZXJlZCBlbGVtZW50IC0gdGhleSBhcmVcblx0XHRcdC8vIGludGVybmFsLiBBbHNvLCBjZW5zb3IgdGhlIHZhcmlvdXMgbGlmZWN5Y2xlIG1ldGhvZHMuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gV2UgZG9uJ3Qgc3RyaXAgdGhlIG90aGVyIHBhcmFtZXRlcnMgYmVjYXVzZSBmb3IgY29udmVuaWVuY2Ugd2Vcblx0XHRcdC8vIGxldCB0aGVtIGJlIHNwZWNpZmllZCBpbiB0aGUgc2VsZWN0b3IgYXMgd2VsbC5cblx0XHRcdHZhciBjaGlsZCA9IG0oXG5cdFx0XHRcdHZub2RlLmF0dHJzLnNlbGVjdG9yIHx8IFwiYVwiLFxuXHRcdFx0XHRjZW5zb3Iodm5vZGUuYXR0cnMsIFtcIm9wdGlvbnNcIiwgXCJwYXJhbXNcIiwgXCJzZWxlY3RvclwiLCBcIm9uY2xpY2tcIl0pLFxuXHRcdFx0XHR2bm9kZS5jaGlsZHJlblxuXHRcdFx0KVxuXHRcdFx0dmFyIG9wdGlvbnMsIG9uY2xpY2ssIGhyZWZcblxuXHRcdFx0Ly8gTGV0J3MgcHJvdmlkZSBhICpyaWdodCogd2F5IHRvIGRpc2FibGUgYSByb3V0ZSBsaW5rLCByYXRoZXIgdGhhblxuXHRcdFx0Ly8gbGV0dGluZyBwZW9wbGUgc2NyZXcgdXAgYWNjZXNzaWJpbGl0eSBvbiBhY2NpZGVudC5cblx0XHRcdC8vXG5cdFx0XHQvLyBUaGUgYXR0cmlidXRlIGlzIGNvZXJjZWQgc28gdXNlcnMgZG9uJ3QgZ2V0IHN1cnByaXNlZCBvdmVyXG5cdFx0XHQvLyBgZGlzYWJsZWQ6IDBgIHJlc3VsdGluZyBpbiBhIGJ1dHRvbiB0aGF0J3Mgc29tZWhvdyByb3V0YWJsZVxuXHRcdFx0Ly8gZGVzcGl0ZSBiZWluZyB2aXNpYmx5IGRpc2FibGVkLlxuXHRcdFx0aWYgKGNoaWxkLmF0dHJzLmRpc2FibGVkID0gQm9vbGVhbihjaGlsZC5hdHRycy5kaXNhYmxlZCkpIHtcblx0XHRcdFx0Y2hpbGQuYXR0cnMuaHJlZiA9IG51bGxcblx0XHRcdFx0Y2hpbGQuYXR0cnNbXCJhcmlhLWRpc2FibGVkXCJdID0gXCJ0cnVlXCJcblx0XHRcdFx0Ly8gSWYgeW91ICpyZWFsbHkqIGRvIHdhbnQgYWRkIGBvbmNsaWNrYCBvbiBhIGRpc2FibGVkIGxpbmssIHVzZVxuXHRcdFx0XHQvLyBhbiBgb25jcmVhdGVgIGhvb2sgdG8gYWRkIGl0LlxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyA9IHZub2RlLmF0dHJzLm9wdGlvbnNcblx0XHRcdFx0b25jbGljayA9IHZub2RlLmF0dHJzLm9uY2xpY2tcblx0XHRcdFx0Ly8gRWFzaWVyIHRvIGJ1aWxkIGl0IG5vdyB0byBrZWVwIGl0IGlzb21vcnBoaWMuXG5cdFx0XHRcdGhyZWYgPSBidWlsZFBhdGhuYW1lKGNoaWxkLmF0dHJzLmhyZWYsIHZub2RlLmF0dHJzLnBhcmFtcylcblx0XHRcdFx0Y2hpbGQuYXR0cnMuaHJlZiA9IHJvdXRlLnByZWZpeCArIGhyZWZcblx0XHRcdFx0Y2hpbGQuYXR0cnMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBvbmNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG9uY2xpY2suY2FsbChlLmN1cnJlbnRUYXJnZXQsIGUpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvbmNsaWNrID09IG51bGwgfHwgdHlwZW9mIG9uY2xpY2sgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRcdC8vIGRvIG5vdGhpbmdcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvbmNsaWNrLmhhbmRsZUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdG9uY2xpY2suaGFuZGxlRXZlbnQoZSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBBZGFwdGVkIGZyb20gUmVhY3QgUm91dGVyJ3MgaW1wbGVtZW50YXRpb246XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvcmVhY3Qtcm91dGVyL2Jsb2IvNTIwYTBhY2Q0OGFlMWIwNjZlYjBiMDdkNmQ0ZDE3OTBhMWQwMjQ4Mi9wYWNrYWdlcy9yZWFjdC1yb3V0ZXItZG9tL21vZHVsZXMvTGluay5qc1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIGJlIGZsZXhpYmxlIGFuZCBpbnR1aXRpdmUgaW4gaG93IHdlIGhhbmRsZSBsaW5rcy5cblx0XHRcdFx0XHQvLyBGdW4gZmFjdDogbGlua3MgYXJlbid0IGFzIG9idmlvdXMgdG8gZ2V0IHJpZ2h0IGFzIHlvdVxuXHRcdFx0XHRcdC8vIHdvdWxkIGV4cGVjdC4gVGhlcmUncyBhIGxvdCBtb3JlIHZhbGlkIHdheXMgdG8gY2xpY2sgYVxuXHRcdFx0XHRcdC8vIGxpbmsgdGhhbiB0aGlzLCBhbmQgb25lIG1pZ2h0IHdhbnQgdG8gbm90IHNpbXBseSBjbGljayBhXG5cdFx0XHRcdFx0Ly8gbGluaywgYnV0IHJpZ2h0IGNsaWNrIG9yIGNvbW1hbmQtY2xpY2sgaXQgdG8gY29weSB0aGVcblx0XHRcdFx0XHQvLyBsaW5rIHRhcmdldCwgZXRjLiBOb3BlLCB0aGlzIGlzbid0IGp1c3QgZm9yIGJsaW5kIHBlb3BsZS5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQvLyBTa2lwIGlmIGBvbmNsaWNrYCBwcmV2ZW50ZWQgZGVmYXVsdFxuXHRcdFx0XHRcdFx0cmVzdWx0ICE9PSBmYWxzZSAmJiAhZS5kZWZhdWx0UHJldmVudGVkICYmXG5cdFx0XHRcdFx0XHQvLyBJZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3Ncblx0XHRcdFx0XHRcdChlLmJ1dHRvbiA9PT0gMCB8fCBlLndoaWNoID09PSAwIHx8IGUud2hpY2ggPT09IDEpICYmXG5cdFx0XHRcdFx0XHQvLyBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGB0YXJnZXQ9X2JsYW5rYCwgZXRjLlxuXHRcdFx0XHRcdFx0KCFlLmN1cnJlbnRUYXJnZXQudGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldC50YXJnZXQgPT09IFwiX3NlbGZcIikgJiZcblx0XHRcdFx0XHRcdC8vIE5vIG1vZGlmaWVyIGtleXNcblx0XHRcdFx0XHRcdCFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5hbHRLZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0ZS5yZWRyYXcgPSBmYWxzZVxuXHRcdFx0XHRcdFx0cm91dGUuc2V0KGhyZWYsIG51bGwsIG9wdGlvbnMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2hpbGRcblx0XHR9LFxuXHR9XG5cdHJvdXRlLnBhcmFtID0gZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIGF0dHJzICYmIGtleSAhPSBudWxsID8gYXR0cnNba2V5XSA6IGF0dHJzXG5cdH1cblxuXHRyZXR1cm4gcm91dGVcbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgbW91bnRSZWRyYXcgPSByZXF1aXJlKFwiLi9tb3VudC1yZWRyYXdcIilcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9hcGkvcm91dGVyXCIpKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsLCBtb3VudFJlZHJhdylcbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgaHlwZXJzY3JpcHQgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFwiKVxudmFyIHJlcXVlc3QgPSByZXF1aXJlKFwiLi9yZXF1ZXN0XCIpXG52YXIgbW91bnRSZWRyYXcgPSByZXF1aXJlKFwiLi9tb3VudC1yZWRyYXdcIilcblxudmFyIG0gPSBmdW5jdGlvbiBtKCkgeyByZXR1cm4gaHlwZXJzY3JpcHQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB9XG5tLm0gPSBoeXBlcnNjcmlwdFxubS50cnVzdCA9IGh5cGVyc2NyaXB0LnRydXN0XG5tLmZyYWdtZW50ID0gaHlwZXJzY3JpcHQuZnJhZ21lbnRcbm0uRnJhZ21lbnQgPSBcIltcIlxubS5tb3VudCA9IG1vdW50UmVkcmF3Lm1vdW50XG5tLnJvdXRlID0gcmVxdWlyZShcIi4vcm91dGVcIilcbm0ucmVuZGVyID0gcmVxdWlyZShcIi4vcmVuZGVyXCIpXG5tLnJlZHJhdyA9IG1vdW50UmVkcmF3LnJlZHJhd1xubS5yZXF1ZXN0ID0gcmVxdWVzdC5yZXF1ZXN0XG5tLmpzb25wID0gcmVxdWVzdC5qc29ucFxubS5wYXJzZVF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4vcXVlcnlzdHJpbmcvcGFyc2VcIilcbm0uYnVpbGRRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuL3F1ZXJ5c3RyaW5nL2J1aWxkXCIpXG5tLnBhcnNlUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXRobmFtZS9wYXJzZVwiKVxubS5idWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4vcGF0aG5hbWUvYnVpbGRcIilcbm0udm5vZGUgPSByZXF1aXJlKFwiLi9yZW5kZXIvdm5vZGVcIilcbm0uUHJvbWlzZVBvbHlmaWxsID0gcmVxdWlyZShcIi4vcHJvbWlzZS9wb2x5ZmlsbFwiKVxubS5jZW5zb3IgPSByZXF1aXJlKFwiLi91dGlsL2NlbnNvclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1cbiIsICJcInVzZSBzdHJpY3RcIjt2YXIgcD1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIGo9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjt2YXIgbT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lczt2YXIgST1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciBVPShuLGMpPT57Zm9yKHZhciBpIGluIGMpcChuLGkse2dldDpjW2ldLGVudW1lcmFibGU6ITB9KX0sUz0obixjLGkscyk9PntpZihjJiZ0eXBlb2YgYz09XCJvYmplY3RcInx8dHlwZW9mIGM9PVwiZnVuY3Rpb25cIilmb3IobGV0IGQgb2YgbShjKSkhSS5jYWxsKG4sZCkmJmQhPT1pJiZwKG4sZCx7Z2V0OigpPT5jW2RdLGVudW1lcmFibGU6IShzPWooYyxkKSl8fHMuZW51bWVyYWJsZX0pO3JldHVybiBufTt2YXIgTj1uPT5TKHAoe30sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksbik7dmFyIEY9e307VShGLHtKU09OUGFyc2VFcnJvcjooKT0+ayxwYXJzZTooKT0+Qn0pO21vZHVsZS5leHBvcnRzPU4oRik7Y2xhc3MgayBleHRlbmRzIEVycm9ye31sZXQgcix0LG8sQyxBO2NvbnN0IHg9L1teXCJcXFxcXFxuXFx0XFx1MDAwMC1cXHUwMDFmXSoveSx3PS8tPygwfFsxLTldWzAtOV0qKShbLl1bMC05XSspPyhbZUVdWy0rXT9bMC05XSspP3x0cnVlfGZhbHNlfG51bGwveSxlPVwiXCIsTz1bZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSwnXCInLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLFwiL1wiLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxlLGUsZSxcIlxcXFxcIixlLGUsZSxlLGUsXCJcXGJcIixlLGUsZSxcIlxcZlwiLGUsZSxlLGUsZSxlLGUsYFxuYCxlLGUsZSxcIlxcclwiLGUsXCJcdFwiXSxSPVswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDQwOTcsODE5MywxMjI4OSwxNjM4NSwyMDQ4MSwyNDU3NywyODY3MywzMjc2OSwzNjg2NSwwLDAsMCwwLDAsMCwwLDQwOTYxLDQ1MDU3LDQ5MTUzLDUzMjQ5LDU3MzQ1LDYxNDQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw0MDk2MSw0NTA1Nyw0OTE1Myw1MzI0OSw1NzM0NSw2MTQ0MV0sTD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyNTcsNTEzLDc2OSwxMDI1LDEyODEsMTUzNywxNzkzLDIwNDksMjMwNSwwLDAsMCwwLDAsMCwwLDI1NjEsMjgxNywzMDczLDMzMjksMzU4NSwzODQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyNTYxLDI4MTcsMzA3MywzMzI5LDM1ODUsMzg0MV0sWD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxNywzMyw0OSw2NSw4MSw5NywxMTMsMTI5LDE0NSwwLDAsMCwwLDAsMCwwLDE2MSwxNzcsMTkzLDIwOSwyMjUsMjQxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxNjEsMTc3LDE5MywyMDksMjI1LDI0MV0sSj1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMCwwLDAsMCwwLDAsMCwxMSwxMiwxMywxNCwxNSwxNiwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTEsMTIsMTMsMTQsMTUsMTZdO2Z1bmN0aW9uIGEobil7dGhyb3cgbmV3IGsobitgXG5BdCBjaGFyYWN0ZXIgYCtyK1wiIGluIEpTT046IFwiK28pfWZ1bmN0aW9uIHUobil7cmV0dXJuIHQ+PTA/XCInXCIrKG58fFwiXCIpK1N0cmluZy5mcm9tQ2hhckNvZGUodCkrXCInXCI6XCJlbmQgb2YgaW5wdXRcIn1mdW5jdGlvbiBEKCl7bGV0IG47Y29uc3QgYz1yLTE7dy5sYXN0SW5kZXg9Yyx3LnRlc3Qobyl8fGEoXCJVbmV4cGVjdGVkIGNoYXJhY3RlciBvciBlbmQgb2YgaW5wdXRcIik7Y29uc3R7bGFzdEluZGV4Oml9PXc7aWYodDwxMDIpe2NvbnN0IHM9by5zbGljZShjLGkpO249Qz9DKHMpOitzfWVsc2Ugbj10PT09MTEwP251bGw6dD09PTExNjtyZXR1cm4gcj1pLHQ9by5jaGFyQ29kZUF0KHIrKyksbn1mdW5jdGlvbiBmKCl7YShcIkludmFsaWQgXFxcXHVYWFhYIGVzY2FwZSBpbiBzdHJpbmdcIil9ZnVuY3Rpb24gRSgpe2xldCBuPVwiXCI7Zm9yKDs7KXt4Lmxhc3RJbmRleD1yLHgudGVzdChvKTtjb25zdHtsYXN0SW5kZXg6Y309eDtzd2l0Y2goYz5yJiYobis9by5zbGljZShyLGMpLHI9YyksdD1vLmNoYXJDb2RlQXQocisrKSx0KXtjYXNlIDM0OnJldHVybiB0PW8uY2hhckNvZGVBdChyKyspLG47Y2FzZSA5Mjp0PW8uY2hhckNvZGVBdChyKyspLG4rPXQ9PT0xMTc/U3RyaW5nLmZyb21DaGFyQ29kZSgoUltvLmNoYXJDb2RlQXQocisrKV18fGYoKSkrKExbby5jaGFyQ29kZUF0KHIrKyldfHxmKCkpKyhYW28uY2hhckNvZGVBdChyKyspXXx8ZigpKSsoSltvLmNoYXJDb2RlQXQocisrKV18fGYoKSktNCk6T1t0XXx8YShcIkludmFsaWQgZXNjYXBlIHNlcXVlbmNlIFwiK3UoXCJcXFxcXCIpK1wiIGluIHN0cmluZ1wiKTtjb250aW51ZTtkZWZhdWx0OmlzTmFOKHQpJiZhKFwiVW50ZXJtaW5hdGVkIHN0cmluZ1wiKTtjb25zdCBpPXQ9PT0xMD9cIm5ld2xpbmVcIjp0PT09OT9cInRhYlwiOlwiY29udHJvbCBjaGFyYWN0ZXJcIixzPXQudG9TdHJpbmcoMTYpLGQ9XCIwMDAwXCIuc2xpY2Uocy5sZW5ndGgpK3M7YShcIkludmFsaWQgdW5lc2NhcGVkIFwiK2krXCIgKFxcXFx1XCIrZCtcIikgaW4gc3RyaW5nXCIpfX19ZnVuY3Rpb24gUCgpe2NvbnN0IG49W107bGV0IGM9MDtkbyB0PW8uY2hhckNvZGVBdChyKyspO3doaWxlKHQ8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSkpO2lmKHQ9PT05MylyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Zvcig7dD49MDspe2ZvcihuW2MrK109ZygpO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7aWYodD09PTkzKXJldHVybiB0PW8uY2hhckNvZGVBdChyKyspLG47dCE9PTQ0JiZhKFwiRXhwZWN0ZWQgJywnIGJ1dCBnb3QgXCIrdSgpK1wiIGFmdGVyIGFycmF5IGVsZW1lbnRcIik7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKX1hKFwiVW50ZXJtaW5hdGVkIGFycmF5XCIpfWZ1bmN0aW9uIHEoKXtjb25zdCBuPXt9O2RvIHQ9by5jaGFyQ29kZUF0KHIrKyk7d2hpbGUodDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KSk7aWYodD09PTEyNSlyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO2Zvcig7dD09PTM0Oyl7Y29uc3QgYz1FKCk7Zm9yKDt0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpOyl0PW8uY2hhckNvZGVBdChyKyspO2Zvcih0IT09NTgmJmEoXCJFeHBlY3RlZCAnOicgYnV0IGdvdCBcIit1KCkrXCIgYWZ0ZXIga2V5IGluIG9iamVjdFwiKSx0PW8uY2hhckNvZGVBdChyKyspLG5bY109ZygpO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7aWYodD09PTEyNSlyZXR1cm4gdD1vLmNoYXJDb2RlQXQocisrKSxuO3QhPT00NCYmYShcIkV4cGVjdGVkICcsJyBidXQgZ290IFwiK3UoKStcIiBhZnRlciB2YWx1ZSBpbiBvYmplY3RcIik7ZG8gdD1vLmNoYXJDb2RlQXQocisrKTt3aGlsZSh0PDMzJiYodD09PTMyfHx0PT09MTB8fHQ9PT0xM3x8dD09PTkpKX1hKGBFeHBlY3RlZCAnXCInIGJ1dCBnb3QgYCt1KCkrXCIgaW4gb2JqZWN0XCIpfWZ1bmN0aW9uIGcoKXtmb3IoO3Q8MzMmJih0PT09MzJ8fHQ9PT0xMHx8dD09PTEzfHx0PT09OSk7KXQ9by5jaGFyQ29kZUF0KHIrKyk7c3dpdGNoKHQpe2Nhc2UgMzQ6cmV0dXJuIEUoKTtjYXNlIDEyMzpyZXR1cm4gcSgpO2Nhc2UgOTE6cmV0dXJuIFAoKTtkZWZhdWx0OnJldHVybiBEKCl9fWZ1bmN0aW9uIEIobixjLGkpe24gaW5zdGFuY2VvZiBVaW50OEFycmF5JiYobj0oQSE9bnVsbD9BOkE9bmV3IFRleHREZWNvZGVyKS5kZWNvZGUobikpLHR5cGVvZiBuIT1cInN0cmluZ1wiJiZhKFwiSlNPTiBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIgb3IgVWludDhBcnJheVwiKSxyPTAsdD0zMixvPW4sQz1pO2NvbnN0IHM9ZygpO2Zvcig7dDwzMyYmKHQ9PT0zMnx8dD09PTEwfHx0PT09MTN8fHQ9PT05KTspdD1vLmNoYXJDb2RlQXQocisrKTtyZXR1cm4gdD49MCYmYShcIlVuZXhwZWN0ZWQgZGF0YSBhdCBlbmQgb2YgaW5wdXRcIiksdHlwZW9mIGM9PVwiZnVuY3Rpb25cIj9mdW5jdGlvbiBkKGIseSl7Y29uc3QgbD1iW3ldO2lmKGwmJnR5cGVvZiBsPT1cIm9iamVjdFwiKXtmb3IoY29uc3QgaCBpbiBsKWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsLGgpKXtjb25zdCB2PWQobCxoKTt2IT09dm9pZCAwP2xbaF09djpkZWxldGUgbFtoXX19cmV0dXJuIGMuY2FsbChiLHksbCl9KHtcIlwiOnN9LFwiXCIpOnN9XG4iLCAiaW1wb3J0IG0gZnJvbSAnbWl0aHJpbCc7XG5cbmltcG9ydCB7IGhpc3RvZ3JhbSB9IGZyb20gJy4vaGlzdG9ncmFtJztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICcuL2NvbXBhcmUnO1xuXG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZV9uYXRpdmUgfSBmcm9tICcuL2ltcGxlbWVudGF0aW9ucy8wMS1uYXRpdmUnO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VfanNvbkN1c3RvbU51bWJlcnMgfSBmcm9tICcuL2ltcGxlbWVudGF0aW9ucy8wMi1qc29uLWN1c3RvbS1udW1iZXJzJztcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlX2Nyb2NrZm9yZCB9IGZyb20gJy4vaW1wbGVtZW50YXRpb25zLzAzLWNyb2NrZm9yZCc7XG5cbmltcG9ydCBib29sTnVsbCBmcm9tICcuL2pzb24tZG9jcy9ib29sLW51bGwtYXJyYXkuanNvbic7XG5pbXBvcnQgbG9uZ051bWJlcnMgZnJvbSAnLi9qc29uLWRvY3MvbG9uZy1udW1iZXJzLWFycmF5Lmpzb24nO1xuaW1wb3J0IGxvbmdTdHJpbmdzIGZyb20gJy4vanNvbi1kb2NzL2xvbmctc3RyaW5ncy1hcnJheS5qc29uJztcbmltcG9ydCBzaG9ydE51bWJlcnMgZnJvbSAnLi9qc29uLWRvY3Mvc2hvcnQtbnVtYmVycy1hcnJheS5qc29uJztcbmltcG9ydCBzaG9ydFN0cmluZ3MgZnJvbSAnLi9qc29uLWRvY3Mvc2hvcnQtc3RyaW5ncy1vYmplY3QuanNvbic7XG5pbXBvcnQgc3RyaW5nRXNjYXBlcyBmcm9tICcuL2pzb24tZG9jcy9zdHJpbmctZXNjYXBlcy5qc29uJztcblxuY29uc3QganNvbk1peGVkID0gSlNPTi5zdHJpbmdpZnkoeyBib29sTnVsbCwgbG9uZ051bWJlcnMsIGxvbmdTdHJpbmdzLCBzaG9ydE51bWJlcnMsIHNob3J0U3RyaW5ncywgc3RyaW5nRXNjYXBlcyB9KTtcblxuZnVuY3Rpb24gc3BlZWRDb21wYXJlKFthLCBiXTogW251bWJlciwgbnVtYmVyXSkge1xuICByZXR1cm4gYiA+IGEgP1xuICAgIChiIC8gYSkudG9GaXhlZCgxKSArICd4IGZhc3RlcicgOlxuICAgIChhIC8gYikudG9GaXhlZCgxKSArICd4IHNsb3dlcic7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbXBhcmVVSShlbDogSFRNTEVsZW1lbnQsIGZuczogKCgpID0+IGFueSlbXSwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gIGxldCByZXBzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGxldCB0cmlhbHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgbGV0IHRyaWFsOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGxldCBkYXRhVVJJOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGxldCBuYW1lQTogc3RyaW5nO1xuICBsZXQgbmFtZUI6IHN0cmluZztcblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICByZXBzID0gdHJpYWxzID0gdHJpYWwgPSBkYXRhVVJJID0gdW5kZWZpbmVkO1xuICAgIG5hbWVBID0gYEEuICR7bmFtZXNbMF19YDtcbiAgICBuYW1lQiA9IGBCLiAke25hbWVzWzFdfWA7XG4gIH1cbiAgcmVzZXQoKTtcblxuICBtLm1vdW50KGVsLCB7XG4gICAgdmlldzogKCkgPT4gbSgnLmNvbXBhcmUnLFxuICAgICAgbSgnLm5hbWVBJywgbmFtZUEpLFxuICAgICAgbSgnLm5hbWVCJywgbmFtZUIpLFxuICAgICAgZGF0YVVSSSA/XG4gICAgICAgIG0oJy5oaXN0JywgbSgnaW1nJywgeyBzcmM6IGRhdGFVUkkgfSkpIDpcbiAgICAgICAgW1xuICAgICAgICAgIG0oJy5wcm9ncmVzcy1vdXRlcicsIG0oJy5wcm9ncmVzcy1pbm5lcicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7IHdpZHRoOiAxMDAgKiAodHJpYWwgJiYgdHJpYWxzID8gdHJpYWwgLyB0cmlhbHMgOiAwKSArICclJyB9XG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIG0oJy50cmlhbHMnLCBgJHt0cmlhbCA/PyAnXHUyMDE0J30vJHt0cmlhbHMgPz8gJ1x1MjAxNCd9IHRyaWFsc2ApLFxuICAgICAgICAgIG0oJy5yZXBzJywgYCR7cmVwcyA/PyAnXHUyMDE0J30gcmVwcy90cmlhbGApLFxuICAgICAgICBdLFxuICAgICAgbSgnYnV0dG9uJywge1xuICAgICAgICBkaXNhYmxlZDogdHJpYWwgJiYgdHJpYWxzICYmIHRyaWFsIDwgdHJpYWxzLFxuICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICBtLnJlZHJhdygpO1xuXG4gICAgICAgICAgY29tcGFyZShcbiAgICAgICAgICAgIGZucyxcbiAgICAgICAgICAgIChuZXdSZXBzLCBuZXdUcmlhbHMsIG5ld1RyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIHJlcHMgPSBuZXdSZXBzO1xuICAgICAgICAgICAgICB0cmlhbHMgPSBuZXdUcmlhbHM7XG4gICAgICAgICAgICAgIHRyaWFsID0gbmV3VHJpYWw7XG4gICAgICAgICAgICAgIG0ucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKS50aGVuKCh7IG1lZGlhbnMsIHUsIHosIHAsIHRSZXBzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHhtbCA9IGhpc3RvZ3JhbSh0UmVwcyk7XG4gICAgICAgICAgICBkYXRhVVJJID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHhtbCk7XG4gICAgICAgICAgICBuYW1lQiArPSAnOiAnICsgKFxuICAgICAgICAgICAgICBwISA+PSAwLjAxID8gJ25vIHNpZ25pZmljYW50IGRpZmZlcmVuY2UnIDpcbiAgICAgICAgICAgICAgICBzcGVlZENvbXBhcmUobWVkaWFucyBhcyBbbnVtYmVyLCBudW1iZXJdKVxuICAgICAgICAgICAgKSArIGAgKFUgPSAke3V9LCBwID0gJHtwIS50b1ByZWNpc2lvbigyKX0pYDtcbiAgICAgICAgICAgIG0ucmVkcmF3KCk7XG4gICAgICAgICAgfSk7ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICB9LCB0cmlhbCAmJiB0cmlhbHMgJiYgdHJpYWwgPCB0cmlhbHMgPyAnQ29tcGFyaW5nIFx1MjAyNicgOiAnQ29tcGFyZScgKyAocmVwcyA/ICcgYWdhaW4nIDogJycpKVxuICAgIClcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbXBhcmVVSShcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcGFyZTEnKSEsXG4gICAgW1xuICAgICAgKCkgPT4gcGFyc2VfbmF0aXZlKGpzb25NaXhlZCksXG4gICAgICAoKSA9PiBwYXJzZV9jcm9ja2ZvcmQoanNvbk1peGVkKSxcbiAgICBdLFxuICAgIFsnTmF0aXZlIEpTT04ucGFyc2UnLCAnQ3JvY2tmb3JkIHJlZmVyZW5jZSddXG4gICk7XG5cbiAgY29tcGFyZVVJKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wYXJlMicpISxcbiAgICBbXG4gICAgICAoKSA9PiBwYXJzZV9uYXRpdmUoanNvbk1peGVkKSxcbiAgICAgICgpID0+IHBhcnNlX2pzb25DdXN0b21OdW1iZXJzKGpzb25NaXhlZCksXG4gICAgXSxcbiAgICBbJ05hdGl2ZSBKU09OLnBhcnNlJywgJ2pzb24tY3VzdG9tLW51bWJlcnMnXVxuICApO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG1haW4pO1xuIiwgImV4cG9ydCBmdW5jdGlvbiBtZWRpYW4oZGF0YTogbnVtYmVyW10sIGRlc3RydWN0aXZlID0gZmFsc2UpIHtcbiAgaWYgKCFkZXN0cnVjdGl2ZSkgZGF0YSA9IFsuLi5kYXRhXTtcbiAgY29uc3QgeyBsZW5ndGggfSA9IGRhdGE7XG4gIGRhdGEuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICByZXR1cm4gbGVuZ3RoICUgMiA9PT0gMSA/XG4gICAgZGF0YVsobGVuZ3RoIC0gMSkgKiAuNV0gOlxuICAgIC41ICogZGF0YVtsZW5ndGggKiAuNSAtIDFdICsgLjUgKiBkYXRhW2xlbmd0aCAqIC41XTtcbn0iLCAiaW1wb3J0IHsgbWVkaWFuIH0gZnJvbSAnLi9tZWRpYW4nO1xuXG5mdW5jdGlvbiByb3VuZChuOiBudW1iZXIpIHtcbiAgcmV0dXJuIG4gPCAxMCA/IG4udG9QcmVjaXNpb24oMikgOiBuIDwgMTAwID8gbi50b0ZpeGVkKDEpIDogbi50b0ZpeGVkKDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9ncmFtKGRhdGE6IG51bWJlcltdW10sIGJpbkNvdW50ID0gNTAsIHNpemUgPSBbNDAwLCAxMDBdLCBjb2xvcnMgPSBbJyNlMzAnLCAnIzAzZSddLCBtYXJnaW5zID0gWzMwLCAyMCwgMjAsIDIwXSwgeHRpdGxlPVwib3BzL3NlY1wiKSB7XG4gIGxldCBtaW4gPSBJbmZpbml0eSwgbWF4ID0gLUluZmluaXR5O1xuICBmb3IgKGxldCBkYXRhU2V0IG9mIGRhdGEpIHtcbiAgICBtaW4gPSBNYXRoLm1pbihtaW4sIC4uLmRhdGFTZXQpO1xuICAgIG1heCA9IE1hdGgubWF4KG1heCwgLi4uZGF0YVNldCk7XG4gIH1cblxuICBjb25zdCBtZWRpYW5zID0gZGF0YS5tYXAoZGF0YVNldCA9PiBtZWRpYW4oZGF0YVNldCkpO1xuICBjb25zdCBsb3dlc3RGaXJzdCA9IG1lZGlhbnNbMF0gPD0gbWVkaWFuc1sxXSA/IDEgOiAwO1xuXG4gIGNvbnN0IHJhbmdlID0gbWF4IC0gbWluO1xuICBjb25zdCBiaW5TaXplID0gcmFuZ2UgLyBiaW5Db3VudDtcbiAgY29uc3QgYWxsQmlucyA9IGRhdGEubWFwKCgpID0+IG5ldyBBcnJheShiaW5Db3VudCkuZmlsbCgwKSk7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgZGF0YVNldCA9IGRhdGFbaV07XG4gICAgY29uc3QgYmlucyA9IGFsbEJpbnNbaV07XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBkYXRhU2V0KSBiaW5zW01hdGgubWluKE1hdGguZmxvb3IoKHZhbHVlIC0gbWluKSAvIGJpblNpemUpLCBiaW5Db3VudCAtIDEpXSsrO1xuICB9XG5cbiAgbGV0IGdyZWF0ZXN0ID0gMDtcbiAgZm9yIChjb25zdCBiaW5zIG9mIGFsbEJpbnMpIGdyZWF0ZXN0ID0gTWF0aC5tYXgoZ3JlYXRlc3QsIC4uLmJpbnMpO1xuXG4gIGNvbnN0IHBsb3RXaWR0aFB4ID0gc2l6ZVswXSAtIG1hcmdpbnNbMV0gLSBtYXJnaW5zWzNdO1xuICBjb25zdCBiaW5XaWR0aFB4ID0gcGxvdFdpZHRoUHggLyBiaW5Db3VudDtcbiAgY29uc3QgcGxvdEhlaWdodFB4ID0gc2l6ZVsxXSAtIG1hcmdpbnNbMF0gLSBtYXJnaW5zWzJdO1xuICBjb25zdCBiaW5Vbml0SGVpZ2h0UHggPSBwbG90SGVpZ2h0UHggLyBncmVhdGVzdDtcblxuICBjb25zdCBiYXNlbGluZSA9IHNpemVbMV0gLSBtYXJnaW5zWzJdO1xuICBjb25zdCBzbWFsbExhYmVsU3R5bGUgPSAnZm9udDogYm9sZCA5cHggc2Fucy1zZXJpZic7XG4gIGNvbnN0IGxhYmVsU3R5bGUgPSAnZm9udDogMTJweCBzYW5zLXNlcmlmOyBtYXJnaW46IDAgNHB4Oyc7XG5cbiAgcmV0dXJuIGA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyBcIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOXCIgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGRcIj5cbjxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2aWV3Qm94PVwiMCAwICR7c2l6ZVswXX0gJHtzaXplWzFdfVwiICB3aWR0aD1cIiR7c2l6ZVswXX1cIiBoZWlnaHQ9XCIke3NpemVbMV19XCI+XG5cbiAgPCEtLSB4IGF4aXMgLS0+XG4gIDxsaW5lIHgxPVwiMFwiIHkxPVwiJHtiYXNlbGluZX1cIiB4Mj1cIiR7c2l6ZVswXX1cIiB5Mj1cIiR7YmFzZWxpbmV9XCIgc3Ryb2tlPVwiIzAwMFwiLz5cbiAgPHRleHQgZG9taW5hbnQtYmFzZWxpbmU9XCJoYW5naW5nXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiB4PVwiJHtzaXplWzBdICogLjV9XCIgeT1cIiR7YmFzZWxpbmUgKyA2fVwiIHN0eWxlPVwiJHtsYWJlbFN0eWxlfTsgZm9udC13ZWlnaHQ6IGJvbGRcIj4ke3h0aXRsZX08L3RleHQ+XG5cbiAgPGxpbmUgeDE9XCIke21hcmdpbnNbM119XCIgeTE9XCIke2Jhc2VsaW5lfVwiIHgyPVwiJHttYXJnaW5zWzNdfVwiIHkyPVwiJHtiYXNlbGluZSArIDN9XCIgc3Ryb2tlPVwiIzAwMFwiLz5cbiAgPHRleHQgZG9taW5hbnQtYmFzZWxpbmU9XCJoYW5naW5nXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiB4PVwiJHttYXJnaW5zWzNdfVwiIHk9XCIke2Jhc2VsaW5lICsgNn1cIiBzdHlsZT1cIiR7bGFiZWxTdHlsZX1cIj4ke3JvdW5kKG1pbil9PC90ZXh0PlxuXG4gIDxsaW5lIHgxPVwiJHtzaXplWzBdIC0gbWFyZ2luc1sxXX1cIiB5MT1cIiR7YmFzZWxpbmV9XCIgeDI9XCIke3NpemVbMF0gLSBtYXJnaW5zWzFdfVwiIHkyPVwiJHtiYXNlbGluZSArIDN9XCIgc3Ryb2tlPVwiIzAwMFwiLz5cbiAgPHRleHQgZG9taW5hbnQtYmFzZWxpbmU9XCJoYW5naW5nXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiB4PVwiJHtzaXplWzBdIC0gbWFyZ2luc1sxXX1cIiB5PVwiJHtiYXNlbGluZSArIDZ9XCIgc3R5bGU9XCIke2xhYmVsU3R5bGV9XCI+JHtyb3VuZChtYXgpfTwvdGV4dD5cblxuICA8IS0tIGRpc3RyaWJ1dGlvbnMgLS0+XG4gICR7YWxsQmlucy5tYXAoKGJpbnMsIGkpID0+IGBcbiAgPHBvbHlnb24gcG9pbnRzPVwiJHttYXJnaW5zWzNdfSwke2Jhc2VsaW5lfSAke2JpbnMubWFwKChjb3VudCwgaikgPT4ge1xuICAgIGNvbnN0IHgxID0gbWFyZ2luc1szXSArIGogKiBiaW5XaWR0aFB4O1xuICAgIGNvbnN0IHgyID0geDEgKyBiaW5XaWR0aFB4O1xuICAgIGNvbnN0IHkgPSBzaXplWzFdIC0gbWFyZ2luc1syXSAtIGNvdW50ICogYmluVW5pdEhlaWdodFB4O1xuXG4gICAgcmV0dXJuIGAke3gxfSwke3l9ICR7eDJ9LCR7eX1gXG4gIH0pLmpvaW4oJyAnKX0gJHtzaXplWzBdIC0gbWFyZ2luc1sxXX0sJHtiYXNlbGluZX1cIiBmaWxsPVwiJHtjb2xvcnNbaV19XCIgb3BhY2l0eT1cIjAuNVwiLz5cbiAgYCkuam9pbignXFxuJyl9XG5cbiAgPCEtLSBtZWRpYW5zIC0tPlxuICAke21lZGlhbnMubWFwKChtZWRpYW4sIGkpID0+IHtcbiAgICBjb25zdCB4ID0gbWFyZ2luc1szXSArIChtZWRpYW4gLSBtaW4pIC8gcmFuZ2UgKiBwbG90V2lkdGhQeDtcblxuICAgIHJldHVybiBgXG4gIDxsaW5lIHgxPVwiJHt4fVwiIHkxPVwiJHtiYXNlbGluZSArIDN9XCIgeDI9XCIke3h9XCIgeTI9XCIwXCIgc3Ryb2tlPVwiJHtjb2xvcnNbaV19XCIvPlxuICA8dGV4dCBkb21pbmFudC1iYXNlbGluZT1cImhhbmdpbmdcIiB4PVwiJHt4ICsgKGkgJSAyID09PSBsb3dlc3RGaXJzdCA/IDMgOiAtMyl9XCIgeT1cIiR7Mn1cIiBzdHlsZT1cIiR7c21hbGxMYWJlbFN0eWxlfVwiIGZpbGw9XCIke2NvbG9yc1tpXX1cIiB0ZXh0LWFuY2hvcj1cIiR7W1wic3RhcnRcIiwgXCJlbmRcIl1bKGkgJSAyID09PSBsb3dlc3RGaXJzdCA/IDAgOiAxKV19XCI+JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9PC90ZXh0PlxuICA8dGV4dCBkb21pbmFudC1iYXNlbGluZT1cImhhbmdpbmdcIiB4PVwiJHt4ICsgKGkgJSAyID09PSBsb3dlc3RGaXJzdCA/IDMgOiAtMyl9XCIgeT1cIiR7MTJ9XCIgc3R5bGU9XCIke2xhYmVsU3R5bGV9XCIgZmlsbD1cIiR7Y29sb3JzW2ldfVwiIHRleHQtYW5jaG9yPVwiJHtbXCJzdGFydFwiLCBcImVuZFwiXVsoaSAlIDIgPT09IGxvd2VzdEZpcnN0ID8gMCA6IDEpXX1cIj4ke3JvdW5kKG1lZGlhbil9PC90ZXh0PmBcbiAgXG4gIH0pfVxuXG48L3N2Zz5gO1xufVxuIiwgIlxuZnVuY3Rpb24gbm9ybWFsQ0RGKHo6IG51bWJlcikgeyAgLy8gaHR0cHM6Ly93d3cubWF0aC51Y2xhLmVkdS9+dG9tL2Rpc3RyaWJ1dGlvbnMvbm9ybWFsLmh0bWxcbiAgY29uc3QgdCA9IDEgLyAoMSArIC4yMzE2NDE5ICogTWF0aC5hYnMoeikpO1xuICBjb25zdCBkID0gLjM5ODk0MjMgKiBNYXRoLmV4cCgteiAqIHogLyAyKTtcbiAgbGV0IHAgPSBkICogdCAqICguMzE5MzgxNSArIHQgKiAoLS4zNTY1NjM4ICsgdCAqICgxLjc4MTQ3OCArIHQgKiAoLTEuODIxMjU2ICsgdCAqIDEuMzMwMjc0KSkpKTtcbiAgaWYgKHogPiAwKSBwID0gMSAtIHA7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFubldoaXRuZXlVKGRhdGE6IFtudW1iZXJbXSwgbnVtYmVyW11dKSB7XG4gIC8vIGhhbmR5IGZvciBjb21wYXJpc29uOiBSIG9yIGh0dHBzOi8vd3d3LnN0YXRza2luZ2RvbS5jb20vMTcwbWVkaWFuX21hbm5fd2hpdG5leS5odG1sXG4gIGNvbnN0IGRhdGEwID0gZGF0YVswXS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIHNvdXJjZTogMCwgcmFuazogMCB9KSk7XG4gIGNvbnN0IGRhdGExID0gZGF0YVsxXS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIHNvdXJjZTogMSwgcmFuazogMCB9KSk7XG4gIGNvbnN0IGRhdGFBbGwgPSBbLi4uZGF0YTAsIC4uLmRhdGExXTtcbiAgZGF0YUFsbC5zb3J0KChhLCBiKSA9PiBhLnZhbHVlIC0gYi52YWx1ZSk7XG4gIGNvbnN0IG4gPSBkYXRhQWxsLmxlbmd0aDtcblxuICAvLyBpdGVyYXRlIGZvcndhcmRzLCBjb3VudGluZyBpZGVudGljYWwgcHJldmlvdXMgdmFsdWVzIChhbmQgc3R1ZmZpbmcgdGhlbSBpbiB0aGUgcmFuayBmaWVsZClcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGF0YUFsbFtpXTtcbiAgICBjb25zdCBwcmV2ID0gZGF0YUFsbFtpIC0gMV07XG4gICAgY3VycmVudC5yYW5rID0gcHJldi52YWx1ZSA9PT0gY3VycmVudC52YWx1ZSA/IHByZXYucmFuayArIDEgOiAwO1xuICB9XG4gIFxuICAvLyBpdGVyYXRlIGJhY2t3YXJkcywgZmlsbGluZyBpbiB0aGUgcmFuayBmaWVsZCBjb3JyZWN0bHkgKGluY2x1ZGluZyB0aWVzKVxuICBsZXQgdGllU3VtID0gMDtcbiAgbGV0IGkgPSBuIC0gMTtcbiAgd2hpbGUgKGkgPj0gMCkge1xuICAgIGNvbnN0IHJhbmsgPSBpICsgMTtcbiAgICBjb25zdCBjdXJyZW50ID0gZGF0YUFsbFtpXTtcbiAgICBjb25zdCBwcmV2U2FtZSA9IGN1cnJlbnQucmFuaztcbiAgICBpZiAocHJldlNhbWUgPT09IDApIHtcbiAgICAgIGN1cnJlbnQucmFuayA9IHJhbms7XG4gICAgICBpLS07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpZVN1bSArPSBwcmV2U2FtZSAqIHByZXZTYW1lICogcHJldlNhbWUgLSBwcmV2U2FtZTtcbiAgICAgIGNvbnN0IHRpZWRSYW5rID0gcmFuayAtIHByZXZTYW1lICogLjU7XG4gICAgICBjb25zdCBsb3dlc3RUaWVkID0gaSAtIHByZXZTYW1lO1xuICAgICAgd2hpbGUgKGkgPj0gbG93ZXN0VGllZCkgZGF0YUFsbFtpLS1dLnJhbmsgPSB0aWVkUmFuaztcbiAgICB9XG4gIH1cblxuICAvLyBzdW0gcmFua3MgYnkgZGF0YSBzb3VyY2VcbiAgY29uc3QgW3IwLCByMV0gPSBkYXRhQWxsLnJlZHVjZSgoW3IwLCByMV0sIHsgc291cmNlLCByYW5rIH0pID0+XG4gICAgc291cmNlID09PSAwID8gW3IwICsgcmFuaywgcjFdIDogW3IwLCByMSArIHJhbmtdLCBbMCwgMF0pO1xuXG4gIC8vIGNhbGN1bGF0ZSBVXG4gIGNvbnN0IG4wID0gZGF0YTAubGVuZ3RoO1xuICBjb25zdCBuMSA9IGRhdGExLmxlbmd0aDtcbiAgY29uc3QgdTAgPSByMCAtIG4wICogKG4wICsgMSkgKiAuNTtcbiAgY29uc3QgdTEgPSByMSAtIG4xICogKG4xICsgMSkgKiAuNTtcbiAgY29uc3QgdSA9IE1hdGgubWluKHUwLCB1MSk7XG5cbiAgLy8gY2FsY3VsYXRlIHogYW5kIHBcbiAgLy8gaHR0cDovL3VzZXJzLnN1c3NleC5hYy51ay9+Z3JhaGFtaC9STTF3ZWIvV2lsY294b24lMjBMYXJnZSUyME4lMjAyMDA5LnBkZlxuICBjb25zdCBtdSA9IC41ICogbjAgKiBuMTtcbiAgY29uc3Qgc3RkRGV2ID0gTWF0aC5zcXJ0KCgobjAgKiBuMSkgKiAobiAqIG4gKiBuIC0gbiAtIHRpZVN1bSkpIC8gKDEyICogbiAqIChuIC0gMSkpKTtcbiAgY29uc3QgeiA9IChtdSAtIHUgLSAuNSkgLyBzdGREZXY7XG4gIGNvbnN0IHAgPSAyIC8qIHR3by10YWlsZWQgdGVzdCAqLyAqIG5vcm1hbENERigteik7XG5cbiAgcmV0dXJuIHsgdSwgeiwgcCwgZGF0YUFsbCB9O1xufVxuIiwgIlxuZXhwb3J0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICBjb25zb2xlLmxvZyguLi5hcmdzKTtcbiAgLy8gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2cnKSBhcyBIVE1MRGl2RWxlbWVudCkuaW5uZXJUZXh0ICs9XG4gIC8vICAgYXJncy5tYXAoYSA9PiB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhIDogSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJyAnKSArICdcXG4nO1xufVxuIiwgImltcG9ydCB7IG1lZGlhbiB9IGZyb20gJy4vbWVkaWFuJztcbmltcG9ydCB7IG1hbm5XaGl0bmV5VSB9IGZyb20gJy4vbWFubi13aGl0bmV5LXUnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi9sb2cnO1xuXG5sZXQgdDAsIHQxO1xudDAgPSB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xud2hpbGUgKHQwID09PSB0MSkgeyB0MSA9IHBlcmZvcm1hbmNlLm5vdygpIH07XG5jb25zdCBtc1JlcyA9IHQxIC0gdDA7XG5jb25zdCB1c1JlcyA9IE1hdGgucm91bmQobXNSZXMgKiAxZTMpO1xubG9nKGBSZXNvbHV0aW9uOiAke3VzUmVzfVxcdTAzYmNzYCk7XG5cbmNvbnN0IHRyaWFsRHVyYXRpb24gPSBNYXRoLm1heChtc1JlcyAqIDEwMCwgMjApO1xubG9nKGBUYXJnZXQgdHJpYWwgZHVyYXRpb246ICR7dHJpYWxEdXJhdGlvbn1tc2ApO1xuXG5jb25zdCB0cmlhbHMgPSAxMDA7XG5cbmZ1bmN0aW9uIG9wc1BlckR1cmF0aW9uTXMoZm46ICgpID0+IGFueSwgZHVyYXRpb25NczogbnVtYmVyLCB0b05lYXJlc3QgPSAxMCwgbWF4T3BzID0gMmU5KSB7XG4gIGNvbnN0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbWF4T3BzOyBpKyspIHsgIC8vIGl0J3MgaW1wb3J0YW50IGZvciB2YXJpb3VzIHJlYXNvbnMgdGhhdCBpIHN0YXJ0cyBhdCAxLCBub3QgMFxuICAgIGZuKCk7XG4gICAgaWYgKGkgJSB0b05lYXJlc3QgPT09IDAgJiYgcGVyZm9ybWFuY2Uubm93KCkgLSB0MCA+PSBkdXJhdGlvbk1zKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gbWF4T3BzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYXRjaEJyZWF0aCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAwKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wYXJlKGZuczogKCgpID0+IGFueSlbXSwgY2I6IChyZXBzOiBudW1iZXIsIHRyaWFsczogbnVtYmVyLCB0cmlhbDogbnVtYmVyKSA9PiB2b2lkID0gKCkgPT4gdm9pZCAwKSB7XG4gIGNvbnN0IGZuc0xlbmd0aCA9IGZucy5sZW5ndGg7XG5cbiAgbGV0IHJlcHMgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZuc0xlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZm4gPSBmbnNbaV07XG4gICAgY29uc3QgZm5SZXBzID0gb3BzUGVyRHVyYXRpb25NcyhmbiwgdHJpYWxEdXJhdGlvbik7XG4gICAgbG9nKGZuLnRvU3RyaW5nKCksIGAtPiAke2ZuUmVwc30gcmVwcy90cmlhbGApO1xuICAgIGlmIChmblJlcHMgPiByZXBzKSByZXBzID0gZm5SZXBzO1xuICAgIGF3YWl0IGNhdGNoQnJlYXRoKCk7XG4gIH1cblxuICBsb2coYFVzaW5nICR7cmVwc30gcmVwcy90cmlhbGApO1xuXG4gIGNvbnN0IHRSZXBzOiBudW1iZXJbXVtdID0gbmV3IEFycmF5KGZuc0xlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm5zTGVuZ3RoOyBpKyspIHRSZXBzW2ldID0gW107ICAvLyBjYW4ndCBBcnJheS5maWxsLCBhcyBldmVyeSBbXSB3b3VsZCBiZSBzYW1lIHJlZmVyZW5jZVxuICBjb25zdCB0UmVwc1N1bTogbnVtYmVyW10gPSBuZXcgQXJyYXkoZm5zTGVuZ3RoKS5maWxsKDApO1xuICBjb25zdCB0UmVwc01lYW46IG51bWJlcltdID0gbmV3IEFycmF5KGZuc0xlbmd0aCkuZmlsbCgwKTtcblxuICBjYihyZXBzLCB0cmlhbHMsIDApO1xuICBhd2FpdCBjYXRjaEJyZWF0aCgpO1xuICBcbiAgZm9yIChsZXQgdHJpYWwgPSAwOyB0cmlhbCA8IHRyaWFsczsgdHJpYWwrKykge1xuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBmbnNMZW5ndGg7IF9pKyspIHtcbiAgICAgIGNvbnN0IGkgPSAodHJpYWwgKyBfaSkgJSBmbnNMZW5ndGg7ICAvLyByb3RhdGUgc3RhcnRpbmcgZnVuY3Rpb24gKHJhbmRvbSBhc3NpZ25tZW50IGRvZXNuJ3Qgd29yayBzbyB3ZWxsKVxuICAgICAgY29uc3QgZm4gPSBmbnNbaV07XG4gICAgICBjb25zdCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgZm9yIChsZXQgcmVwID0gMDsgcmVwIDwgcmVwczsgcmVwKyspIGZuKCk7XG4gICAgICBjb25zdCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgY29uc3QgdCA9IHQxIC0gdDA7XG4gICAgICBjb25zdCB0UmVwID0gMSAvICh0IC8gcmVwcyk7XG4gICAgICB0UmVwc1tpXVt0cmlhbF0gPSB0UmVwO1xuICAgICAgdFJlcHNTdW1baV0gKz0gdFJlcDtcbiAgICAgIHRSZXBzTWVhbltpXSA9IHRSZXBzU3VtW2ldIC8gKHRyaWFsICsgMSk7XG4gICAgfTtcblxuICAgIGNiKHJlcHMsIHRyaWFscywgdHJpYWwgKyAxKTtcbiAgICBhd2FpdCBjYXRjaEJyZWF0aCgpO1xuICB9XG5cbiAgY29uc3QgdFJlcHNNZWRpYW5zID0gdFJlcHMubWFwKHRSZXAgPT4gbWVkaWFuKHRSZXApKTtcbiAgY29uc3QgdFJlcHNVU3RhdHMgPSAoZm5zTGVuZ3RoID09PSAyID8gbWFubldoaXRuZXlVKHRSZXBzIGFzIFtudW1iZXJbXSwgbnVtYmVyW11dKSA6IHt9KSBhcyBQYXJ0aWFsPFJldHVyblR5cGU8dHlwZW9mIG1hbm5XaGl0bmV5VT4+O1xuXG4gIHJldHVybiB7IG1lZGlhbnM6IHRSZXBzTWVkaWFucywgLi4udFJlcHNVU3RhdHMsIHRSZXBzIH07XG59XG4iLCAiXG5leHBvcnQgY29uc3QgcGFyc2UgPSBKU09OLnBhcnNlO1xuIiwgImltcG9ydCBtb2QgZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgbW9kO1xuZXhwb3J0IGNvbnN0IEpTT05QYXJzZUVycm9yID0gbW9kLkpTT05QYXJzZUVycm9yO1xuZXhwb3J0IGNvbnN0IHBhcnNlID0gbW9kLnBhcnNlO1xuIiwgIi8qXG4gICAganNvbl9wYXJzZS5qc1xuICAgIDIwMTYtMDUtMDJcblxuICAgIFB1YmxpYyBEb21haW4uXG5cbiAgICBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG5cbiAgICBUaGlzIGZpbGUgY3JlYXRlcyBhIGpzb25fcGFyc2UgZnVuY3Rpb24uXG5cbiAgICAgICAganNvbl9wYXJzZSh0ZXh0LCByZXZpdmVyKVxuICAgICAgICAgICAgVGhpcyBtZXRob2QgcGFyc2VzIGEgSlNPTiB0ZXh0IHRvIHByb2R1Y2UgYW4gb2JqZWN0IG9yIGFycmF5LlxuICAgICAgICAgICAgSXQgY2FuIHRocm93IGEgU3ludGF4RXJyb3IgZXhjZXB0aW9uLlxuXG4gICAgICAgICAgICBUaGUgb3B0aW9uYWwgcmV2aXZlciBwYXJhbWV0ZXIgaXMgYSBmdW5jdGlvbiB0aGF0IGNhbiBmaWx0ZXIgYW5kXG4gICAgICAgICAgICB0cmFuc2Zvcm0gdGhlIHJlc3VsdHMuIEl0IHJlY2VpdmVzIGVhY2ggb2YgdGhlIGtleXMgYW5kIHZhbHVlcyxcbiAgICAgICAgICAgIGFuZCBpdHMgcmV0dXJuIHZhbHVlIGlzIHVzZWQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gICAgICAgICAgICBJZiBpdCByZXR1cm5zIHdoYXQgaXQgcmVjZWl2ZWQsIHRoZW4gdGhlIHN0cnVjdHVyZSBpcyBub3QgbW9kaWZpZWQuXG4gICAgICAgICAgICBJZiBpdCByZXR1cm5zIHVuZGVmaW5lZCB0aGVuIHRoZSBtZW1iZXIgaXMgZGVsZXRlZC5cblxuICAgICAgICAgICAgRXhhbXBsZTpcblxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIHRleHQuIFZhbHVlcyB0aGF0IGxvb2sgbGlrZSBJU08gZGF0ZSBzdHJpbmdzIHdpbGxcbiAgICAgICAgICAgIC8vIGJlIGNvbnZlcnRlZCB0byBEYXRlIG9iamVjdHMuXG5cbiAgICAgICAgICAgIG15RGF0YSA9IGpzb25fcGFyc2UodGV4dCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGEgPVxuL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLy5leGVjKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrYVsxXSwgK2FbMl0gLSAxLCArYVszXSwgK2FbNF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgK2FbNV0sICthWzZdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICBUaGlzIGlzIGEgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uLiBZb3UgYXJlIGZyZWUgdG8gY29weSwgbW9kaWZ5LCBvclxuICAgIHJlZGlzdHJpYnV0ZS5cblxuICAgIFRoaXMgY29kZSBzaG91bGQgYmUgbWluaWZpZWQgYmVmb3JlIGRlcGxveW1lbnQuXG4gICAgU2VlIGh0dHA6Ly9qYXZhc2NyaXB0LmNyb2NrZm9yZC5jb20vanNtaW4uaHRtbFxuXG4gICAgVVNFIFlPVVIgT1dOIENPUFkuIElUIElTIEVYVFJFTUVMWSBVTldJU0UgVE8gTE9BRCBDT0RFIEZST00gU0VSVkVSUyBZT1UgRE9cbiAgICBOT1QgQ09OVFJPTC5cbiovXG5cbi8qanNsaW50IGZvciAqL1xuXG4vKnByb3BlcnR5XG4gICAgYXQsIGIsIGNhbGwsIGNoYXJBdCwgZiwgZnJvbUNoYXJDb2RlLCBoYXNPd25Qcm9wZXJ0eSwgbWVzc2FnZSwgbiwgbmFtZSxcbiAgICBwcm90b3R5cGUsIHB1c2gsIHIsIHQsIHRleHRcbiovXG5cbmV4cG9ydCBjb25zdCBwYXJzZSA9IChmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdGhhdCBjYW4gcGFyc2UgYSBKU09OIHRleHQsIHByb2R1Y2luZyBhIEphdmFTY3JpcHRcbi8vIGRhdGEgc3RydWN0dXJlLiBJdCBpcyBhIHNpbXBsZSwgcmVjdXJzaXZlIGRlc2NlbnQgcGFyc2VyLiBJdCBkb2VzIG5vdCB1c2Vcbi8vIGV2YWwgb3IgcmVndWxhciBleHByZXNzaW9ucywgc28gaXQgY2FuIGJlIHVzZWQgYXMgYSBtb2RlbCBmb3IgaW1wbGVtZW50aW5nXG4vLyBhIEpTT04gcGFyc2VyIGluIG90aGVyIGxhbmd1YWdlcy5cblxuLy8gV2UgYXJlIGRlZmluaW5nIHRoZSBmdW5jdGlvbiBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbiB0byBhdm9pZCBjcmVhdGluZ1xuLy8gZ2xvYmFsIHZhcmlhYmxlcy5cblxuICB2YXIgYXQ7ICAgICAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gIHZhciBjaDsgICAgIC8vIFRoZSBjdXJyZW50IGNoYXJhY3RlclxuICB2YXIgZXNjYXBlZSA9IHtcbiAgICAgIFwiXFxcIlwiOiBcIlxcXCJcIixcbiAgICAgIFwiXFxcXFwiOiBcIlxcXFxcIixcbiAgICAgIFwiL1wiOiBcIi9cIixcbiAgICAgIGI6IFwiXFxiXCIsXG4gICAgICBmOiBcIlxcZlwiLFxuICAgICAgbjogXCJcXG5cIixcbiAgICAgIHI6IFwiXFxyXCIsXG4gICAgICB0OiBcIlxcdFwiXG4gIH07XG4gIHZhciB0ZXh0O1xuXG4gIHZhciBlcnJvciA9IGZ1bmN0aW9uIChtKSB7XG5cbi8vIENhbGwgZXJyb3Igd2hlbiBzb21ldGhpbmcgaXMgd3JvbmcuXG5cbiAgICAgIHRocm93IHtcbiAgICAgICAgICBuYW1lOiBcIlN5bnRheEVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZTogbSxcbiAgICAgICAgICBhdDogYXQsXG4gICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgfTtcblxuICB2YXIgbmV4dCA9IGZ1bmN0aW9uIChjKSB7XG5cbi8vIElmIGEgYyBwYXJhbWV0ZXIgaXMgcHJvdmlkZWQsIHZlcmlmeSB0aGF0IGl0IG1hdGNoZXMgdGhlIGN1cnJlbnQgY2hhcmFjdGVyLlxuXG4gICAgICBpZiAoYyAmJiBjICE9PSBjaCkge1xuICAgICAgICAgIGVycm9yKFwiRXhwZWN0ZWQgJ1wiICsgYyArIFwiJyBpbnN0ZWFkIG9mICdcIiArIGNoICsgXCInXCIpO1xuICAgICAgfVxuXG4vLyBHZXQgdGhlIG5leHQgY2hhcmFjdGVyLiBXaGVuIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMsXG4vLyByZXR1cm4gdGhlIGVtcHR5IHN0cmluZy5cblxuICAgICAgY2ggPSB0ZXh0LmNoYXJBdChhdCk7XG4gICAgICBhdCArPSAxO1xuICAgICAgcmV0dXJuIGNoO1xuICB9O1xuXG4gIHZhciBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxuXG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YXIgc3RyaW5nID0gXCJcIjtcblxuICAgICAgaWYgKGNoID09PSBcIi1cIikge1xuICAgICAgICAgIHN0cmluZyA9IFwiLVwiO1xuICAgICAgICAgIG5leHQoXCItXCIpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGNoID49IFwiMFwiICYmIGNoIDw9IFwiOVwiKSB7XG4gICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaCA9PT0gXCIuXCIpIHtcbiAgICAgICAgICBzdHJpbmcgKz0gXCIuXCI7XG4gICAgICAgICAgd2hpbGUgKG5leHQoKSAmJiBjaCA+PSBcIjBcIiAmJiBjaCA8PSBcIjlcIikge1xuICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoID09PSBcImVcIiB8fCBjaCA9PT0gXCJFXCIpIHtcbiAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIGlmIChjaCA9PT0gXCItXCIgfHwgY2ggPT09IFwiK1wiKSB7XG4gICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoY2ggPj0gXCIwXCIgJiYgY2ggPD0gXCI5XCIpIHtcbiAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFsdWUgPSArc3RyaW5nO1xuICAgICAgaWYgKCFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgfTtcblxuICB2YXIgc3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhIHN0cmluZyB2YWx1ZS5cblxuICAgICAgdmFyIGhleDtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIHZhbHVlID0gXCJcIjtcbiAgICAgIHZhciB1ZmZmZjtcblxuLy8gV2hlbiBwYXJzaW5nIGZvciBzdHJpbmcgdmFsdWVzLCB3ZSBtdXN0IGxvb2sgZm9yIFwiIGFuZCBcXCBjaGFyYWN0ZXJzLlxuXG4gICAgICBpZiAoY2ggPT09IFwiXFxcIlwiKSB7XG4gICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xuICAgICAgICAgICAgICBpZiAoY2ggPT09IFwiXFxcIlwiKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGNoID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSBcInVcIikge1xuICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhleCA9IHBhcnNlSW50KG5leHQoKSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGhleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gdWZmZmYgKiAxNiArIGhleDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh1ZmZmZik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlc2NhcGVlW2NoXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGVzY2FwZWVbY2hdO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGNoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xuICB9O1xuXG4gIHZhciB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gU2tpcCB3aGl0ZXNwYWNlLlxuXG4gICAgICB3aGlsZSAoY2ggJiYgY2ggPD0gXCIgXCIpIHtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICB9XG4gIH07XG5cbiAgdmFyIHdvcmQgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIHRydWUsIGZhbHNlLCBvciBudWxsLlxuXG4gICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICBjYXNlIFwidFwiOlxuICAgICAgICAgIG5leHQoXCJ0XCIpO1xuICAgICAgICAgIG5leHQoXCJyXCIpO1xuICAgICAgICAgIG5leHQoXCJ1XCIpO1xuICAgICAgICAgIG5leHQoXCJlXCIpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSBcImZcIjpcbiAgICAgICAgICBuZXh0KFwiZlwiKTtcbiAgICAgICAgICBuZXh0KFwiYVwiKTtcbiAgICAgICAgICBuZXh0KFwibFwiKTtcbiAgICAgICAgICBuZXh0KFwic1wiKTtcbiAgICAgICAgICBuZXh0KFwiZVwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBjYXNlIFwiblwiOlxuICAgICAgICAgIG5leHQoXCJuXCIpO1xuICAgICAgICAgIG5leHQoXCJ1XCIpO1xuICAgICAgICAgIG5leHQoXCJsXCIpO1xuICAgICAgICAgIG5leHQoXCJsXCIpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZXJyb3IoXCJVbmV4cGVjdGVkICdcIiArIGNoICsgXCInXCIpO1xuICB9O1xuXG4gIHZhciB2YWx1ZTsgIC8vIFBsYWNlIGhvbGRlciBmb3IgdGhlIHZhbHVlIGZ1bmN0aW9uLlxuXG4gIHZhciBhcnJheSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUGFyc2UgYW4gYXJyYXkgdmFsdWUuXG5cbiAgICAgIHZhciBhcnIgPSBbXTtcblxuICAgICAgaWYgKGNoID09PSBcIltcIikge1xuICAgICAgICAgIG5leHQoXCJbXCIpO1xuICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgaWYgKGNoID09PSBcIl1cIikge1xuICAgICAgICAgICAgICBuZXh0KFwiXVwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGFycjsgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoY2gpIHtcbiAgICAgICAgICAgICAgYXJyLnB1c2godmFsdWUoKSk7XG4gICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgIGlmIChjaCA9PT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICAgIG5leHQoXCJdXCIpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXh0KFwiLFwiKTtcbiAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcbiAgfTtcblxuICB2YXIgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXG5cbiAgICAgIHZhciBrZXk7XG4gICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgIGlmIChjaCA9PT0gXCJ7XCIpIHtcbiAgICAgICAgICBuZXh0KFwie1wiKTtcbiAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgIGlmIChjaCA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgbmV4dChcIn1cIik7XG4gICAgICAgICAgICAgIHJldHVybiBvYmo7ICAgLy8gZW1wdHkgb2JqZWN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICBrZXkgPSBzdHJpbmcoKTtcbiAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgICAgbmV4dChcIjpcIik7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yKFwiRHVwbGljYXRlIGtleSAnXCIgKyBrZXkgKyBcIidcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZSgpO1xuICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICBpZiAoY2ggPT09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0KFwifVwiKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV4dChcIixcIik7XG4gICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXJyb3IoXCJCYWQgb2JqZWN0XCIpO1xuICB9O1xuXG4gIHZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhIEpTT04gdmFsdWUuIEl0IGNvdWxkIGJlIGFuIG9iamVjdCwgYW4gYXJyYXksIGEgc3RyaW5nLCBhIG51bWJlcixcbi8vIG9yIGEgd29yZC5cblxuICAgICAgd2hpdGUoKTtcbiAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgIGNhc2UgXCJ7XCI6XG4gICAgICAgICAgcmV0dXJuIG9iamVjdCgpO1xuICAgICAgY2FzZSBcIltcIjpcbiAgICAgICAgICByZXR1cm4gYXJyYXkoKTtcbiAgICAgIGNhc2UgXCJcXFwiXCI6XG4gICAgICAgICAgcmV0dXJuIHN0cmluZygpO1xuICAgICAgY2FzZSBcIi1cIjpcbiAgICAgICAgICByZXR1cm4gbnVtYmVyKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAoY2ggPj0gXCIwXCIgJiYgY2ggPD0gXCI5XCIpXG4gICAgICAgICAgICAgID8gbnVtYmVyKClcbiAgICAgICAgICAgICAgOiB3b3JkKCk7XG4gICAgICB9XG4gIH07XG5cbi8vIFJldHVybiB0aGUganNvbl9wYXJzZSBmdW5jdGlvbi4gSXQgd2lsbCBoYXZlIGFjY2VzcyB0byBhbGwgb2YgdGhlIGFib3ZlXG4vLyBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlcy5cblxuICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSwgcmV2aXZlcikge1xuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgdGV4dCA9IHNvdXJjZTtcbiAgICAgIGF0ID0gMDtcbiAgICAgIGNoID0gXCIgXCI7XG4gICAgICByZXN1bHQgPSB2YWx1ZSgpO1xuICAgICAgd2hpdGUoKTtcbiAgICAgIGlmIChjaCkge1xuICAgICAgICAgIGVycm9yKFwiU3ludGF4IGVycm9yXCIpO1xuICAgICAgfVxuXG4vLyBJZiB0aGVyZSBpcyBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsXG4vLyBwYXNzaW5nIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIHRoZSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZVxuLy8gdHJhbnNmb3JtYXRpb24sIHN0YXJ0aW5nIHdpdGggYSB0ZW1wb3Jhcnkgcm9vdCBvYmplY3QgdGhhdCBob2xkcyB0aGUgcmVzdWx0XG4vLyBpbiBhbiBlbXB0eSBrZXkuIElmIHRoZXJlIGlzIG5vdCBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHNpbXBseSByZXR1cm4gdGhlXG4vLyByZXN1bHQuXG5cbiAgICAgIHJldHVybiAodHlwZW9mIHJldml2ZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICA/IChmdW5jdGlvbiB3YWxrKGhvbGRlciwga2V5KSB7XG4gICAgICAgICAgICAgIHZhciBrO1xuICAgICAgICAgICAgICB2YXIgdjtcbiAgICAgICAgICAgICAgdmFyIHZhbCA9IGhvbGRlcltrZXldO1xuICAgICAgICAgICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgIGZvciAoayBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHdhbGsodmFsLCBrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsW2tdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWxba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIuY2FsbChob2xkZXIsIGtleSwgdmFsKTtcbiAgICAgICAgICB9KHtcIlwiOiByZXN1bHR9LCBcIlwiKSlcbiAgICAgICAgICA6IHJlc3VsdDtcbiAgfTtcbn0oKSk7XG4iLCAiW3RydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLFxudHJ1ZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSxudWxsLFxubnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsbnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxcbm51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLGZhbHNlLFxudHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsbnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsXG50cnVlLG51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLG51bGwsXG5udWxsLG51bGwsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSx0cnVlLFxubnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsbnVsbCxudWxsLHRydWUsZmFsc2UsZmFsc2UsXG50cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxcbnRydWUsbnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsbnVsbCxudWxsLHRydWUsZmFsc2UsbnVsbCxcbm51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsXG5udWxsLG51bGwsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSxmYWxzZSxcbnRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLFxudHJ1ZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxudWxsLG51bGwsdHJ1ZSxmYWxzZSxudWxsLFxubnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsbnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxcbm51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLGZhbHNlLFxubnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsbnVsbCxudWxsLHRydWUsZmFsc2UsdHJ1ZSxcbm51bGwsbnVsbCx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLG51bGwsbnVsbCx0cnVlLGZhbHNlLGZhbHNlXVxuIiwgIltcbiAgMTIzNDU2Nzg5Ljk4NzY1NDMyMTAxLFxuICAxMjMuNDU2Nzg5ODc2NTQzZSsxMjMsXG4gIDk4NzY1NDMyMTAxMjM0NTQ2Nzg5OCxcbiAgOTE4OTI3MzY0NTkxODI3MzY0NTEyLFxuICAxMjM0NTY3ODkuOTg3NjU0MzIxMDEsXG4gIDEyMy40NTY3ODk5ODc2NTQzZSsxMixcbiAgOTg3NjU0MzIxMjAxMjM0NTY3ODk4LFxuICA1NDMyMTAxMjM0NTY3ODk4NzY1NDMsXG4gIDEyMzQ1Njc4OTg3NjU0MzIxZS0xMCxcbiAgMTIzNDU2Nzg5Ljk4NzY1NDMyMTAxLFxuICAxMjMuNDU2Nzg5ODc2NTQzZSsxMjMsXG4gIDk4NzY1NDMyMTAxMjM0NTQ2Nzg5OCxcbiAgOTE4OTI3MzY0NTkxODI3MzY0NTEyLFxuICAxMjM0NTY3ODkuOTg3NjU0MzIxMDEsXG4gIDEyMy40NTY3ODk5ODc2NTQzZSsxMixcbiAgOTg3NjU0MzIxMjAxMjM0NTY3ODk4LFxuICA1NDMyMTAxMjM0NTY3ODk4NzY1NDMsXG4gIDEyMzQ1Njc4OTg3NjU0MzIxZS0xMCxcbiAgMTIzNDU2Nzg5Ljk4NzY1NDMyMTAxLFxuICAxMjMuNDU2Nzg5ODc2NTQzZSsxMjMsXG4gIDk4NzY1NDMyMTAxMjM0NTQ2Nzg5OCxcbiAgOTE4OTI3MzY0NTkxODI3MzY0NTEyLFxuICAxMjM0NTY3ODkuOTg3NjU0MzIxMDEsXG4gIDEyMy40NTY3ODk5ODc2NTQzZSsxMixcbiAgOTg3NjU0MzIxMjAxMjM0NTY3ODk4LFxuICA1NDMyMTAxMjM0NTY3ODk4NzY1NDMsXG4gIDEyMzQ1Njc4OTg3NjU0MzIxZS0xMCxcbiAgMTIzNDU2Nzg5Ljk4NzY1NDMyMTAxLFxuICAxMjMuNDU2Nzg5ODc2NTQzZSsxMjMsXG4gIDk4NzY1NDMyMTAxMjM0NTQ2Nzg5OCxcbiAgOTE4OTI3MzY0NTkxODI3MzY0NTEyLFxuICAxMjM0NTY3ODkuOTg3NjU0MzIxMDFcbl0iLCAiW1xuICBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIFV0IHZlbCBlc3QgY29uZGltZW50dW0sIGFsaXF1ZXQgcXVhbSBpZCwgZ3JhdmlkYSBtaS4gTnVsbGFtIG1heGltdXMgcmhvbmN1cyBleCwgaWQgc29sbGljaXR1ZGluIHNlbSBkYXBpYnVzIGF0LiBDdXJhYml0dXIgbm9uIGVyYXQgdmVsIHNlbSBldWlzbW9kIGRhcGlidXMgc2l0IGFtZXQgYXQgbmlzaS4gUHJvaW4gZ3JhdmlkYSBxdWFtIG5vbiBtYXNzYSBwdWx2aW5hciwgZXUgZGljdHVtIG1hc3NhIGlhY3VsaXMuIEZ1c2NlIHRlbXB1cyBmaW5pYnVzIGVmZmljaXR1ci4gRHVpcyBsYWNpbmlhIHRlbGx1cyBudWxsYSwgbmVjIGVsZWlmZW5kIHVybmEgcG9zdWVyZSBuZWMuIFByb2luIGVnZXQgZHVpIHNlbS4gTmFtIGp1c3RvIG9kaW8sIGRpZ25pc3NpbSBldSBudWxsYSBldSwgZXVpc21vZCBsb2JvcnRpcyBuZXF1ZS5cXG5cXG5GdXNjZSB2b2x1dHBhdCBmcmluZ2lsbGEgdHVycGlzIGV1IHBvcnRhLiBEb25lYyBsb3JlbSBuZXF1ZSwgbWF4aW11cyBldCB0ZW1wb3IgbmVjLCByaG9uY3VzIHNlZCBsaWd1bGEuIFN1c3BlbmRpc3NlIHBvdGVudGkuIENyYXMgZXQgbWFnbmEgc2l0IGFtZXQgZXJhdCBmcmluZ2lsbGEgZWxlbWVudHVtLiBOdW5jIHZ1bHB1dGF0ZSBub24gbWFnbmEgdmVsIHByZXRpdW0uIEludGVnZXIgYWMgcHVsdmluYXIgbWkuIFNlZCBxdWlzIGV4IG1ldHVzLlxcblxcbk51bGxhIGV1IHJpc3VzIHN1c2NpcGl0LCBzYWdpdHRpcyBkdWkgcnV0cnVtLCBvcm5hcmUgaXBzdW0uIEN1cmFiaXR1ciB1dCBxdWFtIGNvbW1vZG8sIHZ1bHB1dGF0ZSBhcmN1IHNlZCwgZGljdHVtIHB1cnVzLiBGdXNjZSBtb2xsaXMgZXQgYXJjdSBlZ2V0IGNvbW1vZG8uIE1hdXJpcyBldSB1bHRyaWNlcyBmZWxpcy4gUGhhc2VsbHVzIGVmZmljaXR1ciBvcmNpIGNvbnNlY3RldHVyIGVmZmljaXR1ciBzZW1wZXIuIER1aXMgcXVpcyBsb3JlbSBhY2N1bXNhbiwgaGVuZHJlcml0IG51bGxhIG5lYywgYWxpcXVhbSBudWxsYS4gQ3JhcyBsdWN0dXMgbGVvIHZpdGFlIGFudGUgYXVjdG9yLCBldCBtYWxlc3VhZGEgc2FwaWVuIGFsaXF1YW0uIFZpdmFtdXMgaW50ZXJkdW0sIHJpc3VzIG5lYyB0ZW1wb3IgY29uc2VjdGV0dXIsIHVybmEgZGlhbSB0ZW1wb3IgbGVjdHVzLCBhYyB0ZW1wdXMgdGVsbHVzIGV4IGluIG51bGxhLiBNYWVjZW5hcyB0aW5jaWR1bnQgdm9sdXRwYXQgZmVsaXMuIFN1c3BlbmRpc3NlIGN1cnN1cyBwZWxsZW50ZXNxdWUgbGFjaW5pYS4gU2VkIG5lYyBlbmltIGEgZXJvcyBjb25kaW1lbnR1bSBsdWN0dXMgYWMgZXQgcHVydXMuIFF1aXNxdWUgYXQgcXVhbSBtYXVyaXMuXFxuXFxuVmVzdGlidWx1bSBxdWlzIHRlbXBvciB0ZWxsdXMuIFN1c3BlbmRpc3NlIHBvc3VlcmUgYXVndWUgdG9ydG9yLCBldSB2aXZlcnJhIHZlbGl0IHVsbGFtY29ycGVyIG5lYy4gTnVsbGEgZmFjaWxpc2kuIER1aXMgbnVuYyBkaWFtLCBncmF2aWRhIGEgZGlnbmlzc2ltIHNlZCwgY29uZGltZW50dW0gaW4gbWFzc2EuIEN1cmFiaXR1ciBtb2xlc3RpZSBub24gZG9sb3IgYSBlZmZpY2l0dXIuIE51bGxhIHNpdCBhbWV0IHJpc3VzIGF0IGVyb3MgbGFjaW5pYSB0aW5jaWR1bnQgZWdldCBuZWMgZXJvcy4gQ3JhcyBhbGlxdWFtIGxpYmVybyBhIHNlbSBpYWN1bGlzIG1hdHRpcy4gQ3VyYWJpdHVyIHRlbXBvciBtb2xlc3RpZSBpcHN1bSwgZWdldCBtb2xsaXMgc2FwaWVuLiBTdXNwZW5kaXNzZSBwb3RlbnRpLiBQcm9pbiBpZCBmYWNpbGlzaXMgdHVycGlzLiBTdXNwZW5kaXNzZSBjb25kaW1lbnR1bSBuaXNpIGV1IHNlbSBncmF2aWRhIG1vbGxpcy4gQ3VyYWJpdHVyIHZlc3RpYnVsdW0gb2RpbyB2ZWwgcmhvbmN1cyBmZXJtZW50dW0uIE1hdXJpcyBvcm5hcmUgYXJjdSBldCBlc3QgcHJldGl1bSBtYXR0aXMuXFxuXFxuTW9yYmkgbWF4aW11cyBlcmF0IGxhY3VzLCBldCB2dWxwdXRhdGUgdXJuYSB0ZW1wb3IgdmVsLiBDdXJhYml0dXIgYmxhbmRpdCwgbmliaCBzaXQgYW1ldCBsYW9yZWV0IHN1c2NpcGl0LCBmZWxpcyBqdXN0byBsdWN0dXMgb3JjaSwgaWQgdWx0cmljaWVzIHJpc3VzIG51bGxhIHZpdGFlIGVuaW0uIERvbmVjIG5vbiB0ZWxsdXMgYXJjdS4gTnVuYyBhdWN0b3Igc2l0IGFtZXQgYXVndWUgZWdldCBkaWduaXNzaW0uIENsYXNzIGFwdGVudCB0YWNpdGkgc29jaW9zcXUgYWQgbGl0b3JhIHRvcnF1ZW50IHBlciBjb251YmlhIG5vc3RyYSwgcGVyIGluY2VwdG9zIGhpbWVuYWVvcy4gVXQgYXVjdG9yIGVzdCBldSBlc3QgcGVsbGVudGVzcXVlLCB2ZWwgZWxlaWZlbmQgZmVsaXMgcG9ydGEuIFNlZCBjdXJzdXMganVzdG8gbmVxdWUsIGVnZXQgdml2ZXJyYSBkb2xvciB2b2x1dHBhdCB2ZWwuIE1vcmJpIHZlbCBsZWN0dXMgaW50ZXJkdW0sIHNhZ2l0dGlzIHNhcGllbiB2aXRhZSwgcnV0cnVtIG9kaW8uIFByYWVzZW50IGV1IGdyYXZpZGEgdXJuYSwgc2l0IGFtZXQgdm9sdXRwYXQgbWkuIFBlbGxlbnRlc3F1ZSBldWlzbW9kIGVuaW0gZXN0LCBpZCB0aW5jaWR1bnQgbWFzc2Egc3VzY2lwaXQgc2l0IGFtZXQuXFxuXFxuQWxpcXVhbSBjdXJzdXMsIGp1c3RvIHZpdGFlIHNlbXBlciB2YXJpdXMsIGxvcmVtIGVuaW0gcmhvbmN1cyByaXN1cywgc2l0IGFtZXQgaWFjdWxpcyBtYWduYSB0b3J0b3IgYWMgbWV0dXMuIEFsaXF1YW0gYWNjdW1zYW4gdG9ydG9yIHZlbCB2ZWxpdCB2b2x1dHBhdCBtb2xlc3RpZS4gU2VkIGRhcGlidXMgb2RpbyBhYyBqdXN0byBwb3J0dGl0b3Igc2NlbGVyaXNxdWUuIERvbmVjIGlkIG5pc2wganVzdG8uIEluIG5vbiB0dXJwaXMgbG9yZW0uIFZlc3RpYnVsdW0gZmVybWVudHVtIHN1c2NpcGl0IGZldWdpYXQuIE1vcmJpIGJsYW5kaXQgbW9sbGlzIGVnZXN0YXMuIFByb2luIGVnZXQgdnVscHV0YXRlIGp1c3RvLiBTdXNwZW5kaXNzZSBwb3RlbnRpLiBTdXNwZW5kaXNzZSBldSBlbmltIHF1aXMgb2RpbyBpYWN1bGlzIHBlbGxlbnRlc3F1ZS4gU3VzcGVuZGlzc2UgcG90ZW50aS4gTW9yYmkgbWF4aW11cyB0dXJwaXMgc2NlbGVyaXNxdWUsIHByZXRpdW0gdXJuYSBpZCwgdmVoaWN1bGEgc2FwaWVuLiBQaGFzZWxsdXMgdmVsIGR1aSBtYXVyaXMuIEV0aWFtIGVnZXQgbW9sZXN0aWUgbnVuYywgYSBmcmluZ2lsbGEgbmVxdWUuIER1aXMgcXVpcyBhdWd1ZSBldCBvZGlvIHRlbXBvciBtb2xlc3RpZS5cXG5cXG5JbnRlZ2VyIGF0IGVyYXQgdXQgbWFnbmEgdml2ZXJyYSBmcmluZ2lsbGEuIFZpdmFtdXMgYXQgbmliaCBpbiBsYWN1cyBzYWdpdHRpcyBibGFuZGl0LiBFdGlhbSB2aXRhZSBtYWxlc3VhZGEgZHVpLiBEdWlzIG5lYyBxdWFtIHZ1bHB1dGF0ZSwgdGVtcG9yIG1hZ25hIG1hbGVzdWFkYSwgdGVtcG9yIG5pc2wuIENyYXMgcHVsdmluYXIgdGluY2lkdW50IHNhZ2l0dGlzLiBQZWxsZW50ZXNxdWUgaWQgc2FwaWVuIHNlZCBxdWFtIHZ1bHB1dGF0ZSB2ZWhpY3VsYS4gTnVsbGEgaGVuZHJlcml0IGxlbyBldSBmZWxpcyB0ZW1wb3IsIGluIHBlbGxlbnRlc3F1ZSBsYWN1cyB1bHRyaWNpZXMuIFZlc3RpYnVsdW0gZXQgdG9ydG9yIGV1IGZlbGlzIGVsZWlmZW5kIGV1aXNtb2QgYWMgdXQgbWkuIFByb2luIGVmZmljaXR1ciBtYXhpbXVzIGRpYW0sIGluIGVnZXN0YXMgc2FwaWVuLiBVdCBsdWN0dXMgdGluY2lkdW50IG5lcXVlLCBhYyBhbGlxdWFtIHB1cnVzIGxhY2luaWEgZWZmaWNpdHVyLiBNYWVjZW5hcyB2YXJpdXMgZGlhbSBpbiBibGFuZGl0IGZhY2lsaXNpcy5cXG5cXG5WaXZhbXVzIHNlZCBvZGlvIHF1aXMgbG9yZW0gbGFvcmVldCB1bHRyaWNlcy4gTmFtIG1vbGxpcyBpcHN1bSBpbiBmcmluZ2lsbGEgdnVscHV0YXRlLiBWZXN0aWJ1bHVtIG5vbiBkb2xvciBjb25ndWUsIGNvbmd1ZSBlbmltIGluLCBmaW5pYnVzIGV4LiBQZWxsZW50ZXNxdWUgcXVpcyBldWlzbW9kIG5lcXVlLCBzZWQgZmVybWVudHVtIGR1aS4gTW9yYmkgaW1wZXJkaWV0IG5pYmggYSB0ZWxsdXMgcnV0cnVtLCBzZWQgcnV0cnVtIG51bGxhIGx1Y3R1cy4gQWVuZWFuIGV1IGNvbmRpbWVudHVtIG1hZ25hLCB2aXRhZSBlbGVtZW50dW0gYXVndWUuIE1hZWNlbmFzIHF1aXMgbWV0dXMgZWdldCBsZWN0dXMgYXVjdG9yIGVnZXN0YXMuIFZlc3RpYnVsdW0gc29kYWxlcywgbmVxdWUgZWdldCBhbGlxdWFtIG5hbS5cIixcbiAgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBRdWlzcXVlIHV0IG5pYmggYXQgYXVndWUgZmV1Z2lhdCBzZW1wZXIuIEFsaXF1YW0gc29sbGljaXR1ZGluIHNhcGllbiByaXN1cywgbmVjIGRpY3R1bSBhbnRlIHBvcnRhIGV1LiBDcmFzIHZlbCB0b3J0b3IgdmVsIHNhcGllbiBhbGlxdWFtIGJsYW5kaXQgdmVsIGV1IG9yY2kuIEFlbmVhbiBzaXQgYW1ldCBtZXR1cyBlbGVtZW50dW0sIGVmZmljaXR1ciBmZWxpcyBxdWlzLCBjb25kaW1lbnR1bSBkb2xvci4gU3VzcGVuZGlzc2UgcG90ZW50aS4gRG9uZWMgb3JuYXJlLCB0dXJwaXMgc2VkIG9ybmFyZSBlbGVpZmVuZCwgYXJjdSBhdWd1ZSB0ZW1wdXMgaXBzdW0sIGVnZXQgbHVjdHVzIHF1YW0gYXVndWUgZWdldCB0ZWxsdXMuIEFlbmVhbiB2ZWhpY3VsYSBuaWJoIGZlbGlzLCB2ZWwgcG9zdWVyZSBsb3JlbSB2ZWhpY3VsYSB2aXRhZS4gRHVpcyBpbXBlcmRpZXQgbHVjdHVzIGRvbG9yIHZlbCBmYXVjaWJ1cy5cXG5cXG5FdGlhbSBpZCB0ZWxsdXMgZWxlbWVudHVtLCB0ZW1wb3IgZG9sb3IgbmVjLCBzb2RhbGVzIG51bmMuIFF1aXNxdWUgYXQgcXVhbSBwaGFyZXRyYSwgaW1wZXJkaWV0IG1hdXJpcyBsb2JvcnRpcywgaGVuZHJlcml0IHNhcGllbi4gQ3JhcyBzdXNjaXBpdCBtYWduYSBxdWlzIGxhY2luaWEgbW9sZXN0aWUuIEluIHVsbGFtY29ycGVyIHBvc3VlcmUgcG9zdWVyZS4gUHJhZXNlbnQgdml0YWUgdHJpc3RpcXVlIGxvcmVtLiBEb25lYyBwbGFjZXJhdCBsZW8gbmVjIHRlbGx1cyB2ZWhpY3VsYSwgdml0YWUgdWx0cmljZXMgaXBzdW0gY3Vyc3VzLiBEdWlzIGludGVyZHVtIHRyaXN0aXF1ZSBvZGlvIG5vbiB1bHRyaWNlcy4gQWVuZWFuIGluIGZyaW5naWxsYSBwdXJ1cy4gTWFlY2VuYXMgcG9zdWVyZSBmYXVjaWJ1cyBsZWN0dXMsIGF0IG1hdHRpcyBhdWd1ZSB2dWxwdXRhdGUgc29sbGljaXR1ZGluLiBPcmNpIHZhcml1cyBuYXRvcXVlIHBlbmF0aWJ1cyBldCBtYWduaXMgZGlzIHBhcnR1cmllbnQgbW9udGVzLCBuYXNjZXR1ciByaWRpY3VsdXMgbXVzLiBNb3JiaSBzY2VsZXJpc3F1ZSBuZXF1ZSBub24gcHVydXMgdHJpc3RpcXVlLCBpZCBzb2xsaWNpdHVkaW4gZmVsaXMgc29sbGljaXR1ZGluLiBVdCB2ZWwgZmluaWJ1cyBsb3JlbS4gQWxpcXVhbSBpZCB0ZW1wdXMgZHVpLiBNb3JiaSB0ZW1wdXMgZmluaWJ1cyBkaWN0dW0uIE51bGxhbSBldSBxdWFtIGFjIGxlbyBmYXVjaWJ1cyBjb252YWxsaXMuXFxuXFxuVmVzdGlidWx1bSBwb3N1ZXJlIG9kaW8gYXVndWUsIHF1aXMgZGljdHVtIGVyYXQgdml2ZXJyYSBlbGVtZW50dW0uIENyYXMgbWF0dGlzIGR1aSB2aXRhZSBsb3JlbSBwaGFyZXRyYSwgYWMgbWF0dGlzIGF1Z3VlIGVnZXN0YXMuIE1vcmJpIHRpbmNpZHVudCBjb25zZXF1YXQgbnVuYywgYWMgYWxpcXVhbSBpcHN1bSBzZW1wZXIgaW4uIFNlZCBoZW5kcmVyaXQsIGRpYW0gc2VkIGZhY2lsaXNpcyB1bHRyaWNlcywgaXBzdW0gZW5pbSBwbGFjZXJhdCBkb2xvciwgdml0YWUgZWdlc3RhcyBudW5jIHB1cnVzIGlkIHVybmEuIEFsaXF1YW0gbmVxdWUgZXgsIGJsYW5kaXQgZXQgc2VtIHZlbCwgZmVybWVudHVtIGx1Y3R1cyBudWxsYS4gQ2xhc3MgYXB0ZW50IHRhY2l0aSBzb2Npb3NxdSBhZCBsaXRvcmEgdG9ycXVlbnQgcGVyIGNvbnViaWEgbm9zdHJhLCBwZXIgaW5jZXB0b3MgaGltZW5hZW9zLiBDcmFzIGRpY3R1bSwgbGlndWxhIHNlZCBjdXJzdXMgcHJldGl1bSwgdG9ydG9yIHR1cnBpcyBhdWN0b3Igc2VtLCBxdWlzIHBvcnRhIG9yY2kgbWV0dXMgbmVjIG51bmMuIFBoYXNlbGx1cyB2ZXN0aWJ1bHVtIGRvbG9yIHNpdCBhbWV0IG5pc2wgY29uZGltZW50dW0sIG5lYyBncmF2aWRhIGFudGUgbW9sbGlzLlxcblxcblBoYXNlbGx1cyB2ZWwgdGVsbHVzIGZldWdpYXQsIHBvc3VlcmUganVzdG8gZXQsIG1vbGVzdGllIG5pc2kuIFByb2luIGRpZ25pc3NpbSBsYWN1cyBhdCB1cm5hIHRyaXN0aXF1ZSBjb25kaW1lbnR1bSBldCBpbiBwdXJ1cy4gRXRpYW0gc2FwaWVuIGRpYW0sIHNhZ2l0dGlzIGV1IG5pc2kgZXUgdGVsbHVzLlwiLFxuICBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIEV0aWFtIGFjY3Vtc2FuIG5pYmggaW4gdmVzdGlidWx1bSB0aW5jaWR1bnQuIFZpdmFtdXMgZGljdHVtIHB1bHZpbmFyIHZlbGl0IHVsdHJpY2VzIGFsaXF1YW0uIEFsaXF1YW0gdGVtcG9yIGVzdCBvcmNpLCBhYyBwcmV0aXVtIG5pc2wgcmhvbmN1cyBzaXQgYW1ldC4gTnVuYyBub24gbmVxdWUgcHVsdmluYXIgcmlzdXMgaWFjdWxpcyBhdWN0b3IuIFByYWVzZW50IHByZXRpdW0gc3VzY2lwaXQgbmlzbCBpZCBwZWxsZW50ZXNxdWUuIE5hbSBvcmNpIGF1Z3VlLCB0ZW1wdXMgc2l0IGFtZXQgc2NlbGVyaXNxdWUgcXVpcywgaWFjdWxpcyBzaXQgYW1ldCB1cm5hLiBQcm9pbiBqdXN0byBhdWd1ZSwgZnJpbmdpbGxhIHV0IHVybmEgdHJpc3RpcXVlLCBlbGVtZW50dW0gZmF1Y2lidXMgZG9sb3IuIFNlZCBudWxsYSBqdXN0bywgdGVtcHVzIHZlbCBhdWN0b3IgbmVjLCBmYWNpbGlzaXMgb3JuYXJlIGFudGUuIEludGVnZXIgYXVjdG9yIGxhb3JlZXQgbnVsbGEgdXQgY29uZGltZW50dW0uIE1hZWNlbmFzIGluIHRpbmNpZHVudCBxdWFtLCBhIHNvZGFsZXMgc2FwaWVuLiBBbGlxdWFtIHZlc3RpYnVsdW0gZGFwaWJ1cyBtYXNzYSwgdWx0cmljZXMgc3VzY2lwaXQgbGFjdXMgaWFjdWxpcyB2aXRhZS4gVmVzdGlidWx1bSBsaWJlcm8gbmlzaSwgdnVscHV0YXRlIGFjIHJpc3VzIHNlZCwgY29uZ3VlIGNvbnZhbGxpcyBlcmF0LiBJbnRlZ2VyIGhlbmRyZXJpdCBtYXR0aXMgbWkgdmVsIHZvbHV0cGF0LiBBZW5lYW4gaWQgZWdlc3RhcyBlbmltLlxcblxcblZpdmFtdXMgZXUgYXVjdG9yIHRvcnRvciwgZXQgdmVzdGlidWx1bSBlc3QuIFF1aXNxdWUgcHVydXMgYW50ZSwgdmVuZW5hdGlzIGV1IHBlbGxlbnRlc3F1ZSBlZ2V0LCBlZ2VzdGFzIGV1IGFyY3UuIFN1c3BlbmRpc3NlIHZpdmVycmEgbWV0dXMgdml0YWUgYW50ZSB0ZW1wdXMgbWFsZXN1YWRhLiBOYW0gZWdldCBtYWduYSBtYXVyaXMuIFV0IGludGVyZHVtIGxpZ3VsYS5cIlxuXSIsICJbXG5cdDAsMSwyLDMsNCw1LDYsNyw4LDksXG5cdDEuMSwyLjIsMy4zLDQuNCw1LjUsXG5cdC0xMCwtMTEsLTEyLC0xMywtMTQsLTE1LFxuXHQxNiwxNywxOCwxOSwyMCxcblx0MTAwLDIwMCwzMDAsNDAwLDUwMCw2MDAsNzAwLDgwMCw5MDAsMTAwMCxcblx0MjIzNSwzNDU2LDQ1NjcsNTY3OCw2Nzg5LFxuXHQwLDEsMiwzLDQsNSw2LDcsOCw5LFxuXHQxLjEsMi4yLDMuMyw0LjQsNS41LFxuXHQtMTAsLTExLC0xMiwtMTMsLTE0LC0xNSxcblx0MTYsMTcsMTgsMTksMjAsXG5cdDEwMCwyMDAsMzAwLDQwMCw1MDAsNjAwLDcwMCw4MDAsOTAwLDEwMDAsXG5cdDIyMzUsMzQ1Niw0NTY3LDU2NzgsNjc4OVxuXSIsICJ7XCJMb3JlbVwiOlwiaXBzdW1cIixcImRvbG9yMVwiOlwic2l0XCIsXCJhbWV0MVwiOlwiY29uc2VjdGV0dXJcIixcImFkaXBpc2NpbmdcIjpcImVsaXRcIixcIkV0aWFtXCI6XCJhY2N1bXNhblwiLFwibmliaFwiOlwiaW5cIixcInZlc3RpYnVsdW0xXCI6XCJ0aW5jaWR1bnRcIixcIlZpdmFtdXNcIjpcImRpY3R1bVwiLFwicHVsdmluYXJcIjpcInZlbGl0XCIsXCJ1bHRyaWNlczFcIjpcImFsaXF1YW1cIixcIkFsaXF1YW0xXCI6XCJ0ZW1wb3JcIixcImVzdFwiOlwib3JjaVwiLFwiYWNcIjpcInByZXRpdW1cIixcIm5pc2wxXCI6XCJyaG9uY3VzXCIsXCJzaXQxXCI6XCJhbWV0XCIsXCJOdW5jXCI6XCJub25cIixcIm5lcXVlXCI6XCJwdWx2aW5hclwiLFwicmlzdXMxXCI6XCJpYWN1bGlzXCIsXCJhdWN0b3IxXCI6XCJQcmFlc2VudFwiLFwicHJldGl1bVwiOlwic3VzY2lwaXRcIixcIm5pc2xcIjpcImlkXCIsXCJwZWxsZW50ZXNxdWVcIjpcIk5hbVwiLFwib3JjaVwiOlwiYXVndWVcIixcInRlbXB1czFcIjpcInNpdFwiLFwiYW1ldFwiOlwic2NlbGVyaXNxdWVcIixcInF1aXNcIjpcImlhY3VsaXNcIixcInNpdFwiOlwiYW1ldFwiLFwidXJuYTFcIjpcIlByb2luXCIsXCJqdXN0b1wiOlwiYXVndWVcIixcImZyaW5naWxsYVwiOlwidXRcIixcInVybmFcIjpcInRyaXN0aXF1ZVwiLFwiZWxlbWVudHVtXCI6XCJmYXVjaWJ1c1wiLFwiZG9sb3JcIjpcIlNlZFwiLFwibnVsbGExXCI6XCJqdXN0b1wiLFwidGVtcHVzXCI6XCJ2ZWxcIixcImF1Y3RvcjJcIjpcIm5lY1wiLFwiZmFjaWxpc2lzXCI6XCJvcm5hcmVcIixcImFudGUxXCI6XCJJbnRlZ2VyXCIsXCJhdWN0b3JcIjpcImxhb3JlZXRcIixcIm51bGxhXCI6XCJ1dFwiLFwiY29uZGltZW50dW1cIjpcIk1hZWNlbmFzXCIsXCJpblwiOlwidGluY2lkdW50XCIsXCJxdWFtXCI6XCJhXCIsXCJzb2RhbGVzXCI6XCJzYXBpZW5cIixcIkFsaXF1YW1cIjpcInZlc3RpYnVsdW1cIixcImRhcGlidXNcIjpcIm1hc3NhXCIsXCJ1bHRyaWNlc1wiOlwic3VzY2lwaXRcIixcImxhY3VzXCI6XCJpYWN1bGlzXCIsXCJ2aXRhZVwiOlwiVmVzdGlidWx1bVwiLFwibGliZXJvXCI6XCJuaXNpXCIsXCJ2dWxwdXRhdGVcIjpcImFjXCIsXCJyaXN1c1wiOlwic2VkXCIsXCJjb25ndWVcIjpcImNvbnZhbGxpc1wiLFwiZXJhdFwiOlwiSW50ZWdlclwiLFwiaGVuZHJlcml0XCI6XCJtYXR0aXNcIixcIm1pXCI6XCJ2ZWxcIixcInZvbHV0cGF0XCI6XCJBZW5lYW5cIixcImlkXCI6XCJlZ2VzdGFzXCIsXCJlbmltXCI6XCJWaXZhbXVzXCIsXCJldTFcIjpcImF1Y3RvclwiLFwidG9ydG9yXCI6XCJldFwiLFwidmVzdGlidWx1bVwiOlwiZXN0XCIsXCJRdWlzcXVlXCI6XCJwdXJ1c1wiLFwiYW50ZTJcIjpcInZlbmVuYXRpc1wiLFwiZXUyXCI6XCJwZWxsZW50ZXNxdWVcIixcImVnZXQxXCI6XCJlZ2VzdGFzXCIsXCJldVwiOlwiYXJjdVwiLFwiU3VzcGVuZGlzc2VcIjpcInZpdmVycmFcIixcIm1ldHVzXCI6XCJ2aXRhZVwiLFwiYW50ZVwiOlwidGVtcHVzXCIsXCJtYWxlc3VhZGFcIjpcIk5hbVwiLFwiZWdldFwiOlwibWFnbmFcIixcIm1hdXJpc1wiOlwiVXRcIixcImludGVyZHVtXCI6XCJsaWd1bGFcIn0iLCAiXCJcXHUwM0IxXFxuXFx1MDNCMlxcblxcdTAzQjNcXG5cXHUwM0I0XFxuXFx1MDNCNVxcblxcdTAzQjZcXG5cXHUwM0I3XFxuXFx1MDNCOFxcblxcdTAzQjlcXG5cXHUwM0JBXFxuXFx1MDNCQlxcblxcdTAzQkNcXG5cXHUwM0JEXFxuXFx1MDNCRVxcblxcdTAzQkZcXG5cXHUwM0MwXFxuXFx1MDNDMVxcblxcdTAzQzNcXG5cXHUwM0M0XFxuXFx1MDNDNVxcblxcdTAzQzZcXG5cXHUwM0M3XFxuXFx1MDNDOFxcblxcdTAzQzlcXG5cXHUwMzkxXFxuXFx1MDM5MlxcblxcdTAzOTNcXG5cXHUwMzk0XFxuXFx1MDM5NVxcblxcdTAzOTZcXG5cXHUwMzk3XFxuXFx1MDM5OFxcblxcdTAzOTlcXG5cXHUwMzlBXFxuXFx1MDM5QlxcblxcdTAzOUNcXG5cXHUwMzlEXFxuXFx1MDM5RVxcblxcdTAzOUZcXG5cXHUwM0EwXFxuXFx1MDNBMVxcblxcdTAzQTNcXG5cXHUwM0E0XFxuXFx1MDNBNVxcblxcdTAzQTZcXG5cXHUwM0E3XFxuXFx1MDNBOFxcblxcdTAzQTlcXG5cIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLGVBQVMsTUFBTSxLQUFLLEtBQUssT0FBTyxVQUFVLE1BQU0sS0FBSztBQUNwRCxlQUFPLEVBQUMsS0FBVSxLQUFVLE9BQWMsVUFBb0IsTUFBWSxLQUFVLFNBQVMsUUFBVyxPQUFPLFFBQVcsUUFBUSxRQUFXLFVBQVUsT0FBUztBQUFBLE1BQ2pLO0FBRlM7QUFHVCxZQUFNLFlBQVksU0FBUyxNQUFNO0FBQ2hDLFlBQUksTUFBTSxRQUFRLElBQUk7QUFBRyxpQkFBTyxNQUFNLEtBQUssUUFBVyxRQUFXLE1BQU0sa0JBQWtCLElBQUksR0FBRyxRQUFXLE1BQVM7QUFDcEgsWUFBSSxRQUFRLFFBQVEsT0FBTyxTQUFTO0FBQVcsaUJBQU87QUFDdEQsWUFBSSxPQUFPLFNBQVM7QUFBVSxpQkFBTztBQUNyQyxlQUFPLE1BQU0sS0FBSyxRQUFXLFFBQVcsT0FBTyxJQUFJLEdBQUcsUUFBVyxNQUFTO0FBQUEsTUFDM0U7QUFDQSxZQUFNLG9CQUFvQixTQUFTLE9BQU87QUFDekMsWUFBSSxXQUFXLENBQUM7QUFDaEIsWUFBSSxNQUFNLFFBQVE7QUFDakIsY0FBSSxV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QUFBSixVQUFNO0FBQU4sVUFBUTtBQUFSLFVBQVU7QUFBVixVQUFZO0FBQUUsVUFBTSxJQUFFO0FBQVIsVUFBb0MsSUFBRTtBQUF0QyxVQUF5RyxJQUFFO0FBQTNHLFVBQThHLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUUsR0FBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQSxHQUMzMkIsR0FBRSxHQUFFLEdBQUUsTUFBSyxHQUFFLEdBQUc7QUFEaWdCLFVBQy9mLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxLQUFLO0FBRDZOLFVBQzNOLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxJQUFJO0FBRGpELFVBQ21ELElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFHO0FBRHZTLFVBQ3lTLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFF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LElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQ3RFO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUMxRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUNyRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUNyRTtBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUNyRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFDMUU7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFDckU7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFDckU7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFDckU7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQzFFO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQ3JFO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQ3JFO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQ3JFO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUMxRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUNyRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUNyRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUNyRTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxFQUFLOzs7QUNqQjFFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGOzs7QUNqQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGOzs7QUNKQTtBQUFBLElBQ0M7QUFBQSxJQUFFO0FBQUEsSUFBRTtBQUFBLElBQUU7QUFBQSxJQUFFO0FBQUEsSUFBRTtBQUFBLElBQUU7QUFBQSxJQUFFO0FBQUEsSUFBRTtBQUFBLElBQUU7QUFBQSxJQUNsQjtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFDcEI7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFDWjtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQ3BDO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQ3BCO0FBQUEsSUFBRTtBQUFBLElBQUU7QUFBQSxJQUFFO0FBQUEsSUFBRTtBQUFBLElBQUU7QUFBQSxJQUFFO0FBQUEsSUFBRTtBQUFBLElBQUU7QUFBQSxJQUFFO0FBQUEsSUFDbEI7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQ3BCO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQ1o7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUNwQztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxFQUNyQjs7O0FDYkEsdUNBQUMsT0FBUSxTQUFRLFFBQVMsT0FBTSxPQUFRLGVBQWMsWUFBYSxRQUFPLE9BQVEsWUFBVyxNQUFPLE1BQUssYUFBYyxhQUFZLFNBQVUsVUFBUyxVQUFXLFNBQVEsV0FBWSxXQUFVLFVBQVcsVUFBUyxLQUFNLFFBQU8sSUFBSyxXQUFVLE9BQVEsV0FBVSxNQUFPLFFBQU8sTUFBTyxPQUFNLE9BQVEsWUFBVyxRQUFTLFdBQVUsU0FBVSxZQUFXLFNBQVUsWUFBVyxNQUFPLE1BQUssY0FBZSxPQUFNLE1BQU8sU0FBUSxTQUFVLE9BQU0sTUFBTyxlQUFjLE1BQU8sV0FBVSxLQUFNLFFBQU8sT0FBUSxTQUFRLE9BQVEsU0FBUSxXQUFZLE1BQUssTUFBTyxhQUFZLFdBQVksWUFBVyxPQUFRLE9BQU0sUUFBUyxTQUFRLFFBQVMsT0FBTSxTQUFVLE9BQU0sV0FBWSxVQUFTLE9BQVEsV0FBVSxRQUFTLFdBQVUsT0FBUSxNQUFLLGFBQWMsWUFBVyxJQUFLLGFBQVksTUFBTyxLQUFJLFNBQVUsVUFBUyxTQUFVLGNBQWEsU0FBVSxTQUFRLFVBQVcsWUFBVyxPQUFRLFdBQVUsT0FBUSxjQUFhLFFBQVMsUUFBTyxXQUFZLE1BQUssT0FBUSxPQUFNLFFBQVMsYUFBWSxNQUFPLFdBQVUsV0FBWSxVQUFTLElBQUssT0FBTSxVQUFXLFVBQVMsSUFBSyxXQUFVLE1BQU8sV0FBVSxLQUFNLFVBQVMsUUFBUyxNQUFLLFlBQWEsT0FBTSxTQUFVLFNBQVEsT0FBUSxhQUFZLEtBQU0sZ0JBQWUsT0FBUSxXQUFVLElBQUssUUFBTyxhQUFjLFdBQVUsT0FBUSxTQUFRLE1BQU8sVUFBUyxXQUFZLE9BQU0sTUFBTyxTQUFRLFFBQVMsTUFBSyxVQUFXLFNBQVE7OztBQ0F6eEM7OztBZGdCQSxNQUFNLFlBQVksS0FBSyxVQUFVLEVBQUUsbUNBQVUseUNBQWEseUNBQWEsMkNBQWMsNENBQWMsc0NBQWMsQ0FBQztBQUVsSCxXQUFTLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBcUI7QUFDOUMsV0FBTyxJQUFJLEtBQ1IsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLGNBQ3BCLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSTtBQUFBLEVBQ3pCO0FBSlM7QUFNVCxpQkFBZSxVQUFVLElBQWlCLEtBQW9CLE9BQWlCO0FBQzdFLFFBQUk7QUFDSixRQUFJRTtBQUNKLFFBQUk7QUFDSixRQUFJO0FBQ0osUUFBSTtBQUNKLFFBQUk7QUFFSixhQUFTLFFBQVE7QUFDZixhQUFPQSxVQUFTLFFBQVEsVUFBVTtBQUNsQyxjQUFRLE1BQU0sTUFBTSxDQUFDO0FBQ3JCLGNBQVEsTUFBTSxNQUFNLENBQUM7QUFBQSxJQUN2QjtBQUpTO0FBS1QsVUFBTTtBQUVOLG1CQUFBQyxRQUFFLE1BQU0sSUFBSTtBQUFBLE1BQ1YsTUFBTSxVQUFNLGVBQUFBO0FBQUEsUUFBRTtBQUFBLFlBQ1osZUFBQUEsU0FBRSxVQUFVLEtBQUs7QUFBQSxZQUNqQixlQUFBQSxTQUFFLFVBQVUsS0FBSztBQUFBLFFBQ2pCLGNBQ0UsZUFBQUEsU0FBRSxhQUFTLGVBQUFBLFNBQUUsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsSUFDckM7QUFBQSxjQUNFLGVBQUFBLFNBQUUsdUJBQW1CLGVBQUFBLFNBQUUsbUJBQW1CO0FBQUEsWUFDeEMsT0FBTyxFQUFFLE9BQU8sT0FBTyxTQUFTRCxVQUFTLFFBQVFBLFVBQVMsS0FBSyxJQUFJO0FBQUEsVUFDckUsQ0FBQyxDQUFDO0FBQUEsY0FDRixlQUFBQyxTQUFFLFdBQVcsR0FBRyxTQUFTLFlBQU9ELFdBQVUsaUJBQVk7QUFBQSxjQUN0RCxlQUFBQyxTQUFFLFNBQVMsR0FBRyxRQUFRLHFCQUFnQjtBQUFBLFFBQ3hDO0FBQUEsWUFDRixlQUFBQSxTQUFFLFVBQVU7QUFBQSxVQUNWLFVBQVUsU0FBU0QsV0FBVSxRQUFRQTtBQUFBLFVBQ3JDLFNBQVMsTUFBTTtBQUNiLGtCQUFNO0FBQ04sMkJBQUFDLFFBQUUsT0FBTztBQUVUO0FBQUEsY0FDRTtBQUFBLGNBQ0EsQ0FBQyxTQUFTLFdBQVcsYUFBYTtBQUNoQyx1QkFBTztBQUNQLGdCQUFBRCxVQUFTO0FBQ1Qsd0JBQVE7QUFDUiwrQkFBQUMsUUFBRSxPQUFPO0FBQUEsY0FDWDtBQUFBLFlBQ0YsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sTUFBTTtBQUN0QyxvQkFBTSxNQUFNLFVBQVUsS0FBSztBQUMzQix3QkFBVSx3QkFBd0IsbUJBQW1CLEdBQUc7QUFDeEQsdUJBQVMsUUFDUCxLQUFNLE9BQU8sOEJBQ1gsYUFBYSxPQUEyQixLQUN4QyxTQUFTLFVBQVUsRUFBRyxZQUFZLENBQUM7QUFDdkMsNkJBQUFBLFFBQUUsT0FBTztBQUFBLFlBQ1gsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGLEdBQUcsU0FBU0QsV0FBVSxRQUFRQSxVQUFTLHFCQUFnQixhQUFhLE9BQU8sV0FBVyxHQUFHO0FBQUEsTUFDM0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBdkRlO0FBeURmLGlCQUFlLE9BQU87QUFDcEI7QUFBQSxNQUNFLFNBQVMsY0FBYyxXQUFXO0FBQUEsTUFDbEM7QUFBQSxRQUNFLE1BQU0sTUFBYSxTQUFTO0FBQUEsUUFDNUIsTUFBTUUsT0FBZ0IsU0FBUztBQUFBLE1BQ2pDO0FBQUEsTUFDQSxDQUFDLHFCQUFxQixxQkFBcUI7QUFBQSxJQUM3QztBQUVBO0FBQUEsTUFDRSxTQUFTLGNBQWMsV0FBVztBQUFBLE1BQ2xDO0FBQUEsUUFDRSxNQUFNLE1BQWEsU0FBUztBQUFBLFFBQzVCLE1BQU1BLE9BQXdCLFNBQVM7QUFBQSxNQUN6QztBQUFBLE1BQ0EsQ0FBQyxxQkFBcUIscUJBQXFCO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBbEJlO0FBb0JmLFNBQU8saUJBQWlCLFFBQVEsSUFBSTsiLAogICJuYW1lcyI6IFsicmVxdWlyZV9oeXBlcnNjcmlwdCIsICJpIiwgInJlcXVpcmVfcmVuZGVyIiwgImNvbnNvbGUiLCAicmVxdWlyZV9tb3VudF9yZWRyYXciLCAia2V5IiwgInJlcXVpcmVfYnVpbGQiLCAibSIsICJQcm9taXNlIiwgInByb21pc2UiLCAicmVxdWlyZV9yZXF1ZXN0IiwgInJlcXVpcmVfcGFyc2UiLCAibSIsICJtIiwgIlByb21pc2UiLCAic3RhdGUiLCAicm91dGUiLCAibSIsICJyZXF1aXJlX3BhcnNlIiwgIm0iLCAibWVkaWFuIiwgImkiLCAicjAiLCAicjEiLCAidDAiLCAidDEiLCAibW9kIiwgInBhcnNlIiwgInBhcnNlIiwgIm0iLCAidmFsdWUiLCAic3RyaW5nIiwgInRyaWFscyIsICJtIiwgInBhcnNlIl0KfQo=
