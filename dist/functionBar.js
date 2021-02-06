/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ScriptDefaults.js":
/*!***************************!*\
  !*** ./ScriptDefaults.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  options: \"chrome.runtime.sendMessage({type: \\\"openOptions\\\"})\"\n});\n\n//# sourceURL=webpack://typo/./ScriptDefaults.js?");

/***/ }),

/***/ "./functionBar.js":
/*!************************!*\
  !*** ./functionBar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_app_pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/app.pug */ \"./src/app.pug\");\n/* harmony import */ var _src_app_pug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_app_pug__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ScriptDefaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScriptDefaults.js */ \"./ScriptDefaults.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nconsole.log(\"bundled\"); // let scriptsCache = new Object()\n// for (let item in scriptDefaults) {\n//     scriptsCache[item] = scriptDefaults[item]\n// }\n\nvar scriptsCache = Object.assign({}, _ScriptDefaults_js__WEBPACK_IMPORTED_MODULE_1__.default);\nvar strHtml = _src_app_pug__WEBPACK_IMPORTED_MODULE_0___default()(new Object());\nvar temp = document.createElement(\"template\");\ntemp.innerHTML = strHtml;\ndocument.body.appendChild(temp.content.firstChild);\nvar typo = {\n  enabled: false,\n  sugestions: [],\n  focused: 0,\n  update: function update() {\n    document.getElementById(\"typo\").style.display = this.enabled ? \"flex\" : \"none\";\n  }\n}; // const scripts = new Object()\n// scripts[\"play\"] = function () {\n//     if (document.querySelectorAll(\"video\").length > 0) {\n//         document.querySelector(\"video\").play()\n//     }\n// }\n// scripts[\"pause\"] = function () {\n//     if (document.querySelectorAll(\"video\").length > 0) {\n//         document.querySelector(\"video\").pause()\n//     }\n// }\n// scripts[\"pause&play\"] = function () {\n//     if (document.querySelectorAll(\"video\").length > 0) {\n//         document.querySelector(\"video\").pause()\n//         document.querySelector(\"video\").play()\n//     }\n// }\n// scripts[\"alexa play despacito\"] = function () {\n//     window.open(\"https://youtu.be/J_bMArMJ-f8?t=26\")\n// }\n\nvar inputBuffor = []; // open menu\n\ndocument.addEventListener(\"keydown\", function (e) {\n  switch (e.code) {\n    case \"KeyK\":\n    case \"ShiftLeft\":\n    case \"ShiftRight\":\n    case \"ControlLeft\":\n    case \"ControlRight\":\n      if (inputBuffor.filter(function (i) {\n        return i == e.code;\n      }).length > 0) {\n        inputBuffor.length = 0;\n      }\n\n      inputBuffor.push(e.code);\n      break;\n\n    case \"Escape\":\n      document.querySelector(\"#typo_input_elem\").value = \"\";\n      typo.enabled = !1;\n      typo.update();\n\n    default:\n      inputBuffor.length = 0;\n      break;\n  }\n\n  var anyShift = inputBuffor.includes(\"ShiftLeft\") || inputBuffor.includes(\"ShiftRight\");\n  var anyControl = inputBuffor.includes(\"ControlLeft\") || inputBuffor.includes(\"ControlRight\");\n\n  if (inputBuffor.includes(\"KeyK\") && anyShift && anyControl) {\n    new Promise(function (res, rej) {\n      chrome.storage.sync.get(null, function (items) {\n        return res(items);\n      });\n    }).then(function (valfromstorage) {\n      scriptsCache = Object.assign({}, _ScriptDefaults_js__WEBPACK_IMPORTED_MODULE_1__.default);\n\n      for (var key in valfromstorage) {\n        if (key.search(/TYPO_PRIVATE/gi) < 0) {\n          scriptsCache[key] = valfromstorage[key];\n        }\n      } // console.log(scriptsCache)\n\n\n      typo.enabled = true;\n      typo.update();\n      sugestionUpdate(\"\");\n      document.getElementById(\"typo_input_elem\").focus();\n      inputBuffor.length = 0;\n    }); // new Promise((res, rej) => {\n    //     chrome.storage.sync.get(\"owo\", out => res(out))\n    // }).then( valfromstorage => console.log(valfromstorage[\"owo\"]))\n  }\n}); // chossing scripts handler\n\ndocument.addEventListener(\"keydown\", function (e) {\n  if (typo.sugestions.length > 0 && typo.enabled) {\n    switch (e.code) {\n      case \"ArrowUp\":\n        e.preventDefault();\n        document.querySelector(\"#typo_scriptlist\").children[typo.focused].classList.remove(\"focused\");\n\n        if (typo.focused == 0) {\n          document.querySelector(\"#typo_scriptlist\").children[typo.sugestions.length - 1].classList.add(\"focused\");\n          typo.focused = typo.sugestions.length - 1;\n        } else {\n          document.querySelector(\"#typo_scriptlist\").children[typo.focused - 1].classList.add(\"focused\");\n          typo.focused -= 1;\n        }\n\n        break;\n\n      case \"ArrowDown\":\n        e.preventDefault();\n        document.querySelector(\"#typo_scriptlist\").children[typo.focused].classList.remove(\"focused\");\n\n        if (typo.focused == document.querySelector(\"#typo_scriptlist\").childElementCount - 1) {\n          document.querySelector(\"#typo_scriptlist\").children[0].classList.add(\"focused\");\n          typo.focused = 0;\n        } else {\n          document.querySelector(\"#typo_scriptlist\").children[typo.focused + 1].classList.add(\"focused\");\n          typo.focused += 1;\n        }\n\n        break;\n\n      case \"Tab\":\n        e.preventDefault(); // e.stopPropagation()  \n\n        document.querySelector(\"#typo_input_elem\").value = typo.sugestions[typo.focused];\n        sugestionUpdate(typo.sugestions[typo.focused]);\n        break;\n\n      case \"Enter\":\n        try {\n          eval(scriptsCache[typo.sugestions[typo.focused]]);\n        } catch (_unused) {\n          console.error(\"TYPO: something went wrong\");\n        }\n\n        document.querySelector(\"#typo_input_elem\").value = \"\";\n        typo.enabled = !1;\n        typo.update();\n        break;\n    }\n  }\n});\ndocument.addEventListener(\"input\", function (e) {\n  if (document.querySelector(\"#typo_input_elem\").value == e.target.value ? Object.keys(scriptsCache) : false) {\n    sugestionUpdate(e.target.value);\n  }\n});\n\nfunction sugestionUpdate(strValue) {\n  Array.from(document.querySelector(\"#typo_scriptlist\").children).forEach(function (item) {\n    return document.querySelector(\"#typo_scriptlist\").removeChild(item);\n  });\n  var funcPickComponentStr = \"<div class=\\\"typo_scriptlist_script\\\"></div>\";\n  var temp = document.createElement(\"template\");\n  typo.sugestions = Object.keys(scriptsCache).filter(function (item) {\n    var reg = new RegExp(strValue);\n    return item.match(reg) != null ? true : false;\n  });\n\n  var _iterator = _createForOfIteratorHelper(typo.sugestions.entries()),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var _step$value = _slicedToArray(_step.value, 2),\n          i = _step$value[0],\n          v = _step$value[1];\n\n      temp.innerHTML += funcPickComponentStr;\n      temp.content.children[i].innerText = v;\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  if (temp.content.children.length > 0) {\n    temp.content.children[0].classList.add(\"focused\");\n    typo.focused = 0;\n  }\n\n  Array.from(temp.content.children).forEach(function (elem) {\n    document.body.querySelector(\"#typo_scriptlist\").appendChild(elem);\n  });\n}\n\ndocument.querySelector(\"#typo_options\").addEventListener(\"click\", function () {\n  chrome.runtime.sendMessage({\n    type: \"openOptions\"\n  });\n});\n\n//# sourceURL=webpack://typo/./functionBar.js?");

