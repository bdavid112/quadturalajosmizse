(function (require$$0, designSystem) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var require$$0__default = /*#__PURE__*/_interopDefault(require$$0);

  var jsxRuntime = {exports: {}};

  var reactJsxRuntime_development = {};

  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    (function() {

  var React = require$$0__default.default;

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types.
  var REACT_ELEMENT_TYPE = Symbol.for('react.element');
  var REACT_PORTAL_TYPE = Symbol.for('react.portal');
  var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
  var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
  var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
  var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
  var REACT_CONTEXT_TYPE = Symbol.for('react.context');
  var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
  var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
  var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
  var REACT_MEMO_TYPE = Symbol.for('react.memo');
  var REACT_LAZY_TYPE = Symbol.for('react.lazy');
  var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
  var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }

    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }

    return null;
  }

  var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  function error(format) {
    {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }
  }

  function printWarning(level, format, args) {
    // When changing this logic, you might want to also
    // update consoleWithStackDev.www.js as well.
    {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      } // eslint-disable-next-line react-internal/safe-string-coercion


      var argsWithFormat = args.map(function (item) {
        return String(item);
      }); // Careful: RN currently depends on this prefix

      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      // eslint-disable-next-line react-internal/no-production-logging

      Function.prototype.apply.call(console[level], console, argsWithFormat);
    }
  }

  // -----------------------------------------------------------------------------

  var enableScopeAPI = false; // Experimental Create Event Handle API.
  var enableCacheElement = false;
  var enableTransitionTracing = false; // No known bugs, but needs performance testing

  var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
  // stuff. Intended to enable React core members to more easily debug scheduling
  // issues in DEV builds.

  var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

  var REACT_MODULE_REFERENCE;

  {
    REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
  }

  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


    if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
      return true;
    }

    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
        return true;
      }
    }

    return false;
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var displayName = outerType.displayName;

    if (displayName) {
      return displayName;
    }

    var functionName = innerType.displayName || innerType.name || '';
    return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
  } // Keep in sync with react-reconciler/getComponentNameFromFiber


  function getContextName(type) {
    return type.displayName || 'Context';
  } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


  function getComponentNameFromType(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }

    if (typeof type === 'string') {
      return type;
    }

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return 'Fragment';

      case REACT_PORTAL_TYPE:
        return 'Portal';

      case REACT_PROFILER_TYPE:
        return 'Profiler';

      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';

      case REACT_SUSPENSE_TYPE:
        return 'Suspense';

      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';

    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          var context = type;
          return getContextName(context) + '.Consumer';

        case REACT_PROVIDER_TYPE:
          var provider = type;
          return getContextName(provider._context) + '.Provider';

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');

        case REACT_MEMO_TYPE:
          var outerName = type.displayName || null;

          if (outerName !== null) {
            return outerName;
          }

          return getComponentNameFromType(type.type) || 'Memo';

        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;

            try {
              return getComponentNameFromType(init(payload));
            } catch (x) {
              return null;
            }
          }

        // eslint-disable-next-line no-fallthrough
      }
    }

    return null;
  }

  var assign = Object.assign;

  // Helpers to patch console.logs to avoid logging during side-effect free
  // replaying on render function. This currently only patches the object
  // lazily which won't cover if the log function was extracted eagerly.
  // We could also eagerly patch the method.
  var disabledDepth = 0;
  var prevLog;
  var prevInfo;
  var prevWarn;
  var prevError;
  var prevGroup;
  var prevGroupCollapsed;
  var prevGroupEnd;

  function disabledLog() {}

  disabledLog.__reactDisabledLog = true;
  function disableLogs() {
    {
      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

        var props = {
          configurable: true,
          enumerable: true,
          value: disabledLog,
          writable: true
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      disabledDepth++;
    }
  }
  function reenableLogs() {
    {
      disabledDepth--;

      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        var props = {
          configurable: true,
          enumerable: true,
          writable: true
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          log: assign({}, props, {
            value: prevLog
          }),
          info: assign({}, props, {
            value: prevInfo
          }),
          warn: assign({}, props, {
            value: prevWarn
          }),
          error: assign({}, props, {
            value: prevError
          }),
          group: assign({}, props, {
            value: prevGroup
          }),
          groupCollapsed: assign({}, props, {
            value: prevGroupCollapsed
          }),
          groupEnd: assign({}, props, {
            value: prevGroupEnd
          })
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      if (disabledDepth < 0) {
        error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
      }
    }
  }

  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  var prefix;
  function describeBuiltInComponentFrame(name, source, ownerFn) {
    {
      if (prefix === undefined) {
        // Extract the VM specific prefix used by each line.
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || '';
        }
      } // We use the prefix to ensure our stacks line up with native stack frames.


      return '\n' + prefix + name;
    }
  }
  var reentry = false;
  var componentFrameCache;

  {
    var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
    componentFrameCache = new PossiblyWeakMap();
  }

  function describeNativeComponentFrame(fn, construct) {
    // If something asked for a stack inside a fake render, it should get ignored.
    if ( !fn || reentry) {
      return '';
    }

    {
      var frame = componentFrameCache.get(fn);

      if (frame !== undefined) {
        return frame;
      }
    }

    var control;
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

    Error.prepareStackTrace = undefined;
    var previousDispatcher;

    {
      previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
      // for warnings.

      ReactCurrentDispatcher.current = null;
      disableLogs();
    }

    try {
      // This should throw.
      if (construct) {
        // Something should be setting the props in the constructor.
        var Fake = function () {
          throw Error();
        }; // $FlowFixMe


        Object.defineProperty(Fake.prototype, 'props', {
          set: function () {
            // We use a throwing setter instead of frozen or non-writable props
            // because that won't throw in a non-strict mode function.
            throw Error();
          }
        });

        if (typeof Reflect === 'object' && Reflect.construct) {
          // We construct a different control for this case to include any extra
          // frames added by the construct call.
          try {
            Reflect.construct(Fake, []);
          } catch (x) {
            control = x;
          }

          Reflect.construct(fn, [], Fake);
        } else {
          try {
            Fake.call();
          } catch (x) {
            control = x;
          }

          fn.call(Fake.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (x) {
          control = x;
        }

        fn();
      }
    } catch (sample) {
      // This is inlined manually because closure doesn't do it for us.
      if (sample && control && typeof sample.stack === 'string') {
        // This extracts the first frame from the sample that isn't also in the control.
        // Skipping one frame that we assume is the frame that calls the two.
        var sampleLines = sample.stack.split('\n');
        var controlLines = control.stack.split('\n');
        var s = sampleLines.length - 1;
        var c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }

        for (; s >= 1 && c >= 0; s--, c--) {
          // Next we find the first one that isn't the same which should be the
          // frame that called our sample function and the control.
          if (sampleLines[s] !== controlLines[c]) {
            // In V8, the first line is describing the message but other VMs don't.
            // If we're about to return the first line, and the control is also on the same
            // line, that's a pretty good indicator that our sample threw at same line as
            // the control. I.e. before we entered the sample frame. So we ignore this result.
            // This can happen if you passed a class to function component, or non-function.
            if (s !== 1 || c !== 1) {
              do {
                s--;
                c--; // We may still have similar intermediate frames from the construct call.
                // The next one that isn't the same should be our match though.

                if (c < 0 || sampleLines[s] !== controlLines[c]) {
                  // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                  var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                  // but we have a user-provided "displayName"
                  // splice it in to make the stack more readable.


                  if (fn.displayName && _frame.includes('<anonymous>')) {
                    _frame = _frame.replace('<anonymous>', fn.displayName);
                  }

                  {
                    if (typeof fn === 'function') {
                      componentFrameCache.set(fn, _frame);
                    }
                  } // Return the line we found.


                  return _frame;
                }
              } while (s >= 1 && c >= 0);
            }

            break;
          }
        }
      }
    } finally {
      reentry = false;

      {
        ReactCurrentDispatcher.current = previousDispatcher;
        reenableLogs();
      }

      Error.prepareStackTrace = previousPrepareStackTrace;
    } // Fallback to just using the name if we couldn't make it throw.


    var name = fn ? fn.displayName || fn.name : '';
    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

    {
      if (typeof fn === 'function') {
        componentFrameCache.set(fn, syntheticFrame);
      }
    }

    return syntheticFrame;
  }
  function describeFunctionComponentFrame(fn, source, ownerFn) {
    {
      return describeNativeComponentFrame(fn, false);
    }
  }

  function shouldConstruct(Component) {
    var prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }

  function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

    if (type == null) {
      return '';
    }

    if (typeof type === 'function') {
      {
        return describeNativeComponentFrame(type, shouldConstruct(type));
      }
    }

    if (typeof type === 'string') {
      return describeBuiltInComponentFrame(type);
    }

    switch (type) {
      case REACT_SUSPENSE_TYPE:
        return describeBuiltInComponentFrame('Suspense');

      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame('SuspenseList');
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeFunctionComponentFrame(type.render);

        case REACT_MEMO_TYPE:
          // Memo may contain any component type so we recursively resolve it.
          return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;

            try {
              // Lazy may contain any component type so we recursively resolve it.
              return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
            } catch (x) {}
          }
      }
    }

    return '';
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var loggedTypeFailures = {};
  var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

  function setCurrentlyValidatingElement(element) {
    {
      if (element) {
        var owner = element._owner;
        var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
        ReactDebugCurrentFrame.setExtraStackFrame(stack);
      } else {
        ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
    }
  }

  function checkPropTypes(typeSpecs, values, location, componentName, element) {
    {
      // $FlowFixMe This is okay but Flow doesn't know it.
      var has = Function.call.bind(hasOwnProperty);

      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              // eslint-disable-next-line react-internal/prod-error-codes
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
              err.name = 'Invariant Violation';
              throw err;
            }

            error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
          } catch (ex) {
            error$1 = ex;
          }

          if (error$1 && !(error$1 instanceof Error)) {
            setCurrentlyValidatingElement(element);

            error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

            setCurrentlyValidatingElement(null);
          }

          if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error$1.message] = true;
            setCurrentlyValidatingElement(element);

            error('Failed %s type: %s', location, error$1.message);

            setCurrentlyValidatingElement(null);
          }
        }
      }
    }
  }

  var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

  function isArray(a) {
    return isArrayImpl(a);
  }

  /*
   * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
   * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
   *
   * The functions in this module will throw an easier-to-understand,
   * easier-to-debug exception with a clear errors message message explaining the
   * problem. (Instead of a confusing exception thrown inside the implementation
   * of the `value` object).
   */
  // $FlowFixMe only called in DEV, so void return is not possible.
  function typeName(value) {
    {
      // toStringTag is needed for namespaced types like Temporal.Instant
      var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
      var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
      return type;
    }
  } // $FlowFixMe only called in DEV, so void return is not possible.


  function willCoercionThrow(value) {
    {
      try {
        testStringCoercion(value);
        return false;
      } catch (e) {
        return true;
      }
    }
  }

  function testStringCoercion(value) {
    // If you ended up here by following an exception call stack, here's what's
    // happened: you supplied an object or symbol value to React (as a prop, key,
    // DOM attribute, CSS property, string ref, etc.) and when React tried to
    // coerce it to a string using `'' + value`, an exception was thrown.
    //
    // The most common types that will cause this exception are `Symbol` instances
    // and Temporal objects like `Temporal.Instant`. But any object that has a
    // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
    // exception. (Library authors do this to prevent users from using built-in
    // numeric operators like `+` or comparison operators like `>=` because custom
    // methods are needed to perform accurate arithmetic or comparison.)
    //
    // To fix the problem, coerce this object or symbol value to a string before
    // passing it to React. The most reliable way is usually `String(value)`.
    //
    // To find which value is throwing, check the browser or debugger console.
    // Before this exception was thrown, there should be `console.error` output
    // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
    // problem and how that type was used: key, atrribute, input value prop, etc.
    // In most cases, this console output also shows the component and its
    // ancestor components where the exception happened.
    //
    // eslint-disable-next-line react-internal/safe-string-coercion
    return '' + value;
  }
  function checkKeyStringCoercion(value) {
    {
      if (willCoercionThrow(value)) {
        error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

        return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
      }
    }
  }

  var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown;
  var specialPropRefWarningShown;

  function hasValidRef(config) {
    {
      if (hasOwnProperty.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.key !== undefined;
  }

  function warnIfStringRefCannotBeAutoConverted(config, self) {
    {
      if (typeof config.ref === 'string' && ReactCurrentOwner.current && self) ;
    }
  }

  function defineKeyPropWarningGetter(props, displayName) {
    {
      var warnAboutAccessingKey = function () {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;

          error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
  }

  function defineRefPropWarningGetter(props, displayName) {
    {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;

          error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, instanceof check
   * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} props
   * @param {*} key
   * @param {string|object} ref
   * @param {*} owner
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @internal
   */


  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };

    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.

      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }); // self and source are DEV only properties.

      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      }); // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.

      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });

      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }

    return element;
  };
  /**
   * https://github.com/reactjs/rfcs/pull/107
   * @param {*} type
   * @param {object} props
   * @param {string} key
   */

  function jsxDEV(type, config, maybeKey, source, self) {
    {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null; // Currently, key can be spread in as a prop. This causes a potential
      // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
      // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
      // but as an intermediary step, we will use jsxDEV for everything except
      // <div {...props} key="Hi" />, because we aren't currently able to tell if
      // key is explicitly declared to be undefined or not.

      if (maybeKey !== undefined) {
        {
          checkKeyStringCoercion(maybeKey);
        }

        key = '' + maybeKey;
      }

      if (hasValidKey(config)) {
        {
          checkKeyStringCoercion(config.key);
        }

        key = '' + config.key;
      }

      if (hasValidRef(config)) {
        ref = config.ref;
        warnIfStringRefCannotBeAutoConverted(config, self);
      } // Remaining properties are added to a new props object


      for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      if (key || ref) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }

        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }

      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
  }

  var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
  var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

  function setCurrentlyValidatingElement$1(element) {
    {
      if (element) {
        var owner = element._owner;
        var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
        ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
      } else {
        ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
    }
  }

  var propTypesMisspellWarningShown;

  {
    propTypesMisspellWarningShown = false;
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */


  function isValidElement(object) {
    {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
  }

  function getDeclarationErrorAddendum() {
    {
      if (ReactCurrentOwner$1.current) {
        var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }
  }

  function getSourceInfoErrorAddendum(source) {
    {

      return '';
    }
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */


  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
        }
      }

      return info;
    }
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */


  function validateExplicitKey(element, parentType) {
    {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
      }

      setCurrentlyValidatingElement$1(element);

      error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

      setCurrentlyValidatingElement$1(null);
    }
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */


  function validateChildKeys(node, parentType) {
    {
      if (typeof node !== 'object') {
        return;
      }

      if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
  }
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */


  function validatePropTypes(element) {
    {
      var type = element.type;

      if (type === null || type === undefined || typeof type === 'string') {
        return;
      }

      var propTypes;

      if (typeof type === 'function') {
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        // Intentionally inside to avoid triggering lazy initializers:
        var name = getComponentNameFromType(type);
        checkPropTypes(propTypes, element.props, 'prop', name, element);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

        var _name = getComponentNameFromType(type);

        error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
        error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */


  function validateFragmentProps(fragment) {
    {
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          setCurrentlyValidatingElement$1(fragment);

          error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

          setCurrentlyValidatingElement$1(null);
          break;
        }
      }

      if (fragment.ref !== null) {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid attribute `ref` supplied to `React.Fragment`.');

        setCurrentlyValidatingElement$1(null);
      }
    }
  }

  var didWarnAboutKeySpread = {};
  function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
    {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum();

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        var children = props.children;

        if (children !== undefined) {
          if (isStaticChildren) {
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                validateChildKeys(children[i], type);
              }

              if (Object.freeze) {
                Object.freeze(children);
              }
            } else {
              error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
            }
          } else {
            validateChildKeys(children, type);
          }
        }
      }

      {
        if (hasOwnProperty.call(props, 'key')) {
          var componentName = getComponentNameFromType(type);
          var keys = Object.keys(props).filter(function (k) {
            return k !== 'key';
          });
          var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

          if (!didWarnAboutKeySpread[componentName + beforeExample]) {
            var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

            error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

            didWarnAboutKeySpread[componentName + beforeExample] = true;
          }
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }
  } // These two functions exist to still get child warnings in dev
  // even with the prod transform. This means that jsxDEV is purely
  // opt-in behavior for better messages but that we won't stop
  // giving you warnings if you use production apis.

  function jsxWithValidationStatic(type, props, key) {
    {
      return jsxWithValidation(type, props, key, true);
    }
  }
  function jsxWithValidationDynamic(type, props, key) {
    {
      return jsxWithValidation(type, props, key, false);
    }
  }

  var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
  // for now we can ship identical prod functions

  var jsxs =  jsxWithValidationStatic ;

  reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_development.jsx = jsx;
  reactJsxRuntime_development.jsxs = jsxs;
    })();
  }

  {
    jsxRuntime.exports = reactJsxRuntime_development;
  }

  var jsxRuntimeExports = jsxRuntime.exports;

  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  const {toString} = Object.prototype;
  const {getPrototypeOf} = Object;

  const kindOf = (cache => thing => {
      const str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));

  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type
  };

  const typeOfTest = type => thing => typeof thing === type;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const {isArray} = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  const isArrayBuffer = kindOfTest('ArrayBuffer');


  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    let result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  const isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  const isFunction = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  const isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject = (thing) => thing !== null && typeof thing === 'object';

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  const isBoolean = thing => thing === true || thing === false;

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
      return false;
    }

    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  const isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  const isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  const isStream = (val) => isObject(val) && isFunction(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  const isFormData = (thing) => {
    let kind;
    return thing && (
      (typeof FormData === 'function' && thing instanceof FormData) || (
        isFunction(thing.append) && (
          (kind = kindOf(thing)) === 'formdata' ||
          // detect form-data instance
          (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
        )
      )
    )
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  const isURLSearchParams = kindOfTest('URLSearchParams');

  const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  const trim = (str) => str.trim ?
    str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Boolean} [allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn, {allOwnKeys = false} = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    let i;
    let l;

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;

      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }

  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }

  const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
  })();

  const isContextDefined = (context) => !isUndefined(context) && context !== _global;

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    const {caseless} = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };

    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Boolean} [allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {allOwnKeys});
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};

    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;

    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };


  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  const isTypedArray = (TypedArray => {
    // eslint-disable-next-line func-names
    return thing => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];

    const iterator = generator.call(obj);

    let result;

    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];

    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }

    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  const isHTMLForm = kindOfTest('HTMLFormElement');

  const toCamelCase = str => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  const isRegExp = kindOfTest('RegExp');

  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};

    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });

    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      // skip restricted props in strict mode
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false;
      }

      const value = obj[name];

      if (!isFunction(value)) return;

      descriptor.enumerable = false;

      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }

      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error('Can not rewrite read-only method \'' + name + '\'');
        };
      }
    });
  };

  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};

    const define = (arr) => {
      arr.forEach(value => {
        obj[value] = true;
      });
    };

    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

    return obj;
  };

  const noop = () => {};

  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
  }

  const toJSONObject = (obj) => {
    const stack = new Array(10);

    const visit = (source, i) => {

      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }

        if(!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });

          stack[i] = undefined;

          return target;
        }
      }

      return source;
    };

    return visit(obj, 0);
  };

  const isAsyncFn = kindOfTest('AsyncFunction');

  const isThenable = (thing) =>
    thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

  // original code
  // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }

    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({source, data}) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);

      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      }
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(
    typeof setImmediate === 'function',
    isFunction(_global.postMessage)
  );

  const asap = typeof queueMicrotask !== 'undefined' ?
    queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

  // *********************

  var utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  function AxiosError$1(message, code, config, request, response) {
    Error.call(this);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error()).stack;
    }

    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }

  utils$1.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });

  const prototype$1 = AxiosError$1.prototype;
  const descriptors = {};

  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(code => {
    descriptors[code] = {value: code};
  });

  Object.defineProperties(AxiosError$1, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

  // eslint-disable-next-line func-names
  AxiosError$1.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);

    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, prop => {
      return prop !== 'isAxiosError';
    });

    AxiosError$1.call(axiosError, error.message, code, config, request, response);

    axiosError.cause = error;

    axiosError.name = error.name;

    customProps && Object.assign(axiosError, customProps);

    return axiosError;
  };

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }

  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData$1(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$1.isUndefined(source[option]);
    });

    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }

    function convertValue(value) {
      if (value === null) return '';

      if (utils$1.isDate(value)) {
        return value.toISOString();
      }

      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
      }

      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }

      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      let arr = value;

      if (value && !path && typeof value === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (
          (utils$1.isArray(value) && isFlatArray(value)) ||
          ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
          )) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);

          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
              convertValue(el)
            );
          });
          return false;
        }
      }

      if (isVisitable(value)) {
        return true;
      }

      formData.append(renderKey(path, key, dots), convertValue(value));

      return false;
    }

    const stack = [];

    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });

    function build(value, path) {
      if (utils$1.isUndefined(value)) return;

      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }

      stack.push(value);

      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
          formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
        );

        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });

      stack.pop();
    }

    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object');
    }

    build(obj);

    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];

    params && toFormData$1(params, this, options);
  }

  const prototype = AxiosURLSearchParams.prototype;

  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };

  prototype.toString = function toString(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;

    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
  };

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?(object|Function)} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    
    const _encode = options && options.encode || encode;

    if (utils$1.isFunction(options)) {
      options = {
        serialize: options
      };
    } 

    const serializeFn = options && options.serialize;

    let serializedParams;

    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ?
        params.toString() :
        new AxiosURLSearchParams(params, options).toString(_encode);
    }

    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  }

  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  };

  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

  const _navigator = typeof navigator === 'object' && navigator || undefined;

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  const hasStandardBrowserEnv = hasBrowserEnv &&
    (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  const hasStandardBrowserWebWorkerEnv = (() => {
    return (
      typeof WorkerGlobalScope !== 'undefined' &&
      // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts === 'function'
    );
  })();

  const origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin: origin
  });

  var platform = {
    ...utils,
    ...platform$1
  };

  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }

        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];

      if (name === '__proto__') return true;

      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;

      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }

        return !isNumericKey;
      }

      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }

      const result = buildPath(path, value, target[name], index);

      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }

      return !isNumericKey;
    }

    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};

      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });

      return obj;
    }

    return null;
  }

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }

    return (encoder || JSON.stringify)(rawValue);
  }

  const defaults = {

    transitional: transitionalDefaults,

    adapter: ['xhr', 'http', 'fetch'],

    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = utils$1.isObject(data);

      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = utils$1.isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }

      if (utils$1.isArrayBuffer(data) ||
        utils$1.isBuffer(data) ||
        utils$1.isStream(data) ||
        utils$1.isFile(data) ||
        utils$1.isBlob(data) ||
        utils$1.isReadableStream(data)
      ) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }

        if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          const _FormData = this.env && this.env.FormData;

          return toFormData$1(
            isFileList ? {'files[]': data} : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType ) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    }],

    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';

      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }

      if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;

        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },

    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': undefined
      }
    }
  };

  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
    defaults.headers[method] = {};
  });

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$1.toObjectSet([
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ]);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;

    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
        return;
      }

      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });

    return parsed;
  };

  const $internals = Symbol('internals');

  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }

  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }

    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }

  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;

    while ((match = tokensRE.exec(str))) {
      tokens[match[1]] = match[2];
    }

    return tokens;
  }

  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }

    if (isHeaderNameFilter) {
      value = header;
    }

    if (!utils$1.isString(value)) return;

    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }

    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }

  function formatHeader(header) {
    return header.trim()
      .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
  }

  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(' ' + header);

    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }

  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }

    set(header, valueOrRewrite, rewrite) {
      const self = this;

      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);

        if (!lHeader) {
          throw new Error('header name must be a non-empty string');
        }

        const key = utils$1.findKey(self, lHeader);

        if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
          self[key || _header] = normalizeValue(_value);
        }
      }

      const setHeaders = (headers, _rewrite) =>
        utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }

      return this;
    }

    get(header, parser) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$1.findKey(this, header);

        if (key) {
          const value = this[key];

          if (!parser) {
            return value;
          }

          if (parser === true) {
            return parseTokens(value);
          }

          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }

          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }

          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }

    has(header, matcher) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$1.findKey(this, header);

        return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }

      return false;
    }

    delete(header, matcher) {
      const self = this;
      let deleted = false;

      function deleteHeader(_header) {
        _header = normalizeHeader(_header);

        if (_header) {
          const key = utils$1.findKey(self, _header);

          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];

            deleted = true;
          }
        }
      }

      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }

      return deleted;
    }

    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;

      while (i--) {
        const key = keys[i];
        if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }

      return deleted;
    }

    normalize(format) {
      const self = this;
      const headers = {};

      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);

        if (key) {
          self[key] = normalizeValue(value);
          delete self[header];
          return;
        }

        const normalized = format ? formatHeader(header) : String(header).trim();

        if (normalized !== header) {
          delete self[header];
        }

        self[normalized] = normalizeValue(value);

        headers[normalized] = true;
      });

      return this;
    }

    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }

    toJSON(asStrings) {
      const obj = Object.create(null);

      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
      });

      return obj;
    }

    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }

    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
    }

    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }

    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }

    static concat(first, ...targets) {
      const computed = new this(first);

      targets.forEach((target) => computed.set(target));

      return computed;
    }

    static accessor(header) {
      const internals = this[$internals] = (this[$internals] = {
        accessors: {}
      });

      const accessors = internals.accessors;
      const prototype = this.prototype;

      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);

        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }

      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

      return this;
    }
  };

  AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({value}, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    }
  });

  utils$1.freezeMethods(AxiosHeaders$1);

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;

    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });

    headers.normalize();

    return data;
  }

  function isCancel$1(value) {
    return !!(value && value.__CANCEL__);
  }

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError$1(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }

  utils$1.inherits(CanceledError$1, AxiosError$1, {
    __CANCEL__: true
  });

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError$1(
        'Request failed with status code ' + response.status,
        [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;

    min = min !== undefined ? min : 1000;

    return function push(chunkLength) {
      const now = Date.now();

      const startedAt = timestamps[tail];

      if (!firstSampleTS) {
        firstSampleTS = now;
      }

      bytes[head] = chunkLength;
      timestamps[head] = now;

      let i = tail;
      let bytesCount = 0;

      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }

      head = (head + 1) % samplesCount;

      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }

      if (now - firstSampleTS < min) {
        return;
      }

      const passed = startedAt && now - startedAt;

      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;

    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };

    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if ( passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };

    const flush = () => lastArgs && invoke(lastArgs);

    return [throttled, flush];
  }

  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);

    return throttle(e => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : undefined;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;

      bytesNotified = loaded;

      const data = {
        loaded,
        total,
        progress: total ? (loaded / total) : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? 'download' : 'upload']: true
      };

      listener(data);
    }, freq);
  };

  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;

    return [(loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };

  const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

  var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
    url = new URL(url, platform.origin);

    return (
      origin.protocol === url.protocol &&
      origin.host === url.host &&
      (isMSIE || origin.port === url.port)
    );
  })(
    new URL(platform.origin),
    platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
  ) : () => true;

  var cookies = platform.hasStandardBrowserEnv ?

    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + '=' + encodeURIComponent(value)];

        utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

        utils$1.isString(path) && cookie.push('path=' + path);

        utils$1.isString(domain) && cookie.push('domain=' + domain);

        secure === true && cookie.push('secure');

        document.cookie = cookie.join('; ');
      },

      read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    }

    :

    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      remove() {}
    };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig$1(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    const config = {};

    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({caseless}, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, prop , caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop , caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a, prop , caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(undefined, a);
      }
    }

    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
    };

    utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge(config1[prop], config2[prop], prop);
      (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  }

  var resolveConfig = (config) => {
    const newConfig = mergeConfig$1({}, config);

    let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

    newConfig.headers = headers = AxiosHeaders$1.from(headers);

    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' +
        btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
      );
    }

    let contentType;

    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // Let the browser set it
      } else if ((contentType = headers.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
        // Add xsrf header
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }

    return newConfig;
  };

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      let {responseType, onUploadProgress, onDownloadProgress} = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;

      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }

      let request = new XMLHttpRequest();

      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;

      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        const responseHeaders = AxiosHeaders$1.from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
          request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };

        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError$1(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

        request.upload.addEventListener('progress', uploadThrottled);

        request.upload.addEventListener('loadend', flushUpload);
      }

      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = cancel => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
          request.abort();
          request = null;
        };

        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
      }

      const protocol = parseProtocol(_config.url);

      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
        return;
      }


      // Send the request
      request.send(requestData || null);
    });
  };

  const composeSignals = (signals, timeout) => {
    const {length} = (signals = signals ? signals.filter(Boolean) : []);

    if (timeout || length) {
      let controller = new AbortController();

      let aborted;

      const onabort = function (reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
        }
      };

      let timer = timeout && setTimeout(() => {
        timer = null;
        onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
      }, timeout);

      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach(signal => {
            signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
          });
          signals = null;
        }
      };

      signals.forEach((signal) => signal.addEventListener('abort', onabort));

      const {signal} = controller;

      signal.unsubscribe = () => utils$1.asap(unsubscribe);

      return signal;
    }
  };

  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;

    if (len < chunkSize) {
      yield chunk;
      return;
    }

    let pos = 0;
    let end;

    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };

  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };

  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }

    const reader = stream.getReader();
    try {
      for (;;) {
        const {done, value} = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };

  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator = readBytes(stream, chunkSize);

    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };

    return new ReadableStream({
      async pull(controller) {
        try {
          const {done, value} = await iterator.next();

          if (done) {
           _onFinish();
            controller.close();
            return;
          }

          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    })
  };

  const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
      ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
      async (str) => new Uint8Array(await new Response(str).arrayBuffer())
  );

  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false
    }
  };

  const supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;

    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');

    return duplexAccessed && !hasContentType;
  });

  const DEFAULT_CHUNK_SIZE = 64 * 1024;

  const supportsResponseStream = isReadableStreamSupported &&
    test(() => utils$1.isReadableStream(new Response('').body));


  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };

  isFetchSupported && (((res) => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
        (_, config) => {
          throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
        });
    });
  })(new Response));

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if(utils$1.isBlob(body)) {
      return body.size;
    }

    if(utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }

    if(utils$1.isURLSearchParams(body)) {
      body = body + '';
    }

    if(utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  var fetchAdapter = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions
    } = resolveConfig(config);

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

    let request;

    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
        composedSignal.unsubscribe();
    });

    let requestContentLength;

    try {
      if (
        onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
        (requestContentLength = await resolveBodyLength(headers, data)) !== 0
      ) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });

        let contentTypeHeader;

        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }

        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );

          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }

      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = "credentials" in Request.prototype;
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : undefined
      });

      let response = await fetch(request);

      const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach(prop => {
          options[prop] = response[prop];
        });

        const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];

        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

      !isStreamResponse && unsubscribe && unsubscribe();

      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      })
    } catch (err) {
      unsubscribe && unsubscribe();

      if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        )
      }

      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  });

  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };

  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {value});
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {value});
    }
  });

  const renderReason = (reason) => `- ${reason}`;

  const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

  var adapters = {
    getAdapter: (adapters) => {
      adapters = utils$1.isArray(adapters) ? adapters : [adapters];

      const {length} = adapters;
      let nameOrAdapter;
      let adapter;

      const rejectedReasons = {};

      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;

        adapter = nameOrAdapter;

        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

          if (adapter === undefined) {
            throw new AxiosError$1(`Unknown adapter '${id}'`);
          }
        }

        if (adapter) {
          break;
        }

        rejectedReasons[id || '#' + i] = adapter;
      }

      if (!adapter) {

        const reasons = Object.entries(rejectedReasons)
          .map(([id, state]) => `adapter ${id} ` +
            (state === false ? 'is not supported by the environment' : 'is not available in the build')
          );

        let s = length ?
          (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
          'as no adapter specified';

        throw new AxiosError$1(
          `There is no suitable adapter to dispatch the request ` + s,
          'ERR_NOT_SUPPORT'
        );
      }

      return adapter;
    },
    adapters: knownAdapters
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    config.headers = AxiosHeaders$1.from(config.headers);

    // Transform request data
    config.data = transformData.call(
      config,
      config.transformRequest
    );

    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );

      response.headers = AxiosHeaders$1.from(response.headers);

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    });
  }

  const VERSION$1 = "1.8.4";

  const validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });

  const deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError$1(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError$1.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
      }

      return validator ? validator(value, opt, opts) : true;
    };
  };

  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      // eslint-disable-next-line no-console
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    }
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
      }
    }
  }

  var validator = {
    assertOptions,
    validators: validators$1
  };

  const validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};

          Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

          // slice off the Error: ... line
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
          try {
            if (!err.stack) {
              err.stack = stack;
              // match without the 2 top stack lines
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
              err.stack += '\n' + stack;
            }
          } catch (e) {
            // ignore the case where "stack" is an un-writable property
          }
        }

        throw err;
      }
    }

    _request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }

      config = mergeConfig$1(this.defaults, config);

      const {transitional, paramsSerializer, headers} = config;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }

      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }

      // Set config.allowAbsoluteUrls
      if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }

      validator.assertOptions(config, {
        baseUrl: validators.spelling('baseURL'),
        withXsrfToken: validators.spelling('withXSRFToken')
      }, true);

      // Set config.method
      config.method = (config.method || this.defaults.method || 'get').toLowerCase();

      // Flatten headers
      let contextHeaders = headers && utils$1.merge(
        headers.common,
        headers[config.method]
      );

      headers && utils$1.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        (method) => {
          delete headers[method];
        }
      );

      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

      // filter out skipped interceptors
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });

      let promise;
      let i = 0;
      let len;

      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), undefined];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;

        promise = Promise.resolve(config);

        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }

        return promise;
      }

      len = requestInterceptorChain.length;

      let newConfig = config;

      i = 0;

      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }

      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      i = 0;
      len = responseInterceptorChain.length;

      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }

      return promise;
    }

    getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });

  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url,
          data
        }));
      };
    }

    Axios$1.prototype[method] = generateHTTPMethod();

    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  let CancelToken$1 = class CancelToken {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      let resolvePromise;

      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      const token = this;

      // eslint-disable-next-line func-names
      this.promise.then(cancel => {
        if (!token._listeners) return;

        let i = token._listeners.length;

        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = onfulfilled => {
        let _resolve;
        // eslint-disable-next-line func-names
        const promise = new Promise(resolve => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };

        return promise;
      };

      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new CanceledError$1(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }

    /**
     * Subscribe to the cancel signal
     */

    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }

      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }

    /**
     * Unsubscribe from the cancel signal
     */

    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }

    toAbortSignal() {
      const controller = new AbortController();

      const abort = (err) => {
        controller.abort(err);
      };

      this.subscribe(abort);

      controller.signal.unsubscribe = () => this.unsubscribe(abort);

      return controller.signal;
    }

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError$1(payload) {
    return utils$1.isObject(payload) && (payload.isAxiosError === true);
  }

  const HttpStatusCode$1 = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };

  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key;
  });

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);

    // Copy axios.prototype to instance
    utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

    // Copy context to instance
    utils$1.extend(instance, context, null, {allOwnKeys: true});

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios$1;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError$1;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel$1;
  axios.VERSION = VERSION$1;
  axios.toFormData = toFormData$1;

  // Expose AxiosError class
  axios.AxiosError = AxiosError$1;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };

  axios.spread = spread$1;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError$1;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig$1;

  axios.AxiosHeaders = AxiosHeaders$1;

  axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

  axios.getAdapter = adapters.getAdapter;

  axios.HttpStatusCode = HttpStatusCode$1;

  axios.default = axios;

  // This module is intended to unwrap Axios default export as named.
  // Keep top-level export same with static properties
  // so that it can keep same with es module or cjs
  const {
    Axios,
    AxiosError,
    CanceledError,
    isCancel,
    CancelToken,
    VERSION,
    all,
    Cancel,
    isAxiosError,
    spread,
    toFormData,
    AxiosHeaders,
    HttpStatusCode,
    formToJSON,
    getAdapter,
    mergeConfig
  } = axios;

  const Dashboard = () => {
    const [data, setData] = require$$0.useState({
      totalBookings: 0,
      totalRevenue: 0
    });
    require$$0.useEffect(() => {
      axios.get("/admin/api/dashboard").then(res => setData(res.data)).catch(err => console.error(err));
    }, []);
    return jsxRuntimeExports.jsxs(designSystem.Box, {
      variant: "grey",
      children: [jsxRuntimeExports.jsx(designSystem.H1, {
        children: "Admin Dashboard"
      }), jsxRuntimeExports.jsxs(designSystem.Box, {
        variant: "card",
        children: [jsxRuntimeExports.jsx(designSystem.H2, {
          children: "Bookings"
        }), jsxRuntimeExports.jsx(designSystem.Text, {
          variant: "md",
          children: "Bookings in this month: "
        }), jsxRuntimeExports.jsx(designSystem.Text, {
          variant: "md",
          children: "Bookings in previous month: "
        }), jsxRuntimeExports.jsxs(designSystem.Text, {
          variant: "md",
          children: ["Total Bookings: ", data.totalBookings]
        })]
      }), jsxRuntimeExports.jsxs(designSystem.Box, {
        variant: "card",
        children: [jsxRuntimeExports.jsx(designSystem.H2, {
          children: "Revenue"
        }), jsxRuntimeExports.jsx(designSystem.Text, {
          variant: "md",
          children: "Revenue in this month: "
        }), jsxRuntimeExports.jsx(designSystem.Text, {
          variant: "md",
          children: "Revenue in previous month: "
        }), jsxRuntimeExports.jsxs(designSystem.Text, {
          variant: "md",
          children: ["Total Revenue: $", data.totalRevenue]
        })]
      })]
    });
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LWpzeC1ydW50aW1lLmRldmVsb3BtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2pzeC1ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uL2Rpc3QvYWRtaW4vZGFzaGJvYXJkLmpzIiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vLyBBVFRFTlRJT05cbi8vIFdoZW4gYWRkaW5nIG5ldyBzeW1ib2xzIHRvIHRoaXMgZmlsZSxcbi8vIFBsZWFzZSBjb25zaWRlciBhbHNvIGFkZGluZyB0byAncmVhY3QtZGV2dG9vbHMtc2hhcmVkL3NyYy9iYWNrZW5kL1JlYWN0U3ltYm9scydcbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKTtcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKTtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKTtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0Jyk7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gU3ltYm9sLmZvcigncmVhY3QubWVtbycpO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKTtcbnZhciBSRUFDVF9PRkZTQ1JFRU5fVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0Lm9mZnNjcmVlbicpO1xudmFyIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJztcbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCB0eXBlb2YgbWF5YmVJdGVyYWJsZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBtYXliZUl0ZXJhdG9yID0gTUFZQkVfSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbTUFZQkVfSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXTtcblxuICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF5YmVJdGVyYXRvcjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSBSZWFjdC5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDtcblxuZnVuY3Rpb24gZXJyb3IoZm9ybWF0KSB7XG4gIHtcbiAgICB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcoJ2Vycm9yJywgZm9ybWF0LCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGxldmVsLCBmb3JtYXQsIGFyZ3MpIHtcbiAgLy8gV2hlbiBjaGFuZ2luZyB0aGlzIGxvZ2ljLCB5b3UgbWlnaHQgd2FudCB0byBhbHNvXG4gIC8vIHVwZGF0ZSBjb25zb2xlV2l0aFN0YWNrRGV2Lnd3dy5qcyBhcyB3ZWxsLlxuICB7XG4gICAgdmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICAgIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuXG4gICAgaWYgKHN0YWNrICE9PSAnJykge1xuICAgICAgZm9ybWF0ICs9ICclcyc7XG4gICAgICBhcmdzID0gYXJncy5jb25jYXQoW3N0YWNrXSk7XG4gICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvc2FmZS1zdHJpbmctY29lcmNpb25cblxuXG4gICAgdmFyIGFyZ3NXaXRoRm9ybWF0ID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBTdHJpbmcoaXRlbSk7XG4gICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICBhcmdzV2l0aEZvcm1hdC51bnNoaWZ0KCdXYXJuaW5nOiAnICsgZm9ybWF0KTsgLy8gV2UgaW50ZW50aW9uYWxseSBkb24ndCB1c2Ugc3ByZWFkIChvciAuYXBwbHkpIGRpcmVjdGx5IGJlY2F1c2UgaXRcbiAgICAvLyBicmVha3MgSUU5OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzEzNjEwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZVtsZXZlbF0sIGNvbnNvbGUsIGFyZ3NXaXRoRm9ybWF0KTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgZW5hYmxlU2NvcGVBUEkgPSBmYWxzZTsgLy8gRXhwZXJpbWVudGFsIENyZWF0ZSBFdmVudCBIYW5kbGUgQVBJLlxudmFyIGVuYWJsZUNhY2hlRWxlbWVudCA9IGZhbHNlO1xudmFyIGVuYWJsZVRyYW5zaXRpb25UcmFjaW5nID0gZmFsc2U7IC8vIE5vIGtub3duIGJ1Z3MsIGJ1dCBuZWVkcyBwZXJmb3JtYW5jZSB0ZXN0aW5nXG5cbnZhciBlbmFibGVMZWdhY3lIaWRkZW4gPSBmYWxzZTsgLy8gRW5hYmxlcyB1bnN0YWJsZV9hdm9pZFRoaXNGYWxsYmFjayBmZWF0dXJlIGluIEZpYmVyXG4vLyBzdHVmZi4gSW50ZW5kZWQgdG8gZW5hYmxlIFJlYWN0IGNvcmUgbWVtYmVycyB0byBtb3JlIGVhc2lseSBkZWJ1ZyBzY2hlZHVsaW5nXG4vLyBpc3N1ZXMgaW4gREVWIGJ1aWxkcy5cblxudmFyIGVuYWJsZURlYnVnVHJhY2luZyA9IGZhbHNlOyAvLyBUcmFjayB3aGljaCBGaWJlcihzKSBzY2hlZHVsZSByZW5kZXIgd29yay5cblxudmFyIFJFQUNUX01PRFVMRV9SRUZFUkVOQ0U7XG5cbntcbiAgUkVBQ1RfTU9EVUxFX1JFRkVSRU5DRSA9IFN5bWJvbC5mb3IoJ3JlYWN0Lm1vZHVsZS5yZWZlcmVuY2UnKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIE5vdGU6IHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIChlLmcuIGlmIGl0J3MgYSBwb2x5ZmlsbCkuXG5cblxuICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IGVuYWJsZURlYnVnVHJhY2luZyAgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSB8fCBlbmFibGVMZWdhY3lIaWRkZW4gIHx8IHR5cGUgPT09IFJFQUNUX09GRlNDUkVFTl9UWVBFIHx8IGVuYWJsZVNjb3BlQVBJICB8fCBlbmFibGVDYWNoZUVsZW1lbnQgIHx8IGVuYWJsZVRyYW5zaXRpb25UcmFjaW5nICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCAvLyBUaGlzIG5lZWRzIHRvIGluY2x1ZGUgYWxsIHBvc3NpYmxlIG1vZHVsZSByZWZlcmVuY2Ugb2JqZWN0XG4gICAgLy8gdHlwZXMgc3VwcG9ydGVkIGJ5IGFueSBGbGlnaHQgY29uZmlndXJhdGlvbiBhbnl3aGVyZSBzaW5jZVxuICAgIC8vIHdlIGRvbid0IGtub3cgd2hpY2ggRmxpZ2h0IGJ1aWxkIHRoaXMgd2lsbCBlbmQgdXAgYmVpbmcgdXNlZFxuICAgIC8vIHdpdGguXG4gICAgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTU9EVUxFX1JFRkVSRU5DRSB8fCB0eXBlLmdldE1vZHVsZUlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0V3JhcHBlZE5hbWUob3V0ZXJUeXBlLCBpbm5lclR5cGUsIHdyYXBwZXJOYW1lKSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IG91dGVyVHlwZS5kaXNwbGF5TmFtZTtcblxuICBpZiAoZGlzcGxheU5hbWUpIHtcbiAgICByZXR1cm4gZGlzcGxheU5hbWU7XG4gIH1cblxuICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb25OYW1lICE9PSAnJyA/IHdyYXBwZXJOYW1lICsgXCIoXCIgKyBmdW5jdGlvbk5hbWUgKyBcIilcIiA6IHdyYXBwZXJOYW1lO1xufSAvLyBLZWVwIGluIHN5bmMgd2l0aCByZWFjdC1yZWNvbmNpbGVyL2dldENvbXBvbmVudE5hbWVGcm9tRmliZXJcblxuXG5mdW5jdGlvbiBnZXRDb250ZXh0TmFtZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8ICdDb250ZXh0Jztcbn0gLy8gTm90ZSB0aGF0IHRoZSByZWNvbmNpbGVyIHBhY2thZ2Ugc2hvdWxkIGdlbmVyYWxseSBwcmVmZXIgdG8gdXNlIGdldENvbXBvbmVudE5hbWVGcm9tRmliZXIoKSBpbnN0ZWFkLlxuXG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKSB7XG4gIGlmICh0eXBlID09IG51bGwpIHtcbiAgICAvLyBIb3N0IHJvb3QsIHRleHQgbm9kZSBvciBqdXN0IGludmFsaWQgdHlwZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHtcbiAgICBpZiAodHlwZW9mIHR5cGUudGFnID09PSAnbnVtYmVyJykge1xuICAgICAgZXJyb3IoJ1JlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgb2JqZWN0IGluIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSgpLiAnICsgJ1RoaXMgaXMgbGlrZWx5IGEgYnVnIGluIFJlYWN0LiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgIHJldHVybiAnRnJhZ21lbnQnO1xuXG4gICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgIHJldHVybiAnUG9ydGFsJztcblxuICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgIHJldHVybiAnUHJvZmlsZXInO1xuXG4gICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgcmV0dXJuICdTdHJpY3RNb2RlJztcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgIHJldHVybiAnU3VzcGVuc2UnO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlTGlzdCc7XG5cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICB2YXIgY29udGV4dCA9IHR5cGU7XG4gICAgICAgIHJldHVybiBnZXRDb250ZXh0TmFtZShjb250ZXh0KSArICcuQ29uc3VtZXInO1xuXG4gICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgIHZhciBwcm92aWRlciA9IHR5cGU7XG4gICAgICAgIHJldHVybiBnZXRDb250ZXh0TmFtZShwcm92aWRlci5fY29udGV4dCkgKyAnLlByb3ZpZGVyJztcblxuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0V3JhcHBlZE5hbWUodHlwZSwgdHlwZS5yZW5kZXIsICdGb3J3YXJkUmVmJyk7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICB2YXIgb3V0ZXJOYW1lID0gdHlwZS5kaXNwbGF5TmFtZSB8fCBudWxsO1xuXG4gICAgICAgIGlmIChvdXRlck5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gb3V0ZXJOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlLnR5cGUpIHx8ICdNZW1vJztcblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgbGF6eUNvbXBvbmVudCA9IHR5cGU7XG4gICAgICAgICAgdmFyIHBheWxvYWQgPSBsYXp5Q29tcG9uZW50Ll9wYXlsb2FkO1xuICAgICAgICAgIHZhciBpbml0ID0gbGF6eUNvbXBvbmVudC5faW5pdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKGluaXQocGF5bG9hZCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZmFsbHRocm91Z2hcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIEhlbHBlcnMgdG8gcGF0Y2ggY29uc29sZS5sb2dzIHRvIGF2b2lkIGxvZ2dpbmcgZHVyaW5nIHNpZGUtZWZmZWN0IGZyZWVcbi8vIHJlcGxheWluZyBvbiByZW5kZXIgZnVuY3Rpb24uIFRoaXMgY3VycmVudGx5IG9ubHkgcGF0Y2hlcyB0aGUgb2JqZWN0XG4vLyBsYXppbHkgd2hpY2ggd29uJ3QgY292ZXIgaWYgdGhlIGxvZyBmdW5jdGlvbiB3YXMgZXh0cmFjdGVkIGVhZ2VybHkuXG4vLyBXZSBjb3VsZCBhbHNvIGVhZ2VybHkgcGF0Y2ggdGhlIG1ldGhvZC5cbnZhciBkaXNhYmxlZERlcHRoID0gMDtcbnZhciBwcmV2TG9nO1xudmFyIHByZXZJbmZvO1xudmFyIHByZXZXYXJuO1xudmFyIHByZXZFcnJvcjtcbnZhciBwcmV2R3JvdXA7XG52YXIgcHJldkdyb3VwQ29sbGFwc2VkO1xudmFyIHByZXZHcm91cEVuZDtcblxuZnVuY3Rpb24gZGlzYWJsZWRMb2coKSB7fVxuXG5kaXNhYmxlZExvZy5fX3JlYWN0RGlzYWJsZWRMb2cgPSB0cnVlO1xuZnVuY3Rpb24gZGlzYWJsZUxvZ3MoKSB7XG4gIHtcbiAgICBpZiAoZGlzYWJsZWREZXB0aCA9PT0gMCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICBwcmV2TG9nID0gY29uc29sZS5sb2c7XG4gICAgICBwcmV2SW5mbyA9IGNvbnNvbGUuaW5mbztcbiAgICAgIHByZXZXYXJuID0gY29uc29sZS53YXJuO1xuICAgICAgcHJldkVycm9yID0gY29uc29sZS5lcnJvcjtcbiAgICAgIHByZXZHcm91cCA9IGNvbnNvbGUuZ3JvdXA7XG4gICAgICBwcmV2R3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkO1xuICAgICAgcHJldkdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZDsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xOTA5OVxuXG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGRpc2FibGVkTG9nLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfTsgLy8gJEZsb3dGaXhNZSBGbG93IHRoaW5rcyBjb25zb2xlIGlzIGltbXV0YWJsZS5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29uc29sZSwge1xuICAgICAgICBpbmZvOiBwcm9wcyxcbiAgICAgICAgbG9nOiBwcm9wcyxcbiAgICAgICAgd2FybjogcHJvcHMsXG4gICAgICAgIGVycm9yOiBwcm9wcyxcbiAgICAgICAgZ3JvdXA6IHByb3BzLFxuICAgICAgICBncm91cENvbGxhcHNlZDogcHJvcHMsXG4gICAgICAgIGdyb3VwRW5kOiBwcm9wc1xuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgIH1cblxuICAgIGRpc2FibGVkRGVwdGgrKztcbiAgfVxufVxuZnVuY3Rpb24gcmVlbmFibGVMb2dzKCkge1xuICB7XG4gICAgZGlzYWJsZWREZXB0aC0tO1xuXG4gICAgaWYgKGRpc2FibGVkRGVwdGggPT09IDApIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgICAgdmFyIHByb3BzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9OyAvLyAkRmxvd0ZpeE1lIEZsb3cgdGhpbmtzIGNvbnNvbGUgaXMgaW1tdXRhYmxlLlxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb25zb2xlLCB7XG4gICAgICAgIGxvZzogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2TG9nXG4gICAgICAgIH0pLFxuICAgICAgICBpbmZvOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZJbmZvXG4gICAgICAgIH0pLFxuICAgICAgICB3YXJuOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZXYXJuXG4gICAgICAgIH0pLFxuICAgICAgICBlcnJvcjogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2RXJyb3JcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cFxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwQ29sbGFwc2VkXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cEVuZDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBFbmRcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICB9XG5cbiAgICBpZiAoZGlzYWJsZWREZXB0aCA8IDApIHtcbiAgICAgIGVycm9yKCdkaXNhYmxlZERlcHRoIGZlbGwgYmVsb3cgemVyby4gJyArICdUaGlzIGlzIGEgYnVnIGluIFJlYWN0LiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS4nKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIFJlYWN0Q3VycmVudERpc3BhdGNoZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdEN1cnJlbnREaXNwYXRjaGVyO1xudmFyIHByZWZpeDtcbmZ1bmN0aW9uIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJGbikge1xuICB7XG4gICAgaWYgKHByZWZpeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBFeHRyYWN0IHRoZSBWTSBzcGVjaWZpYyBwcmVmaXggdXNlZCBieSBlYWNoIGxpbmUuXG4gICAgICB0cnkge1xuICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICB2YXIgbWF0Y2ggPSB4LnN0YWNrLnRyaW0oKS5tYXRjaCgvXFxuKCAqKGF0ICk/KS8pO1xuICAgICAgICBwcmVmaXggPSBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbiAgICAgIH1cbiAgICB9IC8vIFdlIHVzZSB0aGUgcHJlZml4IHRvIGVuc3VyZSBvdXIgc3RhY2tzIGxpbmUgdXAgd2l0aCBuYXRpdmUgc3RhY2sgZnJhbWVzLlxuXG5cbiAgICByZXR1cm4gJ1xcbicgKyBwcmVmaXggKyBuYW1lO1xuICB9XG59XG52YXIgcmVlbnRyeSA9IGZhbHNlO1xudmFyIGNvbXBvbmVudEZyYW1lQ2FjaGU7XG5cbntcbiAgdmFyIFBvc3NpYmx5V2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nID8gV2Vha01hcCA6IE1hcDtcbiAgY29tcG9uZW50RnJhbWVDYWNoZSA9IG5ldyBQb3NzaWJseVdlYWtNYXAoKTtcbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZShmbiwgY29uc3RydWN0KSB7XG4gIC8vIElmIHNvbWV0aGluZyBhc2tlZCBmb3IgYSBzdGFjayBpbnNpZGUgYSBmYWtlIHJlbmRlciwgaXQgc2hvdWxkIGdldCBpZ25vcmVkLlxuICBpZiAoICFmbiB8fCByZWVudHJ5KSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAge1xuICAgIHZhciBmcmFtZSA9IGNvbXBvbmVudEZyYW1lQ2FjaGUuZ2V0KGZuKTtcblxuICAgIGlmIChmcmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbnRyb2w7XG4gIHJlZW50cnkgPSB0cnVlO1xuICB2YXIgcHJldmlvdXNQcmVwYXJlU3RhY2tUcmFjZSA9IEVycm9yLnByZXBhcmVTdGFja1RyYWNlOyAvLyAkRmxvd0ZpeE1lIEl0IGRvZXMgYWNjZXB0IHVuZGVmaW5lZC5cblxuICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHVuZGVmaW5lZDtcbiAgdmFyIHByZXZpb3VzRGlzcGF0Y2hlcjtcblxuICB7XG4gICAgcHJldmlvdXNEaXNwYXRjaGVyID0gUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50OyAvLyBTZXQgdGhlIGRpc3BhdGNoZXIgaW4gREVWIGJlY2F1c2UgdGhpcyBtaWdodCBiZSBjYWxsIGluIHRoZSByZW5kZXIgZnVuY3Rpb25cbiAgICAvLyBmb3Igd2FybmluZ3MuXG5cbiAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQgPSBudWxsO1xuICAgIGRpc2FibGVMb2dzKCk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFRoaXMgc2hvdWxkIHRocm93LlxuICAgIGlmIChjb25zdHJ1Y3QpIHtcbiAgICAgIC8vIFNvbWV0aGluZyBzaG91bGQgYmUgc2V0dGluZyB0aGUgcHJvcHMgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgdmFyIEZha2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9OyAvLyAkRmxvd0ZpeE1lXG5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZha2UucHJvdG90eXBlLCAncHJvcHMnLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIFdlIHVzZSBhIHRocm93aW5nIHNldHRlciBpbnN0ZWFkIG9mIGZyb3plbiBvciBub24td3JpdGFibGUgcHJvcHNcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoYXQgd29uJ3QgdGhyb3cgaW4gYSBub24tc3RyaWN0IG1vZGUgZnVuY3Rpb24uXG4gICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgJiYgUmVmbGVjdC5jb25zdHJ1Y3QpIHtcbiAgICAgICAgLy8gV2UgY29uc3RydWN0IGEgZGlmZmVyZW50IGNvbnRyb2wgZm9yIHRoaXMgY2FzZSB0byBpbmNsdWRlIGFueSBleHRyYVxuICAgICAgICAvLyBmcmFtZXMgYWRkZWQgYnkgdGhlIGNvbnN0cnVjdCBjYWxsLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIFJlZmxlY3QuY29uc3RydWN0KEZha2UsIFtdKTtcbiAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgICB9XG5cbiAgICAgICAgUmVmbGVjdC5jb25zdHJ1Y3QoZm4sIFtdLCBGYWtlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgRmFrZS5jYWxsKCk7XG4gICAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgICBjb250cm9sID0geDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZuLmNhbGwoRmFrZS5wcm90b3R5cGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICBjb250cm9sID0geDtcbiAgICAgIH1cblxuICAgICAgZm4oKTtcbiAgICB9XG4gIH0gY2F0Y2ggKHNhbXBsZSkge1xuICAgIC8vIFRoaXMgaXMgaW5saW5lZCBtYW51YWxseSBiZWNhdXNlIGNsb3N1cmUgZG9lc24ndCBkbyBpdCBmb3IgdXMuXG4gICAgaWYgKHNhbXBsZSAmJiBjb250cm9sICYmIHR5cGVvZiBzYW1wbGUuc3RhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBUaGlzIGV4dHJhY3RzIHRoZSBmaXJzdCBmcmFtZSBmcm9tIHRoZSBzYW1wbGUgdGhhdCBpc24ndCBhbHNvIGluIHRoZSBjb250cm9sLlxuICAgICAgLy8gU2tpcHBpbmcgb25lIGZyYW1lIHRoYXQgd2UgYXNzdW1lIGlzIHRoZSBmcmFtZSB0aGF0IGNhbGxzIHRoZSB0d28uXG4gICAgICB2YXIgc2FtcGxlTGluZXMgPSBzYW1wbGUuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgdmFyIGNvbnRyb2xMaW5lcyA9IGNvbnRyb2wuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgdmFyIHMgPSBzYW1wbGVMaW5lcy5sZW5ndGggLSAxO1xuICAgICAgdmFyIGMgPSBjb250cm9sTGluZXMubGVuZ3RoIC0gMTtcblxuICAgICAgd2hpbGUgKHMgPj0gMSAmJiBjID49IDAgJiYgc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAvLyBXZSBleHBlY3QgYXQgbGVhc3Qgb25lIHN0YWNrIGZyYW1lIHRvIGJlIHNoYXJlZC5cbiAgICAgICAgLy8gVHlwaWNhbGx5IHRoaXMgd2lsbCBiZSB0aGUgcm9vdCBtb3N0IG9uZS4gSG93ZXZlciwgc3RhY2sgZnJhbWVzIG1heSBiZVxuICAgICAgICAvLyBjdXQgb2ZmIGR1ZSB0byBtYXhpbXVtIHN0YWNrIGxpbWl0cy4gSW4gdGhpcyBjYXNlLCBvbmUgbWF5YmUgY3V0IG9mZlxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdGhlIG90aGVyLiBXZSBhc3N1bWUgdGhhdCB0aGUgc2FtcGxlIGlzIGxvbmdlciBvciB0aGUgc2FtZVxuICAgICAgICAvLyBhbmQgdGhlcmUgZm9yIGN1dCBvZmYgZWFybGllci4gU28gd2Ugc2hvdWxkIGZpbmQgdGhlIHJvb3QgbW9zdCBmcmFtZSBpblxuICAgICAgICAvLyB0aGUgc2FtcGxlIHNvbWV3aGVyZSBpbiB0aGUgY29udHJvbC5cbiAgICAgICAgYy0tO1xuICAgICAgfVxuXG4gICAgICBmb3IgKDsgcyA+PSAxICYmIGMgPj0gMDsgcy0tLCBjLS0pIHtcbiAgICAgICAgLy8gTmV4dCB3ZSBmaW5kIHRoZSBmaXJzdCBvbmUgdGhhdCBpc24ndCB0aGUgc2FtZSB3aGljaCBzaG91bGQgYmUgdGhlXG4gICAgICAgIC8vIGZyYW1lIHRoYXQgY2FsbGVkIG91ciBzYW1wbGUgZnVuY3Rpb24gYW5kIHRoZSBjb250cm9sLlxuICAgICAgICBpZiAoc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgIC8vIEluIFY4LCB0aGUgZmlyc3QgbGluZSBpcyBkZXNjcmliaW5nIHRoZSBtZXNzYWdlIGJ1dCBvdGhlciBWTXMgZG9uJ3QuXG4gICAgICAgICAgLy8gSWYgd2UncmUgYWJvdXQgdG8gcmV0dXJuIHRoZSBmaXJzdCBsaW5lLCBhbmQgdGhlIGNvbnRyb2wgaXMgYWxzbyBvbiB0aGUgc2FtZVxuICAgICAgICAgIC8vIGxpbmUsIHRoYXQncyBhIHByZXR0eSBnb29kIGluZGljYXRvciB0aGF0IG91ciBzYW1wbGUgdGhyZXcgYXQgc2FtZSBsaW5lIGFzXG4gICAgICAgICAgLy8gdGhlIGNvbnRyb2wuIEkuZS4gYmVmb3JlIHdlIGVudGVyZWQgdGhlIHNhbXBsZSBmcmFtZS4gU28gd2UgaWdub3JlIHRoaXMgcmVzdWx0LlxuICAgICAgICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB5b3UgcGFzc2VkIGEgY2xhc3MgdG8gZnVuY3Rpb24gY29tcG9uZW50LCBvciBub24tZnVuY3Rpb24uXG4gICAgICAgICAgaWYgKHMgIT09IDEgfHwgYyAhPT0gMSkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICBzLS07XG4gICAgICAgICAgICAgIGMtLTsgLy8gV2UgbWF5IHN0aWxsIGhhdmUgc2ltaWxhciBpbnRlcm1lZGlhdGUgZnJhbWVzIGZyb20gdGhlIGNvbnN0cnVjdCBjYWxsLlxuICAgICAgICAgICAgICAvLyBUaGUgbmV4dCBvbmUgdGhhdCBpc24ndCB0aGUgc2FtZSBzaG91bGQgYmUgb3VyIG1hdGNoIHRob3VnaC5cblxuICAgICAgICAgICAgICBpZiAoYyA8IDAgfHwgc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgICAgICAgIC8vIFY4IGFkZHMgYSBcIm5ld1wiIHByZWZpeCBmb3IgbmF0aXZlIGNsYXNzZXMuIExldCdzIHJlbW92ZSBpdCB0byBtYWtlIGl0IHByZXR0aWVyLlxuICAgICAgICAgICAgICAgIHZhciBfZnJhbWUgPSAnXFxuJyArIHNhbXBsZUxpbmVzW3NdLnJlcGxhY2UoJyBhdCBuZXcgJywgJyBhdCAnKTsgLy8gSWYgb3VyIGNvbXBvbmVudCBmcmFtZSBpcyBsYWJlbGVkIFwiPGFub255bW91cz5cIlxuICAgICAgICAgICAgICAgIC8vIGJ1dCB3ZSBoYXZlIGEgdXNlci1wcm92aWRlZCBcImRpc3BsYXlOYW1lXCJcbiAgICAgICAgICAgICAgICAvLyBzcGxpY2UgaXQgaW4gdG8gbWFrZSB0aGUgc3RhY2sgbW9yZSByZWFkYWJsZS5cblxuXG4gICAgICAgICAgICAgICAgaWYgKGZuLmRpc3BsYXlOYW1lICYmIF9mcmFtZS5pbmNsdWRlcygnPGFub255bW91cz4nKSkge1xuICAgICAgICAgICAgICAgICAgX2ZyYW1lID0gX2ZyYW1lLnJlcGxhY2UoJzxhbm9ueW1vdXM+JywgZm4uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50RnJhbWVDYWNoZS5zZXQoZm4sIF9mcmFtZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAvLyBSZXR1cm4gdGhlIGxpbmUgd2UgZm91bmQuXG5cblxuICAgICAgICAgICAgICAgIHJldHVybiBfZnJhbWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKHMgPj0gMSAmJiBjID49IDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIHJlZW50cnkgPSBmYWxzZTtcblxuICAgIHtcbiAgICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudCA9IHByZXZpb3VzRGlzcGF0Y2hlcjtcbiAgICAgIHJlZW5hYmxlTG9ncygpO1xuICAgIH1cblxuICAgIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gcHJldmlvdXNQcmVwYXJlU3RhY2tUcmFjZTtcbiAgfSAvLyBGYWxsYmFjayB0byBqdXN0IHVzaW5nIHRoZSBuYW1lIGlmIHdlIGNvdWxkbid0IG1ha2UgaXQgdGhyb3cuXG5cblxuICB2YXIgbmFtZSA9IGZuID8gZm4uZGlzcGxheU5hbWUgfHwgZm4ubmFtZSA6ICcnO1xuICB2YXIgc3ludGhldGljRnJhbWUgPSBuYW1lID8gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUobmFtZSkgOiAnJztcblxuICB7XG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29tcG9uZW50RnJhbWVDYWNoZS5zZXQoZm4sIHN5bnRoZXRpY0ZyYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3ludGhldGljRnJhbWU7XG59XG5mdW5jdGlvbiBkZXNjcmliZUZ1bmN0aW9uQ29tcG9uZW50RnJhbWUoZm4sIHNvdXJjZSwgb3duZXJGbikge1xuICB7XG4gICAgcmV0dXJuIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUoZm4sIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRDb25zdHJ1Y3QoQ29tcG9uZW50KSB7XG4gIHZhciBwcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuICByZXR1cm4gISEocHJvdG90eXBlICYmIHByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKHR5cGUsIHNvdXJjZSwgb3duZXJGbikge1xuXG4gIGlmICh0eXBlID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB7XG4gICAgICByZXR1cm4gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZSh0eXBlLCBzaG91bGRDb25zdHJ1Y3QodHlwZSkpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUodHlwZSk7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUoJ1N1c3BlbnNlJyk7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSgnU3VzcGVuc2VMaXN0Jyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBkZXNjcmliZUZ1bmN0aW9uQ29tcG9uZW50RnJhbWUodHlwZS5yZW5kZXIpO1xuXG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgLy8gTWVtbyBtYXkgY29udGFpbiBhbnkgY29tcG9uZW50IHR5cGUgc28gd2UgcmVjdXJzaXZlbHkgcmVzb2x2ZSBpdC5cbiAgICAgICAgcmV0dXJuIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVih0eXBlLnR5cGUsIHNvdXJjZSwgb3duZXJGbik7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGxhenlDb21wb25lbnQgPSB0eXBlO1xuICAgICAgICAgIHZhciBwYXlsb2FkID0gbGF6eUNvbXBvbmVudC5fcGF5bG9hZDtcbiAgICAgICAgICB2YXIgaW5pdCA9IGxhenlDb21wb25lbnQuX2luaXQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTGF6eSBtYXkgY29udGFpbiBhbnkgY29tcG9uZW50IHR5cGUgc28gd2UgcmVjdXJzaXZlbHkgcmVzb2x2ZSBpdC5cbiAgICAgICAgICAgIHJldHVybiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYoaW5pdChwYXlsb2FkKSwgc291cmNlLCBvd25lckZuKTtcbiAgICAgICAgICB9IGNhdGNoICh4KSB7fVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgIHZhciBzdGFjayA9IGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihlbGVtZW50LnR5cGUsIGVsZW1lbnQuX3NvdXJjZSwgb3duZXIgPyBvd25lci50eXBlIDogbnVsbCk7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLnNldEV4dHJhU3RhY2tGcmFtZShzdGFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuc2V0RXh0cmFTdGFja0ZyYW1lKG51bGwpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGVsZW1lbnQpIHtcbiAge1xuICAgIC8vICRGbG93Rml4TWUgVGhpcyBpcyBva2F5IGJ1dCBGbG93IGRvZXNuJ3Qga25vdyBpdC5cbiAgICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKGhhc093blByb3BlcnR5KTtcblxuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvciQxID0gdm9pZCAwOyAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvcHJvZC1lcnJvci1jb2Rlc1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLicgKyAnVGhpcyBvZnRlbiBoYXBwZW5zIGJlY2F1c2Ugb2YgdHlwb3Mgc3VjaCBhcyBgUHJvcFR5cGVzLmZ1bmN0aW9uYCBpbnN0ZWFkIG9mIGBQcm9wVHlwZXMuZnVuY2AuJyk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlcnJvciQxID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciQxID0gZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IkMSAmJiAhKGVycm9yJDEgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICAgIGVycm9yKCclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzJyArICcgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yJDEpO1xuXG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IkMSBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IkMS5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvciQxLm1lc3NhZ2VdID0gdHJ1ZTtcbiAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICAgIGVycm9yKCdGYWlsZWQgJXMgdHlwZTogJXMnLCBsb2NhdGlvbiwgZXJyb3IkMS5tZXNzYWdlKTtcblxuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBpc0FycmF5SW1wbCA9IEFycmF5LmlzQXJyYXk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcblxuZnVuY3Rpb24gaXNBcnJheShhKSB7XG4gIHJldHVybiBpc0FycmF5SW1wbChhKTtcbn1cblxuLypcbiAqIFRoZSBgJycgKyB2YWx1ZWAgcGF0dGVybiAodXNlZCBpbiBpbiBwZXJmLXNlbnNpdGl2ZSBjb2RlKSB0aHJvd3MgZm9yIFN5bWJvbFxuICogYW5kIFRlbXBvcmFsLiogdHlwZXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC8yMjA2NC5cbiAqXG4gKiBUaGUgZnVuY3Rpb25zIGluIHRoaXMgbW9kdWxlIHdpbGwgdGhyb3cgYW4gZWFzaWVyLXRvLXVuZGVyc3RhbmQsXG4gKiBlYXNpZXItdG8tZGVidWcgZXhjZXB0aW9uIHdpdGggYSBjbGVhciBlcnJvcnMgbWVzc2FnZSBtZXNzYWdlIGV4cGxhaW5pbmcgdGhlXG4gKiBwcm9ibGVtLiAoSW5zdGVhZCBvZiBhIGNvbmZ1c2luZyBleGNlcHRpb24gdGhyb3duIGluc2lkZSB0aGUgaW1wbGVtZW50YXRpb25cbiAqIG9mIHRoZSBgdmFsdWVgIG9iamVjdCkuXG4gKi9cbi8vICRGbG93Rml4TWUgb25seSBjYWxsZWQgaW4gREVWLCBzbyB2b2lkIHJldHVybiBpcyBub3QgcG9zc2libGUuXG5mdW5jdGlvbiB0eXBlTmFtZSh2YWx1ZSkge1xuICB7XG4gICAgLy8gdG9TdHJpbmdUYWcgaXMgbmVlZGVkIGZvciBuYW1lc3BhY2VkIHR5cGVzIGxpa2UgVGVtcG9yYWwuSW5zdGFudFxuICAgIHZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLnRvU3RyaW5nVGFnO1xuICAgIHZhciB0eXBlID0gaGFzVG9TdHJpbmdUYWcgJiYgdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIHx8ICdPYmplY3QnO1xuICAgIHJldHVybiB0eXBlO1xuICB9XG59IC8vICRGbG93Rml4TWUgb25seSBjYWxsZWQgaW4gREVWLCBzbyB2b2lkIHJldHVybiBpcyBub3QgcG9zc2libGUuXG5cblxuZnVuY3Rpb24gd2lsbENvZXJjaW9uVGhyb3codmFsdWUpIHtcbiAge1xuICAgIHRyeSB7XG4gICAgICB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgLy8gSWYgeW91IGVuZGVkIHVwIGhlcmUgYnkgZm9sbG93aW5nIGFuIGV4Y2VwdGlvbiBjYWxsIHN0YWNrLCBoZXJlJ3Mgd2hhdCdzXG4gIC8vIGhhcHBlbmVkOiB5b3Ugc3VwcGxpZWQgYW4gb2JqZWN0IG9yIHN5bWJvbCB2YWx1ZSB0byBSZWFjdCAoYXMgYSBwcm9wLCBrZXksXG4gIC8vIERPTSBhdHRyaWJ1dGUsIENTUyBwcm9wZXJ0eSwgc3RyaW5nIHJlZiwgZXRjLikgYW5kIHdoZW4gUmVhY3QgdHJpZWQgdG9cbiAgLy8gY29lcmNlIGl0IHRvIGEgc3RyaW5nIHVzaW5nIGAnJyArIHZhbHVlYCwgYW4gZXhjZXB0aW9uIHdhcyB0aHJvd24uXG4gIC8vXG4gIC8vIFRoZSBtb3N0IGNvbW1vbiB0eXBlcyB0aGF0IHdpbGwgY2F1c2UgdGhpcyBleGNlcHRpb24gYXJlIGBTeW1ib2xgIGluc3RhbmNlc1xuICAvLyBhbmQgVGVtcG9yYWwgb2JqZWN0cyBsaWtlIGBUZW1wb3JhbC5JbnN0YW50YC4gQnV0IGFueSBvYmplY3QgdGhhdCBoYXMgYVxuICAvLyBgdmFsdWVPZmAgb3IgYFtTeW1ib2wudG9QcmltaXRpdmVdYCBtZXRob2QgdGhhdCB0aHJvd3Mgd2lsbCBhbHNvIGNhdXNlIHRoaXNcbiAgLy8gZXhjZXB0aW9uLiAoTGlicmFyeSBhdXRob3JzIGRvIHRoaXMgdG8gcHJldmVudCB1c2VycyBmcm9tIHVzaW5nIGJ1aWx0LWluXG4gIC8vIG51bWVyaWMgb3BlcmF0b3JzIGxpa2UgYCtgIG9yIGNvbXBhcmlzb24gb3BlcmF0b3JzIGxpa2UgYD49YCBiZWNhdXNlIGN1c3RvbVxuICAvLyBtZXRob2RzIGFyZSBuZWVkZWQgdG8gcGVyZm9ybSBhY2N1cmF0ZSBhcml0aG1ldGljIG9yIGNvbXBhcmlzb24uKVxuICAvL1xuICAvLyBUbyBmaXggdGhlIHByb2JsZW0sIGNvZXJjZSB0aGlzIG9iamVjdCBvciBzeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcgYmVmb3JlXG4gIC8vIHBhc3NpbmcgaXQgdG8gUmVhY3QuIFRoZSBtb3N0IHJlbGlhYmxlIHdheSBpcyB1c3VhbGx5IGBTdHJpbmcodmFsdWUpYC5cbiAgLy9cbiAgLy8gVG8gZmluZCB3aGljaCB2YWx1ZSBpcyB0aHJvd2luZywgY2hlY2sgdGhlIGJyb3dzZXIgb3IgZGVidWdnZXIgY29uc29sZS5cbiAgLy8gQmVmb3JlIHRoaXMgZXhjZXB0aW9uIHdhcyB0aHJvd24sIHRoZXJlIHNob3VsZCBiZSBgY29uc29sZS5lcnJvcmAgb3V0cHV0XG4gIC8vIHRoYXQgc2hvd3MgdGhlIHR5cGUgKFN5bWJvbCwgVGVtcG9yYWwuUGxhaW5EYXRlLCBldGMuKSB0aGF0IGNhdXNlZCB0aGVcbiAgLy8gcHJvYmxlbSBhbmQgaG93IHRoYXQgdHlwZSB3YXMgdXNlZDoga2V5LCBhdHJyaWJ1dGUsIGlucHV0IHZhbHVlIHByb3AsIGV0Yy5cbiAgLy8gSW4gbW9zdCBjYXNlcywgdGhpcyBjb25zb2xlIG91dHB1dCBhbHNvIHNob3dzIHRoZSBjb21wb25lbnQgYW5kIGl0c1xuICAvLyBhbmNlc3RvciBjb21wb25lbnRzIHdoZXJlIHRoZSBleGNlcHRpb24gaGFwcGVuZWQuXG4gIC8vXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuICByZXR1cm4gJycgKyB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAge1xuICAgIGlmICh3aWxsQ29lcmNpb25UaHJvdyh2YWx1ZSkpIHtcbiAgICAgIGVycm9yKCdUaGUgcHJvdmlkZWQga2V5IGlzIGFuIHVuc3VwcG9ydGVkIHR5cGUgJXMuJyArICcgVGhpcyB2YWx1ZSBtdXN0IGJlIGNvZXJjZWQgdG8gYSBzdHJpbmcgYmVmb3JlIGJlZm9yZSB1c2luZyBpdCBoZXJlLicsIHR5cGVOYW1lKHZhbHVlKSk7XG5cbiAgICAgIHJldHVybiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpOyAvLyB0aHJvdyAodG8gaGVscCBjYWxsZXJzIGZpbmQgdHJvdWJsZXNob290aW5nIGNvbW1lbnRzKVxuICAgIH1cbiAgfVxufVxuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdEN1cnJlbnRPd25lcjtcbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd247XG52YXIgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG52YXIgZGlkV2FybkFib3V0U3RyaW5nUmVmcztcblxue1xuICBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzID0ge307XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcblxuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcblxuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdhcm5JZlN0cmluZ1JlZkNhbm5vdEJlQXV0b0NvbnZlcnRlZChjb25maWcsIHNlbGYpIHtcbiAge1xuICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZiA9PT0gJ3N0cmluZycgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCAmJiBzZWxmICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuc3RhdGVOb2RlICE9PSBzZWxmKSB7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpO1xuXG4gICAgICBpZiAoIWRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgZXJyb3IoJ0NvbXBvbmVudCBcIiVzXCIgY29udGFpbnMgdGhlIHN0cmluZyByZWYgXCIlc1wiLiAnICsgJ1N1cHBvcnQgZm9yIHN0cmluZyByZWZzIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiAnICsgJ1RoaXMgY2FzZSBjYW5ub3QgYmUgYXV0b21hdGljYWxseSBjb252ZXJ0ZWQgdG8gYW4gYXJyb3cgZnVuY3Rpb24uICcgKyAnV2UgYXNrIHlvdSB0byBtYW51YWxseSBmaXggdGhpcyBjYXNlIGJ5IHVzaW5nIHVzZVJlZigpIG9yIGNyZWF0ZVJlZigpIGluc3RlYWQuICcgKyAnTGVhcm4gbW9yZSBhYm91dCB1c2luZyByZWZzIHNhZmVseSBoZXJlOiAnICsgJ2h0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9zdHJpY3QtbW9kZS1zdHJpbmctcmVmJywgZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQudHlwZSksIGNvbmZpZy5yZWYpO1xuXG4gICAgICAgIGRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAge1xuICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcblxuICAgICAgICBlcnJvcignJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAge1xuICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcblxuICAgICAgICBlcnJvcignJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgbm90IHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQGludGVybmFsXG4gKi9cblxuXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvd3MgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307IC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7IC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc2VsZlxuICAgIH0pOyAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0pO1xuXG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcbi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmZjcy9wdWxsLzEwN1xuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqL1xuXG5mdW5jdGlvbiBqc3hERVYodHlwZSwgY29uZmlnLCBtYXliZUtleSwgc291cmNlLCBzZWxmKSB7XG4gIHtcbiAgICB2YXIgcHJvcE5hbWU7IC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcblxuICAgIHZhciBwcm9wcyA9IHt9O1xuICAgIHZhciBrZXkgPSBudWxsO1xuICAgIHZhciByZWYgPSBudWxsOyAvLyBDdXJyZW50bHksIGtleSBjYW4gYmUgc3ByZWFkIGluIGFzIGEgcHJvcC4gVGhpcyBjYXVzZXMgYSBwb3RlbnRpYWxcbiAgICAvLyBpc3N1ZSBpZiBrZXkgaXMgYWxzbyBleHBsaWNpdGx5IGRlY2xhcmVkIChpZS4gPGRpdiB7Li4ucHJvcHN9IGtleT1cIkhpXCIgLz5cbiAgICAvLyBvciA8ZGl2IGtleT1cIkhpXCIgey4uLnByb3BzfSAvPiApLiBXZSB3YW50IHRvIGRlcHJlY2F0ZSBrZXkgc3ByZWFkLFxuICAgIC8vIGJ1dCBhcyBhbiBpbnRlcm1lZGlhcnkgc3RlcCwgd2Ugd2lsbCB1c2UganN4REVWIGZvciBldmVyeXRoaW5nIGV4Y2VwdFxuICAgIC8vIDxkaXYgey4uLnByb3BzfSBrZXk9XCJIaVwiIC8+LCBiZWNhdXNlIHdlIGFyZW4ndCBjdXJyZW50bHkgYWJsZSB0byB0ZWxsIGlmXG4gICAgLy8ga2V5IGlzIGV4cGxpY2l0bHkgZGVjbGFyZWQgdG8gYmUgdW5kZWZpbmVkIG9yIG5vdC5cblxuICAgIGlmIChtYXliZUtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB7XG4gICAgICAgIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24obWF5YmVLZXkpO1xuICAgICAgfVxuXG4gICAgICBrZXkgPSAnJyArIG1heWJlS2V5O1xuICAgIH1cblxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICB7XG4gICAgICAgIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oY29uZmlnLmtleSk7XG4gICAgICB9XG5cbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIHdhcm5JZlN0cmluZ1JlZkNhbm5vdEJlQXV0b0NvbnZlcnRlZChjb25maWcsIHNlbGYpO1xuICAgIH0gLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuXG5cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH0gLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG5cblxuICAgIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG5cbiAgICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbiAgfVxufVxuXG52YXIgUmVhY3RDdXJyZW50T3duZXIkMSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudE93bmVyO1xudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZWxlbWVudCkge1xuICB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuICAgICAgdmFyIHN0YWNrID0gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGVsZW1lbnQudHlwZSwgZWxlbWVudC5fc291cmNlLCBvd25lciA/IG93bmVyLnR5cGUgOiBudWxsKTtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5zZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuc2V0RXh0cmFTdGFja0ZyYW1lKG51bGwpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd247XG5cbntcbiAgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSBmYWxzZTtcbn1cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgUmVhY3RFbGVtZW50LlxuICogQGZpbmFsXG4gKi9cblxuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICB7XG4gICAgaWYgKFJlYWN0Q3VycmVudE93bmVyJDEuY3VycmVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIkMS5jdXJyZW50LnR5cGUpO1xuXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKHNvdXJjZSkge1xuICB7XG4gICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgZmlsZU5hbWUgPSBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgeW91ciBjb2RlIGF0ICcgKyBmaWxlTmFtZSArICc6JyArIGxpbmVOdW1iZXIgKyAnLic7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xuXG5cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHtcbiAgICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcblxuICAgICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgICAgaW5mbyA9IFwiXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8XCIgKyBwYXJlbnROYW1lICsgXCI+LlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmZvO1xuICB9XG59XG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIHtcbiAgICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG5cbiAgICBpZiAob3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTsgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gICAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuXG4gICAgdmFyIGNoaWxkT3duZXIgPSAnJztcblxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lciQxLmN1cnJlbnQpIHtcbiAgICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgICAgY2hpbGRPd25lciA9IFwiIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tIFwiICsgZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKGVsZW1lbnQuX293bmVyLnR5cGUpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShlbGVtZW50KTtcblxuICAgIGVycm9yKCdFYWNoIGNoaWxkIGluIGEgbGlzdCBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL3JlYWN0anMub3JnL2xpbmsvd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLicsIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8sIGNoaWxkT3duZXIpO1xuXG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShudWxsKTtcbiAgfVxufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIHtcbiAgICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkobm9kZSkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIEVudHJ5IGl0ZXJhdG9ycyB1c2VkIHRvIHByb3ZpZGUgaW1wbGljaXQga2V5cyxcbiAgICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG5cbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHtcbiAgICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcblxuICAgIGlmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcHJvcFR5cGVzO1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCAvLyBOb3RlOiBNZW1vIG9ubHkgY2hlY2tzIG91dGVyIHByb3BzIGhlcmUuXG4gICAgLy8gSW5uZXIgcHJvcHMgYXJlIGNoZWNrZWQgaW4gdGhlIHJlY29uY2lsZXIuXG4gICAgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFKSkge1xuICAgICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocHJvcFR5cGVzKSB7XG4gICAgICAvLyBJbnRlbnRpb25hbGx5IGluc2lkZSB0byBhdm9pZCB0cmlnZ2VyaW5nIGxhenkgaW5pdGlhbGl6ZXJzOlxuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG4gICAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgZWxlbWVudCk7XG4gICAgfSBlbHNlIGlmICh0eXBlLlByb3BUeXBlcyAhPT0gdW5kZWZpbmVkICYmICFwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bikge1xuICAgICAgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSB0cnVlOyAvLyBJbnRlbnRpb25hbGx5IGluc2lkZSB0byBhdm9pZCB0cmlnZ2VyaW5nIGxhenkgaW5pdGlhbGl6ZXJzOlxuXG4gICAgICB2YXIgX25hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG5cbiAgICAgIGVycm9yKCdDb21wb25lbnQgJXMgZGVjbGFyZWQgYFByb3BUeXBlc2AgaW5zdGVhZCBvZiBgcHJvcFR5cGVzYC4gRGlkIHlvdSBtaXNzcGVsbCB0aGUgcHJvcGVydHkgYXNzaWdubWVudD8nLCBfbmFtZSB8fCAnVW5rbm93bicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdHlwZS5nZXREZWZhdWx0UHJvcHMgPT09ICdmdW5jdGlvbicgJiYgIXR5cGUuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkKSB7XG4gICAgICBlcnJvcignZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpO1xuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBHaXZlbiBhIGZyYWdtZW50LCB2YWxpZGF0ZSB0aGF0IGl0IGNhbiBvbmx5IGJlIHByb3ZpZGVkIHdpdGggZnJhZ21lbnQgcHJvcHNcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBmcmFnbWVudFxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVGcmFnbWVudFByb3BzKGZyYWdtZW50KSB7XG4gIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50LnByb3BzKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYga2V5ICE9PSAna2V5Jykge1xuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGZyYWdtZW50KTtcblxuICAgICAgICBlcnJvcignSW52YWxpZCBwcm9wIGAlc2Agc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4gJyArICdSZWFjdC5GcmFnbWVudCBjYW4gb25seSBoYXZlIGBrZXlgIGFuZCBgY2hpbGRyZW5gIHByb3BzLicsIGtleSk7XG5cbiAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShudWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZyYWdtZW50LnJlZiAhPT0gbnVsbCkge1xuICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShmcmFnbWVudCk7XG5cbiAgICAgIGVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBgcmVmYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLicpO1xuXG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgZGlkV2FybkFib3V0S2V5U3ByZWFkID0ge307XG5mdW5jdGlvbiBqc3hXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywga2V5LCBpc1N0YXRpY0NoaWxkcmVuLCBzb3VyY2UsIHNlbGYpIHtcbiAge1xuICAgIHZhciB2YWxpZFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSk7IC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cblxuICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICB2YXIgaW5mbyA9ICcnO1xuXG4gICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgICAgfVxuXG4gICAgICB2YXIgc291cmNlSW5mbyA9IGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKHNvdXJjZSk7XG5cbiAgICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICAgIGluZm8gKz0gc291cmNlSW5mbztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0eXBlU3RyaW5nO1xuXG4gICAgICBpZiAodHlwZSA9PT0gbnVsbCkge1xuICAgICAgICB0eXBlU3RyaW5nID0gJ251bGwnO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHR5cGUpKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSAnYXJyYXknO1xuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSBcIjxcIiArIChnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZS50eXBlKSB8fCAnVW5rbm93bicpICsgXCIgLz5cIjtcbiAgICAgICAgaW5mbyA9ICcgRGlkIHlvdSBhY2NpZGVudGFsbHkgZXhwb3J0IGEgSlNYIGxpdGVyYWwgaW5zdGVhZCBvZiBhIGNvbXBvbmVudD8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZVN0cmluZyA9IHR5cGVvZiB0eXBlO1xuICAgICAgfVxuXG4gICAgICBlcnJvcignUmVhY3QuanN4OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGVTdHJpbmcsIGluZm8pO1xuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0ganN4REVWKHR5cGUsIHByb3BzLCBrZXksIHNvdXJjZSwgc2VsZik7IC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuXG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAgIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgICAvLyBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kIHByb2QuXG4gICAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG5cblxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuO1xuXG4gICAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXNTdGF0aWNDaGlsZHJlbikge1xuICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhjaGlsZHJlbltpXSwgdHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvcignUmVhY3QuanN4OiBTdGF0aWMgY2hpbGRyZW4gc2hvdWxkIGFsd2F5cyBiZSBhbiBhcnJheS4gJyArICdZb3UgYXJlIGxpa2VseSBleHBsaWNpdGx5IGNhbGxpbmcgUmVhY3QuanN4cyBvciBSZWFjdC5qc3hERVYuICcgKyAnVXNlIHRoZSBCYWJlbCB0cmFuc2Zvcm0gaW5zdGVhZC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoY2hpbGRyZW4sIHR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwocHJvcHMsICdrZXknKSkge1xuICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgcmV0dXJuIGsgIT09ICdrZXknO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGJlZm9yZUV4YW1wbGUgPSBrZXlzLmxlbmd0aCA+IDAgPyAne2tleTogc29tZUtleSwgJyArIGtleXMuam9pbignOiAuLi4sICcpICsgJzogLi4ufScgOiAne2tleTogc29tZUtleX0nO1xuXG4gICAgICAgIGlmICghZGlkV2FybkFib3V0S2V5U3ByZWFkW2NvbXBvbmVudE5hbWUgKyBiZWZvcmVFeGFtcGxlXSkge1xuICAgICAgICAgIHZhciBhZnRlckV4YW1wbGUgPSBrZXlzLmxlbmd0aCA+IDAgPyAneycgKyBrZXlzLmpvaW4oJzogLi4uLCAnKSArICc6IC4uLn0nIDogJ3t9JztcblxuICAgICAgICAgIGVycm9yKCdBIHByb3BzIG9iamVjdCBjb250YWluaW5nIGEgXCJrZXlcIiBwcm9wIGlzIGJlaW5nIHNwcmVhZCBpbnRvIEpTWDpcXG4nICsgJyAgbGV0IHByb3BzID0gJXM7XFxuJyArICcgIDwlcyB7Li4ucHJvcHN9IC8+XFxuJyArICdSZWFjdCBrZXlzIG11c3QgYmUgcGFzc2VkIGRpcmVjdGx5IHRvIEpTWCB3aXRob3V0IHVzaW5nIHNwcmVhZDpcXG4nICsgJyAgbGV0IHByb3BzID0gJXM7XFxuJyArICcgIDwlcyBrZXk9e3NvbWVLZXl9IHsuLi5wcm9wc30gLz4nLCBiZWZvcmVFeGFtcGxlLCBjb21wb25lbnROYW1lLCBhZnRlckV4YW1wbGUsIGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgICAgZGlkV2FybkFib3V0S2V5U3ByZWFkW2NvbXBvbmVudE5hbWUgKyBiZWZvcmVFeGFtcGxlXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgICAgdmFsaWRhdGVGcmFnbWVudFByb3BzKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufSAvLyBUaGVzZSB0d28gZnVuY3Rpb25zIGV4aXN0IHRvIHN0aWxsIGdldCBjaGlsZCB3YXJuaW5ncyBpbiBkZXZcbi8vIGV2ZW4gd2l0aCB0aGUgcHJvZCB0cmFuc2Zvcm0uIFRoaXMgbWVhbnMgdGhhdCBqc3hERVYgaXMgcHVyZWx5XG4vLyBvcHQtaW4gYmVoYXZpb3IgZm9yIGJldHRlciBtZXNzYWdlcyBidXQgdGhhdCB3ZSB3b24ndCBzdG9wXG4vLyBnaXZpbmcgeW91IHdhcm5pbmdzIGlmIHlvdSB1c2UgcHJvZHVjdGlvbiBhcGlzLlxuXG5mdW5jdGlvbiBqc3hXaXRoVmFsaWRhdGlvblN0YXRpYyh0eXBlLCBwcm9wcywga2V5KSB7XG4gIHtcbiAgICByZXR1cm4ganN4V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGtleSwgdHJ1ZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGpzeFdpdGhWYWxpZGF0aW9uRHluYW1pYyh0eXBlLCBwcm9wcywga2V5KSB7XG4gIHtcbiAgICByZXR1cm4ganN4V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGtleSwgZmFsc2UpO1xuICB9XG59XG5cbnZhciBqc3ggPSAganN4V2l0aFZhbGlkYXRpb25EeW5hbWljIDsgLy8gd2UgbWF5IHdhbnQgdG8gc3BlY2lhbCBjYXNlIGpzeHMgaW50ZXJuYWxseSB0byB0YWtlIGFkdmFudGFnZSBvZiBzdGF0aWMgY2hpbGRyZW4uXG4vLyBmb3Igbm93IHdlIGNhbiBzaGlwIGlkZW50aWNhbCBwcm9kIGZ1bmN0aW9uc1xuXG52YXIganN4cyA9ICBqc3hXaXRoVmFsaWRhdGlvblN0YXRpYyA7XG5cbmV4cG9ydHMuRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xuZXhwb3J0cy5qc3ggPSBqc3g7XG5leHBvcnRzLmpzeHMgPSBqc3hzO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWpzeC1ydW50aW1lLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWpzeC1ydW50aW1lLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7Z2V0UHJvdG90eXBlT2Z9ID0gT2JqZWN0O1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufVxuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3N9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7YWxsT3duS2V5c309IHt9KSA9PiB7XG4gIGZvckVhY2goYiwgKHZhbCwga2V5KSA9PiB7XG4gICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0sIHthbGxPd25LZXlzfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKFR5cGVkQXJyYXkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gdGhpbmcgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdO1xuXG4gIGNvbnN0IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzdWx0LnZhbHVlO1xuICAgIGZuLmNhbGwob2JqLCBwYWlyWzBdLCBwYWlyWzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcmVndWxhciBleHByZXNzaW9uIGFuZCBhIHN0cmluZywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHRoZSBtYXRjaGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ0V4cCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj59XG4gKi9cbmNvbnN0IG1hdGNoQWxsID0gKHJlZ0V4cCwgc3RyKSA9PiB7XG4gIGxldCBtYXRjaGVzO1xuICBjb25zdCBhcnIgPSBbXTtcblxuICB3aGlsZSAoKG1hdGNoZXMgPSByZWdFeHAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgIGFyci5wdXNoKG1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZyxcbiAgICBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gICAgfVxuICApO1xufTtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoKHtoYXNPd25Qcm9wZXJ0eX0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGxldCByZXQ7XG4gICAgaWYgKChyZXQgPSByZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikpICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gcmV0IHx8IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlID0gK3ZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufVxuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWQgPyAoKHRva2VuLCBjYWxsYmFja3MpID0+IHtcbiAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7c291cmNlLCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKHNvdXJjZSA9PT0gX2dsb2JhbCAmJiBkYXRhID09PSB0b2tlbikge1xuICAgICAgICBjYWxsYmFja3MubGVuZ3RoICYmIGNhbGxiYWNrcy5zaGlmdCgpKCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgX2dsb2JhbC5wb3N0TWVzc2FnZSh0b2tlbiwgXCIqXCIpO1xuICAgIH1cbiAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSkgOiAoY2IpID0+IHNldFRpbWVvdXQoY2IpO1xufSkoXG4gIHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsXG4gIGlzRnVuY3Rpb24oX2dsb2JhbC5wb3N0TWVzc2FnZSlcbik7XG5cbmNvbnN0IGFzYXAgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgIT09ICd1bmRlZmluZWQnID9cbiAgcXVldWVNaWNyb3Rhc2suYmluZChfZ2xvYmFsKSA6ICggdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MubmV4dFRpY2sgfHwgX3NldEltbWVkaWF0ZSk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGUsXG4gIHNldEltbWVkaWF0ZTogX3NldEltbWVkaWF0ZSxcbiAgYXNhcFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICBpZiAocmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiBudWxsO1xuICB9XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0sIHByb3AgPT4ge1xuICAgIHJldHVybiBwcm9wICE9PSAnaXNBeGlvc0Vycm9yJztcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IuY2F1c2UgPSBlcnJvcjtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NFcnJvcjtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbmV4cG9ydCBkZWZhdWx0IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuLy8gdGVtcG9yYXJ5IGhvdGZpeCB0byBhdm9pZCBjaXJjdWxhciByZWZlcmVuY2VzIHVudGlsIEF4aW9zVVJMU2VhcmNoUGFyYW1zIGlzIHJlZmFjdG9yZWRcbmltcG9ydCBQbGF0Zm9ybUZvcm1EYXRhIGZyb20gJy4uL3BsYXRmb3JtL25vZGUvY2xhc3Nlcy9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMuaXNBcnJheSh0aGluZyk7XG59XG5cbi8qKlxuICogSXQgcmVtb3ZlcyB0aGUgYnJhY2tldHMgZnJvbSB0aGUgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIHBhcmFtZXRlci5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IHdpdGhvdXQgdGhlIGJyYWNrZXRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVCcmFja2V0cyhrZXkpIHtcbiAgcmV0dXJuIHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscy50b0ZsYXRPYmplY3QodXRpbHMsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKFBsYXRmb3JtRm9ybURhdGEgfHwgRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscy50b0ZsYXRPYmplY3Qob3B0aW9ucywge1xuICAgIG1ldGFUb2tlbnM6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgaW5kZXhlczogZmFsc2VcbiAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICByZXR1cm4gIXV0aWxzLmlzVW5kZWZpbmVkKHNvdXJjZVtvcHRpb25dKTtcbiAgfSk7XG5cbiAgY29uc3QgbWV0YVRva2VucyA9IG9wdGlvbnMubWV0YVRva2VucztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIGNvbnN0IHZpc2l0b3IgPSBvcHRpb25zLnZpc2l0b3IgfHwgZGVmYXVsdFZpc2l0b3I7XG4gIGNvbnN0IGRvdHMgPSBvcHRpb25zLmRvdHM7XG4gIGNvbnN0IGluZGV4ZXMgPSBvcHRpb25zLmluZGV4ZXM7XG4gIGNvbnN0IF9CbG9iID0gb3B0aW9ucy5CbG9iIHx8IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICghdXNlQmxvYiAmJiB1dGlscy5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHVzZUJsb2IgJiYgdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCB2aXNpdG9yLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5XG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAgICogQHRoaXMge0Zvcm1EYXRhfVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJuIHRydWUgdG8gdmlzaXQgdGhlIGVhY2ggcHJvcCBvZiB0aGUgdmFsdWUgcmVjdXJzaXZlbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRlZmF1bHRWaXNpdG9yKHZhbHVlLCBrZXksIHBhdGgpIHtcbiAgICBsZXQgYXJyID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWUgPyByZW5kZXJLZXkoW2tleV0sIGluZGV4LCBkb3RzKSA6IChpbmRleGVzID09PSBudWxsID8ga2V5IDoga2V5ICsgJ1tdJyksXG4gICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpdGFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc3RhY2sgPSBbXTtcblxuICBjb25zdCBleHBvc2VkSGVscGVycyA9IE9iamVjdC5hc3NpZ24ocHJlZGljYXRlcywge1xuICAgIGRlZmF1bHRWaXNpdG9yLFxuICAgIGNvbnZlcnRWYWx1ZSxcbiAgICBpc1Zpc2l0YWJsZVxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCkge1xuICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIHZpc2l0b3IuY2FsbChcbiAgICAgICAgZm9ybURhdGEsIGVsLCB1dGlscy5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSk7XG4gIH0gOiBlbmNvZGU7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez8ob2JqZWN0fEZ1bmN0aW9uKX0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgXG4gIGNvbnN0IF9lbmNvZGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RlIHx8IGVuY29kZTtcblxuICBpZiAodXRpbHMuaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBzZXJpYWxpemU6IG9wdGlvbnNcbiAgICB9O1xuICB9IFxuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAnb2JqZWN0JyAmJiBuYXZpZ2F0b3IgfHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID0gaGFzQnJvd3NlckVudiAmJlxuICAoIV9uYXZpZ2F0b3IgfHwgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKF9uYXZpZ2F0b3IucHJvZHVjdCkgPCAwKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZiB8fCAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbmV4cG9ydCB7XG4gIGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyRW52LFxuICBfbmF2aWdhdG9yIGFzIG5hdmlnYXRvcixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCBsYXN0QXJncztcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGludm9rZSA9IChhcmdzLCBub3cgPSBEYXRlLm5vdygpKSA9PiB7XG4gICAgdGltZXN0YW1wID0gbm93O1xuICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncylcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBmbHVzaCA9ICgpID0+IGxhc3RBcmdzICYmIGludm9rZShsYXN0QXJncyk7XG5cbiAgcmV0dXJuIFt0aHJvdHRsZWQsIGZsdXNoXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlXG4gICAgfTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9LCBmcmVxKTtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gWyhsb2FkZWQpID0+IHRocm90dGxlZFswXSh7XG4gICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICB0b3RhbCxcbiAgICBsb2FkZWRcbiAgfSksIHRocm90dGxlZFsxXV07XG59XG5cbmV4cG9ydCBjb25zdCBhc3luY0RlY29yYXRvciA9IChmbikgPT4gKC4uLmFyZ3MpID0+IHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICByZXR1cm4gKFxuICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICk7XG59KShcbiAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuKSA6ICgpID0+IHRydWU7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscy5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzLmlzU3RyaW5nKHBhdGgpICYmIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMpIHtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PSBmYWxzZSkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiICwgcHJvcCkgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSxwcm9wLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwsIG5ld0NvbmZpZy5hbGxvd0Fic29sdXRlVXJscyksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbnRlbnRUeXBlO1xuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH0gZWxzZSBpZiAoKGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpKSAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGZpeCBzZW1pY29sb24gZHVwbGljYXRpb24gaXNzdWUgZm9yIFJlYWN0TmF0aXZlIEZvcm1EYXRhIGltcGxlbWVudGF0aW9uXG4gICAgICBjb25zdCBbdHlwZSwgLi4udG9rZW5zXSA9IGNvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKS5tYXAodG9rZW4gPT4gdG9rZW4udHJpbSgpKS5maWx0ZXIoQm9vbGVhbikgOiBbXTtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoW3R5cGUgfHwgJ211bHRpcGFydC9mb3JtLWRhdGEnLCAuLi50b2tlbnNdLmpvaW4oJzsgJykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgd2l0aFhTUkZUb2tlbiAmJiB1dGlscy5pc0Z1bmN0aW9uKHdpdGhYU1JGVG9rZW4pICYmICh3aXRoWFNSRlRva2VuID0gd2l0aFhTUkZUb2tlbihuZXdDb25maWcpKTtcblxuICAgIGlmICh3aXRoWFNSRlRva2VuIHx8ICh3aXRoWFNSRlRva2VuICE9PSBmYWxzZSAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IHhzcmZIZWFkZXJOYW1lICYmIHhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZCh4c3JmQ29va2llTmFtZSk7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgaGVhZGVycy5zZXQoeHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn1cblxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBwYXJzZVByb3RvY29sIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQge3Byb2dyZXNzRXZlbnRSZWR1Y2VyfSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxuZXhwb3J0IGRlZmF1bHQgaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzc30gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZDtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKFxuICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAoW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSkpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGRvd25sb2FkVGhyb3R0bGVkKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmIChvblVwbG9hZFByb2dyZXNzICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICAoW3VwbG9hZFRocm90dGxlZCwgZmx1c2hVcGxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcykpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmbHVzaFVwbG9hZCk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSBcIi4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGNvbnN0IHtsZW5ndGh9ID0gKHNpZ25hbHMgPSBzaWduYWxzID8gc2lnbmFscy5maWx0ZXIoQm9vbGVhbikgOiBbXSk7XG5cbiAgaWYgKHRpbWVvdXQgfHwgbGVuZ3RoKSB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBsZXQgYWJvcnRlZDtcblxuICAgIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBpZiAoIWFib3J0ZWQpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGNvbnN0IGVyciA9IHJlYXNvbiBpbnN0YW5jZW9mIEVycm9yID8gcmVhc29uIDogdGhpcy5yZWFzb247XG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvciA/IGVyciA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCAke3RpbWVvdXR9IG9mIG1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKVxuICAgIH0sIHRpbWVvdXQpXG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICAgIGlmIChzaWduYWxzKSB7XG4gICAgICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICAgICAgc2lnbmFsLnVuc3Vic2NyaWJlID8gc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpIDogc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzaWduYWxzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gICAgY29uc3Qge3NpZ25hbH0gPSBjb250cm9sbGVyO1xuXG4gICAgc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdXRpbHMuYXNhcCh1bnN1YnNjcmliZSk7XG5cbiAgICByZXR1cm4gc2lnbmFsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiXG5leHBvcnQgY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkU3RyZWFtKGl0ZXJhYmxlKSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhjaHVuaywgY2h1bmtTaXplKTtcbiAgfVxufVxuXG5jb25zdCByZWFkU3RyZWFtID0gYXN5bmMgZnVuY3Rpb24qIChzdHJlYW0pIHtcbiAgaWYgKHN0cmVhbVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0pIHtcbiAgICB5aWVsZCogc3RyZWFtO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgdHJ5IHtcbiAgICBmb3IgKDs7KSB7XG4gICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IHJlYWRlci5jYW5jZWwoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdHJhY2tTdHJlYW0gPSAoc3RyZWFtLCBjaHVua1NpemUsIG9uUHJvZ3Jlc3MsIG9uRmluaXNoKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplKTtcblxuICBsZXQgYnl0ZXMgPSAwO1xuICBsZXQgZG9uZTtcbiAgbGV0IF9vbkZpbmlzaCA9IChlKSA9PiB7XG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIG9uRmluaXNoICYmIG9uRmluaXNoKGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgX29uRmluaXNoKCk7XG4gICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICAgIGxldCBsb2FkZWRCeXRlcyA9IGJ5dGVzICs9IGxlbjtcbiAgICAgICAgICBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfb25GaW5pc2goZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgX29uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gXCIuLi9wbGF0Zm9ybS9pbmRleC5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gXCIuLi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzXCI7XG5pbXBvcnQge3RyYWNrU3RyZWFtfSBmcm9tIFwiLi4vaGVscGVycy90cmFja1N0cmVhbS5qc1wiO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi4vY29yZS9BeGlvc0hlYWRlcnMuanNcIjtcbmltcG9ydCB7cHJvZ3Jlc3NFdmVudFJlZHVjZXIsIHByb2dyZXNzRXZlbnREZWNvcmF0b3IsIGFzeW5jRGVjb3JhdG9yfSBmcm9tIFwiLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qc1wiO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuaW1wb3J0IHNldHRsZSBmcm9tIFwiLi4vY29yZS9zZXR0bGUuanNcIjtcblxuY29uc3QgaXNGZXRjaFN1cHBvcnRlZCA9IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVzcG9uc2UgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiB0eXBlb2YgUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbic7XG5cbi8vIHVzZWQgb25seSBpbnNpZGUgdGhlIGZldGNoIGFkYXB0ZXJcbmNvbnN0IGVuY29kZVRleHQgPSBpc0ZldGNoU3VwcG9ydGVkICYmICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICgoZW5jb2RlcikgPT4gKHN0cikgPT4gZW5jb2Rlci5lbmNvZGUoc3RyKSkobmV3IFRleHRFbmNvZGVyKCkpIDpcbiAgICBhc3luYyAoc3RyKSA9PiBuZXcgVWludDhBcnJheShhd2FpdCBuZXcgUmVzcG9uc2Uoc3RyKS5hcnJheUJ1ZmZlcigpKVxuKTtcblxuY29uc3QgdGVzdCA9IChmbiwgLi4uYXJncykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZuKC4uLmFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gIHRlc3QoKCkgPT4gdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpKTtcblxuXG5jb25zdCByZXNvbHZlcnMgPSB7XG4gIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpXG59O1xuXG5pc0ZldGNoU3VwcG9ydGVkICYmICgoKHJlcykgPT4ge1xuICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICFyZXNvbHZlcnNbdHlwZV0gJiYgKHJlc29sdmVyc1t0eXBlXSA9IHV0aWxzLmlzRnVuY3Rpb24ocmVzW3R5cGVdKSA/IChyZXMpID0+IHJlc1t0eXBlXSgpIDpcbiAgICAgIChfLCBjb25maWcpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFJlc3BvbnNlIHR5cGUgJyR7dHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgLCBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCwgY29uZmlnKTtcbiAgICAgIH0pXG4gIH0pO1xufSkobmV3IFJlc3BvbnNlKSk7XG5cbmNvbnN0IGdldEJvZHlMZW5ndGggPSBhc3luYyAoYm9keSkgPT4ge1xuICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZih1dGlscy5pc0Jsb2IoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5zaXplO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHksXG4gICAgfSk7XG4gICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscy5pc1N0cmluZyhib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgfVxufVxuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0ZldGNoU3VwcG9ydGVkICYmIChhc3luYyAoY29uZmlnKSA9PiB7XG4gIGxldCB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBkYXRhLFxuICAgIHNpZ25hbCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICB0aW1lb3V0LFxuICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBoZWFkZXJzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgZmV0Y2hPcHRpb25zXG4gIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gIGxldCBjb21wb3NlZFNpZ25hbCA9IGNvbXBvc2VTaWduYWxzKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gIGxldCByZXF1ZXN0O1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiYgKCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gIH0pO1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpXG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0JztcbiAgICB9XG5cbiAgICAvLyBDbG91ZGZsYXJlIFdvcmtlcnMgdGhyb3dzIHdoZW4gY3JlZGVudGlhbHMgYXJlIGRlZmluZWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Nsb3VkZmxhcmUvd29ya2VyZC9pc3N1ZXMvOTAyXG4gICAgY29uc3QgaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA9IFwiY3JlZGVudGlhbHNcIiBpbiBSZXF1ZXN0LnByb3RvdHlwZTtcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICBzaWduYWw6IGNvbXBvc2VkU2lnbmFsLFxuICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID8gd2l0aENyZWRlbnRpYWxzIDogdW5kZWZpbmVkXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcblxuICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICBpZiAoc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAob25Eb3dubG9hZFByb2dyZXNzIHx8IChpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlKSkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcblxuICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKTtcblxuICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IG9uRG93bmxvYWRQcm9ncmVzcyAmJiBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICByZXNwb25zZUNvbnRlbnRMZW5ndGgsXG4gICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uRG93bmxvYWRQcm9ncmVzcyksIHRydWUpXG4gICAgICApIHx8IFtdO1xuXG4gICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCAoKSA9PiB7XG4gICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9KSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc29sdmVyc1t1dGlscy5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKHJlc3BvbnNlLCBjb25maWcpO1xuXG4gICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS44LjRcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbnZhbGlkYXRvcnMuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuLi9oZWxwZXJzL2J1aWxkVVJMLmpzJztcbmltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXIuanMnO1xuaW1wb3J0IGRpc3BhdGNoUmVxdWVzdCBmcm9tICcuL2Rpc3BhdGNoUmVxdWVzdC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tICcuL2J1aWxkRnVsbFBhdGguanMnO1xuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vQXhpb3NIZWFkZXJzLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29uZmlnT3JVcmwgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICAgKiBAcGFyYW0gez9PYmplY3R9IGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbGV0IGR1bW15ID0ge307XG5cbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPyBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShkdW1teSkgOiAoZHVtbXkgPSBuZXcgRXJyb3IoKSk7XG5cbiAgICAgICAgLy8gc2xpY2Ugb2ZmIHRoZSBFcnJvcjogLi4uIGxpbmVcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkdW1teS5zdGFjayA/IGR1bW15LnN0YWNrLnJlcGxhY2UoL14uK1xcbi8sICcnKSA6ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgICAgIC8vIG1hdGNoIHdpdGhvdXQgdGhlIDIgdG9wIHN0YWNrIGxpbmVzXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGFjayAmJiAhU3RyaW5nKGVyci5zdGFjaykuZW5kc1dpdGgoc3RhY2sucmVwbGFjZSgvXi4rXFxuLitcXG4vLCAnJykpKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgKz0gJ1xcbicgKyBzdGFja1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSB0aGUgY2FzZSB3aGVyZSBcInN0YWNrXCIgaXMgYW4gdW4td3JpdGFibGUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5hbGxvd0Fic29sdXRlVXJsc1xuICAgIGlmIChjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKGNvbmZpZywge1xuICAgICAgYmFzZVVybDogdmFsaWRhdG9ycy5zcGVsbGluZygnYmFzZVVSTCcpLFxuICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgaGVhZGVycyAmJiB1dGlscy5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgdG9BYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgYWJvcnQgPSAoZXJyKSA9PiB7XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVycik7XG4gICAgfTtcblxuICAgIHRoaXMuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIGNvbnRyb2xsZXIuc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdGhpcy51bnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcbmltcG9ydCBBeGlvcyBmcm9tICcuL2NvcmUvQXhpb3MuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gJy4vY2FuY2VsL0NhbmNlbFRva2VuLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi9hZGFwdGVycy9hZGFwdGVycy5qcyc7XG5pbXBvcnQgSHR0cFN0YXR1c0NvZGUgZnJvbSAnLi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG4vLyB0aGlzIG1vZHVsZSBzaG91bGQgb25seSBoYXZlIGEgZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IGF4aW9zXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi9saWIvYXhpb3MuanMnO1xuXG4vLyBUaGlzIG1vZHVsZSBpcyBpbnRlbmRlZCB0byB1bndyYXAgQXhpb3MgZGVmYXVsdCBleHBvcnQgYXMgbmFtZWQuXG4vLyBLZWVwIHRvcC1sZXZlbCBleHBvcnQgc2FtZSB3aXRoIHN0YXRpYyBwcm9wZXJ0aWVzXG4vLyBzbyB0aGF0IGl0IGNhbiBrZWVwIHNhbWUgd2l0aCBlcyBtb2R1bGUgb3IgY2pzXG5jb25zdCB7XG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn0gPSBheGlvcztcblxuZXhwb3J0IHtcbiAgYXhpb3MgYXMgZGVmYXVsdCxcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZ1xufVxuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJveCwgSDEsIEgyLCBUZXh0IH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZSh7IHRvdGFsQm9va2luZ3M6IDAsIHRvdGFsUmV2ZW51ZTogMCB9KTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBheGlvc1xuICAgICAgICAgICAgLmdldChcIi9hZG1pbi9hcGkvZGFzaGJvYXJkXCIpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiBzZXREYXRhKHJlcy5kYXRhKSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKF9qc3hzKEJveCwgeyB2YXJpYW50OiBcImdyZXlcIiwgY2hpbGRyZW46IFtfanN4KEgxLCB7IGNoaWxkcmVuOiBcIkFkbWluIERhc2hib2FyZFwiIH0pLCBfanN4cyhCb3gsIHsgdmFyaWFudDogXCJjYXJkXCIsIGNoaWxkcmVuOiBbX2pzeChIMiwgeyBjaGlsZHJlbjogXCJCb29raW5nc1wiIH0pLCBfanN4KFRleHQsIHsgdmFyaWFudDogXCJtZFwiLCBjaGlsZHJlbjogXCJCb29raW5ncyBpbiB0aGlzIG1vbnRoOiBcIiB9KSwgX2pzeChUZXh0LCB7IHZhcmlhbnQ6IFwibWRcIiwgY2hpbGRyZW46IFwiQm9va2luZ3MgaW4gcHJldmlvdXMgbW9udGg6IFwiIH0pLCBfanN4cyhUZXh0LCB7IHZhcmlhbnQ6IFwibWRcIiwgY2hpbGRyZW46IFtcIlRvdGFsIEJvb2tpbmdzOiBcIiwgZGF0YS50b3RhbEJvb2tpbmdzXSB9KV0gfSksIF9qc3hzKEJveCwgeyB2YXJpYW50OiBcImNhcmRcIiwgY2hpbGRyZW46IFtfanN4KEgyLCB7IGNoaWxkcmVuOiBcIlJldmVudWVcIiB9KSwgX2pzeChUZXh0LCB7IHZhcmlhbnQ6IFwibWRcIiwgY2hpbGRyZW46IFwiUmV2ZW51ZSBpbiB0aGlzIG1vbnRoOiBcIiB9KSwgX2pzeChUZXh0LCB7IHZhcmlhbnQ6IFwibWRcIiwgY2hpbGRyZW46IFwiUmV2ZW51ZSBpbiBwcmV2aW91cyBtb250aDogXCIgfSksIF9qc3hzKFRleHQsIHsgdmFyaWFudDogXCJtZFwiLCBjaGlsZHJlbjogW1wiVG90YWwgUmV2ZW51ZTogJFwiLCBkYXRhLnRvdGFsUmV2ZW51ZV0gfSldIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL2Rpc3QvYWRtaW4vZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmQiXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsImpzeFJ1bnRpbWVNb2R1bGUiLCJBeGlvc0Vycm9yIiwidXRpbHMiLCJwcm90b3R5cGUiLCJ0b0Zvcm1EYXRhIiwiZW5jb2RlIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJBeGlvc0hlYWRlcnMiLCJpc0NhbmNlbCIsIkNhbmNlbGVkRXJyb3IiLCJtZXJnZUNvbmZpZyIsIlZFUlNJT04iLCJ2YWxpZGF0b3JzIiwiQXhpb3MiLCJzcHJlYWQiLCJpc0F4aW9zRXJyb3IiLCJIdHRwU3RhdHVzQ29kZSIsIkNhbmNlbFRva2VuIiwiRGFzaGJvYXJkIiwiZGF0YSIsInNldERhdGEiLCJ1c2VTdGF0ZSIsInRvdGFsQm9va2luZ3MiLCJ0b3RhbFJldmVudWUiLCJ1c2VFZmZlY3QiLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXMiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIl9qc3hzIiwiQm94IiwidmFyaWFudCIsImNoaWxkcmVuIiwiX2pzeCIsIkgxIiwiSDIiLCJUZXh0IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFZMkM7RUFDM0MsRUFBRSxDQUFDLFdBQVc7O0VBR2QsSUFBSSxLQUFLLEdBQUdBLDJCQUFnQjs7RUFFNUI7RUFDQTtFQUNBO0VBQ0E7RUFDQSxJQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0VBQ3BELElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7RUFDbEQsSUFBSSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0VBQ3RELElBQUksc0JBQXNCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztFQUM1RCxJQUFJLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7RUFDdEQsSUFBSSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0VBQ3RELElBQUksa0JBQWtC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
