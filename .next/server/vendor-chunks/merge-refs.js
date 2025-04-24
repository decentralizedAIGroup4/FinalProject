"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/merge-refs";
exports.ids = ["vendor-chunks/merge-refs"];
exports.modules = {

/***/ "(ssr)/./node_modules/merge-refs/dist/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/merge-refs/dist/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ mergeRefs)\n/* harmony export */ });\n/**\n * A function that merges React refs into one.\n * Supports both functions and ref objects created using createRef() and useRef().\n *\n * Usage:\n * ```tsx\n * <div ref={mergeRefs(ref1, ref2, ref3)} />\n * ```\n *\n * @param {(React.Ref<T> | undefined)[]} inputRefs Array of refs\n * @returns {React.Ref<T> | React.RefCallback<T>} Merged refs\n */\nfunction mergeRefs() {\n    var inputRefs = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        inputRefs[_i] = arguments[_i];\n    }\n    var filteredInputRefs = inputRefs.filter(Boolean);\n    if (filteredInputRefs.length <= 1) {\n        var firstRef = filteredInputRefs[0];\n        return firstRef || null;\n    }\n    return function mergedRefs(ref) {\n        filteredInputRefs.forEach(function (inputRef) {\n            if (typeof inputRef === 'function') {\n                inputRef(ref);\n            }\n            else if (inputRef) {\n                inputRef.current = ref;\n            }\n        });\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWVyZ2UtcmVmcy9kaXN0L2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw2QkFBNkI7QUFDMUM7QUFDQTtBQUNBLFdBQVcsOEJBQThCO0FBQ3pDLGFBQWEscUNBQXFDO0FBQ2xEO0FBQ2U7QUFDZjtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL2JyZW50L0Rvd25sb2Fkcy9FbmNvZGVERUFJL0ZpbmFsUHJvamVjdC9ub2RlX21vZHVsZXMvbWVyZ2UtcmVmcy9kaXN0L2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBtZXJnZXMgUmVhY3QgcmVmcyBpbnRvIG9uZS5cbiAqIFN1cHBvcnRzIGJvdGggZnVuY3Rpb25zIGFuZCByZWYgb2JqZWN0cyBjcmVhdGVkIHVzaW5nIGNyZWF0ZVJlZigpIGFuZCB1c2VSZWYoKS5cbiAqXG4gKiBVc2FnZTpcbiAqIGBgYHRzeFxuICogPGRpdiByZWY9e21lcmdlUmVmcyhyZWYxLCByZWYyLCByZWYzKX0gLz5cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7KFJlYWN0LlJlZjxUPiB8IHVuZGVmaW5lZClbXX0gaW5wdXRSZWZzIEFycmF5IG9mIHJlZnNcbiAqIEByZXR1cm5zIHtSZWFjdC5SZWY8VD4gfCBSZWFjdC5SZWZDYWxsYmFjazxUPn0gTWVyZ2VkIHJlZnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VSZWZzKCkge1xuICAgIHZhciBpbnB1dFJlZnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBpbnB1dFJlZnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIGZpbHRlcmVkSW5wdXRSZWZzID0gaW5wdXRSZWZzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZiAoZmlsdGVyZWRJbnB1dFJlZnMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgdmFyIGZpcnN0UmVmID0gZmlsdGVyZWRJbnB1dFJlZnNbMF07XG4gICAgICAgIHJldHVybiBmaXJzdFJlZiB8fCBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVmcyhyZWYpIHtcbiAgICAgICAgZmlsdGVyZWRJbnB1dFJlZnMuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXRSZWYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXRSZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpbnB1dFJlZihyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXRSZWYpIHtcbiAgICAgICAgICAgICAgICBpbnB1dFJlZi5jdXJyZW50ID0gcmVmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/merge-refs/dist/esm/index.js\n");

/***/ })

};
;