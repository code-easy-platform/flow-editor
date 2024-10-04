import $e, { createContext as Ae, useMemo as W, useContext as De, useRef as xe, useEffect as Ce, useCallback as ye, useState as fe } from "react";
import jr from "react-dom";
import { observe as de, selector as ke, set as ve, useObserverValue as Z, useObserver as Pt, useSetObserver as qe } from "react-observing";
import { useDrop as zt } from "react-use-drag-and-drop";
import { v4 as lt } from "uuid";
function kr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var it = { exports: {} }, Ie = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var St;
function Ir() {
  if (St)
    return Ie;
  St = 1;
  var e = $e, r = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(s, a, f) {
    var h, v = {}, y = null, m = null;
    f !== void 0 && (y = "" + f), a.key !== void 0 && (y = "" + a.key), a.ref !== void 0 && (m = a.ref);
    for (h in a)
      n.call(a, h) && !u.hasOwnProperty(h) && (v[h] = a[h]);
    if (s && s.defaultProps)
      for (h in a = s.defaultProps, a)
        v[h] === void 0 && (v[h] = a[h]);
    return { $$typeof: r, type: s, key: y, ref: m, props: v, _owner: i.current };
  }
  return Ie.Fragment = o, Ie.jsx = c, Ie.jsxs = c, Ie;
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
function Mr() {
  return jt || (jt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = $e, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), E = Symbol.iterator, O = "@@iterator";
    function T(t) {
      if (t === null || typeof t != "object")
        return null;
      var d = E && t[E] || t[O];
      return typeof d == "function" ? d : null;
    }
    var k = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function I(t) {
      {
        for (var d = arguments.length, g = new Array(d > 1 ? d - 1 : 0), P = 1; P < d; P++)
          g[P - 1] = arguments[P];
        _("error", t, g);
      }
    }
    function _(t, d, g) {
      {
        var P = k.ReactDebugCurrentFrame, X = P.getStackAddendum();
        X !== "" && (d += "%s", g = g.concat([X]));
        var Q = g.map(function(N) {
          return String(N);
        });
        Q.unshift("Warning: " + d), Function.prototype.apply.call(console[t], console, Q);
      }
    }
    var C = !1, l = !1, L = !1, U = !1, V = !1, H;
    H = Symbol.for("react.module.reference");
    function A(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === n || t === u || V || t === i || t === f || t === h || U || t === m || C || l || L || typeof t == "object" && t !== null && (t.$$typeof === y || t.$$typeof === v || t.$$typeof === c || t.$$typeof === s || t.$$typeof === a || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === H || t.getModuleId !== void 0));
    }
    function D(t, d, g) {
      var P = t.displayName;
      if (P)
        return P;
      var X = d.displayName || d.name || "";
      return X !== "" ? g + "(" + X + ")" : g;
    }
    function ee(t) {
      return t.displayName || "Context";
    }
    function K(t) {
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
        case u:
          return "Profiler";
        case i:
          return "StrictMode";
        case f:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case s:
            var d = t;
            return ee(d) + ".Consumer";
          case c:
            var g = t;
            return ee(g._context) + ".Provider";
          case a:
            return D(t, t.render, "ForwardRef");
          case v:
            var P = t.displayName || null;
            return P !== null ? P : K(t.type) || "Memo";
          case y: {
            var X = t, Q = X._payload, N = X._init;
            try {
              return K(N(Q));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var te = Object.assign, oe = 0, re, ie, me, ge, p, b, j;
    function S() {
    }
    S.__reactDisabledLog = !0;
    function R() {
      {
        if (oe === 0) {
          re = console.log, ie = console.info, me = console.warn, ge = console.error, p = console.group, b = console.groupCollapsed, j = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: S,
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
        oe++;
      }
    }
    function z() {
      {
        if (oe--, oe === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: te({}, t, {
              value: re
            }),
            info: te({}, t, {
              value: ie
            }),
            warn: te({}, t, {
              value: me
            }),
            error: te({}, t, {
              value: ge
            }),
            group: te({}, t, {
              value: p
            }),
            groupCollapsed: te({}, t, {
              value: b
            }),
            groupEnd: te({}, t, {
              value: j
            })
          });
        }
        oe < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var M = k.ReactCurrentDispatcher, $;
    function F(t, d, g) {
      {
        if ($ === void 0)
          try {
            throw Error();
          } catch (X) {
            var P = X.stack.trim().match(/\n( *(at )?)/);
            $ = P && P[1] || "";
          }
        return `
` + $ + t;
      }
    }
    var B = !1, Y;
    {
      var se = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new se();
    }
    function w(t, d) {
      if (!t || B)
        return "";
      {
        var g = Y.get(t);
        if (g !== void 0)
          return g;
      }
      var P;
      B = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Q;
      Q = M.current, M.current = null, R();
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
            } catch (be) {
              P = be;
            }
            Reflect.construct(t, [], N);
          } else {
            try {
              N.call();
            } catch (be) {
              P = be;
            }
            t.call(N.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (be) {
            P = be;
          }
          t();
        }
      } catch (be) {
        if (be && P && typeof be.stack == "string") {
          for (var q = be.stack.split(`
`), ue = P.stack.split(`
`), ne = q.length - 1, ae = ue.length - 1; ne >= 1 && ae >= 0 && q[ne] !== ue[ae]; )
            ae--;
          for (; ne >= 1 && ae >= 0; ne--, ae--)
            if (q[ne] !== ue[ae]) {
              if (ne !== 1 || ae !== 1)
                do
                  if (ne--, ae--, ae < 0 || q[ne] !== ue[ae]) {
                    var le = `
` + q[ne].replace(" at new ", " at ");
                    return t.displayName && le.includes("<anonymous>") && (le = le.replace("<anonymous>", t.displayName)), typeof t == "function" && Y.set(t, le), le;
                  }
                while (ne >= 1 && ae >= 0);
              break;
            }
        }
      } finally {
        B = !1, M.current = Q, z(), Error.prepareStackTrace = X;
      }
      var Re = t ? t.displayName || t.name : "", Ct = Re ? F(Re) : "";
      return typeof t == "function" && Y.set(t, Ct), Ct;
    }
    function ce(t, d, g) {
      return w(t, !1);
    }
    function Te(t) {
      var d = t.prototype;
      return !!(d && d.isReactComponent);
    }
    function we(t, d, g) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return w(t, Te(t));
      if (typeof t == "string")
        return F(t);
      switch (t) {
        case f:
          return F("Suspense");
        case h:
          return F("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case a:
            return ce(t.render);
          case v:
            return we(t.type, d, g);
          case y: {
            var P = t, X = P._payload, Q = P._init;
            try {
              return we(Q(X), d, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Ye = Object.prototype.hasOwnProperty, ht = {}, yt = k.ReactDebugCurrentFrame;
    function We(t) {
      if (t) {
        var d = t._owner, g = we(t.type, t._source, d ? d.type : null);
        yt.setExtraStackFrame(g);
      } else
        yt.setExtraStackFrame(null);
    }
    function lr(t, d, g, P, X) {
      {
        var Q = Function.call.bind(Ye);
        for (var N in t)
          if (Q(t, N)) {
            var q = void 0;
            try {
              if (typeof t[N] != "function") {
                var ue = Error((P || "React class") + ": " + g + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ue.name = "Invariant Violation", ue;
              }
              q = t[N](d, N, P, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ne) {
              q = ne;
            }
            q && !(q instanceof Error) && (We(X), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", g, N, typeof q), We(null)), q instanceof Error && !(q.message in ht) && (ht[q.message] = !0, We(X), I("Failed %s type: %s", g, q.message), We(null));
          }
      }
    }
    var fr = Array.isArray;
    function Xe(t) {
      return fr(t);
    }
    function dr(t) {
      {
        var d = typeof Symbol == "function" && Symbol.toStringTag, g = d && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return g;
      }
    }
    function vr(t) {
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
      if (vr(t))
        return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", dr(t)), mt(t);
    }
    var je = k.ReactCurrentOwner, pr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, bt, wt, He;
    He = {};
    function hr(t) {
      if (Ye.call(t, "ref")) {
        var d = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function yr(t) {
      if (Ye.call(t, "key")) {
        var d = Object.getOwnPropertyDescriptor(t, "key").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function mr(t, d) {
      if (typeof t.ref == "string" && je.current && d && je.current.stateNode !== d) {
        var g = K(je.current.type);
        He[g] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(je.current.type), t.ref), He[g] = !0);
      }
    }
    function gr(t, d) {
      {
        var g = function() {
          bt || (bt = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        g.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function br(t, d) {
      {
        var g = function() {
          wt || (wt = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        g.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var wr = function(t, d, g, P, X, Q, N) {
      var q = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: d,
        ref: g,
        props: N,
        // Record the component responsible for creating this element.
        _owner: Q
      };
      return q._store = {}, Object.defineProperty(q._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(q, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.defineProperty(q, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(q.props), Object.freeze(q)), q;
    };
    function Er(t, d, g, P, X) {
      {
        var Q, N = {}, q = null, ue = null;
        g !== void 0 && (gt(g), q = "" + g), yr(d) && (gt(d.key), q = "" + d.key), hr(d) && (ue = d.ref, mr(d, X));
        for (Q in d)
          Ye.call(d, Q) && !pr.hasOwnProperty(Q) && (N[Q] = d[Q]);
        if (t && t.defaultProps) {
          var ne = t.defaultProps;
          for (Q in ne)
            N[Q] === void 0 && (N[Q] = ne[Q]);
        }
        if (q || ue) {
          var ae = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          q && gr(N, ae), ue && br(N, ae);
        }
        return wr(t, q, ue, X, P, je.current, N);
      }
    }
    var Ge = k.ReactCurrentOwner, Et = k.ReactDebugCurrentFrame;
    function Oe(t) {
      if (t) {
        var d = t._owner, g = we(t.type, t._source, d ? d.type : null);
        Et.setExtraStackFrame(g);
      } else
        Et.setExtraStackFrame(null);
    }
    var Je;
    Je = !1;
    function Ke(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function xt() {
      {
        if (Ge.current) {
          var t = K(Ge.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function xr(t) {
      {
        if (t !== void 0) {
          var d = t.fileName.replace(/^.*[\\\/]/, ""), g = t.lineNumber;
          return `

Check your code at ` + d + ":" + g + ".";
        }
        return "";
      }
    }
    var _t = {};
    function _r(t) {
      {
        var d = xt();
        if (!d) {
          var g = typeof t == "string" ? t : t.displayName || t.name;
          g && (d = `

Check the top-level render call using <` + g + ">.");
        }
        return d;
      }
    }
    function Tt(t, d) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var g = _r(d);
        if (_t[g])
          return;
        _t[g] = !0;
        var P = "";
        t && t._owner && t._owner !== Ge.current && (P = " It was passed a child from " + K(t._owner.type) + "."), Oe(t), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, P), Oe(null);
      }
    }
    function Ot(t, d) {
      {
        if (typeof t != "object")
          return;
        if (Xe(t))
          for (var g = 0; g < t.length; g++) {
            var P = t[g];
            Ke(P) && Tt(P, d);
          }
        else if (Ke(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var X = T(t);
          if (typeof X == "function" && X !== t.entries)
            for (var Q = X.call(t), N; !(N = Q.next()).done; )
              Ke(N.value) && Tt(N.value, d);
        }
      }
    }
    function Tr(t) {
      {
        var d = t.type;
        if (d == null || typeof d == "string")
          return;
        var g;
        if (typeof d == "function")
          g = d.propTypes;
        else if (typeof d == "object" && (d.$$typeof === a || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        d.$$typeof === v))
          g = d.propTypes;
        else
          return;
        if (g) {
          var P = K(d);
          lr(g, t.props, "prop", P, t);
        } else if (d.PropTypes !== void 0 && !Je) {
          Je = !0;
          var X = K(d);
          I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof d.getDefaultProps == "function" && !d.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Or(t) {
      {
        for (var d = Object.keys(t.props), g = 0; g < d.length; g++) {
          var P = d[g];
          if (P !== "children" && P !== "key") {
            Oe(t), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), Oe(null);
            break;
          }
        }
        t.ref !== null && (Oe(t), I("Invalid attribute `ref` supplied to `React.Fragment`."), Oe(null));
      }
    }
    function Rt(t, d, g, P, X, Q) {
      {
        var N = A(t);
        if (!N) {
          var q = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ue = xr(X);
          ue ? q += ue : q += xt();
          var ne;
          t === null ? ne = "null" : Xe(t) ? ne = "array" : t !== void 0 && t.$$typeof === r ? (ne = "<" + (K(t.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : ne = typeof t, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ne, q);
        }
        var ae = Er(t, d, g, X, Q);
        if (ae == null)
          return ae;
        if (N) {
          var le = d.children;
          if (le !== void 0)
            if (P)
              if (Xe(le)) {
                for (var Re = 0; Re < le.length; Re++)
                  Ot(le[Re], t);
                Object.freeze && Object.freeze(le);
              } else
                I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ot(le, t);
        }
        return t === n ? Or(ae) : Tr(ae), ae;
      }
    }
    function Rr(t, d, g) {
      return Rt(t, d, g, !0);
    }
    function Cr(t, d, g) {
      return Rt(t, d, g, !1);
    }
    var Pr = Cr, Sr = Rr;
    Me.Fragment = n, Me.jsx = Pr, Me.jsxs = Sr;
  }()), Me;
}
process.env.NODE_ENV === "production" ? it.exports = Ir() : it.exports = Mr();
var x = it.exports, Pe = {}, Le = {}, st = { exports: {} }, Ue = { exports: {} }, G = {};
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
    return G;
  kt = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, u = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, a = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, O = e ? Symbol.for("react.block") : 60121, T = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function _(l) {
    if (typeof l == "object" && l !== null) {
      var L = l.$$typeof;
      switch (L) {
        case r:
          switch (l = l.type, l) {
            case a:
            case f:
            case n:
            case u:
            case i:
            case v:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case s:
                case h:
                case E:
                case m:
                case c:
                  return l;
                default:
                  return L;
              }
          }
        case o:
          return L;
      }
    }
  }
  function C(l) {
    return _(l) === f;
  }
  return G.AsyncMode = a, G.ConcurrentMode = f, G.ContextConsumer = s, G.ContextProvider = c, G.Element = r, G.ForwardRef = h, G.Fragment = n, G.Lazy = E, G.Memo = m, G.Portal = o, G.Profiler = u, G.StrictMode = i, G.Suspense = v, G.isAsyncMode = function(l) {
    return C(l) || _(l) === a;
  }, G.isConcurrentMode = C, G.isContextConsumer = function(l) {
    return _(l) === s;
  }, G.isContextProvider = function(l) {
    return _(l) === c;
  }, G.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === r;
  }, G.isForwardRef = function(l) {
    return _(l) === h;
  }, G.isFragment = function(l) {
    return _(l) === n;
  }, G.isLazy = function(l) {
    return _(l) === E;
  }, G.isMemo = function(l) {
    return _(l) === m;
  }, G.isPortal = function(l) {
    return _(l) === o;
  }, G.isProfiler = function(l) {
    return _(l) === u;
  }, G.isStrictMode = function(l) {
    return _(l) === i;
  }, G.isSuspense = function(l) {
    return _(l) === v;
  }, G.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === n || l === f || l === u || l === i || l === v || l === y || typeof l == "object" && l !== null && (l.$$typeof === E || l.$$typeof === m || l.$$typeof === c || l.$$typeof === s || l.$$typeof === h || l.$$typeof === T || l.$$typeof === k || l.$$typeof === I || l.$$typeof === O);
  }, G.typeOf = _, G;
}
var J = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var It;
function Ar() {
  return It || (It = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, u = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, a = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, O = e ? Symbol.for("react.block") : 60121, T = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function _(w) {
      return typeof w == "string" || typeof w == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      w === n || w === f || w === u || w === i || w === v || w === y || typeof w == "object" && w !== null && (w.$$typeof === E || w.$$typeof === m || w.$$typeof === c || w.$$typeof === s || w.$$typeof === h || w.$$typeof === T || w.$$typeof === k || w.$$typeof === I || w.$$typeof === O);
    }
    function C(w) {
      if (typeof w == "object" && w !== null) {
        var ce = w.$$typeof;
        switch (ce) {
          case r:
            var Te = w.type;
            switch (Te) {
              case a:
              case f:
              case n:
              case u:
              case i:
              case v:
                return Te;
              default:
                var we = Te && Te.$$typeof;
                switch (we) {
                  case s:
                  case h:
                  case E:
                  case m:
                  case c:
                    return we;
                  default:
                    return ce;
                }
            }
          case o:
            return ce;
        }
      }
    }
    var l = a, L = f, U = s, V = c, H = r, A = h, D = n, ee = E, K = m, te = o, oe = u, re = i, ie = v, me = !1;
    function ge(w) {
      return me || (me = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), p(w) || C(w) === a;
    }
    function p(w) {
      return C(w) === f;
    }
    function b(w) {
      return C(w) === s;
    }
    function j(w) {
      return C(w) === c;
    }
    function S(w) {
      return typeof w == "object" && w !== null && w.$$typeof === r;
    }
    function R(w) {
      return C(w) === h;
    }
    function z(w) {
      return C(w) === n;
    }
    function M(w) {
      return C(w) === E;
    }
    function $(w) {
      return C(w) === m;
    }
    function F(w) {
      return C(w) === o;
    }
    function B(w) {
      return C(w) === u;
    }
    function Y(w) {
      return C(w) === i;
    }
    function se(w) {
      return C(w) === v;
    }
    J.AsyncMode = l, J.ConcurrentMode = L, J.ContextConsumer = U, J.ContextProvider = V, J.Element = H, J.ForwardRef = A, J.Fragment = D, J.Lazy = ee, J.Memo = K, J.Portal = te, J.Profiler = oe, J.StrictMode = re, J.Suspense = ie, J.isAsyncMode = ge, J.isConcurrentMode = p, J.isContextConsumer = b, J.isContextProvider = j, J.isElement = S, J.isForwardRef = R, J.isFragment = z, J.isLazy = M, J.isMemo = $, J.isPortal = F, J.isProfiler = B, J.isStrictMode = Y, J.isSuspense = se, J.isValidElementType = _, J.typeOf = C;
  }()), J;
}
var Mt;
function Nt() {
  return Mt || (Mt = 1, process.env.NODE_ENV === "production" ? Ue.exports = $r() : Ue.exports = Ar()), Ue.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ze, $t;
function Dr() {
  if ($t)
    return Ze;
  $t = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
  function n(u) {
    if (u == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(u);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var u = new String("abc");
      if (u[5] = "de", Object.getOwnPropertyNames(u)[0] === "5")
        return !1;
      for (var c = {}, s = 0; s < 10; s++)
        c["_" + String.fromCharCode(s)] = s;
      var a = Object.getOwnPropertyNames(c).map(function(h) {
        return c[h];
      });
      if (a.join("") !== "0123456789")
        return !1;
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(h) {
        f[h] = h;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ze = i() ? Object.assign : function(u, c) {
    for (var s, a = n(u), f, h = 1; h < arguments.length; h++) {
      s = Object(arguments[h]);
      for (var v in s)
        r.call(s, v) && (a[v] = s[v]);
      if (e) {
        f = e(s);
        for (var y = 0; y < f.length; y++)
          o.call(s, f[y]) && (a[f[y]] = s[f[y]]);
      }
    }
    return a;
  }, Ze;
}
var Qe, At;
function ft() {
  if (At)
    return Qe;
  At = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Qe = e, Qe;
}
var et, Dt;
function Bt() {
  return Dt || (Dt = 1, et = Function.call.bind(Object.prototype.hasOwnProperty)), et;
}
var tt, Lt;
function Lr() {
  if (Lt)
    return tt;
  Lt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = ft(), o = {}, n = Bt();
    e = function(u) {
      var c = "Warning: " + u;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {
      }
    };
  }
  function i(u, c, s, a, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var h in u)
        if (n(u, h)) {
          var v;
          try {
            if (typeof u[h] != "function") {
              var y = Error(
                (a || "React class") + ": " + s + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw y.name = "Invariant Violation", y;
            }
            v = u[h](c, h, a, s, null, r);
          } catch (E) {
            v = E;
          }
          if (v && !(v instanceof Error) && e(
            (a || "React class") + ": type specification of " + s + " `" + h + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof v + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), v instanceof Error && !(v.message in o)) {
            o[v.message] = !0;
            var m = f ? f() : "";
            e(
              "Failed " + s + " type: " + v.message + (m ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (o = {});
  }, tt = i, tt;
}
var rt, Ft;
function Fr() {
  if (Ft)
    return rt;
  Ft = 1;
  var e = Nt(), r = Dr(), o = ft(), n = Bt(), i = Lr(), u = function() {
  };
  process.env.NODE_ENV !== "production" && (u = function(s) {
    var a = "Warning: " + s;
    typeof console < "u" && console.error(a);
    try {
      throw new Error(a);
    } catch {
    }
  });
  function c() {
    return null;
  }
  return rt = function(s, a) {
    var f = typeof Symbol == "function" && Symbol.iterator, h = "@@iterator";
    function v(p) {
      var b = p && (f && p[f] || p[h]);
      if (typeof b == "function")
        return b;
    }
    var y = "<<anonymous>>", m = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: I(),
      arrayOf: _,
      element: C(),
      elementType: l(),
      instanceOf: L,
      node: A(),
      objectOf: V,
      oneOf: U,
      oneOfType: H,
      shape: ee,
      exact: K
    };
    function E(p, b) {
      return p === b ? p !== 0 || 1 / p === 1 / b : p !== p && b !== b;
    }
    function O(p, b) {
      this.message = p, this.data = b && typeof b == "object" ? b : {}, this.stack = "";
    }
    O.prototype = Error.prototype;
    function T(p) {
      if (process.env.NODE_ENV !== "production")
        var b = {}, j = 0;
      function S(z, M, $, F, B, Y, se) {
        if (F = F || y, Y = Y || $, se !== o) {
          if (a) {
            var w = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw w.name = "Invariant Violation", w;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ce = F + ":" + $;
            !b[ce] && // Avoid spamming the console because they are often not actionable except for lib authors
            j < 3 && (u(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + F + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), b[ce] = !0, j++);
          }
        }
        return M[$] == null ? z ? M[$] === null ? new O("The " + B + " `" + Y + "` is marked as required " + ("in `" + F + "`, but its value is `null`.")) : new O("The " + B + " `" + Y + "` is marked as required in " + ("`" + F + "`, but its value is `undefined`.")) : null : p(M, $, F, B, Y);
      }
      var R = S.bind(null, !1);
      return R.isRequired = S.bind(null, !0), R;
    }
    function k(p) {
      function b(j, S, R, z, M, $) {
        var F = j[S], B = re(F);
        if (B !== p) {
          var Y = ie(F);
          return new O(
            "Invalid " + z + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + R + "`, expected ") + ("`" + p + "`."),
            { expectedType: p }
          );
        }
        return null;
      }
      return T(b);
    }
    function I() {
      return T(c);
    }
    function _(p) {
      function b(j, S, R, z, M) {
        if (typeof p != "function")
          return new O("Property `" + M + "` of component `" + R + "` has invalid PropType notation inside arrayOf.");
        var $ = j[S];
        if (!Array.isArray($)) {
          var F = re($);
          return new O("Invalid " + z + " `" + M + "` of type " + ("`" + F + "` supplied to `" + R + "`, expected an array."));
        }
        for (var B = 0; B < $.length; B++) {
          var Y = p($, B, R, z, M + "[" + B + "]", o);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return T(b);
    }
    function C() {
      function p(b, j, S, R, z) {
        var M = b[j];
        if (!s(M)) {
          var $ = re(M);
          return new O("Invalid " + R + " `" + z + "` of type " + ("`" + $ + "` supplied to `" + S + "`, expected a single ReactElement."));
        }
        return null;
      }
      return T(p);
    }
    function l() {
      function p(b, j, S, R, z) {
        var M = b[j];
        if (!e.isValidElementType(M)) {
          var $ = re(M);
          return new O("Invalid " + R + " `" + z + "` of type " + ("`" + $ + "` supplied to `" + S + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return T(p);
    }
    function L(p) {
      function b(j, S, R, z, M) {
        if (!(j[S] instanceof p)) {
          var $ = p.name || y, F = ge(j[S]);
          return new O("Invalid " + z + " `" + M + "` of type " + ("`" + F + "` supplied to `" + R + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return T(b);
    }
    function U(p) {
      if (!Array.isArray(p))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? u(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : u("Invalid argument supplied to oneOf, expected an array.")), c;
      function b(j, S, R, z, M) {
        for (var $ = j[S], F = 0; F < p.length; F++)
          if (E($, p[F]))
            return null;
        var B = JSON.stringify(p, function(se, w) {
          var ce = ie(w);
          return ce === "symbol" ? String(w) : w;
        });
        return new O("Invalid " + z + " `" + M + "` of value `" + String($) + "` " + ("supplied to `" + R + "`, expected one of " + B + "."));
      }
      return T(b);
    }
    function V(p) {
      function b(j, S, R, z, M) {
        if (typeof p != "function")
          return new O("Property `" + M + "` of component `" + R + "` has invalid PropType notation inside objectOf.");
        var $ = j[S], F = re($);
        if (F !== "object")
          return new O("Invalid " + z + " `" + M + "` of type " + ("`" + F + "` supplied to `" + R + "`, expected an object."));
        for (var B in $)
          if (n($, B)) {
            var Y = p($, B, R, z, M + "." + B, o);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return T(b);
    }
    function H(p) {
      if (!Array.isArray(p))
        return process.env.NODE_ENV !== "production" && u("Invalid argument supplied to oneOfType, expected an instance of array."), c;
      for (var b = 0; b < p.length; b++) {
        var j = p[b];
        if (typeof j != "function")
          return u(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + me(j) + " at index " + b + "."
          ), c;
      }
      function S(R, z, M, $, F) {
        for (var B = [], Y = 0; Y < p.length; Y++) {
          var se = p[Y], w = se(R, z, M, $, F, o);
          if (w == null)
            return null;
          w.data && n(w.data, "expectedType") && B.push(w.data.expectedType);
        }
        var ce = B.length > 0 ? ", expected one of type [" + B.join(", ") + "]" : "";
        return new O("Invalid " + $ + " `" + F + "` supplied to " + ("`" + M + "`" + ce + "."));
      }
      return T(S);
    }
    function A() {
      function p(b, j, S, R, z) {
        return te(b[j]) ? null : new O("Invalid " + R + " `" + z + "` supplied to " + ("`" + S + "`, expected a ReactNode."));
      }
      return T(p);
    }
    function D(p, b, j, S, R) {
      return new O(
        (p || "React class") + ": " + b + " type `" + j + "." + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + R + "`."
      );
    }
    function ee(p) {
      function b(j, S, R, z, M) {
        var $ = j[S], F = re($);
        if (F !== "object")
          return new O("Invalid " + z + " `" + M + "` of type `" + F + "` " + ("supplied to `" + R + "`, expected `object`."));
        for (var B in p) {
          var Y = p[B];
          if (typeof Y != "function")
            return D(R, z, M, B, ie(Y));
          var se = Y($, B, R, z, M + "." + B, o);
          if (se)
            return se;
        }
        return null;
      }
      return T(b);
    }
    function K(p) {
      function b(j, S, R, z, M) {
        var $ = j[S], F = re($);
        if (F !== "object")
          return new O("Invalid " + z + " `" + M + "` of type `" + F + "` " + ("supplied to `" + R + "`, expected `object`."));
        var B = r({}, j[S], p);
        for (var Y in B) {
          var se = p[Y];
          if (n(p, Y) && typeof se != "function")
            return D(R, z, M, Y, ie(se));
          if (!se)
            return new O(
              "Invalid " + z + " `" + M + "` key `" + Y + "` supplied to `" + R + "`.\nBad object: " + JSON.stringify(j[S], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(p), null, "  ")
            );
          var w = se($, Y, R, z, M + "." + Y, o);
          if (w)
            return w;
        }
        return null;
      }
      return T(b);
    }
    function te(p) {
      switch (typeof p) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !p;
        case "object":
          if (Array.isArray(p))
            return p.every(te);
          if (p === null || s(p))
            return !0;
          var b = v(p);
          if (b) {
            var j = b.call(p), S;
            if (b !== p.entries) {
              for (; !(S = j.next()).done; )
                if (!te(S.value))
                  return !1;
            } else
              for (; !(S = j.next()).done; ) {
                var R = S.value;
                if (R && !te(R[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function oe(p, b) {
      return p === "symbol" ? !0 : b ? b["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && b instanceof Symbol : !1;
    }
    function re(p) {
      var b = typeof p;
      return Array.isArray(p) ? "array" : p instanceof RegExp ? "object" : oe(b, p) ? "symbol" : b;
    }
    function ie(p) {
      if (typeof p > "u" || p === null)
        return "" + p;
      var b = re(p);
      if (b === "object") {
        if (p instanceof Date)
          return "date";
        if (p instanceof RegExp)
          return "regexp";
      }
      return b;
    }
    function me(p) {
      var b = ie(p);
      switch (b) {
        case "array":
        case "object":
          return "an " + b;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + b;
        default:
          return b;
      }
    }
    function ge(p) {
      return !p.constructor || !p.constructor.name ? y : p.constructor.name;
    }
    return m.checkPropTypes = i, m.resetWarningCache = i.resetWarningCache, m.PropTypes = m, m;
  }, rt;
}
var nt, Yt;
function Yr() {
  if (Yt)
    return nt;
  Yt = 1;
  var e = ft();
  function r() {
  }
  function o() {
  }
  return o.resetWarningCache = r, nt = function() {
    function n(c, s, a, f, h, v) {
      if (v !== e) {
        var y = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw y.name = "Invariant Violation", y;
      }
    }
    n.isRequired = n;
    function i() {
      return n;
    }
    var u = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: i,
      element: n,
      elementType: n,
      instanceOf: i,
      node: n,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: o,
      resetWarningCache: r
    };
    return u.PropTypes = u, u;
  }, nt;
}
if (process.env.NODE_ENV !== "production") {
  var Wr = Nt(), Ur = !0;
  st.exports = Fr()(Wr.isElement, Ur);
} else
  st.exports = Yr()();
var Vt = st.exports, pe = {};
Object.defineProperty(pe, "__esModule", {
  value: !0
});
pe.FrameContextConsumer = pe.FrameContextProvider = pe.useFrame = pe.FrameContext = void 0;
var qr = $e, Xt = zr(qr);
function zr(e) {
  return e && e.__esModule ? e : { default: e };
}
var Ht = void 0, Gt = void 0;
typeof document < "u" && (Ht = document);
typeof window < "u" && (Gt = window);
var dt = pe.FrameContext = Xt.default.createContext({ document: Ht, window: Gt });
pe.useFrame = function() {
  return Xt.default.useContext(dt);
};
var Nr = dt.Provider, Br = dt.Consumer;
pe.FrameContextProvider = Nr;
pe.FrameContextConsumer = Br;
var vt = {};
Object.defineProperty(vt, "__esModule", {
  value: !0
});
var Vr = /* @__PURE__ */ function() {
  function e(r, o) {
    for (var n = 0; n < o.length; n++) {
      var i = o[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(r, i.key, i);
    }
  }
  return function(r, o, n) {
    return o && e(r.prototype, o), n && e(r, n), r;
  };
}(), ut = $e;
Jt(ut);
var Xr = Vt, ot = Jt(Xr);
function Jt(e) {
  return e && e.__esModule ? e : { default: e };
}
function Hr(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function Gr(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function Jr(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var Kt = function(e) {
  Jr(r, e);
  function r() {
    return Hr(this, r), Gr(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
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
      return ut.Children.only(this.props.children);
    }
  }]), r;
}(ut.Component);
Kt.propTypes = {
  children: ot.default.element.isRequired,
  contentDidMount: ot.default.func.isRequired,
  contentDidUpdate: ot.default.func.isRequired
};
vt.default = Kt;
Object.defineProperty(Le, "__esModule", {
  value: !0
});
Le.Frame = void 0;
var ct = Object.assign || function(e) {
  for (var r = 1; r < arguments.length; r++) {
    var o = arguments[r];
    for (var n in o)
      Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
  }
  return e;
}, Kr = /* @__PURE__ */ function() {
  function e(r, o) {
    for (var n = 0; n < o.length; n++) {
      var i = o[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(r, i.key, i);
    }
  }
  return function(r, o, n) {
    return o && e(r.prototype, o), n && e(r, n), r;
  };
}(), Zt = $e, Ee = Be(Zt), Zr = jr, Wt = Be(Zr), Qr = Vt, he = Be(Qr), en = pe, tn = vt, rn = Be(tn);
function Be(e) {
  return e && e.__esModule ? e : { default: e };
}
function nn(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function on(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function an(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var pt = Le.Frame = function(e) {
  an(r, e);
  function r(o, n) {
    nn(this, r);
    var i = on(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, o, n));
    return i.setRef = function(u) {
      i.nodeRef.current = u;
      var c = i.props.forwardedRef;
      typeof c == "function" ? c(u) : c && (c.current = u);
    }, i.handleLoad = function() {
      clearInterval(i.loadCheck), i.state.iframeLoaded || i.setState({ iframeLoaded: !0 });
    }, i.loadCheck = function() {
      return setInterval(function() {
        i.handleLoad();
      }, 500);
    }, i._isMounted = !1, i.nodeRef = Ee.default.createRef(), i.state = { iframeLoaded: !1 }, i;
  }
  return Kr(r, [{
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
      var i = this.props.contentDidMount, u = this.props.contentDidUpdate, c = n.defaultView || n.parentView, s = Ee.default.createElement(
        rn.default,
        {
          contentDidMount: i,
          contentDidUpdate: u
        },
        Ee.default.createElement(
          en.FrameContextProvider,
          { value: { document: n, window: c } },
          Ee.default.createElement(
            "div",
            { className: "frame-content" },
            this.props.children
          )
        )
      ), a = this.getMountTarget();
      return [Wt.default.createPortal(this.props.head, this.getDoc().head), Wt.default.createPortal(s, a)];
    }
  }, {
    key: "render",
    value: function() {
      var n = ct({}, this.props, {
        srcDoc: this.props.initialContent,
        children: void 0
        // The iframe isn't ready so we drop children from props here. #12, #17
      });
      return delete n.head, delete n.initialContent, delete n.mountTarget, delete n.contentDidMount, delete n.contentDidUpdate, delete n.forwardedRef, Ee.default.createElement(
        "iframe",
        ct({}, n, { ref: this.setRef, onLoad: this.handleLoad }),
        this.state.iframeLoaded && this.renderFrameContents()
      );
    }
  }]), r;
}(Zt.Component);
pt.propTypes = {
  style: he.default.object,
  // eslint-disable-line
  head: he.default.node,
  initialContent: he.default.string,
  mountTarget: he.default.string,
  contentDidMount: he.default.func,
  contentDidUpdate: he.default.func,
  children: he.default.oneOfType([he.default.element, he.default.arrayOf(he.default.element)])
};
pt.defaultProps = {
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
Le.default = Ee.default.forwardRef(function(e, r) {
  return Ee.default.createElement(pt, ct({}, e, { forwardedRef: r }));
});
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var r = Le;
  Object.defineProperty(e, "default", {
    enumerable: !0,
    get: function() {
      return n(r).default;
    }
  });
  var o = pe;
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
  function n(i) {
    return i && i.__esModule ? i : { default: i };
  }
})(Pe);
const sn = /* @__PURE__ */ kr(Pe), Qt = Ae({}), un = ({ children: e }) => {
  const r = W(() => ({
    top: de(0),
    left: de(0)
  }), []);
  return /* @__PURE__ */ x.jsx(Qt.Provider, { value: r, children: e });
}, Fe = () => De(Qt), er = Ae(de(1)), cn = ({ children: e, value: r }) => {
  const o = W(() => de(r < 1 ? 1 : r), [r]);
  return /* @__PURE__ */ x.jsx(er.Provider, { value: o, children: e });
}, Se = () => De(er), tr = Ae(15), ln = ({ children: e, value: r }) => /* @__PURE__ */ x.jsx(tr.Provider, { value: r < 1 ? 1 : r, children: e }), fn = () => De(tr), rr = Ae(de(void 0)), dn = ({ children: e }) => {
  const r = W(() => de(void 0), []);
  return /* @__PURE__ */ x.jsx(rr.Provider, { value: r, children: e });
}, nr = () => De(rr), or = Ae({}), vn = ({ children: e, items: r }) => {
  const o = xe(de(r));
  Ce(() => {
    o.current.value = r;
  }, [r]);
  const n = W(() => ke({
    get: ({ get: s }) => {
      const a = [];
      return s(o.current).forEach((f, h, v) => {
        s(f.connections).forEach((y) => {
          const m = v.find((E) => s(y.relatedId) === s(E.id));
          m && a.push({
            top1: f.top,
            left1: f.left,
            top2: m.top,
            left2: m.left,
            width1: f.width,
            height1: f.height,
            width2: m.width,
            height2: m.height,
            nodeId: f.id,
            id: y.id,
            relatedNodeId: m.id,
            key: `line_key_${s(f.id)}_${s(m.id)}`,
            isCurved: ke(({ get: E }) => E(m.connections).some((O) => E(O.relatedId) === E(f.id)))
          });
        });
      }), a;
    }
  }), []), i = W(() => ({
    width: ke({
      get: ({ get: s }) => s(o.current).reduce((a, f) => {
        const h = s(f.left) + s(f.width);
        return h > a ? h : a;
      }, 0)
    }),
    height: ke({
      get: ({ get: s }) => s(o.current).reduce((a, f) => {
        const h = s(f.top) + s(f.height);
        return h > a ? h : a;
      }, 0)
    })
  }), []), u = W(() => de([]), []), c = W(() => ke({
    get: ({ get: s }) => s(o.current).filter((f) => s(u).includes(s(f.id)))
  }), [u]);
  return /* @__PURE__ */ x.jsx(or.Provider, { value: { flowStore: o.current, linesStore: n, boardSizes: i, selectedItems: c, selectedItemsId: u }, children: e });
}, _e = () => De(or), ze = () => _e().boardSizes, ar = (e) => {
  const { selectedItemsId: r } = _e(), o = xe(de(r.value.includes(e)));
  return Ce(() => {
    const n = r.subscribe((i) => {
      const u = i.includes(e);
      ve(o.current, (c) => c !== u ? u : c);
    });
    return () => n.unsubscribe();
  }, [r, e]), o.current;
}, Ve = () => {
  const { selectedItemsId: e, linesStore: r } = _e();
  return ye((o, n = !1) => {
    if (typeof o == "string") {
      if (e.value.some((i) => i === o) && !n)
        return;
      e.value.some((i) => i === o) ? ve(e, (i) => {
        const u = i.filter((s) => s !== o).filter((s) => !r.value.some((a) => a.id.value === s)), c = r.value.filter((s) => u.includes(s.nodeId.value) && u.includes(s.relatedNodeId.value)).map((s) => s.id.value);
        return [...u, ...c];
      }) : n ? ve(e, (i) => {
        const u = [
          ...i.filter((s) => !r.value.some((a) => a.id.value === s)),
          o
        ], c = r.value.filter((s) => u.includes(s.nodeId.value) && u.includes(s.relatedNodeId.value)).map((s) => s.id.value);
        return [...u, ...c];
      }) : ve(e, [o]);
    } else {
      if (o.sort().join() === e.value.sort().join())
        return;
      const i = [...o], u = r.value.filter((c) => i.includes(c.nodeId.value) && i.includes(c.relatedNodeId.value)).map((c) => c.id.value);
      if ([...i, ...u].sort().join() === e.value.sort().join())
        return;
      ve(e, [...i, ...u]);
    }
  }, [e]);
}, ir = () => {
  const { selectedItems: e } = _e();
  return ye((r, o) => {
    e.value.length !== 0 && ((e.value.every((n) => n.top.value > 0) || o > 0) && e.value.forEach((n) => {
      ve(n.top, (i) => i + o <= 0 ? 0 : i + o);
    }), (e.value.every((n) => n.left.value > 0) || r > 0) && e.value.forEach((n) => {
      ve(n.left, (i) => i + r <= 0 ? 0 : i + r);
    }));
  }, [e]);
}, pn = `
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
  const o = e.width, n = e.height, i = { x: e.x, y: e.y }, u = { x: r.x, y: r.y }, c = o / 2, s = n / 2, a = i.x + c, f = i.y + s, h = u.x + r.width / 2, v = u.y + r.height / 2, y = (h - a) / (2 * c) - (v - f) / (2 * s), m = (h - a) / (2 * c) + (v - f) / (2 * s), E = 1 / (Math.abs(y) + Math.abs(m) || 1), O = E * y, T = E * m, k = c * (O + T) + a, I = s * (-O + T) + f;
  return { x: k, y: I };
}
function qt(e, r) {
  const o = { x: e.x, y: e.y, measured: { width: e.width, height: e.height }, ...e }, n = Math.round(o.x), i = Math.round(o.y), u = Math.round(r.x), c = Math.round(r.y);
  return u <= n + 1 ? "left" : u >= n + o.measured.width - 1 ? "right" : c <= i + 1 ? "top" : c >= o.y + o.measured.height - 1 ? "bottom" : "top";
}
function sr(e, r) {
  const o = Ut(e, r), n = Ut(r, e), i = qt(e, o), u = qt(r, n);
  return {
    sx: o.x,
    sy: o.y,
    tx: n.x,
    ty: n.y,
    sourcePos: i,
    targetPos: u
  };
}
function hn({ sourceX: e, sourceY: r, targetX: o, targetY: n }) {
  const i = Math.abs(o - e) / 2, u = o < e ? o + i : o - i, c = Math.abs(n - r) / 2, s = n < r ? n + c : n - c;
  return [u, s, i, c];
}
function ur({ sourceX: e, sourceY: r, targetX: o, targetY: n }) {
  const [i, u, c, s] = hn({
    sourceX: e,
    sourceY: r,
    targetX: o,
    targetY: n
  });
  return [`M ${e},${r}L ${o},${n}`, i, u, c, s];
}
const yn = ({ sourceX: e, sourceY: r, targetX: o, targetY: n }, { offset: i }) => {
  const u = (e + o) / 2, c = (r + n) / 2, s = Math.atan2(n - r, o - e), a = i, f = i >= 0 ? Math.max(i, a) : Math.min(i, -a), h = -Math.abs(f), v = h * Math.cos(s + Math.PI / 2), y = h * Math.sin(s + Math.PI / 2), m = u + v, E = c + y;
  return `M ${e} ${r} Q ${m} ${E} ${o} ${n}`;
}, mn = () => navigator.userAgent.toUpperCase().includes("MAC"), Ne = (e) => mn() ? e.metaKey : e.ctrlKey, at = (e, r = 15) => Math.round(e / r) * r, gn = ({ nodeId: e, height: r, width: o, getIsDisabledCreateConnection: n, getIsDisabledDropConnection: i }) => {
  const u = Z(nr()), { flowStore: c } = _e(), s = ye(() => {
    if (u && u.nodeId !== e) {
      for (const a of c.value)
        if (a.id.value === u.nodeId) {
          if (u.type === "end") {
            if (i())
              return;
            if (!u.lineId) {
              ve(a.connections, (f) => [
                ...f,
                {
                  id: de(lt()),
                  relatedId: de(e)
                }
              ]);
              return;
            }
            ve(a.connections, (f) => (f.forEach((h) => {
              h.id.value === u.lineId && (h.relatedId = de(e));
            }), [...f]));
            return;
          }
          if (n())
            return;
          ve(a.connections, (f) => {
            const h = f.find((y) => y.id.value === u.lineId);
            if (!h || h.relatedId.value === e)
              return f;
            const v = c.value.find((y) => y.id.value === e);
            return v ? (ve(v.connections, (y) => [
              ...y,
              {
                id: h.id,
                relatedId: h.relatedId
              }
            ]), [
              ...f.filter((y) => y.id.value !== u.lineId)
            ]) : f;
          });
          return;
        }
    }
  }, [u, e, n, i]);
  return /* @__PURE__ */ x.jsx(x.Fragment, { children: /* @__PURE__ */ x.jsx(
    "span",
    {
      onMouseUp: s,
      onMouseDown: (a) => a.stopPropagation(),
      style: {
        top: -4,
        left: -4,
        width: o + 8,
        height: r + 8,
        position: "absolute",
        //backgroundColor: 'red',
        pointerEvents: u ? "auto" : "none"
      }
    }
  ) });
}, bn = ({ node: e }) => {
  const r = Z(e.id), o = ar(r), n = ir(), i = Ve(), { selectedItemsId: u } = _e(), c = Fe(), s = Se(), a = fn(), { window: f } = Pe.useFrame(), [h, v] = Pt(e.left), y = Z(e.height), [m, E] = Pt(e.top), O = Z(e.width), T = xe({ top: 0, left: 0 }), k = ye((C) => {
    if (i(r, Ne(C.nativeEvent)), !u.value.some((U) => U === r) || !f)
      return;
    const l = (U) => {
      const V = (U.pageX - c.left.value) / s.value - T.current.left, H = (U.pageY - c.top.value) / s.value - T.current.top, A = at(V, a) - e.left.value, D = at(H, a) - e.top.value;
      A === 0 && D === 0 || n(A, D);
    }, L = () => {
      f.removeEventListener("mousemove", l), f.removeEventListener("mouseup", L);
    };
    T.current = {
      top: (C.nativeEvent.pageY - c.top.value) / s.value - m,
      left: (C.nativeEvent.pageX - c.left.value) / s.value - h
    }, f.addEventListener("mousemove", l), f.addEventListener("mouseup", L);
  }, [v, E, i, n, at, a, r, f, c, s, e.left, e.top]), I = W(() => e.render({
    width: e.width,
    height: e.height,
    isSelected: o
  }), [e.render, e.width, e.height, o]), _ = W(() => `translate(${h}px, ${m}px)`, [h, m]);
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      onMouseDown: k,
      className: "draggable-container",
      style: { width: O, height: y, transform: _ },
      children: [
        /* @__PURE__ */ x.jsx("div", { className: "draggable-container-content", children: I }),
        /* @__PURE__ */ x.jsx(
          gn,
          {
            nodeId: r,
            width: O,
            height: y,
            getIsDisabledDropConnection: () => {
              var C;
              return !!((C = e.disableDropConnections) != null && C.call(e));
            },
            getIsDisabledCreateConnection: () => {
              var C;
              return !!((C = e.disableCreateConnections) != null && C.call(e));
            }
          }
        )
      ]
    }
  );
}, wn = ({ children: e }) => {
  const r = Z(ze().height), o = Z(ze().width), n = Z(Se());
  return /* @__PURE__ */ x.jsx("svg", { style: {
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
  const r = Z(ze().height), o = Z(ze().width), n = Z(Se());
  return /* @__PURE__ */ x.jsx("div", { style: {
    zoom: n,
    pointerEvents: "none",
    width: (o + 500) / n,
    height: (r + 500) / n
  }, children: e });
}, xn = ({ onSelectionEnd: e, onSelectionStart: r, isDisabled: o = !1, onCoordsChange: n, boardRef: i }) => {
  const u = Fe(), c = Se(), { window: s } = Pe.useFrame(), [a, f] = fe(0), [h, v] = fe(!1), [y, m] = fe(0), [E, O] = fe(0), [T, k] = fe(0), I = ye((U) => {
    var A;
    if (!s || !((A = i.current) != null && A.isSameNode(U.target)))
      return;
    r == null || r(U);
    const V = (D) => {
      O((D.pageX - u.left.value) / c.value), k((D.pageY - u.top.value) / c.value);
    }, H = (D) => {
      s.removeEventListener("mousemove", V), s.removeEventListener("mouseup", H), e == null || e(D), v(!1);
    };
    f((U.offsetX - u.left.value) / c.value), m((U.offsetY - u.top.value) / c.value), O((U.offsetX - u.left.value) / c.value), k((U.offsetY - u.top.value) / c.value), v(!0), s.addEventListener("mousemove", V), s.addEventListener("mouseup", H);
  }, [s, u, c, i]);
  Ce(() => {
    if (s && !o)
      return s.addEventListener("mousedown", I), () => s.removeEventListener("mousedown", I);
  }, [s, o, I]);
  const _ = W(() => T - y > 0 || y < T ? y : T, [T, y]), C = W(() => E - a > 0 || a < E ? a : E, [E, a]), l = W(() => E - a > 0 || a - E < 0 ? E - a : a - E, [E, a]), L = W(() => T - y > 0 || y - T < 0 ? T - y : y - T, [T, y]);
  return Ce(() => {
    n == null || n({
      startY: _,
      startX: C,
      endY: _ + L,
      endX: C + l
    });
  }, [_, C, L, l]), o || !h ? null : /* @__PURE__ */ x.jsx(
    "rect",
    {
      y: _,
      x: C,
      width: l,
      height: L,
      strokeWidth: 1,
      stroke: "#999fff",
      fill: "#ffffff11"
    }
  );
}, _n = (e) => {
  const r = W(() => e.isCurved ? 11.11111111111111 : 0, [e.isCurved]), o = W(() => 8, []), n = W(() => e.top1 - o, [e.top1, o]), i = W(() => e.top2 - o, [e.top2, o]), u = W(() => e.left1 - o, [e.left1, o]), c = W(() => e.left2 - o, [e.left2, o]), s = W(() => e.width1 + o * 2, [e.width1, o]), a = W(() => e.width2 + o * 2, [e.width2, o]), f = W(() => e.height1 + o * 2, [e.height1, o]), h = W(() => e.height2 + o * 2, [e.height2, o]), v = W(() => {
    let _ = Math.atan2(u - c, n - i) * (180 / Math.PI);
    return _ < 0 ? _ = Math.abs(_) : _ = 360 - _, _;
  }, [c, i, u, n]), y = W(() => v >= 45 && v <= 135 ? v - 45 : v >= 135 && v <= 225 ? v - 135 : v >= 225 && v <= 315 ? v - 225 : v >= 315 && v <= 360 || v >= 0 && v <= 45 ? v >= 315 && v <= 360 ? v - 315 : v + 45 : 0, [v]), m = W(() => {
    if (v >= 45 && v <= 135)
      return "left";
    if (v >= 135 && v <= 225)
      return "top";
    if (v >= 225 && v <= 315)
      return "right";
    if (v >= 315 && v <= 360 || v >= 0 && v <= 45)
      return "bottom";
  }, [v]), E = ye((_, C) => {
    const l = y * 100 / 90, L = C * l / 100;
    return _ - L;
  }, [y]), O = W(() => {
    switch (m) {
      case "left":
        return u + s;
      case "top":
        return E(u + s, s);
      case "right":
        return u;
      case "bottom":
        return E(u, -s);
      default:
        return 0;
    }
  }, [m, u, s, r, y, E]), T = W(() => {
    switch (m) {
      case "left":
        return E(n, -f);
      case "top":
        return n + f;
      case "right":
        return E(n + f, f);
      case "bottom":
        return n;
      default:
        return 0;
    }
  }, [m, n, f, r, y, E]), k = W(() => {
    switch (m) {
      case "left":
        return c;
      case "top":
        return E(c, -a);
      case "right":
        return c + a;
      case "bottom":
        return E(c + a, a);
      default:
        return 0;
    }
  }, [m, c, a, r, y, E]), I = W(() => {
    switch (m) {
      case "left":
        return E(i + h, h);
      case "top":
        return i;
      case "right":
        return E(i, -h);
      case "bottom":
        return i + h;
      default:
        return 0;
    }
  }, [m, i, h, r, y, E]);
  return {
    y1: T,
    y2: I,
    x1: O,
    x2: k,
    top1: n,
    top2: i,
    left1: u,
    left2: c,
    angle: v,
    width1: s,
    width2: a,
    height1: f,
    height2: h,
    sideAngle: y,
    extraSpace: o,
    currentSide: m
  };
}, cr = ({ lineId: e, newConnection: r = !1, position1FromCenter: o = !1, disableStartDraggable: n = !1, nodeId: i, lineWidth: u, onDragLineEnd: c, onDragLineStart: s, ...a }) => {
  const f = qe(nr()), h = Ve(), v = Fe(), y = Se(), { window: m } = Pe.useFrame(), [E, O] = fe(a.top1), [T, k] = fe(a.top2), [I, _] = fe(a.left1), [C, l] = fe(a.left2), [L, U] = fe();
  Ce(() => {
    O(a.top1), k(a.top2), _(a.left1), l(a.left2);
  }, [a.top1, a.top2, a.left1, a.left2]);
  const V = _n({
    top1: E,
    top2: T,
    left1: I,
    left2: C,
    width1: a.width1,
    width2: a.width2,
    height1: a.height1,
    height2: a.height2
  }), H = W(() => {
    const { sx: ee, sy: K, tx: te, ty: oe } = sr(
      {
        y: E,
        x: I,
        width: a.width1 + 10,
        height: a.height1 + 10
      },
      {
        y: T - 5,
        x: C - 5,
        width: 10,
        height: 10
      }
    ), [re] = ur({
      sourceX: ee,
      sourceY: K,
      targetX: te,
      targetY: oe
    });
    return re;
  }, [E, T, I, C, a.width1, a.width2, a.height1, a.height2]), A = ye((ee) => {
    if (e && h([e], !1), U("start"), s == null || s(), !m)
      return;
    const K = (oe) => {
      const re = (oe.pageX - v.left.value) / y.value, ie = (oe.pageY - v.top.value) / y.value;
      _(re), O(ie);
    }, te = () => {
      U(void 0), _(a.left1), f(void 0), O(a.top1), c == null || c(), m.removeEventListener("mousemove", K), m.removeEventListener("mouseup", te);
    };
    K(ee.nativeEvent), f({ type: "start", nodeId: i, lineId: e }), m.addEventListener("mousemove", K), m.addEventListener("mouseup", te);
  }, [f, s, c, m, v, y, E, I, V.y1, V.x1, a.left1, a.top1, i, e]), D = ye((ee) => {
    if (e && h([e], !1), U("end"), s == null || s(), !m)
      return;
    const K = (oe) => {
      const re = (oe.pageX - v.left.value) / y.value, ie = (oe.pageY - v.top.value) / y.value;
      l(re), k(ie);
    }, te = () => {
      U(void 0), l(a.left2), f(void 0), k(a.top2), c == null || c(), m.removeEventListener("mousemove", K), m.removeEventListener("mouseup", te);
    };
    K(ee.nativeEvent), f({ type: "end", nodeId: i, lineId: e }), m.addEventListener("mousemove", K), m.addEventListener("mouseup", te);
  }, [f, s, c, m, v, y, V.y2, V.x2, a.left2, a.top2, i, e]);
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    L && /* @__PURE__ */ x.jsx(
      "path",
      {
        fill: "none",
        d: H,
        stroke: "#0f77bf",
        strokeLinecap: "round",
        strokeWidth: u,
        markerEnd: `url(#end-line-arrow-${e})`
      }
    ),
    r && /* @__PURE__ */ x.jsx(
      "rect",
      {
        x: I - 3,
        fill: "transparent",
        width: V.width1,
        height: V.height1 / 2,
        onMouseDown: D,
        y: E + V.height1 / 2 + 2,
        style: { cursor: "crosshair", pointerEvents: L ? "none" : "auto" }
      }
    ),
    !L && !r && /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      !n && /* @__PURE__ */ x.jsx(
        "rect",
        {
          width: 20,
          height: 20,
          fill: "transparent",
          y: V.y1 - 10,
          x: V.x1 - 10,
          onMouseDown: A,
          style: { cursor: "crosshair", pointerEvents: "auto" }
        }
      ),
      /* @__PURE__ */ x.jsx(
        "rect",
        {
          width: 20,
          height: 20,
          fill: "transparent",
          y: V.y2 - 10,
          x: V.x2 - 10,
          onMouseDown: D,
          style: { cursor: "crosshair", pointerEvents: "auto" }
        }
      )
    ] })
  ] });
}, Tn = ({ onDrop: e, ...r }) => {
  const [o, n] = fe(!1), [i, u] = fe(!1), c = Z(r.top1Observable), s = Z(r.top2Observable), a = Z(r.lineIdObservable), f = Z(r.left1Observable), h = Z(r.left2Observable), v = Z(r.blockIdObservable), y = Z(r.width1Observable), m = Z(r.width2Observable), E = Z(r.isCurvedObservable), O = Z(r.height1Observable), T = Z(r.height2Observable), k = Z(ar(a)), I = Ve(), _ = W(() => 2.5, []), C = W(() => 1, []), l = ye((H) => {
    I(a, Ne(H.nativeEvent));
  }, [a]), L = W(() => {
    const { sx: H, sy: A, tx: D, ty: ee } = sr(
      {
        y: c - 5,
        x: f - 5,
        width: y + 10,
        height: O + 10
      },
      {
        y: s - 5,
        x: h - 5,
        width: m + 10,
        height: T + 10
      }
    );
    if (E)
      return yn({
        sourceX: H,
        sourceY: A,
        targetX: D,
        targetY: ee
      }, { offset: 35 });
    {
      const [K] = ur({
        sourceX: H,
        sourceY: A,
        targetX: D,
        targetY: ee
      });
      return K;
    }
  }, [E, c, s, f, h, y, m, O, T]), U = xe(null), V = Fe();
  return zt({
    element: U,
    id: xe(lt()).current,
    leave: () => n(!1),
    hover: () => n((H) => H || !0),
    drop: (H, { x: A, y: D }) => {
      n(!1), e == null || e({
        data: H,
        top: D + -V.top.value,
        left: A + -V.left.value,
        target: { type: "line", lineId: a, nodeId: v }
      });
    }
  }), /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsx("defs", { children: /* @__PURE__ */ x.jsx("marker", { orient: "auto", refX: 2.8 * _, refY: 2.4 * _, markerWidth: 10 * _, markerHeight: 8 * _, id: `end-line-arrow-${a}`, children: /* @__PURE__ */ x.jsx("polygon", { points: `0 ${1 * _}, ${3 * _} ${2.4 * _}, 0 ${4 * _}`, stroke: k ? "#0f77bf" : "gray", fill: k ? "#0f77bf" : "gray" }) }) }),
    !i && /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ x.jsx(
        "path",
        {
          d: L,
          fill: "none",
          strokeLinecap: "round",
          strokeWidth: C,
          markerEnd: `url(#end-line-arrow-${a})`,
          stroke: k || o ? "#0f77bf" : "gray"
        }
      ),
      /* @__PURE__ */ x.jsx(
        "path",
        {
          d: L,
          fill: "none",
          strokeWidth: 14,
          stroke: "transparent",
          strokeLinecap: "round",
          onClick: l,
          style: { pointerEvents: "auto" },
          ref: e ? U : void 0
        }
      )
    ] }),
    /* @__PURE__ */ x.jsx(
      cr,
      {
        top1: c,
        top2: s,
        lineId: a,
        left1: f,
        left2: h,
        nodeId: v,
        width1: y,
        width2: m,
        height1: O,
        height2: T,
        lineWidth: C,
        disableStartDraggable: E,
        onDragLineEnd: () => u(!1),
        onDragLineStart: () => u(!0)
      }
    )
  ] });
}, On = ({ node: e }) => {
  var a;
  const r = Z(e.height), o = Z(e.width), n = Z(e.left), i = Z(e.top), u = Z(e.id), c = W(() => 2.5, []), s = W(() => 1, []);
  return (a = e.disableCreateConnections) != null && a.call(e) ? null : /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsx("defs", { children: /* @__PURE__ */ x.jsx("marker", { orient: "auto", refX: 2.8 * c, refY: 2.4 * c, markerWidth: 10 * c, markerHeight: 8 * c, id: "end-line-arrow-undefined", children: /* @__PURE__ */ x.jsx("polygon", { points: `0 ${1 * c}, ${3 * c} ${2.4 * c}, 0 ${4 * c}`, stroke: "#0f77bf", fill: "#0f77bf" }) }) }),
    /* @__PURE__ */ x.jsx(
      cr,
      {
        top2: i,
        top1: i,
        nodeId: u,
        left2: n,
        left1: n,
        width1: o,
        width2: o,
        height2: r,
        height1: r,
        lineId: void 0,
        newConnection: !0,
        position1FromCenter: !0,
        lineWidth: s
      }
    )
  ] });
}, Rn = ({ backgroundColorDefault: e = "#1e1e1e", backgroundColorPaper: r = "#484848", backgroundDotColor: o = "#484848", backgroundSize: n = 30, disableDropInLines: i = !1, onRemove: u, onDrop: c }) => {
  const s = xe(null), { document: a } = Pe.useFrame(), f = Fe(), h = qe(Se()), v = qe(f.left), y = qe(f.top), { flowStore: m, linesStore: E, selectedItemsId: O } = _e(), T = ir(), k = Ve(), I = Z(E), _ = Z(m);
  zt({
    element: s,
    id: xe(lt()).current,
    drop: (l, { x: L, y: U }) => c == null ? void 0 : c({
      data: l,
      target: { type: "board" },
      top: U + -f.top.value,
      left: L + -f.left.value
    })
  }), Ce(() => {
    if (!a)
      return;
    const l = (A) => {
      Ne(A) && (A.stopImmediatePropagation(), A.stopPropagation(), A.preventDefault(), A.deltaY < 0 ? h((D) => D >= 2 ? D : D + 0.1) : h((D) => D <= 0.2 ? D : D - 0.1));
    }, L = (A) => {
      Ne(A) && A.key === "a" && k(m.value.map((D) => D.id.value));
    }, U = (A) => {
      A.key === "Escape" && k([]);
    }, V = (A) => {
      A.key === "Delete" && O.value.length > 0 && (u == null || u(O.value));
    }, H = (A) => {
      const D = A.altKey ? 30 : 15;
      A.key === "ArrowUp" ? T(0, -D) : A.key === "ArrowRight" ? T(D, 0) : A.key === "ArrowDown" ? T(0, D) : A.key === "ArrowLeft" && T(-D, 0);
    };
    return a.addEventListener("keydown", U, { passive: !1 }), a.addEventListener("keydown", H, { passive: !1 }), a.addEventListener("keydown", L, { passive: !1 }), a.addEventListener("keydown", V, { passive: !1 }), a.addEventListener("wheel", l, { passive: !1 }), () => {
      a.removeEventListener("keydown", U), a.removeEventListener("keydown", H), a.removeEventListener("keydown", L), a.removeEventListener("keydown", V), a.removeEventListener("wheel", l);
    };
  }, [h, a, O, u, T]);
  const C = ye((l) => {
    const L = l.endY, U = l.endX, V = l.startY, H = l.startX, A = (ee) => {
      const K = ee.top.value, te = ee.left.value, oe = ee.top.value + ee.height.value, re = ee.left.value + ee.width.value, ie = L - V > 0, me = U - H > 0, ge = (b, j, S, R) => (b <= S || j <= S) && (b >= R || j >= R), p = (b, j, S, R) => (b >= S || j >= S) && (b <= R || j <= R);
      return (ie ? p(K, oe, V, L) : ge(K, oe, V, L)) && (me ? p(te, re, H, U) : ge(te, re, H, U));
    }, D = _.filter((ee) => A(ee)).map((ee) => ee.id.value);
    k(D);
  }, [_, k]);
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      className: "panel-wrapper",
      style: {
        "--color-panel-dot": o,
        "--color-panel-paper": r,
        "--color-panel-default": e,
        backgroundSize: `${n / devicePixelRatio}px ${n / devicePixelRatio}px`
      },
      children: /* @__PURE__ */ x.jsxs(
        "div",
        {
          ref: s,
          className: "panel",
          onScroll: (l) => {
            y(-l.currentTarget.scrollTop), v(-l.currentTarget.scrollLeft);
          },
          onMouseDown: (l) => {
            var L;
            return (L = s.current) != null && L.isSameNode(l.target) ? k([]) : void 0;
          },
          children: [
            /* @__PURE__ */ x.jsxs(wn, { children: [
              _.map((l) => /* @__PURE__ */ x.jsx(On, { node: l }, l.id.value)),
              I.map((l) => /* @__PURE__ */ x.jsx(
                Tn,
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
                  onDrop: i ? void 0 : c
                },
                l.key
              )),
              /* @__PURE__ */ x.jsx(
                xn,
                {
                  boardRef: s,
                  onCoordsChange: C
                }
              )
            ] }),
            /* @__PURE__ */ x.jsx(En, { children: _.map((l) => /* @__PURE__ */ x.jsx(bn, { node: l }, l.id.value)) })
          ]
        }
      )
    }
  );
}, Cn = `
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
`, Pn = sn, $n = ({ snapGridSize: e = 15, items: r, customCSS: o = "", ...n }) => {
  const i = W(() => /* @__PURE__ */ x.jsx(x.Fragment, { children: /* @__PURE__ */ x.jsx("style", { children: [
    o,
    Cn,
    pn
  ].join(`
`) }) }), [o]);
  return /* @__PURE__ */ x.jsx(
    Pn,
    {
      tabIndex: -1,
      head: i,
      mountTarget: "body",
      onContextMenu: (u) => u.preventDefault(),
      initialContent: '<html tabindex="0"><head></head><body style="margin:0;"></body></html>',
      style: { width: "100%", height: "100%", display: "block", margin: 0, padding: 0, border: "none" },
      children: /* @__PURE__ */ x.jsx(vn, { items: r, children: /* @__PURE__ */ x.jsx(ln, { value: e, children: /* @__PURE__ */ x.jsx(cn, { value: 1, children: /* @__PURE__ */ x.jsx(dn, { children: /* @__PURE__ */ x.jsx(un, { children: /* @__PURE__ */ x.jsx(Rn, { ...n }) }) }) }) }) })
    }
  );
};
export {
  $n as FlowEditor
};
//# sourceMappingURL=index.es.js.map
