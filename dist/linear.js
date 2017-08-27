(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["linear"] = factory();
	else
		root["linear"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


function linear(wait) {
    var timeouts = {},
        delays = Object.keys(wait);

    function cancel() {
        // for (const timeout: string in timeouts) {
        //     if (timeouts.hasOwnProperty(timeout)) {
        //         clearTimeout(timeouts[timeout]);
        //     }
        // }
        Object.values(timeouts).forEach(clearTimeout);
    }

    function debouncer() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        delays.forEach(function (delay) {
            clearTimeout(timeouts[delay]);

            var current = wait[delay];

            if (typeof current !== 'function' && !Array.isArray(current)) {
                return;
            }

            var int = parseInt(delay, 10);

            if (!int) {

                if (Array.isArray(current)) {
                    for (var i = 0; i < current.length; i++) {
                        var _current$i;

                        typeof current[i] === 'function' && (_current$i = current[i]).apply.apply(_current$i, [_this].concat(args));
                    }
                    return;
                }
                return current.apply.apply(current, [_this].concat(args));
            }

            timeouts[delay] = setTimeout(function () {
                if (!Array.isArray(current)) {
                    current.apply.apply(current, [_this].concat(args));
                }
                for (var _i = 0; _i < current.length; _i++) {
                    var _current$_i;

                    typeof current[_i] === 'function' && (_current$_i = current[_i]).apply.apply(_current$_i, [_this].concat(args));
                }
            }, int);
        });
    };

    debouncer.cancel = cancel;
    return debouncer;
}

exports.default = linear;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=linear.js.map