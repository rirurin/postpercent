var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/moment/moment.js
var require_moment = __commonJS({
  "node_modules/moment/moment.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.moment = factory();
    })(exports, function() {
      "use strict";
      var hookCallback;
      function hooks() {
        return hookCallback.apply(null, arguments);
      }
      function setHookCallback(callback) {
        hookCallback = callback;
      }
      function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
      }
      function isObject(input) {
        return input != null && Object.prototype.toString.call(input) === "[object Object]";
      }
      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
        } else {
          var k;
          for (k in obj) {
            if (hasOwnProp(obj, k)) {
              return false;
            }
          }
          return true;
        }
      }
      function isUndefined(input) {
        return input === void 0;
      }
      function isNumber(input) {
        return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
      }
      function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
      }
      function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
          res.push(fn(arr[i], i));
        }
        return res;
      }
      function extend(a, b) {
        for (var i in b) {
          if (hasOwnProp(b, i)) {
            a[i] = b[i];
          }
        }
        if (hasOwnProp(b, "toString")) {
          a.toString = b.toString;
        }
        if (hasOwnProp(b, "valueOf")) {
          a.valueOf = b.valueOf;
        }
        return a;
      }
      function createUTC(input, format3, locale2, strict) {
        return createLocalOrUTC(input, format3, locale2, strict, true).utc();
      }
      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }
      function getParsingFlags(m) {
        if (m._pf == null) {
          m._pf = defaultParsingFlags();
        }
        return m._pf;
      }
      var some;
      if (Array.prototype.some) {
        some = Array.prototype.some;
      } else {
        some = function(fun) {
          var t = Object(this), len = t.length >>> 0, i;
          for (i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
              return true;
            }
          }
          return false;
        };
      }
      function isValid(m) {
        if (m._isValid == null) {
          var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
            return i != null;
          }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
          if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
          }
          if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
          } else {
            return isNowValid;
          }
        }
        return m._isValid;
      }
      function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
          extend(getParsingFlags(m), flags);
        } else {
          getParsingFlags(m).userInvalidated = true;
        }
        return m;
      }
      var momentProperties = hooks.momentProperties = [], updateInProgress = false;
      function copyConfig(to2, from2) {
        var i, prop, val;
        if (!isUndefined(from2._isAMomentObject)) {
          to2._isAMomentObject = from2._isAMomentObject;
        }
        if (!isUndefined(from2._i)) {
          to2._i = from2._i;
        }
        if (!isUndefined(from2._f)) {
          to2._f = from2._f;
        }
        if (!isUndefined(from2._l)) {
          to2._l = from2._l;
        }
        if (!isUndefined(from2._strict)) {
          to2._strict = from2._strict;
        }
        if (!isUndefined(from2._tzm)) {
          to2._tzm = from2._tzm;
        }
        if (!isUndefined(from2._isUTC)) {
          to2._isUTC = from2._isUTC;
        }
        if (!isUndefined(from2._offset)) {
          to2._offset = from2._offset;
        }
        if (!isUndefined(from2._pf)) {
          to2._pf = getParsingFlags(from2);
        }
        if (!isUndefined(from2._locale)) {
          to2._locale = from2._locale;
        }
        if (momentProperties.length > 0) {
          for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from2[prop];
            if (!isUndefined(val)) {
              to2[prop] = val;
            }
          }
        }
        return to2;
      }
      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
          this._d = new Date(NaN);
        }
        if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }
      function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
      }
      function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
          console.warn("Deprecation warning: " + msg);
        }
      }
      function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
            var args = [], arg, i, key;
            for (i = 0; i < arguments.length; i++) {
              arg = "";
              if (typeof arguments[i] === "object") {
                arg += "\n[" + i + "] ";
                for (key in arguments[0]) {
                  if (hasOwnProp(arguments[0], key)) {
                    arg += key + ": " + arguments[0][key] + ", ";
                  }
                }
                arg = arg.slice(0, -2);
              } else {
                arg = arguments[i];
              }
              args.push(arg);
            }
            warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }
      var deprecations = {};
      function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
      function isFunction(input) {
        return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
      }
      function set(config) {
        var prop, i;
        for (i in config) {
          if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction(prop)) {
              this[i] = prop;
            } else {
              this["_" + i] = prop;
            }
          }
        }
        this._config = config;
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
      }
      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
              res[prop] = {};
              extend(res[prop], parentConfig[prop]);
              extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
              res[prop] = childConfig[prop];
            } else {
              delete res[prop];
            }
          }
        }
        for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
            res[prop] = extend({}, res[prop]);
          }
        }
        return res;
      }
      function Locale(config) {
        if (config != null) {
          this.set(config);
        }
      }
      var keys;
      if (Object.keys) {
        keys = Object.keys;
      } else {
        keys = function(obj) {
          var i, res = [];
          for (i in obj) {
            if (hasOwnProp(obj, i)) {
              res.push(i);
            }
          }
          return res;
        };
      }
      var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      };
      function calendar(key, mom, now2) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction(output) ? output.call(mom, now2) : output;
      }
      function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
        return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }
      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
      function addFormatToken(token2, padded, ordinal2, callback) {
        var func = callback;
        if (typeof callback === "string") {
          func = function() {
            return this[callback]();
          };
        }
        if (token2) {
          formatTokenFunctions[token2] = func;
        }
        if (padded) {
          formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
        }
        if (ordinal2) {
          formatTokenFunctions[ordinal2] = function() {
            return this.localeData().ordinal(func.apply(this, arguments), token2);
          };
        }
      }
      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
      }
      function makeFormatFunction(format3) {
        var array = format3.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
          } else {
            array[i] = removeFormattingTokens(array[i]);
          }
        }
        return function(mom) {
          var output = "", i2;
          for (i2 = 0; i2 < length; i2++) {
            output += isFunction(array[i2]) ? array[i2].call(mom, format3) : array[i2];
          }
          return output;
        };
      }
      function formatMoment(m, format3) {
        if (!m.isValid()) {
          return m.localeData().invalidDate();
        }
        format3 = expandFormat(format3, m.localeData());
        formatFunctions[format3] = formatFunctions[format3] || makeFormatFunction(format3);
        return formatFunctions[format3](m);
      }
      function expandFormat(format3, locale2) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
          return locale2.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format3)) {
          format3 = format3.replace(localFormattingTokens, replaceLongDateFormatTokens);
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }
        return format3;
      }
      var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      };
      function longDateFormat(key) {
        var format3 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format3 || !formatUpper) {
          return format3;
        }
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
          if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
            return tok.slice(1);
          }
          return tok;
        }).join("");
        return this._longDateFormat[key];
      }
      var defaultInvalidDate = "Invalid date";
      function invalidDate() {
        return this._invalidDate;
      }
      var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
      function ordinal(number) {
        return this._ordinal.replace("%d", number);
      }
      var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };
      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }
      function pastFuture(diff2, output) {
        var format3 = this._relativeTime[diff2 > 0 ? "future" : "past"];
        return isFunction(format3) ? format3(output) : format3.replace(/%s/i, output);
      }
      var aliases = {};
      function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
      }
      function normalizeUnits(units) {
        return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
      }
      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
              normalizedInput[normalizedProp] = inputObject[prop];
            }
          }
        }
        return normalizedInput;
      }
      var priorities = {};
      function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
      }
      function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for (u in unitsObj) {
          if (hasOwnProp(unitsObj, u)) {
            units.push({unit: u, priority: priorities[u]});
          }
        }
        units.sort(function(a, b) {
          return a.priority - b.priority;
        });
        return units;
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      function absFloor(number) {
        if (number < 0) {
          return Math.ceil(number) || 0;
        } else {
          return Math.floor(number);
        }
      }
      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
        }
        return value;
      }
      function makeGetSet(unit, keepTime) {
        return function(value) {
          if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          } else {
            return get(this, unit);
          }
        };
      }
      function get(mom, unit) {
        return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
      }
      function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
          if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            value = toInt(value);
            mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
          } else {
            mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
          }
        }
      }
      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units]();
        }
        return this;
      }
      function stringSet(units, value) {
        if (typeof units === "object") {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units), i;
          for (i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
          }
        } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units](value);
          }
        }
        return this;
      }
      var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
      regexes = {};
      function addRegexToken(token2, regex, strictRegex) {
        regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }
      function getParseRegexForToken(token2, config) {
        if (!hasOwnProp(regexes, token2)) {
          return new RegExp(unescapeFormat(token2));
        }
        return regexes[token2](config._strict, config._locale);
      }
      function unescapeFormat(s2) {
        return regexEscape(s2.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
          return p1 || p2 || p3 || p4;
        }));
      }
      function regexEscape(s2) {
        return s2.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      var tokens = {};
      function addParseToken(token2, callback) {
        var i, func = callback;
        if (typeof token2 === "string") {
          token2 = [token2];
        }
        if (isNumber(callback)) {
          func = function(input, array) {
            array[callback] = toInt(input);
          };
        }
        for (i = 0; i < token2.length; i++) {
          tokens[token2[i]] = func;
        }
      }
      function addWeekParseToken(token2, callback) {
        addParseToken(token2, function(input, array, config, token3) {
          config._w = config._w || {};
          callback(input, config._w, config, token3);
        });
      }
      function addTimeToArrayFromToken(token2, input, config) {
        if (input != null && hasOwnProp(tokens, token2)) {
          tokens[token2](input, config._a, config, token2);
        }
      }
      var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
      function mod(n, x) {
        return (n % x + x) % x;
      }
      var indexOf;
      if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function(o) {
          var i;
          for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
              return i;
            }
          }
          return -1;
        };
      }
      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
          return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }
      addFormatToken("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      });
      addFormatToken("MMM", 0, 0, function(format3) {
        return this.localeData().monthsShort(this, format3);
      });
      addFormatToken("MMMM", 0, 0, function(format3) {
        return this.localeData().months(this, format3);
      });
      addUnitAlias("month", "M");
      addUnitPriority("month", 8);
      addRegexToken("M", match1to2);
      addRegexToken("MM", match1to2, match2);
      addRegexToken("MMM", function(isStrict, locale2) {
        return locale2.monthsShortRegex(isStrict);
      });
      addRegexToken("MMMM", function(isStrict, locale2) {
        return locale2.monthsRegex(isStrict);
      });
      addParseToken(["M", "MM"], function(input, array) {
        array[MONTH] = toInt(input) - 1;
      });
      addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
        var month = config._locale.monthsParse(input, token2, config._strict);
        if (month != null) {
          array[MONTH] = month;
        } else {
          getParsingFlags(config).invalidMonth = input;
        }
      });
      var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
      function localeMonths(m, format3) {
        if (!m) {
          return isArray(this._months) ? this._months : this._months["standalone"];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format3) ? "format" : "standalone"][m.month()];
      }
      function localeMonthsShort(m, format3) {
        if (!m) {
          return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format3) ? "format" : "standalone"][m.month()];
      }
      function handleStrictParse(monthName, format3, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([2e3, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format3 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format3 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeMonthsParse(monthName, format3, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format3, strict);
        }
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
            this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
          }
          if (!strict && !this._monthsParse[i]) {
            regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format3 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
            return i;
          } else if (strict && format3 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
            return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }
      function setMonth(mom, value) {
        var dayOfMonth;
        if (!mom.isValid()) {
          return mom;
        }
        if (typeof value === "string") {
          if (/^\d+$/.test(value)) {
            value = toInt(value);
          } else {
            value = mom.localeData().monthsParse(value);
            if (!isNumber(value)) {
              return mom;
            }
          }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
        return mom;
      }
      function getSetMonth(value) {
        if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        } else {
          return get(this, "Month");
        }
      }
      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsShortStrictRegex;
          } else {
            return this._monthsShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsShortRegex")) {
            this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
      }
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsStrictRegex;
          } else {
            return this._monthsRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsRegex")) {
            this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
      }
      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          shortPieces.push(this.monthsShort(mom, ""));
          longPieces.push(this.months(mom, ""));
          mixedPieces.push(this.months(mom, ""));
          mixedPieces.push(this.monthsShort(mom, ""));
        }
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
          mixedPieces[i] = regexEscape(mixedPieces[i]);
        }
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
        this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
      }
      addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
      });
      addFormatToken(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      });
      addFormatToken(0, ["YYYY", 4], 0, "year");
      addFormatToken(0, ["YYYYY", 5], 0, "year");
      addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
      addUnitAlias("year", "y");
      addUnitPriority("year", 1);
      addRegexToken("Y", matchSigned);
      addRegexToken("YY", match1to2, match2);
      addRegexToken("YYYY", match1to4, match4);
      addRegexToken("YYYYY", match1to6, match6);
      addRegexToken("YYYYYY", match1to6, match6);
      addParseToken(["YYYYY", "YYYYYY"], YEAR);
      addParseToken("YYYY", function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
      });
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
      };
      var getSetYear = makeGetSet("FullYear", true);
      function getIsLeapYear() {
        return isLeapYear(this.year());
      }
      function createDate(y, m, d2, h, M, s2, ms) {
        var date;
        if (y < 100 && y >= 0) {
          date = new Date(y + 400, m, d2, h, M, s2, ms);
          if (isFinite(date.getFullYear())) {
            date.setFullYear(y);
          }
        } else {
          date = new Date(y, m, d2, h, M, s2, ms);
        }
        return date;
      }
      function createUTCDate(y) {
        var date, args;
        if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
          }
        } else {
          date = new Date(Date.UTC.apply(null, arguments));
        }
        return date;
      }
      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      }
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }
        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }
      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }
        return {
          week: resWeek,
          year: resYear
        };
      }
      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
      addFormatToken("w", ["ww", 2], "wo", "week");
      addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
      addUnitAlias("week", "w");
      addUnitAlias("isoWeek", "W");
      addUnitPriority("week", 5);
      addUnitPriority("isoWeek", 5);
      addRegexToken("w", match1to2);
      addRegexToken("ww", match1to2, match2);
      addRegexToken("W", match1to2);
      addRegexToken("WW", match1to2, match2);
      addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
        week[token2.substr(0, 1)] = toInt(input);
      });
      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
      var defaultLocaleWeek = {
        dow: 0,
        doy: 6
      };
      function localeFirstDayOfWeek() {
        return this._week.dow;
      }
      function localeFirstDayOfYear() {
        return this._week.doy;
      }
      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      addFormatToken("d", 0, "do", "day");
      addFormatToken("dd", 0, 0, function(format3) {
        return this.localeData().weekdaysMin(this, format3);
      });
      addFormatToken("ddd", 0, 0, function(format3) {
        return this.localeData().weekdaysShort(this, format3);
      });
      addFormatToken("dddd", 0, 0, function(format3) {
        return this.localeData().weekdays(this, format3);
      });
      addFormatToken("e", 0, 0, "weekday");
      addFormatToken("E", 0, 0, "isoWeekday");
      addUnitAlias("day", "d");
      addUnitAlias("weekday", "e");
      addUnitAlias("isoWeekday", "E");
      addUnitPriority("day", 11);
      addUnitPriority("weekday", 11);
      addUnitPriority("isoWeekday", 11);
      addRegexToken("d", match1to2);
      addRegexToken("e", match1to2);
      addRegexToken("E", match1to2);
      addRegexToken("dd", function(isStrict, locale2) {
        return locale2.weekdaysMinRegex(isStrict);
      });
      addRegexToken("ddd", function(isStrict, locale2) {
        return locale2.weekdaysShortRegex(isStrict);
      });
      addRegexToken("dddd", function(isStrict, locale2) {
        return locale2.weekdaysRegex(isStrict);
      });
      addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
        var weekday = config._locale.weekdaysParse(input, token2, config._strict);
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      });
      addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
        week[token2] = toInt(input);
      });
      function parseWeekday(input, locale2) {
        if (typeof input !== "string") {
          return input;
        }
        if (!isNaN(input)) {
          return parseInt(input, 10);
        }
        input = locale2.weekdaysParse(input);
        if (typeof input === "number") {
          return input;
        }
        return null;
      }
      function parseIsoWeekday(input, locale2) {
        if (typeof input === "string") {
          return locale2.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
      }
      function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
      }
      var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
      function localeWeekdays(m, format3) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format3) ? "format" : "standalone"];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
      }
      function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }
      function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }
      function handleStrictParse$1(weekdayName, format3, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];
          for (i = 0; i < 7; ++i) {
            mom = createUTC([2e3, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format3 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format3 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format3 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format3 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeWeekdaysParse(weekdayName, format3, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format3, strict);
        }
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
            this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
            this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
          }
          if (!this._weekdaysParse[i]) {
            regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format3 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format3 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format3 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
          }
        }
      }
      function getSetDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, "d");
        } else {
          return day;
        }
      }
      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, "d");
      }
      function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
          return this.day() || 7;
        }
      }
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysStrictRegex;
          } else {
            return this._weekdaysRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
      }
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysShortStrictRegex;
          } else {
            return this._weekdaysShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysShortRegex")) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
      }
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysMinStrictRegex;
          } else {
            return this._weekdaysMinRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysMinRegex")) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
      }
      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ""));
          shortp = regexEscape(this.weekdaysShort(mom, ""));
          longp = regexEscape(this.weekdays(mom, ""));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
        this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
        this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
      }
      function hFormat() {
        return this.hours() % 12 || 12;
      }
      function kFormat() {
        return this.hours() || 24;
      }
      addFormatToken("H", ["HH", 2], 0, "hour");
      addFormatToken("h", ["hh", 2], 0, hFormat);
      addFormatToken("k", ["kk", 2], 0, kFormat);
      addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
      addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
      });
      addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      function meridiem(token2, lowercase) {
        addFormatToken(token2, 0, 0, function() {
          return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
      }
      meridiem("a", true);
      meridiem("A", false);
      addUnitAlias("hour", "h");
      addUnitPriority("hour", 13);
      function matchMeridiem(isStrict, locale2) {
        return locale2._meridiemParse;
      }
      addRegexToken("a", matchMeridiem);
      addRegexToken("A", matchMeridiem);
      addRegexToken("H", match1to2);
      addRegexToken("h", match1to2);
      addRegexToken("k", match1to2);
      addRegexToken("HH", match1to2, match2);
      addRegexToken("hh", match1to2, match2);
      addRegexToken("kk", match1to2, match2);
      addRegexToken("hmm", match3to4);
      addRegexToken("hmmss", match5to6);
      addRegexToken("Hmm", match3to4);
      addRegexToken("Hmmss", match5to6);
      addParseToken(["H", "HH"], HOUR);
      addParseToken(["k", "kk"], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(["a", "A"], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken(["h", "hh"], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });
      function localeIsPM(input) {
        return (input + "").toLowerCase().charAt(0) === "p";
      }
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
      function localeMeridiem(hours2, minutes2, isLower) {
        if (hours2 > 11) {
          return isLower ? "pm" : "PM";
        } else {
          return isLower ? "am" : "AM";
        }
      }
      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
      };
      var locales = {}, localeFamilies = {}, globalLocale;
      function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
          if (arr1[i] !== arr2[i]) {
            return i;
          }
        }
        return minl;
      }
      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
      }
      function chooseLocale(names) {
        var i = 0, j, next, locale2, split;
        while (i < names.length) {
          split = normalizeLocale(names[i]).split("-");
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split("-") : null;
          while (j > 0) {
            locale2 = loadLocale(split.slice(0, j).join("-"));
            if (locale2) {
              return locale2;
            }
            if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
              break;
            }
            j--;
          }
          i++;
        }
        return globalLocale;
      }
      function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        if (locales[name] === void 0 && typeof module2 !== "undefined" && module2 && module2.exports) {
          try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = require;
            aliasedRequire("./locale/" + name);
            getSetGlobalLocale(oldLocale);
          } catch (e) {
            locales[name] = null;
          }
        }
        return locales[name];
      }
      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          if (isUndefined(values)) {
            data = getLocale(key);
          } else {
            data = defineLocale(key, values);
          }
          if (data) {
            globalLocale = data;
          } else {
            if (typeof console !== "undefined" && console.warn) {
              console.warn("Locale " + key + " not found. Did you forget to load it?");
            }
          }
        }
        return globalLocale._abbr;
      }
      function defineLocale(name, config) {
        if (config !== null) {
          var locale2, parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
            deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
            parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
              parentConfig = locales[config.parentLocale]._config;
            } else {
              locale2 = loadLocale(config.parentLocale);
              if (locale2 != null) {
                parentConfig = locale2._config;
              } else {
                if (!localeFamilies[config.parentLocale]) {
                  localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                  name,
                  config
                });
                return null;
              }
            }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));
          if (localeFamilies[name]) {
            localeFamilies[name].forEach(function(x) {
              defineLocale(x.name, x.config);
            });
          }
          getSetGlobalLocale(name);
          return locales[name];
        } else {
          delete locales[name];
          return null;
        }
      }
      function updateLocale(name, config) {
        if (config != null) {
          var locale2, tmpLocale, parentConfig = baseConfig;
          if (locales[name] != null && locales[name].parentLocale != null) {
            locales[name].set(mergeConfigs(locales[name]._config, config));
          } else {
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
              parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            if (tmpLocale == null) {
              config.abbr = name;
            }
            locale2 = new Locale(config);
            locale2.parentLocale = locales[name];
            locales[name] = locale2;
          }
          getSetGlobalLocale(name);
        } else {
          if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
              locales[name] = locales[name].parentLocale;
              if (name === getSetGlobalLocale()) {
                getSetGlobalLocale(name);
              }
            } else if (locales[name] != null) {
              delete locales[name];
            }
          }
        }
        return locales[name];
      }
      function getLocale(key) {
        var locale2;
        if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
        }
        if (!key) {
          return globalLocale;
        }
        if (!isArray(key)) {
          locale2 = loadLocale(key);
          if (locale2) {
            return locale2;
          }
          key = [key];
        }
        return chooseLocale(key);
      }
      function listLocales() {
        return keys(locales);
      }
      function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
          }
          getParsingFlags(m).overflow = overflow;
        }
        return m;
      }
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, false],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, false],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, false],
        ["YYYY", /\d{4}/, false]
      ], isoTimes = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/]
      ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
      };
      function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
        if (match) {
          getParsingFlags(config).iso = true;
          for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
              dateFormat = isoDates[i][0];
              allowTime = isoDates[i][2] !== false;
              break;
            }
          }
          if (dateFormat == null) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
              if (isoTimes[i][1].exec(match[3])) {
                timeFormat = (match[2] || " ") + isoTimes[i][0];
                break;
              }
            }
            if (timeFormat == null) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (tzRegex.exec(match[4])) {
              tzFormat = "Z";
            } else {
              config._isValid = false;
              return;
            }
          }
          config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
          configFromStringAndFormat(config);
        } else {
          config._isValid = false;
        }
      }
      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10)
        ];
        if (secondStr) {
          result.push(parseInt(secondStr, 10));
        }
        return result;
      }
      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
          return 2e3 + year;
        } else if (year <= 999) {
          return 1900 + year;
        }
        return year;
      }
      function preprocessRFC2822(s2) {
        return s2.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
          return obsOffsets[obsOffset];
        } else if (militaryOffset) {
          return 0;
        } else {
          var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
          return h * 60 + m;
        }
      }
      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
          parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
          if (!checkWeekday(match[1], parsedArray, config)) {
            return;
          }
          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);
          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          getParsingFlags(config).rfc2822 = true;
        } else {
          config._isValid = false;
        }
      }
      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
          config._d = new Date(+matched[1]);
          return;
        }
        configFromISO(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        configFromRFC2822(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        if (config._strict) {
          config._isValid = false;
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
      });
      function defaults(a, b, c) {
        if (a != null) {
          return a;
        }
        if (b != null) {
          return b;
        }
        return c;
      }
      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
          return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate()
          ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }
      function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) {
          return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
          }
          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
          config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
          config._a[HOUR] = 24;
        }
        if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
          getParsingFlags(config).weekdayMismatch = true;
        }
      }
      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;
          weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
          }
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;
          curWeek = weekOfYear(createLocal(), dow, doy);
          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
          week = defaults(w.w, curWeek.week);
          if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
              weekdayOverflow = true;
            }
          } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
              weekdayOverflow = true;
            }
          } else {
            weekday = dow;
          }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
        } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }
      hooks.ISO_8601 = function() {
      };
      hooks.RFC_2822 = function() {
      };
      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era;
        tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for (i = 0; i < tokens2.length; i++) {
          token2 = tokens2[i];
          parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
              getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
          }
          if (formatTokenFunctions[token2]) {
            if (parsedInput) {
              getParsingFlags(config).empty = false;
            } else {
              getParsingFlags(config).unusedTokens.push(token2);
            }
            addTimeToArrayFromToken(token2, parsedInput, config);
          } else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token2);
          }
        }
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
        }
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = void 0;
        }
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        era = getParsingFlags(config).era;
        if (era !== null) {
          config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }
        configFromArray(config);
        checkOverflow(config);
      }
      function meridiemFixWrap(locale2, hour, meridiem2) {
        var isPm;
        if (meridiem2 == null) {
          return hour;
        }
        if (locale2.meridiemHour != null) {
          return locale2.meridiemHour(hour, meridiem2);
        } else if (locale2.isPM != null) {
          isPm = locale2.isPM(meridiem2);
          if (isPm && hour < 12) {
            hour += 12;
          }
          if (!isPm && hour === 12) {
            hour = 0;
          }
          return hour;
        } else {
          return hour;
        }
      }
      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false;
        if (config._f.length === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = new Date(NaN);
          return;
        }
        for (i = 0; i < config._f.length; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);
          if (isValid(tempConfig)) {
            validFormatFound = true;
          }
          currentScore += getParsingFlags(tempConfig).charsLeftOver;
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
          getParsingFlags(tempConfig).score = currentScore;
          if (!bestFormatIsValid) {
            if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
              if (validFormatFound) {
                bestFormatIsValid = true;
              }
            }
          } else {
            if (currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
        }
        extend(config, bestMoment || tempConfig);
      }
      function configFromObject(config) {
        if (config._d) {
          return;
        }
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
        config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function(obj) {
          return obj && parseInt(obj, 10);
        });
        configFromArray(config);
      }
      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, "d");
          res._nextDay = void 0;
        }
        return res;
      }
      function prepareConfig(config) {
        var input = config._i, format3 = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format3 === void 0 && input === "") {
          return createInvalid({nullInput: true});
        }
        if (typeof input === "string") {
          config._i = input = config._locale.preparse(input);
        }
        if (isMoment(input)) {
          return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
          config._d = input;
        } else if (isArray(format3)) {
          configFromStringAndArray(config);
        } else if (format3) {
          configFromStringAndFormat(config);
        } else {
          configFromInput(config);
        }
        if (!isValid(config)) {
          config._d = null;
        }
        return config;
      }
      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
          config._d = new Date(hooks.now());
        } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
        } else if (typeof input === "string") {
          configFromString(config);
        } else if (isArray(input)) {
          config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else if (isObject(input)) {
          configFromObject(config);
        } else if (isNumber(input)) {
          config._d = new Date(input);
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      function createLocalOrUTC(input, format3, locale2, strict, isUTC) {
        var c = {};
        if (format3 === true || format3 === false) {
          strict = format3;
          format3 = void 0;
        }
        if (locale2 === true || locale2 === false) {
          strict = locale2;
          locale2 = void 0;
        }
        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
          input = void 0;
        }
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale2;
        c._i = input;
        c._f = format3;
        c._strict = strict;
        return createFromConfig(c);
      }
      function createLocal(input, format3, locale2, strict) {
        return createLocalOrUTC(input, format3, locale2, strict, false);
      }
      var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other < this ? this : other;
        } else {
          return createInvalid();
        }
      }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other > this ? this : other;
        } else {
          return createInvalid();
        }
      });
      function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
          moments = moments[0];
        }
        if (!moments.length) {
          return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
          }
        }
        return res;
      }
      function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
      }
      function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
      }
      var now = function() {
        return Date.now ? Date.now() : +new Date();
      };
      var ordering = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond"
      ];
      function isDurationValid(m) {
        var key, unitHasDecimal = false, i;
        for (key in m) {
          if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
          }
        }
        for (i = 0; i < ordering.length; ++i) {
          if (m[ordering[i]]) {
            if (unitHasDecimal) {
              return false;
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
              unitHasDecimal = true;
            }
          }
        }
        return true;
      }
      function isValid$1() {
        return this._isValid;
      }
      function createInvalid$1() {
        return createDuration(NaN);
      }
      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
        this._days = +days2 + weeks2 * 7;
        this._months = +months2 + quarters * 3 + years2 * 12;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
      }
      function isDuration(obj) {
        return obj instanceof Duration;
      }
      function absRound(number) {
        if (number < 0) {
          return Math.round(-1 * number) * -1;
        } else {
          return Math.round(number);
        }
      }
      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
          if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
            diffs++;
          }
        }
        return diffs + lengthDiff;
      }
      function offset(token2, separator) {
        addFormatToken(token2, 0, 0, function() {
          var offset2 = this.utcOffset(), sign2 = "+";
          if (offset2 < 0) {
            offset2 = -offset2;
            sign2 = "-";
          }
          return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
        });
      }
      offset("Z", ":");
      offset("ZZ", "");
      addRegexToken("Z", matchShortOffset);
      addRegexToken("ZZ", matchShortOffset);
      addParseToken(["Z", "ZZ"], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });
      var chunkOffset = /([\+\-]|\d\d)/gi;
      function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes2;
        if (matches === null) {
          return null;
        }
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
        minutes2 = +(parts[1] * 60) + toInt(parts[2]);
        return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
      }
      function cloneWithOffset(input, model) {
        var res, diff2;
        if (model._isUTC) {
          res = model.clone();
          diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          res._d.setTime(res._d.valueOf() + diff2);
          hooks.updateOffset(res, false);
          return res;
        } else {
          return createLocal(input).local();
        }
      }
      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset());
      }
      hooks.updateOffset = function() {
      };
      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset2 = this._offset || 0, localAdjust;
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          if (typeof input === "string") {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
              return this;
            }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
            this.add(localAdjust, "m");
          }
          if (offset2 !== input) {
            if (!keepLocalTime || this._changeInProgress) {
              addSubtract(this, createDuration(input - offset2, "m"), 1, false);
            } else if (!this._changeInProgress) {
              this._changeInProgress = true;
              hooks.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
          return this;
        } else {
          return this._isUTC ? offset2 : getDateOffset(this);
        }
      }
      function getSetZone(input, keepLocalTime) {
        if (input != null) {
          if (typeof input !== "string") {
            input = -input;
          }
          this.utcOffset(input, keepLocalTime);
          return this;
        } else {
          return -this.utcOffset();
        }
      }
      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }
      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;
          if (keepLocalTime) {
            this.subtract(getDateOffset(this), "m");
          }
        }
        return this;
      }
      function setOffsetToParsedOffset() {
        if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === "string") {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
            this.utcOffset(tZone);
          } else {
            this.utcOffset(0, true);
          }
        }
        return this;
      }
      function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
          return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
      }
      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
        }
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
          this._isDSTShifted = false;
        }
        return this._isDSTShifted;
      }
      function isLocal() {
        return this.isValid() ? !this._isUTC : false;
      }
      function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
      }
      function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function createDuration(input, key) {
        var duration = input, match = null, sign2, ret, diffRes;
        if (isDuration(input)) {
          duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
          };
        } else if (isNumber(input) || !isNaN(+input)) {
          duration = {};
          if (key) {
            duration[key] = +input;
          } else {
            duration.milliseconds = +input;
          }
        } else if (match = aspNetRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign2,
            h: toInt(match[HOUR]) * sign2,
            m: toInt(match[MINUTE]) * sign2,
            s: toInt(match[SECOND]) * sign2,
            ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
          };
        } else if (match = isoRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: parseIso(match[2], sign2),
            M: parseIso(match[3], sign2),
            w: parseIso(match[4], sign2),
            d: parseIso(match[5], sign2),
            h: parseIso(match[6], sign2),
            m: parseIso(match[7], sign2),
            s: parseIso(match[8], sign2)
          };
        } else if (duration == null) {
          duration = {};
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
          diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, "_locale")) {
          ret._locale = input._locale;
        }
        if (isDuration(input) && hasOwnProp(input, "_isValid")) {
          ret._isValid = input._isValid;
        }
        return ret;
      }
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
      function parseIso(inp, sign2) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign2;
      }
      function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
          --res.months;
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
      }
      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
          return {milliseconds: 0, months: 0};
        }
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
        } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }
        return res;
      }
      function createAdder(direction, name) {
        return function(val, period) {
          var dur, tmp;
          if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
            tmp = val;
            val = period;
            period = tmp;
          }
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }
      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
        if (!mom.isValid()) {
          return;
        }
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months2) {
          setMonth(mom, get(mom, "Month") + months2 * isAdding);
        }
        if (days2) {
          set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
        }
        if (milliseconds2) {
          mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
        }
        if (updateOffset) {
          hooks.updateOffset(mom, days2 || months2);
        }
      }
      var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
      function isString(input) {
        return typeof input === "string" || input instanceof String;
      }
      function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
      }
      function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "years",
          "year",
          "y",
          "months",
          "month",
          "M",
          "days",
          "day",
          "d",
          "dates",
          "date",
          "D",
          "hours",
          "hour",
          "h",
          "minutes",
          "minute",
          "m",
          "seconds",
          "second",
          "s",
          "milliseconds",
          "millisecond",
          "ms"
        ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        if (arrayTest) {
          dataTypeTest = input.filter(function(item) {
            return !isNumber(item) && isString(input);
          }).length === 0;
        }
        return arrayTest && dataTypeTest;
      }
      function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "sameDay",
          "nextDay",
          "lastDay",
          "nextWeek",
          "lastWeek",
          "sameElse"
        ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function getCalendarFormat(myMoment, now2) {
        var diff2 = myMoment.diff(now2, "days", true);
        return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
      }
      function calendar$1(time, formats) {
        if (arguments.length === 1) {
          if (!arguments[0]) {
            time = void 0;
            formats = void 0;
          } else if (isMomentInput(arguments[0])) {
            time = arguments[0];
            formats = void 0;
          } else if (isCalendarSpec(arguments[0])) {
            formats = arguments[0];
            time = void 0;
          }
        }
        var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format3 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format3]) ? formats[format3].call(this, now2) : formats[format3]);
        return this.format(output || this.localeData().calendar(format3, this, createLocal(now2)));
      }
      function clone2() {
        return new Moment(this);
      }
      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() > localInput.valueOf();
        } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
      }
      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() < localInput.valueOf();
        } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
      }
      function isBetween(from2, to2, units, inclusivity) {
        var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
        }
        inclusivity = inclusivity || "()";
        return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
      }
      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() === localInput.valueOf();
        } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
      }
      function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }
      function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }
      function diff(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) {
          return NaN;
        }
        that = cloneWithOffset(input, this);
        if (!that.isValid()) {
          return NaN;
        }
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
        units = normalizeUnits(units);
        switch (units) {
          case "year":
            output = monthDiff(this, that) / 12;
            break;
          case "month":
            output = monthDiff(this, that);
            break;
          case "quarter":
            output = monthDiff(this, that) / 3;
            break;
          case "second":
            output = (this - that) / 1e3;
            break;
          case "minute":
            output = (this - that) / 6e4;
            break;
          case "hour":
            output = (this - that) / 36e5;
            break;
          case "day":
            output = (this - that - zoneDelta) / 864e5;
            break;
          case "week":
            output = (this - that - zoneDelta) / 6048e5;
            break;
          default:
            output = this - that;
        }
        return asFloat ? output : absFloor(output);
      }
      function monthDiff(a, b) {
        if (a.date() < b.date()) {
          return -monthDiff(b, a);
        }
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
          adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust) || 0;
      }
      hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function toISOString(keepOffset) {
        if (!this.isValid()) {
          return null;
        }
        var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
        }
        if (isFunction(Date.prototype.toISOString)) {
          if (utc) {
            return this.toDate().toISOString();
          } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
          }
        }
        return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
      }
      function inspect() {
        if (!this.isValid()) {
          return "moment.invalid(/* " + this._i + " */)";
        }
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
          zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
      }
      function format2(inputString) {
        if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }
      function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }
      function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }
      function locale(key) {
        var newLocaleData;
        if (key === void 0) {
          return this._locale._abbr;
        } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
            this._locale = newLocaleData;
          }
          return this;
        }
      }
      var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
        if (key === void 0) {
          return this.localeData();
        } else {
          return this.locale(key);
        }
      });
      function localeData() {
        return this._locale;
      }
      var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
      function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
      }
      function localStartOfDate(y, m, d2) {
        if (y < 100 && y >= 0) {
          return new Date(y + 400, m, d2) - MS_PER_400_YEARS;
        } else {
          return new Date(y, m, d2).valueOf();
        }
      }
      function utcStartOfDate(y, m, d2) {
        if (y < 100 && y >= 0) {
          return Date.UTC(y + 400, m, d2) - MS_PER_400_YEARS;
        } else {
          return Date.UTC(y, m, d2);
        }
      }
      function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year(), 0, 1);
            break;
          case "quarter":
            time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
            break;
          case "month":
            time = startOfDate(this.year(), this.month(), 1);
            break;
          case "week":
            time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
            break;
          case "isoWeek":
            time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date());
            break;
          case "hour":
            time = this._d.valueOf();
            time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
            break;
          case "minute":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_MINUTE);
            break;
          case "second":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_SECOND);
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
            break;
          case "month":
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
          case "isoWeek":
            time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            time = this._d.valueOf();
            time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
            break;
          case "minute":
            time = this._d.valueOf();
            time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
            break;
          case "second":
            time = this._d.valueOf();
            time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 6e4;
      }
      function unix() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function toDate() {
        return new Date(this.valueOf());
      }
      function toArray() {
        var m = this;
        return [
          m.year(),
          m.month(),
          m.date(),
          m.hour(),
          m.minute(),
          m.second(),
          m.millisecond()
        ];
      }
      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }
      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }
      function isValid$2() {
        return isValid(this);
      }
      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }
      function invalidAt() {
        return getParsingFlags(this).overflow;
      }
      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }
      addFormatToken("N", 0, 0, "eraAbbr");
      addFormatToken("NN", 0, 0, "eraAbbr");
      addFormatToken("NNN", 0, 0, "eraAbbr");
      addFormatToken("NNNN", 0, 0, "eraName");
      addFormatToken("NNNNN", 0, 0, "eraNarrow");
      addFormatToken("y", ["y", 1], "yo", "eraYear");
      addFormatToken("y", ["yy", 2], 0, "eraYear");
      addFormatToken("y", ["yyy", 3], 0, "eraYear");
      addFormatToken("y", ["yyyy", 4], 0, "eraYear");
      addRegexToken("N", matchEraAbbr);
      addRegexToken("NN", matchEraAbbr);
      addRegexToken("NNN", matchEraAbbr);
      addRegexToken("NNNN", matchEraName);
      addRegexToken("NNNNN", matchEraNarrow);
      addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array, config, token2) {
        var era = config._locale.erasParse(input, token2, config._strict);
        if (era) {
          getParsingFlags(config).era = era;
        } else {
          getParsingFlags(config).invalidEra = input;
        }
      });
      addRegexToken("y", matchUnsigned);
      addRegexToken("yy", matchUnsigned);
      addRegexToken("yyy", matchUnsigned);
      addRegexToken("yyyy", matchUnsigned);
      addRegexToken("yo", matchEraYearOrdinal);
      addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
      addParseToken(["yo"], function(input, array, config, token2) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
          match = input.match(config._locale._eraYearOrdinalRegex);
        }
        if (config._locale.eraYearOrdinalParse) {
          array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
          array[YEAR] = parseInt(input, 10);
        }
      });
      function localeEras(m, format3) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
            case "string":
              date = hooks(eras[i].since).startOf("day");
              eras[i].since = date.valueOf();
              break;
          }
          switch (typeof eras[i].until) {
            case "undefined":
              eras[i].until = Infinity;
              break;
            case "string":
              date = hooks(eras[i].until).startOf("day").valueOf();
              eras[i].until = date.valueOf();
              break;
          }
        }
        return eras;
      }
      function localeErasParse(eraName, format3, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();
          if (strict) {
            switch (format3) {
              case "N":
              case "NN":
              case "NNN":
                if (abbr === eraName) {
                  return eras[i];
                }
                break;
              case "NNNN":
                if (name === eraName) {
                  return eras[i];
                }
                break;
              case "NNNNN":
                if (narrow === eraName) {
                  return eras[i];
                }
                break;
            }
          } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
            return eras[i];
          }
        }
      }
      function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === void 0) {
          return hooks(era.since).year();
        } else {
          return hooks(era.since).year() + (year - era.offset) * dir;
        }
      }
      function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].name;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].name;
          }
        }
        return "";
      }
      function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].narrow;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].narrow;
          }
        }
        return "";
      }
      function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].abbr;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].abbr;
          }
        }
        return "";
      }
      function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? 1 : -1;
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
            return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
          }
        }
        return this.year();
      }
      function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNameRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
      }
      function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, "_erasAbbrRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
      function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNarrowRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
      function matchEraAbbr(isStrict, locale2) {
        return locale2.erasAbbrRegex(isStrict);
      }
      function matchEraName(isStrict, locale2) {
        return locale2.erasNameRegex(isStrict);
      }
      function matchEraNarrow(isStrict, locale2) {
        return locale2.erasNarrowRegex(isStrict);
      }
      function matchEraYearOrdinal(isStrict, locale2) {
        return locale2._eraYearOrdinalRegex || matchUnsigned;
      }
      function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          namePieces.push(regexEscape(eras[i].name));
          abbrPieces.push(regexEscape(eras[i].abbr));
          narrowPieces.push(regexEscape(eras[i].narrow));
          mixedPieces.push(regexEscape(eras[i].name));
          mixedPieces.push(regexEscape(eras[i].abbr));
          mixedPieces.push(regexEscape(eras[i].narrow));
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
      }
      addFormatToken(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      });
      addFormatToken(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function addWeekYearFormatToken(token2, getter) {
        addFormatToken(0, [token2, token2.length], 0, getter);
      }
      addWeekYearFormatToken("gggg", "weekYear");
      addWeekYearFormatToken("ggggg", "weekYear");
      addWeekYearFormatToken("GGGG", "isoWeekYear");
      addWeekYearFormatToken("GGGGG", "isoWeekYear");
      addUnitAlias("weekYear", "gg");
      addUnitAlias("isoWeekYear", "GG");
      addUnitPriority("weekYear", 1);
      addUnitPriority("isoWeekYear", 1);
      addRegexToken("G", matchSigned);
      addRegexToken("g", matchSigned);
      addRegexToken("GG", match1to2, match2);
      addRegexToken("gg", match1to2, match2);
      addRegexToken("GGGG", match1to4, match4);
      addRegexToken("gggg", match1to4, match4);
      addRegexToken("GGGGG", match1to6, match6);
      addRegexToken("ggggg", match1to6, match6);
      addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
        week[token2.substr(0, 2)] = toInt(input);
      });
      addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
        week[token2] = hooks.parseTwoDigitYear(input);
      });
      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
      }
      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
      }
      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }
      function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
      }
      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
      function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
          return weekOfYear(this, dow, doy).year;
        } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
            week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
      }
      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }
      addFormatToken("Q", 0, "Qo", "quarter");
      addUnitAlias("quarter", "Q");
      addUnitPriority("quarter", 7);
      addRegexToken("Q", match1);
      addParseToken("Q", function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
      });
      function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }
      addFormatToken("D", ["DD", 2], "Do", "date");
      addUnitAlias("date", "D");
      addUnitPriority("date", 9);
      addRegexToken("D", match1to2);
      addRegexToken("DD", match1to2, match2);
      addRegexToken("Do", function(isStrict, locale2) {
        return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
      });
      addParseToken(["D", "DD"], DATE);
      addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
      });
      var getSetDayOfMonth = makeGetSet("Date", true);
      addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
      addUnitAlias("dayOfYear", "DDD");
      addUnitPriority("dayOfYear", 4);
      addRegexToken("DDD", match1to3);
      addRegexToken("DDDD", match3);
      addParseToken(["DDD", "DDDD"], function(input, array, config) {
        config._dayOfYear = toInt(input);
      });
      function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
      }
      addFormatToken("m", ["mm", 2], 0, "minute");
      addUnitAlias("minute", "m");
      addUnitPriority("minute", 14);
      addRegexToken("m", match1to2);
      addRegexToken("mm", match1to2, match2);
      addParseToken(["m", "mm"], MINUTE);
      var getSetMinute = makeGetSet("Minutes", false);
      addFormatToken("s", ["ss", 2], 0, "second");
      addUnitAlias("second", "s");
      addUnitPriority("second", 15);
      addRegexToken("s", match1to2);
      addRegexToken("ss", match1to2, match2);
      addParseToken(["s", "ss"], SECOND);
      var getSetSecond = makeGetSet("Seconds", false);
      addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      });
      addFormatToken(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      });
      addFormatToken(0, ["SSS", 3], 0, "millisecond");
      addFormatToken(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      });
      addFormatToken(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      });
      addFormatToken(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      });
      addFormatToken(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      });
      addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      });
      addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      });
      addUnitAlias("millisecond", "ms");
      addUnitPriority("millisecond", 16);
      addRegexToken("S", match1to3, match1);
      addRegexToken("SS", match1to3, match2);
      addRegexToken("SSS", match1to3, match3);
      var token, getSetMillisecond;
      for (token = "SSSS"; token.length <= 9; token += "S") {
        addRegexToken(token, matchUnsigned);
      }
      function parseMs(input, array) {
        array[MILLISECOND] = toInt(("0." + input) * 1e3);
      }
      for (token = "S"; token.length <= 9; token += "S") {
        addParseToken(token, parseMs);
      }
      getSetMillisecond = makeGetSet("Milliseconds", false);
      addFormatToken("z", 0, 0, "zoneAbbr");
      addFormatToken("zz", 0, 0, "zoneName");
      function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
      }
      function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var proto = Moment.prototype;
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone2;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format2;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== "undefined" && Symbol.for != null) {
        proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
          return "Moment<" + this.format() + ">";
        };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
      proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
      proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
      proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
      proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
      function createUnix(input) {
        return createLocal(input * 1e3);
      }
      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }
      function preParsePostFormat(string) {
        return string;
      }
      var proto$1 = Locale.prototype;
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
      function get$1(format3, index2, field, setter) {
        var locale2 = getLocale(), utc = createUTC().set(setter, index2);
        return locale2[field](utc, format3);
      }
      function listMonthsImpl(format3, index2, field) {
        if (isNumber(format3)) {
          index2 = format3;
          format3 = void 0;
        }
        format3 = format3 || "";
        if (index2 != null) {
          return get$1(format3, index2, field, "month");
        }
        var i, out = [];
        for (i = 0; i < 12; i++) {
          out[i] = get$1(format3, i, field, "month");
        }
        return out;
      }
      function listWeekdaysImpl(localeSorted, format3, index2, field) {
        if (typeof localeSorted === "boolean") {
          if (isNumber(format3)) {
            index2 = format3;
            format3 = void 0;
          }
          format3 = format3 || "";
        } else {
          format3 = localeSorted;
          index2 = format3;
          localeSorted = false;
          if (isNumber(format3)) {
            index2 = format3;
            format3 = void 0;
          }
          format3 = format3 || "";
        }
        var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
        if (index2 != null) {
          return get$1(format3, (index2 + shift) % 7, field, "day");
        }
        for (i = 0; i < 7; i++) {
          out[i] = get$1(format3, (i + shift) % 7, field, "day");
        }
        return out;
      }
      function listMonths(format3, index2) {
        return listMonthsImpl(format3, index2, "months");
      }
      function listMonthsShort(format3, index2) {
        return listMonthsImpl(format3, index2, "monthsShort");
      }
      function listWeekdays(localeSorted, format3, index2) {
        return listWeekdaysImpl(localeSorted, format3, index2, "weekdays");
      }
      function listWeekdaysShort(localeSorted, format3, index2) {
        return listWeekdaysImpl(localeSorted, format3, index2, "weekdaysShort");
      }
      function listWeekdaysMin(localeSorted, format3, index2) {
        return listWeekdaysImpl(localeSorted, format3, index2, "weekdaysMin");
      }
      getSetGlobalLocale("en", {
        eras: [
          {
            since: "0001-01-01",
            until: Infinity,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD"
          },
          {
            since: "0000-12-31",
            until: -Infinity,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC"
          }
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
          var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
          return number + output;
        }
      });
      hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
      hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
      var mathAbs = Math.abs;
      function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
      }
      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
      }
      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }
      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }
      function absCeil(number) {
        if (number < 0) {
          return Math.floor(number);
        } else {
          return Math.ceil(number);
        }
      }
      function bubble() {
        var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
        if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
          milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
          days2 = 0;
          months2 = 0;
        }
        data.milliseconds = milliseconds2 % 1e3;
        seconds2 = absFloor(milliseconds2 / 1e3);
        data.seconds = seconds2 % 60;
        minutes2 = absFloor(seconds2 / 60);
        data.minutes = minutes2 % 60;
        hours2 = absFloor(minutes2 / 60);
        data.hours = hours2 % 24;
        days2 += absFloor(hours2 / 24);
        monthsFromDays = absFloor(daysToMonths(days2));
        months2 += monthsFromDays;
        days2 -= absCeil(monthsToDays(monthsFromDays));
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        data.days = days2;
        data.months = months2;
        data.years = years2;
        return this;
      }
      function daysToMonths(days2) {
        return days2 * 4800 / 146097;
      }
      function monthsToDays(months2) {
        return months2 * 146097 / 4800;
      }
      function as(units) {
        if (!this.isValid()) {
          return NaN;
        }
        var days2, months2, milliseconds2 = this._milliseconds;
        units = normalizeUnits(units);
        if (units === "month" || units === "quarter" || units === "year") {
          days2 = this._days + milliseconds2 / 864e5;
          months2 = this._months + daysToMonths(days2);
          switch (units) {
            case "month":
              return months2;
            case "quarter":
              return months2 / 3;
            case "year":
              return months2 / 12;
          }
        } else {
          days2 = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
            case "week":
              return days2 / 7 + milliseconds2 / 6048e5;
            case "day":
              return days2 + milliseconds2 / 864e5;
            case "hour":
              return days2 * 24 + milliseconds2 / 36e5;
            case "minute":
              return days2 * 1440 + milliseconds2 / 6e4;
            case "second":
              return days2 * 86400 + milliseconds2 / 1e3;
            case "millisecond":
              return Math.floor(days2 * 864e5) + milliseconds2;
            default:
              throw new Error("Unknown unit " + units);
          }
        }
      }
      function valueOf$1() {
        if (!this.isValid()) {
          return NaN;
        }
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
      }
      function makeAs(alias) {
        return function() {
          return this.as(alias);
        };
      }
      var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
      function clone$1() {
        return createDuration(this);
      }
      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
      }
      function makeGetter(name) {
        return function() {
          return this.isValid() ? this._data[name] : NaN;
        };
      }
      var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
      function weeks() {
        return absFloor(this.days() / 7);
      }
      var round = Math.round, thresholds = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        w: null,
        M: 11
      };
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
        return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
        var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
        if (thresholds2.w != null) {
          a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
        }
        a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale2;
        return substituteTimeAgo.apply(null, a);
      }
      function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === void 0) {
          return round;
        }
        if (typeof roundingFunction === "function") {
          round = roundingFunction;
          return true;
        }
        return false;
      }
      function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === void 0) {
          return false;
        }
        if (limit === void 0) {
          return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === "s") {
          thresholds.ss = limit - 1;
        }
        return true;
      }
      function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var withSuffix = false, th = thresholds, locale2, output;
        if (typeof argWithSuffix === "object") {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
        }
        if (typeof argWithSuffix === "boolean") {
          withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === "object") {
          th = Object.assign({}, thresholds, argThresholds);
          if (argThresholds.s != null && argThresholds.ss == null) {
            th.ss = argThresholds.s - 1;
          }
        }
        locale2 = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale2);
        if (withSuffix) {
          output = locale2.pastFuture(+this, output);
        }
        return locale2.postformat(output);
      }
      var abs$1 = Math.abs;
      function sign(x) {
        return (x > 0) - (x < 0) || +x;
      }
      function toISOString$1() {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s2, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) {
          return "P0D";
        }
        minutes2 = absFloor(seconds2 / 60);
        hours2 = absFloor(minutes2 / 60);
        seconds2 %= 60;
        minutes2 %= 60;
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        s2 = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign(this._months) !== sign(total) ? "-" : "";
        daysSign = sign(this._days) !== sign(total) ? "-" : "";
        hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
        return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s2 + "S" : "");
      }
      var proto$2 = Duration.prototype;
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;
      proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
      proto$2.lang = lang;
      addFormatToken("X", 0, 0, "unix");
      addFormatToken("x", 0, 0, "valueOf");
      addRegexToken("x", matchSigned);
      addRegexToken("X", matchTimestamp);
      addParseToken("X", function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1e3);
      });
      addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
      });
      hooks.version = "2.29.1";
      setHookCallback(createLocal);
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
      hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
      };
      return hooks;
    });
  }
});

// node_modules/chart.js/dist/Chart.js
var require_Chart = __commonJS({
  "node_modules/chart.js/dist/Chart.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory(function() {
        try {
          return require_moment();
        } catch (e) {
        }
      }()) : typeof define === "function" && define.amd ? define(["require"], function(require2) {
        return factory(function() {
          try {
            return require2("moment");
          } catch (e) {
          }
        }());
      }) : (global2 = global2 || self, global2.Chart = factory(global2.moment));
    })(exports, function(moment) {
      "use strict";
      moment = moment && moment.hasOwnProperty("default") ? moment["default"] : moment;
      function createCommonjsModule(fn, module3) {
        return module3 = {exports: {}}, fn(module3, module3.exports), module3.exports;
      }
      function getCjsExportFromNamespace(n) {
        return n && n["default"] || n;
      }
      var colorName = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
      var conversions = createCommonjsModule(function(module3) {
        var reverseKeywords = {};
        for (var key in colorName) {
          if (colorName.hasOwnProperty(key)) {
            reverseKeywords[colorName[key]] = key;
          }
        }
        var convert2 = module3.exports = {
          rgb: {channels: 3, labels: "rgb"},
          hsl: {channels: 3, labels: "hsl"},
          hsv: {channels: 3, labels: "hsv"},
          hwb: {channels: 3, labels: "hwb"},
          cmyk: {channels: 4, labels: "cmyk"},
          xyz: {channels: 3, labels: "xyz"},
          lab: {channels: 3, labels: "lab"},
          lch: {channels: 3, labels: "lch"},
          hex: {channels: 1, labels: ["hex"]},
          keyword: {channels: 1, labels: ["keyword"]},
          ansi16: {channels: 1, labels: ["ansi16"]},
          ansi256: {channels: 1, labels: ["ansi256"]},
          hcg: {channels: 3, labels: ["h", "c", "g"]},
          apple: {channels: 3, labels: ["r16", "g16", "b16"]},
          gray: {channels: 1, labels: ["gray"]}
        };
        for (var model in convert2) {
          if (convert2.hasOwnProperty(model)) {
            if (!("channels" in convert2[model])) {
              throw new Error("missing channels property: " + model);
            }
            if (!("labels" in convert2[model])) {
              throw new Error("missing channel labels property: " + model);
            }
            if (convert2[model].labels.length !== convert2[model].channels) {
              throw new Error("channel and label counts mismatch: " + model);
            }
            var channels = convert2[model].channels;
            var labels = convert2[model].labels;
            delete convert2[model].channels;
            delete convert2[model].labels;
            Object.defineProperty(convert2[model], "channels", {value: channels});
            Object.defineProperty(convert2[model], "labels", {value: labels});
          }
        }
        convert2.rgb.hsl = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var min = Math.min(r, g, b);
          var max = Math.max(r, g, b);
          var delta = max - min;
          var h;
          var s2;
          var l;
          if (max === min) {
            h = 0;
          } else if (r === max) {
            h = (g - b) / delta;
          } else if (g === max) {
            h = 2 + (b - r) / delta;
          } else if (b === max) {
            h = 4 + (r - g) / delta;
          }
          h = Math.min(h * 60, 360);
          if (h < 0) {
            h += 360;
          }
          l = (min + max) / 2;
          if (max === min) {
            s2 = 0;
          } else if (l <= 0.5) {
            s2 = delta / (max + min);
          } else {
            s2 = delta / (2 - max - min);
          }
          return [h, s2 * 100, l * 100];
        };
        convert2.rgb.hsv = function(rgb) {
          var rdif;
          var gdif;
          var bdif;
          var h;
          var s2;
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var v = Math.max(r, g, b);
          var diff = v - Math.min(r, g, b);
          var diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
          };
          if (diff === 0) {
            h = s2 = 0;
          } else {
            s2 = diff / v;
            rdif = diffc(r);
            gdif = diffc(g);
            bdif = diffc(b);
            if (r === v) {
              h = bdif - gdif;
            } else if (g === v) {
              h = 1 / 3 + rdif - bdif;
            } else if (b === v) {
              h = 2 / 3 + gdif - rdif;
            }
            if (h < 0) {
              h += 1;
            } else if (h > 1) {
              h -= 1;
            }
          }
          return [
            h * 360,
            s2 * 100,
            v * 100
          ];
        };
        convert2.rgb.hwb = function(rgb) {
          var r = rgb[0];
          var g = rgb[1];
          var b = rgb[2];
          var h = convert2.rgb.hsl(rgb)[0];
          var w = 1 / 255 * Math.min(r, Math.min(g, b));
          b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
          return [h, w * 100, b * 100];
        };
        convert2.rgb.cmyk = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var c;
          var m;
          var y;
          var k2;
          k2 = Math.min(1 - r, 1 - g, 1 - b);
          c = (1 - r - k2) / (1 - k2) || 0;
          m = (1 - g - k2) / (1 - k2) || 0;
          y = (1 - b - k2) / (1 - k2) || 0;
          return [c * 100, m * 100, y * 100, k2 * 100];
        };
        function comparativeDistance(x, y) {
          return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
        }
        convert2.rgb.keyword = function(rgb) {
          var reversed = reverseKeywords[rgb];
          if (reversed) {
            return reversed;
          }
          var currentClosestDistance = Infinity;
          var currentClosestKeyword;
          for (var keyword2 in colorName) {
            if (colorName.hasOwnProperty(keyword2)) {
              var value = colorName[keyword2];
              var distance = comparativeDistance(rgb, value);
              if (distance < currentClosestDistance) {
                currentClosestDistance = distance;
                currentClosestKeyword = keyword2;
              }
            }
          }
          return currentClosestKeyword;
        };
        convert2.keyword.rgb = function(keyword2) {
          return colorName[keyword2];
        };
        convert2.rgb.xyz = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
          g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
          b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
          var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
          var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
          var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
          return [x * 100, y * 100, z * 100];
        };
        convert2.rgb.lab = function(rgb) {
          var xyz = convert2.rgb.xyz(rgb);
          var x = xyz[0];
          var y = xyz[1];
          var z = xyz[2];
          var l;
          var a;
          var b;
          x /= 95.047;
          y /= 100;
          z /= 108.883;
          x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
          y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
          z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
          l = 116 * y - 16;
          a = 500 * (x - y);
          b = 200 * (y - z);
          return [l, a, b];
        };
        convert2.hsl.rgb = function(hsl) {
          var h = hsl[0] / 360;
          var s2 = hsl[1] / 100;
          var l = hsl[2] / 100;
          var t1;
          var t2;
          var t3;
          var rgb;
          var val;
          if (s2 === 0) {
            val = l * 255;
            return [val, val, val];
          }
          if (l < 0.5) {
            t2 = l * (1 + s2);
          } else {
            t2 = l + s2 - l * s2;
          }
          t1 = 2 * l - t2;
          rgb = [0, 0, 0];
          for (var i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) {
              t3++;
            }
            if (t3 > 1) {
              t3--;
            }
            if (6 * t3 < 1) {
              val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
              val = t2;
            } else if (3 * t3 < 2) {
              val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
              val = t1;
            }
            rgb[i] = val * 255;
          }
          return rgb;
        };
        convert2.hsl.hsv = function(hsl) {
          var h = hsl[0];
          var s2 = hsl[1] / 100;
          var l = hsl[2] / 100;
          var smin = s2;
          var lmin = Math.max(l, 0.01);
          var sv;
          var v;
          l *= 2;
          s2 *= l <= 1 ? l : 2 - l;
          smin *= lmin <= 1 ? lmin : 2 - lmin;
          v = (l + s2) / 2;
          sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s2 / (l + s2);
          return [h, sv * 100, v * 100];
        };
        convert2.hsv.rgb = function(hsv) {
          var h = hsv[0] / 60;
          var s2 = hsv[1] / 100;
          var v = hsv[2] / 100;
          var hi = Math.floor(h) % 6;
          var f = h - Math.floor(h);
          var p = 255 * v * (1 - s2);
          var q = 255 * v * (1 - s2 * f);
          var t = 255 * v * (1 - s2 * (1 - f));
          v *= 255;
          switch (hi) {
            case 0:
              return [v, t, p];
            case 1:
              return [q, v, p];
            case 2:
              return [p, v, t];
            case 3:
              return [p, q, v];
            case 4:
              return [t, p, v];
            case 5:
              return [v, p, q];
          }
        };
        convert2.hsv.hsl = function(hsv) {
          var h = hsv[0];
          var s2 = hsv[1] / 100;
          var v = hsv[2] / 100;
          var vmin = Math.max(v, 0.01);
          var lmin;
          var sl;
          var l;
          l = (2 - s2) * v;
          lmin = (2 - s2) * vmin;
          sl = s2 * vmin;
          sl /= lmin <= 1 ? lmin : 2 - lmin;
          sl = sl || 0;
          l /= 2;
          return [h, sl * 100, l * 100];
        };
        convert2.hwb.rgb = function(hwb) {
          var h = hwb[0] / 360;
          var wh = hwb[1] / 100;
          var bl = hwb[2] / 100;
          var ratio = wh + bl;
          var i;
          var v;
          var f;
          var n;
          if (ratio > 1) {
            wh /= ratio;
            bl /= ratio;
          }
          i = Math.floor(6 * h);
          v = 1 - bl;
          f = 6 * h - i;
          if ((i & 1) !== 0) {
            f = 1 - f;
          }
          n = wh + f * (v - wh);
          var r;
          var g;
          var b;
          switch (i) {
            default:
            case 6:
            case 0:
              r = v;
              g = n;
              b = wh;
              break;
            case 1:
              r = n;
              g = v;
              b = wh;
              break;
            case 2:
              r = wh;
              g = v;
              b = n;
              break;
            case 3:
              r = wh;
              g = n;
              b = v;
              break;
            case 4:
              r = n;
              g = wh;
              b = v;
              break;
            case 5:
              r = v;
              g = wh;
              b = n;
              break;
          }
          return [r * 255, g * 255, b * 255];
        };
        convert2.cmyk.rgb = function(cmyk) {
          var c = cmyk[0] / 100;
          var m = cmyk[1] / 100;
          var y = cmyk[2] / 100;
          var k2 = cmyk[3] / 100;
          var r;
          var g;
          var b;
          r = 1 - Math.min(1, c * (1 - k2) + k2);
          g = 1 - Math.min(1, m * (1 - k2) + k2);
          b = 1 - Math.min(1, y * (1 - k2) + k2);
          return [r * 255, g * 255, b * 255];
        };
        convert2.xyz.rgb = function(xyz) {
          var x = xyz[0] / 100;
          var y = xyz[1] / 100;
          var z = xyz[2] / 100;
          var r;
          var g;
          var b;
          r = x * 3.2406 + y * -1.5372 + z * -0.4986;
          g = x * -0.9689 + y * 1.8758 + z * 0.0415;
          b = x * 0.0557 + y * -0.204 + z * 1.057;
          r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
          g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
          b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
          r = Math.min(Math.max(0, r), 1);
          g = Math.min(Math.max(0, g), 1);
          b = Math.min(Math.max(0, b), 1);
          return [r * 255, g * 255, b * 255];
        };
        convert2.xyz.lab = function(xyz) {
          var x = xyz[0];
          var y = xyz[1];
          var z = xyz[2];
          var l;
          var a;
          var b;
          x /= 95.047;
          y /= 100;
          z /= 108.883;
          x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
          y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
          z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
          l = 116 * y - 16;
          a = 500 * (x - y);
          b = 200 * (y - z);
          return [l, a, b];
        };
        convert2.lab.xyz = function(lab) {
          var l = lab[0];
          var a = lab[1];
          var b = lab[2];
          var x;
          var y;
          var z;
          y = (l + 16) / 116;
          x = a / 500 + y;
          z = y - b / 200;
          var y2 = Math.pow(y, 3);
          var x2 = Math.pow(x, 3);
          var z2 = Math.pow(z, 3);
          y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
          x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
          z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
          x *= 95.047;
          y *= 100;
          z *= 108.883;
          return [x, y, z];
        };
        convert2.lab.lch = function(lab) {
          var l = lab[0];
          var a = lab[1];
          var b = lab[2];
          var hr;
          var h;
          var c;
          hr = Math.atan2(b, a);
          h = hr * 360 / 2 / Math.PI;
          if (h < 0) {
            h += 360;
          }
          c = Math.sqrt(a * a + b * b);
          return [l, c, h];
        };
        convert2.lch.lab = function(lch) {
          var l = lch[0];
          var c = lch[1];
          var h = lch[2];
          var a;
          var b;
          var hr;
          hr = h / 360 * 2 * Math.PI;
          a = c * Math.cos(hr);
          b = c * Math.sin(hr);
          return [l, a, b];
        };
        convert2.rgb.ansi16 = function(args) {
          var r = args[0];
          var g = args[1];
          var b = args[2];
          var value = 1 in arguments ? arguments[1] : convert2.rgb.hsv(args)[2];
          value = Math.round(value / 50);
          if (value === 0) {
            return 30;
          }
          var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
          if (value === 2) {
            ansi += 60;
          }
          return ansi;
        };
        convert2.hsv.ansi16 = function(args) {
          return convert2.rgb.ansi16(convert2.hsv.rgb(args), args[2]);
        };
        convert2.rgb.ansi256 = function(args) {
          var r = args[0];
          var g = args[1];
          var b = args[2];
          if (r === g && g === b) {
            if (r < 8) {
              return 16;
            }
            if (r > 248) {
              return 231;
            }
            return Math.round((r - 8) / 247 * 24) + 232;
          }
          var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
          return ansi;
        };
        convert2.ansi16.rgb = function(args) {
          var color = args % 10;
          if (color === 0 || color === 7) {
            if (args > 50) {
              color += 3.5;
            }
            color = color / 10.5 * 255;
            return [color, color, color];
          }
          var mult = (~~(args > 50) + 1) * 0.5;
          var r = (color & 1) * mult * 255;
          var g = (color >> 1 & 1) * mult * 255;
          var b = (color >> 2 & 1) * mult * 255;
          return [r, g, b];
        };
        convert2.ansi256.rgb = function(args) {
          if (args >= 232) {
            var c = (args - 232) * 10 + 8;
            return [c, c, c];
          }
          args -= 16;
          var rem;
          var r = Math.floor(args / 36) / 5 * 255;
          var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
          var b = rem % 6 / 5 * 255;
          return [r, g, b];
        };
        convert2.rgb.hex = function(args) {
          var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
          var string = integer.toString(16).toUpperCase();
          return "000000".substring(string.length) + string;
        };
        convert2.hex.rgb = function(args) {
          var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
          if (!match) {
            return [0, 0, 0];
          }
          var colorString2 = match[0];
          if (match[0].length === 3) {
            colorString2 = colorString2.split("").map(function(char) {
              return char + char;
            }).join("");
          }
          var integer = parseInt(colorString2, 16);
          var r = integer >> 16 & 255;
          var g = integer >> 8 & 255;
          var b = integer & 255;
          return [r, g, b];
        };
        convert2.rgb.hcg = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var max = Math.max(Math.max(r, g), b);
          var min = Math.min(Math.min(r, g), b);
          var chroma = max - min;
          var grayscale;
          var hue;
          if (chroma < 1) {
            grayscale = min / (1 - chroma);
          } else {
            grayscale = 0;
          }
          if (chroma <= 0) {
            hue = 0;
          } else if (max === r) {
            hue = (g - b) / chroma % 6;
          } else if (max === g) {
            hue = 2 + (b - r) / chroma;
          } else {
            hue = 4 + (r - g) / chroma + 4;
          }
          hue /= 6;
          hue %= 1;
          return [hue * 360, chroma * 100, grayscale * 100];
        };
        convert2.hsl.hcg = function(hsl) {
          var s2 = hsl[1] / 100;
          var l = hsl[2] / 100;
          var c = 1;
          var f = 0;
          if (l < 0.5) {
            c = 2 * s2 * l;
          } else {
            c = 2 * s2 * (1 - l);
          }
          if (c < 1) {
            f = (l - 0.5 * c) / (1 - c);
          }
          return [hsl[0], c * 100, f * 100];
        };
        convert2.hsv.hcg = function(hsv) {
          var s2 = hsv[1] / 100;
          var v = hsv[2] / 100;
          var c = s2 * v;
          var f = 0;
          if (c < 1) {
            f = (v - c) / (1 - c);
          }
          return [hsv[0], c * 100, f * 100];
        };
        convert2.hcg.rgb = function(hcg) {
          var h = hcg[0] / 360;
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          if (c === 0) {
            return [g * 255, g * 255, g * 255];
          }
          var pure = [0, 0, 0];
          var hi = h % 1 * 6;
          var v = hi % 1;
          var w = 1 - v;
          var mg = 0;
          switch (Math.floor(hi)) {
            case 0:
              pure[0] = 1;
              pure[1] = v;
              pure[2] = 0;
              break;
            case 1:
              pure[0] = w;
              pure[1] = 1;
              pure[2] = 0;
              break;
            case 2:
              pure[0] = 0;
              pure[1] = 1;
              pure[2] = v;
              break;
            case 3:
              pure[0] = 0;
              pure[1] = w;
              pure[2] = 1;
              break;
            case 4:
              pure[0] = v;
              pure[1] = 0;
              pure[2] = 1;
              break;
            default:
              pure[0] = 1;
              pure[1] = 0;
              pure[2] = w;
          }
          mg = (1 - c) * g;
          return [
            (c * pure[0] + mg) * 255,
            (c * pure[1] + mg) * 255,
            (c * pure[2] + mg) * 255
          ];
        };
        convert2.hcg.hsv = function(hcg) {
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          var v = c + g * (1 - c);
          var f = 0;
          if (v > 0) {
            f = c / v;
          }
          return [hcg[0], f * 100, v * 100];
        };
        convert2.hcg.hsl = function(hcg) {
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          var l = g * (1 - c) + 0.5 * c;
          var s2 = 0;
          if (l > 0 && l < 0.5) {
            s2 = c / (2 * l);
          } else if (l >= 0.5 && l < 1) {
            s2 = c / (2 * (1 - l));
          }
          return [hcg[0], s2 * 100, l * 100];
        };
        convert2.hcg.hwb = function(hcg) {
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          var v = c + g * (1 - c);
          return [hcg[0], (v - c) * 100, (1 - v) * 100];
        };
        convert2.hwb.hcg = function(hwb) {
          var w = hwb[1] / 100;
          var b = hwb[2] / 100;
          var v = 1 - b;
          var c = v - w;
          var g = 0;
          if (c < 1) {
            g = (v - c) / (1 - c);
          }
          return [hwb[0], c * 100, g * 100];
        };
        convert2.apple.rgb = function(apple) {
          return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
        };
        convert2.rgb.apple = function(rgb) {
          return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
        };
        convert2.gray.rgb = function(args) {
          return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
        };
        convert2.gray.hsl = convert2.gray.hsv = function(args) {
          return [0, 0, args[0]];
        };
        convert2.gray.hwb = function(gray) {
          return [0, 100, gray[0]];
        };
        convert2.gray.cmyk = function(gray) {
          return [0, 0, 0, gray[0]];
        };
        convert2.gray.lab = function(gray) {
          return [gray[0], 0, 0];
        };
        convert2.gray.hex = function(gray) {
          var val = Math.round(gray[0] / 100 * 255) & 255;
          var integer = (val << 16) + (val << 8) + val;
          var string = integer.toString(16).toUpperCase();
          return "000000".substring(string.length) + string;
        };
        convert2.rgb.gray = function(rgb) {
          var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
          return [val / 255 * 100];
        };
      });
      var conversions_1 = conversions.rgb;
      var conversions_2 = conversions.hsl;
      var conversions_3 = conversions.hsv;
      var conversions_4 = conversions.hwb;
      var conversions_5 = conversions.cmyk;
      var conversions_6 = conversions.xyz;
      var conversions_7 = conversions.lab;
      var conversions_8 = conversions.lch;
      var conversions_9 = conversions.hex;
      var conversions_10 = conversions.keyword;
      var conversions_11 = conversions.ansi16;
      var conversions_12 = conversions.ansi256;
      var conversions_13 = conversions.hcg;
      var conversions_14 = conversions.apple;
      var conversions_15 = conversions.gray;
      function buildGraph() {
        var graph2 = {};
        var models2 = Object.keys(conversions);
        for (var len = models2.length, i = 0; i < len; i++) {
          graph2[models2[i]] = {
            distance: -1,
            parent: null
          };
        }
        return graph2;
      }
      function deriveBFS(fromModel) {
        var graph2 = buildGraph();
        var queue = [fromModel];
        graph2[fromModel].distance = 0;
        while (queue.length) {
          var current = queue.pop();
          var adjacents = Object.keys(conversions[current]);
          for (var len = adjacents.length, i = 0; i < len; i++) {
            var adjacent = adjacents[i];
            var node = graph2[adjacent];
            if (node.distance === -1) {
              node.distance = graph2[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph2;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph2) {
        var path = [graph2[toModel].parent, toModel];
        var fn = conversions[graph2[toModel].parent][toModel];
        var cur = graph2[toModel].parent;
        while (graph2[cur].parent) {
          path.unshift(graph2[cur].parent);
          fn = link(conversions[graph2[cur].parent][cur], fn);
          cur = graph2[cur].parent;
        }
        fn.conversion = path;
        return fn;
      }
      var route = function(fromModel) {
        var graph2 = deriveBFS(fromModel);
        var conversion = {};
        var models2 = Object.keys(graph2);
        for (var len = models2.length, i = 0; i < len; i++) {
          var toModel = models2[i];
          var node = graph2[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph2);
        }
        return conversion;
      };
      var convert = {};
      var models = Object.keys(conversions);
      function wrapRaw(fn) {
        var wrappedFn = function(args) {
          if (args === void 0 || args === null) {
            return args;
          }
          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        var wrappedFn = function(args) {
          if (args === void 0 || args === null) {
            return args;
          }
          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }
          var result = fn(args);
          if (typeof result === "object") {
            for (var len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach(function(fromModel) {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", {value: conversions[fromModel].channels});
        Object.defineProperty(convert[fromModel], "labels", {value: conversions[fromModel].labels});
        var routes = route(fromModel);
        var routeModels = Object.keys(routes);
        routeModels.forEach(function(toModel) {
          var fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      var colorConvert = convert;
      var colorName$1 = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
      var colorString = {
        getRgba,
        getHsla,
        getRgb,
        getHsl,
        getHwb,
        getAlpha,
        hexString,
        rgbString,
        rgbaString,
        percentString,
        percentaString,
        hslString,
        hslaString,
        hwbString,
        keyword
      };
      function getRgba(string) {
        if (!string) {
          return;
        }
        var abbr = /^#([a-fA-F0-9]{3,4})$/i, hex = /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i, rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i, per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i, keyword2 = /(\w+)/;
        var rgb = [0, 0, 0], a = 1, match = string.match(abbr), hexAlpha = "";
        if (match) {
          match = match[1];
          hexAlpha = match[3];
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i] + match[i], 16);
          }
          if (hexAlpha) {
            a = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
          }
        } else if (match = string.match(hex)) {
          hexAlpha = match[2];
          match = match[1];
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
          }
          if (hexAlpha) {
            a = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
          }
        } else if (match = string.match(rgba)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i + 1]);
          }
          a = parseFloat(match[4]);
        } else if (match = string.match(per)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
          }
          a = parseFloat(match[4]);
        } else if (match = string.match(keyword2)) {
          if (match[1] == "transparent") {
            return [0, 0, 0, 0];
          }
          rgb = colorName$1[match[1]];
          if (!rgb) {
            return;
          }
        }
        for (var i = 0; i < rgb.length; i++) {
          rgb[i] = scale(rgb[i], 0, 255);
        }
        if (!a && a != 0) {
          a = 1;
        } else {
          a = scale(a, 0, 1);
        }
        rgb[3] = a;
        return rgb;
      }
      function getHsla(string) {
        if (!string) {
          return;
        }
        var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hsl);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360), s2 = scale(parseFloat(match[2]), 0, 100), l = scale(parseFloat(match[3]), 0, 100), a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, s2, l, a];
        }
      }
      function getHwb(string) {
        if (!string) {
          return;
        }
        var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hwb);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360), w = scale(parseFloat(match[2]), 0, 100), b = scale(parseFloat(match[3]), 0, 100), a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, w, b, a];
        }
      }
      function getRgb(string) {
        var rgba = getRgba(string);
        return rgba && rgba.slice(0, 3);
      }
      function getHsl(string) {
        var hsla = getHsla(string);
        return hsla && hsla.slice(0, 3);
      }
      function getAlpha(string) {
        var vals = getRgba(string);
        if (vals) {
          return vals[3];
        } else if (vals = getHsla(string)) {
          return vals[3];
        } else if (vals = getHwb(string)) {
          return vals[3];
        }
      }
      function hexString(rgba, a) {
        var a = a !== void 0 && rgba.length === 3 ? a : rgba[3];
        return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (a >= 0 && a < 1 ? hexDouble(Math.round(a * 255)) : "");
      }
      function rgbString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return rgbaString(rgba, alpha);
        }
        return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
      }
      function rgbaString(rgba, alpha) {
        if (alpha === void 0) {
          alpha = rgba[3] !== void 0 ? rgba[3] : 1;
        }
        return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
      }
      function percentString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return percentaString(rgba, alpha);
        }
        var r = Math.round(rgba[0] / 255 * 100), g = Math.round(rgba[1] / 255 * 100), b = Math.round(rgba[2] / 255 * 100);
        return "rgb(" + r + "%, " + g + "%, " + b + "%)";
      }
      function percentaString(rgba, alpha) {
        var r = Math.round(rgba[0] / 255 * 100), g = Math.round(rgba[1] / 255 * 100), b = Math.round(rgba[2] / 255 * 100);
        return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
      }
      function hslString(hsla, alpha) {
        if (alpha < 1 || hsla[3] && hsla[3] < 1) {
          return hslaString(hsla, alpha);
        }
        return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
      }
      function hslaString(hsla, alpha) {
        if (alpha === void 0) {
          alpha = hsla[3] !== void 0 ? hsla[3] : 1;
        }
        return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
      }
      function hwbString(hwb, alpha) {
        if (alpha === void 0) {
          alpha = hwb[3] !== void 0 ? hwb[3] : 1;
        }
        return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== void 0 && alpha !== 1 ? ", " + alpha : "") + ")";
      }
      function keyword(rgb) {
        return reverseNames[rgb.slice(0, 3)];
      }
      function scale(num, min, max) {
        return Math.min(Math.max(min, num), max);
      }
      function hexDouble(num) {
        var str = num.toString(16).toUpperCase();
        return str.length < 2 ? "0" + str : str;
      }
      var reverseNames = {};
      for (var name in colorName$1) {
        reverseNames[colorName$1[name]] = name;
      }
      var Color = function(obj) {
        if (obj instanceof Color) {
          return obj;
        }
        if (!(this instanceof Color)) {
          return new Color(obj);
        }
        this.valid = false;
        this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1
        };
        var vals;
        if (typeof obj === "string") {
          vals = colorString.getRgba(obj);
          if (vals) {
            this.setValues("rgb", vals);
          } else if (vals = colorString.getHsla(obj)) {
            this.setValues("hsl", vals);
          } else if (vals = colorString.getHwb(obj)) {
            this.setValues("hwb", vals);
          }
        } else if (typeof obj === "object") {
          vals = obj;
          if (vals.r !== void 0 || vals.red !== void 0) {
            this.setValues("rgb", vals);
          } else if (vals.l !== void 0 || vals.lightness !== void 0) {
            this.setValues("hsl", vals);
          } else if (vals.v !== void 0 || vals.value !== void 0) {
            this.setValues("hsv", vals);
          } else if (vals.w !== void 0 || vals.whiteness !== void 0) {
            this.setValues("hwb", vals);
          } else if (vals.c !== void 0 || vals.cyan !== void 0) {
            this.setValues("cmyk", vals);
          }
        }
      };
      Color.prototype = {
        isValid: function() {
          return this.valid;
        },
        rgb: function() {
          return this.setSpace("rgb", arguments);
        },
        hsl: function() {
          return this.setSpace("hsl", arguments);
        },
        hsv: function() {
          return this.setSpace("hsv", arguments);
        },
        hwb: function() {
          return this.setSpace("hwb", arguments);
        },
        cmyk: function() {
          return this.setSpace("cmyk", arguments);
        },
        rgbArray: function() {
          return this.values.rgb;
        },
        hslArray: function() {
          return this.values.hsl;
        },
        hsvArray: function() {
          return this.values.hsv;
        },
        hwbArray: function() {
          var values = this.values;
          if (values.alpha !== 1) {
            return values.hwb.concat([values.alpha]);
          }
          return values.hwb;
        },
        cmykArray: function() {
          return this.values.cmyk;
        },
        rgbaArray: function() {
          var values = this.values;
          return values.rgb.concat([values.alpha]);
        },
        hslaArray: function() {
          var values = this.values;
          return values.hsl.concat([values.alpha]);
        },
        alpha: function(val) {
          if (val === void 0) {
            return this.values.alpha;
          }
          this.setValues("alpha", val);
          return this;
        },
        red: function(val) {
          return this.setChannel("rgb", 0, val);
        },
        green: function(val) {
          return this.setChannel("rgb", 1, val);
        },
        blue: function(val) {
          return this.setChannel("rgb", 2, val);
        },
        hue: function(val) {
          if (val) {
            val %= 360;
            val = val < 0 ? 360 + val : val;
          }
          return this.setChannel("hsl", 0, val);
        },
        saturation: function(val) {
          return this.setChannel("hsl", 1, val);
        },
        lightness: function(val) {
          return this.setChannel("hsl", 2, val);
        },
        saturationv: function(val) {
          return this.setChannel("hsv", 1, val);
        },
        whiteness: function(val) {
          return this.setChannel("hwb", 1, val);
        },
        blackness: function(val) {
          return this.setChannel("hwb", 2, val);
        },
        value: function(val) {
          return this.setChannel("hsv", 2, val);
        },
        cyan: function(val) {
          return this.setChannel("cmyk", 0, val);
        },
        magenta: function(val) {
          return this.setChannel("cmyk", 1, val);
        },
        yellow: function(val) {
          return this.setChannel("cmyk", 2, val);
        },
        black: function(val) {
          return this.setChannel("cmyk", 3, val);
        },
        hexString: function() {
          return colorString.hexString(this.values.rgb);
        },
        rgbString: function() {
          return colorString.rgbString(this.values.rgb, this.values.alpha);
        },
        rgbaString: function() {
          return colorString.rgbaString(this.values.rgb, this.values.alpha);
        },
        percentString: function() {
          return colorString.percentString(this.values.rgb, this.values.alpha);
        },
        hslString: function() {
          return colorString.hslString(this.values.hsl, this.values.alpha);
        },
        hslaString: function() {
          return colorString.hslaString(this.values.hsl, this.values.alpha);
        },
        hwbString: function() {
          return colorString.hwbString(this.values.hwb, this.values.alpha);
        },
        keyword: function() {
          return colorString.keyword(this.values.rgb, this.values.alpha);
        },
        rgbNumber: function() {
          var rgb = this.values.rgb;
          return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
        },
        luminosity: function() {
          var rgb = this.values.rgb;
          var lum = [];
          for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
        },
        contrast: function(color2) {
          var lum1 = this.luminosity();
          var lum2 = color2.luminosity();
          if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
          }
          return (lum2 + 0.05) / (lum1 + 0.05);
        },
        level: function(color2) {
          var contrastRatio = this.contrast(color2);
          if (contrastRatio >= 7.1) {
            return "AAA";
          }
          return contrastRatio >= 4.5 ? "AA" : "";
        },
        dark: function() {
          var rgb = this.values.rgb;
          var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
          return yiq < 128;
        },
        light: function() {
          return !this.dark();
        },
        negate: function() {
          var rgb = [];
          for (var i = 0; i < 3; i++) {
            rgb[i] = 255 - this.values.rgb[i];
          }
          this.setValues("rgb", rgb);
          return this;
        },
        lighten: function(ratio) {
          var hsl = this.values.hsl;
          hsl[2] += hsl[2] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        darken: function(ratio) {
          var hsl = this.values.hsl;
          hsl[2] -= hsl[2] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        saturate: function(ratio) {
          var hsl = this.values.hsl;
          hsl[1] += hsl[1] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        desaturate: function(ratio) {
          var hsl = this.values.hsl;
          hsl[1] -= hsl[1] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        whiten: function(ratio) {
          var hwb = this.values.hwb;
          hwb[1] += hwb[1] * ratio;
          this.setValues("hwb", hwb);
          return this;
        },
        blacken: function(ratio) {
          var hwb = this.values.hwb;
          hwb[2] += hwb[2] * ratio;
          this.setValues("hwb", hwb);
          return this;
        },
        greyscale: function() {
          var rgb = this.values.rgb;
          var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
          this.setValues("rgb", [val, val, val]);
          return this;
        },
        clearer: function(ratio) {
          var alpha = this.values.alpha;
          this.setValues("alpha", alpha - alpha * ratio);
          return this;
        },
        opaquer: function(ratio) {
          var alpha = this.values.alpha;
          this.setValues("alpha", alpha + alpha * ratio);
          return this;
        },
        rotate: function(degrees) {
          var hsl = this.values.hsl;
          var hue = (hsl[0] + degrees) % 360;
          hsl[0] = hue < 0 ? 360 + hue : hue;
          this.setValues("hsl", hsl);
          return this;
        },
        mix: function(mixinColor, weight) {
          var color1 = this;
          var color2 = mixinColor;
          var p = weight === void 0 ? 0.5 : weight;
          var w = 2 * p - 1;
          var a = color1.alpha() - color2.alpha();
          var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
          var w2 = 1 - w1;
          return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
        },
        toJSON: function() {
          return this.rgb();
        },
        clone: function() {
          var result = new Color();
          var source = this.values;
          var target = result.values;
          var value, type;
          for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
              value = source[prop];
              type = {}.toString.call(value);
              if (type === "[object Array]") {
                target[prop] = value.slice(0);
              } else if (type === "[object Number]") {
                target[prop] = value;
              } else {
                console.error("unexpected color value:", value);
              }
            }
          }
          return result;
        }
      };
      Color.prototype.spaces = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"]
      };
      Color.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100]
      };
      Color.prototype.getValues = function(space) {
        var values = this.values;
        var vals = {};
        for (var i = 0; i < space.length; i++) {
          vals[space.charAt(i)] = values[space][i];
        }
        if (values.alpha !== 1) {
          vals.a = values.alpha;
        }
        return vals;
      };
      Color.prototype.setValues = function(space, vals) {
        var values = this.values;
        var spaces = this.spaces;
        var maxes = this.maxes;
        var alpha = 1;
        var i;
        this.valid = true;
        if (space === "alpha") {
          alpha = vals;
        } else if (vals.length) {
          values[space] = vals.slice(0, space.length);
          alpha = vals[space.length];
        } else if (vals[space.charAt(0)] !== void 0) {
          for (i = 0; i < space.length; i++) {
            values[space][i] = vals[space.charAt(i)];
          }
          alpha = vals.a;
        } else if (vals[spaces[space][0]] !== void 0) {
          var chans = spaces[space];
          for (i = 0; i < space.length; i++) {
            values[space][i] = vals[chans[i]];
          }
          alpha = vals.alpha;
        }
        values.alpha = Math.max(0, Math.min(1, alpha === void 0 ? values.alpha : alpha));
        if (space === "alpha") {
          return false;
        }
        var capped;
        for (i = 0; i < space.length; i++) {
          capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
          values[space][i] = Math.round(capped);
        }
        for (var sname in spaces) {
          if (sname !== space) {
            values[sname] = colorConvert[space][sname](values[space]);
          }
        }
        return true;
      };
      Color.prototype.setSpace = function(space, args) {
        var vals = args[0];
        if (vals === void 0) {
          return this.getValues(space);
        }
        if (typeof vals === "number") {
          vals = Array.prototype.slice.call(args);
        }
        this.setValues(space, vals);
        return this;
      };
      Color.prototype.setChannel = function(space, index2, val) {
        var svalues = this.values[space];
        if (val === void 0) {
          return svalues[index2];
        } else if (val === svalues[index2]) {
          return this;
        }
        svalues[index2] = val;
        this.setValues(space, svalues);
        return this;
      };
      if (typeof window !== "undefined") {
        window.Color = Color;
      }
      var chartjsColor = Color;
      function isValidKey(key) {
        return ["__proto__", "prototype", "constructor"].indexOf(key) === -1;
      }
      var helpers = {
        noop: function() {
        },
        uid: function() {
          var id = 0;
          return function() {
            return id++;
          };
        }(),
        isNullOrUndef: function(value) {
          return value === null || typeof value === "undefined";
        },
        isArray: function(value) {
          if (Array.isArray && Array.isArray(value)) {
            return true;
          }
          var type = Object.prototype.toString.call(value);
          if (type.substr(0, 7) === "[object" && type.substr(-6) === "Array]") {
            return true;
          }
          return false;
        },
        isObject: function(value) {
          return value !== null && Object.prototype.toString.call(value) === "[object Object]";
        },
        isFinite: function(value) {
          return (typeof value === "number" || value instanceof Number) && isFinite(value);
        },
        valueOrDefault: function(value, defaultValue) {
          return typeof value === "undefined" ? defaultValue : value;
        },
        valueAtIndexOrDefault: function(value, index2, defaultValue) {
          return helpers.valueOrDefault(helpers.isArray(value) ? value[index2] : value, defaultValue);
        },
        callback: function(fn, args, thisArg) {
          if (fn && typeof fn.call === "function") {
            return fn.apply(thisArg, args);
          }
        },
        each: function(loopable, fn, thisArg, reverse) {
          var i, len, keys;
          if (helpers.isArray(loopable)) {
            len = loopable.length;
            if (reverse) {
              for (i = len - 1; i >= 0; i--) {
                fn.call(thisArg, loopable[i], i);
              }
            } else {
              for (i = 0; i < len; i++) {
                fn.call(thisArg, loopable[i], i);
              }
            }
          } else if (helpers.isObject(loopable)) {
            keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) {
              fn.call(thisArg, loopable[keys[i]], keys[i]);
            }
          }
        },
        arrayEquals: function(a0, a1) {
          var i, ilen, v0, v1;
          if (!a0 || !a1 || a0.length !== a1.length) {
            return false;
          }
          for (i = 0, ilen = a0.length; i < ilen; ++i) {
            v0 = a0[i];
            v1 = a1[i];
            if (v0 instanceof Array && v1 instanceof Array) {
              if (!helpers.arrayEquals(v0, v1)) {
                return false;
              }
            } else if (v0 !== v1) {
              return false;
            }
          }
          return true;
        },
        clone: function(source) {
          if (helpers.isArray(source)) {
            return source.map(helpers.clone);
          }
          if (helpers.isObject(source)) {
            var target = Object.create(source);
            var keys = Object.keys(source);
            var klen = keys.length;
            var k2 = 0;
            for (; k2 < klen; ++k2) {
              target[keys[k2]] = helpers.clone(source[keys[k2]]);
            }
            return target;
          }
          return source;
        },
        _merger: function(key, target, source, options3) {
          if (!isValidKey(key)) {
            return;
          }
          var tval = target[key];
          var sval = source[key];
          if (helpers.isObject(tval) && helpers.isObject(sval)) {
            helpers.merge(tval, sval, options3);
          } else {
            target[key] = helpers.clone(sval);
          }
        },
        _mergerIf: function(key, target, source) {
          if (!isValidKey(key)) {
            return;
          }
          var tval = target[key];
          var sval = source[key];
          if (helpers.isObject(tval) && helpers.isObject(sval)) {
            helpers.mergeIf(tval, sval);
          } else if (!target.hasOwnProperty(key)) {
            target[key] = helpers.clone(sval);
          }
        },
        merge: function(target, source, options3) {
          var sources = helpers.isArray(source) ? source : [source];
          var ilen = sources.length;
          var merge, i, keys, klen, k2;
          if (!helpers.isObject(target)) {
            return target;
          }
          options3 = options3 || {};
          merge = options3.merger || helpers._merger;
          for (i = 0; i < ilen; ++i) {
            source = sources[i];
            if (!helpers.isObject(source)) {
              continue;
            }
            keys = Object.keys(source);
            for (k2 = 0, klen = keys.length; k2 < klen; ++k2) {
              merge(keys[k2], target, source, options3);
            }
          }
          return target;
        },
        mergeIf: function(target, source) {
          return helpers.merge(target, source, {merger: helpers._mergerIf});
        },
        extend: Object.assign || function(target) {
          return helpers.merge(target, [].slice.call(arguments, 1), {
            merger: function(key, dst, src3) {
              dst[key] = src3[key];
            }
          });
        },
        inherits: function(extensions) {
          var me = this;
          var ChartElement = extensions && extensions.hasOwnProperty("constructor") ? extensions.constructor : function() {
            return me.apply(this, arguments);
          };
          var Surrogate = function() {
            this.constructor = ChartElement;
          };
          Surrogate.prototype = me.prototype;
          ChartElement.prototype = new Surrogate();
          ChartElement.extend = helpers.inherits;
          if (extensions) {
            helpers.extend(ChartElement.prototype, extensions);
          }
          ChartElement.__super__ = me.prototype;
          return ChartElement;
        },
        _deprecated: function(scope, value, previous, current) {
          if (value !== void 0) {
            console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
          }
        }
      };
      var helpers_core = helpers;
      helpers.callCallback = helpers.callback;
      helpers.indexOf = function(array, item, fromIndex) {
        return Array.prototype.indexOf.call(array, item, fromIndex);
      };
      helpers.getValueOrDefault = helpers.valueOrDefault;
      helpers.getValueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
      var effects = {
        linear: function(t) {
          return t;
        },
        easeInQuad: function(t) {
          return t * t;
        },
        easeOutQuad: function(t) {
          return -t * (t - 2);
        },
        easeInOutQuad: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t;
          }
          return -0.5 * (--t * (t - 2) - 1);
        },
        easeInCubic: function(t) {
          return t * t * t;
        },
        easeOutCubic: function(t) {
          return (t = t - 1) * t * t + 1;
        },
        easeInOutCubic: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t;
          }
          return 0.5 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function(t) {
          return t * t * t * t;
        },
        easeOutQuart: function(t) {
          return -((t = t - 1) * t * t * t - 1);
        },
        easeInOutQuart: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t * t;
          }
          return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function(t) {
          return t * t * t * t * t;
        },
        easeOutQuint: function(t) {
          return (t = t - 1) * t * t * t * t + 1;
        },
        easeInOutQuint: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t * t * t;
          }
          return 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function(t) {
          return -Math.cos(t * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(t) {
          return Math.sin(t * (Math.PI / 2));
        },
        easeInOutSine: function(t) {
          return -0.5 * (Math.cos(Math.PI * t) - 1);
        },
        easeInExpo: function(t) {
          return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
        },
        easeOutExpo: function(t) {
          return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
        },
        easeInOutExpo: function(t) {
          if (t === 0) {
            return 0;
          }
          if (t === 1) {
            return 1;
          }
          if ((t /= 0.5) < 1) {
            return 0.5 * Math.pow(2, 10 * (t - 1));
          }
          return 0.5 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function(t) {
          if (t >= 1) {
            return t;
          }
          return -(Math.sqrt(1 - t * t) - 1);
        },
        easeOutCirc: function(t) {
          return Math.sqrt(1 - (t = t - 1) * t);
        },
        easeInOutCirc: function(t) {
          if ((t /= 0.5) < 1) {
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
          }
          return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function(t) {
          var s2 = 1.70158;
          var p = 0;
          var a = 1;
          if (t === 0) {
            return 0;
          }
          if (t === 1) {
            return 1;
          }
          if (!p) {
            p = 0.3;
          }
          if (a < 1) {
            a = 1;
            s2 = p / 4;
          } else {
            s2 = p / (2 * Math.PI) * Math.asin(1 / a);
          }
          return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s2) * (2 * Math.PI) / p));
        },
        easeOutElastic: function(t) {
          var s2 = 1.70158;
          var p = 0;
          var a = 1;
          if (t === 0) {
            return 0;
          }
          if (t === 1) {
            return 1;
          }
          if (!p) {
            p = 0.3;
          }
          if (a < 1) {
            a = 1;
            s2 = p / 4;
          } else {
            s2 = p / (2 * Math.PI) * Math.asin(1 / a);
          }
          return a * Math.pow(2, -10 * t) * Math.sin((t - s2) * (2 * Math.PI) / p) + 1;
        },
        easeInOutElastic: function(t) {
          var s2 = 1.70158;
          var p = 0;
          var a = 1;
          if (t === 0) {
            return 0;
          }
          if ((t /= 0.5) === 2) {
            return 1;
          }
          if (!p) {
            p = 0.45;
          }
          if (a < 1) {
            a = 1;
            s2 = p / 4;
          } else {
            s2 = p / (2 * Math.PI) * Math.asin(1 / a);
          }
          if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s2) * (2 * Math.PI) / p));
          }
          return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s2) * (2 * Math.PI) / p) * 0.5 + 1;
        },
        easeInBack: function(t) {
          var s2 = 1.70158;
          return t * t * ((s2 + 1) * t - s2);
        },
        easeOutBack: function(t) {
          var s2 = 1.70158;
          return (t = t - 1) * t * ((s2 + 1) * t + s2) + 1;
        },
        easeInOutBack: function(t) {
          var s2 = 1.70158;
          if ((t /= 0.5) < 1) {
            return 0.5 * (t * t * (((s2 *= 1.525) + 1) * t - s2));
          }
          return 0.5 * ((t -= 2) * t * (((s2 *= 1.525) + 1) * t + s2) + 2);
        },
        easeInBounce: function(t) {
          return 1 - effects.easeOutBounce(1 - t);
        },
        easeOutBounce: function(t) {
          if (t < 1 / 2.75) {
            return 7.5625 * t * t;
          }
          if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
          }
          if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
          }
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        easeInOutBounce: function(t) {
          if (t < 0.5) {
            return effects.easeInBounce(t * 2) * 0.5;
          }
          return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
        }
      };
      var helpers_easing = {
        effects
      };
      helpers_core.easingEffects = effects;
      var PI = Math.PI;
      var RAD_PER_DEG = PI / 180;
      var DOUBLE_PI = PI * 2;
      var HALF_PI = PI / 2;
      var QUARTER_PI = PI / 4;
      var TWO_THIRDS_PI = PI * 2 / 3;
      var exports$1 = {
        clear: function(chart) {
          chart.ctx.clearRect(0, 0, chart.width, chart.height);
        },
        roundedRect: function(ctx, x, y, width, height, radius) {
          if (radius) {
            var r = Math.min(radius, height / 2, width / 2);
            var left = x + r;
            var top = y + r;
            var right = x + width - r;
            var bottom = y + height - r;
            ctx.moveTo(x, top);
            if (left < right && top < bottom) {
              ctx.arc(left, top, r, -PI, -HALF_PI);
              ctx.arc(right, top, r, -HALF_PI, 0);
              ctx.arc(right, bottom, r, 0, HALF_PI);
              ctx.arc(left, bottom, r, HALF_PI, PI);
            } else if (left < right) {
              ctx.moveTo(left, y);
              ctx.arc(right, top, r, -HALF_PI, HALF_PI);
              ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
            } else if (top < bottom) {
              ctx.arc(left, top, r, -PI, 0);
              ctx.arc(left, bottom, r, 0, PI);
            } else {
              ctx.arc(left, top, r, -PI, PI);
            }
            ctx.closePath();
            ctx.moveTo(x, y);
          } else {
            ctx.rect(x, y, width, height);
          }
        },
        drawPoint: function(ctx, style, radius, x, y, rotation) {
          var type, xOffset, yOffset, size, cornerRadius;
          var rad = (rotation || 0) * RAD_PER_DEG;
          if (style && typeof style === "object") {
            type = style.toString();
            if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(rad);
              ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
              ctx.restore();
              return;
            }
          }
          if (isNaN(radius) || radius <= 0) {
            return;
          }
          ctx.beginPath();
          switch (style) {
            default:
              ctx.arc(x, y, radius, 0, DOUBLE_PI);
              ctx.closePath();
              break;
            case "triangle":
              ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              ctx.closePath();
              break;
            case "rectRounded":
              cornerRadius = radius * 0.516;
              size = radius - cornerRadius;
              xOffset = Math.cos(rad + QUARTER_PI) * size;
              yOffset = Math.sin(rad + QUARTER_PI) * size;
              ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
              ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
              ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
              ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
              ctx.closePath();
              break;
            case "rect":
              if (!rotation) {
                size = Math.SQRT1_2 * radius;
                ctx.rect(x - size, y - size, 2 * size, 2 * size);
                break;
              }
              rad += QUARTER_PI;
            case "rectRot":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + yOffset, y - xOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              ctx.closePath();
              break;
            case "crossRot":
              rad += QUARTER_PI;
            case "cross":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              break;
            case "star":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              rad += QUARTER_PI;
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              break;
            case "line":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              break;
            case "dash":
              ctx.moveTo(x, y);
              ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
              break;
          }
          ctx.fill();
          ctx.stroke();
        },
        _isPointInArea: function(point, area) {
          var epsilon = 1e-6;
          return point.x > area.left - epsilon && point.x < area.right + epsilon && point.y > area.top - epsilon && point.y < area.bottom + epsilon;
        },
        clipArea: function(ctx, area) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
          ctx.clip();
        },
        unclipArea: function(ctx) {
          ctx.restore();
        },
        lineTo: function(ctx, previous, target, flip) {
          var stepped = target.steppedLine;
          if (stepped) {
            if (stepped === "middle") {
              var midpoint = (previous.x + target.x) / 2;
              ctx.lineTo(midpoint, flip ? target.y : previous.y);
              ctx.lineTo(midpoint, flip ? previous.y : target.y);
            } else if (stepped === "after" && !flip || stepped !== "after" && flip) {
              ctx.lineTo(previous.x, target.y);
            } else {
              ctx.lineTo(target.x, previous.y);
            }
            ctx.lineTo(target.x, target.y);
            return;
          }
          if (!target.tension) {
            ctx.lineTo(target.x, target.y);
            return;
          }
          ctx.bezierCurveTo(flip ? previous.controlPointPreviousX : previous.controlPointNextX, flip ? previous.controlPointPreviousY : previous.controlPointNextY, flip ? target.controlPointNextX : target.controlPointPreviousX, flip ? target.controlPointNextY : target.controlPointPreviousY, target.x, target.y);
        }
      };
      var helpers_canvas = exports$1;
      helpers_core.clear = exports$1.clear;
      helpers_core.drawRoundedRectangle = function(ctx) {
        ctx.beginPath();
        exports$1.roundedRect.apply(exports$1, arguments);
      };
      var defaults = {
        _set: function(scope, values) {
          return helpers_core.merge(this[scope] || (this[scope] = {}), values);
        }
      };
      defaults._set("global", {
        defaultColor: "rgba(0,0,0,0.1)",
        defaultFontColor: "#666",
        defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        defaultFontSize: 12,
        defaultFontStyle: "normal",
        defaultLineHeight: 1.2,
        showLines: true
      });
      var core_defaults = defaults;
      var valueOrDefault = helpers_core.valueOrDefault;
      function toFontString(font) {
        if (!font || helpers_core.isNullOrUndef(font.size) || helpers_core.isNullOrUndef(font.family)) {
          return null;
        }
        return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
      }
      var helpers_options = {
        toLineHeight: function(value, size) {
          var matches = ("" + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
          if (!matches || matches[1] === "normal") {
            return size * 1.2;
          }
          value = +matches[2];
          switch (matches[3]) {
            case "px":
              return value;
            case "%":
              value /= 100;
              break;
          }
          return size * value;
        },
        toPadding: function(value) {
          var t, r, b, l;
          if (helpers_core.isObject(value)) {
            t = +value.top || 0;
            r = +value.right || 0;
            b = +value.bottom || 0;
            l = +value.left || 0;
          } else {
            t = r = b = l = +value || 0;
          }
          return {
            top: t,
            right: r,
            bottom: b,
            left: l,
            height: t + b,
            width: l + r
          };
        },
        _parseFont: function(options3) {
          var globalDefaults = core_defaults.global;
          var size = valueOrDefault(options3.fontSize, globalDefaults.defaultFontSize);
          var font = {
            family: valueOrDefault(options3.fontFamily, globalDefaults.defaultFontFamily),
            lineHeight: helpers_core.options.toLineHeight(valueOrDefault(options3.lineHeight, globalDefaults.defaultLineHeight), size),
            size,
            style: valueOrDefault(options3.fontStyle, globalDefaults.defaultFontStyle),
            weight: null,
            string: ""
          };
          font.string = toFontString(font);
          return font;
        },
        resolve: function(inputs, context, index2, info) {
          var cacheable = true;
          var i, ilen, value;
          for (i = 0, ilen = inputs.length; i < ilen; ++i) {
            value = inputs[i];
            if (value === void 0) {
              continue;
            }
            if (context !== void 0 && typeof value === "function") {
              value = value(context);
              cacheable = false;
            }
            if (index2 !== void 0 && helpers_core.isArray(value)) {
              value = value[index2];
              cacheable = false;
            }
            if (value !== void 0) {
              if (info && !cacheable) {
                info.cacheable = false;
              }
              return value;
            }
          }
        }
      };
      var exports$2 = {
        _factorize: function(value) {
          var result = [];
          var sqrt = Math.sqrt(value);
          var i;
          for (i = 1; i < sqrt; i++) {
            if (value % i === 0) {
              result.push(i);
              result.push(value / i);
            }
          }
          if (sqrt === (sqrt | 0)) {
            result.push(sqrt);
          }
          result.sort(function(a, b) {
            return a - b;
          }).pop();
          return result;
        },
        log10: Math.log10 || function(x) {
          var exponent = Math.log(x) * Math.LOG10E;
          var powerOf10 = Math.round(exponent);
          var isPowerOf10 = x === Math.pow(10, powerOf10);
          return isPowerOf10 ? powerOf10 : exponent;
        }
      };
      var helpers_math = exports$2;
      helpers_core.log10 = exports$2.log10;
      var getRtlAdapter = function(rectX, width) {
        return {
          x: function(x) {
            return rectX + rectX + width - x;
          },
          setWidth: function(w) {
            width = w;
          },
          textAlign: function(align) {
            if (align === "center") {
              return align;
            }
            return align === "right" ? "left" : "right";
          },
          xPlus: function(x, value) {
            return x - value;
          },
          leftForLtr: function(x, itemWidth) {
            return x - itemWidth;
          }
        };
      };
      var getLtrAdapter = function() {
        return {
          x: function(x) {
            return x;
          },
          setWidth: function(w) {
          },
          textAlign: function(align) {
            return align;
          },
          xPlus: function(x, value) {
            return x + value;
          },
          leftForLtr: function(x, _itemWidth) {
            return x;
          }
        };
      };
      var getAdapter = function(rtl2, rectX, width) {
        return rtl2 ? getRtlAdapter(rectX, width) : getLtrAdapter();
      };
      var overrideTextDirection = function(ctx, direction) {
        var style, original;
        if (direction === "ltr" || direction === "rtl") {
          style = ctx.canvas.style;
          original = [
            style.getPropertyValue("direction"),
            style.getPropertyPriority("direction")
          ];
          style.setProperty("direction", direction, "important");
          ctx.prevTextDirection = original;
        }
      };
      var restoreTextDirection = function(ctx) {
        var original = ctx.prevTextDirection;
        if (original !== void 0) {
          delete ctx.prevTextDirection;
          ctx.canvas.style.setProperty("direction", original[0], original[1]);
        }
      };
      var helpers_rtl = {
        getRtlAdapter: getAdapter,
        overrideTextDirection,
        restoreTextDirection
      };
      var helpers$1 = helpers_core;
      var easing = helpers_easing;
      var canvas = helpers_canvas;
      var options2 = helpers_options;
      var math = helpers_math;
      var rtl = helpers_rtl;
      helpers$1.easing = easing;
      helpers$1.canvas = canvas;
      helpers$1.options = options2;
      helpers$1.math = math;
      helpers$1.rtl = rtl;
      function interpolate(start, view, model, ease) {
        var keys = Object.keys(model);
        var i, ilen, key, actual, origin, target, type, c0, c1;
        for (i = 0, ilen = keys.length; i < ilen; ++i) {
          key = keys[i];
          target = model[key];
          if (!view.hasOwnProperty(key)) {
            view[key] = target;
          }
          actual = view[key];
          if (actual === target || key[0] === "_") {
            continue;
          }
          if (!start.hasOwnProperty(key)) {
            start[key] = actual;
          }
          origin = start[key];
          type = typeof target;
          if (type === typeof origin) {
            if (type === "string") {
              c0 = chartjsColor(origin);
              if (c0.valid) {
                c1 = chartjsColor(target);
                if (c1.valid) {
                  view[key] = c1.mix(c0, ease).rgbString();
                  continue;
                }
              }
            } else if (helpers$1.isFinite(origin) && helpers$1.isFinite(target)) {
              view[key] = origin + (target - origin) * ease;
              continue;
            }
          }
          view[key] = target;
        }
      }
      var Element = function(configuration) {
        helpers$1.extend(this, configuration);
        this.initialize.apply(this, arguments);
      };
      helpers$1.extend(Element.prototype, {
        _type: void 0,
        initialize: function() {
          this.hidden = false;
        },
        pivot: function() {
          var me = this;
          if (!me._view) {
            me._view = helpers$1.extend({}, me._model);
          }
          me._start = {};
          return me;
        },
        transition: function(ease) {
          var me = this;
          var model = me._model;
          var start = me._start;
          var view = me._view;
          if (!model || ease === 1) {
            me._view = helpers$1.extend({}, model);
            me._start = null;
            return me;
          }
          if (!view) {
            view = me._view = {};
          }
          if (!start) {
            start = me._start = {};
          }
          interpolate(start, view, model, ease);
          return me;
        },
        tooltipPosition: function() {
          return {
            x: this._model.x,
            y: this._model.y
          };
        },
        hasValue: function() {
          return helpers$1.isNumber(this._model.x) && helpers$1.isNumber(this._model.y);
        }
      });
      Element.extend = helpers$1.inherits;
      var core_element = Element;
      var exports$3 = core_element.extend({
        chart: null,
        currentStep: 0,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
      });
      var core_animation = exports$3;
      Object.defineProperty(exports$3.prototype, "animationObject", {
        get: function() {
          return this;
        }
      });
      Object.defineProperty(exports$3.prototype, "chartInstance", {
        get: function() {
          return this.chart;
        },
        set: function(value) {
          this.chart = value;
        }
      });
      core_defaults._set("global", {
        animation: {
          duration: 1e3,
          easing: "easeOutQuart",
          onProgress: helpers$1.noop,
          onComplete: helpers$1.noop
        }
      });
      var core_animations = {
        animations: [],
        request: null,
        addAnimation: function(chart, animation, duration, lazy) {
          var animations = this.animations;
          var i, ilen;
          animation.chart = chart;
          animation.startTime = Date.now();
          animation.duration = duration;
          if (!lazy) {
            chart.animating = true;
          }
          for (i = 0, ilen = animations.length; i < ilen; ++i) {
            if (animations[i].chart === chart) {
              animations[i] = animation;
              return;
            }
          }
          animations.push(animation);
          if (animations.length === 1) {
            this.requestAnimationFrame();
          }
        },
        cancelAnimation: function(chart) {
          var index2 = helpers$1.findIndex(this.animations, function(animation) {
            return animation.chart === chart;
          });
          if (index2 !== -1) {
            this.animations.splice(index2, 1);
            chart.animating = false;
          }
        },
        requestAnimationFrame: function() {
          var me = this;
          if (me.request === null) {
            me.request = helpers$1.requestAnimFrame.call(window, function() {
              me.request = null;
              me.startDigest();
            });
          }
        },
        startDigest: function() {
          var me = this;
          me.advance();
          if (me.animations.length > 0) {
            me.requestAnimationFrame();
          }
        },
        advance: function() {
          var animations = this.animations;
          var animation, chart, numSteps, nextStep;
          var i = 0;
          while (i < animations.length) {
            animation = animations[i];
            chart = animation.chart;
            numSteps = animation.numSteps;
            nextStep = Math.floor((Date.now() - animation.startTime) / animation.duration * numSteps) + 1;
            animation.currentStep = Math.min(nextStep, numSteps);
            helpers$1.callback(animation.render, [chart, animation], chart);
            helpers$1.callback(animation.onAnimationProgress, [animation], chart);
            if (animation.currentStep >= numSteps) {
              helpers$1.callback(animation.onAnimationComplete, [animation], chart);
              chart.animating = false;
              animations.splice(i, 1);
            } else {
              ++i;
            }
          }
        }
      };
      var resolve2 = helpers$1.options.resolve;
      var arrayEvents = ["push", "pop", "shift", "splice", "unshift"];
      function listenArrayEvents(array, listener) {
        if (array._chartjs) {
          array._chartjs.listeners.push(listener);
          return;
        }
        Object.defineProperty(array, "_chartjs", {
          configurable: true,
          enumerable: false,
          value: {
            listeners: [listener]
          }
        });
        arrayEvents.forEach(function(key) {
          var method = "onData" + key.charAt(0).toUpperCase() + key.slice(1);
          var base = array[key];
          Object.defineProperty(array, key, {
            configurable: true,
            enumerable: false,
            value: function() {
              var args = Array.prototype.slice.call(arguments);
              var res = base.apply(this, args);
              helpers$1.each(array._chartjs.listeners, function(object) {
                if (typeof object[method] === "function") {
                  object[method].apply(object, args);
                }
              });
              return res;
            }
          });
        });
      }
      function unlistenArrayEvents(array, listener) {
        var stub = array._chartjs;
        if (!stub) {
          return;
        }
        var listeners = stub.listeners;
        var index2 = listeners.indexOf(listener);
        if (index2 !== -1) {
          listeners.splice(index2, 1);
        }
        if (listeners.length > 0) {
          return;
        }
        arrayEvents.forEach(function(key) {
          delete array[key];
        });
        delete array._chartjs;
      }
      var DatasetController = function(chart, datasetIndex) {
        this.initialize(chart, datasetIndex);
      };
      helpers$1.extend(DatasetController.prototype, {
        datasetElementType: null,
        dataElementType: null,
        _datasetElementOptions: [
          "backgroundColor",
          "borderCapStyle",
          "borderColor",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "borderWidth"
        ],
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "pointStyle"
        ],
        initialize: function(chart, datasetIndex) {
          var me = this;
          me.chart = chart;
          me.index = datasetIndex;
          me.linkScales();
          me.addElements();
          me._type = me.getMeta().type;
        },
        updateIndex: function(datasetIndex) {
          this.index = datasetIndex;
        },
        linkScales: function() {
          var me = this;
          var meta = me.getMeta();
          var chart = me.chart;
          var scales2 = chart.scales;
          var dataset = me.getDataset();
          var scalesOpts = chart.options.scales;
          if (meta.xAxisID === null || !(meta.xAxisID in scales2) || dataset.xAxisID) {
            meta.xAxisID = dataset.xAxisID || scalesOpts.xAxes[0].id;
          }
          if (meta.yAxisID === null || !(meta.yAxisID in scales2) || dataset.yAxisID) {
            meta.yAxisID = dataset.yAxisID || scalesOpts.yAxes[0].id;
          }
        },
        getDataset: function() {
          return this.chart.data.datasets[this.index];
        },
        getMeta: function() {
          return this.chart.getDatasetMeta(this.index);
        },
        getScaleForId: function(scaleID) {
          return this.chart.scales[scaleID];
        },
        _getValueScaleId: function() {
          return this.getMeta().yAxisID;
        },
        _getIndexScaleId: function() {
          return this.getMeta().xAxisID;
        },
        _getValueScale: function() {
          return this.getScaleForId(this._getValueScaleId());
        },
        _getIndexScale: function() {
          return this.getScaleForId(this._getIndexScaleId());
        },
        reset: function() {
          this._update(true);
        },
        destroy: function() {
          if (this._data) {
            unlistenArrayEvents(this._data, this);
          }
        },
        createMetaDataset: function() {
          var me = this;
          var type = me.datasetElementType;
          return type && new type({
            _chart: me.chart,
            _datasetIndex: me.index
          });
        },
        createMetaData: function(index2) {
          var me = this;
          var type = me.dataElementType;
          return type && new type({
            _chart: me.chart,
            _datasetIndex: me.index,
            _index: index2
          });
        },
        addElements: function() {
          var me = this;
          var meta = me.getMeta();
          var data = me.getDataset().data || [];
          var metaData = meta.data;
          var i, ilen;
          for (i = 0, ilen = data.length; i < ilen; ++i) {
            metaData[i] = metaData[i] || me.createMetaData(i);
          }
          meta.dataset = meta.dataset || me.createMetaDataset();
        },
        addElementAndReset: function(index2) {
          var element = this.createMetaData(index2);
          this.getMeta().data.splice(index2, 0, element);
          this.updateElement(element, index2, true);
        },
        buildOrUpdateElements: function() {
          var me = this;
          var dataset = me.getDataset();
          var data = dataset.data || (dataset.data = []);
          if (me._data !== data) {
            if (me._data) {
              unlistenArrayEvents(me._data, me);
            }
            if (data && Object.isExtensible(data)) {
              listenArrayEvents(data, me);
            }
            me._data = data;
          }
          me.resyncElements();
        },
        _configure: function() {
          var me = this;
          me._config = helpers$1.merge(Object.create(null), [
            me.chart.options.datasets[me._type],
            me.getDataset()
          ], {
            merger: function(key, target, source) {
              if (key !== "_meta" && key !== "data") {
                helpers$1._merger(key, target, source);
              }
            }
          });
        },
        _update: function(reset) {
          var me = this;
          me._configure();
          me._cachedDataOpts = null;
          me.update(reset);
        },
        update: helpers$1.noop,
        transition: function(easingValue) {
          var meta = this.getMeta();
          var elements2 = meta.data || [];
          var ilen = elements2.length;
          var i = 0;
          for (; i < ilen; ++i) {
            elements2[i].transition(easingValue);
          }
          if (meta.dataset) {
            meta.dataset.transition(easingValue);
          }
        },
        draw: function() {
          var meta = this.getMeta();
          var elements2 = meta.data || [];
          var ilen = elements2.length;
          var i = 0;
          if (meta.dataset) {
            meta.dataset.draw();
          }
          for (; i < ilen; ++i) {
            elements2[i].draw();
          }
        },
        getStyle: function(index2) {
          var me = this;
          var meta = me.getMeta();
          var dataset = meta.dataset;
          var style;
          me._configure();
          if (dataset && index2 === void 0) {
            style = me._resolveDatasetElementOptions(dataset || {});
          } else {
            index2 = index2 || 0;
            style = me._resolveDataElementOptions(meta.data[index2] || {}, index2);
          }
          if (style.fill === false || style.fill === null) {
            style.backgroundColor = style.borderColor;
          }
          return style;
        },
        _resolveDatasetElementOptions: function(element, hover) {
          var me = this;
          var chart = me.chart;
          var datasetOpts = me._config;
          var custom = element.custom || {};
          var options3 = chart.options.elements[me.datasetElementType.prototype._type] || {};
          var elementOptions = me._datasetElementOptions;
          var values = {};
          var i, ilen, key, readKey;
          var context = {
            chart,
            dataset: me.getDataset(),
            datasetIndex: me.index,
            hover
          };
          for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
            key = elementOptions[i];
            readKey = hover ? "hover" + key.charAt(0).toUpperCase() + key.slice(1) : key;
            values[key] = resolve2([
              custom[readKey],
              datasetOpts[readKey],
              options3[readKey]
            ], context);
          }
          return values;
        },
        _resolveDataElementOptions: function(element, index2) {
          var me = this;
          var custom = element && element.custom;
          var cached = me._cachedDataOpts;
          if (cached && !custom) {
            return cached;
          }
          var chart = me.chart;
          var datasetOpts = me._config;
          var options3 = chart.options.elements[me.dataElementType.prototype._type] || {};
          var elementOptions = me._dataElementOptions;
          var values = {};
          var context = {
            chart,
            dataIndex: index2,
            dataset: me.getDataset(),
            datasetIndex: me.index
          };
          var info = {cacheable: !custom};
          var keys, i, ilen, key;
          custom = custom || {};
          if (helpers$1.isArray(elementOptions)) {
            for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
              key = elementOptions[i];
              values[key] = resolve2([
                custom[key],
                datasetOpts[key],
                options3[key]
              ], context, index2, info);
            }
          } else {
            keys = Object.keys(elementOptions);
            for (i = 0, ilen = keys.length; i < ilen; ++i) {
              key = keys[i];
              values[key] = resolve2([
                custom[key],
                datasetOpts[elementOptions[key]],
                datasetOpts[key],
                options3[key]
              ], context, index2, info);
            }
          }
          if (info.cacheable) {
            me._cachedDataOpts = Object.freeze(values);
          }
          return values;
        },
        removeHoverStyle: function(element) {
          helpers$1.merge(element._model, element.$previousStyle || {});
          delete element.$previousStyle;
        },
        setHoverStyle: function(element) {
          var dataset = this.chart.data.datasets[element._datasetIndex];
          var index2 = element._index;
          var custom = element.custom || {};
          var model = element._model;
          var getHoverColor = helpers$1.getHoverColor;
          element.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth
          };
          model.backgroundColor = resolve2([custom.hoverBackgroundColor, dataset.hoverBackgroundColor, getHoverColor(model.backgroundColor)], void 0, index2);
          model.borderColor = resolve2([custom.hoverBorderColor, dataset.hoverBorderColor, getHoverColor(model.borderColor)], void 0, index2);
          model.borderWidth = resolve2([custom.hoverBorderWidth, dataset.hoverBorderWidth, model.borderWidth], void 0, index2);
        },
        _removeDatasetHoverStyle: function() {
          var element = this.getMeta().dataset;
          if (element) {
            this.removeHoverStyle(element);
          }
        },
        _setDatasetHoverStyle: function() {
          var element = this.getMeta().dataset;
          var prev = {};
          var i, ilen, key, keys, hoverOptions, model;
          if (!element) {
            return;
          }
          model = element._model;
          hoverOptions = this._resolveDatasetElementOptions(element, true);
          keys = Object.keys(hoverOptions);
          for (i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            prev[key] = model[key];
            model[key] = hoverOptions[key];
          }
          element.$previousStyle = prev;
        },
        resyncElements: function() {
          var me = this;
          var meta = me.getMeta();
          var data = me.getDataset().data;
          var numMeta = meta.data.length;
          var numData = data.length;
          if (numData < numMeta) {
            meta.data.splice(numData, numMeta - numData);
          } else if (numData > numMeta) {
            me.insertElements(numMeta, numData - numMeta);
          }
        },
        insertElements: function(start, count) {
          for (var i = 0; i < count; ++i) {
            this.addElementAndReset(start + i);
          }
        },
        onDataPush: function() {
          var count = arguments.length;
          this.insertElements(this.getDataset().data.length - count, count);
        },
        onDataPop: function() {
          this.getMeta().data.pop();
        },
        onDataShift: function() {
          this.getMeta().data.shift();
        },
        onDataSplice: function(start, count) {
          this.getMeta().data.splice(start, count);
          this.insertElements(start, arguments.length - 2);
        },
        onDataUnshift: function() {
          this.insertElements(0, arguments.length);
        }
      });
      DatasetController.extend = helpers$1.inherits;
      var core_datasetController = DatasetController;
      var TAU = Math.PI * 2;
      core_defaults._set("global", {
        elements: {
          arc: {
            backgroundColor: core_defaults.global.defaultColor,
            borderColor: "#fff",
            borderWidth: 2,
            borderAlign: "center"
          }
        }
      });
      function clipArc(ctx, arc) {
        var startAngle = arc.startAngle;
        var endAngle = arc.endAngle;
        var pixelMargin = arc.pixelMargin;
        var angleMargin = pixelMargin / arc.outerRadius;
        var x = arc.x;
        var y = arc.y;
        ctx.beginPath();
        ctx.arc(x, y, arc.outerRadius, startAngle - angleMargin, endAngle + angleMargin);
        if (arc.innerRadius > pixelMargin) {
          angleMargin = pixelMargin / arc.innerRadius;
          ctx.arc(x, y, arc.innerRadius - pixelMargin, endAngle + angleMargin, startAngle - angleMargin, true);
        } else {
          ctx.arc(x, y, pixelMargin, endAngle + Math.PI / 2, startAngle - Math.PI / 2);
        }
        ctx.closePath();
        ctx.clip();
      }
      function drawFullCircleBorders(ctx, vm, arc, inner) {
        var endAngle = arc.endAngle;
        var i;
        if (inner) {
          arc.endAngle = arc.startAngle + TAU;
          clipArc(ctx, arc);
          arc.endAngle = endAngle;
          if (arc.endAngle === arc.startAngle && arc.fullCircles) {
            arc.endAngle += TAU;
            arc.fullCircles--;
          }
        }
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.innerRadius, arc.startAngle + TAU, arc.startAngle, true);
        for (i = 0; i < arc.fullCircles; ++i) {
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.startAngle + TAU);
        for (i = 0; i < arc.fullCircles; ++i) {
          ctx.stroke();
        }
      }
      function drawBorder(ctx, vm, arc) {
        var inner = vm.borderAlign === "inner";
        if (inner) {
          ctx.lineWidth = vm.borderWidth * 2;
          ctx.lineJoin = "round";
        } else {
          ctx.lineWidth = vm.borderWidth;
          ctx.lineJoin = "bevel";
        }
        if (arc.fullCircles) {
          drawFullCircleBorders(ctx, vm, arc, inner);
        }
        if (inner) {
          clipArc(ctx, arc);
        }
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.endAngle);
        ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
        ctx.closePath();
        ctx.stroke();
      }
      var element_arc = core_element.extend({
        _type: "arc",
        inLabelRange: function(mouseX) {
          var vm = this._view;
          if (vm) {
            return Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2);
          }
          return false;
        },
        inRange: function(chartX, chartY) {
          var vm = this._view;
          if (vm) {
            var pointRelativePosition = helpers$1.getAngleFromPoint(vm, {x: chartX, y: chartY});
            var angle = pointRelativePosition.angle;
            var distance = pointRelativePosition.distance;
            var startAngle = vm.startAngle;
            var endAngle = vm.endAngle;
            while (endAngle < startAngle) {
              endAngle += TAU;
            }
            while (angle > endAngle) {
              angle -= TAU;
            }
            while (angle < startAngle) {
              angle += TAU;
            }
            var betweenAngles = angle >= startAngle && angle <= endAngle;
            var withinRadius = distance >= vm.innerRadius && distance <= vm.outerRadius;
            return betweenAngles && withinRadius;
          }
          return false;
        },
        getCenterPoint: function() {
          var vm = this._view;
          var halfAngle = (vm.startAngle + vm.endAngle) / 2;
          var halfRadius = (vm.innerRadius + vm.outerRadius) / 2;
          return {
            x: vm.x + Math.cos(halfAngle) * halfRadius,
            y: vm.y + Math.sin(halfAngle) * halfRadius
          };
        },
        getArea: function() {
          var vm = this._view;
          return Math.PI * ((vm.endAngle - vm.startAngle) / (2 * Math.PI)) * (Math.pow(vm.outerRadius, 2) - Math.pow(vm.innerRadius, 2));
        },
        tooltipPosition: function() {
          var vm = this._view;
          var centreAngle = vm.startAngle + (vm.endAngle - vm.startAngle) / 2;
          var rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
          return {
            x: vm.x + Math.cos(centreAngle) * rangeFromCentre,
            y: vm.y + Math.sin(centreAngle) * rangeFromCentre
          };
        },
        draw: function() {
          var ctx = this._chart.ctx;
          var vm = this._view;
          var pixelMargin = vm.borderAlign === "inner" ? 0.33 : 0;
          var arc = {
            x: vm.x,
            y: vm.y,
            innerRadius: vm.innerRadius,
            outerRadius: Math.max(vm.outerRadius - pixelMargin, 0),
            pixelMargin,
            startAngle: vm.startAngle,
            endAngle: vm.endAngle,
            fullCircles: Math.floor(vm.circumference / TAU)
          };
          var i;
          ctx.save();
          ctx.fillStyle = vm.backgroundColor;
          ctx.strokeStyle = vm.borderColor;
          if (arc.fullCircles) {
            arc.endAngle = arc.startAngle + TAU;
            ctx.beginPath();
            ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
            ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
            ctx.closePath();
            for (i = 0; i < arc.fullCircles; ++i) {
              ctx.fill();
            }
            arc.endAngle = arc.startAngle + vm.circumference % TAU;
          }
          ctx.beginPath();
          ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
          ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
          ctx.closePath();
          ctx.fill();
          if (vm.borderWidth) {
            drawBorder(ctx, vm, arc);
          }
          ctx.restore();
        }
      });
      var valueOrDefault$1 = helpers$1.valueOrDefault;
      var defaultColor = core_defaults.global.defaultColor;
      core_defaults._set("global", {
        elements: {
          line: {
            tension: 0.4,
            backgroundColor: defaultColor,
            borderWidth: 3,
            borderColor: defaultColor,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            capBezierPoints: true,
            fill: true
          }
        }
      });
      var element_line = core_element.extend({
        _type: "line",
        draw: function() {
          var me = this;
          var vm = me._view;
          var ctx = me._chart.ctx;
          var spanGaps = vm.spanGaps;
          var points = me._children.slice();
          var globalDefaults = core_defaults.global;
          var globalOptionLineElements = globalDefaults.elements.line;
          var lastDrawnIndex = -1;
          var closePath = me._loop;
          var index2, previous, currentVM;
          if (!points.length) {
            return;
          }
          if (me._loop) {
            for (index2 = 0; index2 < points.length; ++index2) {
              previous = helpers$1.previousItem(points, index2);
              if (!points[index2]._view.skip && previous._view.skip) {
                points = points.slice(index2).concat(points.slice(0, index2));
                closePath = spanGaps;
                break;
              }
            }
            if (closePath) {
              points.push(points[0]);
            }
          }
          ctx.save();
          ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;
          if (ctx.setLineDash) {
            ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
          }
          ctx.lineDashOffset = valueOrDefault$1(vm.borderDashOffset, globalOptionLineElements.borderDashOffset);
          ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
          ctx.lineWidth = valueOrDefault$1(vm.borderWidth, globalOptionLineElements.borderWidth);
          ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;
          ctx.beginPath();
          currentVM = points[0]._view;
          if (!currentVM.skip) {
            ctx.moveTo(currentVM.x, currentVM.y);
            lastDrawnIndex = 0;
          }
          for (index2 = 1; index2 < points.length; ++index2) {
            currentVM = points[index2]._view;
            previous = lastDrawnIndex === -1 ? helpers$1.previousItem(points, index2) : points[lastDrawnIndex];
            if (!currentVM.skip) {
              if (lastDrawnIndex !== index2 - 1 && !spanGaps || lastDrawnIndex === -1) {
                ctx.moveTo(currentVM.x, currentVM.y);
              } else {
                helpers$1.canvas.lineTo(ctx, previous._view, currentVM);
              }
              lastDrawnIndex = index2;
            }
          }
          if (closePath) {
            ctx.closePath();
          }
          ctx.stroke();
          ctx.restore();
        }
      });
      var valueOrDefault$2 = helpers$1.valueOrDefault;
      var defaultColor$1 = core_defaults.global.defaultColor;
      core_defaults._set("global", {
        elements: {
          point: {
            radius: 3,
            pointStyle: "circle",
            backgroundColor: defaultColor$1,
            borderColor: defaultColor$1,
            borderWidth: 1,
            hitRadius: 1,
            hoverRadius: 4,
            hoverBorderWidth: 1
          }
        }
      });
      function xRange(mouseX) {
        var vm = this._view;
        return vm ? Math.abs(mouseX - vm.x) < vm.radius + vm.hitRadius : false;
      }
      function yRange(mouseY) {
        var vm = this._view;
        return vm ? Math.abs(mouseY - vm.y) < vm.radius + vm.hitRadius : false;
      }
      var element_point = core_element.extend({
        _type: "point",
        inRange: function(mouseX, mouseY) {
          var vm = this._view;
          return vm ? Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2) < Math.pow(vm.hitRadius + vm.radius, 2) : false;
        },
        inLabelRange: xRange,
        inXRange: xRange,
        inYRange: yRange,
        getCenterPoint: function() {
          var vm = this._view;
          return {
            x: vm.x,
            y: vm.y
          };
        },
        getArea: function() {
          return Math.PI * Math.pow(this._view.radius, 2);
        },
        tooltipPosition: function() {
          var vm = this._view;
          return {
            x: vm.x,
            y: vm.y,
            padding: vm.radius + vm.borderWidth
          };
        },
        draw: function(chartArea) {
          var vm = this._view;
          var ctx = this._chart.ctx;
          var pointStyle = vm.pointStyle;
          var rotation = vm.rotation;
          var radius = vm.radius;
          var x = vm.x;
          var y = vm.y;
          var globalDefaults = core_defaults.global;
          var defaultColor2 = globalDefaults.defaultColor;
          if (vm.skip) {
            return;
          }
          if (chartArea === void 0 || helpers$1.canvas._isPointInArea(vm, chartArea)) {
            ctx.strokeStyle = vm.borderColor || defaultColor2;
            ctx.lineWidth = valueOrDefault$2(vm.borderWidth, globalDefaults.elements.point.borderWidth);
            ctx.fillStyle = vm.backgroundColor || defaultColor2;
            helpers$1.canvas.drawPoint(ctx, pointStyle, radius, x, y, rotation);
          }
        }
      });
      var defaultColor$2 = core_defaults.global.defaultColor;
      core_defaults._set("global", {
        elements: {
          rectangle: {
            backgroundColor: defaultColor$2,
            borderColor: defaultColor$2,
            borderSkipped: "bottom",
            borderWidth: 0
          }
        }
      });
      function isVertical(vm) {
        return vm && vm.width !== void 0;
      }
      function getBarBounds(vm) {
        var x1, x2, y1, y2, half;
        if (isVertical(vm)) {
          half = vm.width / 2;
          x1 = vm.x - half;
          x2 = vm.x + half;
          y1 = Math.min(vm.y, vm.base);
          y2 = Math.max(vm.y, vm.base);
        } else {
          half = vm.height / 2;
          x1 = Math.min(vm.x, vm.base);
          x2 = Math.max(vm.x, vm.base);
          y1 = vm.y - half;
          y2 = vm.y + half;
        }
        return {
          left: x1,
          top: y1,
          right: x2,
          bottom: y2
        };
      }
      function swap(orig, v1, v2) {
        return orig === v1 ? v2 : orig === v2 ? v1 : orig;
      }
      function parseBorderSkipped(vm) {
        var edge = vm.borderSkipped;
        var res = {};
        if (!edge) {
          return res;
        }
        if (vm.horizontal) {
          if (vm.base > vm.x) {
            edge = swap(edge, "left", "right");
          }
        } else if (vm.base < vm.y) {
          edge = swap(edge, "bottom", "top");
        }
        res[edge] = true;
        return res;
      }
      function parseBorderWidth(vm, maxW, maxH) {
        var value = vm.borderWidth;
        var skip2 = parseBorderSkipped(vm);
        var t, r, b, l;
        if (helpers$1.isObject(value)) {
          t = +value.top || 0;
          r = +value.right || 0;
          b = +value.bottom || 0;
          l = +value.left || 0;
        } else {
          t = r = b = l = +value || 0;
        }
        return {
          t: skip2.top || t < 0 ? 0 : t > maxH ? maxH : t,
          r: skip2.right || r < 0 ? 0 : r > maxW ? maxW : r,
          b: skip2.bottom || b < 0 ? 0 : b > maxH ? maxH : b,
          l: skip2.left || l < 0 ? 0 : l > maxW ? maxW : l
        };
      }
      function boundingRects(vm) {
        var bounds = getBarBounds(vm);
        var width = bounds.right - bounds.left;
        var height = bounds.bottom - bounds.top;
        var border = parseBorderWidth(vm, width / 2, height / 2);
        return {
          outer: {
            x: bounds.left,
            y: bounds.top,
            w: width,
            h: height
          },
          inner: {
            x: bounds.left + border.l,
            y: bounds.top + border.t,
            w: width - border.l - border.r,
            h: height - border.t - border.b
          }
        };
      }
      function inRange(vm, x, y) {
        var skipX = x === null;
        var skipY = y === null;
        var bounds = !vm || skipX && skipY ? false : getBarBounds(vm);
        return bounds && (skipX || x >= bounds.left && x <= bounds.right) && (skipY || y >= bounds.top && y <= bounds.bottom);
      }
      var element_rectangle = core_element.extend({
        _type: "rectangle",
        draw: function() {
          var ctx = this._chart.ctx;
          var vm = this._view;
          var rects = boundingRects(vm);
          var outer = rects.outer;
          var inner = rects.inner;
          ctx.fillStyle = vm.backgroundColor;
          ctx.fillRect(outer.x, outer.y, outer.w, outer.h);
          if (outer.w === inner.w && outer.h === inner.h) {
            return;
          }
          ctx.save();
          ctx.beginPath();
          ctx.rect(outer.x, outer.y, outer.w, outer.h);
          ctx.clip();
          ctx.fillStyle = vm.borderColor;
          ctx.rect(inner.x, inner.y, inner.w, inner.h);
          ctx.fill("evenodd");
          ctx.restore();
        },
        height: function() {
          var vm = this._view;
          return vm.base - vm.y;
        },
        inRange: function(mouseX, mouseY) {
          return inRange(this._view, mouseX, mouseY);
        },
        inLabelRange: function(mouseX, mouseY) {
          var vm = this._view;
          return isVertical(vm) ? inRange(vm, mouseX, null) : inRange(vm, null, mouseY);
        },
        inXRange: function(mouseX) {
          return inRange(this._view, mouseX, null);
        },
        inYRange: function(mouseY) {
          return inRange(this._view, null, mouseY);
        },
        getCenterPoint: function() {
          var vm = this._view;
          var x, y;
          if (isVertical(vm)) {
            x = vm.x;
            y = (vm.y + vm.base) / 2;
          } else {
            x = (vm.x + vm.base) / 2;
            y = vm.y;
          }
          return {x, y};
        },
        getArea: function() {
          var vm = this._view;
          return isVertical(vm) ? vm.width * Math.abs(vm.y - vm.base) : vm.height * Math.abs(vm.x - vm.base);
        },
        tooltipPosition: function() {
          var vm = this._view;
          return {
            x: vm.x,
            y: vm.y
          };
        }
      });
      var elements = {};
      var Arc = element_arc;
      var Line = element_line;
      var Point = element_point;
      var Rectangle = element_rectangle;
      elements.Arc = Arc;
      elements.Line = Line;
      elements.Point = Point;
      elements.Rectangle = Rectangle;
      var deprecated = helpers$1._deprecated;
      var valueOrDefault$3 = helpers$1.valueOrDefault;
      core_defaults._set("bar", {
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",
            offset: true,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            type: "linear"
          }]
        }
      });
      core_defaults._set("global", {
        datasets: {
          bar: {
            categoryPercentage: 0.8,
            barPercentage: 0.9
          }
        }
      });
      function computeMinSampleSize(scale2, pixels) {
        var min = scale2._length;
        var prev, curr, i, ilen;
        for (i = 1, ilen = pixels.length; i < ilen; ++i) {
          min = Math.min(min, Math.abs(pixels[i] - pixels[i - 1]));
        }
        for (i = 0, ilen = scale2.getTicks().length; i < ilen; ++i) {
          curr = scale2.getPixelForTick(i);
          min = i > 0 ? Math.min(min, Math.abs(curr - prev)) : min;
          prev = curr;
        }
        return min;
      }
      function computeFitCategoryTraits(index2, ruler, options3) {
        var thickness = options3.barThickness;
        var count = ruler.stackCount;
        var curr = ruler.pixels[index2];
        var min = helpers$1.isNullOrUndef(thickness) ? computeMinSampleSize(ruler.scale, ruler.pixels) : -1;
        var size, ratio;
        if (helpers$1.isNullOrUndef(thickness)) {
          size = min * options3.categoryPercentage;
          ratio = options3.barPercentage;
        } else {
          size = thickness * count;
          ratio = 1;
        }
        return {
          chunk: size / count,
          ratio,
          start: curr - size / 2
        };
      }
      function computeFlexCategoryTraits(index2, ruler, options3) {
        var pixels = ruler.pixels;
        var curr = pixels[index2];
        var prev = index2 > 0 ? pixels[index2 - 1] : null;
        var next = index2 < pixels.length - 1 ? pixels[index2 + 1] : null;
        var percent = options3.categoryPercentage;
        var start, size;
        if (prev === null) {
          prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
        }
        if (next === null) {
          next = curr + curr - prev;
        }
        start = curr - (curr - Math.min(prev, next)) / 2 * percent;
        size = Math.abs(next - prev) / 2 * percent;
        return {
          chunk: size / ruler.stackCount,
          ratio: options3.barPercentage,
          start
        };
      }
      var controller_bar = core_datasetController.extend({
        dataElementType: elements.Rectangle,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderSkipped",
          "borderWidth",
          "barPercentage",
          "barThickness",
          "categoryPercentage",
          "maxBarThickness",
          "minBarLength"
        ],
        initialize: function() {
          var me = this;
          var meta, scaleOpts;
          core_datasetController.prototype.initialize.apply(me, arguments);
          meta = me.getMeta();
          meta.stack = me.getDataset().stack;
          meta.bar = true;
          scaleOpts = me._getIndexScale().options;
          deprecated("bar chart", scaleOpts.barPercentage, "scales.[x/y]Axes.barPercentage", "dataset.barPercentage");
          deprecated("bar chart", scaleOpts.barThickness, "scales.[x/y]Axes.barThickness", "dataset.barThickness");
          deprecated("bar chart", scaleOpts.categoryPercentage, "scales.[x/y]Axes.categoryPercentage", "dataset.categoryPercentage");
          deprecated("bar chart", me._getValueScale().options.minBarLength, "scales.[x/y]Axes.minBarLength", "dataset.minBarLength");
          deprecated("bar chart", scaleOpts.maxBarThickness, "scales.[x/y]Axes.maxBarThickness", "dataset.maxBarThickness");
        },
        update: function(reset) {
          var me = this;
          var rects = me.getMeta().data;
          var i, ilen;
          me._ruler = me.getRuler();
          for (i = 0, ilen = rects.length; i < ilen; ++i) {
            me.updateElement(rects[i], i, reset);
          }
        },
        updateElement: function(rectangle, index2, reset) {
          var me = this;
          var meta = me.getMeta();
          var dataset = me.getDataset();
          var options3 = me._resolveDataElementOptions(rectangle, index2);
          rectangle._xScale = me.getScaleForId(meta.xAxisID);
          rectangle._yScale = me.getScaleForId(meta.yAxisID);
          rectangle._datasetIndex = me.index;
          rectangle._index = index2;
          rectangle._model = {
            backgroundColor: options3.backgroundColor,
            borderColor: options3.borderColor,
            borderSkipped: options3.borderSkipped,
            borderWidth: options3.borderWidth,
            datasetLabel: dataset.label,
            label: me.chart.data.labels[index2]
          };
          if (helpers$1.isArray(dataset.data[index2])) {
            rectangle._model.borderSkipped = null;
          }
          me._updateElementGeometry(rectangle, index2, reset, options3);
          rectangle.pivot();
        },
        _updateElementGeometry: function(rectangle, index2, reset, options3) {
          var me = this;
          var model = rectangle._model;
          var vscale = me._getValueScale();
          var base = vscale.getBasePixel();
          var horizontal = vscale.isHorizontal();
          var ruler = me._ruler || me.getRuler();
          var vpixels = me.calculateBarValuePixels(me.index, index2, options3);
          var ipixels = me.calculateBarIndexPixels(me.index, index2, ruler, options3);
          model.horizontal = horizontal;
          model.base = reset ? base : vpixels.base;
          model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
          model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
          model.height = horizontal ? ipixels.size : void 0;
          model.width = horizontal ? void 0 : ipixels.size;
        },
        _getStacks: function(last) {
          var me = this;
          var scale2 = me._getIndexScale();
          var metasets = scale2._getMatchingVisibleMetas(me._type);
          var stacked = scale2.options.stacked;
          var ilen = metasets.length;
          var stacks = [];
          var i, meta;
          for (i = 0; i < ilen; ++i) {
            meta = metasets[i];
            if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) {
              stacks.push(meta.stack);
            }
            if (meta.index === last) {
              break;
            }
          }
          return stacks;
        },
        getStackCount: function() {
          return this._getStacks().length;
        },
        getStackIndex: function(datasetIndex, name2) {
          var stacks = this._getStacks(datasetIndex);
          var index2 = name2 !== void 0 ? stacks.indexOf(name2) : -1;
          return index2 === -1 ? stacks.length - 1 : index2;
        },
        getRuler: function() {
          var me = this;
          var scale2 = me._getIndexScale();
          var pixels = [];
          var i, ilen;
          for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
            pixels.push(scale2.getPixelForValue(null, i, me.index));
          }
          return {
            pixels,
            start: scale2._startPixel,
            end: scale2._endPixel,
            stackCount: me.getStackCount(),
            scale: scale2
          };
        },
        calculateBarValuePixels: function(datasetIndex, index2, options3) {
          var me = this;
          var chart = me.chart;
          var scale2 = me._getValueScale();
          var isHorizontal = scale2.isHorizontal();
          var datasets = chart.data.datasets;
          var metasets = scale2._getMatchingVisibleMetas(me._type);
          var value = scale2._parseValue(datasets[datasetIndex].data[index2]);
          var minBarLength = options3.minBarLength;
          var stacked = scale2.options.stacked;
          var stack = me.getMeta().stack;
          var start = value.start === void 0 ? 0 : value.max >= 0 && value.min >= 0 ? value.min : value.max;
          var length = value.start === void 0 ? value.end : value.max >= 0 && value.min >= 0 ? value.max - value.min : value.min - value.max;
          var ilen = metasets.length;
          var i, imeta, ivalue, base, head, size, stackLength;
          if (stacked || stacked === void 0 && stack !== void 0) {
            for (i = 0; i < ilen; ++i) {
              imeta = metasets[i];
              if (imeta.index === datasetIndex) {
                break;
              }
              if (imeta.stack === stack) {
                stackLength = scale2._parseValue(datasets[imeta.index].data[index2]);
                ivalue = stackLength.start === void 0 ? stackLength.end : stackLength.min >= 0 && stackLength.max >= 0 ? stackLength.max : stackLength.min;
                if (value.min < 0 && ivalue < 0 || value.max >= 0 && ivalue > 0) {
                  start += ivalue;
                }
              }
            }
          }
          base = scale2.getPixelForValue(start);
          head = scale2.getPixelForValue(start + length);
          size = head - base;
          if (minBarLength !== void 0 && Math.abs(size) < minBarLength) {
            size = minBarLength;
            if (length >= 0 && !isHorizontal || length < 0 && isHorizontal) {
              head = base - minBarLength;
            } else {
              head = base + minBarLength;
            }
          }
          return {
            size,
            base,
            head,
            center: head + size / 2
          };
        },
        calculateBarIndexPixels: function(datasetIndex, index2, ruler, options3) {
          var me = this;
          var range = options3.barThickness === "flex" ? computeFlexCategoryTraits(index2, ruler, options3) : computeFitCategoryTraits(index2, ruler, options3);
          var stackIndex = me.getStackIndex(datasetIndex, me.getMeta().stack);
          var center = range.start + range.chunk * stackIndex + range.chunk / 2;
          var size = Math.min(valueOrDefault$3(options3.maxBarThickness, Infinity), range.chunk * range.ratio);
          return {
            base: center - size / 2,
            head: center + size / 2,
            center,
            size
          };
        },
        draw: function() {
          var me = this;
          var chart = me.chart;
          var scale2 = me._getValueScale();
          var rects = me.getMeta().data;
          var dataset = me.getDataset();
          var ilen = rects.length;
          var i = 0;
          helpers$1.canvas.clipArea(chart.ctx, chart.chartArea);
          for (; i < ilen; ++i) {
            var val = scale2._parseValue(dataset.data[i]);
            if (!isNaN(val.min) && !isNaN(val.max)) {
              rects[i].draw();
            }
          }
          helpers$1.canvas.unclipArea(chart.ctx);
        },
        _resolveDataElementOptions: function() {
          var me = this;
          var values = helpers$1.extend({}, core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments));
          var indexOpts = me._getIndexScale().options;
          var valueOpts = me._getValueScale().options;
          values.barPercentage = valueOrDefault$3(indexOpts.barPercentage, values.barPercentage);
          values.barThickness = valueOrDefault$3(indexOpts.barThickness, values.barThickness);
          values.categoryPercentage = valueOrDefault$3(indexOpts.categoryPercentage, values.categoryPercentage);
          values.maxBarThickness = valueOrDefault$3(indexOpts.maxBarThickness, values.maxBarThickness);
          values.minBarLength = valueOrDefault$3(valueOpts.minBarLength, values.minBarLength);
          return values;
        }
      });
      var valueOrDefault$4 = helpers$1.valueOrDefault;
      var resolve$1 = helpers$1.options.resolve;
      core_defaults._set("bubble", {
        hover: {
          mode: "single"
        },
        scales: {
          xAxes: [{
            type: "linear",
            position: "bottom",
            id: "x-axis-0"
          }],
          yAxes: [{
            type: "linear",
            position: "left",
            id: "y-axis-0"
          }]
        },
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(item, data) {
              var datasetLabel = data.datasets[item.datasetIndex].label || "";
              var dataPoint = data.datasets[item.datasetIndex].data[item.index];
              return datasetLabel + ": (" + item.xLabel + ", " + item.yLabel + ", " + dataPoint.r + ")";
            }
          }
        }
      });
      var controller_bubble = core_datasetController.extend({
        dataElementType: elements.Point,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth",
          "hoverRadius",
          "hitRadius",
          "pointStyle",
          "rotation"
        ],
        update: function(reset) {
          var me = this;
          var meta = me.getMeta();
          var points = meta.data;
          helpers$1.each(points, function(point, index2) {
            me.updateElement(point, index2, reset);
          });
        },
        updateElement: function(point, index2, reset) {
          var me = this;
          var meta = me.getMeta();
          var custom = point.custom || {};
          var xScale = me.getScaleForId(meta.xAxisID);
          var yScale = me.getScaleForId(meta.yAxisID);
          var options3 = me._resolveDataElementOptions(point, index2);
          var data = me.getDataset().data[index2];
          var dsIndex = me.index;
          var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === "object" ? data : NaN, index2, dsIndex);
          var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index2, dsIndex);
          point._xScale = xScale;
          point._yScale = yScale;
          point._options = options3;
          point._datasetIndex = dsIndex;
          point._index = index2;
          point._model = {
            backgroundColor: options3.backgroundColor,
            borderColor: options3.borderColor,
            borderWidth: options3.borderWidth,
            hitRadius: options3.hitRadius,
            pointStyle: options3.pointStyle,
            rotation: options3.rotation,
            radius: reset ? 0 : options3.radius,
            skip: custom.skip || isNaN(x) || isNaN(y),
            x,
            y
          };
          point.pivot();
        },
        setHoverStyle: function(point) {
          var model = point._model;
          var options3 = point._options;
          var getHoverColor = helpers$1.getHoverColor;
          point.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth,
            radius: model.radius
          };
          model.backgroundColor = valueOrDefault$4(options3.hoverBackgroundColor, getHoverColor(options3.backgroundColor));
          model.borderColor = valueOrDefault$4(options3.hoverBorderColor, getHoverColor(options3.borderColor));
          model.borderWidth = valueOrDefault$4(options3.hoverBorderWidth, options3.borderWidth);
          model.radius = options3.radius + options3.hoverRadius;
        },
        _resolveDataElementOptions: function(point, index2) {
          var me = this;
          var chart = me.chart;
          var dataset = me.getDataset();
          var custom = point.custom || {};
          var data = dataset.data[index2] || {};
          var values = core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments);
          var context = {
            chart,
            dataIndex: index2,
            dataset,
            datasetIndex: me.index
          };
          if (me._cachedDataOpts === values) {
            values = helpers$1.extend({}, values);
          }
          values.radius = resolve$1([
            custom.radius,
            data.r,
            me._config.radius,
            chart.options.elements.point.radius
          ], context, index2);
          return values;
        }
      });
      var valueOrDefault$5 = helpers$1.valueOrDefault;
      var PI$1 = Math.PI;
      var DOUBLE_PI$1 = PI$1 * 2;
      var HALF_PI$1 = PI$1 / 2;
      core_defaults._set("doughnut", {
        animation: {
          animateRotate: true,
          animateScale: false
        },
        hover: {
          mode: "single"
        },
        legendCallback: function(chart) {
          var list = document.createElement("ul");
          var data = chart.data;
          var datasets = data.datasets;
          var labels = data.labels;
          var i, ilen, listItem, listItemSpan;
          list.setAttribute("class", chart.id + "-legend");
          if (datasets.length) {
            for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
              listItem = list.appendChild(document.createElement("li"));
              listItemSpan = listItem.appendChild(document.createElement("span"));
              listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];
              if (labels[i]) {
                listItem.appendChild(document.createTextNode(labels[i]));
              }
            }
          }
          return list.outerHTML;
        },
        legend: {
          labels: {
            generateLabels: function(chart) {
              var data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var style = meta.controller.getStyle(i);
                  return {
                    text: label,
                    fillStyle: style.backgroundColor,
                    strokeStyle: style.borderColor,
                    lineWidth: style.borderWidth,
                    hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                    index: i
                  };
                });
              }
              return [];
            }
          },
          onClick: function(e, legendItem) {
            var index2 = legendItem.index;
            var chart = this.chart;
            var i, ilen, meta;
            for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
              meta = chart.getDatasetMeta(i);
              if (meta.data[index2]) {
                meta.data[index2].hidden = !meta.data[index2].hidden;
              }
            }
            chart.update();
          }
        },
        cutoutPercentage: 50,
        rotation: -HALF_PI$1,
        circumference: DOUBLE_PI$1,
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(tooltipItem, data) {
              var dataLabel = data.labels[tooltipItem.index];
              var value = ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              if (helpers$1.isArray(dataLabel)) {
                dataLabel = dataLabel.slice();
                dataLabel[0] += value;
              } else {
                dataLabel += value;
              }
              return dataLabel;
            }
          }
        }
      });
      var controller_doughnut = core_datasetController.extend({
        dataElementType: elements.Arc,
        linkScales: helpers$1.noop,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "borderAlign",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth"
        ],
        getRingIndex: function(datasetIndex) {
          var ringIndex = 0;
          for (var j = 0; j < datasetIndex; ++j) {
            if (this.chart.isDatasetVisible(j)) {
              ++ringIndex;
            }
          }
          return ringIndex;
        },
        update: function(reset) {
          var me = this;
          var chart = me.chart;
          var chartArea = chart.chartArea;
          var opts = chart.options;
          var ratioX = 1;
          var ratioY = 1;
          var offsetX = 0;
          var offsetY = 0;
          var meta = me.getMeta();
          var arcs = meta.data;
          var cutout = opts.cutoutPercentage / 100 || 0;
          var circumference = opts.circumference;
          var chartWeight = me._getRingWeight(me.index);
          var maxWidth, maxHeight, i, ilen;
          if (circumference < DOUBLE_PI$1) {
            var startAngle = opts.rotation % DOUBLE_PI$1;
            startAngle += startAngle >= PI$1 ? -DOUBLE_PI$1 : startAngle < -PI$1 ? DOUBLE_PI$1 : 0;
            var endAngle = startAngle + circumference;
            var startX = Math.cos(startAngle);
            var startY = Math.sin(startAngle);
            var endX = Math.cos(endAngle);
            var endY = Math.sin(endAngle);
            var contains0 = startAngle <= 0 && endAngle >= 0 || endAngle >= DOUBLE_PI$1;
            var contains90 = startAngle <= HALF_PI$1 && endAngle >= HALF_PI$1 || endAngle >= DOUBLE_PI$1 + HALF_PI$1;
            var contains180 = startAngle === -PI$1 || endAngle >= PI$1;
            var contains270 = startAngle <= -HALF_PI$1 && endAngle >= -HALF_PI$1 || endAngle >= PI$1 + HALF_PI$1;
            var minX = contains180 ? -1 : Math.min(startX, startX * cutout, endX, endX * cutout);
            var minY = contains270 ? -1 : Math.min(startY, startY * cutout, endY, endY * cutout);
            var maxX = contains0 ? 1 : Math.max(startX, startX * cutout, endX, endX * cutout);
            var maxY = contains90 ? 1 : Math.max(startY, startY * cutout, endY, endY * cutout);
            ratioX = (maxX - minX) / 2;
            ratioY = (maxY - minY) / 2;
            offsetX = -(maxX + minX) / 2;
            offsetY = -(maxY + minY) / 2;
          }
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
          }
          chart.borderWidth = me.getMaxBorderWidth();
          maxWidth = (chartArea.right - chartArea.left - chart.borderWidth) / ratioX;
          maxHeight = (chartArea.bottom - chartArea.top - chart.borderWidth) / ratioY;
          chart.outerRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
          chart.innerRadius = Math.max(chart.outerRadius * cutout, 0);
          chart.radiusLength = (chart.outerRadius - chart.innerRadius) / (me._getVisibleDatasetWeightTotal() || 1);
          chart.offsetX = offsetX * chart.outerRadius;
          chart.offsetY = offsetY * chart.outerRadius;
          meta.total = me.calculateTotal();
          me.outerRadius = chart.outerRadius - chart.radiusLength * me._getRingWeightOffset(me.index);
          me.innerRadius = Math.max(me.outerRadius - chart.radiusLength * chartWeight, 0);
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            me.updateElement(arcs[i], i, reset);
          }
        },
        updateElement: function(arc, index2, reset) {
          var me = this;
          var chart = me.chart;
          var chartArea = chart.chartArea;
          var opts = chart.options;
          var animationOpts = opts.animation;
          var centerX = (chartArea.left + chartArea.right) / 2;
          var centerY = (chartArea.top + chartArea.bottom) / 2;
          var startAngle = opts.rotation;
          var endAngle = opts.rotation;
          var dataset = me.getDataset();
          var circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index2]) * (opts.circumference / DOUBLE_PI$1);
          var innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius;
          var outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius;
          var options3 = arc._options || {};
          helpers$1.extend(arc, {
            _datasetIndex: me.index,
            _index: index2,
            _model: {
              backgroundColor: options3.backgroundColor,
              borderColor: options3.borderColor,
              borderWidth: options3.borderWidth,
              borderAlign: options3.borderAlign,
              x: centerX + chart.offsetX,
              y: centerY + chart.offsetY,
              startAngle,
              endAngle,
              circumference,
              outerRadius,
              innerRadius,
              label: helpers$1.valueAtIndexOrDefault(dataset.label, index2, chart.data.labels[index2])
            }
          });
          var model = arc._model;
          if (!reset || !animationOpts.animateRotate) {
            if (index2 === 0) {
              model.startAngle = opts.rotation;
            } else {
              model.startAngle = me.getMeta().data[index2 - 1]._model.endAngle;
            }
            model.endAngle = model.startAngle + model.circumference;
          }
          arc.pivot();
        },
        calculateTotal: function() {
          var dataset = this.getDataset();
          var meta = this.getMeta();
          var total = 0;
          var value;
          helpers$1.each(meta.data, function(element, index2) {
            value = dataset.data[index2];
            if (!isNaN(value) && !element.hidden) {
              total += Math.abs(value);
            }
          });
          return total;
        },
        calculateCircumference: function(value) {
          var total = this.getMeta().total;
          if (total > 0 && !isNaN(value)) {
            return DOUBLE_PI$1 * (Math.abs(value) / total);
          }
          return 0;
        },
        getMaxBorderWidth: function(arcs) {
          var me = this;
          var max = 0;
          var chart = me.chart;
          var i, ilen, meta, arc, controller, options3, borderWidth, hoverWidth;
          if (!arcs) {
            for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
              if (chart.isDatasetVisible(i)) {
                meta = chart.getDatasetMeta(i);
                arcs = meta.data;
                if (i !== me.index) {
                  controller = meta.controller;
                }
                break;
              }
            }
          }
          if (!arcs) {
            return 0;
          }
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            arc = arcs[i];
            if (controller) {
              controller._configure();
              options3 = controller._resolveDataElementOptions(arc, i);
            } else {
              options3 = arc._options;
            }
            if (options3.borderAlign !== "inner") {
              borderWidth = options3.borderWidth;
              hoverWidth = options3.hoverBorderWidth;
              max = borderWidth > max ? borderWidth : max;
              max = hoverWidth > max ? hoverWidth : max;
            }
          }
          return max;
        },
        setHoverStyle: function(arc) {
          var model = arc._model;
          var options3 = arc._options;
          var getHoverColor = helpers$1.getHoverColor;
          arc.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth
          };
          model.backgroundColor = valueOrDefault$5(options3.hoverBackgroundColor, getHoverColor(options3.backgroundColor));
          model.borderColor = valueOrDefault$5(options3.hoverBorderColor, getHoverColor(options3.borderColor));
          model.borderWidth = valueOrDefault$5(options3.hoverBorderWidth, options3.borderWidth);
        },
        _getRingWeightOffset: function(datasetIndex) {
          var ringWeightOffset = 0;
          for (var i = 0; i < datasetIndex; ++i) {
            if (this.chart.isDatasetVisible(i)) {
              ringWeightOffset += this._getRingWeight(i);
            }
          }
          return ringWeightOffset;
        },
        _getRingWeight: function(dataSetIndex) {
          return Math.max(valueOrDefault$5(this.chart.data.datasets[dataSetIndex].weight, 1), 0);
        },
        _getVisibleDatasetWeightTotal: function() {
          return this._getRingWeightOffset(this.chart.data.datasets.length);
        }
      });
      core_defaults._set("horizontalBar", {
        hover: {
          mode: "index",
          axis: "y"
        },
        scales: {
          xAxes: [{
            type: "linear",
            position: "bottom"
          }],
          yAxes: [{
            type: "category",
            position: "left",
            offset: true,
            gridLines: {
              offsetGridLines: true
            }
          }]
        },
        elements: {
          rectangle: {
            borderSkipped: "left"
          }
        },
        tooltips: {
          mode: "index",
          axis: "y"
        }
      });
      core_defaults._set("global", {
        datasets: {
          horizontalBar: {
            categoryPercentage: 0.8,
            barPercentage: 0.9
          }
        }
      });
      var controller_horizontalBar = controller_bar.extend({
        _getValueScaleId: function() {
          return this.getMeta().xAxisID;
        },
        _getIndexScaleId: function() {
          return this.getMeta().yAxisID;
        }
      });
      var valueOrDefault$6 = helpers$1.valueOrDefault;
      var resolve$2 = helpers$1.options.resolve;
      var isPointInArea = helpers$1.canvas._isPointInArea;
      core_defaults._set("line", {
        showLines: true,
        spanGaps: false,
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",
            id: "x-axis-0"
          }],
          yAxes: [{
            type: "linear",
            id: "y-axis-0"
          }]
        }
      });
      function scaleClip(scale2, halfBorderWidth) {
        var tickOpts = scale2 && scale2.options.ticks || {};
        var reverse = tickOpts.reverse;
        var min = tickOpts.min === void 0 ? halfBorderWidth : 0;
        var max = tickOpts.max === void 0 ? halfBorderWidth : 0;
        return {
          start: reverse ? max : min,
          end: reverse ? min : max
        };
      }
      function defaultClip(xScale, yScale, borderWidth) {
        var halfBorderWidth = borderWidth / 2;
        var x = scaleClip(xScale, halfBorderWidth);
        var y = scaleClip(yScale, halfBorderWidth);
        return {
          top: y.end,
          right: x.end,
          bottom: y.start,
          left: x.start
        };
      }
      function toClip(value) {
        var t, r, b, l;
        if (helpers$1.isObject(value)) {
          t = value.top;
          r = value.right;
          b = value.bottom;
          l = value.left;
        } else {
          t = r = b = l = value;
        }
        return {
          top: t,
          right: r,
          bottom: b,
          left: l
        };
      }
      var controller_line = core_datasetController.extend({
        datasetElementType: elements.Line,
        dataElementType: elements.Point,
        _datasetElementOptions: [
          "backgroundColor",
          "borderCapStyle",
          "borderColor",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "borderWidth",
          "cubicInterpolationMode",
          "fill"
        ],
        _dataElementOptions: {
          backgroundColor: "pointBackgroundColor",
          borderColor: "pointBorderColor",
          borderWidth: "pointBorderWidth",
          hitRadius: "pointHitRadius",
          hoverBackgroundColor: "pointHoverBackgroundColor",
          hoverBorderColor: "pointHoverBorderColor",
          hoverBorderWidth: "pointHoverBorderWidth",
          hoverRadius: "pointHoverRadius",
          pointStyle: "pointStyle",
          radius: "pointRadius",
          rotation: "pointRotation"
        },
        update: function(reset) {
          var me = this;
          var meta = me.getMeta();
          var line = meta.dataset;
          var points = meta.data || [];
          var options3 = me.chart.options;
          var config = me._config;
          var showLine = me._showLine = valueOrDefault$6(config.showLine, options3.showLines);
          var i, ilen;
          me._xScale = me.getScaleForId(meta.xAxisID);
          me._yScale = me.getScaleForId(meta.yAxisID);
          if (showLine) {
            if (config.tension !== void 0 && config.lineTension === void 0) {
              config.lineTension = config.tension;
            }
            line._scale = me._yScale;
            line._datasetIndex = me.index;
            line._children = points;
            line._model = me._resolveDatasetElementOptions(line);
            line.pivot();
          }
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            me.updateElement(points[i], i, reset);
          }
          if (showLine && line._model.tension !== 0) {
            me.updateBezierControlPoints();
          }
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            points[i].pivot();
          }
        },
        updateElement: function(point, index2, reset) {
          var me = this;
          var meta = me.getMeta();
          var custom = point.custom || {};
          var dataset = me.getDataset();
          var datasetIndex = me.index;
          var value = dataset.data[index2];
          var xScale = me._xScale;
          var yScale = me._yScale;
          var lineModel = meta.dataset._model;
          var x, y;
          var options3 = me._resolveDataElementOptions(point, index2);
          x = xScale.getPixelForValue(typeof value === "object" ? value : NaN, index2, datasetIndex);
          y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index2, datasetIndex);
          point._xScale = xScale;
          point._yScale = yScale;
          point._options = options3;
          point._datasetIndex = datasetIndex;
          point._index = index2;
          point._model = {
            x,
            y,
            skip: custom.skip || isNaN(x) || isNaN(y),
            radius: options3.radius,
            pointStyle: options3.pointStyle,
            rotation: options3.rotation,
            backgroundColor: options3.backgroundColor,
            borderColor: options3.borderColor,
            borderWidth: options3.borderWidth,
            tension: valueOrDefault$6(custom.tension, lineModel ? lineModel.tension : 0),
            steppedLine: lineModel ? lineModel.steppedLine : false,
            hitRadius: options3.hitRadius
          };
        },
        _resolveDatasetElementOptions: function(element) {
          var me = this;
          var config = me._config;
          var custom = element.custom || {};
          var options3 = me.chart.options;
          var lineOptions = options3.elements.line;
          var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);
          values.spanGaps = valueOrDefault$6(config.spanGaps, options3.spanGaps);
          values.tension = valueOrDefault$6(config.lineTension, lineOptions.tension);
          values.steppedLine = resolve$2([custom.steppedLine, config.steppedLine, lineOptions.stepped]);
          values.clip = toClip(valueOrDefault$6(config.clip, defaultClip(me._xScale, me._yScale, values.borderWidth)));
          return values;
        },
        calculatePointY: function(value, index2, datasetIndex) {
          var me = this;
          var chart = me.chart;
          var yScale = me._yScale;
          var sumPos = 0;
          var sumNeg = 0;
          var i, ds, dsMeta, stackedRightValue, rightValue, metasets, ilen;
          if (yScale.options.stacked) {
            rightValue = +yScale.getRightValue(value);
            metasets = chart._getSortedVisibleDatasetMetas();
            ilen = metasets.length;
            for (i = 0; i < ilen; ++i) {
              dsMeta = metasets[i];
              if (dsMeta.index === datasetIndex) {
                break;
              }
              ds = chart.data.datasets[dsMeta.index];
              if (dsMeta.type === "line" && dsMeta.yAxisID === yScale.id) {
                stackedRightValue = +yScale.getRightValue(ds.data[index2]);
                if (stackedRightValue < 0) {
                  sumNeg += stackedRightValue || 0;
                } else {
                  sumPos += stackedRightValue || 0;
                }
              }
            }
            if (rightValue < 0) {
              return yScale.getPixelForValue(sumNeg + rightValue);
            }
            return yScale.getPixelForValue(sumPos + rightValue);
          }
          return yScale.getPixelForValue(value);
        },
        updateBezierControlPoints: function() {
          var me = this;
          var chart = me.chart;
          var meta = me.getMeta();
          var lineModel = meta.dataset._model;
          var area = chart.chartArea;
          var points = meta.data || [];
          var i, ilen, model, controlPoints;
          if (lineModel.spanGaps) {
            points = points.filter(function(pt) {
              return !pt._model.skip;
            });
          }
          function capControlPoint(pt, min, max) {
            return Math.max(Math.min(pt, max), min);
          }
          if (lineModel.cubicInterpolationMode === "monotone") {
            helpers$1.splineCurveMonotone(points);
          } else {
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              model = points[i]._model;
              controlPoints = helpers$1.splineCurve(helpers$1.previousItem(points, i)._model, model, helpers$1.nextItem(points, i)._model, lineModel.tension);
              model.controlPointPreviousX = controlPoints.previous.x;
              model.controlPointPreviousY = controlPoints.previous.y;
              model.controlPointNextX = controlPoints.next.x;
              model.controlPointNextY = controlPoints.next.y;
            }
          }
          if (chart.options.elements.line.capBezierPoints) {
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              model = points[i]._model;
              if (isPointInArea(model, area)) {
                if (i > 0 && isPointInArea(points[i - 1]._model, area)) {
                  model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
                  model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
                }
                if (i < points.length - 1 && isPointInArea(points[i + 1]._model, area)) {
                  model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
                  model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
                }
              }
            }
          }
        },
        draw: function() {
          var me = this;
          var chart = me.chart;
          var meta = me.getMeta();
          var points = meta.data || [];
          var area = chart.chartArea;
          var canvas2 = chart.canvas;
          var i = 0;
          var ilen = points.length;
          var clip;
          if (me._showLine) {
            clip = meta.dataset._model.clip;
            helpers$1.canvas.clipArea(chart.ctx, {
              left: clip.left === false ? 0 : area.left - clip.left,
              right: clip.right === false ? canvas2.width : area.right + clip.right,
              top: clip.top === false ? 0 : area.top - clip.top,
              bottom: clip.bottom === false ? canvas2.height : area.bottom + clip.bottom
            });
            meta.dataset.draw();
            helpers$1.canvas.unclipArea(chart.ctx);
          }
          for (; i < ilen; ++i) {
            points[i].draw(area);
          }
        },
        setHoverStyle: function(point) {
          var model = point._model;
          var options3 = point._options;
          var getHoverColor = helpers$1.getHoverColor;
          point.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth,
            radius: model.radius
          };
          model.backgroundColor = valueOrDefault$6(options3.hoverBackgroundColor, getHoverColor(options3.backgroundColor));
          model.borderColor = valueOrDefault$6(options3.hoverBorderColor, getHoverColor(options3.borderColor));
          model.borderWidth = valueOrDefault$6(options3.hoverBorderWidth, options3.borderWidth);
          model.radius = valueOrDefault$6(options3.hoverRadius, options3.radius);
        }
      });
      var resolve$3 = helpers$1.options.resolve;
      core_defaults._set("polarArea", {
        scale: {
          type: "radialLinear",
          angleLines: {
            display: false
          },
          gridLines: {
            circular: true
          },
          pointLabels: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        },
        startAngle: -0.5 * Math.PI,
        legendCallback: function(chart) {
          var list = document.createElement("ul");
          var data = chart.data;
          var datasets = data.datasets;
          var labels = data.labels;
          var i, ilen, listItem, listItemSpan;
          list.setAttribute("class", chart.id + "-legend");
          if (datasets.length) {
            for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
              listItem = list.appendChild(document.createElement("li"));
              listItemSpan = listItem.appendChild(document.createElement("span"));
              listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];
              if (labels[i]) {
                listItem.appendChild(document.createTextNode(labels[i]));
              }
            }
          }
          return list.outerHTML;
        },
        legend: {
          labels: {
            generateLabels: function(chart) {
              var data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var style = meta.controller.getStyle(i);
                  return {
                    text: label,
                    fillStyle: style.backgroundColor,
                    strokeStyle: style.borderColor,
                    lineWidth: style.borderWidth,
                    hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                    index: i
                  };
                });
              }
              return [];
            }
          },
          onClick: function(e, legendItem) {
            var index2 = legendItem.index;
            var chart = this.chart;
            var i, ilen, meta;
            for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
              meta = chart.getDatasetMeta(i);
              meta.data[index2].hidden = !meta.data[index2].hidden;
            }
            chart.update();
          }
        },
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(item, data) {
              return data.labels[item.index] + ": " + item.yLabel;
            }
          }
        }
      });
      var controller_polarArea = core_datasetController.extend({
        dataElementType: elements.Arc,
        linkScales: helpers$1.noop,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "borderAlign",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth"
        ],
        _getIndexScaleId: function() {
          return this.chart.scale.id;
        },
        _getValueScaleId: function() {
          return this.chart.scale.id;
        },
        update: function(reset) {
          var me = this;
          var dataset = me.getDataset();
          var meta = me.getMeta();
          var start = me.chart.options.startAngle || 0;
          var starts = me._starts = [];
          var angles = me._angles = [];
          var arcs = meta.data;
          var i, ilen, angle;
          me._updateRadius();
          meta.count = me.countVisibleElements();
          for (i = 0, ilen = dataset.data.length; i < ilen; i++) {
            starts[i] = start;
            angle = me._computeAngle(i);
            angles[i] = angle;
            start += angle;
          }
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
            me.updateElement(arcs[i], i, reset);
          }
        },
        _updateRadius: function() {
          var me = this;
          var chart = me.chart;
          var chartArea = chart.chartArea;
          var opts = chart.options;
          var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          chart.outerRadius = Math.max(minSize / 2, 0);
          chart.innerRadius = Math.max(opts.cutoutPercentage ? chart.outerRadius / 100 * opts.cutoutPercentage : 1, 0);
          chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
          me.outerRadius = chart.outerRadius - chart.radiusLength * me.index;
          me.innerRadius = me.outerRadius - chart.radiusLength;
        },
        updateElement: function(arc, index2, reset) {
          var me = this;
          var chart = me.chart;
          var dataset = me.getDataset();
          var opts = chart.options;
          var animationOpts = opts.animation;
          var scale2 = chart.scale;
          var labels = chart.data.labels;
          var centerX = scale2.xCenter;
          var centerY = scale2.yCenter;
          var datasetStartAngle = opts.startAngle;
          var distance = arc.hidden ? 0 : scale2.getDistanceFromCenterForValue(dataset.data[index2]);
          var startAngle = me._starts[index2];
          var endAngle = startAngle + (arc.hidden ? 0 : me._angles[index2]);
          var resetRadius = animationOpts.animateScale ? 0 : scale2.getDistanceFromCenterForValue(dataset.data[index2]);
          var options3 = arc._options || {};
          helpers$1.extend(arc, {
            _datasetIndex: me.index,
            _index: index2,
            _scale: scale2,
            _model: {
              backgroundColor: options3.backgroundColor,
              borderColor: options3.borderColor,
              borderWidth: options3.borderWidth,
              borderAlign: options3.borderAlign,
              x: centerX,
              y: centerY,
              innerRadius: 0,
              outerRadius: reset ? resetRadius : distance,
              startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
              endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
              label: helpers$1.valueAtIndexOrDefault(labels, index2, labels[index2])
            }
          });
          arc.pivot();
        },
        countVisibleElements: function() {
          var dataset = this.getDataset();
          var meta = this.getMeta();
          var count = 0;
          helpers$1.each(meta.data, function(element, index2) {
            if (!isNaN(dataset.data[index2]) && !element.hidden) {
              count++;
            }
          });
          return count;
        },
        setHoverStyle: function(arc) {
          var model = arc._model;
          var options3 = arc._options;
          var getHoverColor = helpers$1.getHoverColor;
          var valueOrDefault2 = helpers$1.valueOrDefault;
          arc.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth
          };
          model.backgroundColor = valueOrDefault2(options3.hoverBackgroundColor, getHoverColor(options3.backgroundColor));
          model.borderColor = valueOrDefault2(options3.hoverBorderColor, getHoverColor(options3.borderColor));
          model.borderWidth = valueOrDefault2(options3.hoverBorderWidth, options3.borderWidth);
        },
        _computeAngle: function(index2) {
          var me = this;
          var count = this.getMeta().count;
          var dataset = me.getDataset();
          var meta = me.getMeta();
          if (isNaN(dataset.data[index2]) || meta.data[index2].hidden) {
            return 0;
          }
          var context = {
            chart: me.chart,
            dataIndex: index2,
            dataset,
            datasetIndex: me.index
          };
          return resolve$3([
            me.chart.options.elements.arc.angle,
            2 * Math.PI / count
          ], context, index2);
        }
      });
      core_defaults._set("pie", helpers$1.clone(core_defaults.doughnut));
      core_defaults._set("pie", {
        cutoutPercentage: 0
      });
      var controller_pie = controller_doughnut;
      var valueOrDefault$7 = helpers$1.valueOrDefault;
      core_defaults._set("radar", {
        spanGaps: false,
        scale: {
          type: "radialLinear"
        },
        elements: {
          line: {
            fill: "start",
            tension: 0
          }
        }
      });
      var controller_radar = core_datasetController.extend({
        datasetElementType: elements.Line,
        dataElementType: elements.Point,
        linkScales: helpers$1.noop,
        _datasetElementOptions: [
          "backgroundColor",
          "borderWidth",
          "borderColor",
          "borderCapStyle",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "fill"
        ],
        _dataElementOptions: {
          backgroundColor: "pointBackgroundColor",
          borderColor: "pointBorderColor",
          borderWidth: "pointBorderWidth",
          hitRadius: "pointHitRadius",
          hoverBackgroundColor: "pointHoverBackgroundColor",
          hoverBorderColor: "pointHoverBorderColor",
          hoverBorderWidth: "pointHoverBorderWidth",
          hoverRadius: "pointHoverRadius",
          pointStyle: "pointStyle",
          radius: "pointRadius",
          rotation: "pointRotation"
        },
        _getIndexScaleId: function() {
          return this.chart.scale.id;
        },
        _getValueScaleId: function() {
          return this.chart.scale.id;
        },
        update: function(reset) {
          var me = this;
          var meta = me.getMeta();
          var line = meta.dataset;
          var points = meta.data || [];
          var scale2 = me.chart.scale;
          var config = me._config;
          var i, ilen;
          if (config.tension !== void 0 && config.lineTension === void 0) {
            config.lineTension = config.tension;
          }
          line._scale = scale2;
          line._datasetIndex = me.index;
          line._children = points;
          line._loop = true;
          line._model = me._resolveDatasetElementOptions(line);
          line.pivot();
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            me.updateElement(points[i], i, reset);
          }
          me.updateBezierControlPoints();
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            points[i].pivot();
          }
        },
        updateElement: function(point, index2, reset) {
          var me = this;
          var custom = point.custom || {};
          var dataset = me.getDataset();
          var scale2 = me.chart.scale;
          var pointPosition = scale2.getPointPositionForValue(index2, dataset.data[index2]);
          var options3 = me._resolveDataElementOptions(point, index2);
          var lineModel = me.getMeta().dataset._model;
          var x = reset ? scale2.xCenter : pointPosition.x;
          var y = reset ? scale2.yCenter : pointPosition.y;
          point._scale = scale2;
          point._options = options3;
          point._datasetIndex = me.index;
          point._index = index2;
          point._model = {
            x,
            y,
            skip: custom.skip || isNaN(x) || isNaN(y),
            radius: options3.radius,
            pointStyle: options3.pointStyle,
            rotation: options3.rotation,
            backgroundColor: options3.backgroundColor,
            borderColor: options3.borderColor,
            borderWidth: options3.borderWidth,
            tension: valueOrDefault$7(custom.tension, lineModel ? lineModel.tension : 0),
            hitRadius: options3.hitRadius
          };
        },
        _resolveDatasetElementOptions: function() {
          var me = this;
          var config = me._config;
          var options3 = me.chart.options;
          var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);
          values.spanGaps = valueOrDefault$7(config.spanGaps, options3.spanGaps);
          values.tension = valueOrDefault$7(config.lineTension, options3.elements.line.tension);
          return values;
        },
        updateBezierControlPoints: function() {
          var me = this;
          var meta = me.getMeta();
          var area = me.chart.chartArea;
          var points = meta.data || [];
          var i, ilen, model, controlPoints;
          if (meta.dataset._model.spanGaps) {
            points = points.filter(function(pt) {
              return !pt._model.skip;
            });
          }
          function capControlPoint(pt, min, max) {
            return Math.max(Math.min(pt, max), min);
          }
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            model = points[i]._model;
            controlPoints = helpers$1.splineCurve(helpers$1.previousItem(points, i, true)._model, model, helpers$1.nextItem(points, i, true)._model, model.tension);
            model.controlPointPreviousX = capControlPoint(controlPoints.previous.x, area.left, area.right);
            model.controlPointPreviousY = capControlPoint(controlPoints.previous.y, area.top, area.bottom);
            model.controlPointNextX = capControlPoint(controlPoints.next.x, area.left, area.right);
            model.controlPointNextY = capControlPoint(controlPoints.next.y, area.top, area.bottom);
          }
        },
        setHoverStyle: function(point) {
          var model = point._model;
          var options3 = point._options;
          var getHoverColor = helpers$1.getHoverColor;
          point.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth,
            radius: model.radius
          };
          model.backgroundColor = valueOrDefault$7(options3.hoverBackgroundColor, getHoverColor(options3.backgroundColor));
          model.borderColor = valueOrDefault$7(options3.hoverBorderColor, getHoverColor(options3.borderColor));
          model.borderWidth = valueOrDefault$7(options3.hoverBorderWidth, options3.borderWidth);
          model.radius = valueOrDefault$7(options3.hoverRadius, options3.radius);
        }
      });
      core_defaults._set("scatter", {
        hover: {
          mode: "single"
        },
        scales: {
          xAxes: [{
            id: "x-axis-1",
            type: "linear",
            position: "bottom"
          }],
          yAxes: [{
            id: "y-axis-1",
            type: "linear",
            position: "left"
          }]
        },
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(item) {
              return "(" + item.xLabel + ", " + item.yLabel + ")";
            }
          }
        }
      });
      core_defaults._set("global", {
        datasets: {
          scatter: {
            showLine: false
          }
        }
      });
      var controller_scatter = controller_line;
      var controllers = {
        bar: controller_bar,
        bubble: controller_bubble,
        doughnut: controller_doughnut,
        horizontalBar: controller_horizontalBar,
        line: controller_line,
        polarArea: controller_polarArea,
        pie: controller_pie,
        radar: controller_radar,
        scatter: controller_scatter
      };
      function getRelativePosition(e, chart) {
        if (e.native) {
          return {
            x: e.x,
            y: e.y
          };
        }
        return helpers$1.getRelativePosition(e, chart);
      }
      function parseVisibleItems(chart, handler) {
        var metasets = chart._getSortedVisibleDatasetMetas();
        var metadata, i, j, ilen, jlen, element;
        for (i = 0, ilen = metasets.length; i < ilen; ++i) {
          metadata = metasets[i].data;
          for (j = 0, jlen = metadata.length; j < jlen; ++j) {
            element = metadata[j];
            if (!element._view.skip) {
              handler(element);
            }
          }
        }
      }
      function getIntersectItems(chart, position) {
        var elements2 = [];
        parseVisibleItems(chart, function(element) {
          if (element.inRange(position.x, position.y)) {
            elements2.push(element);
          }
        });
        return elements2;
      }
      function getNearestItems(chart, position, intersect, distanceMetric) {
        var minDistance = Number.POSITIVE_INFINITY;
        var nearestItems = [];
        parseVisibleItems(chart, function(element) {
          if (intersect && !element.inRange(position.x, position.y)) {
            return;
          }
          var center = element.getCenterPoint();
          var distance = distanceMetric(position, center);
          if (distance < minDistance) {
            nearestItems = [element];
            minDistance = distance;
          } else if (distance === minDistance) {
            nearestItems.push(element);
          }
        });
        return nearestItems;
      }
      function getDistanceMetricForAxis(axis) {
        var useX = axis.indexOf("x") !== -1;
        var useY = axis.indexOf("y") !== -1;
        return function(pt1, pt2) {
          var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
          var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
          return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        };
      }
      function indexMode(chart, e, options3) {
        var position = getRelativePosition(e, chart);
        options3.axis = options3.axis || "x";
        var distanceMetric = getDistanceMetricForAxis(options3.axis);
        var items = options3.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
        var elements2 = [];
        if (!items.length) {
          return [];
        }
        chart._getSortedVisibleDatasetMetas().forEach(function(meta) {
          var element = meta.data[items[0]._index];
          if (element && !element._view.skip) {
            elements2.push(element);
          }
        });
        return elements2;
      }
      var core_interaction = {
        modes: {
          single: function(chart, e) {
            var position = getRelativePosition(e, chart);
            var elements2 = [];
            parseVisibleItems(chart, function(element) {
              if (element.inRange(position.x, position.y)) {
                elements2.push(element);
                return elements2;
              }
            });
            return elements2.slice(0, 1);
          },
          label: indexMode,
          index: indexMode,
          dataset: function(chart, e, options3) {
            var position = getRelativePosition(e, chart);
            options3.axis = options3.axis || "xy";
            var distanceMetric = getDistanceMetricForAxis(options3.axis);
            var items = options3.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
            if (items.length > 0) {
              items = chart.getDatasetMeta(items[0]._datasetIndex).data;
            }
            return items;
          },
          "x-axis": function(chart, e) {
            return indexMode(chart, e, {intersect: false});
          },
          point: function(chart, e) {
            var position = getRelativePosition(e, chart);
            return getIntersectItems(chart, position);
          },
          nearest: function(chart, e, options3) {
            var position = getRelativePosition(e, chart);
            options3.axis = options3.axis || "xy";
            var distanceMetric = getDistanceMetricForAxis(options3.axis);
            return getNearestItems(chart, position, options3.intersect, distanceMetric);
          },
          x: function(chart, e, options3) {
            var position = getRelativePosition(e, chart);
            var items = [];
            var intersectsItem = false;
            parseVisibleItems(chart, function(element) {
              if (element.inXRange(position.x)) {
                items.push(element);
              }
              if (element.inRange(position.x, position.y)) {
                intersectsItem = true;
              }
            });
            if (options3.intersect && !intersectsItem) {
              items = [];
            }
            return items;
          },
          y: function(chart, e, options3) {
            var position = getRelativePosition(e, chart);
            var items = [];
            var intersectsItem = false;
            parseVisibleItems(chart, function(element) {
              if (element.inYRange(position.y)) {
                items.push(element);
              }
              if (element.inRange(position.x, position.y)) {
                intersectsItem = true;
              }
            });
            if (options3.intersect && !intersectsItem) {
              items = [];
            }
            return items;
          }
        }
      };
      var extend = helpers$1.extend;
      function filterByPosition(array, position) {
        return helpers$1.where(array, function(v) {
          return v.pos === position;
        });
      }
      function sortByWeight(array, reverse) {
        return array.sort(function(a, b) {
          var v0 = reverse ? b : a;
          var v1 = reverse ? a : b;
          return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
        });
      }
      function wrapBoxes(boxes) {
        var layoutBoxes = [];
        var i, ilen, box;
        for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
          box = boxes[i];
          layoutBoxes.push({
            index: i,
            box,
            pos: box.position,
            horizontal: box.isHorizontal(),
            weight: box.weight
          });
        }
        return layoutBoxes;
      }
      function setLayoutDims(layouts, params) {
        var i, ilen, layout;
        for (i = 0, ilen = layouts.length; i < ilen; ++i) {
          layout = layouts[i];
          layout.width = layout.horizontal ? layout.box.fullWidth && params.availableWidth : params.vBoxMaxWidth;
          layout.height = layout.horizontal && params.hBoxMaxHeight;
        }
      }
      function buildLayoutBoxes(boxes) {
        var layoutBoxes = wrapBoxes(boxes);
        var left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
        var right = sortByWeight(filterByPosition(layoutBoxes, "right"));
        var top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
        var bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
        return {
          leftAndTop: left.concat(top),
          rightAndBottom: right.concat(bottom),
          chartArea: filterByPosition(layoutBoxes, "chartArea"),
          vertical: left.concat(right),
          horizontal: top.concat(bottom)
        };
      }
      function getCombinedMax(maxPadding, chartArea, a, b) {
        return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
      }
      function updateDims(chartArea, params, layout) {
        var box = layout.box;
        var maxPadding = chartArea.maxPadding;
        var newWidth, newHeight;
        if (layout.size) {
          chartArea[layout.pos] -= layout.size;
        }
        layout.size = layout.horizontal ? box.height : box.width;
        chartArea[layout.pos] += layout.size;
        if (box.getPadding) {
          var boxPadding = box.getPadding();
          maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
          maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
          maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
          maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
        }
        newWidth = params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right");
        newHeight = params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom");
        if (newWidth !== chartArea.w || newHeight !== chartArea.h) {
          chartArea.w = newWidth;
          chartArea.h = newHeight;
          var sizes = layout.horizontal ? [newWidth, chartArea.w] : [newHeight, chartArea.h];
          return sizes[0] !== sizes[1] && (!isNaN(sizes[0]) || !isNaN(sizes[1]));
        }
      }
      function handleMaxPadding(chartArea) {
        var maxPadding = chartArea.maxPadding;
        function updatePos(pos) {
          var change = Math.max(maxPadding[pos] - chartArea[pos], 0);
          chartArea[pos] += change;
          return change;
        }
        chartArea.y += updatePos("top");
        chartArea.x += updatePos("left");
        updatePos("right");
        updatePos("bottom");
      }
      function getMargins(horizontal, chartArea) {
        var maxPadding = chartArea.maxPadding;
        function marginForPositions(positions) {
          var margin = {left: 0, top: 0, right: 0, bottom: 0};
          positions.forEach(function(pos) {
            margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
          });
          return margin;
        }
        return horizontal ? marginForPositions(["left", "right"]) : marginForPositions(["top", "bottom"]);
      }
      function fitBoxes(boxes, chartArea, params) {
        var refitBoxes = [];
        var i, ilen, layout, box, refit, changed;
        for (i = 0, ilen = boxes.length; i < ilen; ++i) {
          layout = boxes[i];
          box = layout.box;
          box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
          if (updateDims(chartArea, params, layout)) {
            changed = true;
            if (refitBoxes.length) {
              refit = true;
            }
          }
          if (!box.fullWidth) {
            refitBoxes.push(layout);
          }
        }
        return refit ? fitBoxes(refitBoxes, chartArea, params) || changed : changed;
      }
      function placeBoxes(boxes, chartArea, params) {
        var userPadding = params.padding;
        var x = chartArea.x;
        var y = chartArea.y;
        var i, ilen, layout, box;
        for (i = 0, ilen = boxes.length; i < ilen; ++i) {
          layout = boxes[i];
          box = layout.box;
          if (layout.horizontal) {
            box.left = box.fullWidth ? userPadding.left : chartArea.left;
            box.right = box.fullWidth ? params.outerWidth - userPadding.right : chartArea.left + chartArea.w;
            box.top = y;
            box.bottom = y + box.height;
            box.width = box.right - box.left;
            y = box.bottom;
          } else {
            box.left = x;
            box.right = x + box.width;
            box.top = chartArea.top;
            box.bottom = chartArea.top + chartArea.h;
            box.height = box.bottom - box.top;
            x = box.right;
          }
        }
        chartArea.x = x;
        chartArea.y = y;
      }
      core_defaults._set("global", {
        layout: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      });
      var core_layouts = {
        defaults: {},
        addBox: function(chart, item) {
          if (!chart.boxes) {
            chart.boxes = [];
          }
          item.fullWidth = item.fullWidth || false;
          item.position = item.position || "top";
          item.weight = item.weight || 0;
          item._layers = item._layers || function() {
            return [{
              z: 0,
              draw: function() {
                item.draw.apply(item, arguments);
              }
            }];
          };
          chart.boxes.push(item);
        },
        removeBox: function(chart, layoutItem) {
          var index2 = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
          if (index2 !== -1) {
            chart.boxes.splice(index2, 1);
          }
        },
        configure: function(chart, item, options3) {
          var props = ["fullWidth", "position", "weight"];
          var ilen = props.length;
          var i = 0;
          var prop;
          for (; i < ilen; ++i) {
            prop = props[i];
            if (options3.hasOwnProperty(prop)) {
              item[prop] = options3[prop];
            }
          }
        },
        update: function(chart, width, height) {
          if (!chart) {
            return;
          }
          var layoutOptions = chart.options.layout || {};
          var padding = helpers$1.options.toPadding(layoutOptions.padding);
          var availableWidth = width - padding.width;
          var availableHeight = height - padding.height;
          var boxes = buildLayoutBoxes(chart.boxes);
          var verticalBoxes = boxes.vertical;
          var horizontalBoxes = boxes.horizontal;
          var params = Object.freeze({
            outerWidth: width,
            outerHeight: height,
            padding,
            availableWidth,
            vBoxMaxWidth: availableWidth / 2 / verticalBoxes.length,
            hBoxMaxHeight: availableHeight / 2
          });
          var chartArea = extend({
            maxPadding: extend({}, padding),
            w: availableWidth,
            h: availableHeight,
            x: padding.left,
            y: padding.top
          }, padding);
          setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
          fitBoxes(verticalBoxes, chartArea, params);
          if (fitBoxes(horizontalBoxes, chartArea, params)) {
            fitBoxes(verticalBoxes, chartArea, params);
          }
          handleMaxPadding(chartArea);
          placeBoxes(boxes.leftAndTop, chartArea, params);
          chartArea.x += chartArea.w;
          chartArea.y += chartArea.h;
          placeBoxes(boxes.rightAndBottom, chartArea, params);
          chart.chartArea = {
            left: chartArea.left,
            top: chartArea.top,
            right: chartArea.left + chartArea.w,
            bottom: chartArea.top + chartArea.h
          };
          helpers$1.each(boxes.chartArea, function(layout) {
            var box = layout.box;
            extend(box, chart.chartArea);
            box.update(chartArea.w, chartArea.h);
          });
        }
      };
      var platform_basic = {
        acquireContext: function(item) {
          if (item && item.canvas) {
            item = item.canvas;
          }
          return item && item.getContext("2d") || null;
        }
      };
      var platform_dom = "/*\r\n * DOM element rendering detection\r\n * https://davidwalsh.name/detect-node-insertion\r\n */\r\n@keyframes chartjs-render-animation {\r\n	from { opacity: 0.99; }\r\n	to { opacity: 1; }\r\n}\r\n\r\n.chartjs-render-monitor {\r\n	animation: chartjs-render-animation 0.001s;\r\n}\r\n\r\n/*\r\n * DOM element resizing detection\r\n * https://github.com/marcj/css-element-queries\r\n */\r\n.chartjs-size-monitor,\r\n.chartjs-size-monitor-expand,\r\n.chartjs-size-monitor-shrink {\r\n	position: absolute;\r\n	direction: ltr;\r\n	left: 0;\r\n	top: 0;\r\n	right: 0;\r\n	bottom: 0;\r\n	overflow: hidden;\r\n	pointer-events: none;\r\n	visibility: hidden;\r\n	z-index: -1;\r\n}\r\n\r\n.chartjs-size-monitor-expand > div {\r\n	position: absolute;\r\n	width: 1000000px;\r\n	height: 1000000px;\r\n	left: 0;\r\n	top: 0;\r\n}\r\n\r\n.chartjs-size-monitor-shrink > div {\r\n	position: absolute;\r\n	width: 200%;\r\n	height: 200%;\r\n	left: 0;\r\n	top: 0;\r\n}\r\n";
      var platform_dom$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": platform_dom
      });
      var stylesheet = getCjsExportFromNamespace(platform_dom$1);
      var EXPANDO_KEY = "$chartjs";
      var CSS_PREFIX = "chartjs-";
      var CSS_SIZE_MONITOR = CSS_PREFIX + "size-monitor";
      var CSS_RENDER_MONITOR = CSS_PREFIX + "render-monitor";
      var CSS_RENDER_ANIMATION = CSS_PREFIX + "render-animation";
      var ANIMATION_START_EVENTS = ["animationstart", "webkitAnimationStart"];
      var EVENT_TYPES = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
      };
      function readUsedSize(element, property) {
        var value = helpers$1.getStyle(element, property);
        var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
        return matches ? Number(matches[1]) : void 0;
      }
      function initCanvas(canvas2, config) {
        var style = canvas2.style;
        var renderHeight = canvas2.getAttribute("height");
        var renderWidth = canvas2.getAttribute("width");
        canvas2[EXPANDO_KEY] = {
          initial: {
            height: renderHeight,
            width: renderWidth,
            style: {
              display: style.display,
              height: style.height,
              width: style.width
            }
          }
        };
        style.display = style.display || "block";
        if (renderWidth === null || renderWidth === "") {
          var displayWidth = readUsedSize(canvas2, "width");
          if (displayWidth !== void 0) {
            canvas2.width = displayWidth;
          }
        }
        if (renderHeight === null || renderHeight === "") {
          if (canvas2.style.height === "") {
            canvas2.height = canvas2.width / (config.options.aspectRatio || 2);
          } else {
            var displayHeight = readUsedSize(canvas2, "height");
            if (displayWidth !== void 0) {
              canvas2.height = displayHeight;
            }
          }
        }
        return canvas2;
      }
      var supportsEventListenerOptions = function() {
        var supports = false;
        try {
          var options3 = Object.defineProperty({}, "passive", {
            get: function() {
              supports = true;
            }
          });
          window.addEventListener("e", null, options3);
        } catch (e) {
        }
        return supports;
      }();
      var eventListenerOptions = supportsEventListenerOptions ? {passive: true} : false;
      function addListener(node, type, listener) {
        node.addEventListener(type, listener, eventListenerOptions);
      }
      function removeListener(node, type, listener) {
        node.removeEventListener(type, listener, eventListenerOptions);
      }
      function createEvent(type, chart, x, y, nativeEvent) {
        return {
          type,
          chart,
          native: nativeEvent || null,
          x: x !== void 0 ? x : null,
          y: y !== void 0 ? y : null
        };
      }
      function fromNativeEvent(event, chart) {
        var type = EVENT_TYPES[event.type] || event.type;
        var pos = helpers$1.getRelativePosition(event, chart);
        return createEvent(type, chart, pos.x, pos.y, event);
      }
      function throttled(fn, thisArg) {
        var ticking = false;
        var args = [];
        return function() {
          args = Array.prototype.slice.call(arguments);
          thisArg = thisArg || this;
          if (!ticking) {
            ticking = true;
            helpers$1.requestAnimFrame.call(window, function() {
              ticking = false;
              fn.apply(thisArg, args);
            });
          }
        };
      }
      function createDiv(cls) {
        var el = document.createElement("div");
        el.className = cls || "";
        return el;
      }
      function createResizer(handler) {
        var maxSize = 1e6;
        var resizer = createDiv(CSS_SIZE_MONITOR);
        var expand = createDiv(CSS_SIZE_MONITOR + "-expand");
        var shrink = createDiv(CSS_SIZE_MONITOR + "-shrink");
        expand.appendChild(createDiv());
        shrink.appendChild(createDiv());
        resizer.appendChild(expand);
        resizer.appendChild(shrink);
        resizer._reset = function() {
          expand.scrollLeft = maxSize;
          expand.scrollTop = maxSize;
          shrink.scrollLeft = maxSize;
          shrink.scrollTop = maxSize;
        };
        var onScroll = function() {
          resizer._reset();
          handler();
        };
        addListener(expand, "scroll", onScroll.bind(expand, "expand"));
        addListener(shrink, "scroll", onScroll.bind(shrink, "shrink"));
        return resizer;
      }
      function watchForRender(node, handler) {
        var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});
        var proxy = expando.renderProxy = function(e) {
          if (e.animationName === CSS_RENDER_ANIMATION) {
            handler();
          }
        };
        helpers$1.each(ANIMATION_START_EVENTS, function(type) {
          addListener(node, type, proxy);
        });
        expando.reflow = !!node.offsetParent;
        node.classList.add(CSS_RENDER_MONITOR);
      }
      function unwatchForRender(node) {
        var expando = node[EXPANDO_KEY] || {};
        var proxy = expando.renderProxy;
        if (proxy) {
          helpers$1.each(ANIMATION_START_EVENTS, function(type) {
            removeListener(node, type, proxy);
          });
          delete expando.renderProxy;
        }
        node.classList.remove(CSS_RENDER_MONITOR);
      }
      function addResizeListener(node, listener, chart) {
        var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});
        var resizer = expando.resizer = createResizer(throttled(function() {
          if (expando.resizer) {
            var container = chart.options.maintainAspectRatio && node.parentNode;
            var w = container ? container.clientWidth : 0;
            listener(createEvent("resize", chart));
            if (container && container.clientWidth < w && chart.canvas) {
              listener(createEvent("resize", chart));
            }
          }
        }));
        watchForRender(node, function() {
          if (expando.resizer) {
            var container = node.parentNode;
            if (container && container !== resizer.parentNode) {
              container.insertBefore(resizer, container.firstChild);
            }
            resizer._reset();
          }
        });
      }
      function removeResizeListener(node) {
        var expando = node[EXPANDO_KEY] || {};
        var resizer = expando.resizer;
        delete expando.resizer;
        unwatchForRender(node);
        if (resizer && resizer.parentNode) {
          resizer.parentNode.removeChild(resizer);
        }
      }
      function injectCSS(rootNode, css2) {
        var expando = rootNode[EXPANDO_KEY] || (rootNode[EXPANDO_KEY] = {});
        if (!expando.containsStyles) {
          expando.containsStyles = true;
          css2 = "/* Chart.js */\n" + css2;
          var style = document.createElement("style");
          style.setAttribute("type", "text/css");
          style.appendChild(document.createTextNode(css2));
          rootNode.appendChild(style);
        }
      }
      var platform_dom$2 = {
        disableCSSInjection: false,
        _enabled: typeof window !== "undefined" && typeof document !== "undefined",
        _ensureLoaded: function(canvas2) {
          if (!this.disableCSSInjection) {
            var root = canvas2.getRootNode ? canvas2.getRootNode() : document;
            var targetNode = root.host ? root : document.head;
            injectCSS(targetNode, stylesheet);
          }
        },
        acquireContext: function(item, config) {
          if (typeof item === "string") {
            item = document.getElementById(item);
          } else if (item.length) {
            item = item[0];
          }
          if (item && item.canvas) {
            item = item.canvas;
          }
          var context = item && item.getContext && item.getContext("2d");
          if (context && context.canvas === item) {
            this._ensureLoaded(item);
            initCanvas(item, config);
            return context;
          }
          return null;
        },
        releaseContext: function(context) {
          var canvas2 = context.canvas;
          if (!canvas2[EXPANDO_KEY]) {
            return;
          }
          var initial = canvas2[EXPANDO_KEY].initial;
          ["height", "width"].forEach(function(prop) {
            var value = initial[prop];
            if (helpers$1.isNullOrUndef(value)) {
              canvas2.removeAttribute(prop);
            } else {
              canvas2.setAttribute(prop, value);
            }
          });
          helpers$1.each(initial.style || {}, function(value, key) {
            canvas2.style[key] = value;
          });
          canvas2.width = canvas2.width;
          delete canvas2[EXPANDO_KEY];
        },
        addEventListener: function(chart, type, listener) {
          var canvas2 = chart.canvas;
          if (type === "resize") {
            addResizeListener(canvas2, listener, chart);
            return;
          }
          var expando = listener[EXPANDO_KEY] || (listener[EXPANDO_KEY] = {});
          var proxies = expando.proxies || (expando.proxies = {});
          var proxy = proxies[chart.id + "_" + type] = function(event) {
            listener(fromNativeEvent(event, chart));
          };
          addListener(canvas2, type, proxy);
        },
        removeEventListener: function(chart, type, listener) {
          var canvas2 = chart.canvas;
          if (type === "resize") {
            removeResizeListener(canvas2);
            return;
          }
          var expando = listener[EXPANDO_KEY] || {};
          var proxies = expando.proxies || {};
          var proxy = proxies[chart.id + "_" + type];
          if (!proxy) {
            return;
          }
          removeListener(canvas2, type, proxy);
        }
      };
      helpers$1.addEvent = addListener;
      helpers$1.removeEvent = removeListener;
      var implementation = platform_dom$2._enabled ? platform_dom$2 : platform_basic;
      var platform = helpers$1.extend({
        initialize: function() {
        },
        acquireContext: function() {
        },
        releaseContext: function() {
        },
        addEventListener: function() {
        },
        removeEventListener: function() {
        }
      }, implementation);
      core_defaults._set("global", {
        plugins: {}
      });
      var core_plugins = {
        _plugins: [],
        _cacheId: 0,
        register: function(plugins2) {
          var p = this._plugins;
          [].concat(plugins2).forEach(function(plugin) {
            if (p.indexOf(plugin) === -1) {
              p.push(plugin);
            }
          });
          this._cacheId++;
        },
        unregister: function(plugins2) {
          var p = this._plugins;
          [].concat(plugins2).forEach(function(plugin) {
            var idx = p.indexOf(plugin);
            if (idx !== -1) {
              p.splice(idx, 1);
            }
          });
          this._cacheId++;
        },
        clear: function() {
          this._plugins = [];
          this._cacheId++;
        },
        count: function() {
          return this._plugins.length;
        },
        getAll: function() {
          return this._plugins;
        },
        notify: function(chart, hook, args) {
          var descriptors = this.descriptors(chart);
          var ilen = descriptors.length;
          var i, descriptor, plugin, params, method;
          for (i = 0; i < ilen; ++i) {
            descriptor = descriptors[i];
            plugin = descriptor.plugin;
            method = plugin[hook];
            if (typeof method === "function") {
              params = [chart].concat(args || []);
              params.push(descriptor.options);
              if (method.apply(plugin, params) === false) {
                return false;
              }
            }
          }
          return true;
        },
        descriptors: function(chart) {
          var cache = chart.$plugins || (chart.$plugins = {});
          if (cache.id === this._cacheId) {
            return cache.descriptors;
          }
          var plugins2 = [];
          var descriptors = [];
          var config = chart && chart.config || {};
          var options3 = config.options && config.options.plugins || {};
          this._plugins.concat(config.plugins || []).forEach(function(plugin) {
            var idx = plugins2.indexOf(plugin);
            if (idx !== -1) {
              return;
            }
            var id = plugin.id;
            var opts = options3[id];
            if (opts === false) {
              return;
            }
            if (opts === true) {
              opts = helpers$1.clone(core_defaults.global.plugins[id]);
            }
            plugins2.push(plugin);
            descriptors.push({
              plugin,
              options: opts || {}
            });
          });
          cache.descriptors = descriptors;
          cache.id = this._cacheId;
          return descriptors;
        },
        _invalidate: function(chart) {
          delete chart.$plugins;
        }
      };
      var core_scaleService = {
        constructors: {},
        defaults: {},
        registerScaleType: function(type, scaleConstructor, scaleDefaults) {
          this.constructors[type] = scaleConstructor;
          this.defaults[type] = helpers$1.clone(scaleDefaults);
        },
        getScaleConstructor: function(type) {
          return this.constructors.hasOwnProperty(type) ? this.constructors[type] : void 0;
        },
        getScaleDefaults: function(type) {
          return this.defaults.hasOwnProperty(type) ? helpers$1.merge(Object.create(null), [core_defaults.scale, this.defaults[type]]) : {};
        },
        updateScaleDefaults: function(type, additions) {
          var me = this;
          if (me.defaults.hasOwnProperty(type)) {
            me.defaults[type] = helpers$1.extend(me.defaults[type], additions);
          }
        },
        addScalesToLayout: function(chart) {
          helpers$1.each(chart.scales, function(scale2) {
            scale2.fullWidth = scale2.options.fullWidth;
            scale2.position = scale2.options.position;
            scale2.weight = scale2.options.weight;
            core_layouts.addBox(chart, scale2);
          });
        }
      };
      var valueOrDefault$8 = helpers$1.valueOrDefault;
      var getRtlHelper = helpers$1.rtl.getRtlAdapter;
      core_defaults._set("global", {
        tooltips: {
          enabled: true,
          custom: null,
          mode: "nearest",
          position: "average",
          intersect: true,
          backgroundColor: "rgba(0,0,0,0.8)",
          titleFontStyle: "bold",
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleFontColor: "#fff",
          titleAlign: "left",
          bodySpacing: 2,
          bodyFontColor: "#fff",
          bodyAlign: "left",
          footerFontStyle: "bold",
          footerSpacing: 2,
          footerMarginTop: 6,
          footerFontColor: "#fff",
          footerAlign: "left",
          yPadding: 6,
          xPadding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          multiKeyBackground: "#fff",
          displayColors: true,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          callbacks: {
            beforeTitle: helpers$1.noop,
            title: function(tooltipItems, data) {
              var title2 = "";
              var labels = data.labels;
              var labelCount = labels ? labels.length : 0;
              if (tooltipItems.length > 0) {
                var item = tooltipItems[0];
                if (item.label) {
                  title2 = item.label;
                } else if (item.xLabel) {
                  title2 = item.xLabel;
                } else if (labelCount > 0 && item.index < labelCount) {
                  title2 = labels[item.index];
                }
              }
              return title2;
            },
            afterTitle: helpers$1.noop,
            beforeBody: helpers$1.noop,
            beforeLabel: helpers$1.noop,
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              if (!helpers$1.isNullOrUndef(tooltipItem.value)) {
                label += tooltipItem.value;
              } else {
                label += tooltipItem.yLabel;
              }
              return label;
            },
            labelColor: function(tooltipItem, chart) {
              var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
              var activeElement = meta.data[tooltipItem.index];
              var view = activeElement._view;
              return {
                borderColor: view.borderColor,
                backgroundColor: view.backgroundColor
              };
            },
            labelTextColor: function() {
              return this._options.bodyFontColor;
            },
            afterLabel: helpers$1.noop,
            afterBody: helpers$1.noop,
            beforeFooter: helpers$1.noop,
            footer: helpers$1.noop,
            afterFooter: helpers$1.noop
          }
        }
      });
      var positioners = {
        average: function(elements2) {
          if (!elements2.length) {
            return false;
          }
          var i, len;
          var x = 0;
          var y = 0;
          var count = 0;
          for (i = 0, len = elements2.length; i < len; ++i) {
            var el = elements2[i];
            if (el && el.hasValue()) {
              var pos = el.tooltipPosition();
              x += pos.x;
              y += pos.y;
              ++count;
            }
          }
          return {
            x: x / count,
            y: y / count
          };
        },
        nearest: function(elements2, eventPosition) {
          var x = eventPosition.x;
          var y = eventPosition.y;
          var minDistance = Number.POSITIVE_INFINITY;
          var i, len, nearestElement;
          for (i = 0, len = elements2.length; i < len; ++i) {
            var el = elements2[i];
            if (el && el.hasValue()) {
              var center = el.getCenterPoint();
              var d2 = helpers$1.distanceBetweenPoints(eventPosition, center);
              if (d2 < minDistance) {
                minDistance = d2;
                nearestElement = el;
              }
            }
          }
          if (nearestElement) {
            var tp = nearestElement.tooltipPosition();
            x = tp.x;
            y = tp.y;
          }
          return {
            x,
            y
          };
        }
      };
      function pushOrConcat(base, toPush) {
        if (toPush) {
          if (helpers$1.isArray(toPush)) {
            Array.prototype.push.apply(base, toPush);
          } else {
            base.push(toPush);
          }
        }
        return base;
      }
      function splitNewlines(str) {
        if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) {
          return str.split("\n");
        }
        return str;
      }
      function createTooltipItem(element) {
        var xScale = element._xScale;
        var yScale = element._yScale || element._scale;
        var index2 = element._index;
        var datasetIndex = element._datasetIndex;
        var controller = element._chart.getDatasetMeta(datasetIndex).controller;
        var indexScale = controller._getIndexScale();
        var valueScale = controller._getValueScale();
        return {
          xLabel: xScale ? xScale.getLabelForIndex(index2, datasetIndex) : "",
          yLabel: yScale ? yScale.getLabelForIndex(index2, datasetIndex) : "",
          label: indexScale ? "" + indexScale.getLabelForIndex(index2, datasetIndex) : "",
          value: valueScale ? "" + valueScale.getLabelForIndex(index2, datasetIndex) : "",
          index: index2,
          datasetIndex,
          x: element._model.x,
          y: element._model.y
        };
      }
      function getBaseModel(tooltipOpts) {
        var globalDefaults = core_defaults.global;
        return {
          xPadding: tooltipOpts.xPadding,
          yPadding: tooltipOpts.yPadding,
          xAlign: tooltipOpts.xAlign,
          yAlign: tooltipOpts.yAlign,
          rtl: tooltipOpts.rtl,
          textDirection: tooltipOpts.textDirection,
          bodyFontColor: tooltipOpts.bodyFontColor,
          _bodyFontFamily: valueOrDefault$8(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
          _bodyFontStyle: valueOrDefault$8(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
          _bodyAlign: tooltipOpts.bodyAlign,
          bodyFontSize: valueOrDefault$8(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
          bodySpacing: tooltipOpts.bodySpacing,
          titleFontColor: tooltipOpts.titleFontColor,
          _titleFontFamily: valueOrDefault$8(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
          _titleFontStyle: valueOrDefault$8(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
          titleFontSize: valueOrDefault$8(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
          _titleAlign: tooltipOpts.titleAlign,
          titleSpacing: tooltipOpts.titleSpacing,
          titleMarginBottom: tooltipOpts.titleMarginBottom,
          footerFontColor: tooltipOpts.footerFontColor,
          _footerFontFamily: valueOrDefault$8(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
          _footerFontStyle: valueOrDefault$8(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
          footerFontSize: valueOrDefault$8(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
          _footerAlign: tooltipOpts.footerAlign,
          footerSpacing: tooltipOpts.footerSpacing,
          footerMarginTop: tooltipOpts.footerMarginTop,
          caretSize: tooltipOpts.caretSize,
          cornerRadius: tooltipOpts.cornerRadius,
          backgroundColor: tooltipOpts.backgroundColor,
          opacity: 0,
          legendColorBackground: tooltipOpts.multiKeyBackground,
          displayColors: tooltipOpts.displayColors,
          borderColor: tooltipOpts.borderColor,
          borderWidth: tooltipOpts.borderWidth
        };
      }
      function getTooltipSize(tooltip, model) {
        var ctx = tooltip._chart.ctx;
        var height = model.yPadding * 2;
        var width = 0;
        var body = model.body;
        var combinedBodyLength = body.reduce(function(count, bodyItem) {
          return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
        }, 0);
        combinedBodyLength += model.beforeBody.length + model.afterBody.length;
        var titleLineCount = model.title.length;
        var footerLineCount = model.footer.length;
        var titleFontSize = model.titleFontSize;
        var bodyFontSize = model.bodyFontSize;
        var footerFontSize = model.footerFontSize;
        height += titleLineCount * titleFontSize;
        height += titleLineCount ? (titleLineCount - 1) * model.titleSpacing : 0;
        height += titleLineCount ? model.titleMarginBottom : 0;
        height += combinedBodyLength * bodyFontSize;
        height += combinedBodyLength ? (combinedBodyLength - 1) * model.bodySpacing : 0;
        height += footerLineCount ? model.footerMarginTop : 0;
        height += footerLineCount * footerFontSize;
        height += footerLineCount ? (footerLineCount - 1) * model.footerSpacing : 0;
        var widthPadding = 0;
        var maxLineWidth = function(line) {
          width = Math.max(width, ctx.measureText(line).width + widthPadding);
        };
        ctx.font = helpers$1.fontString(titleFontSize, model._titleFontStyle, model._titleFontFamily);
        helpers$1.each(model.title, maxLineWidth);
        ctx.font = helpers$1.fontString(bodyFontSize, model._bodyFontStyle, model._bodyFontFamily);
        helpers$1.each(model.beforeBody.concat(model.afterBody), maxLineWidth);
        widthPadding = model.displayColors ? bodyFontSize + 2 : 0;
        helpers$1.each(body, function(bodyItem) {
          helpers$1.each(bodyItem.before, maxLineWidth);
          helpers$1.each(bodyItem.lines, maxLineWidth);
          helpers$1.each(bodyItem.after, maxLineWidth);
        });
        widthPadding = 0;
        ctx.font = helpers$1.fontString(footerFontSize, model._footerFontStyle, model._footerFontFamily);
        helpers$1.each(model.footer, maxLineWidth);
        width += 2 * model.xPadding;
        return {
          width,
          height
        };
      }
      function determineAlignment(tooltip, size) {
        var model = tooltip._model;
        var chart = tooltip._chart;
        var chartArea = tooltip._chart.chartArea;
        var xAlign = "center";
        var yAlign = "center";
        if (model.y < size.height) {
          yAlign = "top";
        } else if (model.y > chart.height - size.height) {
          yAlign = "bottom";
        }
        var lf, rf;
        var olf, orf;
        var yf;
        var midX = (chartArea.left + chartArea.right) / 2;
        var midY = (chartArea.top + chartArea.bottom) / 2;
        if (yAlign === "center") {
          lf = function(x) {
            return x <= midX;
          };
          rf = function(x) {
            return x > midX;
          };
        } else {
          lf = function(x) {
            return x <= size.width / 2;
          };
          rf = function(x) {
            return x >= chart.width - size.width / 2;
          };
        }
        olf = function(x) {
          return x + size.width + model.caretSize + model.caretPadding > chart.width;
        };
        orf = function(x) {
          return x - size.width - model.caretSize - model.caretPadding < 0;
        };
        yf = function(y) {
          return y <= midY ? "top" : "bottom";
        };
        if (lf(model.x)) {
          xAlign = "left";
          if (olf(model.x)) {
            xAlign = "center";
            yAlign = yf(model.y);
          }
        } else if (rf(model.x)) {
          xAlign = "right";
          if (orf(model.x)) {
            xAlign = "center";
            yAlign = yf(model.y);
          }
        }
        var opts = tooltip._options;
        return {
          xAlign: opts.xAlign ? opts.xAlign : xAlign,
          yAlign: opts.yAlign ? opts.yAlign : yAlign
        };
      }
      function getBackgroundPoint(vm, size, alignment, chart) {
        var x = vm.x;
        var y = vm.y;
        var caretSize = vm.caretSize;
        var caretPadding = vm.caretPadding;
        var cornerRadius = vm.cornerRadius;
        var xAlign = alignment.xAlign;
        var yAlign = alignment.yAlign;
        var paddingAndSize = caretSize + caretPadding;
        var radiusAndPadding = cornerRadius + caretPadding;
        if (xAlign === "right") {
          x -= size.width;
        } else if (xAlign === "center") {
          x -= size.width / 2;
          if (x + size.width > chart.width) {
            x = chart.width - size.width;
          }
          if (x < 0) {
            x = 0;
          }
        }
        if (yAlign === "top") {
          y += paddingAndSize;
        } else if (yAlign === "bottom") {
          y -= size.height + paddingAndSize;
        } else {
          y -= size.height / 2;
        }
        if (yAlign === "center") {
          if (xAlign === "left") {
            x += paddingAndSize;
          } else if (xAlign === "right") {
            x -= paddingAndSize;
          }
        } else if (xAlign === "left") {
          x -= radiusAndPadding;
        } else if (xAlign === "right") {
          x += radiusAndPadding;
        }
        return {
          x,
          y
        };
      }
      function getAlignedX(vm, align) {
        return align === "center" ? vm.x + vm.width / 2 : align === "right" ? vm.x + vm.width - vm.xPadding : vm.x + vm.xPadding;
      }
      function getBeforeAfterBodyLines(callback) {
        return pushOrConcat([], splitNewlines(callback));
      }
      var exports$4 = core_element.extend({
        initialize: function() {
          this._model = getBaseModel(this._options);
          this._lastActive = [];
        },
        getTitle: function() {
          var me = this;
          var opts = me._options;
          var callbacks = opts.callbacks;
          var beforeTitle = callbacks.beforeTitle.apply(me, arguments);
          var title2 = callbacks.title.apply(me, arguments);
          var afterTitle = callbacks.afterTitle.apply(me, arguments);
          var lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeTitle));
          lines = pushOrConcat(lines, splitNewlines(title2));
          lines = pushOrConcat(lines, splitNewlines(afterTitle));
          return lines;
        },
        getBeforeBody: function() {
          return getBeforeAfterBodyLines(this._options.callbacks.beforeBody.apply(this, arguments));
        },
        getBody: function(tooltipItems, data) {
          var me = this;
          var callbacks = me._options.callbacks;
          var bodyItems = [];
          helpers$1.each(tooltipItems, function(tooltipItem) {
            var bodyItem = {
              before: [],
              lines: [],
              after: []
            };
            pushOrConcat(bodyItem.before, splitNewlines(callbacks.beforeLabel.call(me, tooltipItem, data)));
            pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
            pushOrConcat(bodyItem.after, splitNewlines(callbacks.afterLabel.call(me, tooltipItem, data)));
            bodyItems.push(bodyItem);
          });
          return bodyItems;
        },
        getAfterBody: function() {
          return getBeforeAfterBodyLines(this._options.callbacks.afterBody.apply(this, arguments));
        },
        getFooter: function() {
          var me = this;
          var callbacks = me._options.callbacks;
          var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
          var footer2 = callbacks.footer.apply(me, arguments);
          var afterFooter = callbacks.afterFooter.apply(me, arguments);
          var lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeFooter));
          lines = pushOrConcat(lines, splitNewlines(footer2));
          lines = pushOrConcat(lines, splitNewlines(afterFooter));
          return lines;
        },
        update: function(changed) {
          var me = this;
          var opts = me._options;
          var existingModel = me._model;
          var model = me._model = getBaseModel(opts);
          var active = me._active;
          var data = me._data;
          var alignment = {
            xAlign: existingModel.xAlign,
            yAlign: existingModel.yAlign
          };
          var backgroundPoint = {
            x: existingModel.x,
            y: existingModel.y
          };
          var tooltipSize = {
            width: existingModel.width,
            height: existingModel.height
          };
          var tooltipPosition = {
            x: existingModel.caretX,
            y: existingModel.caretY
          };
          var i, len;
          if (active.length) {
            model.opacity = 1;
            var labelColors = [];
            var labelTextColors = [];
            tooltipPosition = positioners[opts.position].call(me, active, me._eventPosition);
            var tooltipItems = [];
            for (i = 0, len = active.length; i < len; ++i) {
              tooltipItems.push(createTooltipItem(active[i]));
            }
            if (opts.filter) {
              tooltipItems = tooltipItems.filter(function(a) {
                return opts.filter(a, data);
              });
            }
            if (opts.itemSort) {
              tooltipItems = tooltipItems.sort(function(a, b) {
                return opts.itemSort(a, b, data);
              });
            }
            helpers$1.each(tooltipItems, function(tooltipItem) {
              labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, me._chart));
              labelTextColors.push(opts.callbacks.labelTextColor.call(me, tooltipItem, me._chart));
            });
            model.title = me.getTitle(tooltipItems, data);
            model.beforeBody = me.getBeforeBody(tooltipItems, data);
            model.body = me.getBody(tooltipItems, data);
            model.afterBody = me.getAfterBody(tooltipItems, data);
            model.footer = me.getFooter(tooltipItems, data);
            model.x = tooltipPosition.x;
            model.y = tooltipPosition.y;
            model.caretPadding = opts.caretPadding;
            model.labelColors = labelColors;
            model.labelTextColors = labelTextColors;
            model.dataPoints = tooltipItems;
            tooltipSize = getTooltipSize(this, model);
            alignment = determineAlignment(this, tooltipSize);
            backgroundPoint = getBackgroundPoint(model, tooltipSize, alignment, me._chart);
          } else {
            model.opacity = 0;
          }
          model.xAlign = alignment.xAlign;
          model.yAlign = alignment.yAlign;
          model.x = backgroundPoint.x;
          model.y = backgroundPoint.y;
          model.width = tooltipSize.width;
          model.height = tooltipSize.height;
          model.caretX = tooltipPosition.x;
          model.caretY = tooltipPosition.y;
          me._model = model;
          if (changed && opts.custom) {
            opts.custom.call(me, model);
          }
          return me;
        },
        drawCaret: function(tooltipPoint, size) {
          var ctx = this._chart.ctx;
          var vm = this._view;
          var caretPosition = this.getCaretPosition(tooltipPoint, size, vm);
          ctx.lineTo(caretPosition.x1, caretPosition.y1);
          ctx.lineTo(caretPosition.x2, caretPosition.y2);
          ctx.lineTo(caretPosition.x3, caretPosition.y3);
        },
        getCaretPosition: function(tooltipPoint, size, vm) {
          var x1, x2, x3, y1, y2, y3;
          var caretSize = vm.caretSize;
          var cornerRadius = vm.cornerRadius;
          var xAlign = vm.xAlign;
          var yAlign = vm.yAlign;
          var ptX = tooltipPoint.x;
          var ptY = tooltipPoint.y;
          var width = size.width;
          var height = size.height;
          if (yAlign === "center") {
            y2 = ptY + height / 2;
            if (xAlign === "left") {
              x1 = ptX;
              x2 = x1 - caretSize;
              x3 = x1;
              y1 = y2 + caretSize;
              y3 = y2 - caretSize;
            } else {
              x1 = ptX + width;
              x2 = x1 + caretSize;
              x3 = x1;
              y1 = y2 - caretSize;
              y3 = y2 + caretSize;
            }
          } else {
            if (xAlign === "left") {
              x2 = ptX + cornerRadius + caretSize;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            } else if (xAlign === "right") {
              x2 = ptX + width - cornerRadius - caretSize;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            } else {
              x2 = vm.caretX;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            }
            if (yAlign === "top") {
              y1 = ptY;
              y2 = y1 - caretSize;
              y3 = y1;
            } else {
              y1 = ptY + height;
              y2 = y1 + caretSize;
              y3 = y1;
              var tmp = x3;
              x3 = x1;
              x1 = tmp;
            }
          }
          return {x1, x2, x3, y1, y2, y3};
        },
        drawTitle: function(pt, vm, ctx) {
          var title2 = vm.title;
          var length = title2.length;
          var titleFontSize, titleSpacing, i;
          if (length) {
            var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
            pt.x = getAlignedX(vm, vm._titleAlign);
            ctx.textAlign = rtlHelper.textAlign(vm._titleAlign);
            ctx.textBaseline = "middle";
            titleFontSize = vm.titleFontSize;
            titleSpacing = vm.titleSpacing;
            ctx.fillStyle = vm.titleFontColor;
            ctx.font = helpers$1.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
            for (i = 0; i < length; ++i) {
              ctx.fillText(title2[i], rtlHelper.x(pt.x), pt.y + titleFontSize / 2);
              pt.y += titleFontSize + titleSpacing;
              if (i + 1 === length) {
                pt.y += vm.titleMarginBottom - titleSpacing;
              }
            }
          }
        },
        drawBody: function(pt, vm, ctx) {
          var bodyFontSize = vm.bodyFontSize;
          var bodySpacing = vm.bodySpacing;
          var bodyAlign = vm._bodyAlign;
          var body = vm.body;
          var drawColorBoxes = vm.displayColors;
          var xLinePadding = 0;
          var colorX = drawColorBoxes ? getAlignedX(vm, "left") : 0;
          var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
          var fillLineOfText = function(line) {
            ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyFontSize / 2);
            pt.y += bodyFontSize + bodySpacing;
          };
          var bodyItem, textColor, labelColors, lines, i, j, ilen, jlen;
          var bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
          ctx.textAlign = bodyAlign;
          ctx.textBaseline = "middle";
          ctx.font = helpers$1.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
          pt.x = getAlignedX(vm, bodyAlignForCalculation);
          ctx.fillStyle = vm.bodyFontColor;
          helpers$1.each(vm.beforeBody, fillLineOfText);
          xLinePadding = drawColorBoxes && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? bodyFontSize / 2 + 1 : bodyFontSize + 2 : 0;
          for (i = 0, ilen = body.length; i < ilen; ++i) {
            bodyItem = body[i];
            textColor = vm.labelTextColors[i];
            labelColors = vm.labelColors[i];
            ctx.fillStyle = textColor;
            helpers$1.each(bodyItem.before, fillLineOfText);
            lines = bodyItem.lines;
            for (j = 0, jlen = lines.length; j < jlen; ++j) {
              if (drawColorBoxes) {
                var rtlColorX = rtlHelper.x(colorX);
                ctx.fillStyle = vm.legendColorBackground;
                ctx.fillRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize);
                ctx.lineWidth = 1;
                ctx.strokeStyle = labelColors.borderColor;
                ctx.strokeRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize);
                ctx.fillStyle = labelColors.backgroundColor;
                ctx.fillRect(rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), bodyFontSize - 2), pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
                ctx.fillStyle = textColor;
              }
              fillLineOfText(lines[j]);
            }
            helpers$1.each(bodyItem.after, fillLineOfText);
          }
          xLinePadding = 0;
          helpers$1.each(vm.afterBody, fillLineOfText);
          pt.y -= bodySpacing;
        },
        drawFooter: function(pt, vm, ctx) {
          var footer2 = vm.footer;
          var length = footer2.length;
          var footerFontSize, i;
          if (length) {
            var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
            pt.x = getAlignedX(vm, vm._footerAlign);
            pt.y += vm.footerMarginTop;
            ctx.textAlign = rtlHelper.textAlign(vm._footerAlign);
            ctx.textBaseline = "middle";
            footerFontSize = vm.footerFontSize;
            ctx.fillStyle = vm.footerFontColor;
            ctx.font = helpers$1.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
            for (i = 0; i < length; ++i) {
              ctx.fillText(footer2[i], rtlHelper.x(pt.x), pt.y + footerFontSize / 2);
              pt.y += footerFontSize + vm.footerSpacing;
            }
          }
        },
        drawBackground: function(pt, vm, ctx, tooltipSize) {
          ctx.fillStyle = vm.backgroundColor;
          ctx.strokeStyle = vm.borderColor;
          ctx.lineWidth = vm.borderWidth;
          var xAlign = vm.xAlign;
          var yAlign = vm.yAlign;
          var x = pt.x;
          var y = pt.y;
          var width = tooltipSize.width;
          var height = tooltipSize.height;
          var radius = vm.cornerRadius;
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          if (yAlign === "top") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          if (yAlign === "center" && xAlign === "right") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          if (yAlign === "bottom") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          if (yAlign === "center" && xAlign === "left") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
          if (vm.borderWidth > 0) {
            ctx.stroke();
          }
        },
        draw: function() {
          var ctx = this._chart.ctx;
          var vm = this._view;
          if (vm.opacity === 0) {
            return;
          }
          var tooltipSize = {
            width: vm.width,
            height: vm.height
          };
          var pt = {
            x: vm.x,
            y: vm.y
          };
          var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;
          var hasTooltipContent = vm.title.length || vm.beforeBody.length || vm.body.length || vm.afterBody.length || vm.footer.length;
          if (this._options.enabled && hasTooltipContent) {
            ctx.save();
            ctx.globalAlpha = opacity;
            this.drawBackground(pt, vm, ctx, tooltipSize);
            pt.y += vm.yPadding;
            helpers$1.rtl.overrideTextDirection(ctx, vm.textDirection);
            this.drawTitle(pt, vm, ctx);
            this.drawBody(pt, vm, ctx);
            this.drawFooter(pt, vm, ctx);
            helpers$1.rtl.restoreTextDirection(ctx, vm.textDirection);
            ctx.restore();
          }
        },
        handleEvent: function(e) {
          var me = this;
          var options3 = me._options;
          var changed = false;
          me._lastActive = me._lastActive || [];
          if (e.type === "mouseout") {
            me._active = [];
          } else {
            me._active = me._chart.getElementsAtEventForMode(e, options3.mode, options3);
            if (options3.reverse) {
              me._active.reverse();
            }
          }
          changed = !helpers$1.arrayEquals(me._active, me._lastActive);
          if (changed) {
            me._lastActive = me._active;
            if (options3.enabled || options3.custom) {
              me._eventPosition = {
                x: e.x,
                y: e.y
              };
              me.update(true);
              me.pivot();
            }
          }
          return changed;
        }
      });
      var positioners_1 = positioners;
      var core_tooltip = exports$4;
      core_tooltip.positioners = positioners_1;
      var valueOrDefault$9 = helpers$1.valueOrDefault;
      core_defaults._set("global", {
        elements: {},
        events: [
          "mousemove",
          "mouseout",
          "click",
          "touchstart",
          "touchmove"
        ],
        hover: {
          onHover: null,
          mode: "nearest",
          intersect: true,
          animationDuration: 400
        },
        onClick: null,
        maintainAspectRatio: true,
        responsive: true,
        responsiveAnimationDuration: 0
      });
      function mergeScaleConfig() {
        return helpers$1.merge(Object.create(null), [].slice.call(arguments), {
          merger: function(key, target, source, options3) {
            if (key === "xAxes" || key === "yAxes") {
              var slen = source[key].length;
              var i, type, scale2;
              if (!target[key]) {
                target[key] = [];
              }
              for (i = 0; i < slen; ++i) {
                scale2 = source[key][i];
                type = valueOrDefault$9(scale2.type, key === "xAxes" ? "category" : "linear");
                if (i >= target[key].length) {
                  target[key].push({});
                }
                if (!target[key][i].type || scale2.type && scale2.type !== target[key][i].type) {
                  helpers$1.merge(target[key][i], [core_scaleService.getScaleDefaults(type), scale2]);
                } else {
                  helpers$1.merge(target[key][i], scale2);
                }
              }
            } else {
              helpers$1._merger(key, target, source, options3);
            }
          }
        });
      }
      function mergeConfig() {
        return helpers$1.merge(Object.create(null), [].slice.call(arguments), {
          merger: function(key, target, source, options3) {
            var tval = target[key] || Object.create(null);
            var sval = source[key];
            if (key === "scales") {
              target[key] = mergeScaleConfig(tval, sval);
            } else if (key === "scale") {
              target[key] = helpers$1.merge(tval, [core_scaleService.getScaleDefaults(sval.type), sval]);
            } else {
              helpers$1._merger(key, target, source, options3);
            }
          }
        });
      }
      function initConfig(config) {
        config = config || Object.create(null);
        var data = config.data = config.data || {};
        data.datasets = data.datasets || [];
        data.labels = data.labels || [];
        config.options = mergeConfig(core_defaults.global, core_defaults[config.type], config.options || {});
        return config;
      }
      function updateConfig(chart) {
        var newOptions = chart.options;
        helpers$1.each(chart.scales, function(scale2) {
          core_layouts.removeBox(chart, scale2);
        });
        newOptions = mergeConfig(core_defaults.global, core_defaults[chart.config.type], newOptions);
        chart.options = chart.config.options = newOptions;
        chart.ensureScalesHaveIDs();
        chart.buildOrUpdateScales();
        chart.tooltip._options = newOptions.tooltips;
        chart.tooltip.initialize();
      }
      function nextAvailableScaleId(axesOpts, prefix, index2) {
        var id;
        var hasId = function(obj) {
          return obj.id === id;
        };
        do {
          id = prefix + index2++;
        } while (helpers$1.findIndex(axesOpts, hasId) >= 0);
        return id;
      }
      function positionIsHorizontal(position) {
        return position === "top" || position === "bottom";
      }
      function compare2Level(l1, l2) {
        return function(a, b) {
          return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
        };
      }
      var Chart2 = function(item, config) {
        this.construct(item, config);
        return this;
      };
      helpers$1.extend(Chart2.prototype, {
        construct: function(item, config) {
          var me = this;
          config = initConfig(config);
          var context = platform.acquireContext(item, config);
          var canvas2 = context && context.canvas;
          var height = canvas2 && canvas2.height;
          var width = canvas2 && canvas2.width;
          me.id = helpers$1.uid();
          me.ctx = context;
          me.canvas = canvas2;
          me.config = config;
          me.width = width;
          me.height = height;
          me.aspectRatio = height ? width / height : null;
          me.options = config.options;
          me._bufferedRender = false;
          me._layers = [];
          me.chart = me;
          me.controller = me;
          Chart2.instances[me.id] = me;
          Object.defineProperty(me, "data", {
            get: function() {
              return me.config.data;
            },
            set: function(value) {
              me.config.data = value;
            }
          });
          if (!context || !canvas2) {
            console.error("Failed to create chart: can't acquire context from the given item");
            return;
          }
          me.initialize();
          me.update();
        },
        initialize: function() {
          var me = this;
          core_plugins.notify(me, "beforeInit");
          helpers$1.retinaScale(me, me.options.devicePixelRatio);
          me.bindEvents();
          if (me.options.responsive) {
            me.resize(true);
          }
          me.initToolTip();
          core_plugins.notify(me, "afterInit");
          return me;
        },
        clear: function() {
          helpers$1.canvas.clear(this);
          return this;
        },
        stop: function() {
          core_animations.cancelAnimation(this);
          return this;
        },
        resize: function(silent) {
          var me = this;
          var options3 = me.options;
          var canvas2 = me.canvas;
          var aspectRatio = options3.maintainAspectRatio && me.aspectRatio || null;
          var newWidth = Math.max(0, Math.floor(helpers$1.getMaximumWidth(canvas2)));
          var newHeight = Math.max(0, Math.floor(aspectRatio ? newWidth / aspectRatio : helpers$1.getMaximumHeight(canvas2)));
          if (me.width === newWidth && me.height === newHeight) {
            return;
          }
          canvas2.width = me.width = newWidth;
          canvas2.height = me.height = newHeight;
          canvas2.style.width = newWidth + "px";
          canvas2.style.height = newHeight + "px";
          helpers$1.retinaScale(me, options3.devicePixelRatio);
          if (!silent) {
            var newSize = {width: newWidth, height: newHeight};
            core_plugins.notify(me, "resize", [newSize]);
            if (options3.onResize) {
              options3.onResize(me, newSize);
            }
            me.stop();
            me.update({
              duration: options3.responsiveAnimationDuration
            });
          }
        },
        ensureScalesHaveIDs: function() {
          var options3 = this.options;
          var scalesOptions = options3.scales || {};
          var scaleOptions = options3.scale;
          helpers$1.each(scalesOptions.xAxes, function(xAxisOptions, index2) {
            if (!xAxisOptions.id) {
              xAxisOptions.id = nextAvailableScaleId(scalesOptions.xAxes, "x-axis-", index2);
            }
          });
          helpers$1.each(scalesOptions.yAxes, function(yAxisOptions, index2) {
            if (!yAxisOptions.id) {
              yAxisOptions.id = nextAvailableScaleId(scalesOptions.yAxes, "y-axis-", index2);
            }
          });
          if (scaleOptions) {
            scaleOptions.id = scaleOptions.id || "scale";
          }
        },
        buildOrUpdateScales: function() {
          var me = this;
          var options3 = me.options;
          var scales2 = me.scales || {};
          var items = [];
          var updated = Object.keys(scales2).reduce(function(obj, id) {
            obj[id] = false;
            return obj;
          }, {});
          if (options3.scales) {
            items = items.concat((options3.scales.xAxes || []).map(function(xAxisOptions) {
              return {options: xAxisOptions, dtype: "category", dposition: "bottom"};
            }), (options3.scales.yAxes || []).map(function(yAxisOptions) {
              return {options: yAxisOptions, dtype: "linear", dposition: "left"};
            }));
          }
          if (options3.scale) {
            items.push({
              options: options3.scale,
              dtype: "radialLinear",
              isDefault: true,
              dposition: "chartArea"
            });
          }
          helpers$1.each(items, function(item) {
            var scaleOptions = item.options;
            var id = scaleOptions.id;
            var scaleType = valueOrDefault$9(scaleOptions.type, item.dtype);
            if (positionIsHorizontal(scaleOptions.position) !== positionIsHorizontal(item.dposition)) {
              scaleOptions.position = item.dposition;
            }
            updated[id] = true;
            var scale2 = null;
            if (id in scales2 && scales2[id].type === scaleType) {
              scale2 = scales2[id];
              scale2.options = scaleOptions;
              scale2.ctx = me.ctx;
              scale2.chart = me;
            } else {
              var scaleClass = core_scaleService.getScaleConstructor(scaleType);
              if (!scaleClass) {
                return;
              }
              scale2 = new scaleClass({
                id,
                type: scaleType,
                options: scaleOptions,
                ctx: me.ctx,
                chart: me
              });
              scales2[scale2.id] = scale2;
            }
            scale2.mergeTicksOptions();
            if (item.isDefault) {
              me.scale = scale2;
            }
          });
          helpers$1.each(updated, function(hasUpdated, id) {
            if (!hasUpdated) {
              delete scales2[id];
            }
          });
          me.scales = scales2;
          core_scaleService.addScalesToLayout(this);
        },
        buildOrUpdateControllers: function() {
          var me = this;
          var newControllers = [];
          var datasets = me.data.datasets;
          var i, ilen;
          for (i = 0, ilen = datasets.length; i < ilen; i++) {
            var dataset = datasets[i];
            var meta = me.getDatasetMeta(i);
            var type = dataset.type || me.config.type;
            if (meta.type && meta.type !== type) {
              me.destroyDatasetMeta(i);
              meta = me.getDatasetMeta(i);
            }
            meta.type = type;
            meta.order = dataset.order || 0;
            meta.index = i;
            if (meta.controller) {
              meta.controller.updateIndex(i);
              meta.controller.linkScales();
            } else {
              var ControllerClass = controllers[meta.type];
              if (ControllerClass === void 0) {
                throw new Error('"' + meta.type + '" is not a chart type.');
              }
              meta.controller = new ControllerClass(me, i);
              newControllers.push(meta.controller);
            }
          }
          return newControllers;
        },
        resetElements: function() {
          var me = this;
          helpers$1.each(me.data.datasets, function(dataset, datasetIndex) {
            me.getDatasetMeta(datasetIndex).controller.reset();
          }, me);
        },
        reset: function() {
          this.resetElements();
          this.tooltip.initialize();
        },
        update: function(config) {
          var me = this;
          var i, ilen;
          if (!config || typeof config !== "object") {
            config = {
              duration: config,
              lazy: arguments[1]
            };
          }
          updateConfig(me);
          core_plugins._invalidate(me);
          if (core_plugins.notify(me, "beforeUpdate") === false) {
            return;
          }
          me.tooltip._data = me.data;
          var newControllers = me.buildOrUpdateControllers();
          for (i = 0, ilen = me.data.datasets.length; i < ilen; i++) {
            me.getDatasetMeta(i).controller.buildOrUpdateElements();
          }
          me.updateLayout();
          if (me.options.animation && me.options.animation.duration) {
            helpers$1.each(newControllers, function(controller) {
              controller.reset();
            });
          }
          me.updateDatasets();
          me.tooltip.initialize();
          me.lastActive = [];
          core_plugins.notify(me, "afterUpdate");
          me._layers.sort(compare2Level("z", "_idx"));
          if (me._bufferedRender) {
            me._bufferedRequest = {
              duration: config.duration,
              easing: config.easing,
              lazy: config.lazy
            };
          } else {
            me.render(config);
          }
        },
        updateLayout: function() {
          var me = this;
          if (core_plugins.notify(me, "beforeLayout") === false) {
            return;
          }
          core_layouts.update(this, this.width, this.height);
          me._layers = [];
          helpers$1.each(me.boxes, function(box) {
            if (box._configure) {
              box._configure();
            }
            me._layers.push.apply(me._layers, box._layers());
          }, me);
          me._layers.forEach(function(item, index2) {
            item._idx = index2;
          });
          core_plugins.notify(me, "afterScaleUpdate");
          core_plugins.notify(me, "afterLayout");
        },
        updateDatasets: function() {
          var me = this;
          if (core_plugins.notify(me, "beforeDatasetsUpdate") === false) {
            return;
          }
          for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
            me.updateDataset(i);
          }
          core_plugins.notify(me, "afterDatasetsUpdate");
        },
        updateDataset: function(index2) {
          var me = this;
          var meta = me.getDatasetMeta(index2);
          var args = {
            meta,
            index: index2
          };
          if (core_plugins.notify(me, "beforeDatasetUpdate", [args]) === false) {
            return;
          }
          meta.controller._update();
          core_plugins.notify(me, "afterDatasetUpdate", [args]);
        },
        render: function(config) {
          var me = this;
          if (!config || typeof config !== "object") {
            config = {
              duration: config,
              lazy: arguments[1]
            };
          }
          var animationOptions = me.options.animation;
          var duration = valueOrDefault$9(config.duration, animationOptions && animationOptions.duration);
          var lazy = config.lazy;
          if (core_plugins.notify(me, "beforeRender") === false) {
            return;
          }
          var onComplete = function(animation2) {
            core_plugins.notify(me, "afterRender");
            helpers$1.callback(animationOptions && animationOptions.onComplete, [animation2], me);
          };
          if (animationOptions && duration) {
            var animation = new core_animation({
              numSteps: duration / 16.66,
              easing: config.easing || animationOptions.easing,
              render: function(chart, animationObject) {
                var easingFunction = helpers$1.easing.effects[animationObject.easing];
                var currentStep = animationObject.currentStep;
                var stepDecimal = currentStep / animationObject.numSteps;
                chart.draw(easingFunction(stepDecimal), stepDecimal, currentStep);
              },
              onAnimationProgress: animationOptions.onProgress,
              onAnimationComplete: onComplete
            });
            core_animations.addAnimation(me, animation, duration, lazy);
          } else {
            me.draw();
            onComplete(new core_animation({numSteps: 0, chart: me}));
          }
          return me;
        },
        draw: function(easingValue) {
          var me = this;
          var i, layers;
          me.clear();
          if (helpers$1.isNullOrUndef(easingValue)) {
            easingValue = 1;
          }
          me.transition(easingValue);
          if (me.width <= 0 || me.height <= 0) {
            return;
          }
          if (core_plugins.notify(me, "beforeDraw", [easingValue]) === false) {
            return;
          }
          layers = me._layers;
          for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
            layers[i].draw(me.chartArea);
          }
          me.drawDatasets(easingValue);
          for (; i < layers.length; ++i) {
            layers[i].draw(me.chartArea);
          }
          me._drawTooltip(easingValue);
          core_plugins.notify(me, "afterDraw", [easingValue]);
        },
        transition: function(easingValue) {
          var me = this;
          for (var i = 0, ilen = (me.data.datasets || []).length; i < ilen; ++i) {
            if (me.isDatasetVisible(i)) {
              me.getDatasetMeta(i).controller.transition(easingValue);
            }
          }
          me.tooltip.transition(easingValue);
        },
        _getSortedDatasetMetas: function(filterVisible) {
          var me = this;
          var datasets = me.data.datasets || [];
          var result = [];
          var i, ilen;
          for (i = 0, ilen = datasets.length; i < ilen; ++i) {
            if (!filterVisible || me.isDatasetVisible(i)) {
              result.push(me.getDatasetMeta(i));
            }
          }
          result.sort(compare2Level("order", "index"));
          return result;
        },
        _getSortedVisibleDatasetMetas: function() {
          return this._getSortedDatasetMetas(true);
        },
        drawDatasets: function(easingValue) {
          var me = this;
          var metasets, i;
          if (core_plugins.notify(me, "beforeDatasetsDraw", [easingValue]) === false) {
            return;
          }
          metasets = me._getSortedVisibleDatasetMetas();
          for (i = metasets.length - 1; i >= 0; --i) {
            me.drawDataset(metasets[i], easingValue);
          }
          core_plugins.notify(me, "afterDatasetsDraw", [easingValue]);
        },
        drawDataset: function(meta, easingValue) {
          var me = this;
          var args = {
            meta,
            index: meta.index,
            easingValue
          };
          if (core_plugins.notify(me, "beforeDatasetDraw", [args]) === false) {
            return;
          }
          meta.controller.draw(easingValue);
          core_plugins.notify(me, "afterDatasetDraw", [args]);
        },
        _drawTooltip: function(easingValue) {
          var me = this;
          var tooltip = me.tooltip;
          var args = {
            tooltip,
            easingValue
          };
          if (core_plugins.notify(me, "beforeTooltipDraw", [args]) === false) {
            return;
          }
          tooltip.draw();
          core_plugins.notify(me, "afterTooltipDraw", [args]);
        },
        getElementAtEvent: function(e) {
          return core_interaction.modes.single(this, e);
        },
        getElementsAtEvent: function(e) {
          return core_interaction.modes.label(this, e, {intersect: true});
        },
        getElementsAtXAxis: function(e) {
          return core_interaction.modes["x-axis"](this, e, {intersect: true});
        },
        getElementsAtEventForMode: function(e, mode, options3) {
          var method = core_interaction.modes[mode];
          if (typeof method === "function") {
            return method(this, e, options3);
          }
          return [];
        },
        getDatasetAtEvent: function(e) {
          return core_interaction.modes.dataset(this, e, {intersect: true});
        },
        getDatasetMeta: function(datasetIndex) {
          var me = this;
          var dataset = me.data.datasets[datasetIndex];
          if (!dataset._meta) {
            dataset._meta = {};
          }
          var meta = dataset._meta[me.id];
          if (!meta) {
            meta = dataset._meta[me.id] = {
              type: null,
              data: [],
              dataset: null,
              controller: null,
              hidden: null,
              xAxisID: null,
              yAxisID: null,
              order: dataset.order || 0,
              index: datasetIndex
            };
          }
          return meta;
        },
        getVisibleDatasetCount: function() {
          var count = 0;
          for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
            if (this.isDatasetVisible(i)) {
              count++;
            }
          }
          return count;
        },
        isDatasetVisible: function(datasetIndex) {
          var meta = this.getDatasetMeta(datasetIndex);
          return typeof meta.hidden === "boolean" ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
        },
        generateLegend: function() {
          return this.options.legendCallback(this);
        },
        destroyDatasetMeta: function(datasetIndex) {
          var id = this.id;
          var dataset = this.data.datasets[datasetIndex];
          var meta = dataset._meta && dataset._meta[id];
          if (meta) {
            meta.controller.destroy();
            delete dataset._meta[id];
          }
        },
        destroy: function() {
          var me = this;
          var canvas2 = me.canvas;
          var i, ilen;
          me.stop();
          for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
            me.destroyDatasetMeta(i);
          }
          if (canvas2) {
            me.unbindEvents();
            helpers$1.canvas.clear(me);
            platform.releaseContext(me.ctx);
            me.canvas = null;
            me.ctx = null;
          }
          core_plugins.notify(me, "destroy");
          delete Chart2.instances[me.id];
        },
        toBase64Image: function() {
          return this.canvas.toDataURL.apply(this.canvas, arguments);
        },
        initToolTip: function() {
          var me = this;
          me.tooltip = new core_tooltip({
            _chart: me,
            _chartInstance: me,
            _data: me.data,
            _options: me.options.tooltips
          }, me);
        },
        bindEvents: function() {
          var me = this;
          var listeners = me._listeners = {};
          var listener = function() {
            me.eventHandler.apply(me, arguments);
          };
          helpers$1.each(me.options.events, function(type) {
            platform.addEventListener(me, type, listener);
            listeners[type] = listener;
          });
          if (me.options.responsive) {
            listener = function() {
              me.resize();
            };
            platform.addEventListener(me, "resize", listener);
            listeners.resize = listener;
          }
        },
        unbindEvents: function() {
          var me = this;
          var listeners = me._listeners;
          if (!listeners) {
            return;
          }
          delete me._listeners;
          helpers$1.each(listeners, function(listener, type) {
            platform.removeEventListener(me, type, listener);
          });
        },
        updateHoverStyle: function(elements2, mode, enabled) {
          var prefix = enabled ? "set" : "remove";
          var element, i, ilen;
          for (i = 0, ilen = elements2.length; i < ilen; ++i) {
            element = elements2[i];
            if (element) {
              this.getDatasetMeta(element._datasetIndex).controller[prefix + "HoverStyle"](element);
            }
          }
          if (mode === "dataset") {
            this.getDatasetMeta(elements2[0]._datasetIndex).controller["_" + prefix + "DatasetHoverStyle"]();
          }
        },
        eventHandler: function(e) {
          var me = this;
          var tooltip = me.tooltip;
          if (core_plugins.notify(me, "beforeEvent", [e]) === false) {
            return;
          }
          me._bufferedRender = true;
          me._bufferedRequest = null;
          var changed = me.handleEvent(e);
          if (tooltip) {
            changed = tooltip._start ? tooltip.handleEvent(e) : changed | tooltip.handleEvent(e);
          }
          core_plugins.notify(me, "afterEvent", [e]);
          var bufferedRequest = me._bufferedRequest;
          if (bufferedRequest) {
            me.render(bufferedRequest);
          } else if (changed && !me.animating) {
            me.stop();
            me.render({
              duration: me.options.hover.animationDuration,
              lazy: true
            });
          }
          me._bufferedRender = false;
          me._bufferedRequest = null;
          return me;
        },
        handleEvent: function(e) {
          var me = this;
          var options3 = me.options || {};
          var hoverOptions = options3.hover;
          var changed = false;
          me.lastActive = me.lastActive || [];
          if (e.type === "mouseout") {
            me.active = [];
          } else {
            me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions);
          }
          helpers$1.callback(options3.onHover || options3.hover.onHover, [e.native, me.active], me);
          if (e.type === "mouseup" || e.type === "click") {
            if (options3.onClick) {
              options3.onClick.call(me, e.native, me.active);
            }
          }
          if (me.lastActive.length) {
            me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
          }
          if (me.active.length && hoverOptions.mode) {
            me.updateHoverStyle(me.active, hoverOptions.mode, true);
          }
          changed = !helpers$1.arrayEquals(me.active, me.lastActive);
          me.lastActive = me.active;
          return changed;
        }
      });
      Chart2.instances = {};
      var core_controller = Chart2;
      Chart2.Controller = Chart2;
      Chart2.types = {};
      helpers$1.configMerge = mergeConfig;
      helpers$1.scaleMerge = mergeScaleConfig;
      var core_helpers = function() {
        helpers$1.where = function(collection, filterCallback) {
          if (helpers$1.isArray(collection) && Array.prototype.filter) {
            return collection.filter(filterCallback);
          }
          var filtered = [];
          helpers$1.each(collection, function(item) {
            if (filterCallback(item)) {
              filtered.push(item);
            }
          });
          return filtered;
        };
        helpers$1.findIndex = Array.prototype.findIndex ? function(array, callback, scope) {
          return array.findIndex(callback, scope);
        } : function(array, callback, scope) {
          scope = scope === void 0 ? array : scope;
          for (var i = 0, ilen = array.length; i < ilen; ++i) {
            if (callback.call(scope, array[i], i, array)) {
              return i;
            }
          }
          return -1;
        };
        helpers$1.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
          if (helpers$1.isNullOrUndef(startIndex)) {
            startIndex = -1;
          }
          for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
            var currentItem = arrayToSearch[i];
            if (filterCallback(currentItem)) {
              return currentItem;
            }
          }
        };
        helpers$1.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
          if (helpers$1.isNullOrUndef(startIndex)) {
            startIndex = arrayToSearch.length;
          }
          for (var i = startIndex - 1; i >= 0; i--) {
            var currentItem = arrayToSearch[i];
            if (filterCallback(currentItem)) {
              return currentItem;
            }
          }
        };
        helpers$1.isNumber = function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        };
        helpers$1.almostEquals = function(x, y, epsilon) {
          return Math.abs(x - y) < epsilon;
        };
        helpers$1.almostWhole = function(x, epsilon) {
          var rounded = Math.round(x);
          return rounded - epsilon <= x && rounded + epsilon >= x;
        };
        helpers$1.max = function(array) {
          return array.reduce(function(max, value) {
            if (!isNaN(value)) {
              return Math.max(max, value);
            }
            return max;
          }, Number.NEGATIVE_INFINITY);
        };
        helpers$1.min = function(array) {
          return array.reduce(function(min, value) {
            if (!isNaN(value)) {
              return Math.min(min, value);
            }
            return min;
          }, Number.POSITIVE_INFINITY);
        };
        helpers$1.sign = Math.sign ? function(x) {
          return Math.sign(x);
        } : function(x) {
          x = +x;
          if (x === 0 || isNaN(x)) {
            return x;
          }
          return x > 0 ? 1 : -1;
        };
        helpers$1.toRadians = function(degrees) {
          return degrees * (Math.PI / 180);
        };
        helpers$1.toDegrees = function(radians) {
          return radians * (180 / Math.PI);
        };
        helpers$1._decimalPlaces = function(x) {
          if (!helpers$1.isFinite(x)) {
            return;
          }
          var e = 1;
          var p = 0;
          while (Math.round(x * e) / e !== x) {
            e *= 10;
            p++;
          }
          return p;
        };
        helpers$1.getAngleFromPoint = function(centrePoint, anglePoint) {
          var distanceFromXCenter = anglePoint.x - centrePoint.x;
          var distanceFromYCenter = anglePoint.y - centrePoint.y;
          var radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
          var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
          if (angle < -0.5 * Math.PI) {
            angle += 2 * Math.PI;
          }
          return {
            angle,
            distance: radialDistanceFromCenter
          };
        };
        helpers$1.distanceBetweenPoints = function(pt1, pt2) {
          return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
        };
        helpers$1.aliasPixel = function(pixelWidth) {
          return pixelWidth % 2 === 0 ? 0 : 0.5;
        };
        helpers$1._alignPixel = function(chart, pixel, width) {
          var devicePixelRatio = chart.currentDevicePixelRatio;
          var halfWidth = width / 2;
          return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
        };
        helpers$1.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
          var previous = firstPoint.skip ? middlePoint : firstPoint;
          var current = middlePoint;
          var next = afterPoint.skip ? middlePoint : afterPoint;
          var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
          var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
          var s01 = d01 / (d01 + d12);
          var s12 = d12 / (d01 + d12);
          s01 = isNaN(s01) ? 0 : s01;
          s12 = isNaN(s12) ? 0 : s12;
          var fa = t * s01;
          var fb = t * s12;
          return {
            previous: {
              x: current.x - fa * (next.x - previous.x),
              y: current.y - fa * (next.y - previous.y)
            },
            next: {
              x: current.x + fb * (next.x - previous.x),
              y: current.y + fb * (next.y - previous.y)
            }
          };
        };
        helpers$1.EPSILON = Number.EPSILON || 1e-14;
        helpers$1.splineCurveMonotone = function(points) {
          var pointsWithTangents = (points || []).map(function(point) {
            return {
              model: point._model,
              deltaK: 0,
              mK: 0
            };
          });
          var pointsLen = pointsWithTangents.length;
          var i, pointBefore, pointCurrent, pointAfter;
          for (i = 0; i < pointsLen; ++i) {
            pointCurrent = pointsWithTangents[i];
            if (pointCurrent.model.skip) {
              continue;
            }
            pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
            pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
            if (pointAfter && !pointAfter.model.skip) {
              var slopeDeltaX = pointAfter.model.x - pointCurrent.model.x;
              pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
            }
            if (!pointBefore || pointBefore.model.skip) {
              pointCurrent.mK = pointCurrent.deltaK;
            } else if (!pointAfter || pointAfter.model.skip) {
              pointCurrent.mK = pointBefore.deltaK;
            } else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
              pointCurrent.mK = 0;
            } else {
              pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
            }
          }
          var alphaK, betaK, tauK, squaredMagnitude;
          for (i = 0; i < pointsLen - 1; ++i) {
            pointCurrent = pointsWithTangents[i];
            pointAfter = pointsWithTangents[i + 1];
            if (pointCurrent.model.skip || pointAfter.model.skip) {
              continue;
            }
            if (helpers$1.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
              pointCurrent.mK = pointAfter.mK = 0;
              continue;
            }
            alphaK = pointCurrent.mK / pointCurrent.deltaK;
            betaK = pointAfter.mK / pointCurrent.deltaK;
            squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
            if (squaredMagnitude <= 9) {
              continue;
            }
            tauK = 3 / Math.sqrt(squaredMagnitude);
            pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
            pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
          }
          var deltaX;
          for (i = 0; i < pointsLen; ++i) {
            pointCurrent = pointsWithTangents[i];
            if (pointCurrent.model.skip) {
              continue;
            }
            pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
            pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
            if (pointBefore && !pointBefore.model.skip) {
              deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
              pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
              pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
            }
            if (pointAfter && !pointAfter.model.skip) {
              deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
              pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
              pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
            }
          }
        };
        helpers$1.nextItem = function(collection, index2, loop) {
          if (loop) {
            return index2 >= collection.length - 1 ? collection[0] : collection[index2 + 1];
          }
          return index2 >= collection.length - 1 ? collection[collection.length - 1] : collection[index2 + 1];
        };
        helpers$1.previousItem = function(collection, index2, loop) {
          if (loop) {
            return index2 <= 0 ? collection[collection.length - 1] : collection[index2 - 1];
          }
          return index2 <= 0 ? collection[0] : collection[index2 - 1];
        };
        helpers$1.niceNum = function(range, round) {
          var exponent = Math.floor(helpers$1.log10(range));
          var fraction = range / Math.pow(10, exponent);
          var niceFraction;
          if (round) {
            if (fraction < 1.5) {
              niceFraction = 1;
            } else if (fraction < 3) {
              niceFraction = 2;
            } else if (fraction < 7) {
              niceFraction = 5;
            } else {
              niceFraction = 10;
            }
          } else if (fraction <= 1) {
            niceFraction = 1;
          } else if (fraction <= 2) {
            niceFraction = 2;
          } else if (fraction <= 5) {
            niceFraction = 5;
          } else {
            niceFraction = 10;
          }
          return niceFraction * Math.pow(10, exponent);
        };
        helpers$1.requestAnimFrame = function() {
          if (typeof window === "undefined") {
            return function(callback) {
              callback();
            };
          }
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 1e3 / 60);
          };
        }();
        helpers$1.getRelativePosition = function(evt, chart) {
          var mouseX, mouseY;
          var e = evt.originalEvent || evt;
          var canvas2 = evt.target || evt.srcElement;
          var boundingRect = canvas2.getBoundingClientRect();
          var touches = e.touches;
          if (touches && touches.length > 0) {
            mouseX = touches[0].clientX;
            mouseY = touches[0].clientY;
          } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
          }
          var paddingLeft = parseFloat(helpers$1.getStyle(canvas2, "padding-left"));
          var paddingTop = parseFloat(helpers$1.getStyle(canvas2, "padding-top"));
          var paddingRight = parseFloat(helpers$1.getStyle(canvas2, "padding-right"));
          var paddingBottom = parseFloat(helpers$1.getStyle(canvas2, "padding-bottom"));
          var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
          var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
          mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / width * canvas2.width / chart.currentDevicePixelRatio);
          mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / height * canvas2.height / chart.currentDevicePixelRatio);
          return {
            x: mouseX,
            y: mouseY
          };
        };
        function parseMaxStyle(styleValue, node, parentProperty) {
          var valueInPixels;
          if (typeof styleValue === "string") {
            valueInPixels = parseInt(styleValue, 10);
            if (styleValue.indexOf("%") !== -1) {
              valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
            }
          } else {
            valueInPixels = styleValue;
          }
          return valueInPixels;
        }
        function isConstrainedValue(value) {
          return value !== void 0 && value !== null && value !== "none";
        }
        function getConstraintDimension(domNode, maxStyle, percentageProperty) {
          var view = document.defaultView;
          var parentNode = helpers$1._getParentNode(domNode);
          var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
          var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
          var hasCNode = isConstrainedValue(constrainedNode);
          var hasCContainer = isConstrainedValue(constrainedContainer);
          var infinity = Number.POSITIVE_INFINITY;
          if (hasCNode || hasCContainer) {
            return Math.min(hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity, hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
          }
          return "none";
        }
        helpers$1.getConstraintWidth = function(domNode) {
          return getConstraintDimension(domNode, "max-width", "clientWidth");
        };
        helpers$1.getConstraintHeight = function(domNode) {
          return getConstraintDimension(domNode, "max-height", "clientHeight");
        };
        helpers$1._calculatePadding = function(container, padding, parentDimension) {
          padding = helpers$1.getStyle(container, padding);
          return padding.indexOf("%") > -1 ? parentDimension * parseInt(padding, 10) / 100 : parseInt(padding, 10);
        };
        helpers$1._getParentNode = function(domNode) {
          var parent = domNode.parentNode;
          if (parent && parent.toString() === "[object ShadowRoot]") {
            parent = parent.host;
          }
          return parent;
        };
        helpers$1.getMaximumWidth = function(domNode) {
          var container = helpers$1._getParentNode(domNode);
          if (!container) {
            return domNode.clientWidth;
          }
          var clientWidth = container.clientWidth;
          var paddingLeft = helpers$1._calculatePadding(container, "padding-left", clientWidth);
          var paddingRight = helpers$1._calculatePadding(container, "padding-right", clientWidth);
          var w = clientWidth - paddingLeft - paddingRight;
          var cw = helpers$1.getConstraintWidth(domNode);
          return isNaN(cw) ? w : Math.min(w, cw);
        };
        helpers$1.getMaximumHeight = function(domNode) {
          var container = helpers$1._getParentNode(domNode);
          if (!container) {
            return domNode.clientHeight;
          }
          var clientHeight = container.clientHeight;
          var paddingTop = helpers$1._calculatePadding(container, "padding-top", clientHeight);
          var paddingBottom = helpers$1._calculatePadding(container, "padding-bottom", clientHeight);
          var h = clientHeight - paddingTop - paddingBottom;
          var ch = helpers$1.getConstraintHeight(domNode);
          return isNaN(ch) ? h : Math.min(h, ch);
        };
        helpers$1.getStyle = function(el, property) {
          return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
        };
        helpers$1.retinaScale = function(chart, forceRatio) {
          var pixelRatio = chart.currentDevicePixelRatio = forceRatio || typeof window !== "undefined" && window.devicePixelRatio || 1;
          if (pixelRatio === 1) {
            return;
          }
          var canvas2 = chart.canvas;
          var height = chart.height;
          var width = chart.width;
          canvas2.height = height * pixelRatio;
          canvas2.width = width * pixelRatio;
          chart.ctx.scale(pixelRatio, pixelRatio);
          if (!canvas2.style.height && !canvas2.style.width) {
            canvas2.style.height = height + "px";
            canvas2.style.width = width + "px";
          }
        };
        helpers$1.fontString = function(pixelSize, fontStyle, fontFamily) {
          return fontStyle + " " + pixelSize + "px " + fontFamily;
        };
        helpers$1.longestText = function(ctx, font, arrayOfThings, cache) {
          cache = cache || {};
          var data = cache.data = cache.data || {};
          var gc = cache.garbageCollect = cache.garbageCollect || [];
          if (cache.font !== font) {
            data = cache.data = {};
            gc = cache.garbageCollect = [];
            cache.font = font;
          }
          ctx.font = font;
          var longest = 0;
          var ilen = arrayOfThings.length;
          var i, j, jlen, thing, nestedThing;
          for (i = 0; i < ilen; i++) {
            thing = arrayOfThings[i];
            if (thing !== void 0 && thing !== null && helpers$1.isArray(thing) !== true) {
              longest = helpers$1.measureText(ctx, data, gc, longest, thing);
            } else if (helpers$1.isArray(thing)) {
              for (j = 0, jlen = thing.length; j < jlen; j++) {
                nestedThing = thing[j];
                if (nestedThing !== void 0 && nestedThing !== null && !helpers$1.isArray(nestedThing)) {
                  longest = helpers$1.measureText(ctx, data, gc, longest, nestedThing);
                }
              }
            }
          }
          var gcLen = gc.length / 2;
          if (gcLen > arrayOfThings.length) {
            for (i = 0; i < gcLen; i++) {
              delete data[gc[i]];
            }
            gc.splice(0, gcLen);
          }
          return longest;
        };
        helpers$1.measureText = function(ctx, data, gc, longest, string) {
          var textWidth = data[string];
          if (!textWidth) {
            textWidth = data[string] = ctx.measureText(string).width;
            gc.push(string);
          }
          if (textWidth > longest) {
            longest = textWidth;
          }
          return longest;
        };
        helpers$1.numberOfLabelLines = function(arrayOfThings) {
          var numberOfLines = 1;
          helpers$1.each(arrayOfThings, function(thing) {
            if (helpers$1.isArray(thing)) {
              if (thing.length > numberOfLines) {
                numberOfLines = thing.length;
              }
            }
          });
          return numberOfLines;
        };
        helpers$1.color = !chartjsColor ? function(value) {
          console.error("Color.js not found!");
          return value;
        } : function(value) {
          if (value instanceof CanvasGradient) {
            value = core_defaults.global.defaultColor;
          }
          return chartjsColor(value);
        };
        helpers$1.getHoverColor = function(colorValue) {
          return colorValue instanceof CanvasPattern || colorValue instanceof CanvasGradient ? colorValue : helpers$1.color(colorValue).saturate(0.5).darken(0.1).rgbString();
        };
      };
      function abstract() {
        throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.");
      }
      function DateAdapter(options3) {
        this.options = options3 || {};
      }
      helpers$1.extend(DateAdapter.prototype, {
        formats: abstract,
        parse: abstract,
        format: abstract,
        add: abstract,
        diff: abstract,
        startOf: abstract,
        endOf: abstract,
        _create: function(value) {
          return value;
        }
      });
      DateAdapter.override = function(members) {
        helpers$1.extend(DateAdapter.prototype, members);
      };
      var _date = DateAdapter;
      var core_adapters = {
        _date
      };
      var core_ticks = {
        formatters: {
          values: function(value) {
            return helpers$1.isArray(value) ? value : "" + value;
          },
          linear: function(tickValue, index2, ticks) {
            var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];
            if (Math.abs(delta) > 1) {
              if (tickValue !== Math.floor(tickValue)) {
                delta = tickValue - Math.floor(tickValue);
              }
            }
            var logDelta = helpers$1.log10(Math.abs(delta));
            var tickString = "";
            if (tickValue !== 0) {
              var maxTick = Math.max(Math.abs(ticks[0]), Math.abs(ticks[ticks.length - 1]));
              if (maxTick < 1e-4) {
                var logTick = helpers$1.log10(Math.abs(tickValue));
                var numExponential = Math.floor(logTick) - Math.floor(logDelta);
                numExponential = Math.max(Math.min(numExponential, 20), 0);
                tickString = tickValue.toExponential(numExponential);
              } else {
                var numDecimal = -1 * Math.floor(logDelta);
                numDecimal = Math.max(Math.min(numDecimal, 20), 0);
                tickString = tickValue.toFixed(numDecimal);
              }
            } else {
              tickString = "0";
            }
            return tickString;
          },
          logarithmic: function(tickValue, index2, ticks) {
            var remain = tickValue / Math.pow(10, Math.floor(helpers$1.log10(tickValue)));
            if (tickValue === 0) {
              return "0";
            } else if (remain === 1 || remain === 2 || remain === 5 || index2 === 0 || index2 === ticks.length - 1) {
              return tickValue.toExponential();
            }
            return "";
          }
        }
      };
      var isArray = helpers$1.isArray;
      var isNullOrUndef = helpers$1.isNullOrUndef;
      var valueOrDefault$a = helpers$1.valueOrDefault;
      var valueAtIndexOrDefault = helpers$1.valueAtIndexOrDefault;
      core_defaults._set("scale", {
        display: true,
        position: "left",
        offset: false,
        gridLines: {
          display: true,
          color: "rgba(0,0,0,0.1)",
          lineWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          tickMarkLength: 10,
          zeroLineWidth: 1,
          zeroLineColor: "rgba(0,0,0,0.25)",
          zeroLineBorderDash: [],
          zeroLineBorderDashOffset: 0,
          offsetGridLines: false,
          borderDash: [],
          borderDashOffset: 0
        },
        scaleLabel: {
          display: false,
          labelString: "",
          padding: {
            top: 4,
            bottom: 4
          }
        },
        ticks: {
          beginAtZero: false,
          minRotation: 0,
          maxRotation: 50,
          mirror: false,
          padding: 0,
          reverse: false,
          display: true,
          autoSkip: true,
          autoSkipPadding: 0,
          labelOffset: 0,
          callback: core_ticks.formatters.values,
          minor: {},
          major: {}
        }
      });
      function sample(arr, numItems) {
        var result = [];
        var increment = arr.length / numItems;
        var i = 0;
        var len = arr.length;
        for (; i < len; i += increment) {
          result.push(arr[Math.floor(i)]);
        }
        return result;
      }
      function getPixelForGridLine(scale2, index2, offsetGridLines) {
        var length = scale2.getTicks().length;
        var validIndex = Math.min(index2, length - 1);
        var lineValue = scale2.getPixelForTick(validIndex);
        var start = scale2._startPixel;
        var end = scale2._endPixel;
        var epsilon = 1e-6;
        var offset;
        if (offsetGridLines) {
          if (length === 1) {
            offset = Math.max(lineValue - start, end - lineValue);
          } else if (index2 === 0) {
            offset = (scale2.getPixelForTick(1) - lineValue) / 2;
          } else {
            offset = (lineValue - scale2.getPixelForTick(validIndex - 1)) / 2;
          }
          lineValue += validIndex < index2 ? offset : -offset;
          if (lineValue < start - epsilon || lineValue > end + epsilon) {
            return;
          }
        }
        return lineValue;
      }
      function garbageCollect(caches, length) {
        helpers$1.each(caches, function(cache) {
          var gc = cache.gc;
          var gcLen = gc.length / 2;
          var i;
          if (gcLen > length) {
            for (i = 0; i < gcLen; ++i) {
              delete cache.data[gc[i]];
            }
            gc.splice(0, gcLen);
          }
        });
      }
      function computeLabelSizes(ctx, tickFonts, ticks, caches) {
        var length = ticks.length;
        var widths = [];
        var heights = [];
        var offsets = [];
        var widestLabelSize = 0;
        var highestLabelSize = 0;
        var i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel, widest, highest;
        for (i = 0; i < length; ++i) {
          label = ticks[i].label;
          tickFont = ticks[i].major ? tickFonts.major : tickFonts.minor;
          ctx.font = fontString = tickFont.string;
          cache = caches[fontString] = caches[fontString] || {data: {}, gc: []};
          lineHeight = tickFont.lineHeight;
          width = height = 0;
          if (!isNullOrUndef(label) && !isArray(label)) {
            width = helpers$1.measureText(ctx, cache.data, cache.gc, width, label);
            height = lineHeight;
          } else if (isArray(label)) {
            for (j = 0, jlen = label.length; j < jlen; ++j) {
              nestedLabel = label[j];
              if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                width = helpers$1.measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                height += lineHeight;
              }
            }
          }
          widths.push(width);
          heights.push(height);
          offsets.push(lineHeight / 2);
          widestLabelSize = Math.max(width, widestLabelSize);
          highestLabelSize = Math.max(height, highestLabelSize);
        }
        garbageCollect(caches, length);
        widest = widths.indexOf(widestLabelSize);
        highest = heights.indexOf(highestLabelSize);
        function valueAt(idx) {
          return {
            width: widths[idx] || 0,
            height: heights[idx] || 0,
            offset: offsets[idx] || 0
          };
        }
        return {
          first: valueAt(0),
          last: valueAt(length - 1),
          widest: valueAt(widest),
          highest: valueAt(highest)
        };
      }
      function getTickMarkLength(options3) {
        return options3.drawTicks ? options3.tickMarkLength : 0;
      }
      function getScaleLabelHeight(options3) {
        var font, padding;
        if (!options3.display) {
          return 0;
        }
        font = helpers$1.options._parseFont(options3);
        padding = helpers$1.options.toPadding(options3.padding);
        return font.lineHeight + padding.height;
      }
      function parseFontOptions(options3, nestedOpts) {
        return helpers$1.extend(helpers$1.options._parseFont({
          fontFamily: valueOrDefault$a(nestedOpts.fontFamily, options3.fontFamily),
          fontSize: valueOrDefault$a(nestedOpts.fontSize, options3.fontSize),
          fontStyle: valueOrDefault$a(nestedOpts.fontStyle, options3.fontStyle),
          lineHeight: valueOrDefault$a(nestedOpts.lineHeight, options3.lineHeight)
        }), {
          color: helpers$1.options.resolve([nestedOpts.fontColor, options3.fontColor, core_defaults.global.defaultFontColor])
        });
      }
      function parseTickFontOptions(options3) {
        var minor = parseFontOptions(options3, options3.minor);
        var major = options3.major.enabled ? parseFontOptions(options3, options3.major) : minor;
        return {minor, major};
      }
      function nonSkipped(ticksToFilter) {
        var filtered = [];
        var item, index2, len;
        for (index2 = 0, len = ticksToFilter.length; index2 < len; ++index2) {
          item = ticksToFilter[index2];
          if (typeof item._index !== "undefined") {
            filtered.push(item);
          }
        }
        return filtered;
      }
      function getEvenSpacing(arr) {
        var len = arr.length;
        var i, diff;
        if (len < 2) {
          return false;
        }
        for (diff = arr[0], i = 1; i < len; ++i) {
          if (arr[i] - arr[i - 1] !== diff) {
            return false;
          }
        }
        return diff;
      }
      function calculateSpacing(majorIndices, ticks, axisLength, ticksLimit) {
        var evenMajorSpacing = getEvenSpacing(majorIndices);
        var spacing = (ticks.length - 1) / ticksLimit;
        var factors, factor, i, ilen;
        if (!evenMajorSpacing) {
          return Math.max(spacing, 1);
        }
        factors = helpers$1.math._factorize(evenMajorSpacing);
        for (i = 0, ilen = factors.length - 1; i < ilen; i++) {
          factor = factors[i];
          if (factor > spacing) {
            return factor;
          }
        }
        return Math.max(spacing, 1);
      }
      function getMajorIndices(ticks) {
        var result = [];
        var i, ilen;
        for (i = 0, ilen = ticks.length; i < ilen; i++) {
          if (ticks[i].major) {
            result.push(i);
          }
        }
        return result;
      }
      function skipMajors(ticks, majorIndices, spacing) {
        var count = 0;
        var next = majorIndices[0];
        var i, tick2;
        spacing = Math.ceil(spacing);
        for (i = 0; i < ticks.length; i++) {
          tick2 = ticks[i];
          if (i === next) {
            tick2._index = i;
            count++;
            next = majorIndices[count * spacing];
          } else {
            delete tick2.label;
          }
        }
      }
      function skip(ticks, spacing, majorStart, majorEnd) {
        var start = valueOrDefault$a(majorStart, 0);
        var end = Math.min(valueOrDefault$a(majorEnd, ticks.length), ticks.length);
        var count = 0;
        var length, i, tick2, next;
        spacing = Math.ceil(spacing);
        if (majorEnd) {
          length = majorEnd - majorStart;
          spacing = length / Math.floor(length / spacing);
        }
        next = start;
        while (next < 0) {
          count++;
          next = Math.round(start + count * spacing);
        }
        for (i = Math.max(start, 0); i < end; i++) {
          tick2 = ticks[i];
          if (i === next) {
            tick2._index = i;
            count++;
            next = Math.round(start + count * spacing);
          } else {
            delete tick2.label;
          }
        }
      }
      var Scale = core_element.extend({
        zeroLineIndex: 0,
        getPadding: function() {
          var me = this;
          return {
            left: me.paddingLeft || 0,
            top: me.paddingTop || 0,
            right: me.paddingRight || 0,
            bottom: me.paddingBottom || 0
          };
        },
        getTicks: function() {
          return this._ticks;
        },
        _getLabels: function() {
          var data = this.chart.data;
          return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
        },
        mergeTicksOptions: function() {
        },
        beforeUpdate: function() {
          helpers$1.callback(this.options.beforeUpdate, [this]);
        },
        update: function(maxWidth, maxHeight, margins) {
          var me = this;
          var tickOpts = me.options.ticks;
          var sampleSize = tickOpts.sampleSize;
          var i, ilen, labels, ticks, samplingEnabled;
          me.beforeUpdate();
          me.maxWidth = maxWidth;
          me.maxHeight = maxHeight;
          me.margins = helpers$1.extend({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, margins);
          me._ticks = null;
          me.ticks = null;
          me._labelSizes = null;
          me._maxLabelLines = 0;
          me.longestLabelWidth = 0;
          me.longestTextCache = me.longestTextCache || {};
          me._gridLineItems = null;
          me._labelItems = null;
          me.beforeSetDimensions();
          me.setDimensions();
          me.afterSetDimensions();
          me.beforeDataLimits();
          me.determineDataLimits();
          me.afterDataLimits();
          me.beforeBuildTicks();
          ticks = me.buildTicks() || [];
          ticks = me.afterBuildTicks(ticks) || ticks;
          if ((!ticks || !ticks.length) && me.ticks) {
            ticks = [];
            for (i = 0, ilen = me.ticks.length; i < ilen; ++i) {
              ticks.push({
                value: me.ticks[i],
                major: false
              });
            }
          }
          me._ticks = ticks;
          samplingEnabled = sampleSize < ticks.length;
          labels = me._convertTicksToLabels(samplingEnabled ? sample(ticks, sampleSize) : ticks);
          me._configure();
          me.beforeCalculateTickRotation();
          me.calculateTickRotation();
          me.afterCalculateTickRotation();
          me.beforeFit();
          me.fit();
          me.afterFit();
          me._ticksToDraw = tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto") ? me._autoSkip(ticks) : ticks;
          if (samplingEnabled) {
            labels = me._convertTicksToLabels(me._ticksToDraw);
          }
          me.ticks = labels;
          me.afterUpdate();
          return me.minSize;
        },
        _configure: function() {
          var me = this;
          var reversePixels = me.options.ticks.reverse;
          var startPixel, endPixel;
          if (me.isHorizontal()) {
            startPixel = me.left;
            endPixel = me.right;
          } else {
            startPixel = me.top;
            endPixel = me.bottom;
            reversePixels = !reversePixels;
          }
          me._startPixel = startPixel;
          me._endPixel = endPixel;
          me._reversePixels = reversePixels;
          me._length = endPixel - startPixel;
        },
        afterUpdate: function() {
          helpers$1.callback(this.options.afterUpdate, [this]);
        },
        beforeSetDimensions: function() {
          helpers$1.callback(this.options.beforeSetDimensions, [this]);
        },
        setDimensions: function() {
          var me = this;
          if (me.isHorizontal()) {
            me.width = me.maxWidth;
            me.left = 0;
            me.right = me.width;
          } else {
            me.height = me.maxHeight;
            me.top = 0;
            me.bottom = me.height;
          }
          me.paddingLeft = 0;
          me.paddingTop = 0;
          me.paddingRight = 0;
          me.paddingBottom = 0;
        },
        afterSetDimensions: function() {
          helpers$1.callback(this.options.afterSetDimensions, [this]);
        },
        beforeDataLimits: function() {
          helpers$1.callback(this.options.beforeDataLimits, [this]);
        },
        determineDataLimits: helpers$1.noop,
        afterDataLimits: function() {
          helpers$1.callback(this.options.afterDataLimits, [this]);
        },
        beforeBuildTicks: function() {
          helpers$1.callback(this.options.beforeBuildTicks, [this]);
        },
        buildTicks: helpers$1.noop,
        afterBuildTicks: function(ticks) {
          var me = this;
          if (isArray(ticks) && ticks.length) {
            return helpers$1.callback(me.options.afterBuildTicks, [me, ticks]);
          }
          me.ticks = helpers$1.callback(me.options.afterBuildTicks, [me, me.ticks]) || me.ticks;
          return ticks;
        },
        beforeTickToLabelConversion: function() {
          helpers$1.callback(this.options.beforeTickToLabelConversion, [this]);
        },
        convertTicksToLabels: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          me.ticks = me.ticks.map(tickOpts.userCallback || tickOpts.callback, this);
        },
        afterTickToLabelConversion: function() {
          helpers$1.callback(this.options.afterTickToLabelConversion, [this]);
        },
        beforeCalculateTickRotation: function() {
          helpers$1.callback(this.options.beforeCalculateTickRotation, [this]);
        },
        calculateTickRotation: function() {
          var me = this;
          var options3 = me.options;
          var tickOpts = options3.ticks;
          var numTicks = me.getTicks().length;
          var minRotation = tickOpts.minRotation || 0;
          var maxRotation = tickOpts.maxRotation;
          var labelRotation = minRotation;
          var labelSizes, maxLabelWidth, maxLabelHeight, maxWidth, tickWidth, maxHeight, maxLabelDiagonal;
          if (!me._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !me.isHorizontal()) {
            me.labelRotation = minRotation;
            return;
          }
          labelSizes = me._getLabelSizes();
          maxLabelWidth = labelSizes.widest.width;
          maxLabelHeight = labelSizes.highest.height - labelSizes.highest.offset;
          maxWidth = Math.min(me.maxWidth, me.chart.width - maxLabelWidth);
          tickWidth = options3.offset ? me.maxWidth / numTicks : maxWidth / (numTicks - 1);
          if (maxLabelWidth + 6 > tickWidth) {
            tickWidth = maxWidth / (numTicks - (options3.offset ? 0.5 : 1));
            maxHeight = me.maxHeight - getTickMarkLength(options3.gridLines) - tickOpts.padding - getScaleLabelHeight(options3.scaleLabel);
            maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
            labelRotation = helpers$1.toDegrees(Math.min(Math.asin(Math.min((labelSizes.highest.height + 6) / tickWidth, 1)), Math.asin(Math.min(maxHeight / maxLabelDiagonal, 1)) - Math.asin(maxLabelHeight / maxLabelDiagonal)));
            labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
          }
          me.labelRotation = labelRotation;
        },
        afterCalculateTickRotation: function() {
          helpers$1.callback(this.options.afterCalculateTickRotation, [this]);
        },
        beforeFit: function() {
          helpers$1.callback(this.options.beforeFit, [this]);
        },
        fit: function() {
          var me = this;
          var minSize = me.minSize = {
            width: 0,
            height: 0
          };
          var chart = me.chart;
          var opts = me.options;
          var tickOpts = opts.ticks;
          var scaleLabelOpts = opts.scaleLabel;
          var gridLineOpts = opts.gridLines;
          var display = me._isVisible();
          var isBottom = opts.position === "bottom";
          var isHorizontal = me.isHorizontal();
          if (isHorizontal) {
            minSize.width = me.maxWidth;
          } else if (display) {
            minSize.width = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
          }
          if (!isHorizontal) {
            minSize.height = me.maxHeight;
          } else if (display) {
            minSize.height = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
          }
          if (tickOpts.display && display) {
            var tickFonts = parseTickFontOptions(tickOpts);
            var labelSizes = me._getLabelSizes();
            var firstLabelSize = labelSizes.first;
            var lastLabelSize = labelSizes.last;
            var widestLabelSize = labelSizes.widest;
            var highestLabelSize = labelSizes.highest;
            var lineSpace = tickFonts.minor.lineHeight * 0.4;
            var tickPadding = tickOpts.padding;
            if (isHorizontal) {
              var isRotated = me.labelRotation !== 0;
              var angleRadians = helpers$1.toRadians(me.labelRotation);
              var cosRotation = Math.cos(angleRadians);
              var sinRotation = Math.sin(angleRadians);
              var labelHeight = sinRotation * widestLabelSize.width + cosRotation * (highestLabelSize.height - (isRotated ? highestLabelSize.offset : 0)) + (isRotated ? 0 : lineSpace);
              minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);
              var offsetLeft = me.getPixelForTick(0) - me.left;
              var offsetRight = me.right - me.getPixelForTick(me.getTicks().length - 1);
              var paddingLeft, paddingRight;
              if (isRotated) {
                paddingLeft = isBottom ? cosRotation * firstLabelSize.width + sinRotation * firstLabelSize.offset : sinRotation * (firstLabelSize.height - firstLabelSize.offset);
                paddingRight = isBottom ? sinRotation * (lastLabelSize.height - lastLabelSize.offset) : cosRotation * lastLabelSize.width + sinRotation * lastLabelSize.offset;
              } else {
                paddingLeft = firstLabelSize.width / 2;
                paddingRight = lastLabelSize.width / 2;
              }
              me.paddingLeft = Math.max((paddingLeft - offsetLeft) * me.width / (me.width - offsetLeft), 0) + 3;
              me.paddingRight = Math.max((paddingRight - offsetRight) * me.width / (me.width - offsetRight), 0) + 3;
            } else {
              var labelWidth = tickOpts.mirror ? 0 : widestLabelSize.width + tickPadding + lineSpace;
              minSize.width = Math.min(me.maxWidth, minSize.width + labelWidth);
              me.paddingTop = firstLabelSize.height / 2;
              me.paddingBottom = lastLabelSize.height / 2;
            }
          }
          me.handleMargins();
          if (isHorizontal) {
            me.width = me._length = chart.width - me.margins.left - me.margins.right;
            me.height = minSize.height;
          } else {
            me.width = minSize.width;
            me.height = me._length = chart.height - me.margins.top - me.margins.bottom;
          }
        },
        handleMargins: function() {
          var me = this;
          if (me.margins) {
            me.margins.left = Math.max(me.paddingLeft, me.margins.left);
            me.margins.top = Math.max(me.paddingTop, me.margins.top);
            me.margins.right = Math.max(me.paddingRight, me.margins.right);
            me.margins.bottom = Math.max(me.paddingBottom, me.margins.bottom);
          }
        },
        afterFit: function() {
          helpers$1.callback(this.options.afterFit, [this]);
        },
        isHorizontal: function() {
          var pos = this.options.position;
          return pos === "top" || pos === "bottom";
        },
        isFullWidth: function() {
          return this.options.fullWidth;
        },
        getRightValue: function(rawValue) {
          if (isNullOrUndef(rawValue)) {
            return NaN;
          }
          if ((typeof rawValue === "number" || rawValue instanceof Number) && !isFinite(rawValue)) {
            return NaN;
          }
          if (rawValue) {
            if (this.isHorizontal()) {
              if (rawValue.x !== void 0) {
                return this.getRightValue(rawValue.x);
              }
            } else if (rawValue.y !== void 0) {
              return this.getRightValue(rawValue.y);
            }
          }
          return rawValue;
        },
        _convertTicksToLabels: function(ticks) {
          var me = this;
          var labels, i, ilen;
          me.ticks = ticks.map(function(tick2) {
            return tick2.value;
          });
          me.beforeTickToLabelConversion();
          labels = me.convertTicksToLabels(ticks) || me.ticks;
          me.afterTickToLabelConversion();
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            ticks[i].label = labels[i];
          }
          return labels;
        },
        _getLabelSizes: function() {
          var me = this;
          var labelSizes = me._labelSizes;
          if (!labelSizes) {
            me._labelSizes = labelSizes = computeLabelSizes(me.ctx, parseTickFontOptions(me.options.ticks), me.getTicks(), me.longestTextCache);
            me.longestLabelWidth = labelSizes.widest.width;
          }
          return labelSizes;
        },
        _parseValue: function(value) {
          var start, end, min, max;
          if (isArray(value)) {
            start = +this.getRightValue(value[0]);
            end = +this.getRightValue(value[1]);
            min = Math.min(start, end);
            max = Math.max(start, end);
          } else {
            value = +this.getRightValue(value);
            start = void 0;
            end = value;
            min = value;
            max = value;
          }
          return {
            min,
            max,
            start,
            end
          };
        },
        _getScaleLabel: function(rawValue) {
          var v = this._parseValue(rawValue);
          if (v.start !== void 0) {
            return "[" + v.start + ", " + v.end + "]";
          }
          return +this.getRightValue(rawValue);
        },
        getLabelForIndex: helpers$1.noop,
        getPixelForValue: helpers$1.noop,
        getValueForPixel: helpers$1.noop,
        getPixelForTick: function(index2) {
          var me = this;
          var offset = me.options.offset;
          var numTicks = me._ticks.length;
          var tickWidth = 1 / Math.max(numTicks - (offset ? 0 : 1), 1);
          return index2 < 0 || index2 > numTicks - 1 ? null : me.getPixelForDecimal(index2 * tickWidth + (offset ? tickWidth / 2 : 0));
        },
        getPixelForDecimal: function(decimal) {
          var me = this;
          if (me._reversePixels) {
            decimal = 1 - decimal;
          }
          return me._startPixel + decimal * me._length;
        },
        getDecimalForPixel: function(pixel) {
          var decimal = (pixel - this._startPixel) / this._length;
          return this._reversePixels ? 1 - decimal : decimal;
        },
        getBasePixel: function() {
          return this.getPixelForValue(this.getBaseValue());
        },
        getBaseValue: function() {
          var me = this;
          var min = me.min;
          var max = me.max;
          return me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
        },
        _autoSkip: function(ticks) {
          var me = this;
          var tickOpts = me.options.ticks;
          var axisLength = me._length;
          var ticksLimit = tickOpts.maxTicksLimit || axisLength / me._tickSize() + 1;
          var majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
          var numMajorIndices = majorIndices.length;
          var first = majorIndices[0];
          var last = majorIndices[numMajorIndices - 1];
          var i, ilen, spacing, avgMajorSpacing;
          if (numMajorIndices > ticksLimit) {
            skipMajors(ticks, majorIndices, numMajorIndices / ticksLimit);
            return nonSkipped(ticks);
          }
          spacing = calculateSpacing(majorIndices, ticks, axisLength, ticksLimit);
          if (numMajorIndices > 0) {
            for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
              skip(ticks, spacing, majorIndices[i], majorIndices[i + 1]);
            }
            avgMajorSpacing = numMajorIndices > 1 ? (last - first) / (numMajorIndices - 1) : null;
            skip(ticks, spacing, helpers$1.isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
            skip(ticks, spacing, last, helpers$1.isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
            return nonSkipped(ticks);
          }
          skip(ticks, spacing);
          return nonSkipped(ticks);
        },
        _tickSize: function() {
          var me = this;
          var optionTicks = me.options.ticks;
          var rot = helpers$1.toRadians(me.labelRotation);
          var cos = Math.abs(Math.cos(rot));
          var sin = Math.abs(Math.sin(rot));
          var labelSizes = me._getLabelSizes();
          var padding = optionTicks.autoSkipPadding || 0;
          var w = labelSizes ? labelSizes.widest.width + padding : 0;
          var h = labelSizes ? labelSizes.highest.height + padding : 0;
          return me.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
        },
        _isVisible: function() {
          var me = this;
          var chart = me.chart;
          var display = me.options.display;
          var i, ilen, meta;
          if (display !== "auto") {
            return !!display;
          }
          for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
            if (chart.isDatasetVisible(i)) {
              meta = chart.getDatasetMeta(i);
              if (meta.xAxisID === me.id || meta.yAxisID === me.id) {
                return true;
              }
            }
          }
          return false;
        },
        _computeGridLineItems: function(chartArea) {
          var me = this;
          var chart = me.chart;
          var options3 = me.options;
          var gridLines = options3.gridLines;
          var position = options3.position;
          var offsetGridLines = gridLines.offsetGridLines;
          var isHorizontal = me.isHorizontal();
          var ticks = me._ticksToDraw;
          var ticksLength = ticks.length + (offsetGridLines ? 1 : 0);
          var tl = getTickMarkLength(gridLines);
          var items = [];
          var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
          var axisHalfWidth = axisWidth / 2;
          var alignPixel = helpers$1._alignPixel;
          var alignBorderValue = function(pixel) {
            return alignPixel(chart, pixel, axisWidth);
          };
          var borderValue, i, tick2, lineValue, alignedLineValue;
          var tx1, ty1, tx2, ty2, x1, y1, x2, y2, lineWidth, lineColor, borderDash, borderDashOffset;
          if (position === "top") {
            borderValue = alignBorderValue(me.bottom);
            ty1 = me.bottom - tl;
            ty2 = borderValue - axisHalfWidth;
            y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
            y2 = chartArea.bottom;
          } else if (position === "bottom") {
            borderValue = alignBorderValue(me.top);
            y1 = chartArea.top;
            y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
            ty1 = borderValue + axisHalfWidth;
            ty2 = me.top + tl;
          } else if (position === "left") {
            borderValue = alignBorderValue(me.right);
            tx1 = me.right - tl;
            tx2 = borderValue - axisHalfWidth;
            x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
            x2 = chartArea.right;
          } else {
            borderValue = alignBorderValue(me.left);
            x1 = chartArea.left;
            x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
            tx1 = borderValue + axisHalfWidth;
            tx2 = me.left + tl;
          }
          for (i = 0; i < ticksLength; ++i) {
            tick2 = ticks[i] || {};
            if (isNullOrUndef(tick2.label) && i < ticks.length) {
              continue;
            }
            if (i === me.zeroLineIndex && options3.offset === offsetGridLines) {
              lineWidth = gridLines.zeroLineWidth;
              lineColor = gridLines.zeroLineColor;
              borderDash = gridLines.zeroLineBorderDash || [];
              borderDashOffset = gridLines.zeroLineBorderDashOffset || 0;
            } else {
              lineWidth = valueAtIndexOrDefault(gridLines.lineWidth, i, 1);
              lineColor = valueAtIndexOrDefault(gridLines.color, i, "rgba(0,0,0,0.1)");
              borderDash = gridLines.borderDash || [];
              borderDashOffset = gridLines.borderDashOffset || 0;
            }
            lineValue = getPixelForGridLine(me, tick2._index || i, offsetGridLines);
            if (lineValue === void 0) {
              continue;
            }
            alignedLineValue = alignPixel(chart, lineValue, lineWidth);
            if (isHorizontal) {
              tx1 = tx2 = x1 = x2 = alignedLineValue;
            } else {
              ty1 = ty2 = y1 = y2 = alignedLineValue;
            }
            items.push({
              tx1,
              ty1,
              tx2,
              ty2,
              x1,
              y1,
              x2,
              y2,
              width: lineWidth,
              color: lineColor,
              borderDash,
              borderDashOffset
            });
          }
          items.ticksLength = ticksLength;
          items.borderValue = borderValue;
          return items;
        },
        _computeLabelItems: function() {
          var me = this;
          var options3 = me.options;
          var optionTicks = options3.ticks;
          var position = options3.position;
          var isMirrored = optionTicks.mirror;
          var isHorizontal = me.isHorizontal();
          var ticks = me._ticksToDraw;
          var fonts = parseTickFontOptions(optionTicks);
          var tickPadding = optionTicks.padding;
          var tl = getTickMarkLength(options3.gridLines);
          var rotation = -helpers$1.toRadians(me.labelRotation);
          var items = [];
          var i, ilen, tick2, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
          if (position === "top") {
            y = me.bottom - tl - tickPadding;
            textAlign = !rotation ? "center" : "left";
          } else if (position === "bottom") {
            y = me.top + tl + tickPadding;
            textAlign = !rotation ? "center" : "right";
          } else if (position === "left") {
            x = me.right - (isMirrored ? 0 : tl) - tickPadding;
            textAlign = isMirrored ? "left" : "right";
          } else {
            x = me.left + (isMirrored ? 0 : tl) + tickPadding;
            textAlign = isMirrored ? "right" : "left";
          }
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            tick2 = ticks[i];
            label = tick2.label;
            if (isNullOrUndef(label)) {
              continue;
            }
            pixel = me.getPixelForTick(tick2._index || i) + optionTicks.labelOffset;
            font = tick2.major ? fonts.major : fonts.minor;
            lineHeight = font.lineHeight;
            lineCount = isArray(label) ? label.length : 1;
            if (isHorizontal) {
              x = pixel;
              textOffset = position === "top" ? ((!rotation ? 0.5 : 1) - lineCount) * lineHeight : (!rotation ? 0.5 : 0) * lineHeight;
            } else {
              y = pixel;
              textOffset = (1 - lineCount) * lineHeight / 2;
            }
            items.push({
              x,
              y,
              rotation,
              label,
              font,
              textOffset,
              textAlign
            });
          }
          return items;
        },
        _drawGrid: function(chartArea) {
          var me = this;
          var gridLines = me.options.gridLines;
          if (!gridLines.display) {
            return;
          }
          var ctx = me.ctx;
          var chart = me.chart;
          var alignPixel = helpers$1._alignPixel;
          var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
          var items = me._gridLineItems || (me._gridLineItems = me._computeGridLineItems(chartArea));
          var width, color, i, ilen, item;
          for (i = 0, ilen = items.length; i < ilen; ++i) {
            item = items[i];
            width = item.width;
            color = item.color;
            if (width && color) {
              ctx.save();
              ctx.lineWidth = width;
              ctx.strokeStyle = color;
              if (ctx.setLineDash) {
                ctx.setLineDash(item.borderDash);
                ctx.lineDashOffset = item.borderDashOffset;
              }
              ctx.beginPath();
              if (gridLines.drawTicks) {
                ctx.moveTo(item.tx1, item.ty1);
                ctx.lineTo(item.tx2, item.ty2);
              }
              if (gridLines.drawOnChartArea) {
                ctx.moveTo(item.x1, item.y1);
                ctx.lineTo(item.x2, item.y2);
              }
              ctx.stroke();
              ctx.restore();
            }
          }
          if (axisWidth) {
            var firstLineWidth = axisWidth;
            var lastLineWidth = valueAtIndexOrDefault(gridLines.lineWidth, items.ticksLength - 1, 1);
            var borderValue = items.borderValue;
            var x1, x2, y1, y2;
            if (me.isHorizontal()) {
              x1 = alignPixel(chart, me.left, firstLineWidth) - firstLineWidth / 2;
              x2 = alignPixel(chart, me.right, lastLineWidth) + lastLineWidth / 2;
              y1 = y2 = borderValue;
            } else {
              y1 = alignPixel(chart, me.top, firstLineWidth) - firstLineWidth / 2;
              y2 = alignPixel(chart, me.bottom, lastLineWidth) + lastLineWidth / 2;
              x1 = x2 = borderValue;
            }
            ctx.lineWidth = axisWidth;
            ctx.strokeStyle = valueAtIndexOrDefault(gridLines.color, 0);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        },
        _drawLabels: function() {
          var me = this;
          var optionTicks = me.options.ticks;
          if (!optionTicks.display) {
            return;
          }
          var ctx = me.ctx;
          var items = me._labelItems || (me._labelItems = me._computeLabelItems());
          var i, j, ilen, jlen, item, tickFont, label, y;
          for (i = 0, ilen = items.length; i < ilen; ++i) {
            item = items[i];
            tickFont = item.font;
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate(item.rotation);
            ctx.font = tickFont.string;
            ctx.fillStyle = tickFont.color;
            ctx.textBaseline = "middle";
            ctx.textAlign = item.textAlign;
            label = item.label;
            y = item.textOffset;
            if (isArray(label)) {
              for (j = 0, jlen = label.length; j < jlen; ++j) {
                ctx.fillText("" + label[j], 0, y);
                y += tickFont.lineHeight;
              }
            } else {
              ctx.fillText(label, 0, y);
            }
            ctx.restore();
          }
        },
        _drawTitle: function() {
          var me = this;
          var ctx = me.ctx;
          var options3 = me.options;
          var scaleLabel = options3.scaleLabel;
          if (!scaleLabel.display) {
            return;
          }
          var scaleLabelFontColor = valueOrDefault$a(scaleLabel.fontColor, core_defaults.global.defaultFontColor);
          var scaleLabelFont = helpers$1.options._parseFont(scaleLabel);
          var scaleLabelPadding = helpers$1.options.toPadding(scaleLabel.padding);
          var halfLineHeight = scaleLabelFont.lineHeight / 2;
          var position = options3.position;
          var rotation = 0;
          var scaleLabelX, scaleLabelY;
          if (me.isHorizontal()) {
            scaleLabelX = me.left + me.width / 2;
            scaleLabelY = position === "bottom" ? me.bottom - halfLineHeight - scaleLabelPadding.bottom : me.top + halfLineHeight + scaleLabelPadding.top;
          } else {
            var isLeft = position === "left";
            scaleLabelX = isLeft ? me.left + halfLineHeight + scaleLabelPadding.top : me.right - halfLineHeight - scaleLabelPadding.top;
            scaleLabelY = me.top + me.height / 2;
            rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
          }
          ctx.save();
          ctx.translate(scaleLabelX, scaleLabelY);
          ctx.rotate(rotation);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = scaleLabelFontColor;
          ctx.font = scaleLabelFont.string;
          ctx.fillText(scaleLabel.labelString, 0, 0);
          ctx.restore();
        },
        draw: function(chartArea) {
          var me = this;
          if (!me._isVisible()) {
            return;
          }
          me._drawGrid(chartArea);
          me._drawTitle();
          me._drawLabels();
        },
        _layers: function() {
          var me = this;
          var opts = me.options;
          var tz = opts.ticks && opts.ticks.z || 0;
          var gz = opts.gridLines && opts.gridLines.z || 0;
          if (!me._isVisible() || tz === gz || me.draw !== me._draw) {
            return [{
              z: tz,
              draw: function() {
                me.draw.apply(me, arguments);
              }
            }];
          }
          return [{
            z: gz,
            draw: function() {
              me._drawGrid.apply(me, arguments);
              me._drawTitle.apply(me, arguments);
            }
          }, {
            z: tz,
            draw: function() {
              me._drawLabels.apply(me, arguments);
            }
          }];
        },
        _getMatchingVisibleMetas: function(type) {
          var me = this;
          var isHorizontal = me.isHorizontal();
          return me.chart._getSortedVisibleDatasetMetas().filter(function(meta) {
            return (!type || meta.type === type) && (isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id);
          });
        }
      });
      Scale.prototype._draw = Scale.prototype.draw;
      var core_scale = Scale;
      var isNullOrUndef$1 = helpers$1.isNullOrUndef;
      var defaultConfig = {
        position: "bottom"
      };
      var scale_category = core_scale.extend({
        determineDataLimits: function() {
          var me = this;
          var labels = me._getLabels();
          var ticksOpts = me.options.ticks;
          var min = ticksOpts.min;
          var max = ticksOpts.max;
          var minIndex = 0;
          var maxIndex = labels.length - 1;
          var findIndex;
          if (min !== void 0) {
            findIndex = labels.indexOf(min);
            if (findIndex >= 0) {
              minIndex = findIndex;
            }
          }
          if (max !== void 0) {
            findIndex = labels.indexOf(max);
            if (findIndex >= 0) {
              maxIndex = findIndex;
            }
          }
          me.minIndex = minIndex;
          me.maxIndex = maxIndex;
          me.min = labels[minIndex];
          me.max = labels[maxIndex];
        },
        buildTicks: function() {
          var me = this;
          var labels = me._getLabels();
          var minIndex = me.minIndex;
          var maxIndex = me.maxIndex;
          me.ticks = minIndex === 0 && maxIndex === labels.length - 1 ? labels : labels.slice(minIndex, maxIndex + 1);
        },
        getLabelForIndex: function(index2, datasetIndex) {
          var me = this;
          var chart = me.chart;
          if (chart.getDatasetMeta(datasetIndex).controller._getValueScaleId() === me.id) {
            return me.getRightValue(chart.data.datasets[datasetIndex].data[index2]);
          }
          return me._getLabels()[index2];
        },
        _configure: function() {
          var me = this;
          var offset = me.options.offset;
          var ticks = me.ticks;
          core_scale.prototype._configure.call(me);
          if (!me.isHorizontal()) {
            me._reversePixels = !me._reversePixels;
          }
          if (!ticks) {
            return;
          }
          me._startValue = me.minIndex - (offset ? 0.5 : 0);
          me._valueRange = Math.max(ticks.length - (offset ? 0 : 1), 1);
        },
        getPixelForValue: function(value, index2, datasetIndex) {
          var me = this;
          var valueCategory, labels, idx;
          if (!isNullOrUndef$1(index2) && !isNullOrUndef$1(datasetIndex)) {
            value = me.chart.data.datasets[datasetIndex].data[index2];
          }
          if (!isNullOrUndef$1(value)) {
            valueCategory = me.isHorizontal() ? value.x : value.y;
          }
          if (valueCategory !== void 0 || value !== void 0 && isNaN(index2)) {
            labels = me._getLabels();
            value = helpers$1.valueOrDefault(valueCategory, value);
            idx = labels.indexOf(value);
            index2 = idx !== -1 ? idx : index2;
            if (isNaN(index2)) {
              index2 = value;
            }
          }
          return me.getPixelForDecimal((index2 - me._startValue) / me._valueRange);
        },
        getPixelForTick: function(index2) {
          var ticks = this.ticks;
          return index2 < 0 || index2 > ticks.length - 1 ? null : this.getPixelForValue(ticks[index2], index2 + this.minIndex);
        },
        getValueForPixel: function(pixel) {
          var me = this;
          var value = Math.round(me._startValue + me.getDecimalForPixel(pixel) * me._valueRange);
          return Math.min(Math.max(value, 0), me.ticks.length - 1);
        },
        getBasePixel: function() {
          return this.bottom;
        }
      });
      var _defaults = defaultConfig;
      scale_category._defaults = _defaults;
      var noop3 = helpers$1.noop;
      var isNullOrUndef$2 = helpers$1.isNullOrUndef;
      function generateTicks(generationOptions, dataRange) {
        var ticks = [];
        var MIN_SPACING = 1e-14;
        var stepSize = generationOptions.stepSize;
        var unit = stepSize || 1;
        var maxNumSpaces = generationOptions.maxTicks - 1;
        var min = generationOptions.min;
        var max = generationOptions.max;
        var precision = generationOptions.precision;
        var rmin = dataRange.min;
        var rmax = dataRange.max;
        var spacing = helpers$1.niceNum((rmax - rmin) / maxNumSpaces / unit) * unit;
        var factor, niceMin, niceMax, numSpaces;
        if (spacing < MIN_SPACING && isNullOrUndef$2(min) && isNullOrUndef$2(max)) {
          return [rmin, rmax];
        }
        numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
        if (numSpaces > maxNumSpaces) {
          spacing = helpers$1.niceNum(numSpaces * spacing / maxNumSpaces / unit) * unit;
        }
        if (stepSize || isNullOrUndef$2(precision)) {
          factor = Math.pow(10, helpers$1._decimalPlaces(spacing));
        } else {
          factor = Math.pow(10, precision);
          spacing = Math.ceil(spacing * factor) / factor;
        }
        niceMin = Math.floor(rmin / spacing) * spacing;
        niceMax = Math.ceil(rmax / spacing) * spacing;
        if (stepSize) {
          if (!isNullOrUndef$2(min) && helpers$1.almostWhole(min / spacing, spacing / 1e3)) {
            niceMin = min;
          }
          if (!isNullOrUndef$2(max) && helpers$1.almostWhole(max / spacing, spacing / 1e3)) {
            niceMax = max;
          }
        }
        numSpaces = (niceMax - niceMin) / spacing;
        if (helpers$1.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
          numSpaces = Math.round(numSpaces);
        } else {
          numSpaces = Math.ceil(numSpaces);
        }
        niceMin = Math.round(niceMin * factor) / factor;
        niceMax = Math.round(niceMax * factor) / factor;
        ticks.push(isNullOrUndef$2(min) ? niceMin : min);
        for (var j = 1; j < numSpaces; ++j) {
          ticks.push(Math.round((niceMin + j * spacing) * factor) / factor);
        }
        ticks.push(isNullOrUndef$2(max) ? niceMax : max);
        return ticks;
      }
      var scale_linearbase = core_scale.extend({
        getRightValue: function(value) {
          if (typeof value === "string") {
            return +value;
          }
          return core_scale.prototype.getRightValue.call(this, value);
        },
        handleTickRangeOptions: function() {
          var me = this;
          var opts = me.options;
          var tickOpts = opts.ticks;
          if (tickOpts.beginAtZero) {
            var minSign = helpers$1.sign(me.min);
            var maxSign = helpers$1.sign(me.max);
            if (minSign < 0 && maxSign < 0) {
              me.max = 0;
            } else if (minSign > 0 && maxSign > 0) {
              me.min = 0;
            }
          }
          var setMin = tickOpts.min !== void 0 || tickOpts.suggestedMin !== void 0;
          var setMax = tickOpts.max !== void 0 || tickOpts.suggestedMax !== void 0;
          if (tickOpts.min !== void 0) {
            me.min = tickOpts.min;
          } else if (tickOpts.suggestedMin !== void 0) {
            if (me.min === null) {
              me.min = tickOpts.suggestedMin;
            } else {
              me.min = Math.min(me.min, tickOpts.suggestedMin);
            }
          }
          if (tickOpts.max !== void 0) {
            me.max = tickOpts.max;
          } else if (tickOpts.suggestedMax !== void 0) {
            if (me.max === null) {
              me.max = tickOpts.suggestedMax;
            } else {
              me.max = Math.max(me.max, tickOpts.suggestedMax);
            }
          }
          if (setMin !== setMax) {
            if (me.min >= me.max) {
              if (setMin) {
                me.max = me.min + 1;
              } else {
                me.min = me.max - 1;
              }
            }
          }
          if (me.min === me.max) {
            me.max++;
            if (!tickOpts.beginAtZero) {
              me.min--;
            }
          }
        },
        getTickLimit: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          var stepSize = tickOpts.stepSize;
          var maxTicksLimit = tickOpts.maxTicksLimit;
          var maxTicks;
          if (stepSize) {
            maxTicks = Math.ceil(me.max / stepSize) - Math.floor(me.min / stepSize) + 1;
          } else {
            maxTicks = me._computeTickLimit();
            maxTicksLimit = maxTicksLimit || 11;
          }
          if (maxTicksLimit) {
            maxTicks = Math.min(maxTicksLimit, maxTicks);
          }
          return maxTicks;
        },
        _computeTickLimit: function() {
          return Number.POSITIVE_INFINITY;
        },
        handleDirectionalChanges: noop3,
        buildTicks: function() {
          var me = this;
          var opts = me.options;
          var tickOpts = opts.ticks;
          var maxTicks = me.getTickLimit();
          maxTicks = Math.max(2, maxTicks);
          var numericGeneratorOptions = {
            maxTicks,
            min: tickOpts.min,
            max: tickOpts.max,
            precision: tickOpts.precision,
            stepSize: helpers$1.valueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
          };
          var ticks = me.ticks = generateTicks(numericGeneratorOptions, me);
          me.handleDirectionalChanges();
          me.max = helpers$1.max(ticks);
          me.min = helpers$1.min(ticks);
          if (tickOpts.reverse) {
            ticks.reverse();
            me.start = me.max;
            me.end = me.min;
          } else {
            me.start = me.min;
            me.end = me.max;
          }
        },
        convertTicksToLabels: function() {
          var me = this;
          me.ticksAsNumbers = me.ticks.slice();
          me.zeroLineIndex = me.ticks.indexOf(0);
          core_scale.prototype.convertTicksToLabels.call(me);
        },
        _configure: function() {
          var me = this;
          var ticks = me.getTicks();
          var start = me.min;
          var end = me.max;
          var offset;
          core_scale.prototype._configure.call(me);
          if (me.options.offset && ticks.length) {
            offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
            start -= offset;
            end += offset;
          }
          me._startValue = start;
          me._endValue = end;
          me._valueRange = end - start;
        }
      });
      var defaultConfig$1 = {
        position: "left",
        ticks: {
          callback: core_ticks.formatters.linear
        }
      };
      var DEFAULT_MIN = 0;
      var DEFAULT_MAX = 1;
      function getOrCreateStack(stacks, stacked, meta) {
        var key = [
          meta.type,
          stacked === void 0 && meta.stack === void 0 ? meta.index : "",
          meta.stack
        ].join(".");
        if (stacks[key] === void 0) {
          stacks[key] = {
            pos: [],
            neg: []
          };
        }
        return stacks[key];
      }
      function stackData(scale2, stacks, meta, data) {
        var opts = scale2.options;
        var stacked = opts.stacked;
        var stack = getOrCreateStack(stacks, stacked, meta);
        var pos = stack.pos;
        var neg = stack.neg;
        var ilen = data.length;
        var i, value;
        for (i = 0; i < ilen; ++i) {
          value = scale2._parseValue(data[i]);
          if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
            continue;
          }
          pos[i] = pos[i] || 0;
          neg[i] = neg[i] || 0;
          if (opts.relativePoints) {
            pos[i] = 100;
          } else if (value.min < 0 || value.max < 0) {
            neg[i] += value.min;
          } else {
            pos[i] += value.max;
          }
        }
      }
      function updateMinMax(scale2, meta, data) {
        var ilen = data.length;
        var i, value;
        for (i = 0; i < ilen; ++i) {
          value = scale2._parseValue(data[i]);
          if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
            continue;
          }
          scale2.min = Math.min(scale2.min, value.min);
          scale2.max = Math.max(scale2.max, value.max);
        }
      }
      var scale_linear = scale_linearbase.extend({
        determineDataLimits: function() {
          var me = this;
          var opts = me.options;
          var chart = me.chart;
          var datasets = chart.data.datasets;
          var metasets = me._getMatchingVisibleMetas();
          var hasStacks = opts.stacked;
          var stacks = {};
          var ilen = metasets.length;
          var i, meta, data, values;
          me.min = Number.POSITIVE_INFINITY;
          me.max = Number.NEGATIVE_INFINITY;
          if (hasStacks === void 0) {
            for (i = 0; !hasStacks && i < ilen; ++i) {
              meta = metasets[i];
              hasStacks = meta.stack !== void 0;
            }
          }
          for (i = 0; i < ilen; ++i) {
            meta = metasets[i];
            data = datasets[meta.index].data;
            if (hasStacks) {
              stackData(me, stacks, meta, data);
            } else {
              updateMinMax(me, meta, data);
            }
          }
          helpers$1.each(stacks, function(stackValues) {
            values = stackValues.pos.concat(stackValues.neg);
            me.min = Math.min(me.min, helpers$1.min(values));
            me.max = Math.max(me.max, helpers$1.max(values));
          });
          me.min = helpers$1.isFinite(me.min) && !isNaN(me.min) ? me.min : DEFAULT_MIN;
          me.max = helpers$1.isFinite(me.max) && !isNaN(me.max) ? me.max : DEFAULT_MAX;
          me.handleTickRangeOptions();
        },
        _computeTickLimit: function() {
          var me = this;
          var tickFont;
          if (me.isHorizontal()) {
            return Math.ceil(me.width / 40);
          }
          tickFont = helpers$1.options._parseFont(me.options.ticks);
          return Math.ceil(me.height / tickFont.lineHeight);
        },
        handleDirectionalChanges: function() {
          if (!this.isHorizontal()) {
            this.ticks.reverse();
          }
        },
        getLabelForIndex: function(index2, datasetIndex) {
          return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index2]);
        },
        getPixelForValue: function(value) {
          var me = this;
          return me.getPixelForDecimal((+me.getRightValue(value) - me._startValue) / me._valueRange);
        },
        getValueForPixel: function(pixel) {
          return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
        },
        getPixelForTick: function(index2) {
          var ticks = this.ticksAsNumbers;
          if (index2 < 0 || index2 > ticks.length - 1) {
            return null;
          }
          return this.getPixelForValue(ticks[index2]);
        }
      });
      var _defaults$1 = defaultConfig$1;
      scale_linear._defaults = _defaults$1;
      var valueOrDefault$b = helpers$1.valueOrDefault;
      var log10 = helpers$1.math.log10;
      function generateTicks$1(generationOptions, dataRange) {
        var ticks = [];
        var tickVal = valueOrDefault$b(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
        var endExp = Math.floor(log10(dataRange.max));
        var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
        var exp, significand;
        if (tickVal === 0) {
          exp = Math.floor(log10(dataRange.minNotZero));
          significand = Math.floor(dataRange.minNotZero / Math.pow(10, exp));
          ticks.push(tickVal);
          tickVal = significand * Math.pow(10, exp);
        } else {
          exp = Math.floor(log10(tickVal));
          significand = Math.floor(tickVal / Math.pow(10, exp));
        }
        var precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
        do {
          ticks.push(tickVal);
          ++significand;
          if (significand === 10) {
            significand = 1;
            ++exp;
            precision = exp >= 0 ? 1 : precision;
          }
          tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
        } while (exp < endExp || exp === endExp && significand < endSignificand);
        var lastTick = valueOrDefault$b(generationOptions.max, tickVal);
        ticks.push(lastTick);
        return ticks;
      }
      var defaultConfig$2 = {
        position: "left",
        ticks: {
          callback: core_ticks.formatters.logarithmic
        }
      };
      function nonNegativeOrDefault(value, defaultValue) {
        return helpers$1.isFinite(value) && value >= 0 ? value : defaultValue;
      }
      var scale_logarithmic = core_scale.extend({
        determineDataLimits: function() {
          var me = this;
          var opts = me.options;
          var chart = me.chart;
          var datasets = chart.data.datasets;
          var isHorizontal = me.isHorizontal();
          function IDMatches(meta2) {
            return isHorizontal ? meta2.xAxisID === me.id : meta2.yAxisID === me.id;
          }
          var datasetIndex, meta, value, data, i, ilen;
          me.min = Number.POSITIVE_INFINITY;
          me.max = Number.NEGATIVE_INFINITY;
          me.minNotZero = Number.POSITIVE_INFINITY;
          var hasStacks = opts.stacked;
          if (hasStacks === void 0) {
            for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
              meta = chart.getDatasetMeta(datasetIndex);
              if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) && meta.stack !== void 0) {
                hasStacks = true;
                break;
              }
            }
          }
          if (opts.stacked || hasStacks) {
            var valuesPerStack = {};
            for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
              meta = chart.getDatasetMeta(datasetIndex);
              var key = [
                meta.type,
                opts.stacked === void 0 && meta.stack === void 0 ? datasetIndex : "",
                meta.stack
              ].join(".");
              if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                if (valuesPerStack[key] === void 0) {
                  valuesPerStack[key] = [];
                }
                data = datasets[datasetIndex].data;
                for (i = 0, ilen = data.length; i < ilen; i++) {
                  var values = valuesPerStack[key];
                  value = me._parseValue(data[i]);
                  if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
                    continue;
                  }
                  values[i] = values[i] || 0;
                  values[i] += value.max;
                }
              }
            }
            helpers$1.each(valuesPerStack, function(valuesForType) {
              if (valuesForType.length > 0) {
                var minVal = helpers$1.min(valuesForType);
                var maxVal = helpers$1.max(valuesForType);
                me.min = Math.min(me.min, minVal);
                me.max = Math.max(me.max, maxVal);
              }
            });
          } else {
            for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
              meta = chart.getDatasetMeta(datasetIndex);
              if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                data = datasets[datasetIndex].data;
                for (i = 0, ilen = data.length; i < ilen; i++) {
                  value = me._parseValue(data[i]);
                  if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
                    continue;
                  }
                  me.min = Math.min(value.min, me.min);
                  me.max = Math.max(value.max, me.max);
                  if (value.min !== 0) {
                    me.minNotZero = Math.min(value.min, me.minNotZero);
                  }
                }
              }
            }
          }
          me.min = helpers$1.isFinite(me.min) ? me.min : null;
          me.max = helpers$1.isFinite(me.max) ? me.max : null;
          me.minNotZero = helpers$1.isFinite(me.minNotZero) ? me.minNotZero : null;
          this.handleTickRangeOptions();
        },
        handleTickRangeOptions: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          var DEFAULT_MIN2 = 1;
          var DEFAULT_MAX2 = 10;
          me.min = nonNegativeOrDefault(tickOpts.min, me.min);
          me.max = nonNegativeOrDefault(tickOpts.max, me.max);
          if (me.min === me.max) {
            if (me.min !== 0 && me.min !== null) {
              me.min = Math.pow(10, Math.floor(log10(me.min)) - 1);
              me.max = Math.pow(10, Math.floor(log10(me.max)) + 1);
            } else {
              me.min = DEFAULT_MIN2;
              me.max = DEFAULT_MAX2;
            }
          }
          if (me.min === null) {
            me.min = Math.pow(10, Math.floor(log10(me.max)) - 1);
          }
          if (me.max === null) {
            me.max = me.min !== 0 ? Math.pow(10, Math.floor(log10(me.min)) + 1) : DEFAULT_MAX2;
          }
          if (me.minNotZero === null) {
            if (me.min > 0) {
              me.minNotZero = me.min;
            } else if (me.max < 1) {
              me.minNotZero = Math.pow(10, Math.floor(log10(me.max)));
            } else {
              me.minNotZero = DEFAULT_MIN2;
            }
          }
        },
        buildTicks: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          var reverse = !me.isHorizontal();
          var generationOptions = {
            min: nonNegativeOrDefault(tickOpts.min),
            max: nonNegativeOrDefault(tickOpts.max)
          };
          var ticks = me.ticks = generateTicks$1(generationOptions, me);
          me.max = helpers$1.max(ticks);
          me.min = helpers$1.min(ticks);
          if (tickOpts.reverse) {
            reverse = !reverse;
            me.start = me.max;
            me.end = me.min;
          } else {
            me.start = me.min;
            me.end = me.max;
          }
          if (reverse) {
            ticks.reverse();
          }
        },
        convertTicksToLabels: function() {
          this.tickValues = this.ticks.slice();
          core_scale.prototype.convertTicksToLabels.call(this);
        },
        getLabelForIndex: function(index2, datasetIndex) {
          return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index2]);
        },
        getPixelForTick: function(index2) {
          var ticks = this.tickValues;
          if (index2 < 0 || index2 > ticks.length - 1) {
            return null;
          }
          return this.getPixelForValue(ticks[index2]);
        },
        _getFirstTickValue: function(value) {
          var exp = Math.floor(log10(value));
          var significand = Math.floor(value / Math.pow(10, exp));
          return significand * Math.pow(10, exp);
        },
        _configure: function() {
          var me = this;
          var start = me.min;
          var offset = 0;
          core_scale.prototype._configure.call(me);
          if (start === 0) {
            start = me._getFirstTickValue(me.minNotZero);
            offset = valueOrDefault$b(me.options.ticks.fontSize, core_defaults.global.defaultFontSize) / me._length;
          }
          me._startValue = log10(start);
          me._valueOffset = offset;
          me._valueRange = (log10(me.max) - log10(start)) / (1 - offset);
        },
        getPixelForValue: function(value) {
          var me = this;
          var decimal = 0;
          value = +me.getRightValue(value);
          if (value > me.min && value > 0) {
            decimal = (log10(value) - me._startValue) / me._valueRange + me._valueOffset;
          }
          return me.getPixelForDecimal(decimal);
        },
        getValueForPixel: function(pixel) {
          var me = this;
          var decimal = me.getDecimalForPixel(pixel);
          return decimal === 0 && me.min === 0 ? 0 : Math.pow(10, me._startValue + (decimal - me._valueOffset) * me._valueRange);
        }
      });
      var _defaults$2 = defaultConfig$2;
      scale_logarithmic._defaults = _defaults$2;
      var valueOrDefault$c = helpers$1.valueOrDefault;
      var valueAtIndexOrDefault$1 = helpers$1.valueAtIndexOrDefault;
      var resolve$4 = helpers$1.options.resolve;
      var defaultConfig$3 = {
        display: true,
        animate: true,
        position: "chartArea",
        angleLines: {
          display: true,
          color: "rgba(0,0,0,0.1)",
          lineWidth: 1,
          borderDash: [],
          borderDashOffset: 0
        },
        gridLines: {
          circular: false
        },
        ticks: {
          showLabelBackdrop: true,
          backdropColor: "rgba(255,255,255,0.75)",
          backdropPaddingY: 2,
          backdropPaddingX: 2,
          callback: core_ticks.formatters.linear
        },
        pointLabels: {
          display: true,
          fontSize: 10,
          callback: function(label) {
            return label;
          }
        }
      };
      function getTickBackdropHeight(opts) {
        var tickOpts = opts.ticks;
        if (tickOpts.display && opts.display) {
          return valueOrDefault$c(tickOpts.fontSize, core_defaults.global.defaultFontSize) + tickOpts.backdropPaddingY * 2;
        }
        return 0;
      }
      function measureLabelSize(ctx, lineHeight, label) {
        if (helpers$1.isArray(label)) {
          return {
            w: helpers$1.longestText(ctx, ctx.font, label),
            h: label.length * lineHeight
          };
        }
        return {
          w: ctx.measureText(label).width,
          h: lineHeight
        };
      }
      function determineLimits(angle, pos, size, min, max) {
        if (angle === min || angle === max) {
          return {
            start: pos - size / 2,
            end: pos + size / 2
          };
        } else if (angle < min || angle > max) {
          return {
            start: pos - size,
            end: pos
          };
        }
        return {
          start: pos,
          end: pos + size
        };
      }
      function fitWithPointLabels(scale2) {
        var plFont = helpers$1.options._parseFont(scale2.options.pointLabels);
        var furthestLimits = {
          l: 0,
          r: scale2.width,
          t: 0,
          b: scale2.height - scale2.paddingTop
        };
        var furthestAngles = {};
        var i, textSize, pointPosition;
        scale2.ctx.font = plFont.string;
        scale2._pointLabelSizes = [];
        var valueCount = scale2.chart.data.labels.length;
        for (i = 0; i < valueCount; i++) {
          pointPosition = scale2.getPointPosition(i, scale2.drawingArea + 5);
          textSize = measureLabelSize(scale2.ctx, plFont.lineHeight, scale2.pointLabels[i]);
          scale2._pointLabelSizes[i] = textSize;
          var angleRadians = scale2.getIndexAngle(i);
          var angle = helpers$1.toDegrees(angleRadians) % 360;
          var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
          var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
          if (hLimits.start < furthestLimits.l) {
            furthestLimits.l = hLimits.start;
            furthestAngles.l = angleRadians;
          }
          if (hLimits.end > furthestLimits.r) {
            furthestLimits.r = hLimits.end;
            furthestAngles.r = angleRadians;
          }
          if (vLimits.start < furthestLimits.t) {
            furthestLimits.t = vLimits.start;
            furthestAngles.t = angleRadians;
          }
          if (vLimits.end > furthestLimits.b) {
            furthestLimits.b = vLimits.end;
            furthestAngles.b = angleRadians;
          }
        }
        scale2.setReductions(scale2.drawingArea, furthestLimits, furthestAngles);
      }
      function getTextAlignForAngle(angle) {
        if (angle === 0 || angle === 180) {
          return "center";
        } else if (angle < 180) {
          return "left";
        }
        return "right";
      }
      function fillText(ctx, text, position, lineHeight) {
        var y = position.y + lineHeight / 2;
        var i, ilen;
        if (helpers$1.isArray(text)) {
          for (i = 0, ilen = text.length; i < ilen; ++i) {
            ctx.fillText(text[i], position.x, y);
            y += lineHeight;
          }
        } else {
          ctx.fillText(text, position.x, y);
        }
      }
      function adjustPointPositionForLabelHeight(angle, textSize, position) {
        if (angle === 90 || angle === 270) {
          position.y -= textSize.h / 2;
        } else if (angle > 270 || angle < 90) {
          position.y -= textSize.h;
        }
      }
      function drawPointLabels(scale2) {
        var ctx = scale2.ctx;
        var opts = scale2.options;
        var pointLabelOpts = opts.pointLabels;
        var tickBackdropHeight = getTickBackdropHeight(opts);
        var outerDistance = scale2.getDistanceFromCenterForValue(opts.ticks.reverse ? scale2.min : scale2.max);
        var plFont = helpers$1.options._parseFont(pointLabelOpts);
        ctx.save();
        ctx.font = plFont.string;
        ctx.textBaseline = "middle";
        for (var i = scale2.chart.data.labels.length - 1; i >= 0; i--) {
          var extra = i === 0 ? tickBackdropHeight / 2 : 0;
          var pointLabelPosition = scale2.getPointPosition(i, outerDistance + extra + 5);
          var pointLabelFontColor = valueAtIndexOrDefault$1(pointLabelOpts.fontColor, i, core_defaults.global.defaultFontColor);
          ctx.fillStyle = pointLabelFontColor;
          var angleRadians = scale2.getIndexAngle(i);
          var angle = helpers$1.toDegrees(angleRadians);
          ctx.textAlign = getTextAlignForAngle(angle);
          adjustPointPositionForLabelHeight(angle, scale2._pointLabelSizes[i], pointLabelPosition);
          fillText(ctx, scale2.pointLabels[i], pointLabelPosition, plFont.lineHeight);
        }
        ctx.restore();
      }
      function drawRadiusLine(scale2, gridLineOpts, radius, index2) {
        var ctx = scale2.ctx;
        var circular = gridLineOpts.circular;
        var valueCount = scale2.chart.data.labels.length;
        var lineColor = valueAtIndexOrDefault$1(gridLineOpts.color, index2 - 1);
        var lineWidth = valueAtIndexOrDefault$1(gridLineOpts.lineWidth, index2 - 1);
        var pointPosition;
        if (!circular && !valueCount || !lineColor || !lineWidth) {
          return;
        }
        ctx.save();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        if (ctx.setLineDash) {
          ctx.setLineDash(gridLineOpts.borderDash || []);
          ctx.lineDashOffset = gridLineOpts.borderDashOffset || 0;
        }
        ctx.beginPath();
        if (circular) {
          ctx.arc(scale2.xCenter, scale2.yCenter, radius, 0, Math.PI * 2);
        } else {
          pointPosition = scale2.getPointPosition(0, radius);
          ctx.moveTo(pointPosition.x, pointPosition.y);
          for (var i = 1; i < valueCount; i++) {
            pointPosition = scale2.getPointPosition(i, radius);
            ctx.lineTo(pointPosition.x, pointPosition.y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      function numberOrZero(param) {
        return helpers$1.isNumber(param) ? param : 0;
      }
      var scale_radialLinear = scale_linearbase.extend({
        setDimensions: function() {
          var me = this;
          me.width = me.maxWidth;
          me.height = me.maxHeight;
          me.paddingTop = getTickBackdropHeight(me.options) / 2;
          me.xCenter = Math.floor(me.width / 2);
          me.yCenter = Math.floor((me.height - me.paddingTop) / 2);
          me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2;
        },
        determineDataLimits: function() {
          var me = this;
          var chart = me.chart;
          var min = Number.POSITIVE_INFINITY;
          var max = Number.NEGATIVE_INFINITY;
          helpers$1.each(chart.data.datasets, function(dataset, datasetIndex) {
            if (chart.isDatasetVisible(datasetIndex)) {
              var meta = chart.getDatasetMeta(datasetIndex);
              helpers$1.each(dataset.data, function(rawValue, index2) {
                var value = +me.getRightValue(rawValue);
                if (isNaN(value) || meta.data[index2].hidden) {
                  return;
                }
                min = Math.min(value, min);
                max = Math.max(value, max);
              });
            }
          });
          me.min = min === Number.POSITIVE_INFINITY ? 0 : min;
          me.max = max === Number.NEGATIVE_INFINITY ? 0 : max;
          me.handleTickRangeOptions();
        },
        _computeTickLimit: function() {
          return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
        },
        convertTicksToLabels: function() {
          var me = this;
          scale_linearbase.prototype.convertTicksToLabels.call(me);
          me.pointLabels = me.chart.data.labels.map(function() {
            var label = helpers$1.callback(me.options.pointLabels.callback, arguments, me);
            return label || label === 0 ? label : "";
          });
        },
        getLabelForIndex: function(index2, datasetIndex) {
          return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index2]);
        },
        fit: function() {
          var me = this;
          var opts = me.options;
          if (opts.display && opts.pointLabels.display) {
            fitWithPointLabels(me);
          } else {
            me.setCenterPoint(0, 0, 0, 0);
          }
        },
        setReductions: function(largestPossibleRadius, furthestLimits, furthestAngles) {
          var me = this;
          var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
          var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
          var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
          var radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b);
          radiusReductionLeft = numberOrZero(radiusReductionLeft);
          radiusReductionRight = numberOrZero(radiusReductionRight);
          radiusReductionTop = numberOrZero(radiusReductionTop);
          radiusReductionBottom = numberOrZero(radiusReductionBottom);
          me.drawingArea = Math.min(Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2), Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2));
          me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
        },
        setCenterPoint: function(leftMovement, rightMovement, topMovement, bottomMovement) {
          var me = this;
          var maxRight = me.width - rightMovement - me.drawingArea;
          var maxLeft = leftMovement + me.drawingArea;
          var maxTop = topMovement + me.drawingArea;
          var maxBottom = me.height - me.paddingTop - bottomMovement - me.drawingArea;
          me.xCenter = Math.floor((maxLeft + maxRight) / 2 + me.left);
          me.yCenter = Math.floor((maxTop + maxBottom) / 2 + me.top + me.paddingTop);
        },
        getIndexAngle: function(index2) {
          var chart = this.chart;
          var angleMultiplier = 360 / chart.data.labels.length;
          var options3 = chart.options || {};
          var startAngle = options3.startAngle || 0;
          var angle = (index2 * angleMultiplier + startAngle) % 360;
          return (angle < 0 ? angle + 360 : angle) * Math.PI * 2 / 360;
        },
        getDistanceFromCenterForValue: function(value) {
          var me = this;
          if (helpers$1.isNullOrUndef(value)) {
            return NaN;
          }
          var scalingFactor = me.drawingArea / (me.max - me.min);
          if (me.options.ticks.reverse) {
            return (me.max - value) * scalingFactor;
          }
          return (value - me.min) * scalingFactor;
        },
        getPointPosition: function(index2, distanceFromCenter) {
          var me = this;
          var thisAngle = me.getIndexAngle(index2) - Math.PI / 2;
          return {
            x: Math.cos(thisAngle) * distanceFromCenter + me.xCenter,
            y: Math.sin(thisAngle) * distanceFromCenter + me.yCenter
          };
        },
        getPointPositionForValue: function(index2, value) {
          return this.getPointPosition(index2, this.getDistanceFromCenterForValue(value));
        },
        getBasePosition: function(index2) {
          var me = this;
          var min = me.min;
          var max = me.max;
          return me.getPointPositionForValue(index2 || 0, me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
        },
        _drawGrid: function() {
          var me = this;
          var ctx = me.ctx;
          var opts = me.options;
          var gridLineOpts = opts.gridLines;
          var angleLineOpts = opts.angleLines;
          var lineWidth = valueOrDefault$c(angleLineOpts.lineWidth, gridLineOpts.lineWidth);
          var lineColor = valueOrDefault$c(angleLineOpts.color, gridLineOpts.color);
          var i, offset, position;
          if (opts.pointLabels.display) {
            drawPointLabels(me);
          }
          if (gridLineOpts.display) {
            helpers$1.each(me.ticks, function(label, index2) {
              if (index2 !== 0) {
                offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index2]);
                drawRadiusLine(me, gridLineOpts, offset, index2);
              }
            });
          }
          if (angleLineOpts.display && lineWidth && lineColor) {
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            if (ctx.setLineDash) {
              ctx.setLineDash(resolve$4([angleLineOpts.borderDash, gridLineOpts.borderDash, []]));
              ctx.lineDashOffset = resolve$4([angleLineOpts.borderDashOffset, gridLineOpts.borderDashOffset, 0]);
            }
            for (i = me.chart.data.labels.length - 1; i >= 0; i--) {
              offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max);
              position = me.getPointPosition(i, offset);
              ctx.beginPath();
              ctx.moveTo(me.xCenter, me.yCenter);
              ctx.lineTo(position.x, position.y);
              ctx.stroke();
            }
            ctx.restore();
          }
        },
        _drawLabels: function() {
          var me = this;
          var ctx = me.ctx;
          var opts = me.options;
          var tickOpts = opts.ticks;
          if (!tickOpts.display) {
            return;
          }
          var startAngle = me.getIndexAngle(0);
          var tickFont = helpers$1.options._parseFont(tickOpts);
          var tickFontColor = valueOrDefault$c(tickOpts.fontColor, core_defaults.global.defaultFontColor);
          var offset, width;
          ctx.save();
          ctx.font = tickFont.string;
          ctx.translate(me.xCenter, me.yCenter);
          ctx.rotate(startAngle);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          helpers$1.each(me.ticks, function(label, index2) {
            if (index2 === 0 && !tickOpts.reverse) {
              return;
            }
            offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index2]);
            if (tickOpts.showLabelBackdrop) {
              width = ctx.measureText(label).width;
              ctx.fillStyle = tickOpts.backdropColor;
              ctx.fillRect(-width / 2 - tickOpts.backdropPaddingX, -offset - tickFont.size / 2 - tickOpts.backdropPaddingY, width + tickOpts.backdropPaddingX * 2, tickFont.size + tickOpts.backdropPaddingY * 2);
            }
            ctx.fillStyle = tickFontColor;
            ctx.fillText(label, 0, -offset);
          });
          ctx.restore();
        },
        _drawTitle: helpers$1.noop
      });
      var _defaults$3 = defaultConfig$3;
      scale_radialLinear._defaults = _defaults$3;
      var deprecated$1 = helpers$1._deprecated;
      var resolve$5 = helpers$1.options.resolve;
      var valueOrDefault$d = helpers$1.valueOrDefault;
      var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
      var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
      var INTERVALS = {
        millisecond: {
          common: true,
          size: 1,
          steps: 1e3
        },
        second: {
          common: true,
          size: 1e3,
          steps: 60
        },
        minute: {
          common: true,
          size: 6e4,
          steps: 60
        },
        hour: {
          common: true,
          size: 36e5,
          steps: 24
        },
        day: {
          common: true,
          size: 864e5,
          steps: 30
        },
        week: {
          common: false,
          size: 6048e5,
          steps: 4
        },
        month: {
          common: true,
          size: 2628e6,
          steps: 12
        },
        quarter: {
          common: false,
          size: 7884e6,
          steps: 4
        },
        year: {
          common: true,
          size: 3154e7
        }
      };
      var UNITS = Object.keys(INTERVALS);
      function sorter(a, b) {
        return a - b;
      }
      function arrayUnique(items) {
        var hash2 = {};
        var out = [];
        var i, ilen, item;
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          item = items[i];
          if (!hash2[item]) {
            hash2[item] = true;
            out.push(item);
          }
        }
        return out;
      }
      function getMin(options3) {
        return helpers$1.valueOrDefault(options3.time.min, options3.ticks.min);
      }
      function getMax(options3) {
        return helpers$1.valueOrDefault(options3.time.max, options3.ticks.max);
      }
      function buildLookupTable(timestamps, min, max, distribution) {
        if (distribution === "linear" || !timestamps.length) {
          return [
            {time: min, pos: 0},
            {time: max, pos: 1}
          ];
        }
        var table = [];
        var items = [min];
        var i, ilen, prev, curr, next;
        for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
          curr = timestamps[i];
          if (curr > min && curr < max) {
            items.push(curr);
          }
        }
        items.push(max);
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          next = items[i + 1];
          prev = items[i - 1];
          curr = items[i];
          if (prev === void 0 || next === void 0 || Math.round((next + prev) / 2) !== curr) {
            table.push({time: curr, pos: i / (ilen - 1)});
          }
        }
        return table;
      }
      function lookup(table, key, value) {
        var lo = 0;
        var hi = table.length - 1;
        var mid, i0, i1;
        while (lo >= 0 && lo <= hi) {
          mid = lo + hi >> 1;
          i0 = table[mid - 1] || null;
          i1 = table[mid];
          if (!i0) {
            return {lo: null, hi: i1};
          } else if (i1[key] < value) {
            lo = mid + 1;
          } else if (i0[key] > value) {
            hi = mid - 1;
          } else {
            return {lo: i0, hi: i1};
          }
        }
        return {lo: i1, hi: null};
      }
      function interpolate$1(table, skey, sval, tkey) {
        var range = lookup(table, skey, sval);
        var prev = !range.lo ? table[0] : !range.hi ? table[table.length - 2] : range.lo;
        var next = !range.lo ? table[1] : !range.hi ? table[table.length - 1] : range.hi;
        var span = next[skey] - prev[skey];
        var ratio = span ? (sval - prev[skey]) / span : 0;
        var offset = (next[tkey] - prev[tkey]) * ratio;
        return prev[tkey] + offset;
      }
      function toTimestamp(scale2, input) {
        var adapter = scale2._adapter;
        var options3 = scale2.options.time;
        var parser = options3.parser;
        var format2 = parser || options3.format;
        var value = input;
        if (typeof parser === "function") {
          value = parser(value);
        }
        if (!helpers$1.isFinite(value)) {
          value = typeof format2 === "string" ? adapter.parse(value, format2) : adapter.parse(value);
        }
        if (value !== null) {
          return +value;
        }
        if (!parser && typeof format2 === "function") {
          value = format2(input);
          if (!helpers$1.isFinite(value)) {
            value = adapter.parse(value);
          }
        }
        return value;
      }
      function parse(scale2, input) {
        if (helpers$1.isNullOrUndef(input)) {
          return null;
        }
        var options3 = scale2.options.time;
        var value = toTimestamp(scale2, scale2.getRightValue(input));
        if (value === null) {
          return value;
        }
        if (options3.round) {
          value = +scale2._adapter.startOf(value, options3.round);
        }
        return value;
      }
      function determineUnitForAutoTicks(minUnit, min, max, capacity) {
        var ilen = UNITS.length;
        var i, interval, factor;
        for (i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
          interval = INTERVALS[UNITS[i]];
          factor = interval.steps ? interval.steps : MAX_INTEGER;
          if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
            return UNITS[i];
          }
        }
        return UNITS[ilen - 1];
      }
      function determineUnitForFormatting(scale2, numTicks, minUnit, min, max) {
        var i, unit;
        for (i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
          unit = UNITS[i];
          if (INTERVALS[unit].common && scale2._adapter.diff(max, min, unit) >= numTicks - 1) {
            return unit;
          }
        }
        return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
      }
      function determineMajorUnit(unit) {
        for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
          if (INTERVALS[UNITS[i]].common) {
            return UNITS[i];
          }
        }
      }
      function generate(scale2, min, max, capacity) {
        var adapter = scale2._adapter;
        var options3 = scale2.options;
        var timeOpts = options3.time;
        var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
        var stepSize = resolve$5([timeOpts.stepSize, timeOpts.unitStepSize, 1]);
        var weekday = minor === "week" ? timeOpts.isoWeekday : false;
        var first = min;
        var ticks = [];
        var time;
        if (weekday) {
          first = +adapter.startOf(first, "isoWeek", weekday);
        }
        first = +adapter.startOf(first, weekday ? "day" : minor);
        if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
          throw min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor;
        }
        for (time = first; time < max; time = +adapter.add(time, stepSize, minor)) {
          ticks.push(time);
        }
        if (time === max || options3.bounds === "ticks") {
          ticks.push(time);
        }
        return ticks;
      }
      function computeOffsets(table, ticks, min, max, options3) {
        var start = 0;
        var end = 0;
        var first, last;
        if (options3.offset && ticks.length) {
          first = interpolate$1(table, "time", ticks[0], "pos");
          if (ticks.length === 1) {
            start = 1 - first;
          } else {
            start = (interpolate$1(table, "time", ticks[1], "pos") - first) / 2;
          }
          last = interpolate$1(table, "time", ticks[ticks.length - 1], "pos");
          if (ticks.length === 1) {
            end = last;
          } else {
            end = (last - interpolate$1(table, "time", ticks[ticks.length - 2], "pos")) / 2;
          }
        }
        return {start, end, factor: 1 / (start + 1 + end)};
      }
      function setMajorTicks(scale2, ticks, map, majorUnit) {
        var adapter = scale2._adapter;
        var first = +adapter.startOf(ticks[0].value, majorUnit);
        var last = ticks[ticks.length - 1].value;
        var major, index2;
        for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
          index2 = map[major];
          if (index2 >= 0) {
            ticks[index2].major = true;
          }
        }
        return ticks;
      }
      function ticksFromTimestamps(scale2, values, majorUnit) {
        var ticks = [];
        var map = {};
        var ilen = values.length;
        var i, value;
        for (i = 0; i < ilen; ++i) {
          value = values[i];
          map[value] = i;
          ticks.push({
            value,
            major: false
          });
        }
        return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale2, ticks, map, majorUnit);
      }
      var defaultConfig$4 = {
        position: "bottom",
        distribution: "linear",
        bounds: "data",
        adapters: {},
        time: {
          parser: false,
          unit: false,
          round: false,
          displayFormat: false,
          isoWeekday: false,
          minUnit: "millisecond",
          displayFormats: {}
        },
        ticks: {
          autoSkip: false,
          source: "auto",
          major: {
            enabled: false
          }
        }
      };
      var scale_time = core_scale.extend({
        initialize: function() {
          this.mergeTicksOptions();
          core_scale.prototype.initialize.call(this);
        },
        update: function() {
          var me = this;
          var options3 = me.options;
          var time = options3.time || (options3.time = {});
          var adapter = me._adapter = new core_adapters._date(options3.adapters.date);
          deprecated$1("time scale", time.format, "time.format", "time.parser");
          deprecated$1("time scale", time.min, "time.min", "ticks.min");
          deprecated$1("time scale", time.max, "time.max", "ticks.max");
          helpers$1.mergeIf(time.displayFormats, adapter.formats());
          return core_scale.prototype.update.apply(me, arguments);
        },
        getRightValue: function(rawValue) {
          if (rawValue && rawValue.t !== void 0) {
            rawValue = rawValue.t;
          }
          return core_scale.prototype.getRightValue.call(this, rawValue);
        },
        determineDataLimits: function() {
          var me = this;
          var chart = me.chart;
          var adapter = me._adapter;
          var options3 = me.options;
          var unit = options3.time.unit || "day";
          var min = MAX_INTEGER;
          var max = MIN_INTEGER;
          var timestamps = [];
          var datasets = [];
          var labels = [];
          var i, j, ilen, jlen, data, timestamp, labelsAdded;
          var dataLabels = me._getLabels();
          for (i = 0, ilen = dataLabels.length; i < ilen; ++i) {
            labels.push(parse(me, dataLabels[i]));
          }
          for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
            if (chart.isDatasetVisible(i)) {
              data = chart.data.datasets[i].data;
              if (helpers$1.isObject(data[0])) {
                datasets[i] = [];
                for (j = 0, jlen = data.length; j < jlen; ++j) {
                  timestamp = parse(me, data[j]);
                  timestamps.push(timestamp);
                  datasets[i][j] = timestamp;
                }
              } else {
                datasets[i] = labels.slice(0);
                if (!labelsAdded) {
                  timestamps = timestamps.concat(labels);
                  labelsAdded = true;
                }
              }
            } else {
              datasets[i] = [];
            }
          }
          if (labels.length) {
            min = Math.min(min, labels[0]);
            max = Math.max(max, labels[labels.length - 1]);
          }
          if (timestamps.length) {
            timestamps = ilen > 1 ? arrayUnique(timestamps).sort(sorter) : timestamps.sort(sorter);
            min = Math.min(min, timestamps[0]);
            max = Math.max(max, timestamps[timestamps.length - 1]);
          }
          min = parse(me, getMin(options3)) || min;
          max = parse(me, getMax(options3)) || max;
          min = min === MAX_INTEGER ? +adapter.startOf(Date.now(), unit) : min;
          max = max === MIN_INTEGER ? +adapter.endOf(Date.now(), unit) + 1 : max;
          me.min = Math.min(min, max);
          me.max = Math.max(min + 1, max);
          me._table = [];
          me._timestamps = {
            data: timestamps,
            datasets,
            labels
          };
        },
        buildTicks: function() {
          var me = this;
          var min = me.min;
          var max = me.max;
          var options3 = me.options;
          var tickOpts = options3.ticks;
          var timeOpts = options3.time;
          var timestamps = me._timestamps;
          var ticks = [];
          var capacity = me.getLabelCapacity(min);
          var source = tickOpts.source;
          var distribution = options3.distribution;
          var i, ilen, timestamp;
          if (source === "data" || source === "auto" && distribution === "series") {
            timestamps = timestamps.data;
          } else if (source === "labels") {
            timestamps = timestamps.labels;
          } else {
            timestamps = generate(me, min, max, capacity);
          }
          if (options3.bounds === "ticks" && timestamps.length) {
            min = timestamps[0];
            max = timestamps[timestamps.length - 1];
          }
          min = parse(me, getMin(options3)) || min;
          max = parse(me, getMax(options3)) || max;
          for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
            timestamp = timestamps[i];
            if (timestamp >= min && timestamp <= max) {
              ticks.push(timestamp);
            }
          }
          me.min = min;
          me.max = max;
          me._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, me.min, me.max, capacity) : determineUnitForFormatting(me, ticks.length, timeOpts.minUnit, me.min, me.max));
          me._majorUnit = !tickOpts.major.enabled || me._unit === "year" ? void 0 : determineMajorUnit(me._unit);
          me._table = buildLookupTable(me._timestamps.data, min, max, distribution);
          me._offsets = computeOffsets(me._table, ticks, min, max, options3);
          if (tickOpts.reverse) {
            ticks.reverse();
          }
          return ticksFromTimestamps(me, ticks, me._majorUnit);
        },
        getLabelForIndex: function(index2, datasetIndex) {
          var me = this;
          var adapter = me._adapter;
          var data = me.chart.data;
          var timeOpts = me.options.time;
          var label = data.labels && index2 < data.labels.length ? data.labels[index2] : "";
          var value = data.datasets[datasetIndex].data[index2];
          if (helpers$1.isObject(value)) {
            label = me.getRightValue(value);
          }
          if (timeOpts.tooltipFormat) {
            return adapter.format(toTimestamp(me, label), timeOpts.tooltipFormat);
          }
          if (typeof label === "string") {
            return label;
          }
          return adapter.format(toTimestamp(me, label), timeOpts.displayFormats.datetime);
        },
        tickFormatFunction: function(time, index2, ticks, format2) {
          var me = this;
          var adapter = me._adapter;
          var options3 = me.options;
          var formats = options3.time.displayFormats;
          var minorFormat = formats[me._unit];
          var majorUnit = me._majorUnit;
          var majorFormat = formats[majorUnit];
          var tick2 = ticks[index2];
          var tickOpts = options3.ticks;
          var major = majorUnit && majorFormat && tick2 && tick2.major;
          var label = adapter.format(time, format2 ? format2 : major ? majorFormat : minorFormat);
          var nestedTickOpts = major ? tickOpts.major : tickOpts.minor;
          var formatter = resolve$5([
            nestedTickOpts.callback,
            nestedTickOpts.userCallback,
            tickOpts.callback,
            tickOpts.userCallback
          ]);
          return formatter ? formatter(label, index2, ticks) : label;
        },
        convertTicksToLabels: function(ticks) {
          var labels = [];
          var i, ilen;
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            labels.push(this.tickFormatFunction(ticks[i].value, i, ticks));
          }
          return labels;
        },
        getPixelForOffset: function(time) {
          var me = this;
          var offsets = me._offsets;
          var pos = interpolate$1(me._table, "time", time, "pos");
          return me.getPixelForDecimal((offsets.start + pos) * offsets.factor);
        },
        getPixelForValue: function(value, index2, datasetIndex) {
          var me = this;
          var time = null;
          if (index2 !== void 0 && datasetIndex !== void 0) {
            time = me._timestamps.datasets[datasetIndex][index2];
          }
          if (time === null) {
            time = parse(me, value);
          }
          if (time !== null) {
            return me.getPixelForOffset(time);
          }
        },
        getPixelForTick: function(index2) {
          var ticks = this.getTicks();
          return index2 >= 0 && index2 < ticks.length ? this.getPixelForOffset(ticks[index2].value) : null;
        },
        getValueForPixel: function(pixel) {
          var me = this;
          var offsets = me._offsets;
          var pos = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
          var time = interpolate$1(me._table, "pos", pos, "time");
          return me._adapter._create(time);
        },
        _getLabelSize: function(label) {
          var me = this;
          var ticksOpts = me.options.ticks;
          var tickLabelWidth = me.ctx.measureText(label).width;
          var angle = helpers$1.toRadians(me.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
          var cosRotation = Math.cos(angle);
          var sinRotation = Math.sin(angle);
          var tickFontSize = valueOrDefault$d(ticksOpts.fontSize, core_defaults.global.defaultFontSize);
          return {
            w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
            h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
          };
        },
        getLabelWidth: function(label) {
          return this._getLabelSize(label).w;
        },
        getLabelCapacity: function(exampleTime) {
          var me = this;
          var timeOpts = me.options.time;
          var displayFormats = timeOpts.displayFormats;
          var format2 = displayFormats[timeOpts.unit] || displayFormats.millisecond;
          var exampleLabel = me.tickFormatFunction(exampleTime, 0, ticksFromTimestamps(me, [exampleTime], me._majorUnit), format2);
          var size = me._getLabelSize(exampleLabel);
          var capacity = Math.floor(me.isHorizontal() ? me.width / size.w : me.height / size.h);
          if (me.options.offset) {
            capacity--;
          }
          return capacity > 0 ? capacity : 1;
        }
      });
      var _defaults$4 = defaultConfig$4;
      scale_time._defaults = _defaults$4;
      var scales = {
        category: scale_category,
        linear: scale_linear,
        logarithmic: scale_logarithmic,
        radialLinear: scale_radialLinear,
        time: scale_time
      };
      var FORMATS = {
        datetime: "MMM D, YYYY, h:mm:ss a",
        millisecond: "h:mm:ss.SSS a",
        second: "h:mm:ss a",
        minute: "h:mm a",
        hour: "hA",
        day: "MMM D",
        week: "ll",
        month: "MMM YYYY",
        quarter: "[Q]Q - YYYY",
        year: "YYYY"
      };
      core_adapters._date.override(typeof moment === "function" ? {
        _id: "moment",
        formats: function() {
          return FORMATS;
        },
        parse: function(value, format2) {
          if (typeof value === "string" && typeof format2 === "string") {
            value = moment(value, format2);
          } else if (!(value instanceof moment)) {
            value = moment(value);
          }
          return value.isValid() ? value.valueOf() : null;
        },
        format: function(time, format2) {
          return moment(time).format(format2);
        },
        add: function(time, amount, unit) {
          return moment(time).add(amount, unit).valueOf();
        },
        diff: function(max, min, unit) {
          return moment(max).diff(moment(min), unit);
        },
        startOf: function(time, unit, weekday) {
          time = moment(time);
          if (unit === "isoWeek") {
            return time.isoWeekday(weekday).valueOf();
          }
          return time.startOf(unit).valueOf();
        },
        endOf: function(time, unit) {
          return moment(time).endOf(unit).valueOf();
        },
        _create: function(time) {
          return moment(time);
        }
      } : {});
      core_defaults._set("global", {
        plugins: {
          filler: {
            propagate: true
          }
        }
      });
      var mappers = {
        dataset: function(source) {
          var index2 = source.fill;
          var chart = source.chart;
          var meta = chart.getDatasetMeta(index2);
          var visible = meta && chart.isDatasetVisible(index2);
          var points = visible && meta.dataset._children || [];
          var length = points.length || 0;
          return !length ? null : function(point, i) {
            return i < length && points[i]._view || null;
          };
        },
        boundary: function(source) {
          var boundary = source.boundary;
          var x = boundary ? boundary.x : null;
          var y = boundary ? boundary.y : null;
          if (helpers$1.isArray(boundary)) {
            return function(point, i) {
              return boundary[i];
            };
          }
          return function(point) {
            return {
              x: x === null ? point.x : x,
              y: y === null ? point.y : y
            };
          };
        }
      };
      function decodeFill(el, index2, count) {
        var model = el._model || {};
        var fill = model.fill;
        var target;
        if (fill === void 0) {
          fill = !!model.backgroundColor;
        }
        if (fill === false || fill === null) {
          return false;
        }
        if (fill === true) {
          return "origin";
        }
        target = parseFloat(fill, 10);
        if (isFinite(target) && Math.floor(target) === target) {
          if (fill[0] === "-" || fill[0] === "+") {
            target = index2 + target;
          }
          if (target === index2 || target < 0 || target >= count) {
            return false;
          }
          return target;
        }
        switch (fill) {
          case "bottom":
            return "start";
          case "top":
            return "end";
          case "zero":
            return "origin";
          case "origin":
          case "start":
          case "end":
            return fill;
          default:
            return false;
        }
      }
      function computeLinearBoundary(source) {
        var model = source.el._model || {};
        var scale2 = source.el._scale || {};
        var fill = source.fill;
        var target = null;
        var horizontal;
        if (isFinite(fill)) {
          return null;
        }
        if (fill === "start") {
          target = model.scaleBottom === void 0 ? scale2.bottom : model.scaleBottom;
        } else if (fill === "end") {
          target = model.scaleTop === void 0 ? scale2.top : model.scaleTop;
        } else if (model.scaleZero !== void 0) {
          target = model.scaleZero;
        } else if (scale2.getBasePixel) {
          target = scale2.getBasePixel();
        }
        if (target !== void 0 && target !== null) {
          if (target.x !== void 0 && target.y !== void 0) {
            return target;
          }
          if (helpers$1.isFinite(target)) {
            horizontal = scale2.isHorizontal();
            return {
              x: horizontal ? target : null,
              y: horizontal ? null : target
            };
          }
        }
        return null;
      }
      function computeCircularBoundary(source) {
        var scale2 = source.el._scale;
        var options3 = scale2.options;
        var length = scale2.chart.data.labels.length;
        var fill = source.fill;
        var target = [];
        var start, end, center, i, point;
        if (!length) {
          return null;
        }
        start = options3.ticks.reverse ? scale2.max : scale2.min;
        end = options3.ticks.reverse ? scale2.min : scale2.max;
        center = scale2.getPointPositionForValue(0, start);
        for (i = 0; i < length; ++i) {
          point = fill === "start" || fill === "end" ? scale2.getPointPositionForValue(i, fill === "start" ? start : end) : scale2.getBasePosition(i);
          if (options3.gridLines.circular) {
            point.cx = center.x;
            point.cy = center.y;
            point.angle = scale2.getIndexAngle(i) - Math.PI / 2;
          }
          target.push(point);
        }
        return target;
      }
      function computeBoundary(source) {
        var scale2 = source.el._scale || {};
        if (scale2.getPointPositionForValue) {
          return computeCircularBoundary(source);
        }
        return computeLinearBoundary(source);
      }
      function resolveTarget(sources, index2, propagate) {
        var source = sources[index2];
        var fill = source.fill;
        var visited = [index2];
        var target;
        if (!propagate) {
          return fill;
        }
        while (fill !== false && visited.indexOf(fill) === -1) {
          if (!isFinite(fill)) {
            return fill;
          }
          target = sources[fill];
          if (!target) {
            return false;
          }
          if (target.visible) {
            return fill;
          }
          visited.push(fill);
          fill = target.fill;
        }
        return false;
      }
      function createMapper(source) {
        var fill = source.fill;
        var type = "dataset";
        if (fill === false) {
          return null;
        }
        if (!isFinite(fill)) {
          type = "boundary";
        }
        return mappers[type](source);
      }
      function isDrawable(point) {
        return point && !point.skip;
      }
      function drawArea(ctx, curve0, curve1, len0, len1) {
        var i, cx, cy, r;
        if (!len0 || !len1) {
          return;
        }
        ctx.moveTo(curve0[0].x, curve0[0].y);
        for (i = 1; i < len0; ++i) {
          helpers$1.canvas.lineTo(ctx, curve0[i - 1], curve0[i]);
        }
        if (curve1[0].angle !== void 0) {
          cx = curve1[0].cx;
          cy = curve1[0].cy;
          r = Math.sqrt(Math.pow(curve1[0].x - cx, 2) + Math.pow(curve1[0].y - cy, 2));
          for (i = len1 - 1; i > 0; --i) {
            ctx.arc(cx, cy, r, curve1[i].angle, curve1[i - 1].angle, true);
          }
          return;
        }
        ctx.lineTo(curve1[len1 - 1].x, curve1[len1 - 1].y);
        for (i = len1 - 1; i > 0; --i) {
          helpers$1.canvas.lineTo(ctx, curve1[i], curve1[i - 1], true);
        }
      }
      function doFill(ctx, points, mapper, view, color, loop) {
        var count = points.length;
        var span = view.spanGaps;
        var curve0 = [];
        var curve1 = [];
        var len0 = 0;
        var len1 = 0;
        var i, ilen, index2, p0, p1, d0, d1, loopOffset;
        ctx.beginPath();
        for (i = 0, ilen = count; i < ilen; ++i) {
          index2 = i % count;
          p0 = points[index2]._view;
          p1 = mapper(p0, index2, view);
          d0 = isDrawable(p0);
          d1 = isDrawable(p1);
          if (loop && loopOffset === void 0 && d0) {
            loopOffset = i + 1;
            ilen = count + loopOffset;
          }
          if (d0 && d1) {
            len0 = curve0.push(p0);
            len1 = curve1.push(p1);
          } else if (len0 && len1) {
            if (!span) {
              drawArea(ctx, curve0, curve1, len0, len1);
              len0 = len1 = 0;
              curve0 = [];
              curve1 = [];
            } else {
              if (d0) {
                curve0.push(p0);
              }
              if (d1) {
                curve1.push(p1);
              }
            }
          }
        }
        drawArea(ctx, curve0, curve1, len0, len1);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }
      var plugin_filler = {
        id: "filler",
        afterDatasetsUpdate: function(chart, options3) {
          var count = (chart.data.datasets || []).length;
          var propagate = options3.propagate;
          var sources = [];
          var meta, i, el, source;
          for (i = 0; i < count; ++i) {
            meta = chart.getDatasetMeta(i);
            el = meta.dataset;
            source = null;
            if (el && el._model && el instanceof elements.Line) {
              source = {
                visible: chart.isDatasetVisible(i),
                fill: decodeFill(el, i, count),
                chart,
                el
              };
            }
            meta.$filler = source;
            sources.push(source);
          }
          for (i = 0; i < count; ++i) {
            source = sources[i];
            if (!source) {
              continue;
            }
            source.fill = resolveTarget(sources, i, propagate);
            source.boundary = computeBoundary(source);
            source.mapper = createMapper(source);
          }
        },
        beforeDatasetsDraw: function(chart) {
          var metasets = chart._getSortedVisibleDatasetMetas();
          var ctx = chart.ctx;
          var meta, i, el, view, points, mapper, color;
          for (i = metasets.length - 1; i >= 0; --i) {
            meta = metasets[i].$filler;
            if (!meta || !meta.visible) {
              continue;
            }
            el = meta.el;
            view = el._view;
            points = el._children || [];
            mapper = meta.mapper;
            color = view.backgroundColor || core_defaults.global.defaultColor;
            if (mapper && color && points.length) {
              helpers$1.canvas.clipArea(ctx, chart.chartArea);
              doFill(ctx, points, mapper, view, color, el._loop);
              helpers$1.canvas.unclipArea(ctx);
            }
          }
        }
      };
      var getRtlHelper$1 = helpers$1.rtl.getRtlAdapter;
      var noop$1 = helpers$1.noop;
      var valueOrDefault$e = helpers$1.valueOrDefault;
      core_defaults._set("global", {
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: true,
          reverse: false,
          weight: 1e3,
          onClick: function(e, legendItem) {
            var index2 = legendItem.datasetIndex;
            var ci = this.chart;
            var meta = ci.getDatasetMeta(index2);
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index2].hidden : null;
            ci.update();
          },
          onHover: null,
          onLeave: null,
          labels: {
            boxWidth: 40,
            padding: 10,
            generateLabels: function(chart) {
              var datasets = chart.data.datasets;
              var options3 = chart.options.legend || {};
              var usePointStyle = options3.labels && options3.labels.usePointStyle;
              return chart._getSortedDatasetMetas().map(function(meta) {
                var style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                return {
                  text: datasets[meta.index].label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.isDatasetVisible(meta.index),
                  lineCap: style.borderCapStyle,
                  lineDash: style.borderDash,
                  lineDashOffset: style.borderDashOffset,
                  lineJoin: style.borderJoinStyle,
                  lineWidth: style.borderWidth,
                  strokeStyle: style.borderColor,
                  pointStyle: style.pointStyle,
                  rotation: style.rotation,
                  datasetIndex: meta.index
                };
              }, this);
            }
          }
        },
        legendCallback: function(chart) {
          var list = document.createElement("ul");
          var datasets = chart.data.datasets;
          var i, ilen, listItem, listItemSpan;
          list.setAttribute("class", chart.id + "-legend");
          for (i = 0, ilen = datasets.length; i < ilen; i++) {
            listItem = list.appendChild(document.createElement("li"));
            listItemSpan = listItem.appendChild(document.createElement("span"));
            listItemSpan.style.backgroundColor = datasets[i].backgroundColor;
            if (datasets[i].label) {
              listItem.appendChild(document.createTextNode(datasets[i].label));
            }
          }
          return list.outerHTML;
        }
      });
      function getBoxWidth(labelOpts, fontSize) {
        return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ? fontSize : labelOpts.boxWidth;
      }
      var Legend = core_element.extend({
        initialize: function(config) {
          var me = this;
          helpers$1.extend(me, config);
          me.legendHitBoxes = [];
          me._hoveredItem = null;
          me.doughnutMode = false;
        },
        beforeUpdate: noop$1,
        update: function(maxWidth, maxHeight, margins) {
          var me = this;
          me.beforeUpdate();
          me.maxWidth = maxWidth;
          me.maxHeight = maxHeight;
          me.margins = margins;
          me.beforeSetDimensions();
          me.setDimensions();
          me.afterSetDimensions();
          me.beforeBuildLabels();
          me.buildLabels();
          me.afterBuildLabels();
          me.beforeFit();
          me.fit();
          me.afterFit();
          me.afterUpdate();
          return me.minSize;
        },
        afterUpdate: noop$1,
        beforeSetDimensions: noop$1,
        setDimensions: function() {
          var me = this;
          if (me.isHorizontal()) {
            me.width = me.maxWidth;
            me.left = 0;
            me.right = me.width;
          } else {
            me.height = me.maxHeight;
            me.top = 0;
            me.bottom = me.height;
          }
          me.paddingLeft = 0;
          me.paddingTop = 0;
          me.paddingRight = 0;
          me.paddingBottom = 0;
          me.minSize = {
            width: 0,
            height: 0
          };
        },
        afterSetDimensions: noop$1,
        beforeBuildLabels: noop$1,
        buildLabels: function() {
          var me = this;
          var labelOpts = me.options.labels || {};
          var legendItems = helpers$1.callback(labelOpts.generateLabels, [me.chart], me) || [];
          if (labelOpts.filter) {
            legendItems = legendItems.filter(function(item) {
              return labelOpts.filter(item, me.chart.data);
            });
          }
          if (me.options.reverse) {
            legendItems.reverse();
          }
          me.legendItems = legendItems;
        },
        afterBuildLabels: noop$1,
        beforeFit: noop$1,
        fit: function() {
          var me = this;
          var opts = me.options;
          var labelOpts = opts.labels;
          var display = opts.display;
          var ctx = me.ctx;
          var labelFont = helpers$1.options._parseFont(labelOpts);
          var fontSize = labelFont.size;
          var hitboxes = me.legendHitBoxes = [];
          var minSize = me.minSize;
          var isHorizontal = me.isHorizontal();
          if (isHorizontal) {
            minSize.width = me.maxWidth;
            minSize.height = display ? 10 : 0;
          } else {
            minSize.width = display ? 10 : 0;
            minSize.height = me.maxHeight;
          }
          if (!display) {
            me.width = minSize.width = me.height = minSize.height = 0;
            return;
          }
          ctx.font = labelFont.string;
          if (isHorizontal) {
            var lineWidths = me.lineWidths = [0];
            var totalHeight = 0;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            helpers$1.each(me.legendItems, function(legendItem, i) {
              var boxWidth = getBoxWidth(labelOpts, fontSize);
              var width = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i === 0 || lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
                totalHeight += fontSize + labelOpts.padding;
                lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
              }
              hitboxes[i] = {
                left: 0,
                top: 0,
                width,
                height: fontSize
              };
              lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
            });
            minSize.height += totalHeight;
          } else {
            var vPadding = labelOpts.padding;
            var columnWidths = me.columnWidths = [];
            var columnHeights = me.columnHeights = [];
            var totalWidth = labelOpts.padding;
            var currentColWidth = 0;
            var currentColHeight = 0;
            helpers$1.each(me.legendItems, function(legendItem, i) {
              var boxWidth = getBoxWidth(labelOpts, fontSize);
              var itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i > 0 && currentColHeight + fontSize + 2 * vPadding > minSize.height) {
                totalWidth += currentColWidth + labelOpts.padding;
                columnWidths.push(currentColWidth);
                columnHeights.push(currentColHeight);
                currentColWidth = 0;
                currentColHeight = 0;
              }
              currentColWidth = Math.max(currentColWidth, itemWidth);
              currentColHeight += fontSize + vPadding;
              hitboxes[i] = {
                left: 0,
                top: 0,
                width: itemWidth,
                height: fontSize
              };
            });
            totalWidth += currentColWidth;
            columnWidths.push(currentColWidth);
            columnHeights.push(currentColHeight);
            minSize.width += totalWidth;
          }
          me.width = minSize.width;
          me.height = minSize.height;
        },
        afterFit: noop$1,
        isHorizontal: function() {
          return this.options.position === "top" || this.options.position === "bottom";
        },
        draw: function() {
          var me = this;
          var opts = me.options;
          var labelOpts = opts.labels;
          var globalDefaults = core_defaults.global;
          var defaultColor2 = globalDefaults.defaultColor;
          var lineDefault = globalDefaults.elements.line;
          var legendHeight = me.height;
          var columnHeights = me.columnHeights;
          var legendWidth = me.width;
          var lineWidths = me.lineWidths;
          if (!opts.display) {
            return;
          }
          var rtlHelper = getRtlHelper$1(opts.rtl, me.left, me.minSize.width);
          var ctx = me.ctx;
          var fontColor = valueOrDefault$e(labelOpts.fontColor, globalDefaults.defaultFontColor);
          var labelFont = helpers$1.options._parseFont(labelOpts);
          var fontSize = labelFont.size;
          var cursor;
          ctx.textAlign = rtlHelper.textAlign("left");
          ctx.textBaseline = "middle";
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = fontColor;
          ctx.fillStyle = fontColor;
          ctx.font = labelFont.string;
          var boxWidth = getBoxWidth(labelOpts, fontSize);
          var hitboxes = me.legendHitBoxes;
          var drawLegendBox = function(x, y, legendItem) {
            if (isNaN(boxWidth) || boxWidth <= 0) {
              return;
            }
            ctx.save();
            var lineWidth = valueOrDefault$e(legendItem.lineWidth, lineDefault.borderWidth);
            ctx.fillStyle = valueOrDefault$e(legendItem.fillStyle, defaultColor2);
            ctx.lineCap = valueOrDefault$e(legendItem.lineCap, lineDefault.borderCapStyle);
            ctx.lineDashOffset = valueOrDefault$e(legendItem.lineDashOffset, lineDefault.borderDashOffset);
            ctx.lineJoin = valueOrDefault$e(legendItem.lineJoin, lineDefault.borderJoinStyle);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = valueOrDefault$e(legendItem.strokeStyle, defaultColor2);
            if (ctx.setLineDash) {
              ctx.setLineDash(valueOrDefault$e(legendItem.lineDash, lineDefault.borderDash));
            }
            if (labelOpts && labelOpts.usePointStyle) {
              var radius = boxWidth * Math.SQRT2 / 2;
              var centerX = rtlHelper.xPlus(x, boxWidth / 2);
              var centerY = y + fontSize / 2;
              helpers$1.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY, legendItem.rotation);
            } else {
              ctx.fillRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
              if (lineWidth !== 0) {
                ctx.strokeRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
              }
            }
            ctx.restore();
          };
          var fillText2 = function(x, y, legendItem, textWidth) {
            var halfFontSize = fontSize / 2;
            var xLeft = rtlHelper.xPlus(x, boxWidth + halfFontSize);
            var yMiddle = y + halfFontSize;
            ctx.fillText(legendItem.text, xLeft, yMiddle);
            if (legendItem.hidden) {
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.moveTo(xLeft, yMiddle);
              ctx.lineTo(rtlHelper.xPlus(xLeft, textWidth), yMiddle);
              ctx.stroke();
            }
          };
          var alignmentOffset = function(dimension, blockSize) {
            switch (opts.align) {
              case "start":
                return labelOpts.padding;
              case "end":
                return dimension - blockSize;
              default:
                return (dimension - blockSize + labelOpts.padding) / 2;
            }
          };
          var isHorizontal = me.isHorizontal();
          if (isHorizontal) {
            cursor = {
              x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
              y: me.top + labelOpts.padding,
              line: 0
            };
          } else {
            cursor = {
              x: me.left + labelOpts.padding,
              y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
              line: 0
            };
          }
          helpers$1.rtl.overrideTextDirection(me.ctx, opts.textDirection);
          var itemHeight = fontSize + labelOpts.padding;
          helpers$1.each(me.legendItems, function(legendItem, i) {
            var textWidth = ctx.measureText(legendItem.text).width;
            var width = boxWidth + fontSize / 2 + textWidth;
            var x = cursor.x;
            var y = cursor.y;
            rtlHelper.setWidth(me.minSize.width);
            if (isHorizontal) {
              if (i > 0 && x + width + labelOpts.padding > me.left + me.minSize.width) {
                y = cursor.y += itemHeight;
                cursor.line++;
                x = cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
              }
            } else if (i > 0 && y + itemHeight > me.top + me.minSize.height) {
              x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
              cursor.line++;
              y = cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
            }
            var realX = rtlHelper.x(x);
            drawLegendBox(realX, y, legendItem);
            hitboxes[i].left = rtlHelper.leftForLtr(realX, hitboxes[i].width);
            hitboxes[i].top = y;
            fillText2(realX, y, legendItem, textWidth);
            if (isHorizontal) {
              cursor.x += width + labelOpts.padding;
            } else {
              cursor.y += itemHeight;
            }
          });
          helpers$1.rtl.restoreTextDirection(me.ctx, opts.textDirection);
        },
        _getLegendItemAt: function(x, y) {
          var me = this;
          var i, hitBox, lh;
          if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
            lh = me.legendHitBoxes;
            for (i = 0; i < lh.length; ++i) {
              hitBox = lh[i];
              if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
                return me.legendItems[i];
              }
            }
          }
          return null;
        },
        handleEvent: function(e) {
          var me = this;
          var opts = me.options;
          var type = e.type === "mouseup" ? "click" : e.type;
          var hoveredItem;
          if (type === "mousemove") {
            if (!opts.onHover && !opts.onLeave) {
              return;
            }
          } else if (type === "click") {
            if (!opts.onClick) {
              return;
            }
          } else {
            return;
          }
          hoveredItem = me._getLegendItemAt(e.x, e.y);
          if (type === "click") {
            if (hoveredItem && opts.onClick) {
              opts.onClick.call(me, e.native, hoveredItem);
            }
          } else {
            if (opts.onLeave && hoveredItem !== me._hoveredItem) {
              if (me._hoveredItem) {
                opts.onLeave.call(me, e.native, me._hoveredItem);
              }
              me._hoveredItem = hoveredItem;
            }
            if (opts.onHover && hoveredItem) {
              opts.onHover.call(me, e.native, hoveredItem);
            }
          }
        }
      });
      function createNewLegendAndAttach(chart, legendOpts) {
        var legend2 = new Legend({
          ctx: chart.ctx,
          options: legendOpts,
          chart
        });
        core_layouts.configure(chart, legend2, legendOpts);
        core_layouts.addBox(chart, legend2);
        chart.legend = legend2;
      }
      var plugin_legend = {
        id: "legend",
        _element: Legend,
        beforeInit: function(chart) {
          var legendOpts = chart.options.legend;
          if (legendOpts) {
            createNewLegendAndAttach(chart, legendOpts);
          }
        },
        beforeUpdate: function(chart) {
          var legendOpts = chart.options.legend;
          var legend2 = chart.legend;
          if (legendOpts) {
            helpers$1.mergeIf(legendOpts, core_defaults.global.legend);
            if (legend2) {
              core_layouts.configure(chart, legend2, legendOpts);
              legend2.options = legendOpts;
            } else {
              createNewLegendAndAttach(chart, legendOpts);
            }
          } else if (legend2) {
            core_layouts.removeBox(chart, legend2);
            delete chart.legend;
          }
        },
        afterEvent: function(chart, e) {
          var legend2 = chart.legend;
          if (legend2) {
            legend2.handleEvent(e);
          }
        }
      };
      var noop$2 = helpers$1.noop;
      core_defaults._set("global", {
        title: {
          display: false,
          fontStyle: "bold",
          fullWidth: true,
          padding: 10,
          position: "top",
          text: "",
          weight: 2e3
        }
      });
      var Title = core_element.extend({
        initialize: function(config) {
          var me = this;
          helpers$1.extend(me, config);
          me.legendHitBoxes = [];
        },
        beforeUpdate: noop$2,
        update: function(maxWidth, maxHeight, margins) {
          var me = this;
          me.beforeUpdate();
          me.maxWidth = maxWidth;
          me.maxHeight = maxHeight;
          me.margins = margins;
          me.beforeSetDimensions();
          me.setDimensions();
          me.afterSetDimensions();
          me.beforeBuildLabels();
          me.buildLabels();
          me.afterBuildLabels();
          me.beforeFit();
          me.fit();
          me.afterFit();
          me.afterUpdate();
          return me.minSize;
        },
        afterUpdate: noop$2,
        beforeSetDimensions: noop$2,
        setDimensions: function() {
          var me = this;
          if (me.isHorizontal()) {
            me.width = me.maxWidth;
            me.left = 0;
            me.right = me.width;
          } else {
            me.height = me.maxHeight;
            me.top = 0;
            me.bottom = me.height;
          }
          me.paddingLeft = 0;
          me.paddingTop = 0;
          me.paddingRight = 0;
          me.paddingBottom = 0;
          me.minSize = {
            width: 0,
            height: 0
          };
        },
        afterSetDimensions: noop$2,
        beforeBuildLabels: noop$2,
        buildLabels: noop$2,
        afterBuildLabels: noop$2,
        beforeFit: noop$2,
        fit: function() {
          var me = this;
          var opts = me.options;
          var minSize = me.minSize = {};
          var isHorizontal = me.isHorizontal();
          var lineCount, textSize;
          if (!opts.display) {
            me.width = minSize.width = me.height = minSize.height = 0;
            return;
          }
          lineCount = helpers$1.isArray(opts.text) ? opts.text.length : 1;
          textSize = lineCount * helpers$1.options._parseFont(opts).lineHeight + opts.padding * 2;
          me.width = minSize.width = isHorizontal ? me.maxWidth : textSize;
          me.height = minSize.height = isHorizontal ? textSize : me.maxHeight;
        },
        afterFit: noop$2,
        isHorizontal: function() {
          var pos = this.options.position;
          return pos === "top" || pos === "bottom";
        },
        draw: function() {
          var me = this;
          var ctx = me.ctx;
          var opts = me.options;
          if (!opts.display) {
            return;
          }
          var fontOpts = helpers$1.options._parseFont(opts);
          var lineHeight = fontOpts.lineHeight;
          var offset = lineHeight / 2 + opts.padding;
          var rotation = 0;
          var top = me.top;
          var left = me.left;
          var bottom = me.bottom;
          var right = me.right;
          var maxWidth, titleX, titleY;
          ctx.fillStyle = helpers$1.valueOrDefault(opts.fontColor, core_defaults.global.defaultFontColor);
          ctx.font = fontOpts.string;
          if (me.isHorizontal()) {
            titleX = left + (right - left) / 2;
            titleY = top + offset;
            maxWidth = right - left;
          } else {
            titleX = opts.position === "left" ? left + offset : right - offset;
            titleY = top + (bottom - top) / 2;
            maxWidth = bottom - top;
            rotation = Math.PI * (opts.position === "left" ? -0.5 : 0.5);
          }
          ctx.save();
          ctx.translate(titleX, titleY);
          ctx.rotate(rotation);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var text = opts.text;
          if (helpers$1.isArray(text)) {
            var y = 0;
            for (var i = 0; i < text.length; ++i) {
              ctx.fillText(text[i], 0, y, maxWidth);
              y += lineHeight;
            }
          } else {
            ctx.fillText(text, 0, 0, maxWidth);
          }
          ctx.restore();
        }
      });
      function createNewTitleBlockAndAttach(chart, titleOpts) {
        var title2 = new Title({
          ctx: chart.ctx,
          options: titleOpts,
          chart
        });
        core_layouts.configure(chart, title2, titleOpts);
        core_layouts.addBox(chart, title2);
        chart.titleBlock = title2;
      }
      var plugin_title = {
        id: "title",
        _element: Title,
        beforeInit: function(chart) {
          var titleOpts = chart.options.title;
          if (titleOpts) {
            createNewTitleBlockAndAttach(chart, titleOpts);
          }
        },
        beforeUpdate: function(chart) {
          var titleOpts = chart.options.title;
          var titleBlock = chart.titleBlock;
          if (titleOpts) {
            helpers$1.mergeIf(titleOpts, core_defaults.global.title);
            if (titleBlock) {
              core_layouts.configure(chart, titleBlock, titleOpts);
              titleBlock.options = titleOpts;
            } else {
              createNewTitleBlockAndAttach(chart, titleOpts);
            }
          } else if (titleBlock) {
            core_layouts.removeBox(chart, titleBlock);
            delete chart.titleBlock;
          }
        }
      };
      var plugins = {};
      var filler = plugin_filler;
      var legend = plugin_legend;
      var title = plugin_title;
      plugins.filler = filler;
      plugins.legend = legend;
      plugins.title = title;
      core_controller.helpers = helpers$1;
      core_helpers();
      core_controller._adapters = core_adapters;
      core_controller.Animation = core_animation;
      core_controller.animationService = core_animations;
      core_controller.controllers = controllers;
      core_controller.DatasetController = core_datasetController;
      core_controller.defaults = core_defaults;
      core_controller.Element = core_element;
      core_controller.elements = elements;
      core_controller.Interaction = core_interaction;
      core_controller.layouts = core_layouts;
      core_controller.platform = platform;
      core_controller.plugins = core_plugins;
      core_controller.Scale = core_scale;
      core_controller.scaleService = core_scaleService;
      core_controller.Ticks = core_ticks;
      core_controller.Tooltip = core_tooltip;
      core_controller.helpers.each(scales, function(scale2, type) {
        core_controller.scaleService.registerScaleType(type, scale2, scale2._defaults);
      });
      for (var k in plugins) {
        if (plugins.hasOwnProperty(k)) {
          core_controller.plugins.register(plugins[k]);
        }
      }
      core_controller.platform.initialize();
      var src2 = core_controller;
      if (typeof window !== "undefined") {
        window.Chart = core_controller;
      }
      core_controller.Chart = core_controller;
      core_controller.Legend = plugins.legend._element;
      core_controller.Title = plugins.title._element;
      core_controller.pluginService = core_controller.plugins;
      core_controller.PluginBase = core_controller.Element.extend({});
      core_controller.canvasHelpers = core_controller.helpers.canvas;
      core_controller.layoutService = core_controller.layouts;
      core_controller.LinearScaleBase = scale_linearbase;
      core_controller.helpers.each([
        "Bar",
        "Bubble",
        "Doughnut",
        "Line",
        "PolarArea",
        "Radar",
        "Scatter"
      ], function(klass) {
        core_controller[klass] = function(ctx, cfg) {
          return new core_controller(ctx, core_controller.helpers.merge(cfg || {}, {
            type: klass.charAt(0).toLowerCase() + klass.slice(1)
          }));
        };
      });
      return src2;
    });
  }
});

// .svelte-kit/vercel/entry.js
__markAsModule(exports);
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      fulfil(null);
      return;
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    let data;
    if (!isNaN(length)) {
      data = new Uint8Array(length);
      let i = 0;
      req.on("data", (chunk) => {
        data.set(chunk, i);
        i += chunk.length;
      });
    } else {
      if (h["transfer-encoding"] === void 0) {
        fulfil(null);
        return;
      }
      data = new Uint8Array(0);
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        fulfil(data);
      }
      const decoder = new TextDecoder(h["content-encoding"] || "utf-8");
      fulfil(decoder.decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var {Readable} = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type: String(type).toLowerCase()});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({highWaterMark});
    p2 = new import_stream.PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
var getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe: subscribe2};
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page: page2
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: page2,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: ""};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 ? `<style amp-custom>${Array.from(styles).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2.path)},
						query: new URLSearchParams(${s$1(page2.query.toString())}),
						params: ${s$1(page2.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url, body: body2, json}) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}</script>` : `<script type="svelte-data" url="${url}">${json}</script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const {name, message, stack} = error3;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error3};
    }
    return {status, error: error3};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page: page2,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const {module: module2} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page: page2,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page2.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error: error3}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page: page2
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page: page2,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error: error3} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page: page2,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page: page2
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = {...headers, "content-type": "application/json"};
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return {status, body: normalized_body, headers};
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path.endsWith("/") && incoming.path !== "/") {
    const q = incoming.query.toString();
    return {
      status: 301,
      headers: {
        location: encodeURI(incoming.path.slice(0, -1) + (q ? `?${q}` : ""))
      }
    };
  }
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers: lowercase_keys(incoming.headers),
        body: parse_body(incoming),
        params: null,
        locals: {}
      },
      render: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: {ssr: false, router: true, hydrate: true},
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      const {on_mount} = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte-kit/output/server/app.js
var import_cookie = __toModule(require_cookie());

// node_modules/@lukeed/uuid/dist/index.mjs
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--)
      BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6)
      out += HEX[num & 15 | 64];
    else if (i == 8)
      out += HEX[num & 63 | 128];
    else
      out += HEX[num];
    if (i & 1 && i > 1 && i < 11)
      out += "-";
  }
  IDX++;
  return out;
}

// node_modules/svelte/store/index.mjs
var subscriber_queue2 = [];
function writable2(value, start = noop2) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue2.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe: subscribe2};
}

// .svelte-kit/output/server/app.js
var import_chart = __toModule(require_Chart());
var css$a = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page: page2} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$a);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var handle = async ({request, render: render2}) => {
  const cookies = import_cookie.default.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await render2(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
var template = ({head, body}) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="../static/icon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-8dcd31af.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-8dcd31af.js", "/./_app/chunks/vendor-8e9baeca.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: null,
    template
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{file: "icon.ico", size: 100600, type: "image/vnd.microsoft.icon"}, {file: "loading.gif", size: 31478, type: "image/gif"}],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/dropdown\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/dropdown.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/dialog\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/dialog.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/footer\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/footer.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/graph\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/graph.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/axes\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/axes.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/bar\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/bar.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/components\/nav\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/components/nav.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/storage\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return storage;
      })
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/users\/components\/rankifier\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return rankifier$1;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/users\/components\/hextorgb\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return hextorgb;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/users\/components\/hsvtorgb\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return hsvtorgb;
      })
    },
    {
      type: "page",
      pattern: /^\/users\/components\/charts\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/users/components/charts.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/users\/([^/]+?)\/?$/,
      params: (m) => ({slug: d(m[1])}),
      a: ["src/routes/__layout.svelte", "src/routes/users/[slug].svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, render: render2}) => render2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/components/dropdown.svelte": () => Promise.resolve().then(function() {
    return dropdown;
  }),
  "src/routes/components/dialog.svelte": () => Promise.resolve().then(function() {
    return dialog;
  }),
  "src/routes/components/footer.svelte": () => Promise.resolve().then(function() {
    return footer;
  }),
  "src/routes/components/graph.svelte": () => Promise.resolve().then(function() {
    return graph;
  }),
  "src/routes/components/axes.svelte": () => Promise.resolve().then(function() {
    return axes;
  }),
  "src/routes/components/bar.svelte": () => Promise.resolve().then(function() {
    return bar;
  }),
  "src/routes/components/nav.svelte": () => Promise.resolve().then(function() {
    return nav;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/users/components/charts.svelte": () => Promise.resolve().then(function() {
    return charts;
  }),
  "src/routes/users/[slug].svelte": () => Promise.resolve().then(function() {
    return _slug_;
  })
};
var metadata_lookup = {"src/routes/__layout.svelte": {entry: "/./_app/pages/__layout.svelte-6b7965b8.js", css: ["/./_app/assets/pages/__layout.svelte-d982f923.css", "/./_app/assets/pages/components/footer.svelte-14be4df6.css", "/./_app/assets/pages/components/nav.svelte-7d3359f8.css"], js: ["/./_app/pages/__layout.svelte-6b7965b8.js", "/./_app/chunks/vendor-8e9baeca.js", "/./_app/pages/components/footer.svelte-b898ba27.js", "/./_app/pages/components/nav.svelte-c702f3d9.js"], styles: null}, ".svelte-kit/build/components/error.svelte": {entry: "/./_app/error.svelte-31714ad1.js", css: [], js: ["/./_app/error.svelte-31714ad1.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/index.svelte": {entry: "/./_app/pages/index.svelte-2c8d832a.js", css: ["/./_app/assets/pages/index.svelte-2292641e.css", "/./_app/assets/pages/components/graph.svelte-73cae0b6.css", "/./_app/assets/pages/components/bar.svelte-0c42904f.css", "/./_app/assets/pages/components/dropdown.svelte-0f536674.css"], js: ["/./_app/pages/index.svelte-2c8d832a.js", "/./_app/chunks/vendor-8e9baeca.js", "/./_app/chunks/storage-e20d6f2e.js", "/./_app/pages/components/graph.svelte-78d4bbbe.js", "/./_app/pages/components/bar.svelte-61270a5d.js", "/./_app/pages/components/dropdown.svelte-0ee5fcf5.js"], styles: null}, "src/routes/components/dropdown.svelte": {entry: "/./_app/pages/components/dropdown.svelte-0ee5fcf5.js", css: ["/./_app/assets/pages/components/dropdown.svelte-0f536674.css"], js: ["/./_app/pages/components/dropdown.svelte-0ee5fcf5.js", "/./_app/chunks/vendor-8e9baeca.js", "/./_app/chunks/storage-e20d6f2e.js"], styles: null}, "src/routes/components/dialog.svelte": {entry: "/./_app/pages/components/dialog.svelte-89271ff0.js", css: ["/./_app/assets/pages/components/dialog.svelte-00c71091.css"], js: ["/./_app/pages/components/dialog.svelte-89271ff0.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/components/footer.svelte": {entry: "/./_app/pages/components/footer.svelte-b898ba27.js", css: ["/./_app/assets/pages/components/footer.svelte-14be4df6.css"], js: ["/./_app/pages/components/footer.svelte-b898ba27.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/components/graph.svelte": {entry: "/./_app/pages/components/graph.svelte-78d4bbbe.js", css: ["/./_app/assets/pages/components/graph.svelte-73cae0b6.css", "/./_app/assets/pages/components/bar.svelte-0c42904f.css"], js: ["/./_app/pages/components/graph.svelte-78d4bbbe.js", "/./_app/chunks/vendor-8e9baeca.js", "/./_app/chunks/storage-e20d6f2e.js", "/./_app/pages/components/bar.svelte-61270a5d.js"], styles: null}, "src/routes/components/axes.svelte": {entry: "/./_app/pages/components/axes.svelte-ee934a56.js", css: ["/./_app/assets/pages/components/axes.svelte-e0bc9f6b.css"], js: ["/./_app/pages/components/axes.svelte-ee934a56.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/components/bar.svelte": {entry: "/./_app/pages/components/bar.svelte-61270a5d.js", css: ["/./_app/assets/pages/components/bar.svelte-0c42904f.css"], js: ["/./_app/pages/components/bar.svelte-61270a5d.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/components/nav.svelte": {entry: "/./_app/pages/components/nav.svelte-c702f3d9.js", css: ["/./_app/assets/pages/components/nav.svelte-7d3359f8.css"], js: ["/./_app/pages/components/nav.svelte-c702f3d9.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/about.svelte": {entry: "/./_app/pages/about.svelte-8130c0b4.js", css: [], js: ["/./_app/pages/about.svelte-8130c0b4.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/users/components/charts.svelte": {entry: "/./_app/pages/users/components/charts.svelte-f5a6ca01.js", css: ["/./_app/assets/pages/users/components/charts.svelte-c5ead37e.css"], js: ["/./_app/pages/users/components/charts.svelte-f5a6ca01.js", "/./_app/chunks/vendor-8e9baeca.js"], styles: null}, "src/routes/users/[slug].svelte": {entry: "/./_app/pages/users/[slug].svelte-86bad257.js", css: ["/./_app/assets/pages/users/[slug].svelte-5359a603.css", "/./_app/assets/pages/users/components/charts.svelte-c5ead37e.css"], js: ["/./_app/pages/users/[slug].svelte-86bad257.js", "/./_app/chunks/vendor-8e9baeca.js", "/./_app/chunks/storage-e20d6f2e.js", "/./_app/pages/users/components/charts.svelte-f5a6ca01.js"], styles: null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {base: "", assets: "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({...request, host}, options, {prerender});
}
var page = writable2(0);
var cat = writable2("total");
var dropdownActive = writable2(false);
var categories = [
  ["1", "Suggestions"],
  ["3", "Bugs and Glitches"],
  ["4", "Questions about Scratch"],
  ["5", "Announcements"],
  ["6", "New Scratchers"],
  ["7", "Help With Scripts"],
  ["8", "Show and Tell"],
  ["9", "Project Ideas"],
  ["10", "Collaboration"],
  ["11", "Requests"],
  ["13", "Deutsch"],
  ["14", "Espa\xF1ol"],
  ["15", "Fran\xE7ais"],
  ["16", "\u4E2D\u6587"],
  ["17", "Polski"],
  ["18", "\u65E5\u672C\u8A9E"],
  ["19", "Nederlands"],
  ["20", "Portugu\xEAs"],
  ["21", "Italiano"],
  ["22", "\u05E2\u05D1\u05E8\u05D9\u05EA"],
  ["23", "\uD55C\uAD6D\uC5B4"],
  ["24", "Norsk"],
  ["25", "T\xFCrk\xE7e"],
  ["26", "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"],
  ["27", "P\u0443\u0441\u0441\u043A\u0438\u0439"],
  ["28", "Translating Scratch"],
  ["29", "Things I'm Making and Creating"],
  ["30", "Things I'm Reading and Playing"],
  ["31", "Advanced Topics"],
  ["32", "Connecting to the Physical World"],
  ["33", "Catal\xE0"],
  ["34", "Other Languages"],
  ["36", "Bahasa Indonesia"],
  ["48", "Developing Scratch Extensions"],
  ["49", "Open Source Projects"],
  ["59", "\u0641\u0627\u0631\u0633\u06CC"]
];
var storage = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  page,
  cat,
  dropdownActive,
  categories
});
function rankifier(input) {
  if (String(input).length > 1 && String(input)[String(input).length - 2] != 1 || String(input).length == 1) {
    if (String(input)[String(input).length - 1] == "1") {
      return `${input}st`;
    } else if (String(input)[String(input).length - 1] == "2") {
      return `${input}nd`;
    } else if (String(input)[String(input).length - 1] == "3") {
      return `${input}rd`;
    } else {
      return `${input}th`;
    }
  } else {
    if (String(input).length > 1 && String(input)[String(input).length - 2] == 1) {
      return `${input}th`;
    } else {
      return `${input} bug!`;
    }
  }
}
var rankifier$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  rankifier
});
function HEXtoRGB$1(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null;
}
var hextorgb = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  HEXtoRGB: HEXtoRGB$1
});
function HSVtoRGB(h, s2, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s2 = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s2);
  q = v * (1 - f * s2);
  t = v * (1 - (1 - f) * s2);
  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;
    case 1:
      r = q, g = v, b = p;
      break;
    case 2:
      r = p, g = v, b = t;
      break;
    case 3:
      r = p, g = q, b = v;
      break;
    case 4:
      r = t, g = p, b = v;
      break;
    case 5:
      r = v, g = p, b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
var hsvtorgb = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  HSVtoRGB
});
var css$9 = {
  code: "footer.svelte-1d59qtk.svelte-1d59qtk{background-color:var(--accent);display:flex;flex-direction:row;justify-content:center;padding:10px 4%;font-size:12px}footer.svelte-1d59qtk li.svelte-1d59qtk{text-decoration:none;list-style:none;padding:3px 15px}footer.svelte-1d59qtk li.svelte-1d59qtk:first-child{font-weight:bold}",
  map: `{"version":3,"file":"footer.svelte","sources":["footer.svelte"],"sourcesContent":["<footer>\\r\\n    <ul>\\r\\n        <li>Credits</li>\\r\\n        <li>By CatsUnited</li>\\r\\n\\t    <li>Data from DatOneLefty and Jeffalo</li>\\r\\n    </ul>\\r\\n    <ul>\\r\\n        <li>Discuss</li>\\r\\n        <li><a href=\\"https://scratch.mit.edu/discuss/topic/424580/\\">Forum Topic <span class=\\"iconify\\" data-icon=\\"heroicons-solid:external-link\\" data-inline=\\"false\\"></span></a></li>\\r\\n        <li><a href=\\"https://github.com/rirurin/postpercent\\">Source Code <span class=\\"iconify\\" data-icon=\\"heroicons-solid:external-link\\" data-inline=\\"false\\"></span></a></li>\\r\\n    </ul>\\r\\n    <ul>\\r\\n        <li>Other Forum Tools</li>\\r\\n        <li><a href=\\"https://ocular.jeffalo.net/\\">Ocular <span class=\\"iconify\\" data-icon=\\"heroicons-solid:external-link\\" data-inline=\\"false\\"></span></a></li>\\r\\n\\t    <li><a href=\\"https://signature-history.9gr.repl.co\\">9gr's signature viewer <span class=\\"iconify\\" data-icon=\\"heroicons-solid:external-link\\" data-inline=\\"false\\"></span></a></li>\\r\\n    </ul>\\r\\n</footer>\\r\\n<style>\\r\\n    footer\\t{\\r\\n        background-color: var(--accent);\\r\\n        display: flex;\\r\\n        flex-direction: row;\\r\\n        justify-content: center;\\r\\n        padding: 10px 4%;\\r\\n        font-size: 12px;\\r\\n    }\\r\\n    footer li\\t{\\r\\n        text-decoration: none;\\r\\n        list-style: none;\\r\\n        padding: 3px 15px;\\r\\n    }\\r\\n    footer li:first-child   {\\r\\n        font-weight: bold;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAkBI,MAAM,8BAAC,CAAC,AACJ,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,IAAI,CAAC,EAAE,CAChB,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,qBAAM,CAAC,EAAE,eAAC,CAAC,AACP,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CAAC,IAAI,AACrB,CAAC,AACD,qBAAM,CAAC,iBAAE,YAAY,AAAG,CAAC,AACrB,WAAW,CAAE,IAAI,AACrB,CAAC"}`
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<footer class="${"svelte-1d59qtk"}"><ul><li class="${"svelte-1d59qtk"}">Credits</li>
        <li class="${"svelte-1d59qtk"}">By CatsUnited</li>
	    <li class="${"svelte-1d59qtk"}">Data from DatOneLefty and Jeffalo</li></ul>
    <ul><li class="${"svelte-1d59qtk"}">Discuss</li>
        <li class="${"svelte-1d59qtk"}"><a href="${"https://scratch.mit.edu/discuss/topic/424580/"}">Forum Topic <span class="${"iconify"}" data-icon="${"heroicons-solid:external-link"}" data-inline="${"false"}"></span></a></li>
        <li class="${"svelte-1d59qtk"}"><a href="${"https://github.com/rirurin/postpercent"}">Source Code <span class="${"iconify"}" data-icon="${"heroicons-solid:external-link"}" data-inline="${"false"}"></span></a></li></ul>
    <ul><li class="${"svelte-1d59qtk"}">Other Forum Tools</li>
        <li class="${"svelte-1d59qtk"}"><a href="${"https://ocular.jeffalo.net/"}">Ocular <span class="${"iconify"}" data-icon="${"heroicons-solid:external-link"}" data-inline="${"false"}"></span></a></li>
	    <li class="${"svelte-1d59qtk"}"><a href="${"https://signature-history.9gr.repl.co"}">9gr&#39;s signature viewer <span class="${"iconify"}" data-icon="${"heroicons-solid:external-link"}" data-inline="${"false"}"></span></a></li></ul>
</footer>`;
});
var footer = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Footer
});
var css$8 = {
  code: "#wrapper.svelte-5s30nc.svelte-5s30nc{position:sticky;top:0px;z-index:999;width:100%}nav.svelte-5s30nc.svelte-5s30nc{background-color:var(--background);display:flex;flex-direction:row;justify-content:flex-end;align-items:flex-end;padding:0 4%}nav.svelte-5s30nc li.svelte-5s30nc{text-decoration:none;list-style:none;padding:10px 15px;user-select:none}nav.svelte-5s30nc li.svelte-5s30nc:hover{background-color:var(--background-hover)}nav.svelte-5s30nc li.svelte-5s30nc:first-of-type{margin-right:auto;font-weight:bold}#logo.svelte-5s30nc.svelte-5s30nc{font-family:'Noto Sans JP', Arial, Helvetica, sans-serif}@media only screen and (max-width: 720px){nav.svelte-5s30nc li.svelte-5s30nc:not(:first-child){display:none}}",
  map: `{"version":3,"file":"nav.svelte","sources":["nav.svelte"],"sourcesContent":["<script>\\r\\n    function changeTheme () {\\r\\n        \\r\\n    }\\r\\n</script>\\r\\n\\r\\n<div id=\\"wrapper\\">\\r\\n    <nav>\\r\\n        <li id=\\"logo\\">\\r\\n            <svg id=\\"Layer_1\\" data-name=\\"Layer 1\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 256 196\\" style=\\"width: 2em;\\"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class=\\"cls-1\\" points=\\"131.46 63 28 63 28 93 114.14 93 131.46 63\\"/><polygon class=\\"cls-1\\" points=\\"28 113 28 143 48.79 143 48.79 163 88.79 143 228 143 228 113 28 113\\"/><polygon class=\\"cls-1\\" points=\\"124.54 193 228 193 228 163 141.86 163 124.54 193\\"/></svg>\\r\\n            postpercent <span style=\\"color: var(--accent)\\">alpha</span>\\r\\n        </li>\\r\\n        <li><a href=\\"../\\">Leaderboards</a></li>\\r\\n        <li><a href=\\"../users/CatsUnited\\">Users</a></li>\\r\\n        <li on:click={changeTheme()}>Theme</li>\\r\\n    </nav>\\r\\n</div>\\r\\n<style>\\r\\n    #wrapper {position: sticky; top: 0px; z-index: 999; width: 100%;}\\r\\n    nav\\t{\\r\\n        background-color: var(--background);\\r\\n        display: flex;\\r\\n        flex-direction: row;\\r\\n        justify-content: flex-end;\\r\\n        align-items: flex-end;\\r\\n        padding: 0 4%;\\r\\n    }\\r\\n    nav li\\t{\\r\\n        text-decoration: none;\\r\\n        list-style: none;\\r\\n        padding: 10px 15px;\\r\\n        user-select: none;\\r\\n    }\\r\\n    nav li:hover\\t{\\r\\n        background-color: var(--background-hover);\\r\\n    }\\r\\n    nav li:first-of-type\\t{\\r\\n        margin-right: auto;\\r\\n        font-weight: bold;\\r\\n    }\\r\\n    #logo {\\r\\n        font-family: 'Noto Sans JP', Arial, Helvetica, sans-serif;\\r\\n    }\\r\\n    @media only screen and (max-width: 720px)   {\\r\\n        nav li:not(:first-child)    {\\r\\n            display: none;\\r\\n        }\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAkBI,QAAQ,4BAAC,CAAC,QAAQ,CAAE,MAAM,CAAE,GAAG,CAAE,GAAG,CAAE,OAAO,CAAE,GAAG,CAAE,KAAK,CAAE,IAAI,AAAC,CAAC,AACjE,GAAG,4BAAC,CAAC,AACD,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,QAAQ,CACzB,WAAW,CAAE,QAAQ,CACrB,OAAO,CAAE,CAAC,CAAC,EAAE,AACjB,CAAC,AACD,iBAAG,CAAC,EAAE,cAAC,CAAC,AACJ,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,iBAAG,CAAC,gBAAE,MAAM,AAAC,CAAC,AACV,gBAAgB,CAAE,IAAI,kBAAkB,CAAC,AAC7C,CAAC,AACD,iBAAG,CAAC,gBAAE,cAAc,AAAC,CAAC,AAClB,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,KAAK,4BAAC,CAAC,AACH,WAAW,CAAE,cAAc,CAAC,CAAC,KAAK,CAAC,CAAC,SAAS,CAAC,CAAC,UAAU,AAC7D,CAAC,AACD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAG,CAAC,AACzC,iBAAG,CAAC,gBAAE,KAAK,YAAY,CAAC,AAAI,CAAC,AACzB,OAAO,CAAE,IAAI,AACjB,CAAC,AACL,CAAC"}`
};
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<div id="${"wrapper"}" class="${"svelte-5s30nc"}"><nav class="${"svelte-5s30nc"}"><li id="${"logo"}" class="${"svelte-5s30nc"}"><svg id="${"Layer_1"}" data-name="${"Layer 1"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 256 196"}" style="${"width: 2em;"}"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class="${"cls-1"}" points="${"131.46 63 28 63 28 93 114.14 93 131.46 63"}"></polygon><polygon class="${"cls-1"}" points="${"28 113 28 143 48.79 143 48.79 163 88.79 143 228 143 228 113 28 113"}"></polygon><polygon class="${"cls-1"}" points="${"124.54 193 228 193 228 163 141.86 163 124.54 193"}"></polygon></svg>
            postpercent <span style="${"color: var(--accent)"}">alpha</span></li>
        <li class="${"svelte-5s30nc"}"><a href="${"../"}">Leaderboards</a></li>
        <li class="${"svelte-5s30nc"}"><a href="${"../users/CatsUnited"}">Users</a></li>
        <li class="${"svelte-5s30nc"}">Theme</li></nav>
</div>`;
});
var nav = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Nav
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>postpercent</title>`, ""}`, ""}
${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _layout
});
function load$1({error: error22, status}) {
  return {props: {error: error22, status}};
}
var Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error22} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Error2,
  load: load$1
});
var css$7 = {
  code: "#container.svelte-1ldinl6.svelte-1ldinl6{display:flex;justify-content:flex-start}.rank.svelte-1ldinl6.svelte-1ldinl6{min-width:3%;font-weight:bold;margin:0;padding:0;display:flex;align-items:center}.bar.svelte-1ldinl6.svelte-1ldinl6{display:flex;justify-content:flex-start;align-items:center;margin:3px 0;padding:0;background-color:var(--background-hover);height:calc(2.4em)}li.svelte-1ldinl6.svelte-1ldinl6{text-decoration:none;color:inherit;list-style:none;margin:0 5px}.bar.svelte-1ldinl6 li.svelte-1ldinl6:last-child{margin-left:auto}.posts.svelte-1ldinl6.svelte-1ldinl6{font-weight:bold}.username.svelte-1ldinl6.svelte-1ldinl6{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
  map: '{"version":3,"file":"bar.svelte","sources":["bar.svelte"],"sourcesContent":["<script>\\r\\n    export let username;\\r\\n    export let posts;\\r\\n    export let rank;\\r\\n    export let width;\\r\\n\\r\\n    import { onMount } from \'svelte\';\\r\\n    let user;\\r\\n    let custom;\\r\\n    let barWidth = 0;\\r\\n    let barColor = \\"#333333\\";\\r\\n    let lightText = 0;\\r\\n\\r\\n    function HEXtoRGB (hex) {\\r\\n        const result = /^#?([a-f\\\\d]{2})([a-f\\\\d]{2})([a-f\\\\d]{2})$/i.exec(hex);\\r\\n        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null;\\r\\n    }\\r\\n\\r\\n    async function getData() {\\r\\n        await fetch(`https://scratchdb.lefty.one/v3/user/info/${username}`)\\r\\n        .then(res => res.json())\\r\\n        .then(data => {\\r\\n            user = data;\\r\\n            barWidth = width;\\r\\n        })\\r\\n        await fetch(`https://my-ocular.jeffalo.net/api/user/${username}`)\\r\\n        .then(res => res.json())\\r\\n        .then(data => {\\r\\n            custom = data;\\r\\n            barColor = custom.color;\\r\\n            \\r\\n            if (custom.color)   {\\r\\n                const contraster = [];\\r\\n                contraster.push(HEXtoRGB(custom.color).r); contraster.push(HEXtoRGB(custom.color).g); contraster.push(HEXtoRGB(custom.color).b);\\r\\n                const brightness = Math.round(((parseInt(contraster[0]) * 299) + (parseInt(contraster[1]) * 587) + (parseInt(contraster[2]) * 114)) / 1000);\\r\\n                if (brightness > 150)   {  \\r\\n                    lightText = 1;\\r\\n                }\\r\\n            }\\r\\n        })\\r\\n    }\\r\\n    let promise = getData();\\r\\n    \\r\\n    onMount(async() => {\\r\\n        promise = getData();\\r\\n    })\\r\\n</script>\\r\\n\\r\\n\\r\\n<div id=\\"container\\">\\r\\n    <ul class=\\"rank\\">\\r\\n        <li>{rank}</li>\\r\\n    </ul>\\r\\n    <ul class=\\"bar\\" style=\\"width: {barWidth}%; background-color: {barColor}; color: {lightText == 1 ? `var(--background)` : `var(--text)`}; transition: width 1s, background-color 1s, color 1s;\\">\\r\\n        {#if user}\\r\\n            <!-- svelte-ignore a11y-missing-attribute -->\\r\\n            <li><a href=\\"/users/{user.username}\\"><img src=\\"https://cdn2.scratch.mit.edu/get_image/user/{user.id}_90x90.png\\" style={width > 5 ? \\"width: 2em; height: 2em;\\" : \\"display: none;\\"}></a></li>\\r\\n            <li class=\\"username\\"><a href=\\"/users/{user.username}\\"><nobr>{user.username}</nobr></a></li>\\r\\n            <li class=\\"posts\\"><a href=\\"/users/{user.username}\\">{posts}</a></li>\\r\\n        {:else}\\r\\n            <li><a href=\\"/users/{username}\\"><span class=\\"iconify\\" data-icon=\\"ant-design:user-outlined\\" data-inline=\\"false\\"></span></a></li>\\r\\n            <li class=\\"username\\"><a href=\\"/users/{username}\\"><nobr>{username}</nobr></a></li>\\r\\n            <li class=\\"posts\\"><a href=\\"/users/{username}\\">{posts}</a></li>\\r\\n        {/if}\\r\\n    </ul>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    #container  {\\r\\n        display: flex;\\r\\n        justify-content: flex-start;\\r\\n    }\\r\\n    .rank   {\\r\\n        min-width: 3%;\\r\\n        font-weight: bold;\\r\\n        margin: 0;\\r\\n        padding: 0;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n    }\\r\\n    .bar  {\\r\\n        display: flex;\\r\\n        justify-content: flex-start;\\r\\n        align-items: center;\\r\\n        margin: 3px 0;\\r\\n        padding: 0;\\r\\n        background-color: var(--background-hover);\\r\\n        height: calc(2.4em);\\r\\n    }\\r\\n    li  {\\r\\n        text-decoration: none;\\r\\n        color: inherit;\\r\\n        list-style: none;\\r\\n        margin: 0 5px;\\r\\n    }\\r\\n    .bar li:last-child   {\\r\\n        margin-left: auto;\\r\\n    }\\r\\n    .posts {\\r\\n        font-weight: bold;\\r\\n    }\\r\\n    .username   {\\r\\n        overflow: hidden;\\r\\n        white-space: nowrap;\\r\\n        text-overflow: ellipsis;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAoEI,UAAU,8BAAE,CAAC,AACT,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,UAAU,AAC/B,CAAC,AACD,KAAK,8BAAG,CAAC,AACL,SAAS,CAAE,EAAE,CACb,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,IAAI,8BAAE,CAAC,AACH,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,kBAAkB,CAAC,CACzC,MAAM,CAAE,KAAK,KAAK,CAAC,AACvB,CAAC,AACD,EAAE,8BAAE,CAAC,AACD,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CAAC,GAAG,AACjB,CAAC,AACD,mBAAI,CAAC,iBAAE,WAAW,AAAG,CAAC,AAClB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,MAAM,8BAAC,CAAC,AACJ,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,SAAS,8BAAG,CAAC,AACT,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,QAAQ,AAC3B,CAAC"}'
};
function HEXtoRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
var Bar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {username} = $$props;
  let {posts} = $$props;
  let {rank} = $$props;
  let {width} = $$props;
  let user;
  let custom;
  let barWidth = 0;
  let barColor = "#333333";
  let lightText = 0;
  async function getData() {
    await fetch(`https://scratchdb.lefty.one/v3/user/info/${username}`).then((res) => res.json()).then((data) => {
      user = data;
      barWidth = width;
    });
    await fetch(`https://my-ocular.jeffalo.net/api/user/${username}`).then((res) => res.json()).then((data) => {
      custom = data;
      barColor = custom.color;
      if (custom.color) {
        const contraster = [];
        contraster.push(HEXtoRGB(custom.color).r);
        contraster.push(HEXtoRGB(custom.color).g);
        contraster.push(HEXtoRGB(custom.color).b);
        const brightness = Math.round((parseInt(contraster[0]) * 299 + parseInt(contraster[1]) * 587 + parseInt(contraster[2]) * 114) / 1e3);
        if (brightness > 150) {
          lightText = 1;
        }
      }
    });
  }
  getData();
  onMount(async () => {
    getData();
  });
  if ($$props.username === void 0 && $$bindings.username && username !== void 0)
    $$bindings.username(username);
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  if ($$props.rank === void 0 && $$bindings.rank && rank !== void 0)
    $$bindings.rank(rank);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  $$result.css.add(css$7);
  return `<div id="${"container"}" class="${"svelte-1ldinl6"}"><ul class="${"rank svelte-1ldinl6"}"><li class="${"svelte-1ldinl6"}">${escape2(rank)}</li></ul>
    <ul class="${"bar svelte-1ldinl6"}" style="${"width: " + escape2(barWidth) + "%; background-color: " + escape2(barColor) + "; color: " + escape2(lightText == 1 ? `var(--background)` : `var(--text)`) + "; transition: width 1s, background-color 1s, color 1s;"}">${user ? `
            <li class="${"svelte-1ldinl6"}"><a href="${"/users/" + escape2(user.username)}"><img src="${"https://cdn2.scratch.mit.edu/get_image/user/" + escape2(user.id) + "_90x90.png"}"${add_attribute("style", width > 5 ? "width: 2em; height: 2em;" : "display: none;", 0)}></a></li>
            <li class="${"username svelte-1ldinl6"}"><a href="${"/users/" + escape2(user.username)}"><nobr>${escape2(user.username)}</nobr></a></li>
            <li class="${"posts svelte-1ldinl6"}"><a href="${"/users/" + escape2(user.username)}">${escape2(posts)}</a></li>` : `<li class="${"svelte-1ldinl6"}"><a href="${"/users/" + escape2(username)}"><span class="${"iconify"}" data-icon="${"ant-design:user-outlined"}" data-inline="${"false"}"></span></a></li>
            <li class="${"username svelte-1ldinl6"}"><a href="${"/users/" + escape2(username)}"><nobr>${escape2(username)}</nobr></a></li>
            <li class="${"posts svelte-1ldinl6"}"><a href="${"/users/" + escape2(username)}">${escape2(posts)}</a></li>`}</ul>
</div>`;
});
var bar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Bar
});
var css$6 = {
  code: "main.svelte-1gj3lpg{padding:10px calc(4% + 10px)}",
  map: `{"version":3,"file":"graph.svelte","sources":["graph.svelte"],"sourcesContent":["<script>\\r\\n    import { onMount } from 'svelte';\\r\\n    import { page, cat } from '../storage.js';\\r\\n    import Bar from './bar.svelte';\\r\\n    // import Axes from './axes.svelte';\\r\\n\\r\\n    export let category;\\r\\n\\r\\n    let users;\\r\\n    let pageCheck = $page;\\r\\n    let catCheck = $cat;\\r\\n    let graphGap, axisInterval, axisAdjust;\\r\\n\\r\\n\\r\\n    async function getData()    {\\r\\n        await fetch(\`https://scratchdb.lefty.one/v3/forum/category/rank/\${category}/\${$page}\`)\\r\\n        .then(res => res.json())\\r\\n        .then(data => {\\r\\n            users = data;\\r\\n            graphGap = 1;\\r\\n            for (let i = 0; i < String(users[0].counts[category].count).length - 1; i++) { graphGap += String(0)}\\r\\n            axisInterval = Math.round(users[0].counts[category].count / graphGap);\\r\\n            axisAdjust = ((graphGap * axisInterval) / users[0].counts[category].count);\\r\\n        })\\r\\n    }\\r\\n    let promise = getData();\\r\\n    onMount(async() => {\\r\\n        promise = getData();\\r\\n    })\\r\\n    $: if ($page != pageCheck)  {\\r\\n        promise = getData();\\r\\n        pageCheck = $page;\\r\\n    }\\r\\n    $: if ($cat != catCheck)    {\\r\\n        promise = getData();\\r\\n        catCheck = $cat;\\r\\n    }\\r\\n</script>\\r\\n<main>\\r\\n{#await promise}\\r\\n<img src=\\"../../static/loading.gif\\" alt=\\"Loading\\" class=\\"loading\\">\\r\\n{:then}\\r\\n    <!--\\r\\n    <Axes pos={2.7} title={0}></Axes>\\r\\n    {#each Array(axisInterval) as _, i}\\r\\n        <Axes pos={2.7 + (89 * axisAdjust) / axisInterval * (i + 1)} title={graphGap * (i + 1)}></Axes>\\r\\n    {/each}\\r\\n    -->\\r\\n    {#each users as {username, counts}, i }\\r\\n        <Bar username={username} posts={counts[category].count} rank={i+1 + $page*100} width={counts[category].count / users[0].counts[category].count * 97} />\\r\\n    {/each}\\r\\n{:catch}\\r\\n    <p>how did you find page {$page + 1} are you hacking</p>\\r\\n    <!-- svelte-ignore a11y-missing-attribute -->\\r\\n    <img src=\\"https://media1.tenor.com/images/a7e1806acb87623ea0d4fda7bcfb4306/tenor.gif\\">\\r\\n{/await}\\r\\n</main>\\r\\n<style>\\r\\n    main   {\\r\\n        padding: 10px calc(4% + 10px);\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA0DI,IAAI,eAAG,CAAC,AACJ,OAAO,CAAE,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,CAAC,AACjC,CAAC"}`
};
var Graph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $cat, $$unsubscribe_cat;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_cat = subscribe(cat, (value) => $cat = value);
  let {category} = $$props;
  let users;
  let pageCheck = $page;
  let catCheck = $cat;
  let graphGap, axisInterval;
  async function getData() {
    await fetch(`https://scratchdb.lefty.one/v3/forum/category/rank/${category}/${$page}`).then((res) => res.json()).then((data) => {
      users = data;
      graphGap = 1;
      for (let i = 0; i < String(users[0].counts[category].count).length - 1; i++) {
        graphGap += String(0);
      }
      axisInterval = Math.round(users[0].counts[category].count / graphGap);
      graphGap * axisInterval / users[0].counts[category].count;
    });
  }
  let promise = getData();
  onMount(async () => {
    promise = getData();
  });
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  $$result.css.add(css$6);
  {
    if ($page != pageCheck) {
      promise = getData();
      pageCheck = $page;
    }
  }
  {
    if ($cat != catCheck) {
      promise = getData();
      catCheck = $cat;
    }
  }
  $$unsubscribe_page();
  $$unsubscribe_cat();
  return `<main class="${"svelte-1gj3lpg"}">${function(__value) {
    if (is_promise(__value))
      return `
<img src="${"../../static/loading.gif"}" alt="${"Loading"}" class="${"loading"}">
`;
    return function() {
      return `
    
    ${each(users, ({username, counts}, i) => `${validate_component(Bar, "Bar").$$render($$result, {
        username,
        posts: counts[category].count,
        rank: i + 1 + $page * 100,
        width: counts[category].count / users[0].counts[category].count * 97
      }, {}, {})}`)}
`;
    }();
  }(promise)}
</main>`;
});
var graph = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Graph
});
var css$5 = {
  code: "ul.svelte-16v0a9h{background-color:var(--accent);flex-direction:column;width:25%;padding:10px 5px;max-height:150px;position:absolute;margin-left:4%}li.svelte-16v0a9h{border-bottom:1px solid var(--text);padding:5px 0;user-select:none;cursor:pointer}li.svelte-16v0a9h:first-child{border-top:1px solid var(--text)}",
  map: `{"version":3,"file":"dropdown.svelte","sources":["dropdown.svelte"],"sourcesContent":["<script>\\r\\n    export let options;\\r\\n    import { cat, dropdownActive } from '../storage.js';\\r\\n    function changeCategory (category)  {\\r\\n        cat.set(category);\\r\\n        dropdownActive.set(false)\\r\\n    }\\r\\n\\r\\n</script>\\r\\n<ul style={$dropdownActive ? \\"display: flex; overflow-y: scroll;\\" : \\"display: none; overflow-y: hidden;\\"}>\\r\\n    {#each options as i}\\r\\n        <li on:click={() => changeCategory(i)}>{i == \\"total\\" ? \\"All Categories\\" : i}</li>\\r\\n    {/each}\\r\\n</ul>\\r\\n<style>\\r\\n    ul  {\\r\\n        background-color: var(--accent);\\r\\n        flex-direction: column;\\r\\n        width: 25%;\\r\\n        padding: 10px 5px;\\r\\n        max-height: 150px;\\r\\n        position: absolute;\\r\\n        margin-left: 4%;\\r\\n    }\\r\\n    li  {\\r\\n        border-bottom: 1px solid var(--text);\\r\\n        padding: 5px 0;\\r\\n        user-select: none;\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    li:first-child  {\\r\\n        border-top: 1px solid var(--text);\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAeI,EAAE,eAAE,CAAC,AACD,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,IAAI,CAAC,GAAG,CACjB,UAAU,CAAE,KAAK,CACjB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,EAAE,AACnB,CAAC,AACD,EAAE,eAAE,CAAC,AACD,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,MAAM,CAAC,CACpC,OAAO,CAAE,GAAG,CAAC,CAAC,CACd,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,OAAO,AACnB,CAAC,AACD,iBAAE,YAAY,AAAE,CAAC,AACb,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,MAAM,CAAC,AACrC,CAAC"}`
};
var Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dropdownActive, $$unsubscribe_dropdownActive;
  $$unsubscribe_dropdownActive = subscribe(dropdownActive, (value) => $dropdownActive = value);
  let {options: options2} = $$props;
  if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
    $$bindings.options(options2);
  $$result.css.add(css$5);
  $$unsubscribe_dropdownActive();
  return `<ul${add_attribute("style", $dropdownActive ? "display: flex; overflow-y: scroll;" : "display: none; overflow-y: hidden;", 0)} class="${"svelte-16v0a9h"}">${each(options2, (i) => `<li class="${"svelte-16v0a9h"}">${escape2(i == "total" ? "All Categories" : i)}</li>`)}
</ul>`;
});
var dropdown = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Dropdown
});
var css$4 = {
  code: "header.svelte-1ncji88.svelte-1ncji88{background-color:var(--accent);display:flex;flex-direction:row;justify-content:space-between;padding:0 4%}header.svelte-1ncji88 ul.svelte-1ncji88{display:flex;flex-direction:row;width:50%;padding:0;align-items:flex-end}header.svelte-1ncji88 ul.svelte-1ncji88:nth-child(1){justify-content:flex-start}header.svelte-1ncji88 ul.svelte-1ncji88:nth-child(2){justify-content:flex-end}header.svelte-1ncji88 ul li.svelte-1ncji88{text-decoration:none;list-style:none;margin:0 10px}#header-forum-category.svelte-1ncji88.svelte-1ncji88,#graph-navigation.svelte-1ncji88 li.svelte-1ncji88{cursor:pointer}#header-forum-category.svelte-1ncji88.svelte-1ncji88{font-size:32px;font-weight:bold;user-select:none}#wrapper.svelte-1ncji88.svelte-1ncji88{position:sticky;top:calc(3em + 2px);z-index:999;width:100%}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n    import { page, cat, dropdownActive, categories } from './storage.js';\\n    import Graph from './components/graph.svelte';\\n    import Dropdown from './components/dropdown.svelte';\\n    \\n    function nextPage()  { page.update(n => n + 1);}\\n    function prevPage()  { $page == 0 ? page.set(0) : page.update(n => n - 1);}\\n    function searPage()  {const pageInput = parseInt(prompt(\\"Search for a page\\"), 10); /^[0-9.,]+$/.test(pageInput) ? page.set(pageInput - 1) : alert(\\"Not a number :(((((\\")}\\n    function toggleDropdown() {$dropdownActive ? dropdownActive.set(false) : dropdownActive.set(true)}\\n    let category = $cat;\\n    $: category = $cat;\\n</script>\\n<div id=\\"wrapper\\">\\n    <header>\\n        <ul>\\n            <!--<li id=\\"header-forum-category\\">All Categories</li>-->\\n            <li id=\\"header-forum-category\\" on:click={toggleDropdown}>{category == \\"total\\" ? \\"All Categories\\" : category} <nobr><span class=\\"iconify\\" data-icon=\\"ion-caret-down\\" data-inline=\\"false\\" style=\\"font-size: 16px;\\"></span></nobr></li>\\n            <li id=\\"header-forum-usercount\\"><nobr>Page {$page + 1}</nobr></li>\\n            \\n        </ul>\\n        <ul id=\\"graph-navigation\\">\\n            <li on:click={prevPage}><span class=\\"iconify\\" data-icon=\\"topcoat:back\\" data-inline=\\"false\\" alt=\\"Previous Page\\">Previous Page</span></li>\\n            <li on:click={searPage}><span class=\\"iconify\\" data-icon=\\"topcoat:search\\" data-inline=\\"false\\" alt=\\"Go to Page\\">Go to Page</span></li>\\n            <li on:click={nextPage}><span class=\\"iconify\\" data-icon=\\"topcoat:next\\" data-inline=\\"false\\" alt=\\"Next Page\\">Next Page</span></li>\\n           \\n        </ul>\\n    </header>\\n    <Dropdown options={categories.map(x => x[1])}></Dropdown>\\n</div>\\n\\n<style>\\n    header\\t{\\n        background-color: var(--accent);\\n        display: flex;\\n        flex-direction: row;\\n        justify-content: space-between;\\n        padding: 0 4%;\\n    }\\n    header ul\\t{\\n        display: flex;\\n        flex-direction: row;\\n        width: 50%;\\n        padding: 0;\\n        align-items: flex-end;\\n    }\\n    header ul:nth-child(1)\\t{\\n        justify-content: flex-start;\\n    }\\n    header ul:nth-child(2)\\t{\\n        justify-content: flex-end;\\n    }\\n    header ul li\\t{\\n        text-decoration: none;\\n        list-style: none;\\n        margin: 0 10px;\\n    }\\n    #header-forum-category, #graph-navigation li    {\\n        cursor: pointer;\\n    }\\n    #header-forum-category\\t{\\n        font-size: 32px;\\n        font-weight: bold;\\n        user-select: none;\\n    }\\n    #wrapper {position: sticky; top: calc(3em + 2px); z-index: 999; width: 100%;}\\n</style>\\n<Graph page={page} category={category}></Graph>"],"names":[],"mappings":"AA+BI,MAAM,8BAAC,CAAC,AACJ,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,CAAC,CAAC,EAAE,AACjB,CAAC,AACD,qBAAM,CAAC,EAAE,eAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,QAAQ,AACzB,CAAC,AACD,qBAAM,CAAC,iBAAE,WAAW,CAAC,CAAC,AAAC,CAAC,AACpB,eAAe,CAAE,UAAU,AAC/B,CAAC,AACD,qBAAM,CAAC,iBAAE,WAAW,CAAC,CAAC,AAAC,CAAC,AACpB,eAAe,CAAE,QAAQ,AAC7B,CAAC,AACD,qBAAM,CAAC,EAAE,CAAC,EAAE,eAAC,CAAC,AACV,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACD,oDAAsB,CAAE,gCAAiB,CAAC,EAAE,eAAI,CAAC,AAC7C,MAAM,CAAE,OAAO,AACnB,CAAC,AACD,sBAAsB,8BAAC,CAAC,AACpB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,QAAQ,8BAAC,CAAC,QAAQ,CAAE,MAAM,CAAE,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAE,OAAO,CAAE,GAAG,CAAE,KAAK,CAAE,IAAI,AAAC,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $$unsubscribe_dropdownActive;
  let $cat, $$unsubscribe_cat;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_dropdownActive = subscribe(dropdownActive, (value) => value);
  $$unsubscribe_cat = subscribe(cat, (value) => $cat = value);
  let category = $cat;
  $$result.css.add(css$4);
  category = $cat;
  $$unsubscribe_page();
  $$unsubscribe_dropdownActive();
  $$unsubscribe_cat();
  return `<div id="${"wrapper"}" class="${"svelte-1ncji88"}"><header class="${"svelte-1ncji88"}"><ul class="${"svelte-1ncji88"}">
            <li id="${"header-forum-category"}" class="${"svelte-1ncji88"}">${escape2(category == "total" ? "All Categories" : category)} <nobr><span class="${"iconify"}" data-icon="${"ion-caret-down"}" data-inline="${"false"}" style="${"font-size: 16px;"}"></span></nobr></li>
            <li id="${"header-forum-usercount"}" class="${"svelte-1ncji88"}"><nobr>Page ${escape2($page + 1)}</nobr></li></ul>
        <ul id="${"graph-navigation"}" class="${"svelte-1ncji88"}"><li class="${"svelte-1ncji88"}"><span class="${"iconify"}" data-icon="${"topcoat:back"}" data-inline="${"false"}" alt="${"Previous Page"}">Previous Page</span></li>
            <li class="${"svelte-1ncji88"}"><span class="${"iconify"}" data-icon="${"topcoat:search"}" data-inline="${"false"}" alt="${"Go to Page"}">Go to Page</span></li>
            <li class="${"svelte-1ncji88"}"><span class="${"iconify"}" data-icon="${"topcoat:next"}" data-inline="${"false"}" alt="${"Next Page"}">Next Page</span></li></ul></header>
    ${validate_component(Dropdown, "Dropdown").$$render($$result, {options: categories.map((x) => x[1])}, {}, {})}</div>


${validate_component(Graph, "Graph").$$render($$result, {page, category}, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Routes
});
var css$3 = {
  code: "#overlay.svelte-1dqmohy{position:fixed;width:100%;height:100%;top:0;left:0;background-color:var(--background);opacity:0.8;z-index:10000}ul.svelte-1dqmohy{position:fixed;display:flex;flex-direction:column;justify-content:center;list-style:none;top:50%;margin:auto;background-color:var(--accent);opacity:1;z-index:10001}li.svelte-1dqmohy:first-child{font-size:32px}",
  map: '{"version":3,"file":"dialog.svelte","sources":["dialog.svelte"],"sourcesContent":["<div id=\\"overlay\\">\\r\\n</div>\\r\\n<ul>\\r\\n    <li>Header!</li>\\r\\n    <li>Test!</li>\\r\\n</ul>\\r\\n<style>\\r\\n    #overlay    {\\r\\n        position: fixed;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background-color: var(--background);\\r\\n        opacity: 0.8;\\r\\n        z-index: 10000;\\r\\n    }\\r\\n    ul  {\\r\\n        position: fixed;\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        justify-content: center;\\r\\n        list-style: none;\\r\\n        top: 50%;\\r\\n        margin: auto;\\r\\n        background-color: var(--accent);\\r\\n        opacity: 1;\\r\\n        z-index: 10001;\\r\\n    }\\r\\n    li:first-child  {\\r\\n        font-size: 32px;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAOI,QAAQ,eAAI,CAAC,AACT,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,KAAK,AAClB,CAAC,AACD,EAAE,eAAE,CAAC,AACD,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,IAAI,CAChB,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,KAAK,AAClB,CAAC,AACD,iBAAE,YAAY,AAAE,CAAC,AACb,SAAS,CAAE,IAAI,AACnB,CAAC"}'
};
var Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div id="${"overlay"}" class="${"svelte-1dqmohy"}"></div>
<ul class="${"svelte-1dqmohy"}"><li class="${"svelte-1dqmohy"}">Header!</li>
    <li class="${"svelte-1dqmohy"}">Test!</li>
</ul>`;
});
var dialog = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Dialog
});
var css$2 = {
  code: "#axis.svelte-10zlmgc{height:100%;z-index:-999;position:fixed;width:2px;background-color:var(--graph-axes);height:100%}#title.svelte-10zlmgc{color:var(--graph-axes);background-color:var(--background);padding:0 5px;z-index:-999;position:fixed;display:flex;align-self:center}",
  map: '{"version":3,"file":"axes.svelte","sources":["axes.svelte"],"sourcesContent":["<script>\\r\\n    export let pos;\\r\\n    export let title;\\r\\n</script>\\r\\n\\r\\n<div id=\\"title\\" style=\\"margin-left: {pos}%\\">{title}</div>\\r\\n<div id=\\"axis\\" style=\\"margin-left: {pos}%\\"></div>\\r\\n\\r\\n<style>\\r\\n    #axis   {\\r\\n        height: 100%;\\r\\n        z-index: -999;\\r\\n        position: fixed;\\r\\n        width: 2px;\\r\\n        background-color: var(--graph-axes);\\r\\n        height: 100%;\\r\\n    }\\r\\n    #title  {\\r\\n        color: var(--graph-axes);\\r\\n        background-color: var(--background);\\r\\n        padding: 0 5px;\\r\\n        z-index: -999;\\r\\n        position: fixed;\\r\\n        display: flex;\\r\\n        align-self: center;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AASI,KAAK,eAAG,CAAC,AACL,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,GAAG,CACV,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,MAAM,CAAE,IAAI,AAChB,CAAC,AACD,MAAM,eAAE,CAAC,AACL,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAAM,AACtB,CAAC"}'
};
var Axes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {pos} = $$props;
  let {title} = $$props;
  if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0)
    $$bindings.pos(pos);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$2);
  return `<div id="${"title"}" style="${"margin-left: " + escape2(pos) + "%"}" class="${"svelte-10zlmgc"}">${escape2(title)}</div>
<div id="${"axis"}" style="${"margin-left: " + escape2(pos) + "%"}" class="${"svelte-10zlmgc"}"></div>`;
});
var axes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Axes
});
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: About
});
var css$1 = {
  code: "canvas.svelte-39swhf.svelte-39swhf{overflow:hidden}.category-header-container.svelte-39swhf.svelte-39swhf{display:flex;flex-direction:row;justify-content:flex-end;align-items:flex-end;width:100%;margin:0;padding:0}.category-header-container.svelte-39swhf li.svelte-39swhf:first-of-type{margin-right:auto}.category-header-container.svelte-39swhf li.svelte-39swhf{text-decoration:none;list-style:none;margin:0 10px}.category-header-left.svelte-39swhf.svelte-39swhf{font-size:32px;font-weight:bold}",
  map: '{"version":3,"file":"charts.svelte","sources":["charts.svelte"],"sourcesContent":["<script>\\r\\n\\timport { onMount } from \'svelte\';\\r\\n\\timport Chart from \\"chart.js\\"\\r\\n\\t\\r\\n\\texport let username;\\r\\n    export let color;\\r\\n\\r\\n\\tlet precise;\\r\\n\\tlet ctx, ctx2, ctx3, ctx4;\\r\\n\\tlet postoffset;\\r\\n\\r\\n\\tasync function getData()    {\\r\\n\\t\\tawait fetch(`https://scratchdb.lefty.one/v3/forum/user/graph/${username}/total?segment=month&range=3650`)\\r\\n\\t\\t.then(res => res.json())\\r\\n        .then(data => {\\r\\n            precise = data;\\r\\n\\t\\t\\tlet dategraph = [];\\r\\n\\t\\t\\tlet postgraph = [];\\r\\n            let postgraph2 = [];\\r\\n\\t\\t\\tfor (let i = 0; i < precise.length - 1; i++)\\t{\\r\\n\\t\\t\\t\\tdategraph.push(`${new Date(precise[i].date).getMonth() + 1}/${new Date(precise[i].date).getDate()}/${new Date(precise[i].date).getFullYear()}`)\\r\\n\\t\\t\\t\\tpostgraph.push(precise[i].value)\\r\\n                if (i == 0) {\\r\\n                    postgraph2.push(precise[i].value)\\r\\n                } else  {\\r\\n                    postgraph2.push(precise[i].value - precise[i-1].value)\\r\\n                }\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\tpostoffset = postgraph[postgraph.length - 12];\\r\\n\\t\\t\\tvar chart = new Chart(ctx, {\\r\\n\\t\\t\\ttype: \\"line\\",\\r\\n\\t\\t\\tdata: {\\r\\n\\t\\t\\t\\tlabels: dategraph,\\r\\n\\t\\t\\t\\tdatasets: [\\r\\n\\t\\t\\t\\t{\\r\\n\\t\\t\\t\\t\\tlabel: `${username}`,\\r\\n\\t\\t\\t\\t\\tbackgroundColor: color,\\r\\n\\t\\t\\t\\t\\tborderColor: color,\\r\\n\\t\\t\\t\\t\\tdata: postgraph,\\r\\n\\t\\t\\t\\t\\tfill: false,\\r\\n\\t\\t\\t\\t\\ttension: 0.05\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t]\\r\\n\\t\\t\\t},\\r\\n\\t\\t\\toptions: {\\r\\n\\t\\t\\t\\tresponsive: true,\\r\\n\\t\\t\\t\\ttooltips: {\\r\\n\\t\\t\\t\\t\\tmode: \'index\',\\r\\n\\t\\t\\t\\t\\tintersect: false,\\r\\n\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\thover: {\\r\\n\\t\\t\\t\\t\\tmode: \'nearest\',\\r\\n\\t\\t\\t\\t\\tintersect: true,\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\t});\\r\\n            var chart = new Chart(ctx3, {\\r\\n\\t\\t\\ttype: \\"line\\",\\r\\n\\t\\t\\tdata: {\\r\\n\\t\\t\\t\\tlabels: dategraph,\\r\\n\\t\\t\\t\\tdatasets: [\\r\\n\\t\\t\\t\\t{\\r\\n\\t\\t\\t\\t\\tlabel: `${username}`,\\r\\n\\t\\t\\t\\t\\tbackgroundColor: color,\\r\\n\\t\\t\\t\\t\\tborderColor: color,\\r\\n\\t\\t\\t\\t\\tdata: postgraph2,\\r\\n\\t\\t\\t\\t\\tfill: false,\\r\\n\\t\\t\\t\\t\\ttension: 0.05\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t]\\r\\n\\t\\t\\t},\\r\\n\\t\\t\\toptions: {\\r\\n\\t\\t\\t\\tresponsive: true,\\r\\n\\t\\t\\t\\ttooltips: {\\r\\n\\t\\t\\t\\t\\tmode: \'index\',\\r\\n\\t\\t\\t\\t\\tintersect: false,\\r\\n\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\thover: {\\r\\n\\t\\t\\t\\t\\tmode: \'nearest\',\\r\\n\\t\\t\\t\\t\\tintersect: true,\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\t});\\r\\n        })\\r\\n\\t\\tawait fetch(`https://scratchdb.lefty.one/v3/forum/user/graph/${username}/total?segment=6&range=365`)\\r\\n\\t\\t.then(res => res.json())\\r\\n        .then(data => {\\r\\n            precise = data;\\r\\n\\t\\t\\tlet dategraph = [];\\r\\n\\t\\t\\tlet postgraph = [];\\r\\n\\t\\t\\tlet postgraph2 = [];\\r\\n\\t\\t\\tfor (let i = 0; i < precise.length - 2; i++)\\t{\\r\\n\\t\\t\\t\\tdategraph.push(`${new Date(precise[i].date).getMonth() + 1}/${new Date(precise[i].date).getDate()}/${new Date(precise[i].date).getFullYear()}`)\\r\\n\\t\\t\\t\\tpostgraph.push(precise[i].value + postoffset)\\r\\n                if (i == 0) {\\r\\n                    postgraph2.push(precise[i].value)\\r\\n                } else  {\\r\\n                    postgraph2.push(precise[i].value - precise[i-1].value)\\r\\n                }\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\tvar chart = new Chart(ctx2, {\\r\\n\\t\\t\\ttype: \\"line\\",\\r\\n\\t\\t\\tdata: {\\r\\n\\t\\t\\t\\tlabels: dategraph,\\r\\n\\t\\t\\t\\tdatasets: [\\r\\n\\t\\t\\t\\t{\\r\\n\\t\\t\\t\\t\\tlabel: `${username}`,\\r\\n\\t\\t\\t\\t\\tbackgroundColor: color,\\r\\n\\t\\t\\t\\t\\tborderColor: color,\\r\\n\\t\\t\\t\\t\\tdata: postgraph,\\r\\n\\t\\t\\t\\t\\tfill: false,\\r\\n\\t\\t\\t\\t\\ttension: 0.05\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t]\\r\\n\\t\\t\\t},\\r\\n\\t\\t\\toptions: {\\r\\n\\t\\t\\t\\tresponsive: true,\\r\\n\\t\\t\\t\\ttooltips: {\\r\\n\\t\\t\\t\\t\\tmode: \'index\',\\r\\n\\t\\t\\t\\t\\tintersect: false,\\r\\n\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\thover: {\\r\\n\\t\\t\\t\\t\\tmode: \'nearest\',\\r\\n\\t\\t\\t\\t\\tintersect: true,\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\t});\\r\\n            var chart = new Chart(ctx4, {\\r\\n\\t\\t\\ttype: \\"line\\",\\r\\n\\t\\t\\tdata: {\\r\\n\\t\\t\\t\\tlabels: dategraph,\\r\\n\\t\\t\\t\\tdatasets: [\\r\\n\\t\\t\\t\\t{\\r\\n\\t\\t\\t\\t\\tlabel: `${username}`,\\r\\n\\t\\t\\t\\t\\tbackgroundColor: color,\\r\\n\\t\\t\\t\\t\\tborderColor: color,\\r\\n\\t\\t\\t\\t\\tdata: postgraph2,\\r\\n\\t\\t\\t\\t\\tfill: false,\\r\\n\\t\\t\\t\\t\\ttension: 0.05\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t]\\r\\n\\t\\t\\t},\\r\\n\\t\\t\\toptions: {\\r\\n\\t\\t\\t\\tresponsive: true,\\r\\n\\t\\t\\t\\ttooltips: {\\r\\n\\t\\t\\t\\t\\tmode: \'index\',\\r\\n\\t\\t\\t\\t\\tintersect: false,\\r\\n\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\thover: {\\r\\n\\t\\t\\t\\t\\tmode: \'nearest\',\\r\\n\\t\\t\\t\\t\\tintersect: true,\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\t});\\r\\n        })\\r\\n    }\\r\\n    let promise = getData();\\r\\n    onMount(async() => {\\r\\n\\t\\tctx = document.getElementById(\\"totalpostcountmonthly\\").getContext(\\"2d\\");\\r\\n\\t\\tctx2 = document.getElementById(\\"totalpostcountweekly\\").getContext(\\"2d\\");\\r\\n\\r\\n        ctx3 = document.getElementById(\\"postspermonth\\").getContext(\\"2d\\");\\r\\n\\t\\tctx4 = document.getElementById(\\"postsperweek\\").getContext(\\"2d\\");\\r\\n        promise = getData();\\r\\n    })\\r\\n</script>\\r\\n\\r\\n<ul class=\\"category-header-container\\">\\r\\n    <li class=\\"category-header-left\\">Total Post Count</li>\\r\\n    <li class=\\"category-header-right\\">(monthly, all time)</li>\\r\\n</ul>\\r\\n<canvas id=\\"totalpostcountmonthly\\" height=75></canvas>\\r\\n<br>\\r\\n<ul class=\\"category-header-container\\">\\r\\n    <li class=\\"category-header-left\\">Total Post Count</li>\\r\\n    <li class=\\"category-header-right\\">(weekly, past 12 months)</li>\\r\\n</ul>\\r\\n<canvas id=\\"totalpostcountweekly\\" height=75></canvas>\\r\\n<ul class=\\"category-header-container\\">\\r\\n    <li class=\\"category-header-left\\">Posts Per Month</li>\\r\\n    <li class=\\"category-header-right\\">(all time)</li>\\r\\n</ul>\\r\\n<canvas id=\\"postspermonth\\" height=75></canvas>\\r\\n<ul class=\\"category-header-container\\">\\r\\n    <li class=\\"category-header-left\\">Posts Per Week</li>\\r\\n    <li class=\\"category-header-right\\">(past 12 months)</li>\\r\\n</ul>\\r\\n<canvas id=\\"postsperweek\\" height=75></canvas>\\r\\n\\r\\n\\r\\n<style>\\r\\n\\tcanvas\\t{\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n    .category-header-container\\t{\\r\\n\\t\\tdisplay: flex;\\r\\n        flex-direction: row;\\r\\n\\t\\tjustify-content: flex-end;\\r\\n\\t\\talign-items: flex-end;\\r\\n\\t\\twidth: 100%;\\r\\n        margin: 0;\\r\\n        padding: 0;\\r\\n\\t}\\r\\n\\t.category-header-container li:first-of-type\\t{\\r\\n\\t\\tmargin-right: auto;\\r\\n\\t}\\r\\n    .category-header-container li\\t{\\r\\n        text-decoration: none;\\r\\n        list-style: none;\\r\\n        margin: 0 10px;\\r\\n    }\\r\\n    .category-header-left\\t{\\r\\n        font-size: 32px;\\r\\n        font-weight: bold;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA+LC,MAAM,4BAAC,CAAC,AACP,QAAQ,CAAE,MAAM,AACjB,CAAC,AACE,0BAA0B,4BAAC,CAAC,AAC9B,OAAO,CAAE,IAAI,CACP,cAAc,CAAE,GAAG,CACzB,eAAe,CAAE,QAAQ,CACzB,WAAW,CAAE,QAAQ,CACrB,KAAK,CAAE,IAAI,CACL,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACjB,CAAC,AACD,wCAA0B,CAAC,gBAAE,cAAc,AAAC,CAAC,AAC5C,YAAY,CAAE,IAAI,AACnB,CAAC,AACE,wCAA0B,CAAC,EAAE,cAAC,CAAC,AAC3B,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACD,qBAAqB,4BAAC,CAAC,AACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACrB,CAAC"}'
};
var Charts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {username} = $$props;
  let {color} = $$props;
  let precise;
  let ctx, ctx2, ctx3, ctx4;
  let postoffset;
  async function getData() {
    await fetch(`https://scratchdb.lefty.one/v3/forum/user/graph/${username}/total?segment=month&range=3650`).then((res) => res.json()).then((data) => {
      precise = data;
      let dategraph = [];
      let postgraph = [];
      let postgraph2 = [];
      for (let i = 0; i < precise.length - 1; i++) {
        dategraph.push(`${new Date(precise[i].date).getMonth() + 1}/${new Date(precise[i].date).getDate()}/${new Date(precise[i].date).getFullYear()}`);
        postgraph.push(precise[i].value);
        if (i == 0) {
          postgraph2.push(precise[i].value);
        } else {
          postgraph2.push(precise[i].value - precise[i - 1].value);
        }
      }
      postoffset = postgraph[postgraph.length - 12];
      new import_chart.default(ctx, {
        type: "line",
        data: {
          labels: dategraph,
          datasets: [
            {
              label: `${username}`,
              backgroundColor: color,
              borderColor: color,
              data: postgraph,
              fill: false,
              tension: 0.05
            }
          ]
        },
        options: {
          responsive: true,
          tooltips: {mode: "index", intersect: false},
          hover: {mode: "nearest", intersect: true}
        }
      });
      new import_chart.default(ctx3, {
        type: "line",
        data: {
          labels: dategraph,
          datasets: [
            {
              label: `${username}`,
              backgroundColor: color,
              borderColor: color,
              data: postgraph2,
              fill: false,
              tension: 0.05
            }
          ]
        },
        options: {
          responsive: true,
          tooltips: {mode: "index", intersect: false},
          hover: {mode: "nearest", intersect: true}
        }
      });
    });
    await fetch(`https://scratchdb.lefty.one/v3/forum/user/graph/${username}/total?segment=6&range=365`).then((res) => res.json()).then((data) => {
      precise = data;
      let dategraph = [];
      let postgraph = [];
      let postgraph2 = [];
      for (let i = 0; i < precise.length - 2; i++) {
        dategraph.push(`${new Date(precise[i].date).getMonth() + 1}/${new Date(precise[i].date).getDate()}/${new Date(precise[i].date).getFullYear()}`);
        postgraph.push(precise[i].value + postoffset);
        if (i == 0) {
          postgraph2.push(precise[i].value);
        } else {
          postgraph2.push(precise[i].value - precise[i - 1].value);
        }
      }
      new import_chart.default(ctx2, {
        type: "line",
        data: {
          labels: dategraph,
          datasets: [
            {
              label: `${username}`,
              backgroundColor: color,
              borderColor: color,
              data: postgraph,
              fill: false,
              tension: 0.05
            }
          ]
        },
        options: {
          responsive: true,
          tooltips: {mode: "index", intersect: false},
          hover: {mode: "nearest", intersect: true}
        }
      });
      new import_chart.default(ctx4, {
        type: "line",
        data: {
          labels: dategraph,
          datasets: [
            {
              label: `${username}`,
              backgroundColor: color,
              borderColor: color,
              data: postgraph2,
              fill: false,
              tension: 0.05
            }
          ]
        },
        options: {
          responsive: true,
          tooltips: {mode: "index", intersect: false},
          hover: {mode: "nearest", intersect: true}
        }
      });
    });
  }
  getData();
  onMount(async () => {
    ctx = document.getElementById("totalpostcountmonthly").getContext("2d");
    ctx2 = document.getElementById("totalpostcountweekly").getContext("2d");
    ctx3 = document.getElementById("postspermonth").getContext("2d");
    ctx4 = document.getElementById("postsperweek").getContext("2d");
    getData();
  });
  if ($$props.username === void 0 && $$bindings.username && username !== void 0)
    $$bindings.username(username);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$1);
  return `<ul class="${"category-header-container svelte-39swhf"}"><li class="${"category-header-left svelte-39swhf"}">Total Post Count</li>
    <li class="${"category-header-right svelte-39swhf"}">(monthly, all time)</li></ul>
<canvas id="${"totalpostcountmonthly"}" height="${"75"}" class="${"svelte-39swhf"}"></canvas>
<br>
<ul class="${"category-header-container svelte-39swhf"}"><li class="${"category-header-left svelte-39swhf"}">Total Post Count</li>
    <li class="${"category-header-right svelte-39swhf"}">(weekly, past 12 months)</li></ul>
<canvas id="${"totalpostcountweekly"}" height="${"75"}" class="${"svelte-39swhf"}"></canvas>
<ul class="${"category-header-container svelte-39swhf"}"><li class="${"category-header-left svelte-39swhf"}">Posts Per Month</li>
    <li class="${"category-header-right svelte-39swhf"}">(all time)</li></ul>
<canvas id="${"postspermonth"}" height="${"75"}" class="${"svelte-39swhf"}"></canvas>
<ul class="${"category-header-container svelte-39swhf"}"><li class="${"category-header-left svelte-39swhf"}">Posts Per Week</li>
    <li class="${"category-header-right svelte-39swhf"}">(past 12 months)</li></ul>
<canvas id="${"postsperweek"}" height="${"75"}" class="${"svelte-39swhf"}"></canvas>`;
});
var charts = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Charts
});
var css = {
  code: "header.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{background-color:var(--accent);display:flex;justify-content:space-between;padding:0 4%;transition:background-color 1s, color 1s;position:sticky;top:calc(3em + 1.5px)}header.svelte-1xfozvg ul.svelte-1xfozvg.svelte-1xfozvg{display:flex;flex-direction:row;width:50%;padding:0;align-items:flex-end}header.svelte-1xfozvg ul.svelte-1xfozvg li.svelte-1xfozvg{text-decoration:none;list-style:none;margin:0 10px}.info-container.svelte-1xfozvg>li.svelte-1xfozvg.svelte-1xfozvg:first-child{margin-bottom:auto}.pfp-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{justify-content:flex-start;user-select:none}.misc-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.info-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{justify-content:flex-end}.posts-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.pfp-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{flex-direction:row}.total-post-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.rank-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.info-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{flex-direction:column}.username.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.ranking.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.total-posts.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{font-size:32px;font-weight:bold}.status.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{margin-bottom:12px}.total-posts-header.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg,.ranking-header.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{font-weight:bold}main.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{padding:10px calc(4% + 10px)}.pfp.svelte-1xfozvg img.svelte-1xfozvg.svelte-1xfozvg{width:150px;height:150px}.post-dist-container.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;margin:auto}.post-dist-bar.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{display:flex;flex-direction:row;justify-content:space-between;width:25%;user-select:none}@media only screen and (max-width: 1200px){.post-dist-bar.svelte-1xfozvg.svelte-1xfozvg.svelte-1xfozvg{width:50%}}.post-dist-bar.svelte-1xfozvg ul.svelte-1xfozvg.svelte-1xfozvg{text-align:right;padding:0;margin:0}.post-dist-bar.svelte-1xfozvg li.svelte-1xfozvg.svelte-1xfozvg{text-decoration:none;list-style:none}.post-dist-bar.svelte-1xfozvg>li.svelte-1xfozvg.svelte-1xfozvg{padding-left:3px}.post-dist-bar.svelte-1xfozvg li.svelte-1xfozvg.svelte-1xfozvg{padding-right:3px;margin:3px 0}.post-dist-bar.svelte-1xfozvg li.svelte-1xfozvg.svelte-1xfozvg:first-child{font-weight:bold}",
  map: '{"version":3,"file":"[slug].svelte","sources":["[slug].svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n\\texport async function load (ctx)\\t{\\r\\n\\t\\tlet slug = ctx.page.params.slug;\\r\\n\\t\\treturn { props: {slug}};\\r\\n\\t}\\r\\n</script>\\r\\n<script>\\r\\n\\timport { onMount } from \'svelte\';\\r\\n\\timport { cat } from \'../storage.js\';\\r\\n\\timport { HEXtoRGB } from \'./components/hextorgb.js\';\\r\\n\\timport { rankifier } from \'./components/rankifier.js\';\\r\\n\\timport { HSVtoRGB } from \'./components/hsvtorgb.js\';\\r\\n\\timport Charts from \\"./components/charts.svelte\\";\\r\\n\\t\\r\\n\\texport let slug;\\r\\n\\r\\n\\tlet username = slug;\\r\\n\\tlet user, forum, custom;\\r\\n\\tlet headColor = \\"var(--accent)\\";\\r\\n\\tlet monthList = [\\"January\\", \\"February\\", \\"March\\", \\"April\\", \\"May\\", \\"June\\", \\"July\\", \\"August\\", \\"September\\", \\"October\\", \\"November\\", \\"December\\"];\\r\\n\\tlet lightText = 0;\\r\\n\\r\\n\\tasync function getData()    {\\r\\n\\t\\tawait fetch(`https://scratchdb.lefty.one/v3/user/info/${slug}`)\\r\\n        .then(res => res.json())\\r\\n        .then(data => {\\r\\n            user = data;\\r\\n        })\\r\\n        await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${slug}/`)\\r\\n        .then(res => res.json())\\r\\n        .then(data => {\\r\\n            forum = data;\\r\\n        })\\r\\n\\t\\tawait fetch(`https://my-ocular.jeffalo.net/api/user/${slug}`)\\r\\n        .then(res => res.json())\\r\\n        .then(data => {\\r\\n            custom = data;\\r\\n\\t\\t\\theadColor = custom.color;\\r\\n\\t\\t\\tif (custom.color)   {\\r\\n                const contraster = [];\\r\\n                contraster.push(HEXtoRGB(custom.color).r); contraster.push(HEXtoRGB(custom.color).g); contraster.push(HEXtoRGB(custom.color).b);\\r\\n                const brightness = Math.round(((parseInt(contraster[0]) * 299) + (parseInt(contraster[1]) * 587) + (parseInt(contraster[2]) * 114)) / 1000);\\r\\n\\t\\t\\t\\tbrightness > 150 ? lightText = 1 : lightText = 0;\\r\\n            }\\r\\n        })\\r\\n    }\\r\\n    let promise = getData();\\r\\n    onMount(async() => {\\r\\n        promise = getData();\\r\\n    })\\r\\n\\r\\n\\t$: if (username !== slug)\\t{\\r\\n\\t\\tusername = slug;\\r\\n\\t\\tpromise = getData();\\r\\n\\t}\\r\\n</script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t{#await promise}\\r\\n\\t<title>Loading user {slug}</title> \\r\\n\\t{:then} \\r\\n\\t<title>{slug} - postpercent</title>\\r\\n\\t{:catch}\\r\\n\\t<title>Error loading user {slug}</title>\\r\\n\\t{/await}\\r\\n</svelte:head>\\r\\n\\r\\n<header style=\\"background-color:{headColor}; color:{lightText == 1 ? `var(--background)` : `var(--text)`}\\">\\r\\n\\t<ul class=\\"pfp-container\\">\\r\\n\\t\\t<li class=\\"pfp\\">\\r\\n\\t\\t\\t{#if user}\\r\\n\\t\\t\\t<a href=\\"/users/{user.username}\\"><img src=\\"https://cdn2.scratch.mit.edu/get_image/user/{user.id}_150x150.png\\" alt={slug}></a>\\r\\n\\t\\t\\t{:else}\\r\\n\\t\\t\\t<a href=\\"/users/{slug}\\"><span class=\\"iconify\\" data-icon=\\"ant-design:user-outlined\\" data-inline=\\"false\\"></span></a>\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t</li>\\r\\n\\t</ul>\\r\\n\\t<ul class=\\"info-container\\">\\r\\n\\t\\t<li class=\\"username\\">\\r\\n\\t\\t\\t<a href=\\"/users/{slug}\\"><nobr>{slug}</nobr></a>\\r\\n\\t\\t</li>\\r\\n\\t\\t<li class=\\"status\\">\\r\\n\\t\\t\\t{#if custom}\\r\\n\\t\\t\\t\\t{#if custom.error == \\"no user found\\"}\\r\\n\\t\\t\\t\\t\\tNo Ocular status found\\r\\n\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t\\t{custom.status}\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\tGetting status...\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t</li>\\r\\n\\t\\t<ul class=\\"posts-container\\">\\r\\n\\t\\t\\t<ul class=\\"total-post-container\\">\\r\\n\\t\\t\\t\\t<li class=\\"total-posts-header\\">Total Posts</li>\\r\\n\\t\\t\\t\\t{#if forum}\\r\\n\\t\\t\\t\\t\\t<li class=\\"total-posts\\">{forum.counts.total.count}</li>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</ul>\\r\\n\\t\\t\\t<ul class=\\"rank-container\\">\\r\\n\\t\\t\\t\\t<li class=\\"ranking-header\\">Rank</li>\\r\\n\\t\\t\\t\\t{#if forum}\\r\\n\\t\\t\\t\\t\\t<li class=\\"ranking\\">{rankifier(forum.counts.total.rank)}</li>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</ul>\\r\\n\\t\\t</ul>\\r\\n\\t\\t<ul class=\\"misc-container\\">\\r\\n\\t\\t\\t<li class=\\"first-posted\\">\\r\\n\\t\\t\\t\\t{#if forum}\\r\\n\\t\\t\\t\\t\\t<nobr>{monthList[new Date(forum.firstSeen.date).getMonth()]} {rankifier(new Date(forum.firstSeen.date).getDate())}, {new Date(forum.firstSeen.date).getFullYear()}</nobr>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t\\t<li class=\\"last-posted\\">\\r\\n\\t\\t\\t\\t{#if forum}\\r\\n\\t\\t\\t\\t\\t<nobr>{monthList[new Date(forum.lastSeen.date).getMonth()]} {rankifier(new Date(forum.lastSeen.date).getDate())}, {new Date(forum.lastSeen.date).getFullYear()}</nobr>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t\\t<li class=\\"scratch-link\\">\\r\\n\\t\\t\\t\\t<a href=\\"https:/scratch.mit.edu/users/{slug}\\">scratch</a>\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t\\t<li class=\\"ocular-link\\">\\r\\n\\t\\t\\t\\t<a href=\\"https://ocular.jeffalo.net/user/{slug}\\">ocular</a>\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t</ul>\\r\\n\\t</ul>\\r\\n</header>\\r\\n<main>\\r\\n\\t{#await promise}\\r\\n\\t<img src=\\"../../static/loading.gif\\" alt=\\"Loading\\" class=\\"loading\\">\\r\\n\\t{:then}\\r\\n\\t<div class=\\"post-dist-container\\">\\r\\n\\t\\t{#each Object.entries(forum.counts) as i}\\r\\n\\t\\t\\t{#if i[0] != `total`}\\r\\n\\t\\t\\t\\t<div class=\\"post-dist-bar\\" style=\\"background-color: rgb({Math.random()*100},{Math.random()*100},{Math.random()*100}); order: {i[1].count * -1}\\">\\r\\n\\t\\t\\t\\t\\t<li><a href=\\"../\\" on:click={cat.set(i[0])}>{i[0]}</a></li>\\r\\n\\t\\t\\t\\t\\t<ul>\\r\\n\\t\\t\\t\\t\\t\\t<li>{i[1].count}</li>\\r\\n\\t\\t\\t\\t\\t\\t<li>{rankifier(i[1].rank)}</li>\\r\\n\\t\\t\\t\\t\\t\\t<li>{Math.round(i[1].count / forum.counts.total.count * 10000)/100}%</li>\\r\\n\\t\\t\\t\\t\\t</ul>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n\\t<br>\\r\\n\\t<Charts username={slug} color={custom.color ? custom.color : `#f54260`}></Charts>\\r\\n\\t{:catch}\\r\\n\\tsomething broke\\r\\n\\t{/await}\\r\\n\\t<br>\\r\\n</main>\\r\\n\\r\\n<style>\\r\\n\\theader\\t{\\r\\n        background-color: var(--accent);\\r\\n        display: flex;\\r\\n        justify-content: space-between;\\r\\n        padding: 0 4%;\\r\\n\\t\\ttransition: background-color 1s, color 1s;\\r\\n\\t\\tposition: sticky;\\r\\n\\t\\ttop: calc(3em + 1.5px);\\r\\n    }\\r\\n\\theader ul\\t{\\r\\n        display: flex;\\r\\n        flex-direction: row;\\r\\n        width: 50%;\\r\\n        padding: 0;\\r\\n        align-items: flex-end;\\r\\n    }\\r\\n\\theader ul li\\t{\\r\\n        text-decoration: none;\\r\\n        list-style: none;\\r\\n        margin: 0 10px;\\r\\n    }\\r\\n\\t.info-container > li:first-child\\t{\\r\\n\\t\\tmargin-bottom: auto;\\r\\n\\t}\\r\\n\\t.pfp-container\\t{\\r\\n\\t\\tjustify-content: flex-start;\\r\\n\\t\\tuser-select: none;\\r\\n\\t}\\r\\n\\t.misc-container, .info-container\\t{\\r\\n\\t\\tjustify-content: flex-end;\\r\\n\\t}\\r\\n\\t.posts-container, .pfp-container\\t{\\r\\n\\t\\tflex-direction: row;\\r\\n\\t}\\r\\n\\t.total-post-container, .rank-container, .info-container\\t{\\r\\n\\t\\tflex-direction: column;\\r\\n\\t}\\r\\n\\r\\n\\t.username, .ranking, .total-posts\\t{\\r\\n        font-size: 32px;\\r\\n        font-weight: bold;\\r\\n    }\\r\\n\\t.status\\t{\\r\\n\\t\\tmargin-bottom: 12px;\\r\\n\\t}\\r\\n\\t.total-posts-header, .ranking-header\\t{\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n\\r\\n\\tmain   {\\r\\n        padding: 10px calc(4% + 10px);\\r\\n    }\\r\\n\\t.pfp img\\t{\\r\\n\\t\\twidth: 150px;\\r\\n\\t\\theight: 150px;\\r\\n\\t}\\r\\n\\t.post-dist-container\\t{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: row;\\r\\n\\t\\tflex-wrap: wrap;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmargin: auto;\\r\\n\\t}\\r\\n\\t.post-dist-bar\\t{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: row;\\r\\n\\t\\tjustify-content: space-between;\\r\\n\\t\\twidth: 25%;\\r\\n\\t\\tuser-select: none;\\r\\n\\t}\\r\\n\\t@media only screen and (max-width: 1200px)   {\\r\\n        .post-dist-bar    {\\r\\n            width: 50%;\\r\\n        }\\r\\n    }\\r\\n\\t.post-dist-bar ul\\t{\\r\\n\\t\\ttext-align: right;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tmargin: 0;\\r\\n\\t}\\r\\n\\t.post-dist-bar li\\t{\\r\\n\\t\\ttext-decoration: none;\\r\\n        list-style: none;\\r\\n\\t}\\r\\n\\t.post-dist-bar > li\\t{\\r\\n\\t\\tpadding-left: 3px;\\r\\n\\t}\\r\\n\\t.post-dist-bar li\\t{\\r\\n\\t\\tpadding-right: 3px;\\r\\n\\t\\tmargin: 3px 0;\\r\\n\\t}\\r\\n\\t.post-dist-bar li:first-child\\t{\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAyJC,MAAM,6CAAC,CAAC,AACD,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,CAAC,CAAC,EAAE,CACnB,UAAU,CAAE,gBAAgB,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,EAAE,CACzC,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,AACpB,CAAC,AACJ,qBAAM,CAAC,EAAE,8BAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,QAAQ,AACzB,CAAC,AACJ,qBAAM,CAAC,iBAAE,CAAC,EAAE,eAAC,CAAC,AACP,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACJ,8BAAe,CAAG,gCAAE,YAAY,AAAC,CAAC,AACjC,aAAa,CAAE,IAAI,AACpB,CAAC,AACD,cAAc,6CAAC,CAAC,AACf,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,4DAAe,CAAE,eAAe,6CAAC,CAAC,AACjC,eAAe,CAAE,QAAQ,AAC1B,CAAC,AACD,6DAAgB,CAAE,cAAc,6CAAC,CAAC,AACjC,cAAc,CAAE,GAAG,AACpB,CAAC,AACD,kEAAqB,CAAE,4DAAe,CAAE,eAAe,6CAAC,CAAC,AACxD,cAAc,CAAE,MAAM,AACvB,CAAC,AAED,sDAAS,CAAE,qDAAQ,CAAE,YAAY,6CAAC,CAAC,AAC5B,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACrB,CAAC,AACJ,OAAO,6CAAC,CAAC,AACR,aAAa,CAAE,IAAI,AACpB,CAAC,AACD,gEAAmB,CAAE,eAAe,6CAAC,CAAC,AACrC,WAAW,CAAE,IAAI,AAClB,CAAC,AAED,IAAI,6CAAG,CAAC,AACD,OAAO,CAAE,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,CAAC,AACjC,CAAC,AACJ,mBAAI,CAAC,GAAG,8BAAC,CAAC,AACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACd,CAAC,AACD,oBAAoB,6CAAC,CAAC,AACrB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AACD,cAAc,6CAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAG,CAAC,AACvC,cAAc,6CAAI,CAAC,AACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AACJ,6BAAc,CAAC,EAAE,8BAAC,CAAC,AAClB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,AACV,CAAC,AACD,6BAAc,CAAC,EAAE,8BAAC,CAAC,AAClB,eAAe,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,AACvB,CAAC,AACD,6BAAc,CAAG,EAAE,8BAAC,CAAC,AACpB,YAAY,CAAE,GAAG,AAClB,CAAC,AACD,6BAAc,CAAC,EAAE,8BAAC,CAAC,AAClB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,CAAC,AACd,CAAC,AACD,6BAAc,CAAC,gCAAE,YAAY,AAAC,CAAC,AAC9B,WAAW,CAAE,IAAI,AAClB,CAAC"}'
};
async function load(ctx) {
  let slug = ctx.page.params.slug;
  return {props: {slug}};
}
var U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {slug} = $$props;
  let username = slug;
  let user, forum, custom;
  let headColor = "var(--accent)";
  let monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let lightText = 0;
  async function getData() {
    await fetch(`https://scratchdb.lefty.one/v3/user/info/${slug}`).then((res) => res.json()).then((data) => {
      user = data;
    });
    await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${slug}/`).then((res) => res.json()).then((data) => {
      forum = data;
    });
    await fetch(`https://my-ocular.jeffalo.net/api/user/${slug}`).then((res) => res.json()).then((data) => {
      custom = data;
      headColor = custom.color;
      if (custom.color) {
        const contraster = [];
        contraster.push(HEXtoRGB$1(custom.color).r);
        contraster.push(HEXtoRGB$1(custom.color).g);
        contraster.push(HEXtoRGB$1(custom.color).b);
        const brightness = Math.round((parseInt(contraster[0]) * 299 + parseInt(contraster[1]) * 587 + parseInt(contraster[2]) * 114) / 1e3);
        brightness > 150 ? lightText = 1 : lightText = 0;
      }
    });
  }
  let promise = getData();
  onMount(async () => {
    promise = getData();
  });
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  $$result.css.add(css);
  {
    if (username !== slug) {
      username = slug;
      promise = getData();
    }
  }
  return `${$$result.head += `${function(__value) {
    if (is_promise(__value))
      return `
	${$$result.title = `<title>Loading user ${escape2(slug)}</title>`, ""} 
	`;
    return function() {
      return ` 
	${$$result.title = `<title>${escape2(slug)} - postpercent</title>`, ""}
	`;
    }();
  }(promise)}`, ""}

<header style="${"background-color:" + escape2(headColor) + "; color:" + escape2(lightText == 1 ? `var(--background)` : `var(--text)`)}" class="${"svelte-1xfozvg"}"><ul class="${"pfp-container svelte-1xfozvg"}"><li class="${"pfp svelte-1xfozvg"}">${user ? `<a href="${"/users/" + escape2(user.username)}"><img src="${"https://cdn2.scratch.mit.edu/get_image/user/" + escape2(user.id) + "_150x150.png"}"${add_attribute("alt", slug, 0)} class="${"svelte-1xfozvg"}"></a>` : `<a href="${"/users/" + escape2(slug)}"><span class="${"iconify"}" data-icon="${"ant-design:user-outlined"}" data-inline="${"false"}"></span></a>`}</li></ul>
	<ul class="${"info-container svelte-1xfozvg"}"><li class="${"username svelte-1xfozvg"}"><a href="${"/users/" + escape2(slug)}"><nobr>${escape2(slug)}</nobr></a></li>
		<li class="${"status svelte-1xfozvg"}">${custom ? `${custom.error == "no user found" ? `No Ocular status found` : `${escape2(custom.status)}`}` : `Getting status...`}</li>
		<ul class="${"posts-container svelte-1xfozvg"}"><ul class="${"total-post-container svelte-1xfozvg"}"><li class="${"total-posts-header svelte-1xfozvg"}">Total Posts</li>
				${forum ? `<li class="${"total-posts svelte-1xfozvg"}">${escape2(forum.counts.total.count)}</li>` : ``}</ul>
			<ul class="${"rank-container svelte-1xfozvg"}"><li class="${"ranking-header svelte-1xfozvg"}">Rank</li>
				${forum ? `<li class="${"ranking svelte-1xfozvg"}">${escape2(rankifier(forum.counts.total.rank))}</li>` : ``}</ul></ul>
		<ul class="${"misc-container svelte-1xfozvg"}"><li class="${"first-posted svelte-1xfozvg"}">${forum ? `<nobr>${escape2(monthList[new Date(forum.firstSeen.date).getMonth()])} ${escape2(rankifier(new Date(forum.firstSeen.date).getDate()))}, ${escape2(new Date(forum.firstSeen.date).getFullYear())}</nobr>` : ``}</li>
			<li class="${"last-posted svelte-1xfozvg"}">${forum ? `<nobr>${escape2(monthList[new Date(forum.lastSeen.date).getMonth()])} ${escape2(rankifier(new Date(forum.lastSeen.date).getDate()))}, ${escape2(new Date(forum.lastSeen.date).getFullYear())}</nobr>` : ``}</li>
			<li class="${"scratch-link svelte-1xfozvg"}"><a href="${"https:/scratch.mit.edu/users/" + escape2(slug)}">scratch</a></li>
			<li class="${"ocular-link svelte-1xfozvg"}"><a href="${"https://ocular.jeffalo.net/user/" + escape2(slug)}">ocular</a></li></ul></ul></header>
<main class="${"svelte-1xfozvg"}">${function(__value) {
    if (is_promise(__value))
      return `
	<img src="${"../../static/loading.gif"}" alt="${"Loading"}" class="${"loading"}">
	`;
    return function() {
      return `
	<div class="${"post-dist-container svelte-1xfozvg"}">${each(Object.entries(forum.counts), (i) => `${i[0] != `total` ? `<div class="${"post-dist-bar svelte-1xfozvg"}" style="${"background-color: rgb(" + escape2(Math.random() * 100) + "," + escape2(Math.random() * 100) + "," + escape2(Math.random() * 100) + "); order: " + escape2(i[1].count * -1)}"><li class="${"svelte-1xfozvg"}"><a href="${"../"}">${escape2(i[0])}</a></li>
					<ul class="${"svelte-1xfozvg"}"><li class="${"svelte-1xfozvg"}">${escape2(i[1].count)}</li>
						<li class="${"svelte-1xfozvg"}">${escape2(rankifier(i[1].rank))}</li>
						<li class="${"svelte-1xfozvg"}">${escape2(Math.round(i[1].count / forum.counts.total.count * 1e4) / 100)}%</li></ul>
				</div>` : ``}`)}</div>
	<br>
	${validate_component(Charts, "Charts").$$render($$result, {
        username: slug,
        color: custom.color ? custom.color : `#f54260`
      }, {}, {})}
	`;
    }();
  }(promise)}
	<br>
</main>`;
});
var _slug_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: U5Bslugu5D,
  load
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const {pathname, searchParams} = new URL(req.url || "", "http://localhost");
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: await getRawBody(req)
  });
  if (rendered) {
    const {status, headers, body} = rendered;
    return res.writeHead(status, headers).end(body);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * Chart.js v2.9.4
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! moment.js
//! momentjs.com
//! version : 2.29.1
