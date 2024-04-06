import Me, { createContext as Se, useMemo as q, useContext as Pe, useRef as Ee, useEffect as we, useCallback as le, useState as ae } from "react";
import Cr from "react-dom";
import { observe as ve, selector as Ie, set as pe, useObserverValue as te, useObserver as Ct, useSetObserver as Ue } from "react-observing";
import { v4 as ut } from "uuid";
function Sr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ot = { exports: {} }, De = {};
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
    return De;
  St = 1;
  var e = Me, r = Symbol.for("react.element"), a = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(u, i, v) {
    var y, f = {}, b = null, g = null;
    v !== void 0 && (b = "" + v), i.key !== void 0 && (b = "" + i.key), i.ref !== void 0 && (g = i.ref);
    for (y in i)
      o.call(i, y) && !c.hasOwnProperty(y) && (f[y] = i[y]);
    if (u && u.defaultProps)
      for (y in i = u.defaultProps, i)
        f[y] === void 0 && (f[y] = i[y]);
    return { $$typeof: r, type: u, key: b, ref: g, props: f, _owner: s.current };
  }
  return De.Fragment = a, De.jsx = l, De.jsxs = l, De;
}
var Ae = {};
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
    var e = Me, r = Symbol.for("react.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), d = Symbol.iterator, x = "@@iterator";
    function R(t) {
      if (t === null || typeof t != "object")
        return null;
      var p = d && t[d] || t[x];
      return typeof p == "function" ? p : null;
    }
    var O = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function A(t) {
      {
        for (var p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), P = 1; P < p; P++)
          m[P - 1] = arguments[P];
        _("error", t, m);
      }
    }
    function _(t, p, m) {
      {
        var P = O.ReactDebugCurrentFrame, X = P.getStackAddendum();
        X !== "" && (p += "%s", m = m.concat([X]));
        var K = m.map(function(z) {
          return String(z);
        });
        K.unshift("Warning: " + p), Function.prototype.apply.call(console[t], console, K);
      }
    }
    var F = !1, n = !1, j = !1, k = !1, J = !1, Z;
    Z = Symbol.for("react.module.reference");
    function S(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === c || J || t === s || t === v || t === y || k || t === g || F || n || j || typeof t == "object" && t !== null && (t.$$typeof === b || t.$$typeof === f || t.$$typeof === l || t.$$typeof === u || t.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === Z || t.getModuleId !== void 0));
    }
    function $(t, p, m) {
      var P = t.displayName;
      if (P)
        return P;
      var X = p.displayName || p.name || "";
      return X !== "" ? m + "(" + X + ")" : m;
    }
    function G(t) {
      return t.displayName || "Context";
    }
    function Q(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && A("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case a:
          return "Portal";
        case c:
          return "Profiler";
        case s:
          return "StrictMode";
        case v:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case u:
            var p = t;
            return G(p) + ".Consumer";
          case l:
            var m = t;
            return G(m._context) + ".Provider";
          case i:
            return $(t, t.render, "ForwardRef");
          case f:
            var P = t.displayName || null;
            return P !== null ? P : Q(t.type) || "Memo";
          case b: {
            var X = t, K = X._payload, z = X._init;
            try {
              return Q(z(K));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ee = Object.assign, ie = 0, re, ce, ye, be, h, w, D;
    function I() {
    }
    I.__reactDisabledLog = !0;
    function C() {
      {
        if (ie === 0) {
          re = console.log, ce = console.info, ye = console.warn, be = console.error, h = console.group, w = console.groupCollapsed, D = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: I,
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
        ie++;
      }
    }
    function N() {
      {
        if (ie--, ie === 0) {
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
              value: ye
            }),
            error: ee({}, t, {
              value: be
            }),
            group: ee({}, t, {
              value: h
            }),
            groupCollapsed: ee({}, t, {
              value: w
            }),
            groupEnd: ee({}, t, {
              value: D
            })
          });
        }
        ie < 0 && A("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var M = O.ReactCurrentDispatcher, L;
    function Y(t, p, m) {
      {
        if (L === void 0)
          try {
            throw Error();
          } catch (X) {
            var P = X.stack.trim().match(/\n( *(at )?)/);
            L = P && P[1] || "";
          }
        return `
` + L + t;
      }
    }
    var B = !1, W;
    {
      var se = typeof WeakMap == "function" ? WeakMap : Map;
      W = new se();
    }
    function E(t, p) {
      if (!t || B)
        return "";
      {
        var m = W.get(t);
        if (m !== void 0)
          return m;
      }
      var P;
      B = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var K;
      K = M.current, M.current = null, C();
      try {
        if (p) {
          var z = function() {
            throw Error();
          };
          if (Object.defineProperty(z.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(z, []);
            } catch (me) {
              P = me;
            }
            Reflect.construct(t, [], z);
          } else {
            try {
              z.call();
            } catch (me) {
              P = me;
            }
            t.call(z.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (me) {
            P = me;
          }
          t();
        }
      } catch (me) {
        if (me && P && typeof me.stack == "string") {
          for (var U = me.stack.split(`
`), ue = P.stack.split(`
`), ne = U.length - 1, oe = ue.length - 1; ne >= 1 && oe >= 0 && U[ne] !== ue[oe]; )
            oe--;
          for (; ne >= 1 && oe >= 0; ne--, oe--)
            if (U[ne] !== ue[oe]) {
              if (ne !== 1 || oe !== 1)
                do
                  if (ne--, oe--, oe < 0 || U[ne] !== ue[oe]) {
                    var de = `
` + U[ne].replace(" at new ", " at ");
                    return t.displayName && de.includes("<anonymous>") && (de = de.replace("<anonymous>", t.displayName)), typeof t == "function" && W.set(t, de), de;
                  }
                while (ne >= 1 && oe >= 0);
              break;
            }
        }
      } finally {
        B = !1, M.current = K, N(), Error.prepareStackTrace = X;
      }
      var Ce = t ? t.displayName || t.name : "", Rt = Ce ? Y(Ce) : "";
      return typeof t == "function" && W.set(t, Rt), Rt;
    }
    function fe(t, p, m) {
      return E(t, !1);
    }
    function Oe(t) {
      var p = t.prototype;
      return !!(p && p.isReactComponent);
    }
    function xe(t, p, m) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return E(t, Oe(t));
      if (typeof t == "string")
        return Y(t);
      switch (t) {
        case v:
          return Y("Suspense");
        case y:
          return Y("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case i:
            return fe(t.render);
          case f:
            return xe(t.type, p, m);
          case b: {
            var P = t, X = P._payload, K = P._init;
            try {
              return xe(K(X), p, m);
            } catch {
            }
          }
        }
      return "";
    }
    var Fe = Object.prototype.hasOwnProperty, pt = {}, ht = O.ReactDebugCurrentFrame;
    function Ye(t) {
      if (t) {
        var p = t._owner, m = xe(t.type, t._source, p ? p.type : null);
        ht.setExtraStackFrame(m);
      } else
        ht.setExtraStackFrame(null);
    }
    function sr(t, p, m, P, X) {
      {
        var K = Function.call.bind(Fe);
        for (var z in t)
          if (K(t, z)) {
            var U = void 0;
            try {
              if (typeof t[z] != "function") {
                var ue = Error((P || "React class") + ": " + m + " type `" + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[z] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ue.name = "Invariant Violation", ue;
              }
              U = t[z](p, z, P, m, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ne) {
              U = ne;
            }
            U && !(U instanceof Error) && (Ye(X), A("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", m, z, typeof U), Ye(null)), U instanceof Error && !(U.message in pt) && (pt[U.message] = !0, Ye(X), A("Failed %s type: %s", m, U.message), Ye(null));
          }
      }
    }
    var ur = Array.isArray;
    function Be(t) {
      return ur(t);
    }
    function cr(t) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, m = p && t[Symbol.toStringTag] || t.constructor.name || "Object";
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
    function gt(t) {
      if (lr(t))
        return A("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", cr(t)), yt(t);
    }
    var ke = O.ReactCurrentOwner, fr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, bt, mt, Xe;
    Xe = {};
    function dr(t) {
      if (Fe.call(t, "ref")) {
        var p = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function vr(t) {
      if (Fe.call(t, "key")) {
        var p = Object.getOwnPropertyDescriptor(t, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function pr(t, p) {
      if (typeof t.ref == "string" && ke.current && p && ke.current.stateNode !== p) {
        var m = Q(ke.current.type);
        Xe[m] || (A('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(ke.current.type), t.ref), Xe[m] = !0);
      }
    }
    function hr(t, p) {
      {
        var m = function() {
          bt || (bt = !0, A("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        m.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: m,
          configurable: !0
        });
      }
    }
    function yr(t, p) {
      {
        var m = function() {
          mt || (mt = !0, A("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        m.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: m,
          configurable: !0
        });
      }
    }
    var gr = function(t, p, m, P, X, K, z) {
      var U = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: p,
        ref: m,
        props: z,
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
        value: P
      }), Object.defineProperty(U, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(U.props), Object.freeze(U)), U;
    };
    function br(t, p, m, P, X) {
      {
        var K, z = {}, U = null, ue = null;
        m !== void 0 && (gt(m), U = "" + m), vr(p) && (gt(p.key), U = "" + p.key), dr(p) && (ue = p.ref, pr(p, X));
        for (K in p)
          Fe.call(p, K) && !fr.hasOwnProperty(K) && (z[K] = p[K]);
        if (t && t.defaultProps) {
          var ne = t.defaultProps;
          for (K in ne)
            z[K] === void 0 && (z[K] = ne[K]);
        }
        if (U || ue) {
          var oe = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          U && hr(z, oe), ue && yr(z, oe);
        }
        return gr(t, U, ue, X, P, ke.current, z);
      }
    }
    var Ve = O.ReactCurrentOwner, wt = O.ReactDebugCurrentFrame;
    function Re(t) {
      if (t) {
        var p = t._owner, m = xe(t.type, t._source, p ? p.type : null);
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
        if (Ve.current) {
          var t = Q(Ve.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function mr(t) {
      {
        if (t !== void 0) {
          var p = t.fileName.replace(/^.*[\\\/]/, ""), m = t.lineNumber;
          return `

Check your code at ` + p + ":" + m + ".";
        }
        return "";
      }
    }
    var xt = {};
    function wr(t) {
      {
        var p = Et();
        if (!p) {
          var m = typeof t == "string" ? t : t.displayName || t.name;
          m && (p = `

Check the top-level render call using <` + m + ">.");
        }
        return p;
      }
    }
    function _t(t, p) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var m = wr(p);
        if (xt[m])
          return;
        xt[m] = !0;
        var P = "";
        t && t._owner && t._owner !== Ve.current && (P = " It was passed a child from " + Q(t._owner.type) + "."), Re(t), A('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', m, P), Re(null);
      }
    }
    function Tt(t, p) {
      {
        if (typeof t != "object")
          return;
        if (Be(t))
          for (var m = 0; m < t.length; m++) {
            var P = t[m];
            Ge(P) && _t(P, p);
          }
        else if (Ge(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var X = R(t);
          if (typeof X == "function" && X !== t.entries)
            for (var K = X.call(t), z; !(z = K.next()).done; )
              Ge(z.value) && _t(z.value, p);
        }
      }
    }
    function Er(t) {
      {
        var p = t.type;
        if (p == null || typeof p == "string")
          return;
        var m;
        if (typeof p == "function")
          m = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === i || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === f))
          m = p.propTypes;
        else
          return;
        if (m) {
          var P = Q(p);
          sr(m, t.props, "prop", P, t);
        } else if (p.PropTypes !== void 0 && !He) {
          He = !0;
          var X = Q(p);
          A("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && A("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xr(t) {
      {
        for (var p = Object.keys(t.props), m = 0; m < p.length; m++) {
          var P = p[m];
          if (P !== "children" && P !== "key") {
            Re(t), A("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), Re(null);
            break;
          }
        }
        t.ref !== null && (Re(t), A("Invalid attribute `ref` supplied to `React.Fragment`."), Re(null));
      }
    }
    function Ot(t, p, m, P, X, K) {
      {
        var z = S(t);
        if (!z) {
          var U = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (U += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ue = mr(X);
          ue ? U += ue : U += Et();
          var ne;
          t === null ? ne = "null" : Be(t) ? ne = "array" : t !== void 0 && t.$$typeof === r ? (ne = "<" + (Q(t.type) || "Unknown") + " />", U = " Did you accidentally export a JSX literal instead of a component?") : ne = typeof t, A("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ne, U);
        }
        var oe = br(t, p, m, X, K);
        if (oe == null)
          return oe;
        if (z) {
          var de = p.children;
          if (de !== void 0)
            if (P)
              if (Be(de)) {
                for (var Ce = 0; Ce < de.length; Ce++)
                  Tt(de[Ce], t);
                Object.freeze && Object.freeze(de);
              } else
                A("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Tt(de, t);
        }
        return t === o ? xr(oe) : Er(oe), oe;
      }
    }
    function _r(t, p, m) {
      return Ot(t, p, m, !0);
    }
    function Tr(t, p, m) {
      return Ot(t, p, m, !1);
    }
    var Or = Tr, Rr = _r;
    Ae.Fragment = o, Ae.jsx = Or, Ae.jsxs = Rr;
  }()), Ae;
}
process.env.NODE_ENV === "production" ? ot.exports = Pr() : ot.exports = jr();
var T = ot.exports, je = {}, $e = {}, at = { exports: {} }, We = { exports: {} }, V = {};
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
    return V;
  jt = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, a = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, y = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, d = e ? Symbol.for("react.lazy") : 60116, x = e ? Symbol.for("react.block") : 60121, R = e ? Symbol.for("react.fundamental") : 60117, O = e ? Symbol.for("react.responder") : 60118, A = e ? Symbol.for("react.scope") : 60119;
  function _(n) {
    if (typeof n == "object" && n !== null) {
      var j = n.$$typeof;
      switch (j) {
        case r:
          switch (n = n.type, n) {
            case i:
            case v:
            case o:
            case c:
            case s:
            case f:
              return n;
            default:
              switch (n = n && n.$$typeof, n) {
                case u:
                case y:
                case d:
                case g:
                case l:
                  return n;
                default:
                  return j;
              }
          }
        case a:
          return j;
      }
    }
  }
  function F(n) {
    return _(n) === v;
  }
  return V.AsyncMode = i, V.ConcurrentMode = v, V.ContextConsumer = u, V.ContextProvider = l, V.Element = r, V.ForwardRef = y, V.Fragment = o, V.Lazy = d, V.Memo = g, V.Portal = a, V.Profiler = c, V.StrictMode = s, V.Suspense = f, V.isAsyncMode = function(n) {
    return F(n) || _(n) === i;
  }, V.isConcurrentMode = F, V.isContextConsumer = function(n) {
    return _(n) === u;
  }, V.isContextProvider = function(n) {
    return _(n) === l;
  }, V.isElement = function(n) {
    return typeof n == "object" && n !== null && n.$$typeof === r;
  }, V.isForwardRef = function(n) {
    return _(n) === y;
  }, V.isFragment = function(n) {
    return _(n) === o;
  }, V.isLazy = function(n) {
    return _(n) === d;
  }, V.isMemo = function(n) {
    return _(n) === g;
  }, V.isPortal = function(n) {
    return _(n) === a;
  }, V.isProfiler = function(n) {
    return _(n) === c;
  }, V.isStrictMode = function(n) {
    return _(n) === s;
  }, V.isSuspense = function(n) {
    return _(n) === f;
  }, V.isValidElementType = function(n) {
    return typeof n == "string" || typeof n == "function" || n === o || n === v || n === c || n === s || n === f || n === b || typeof n == "object" && n !== null && (n.$$typeof === d || n.$$typeof === g || n.$$typeof === l || n.$$typeof === u || n.$$typeof === y || n.$$typeof === R || n.$$typeof === O || n.$$typeof === A || n.$$typeof === x);
  }, V.typeOf = _, V;
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
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, a = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, y = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, d = e ? Symbol.for("react.lazy") : 60116, x = e ? Symbol.for("react.block") : 60121, R = e ? Symbol.for("react.fundamental") : 60117, O = e ? Symbol.for("react.responder") : 60118, A = e ? Symbol.for("react.scope") : 60119;
    function _(E) {
      return typeof E == "string" || typeof E == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      E === o || E === v || E === c || E === s || E === f || E === b || typeof E == "object" && E !== null && (E.$$typeof === d || E.$$typeof === g || E.$$typeof === l || E.$$typeof === u || E.$$typeof === y || E.$$typeof === R || E.$$typeof === O || E.$$typeof === A || E.$$typeof === x);
    }
    function F(E) {
      if (typeof E == "object" && E !== null) {
        var fe = E.$$typeof;
        switch (fe) {
          case r:
            var Oe = E.type;
            switch (Oe) {
              case i:
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
                  case y:
                  case d:
                  case g:
                  case l:
                    return xe;
                  default:
                    return fe;
                }
            }
          case a:
            return fe;
        }
      }
    }
    var n = i, j = v, k = u, J = l, Z = r, S = y, $ = o, G = d, Q = g, ee = a, ie = c, re = s, ce = f, ye = !1;
    function be(E) {
      return ye || (ye = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), h(E) || F(E) === i;
    }
    function h(E) {
      return F(E) === v;
    }
    function w(E) {
      return F(E) === u;
    }
    function D(E) {
      return F(E) === l;
    }
    function I(E) {
      return typeof E == "object" && E !== null && E.$$typeof === r;
    }
    function C(E) {
      return F(E) === y;
    }
    function N(E) {
      return F(E) === o;
    }
    function M(E) {
      return F(E) === d;
    }
    function L(E) {
      return F(E) === g;
    }
    function Y(E) {
      return F(E) === a;
    }
    function B(E) {
      return F(E) === c;
    }
    function W(E) {
      return F(E) === s;
    }
    function se(E) {
      return F(E) === f;
    }
    H.AsyncMode = n, H.ConcurrentMode = j, H.ContextConsumer = k, H.ContextProvider = J, H.Element = Z, H.ForwardRef = S, H.Fragment = $, H.Lazy = G, H.Memo = Q, H.Portal = ee, H.Profiler = ie, H.StrictMode = re, H.Suspense = ce, H.isAsyncMode = be, H.isConcurrentMode = h, H.isContextConsumer = w, H.isContextProvider = D, H.isElement = I, H.isForwardRef = C, H.isFragment = N, H.isLazy = M, H.isMemo = L, H.isPortal = Y, H.isProfiler = B, H.isStrictMode = W, H.isSuspense = se, H.isValidElementType = _, H.typeOf = F;
  }()), H;
}
var It;
function Wt() {
  return It || (It = 1, process.env.NODE_ENV === "production" ? We.exports = kr() : We.exports = Ir()), We.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Je, Dt;
function Dr() {
  if (Dt)
    return Je;
  Dt = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable;
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
      var i = Object.getOwnPropertyNames(l).map(function(y) {
        return l[y];
      });
      if (i.join("") !== "0123456789")
        return !1;
      var v = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(y) {
        v[y] = y;
      }), Object.keys(Object.assign({}, v)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Je = s() ? Object.assign : function(c, l) {
    for (var u, i = o(c), v, y = 1; y < arguments.length; y++) {
      u = Object(arguments[y]);
      for (var f in u)
        r.call(u, f) && (i[f] = u[f]);
      if (e) {
        v = e(u);
        for (var b = 0; b < v.length; b++)
          a.call(u, v[b]) && (i[v[b]] = u[v[b]]);
      }
    }
    return i;
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
var Ze, Mt;
function Ut() {
  return Mt || (Mt = 1, Ze = Function.call.bind(Object.prototype.hasOwnProperty)), Ze;
}
var Qe, $t;
function Ar() {
  if ($t)
    return Qe;
  $t = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = ct(), a = {}, o = Ut();
    e = function(c) {
      var l = "Warning: " + c;
      typeof console < "u" && console.error(l);
      try {
        throw new Error(l);
      } catch {
      }
    };
  }
  function s(c, l, u, i, v) {
    if (process.env.NODE_ENV !== "production") {
      for (var y in c)
        if (o(c, y)) {
          var f;
          try {
            if (typeof c[y] != "function") {
              var b = Error(
                (i || "React class") + ": " + u + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            f = c[y](l, y, i, u, null, r);
          } catch (d) {
            f = d;
          }
          if (f && !(f instanceof Error) && e(
            (i || "React class") + ": type specification of " + u + " `" + y + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in a)) {
            a[f.message] = !0;
            var g = v ? v() : "";
            e(
              "Failed " + u + " type: " + f.message + (g ?? "")
            );
          }
        }
    }
  }
  return s.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (a = {});
  }, Qe = s, Qe;
}
var et, Lt;
function Mr() {
  if (Lt)
    return et;
  Lt = 1;
  var e = Wt(), r = Dr(), a = ct(), o = Ut(), s = Ar(), c = function() {
  };
  process.env.NODE_ENV !== "production" && (c = function(u) {
    var i = "Warning: " + u;
    typeof console < "u" && console.error(i);
    try {
      throw new Error(i);
    } catch {
    }
  });
  function l() {
    return null;
  }
  return et = function(u, i) {
    var v = typeof Symbol == "function" && Symbol.iterator, y = "@@iterator";
    function f(h) {
      var w = h && (v && h[v] || h[y]);
      if (typeof w == "function")
        return w;
    }
    var b = "<<anonymous>>", g = {
      array: O("array"),
      bigint: O("bigint"),
      bool: O("boolean"),
      func: O("function"),
      number: O("number"),
      object: O("object"),
      string: O("string"),
      symbol: O("symbol"),
      any: A(),
      arrayOf: _,
      element: F(),
      elementType: n(),
      instanceOf: j,
      node: S(),
      objectOf: J,
      oneOf: k,
      oneOfType: Z,
      shape: G,
      exact: Q
    };
    function d(h, w) {
      return h === w ? h !== 0 || 1 / h === 1 / w : h !== h && w !== w;
    }
    function x(h, w) {
      this.message = h, this.data = w && typeof w == "object" ? w : {}, this.stack = "";
    }
    x.prototype = Error.prototype;
    function R(h) {
      if (process.env.NODE_ENV !== "production")
        var w = {}, D = 0;
      function I(N, M, L, Y, B, W, se) {
        if (Y = Y || b, W = W || L, se !== a) {
          if (i) {
            var E = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw E.name = "Invariant Violation", E;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var fe = Y + ":" + L;
            !w[fe] && // Avoid spamming the console because they are often not actionable except for lib authors
            D < 3 && (c(
              "You are manually calling a React.PropTypes validation function for the `" + W + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), w[fe] = !0, D++);
          }
        }
        return M[L] == null ? N ? M[L] === null ? new x("The " + B + " `" + W + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new x("The " + B + " `" + W + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : h(M, L, Y, B, W);
      }
      var C = I.bind(null, !1);
      return C.isRequired = I.bind(null, !0), C;
    }
    function O(h) {
      function w(D, I, C, N, M, L) {
        var Y = D[I], B = re(Y);
        if (B !== h) {
          var W = ce(Y);
          return new x(
            "Invalid " + N + " `" + M + "` of type " + ("`" + W + "` supplied to `" + C + "`, expected ") + ("`" + h + "`."),
            { expectedType: h }
          );
        }
        return null;
      }
      return R(w);
    }
    function A() {
      return R(l);
    }
    function _(h) {
      function w(D, I, C, N, M) {
        if (typeof h != "function")
          return new x("Property `" + M + "` of component `" + C + "` has invalid PropType notation inside arrayOf.");
        var L = D[I];
        if (!Array.isArray(L)) {
          var Y = re(L);
          return new x("Invalid " + N + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + C + "`, expected an array."));
        }
        for (var B = 0; B < L.length; B++) {
          var W = h(L, B, C, N, M + "[" + B + "]", a);
          if (W instanceof Error)
            return W;
        }
        return null;
      }
      return R(w);
    }
    function F() {
      function h(w, D, I, C, N) {
        var M = w[D];
        if (!u(M)) {
          var L = re(M);
          return new x("Invalid " + C + " `" + N + "` of type " + ("`" + L + "` supplied to `" + I + "`, expected a single ReactElement."));
        }
        return null;
      }
      return R(h);
    }
    function n() {
      function h(w, D, I, C, N) {
        var M = w[D];
        if (!e.isValidElementType(M)) {
          var L = re(M);
          return new x("Invalid " + C + " `" + N + "` of type " + ("`" + L + "` supplied to `" + I + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return R(h);
    }
    function j(h) {
      function w(D, I, C, N, M) {
        if (!(D[I] instanceof h)) {
          var L = h.name || b, Y = be(D[I]);
          return new x("Invalid " + N + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + C + "`, expected ") + ("instance of `" + L + "`."));
        }
        return null;
      }
      return R(w);
    }
    function k(h) {
      if (!Array.isArray(h))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? c(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : c("Invalid argument supplied to oneOf, expected an array.")), l;
      function w(D, I, C, N, M) {
        for (var L = D[I], Y = 0; Y < h.length; Y++)
          if (d(L, h[Y]))
            return null;
        var B = JSON.stringify(h, function(se, E) {
          var fe = ce(E);
          return fe === "symbol" ? String(E) : E;
        });
        return new x("Invalid " + N + " `" + M + "` of value `" + String(L) + "` " + ("supplied to `" + C + "`, expected one of " + B + "."));
      }
      return R(w);
    }
    function J(h) {
      function w(D, I, C, N, M) {
        if (typeof h != "function")
          return new x("Property `" + M + "` of component `" + C + "` has invalid PropType notation inside objectOf.");
        var L = D[I], Y = re(L);
        if (Y !== "object")
          return new x("Invalid " + N + " `" + M + "` of type " + ("`" + Y + "` supplied to `" + C + "`, expected an object."));
        for (var B in L)
          if (o(L, B)) {
            var W = h(L, B, C, N, M + "." + B, a);
            if (W instanceof Error)
              return W;
          }
        return null;
      }
      return R(w);
    }
    function Z(h) {
      if (!Array.isArray(h))
        return process.env.NODE_ENV !== "production" && c("Invalid argument supplied to oneOfType, expected an instance of array."), l;
      for (var w = 0; w < h.length; w++) {
        var D = h[w];
        if (typeof D != "function")
          return c(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ye(D) + " at index " + w + "."
          ), l;
      }
      function I(C, N, M, L, Y) {
        for (var B = [], W = 0; W < h.length; W++) {
          var se = h[W], E = se(C, N, M, L, Y, a);
          if (E == null)
            return null;
          E.data && o(E.data, "expectedType") && B.push(E.data.expectedType);
        }
        var fe = B.length > 0 ? ", expected one of type [" + B.join(", ") + "]" : "";
        return new x("Invalid " + L + " `" + Y + "` supplied to " + ("`" + M + "`" + fe + "."));
      }
      return R(I);
    }
    function S() {
      function h(w, D, I, C, N) {
        return ee(w[D]) ? null : new x("Invalid " + C + " `" + N + "` supplied to " + ("`" + I + "`, expected a ReactNode."));
      }
      return R(h);
    }
    function $(h, w, D, I, C) {
      return new x(
        (h || "React class") + ": " + w + " type `" + D + "." + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + C + "`."
      );
    }
    function G(h) {
      function w(D, I, C, N, M) {
        var L = D[I], Y = re(L);
        if (Y !== "object")
          return new x("Invalid " + N + " `" + M + "` of type `" + Y + "` " + ("supplied to `" + C + "`, expected `object`."));
        for (var B in h) {
          var W = h[B];
          if (typeof W != "function")
            return $(C, N, M, B, ce(W));
          var se = W(L, B, C, N, M + "." + B, a);
          if (se)
            return se;
        }
        return null;
      }
      return R(w);
    }
    function Q(h) {
      function w(D, I, C, N, M) {
        var L = D[I], Y = re(L);
        if (Y !== "object")
          return new x("Invalid " + N + " `" + M + "` of type `" + Y + "` " + ("supplied to `" + C + "`, expected `object`."));
        var B = r({}, D[I], h);
        for (var W in B) {
          var se = h[W];
          if (o(h, W) && typeof se != "function")
            return $(C, N, M, W, ce(se));
          if (!se)
            return new x(
              "Invalid " + N + " `" + M + "` key `" + W + "` supplied to `" + C + "`.\nBad object: " + JSON.stringify(D[I], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(h), null, "  ")
            );
          var E = se(L, W, C, N, M + "." + W, a);
          if (E)
            return E;
        }
        return null;
      }
      return R(w);
    }
    function ee(h) {
      switch (typeof h) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !h;
        case "object":
          if (Array.isArray(h))
            return h.every(ee);
          if (h === null || u(h))
            return !0;
          var w = f(h);
          if (w) {
            var D = w.call(h), I;
            if (w !== h.entries) {
              for (; !(I = D.next()).done; )
                if (!ee(I.value))
                  return !1;
            } else
              for (; !(I = D.next()).done; ) {
                var C = I.value;
                if (C && !ee(C[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function ie(h, w) {
      return h === "symbol" ? !0 : w ? w["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && w instanceof Symbol : !1;
    }
    function re(h) {
      var w = typeof h;
      return Array.isArray(h) ? "array" : h instanceof RegExp ? "object" : ie(w, h) ? "symbol" : w;
    }
    function ce(h) {
      if (typeof h > "u" || h === null)
        return "" + h;
      var w = re(h);
      if (w === "object") {
        if (h instanceof Date)
          return "date";
        if (h instanceof RegExp)
          return "regexp";
      }
      return w;
    }
    function ye(h) {
      var w = ce(h);
      switch (w) {
        case "array":
        case "object":
          return "an " + w;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + w;
        default:
          return w;
      }
    }
    function be(h) {
      return !h.constructor || !h.constructor.name ? b : h.constructor.name;
    }
    return g.checkPropTypes = s, g.resetWarningCache = s.resetWarningCache, g.PropTypes = g, g;
  }, et;
}
var tt, Ft;
function $r() {
  if (Ft)
    return tt;
  Ft = 1;
  var e = ct();
  function r() {
  }
  function a() {
  }
  return a.resetWarningCache = r, tt = function() {
    function o(l, u, i, v, y, f) {
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
      checkPropTypes: a,
      resetWarningCache: r
    };
    return c.PropTypes = c, c;
  }, tt;
}
if (process.env.NODE_ENV !== "production") {
  var Lr = Wt(), Fr = !0;
  at.exports = Mr()(Lr.isElement, Fr);
} else
  at.exports = $r()();
var qt = at.exports, he = {};
Object.defineProperty(he, "__esModule", {
  value: !0
});
he.FrameContextConsumer = he.FrameContextProvider = he.useFrame = he.FrameContext = void 0;
var Yr = Me, Nt = Wr(Yr);
function Wr(e) {
  return e && e.__esModule ? e : { default: e };
}
var zt = void 0, Bt = void 0;
typeof document < "u" && (zt = document);
typeof window < "u" && (Bt = window);
var lt = he.FrameContext = Nt.default.createContext({ document: zt, window: Bt });
he.useFrame = function() {
  return Nt.default.useContext(lt);
};
var Ur = lt.Provider, qr = lt.Consumer;
he.FrameContextProvider = Ur;
he.FrameContextConsumer = qr;
var ft = {};
Object.defineProperty(ft, "__esModule", {
  value: !0
});
var Nr = /* @__PURE__ */ function() {
  function e(r, a) {
    for (var o = 0; o < a.length; o++) {
      var s = a[o];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
    }
  }
  return function(r, a, o) {
    return a && e(r.prototype, a), o && e(r, o), r;
  };
}(), it = Me;
Xt(it);
var zr = qt, rt = Xt(zr);
function Xt(e) {
  return e && e.__esModule ? e : { default: e };
}
function Br(e, r) {
  if (!(e instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function Xr(e, r) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r && (typeof r == "object" || typeof r == "function") ? r : e;
}
function Vr(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
  e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}
var Vt = function(e) {
  Vr(r, e);
  function r() {
    return Br(this, r), Xr(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
  }
  return Nr(r, [{
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
Vt.propTypes = {
  children: rt.default.element.isRequired,
  contentDidMount: rt.default.func.isRequired,
  contentDidUpdate: rt.default.func.isRequired
};
ft.default = Vt;
Object.defineProperty($e, "__esModule", {
  value: !0
});
$e.Frame = void 0;
var st = Object.assign || function(e) {
  for (var r = 1; r < arguments.length; r++) {
    var a = arguments[r];
    for (var o in a)
      Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
  }
  return e;
}, Hr = /* @__PURE__ */ function() {
  function e(r, a) {
    for (var o = 0; o < a.length; o++) {
      var s = a[o];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
    }
  }
  return function(r, a, o) {
    return a && e(r.prototype, a), o && e(r, o), r;
  };
}(), Ht = Me, _e = Ne(Ht), Gr = Cr, Yt = Ne(Gr), Jr = qt, ge = Ne(Jr), Kr = he, Zr = ft, Qr = Ne(Zr);
function Ne(e) {
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
var dt = $e.Frame = function(e) {
  rn(r, e);
  function r(a, o) {
    en(this, r);
    var s = tn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, a, o));
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
      ), i = this.getMountTarget();
      return [Yt.default.createPortal(this.props.head, this.getDoc().head), Yt.default.createPortal(u, i)];
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
}(Ht.Component);
dt.propTypes = {
  style: ge.default.object,
  // eslint-disable-line
  head: ge.default.node,
  initialContent: ge.default.string,
  mountTarget: ge.default.string,
  contentDidMount: ge.default.func,
  contentDidUpdate: ge.default.func,
  children: ge.default.oneOfType([ge.default.element, ge.default.arrayOf(ge.default.element)])
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
$e.default = _e.default.forwardRef(function(e, r) {
  return _e.default.createElement(dt, st({}, e, { forwardedRef: r }));
});
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var r = $e;
  Object.defineProperty(e, "default", {
    enumerable: !0,
    get: function() {
      return o(r).default;
    }
  });
  var a = he;
  Object.defineProperty(e, "FrameContext", {
    enumerable: !0,
    get: function() {
      return a.FrameContext;
    }
  }), Object.defineProperty(e, "FrameContextConsumer", {
    enumerable: !0,
    get: function() {
      return a.FrameContextConsumer;
    }
  }), Object.defineProperty(e, "useFrame", {
    enumerable: !0,
    get: function() {
      return a.useFrame;
    }
  });
  function o(s) {
    return s && s.__esModule ? s : { default: s };
  }
})(je);
const nn = /* @__PURE__ */ Sr(je), Gt = Se({}), on = ({ children: e }) => {
  const r = q(() => ({
    top: ve(0),
    left: ve(0)
  }), []);
  return /* @__PURE__ */ T.jsx(Gt.Provider, { value: r, children: e });
}, Le = () => Pe(Gt), Jt = Se(ve(1)), an = ({ children: e, value: r }) => {
  const a = q(() => ve(r < 1 ? 1 : r), [r]);
  return /* @__PURE__ */ T.jsx(Jt.Provider, { value: a, children: e });
}, vt = () => Pe(Jt), Kt = Se(15), sn = ({ children: e, value: r }) => /* @__PURE__ */ T.jsx(Kt.Provider, { value: r < 1 ? 1 : r, children: e }), un = () => Pe(Kt), Zt = Se(ve(void 0)), cn = ({ children: e }) => {
  const r = q(() => ve(void 0), []);
  return /* @__PURE__ */ T.jsx(Zt.Provider, { value: r, children: e });
}, Qt = () => Pe(Zt), er = Se({}), ln = ({ children: e, items: r }) => {
  const a = Ee(ve(r));
  we(() => {
    a.current.value = r;
  }, [r]);
  const o = q(() => Ie({
    get: ({ get: u }) => {
      const i = [];
      return u(a.current).forEach((v, y, f) => {
        u(v.connections).forEach((b) => {
          const g = f.find((d) => u(b.relatedId) === u(d.id));
          g && i.push({
            top1: v.top,
            left1: v.left,
            top2: g.top,
            left2: g.left,
            width1: v.width,
            height1: v.height,
            width2: g.width,
            height2: g.height,
            nodeId: v.id,
            id: b.id,
            relatedNodeId: g.id,
            key: `line_key_${u(v.id)}_${u(g.id)}`,
            isCurved: Ie(({ get: d }) => d(g.connections).some((x) => d(x.relatedId) === d(v.id)))
          });
        });
      }), i;
    }
  }), []), s = q(() => ({
    width: Ie({
      get: ({ get: u }) => u(a.current).reduce((i, v) => {
        const y = u(v.left) + u(v.width);
        return y > i ? y : i;
      }, 0)
    }),
    height: Ie({
      get: ({ get: u }) => u(a.current).reduce((i, v) => {
        const y = u(v.top) + u(v.height);
        return y > i ? y : i;
      }, 0)
    })
  }), []), c = q(() => ve([]), []), l = q(() => Ie({
    get: ({ get: u }) => u(a.current).filter((v) => u(c).includes(u(v.id)))
  }), [c]);
  return /* @__PURE__ */ T.jsx(er.Provider, { value: { flowStore: a.current, linesStore: o, boardSizes: s, selectedItems: l, selectedItemsId: c }, children: e });
}, Te = () => Pe(er), tr = () => Te().boardSizes, rr = (e) => {
  const { selectedItemsId: r } = Te(), a = Ee(ve(r.value.includes(e)));
  return we(() => {
    const o = r.subscribe((s) => {
      const c = s.includes(e);
      pe(a.current, (l) => l !== c ? c : l);
    });
    return () => o.unsubscribe();
  }, [r, e]), a.current;
}, ze = () => {
  const { selectedItemsId: e, linesStore: r } = Te();
  return le((a, o = !1) => {
    if (typeof a == "string") {
      if (e.value.some((s) => s === a) && !o)
        return;
      e.value.some((s) => s === a) ? pe(e, (s) => {
        const c = s.filter((u) => u !== a).filter((u) => !r.value.some((i) => i.id.value === u)), l = r.value.filter((u) => c.includes(u.nodeId.value) && c.includes(u.relatedNodeId.value)).map((u) => u.id.value);
        return [...c, ...l];
      }) : o ? pe(e, (s) => {
        const c = [
          ...s.filter((u) => !r.value.some((i) => i.id.value === u)),
          a
        ], l = r.value.filter((u) => c.includes(u.nodeId.value) && c.includes(u.relatedNodeId.value)).map((u) => u.id.value);
        return [...c, ...l];
      }) : pe(e, [a]);
    } else {
      if (a.sort().join() === e.value.sort().join())
        return;
      const s = [...a], c = r.value.filter((l) => s.includes(l.nodeId.value) && s.includes(l.relatedNodeId.value)).map((l) => l.id.value);
      if ([...s, ...c].sort().join() === e.value.sort().join())
        return;
      pe(e, [...s, ...c]);
    }
  }, [e]);
}, nr = () => {
  const { selectedItems: e } = Te();
  return le((r, a) => {
    e.value.length !== 0 && ((e.value.every((o) => o.top.value > 0) || a > 0) && e.value.forEach((o) => {
      pe(o.top, (s) => s + a <= 0 ? 0 : s + a);
    }), (e.value.every((o) => o.left.value > 0) || r > 0) && e.value.forEach((o) => {
      pe(o.left, (s) => s + r <= 0 ? 0 : s + r);
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
`, dn = Se({}), vn = () => Pe(dn), or = ({ id: e, element: r, hover: a, leave: o, drop: s }, c = []) => {
  const { getData: l } = vn(), [u, i] = ae(!1), [v, y] = ae(!1), f = le((d) => {
    var x, R, O;
    d.stopPropagation(), d.preventDefault(), y(!0), i(((x = d.target) === null || x === void 0 ? void 0 : x.dataset.droppableId) === e);
    const A = l();
    A ? a && a(A.data, {
      x: d.clientX,
      y: d.clientY,
      draggingId: A.draggingId,
      droppableId: (R = d.target) === null || R === void 0 ? void 0 : R.dataset.droppableId
    }) : a && a(void 0, {
      x: d.clientX,
      y: d.clientY,
      draggingId: void 0,
      droppableId: (O = d.target) === null || O === void 0 ? void 0 : O.dataset.droppableId
    });
  }, [l, a, e, ...c]), b = le((d) => {
    var x, R;
    d.stopPropagation(), d.preventDefault(), y(!1), i(!1);
    const O = l();
    O ? s && s(O.data, {
      x: d.clientX,
      y: d.clientY,
      draggingId: O.draggingId,
      droppableId: (x = d.target) === null || x === void 0 ? void 0 : x.dataset.droppableId
    }) : s && s(void 0, {
      x: d.clientX,
      y: d.clientY,
      draggingId: void 0,
      droppableId: (R = d.target) === null || R === void 0 ? void 0 : R.dataset.droppableId
    });
  }, [l, s]), g = le((d) => {
    var x;
    y(!1), i(!1);
    const R = l();
    R ? setTimeout(() => {
      var O;
      return o && o(R.data, {
        x: d.clientX,
        y: d.clientY,
        draggingId: R.draggingId,
        droppableId: (O = d.target) === null || O === void 0 ? void 0 : O.dataset.droppableId
      });
    }, 0) : o && o(void 0, {
      x: d.clientX,
      y: d.clientY,
      draggingId: void 0,
      droppableId: (x = d.target) === null || x === void 0 ? void 0 : x.dataset.droppableId
    });
  }, [l, o]);
  return we(() => {
    if (r.current) {
      const d = {
        current: r.current.nodeType === Node.DOCUMENT_NODE ? r.current.body : r.current
      };
      return d.current ? (Object.assign(d.current.dataset, { droppableId: e }), d.current.addEventListener("dragleave", g), d.current.addEventListener("dragover", f), d.current.addEventListener("drop", b), () => {
        d.current.removeEventListener("dragleave", g), d.current.removeEventListener("dragover", f), d.current.removeEventListener("drop", b);
      }) : void 0;
    }
  }, [g, f, b, e, ...c]), [{
    isDraggingOver: v,
    isDraggingOverCurrent: u
  }];
}, pn = () => navigator.userAgent.toUpperCase().includes("MAC"), qe = (e) => pn() ? e.metaKey : e.ctrlKey, nt = (e, r = 15) => Math.round(e / r) * r, hn = ({ nodeId: e, height: r, width: a, getIsDisabledCreateConnection: o, getIsDisabledDropConnection: s }) => {
  const c = te(Qt()), { flowStore: l } = Te(), u = le(() => {
    if (c && c.nodeId !== e) {
      for (const i of l.value)
        if (i.id.value === c.nodeId) {
          if (c.type === "end") {
            if (s())
              return;
            if (!c.lineId) {
              pe(i.connections, (v) => [
                ...v,
                {
                  id: ve(ut()),
                  relatedId: ve(e)
                }
              ]);
              return;
            }
            pe(i.connections, (v) => (v.forEach((y) => {
              y.id.value === c.lineId && (y.relatedId = ve(e));
            }), [...v]));
            return;
          }
          if (o())
            return;
          pe(i.connections, (v) => {
            const y = v.find((b) => b.id.value === c.lineId);
            if (!y || y.relatedId.value === e)
              return v;
            const f = l.value.find((b) => b.id.value === e);
            return f ? (pe(f.connections, (b) => [
              ...b,
              {
                id: y.id,
                relatedId: y.relatedId
              }
            ]), [
              ...v.filter((b) => b.id.value !== c.lineId)
            ]) : v;
          });
          return;
        }
    }
  }, [c, e, o, s]);
  return /* @__PURE__ */ T.jsx(T.Fragment, { children: /* @__PURE__ */ T.jsx(
    "span",
    {
      onMouseUp: u,
      onMouseDown: (i) => i.stopPropagation(),
      style: {
        top: -4,
        left: -4,
        width: a + 8,
        height: r + 8,
        position: "absolute",
        //backgroundColor: 'red',
        pointerEvents: c ? "auto" : "none"
      }
    }
  ) });
}, yn = ({ node: e }) => {
  const r = te(e.id), a = rr(r), o = nr(), s = ze(), { selectedItemsId: c } = Te(), l = Le(), u = un(), { window: i } = je.useFrame(), [v, y] = Ct(e.left), f = te(e.height), [b, g] = Ct(e.top), d = te(e.width), x = Ee({ top: 0, left: 0 }), R = le((_) => {
    if (s(r, qe(_.nativeEvent)), !c.value.some((j) => j === r) || !i)
      return;
    const F = (j) => {
      const k = j.pageX - l.left.value - x.current.left, J = j.pageY - l.top.value - x.current.top, Z = nt(k, u) - e.left.value, S = nt(J, u) - e.top.value;
      Z === 0 && S === 0 || o(Z, S);
    }, n = () => {
      i.removeEventListener("mousemove", F), i.removeEventListener("mouseup", n);
    };
    x.current = {
      top: _.nativeEvent.pageY - b - l.top.value,
      left: _.nativeEvent.pageX - v - l.left.value
    }, i.addEventListener("mousemove", F), i.addEventListener("mouseup", n);
  }, [y, g, s, o, nt, u, r, i, l, e.left, e.top]), O = q(() => e.render({
    width: e.width,
    height: e.height,
    isSelected: a
  }), [e.render, e.width, e.height, a]), A = q(() => `translate(${v}px, ${b}px)`, [v, b]);
  return /* @__PURE__ */ T.jsxs(
    "div",
    {
      onMouseDown: R,
      className: "draggable-container",
      style: { width: d, height: f, transform: A },
      children: [
        /* @__PURE__ */ T.jsx("div", { className: "draggable-container-content", children: O }),
        /* @__PURE__ */ T.jsx(
          hn,
          {
            nodeId: r,
            width: d,
            height: f,
            getIsDisabledDropConnection: () => {
              var _;
              return !!((_ = e.disableDropConnections) != null && _.call(e));
            },
            getIsDisabledCreateConnection: () => {
              var _;
              return !!((_ = e.disableCreateConnections) != null && _.call(e));
            }
          }
        )
      ]
    }
  );
}, gn = ({ children: e }) => {
  const { height: r, width: a } = tr(), o = vt(), [s, c] = ae(r.value), [l, u] = ae(a.value), [i, v] = ae(o.value);
  return we(() => {
    c(r.value), u(a.value), v(o.value);
    const y = r.subscribe((g) => c((d) => d !== g ? g : d)), f = a.subscribe((g) => u((d) => d !== g ? g : d)), b = o.subscribe((g) => v((d) => d !== g ? g : d));
    return () => {
      y.unsubscribe(), f.unsubscribe(), b.unsubscribe();
    };
  }, [r, a, o]), /* @__PURE__ */ T.jsx("svg", { style: {
    zoom: i,
    minWidth: "100vw",
    minHeight: "100vh",
    width: l + 500,
    position: "absolute",
    height: s + 500,
    pointerEvents: "none"
  }, children: e });
}, bn = ({ children: e }) => {
  const { height: r, width: a } = tr(), o = vt(), [s, c] = ae(r.value), [l, u] = ae(a.value), [i, v] = ae(o.value);
  return we(() => {
    c(r.value), u(a.value), v(o.value);
    const y = r.subscribe((g) => c((d) => d !== g ? g : d)), f = a.subscribe((g) => u((d) => d !== g ? g : d)), b = o.subscribe((g) => v((d) => d !== g ? g : d));
    return () => {
      y.unsubscribe(), f.unsubscribe(), b.unsubscribe();
    };
  }, [r, a, o]), /* @__PURE__ */ T.jsx("div", { style: { zoom: i, height: s + 500, width: l + 500, pointerEvents: "none" }, children: e });
}, mn = ({ onSelectionEnd: e, onSelectionStart: r, isDisabled: a = !1, onCoordsChange: o, boardRef: s }) => {
  const c = Le(), { window: l } = je.useFrame(), [u, i] = ae(0), [v, y] = ae(!1), [f, b] = ae(0), [g, d] = ae(0), [x, R] = ae(0), O = le((j) => {
    var Z;
    if (!l || !((Z = s.current) != null && Z.isSameNode(j.target)))
      return;
    r == null || r(j);
    const k = (S) => {
      d(S.pageX - c.left.value), R(S.pageY - c.top.value);
    }, J = (S) => {
      l.removeEventListener("mousemove", k), l.removeEventListener("mouseup", J), e == null || e(S), y(!1);
    };
    i(j.offsetX - c.left.value), b(j.offsetY - c.top.value), d(j.offsetX - c.left.value), R(j.offsetY - c.top.value), y(!0), l.addEventListener("mousemove", k), l.addEventListener("mouseup", J);
  }, [l, c, s]);
  we(() => {
    if (l && !a)
      return l.addEventListener("mousedown", O), () => l.removeEventListener("mousedown", O);
  }, [l, a, O]);
  const A = q(() => x - f > 0 || f < x ? f : x, [x, f]), _ = q(() => g - u > 0 || u < g ? u : g, [g, u]), F = q(() => g - u > 0 || u - g < 0 ? g - u : u - g, [g, u]), n = q(() => x - f > 0 || f - x < 0 ? x - f : f - x, [x, f]);
  return we(() => {
    o == null || o({
      startY: A,
      startX: _,
      endY: A + n,
      endX: _ + F
    });
  }, [A, _, n, F]), a || !v ? null : /* @__PURE__ */ T.jsx(
    "rect",
    {
      y: A,
      x: _,
      width: F,
      height: n,
      strokeWidth: 1,
      stroke: "#999fff",
      fill: "#ffffff11"
    }
  );
}, ar = (e) => {
  const r = q(() => e.isCurved ? 11.11111111111111 : 0, [e.isCurved]), a = q(() => 8, []), o = q(() => e.top1 - a, [e.top1, a]), s = q(() => e.top2 - a, [e.top2, a]), c = q(() => e.left1 - a, [e.left1, a]), l = q(() => e.left2 - a, [e.left2, a]), u = q(() => e.width1 + a * 2, [e.width1, a]), i = q(() => e.width2 + a * 2, [e.width2, a]), v = q(() => e.height1 + a * 2, [e.height1, a]), y = q(() => e.height2 + a * 2, [e.height2, a]), f = q(() => {
    let _ = Math.atan2(c - l, o - s) * (180 / Math.PI);
    return _ < 0 ? _ = Math.abs(_) : _ = 360 - _, _;
  }, [l, s, c, o]), b = q(() => f >= 45 && f <= 135 ? f - 45 : f >= 135 && f <= 225 ? f - 135 : f >= 225 && f <= 315 ? f - 225 : f >= 315 && f <= 360 || f >= 0 && f <= 45 ? f >= 315 && f <= 360 ? f - 315 : f + 45 : 0, [f]), g = q(() => {
    if (f >= 45 && f <= 135)
      return "left";
    if (f >= 135 && f <= 225)
      return "top";
    if (f >= 225 && f <= 315)
      return "right";
    if (f >= 315 && f <= 360 || f >= 0 && f <= 45)
      return "bottom";
  }, [f]), d = le((_, F) => {
    const n = b * 100 / 90, j = F * n / 100;
    return _ - j;
  }, [b]), x = q(() => {
    switch (g) {
      case "left":
        return c + u;
      case "top":
        return d(c + u, u);
      case "right":
        return c;
      case "bottom":
        return d(c, -u);
      default:
        return 0;
    }
  }, [g, c, u, r, b, d]), R = q(() => {
    switch (g) {
      case "left":
        return d(o, -v);
      case "top":
        return o + v;
      case "right":
        return d(o + v, v);
      case "bottom":
        return o;
      default:
        return 0;
    }
  }, [g, o, v, r, b, d]), O = q(() => {
    switch (g) {
      case "left":
        return l;
      case "top":
        return d(l, -i);
      case "right":
        return l + i;
      case "bottom":
        return d(l + i, i);
      default:
        return 0;
    }
  }, [g, l, i, r, b, d]), A = q(() => {
    switch (g) {
      case "left":
        return d(s + y, y);
      case "top":
        return s;
      case "right":
        return d(s, -y);
      case "bottom":
        return s + y;
      default:
        return 0;
    }
  }, [g, s, y, r, b, d]);
  return {
    y1: R,
    y2: A,
    x1: x,
    x2: O,
    top1: o,
    top2: s,
    left1: c,
    left2: l,
    angle: f,
    width1: u,
    width2: i,
    height1: v,
    height2: y,
    sideAngle: b,
    extraSpace: a,
    currentSide: g
  };
}, ir = ({ lineId: e, newConnection: r = !1, position1FromCenter: a = !1, disableStartDraggable: o = !1, nodeId: s, lineWidth: c, onDragLineEnd: l, onDragLineStart: u, ...i }) => {
  const v = Ue(Qt()), y = ze(), f = Le(), { window: b } = je.useFrame(), [g, d] = ae(i.top1), [x, R] = ae(i.top2), [O, A] = ae(i.left1), [_, F] = ae(i.left2), [n, j] = ae();
  we(() => {
    d(i.top1), R(i.top2), A(i.left1), F(i.left2);
  }, [i.top1, i.top2, i.left1, i.left2]);
  const k = ar({
    top1: g,
    top2: x,
    left1: O,
    left2: _,
    width1: i.width1,
    width2: i.width2,
    height1: i.height1,
    height2: i.height2
  }), J = Ee({ top: 0, left: 0 }), Z = le(($) => {
    if (e && y([e], !1), j("start"), u == null || u(), !b)
      return;
    const G = (ee) => {
      const ie = ee.pageX - f.left.value - J.current.left, re = ee.pageY - f.top.value - J.current.top;
      A(ie), d(re);
    }, Q = () => {
      j(void 0), A(i.left1), v(void 0), d(i.top1), l == null || l(), b.removeEventListener("mousemove", G), b.removeEventListener("mouseup", Q);
    };
    J.current = {
      top: $.nativeEvent.pageY - k.y1 - f.top.value,
      left: $.nativeEvent.pageX - k.x1 - f.left.value - 10
    }, G($.nativeEvent), v({ type: "start", nodeId: s, lineId: e }), b.addEventListener("mousemove", G), b.addEventListener("mouseup", Q);
  }, [v, u, l, b, f, g, O, k.y1, k.x1, i.left1, i.top1, s, e]), S = le(($) => {
    if (e && y([e], !1), j("end"), u == null || u(), !b)
      return;
    const G = (ee) => {
      const ie = ee.pageX - f.left.value - J.current.left, re = ee.pageY - f.top.value - J.current.top;
      F(ie), R(re);
    }, Q = () => {
      j(void 0), F(i.left2), v(void 0), R(i.top2), l == null || l(), b.removeEventListener("mousemove", G), b.removeEventListener("mouseup", Q);
    };
    J.current = {
      top: $.nativeEvent.pageY - k.y2 - f.top.value,
      left: $.nativeEvent.pageX - k.x2 - f.left.value + 10
    }, G($.nativeEvent), v({ type: "end", nodeId: s, lineId: e }), b.addEventListener("mousemove", G), b.addEventListener("mouseup", Q);
  }, [v, u, l, b, f, k.y2, k.x2, i.left2, i.top2, s, e]);
  return /* @__PURE__ */ T.jsxs(T.Fragment, { children: [
    n && /* @__PURE__ */ T.jsx(
      "line",
      {
        fill: "none",
        stroke: "#0f77bf",
        strokeLinecap: "round",
        strokeWidth: c,
        style: { pointerEvents: "none" },
        markerEnd: `url(#end-line-arrow-${e})`,
        y2: n === "end" ? x - k.extraSpace / 2 : k.y2,
        x2: n === "end" ? _ + k.extraSpace / 2 : k.x2,
        y1: a ? g + i.height1 / 2 : n === "start" ? g : k.y1,
        x1: a ? O + i.width1 / 2 : n === "start" ? O - k.extraSpace / 2 : k.x1
      }
    ),
    r && /* @__PURE__ */ T.jsx(
      "rect",
      {
        x: O - 3,
        fill: "transparent",
        width: k.width1,
        height: k.height1 / 2,
        onMouseDown: S,
        y: g + k.height1 / 2 + 2,
        style: { cursor: "crosshair", pointerEvents: n ? "none" : "auto" }
      }
    ),
    !n && !r && /* @__PURE__ */ T.jsxs(T.Fragment, { children: [
      !o && /* @__PURE__ */ T.jsx(
        "rect",
        {
          width: 20,
          height: 20,
          fill: "transparent",
          y: k.y1 - 10,
          x: k.x1 - 10,
          onMouseDown: Z,
          style: { cursor: "crosshair", pointerEvents: "auto" }
        }
      ),
      /* @__PURE__ */ T.jsx(
        "rect",
        {
          width: 20,
          height: 20,
          fill: "transparent",
          y: k.y2 - 10,
          x: k.x2 - 10,
          onMouseDown: S,
          style: { cursor: "crosshair", pointerEvents: "auto" }
        }
      )
    ] })
  ] });
}, wn = ({ onDrop: e, ...r }) => {
  const [a, o] = ae(!1), [s, c] = ae(!1), l = te(r.top1Observable), u = te(r.top2Observable), i = te(r.lineIdObservable), v = te(r.left1Observable), y = te(r.left2Observable), f = te(r.blockIdObservable), b = te(r.width1Observable), g = te(r.width2Observable), d = te(r.isCurvedObservable), x = te(r.height1Observable), R = te(r.height2Observable), O = te(rr(i)), A = ze(), _ = q(() => 2.5, []), F = q(() => 1, []), n = ar({
    isCurved: d,
    top1: l,
    top2: u,
    left1: v,
    left2: y,
    width1: b,
    width2: g,
    height1: x,
    height2: R
  }), j = le((S) => {
    A(i, qe(S.nativeEvent));
  }, [i]), k = q(() => {
    const S = (re) => {
      const ce = n.sideAngle * 100 / 90;
      return re * ce / 100;
    };
    let $ = 0;
    switch (n.currentSide) {
      case "left":
        $ = S(-20);
        break;
      case "right":
        $ = 20;
        break;
      case "top":
        $ = S(-20);
        break;
      case "bottom":
        $ = 20;
        break;
    }
    const G = $ / 2 * -1, Q = n.y1 + (n.y2 - n.y1) / 2 + $, ie = `Q ${n.x1 + (n.x2 - n.x1) / 2 + G} ${Q}`;
    return `M ${n.x1} ${n.y1} ${ie} ${n.x2} ${n.y2}`;
  }, [n.x1, i, n.y1, n.x2, n.y2, n.currentSide, n.sideAngle, n.angle]), J = Ee(null), Z = Le();
  return or({
    element: J,
    id: Ee(ut()).current,
    leave: () => o(!1),
    hover: () => o((S) => S || !0),
    drop: (S, { x: $, y: G }) => {
      o(!1), e == null || e({
        data: S,
        top: G + -Z.top.value,
        left: $ + -Z.left.value,
        target: { type: "line", lineId: i, nodeId: f }
      });
    }
  }), /* @__PURE__ */ T.jsxs(T.Fragment, { children: [
    /* @__PURE__ */ T.jsx("defs", { children: /* @__PURE__ */ T.jsx("marker", { orient: "auto", refX: 2.8 * _, refY: 2.4 * _, markerWidth: 10 * _, markerHeight: 8 * _, id: `end-line-arrow-${i}`, children: /* @__PURE__ */ T.jsx("polygon", { points: `0 ${1 * _}, ${3 * _} ${2.4 * _}, 0 ${4 * _}`, stroke: O ? "#0f77bf" : "gray", fill: O ? "#0f77bf" : "gray" }) }) }),
    !s && !d && /* @__PURE__ */ T.jsxs(T.Fragment, { children: [
      /* @__PURE__ */ T.jsx(
        "line",
        {
          fill: "none",
          y1: n.y1,
          y2: n.y2,
          x1: n.x1,
          x2: n.x2,
          strokeLinecap: "round",
          strokeWidth: F,
          style: { pointerEvents: "none" },
          markerEnd: `url(#end-line-arrow-${i})`,
          stroke: O || a ? "#0f77bf" : "gray"
        }
      ),
      /* @__PURE__ */ T.jsx(
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
          onClick: j,
          style: { pointerEvents: "auto" },
          ref: e ? J : void 0
        }
      )
    ] }),
    !s && d && /* @__PURE__ */ T.jsxs(T.Fragment, { children: [
      /* @__PURE__ */ T.jsx(
        "path",
        {
          d: k,
          fill: "none",
          strokeLinecap: "round",
          strokeWidth: F,
          markerEnd: `url(#end-line-arrow-${i})`,
          stroke: O || a ? "#0f77bf" : "gray"
        }
      ),
      /* @__PURE__ */ T.jsx(
        "path",
        {
          d: k,
          fill: "none",
          strokeWidth: 14,
          stroke: "transparent",
          strokeLinecap: "round",
          onClick: j,
          style: { pointerEvents: "auto" },
          ref: e ? J : void 0
        }
      )
    ] }),
    /* @__PURE__ */ T.jsx(
      ir,
      {
        top1: l,
        top2: u,
        lineId: i,
        left1: v,
        left2: y,
        nodeId: f,
        width1: b,
        width2: g,
        height1: x,
        height2: R,
        lineWidth: F,
        disableStartDraggable: d,
        onDragLineEnd: () => c(!1),
        onDragLineStart: () => c(!0)
      }
    )
  ] });
}, En = ({ node: e }) => {
  var i;
  const r = te(e.height), a = te(e.width), o = te(e.left), s = te(e.top), c = te(e.id), l = q(() => 2.5, []), u = q(() => 1, []);
  return (i = e.disableCreateConnections) != null && i.call(e) ? null : /* @__PURE__ */ T.jsxs(T.Fragment, { children: [
    /* @__PURE__ */ T.jsx("defs", { children: /* @__PURE__ */ T.jsx("marker", { orient: "auto", refX: 2.8 * l, refY: 2.4 * l, markerWidth: 10 * l, markerHeight: 8 * l, id: "end-line-arrow-undefined", children: /* @__PURE__ */ T.jsx("polygon", { points: `0 ${1 * l}, ${3 * l} ${2.4 * l}, 0 ${4 * l}`, stroke: "#0f77bf", fill: "#0f77bf" }) }) }),
    /* @__PURE__ */ T.jsx(
      ir,
      {
        top2: s,
        top1: s,
        nodeId: c,
        left2: o,
        left1: o,
        width1: a,
        width2: a,
        height2: r,
        height1: r,
        lineId: void 0,
        newConnection: !0,
        position1FromCenter: !0,
        lineWidth: u
      }
    )
  ] });
}, xn = ({ backgroundColorDefault: e = "#1e1e1e", backgroundColorPaper: r = "#484848", backgroundDotColor: a = "#484848", backgroundSize: o = 30, disableDropInLines: s = !1, onRemove: c, onDrop: l }) => {
  const u = Ee(null), { document: i } = je.useFrame(), v = Le(), y = Ue(vt()), f = Ue(v.left), b = Ue(v.top), { flowStore: g, linesStore: d, selectedItemsId: x } = Te(), R = nr(), O = ze(), A = te(d), _ = te(g);
  or({
    element: u,
    id: Ee(ut()).current,
    drop: (n, { x: j, y: k }) => l == null ? void 0 : l({
      data: n,
      target: { type: "board" },
      top: k + -v.top.value,
      left: j + -v.left.value
    })
  }), we(() => {
    if (!i)
      return;
    const n = (S) => {
      qe(S) && (S.stopImmediatePropagation(), S.stopPropagation(), S.preventDefault(), S.deltaY < 0 ? y(($) => $ >= 2 ? $ : $ + 0.1) : y(($) => $ <= 0.2 ? $ : $ - 0.1));
    }, j = (S) => {
      qe(S) && S.key === "a" && O(g.value.map(($) => $.id.value));
    }, k = (S) => {
      S.key === "Escape" && O([]);
    }, J = (S) => {
      S.key === "Delete" && x.value.length > 0 && (c == null || c(x.value));
    }, Z = (S) => {
      const $ = S.altKey ? 30 : 15;
      S.key === "ArrowUp" ? R(0, -$) : S.key === "ArrowRight" ? R($, 0) : S.key === "ArrowDown" ? R(0, $) : S.key === "ArrowLeft" && R(-$, 0);
    };
    return i.addEventListener("keydown", k, { passive: !1 }), i.addEventListener("keydown", Z, { passive: !1 }), i.addEventListener("keydown", j, { passive: !1 }), i.addEventListener("keydown", J, { passive: !1 }), i.addEventListener("wheel", n, { passive: !1 }), () => {
      i.removeEventListener("keydown", k), i.removeEventListener("keydown", Z), i.removeEventListener("keydown", j), i.removeEventListener("keydown", J), i.removeEventListener("wheel", n);
    };
  }, [y, i, x, c, R]);
  const F = le((n) => {
    const j = n.endY, k = n.endX, J = n.startY, Z = n.startX, S = (G) => {
      const Q = G.top.value, ee = G.left.value, ie = G.top.value + G.height.value, re = G.left.value + G.width.value, ce = j - J > 0, ye = k - Z > 0, be = (w, D, I, C) => (w <= I || D <= I) && (w >= C || D >= C), h = (w, D, I, C) => (w >= I || D >= I) && (w <= C || D <= C);
      return (ce ? h(Q, ie, J, j) : be(Q, ie, J, j)) && (ye ? h(ee, re, Z, k) : be(ee, re, Z, k));
    }, $ = _.filter((G) => S(G)).map((G) => G.id.value);
    O($);
  }, [_, O]);
  return /* @__PURE__ */ T.jsx(
    "div",
    {
      className: "panel-wrapper",
      style: {
        "--color-panel-dot": a,
        "--color-panel-paper": r,
        "--color-panel-default": e,
        backgroundSize: `${o / devicePixelRatio}px ${o / devicePixelRatio}px`
      },
      children: /* @__PURE__ */ T.jsxs(
        "div",
        {
          ref: u,
          className: "panel",
          onScroll: (n) => {
            b(-n.currentTarget.scrollTop), f(-n.currentTarget.scrollLeft);
          },
          onMouseDown: (n) => {
            var j;
            return (j = u.current) != null && j.isSameNode(n.target) ? O([]) : void 0;
          },
          children: [
            /* @__PURE__ */ T.jsxs(gn, { children: [
              _.map((n) => /* @__PURE__ */ T.jsx(En, { node: n }, n.id.value)),
              A.map((n) => /* @__PURE__ */ T.jsx(
                wn,
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
              /* @__PURE__ */ T.jsx(
                mn,
                {
                  boardRef: u,
                  onCoordsChange: F
                }
              )
            ] }),
            /* @__PURE__ */ T.jsx(bn, { children: _.map((n) => /* @__PURE__ */ T.jsx(yn, { node: n }, n.id.value)) })
          ]
        }
      )
    }
  );
}, _n = `
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
`, Tn = nn, Pn = ({ snapGridSize: e = 15, items: r, customCSS: a = "", ...o }) => {
  const s = q(() => /* @__PURE__ */ T.jsx(T.Fragment, { children: /* @__PURE__ */ T.jsx("style", { children: [
    a,
    _n,
    fn
  ].join(`
`) }) }), [a]);
  return /* @__PURE__ */ T.jsx(
    Tn,
    {
      tabIndex: -1,
      head: s,
      mountTarget: "body",
      onContextMenu: (c) => c.preventDefault(),
      initialContent: '<html tabindex="0"><head></head><body style="margin:0;"></body></html>',
      style: { width: "100%", height: "100%", display: "block", margin: 0, padding: 0, border: "none" },
      children: /* @__PURE__ */ T.jsx(ln, { items: r, children: /* @__PURE__ */ T.jsx(sn, { value: e, children: /* @__PURE__ */ T.jsx(an, { value: 1, children: /* @__PURE__ */ T.jsx(cn, { children: /* @__PURE__ */ T.jsx(on, { children: /* @__PURE__ */ T.jsx(xn, { ...o }) }) }) }) }) })
    }
  );
};
export {
  Pn as FlowEditor
};
//# sourceMappingURL=index.es.js.map
