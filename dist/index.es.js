import Me, { createContext as Ae, useMemo as q, useContext as $e, useRef as we, useEffect as Ee, useCallback as be, useState as ie } from "react";
import Cr from "react-dom";
import { observe as de, selector as je, set as ve, useObserverValue as te, useObserver as Ct, useSetObserver as Ue } from "react-observing";
import { useDrop as Wt } from "react-use-drag-and-drop";
import { v4 as ut } from "uuid";
function Sr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ot = { exports: {} }, ke = {};
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
function Pr() {
  if (St)
    return ke;
  St = 1;
  var e = Me, r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(u, a, v) {
    var h, f = {}, b = null, y = null;
    v !== void 0 && (b = "" + v), a.key !== void 0 && (b = "" + a.key), a.ref !== void 0 && (y = a.ref);
    for (h in a)
      o.call(a, h) && !c.hasOwnProperty(h) && (f[h] = a[h]);
    if (u && u.defaultProps)
      for (h in a = u.defaultProps, a)
        f[h] === void 0 && (f[h] = a[h]);
    return { $$typeof: r, type: u, key: b, ref: y, props: f, _owner: s.current };
  }
  return ke.Fragment = i, ke.jsx = l, ke.jsxs = l, ke;
}
var Ie = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pt;
function jr() {
  return Pt || (Pt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Me, r = Symbol.for("react.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), E = Symbol.iterator, T = "@@iterator";
    function L(t) {
      if (t === null || typeof t != "object")
        return null;
      var d = E && t[E] || t[T];
      return typeof d == "function" ? d : null;
    }
    var k = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function F(t) {
      {
        for (var d = arguments.length, m = new Array(d > 1 ? d - 1 : 0), C = 1; C < d; C++)
          m[C - 1] = arguments[C];
        x("error", t, m);
      }
    }
    function x(t, d, m) {
      {
        var C = k.ReactDebugCurrentFrame, V = C.getStackAddendum();
        V !== "" && (d += "%s", m = m.concat([V]));
        var K = m.map(function(N) {
          return String(N);
        });
        K.unshift("Warning: " + d), Function.prototype.apply.call(console[t], console, K);
      }
    }
    var D = !1, n = !1, S = !1, P = !1, J = !1, Z;
    Z = Symbol.for("react.module.reference");
    function R(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === c || J || t === s || t === v || t === h || P || t === y || D || n || S || typeof t == "object" && t !== null && (t.$$typeof === b || t.$$typeof === f || t.$$typeof === l || t.$$typeof === u || t.$$typeof === a || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === Z || t.getModuleId !== void 0));
    }
    function A(t, d, m) {
      var C = t.displayName;
      if (C)
        return C;
      var V = d.displayName || d.name || "";
      return V !== "" ? m + "(" + V + ")" : m;
    }
    function G(t) {
      return t.displayName || "Context";
    }
    function Q(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && F("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case i:
          return "Portal";
        case c:
          return "Profiler";
        case s:
          return "StrictMode";
        case v:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case u:
            var d = t;
            return G(d) + ".Consumer";
          case l:
            var m = t;
            return G(m._context) + ".Provider";
          case a:
            return A(t, t.render, "ForwardRef");
          case f:
            var C = t.displayName || null;
            return C !== null ? C : Q(t.type) || "Memo";
          case b: {
            var V = t, K = V._payload, N = V._init;
            try {
              return Q(N(K));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ee = Object.assign, ae = 0, re, ce, he, me, p, g, I;
    function j() {
    }
    j.__reactDisabledLog = !0;
    function O() {
      {
        if (ae === 0) {
          re = console.log, ce = console.info, he = console.warn, me = console.error, p = console.group, g = console.groupCollapsed, I = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: j,
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
        ae++;
      }
    }
    function z() {
      {
        if (ae--, ae === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ee({}, t, {
              value: re
            }),
            info: ee({}, t, {
              value: ce
            }),
            warn: ee({}, t, {
              value: he
            }),
            error: ee({}, t, {
              value: me
            }),
            group: ee({}, t, {
              value: p
            }),
            groupCollapsed: ee({}, t, {
              value: g
            }),
            groupEnd: ee({}, t, {
              value: I
            })
          });
        }
        ae < 0 && F("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var M = k.ReactCurrentDispatcher, $;
    function Y(t, d, m) {
      {
        if ($ === void 0)
          try {
            throw Error();
          } catch (V) {
            var C = V.stack.trim().match(/\n( *(at )?)/);
            $ = C && C[1] || "";
          }
        return `
` + $ + t;
      }
    }
    var B = !1, W;
    {
      var se = typeof WeakMap == "function" ? WeakMap : Map;
      W = new se();
    }
    function w(t, d) {
      if (!t || B)
        return "";
      {
        var m = W.get(t);
        if (m !== void 0)
          return m;
      }
      var C;
      B = !0;
      var V = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var K;
      K = M.current, M.current = null, O();
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
              C = ge;
            }
            Reflect.construct(t, [], N);
          } else {
            try {
              N.call();
            } catch (ge) {
              C = ge;
            }
            t.call(N.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ge) {
            C = ge;
          }
          t();
        }
      } catch (ge) {
        if (ge && C && typeof ge.stack == "string") {
          for (var U = ge.stack.split(`
`), ue = C.stack.split(`
`), ne = U.length - 1, oe = ue.length - 1; ne >= 1 && oe >= 0 && U[ne] !== ue[oe]; )
            oe--;
          for (; ne >= 1 && oe >= 0; ne--, oe--)
            if (U[ne] !== ue[oe]) {
              if (ne !== 1 || oe !== 1)
                do
                  if (ne--, oe--, oe < 0 || U[ne] !== ue[oe]) {
                    var fe = `
` + U[ne].replace(" at new ", " at ");
                    return t.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", t.displayName)), typeof t == "function" && W.set(t, fe), fe;
                  }
                while (ne >= 1 && oe >= 0);
              break;
            }
        }
      } finally {
        B = !1, M.current = K, z(), Error.prepareStackTrace = V;
      }
      var Ce = t ? t.displayName || t.name : "", Rt = Ce ? Y(Ce) : "";
      return typeof t == "function" && W.set(t, Rt), Rt;
    }
    function le(t, d, m) {
      return w(t, !1);
    }
    function Oe(t) {
      var d = t.prototype;
      return !!(d && d.isReactComponent);
    }
    function xe(t, d, m) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return w(t, Oe(t));
      if (typeof t == "string")
        return Y(t);
      switch (t) {
        case v:
          return Y("Suspense");
        case h:
          return Y("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case a:
            return le(t.render);
          case f:
            return xe(t.type, d, m);
          case b: {
            var C = t, V = C._payload, K = C._init;
            try {
              return xe(K(V), d, m);
            } catch {
            }
          }
        }
      return "";
    }
    var Fe = Object.prototype.hasOwnProperty, pt = {}, ht = k.ReactDebugCurrentFrame;
    function Ye(t) {
      if (t) {
        var d = t._owner, m = xe(t.type, t._source, d ? d.type : null);
        ht.setExtraStackFrame(m);
      } else
        ht.setExtraStackFrame(null);
    }
    function sr(t, d, m, C, V) {
      {
        var K = Function.call.bind(Fe);
        for (var N in t)
          if (K(t, N)) {
            var U = void 0;
            try {
              if (typeof t[N] != "function") {
                var ue = Error((C || "React class") + ": " + m + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ue.name = "Invariant Violation", ue;
              }
              U = t[N](d, N, C, m, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ne) {
              U = ne;
            }
            U && !(U instanceof Error) && (Ye(V), F("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", m, N, typeof U), Ye(null)), U instanceof Error && !(U.message in pt) && (pt[U.message] = !0, Ye(V), F("Failed %s type: %s", m, U.message), Ye(null));
          }
      }
    }
    var ur = Array.isArray;
    function Be(t) {
      return ur(t);
    }
    function cr(t) {
      {
        var d = typeof Symbol == "function" && Symbol.toStringTag, m = d && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return m;
      }
    }
    function lr(t) {
      try {
        return yt(t), !1;
      } catch {
        return !0;
      }
    }
    function yt(t) {
      return "" + t;
    }
    function bt(t) {
      if (lr(t))
        return F("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", cr(t)), yt(t);
    }
    var Pe = k.ReactCurrentOwner, fr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, mt, gt, Ve;
    Ve = {};
    function dr(t) {
      if (Fe.call(t, "ref")) {
        var d = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function vr(t) {
      if (Fe.call(t, "key")) {
        var d = Object.getOwnPropertyDescriptor(t, "key").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function pr(t, d) {
      if (typeof t.ref == "string" && Pe.current && d && Pe.current.stateNode !== d) {
        var m = Q(Pe.current.type);
        Ve[m] || (F('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(Pe.current.type), t.ref), Ve[m] = !0);
      }
    }
    function hr(t, d) {
      {
        var m = function() {
          mt || (mt = !0, F("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        m.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: m,
          configurable: !0
        });
      }
    }
    function yr(t, d) {
      {
        var m = function() {
          gt || (gt = !0, F("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        m.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: m,
          configurable: !0
        });
      }
    }
    var br = function(t, d, m, C, V, K, N) {
      var U = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: d,
        ref: m,
        props: N,
        // Record the component responsible for creating this element.
        _owner: K
      };
      return U._store = {}, Object.defineProperty(U._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(U, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(U, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: V
      }), Object.freeze && (Object.freeze(U.props), Object.freeze(U)), U;
    };
    function mr(t, d, m, C, V) {
      {
        var K, N = {}, U = null, ue = null;
        m !== void 0 && (bt(m), U = "" + m), vr(d) && (bt(d.key), U = "" + d.key), dr(d) && (ue = d.ref, pr(d, V));
        for (K in d)
          Fe.call(d, K) && !fr.hasOwnProperty(K) && (N[K] = d[K]);
        if (t && t.defaultProps) {
          var ne = t.defaultProps;
          for (K in ne)
            N[K] === void 0 && (N[K] = ne[K]);
        }
        if (U || ue) {
          var oe = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          U && hr(N, oe), ue && yr(N, oe);
        }
        return br(t, U, ue, V, C, Pe.current, N);
      }
    }
    var Xe = k.ReactCurrentOwner, wt = k.ReactDebugCurrentFrame;
    function Re(t) {
      if (t) {
        var d = t._owner, m = xe(t.type, t._source, d ? d.type : null);
        wt.setExtraStackFrame(m);
      } else
        wt.setExtraStackFrame(null);
    }
    var He;
    He = !1;
    function Ge(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function Et() {
      {
        if (Xe.current) {
          var t = Q(Xe.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function gr(t) {
      {
        if (t !== void 0) {
          var d = t.fileName.replace(/^.*[\\\/]/, ""), m = t.lineNumber;
          return `

Check your code at ` + d + ":" + m + ".";
        }
        return "";
      }
    }
    var xt = {};
    function wr(t) {
      {
        var d = Et();
        if (!d) {
          var m = typeof t == "string" ? t : t.displayName || t.name;
          m && (d = `

Check the top-level render call using <` + m + ">.");
        }
        return d;
      }
    }
    function _t(t, d) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var m = wr(d);
        if (xt[m])
          return;
        xt[m] = !0;
        var C = "";
        t && t._owner && t._owner !== Xe.current && (C = " It was passed a child from " + Q(t._owner.type) + "."), Re(t), F('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', m, C), Re(null);
      }
    }
    function Tt(t, d) {
      {
        if (typeof t != "object")
          return;
        if (Be(t))
          for (var m = 0; m < t.length; m++) {
            var C = t[m];
            Ge(C) && _t(C, d);
          }
        else if (Ge(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var V = L(t);
          if (typeof V == "function" && V !== t.entries)
            for (var K = V.call(t), N; !(N = K.next()).done; )
              Ge(N.value) && _t(N.value, d);
        }
      }
    }
    function Er(t) {
      {
        var d = t.type;
        if (d == null || typeof d == "string")
          return;
        var m;
        if (typeof d == "function")
          m = d.propTypes;
        else if (typeof d == "object" && (d.$$typeof === a || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        d.$$typeof === f))
          m = d.propTypes;
        else
          return;
        if (m) {
          var C = Q(d);
          sr(m, t.props, "prop", C, t);
        } else if (d.PropTypes !== void 0 && !He) {
          He = !0;
          var V = Q(d);
          F("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", V || "Unknown");
        }
        typeof d.getDefaultProps == "function" && !d.getDefaultProps.isReactClassApproved && F("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xr(t) {
      {
        for (var d = Object.keys(t.props), m = 0; m < d.length; m++) {
          var C = d[m];
          if (C !== "children" && C !== "key") {
            Re(t), F("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), Re(null);
            break;
          }
        }
        t.ref !== null && (Re(t), F("Invalid attribute `ref` supplied to `React.Fragment`."), Re(null));
      }
    }
    function Ot(t, d, m, C, V, K) {
      {
        var N = R(t);
        if (!N) {
          var U = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (U += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ue = gr(V);
          ue ? U += ue : U += Et();
          var ne;
          t === null ? ne = "null" : Be(t) ? ne = "array" : t !== void 0 && t.$$typeof === r ? (ne = "<" + (Q(t.type) || "Unknown") + " />", U = " Did you accidentally export a JSX literal instead of a component?") : ne = typeof t, F("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ne, U);
        }
        var oe = mr(t, d, m, V, K);
        if (oe == null)
          return oe;
        if (N) {
          var fe = d.children;
          if (fe !== void 0)
            if (C)
              if (Be(fe)) {
                for (var Ce = 0; Ce < fe.length; Ce++)
                  Tt(fe[Ce], t);
                Object.freeze && Object.freeze(fe);
              } else
                F("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Tt(fe, t);
        }
        return t === o ? xr(oe) : Er(oe), oe;
      }
    }
    function _r(t, d, m) {
      return Ot(t, d, m, !0);
    }
    function Tr(t, d, m) {
      return Ot(t, d, m, !1);
    }
    var Or = Tr, Rr = _r;
    Ie.Fragment = o, Ie.jsx = Or, Ie.jsxs = Rr;
  }()), Ie;
}
process.env.NODE_ENV === "production" ? ot.exports = Pr() : ot.exports = jr();
var _ = ot.exports, Se = {}, De = {}, at = { exports: {} }, We = { exports: {} }, X = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jt;
function kr() {
  if (jt)
    return X;
  jt = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, i = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, a = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, T = e ? Symbol.for("react.block") : 60121, L = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, F = e ? Symbol.for("react.scope") : 60119;
  function x(n) {
    if (typeof n == "object" && n !== null) {
      var S = n.$$typeof;
      switch (S) {
        case r:
          switch (n = n.type, n) {
            case a:
            case v:
            case o:
            case c:
            case s:
            case f:
              return n;
            default:
              switch (n = n && n.$$typeof, n) {
                case u:
                case h:
                case E:
                case y:
                case l:
                  return n;
                default:
                  return S;
              }
          }
        case i:
          return S;
      }
    }
  }
  function D(n) {
    return x(n) === v;
  }
  return X.AsyncMode = a, X.ConcurrentMode = v, X.ContextConsumer = u, X.ContextProvider = l, X.Element = r, X.ForwardRef = h, X.Fragment = o, X.Lazy = E, X.Memo = y, X.Portal = i, X.Profiler = c, X.StrictMode = s, X.Suspense = f, X.isAsyncMode = function(n) {
    return D(n) || x(n) === a;
  }, X.isConcurrentMode = D, X.isContextConsumer = function(n) {
    return x(n) === u;
  }, X.isContextProvider = function(n) {
    return x(n) === l;
  }, X.isElement = function(n) {
    return typeof n == "object" && n !== null && n.$$typeof === r;
  }, X.isForwardRef = function(n) {
    return x(n) === h;
  }, X.isFragment = function(n) {
    return x(n) === o;
  }, X.isLazy = function(n) {
    return x(n) === E;
  }, X.isMemo = function(n) {
    return x(n) === y;
  }, X.isPortal = function(n) {
    return x(n) === i;
  }, X.isProfiler = function(n) {
    return x(n) === c;
  }, X.isStrictMode = function(n) {
    return x(n) === s;
  }, X.isSuspense = function(n) {
    return x(n) === f;
  }, X.isValidElementType = function(n) {
    return typeof n == "string" || typeof n == "function" || n === o || n === v || n === c || n === s || n === f || n === b || typeof n == "object" && n !== null && (n.$$typeof === E || n.$$typeof === y || n.$$typeof === l || n.$$typeof === u || n.$$typeof === h || n.$$typeof === L || n.$$typeof === k || n.$$typeof === F || n.$$typeof === T);
  }, X.typeOf = x, X;
}
var H = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kt;
function Ir() {
  return kt || (kt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, i = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, a = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, T = e ? Symbol.for("react.block") : 60121, L = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, F = e ? Symbol.for("react.scope") : 60119;
    function x(w) {
      return typeof w == "string" || typeof w == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      w === o || w === v || w === c || w === s || w === f || w === b || typeof w == "object" && w !== null && (w.$$typeof === E || w.$$typeof === y || w.$$typeof === l || w.$$typeof === u || w.$$typeof === h || w.$$typeof === L || w.$$typeof === k || w.$$typeof === F || w.$$typeof === T);
    }
    function D(w) {
      if (typeof w == "object" && w !== null) {
        var le = w.$$typeof;
        switch (le) {
          case r:
            var Oe = w.type;
            switch (Oe) {
              case a:
              case v:
              case o:
              case c:
              case s:
              case f:
                return Oe;
              default:
                var xe = Oe && Oe.$$typeof;
                switch (xe) {
                  case u:
                  case h:
                  case E:
                  case y:
                  case l:
                    return xe;
                  default:
                    return le;
                }
            }
          case i:
            return le;
        }
      }
    }
    var n = a, S = v, P = u, J = l, Z = r, R = h, A = o, G = E, Q = y, ee = i, ae = c, re = s, ce = f, he = !1;
    function me(w) {
      return he || (he = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), p(w) || D(w) === a;
    }
    function p(w) {
      return D(w) === v;
    }
    function g(w) {
      return D(w) === u;
    }
    function I(w) {
      return D(w) === l;
    }
    function j(w) {
      return typeof w == "object" && w !== null && w.$$typeof === r;
    }
    function O(w) {
      return D(w) === h;
    }
    function z(w) {
      return D(w) === o;
    }
    function M(w) {
      return D(w) === E;
    }
    function $(w) {
      return D(w) === y;
    }
    function Y(w) {
      return D(w) === i;
    }
    function B(w) {
      return D(w) === c;
    }
    function W(w) {
      return D(w) === s;
    }
    function se(w) {
      return D(w) === f;
    }
    H.AsyncMode = n, H.ConcurrentMode = S, H.ContextConsumer = P, H.ContextProvider = J, H.Element = Z, H.ForwardRef = R, H.Fragment = A, H.Lazy = G, H.Memo = Q, H.Portal = ee, H.Profiler = ae, H.StrictMode = re, H.Suspense = ce, H.isAsyncMode = me, H.isConcurrentMode = p, H.isContextConsumer = g, H.isContextProvider = I, H.isElement = j, H.isForwardRef = O, H.isFragment = z, H.isLazy = M, H.isMemo = $, H.isPortal = Y, H.isProfiler = B, H.isStrictMode = W, H.isSuspense = se, H.isValidElementType = x, H.typeOf = D;
  }()), H;
}
var It;
function Ut() {
  return It || (It = 1, process.env.NODE_ENV === "production" ? We.exports = kr() : We.exports = Ir()), We.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Je, Mt;
function Mr() {
  if (Mt)
    return Je;
  Mt = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
  function o(c) {
    if (c == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(c);
  }
  function s() {
    try {
      if (!Object.assign)
        return !1;
      var c = new String("abc");
      if (c[5] = "de", Object.getOwnPropertyNames(c)[0] === "5")
        return !1;
      for (var l = {}, u = 0; u < 10; u++)
        l["_" + String.fromCharCode(u)] = u;
      var a = Object.getOwnPropertyNames(l).map(function(h) {
        return l[h];
      });
      if (a.join("") !== "0123456789")
        return !1;
      var v = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(h) {
        v[h] = h;
      }), Object.keys(Object.assign({}, v)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Je = s() ? Object.assign : function(c, l) {
    for (var u, a = o(c), v, h = 1; h < arguments.length; h++) {
      u = Object(arguments[h]);
      for (var f in u)
        r.call(u, f) && (a[f] = u[f]);
      if (e) {
        v = e(u);
        for (var b = 0; b < v.length; b++)
          i.call(u, v[b]) && (a[v[b]] = u[v[b]]);
      }
    }
    return a;
  }, Je;
}
var Ke, At;
function ct() {
  if (At)
    return Ke;
  At = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Ke = e, Ke;
}
var Ze, $t;
function qt() {
  return $t || ($t = 1, Ze = Function.call.bind(Object.prototype.hasOwnProperty)), Ze;
}
var Qe, Dt;
function Ar() {
  if (Dt)
    return Qe;
  Dt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = ct(), i = {}, o = qt();
    e = function(c) {
      var l = "Warning: " + c;
      typeof console < "u" && console.error(l);
      try {
        throw new Error(l);
      } catch {
      }
    };
  }
  function s(c, l, u, a, v) {
    if (process.env.NODE_ENV !== "production") {
      for (var h in c)
        if (o(c, h)) {
          var f;
          try {
            if (typeof c[h] != "function") {
              var b = Error(
                (a || "React class") + ": " + u + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            f = c[h](l, h, a, u, null, r);
          } catch (E) {
            f = E;
          }
          if (f && !(f instanceof Error) && e(
            (a || "React class") + ": type specification of " + u + " `" + h + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in i)) {
            i[f.message] = !0;
            var y = v ? v() : "";
            e(
              "Failed " + u + " type: " + f.message + (y ?? "")
            );
          }
        }
    }
  }
  return s.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (i = {});
  }, Qe = s, Qe;
}
var et, Lt;
function $r() {
  if (Lt)
    return et;
  Lt = 1;
  var e = Ut(), r = Mr(), i = ct(), o = qt(), s = Ar(), c = function() {
  };
  process.env.NODE_ENV !== "production" && (c = function(u) {
    var a = "Warning: " + u;
    typeof console < "u" && console.error(a);
    try {
      throw new Error(a);
    } catch {
    }
  });
  function l() {
    return null;
  }
  return et = function(u, a) {
    var v = typeof Symbol == "function" && Symbol.iterator, h = "@@iterator";
    function f(p) {
      var g = p && (v && p[v] || p[h]);
      if (typeof g == "function")
        return g;
    }
    var b = "<<anonymous>>", y = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: F(),
      arrayOf: x,
      element: D(),
      elementType: n(),
      instanceOf: S,
      node: R(),
      objectOf: J,
      oneOf: P,
      oneOfType: Z,
      shape: G,
      exact: Q
    };
    function E(p, g) {
      return p === g ? p !== 0 || 1 / p === 1 / g : p !== p && g !== g;
    }
    function T(p, g) {
      this.message = p, this.data = g && typeof g == "object" ? g : {}, this.stack = "";
    }
    T.prototype = Error.prototype;
    function L(p) {
      if (process.env.NODE_ENV !== "production")
        var g = {}, I = 0;
      function j(z, M, $, Y, B, W, se) {
        if (Y = Y || b, W = W || $, se !== i) {
          if (a) {
            var w = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw w.name = "Invariant Violation", w;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var le = Y + ":" + $;
            !g[le] && // Avoid spamming the console because they are often not actionable except for lib authors
            I < 3 && (c(
              "You are manually calling a React.PropTypes validation function for the `" + W + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), g[le] = !0, I++);
          }
        }
        return M[$] == null ? z ? M[$] === null ? new T("The " + B + " `" + W + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new T("The " + B + " `" + W + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : p(M, $, Y, B, W);
      }
      var O = j.bind(null, !1);
      return O.isRequired = j.bind(null, !0), O;
    }
    function k(p) {
      function g(I, j, O, z, M, $) {
        var Y = I[j], B = re(Y);
        if (B !== p) {
          var W = ce(Y);
          return new T(
            "Invalid " + z + " `" + M + "` of type " + ("`" + W + "` supplied to `" + O + "`, expected ") + ("`" + p + "`."),
            { expectedType: p }
          );
        }
        return null;
      }
      return L(g);
    }
    function F() {
      return L(l);
    }
    function x(p) {
      function g(I, j, O, z, M) {
        if (typeof p != "function")
          return new T("Property `" + M + "` of component `" + O + "` has invalid PropType notation inside arrayOf.");
        var $ = I[j];
        if (!Array.isArray($)) {
          var Y = re($);
          return new T("Invalid " + z + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected an array."));
        }
        for (var B = 0; B < $.length; B++) {
          var W = p($, B, O, z, M + "[" + B + "]", i);
          if (W instanceof Error)
            return W;
        }
        return null;
      }
      return L(g);
    }
    function D() {
      function p(g, I, j, O, z) {
        var M = g[I];
        if (!u(M)) {
          var $ = re(M);
          return new T("Invalid " + O + " `" + z + "` of type " + ("`" + $ + "` supplied to `" + j + "`, expected a single ReactElement."));
        }
        return null;
      }
      return L(p);
    }
    function n() {
      function p(g, I, j, O, z) {
        var M = g[I];
        if (!e.isValidElementType(M)) {
          var $ = re(M);
          return new T("Invalid " + O + " `" + z + "` of type " + ("`" + $ + "` supplied to `" + j + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return L(p);
    }
    function S(p) {
      function g(I, j, O, z, M) {
        if (!(I[j] instanceof p)) {
          var $ = p.name || b, Y = me(I[j]);
          return new T("Invalid " + z + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return L(g);
    }
    function P(p) {
      if (!Array.isArray(p))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? c(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : c("Invalid argument supplied to oneOf, expected an array.")), l;
      function g(I, j, O, z, M) {
        for (var $ = I[j], Y = 0; Y < p.length; Y++)
          if (E($, p[Y]))
            return null;
        var B = JSON.stringify(p, function(se, w) {
          var le = ce(w);
          return le === "symbol" ? String(w) : w;
        });
        return new T("Invalid " + z + " `" + M + "` of value `" + String($) + "` " + ("supplied to `" + O + "`, expected one of " + B + "."));
      }
      return L(g);
    }
    function J(p) {
      function g(I, j, O, z, M) {
        if (typeof p != "function")
          return new T("Property `" + M + "` of component `" + O + "` has invalid PropType notation inside objectOf.");
        var $ = I[j], Y = re($);
        if (Y !== "object")
          return new T("Invalid " + z + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected an object."));
        for (var B in $)
          if (o($, B)) {
            var W = p($, B, O, z, M + "." + B, i);
            if (W instanceof Error)
              return W;
          }
        return null;
      }
      return L(g);
    }
    function Z(p) {
      if (!Array.isArray(p))
        return process.env.NODE_ENV !== "production" && c("Invalid argument supplied to oneOfType, expected an instance of array."), l;
      for (var g = 0; g < p.length; g++) {
        var I = p[g];
        if (typeof I != "function")
          return c(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + he(I) + " at index " + g + "."
          ), l;
      }
      function j(O, z, M, $, Y) {
        for (var B = [], W = 0; W < p.length; W++) {
          var se = p[W], w = se(O, z, M, $, Y, i);
          if (w == null)
            return null;
          w.data && o(w.data, "expectedType") && B.push(w.data.expectedType);
        }
        var le = B.length > 0 ? ", expected one of type [" + B.join(", ") + "]" : "";
        return new T("Invalid " + $ + " `" + Y + "` supplied to " + ("`" + M + "`" + le + "."));
      }
      return L(j);
    }
    function R() {
      function p(g, I, j, O, z) {
        return ee(g[I]) ? null : new T("Invalid " + O + " `" + z + "` supplied to " + ("`" + j + "`, expected a ReactNode."));
      }
      return L(p);
    }
    function A(p, g, I, j, O) {
      return new T(
        (p || "React class") + ": " + g + " type `" + I + "." + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + O + "`."
      );
    }
    function G(p) {
      function g(I, j, O, z, M) {
        var $ = I[j], Y = re($);
        if (Y !== "object")
          return new T("Invalid " + z + " `" + M + "` of type `" + Y + "` " + ("supplied to `" + O + "`, expected `object`."));
        for (var B in p) {
          var W = p[B];
          if (typeof W != "function")
            return A(O, z, M, B, ce(W));
          var se = W($, B, O, z, M + "." + B, i);
          if (se)
            return se;
        }
        return null;
      }
      return L(g);
    }
    function Q(p) {
      function g(I, j, O, z, M) {
        var $ = I[j], Y = re($);
        if (Y !== "object")
          return new T("Invalid " + z + " `" + M + "` of type `" + Y + "` " + ("supplied to `" + O + "`, expected `object`."));
        var B = r({}, I[j], p);
        for (var W in B) {
          var se = p[W];
          if (o(p, W) && typeof se != "function")
            return A(O, z, M, W, ce(se));
          if (!se)
            return new T(
              "Invalid " + z + " `" + M + "` key `" + W + "` supplied to `" + O + "`.\nBad object: " + JSON.stringify(I[j], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(p), null, "  ")
            );
          var w = se($, W, O, z, M + "." + W, i);
          if (w)
            return w;
        }
        return null;
      }
      return L(g);
    }
    function ee(p) {
      switch (typeof p) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !p;
        case "object":
          if (Array.isArray(p))
            return p.every(ee);
          if (p === null || u(p))
            return !0;
          var g = f(p);
          if (g) {
            var I = g.call(p), j;
            if (g !== p.entries) {
              for (; !(j = I.next()).done; )
                if (!ee(j.value))
                  return !1;
            } else
              for (; !(j = I.next()).done; ) {
                var O = j.value;
                if (O && !ee(O[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function ae(p, g) {
      return p === "symbol" ? !0 : g ? g["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && g instanceof Symbol : !1;
    }
    function re(p) {
      var g = typeof p;
      return Array.isArray(p) ? "array" : p instanceof RegExp ? "object" : ae(g, p) ? "symbol" : g;
    }
    function ce(p) {
      if (typeof p > "u" || p === null)
        return "" + p;
      var g = re(p);
      if (g === "object") {
        if (p instanceof Date)
          return "date";
        if (p instanceof RegExp)
          return "regexp";
      }
      return g;
    }
    function he(p) {
      var g = ce(p);
      switch (g) {
        case "array":
        case "object":
          return "an " + g;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + g;
        default:
          return g;
      }
    }
    function me(p) {
      return !p.constructor || !p.constructor.name ? b : p.constructor.name;
    }
    return y.checkPropTypes = s, y.resetWarningCache = s.resetWarningCache, y.PropTypes = y, y;
  }, et;
}
var tt, Ft;
function Dr() {
  if (Ft)
    return tt;
  Ft = 1;
  var e = ct();
  function r() {
  }
  function i() {
  }
  return i.resetWarningCache = r, tt = function() {
    function o(l, u, a, v, h, f) {
      if (f !== e) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
      }
    }
    o.isRequired = o;
    function s() {
      return o;
    }
    var c = {
      array: o,
      bigint: o,
      bool: o,
      func: o,
      number: o,
      object: o,
      string: o,
      symbol: o,
      any: o,
      arrayOf: s,
      element: o,
      elementType: o,
      instanceOf: s,
      node: o,
      objectOf: s,
      oneOf: s,
      oneOfType: s,
      shape: s,
      exact: s,
      checkPropTypes: i,
      resetWarningCache: r
    };
    return c.PropTypes = c, c;
  }, tt;
}
if (process.env.NODE_ENV !== "production") {
  var Lr = Ut(), Fr = !0;
  at.exports = $r()(Lr.isElement, Fr);
} else
  at.exports = Dr()();
var zt = at.exports, pe = {};
Object.defineProperty(pe, "__esModule", {
  value: !0
});
pe.FrameContextConsumer = pe.FrameContextProvider = pe.useFrame = pe.FrameContext = void 0;
var Yr = Me, Nt = Wr(Yr);
function Wr(e) {
  return e && e.__esModule ? e : { default: e };
}
var Bt = void 0, Vt = void 0;
typeof document < "u" && (Bt = document);
typeof window < "u" && (Vt = window);
var lt = pe.FrameContext = Nt.default.createContext({ document: Bt, window: Vt });
pe.useFrame = function() {
  return Nt.default.useContext(lt);
};
var Ur = lt.Provider, qr = lt.Consumer;
pe.FrameContextProvider = Ur;
pe.FrameContextConsumer = qr;
var ft = {};
Object.defineProperty(ft, "__esModule", {
  value: !0
});
var zr = /* @__PURE__ */ function() {
  function e(r, i) {
    for (var o = 0; o < i.length; o++) {
      var s = i[o];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
    }
  }
  return function(r, i, o) {
    return i && e(r.prototype, i), o && e(r, o), r;
  };
}(), it = Me;
Xt(it);
var Nr = zt, rt = Xt(Nr);
function Xt(e) {
  return e && e.__esModule ? e : { default: e };
}
function Br(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function Vr(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function Xr(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var Ht = function(e) {
  Xr(r, e);
  function r() {
    return Br(this, r), Vr(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
  }
  return zr(r, [{
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
      return it.Children.only(this.props.children);
    }
  }]), r;
}(it.Component);
Ht.propTypes = {
  children: rt.default.element.isRequired,
  contentDidMount: rt.default.func.isRequired,
  contentDidUpdate: rt.default.func.isRequired
};
ft.default = Ht;
Object.defineProperty(De, "__esModule", {
  value: !0
});
De.Frame = void 0;
var st = Object.assign || function(e) {
  for (var r = 1; r < arguments.length; r++) {
    var i = arguments[r];
    for (var o in i)
      Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o]);
  }
  return e;
}, Hr = /* @__PURE__ */ function() {
  function e(r, i) {
    for (var o = 0; o < i.length; o++) {
      var s = i[o];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
    }
  }
  return function(r, i, o) {
    return i && e(r.prototype, i), o && e(r, o), r;
  };
}(), Gt = Me, _e = ze(Gt), Gr = Cr, Yt = ze(Gr), Jr = zt, ye = ze(Jr), Kr = pe, Zr = ft, Qr = ze(Zr);
function ze(e) {
  return e && e.__esModule ? e : { default: e };
}
function en(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function tn(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function rn(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var dt = De.Frame = function(e) {
  rn(r, e);
  function r(i, o) {
    en(this, r);
    var s = tn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, i, o));
    return s.setRef = function(c) {
      s.nodeRef.current = c;
      var l = s.props.forwardedRef;
      typeof l == "function" ? l(c) : l && (l.current = c);
    }, s.handleLoad = function() {
      clearInterval(s.loadCheck), s.state.iframeLoaded || s.setState({ iframeLoaded: !0 });
    }, s.loadCheck = function() {
      return setInterval(function() {
        s.handleLoad();
      }, 500);
    }, s._isMounted = !1, s.nodeRef = _e.default.createRef(), s.state = { iframeLoaded: !1 }, s;
  }
  return Hr(r, [{
    key: "componentDidMount",
    value: function() {
      this._isMounted = !0;
      var o = this.getDoc();
      o && this.nodeRef.current.contentWindow.addEventListener("DOMContentLoaded", this.handleLoad);
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
      var o = this.getDoc();
      return this.props.mountTarget ? o.querySelector(this.props.mountTarget) : o.body.children[0];
    }
    // In certain situations on a cold cache DOMContentLoaded never gets called
    // fallback to an interval to check if that's the case
  }, {
    key: "renderFrameContents",
    value: function() {
      if (!this._isMounted)
        return null;
      var o = this.getDoc();
      if (!o)
        return null;
      var s = this.props.contentDidMount, c = this.props.contentDidUpdate, l = o.defaultView || o.parentView, u = _e.default.createElement(
        Qr.default,
        {
          contentDidMount: s,
          contentDidUpdate: c
        },
        _e.default.createElement(
          Kr.FrameContextProvider,
          { value: { document: o, window: l } },
          _e.default.createElement(
            "div",
            { className: "frame-content" },
            this.props.children
          )
        )
      ), a = this.getMountTarget();
      return [Yt.default.createPortal(this.props.head, this.getDoc().head), Yt.default.createPortal(u, a)];
    }
  }, {
    key: "render",
    value: function() {
      var o = st({}, this.props, {
        srcDoc: this.props.initialContent,
        children: void 0
        // The iframe isn't ready so we drop children from props here. #12, #17
      });
      return delete o.head, delete o.initialContent, delete o.mountTarget, delete o.contentDidMount, delete o.contentDidUpdate, delete o.forwardedRef, _e.default.createElement(
        "iframe",
        st({}, o, { ref: this.setRef, onLoad: this.handleLoad }),
        this.state.iframeLoaded && this.renderFrameContents()
      );
    }
  }]), r;
}(Gt.Component);
dt.propTypes = {
  style: ye.default.object,
  // eslint-disable-line
  head: ye.default.node,
  initialContent: ye.default.string,
  mountTarget: ye.default.string,
  contentDidMount: ye.default.func,
  contentDidUpdate: ye.default.func,
  children: ye.default.oneOfType([ye.default.element, ye.default.arrayOf(ye.default.element)])
};
dt.defaultProps = {
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
De.default = _e.default.forwardRef(function(e, r) {
  return _e.default.createElement(dt, st({}, e, { forwardedRef: r }));
});
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var r = De;
  Object.defineProperty(e, "default", {
    enumerable: !0,
    get: function() {
      return o(r).default;
    }
  });
  var i = pe;
  Object.defineProperty(e, "FrameContext", {
    enumerable: !0,
    get: function() {
      return i.FrameContext;
    }
  }), Object.defineProperty(e, "FrameContextConsumer", {
    enumerable: !0,
    get: function() {
      return i.FrameContextConsumer;
    }
  }), Object.defineProperty(e, "useFrame", {
    enumerable: !0,
    get: function() {
      return i.useFrame;
    }
  });
  function o(s) {
    return s && s.__esModule ? s : { default: s };
  }
})(Se);
const nn = /* @__PURE__ */ Sr(Se), Jt = Ae({}), on = ({ children: e }) => {
  const r = q(() => ({
    top: de(0),
    left: de(0)
  }), []);
  return /* @__PURE__ */ _.jsx(Jt.Provider, { value: r, children: e });
}, Le = () => $e(Jt), Kt = Ae(de(1)), an = ({ children: e, value: r }) => {
  const i = q(() => de(r < 1 ? 1 : r), [r]);
  return /* @__PURE__ */ _.jsx(Kt.Provider, { value: i, children: e });
}, vt = () => $e(Kt), Zt = Ae(15), sn = ({ children: e, value: r }) => /* @__PURE__ */ _.jsx(Zt.Provider, { value: r < 1 ? 1 : r, children: e }), un = () => $e(Zt), Qt = Ae(de(void 0)), cn = ({ children: e }) => {
  const r = q(() => de(void 0), []);
  return /* @__PURE__ */ _.jsx(Qt.Provider, { value: r, children: e });
}, er = () => $e(Qt), tr = Ae({}), ln = ({ children: e, items: r }) => {
  const i = we(de(r));
  Ee(() => {
    i.current.value = r;
  }, [r]);
  const o = q(() => je({
    get: ({ get: u }) => {
      const a = [];
      return u(i.current).forEach((v, h, f) => {
        u(v.connections).forEach((b) => {
          const y = f.find((E) => u(b.relatedId) === u(E.id));
          y && a.push({
            top1: v.top,
            left1: v.left,
            top2: y.top,
            left2: y.left,
            width1: v.width,
            height1: v.height,
            width2: y.width,
            height2: y.height,
            nodeId: v.id,
            id: b.id,
            relatedNodeId: y.id,
            key: `line_key_${u(v.id)}_${u(y.id)}`,
            isCurved: je(({ get: E }) => E(y.connections).some((T) => E(T.relatedId) === E(v.id)))
          });
        });
      }), a;
    }
  }), []), s = q(() => ({
    width: je({
      get: ({ get: u }) => u(i.current).reduce((a, v) => {
        const h = u(v.left) + u(v.width);
        return h > a ? h : a;
      }, 0)
    }),
    height: je({
      get: ({ get: u }) => u(i.current).reduce((a, v) => {
        const h = u(v.top) + u(v.height);
        return h > a ? h : a;
      }, 0)
    })
  }), []), c = q(() => de([]), []), l = q(() => je({
    get: ({ get: u }) => u(i.current).filter((v) => u(c).includes(u(v.id)))
  }), [c]);
  return /* @__PURE__ */ _.jsx(tr.Provider, { value: { flowStore: i.current, linesStore: o, boardSizes: s, selectedItems: l, selectedItemsId: c }, children: e });
}, Te = () => $e(tr), rr = () => Te().boardSizes, nr = (e) => {
  const { selectedItemsId: r } = Te(), i = we(de(r.value.includes(e)));
  return Ee(() => {
    const o = r.subscribe((s) => {
      const c = s.includes(e);
      ve(i.current, (l) => l !== c ? c : l);
    });
    return () => o.unsubscribe();
  }, [r, e]), i.current;
}, Ne = () => {
  const { selectedItemsId: e, linesStore: r } = Te();
  return be((i, o = !1) => {
    if (typeof i == "string") {
      if (e.value.some((s) => s === i) && !o)
        return;
      e.value.some((s) => s === i) ? ve(e, (s) => {
        const c = s.filter((u) => u !== i).filter((u) => !r.value.some((a) => a.id.value === u)), l = r.value.filter((u) => c.includes(u.nodeId.value) && c.includes(u.relatedNodeId.value)).map((u) => u.id.value);
        return [...c, ...l];
      }) : o ? ve(e, (s) => {
        const c = [
          ...s.filter((u) => !r.value.some((a) => a.id.value === u)),
          i
        ], l = r.value.filter((u) => c.includes(u.nodeId.value) && c.includes(u.relatedNodeId.value)).map((u) => u.id.value);
        return [...c, ...l];
      }) : ve(e, [i]);
    } else {
      if (i.sort().join() === e.value.sort().join())
        return;
      const s = [...i], c = r.value.filter((l) => s.includes(l.nodeId.value) && s.includes(l.relatedNodeId.value)).map((l) => l.id.value);
      if ([...s, ...c].sort().join() === e.value.sort().join())
        return;
      ve(e, [...s, ...c]);
    }
  }, [e]);
}, or = () => {
  const { selectedItems: e } = Te();
  return be((r, i) => {
    e.value.length !== 0 && ((e.value.every((o) => o.top.value > 0) || i > 0) && e.value.forEach((o) => {
      ve(o.top, (s) => s + i <= 0 ? 0 : s + i);
    }), (e.value.every((o) => o.left.value > 0) || r > 0) && e.value.forEach((o) => {
      ve(o.left, (s) => s + r <= 0 ? 0 : s + r);
    }));
  }, [e]);
}, fn = `
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
`, dn = () => navigator.userAgent.toUpperCase().includes("MAC"), qe = (e) => dn() ? e.metaKey : e.ctrlKey, nt = (e, r = 15) => Math.round(e / r) * r, vn = ({ nodeId: e, height: r, width: i, getIsDisabledCreateConnection: o, getIsDisabledDropConnection: s }) => {
  const c = te(er()), { flowStore: l } = Te(), u = be(() => {
    if (c && c.nodeId !== e) {
      for (const a of l.value)
        if (a.id.value === c.nodeId) {
          if (c.type === "end") {
            if (s())
              return;
            if (!c.lineId) {
              ve(a.connections, (v) => [
                ...v,
                {
                  id: de(ut()),
                  relatedId: de(e)
                }
              ]);
              return;
            }
            ve(a.connections, (v) => (v.forEach((h) => {
              h.id.value === c.lineId && (h.relatedId = de(e));
            }), [...v]));
            return;
          }
          if (o())
            return;
          ve(a.connections, (v) => {
            const h = v.find((b) => b.id.value === c.lineId);
            if (!h || h.relatedId.value === e)
              return v;
            const f = l.value.find((b) => b.id.value === e);
            return f ? (ve(f.connections, (b) => [
              ...b,
              {
                id: h.id,
                relatedId: h.relatedId
              }
            ]), [
              ...v.filter((b) => b.id.value !== c.lineId)
            ]) : v;
          });
          return;
        }
    }
  }, [c, e, o, s]);
  return /* @__PURE__ */ _.jsx(_.Fragment, { children: /* @__PURE__ */ _.jsx(
    "span",
    {
      onMouseUp: u,
      onMouseDown: (a) => a.stopPropagation(),
      style: {
        top: -4,
        left: -4,
        width: i + 8,
        height: r + 8,
        position: "absolute",
        //backgroundColor: 'red',
        pointerEvents: c ? "auto" : "none"
      }
    }
  ) });
}, pn = ({ node: e }) => {
  const r = te(e.id), i = nr(r), o = or(), s = Ne(), { selectedItemsId: c } = Te(), l = Le(), u = un(), { window: a } = Se.useFrame(), [v, h] = Ct(e.left), f = te(e.height), [b, y] = Ct(e.top), E = te(e.width), T = we({ top: 0, left: 0 }), L = be((x) => {
    if (s(r, qe(x.nativeEvent)), !c.value.some((S) => S === r) || !a)
      return;
    const D = (S) => {
      const P = S.pageX - l.left.value - T.current.left, J = S.pageY - l.top.value - T.current.top, Z = nt(P, u) - e.left.value, R = nt(J, u) - e.top.value;
      Z === 0 && R === 0 || o(Z, R);
    }, n = () => {
      a.removeEventListener("mousemove", D), a.removeEventListener("mouseup", n);
    };
    T.current = {
      top: x.nativeEvent.pageY - b - l.top.value,
      left: x.nativeEvent.pageX - v - l.left.value
    }, a.addEventListener("mousemove", D), a.addEventListener("mouseup", n);
  }, [h, y, s, o, nt, u, r, a, l, e.left, e.top]), k = q(() => e.render({
    width: e.width,
    height: e.height,
    isSelected: i
  }), [e.render, e.width, e.height, i]), F = q(() => `translate(${v}px, ${b}px)`, [v, b]);
  return /* @__PURE__ */ _.jsxs(
    "div",
    {
      onMouseDown: L,
      className: "draggable-container",
      style: { width: E, height: f, transform: F },
      children: [
        /* @__PURE__ */ _.jsx("div", { className: "draggable-container-content", children: k }),
        /* @__PURE__ */ _.jsx(
          vn,
          {
            nodeId: r,
            width: E,
            height: f,
            getIsDisabledDropConnection: () => {
              var x;
              return !!((x = e.disableDropConnections) != null && x.call(e));
            },
            getIsDisabledCreateConnection: () => {
              var x;
              return !!((x = e.disableCreateConnections) != null && x.call(e));
            }
          }
        )
      ]
    }
  );
}, hn = ({ children: e }) => {
  const { height: r, width: i } = rr(), o = vt(), [s, c] = ie(r.value), [l, u] = ie(i.value), [a, v] = ie(o.value);
  return Ee(() => {
    c(r.value), u(i.value), v(o.value);
    const h = r.subscribe((y) => c((E) => E !== y ? y : E)), f = i.subscribe((y) => u((E) => E !== y ? y : E)), b = o.subscribe((y) => v((E) => E !== y ? y : E));
    return () => {
      h.unsubscribe(), f.unsubscribe(), b.unsubscribe();
    };
  }, [r, i, o]), /* @__PURE__ */ _.jsx("svg", { style: {
    zoom: a,
    minWidth: "100vw",
    minHeight: "100vh",
    width: l + 500,
    position: "absolute",
    height: s + 500,
    pointerEvents: "none"
  }, children: e });
}, yn = ({ children: e }) => {
  const { height: r, width: i } = rr(), o = vt(), [s, c] = ie(r.value), [l, u] = ie(i.value), [a, v] = ie(o.value);
  return Ee(() => {
    c(r.value), u(i.value), v(o.value);
    const h = r.subscribe((y) => c((E) => E !== y ? y : E)), f = i.subscribe((y) => u((E) => E !== y ? y : E)), b = o.subscribe((y) => v((E) => E !== y ? y : E));
    return () => {
      h.unsubscribe(), f.unsubscribe(), b.unsubscribe();
    };
  }, [r, i, o]), /* @__PURE__ */ _.jsx("div", { style: { zoom: a, height: s + 500, width: l + 500, pointerEvents: "none" }, children: e });
}, bn = ({ onSelectionEnd: e, onSelectionStart: r, isDisabled: i = !1, onCoordsChange: o, boardRef: s }) => {
  const c = Le(), { window: l } = Se.useFrame(), [u, a] = ie(0), [v, h] = ie(!1), [f, b] = ie(0), [y, E] = ie(0), [T, L] = ie(0), k = be((S) => {
    var Z;
    if (!l || !((Z = s.current) != null && Z.isSameNode(S.target)))
      return;
    r == null || r(S);
    const P = (R) => {
      E(R.pageX - c.left.value), L(R.pageY - c.top.value);
    }, J = (R) => {
      l.removeEventListener("mousemove", P), l.removeEventListener("mouseup", J), e == null || e(R), h(!1);
    };
    a(S.offsetX - c.left.value), b(S.offsetY - c.top.value), E(S.offsetX - c.left.value), L(S.offsetY - c.top.value), h(!0), l.addEventListener("mousemove", P), l.addEventListener("mouseup", J);
  }, [l, c, s]);
  Ee(() => {
    if (l && !i)
      return l.addEventListener("mousedown", k), () => l.removeEventListener("mousedown", k);
  }, [l, i, k]);
  const F = q(() => T - f > 0 || f < T ? f : T, [T, f]), x = q(() => y - u > 0 || u < y ? u : y, [y, u]), D = q(() => y - u > 0 || u - y < 0 ? y - u : u - y, [y, u]), n = q(() => T - f > 0 || f - T < 0 ? T - f : f - T, [T, f]);
  return Ee(() => {
    o == null || o({
      startY: F,
      startX: x,
      endY: F + n,
      endX: x + D
    });
  }, [F, x, n, D]), i || !v ? null : /* @__PURE__ */ _.jsx(
    "rect",
    {
      y: F,
      x,
      width: D,
      height: n,
      strokeWidth: 1,
      stroke: "#999fff",
      fill: "#ffffff11"
    }
  );
}, ar = (e) => {
  const r = q(() => e.isCurved ? 11.11111111111111 : 0, [e.isCurved]), i = q(() => 8, []), o = q(() => e.top1 - i, [e.top1, i]), s = q(() => e.top2 - i, [e.top2, i]), c = q(() => e.left1 - i, [e.left1, i]), l = q(() => e.left2 - i, [e.left2, i]), u = q(() => e.width1 + i * 2, [e.width1, i]), a = q(() => e.width2 + i * 2, [e.width2, i]), v = q(() => e.height1 + i * 2, [e.height1, i]), h = q(() => e.height2 + i * 2, [e.height2, i]), f = q(() => {
    let x = Math.atan2(c - l, o - s) * (180 / Math.PI);
    return x < 0 ? x = Math.abs(x) : x = 360 - x, x;
  }, [l, s, c, o]), b = q(() => f >= 45 && f <= 135 ? f - 45 : f >= 135 && f <= 225 ? f - 135 : f >= 225 && f <= 315 ? f - 225 : f >= 315 && f <= 360 || f >= 0 && f <= 45 ? f >= 315 && f <= 360 ? f - 315 : f + 45 : 0, [f]), y = q(() => {
    if (f >= 45 && f <= 135)
      return "left";
    if (f >= 135 && f <= 225)
      return "top";
    if (f >= 225 && f <= 315)
      return "right";
    if (f >= 315 && f <= 360 || f >= 0 && f <= 45)
      return "bottom";
  }, [f]), E = be((x, D) => {
    const n = b * 100 / 90, S = D * n / 100;
    return x - S;
  }, [b]), T = q(() => {
    switch (y) {
      case "left":
        return c + u;
      case "top":
        return E(c + u, u);
      case "right":
        return c;
      case "bottom":
        return E(c, -u);
      default:
        return 0;
    }
  }, [y, c, u, r, b, E]), L = q(() => {
    switch (y) {
      case "left":
        return E(o, -v);
      case "top":
        return o + v;
      case "right":
        return E(o + v, v);
      case "bottom":
        return o;
      default:
        return 0;
    }
  }, [y, o, v, r, b, E]), k = q(() => {
    switch (y) {
      case "left":
        return l;
      case "top":
        return E(l, -a);
      case "right":
        return l + a;
      case "bottom":
        return E(l + a, a);
      default:
        return 0;
    }
  }, [y, l, a, r, b, E]), F = q(() => {
    switch (y) {
      case "left":
        return E(s + h, h);
      case "top":
        return s;
      case "right":
        return E(s, -h);
      case "bottom":
        return s + h;
      default:
        return 0;
    }
  }, [y, s, h, r, b, E]);
  return {
    y1: L,
    y2: F,
    x1: T,
    x2: k,
    top1: o,
    top2: s,
    left1: c,
    left2: l,
    angle: f,
    width1: u,
    width2: a,
    height1: v,
    height2: h,
    sideAngle: b,
    extraSpace: i,
    currentSide: y
  };
}, ir = ({ lineId: e, newConnection: r = !1, position1FromCenter: i = !1, disableStartDraggable: o = !1, nodeId: s, lineWidth: c, onDragLineEnd: l, onDragLineStart: u, ...a }) => {
  const v = Ue(er()), h = Ne(), f = Le(), { window: b } = Se.useFrame(), [y, E] = ie(a.top1), [T, L] = ie(a.top2), [k, F] = ie(a.left1), [x, D] = ie(a.left2), [n, S] = ie();
  Ee(() => {
    E(a.top1), L(a.top2), F(a.left1), D(a.left2);
  }, [a.top1, a.top2, a.left1, a.left2]);
  const P = ar({
    top1: y,
    top2: T,
    left1: k,
    left2: x,
    width1: a.width1,
    width2: a.width2,
    height1: a.height1,
    height2: a.height2
  }), J = we({ top: 0, left: 0 }), Z = be((A) => {
    if (e && h([e], !1), S("start"), u == null || u(), !b)
      return;
    const G = (ee) => {
      const ae = ee.pageX - f.left.value - J.current.left, re = ee.pageY - f.top.value - J.current.top;
      F(ae), E(re);
    }, Q = () => {
      S(void 0), F(a.left1), v(void 0), E(a.top1), l == null || l(), b.removeEventListener("mousemove", G), b.removeEventListener("mouseup", Q);
    };
    J.current = {
      top: A.nativeEvent.pageY - P.y1 - f.top.value,
      left: A.nativeEvent.pageX - P.x1 - f.left.value - 10
    }, G(A.nativeEvent), v({ type: "start", nodeId: s, lineId: e }), b.addEventListener("mousemove", G), b.addEventListener("mouseup", Q);
  }, [v, u, l, b, f, y, k, P.y1, P.x1, a.left1, a.top1, s, e]), R = be((A) => {
    if (e && h([e], !1), S("end"), u == null || u(), !b)
      return;
    const G = (ee) => {
      const ae = ee.pageX - f.left.value - J.current.left, re = ee.pageY - f.top.value - J.current.top;
      D(ae), L(re);
    }, Q = () => {
      S(void 0), D(a.left2), v(void 0), L(a.top2), l == null || l(), b.removeEventListener("mousemove", G), b.removeEventListener("mouseup", Q);
    };
    J.current = {
      top: A.nativeEvent.pageY - P.y2 - f.top.value,
      left: A.nativeEvent.pageX - P.x2 - f.left.value + 10
    }, G(A.nativeEvent), v({ type: "end", nodeId: s, lineId: e }), b.addEventListener("mousemove", G), b.addEventListener("mouseup", Q);
  }, [v, u, l, b, f, P.y2, P.x2, a.left2, a.top2, s, e]);
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    n && /* @__PURE__ */ _.jsx(
      "line",
      {
        fill: "none",
        stroke: "#0f77bf",
        strokeLinecap: "round",
        strokeWidth: c,
        style: { pointerEvents: "none" },
        markerEnd: `url(#end-line-arrow-${e})`,
        y2: n === "end" ? T - P.extraSpace / 2 : P.y2,
        x2: n === "end" ? x + P.extraSpace / 2 : P.x2,
        y1: i ? y + a.height1 / 2 : n === "start" ? y : P.y1,
        x1: i ? k + a.width1 / 2 : n === "start" ? k - P.extraSpace / 2 : P.x1
      }
    ),
    r && /* @__PURE__ */ _.jsx(
      "rect",
      {
        x: k - 3,
        fill: "transparent",
        width: P.width1,
        height: P.height1 / 2,
        onMouseDown: R,
        y: y + P.height1 / 2 + 2,
        style: { cursor: "crosshair", pointerEvents: n ? "none" : "auto" }
      }
    ),
    !n && !r && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      !o && /* @__PURE__ */ _.jsx(
        "rect",
        {
          width: 20,
          height: 20,
          fill: "transparent",
          y: P.y1 - 10,
          x: P.x1 - 10,
          onMouseDown: Z,
          style: { cursor: "crosshair", pointerEvents: "auto" }
        }
      ),
      /* @__PURE__ */ _.jsx(
        "rect",
        {
          width: 20,
          height: 20,
          fill: "transparent",
          y: P.y2 - 10,
          x: P.x2 - 10,
          onMouseDown: R,
          style: { cursor: "crosshair", pointerEvents: "auto" }
        }
      )
    ] })
  ] });
}, mn = ({ onDrop: e, ...r }) => {
  const [i, o] = ie(!1), [s, c] = ie(!1), l = te(r.top1Observable), u = te(r.top2Observable), a = te(r.lineIdObservable), v = te(r.left1Observable), h = te(r.left2Observable), f = te(r.blockIdObservable), b = te(r.width1Observable), y = te(r.width2Observable), E = te(r.isCurvedObservable), T = te(r.height1Observable), L = te(r.height2Observable), k = te(nr(a)), F = Ne(), x = q(() => 2.5, []), D = q(() => 1, []), n = ar({
    isCurved: E,
    top1: l,
    top2: u,
    left1: v,
    left2: h,
    width1: b,
    width2: y,
    height1: T,
    height2: L
  }), S = be((R) => {
    F(a, qe(R.nativeEvent));
  }, [a]), P = q(() => {
    const R = (re) => {
      const ce = n.sideAngle * 100 / 90;
      return re * ce / 100;
    };
    let A = 0;
    switch (n.currentSide) {
      case "left":
        A = R(-20);
        break;
      case "right":
        A = 20;
        break;
      case "top":
        A = R(-20);
        break;
      case "bottom":
        A = 20;
        break;
    }
    const G = A / 2 * -1, Q = n.y1 + (n.y2 - n.y1) / 2 + A, ae = `Q ${n.x1 + (n.x2 - n.x1) / 2 + G} ${Q}`;
    return `M ${n.x1} ${n.y1} ${ae} ${n.x2} ${n.y2}`;
  }, [n.x1, a, n.y1, n.x2, n.y2, n.currentSide, n.sideAngle, n.angle]), J = we(null), Z = Le();
  return Wt({
    element: J,
    id: we(ut()).current,
    leave: () => o(!1),
    hover: () => o((R) => R || !0),
    drop: (R, { x: A, y: G }) => {
      o(!1), e == null || e({
        data: R,
        top: G + -Z.top.value,
        left: A + -Z.left.value,
        target: { type: "line", lineId: a, nodeId: f }
      });
    }
  }), /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx("defs", { children: /* @__PURE__ */ _.jsx("marker", { orient: "auto", refX: 2.8 * x, refY: 2.4 * x, markerWidth: 10 * x, markerHeight: 8 * x, id: `end-line-arrow-${a}`, children: /* @__PURE__ */ _.jsx("polygon", { points: `0 ${1 * x}, ${3 * x} ${2.4 * x}, 0 ${4 * x}`, stroke: k ? "#0f77bf" : "gray", fill: k ? "#0f77bf" : "gray" }) }) }),
    !s && !E && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      /* @__PURE__ */ _.jsx(
        "line",
        {
          fill: "none",
          y1: n.y1,
          y2: n.y2,
          x1: n.x1,
          x2: n.x2,
          strokeLinecap: "round",
          strokeWidth: D,
          style: { pointerEvents: "none" },
          markerEnd: `url(#end-line-arrow-${a})`,
          stroke: k || i ? "#0f77bf" : "gray"
        }
      ),
      /* @__PURE__ */ _.jsx(
        "line",
        {
          fill: "none",
          y1: n.y1,
          y2: n.y2,
          x1: n.x1,
          x2: n.x2,
          strokeWidth: "14",
          stroke: "transparent",
          strokeLinecap: "round",
          onClick: S,
          style: { pointerEvents: "auto" },
          ref: e ? J : void 0
        }
      )
    ] }),
    !s && E && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      /* @__PURE__ */ _.jsx(
        "path",
        {
          d: P,
          fill: "none",
          strokeLinecap: "round",
          strokeWidth: D,
          markerEnd: `url(#end-line-arrow-${a})`,
          stroke: k || i ? "#0f77bf" : "gray"
        }
      ),
      /* @__PURE__ */ _.jsx(
        "path",
        {
          d: P,
          fill: "none",
          strokeWidth: 14,
          stroke: "transparent",
          strokeLinecap: "round",
          onClick: S,
          style: { pointerEvents: "auto" },
          ref: e ? J : void 0
        }
      )
    ] }),
    /* @__PURE__ */ _.jsx(
      ir,
      {
        top1: l,
        top2: u,
        lineId: a,
        left1: v,
        left2: h,
        nodeId: f,
        width1: b,
        width2: y,
        height1: T,
        height2: L,
        lineWidth: D,
        disableStartDraggable: E,
        onDragLineEnd: () => c(!1),
        onDragLineStart: () => c(!0)
      }
    )
  ] });
}, gn = ({ node: e }) => {
  var a;
  const r = te(e.height), i = te(e.width), o = te(e.left), s = te(e.top), c = te(e.id), l = q(() => 2.5, []), u = q(() => 1, []);
  return (a = e.disableCreateConnections) != null && a.call(e) ? null : /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx("defs", { children: /* @__PURE__ */ _.jsx("marker", { orient: "auto", refX: 2.8 * l, refY: 2.4 * l, markerWidth: 10 * l, markerHeight: 8 * l, id: "end-line-arrow-undefined", children: /* @__PURE__ */ _.jsx("polygon", { points: `0 ${1 * l}, ${3 * l} ${2.4 * l}, 0 ${4 * l}`, stroke: "#0f77bf", fill: "#0f77bf" }) }) }),
    /* @__PURE__ */ _.jsx(
      ir,
      {
        top2: s,
        top1: s,
        nodeId: c,
        left2: o,
        left1: o,
        width1: i,
        width2: i,
        height2: r,
        height1: r,
        lineId: void 0,
        newConnection: !0,
        position1FromCenter: !0,
        lineWidth: u
      }
    )
  ] });
}, wn = ({ backgroundColorDefault: e = "#1e1e1e", backgroundColorPaper: r = "#484848", backgroundDotColor: i = "#484848", backgroundSize: o = 30, disableDropInLines: s = !1, onRemove: c, onDrop: l }) => {
  const u = we(null), { document: a } = Se.useFrame(), v = Le(), h = Ue(vt()), f = Ue(v.left), b = Ue(v.top), { flowStore: y, linesStore: E, selectedItemsId: T } = Te(), L = or(), k = Ne(), F = te(E), x = te(y);
  Wt({
    element: u,
    id: we(ut()).current,
    drop: (n, { x: S, y: P }) => l == null ? void 0 : l({
      data: n,
      target: { type: "board" },
      top: P + -v.top.value,
      left: S + -v.left.value
    })
  }), Ee(() => {
    if (!a)
      return;
    const n = (R) => {
      qe(R) && (R.stopImmediatePropagation(), R.stopPropagation(), R.preventDefault(), R.deltaY < 0 ? h((A) => A >= 2 ? A : A + 0.1) : h((A) => A <= 0.2 ? A : A - 0.1));
    }, S = (R) => {
      qe(R) && R.key === "a" && k(y.value.map((A) => A.id.value));
    }, P = (R) => {
      R.key === "Escape" && k([]);
    }, J = (R) => {
      R.key === "Delete" && T.value.length > 0 && (c == null || c(T.value));
    }, Z = (R) => {
      const A = R.altKey ? 30 : 15;
      R.key === "ArrowUp" ? L(0, -A) : R.key === "ArrowRight" ? L(A, 0) : R.key === "ArrowDown" ? L(0, A) : R.key === "ArrowLeft" && L(-A, 0);
    };
    return a.addEventListener("keydown", P, { passive: !1 }), a.addEventListener("keydown", Z, { passive: !1 }), a.addEventListener("keydown", S, { passive: !1 }), a.addEventListener("keydown", J, { passive: !1 }), a.addEventListener("wheel", n, { passive: !1 }), () => {
      a.removeEventListener("keydown", P), a.removeEventListener("keydown", Z), a.removeEventListener("keydown", S), a.removeEventListener("keydown", J), a.removeEventListener("wheel", n);
    };
  }, [h, a, T, c, L]);
  const D = be((n) => {
    const S = n.endY, P = n.endX, J = n.startY, Z = n.startX, R = (G) => {
      const Q = G.top.value, ee = G.left.value, ae = G.top.value + G.height.value, re = G.left.value + G.width.value, ce = S - J > 0, he = P - Z > 0, me = (g, I, j, O) => (g <= j || I <= j) && (g >= O || I >= O), p = (g, I, j, O) => (g >= j || I >= j) && (g <= O || I <= O);
      return (ce ? p(Q, ae, J, S) : me(Q, ae, J, S)) && (he ? p(ee, re, Z, P) : me(ee, re, Z, P));
    }, A = x.filter((G) => R(G)).map((G) => G.id.value);
    k(A);
  }, [x, k]);
  return /* @__PURE__ */ _.jsx(
    "div",
    {
      className: "panel-wrapper",
      style: {
        "--color-panel-dot": i,
        "--color-panel-paper": r,
        "--color-panel-default": e,
        backgroundSize: `${o / devicePixelRatio}px ${o / devicePixelRatio}px`
      },
      children: /* @__PURE__ */ _.jsxs(
        "div",
        {
          ref: u,
          className: "panel",
          onScroll: (n) => {
            b(-n.currentTarget.scrollTop), f(-n.currentTarget.scrollLeft);
          },
          onMouseDown: (n) => {
            var S;
            return (S = u.current) != null && S.isSameNode(n.target) ? k([]) : void 0;
          },
          children: [
            /* @__PURE__ */ _.jsxs(hn, { children: [
              x.map((n) => /* @__PURE__ */ _.jsx(gn, { node: n }, n.id.value)),
              F.map((n) => /* @__PURE__ */ _.jsx(
                mn,
                {
                  lineIdObservable: n.id,
                  blockIdObservable: n.nodeId,
                  top1Observable: n.top1,
                  top2Observable: n.top2,
                  left1Observable: n.left1,
                  left2Observable: n.left2,
                  width1Observable: n.width1,
                  width2Observable: n.width2,
                  height1Observable: n.height1,
                  height2Observable: n.height2,
                  isCurvedObservable: n.isCurved,
                  onDrop: s ? void 0 : l
                },
                n.key
              )),
              /* @__PURE__ */ _.jsx(
                bn,
                {
                  boardRef: u,
                  onCoordsChange: D
                }
              )
            ] }),
            /* @__PURE__ */ _.jsx(yn, { children: x.map((n) => /* @__PURE__ */ _.jsx(pn, { node: n }, n.id.value)) })
          ]
        }
      )
    }
  );
}, En = `
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
`, xn = nn, Sn = ({ snapGridSize: e = 15, items: r, customCSS: i = "", ...o }) => {
  const s = q(() => /* @__PURE__ */ _.jsx(_.Fragment, { children: /* @__PURE__ */ _.jsx("style", { children: [
    i,
    En,
    fn
  ].join(`
`) }) }), [i]);
  return /* @__PURE__ */ _.jsx(
    xn,
    {
      tabIndex: -1,
      head: s,
      mountTarget: "body",
      onContextMenu: (c) => c.preventDefault(),
      initialContent: '<html tabindex="0"><head></head><body style="margin:0;"></body></html>',
      style: { width: "100%", height: "100%", display: "block", margin: 0, padding: 0, border: "none" },
      children: /* @__PURE__ */ _.jsx(ln, { items: r, children: /* @__PURE__ */ _.jsx(sn, { value: e, children: /* @__PURE__ */ _.jsx(an, { value: 1, children: /* @__PURE__ */ _.jsx(cn, { children: /* @__PURE__ */ _.jsx(on, { children: /* @__PURE__ */ _.jsx(wn, { ...o }) }) }) }) }) })
    }
  );
};
export {
  Sn as FlowEditor
};
//# sourceMappingURL=index.es.js.map
