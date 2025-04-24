"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-math";
exports.ids = ["vendor-chunks/remark-math"];
exports.modules = {

/***/ "(ssr)/./node_modules/remark-math/index.js":
/*!*******************************************!*\
  !*** ./node_modules/remark-math/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ remarkMath)\n/* harmony export */ });\n/* harmony import */ var micromark_extension_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-extension-math */ \"(ssr)/./node_modules/micromark-extension-math/dev/lib/syntax.js\");\n/* harmony import */ var mdast_util_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mdast-util-math */ \"(ssr)/./node_modules/mdast-util-math/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n * @typedef {import('mdast-util-math').ToOptions} Options\n *\n * @typedef {import('mdast-util-math')} DoNotTouchAsThisImportIncludesMathInTree\n */\n\n\n\n\n/**\n * Plugin to support math.\n *\n * @type {import('unified').Plugin<[Options?] | void[], Root, Root>}\n */\nfunction remarkMath(options = {}) {\n  const data = this.data()\n\n  add('micromarkExtensions', (0,micromark_extension_math__WEBPACK_IMPORTED_MODULE_0__.math)(options))\n  add('fromMarkdownExtensions', (0,mdast_util_math__WEBPACK_IMPORTED_MODULE_1__.mathFromMarkdown)())\n  add('toMarkdownExtensions', (0,mdast_util_math__WEBPACK_IMPORTED_MODULE_1__.mathToMarkdown)(options))\n\n  /**\n   * @param {string} field\n   * @param {unknown} value\n   */\n  function add(field, value) {\n    const list = /** @type {unknown[]} */ (\n      // Other extensions\n      /* c8 ignore next 2 */\n      data[field] ? data[field] : (data[field] = [])\n    )\n\n    list.push(value)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtYXJrLW1hdGgvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHFDQUFxQztBQUNsRDtBQUNBLGFBQWEsMkJBQTJCO0FBQ3hDOztBQUU2QztBQUNtQjs7QUFFaEU7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ2UsZ0NBQWdDO0FBQy9DOztBQUVBLDZCQUE2Qiw4REFBSTtBQUNqQyxnQ0FBZ0MsaUVBQWdCO0FBQ2hELDhCQUE4QiwrREFBYzs7QUFFNUM7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSw0QkFBNEIsV0FBVztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL2JyZW50L0Rvd25sb2Fkcy9FbmNvZGVERUFJL0ZpbmFsUHJvamVjdC9ub2RlX21vZHVsZXMvcmVtYXJrLW1hdGgvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtbWF0aCcpLlRvT3B0aW9uc30gT3B0aW9uc1xuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtbWF0aCcpfSBEb05vdFRvdWNoQXNUaGlzSW1wb3J0SW5jbHVkZXNNYXRoSW5UcmVlXG4gKi9cblxuaW1wb3J0IHttYXRofSBmcm9tICdtaWNyb21hcmstZXh0ZW5zaW9uLW1hdGgnXG5pbXBvcnQge21hdGhGcm9tTWFya2Rvd24sIG1hdGhUb01hcmtkb3dufSBmcm9tICdtZGFzdC11dGlsLW1hdGgnXG5cbi8qKlxuICogUGx1Z2luIHRvIHN1cHBvcnQgbWF0aC5cbiAqXG4gKiBAdHlwZSB7aW1wb3J0KCd1bmlmaWVkJykuUGx1Z2luPFtPcHRpb25zP10gfCB2b2lkW10sIFJvb3QsIFJvb3Q+fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1hcmtNYXRoKG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBkYXRhID0gdGhpcy5kYXRhKClcblxuICBhZGQoJ21pY3JvbWFya0V4dGVuc2lvbnMnLCBtYXRoKG9wdGlvbnMpKVxuICBhZGQoJ2Zyb21NYXJrZG93bkV4dGVuc2lvbnMnLCBtYXRoRnJvbU1hcmtkb3duKCkpXG4gIGFkZCgndG9NYXJrZG93bkV4dGVuc2lvbnMnLCBtYXRoVG9NYXJrZG93bihvcHRpb25zKSlcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAgICovXG4gIGZ1bmN0aW9uIGFkZChmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBsaXN0ID0gLyoqIEB0eXBlIHt1bmtub3duW119ICovIChcbiAgICAgIC8vIE90aGVyIGV4dGVuc2lvbnNcbiAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDIgKi9cbiAgICAgIGRhdGFbZmllbGRdID8gZGF0YVtmaWVsZF0gOiAoZGF0YVtmaWVsZF0gPSBbXSlcbiAgICApXG5cbiAgICBsaXN0LnB1c2godmFsdWUpXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remark-math/index.js\n");

/***/ })

};
;