/***/ }),

/***/ "./src/app.pug":
/*!*********************!*\
  !*** ./src/app.pug ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var pug = __webpack_require__(/*! !../node_modules/pug-runtime/index.js */ \"./node_modules/pug-runtime/index.js\");\n\nfunction template(locals) {var pug_html = \"\", pug_mixins = {}, pug_interp;pug_html = pug_html + \"\\u003Cdiv id=\\\"typo\\\"\\u003E\\u003Cdiv id=\\\"typo_appbar\\\"\\u003E\\u003Cdiv id=\\\"typo_input\\\"\\u003E\\u003Cinput id=\\\"typo_input_elem\\\" placeholder=\\\"f\\\" autocomplete=\\\"off\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\u003Cdiv id=\\\"typo_options\\\"\\u003E\\u003Csvg id=\\\"typo_options_icon\\\"\\u003E\\u003Cg xmlns=\\\"http:\\u002F\\u002Fwww.w3.org\\u002F2000\\u002Fsvg\\\"\\u003E\\u003Cpath d=\\\"M0,0h24v24H0V0z\\\" fill=\\\"none\\\"\\u003E\\u003C\\u002Fpath\\u003E\\u003Cpath d=\\\"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z\\\"\\u003E\\u003C\\u002Fpath\\u003E\\u003C\\u002Fg\\u003E\\u003C\\u002Fsvg\\u003E\\u003C\\u002Fdiv\\u003E\\u003C\\u002Fdiv\\u003E\\u003Cdiv id=\\\"typo_scriptlist\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\u003C\\u002Fdiv\\u003E\";;return pug_html;};\nmodule.exports = template;\n\n//# sourceURL=webpack://typo/./src/app.pug?");

