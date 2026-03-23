// Cross-browser compatibility polyfill
(function() {
    'use strict';

    // Polyfill for Element.closest() for IE 11
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // Polyfill for Element.matches() for IE 11
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Polyfill for String.prototype.includes() for IE 11
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }
            return start + search.length <= this.length &&
                this.indexOf(search, start) !== -1;
        };
    }

    // Polyfill for Array.from() for IE 11
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            return function from(arrayLike/*, mapFn, thisArg */) {
                var C = this;
                var items = Object(arrayLike);

                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                }

                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                var len = toLength(items.length);
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                var k = 0;
                var kValue;

                while (k < len) {
                    kValue = items[k];
                    if (typeof T === 'undefined') {
                        A[k] = typeof mapFn === 'undefined' ? kValue : typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = mapFn.call(T, kValue, k);
                    }
                    k += 1;
                }
                A.length = len;
                return A;
            };
        }());
    }

    // Detect browser and add appropriate class to body for CSS targeting
    var ua = navigator.userAgent;
    var isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor);
    var isFirefox = /Firefox/.test(ua);
    var isSafari = /Safari/.test(ua) && /Apple Computer/.test(navigator.vendor);
    var isEdge = /Edge/.test(ua) || /Edg/.test(ua);
    var isIE = /Trident/.test(ua) || /MSIE/.test(ua);

    if (isChrome) document.documentElement.className += ' is-chrome';
    if (isFirefox) document.documentElement.className += ' is-firefox';
    if (isSafari) document.documentElement.className += ' is-safari';
    if (isEdge) document.documentElement.className += ' is-edge';
    if (isIE) document.documentElement.className += ' is-ie';

    // Add touch class if device is touch-enabled
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.documentElement.className += ' is-touch';
    } else {
        document.documentElement.className += ' is-no-touch';
    }

    // Check for flexbox support
    var flexboxTest = 'display:flex;';
    var style = document.createElement('style');
    style.textContent = 'div::before { ' + flexboxTest + ' }';
    document.head.appendChild(style);

    if (window.getComputedStyle(style).display.indexOf('flex') >= 0) {
        document.documentElement.className += ' supports-flexbox';
    } else {
        document.documentElement.className += ' no-flexbox';
    }
    document.head.removeChild(style);

})();
