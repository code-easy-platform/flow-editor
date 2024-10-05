import $e, { createContext as De, useMemo as ae, useContext as Le, useRef as we, useEffect as Ce, useCallback as be, useState as pe } from "react";
import kr from "react-dom";
import { observe as he, selector as ke, set as fe, useObserverValue as K, useObserver as St, useSetObserver as ot } from "react-observing";
import { useDrop as zt } from "react-use-drag-and-drop";
import { v4 as ct } from "uuid";
function Ir(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var at = { exports: {} }, Ie = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pt;
function Mr() {
  if (Pt)
    return Ie;
  Pt = 1;
  var e = $e, r = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(i, c, u) {
    var p, w = {}, m = null, E = null;
    u !== void 0 && (m = "" + u), c.key !== void 0 && (m = "" + c.key), c.ref !== void 0 && (E = c.ref);
    for (p in c)
      n.call(c, p) && !s.hasOwnProperty(p) && (w[p] = c[p]);
    if (i && i.defaultProps)
      for (p in c = i.defaultProps, c)
        w[p] === void 0 && (w[p] = c[p]);
    return { $$typeof: r, type: i, key: m, ref: E, props: w, _owner: a.current };
  }
  return Ie.Fragment = o, Ie.jsx = f, Ie.jsxs = f, Ie;
}
var Me = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jt;
function Ar() {
  return jt || (jt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = $e, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), i = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), E = Symbol.for("react.offscreen"), b = Symbol.iterator, T = "@@iterator";
    function x(t) {
      if (t === null || typeof t != "object")
        return null;
      var d = b && t[b] || t[T];
      return typeof d == "function" ? d : null;
    }
    var M = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function I(t) {
      {
        for (var d = arguments.length, y = new Array(d > 1 ? d - 1 : 0), S = 1; S < d; S++)
          y[S - 1] = arguments[S];
        $("error", t, y);
      }
    }
    function $(t, d, y) {
      {
        var S = M.ReactDebugCurrentFrame, B = S.getStackAddendum();
        B !== "" && (d += "%s", y = y.concat([B]));
        var Q = y.map(function(N) {
          return String(N);
        });
        Q.unshift("Warning: " + d), Function.prototype.apply.call(console[t], console, Q);
      }
    }
    var j = !1, l = !1, q = !1, C = !1, D = !1, ee;
    ee = Symbol.for("react.module.reference");
    function U(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === n || t === s || D || t === a || t === u || t === p || C || t === E || j || l || q || typeof t == "object" && t !== null && (t.$$typeof === m || t.$$typeof === w || t.$$typeof === f || t.$$typeof === i || t.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === ee || t.getModuleId !== void 0));
    }
    function z(t, d, y) {
      var S = t.displayName;
      if (S)
        return S;
      var B = d.displayName || d.name || "";
      return B !== "" ? y + "(" + B + ")" : y;
    }
    function te(t) {
      return t.displayName || "Context";
    }
    function ie(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && I("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case n:
          return "Fragment";
        case o:
          return "Portal";
        case s:
          return "Profiler";
        case a:
          return "StrictMode";
        case u:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case i:
            var d = t;
            return te(d) + ".Consumer";
          case f:
            var y = t;
            return te(y._context) + ".Provider";
          case c:
            return z(t, t.render, "ForwardRef");
          case w:
            var S = t.displayName || null;
            return S !== null ? S : ie(t.type) || "Memo";
          case m: {
            var B = t, Q = B._payload, N = B._init;
            try {
              return ie(N(Q));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, V = 0, Z, ne, se, ue, v, h, P;
    function R() {
    }
    R.__reactDisabledLog = !0;
    function _() {
      {
        if (V === 0) {
          Z = console.log, ne = console.info, se = console.warn, ue = console.error, v = console.group, h = console.groupCollapsed, P = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: R,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        V++;
      }
    }
    function L() {
      {
        if (V--, V === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, t, {
              value: Z
            }),
            info: J({}, t, {
              value: ne
            }),
            warn: J({}, t, {
              value: se
            }),
            error: J({}, t, {
              value: ue
            }),
            group: J({}, t, {
              value: v
            }),
            groupCollapsed: J({}, t, {
              value: h
            }),
            groupEnd: J({}, t, {
              value: P
            })
          });
        }
        V < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var k = M.ReactCurrentDispatcher, A;
    function F(t, d, y) {
      {
        if (A === void 0)
          try {
            throw Error();
          } catch (B) {
            var S = B.stack.trim().match(/\n( *(at )?)/);
            A = S && S[1] || "";
          }
        return `
` + A + t;
      }
    }
    var X = !1, Y;
    {
      var ce = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new ce();
    }
    function g(t, d) {
      if (!t || X)
        return "";
      {
        var y = Y.get(t);
        if (y !== void 0)
          return y;
      }
      var S;
      X = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Q;
      Q = k.current, k.current = null, _();
      try {
        if (d) {
          var N = function() {
            throw Error();
          };
          if (Object.defineProperty(N.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(N, []);
            } catch (ge) {
              S = ge;
            }
            Reflect.construct(t, [], N);
          } else {
            try {
              N.call();
            } catch (ge) {
              S = ge;
            }
            t.call(N.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ge) {
            S = ge;
          }
          t();
        }
      } catch (ge) {
        if (ge && S && typeof ge.stack == "string") {
          for (var W = ge.stack.split(`
`), le = S.stack.split(`
`), re = W.length - 1, oe = le.length - 1; re >= 1 && oe >= 0 && W[re] !== le[oe]; )
            oe--;
          for (; re >= 1 && oe >= 0; re--, oe--)
            if (W[re] !== le[oe]) {
              if (re !== 1 || oe !== 1)
                do
                  if (re--, oe--, oe < 0 || W[re] !== le[oe]) {
                    var ve = `
` + W[re].replace(" at new ", " at ");
                    return t.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", t.displayName)), typeof t == "function" && Y.set(t, ve), ve;
                  }
                while (re >= 1 && oe >= 0);
              break;
            }
        }
      } finally {
        X = !1, k.current = Q, L(), Error.prepareStackTrace = B;
      }
      var Re = t ? t.displayName || t.name : "", Ct = Re ? F(Re) : "";
      return typeof t == "function" && Y.set(t, Ct), Ct;
    }
    function de(t, d, y) {
      return g(t, !1);
    }
    function Te(t) {
      var d = t.prototype;
      return !!(d && d.isReactComponent);
    }
    function Ee(t, d, y) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return g(t, Te(t));
      if (typeof t == "string")
        return F(t);
      switch (t) {
        case u:
          return F("Suspense");
        case p:
          return F("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case c:
            return de(t.render);
          case w:
            return Ee(t.type, d, y);
          case m: {
            var S = t, B = S._payload, Q = S._init;
            try {
              return Ee(Q(B), d, y);
            } catch {
            }
          }
        }
      return "";
    }
    var We = Object.prototype.hasOwnProperty, ht = {}, yt = M.ReactDebugCurrentFrame;
    function Ue(t) {
      if (t) {
        var d = t._owner, y = Ee(t.type, t._source, d ? d.type : null);
        yt.setExtraStackFrame(y);
      } else
        yt.setExtraStackFrame(null);
    }
    function fr(t, d, y, S, B) {
      {
        var Q = Function.call.bind(We);
        for (var N in t)
          if (Q(t, N)) {
            var W = void 0;
            try {
              if (typeof t[N] != "function") {
                var le = Error((S || "React class") + ": " + y + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw le.name = "Invariant Violation", le;
              }
              W = t[N](d, N, S, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (re) {
              W = re;
            }
            W && !(W instanceof Error) && (Ue(B), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", y, N, typeof W), Ue(null)), W instanceof Error && !(W.message in ht) && (ht[W.message] = !0, Ue(B), I("Failed %s type: %s", y, W.message), Ue(null));
          }
      }
    }
    var dr = Array.isArray;
    function Xe(t) {
      return dr(t);
    }
    function vr(t) {
      {
        var d = typeof Symbol == "function" && Symbol.toStringTag, y = d && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return y;
      }
    }
    function pr(t) {
      try {
        return mt(t), !1;
      } catch {
        return !0;
      }
    }
    function mt(t) {
      return "" + t;
    }
    function gt(t) {
      if (pr(t))
        return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", vr(t)), mt(t);
    }
    var je = M.ReactCurrentOwner, hr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, bt, wt, Be;
    Be = {};
    function yr(t) {
      if (We.call(t, "ref")) {
        var d = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function mr(t) {
      if (We.call(t, "key")) {
        var d = Object.getOwnPropertyDescriptor(t, "key").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function gr(t, d) {
      if (typeof t.ref == "string" && je.current && d && je.current.stateNode !== d) {
        var y = ie(je.current.type);
        Be[y] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ie(je.current.type), t.ref), Be[y] = !0);
      }
    }
    function br(t, d) {
      {
        var y = function() {
          bt || (bt = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        y.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: y,
          configurable: !0
        });
      }
    }
    function wr(t, d) {
      {
        var y = function() {
          wt || (wt = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        y.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: y,
          configurable: !0
        });
      }
    }
    var Er = function(t, d, y, S, B, Q, N) {
      var W = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: d,
        ref: y,
        props: N,
        // Record the component responsible for creating this element.
        _owner: Q
      };
      return W._store = {}, Object.defineProperty(W._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(W, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: S
      }), Object.defineProperty(W, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(W.props), Object.freeze(W)), W;
    };
    function xr(t, d, y, S, B) {
      {
        var Q, N = {}, W = null, le = null;
        y !== void 0 && (gt(y), W = "" + y), mr(d) && (gt(d.key), W = "" + d.key), yr(d) && (le = d.ref, gr(d, B));
        for (Q in d)
          We.call(d, Q) && !hr.hasOwnProperty(Q) && (N[Q] = d[Q]);
        if (t && t.defaultProps) {
          var re = t.defaultProps;
          for (Q in re)
            N[Q] === void 0 && (N[Q] = re[Q]);
        }
        if (W || le) {
          var oe = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          W && br(N, oe), le && wr(N, oe);
        }
        return Er(t, W, le, B, S, je.current, N);
      }
    }
    var Ve = M.ReactCurrentOwner, Et = M.ReactDebugCurrentFrame;
    function Oe(t) {
      if (t) {
        var d = t._owner, y = Ee(t.type, t._source, d ? d.type : null);
        Et.setExtraStackFrame(y);
      } else
        Et.setExtraStackFrame(null);
    }
    var He;
    He = !1;
    function Ge(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function xt() {
      {
        if (Ve.current) {
          var t = ie(Ve.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function _r(t) {
      {
        if (t !== void 0) {
          var d = t.fileName.replace(/^.*[\\\/]/, ""), y = t.lineNumber;
          return `

Check your code at ` + d + ":" + y + ".";
        }
        return "";
      }
    }
    var _t = {};
    function Tr(t) {
      {
        var d = xt();
        if (!d) {
          var y = typeof t == "string" ? t : t.displayName || t.name;
          y && (d = `

Check the top-level render call using <` + y + ">.");
        }
        return d;
      }
    }
    function Tt(t, d) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var y = Tr(d);
        if (_t[y])
          return;
        _t[y] = !0;
        var S = "";
        t && t._owner && t._owner !== Ve.current && (S = " It was passed a child from " + ie(t._owner.type) + "."), Oe(t), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, S), Oe(null);
      }
    }
    function Ot(t, d) {
      {
        if (typeof t != "object")
          return;
        if (Xe(t))
          for (var y = 0; y < t.length; y++) {
            var S = t[y];
            Ge(S) && Tt(S, d);
          }
        else if (Ge(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var B = x(t);
          if (typeof B == "function" && B !== t.entries)
            for (var Q = B.call(t), N; !(N = Q.next()).done; )
              Ge(N.value) && Tt(N.value, d);
        }
      }
    }
    function Or(t) {
      {
        var d = t.type;
        if (d == null || typeof d == "string")
          return;
        var y;
        if (typeof d == "function")
          y = d.propTypes;
        else if (typeof d == "object" && (d.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        d.$$typeof === w))
          y = d.propTypes;
        else
          return;
        if (y) {
          var S = ie(d);
          fr(y, t.props, "prop", S, t);
        } else if (d.PropTypes !== void 0 && !He) {
          He = !0;
          var B = ie(d);
          I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof d.getDefaultProps == "function" && !d.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rr(t) {
      {
        for (var d = Object.keys(t.props), y = 0; y < d.length; y++) {
          var S = d[y];
          if (S !== "children" && S !== "key") {
            Oe(t), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), Oe(null);
            break;
          }
        }
        t.ref !== null && (Oe(t), I("Invalid attribute `ref` supplied to `React.Fragment`."), Oe(null));
      }
    }
    function Rt(t, d, y, S, B, Q) {
      {
        var N = U(t);
        if (!N) {
          var W = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (W += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var le = _r(B);
          le ? W += le : W += xt();
          var re;
          t === null ? re = "null" : Xe(t) ? re = "array" : t !== void 0 && t.$$typeof === r ? (re = "<" + (ie(t.type) || "Unknown") + " />", W = " Did you accidentally export a JSX literal instead of a component?") : re = typeof t, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", re, W);
        }
        var oe = xr(t, d, y, B, Q);
        if (oe == null)
          return oe;
        if (N) {
          var ve = d.children;
          if (ve !== void 0)
            if (S)
              if (Xe(ve)) {
                for (var Re = 0; Re < ve.length; Re++)
                  Ot(ve[Re], t);
                Object.freeze && Object.freeze(ve);
              } else
                I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ot(ve, t);
        }
        return t === n ? Rr(oe) : Or(oe), oe;
      }
    }
    function Cr(t, d, y) {
      return Rt(t, d, y, !0);
    }
    function Sr(t, d, y) {
      return Rt(t, d, y, !1);
    }
    var Pr = Sr, jr = Cr;
    Me.Fragment = n, Me.jsx = Pr, Me.jsxs = jr;
  }()), Me;
}
process.env.NODE_ENV === "production" ? at.exports = Mr() : at.exports = Ar();
var O = at.exports, Se = {}, Fe = {}, it = { exports: {} }, qe = { exports: {} }, H = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kt;
function $r() {
  if (kt)
    return H;
  kt = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, f = e ? Symbol.for("react.provider") : 60109, i = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, w = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, E = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, T = e ? Symbol.for("react.block") : 60121, x = e ? Symbol.for("react.fundamental") : 60117, M = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function $(l) {
    if (typeof l == "object" && l !== null) {
      var q = l.$$typeof;
      switch (q) {
        case r:
          switch (l = l.type, l) {
            case c:
            case u:
            case n:
            case s:
            case a:
            case w:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case i:
                case p:
                case b:
                case E:
                case f:
                  return l;
                default:
                  return q;
              }
          }
        case o:
          return q;
      }
    }
  }
  function j(l) {
    return $(l) === u;
  }
  return H.AsyncMode = c, H.ConcurrentMode = u, H.ContextConsumer = i, H.ContextProvider = f, H.Element = r, H.ForwardRef = p, H.Fragment = n, H.Lazy = b, H.Memo = E, H.Portal = o, H.Profiler = s, H.StrictMode = a, H.Suspense = w, H.isAsyncMode = function(l) {
    return j(l) || $(l) === c;
  }, H.isConcurrentMode = j, H.isContextConsumer = function(l) {
    return $(l) === i;
  }, H.isContextProvider = function(l) {
    return $(l) === f;
  }, H.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === r;
  }, H.isForwardRef = function(l) {
    return $(l) === p;
  }, H.isFragment = function(l) {
    return $(l) === n;
  }, H.isLazy = function(l) {
    return $(l) === b;
  }, H.isMemo = function(l) {
    return $(l) === E;
  }, H.isPortal = function(l) {
    return $(l) === o;
  }, H.isProfiler = function(l) {
    return $(l) === s;
  }, H.isStrictMode = function(l) {
    return $(l) === a;
  }, H.isSuspense = function(l) {
    return $(l) === w;
  }, H.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === n || l === u || l === s || l === a || l === w || l === m || typeof l == "object" && l !== null && (l.$$typeof === b || l.$$typeof === E || l.$$typeof === f || l.$$typeof === i || l.$$typeof === p || l.$$typeof === x || l.$$typeof === M || l.$$typeof === I || l.$$typeof === T);
  }, H.typeOf = $, H;
}
var G = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var It;
function Dr() {
  return It || (It = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, f = e ? Symbol.for("react.provider") : 60109, i = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, w = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, E = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, T = e ? Symbol.for("react.block") : 60121, x = e ? Symbol.for("react.fundamental") : 60117, M = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function $(g) {
      return typeof g == "string" || typeof g == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      g === n || g === u || g === s || g === a || g === w || g === m || typeof g == "object" && g !== null && (g.$$typeof === b || g.$$typeof === E || g.$$typeof === f || g.$$typeof === i || g.$$typeof === p || g.$$typeof === x || g.$$typeof === M || g.$$typeof === I || g.$$typeof === T);
    }
    function j(g) {
      if (typeof g == "object" && g !== null) {
        var de = g.$$typeof;
        switch (de) {
          case r:
            var Te = g.type;
            switch (Te) {
              case c:
              case u:
              case n:
              case s:
              case a:
              case w:
                return Te;
              default:
                var Ee = Te && Te.$$typeof;
                switch (Ee) {
                  case i:
                  case p:
                  case b:
                  case E:
                  case f:
                    return Ee;
                  default:
                    return de;
                }
            }
          case o:
            return de;
        }
      }
    }
    var l = c, q = u, C = i, D = f, ee = r, U = p, z = n, te = b, ie = E, J = o, V = s, Z = a, ne = w, se = !1;
    function ue(g) {
      return se || (se = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), v(g) || j(g) === c;
    }
    function v(g) {
      return j(g) === u;
    }
    function h(g) {
      return j(g) === i;
    }
    function P(g) {
      return j(g) === f;
    }
    function R(g) {
      return typeof g == "object" && g !== null && g.$$typeof === r;
    }
    function _(g) {
      return j(g) === p;
    }
    function L(g) {
      return j(g) === n;
    }
    function k(g) {
      return j(g) === b;
    }
    function A(g) {
      return j(g) === E;
    }
    function F(g) {
      return j(g) === o;
    }
    function X(g) {
      return j(g) === s;
    }
    function Y(g) {
      return j(g) === a;
    }
    function ce(g) {
      return j(g) === w;
    }
    G.AsyncMode = l, G.ConcurrentMode = q, G.ContextConsumer = C, G.ContextProvider = D, G.Element = ee, G.ForwardRef = U, G.Fragment = z, G.Lazy = te, G.Memo = ie, G.Portal = J, G.Profiler = V, G.StrictMode = Z, G.Suspense = ne, G.isAsyncMode = ue, G.isConcurrentMode = v, G.isContextConsumer = h, G.isContextProvider = P, G.isElement = R, G.isForwardRef = _, G.isFragment = L, G.isLazy = k, G.isMemo = A, G.isPortal = F, G.isProfiler = X, G.isStrictMode = Y, G.isSuspense = ce, G.isValidElementType = $, G.typeOf = j;
  }()), G;
}
var Mt;
function Nt() {
  return Mt || (Mt = 1, process.env.NODE_ENV === "production" ? qe.exports = $r() : qe.exports = Dr()), qe.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Je, At;
function Lr() {
  if (At)
    return Je;
  At = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
  function n(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var f = {}, i = 0; i < 10; i++)
        f["_" + String.fromCharCode(i)] = i;
      var c = Object.getOwnPropertyNames(f).map(function(p) {
        return f[p];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        u[p] = p;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Je = a() ? Object.assign : function(s, f) {
    for (var i, c = n(s), u, p = 1; p < arguments.length; p++) {
      i = Object(arguments[p]);
      for (var w in i)
        r.call(i, w) && (c[w] = i[w]);
      if (e) {
        u = e(i);
        for (var m = 0; m < u.length; m++)
          o.call(i, u[m]) && (c[u[m]] = i[u[m]]);
      }
    }
    return c;
  }, Je;
}
var Ke, $t;
function lt() {
  if ($t)
    return Ke;
  $t = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Ke = e, Ke;
}
var Ze, Dt;
function Xt() {
  return Dt || (Dt = 1, Ze = Function.call.bind(Object.prototype.hasOwnProperty)), Ze;
}
var Qe, Lt;
function Fr() {
  if (Lt)
    return Qe;
  Lt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = lt(), o = {}, n = Xt();
    e = function(s) {
      var f = "Warning: " + s;
      typeof console < "u" && console.error(f);
      try {
        throw new Error(f);
      } catch {
      }
    };
  }
  function a(s, f, i, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in s)
        if (n(s, p)) {
          var w;
          try {
            if (typeof s[p] != "function") {
              var m = Error(
                (c || "React class") + ": " + i + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw m.name = "Invariant Violation", m;
            }
            w = s[p](f, p, c, i, null, r);
          } catch (b) {
            w = b;
          }
          if (w && !(w instanceof Error) && e(
            (c || "React class") + ": type specification of " + i + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof w + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), w instanceof Error && !(w.message in o)) {
            o[w.message] = !0;
            var E = u ? u() : "";
            e(
              "Failed " + i + " type: " + w.message + (E ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (o = {});
  }, Qe = a, Qe;
}
var et, Ft;
function Yr() {
  if (Ft)
    return et;
  Ft = 1;
  var e = Nt(), r = Lr(), o = lt(), n = Xt(), a = Fr(), s = function() {
  };
  process.env.NODE_ENV !== "production" && (s = function(i) {
    var c = "Warning: " + i;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function f() {
    return null;
  }
  return et = function(i, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function w(v) {
      var h = v && (u && v[u] || v[p]);
      if (typeof h == "function")
        return h;
    }
    var m = "<<anonymous>>", E = {
      array: M("array"),
      bigint: M("bigint"),
      bool: M("boolean"),
      func: M("function"),
      number: M("number"),
      object: M("object"),
      string: M("string"),
      symbol: M("symbol"),
      any: I(),
      arrayOf: $,
      element: j(),
      elementType: l(),
      instanceOf: q,
      node: U(),
      objectOf: D,
      oneOf: C,
      oneOfType: ee,
      shape: te,
      exact: ie
    };
    function b(v, h) {
      return v === h ? v !== 0 || 1 / v === 1 / h : v !== v && h !== h;
    }
    function T(v, h) {
      this.message = v, this.data = h && typeof h == "object" ? h : {}, this.stack = "";
    }
    T.prototype = Error.prototype;
    function x(v) {
      if (process.env.NODE_ENV !== "production")
        var h = {}, P = 0;
      function R(L, k, A, F, X, Y, ce) {
        if (F = F || m, Y = Y || A, ce !== o) {
          if (c) {
            var g = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw g.name = "Invariant Violation", g;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var de = F + ":" + A;
            !h[de] && // Avoid spamming the console because they are often not actionable except for lib authors
            P < 3 && (s(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + F + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), h[de] = !0, P++);
          }
        }
        return k[A] == null ? L ? k[A] === null ? new T("The " + X + " `" + Y + "` is marked as required " + ("in `" + F + "`, but its value is `null`.")) : new T("The " + X + " `" + Y + "` is marked as required in " + ("`" + F + "`, but its value is `undefined`.")) : null : v(k, A, F, X, Y);
      }
      var _ = R.bind(null, !1);
      return _.isRequired = R.bind(null, !0), _;
    }
    function M(v) {
      function h(P, R, _, L, k, A) {
        var F = P[R], X = Z(F);
        if (X !== v) {
          var Y = ne(F);
          return new T(
            "Invalid " + L + " `" + k + "` of type " + ("`" + Y + "` supplied to `" + _ + "`, expected ") + ("`" + v + "`."),
            { expectedType: v }
          );
        }
        return null;
      }
      return x(h);
    }
    function I() {
      return x(f);
    }
    function $(v) {
      function h(P, R, _, L, k) {
        if (typeof v != "function")
          return new T("Property `" + k + "` of component `" + _ + "` has invalid PropType notation inside arrayOf.");
        var A = P[R];
        if (!Array.isArray(A)) {
          var F = Z(A);
          return new T("Invalid " + L + " `" + k + "` of type " + ("`" + F + "` supplied to `" + _ + "`, expected an array."));
        }
        for (var X = 0; X < A.length; X++) {
          var Y = v(A, X, _, L, k + "[" + X + "]", o);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return x(h);
    }
    function j() {
      function v(h, P, R, _, L) {
        var k = h[P];
        if (!i(k)) {
          var A = Z(k);
          return new T("Invalid " + _ + " `" + L + "` of type " + ("`" + A + "` supplied to `" + R + "`, expected a single ReactElement."));
        }
        return null;
      }
      return x(v);
    }
    function l() {
      function v(h, P, R, _, L) {
        var k = h[P];
        if (!e.isValidElementType(k)) {
          var A = Z(k);
          return new T("Invalid " + _ + " `" + L + "` of type " + ("`" + A + "` supplied to `" + R + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return x(v);
    }
    function q(v) {
      function h(P, R, _, L, k) {
        if (!(P[R] instanceof v)) {
          var A = v.name || m, F = ue(P[R]);
          return new T("Invalid " + L + " `" + k + "` of type " + ("`" + F + "` supplied to `" + _ + "`, expected ") + ("instance of `" + A + "`."));
        }
        return null;
      }
      return x(h);
    }
    function C(v) {
      if (!Array.isArray(v))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : s("Invalid argument supplied to oneOf, expected an array.")), f;
      function h(P, R, _, L, k) {
        for (var A = P[R], F = 0; F < v.length; F++)
          if (b(A, v[F]))
            return null;
        var X = JSON.stringify(v, function(ce, g) {
          var de = ne(g);
          return de === "symbol" ? String(g) : g;
        });
        return new T("Invalid " + L + " `" + k + "` of value `" + String(A) + "` " + ("supplied to `" + _ + "`, expected one of " + X + "."));
      }
      return x(h);
    }
    function D(v) {
      function h(P, R, _, L, k) {
        if (typeof v != "function")
          return new T("Property `" + k + "` of component `" + _ + "` has invalid PropType notation inside objectOf.");
        var A = P[R], F = Z(A);
        if (F !== "object")
          return new T("Invalid " + L + " `" + k + "` of type " + ("`" + F + "` supplied to `" + _ + "`, expected an object."));
        for (var X in A)
          if (n(A, X)) {
            var Y = v(A, X, _, L, k + "." + X, o);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return x(h);
    }
    function ee(v) {
      if (!Array.isArray(v))
        return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), f;
      for (var h = 0; h < v.length; h++) {
        var P = v[h];
        if (typeof P != "function")
          return s(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + se(P) + " at index " + h + "."
          ), f;
      }
      function R(_, L, k, A, F) {
        for (var X = [], Y = 0; Y < v.length; Y++) {
          var ce = v[Y], g = ce(_, L, k, A, F, o);
          if (g == null)
            return null;
          g.data && n(g.data, "expectedType") && X.push(g.data.expectedType);
        }
        var de = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new T("Invalid " + A + " `" + F + "` supplied to " + ("`" + k + "`" + de + "."));
      }
      return x(R);
    }
    function U() {
      function v(h, P, R, _, L) {
        return J(h[P]) ? null : new T("Invalid " + _ + " `" + L + "` supplied to " + ("`" + R + "`, expected a ReactNode."));
      }
      return x(v);
    }
    function z(v, h, P, R, _) {
      return new T(
        (v || "React class") + ": " + h + " type `" + P + "." + R + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + _ + "`."
      );
    }
    function te(v) {
      function h(P, R, _, L, k) {
        var A = P[R], F = Z(A);
        if (F !== "object")
          return new T("Invalid " + L + " `" + k + "` of type `" + F + "` " + ("supplied to `" + _ + "`, expected `object`."));
        for (var X in v) {
          var Y = v[X];
          if (typeof Y != "function")
            return z(_, L, k, X, ne(Y));
          var ce = Y(A, X, _, L, k + "." + X, o);
          if (ce)
            return ce;
        }
        return null;
      }
      return x(h);
    }
    function ie(v) {
      function h(P, R, _, L, k) {
        var A = P[R], F = Z(A);
        if (F !== "object")
          return new T("Invalid " + L + " `" + k + "` of type `" + F + "` " + ("supplied to `" + _ + "`, expected `object`."));
        var X = r({}, P[R], v);
        for (var Y in X) {
          var ce = v[Y];
          if (n(v, Y) && typeof ce != "function")
            return z(_, L, k, Y, ne(ce));
          if (!ce)
            return new T(
              "Invalid " + L + " `" + k + "` key `" + Y + "` supplied to `" + _ + "`.\nBad object: " + JSON.stringify(P[R], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(v), null, "  ")
            );
          var g = ce(A, Y, _, L, k + "." + Y, o);
          if (g)
            return g;
        }
        return null;
      }
      return x(h);
    }
    function J(v) {
      switch (typeof v) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !v;
        case "object":
          if (Array.isArray(v))
            return v.every(J);
          if (v === null || i(v))
            return !0;
          var h = w(v);
          if (h) {
            var P = h.call(v), R;
            if (h !== v.entries) {
              for (; !(R = P.next()).done; )
                if (!J(R.value))
                  return !1;
            } else
              for (; !(R = P.next()).done; ) {
                var _ = R.value;
                if (_ && !J(_[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function V(v, h) {
      return v === "symbol" ? !0 : h ? h["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && h instanceof Symbol : !1;
    }
    function Z(v) {
      var h = typeof v;
      return Array.isArray(v) ? "array" : v instanceof RegExp ? "object" : V(h, v) ? "symbol" : h;
    }
    function ne(v) {
      if (typeof v > "u" || v === null)
        return "" + v;
      var h = Z(v);
      if (h === "object") {
        if (v instanceof Date)
          return "date";
        if (v instanceof RegExp)
          return "regexp";
      }
      return h;
    }
    function se(v) {
      var h = ne(v);
      switch (h) {
        case "array":
        case "object":
          return "an " + h;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + h;
        default:
          return h;
      }
    }
    function ue(v) {
      return !v.constructor || !v.constructor.name ? m : v.constructor.name;
    }
    return E.checkPropTypes = a, E.resetWarningCache = a.resetWarningCache, E.PropTypes = E, E;
  }, et;
}
var tt, Yt;
function Wr() {
  if (Yt)
    return tt;
  Yt = 1;
  var e = lt();
  function r() {
  }
  function o() {
  }
  return o.resetWarningCache = r, tt = function() {
    function n(f, i, c, u, p, w) {
      if (w !== e) {
        var m = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw m.name = "Invariant Violation", m;
      }
    }
    n.isRequired = n;
    function a() {
      return n;
    }
    var s = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: a,
      element: n,
      elementType: n,
      instanceOf: a,
      node: n,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: o,
      resetWarningCache: r
    };
    return s.PropTypes = s, s;
  }, tt;
}
if (process.env.NODE_ENV !== "production") {
  var Ur = Nt(), qr = !0;
  it.exports = Yr()(Ur.isElement, qr);
} else
  it.exports = Wr()();
var Bt = it.exports, ye = {};
Object.defineProperty(ye, "__esModule", {
  value: !0
});
ye.FrameContextConsumer = ye.FrameContextProvider = ye.useFrame = ye.FrameContext = void 0;
var zr = $e, Vt = Nr(zr);
function Nr(e) {
  return e && e.__esModule ? e : { default: e };
}
var Ht = void 0, Gt = void 0;
typeof document < "u" && (Ht = document);
typeof window < "u" && (Gt = window);
var ft = ye.FrameContext = Vt.default.createContext({ document: Ht, window: Gt });
ye.useFrame = function() {
  return Vt.default.useContext(ft);
};
var Xr = ft.Provider, Br = ft.Consumer;
ye.FrameContextProvider = Xr;
ye.FrameContextConsumer = Br;
var dt = {};
Object.defineProperty(dt, "__esModule", {
  value: !0
});
var Vr = /* @__PURE__ */ function() {
  function e(r, o) {
    for (var n = 0; n < o.length; n++) {
      var a = o[n];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(r, a.key, a);
    }
  }
  return function(r, o, n) {
    return o && e(r.prototype, o), n && e(r, n), r;
  };
}(), st = $e;
Jt(st);
var Hr = Bt, rt = Jt(Hr);
function Jt(e) {
  return e && e.__esModule ? e : { default: e };
}
function Gr(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function Jr(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function Kr(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var Kt = function(e) {
  Kr(r, e);
  function r() {
    return Gr(this, r), Jr(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
  }
  return Vr(r, [{
    key: "componentDidMount",
    value: function() {
      this.props.contentDidMount();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.props.contentDidUpdate();
    }
  }, {
    key: "render",
    value: function() {
      return st.Children.only(this.props.children);
    }
  }]), r;
}(st.Component);
Kt.propTypes = {
  children: rt.default.element.isRequired,
  contentDidMount: rt.default.func.isRequired,
  contentDidUpdate: rt.default.func.isRequired
};
dt.default = Kt;
Object.defineProperty(Fe, "__esModule", {
  value: !0
});
Fe.Frame = void 0;
var ut = Object.assign || function(e) {
  for (var r = 1; r < arguments.length; r++) {
    var o = arguments[r];
    for (var n in o)
      Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
  }
  return e;
}, Zr = /* @__PURE__ */ function() {
  function e(r, o) {
    for (var n = 0; n < o.length; n++) {
      var a = o[n];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(r, a.key, a);
    }
  }
  return function(r, o, n) {
    return o && e(r.prototype, o), n && e(r, n), r;
  };
}(), Zt = $e, xe = Ne(Zt), Qr = kr, Wt = Ne(Qr), en = Bt, me = Ne(en), tn = ye, rn = dt, nn = Ne(rn);
function Ne(e) {
  return e && e.__esModule ? e : { default: e };
}
function on(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function an(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function sn(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var vt = Fe.Frame = function(e) {
  sn(r, e);
  function r(o, n) {
    on(this, r);
    var a = an(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, o, n));
    return a.setRef = function(s) {
      a.nodeRef.current = s;
      var f = a.props.forwardedRef;
      typeof f == "function" ? f(s) : f && (f.current = s);
    }, a.handleLoad = function() {
      clearInterval(a.loadCheck), a.state.iframeLoaded || a.setState({ iframeLoaded: !0 });
    }, a.loadCheck = function() {
      return setInterval(function() {
        a.handleLoad();
      }, 500);
    }, a._isMounted = !1, a.nodeRef = xe.default.createRef(), a.state = { iframeLoaded: !1 }, a;
  }
  return Zr(r, [{
    key: "componentDidMount",
    value: function() {
      this._isMounted = !0;
      var n = this.getDoc();
      n && this.nodeRef.current.contentWindow.addEventListener("DOMContentLoaded", this.handleLoad);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this._isMounted = !1, this.nodeRef.current.removeEventListener("DOMContentLoaded", this.handleLoad);
    }
  }, {
    key: "getDoc",
    value: function() {
      return this.nodeRef.current ? this.nodeRef.current.contentDocument : null;
    }
  }, {
    key: "getMountTarget",
    value: function() {
      var n = this.getDoc();
      return this.props.mountTarget ? n.querySelector(this.props.mountTarget) : n.body.children[0];
    }
    // In certain situations on a cold cache DOMContentLoaded never gets called
    // fallback to an interval to check if that's the case
  }, {
    key: "renderFrameContents",
    value: function() {
      if (!this._isMounted)
        return null;
      var n = this.getDoc();
      if (!n)
        return null;
      var a = this.props.contentDidMount, s = this.props.contentDidUpdate, f = n.defaultView || n.parentView, i = xe.default.createElement(
        nn.default,
        {
          contentDidMount: a,
          contentDidUpdate: s
        },
        xe.default.createElement(
          tn.FrameContextProvider,
          { value: { document: n, window: f } },
          xe.default.createElement(
            "div",
            { className: "frame-content" },
            this.props.children
          )
        )
      ), c = this.getMountTarget();
      return [Wt.default.createPortal(this.props.head, this.getDoc().head), Wt.default.createPortal(i, c)];
    }
  }, {
    key: "render",
    value: function() {
      var n = ut({}, this.props, {
        srcDoc: this.props.initialContent,
        children: void 0
        // The iframe isn't ready so we drop children from props here. #12, #17
      });
      return delete n.head, delete n.initialContent, delete n.mountTarget, delete n.contentDidMount, delete n.contentDidUpdate, delete n.forwardedRef, xe.default.createElement(
        "iframe",
        ut({}, n, { ref: this.setRef, onLoad: this.handleLoad }),
        this.state.iframeLoaded && this.renderFrameContents()
      );
    }
  }]), r;
}(Zt.Component);
vt.propTypes = {
  style: me.default.object,
  // eslint-disable-line
  head: me.default.node,
  initialContent: me.default.string,
  mountTarget: me.default.string,
  contentDidMount: me.default.func,
  contentDidUpdate: me.default.func,
  children: me.default.oneOfType([me.default.element, me.default.arrayOf(me.default.element)])
};
vt.defaultProps = {
  style: {},
  head: null,
  children: void 0,
  mountTarget: void 0,
  contentDidMount: function() {
  },
  contentDidUpdate: function() {
  },
  initialContent: '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
};
Fe.default = xe.default.forwardRef(function(e, r) {
  return xe.default.createElement(vt, ut({}, e, { forwardedRef: r }));
});
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var r = Fe;
  Object.defineProperty(e, "default", {
    enumerable: !0,
    get: function() {
      return n(r).default;
    }
  });
  var o = ye;
  Object.defineProperty(e, "FrameContext", {
    enumerable: !0,
    get: function() {
      return o.FrameContext;
    }
  }), Object.defineProperty(e, "FrameContextConsumer", {
    enumerable: !0,
    get: function() {
      return o.FrameContextConsumer;
    }
  }), Object.defineProperty(e, "useFrame", {
    enumerable: !0,
    get: function() {
      return o.useFrame;
    }
  });
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
})(Se);
const un = /* @__PURE__ */ Ir(Se), Qt = De({}), cn = ({ children: e }) => {
  const r = ae(() => ({
    top: he(0),
    left: he(0)
  }), []);
  return /* @__PURE__ */ O.jsx(Qt.Provider, { value: r, children: e });
}, Ye = () => Le(Qt), er = De(he(1)), ln = ({ children: e, value: r }) => {
  const o = ae(() => he(r < 1 ? 1 : r), [r]);
  return /* @__PURE__ */ O.jsx(er.Provider, { value: o, children: e });
}, Pe = () => Le(er), tr = De(15), fn = ({ children: e, value: r }) => /* @__PURE__ */ O.jsx(tr.Provider, { value: r < 1 ? 1 : r, children: e }), dn = () => Le(tr), rr = De(he(void 0)), vn = ({ children: e }) => {
  const r = ae(() => he(void 0), []);
  return /* @__PURE__ */ O.jsx(rr.Provider, { value: r, children: e });
}, nr = () => Le(rr), or = De({}), pn = ({ children: e, items: r }) => {
  const o = we(he(r));
  Ce(() => {
    o.current.value = r;
  }, [r]);
  const n = ae(() => ke({
    get: ({ get: i }) => {
      const c = [];
      return i(o.current).forEach((u, p, w) => {
        i(u.connections).forEach((m) => {
          const E = w.find((b) => i(m.relatedId) === i(b.id));
          E && c.push({
            top1: u.top,
            left1: u.left,
            top2: E.top,
            left2: E.left,
            width1: u.width,
            height1: u.height,
            width2: E.width,
            height2: E.height,
            nodeId: u.id,
            id: m.id,
            relatedNodeId: E.id,
            key: `line_key_${i(u.id)}_${i(E.id)}`,
            isCurved: ke(({ get: b }) => b(E.connections).some((T) => b(T.relatedId) === b(u.id)))
          });
        });
      }), c;
    }
  }), []), a = ae(() => ({
    width: ke({
      get: ({ get: i }) => i(o.current).reduce((c, u) => {
        const p = i(u.left) + i(u.width);
        return p > c ? p : c;
      }, 0)
    }),
    height: ke({
      get: ({ get: i }) => i(o.current).reduce((c, u) => {
        const p = i(u.top) + i(u.height);
        return p > c ? p : c;
      }, 0)
    })
  }), []), s = ae(() => he([]), []), f = ae(() => ke({
    get: ({ get: i }) => i(o.current).filter((u) => i(s).includes(i(u.id)))
  }), [s]);
  return /* @__PURE__ */ O.jsx(or.Provider, { value: { flowStore: o.current, linesStore: n, boardSizes: a, selectedItems: f, selectedItemsId: s }, children: e });
}, _e = () => Le(or), ze = () => _e().boardSizes, ar = (e) => {
  const { selectedItemsId: r } = _e(), o = we(he(r.value.includes(e)));
  return Ce(() => {
    const n = r.subscribe((a) => {
      const s = a.includes(e);
      fe(o.current, (f) => f !== s ? s : f);
    });
    return () => n.unsubscribe();
  }, [r, e]), o.current;
}, pt = () => {
  const { selectedItemsId: e, linesStore: r } = _e();
  return be((o, n = !1) => {
    if (typeof o == "string") {
      if (e.value.some((a) => a === o) && !n)
        return;
      e.value.some((a) => a === o) ? fe(e, (a) => {
        const s = a.filter((i) => i !== o).filter((i) => !r.value.some((c) => c.id.value === i)), f = r.value.filter((i) => s.includes(i.nodeId.value) && s.includes(i.relatedNodeId.value)).map((i) => i.id.value);
        return [...s, ...f];
      }) : n ? fe(e, (a) => {
        const s = [
          ...a.filter((i) => !r.value.some((c) => c.id.value === i)),
          o
        ], f = r.value.filter((i) => s.includes(i.nodeId.value) && s.includes(i.relatedNodeId.value)).map((i) => i.id.value);
        return [...s, ...f];
      }) : fe(e, [o]);
    } else {
      if (o.sort().join() === e.value.sort().join())
        return;
      const a = [...o], s = r.value.filter((f) => a.includes(f.nodeId.value) && a.includes(f.relatedNodeId.value)).map((f) => f.id.value);
      if ([...a, ...s].sort().join() === e.value.sort().join())
        return;
      fe(e, [...a, ...s]);
    }
  }, [e]);
}, ir = () => {
  const { selectedItems: e } = _e();
  return be((r, o) => {
    e.value.length !== 0 && ((e.value.every((n) => n.top.value > 0) || o > 0) && e.value.forEach((n) => {
      fe(n.top, (a) => a + o <= 0 ? 0 : a + o);
    }), (e.value.every((n) => n.left.value > 0) || r > 0) && e.value.forEach((n) => {
      fe(n.left, (a) => a + r <= 0 ? 0 : a + r);
    }));
  }, [e]);
}, hn = `
.draggable-container {
  top: 0;
  left: 0;
  z-index:1;
  cursor: move;
  display: flex;
  user-select: none;
  position: absolute;
  pointer-events: none;
  flex-direction: column;
  border: thin solid transparent;
}

.draggable-container-content {
  flex: 1;
  display: flex;
  overflow: auto;
  border-radius: 4px;
  pointer-events: auto;
  flex-direction: column;
}

.draggable-container-content::-webkit-scrollbar:horizontal {
  height: 8px;
}

.draggable-container-input {
  width: 10px;
  left: -17px;
  height: 10px;
  cursor: crosshair;
  border-radius: 50%;
  position: absolute;
  pointer-events: auto;
  border: 2px solid green;
  background-color: darkgreen;
}
.draggable-container-input:hover {
  background-color: green;
}

.draggable-container-output {
  width: 10px;
  right: -17px;
  height: 10px;
  cursor: crosshair;
  border-radius: 50%;
  position: absolute;
  pointer-events: auto;
  transition: all .1s;
  border: 2px solid crimson;
  background-color: darkslategray;
}
.draggable-container-output:hover {
  background-color: crimson;
}

.draggable-container-input[data-is-line-dragging=true], .draggable-container-output[data-is-line-dragging=true] {
  border: 2px solid lightgreen;
}

.draggable-container-input[data-is-line-dragging=true]:hover, .draggable-container-output[data-is-line-dragging=true]:hover {
  background-color: lightgreen;
}
`;
function Ut(e, r) {
  const o = e.width, n = e.height, a = { x: e.x, y: e.y }, s = { x: r.x, y: r.y }, f = o / 2, i = n / 2, c = a.x + f, u = a.y + i, p = s.x + r.width / 2, w = s.y + r.height / 2, m = (p - c) / (2 * f) - (w - u) / (2 * i), E = (p - c) / (2 * f) + (w - u) / (2 * i), b = 1 / (Math.abs(m) + Math.abs(E) || 1), T = b * m, x = b * E, M = f * (T + x) + c, I = i * (-T + x) + u;
  return { x: M, y: I };
}
function qt(e, r) {
  const o = { x: e.x, y: e.y, measured: { width: e.width, height: e.height }, ...e }, n = Math.round(o.x), a = Math.round(o.y), s = Math.round(r.x), f = Math.round(r.y);
  return s <= n + 1 ? "left" : s >= n + o.measured.width - 1 ? "right" : f <= a + 1 ? "top" : f >= o.y + o.measured.height - 1 ? "bottom" : "top";
}
function sr(e, r) {
  const o = Ut(e, r), n = Ut(r, e), a = qt(e, o), s = qt(r, n);
  return {
    sourcePos: a,
    targetPos: s,
    sourceX: o.x,
    sourceY: o.y,
    targetX: n.x,
    targetY: n.y
  };
}
function yn({ sourceX: e, sourceY: r, targetX: o, targetY: n }) {
  const a = Math.abs(o - e) / 2, s = o < e ? o + a : o - a, f = Math.abs(n - r) / 2, i = n < r ? n + f : n - f;
  return [s, i, a, f];
}
function ur({ sourceX: e, sourceY: r, targetX: o, targetY: n }) {
  const [a, s, f, i] = yn({
    sourceX: e,
    sourceY: r,
    targetX: o,
    targetY: n
  });
  return [
    `M ${e},${r}L ${o},${n}`,
    { labelX: a, labelY: s, offsetX: f, offsetY: i }
  ];
}
const cr = ({ sourceX: e, sourceY: r, targetX: o, targetY: n }, { offset: a }) => {
  const s = (e + o) / 2, f = (r + n) / 2, i = Math.atan2(n - r, o - e), c = a, u = a >= 0 ? Math.max(a, c) : Math.min(a, -c), p = -Math.abs(u), w = p * Math.cos(i + Math.PI / 2), m = p * Math.sin(i + Math.PI / 2), E = s + w, b = f + m;
  return [
    `M ${e} ${r} Q ${E} ${b} ${o} ${n}`,
    { sourceX: e, sourceY: r, controlX: E, controlY: b, targetX: o, targetY: n }
  ];
}, mn = () => navigator.userAgent.toUpperCase().includes("MAC"), Ae = (e) => mn() ? e.metaKey : e.ctrlKey, nt = (e, r = 15) => Math.round(e / r) * r, gn = ({ nodeId: e, height: r, width: o, getIsDisabledCreateConnection: n, getIsDisabledDropConnection: a }) => {
  const s = K(nr()), { flowStore: f } = _e(), i = be(() => {
    if (s && s.nodeId !== e) {
      for (const c of f.value)
        if (c.id.value === s.nodeId) {
          if (s.type === "end") {
            if (a())
              return;
            if (!s.lineId) {
              fe(c.connections, (u) => [
                ...u,
                {
                  id: he(ct()),
                  relatedId: he(e)
                }
              ]);
              return;
            }
            fe(c.connections, (u) => (u.forEach((p) => {
              p.id.value === s.lineId && (p.relatedId = he(e));
            }), [...u]));
            return;
          }
          if (n())
            return;
          fe(c.connections, (u) => {
            const p = u.find((m) => m.id.value === s.lineId);
            if (!p || p.relatedId.value === e)
              return u;
            const w = f.value.find((m) => m.id.value === e);
            return w ? (fe(w.connections, (m) => [
              ...m,
              {
                id: p.id,
                relatedId: p.relatedId
              }
            ]), [
              ...u.filter((m) => m.id.value !== s.lineId)
            ]) : u;
          });
          return;
        }
    }
  }, [s, e, n, a]);
  return /* @__PURE__ */ O.jsx(O.Fragment, { children: /* @__PURE__ */ O.jsx(
    "span",
    {
      onMouseUp: i,
      onMouseDown: (c) => c.stopPropagation(),
      style: {
        top: -4,
        left: -4,
        width: o + 8,
        height: r + 8,
        position: "absolute",
        //backgroundColor: 'red',
        pointerEvents: s ? "auto" : "none"
      }
    }
  ) });
}, bn = ({ node: e }) => {
  const r = K(e.id), o = ar(r), n = ir(), a = pt(), { selectedItemsId: s } = _e(), f = Ye(), i = Pe(), c = dn(), { window: u } = Se.useFrame(), [p, w] = St(e.left), m = K(e.height), [E, b] = St(e.top), T = K(e.width), x = we({ top: 0, left: 0 }), M = be((j) => {
    if (a(r, Ae(j.nativeEvent)), !s.value.some((C) => C === r) || !u)
      return;
    const l = (C) => {
      const D = (C.pageX - f.left.value) / i.value - x.current.left, ee = (C.pageY - f.top.value) / i.value - x.current.top, U = nt(D, c) - e.left.value, z = nt(ee, c) - e.top.value;
      U === 0 && z === 0 || n(U, z);
    }, q = () => {
      u.removeEventListener("mousemove", l), u.removeEventListener("mouseup", q);
    };
    x.current = {
      top: (j.nativeEvent.pageY - f.top.value) / i.value - E,
      left: (j.nativeEvent.pageX - f.left.value) / i.value - p
    }, u.addEventListener("mousemove", l), u.addEventListener("mouseup", q);
  }, [w, b, a, n, nt, c, r, u, f, i, e.left, e.top]), I = ae(() => e.render({
    width: e.width,
    height: e.height,
    isSelected: o
  }), [e.render, e.width, e.height, o]), $ = ae(() => `translate(${p}px, ${E}px)`, [p, E]);
  return /* @__PURE__ */ O.jsxs(
    "div",
    {
      onMouseDown: M,
      className: "draggable-container",
      style: { width: T, height: m, transform: $ },
      children: [
        /* @__PURE__ */ O.jsx("div", { className: "draggable-container-content", children: I }),
        /* @__PURE__ */ O.jsx(
          gn,
          {
            nodeId: r,
            width: T,
            height: m,
            getIsDisabledDropConnection: () => {
              var j;
              return !!((j = e.disableDropConnections) != null && j.call(e));
            },
            getIsDisabledCreateConnection: () => {
              var j;
              return !!((j = e.disableCreateConnections) != null && j.call(e));
            }
          }
        )
      ]
    }
  );
}, wn = ({ children: e }) => {
  const r = K(ze().height), o = K(ze().width), n = K(Pe());
  return /* @__PURE__ */ O.jsx("svg", { style: {
    zoom: n,
    transition: "all",
    minWidth: "100vw",
    minHeight: "100vh",
    position: "absolute",
    pointerEvents: "none",
    width: (o + 500) / n,
    height: (r + 500) / n
  }, children: e });
}, En = ({ children: e }) => {
  const r = K(ze().height), o = K(ze().width), n = K(Pe());
  return /* @__PURE__ */ O.jsx("div", { style: {
    zoom: n,
    pointerEvents: "none",
    width: (o + 500) / n,
    height: (r + 500) / n
  }, children: e });
}, xn = ({ onSelectionEnd: e, onSelectionStart: r, isDisabled: o = !1, onCoordsChange: n, boardRef: a }) => {
  const s = Ye(), f = Pe(), { window: i } = Se.useFrame(), [c, u] = pe(0), [p, w] = pe(!1), [m, E] = pe(0), [b, T] = pe(0), [x, M] = pe(0), I = be((C) => {
    var U;
    if (!i || !((U = a.current) != null && U.isSameNode(C.target)))
      return;
    r == null || r(C);
    const D = (z) => {
      T((z.pageX - s.left.value) / f.value), M((z.pageY - s.top.value) / f.value);
    }, ee = (z) => {
      i.removeEventListener("mousemove", D), i.removeEventListener("mouseup", ee), e == null || e(z), w(!1);
    };
    u((C.offsetX - s.left.value) / f.value), E((C.offsetY - s.top.value) / f.value), T((C.offsetX - s.left.value) / f.value), M((C.offsetY - s.top.value) / f.value), w(!0), i.addEventListener("mousemove", D), i.addEventListener("mouseup", ee);
  }, [i, s, f, a]);
  Ce(() => {
    if (i && !o)
      return i.addEventListener("mousedown", I), () => i.removeEventListener("mousedown", I);
  }, [i, o, I]);
  const $ = ae(() => x - m > 0 || m < x ? m : x, [x, m]), j = ae(() => b - c > 0 || c < b ? c : b, [b, c]), l = ae(() => b - c > 0 || c - b < 0 ? b - c : c - b, [b, c]), q = ae(() => x - m > 0 || m - x < 0 ? x - m : m - x, [x, m]);
  return Ce(() => {
    n == null || n({
      startY: $,
      startX: j,
      endY: $ + q,
      endX: j + l
    });
  }, [$, j, q, l]), o || !p ? null : /* @__PURE__ */ O.jsx(
    "rect",
    {
      y: $,
      x: j,
      width: l,
      height: q,
      strokeWidth: 1,
      stroke: "#999fff",
      fill: "#ffffff11"
    }
  );
}, lr = ({ lineId: e, isCurved: r, newConnection: o = !1, position1FromCenter: n = !1, disableStartDraggable: a = !1, nodeId: s, lineWidth: f, onDragLineEnd: i, onDragLineStart: c, ...u }) => {
  const p = ot(nr()), w = pt(), m = Ye(), E = Pe(), { window: b } = Se.useFrame(), T = we(!1), [x, M] = pe(u.top1), [I, $] = pe(u.top2), [j, l] = pe(u.left1), [q, C] = pe(u.left2), [D, ee] = pe();
  Ce(() => {
    M(u.top1), $(u.top2), l(u.left1), C(u.left2);
  }, [u.top1, u.top2, u.left1, u.left2]);
  const U = ae(() => {
    const V = sr(
      {
        y: x - (D === "start" ? 10 : 5),
        x: j - (D === "start" ? 10 : 5),
        width: D === "start" ? 20 : u.width1 + 10,
        height: D === "start" ? 20 : u.height1 + 10
      },
      {
        y: I - (D === "end" ? 10 : 5),
        x: q - (D === "end" ? 10 : 5),
        width: D === "end" ? 20 : u.width2 + 10,
        height: D === "end" ? 20 : u.height2 + 10
      }
    );
    if (r && !D) {
      const [Z] = cr({
        sourceX: V.sourceX,
        sourceY: V.sourceY,
        targetX: V.targetX,
        targetY: V.targetY
      }, { offset: 35 });
      return Z;
    } else {
      const [Z] = ur({
        sourceX: V.sourceX,
        sourceY: V.sourceY,
        targetX: V.targetX,
        targetY: V.targetY
      });
      return Z;
    }
  }, [r, D, x, I, j, q, u.width1, u.height1, u.width2, u.height2]), z = be((J) => {
    if (e && w([e], Ae(J.nativeEvent)), !b)
      return;
    const V = (ne) => {
      T.current || (ee("start"), c == null || c(), p({ type: "start", nodeId: s, lineId: e }), T.current = !0);
      const se = (ne.pageX - m.left.value) / E.value, ue = (ne.pageY - m.top.value) / E.value;
      l(se), M(ue);
    }, Z = () => {
      T.current = !1, ee(void 0), l(u.left1), p(void 0), M(u.top1), i == null || i(), b.removeEventListener("mousemove", V), b.removeEventListener("mouseup", Z);
    };
    b.addEventListener("mousemove", V), b.addEventListener("mouseup", Z);
  }, [p, c, i, b, m, E, x, j, u.left1, u.top1, s, e]), te = be((J) => {
    if (e && w([e], Ae(J.nativeEvent)), !b)
      return;
    const V = (ne) => {
      T.current || (ee("end"), c == null || c(), p({ type: "end", nodeId: s, lineId: e }), T.current = !0);
      const se = (ne.pageX - m.left.value) / E.value, ue = (ne.pageY - m.top.value) / E.value;
      C(se), $(ue);
    }, Z = () => {
      T.current = !1, ee(void 0), C(u.left2), p(void 0), $(u.top2), i == null || i(), b.removeEventListener("mousemove", V), b.removeEventListener("mouseup", Z);
    };
    b.addEventListener("mousemove", V), b.addEventListener("mouseup", Z);
  }, [p, c, i, b, m, E, u.left2, u.top2, s, e]), ie = be((J) => {
    const V = J.currentTarget.getTotalLength(), Z = J.clientX, ne = J.clientY;
    let se = 0, ue = 1 / 0;
    const v = 100;
    for (let R = 0; R <= v; R++) {
      const _ = R / v * V, L = J.currentTarget.getPointAtLength(_), k = Math.sqrt(
        Math.pow(Z - L.x, 2) + Math.pow(ne - L.y, 2)
      );
      k < ue && (ue = k, se = _);
    }
    const h = V / 2;
    se <= h ? z(J) : te(J);
  }, [z, te]);
  return /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
    D && /* @__PURE__ */ O.jsx(
      "path",
      {
        fill: "none",
        d: U,
        stroke: "#0f77bf",
        strokeLinecap: "round",
        strokeWidth: f,
        markerEnd: `url(#end-line-arrow-${e})`
      }
    ),
    o && /* @__PURE__ */ O.jsx(
      "rect",
      {
        x: j - 6.5,
        fill: "transparent",
        width: u.width1 + 15,
        height: u.height1 / 2 + 15,
        onMouseDown: te,
        y: x + u.height1 / 2,
        style: { cursor: "crosshair", pointerEvents: D ? "none" : "auto" }
      }
    ),
    !D && !o && /* @__PURE__ */ O.jsx(
      "path",
      {
        fill: "none",
        d: U,
        strokeWidth: 14,
        stroke: "transparent",
        onMouseDown: ie,
        style: { cursor: "crosshair", pointerEvents: "auto" }
      }
    )
  ] });
}, _n = ({ onDrop: e, ...r }) => {
  const [o, n] = pe(!1), [a, s] = pe(!1), f = K(r.top1Observable), i = K(r.top2Observable), c = K(r.lineIdObservable), u = K(r.left1Observable), p = K(r.left2Observable), w = K(r.blockIdObservable), m = K(r.width1Observable), E = K(r.width2Observable), b = K(r.isCurvedObservable), T = K(r.height1Observable), x = K(r.height2Observable), M = K(ar(c)), I = ae(() => 2.5, []), $ = ae(() => 1, []), j = ae(() => {
    const C = sr(
      {
        y: f - 5,
        x: u - 5,
        width: m + 10,
        height: T + 10
      },
      {
        y: i - 5,
        x: p - 5,
        width: E + 10,
        height: x + 10
      }
    );
    if (b) {
      const [D] = cr({
        sourceX: C.sourceX,
        sourceY: C.sourceY,
        targetX: C.targetX,
        targetY: C.targetY
      }, { offset: 35 });
      return D;
    } else {
      const [D] = ur({
        sourceX: C.sourceX,
        sourceY: C.sourceY,
        targetX: C.targetX,
        targetY: C.targetY
      });
      return D;
    }
  }, [b, f, i, u, p, m, E, T, x]), l = we(null), q = Ye();
  return zt({
    element: l,
    id: we(ct()).current,
    leave: () => n(!1),
    hover: () => n((C) => C || !0),
    drop: (C, { x: D, y: ee }) => {
      n(!1), e == null || e({
        data: C,
        top: ee + -q.top.value,
        left: D + -q.left.value,
        target: { type: "line", lineId: c, nodeId: w }
      });
    }
  }), /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
    /* @__PURE__ */ O.jsx("defs", { children: /* @__PURE__ */ O.jsx("marker", { orient: "auto", refX: 2.8 * I, refY: 2.4 * I, markerWidth: 10 * I, markerHeight: 8 * I, id: `end-line-arrow-${c}`, children: /* @__PURE__ */ O.jsx("polygon", { points: `0 ${1 * I}, ${3 * I} ${2.4 * I}, 0 ${4 * I}`, stroke: M ? "#0f77bf" : "gray", fill: M ? "#0f77bf" : "gray" }) }) }),
    !a && /* @__PURE__ */ O.jsx(
      "path",
      {
        d: j,
        fill: "none",
        strokeLinecap: "round",
        strokeWidth: $,
        markerEnd: `url(#end-line-arrow-${c})`,
        stroke: M || o ? "#0f77bf" : "gray"
      }
    ),
    /* @__PURE__ */ O.jsx(
      lr,
      {
        top1: f,
        top2: i,
        lineId: c,
        left1: u,
        left2: p,
        nodeId: w,
        width1: m,
        width2: E,
        isCurved: b,
        height1: T,
        height2: x,
        lineWidth: $,
        disableStartDraggable: b,
        onDragLineEnd: () => s(!1),
        onDragLineStart: () => s(!0)
      }
    )
  ] });
}, Tn = ({ node: e }) => {
  var c;
  const r = K(e.height), o = K(e.width), n = K(e.left), a = K(e.top), s = K(e.id), f = ae(() => 2.5, []), i = ae(() => 1, []);
  return (c = e.disableCreateConnections) != null && c.call(e) ? null : /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
    /* @__PURE__ */ O.jsx("defs", { children: /* @__PURE__ */ O.jsx("marker", { orient: "auto", refX: 2.8 * f, refY: 2.4 * f, markerWidth: 10 * f, markerHeight: 8 * f, id: "end-line-arrow-undefined", children: /* @__PURE__ */ O.jsx("polygon", { points: `0 ${1 * f}, ${3 * f} ${2.4 * f}, 0 ${4 * f}`, stroke: "#0f77bf", fill: "#0f77bf" }) }) }),
    /* @__PURE__ */ O.jsx(
      lr,
      {
        top2: a,
        top1: a,
        nodeId: s,
        left2: n,
        left1: n,
        width1: o,
        width2: o,
        height2: r,
        height1: r,
        lineId: void 0,
        newConnection: !0,
        position1FromCenter: !0,
        lineWidth: i
      }
    )
  ] });
}, On = ({ backgroundColorDefault: e = "#1e1e1e", backgroundColorPaper: r = "#484848", backgroundDotColor: o = "#484848", backgroundSize: n = 30, disableDropInLines: a = !1, onRemove: s, onDrop: f }) => {
  const i = we(null), { document: c } = Se.useFrame(), u = Ye(), p = Pe(), w = ot(u.left), m = ot(u.top), { flowStore: E, linesStore: b, selectedItemsId: T } = _e(), x = ir(), M = pt(), I = K(b), $ = K(E);
  zt({
    element: i,
    id: we(ct()).current,
    drop: (l, { x: q, y: C }) => f == null ? void 0 : f({
      data: l,
      target: { type: "board" },
      top: (C + -u.top.value) / p.value,
      left: (q + -u.left.value) / p.value
    })
  }, [u, p]), Ce(() => {
    if (!c)
      return;
    const l = (U) => {
      Ae(U) && (U.stopImmediatePropagation(), U.stopPropagation(), U.preventDefault(), U.deltaY < 0 ? fe(p, (z) => z >= 2 ? z : z + 0.1) : fe(p, (z) => z <= 0.2 ? z : z - 0.1));
    }, q = (U) => {
      Ae(U) && U.key === "a" && M(E.value.map((z) => z.id.value));
    }, C = (U) => {
      U.key === "Escape" && M([]);
    }, D = (U) => {
      U.key === "Delete" && T.value.length > 0 && (s == null || s(T.value));
    }, ee = (U) => {
      const z = U.altKey ? 30 : 15;
      U.key === "ArrowUp" ? x(0, -z) : U.key === "ArrowRight" ? x(z, 0) : U.key === "ArrowDown" ? x(0, z) : U.key === "ArrowLeft" && x(-z, 0);
    };
    return c.addEventListener("keydown", C, { passive: !1 }), c.addEventListener("keydown", ee, { passive: !1 }), c.addEventListener("keydown", q, { passive: !1 }), c.addEventListener("keydown", D, { passive: !1 }), c.addEventListener("wheel", l, { passive: !1 }), () => {
      c.removeEventListener("keydown", C), c.removeEventListener("keydown", ee), c.removeEventListener("keydown", q), c.removeEventListener("keydown", D), c.removeEventListener("wheel", l);
    };
  }, [p, c, T, s, x]);
  const j = be((l) => {
    const q = l.endY, C = l.endX, D = l.startY, ee = l.startX, U = (te) => {
      const ie = te.top.value, J = te.left.value, V = te.top.value + te.height.value, Z = te.left.value + te.width.value, ne = q - D > 0, se = C - ee > 0, ue = (h, P, R, _) => (h <= R || P <= R) && (h >= _ || P >= _), v = (h, P, R, _) => (h >= R || P >= R) && (h <= _ || P <= _);
      return (ne ? v(ie, V, D, q) : ue(ie, V, D, q)) && (se ? v(J, Z, ee, C) : ue(J, Z, ee, C));
    }, z = $.filter((te) => U(te)).map((te) => te.id.value);
    M(z);
  }, [$, M]);
  return /* @__PURE__ */ O.jsx(
    "div",
    {
      className: "panel-wrapper",
      style: {
        "--color-panel-dot": o,
        "--color-panel-paper": r,
        "--color-panel-default": e,
        backgroundSize: `${n / devicePixelRatio}px ${n / devicePixelRatio}px`
      },
      children: /* @__PURE__ */ O.jsxs(
        "div",
        {
          ref: i,
          className: "panel",
          onScroll: (l) => {
            m(-l.currentTarget.scrollTop), w(-l.currentTarget.scrollLeft);
          },
          onMouseDown: (l) => {
            var q;
            return (q = i.current) != null && q.isSameNode(l.target) ? M([]) : void 0;
          },
          children: [
            /* @__PURE__ */ O.jsxs(wn, { children: [
              $.map((l) => /* @__PURE__ */ O.jsx(Tn, { node: l }, l.id.value)),
              I.map((l) => /* @__PURE__ */ O.jsx(
                _n,
                {
                  lineIdObservable: l.id,
                  blockIdObservable: l.nodeId,
                  top1Observable: l.top1,
                  top2Observable: l.top2,
                  left1Observable: l.left1,
                  left2Observable: l.left2,
                  width1Observable: l.width1,
                  width2Observable: l.width2,
                  height1Observable: l.height1,
                  height2Observable: l.height2,
                  isCurvedObservable: l.isCurved,
                  onDrop: a ? void 0 : f
                },
                l.key
              )),
              /* @__PURE__ */ O.jsx(
                xn,
                {
                  boardRef: i,
                  onCoordsChange: j
                }
              )
            ] }),
            /* @__PURE__ */ O.jsx(En, { children: $.map((l) => /* @__PURE__ */ O.jsx(bn, { node: l }, l.id.value)) })
          ]
        }
      )
    }
  );
}, Rn = `
:root {
  --color-panel-paper: #484848;
  --color-panel-default: #1e1e1e;
  --color-panel-dot: #1e1e1e;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: block;
}

.panel-wrapper {
  z-index: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  position: fixed;
  overflow: hidden;
  background-image: radial-gradient(var(--color-panel-dot) 5%, var(--color-panel-default) 5%);
}

.panel {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: auto;
  position: fixed;
  background-color: transparent;
}



/* Ajusta o scroll de todos os elementos. */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar:horizontal {
  height: 16px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--color-panel-paper);
}
`, Cn = un, Mn = ({ snapGridSize: e = 15, items: r, customCSS: o = "", ...n }) => {
  const a = ae(() => /* @__PURE__ */ O.jsx(O.Fragment, { children: /* @__PURE__ */ O.jsx("style", { children: [
    o,
    Rn,
    hn
  ].join(`
`) }) }), [o]);
  return /* @__PURE__ */ O.jsx(
    Cn,
    {
      tabIndex: -1,
      head: a,
      mountTarget: "body",
      onContextMenu: (s) => s.preventDefault(),
      initialContent: '<html tabindex="0"><head></head><body style="margin:0;"></body></html>',
      style: { width: "100%", height: "100%", display: "block", margin: 0, padding: 0, border: "none" },
      children: /* @__PURE__ */ O.jsx(pn, { items: r, children: /* @__PURE__ */ O.jsx(fn, { value: e, children: /* @__PURE__ */ O.jsx(ln, { value: 1, children: /* @__PURE__ */ O.jsx(vn, { children: /* @__PURE__ */ O.jsx(cn, { children: /* @__PURE__ */ O.jsx(On, { ...n }) }) }) }) }) })
    }
  );
};
export {
  Mn as FlowEditor
};
//# sourceMappingURL=index.es.js.map