/***/ }),

/***/ "./node_modules/pug-runtime/index.js":
/*!*******************************************!*\
  !*** ./node_modules/pug-runtime/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nvar pug_has_own_property = Object.prototype.hasOwnProperty;\n\n/**\n * Merge two attribute objects giving precedence\n * to values in object `b`. Classes are special-cased\n * allowing for arrays and merging/joining appropriately\n * resulting in a string.\n *\n * @param {Object} a\n * @param {Object} b\n * @return {Object} a\n * @api private\n */\n\nexports.merge = pug_merge;\nfunction pug_merge(a, b) {\n  if (arguments.length === 1) {\n    var attrs = a[0];\n    for (var i = 1; i < a.length; i++) {\n      attrs = pug_merge(attrs, a[i]);\n    }\n    return attrs;\n  }\n\n  for (var key in b) {\n    if (key === 'class') {\n      var valA = a[key] || [];\n      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);\n    } else if (key === 'style') {\n      var valA = pug_style(a[key]);\n      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;\n      var valB = pug_style(b[key]);\n      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;\n      a[key] = valA + valB;\n    } else {\n      a[key] = b[key];\n    }\n  }\n\n  return a;\n}\n\n/**\n * Process array, object, or string as a string of classes delimited by a space.\n *\n * If `val` is an array, all members of it and its subarrays are counted as\n * classes. If `escaping` is an array, then whether or not the item in `val` is\n * escaped depends on the corresponding item in `escaping`. If `escaping` is\n * not an array, no escaping is done.\n *\n * If `val` is an object, all the keys whose value is truthy are counted as\n * classes. No escaping is done.\n *\n * If `val` is a string, it is counted as a class. No escaping is done.\n *\n * @param {(Array.<string>|Object.<string, boolean>|string)} val\n * @param {?Array.<string>} escaping\n * @return {String}\n */\nexports.classes = pug_classes;\nfunction pug_classes_array(val, escaping) {\n  var classString = '',\n    className,\n    padding = '',\n    escapeEnabled = Array.isArray(escaping);\n  for (var i = 0; i < val.length; i++) {\n    className = pug_classes(val[i]);\n    if (!className) continue;\n    escapeEnabled && escaping[i] && (className = pug_escape(className));\n    classString = classString + padding + className;\n    padding = ' ';\n  }\n  return classString;\n}\nfunction pug_classes_object(val) {\n  var classString = '',\n    padding = '';\n  for (var key in val) {\n    if (key && val[key] && pug_has_own_property.call(val, key)) {\n      classString = classString + padding + key;\n      padding = ' ';\n    }\n  }\n  return classString;\n}\nfunction pug_classes(val, escaping) {\n  if (Array.isArray(val)) {\n    return pug_classes_array(val, escaping);\n  } else if (val && typeof val === 'object') {\n    return pug_classes_object(val);\n  } else {\n    return val || '';\n  }\n}\n\n/**\n * Convert object or string to a string of CSS styles delimited by a semicolon.\n *\n * @param {(Object.<string, string>|string)} val\n * @return {String}\n */\n\nexports.style = pug_style;\nfunction pug_style(val) {\n  if (!val) return '';\n  if (typeof val === 'object') {\n    var out = '';\n    for (var style in val) {\n      /* istanbul ignore else */\n      if (pug_has_own_property.call(val, style)) {\n        out = out + style + ':' + val[style] + ';';\n      }\n    }\n    return out;\n  } else {\n    return val + '';\n  }\n}\n\n/**\n * Render the given attribute.\n *\n * @param {String} key\n * @param {String} val\n * @param {Boolean} escaped\n * @param {Boolean} terse\n * @return {String}\n */\nexports.attr = pug_attr;\nfunction pug_attr(key, val, escaped, terse) {\n  if (\n    val === false ||\n    val == null ||\n    (!val && (key === 'class' || key === 'style'))\n  ) {\n    return '';\n  }\n  if (val === true) {\n    return ' ' + (terse ? key : key + '=\"' + key + '\"');\n  }\n  var type = typeof val;\n  if (\n    (type === 'object' || type === 'function') &&\n    typeof val.toJSON === 'function'\n  ) {\n    val = val.toJSON();\n  }\n  if (typeof val !== 'string') {\n    val = JSON.stringify(val);\n    if (!escaped && val.indexOf('\"') !== -1) {\n      return ' ' + key + \"='\" + val.replace(/'/g, '&#39;') + \"'\";\n    }\n  }\n  if (escaped) val = pug_escape(val);\n  return ' ' + key + '=\"' + val + '\"';\n}\n\n/**\n * Render the given attributes object.\n *\n * @param {Object} obj\n * @param {Object} terse whether to use HTML5 terse boolean attributes\n * @return {String}\n */\nexports.attrs = pug_attrs;\nfunction pug_attrs(obj, terse) {\n  var attrs = '';\n\n  for (var key in obj) {\n    if (pug_has_own_property.call(obj, key)) {\n      var val = obj[key];\n\n      if ('class' === key) {\n        val = pug_classes(val);\n        attrs = pug_attr(key, val, false, terse) + attrs;\n        continue;\n      }\n      if ('style' === key) {\n        val = pug_style(val);\n      }\n      attrs += pug_attr(key, val, false, terse);\n    }\n  }\n\n  return attrs;\n}\n\n/**\n * Escape the given string of `html`.\n *\n * @param {String} html\n * @return {String}\n * @api private\n */\n\nvar pug_match_html = /[\"&<>]/;\nexports.escape = pug_escape;\nfunction pug_escape(_html) {\n  var html = '' + _html;\n  var regexResult = pug_match_html.exec(html);\n  if (!regexResult) return _html;\n\n  var result = '';\n  var i, lastIndex, escape;\n  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {\n    switch (html.charCodeAt(i)) {\n      case 34:\n        escape = '&quot;';\n        break;\n      case 38:\n        escape = '&amp;';\n        break;\n      case 60:\n        escape = '&lt;';\n        break;\n      case 62:\n        escape = '&gt;';\n        break;\n      default:\n        continue;\n    }\n    if (lastIndex !== i) result += html.substring(lastIndex, i);\n    lastIndex = i + 1;\n    result += escape;\n  }\n  if (lastIndex !== i) return result + html.substring(lastIndex, i);\n  else return result;\n}\n\n/**\n * Re-throw the given `err` in context to the\n * the pug in `filename` at the given `lineno`.\n *\n * @param {Error} err\n * @param {String} filename\n * @param {String} lineno\n * @param {String} str original source\n * @api private\n */\n\nexports.rethrow = pug_rethrow;\nfunction pug_rethrow(err, filename, lineno, str) {\n  if (!(err instanceof Error)) throw err;\n  if ((typeof window != 'undefined' || !filename) && !str) {\n    err.message += ' on line ' + lineno;\n    throw err;\n  }\n  try {\n    str = str || __webpack_require__(/*! fs */ \"?65c5\").readFileSync(filename, 'utf8');\n  } catch (ex) {\n    pug_rethrow(err, null, lineno);\n  }\n  var context = 3,\n    lines = str.split('\\n'),\n    start = Math.max(lineno - context, 0),\n    end = Math.min(lines.length, lineno + context);\n\n  // Error context\n  var context = lines\n    .slice(start, end)\n    .map(function(line, i) {\n      var curr = i + start + 1;\n      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;\n    })\n    .join('\\n');\n\n  // Alter exception message\n  err.path = filename;\n  try {\n    err.message =\n      (filename || 'Pug') +\n      ':' +\n      lineno +\n      '\\n' +\n      context +\n      '\\n\\n' +\n      err.message;\n  } catch (e) {}\n  throw err;\n}\n\n\n//# sourceURL=webpack://typo/./node_modules/pug-runtime/index.js?");

/***/ }),

/***/ "?65c5":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://typo/fs_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./functionBar.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;