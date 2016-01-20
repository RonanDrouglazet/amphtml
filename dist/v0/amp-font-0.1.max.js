(window.AMP = window.AMP || []).push(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Triggers and monitors loading of custom fonts on AMP pages.
 * Example:
 * <code>
 * <amp-font
 *   font-family="My Font"
 *   timeout="3s"
 *   font-weight="bold"
 *   on-error-add-class="myfont2-missing"
 *   on-error-remove-class="myfont3-loaded"
 *   on-load-add-class="myfont2-loaded"
 *   on-load-remove-class="myfont1-loaded"
 *   layout="nodisplay">
 * </amp-font>
 * </code>
 *
 * the amp-font element's layout type is nodisplay.
 */

var _fontloader = require('./fontloader');

var _srcTimer = require('../../../src/timer');

/** @private @const {number} */
var DEFAULT_TIMEOUT_ = 3000;

/** @private @const {string} */
var DEFAULT_WEIGHT_ = '400';

/** @private @const {string} */
var DEFAULT_VARIANT_ = 'normal';

/** @private @const {string} */
var DEFAULT_STYLE_ = 'normal';

/** @private @const {string} */
var DEFAULT_SIZE_ = 'medium';

/** @private @const {number}*/
/**
 * https://output.jsbin.com/badore - is js bin experiment to test timeouts on
 * various mobile devices. Loade the page and try refreshing it to serve the
 * font from cache.
 *
 * Font load times (from the browser cache) documented as follows:
 * Wifi
 * iPhone6(iOs 9.1) - safari - 2ms ~ 14ms
 * Windows phone(8.1 Update 2) - IE - 20ms ~ 46ms
 * Nexus5 (Android 6.0.0) - Chrome(44.0.2403.133) - 24ms ~ 52ms
 * Samsung Galaxy S4 (Android 4.4.2) - Default Browser - 7ms - 24ms
 *
 * LTE
 * iPhone6(iOs 9.1) - safari - 6ms ~ 14ms
 * Nexus5 (Android 6.0.0) - Chrome(46.0.2) - 46ms ~ 100ms
 */
var CACHED_FONT_LOAD_TIME_ = 100;

var AmpFont = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpFont, _AMP$BaseElement);

  function AmpFont() {
    babelHelpers.classCallCheck(this, AmpFont);

    _AMP$BaseElement.apply(this, arguments);
  }

  /** @override */

  AmpFont.prototype.prerenderAllowed = function prerenderAllowed() {
    return true;
  };

  /** @override */

  AmpFont.prototype.buildCallback = function buildCallback() {
    /** @private @const {string} */
    this.fontFamily_ = AMP.assert(this.element.getAttribute('font-family'), 'The font-family attribute is required for <amp-font> %s', this.element);
    /** @private @const {string} */
    this.fontWeight_ = this.element.getAttribute('font-weight') || DEFAULT_WEIGHT_;
    /** @private @const {string} */
    this.fontStyle_ = this.element.getAttribute('font-style') || DEFAULT_STYLE_;
    /** @private @const {string} */
    this.fontVariant_ = this.element.getAttribute('font-variant') || DEFAULT_VARIANT_;
    /** @private @const {!Document} */
    this.document_ = this.getWin().document;
    /** @private @const {!Element} */
    this.documentElement_ = this.document_.documentElement;
    /** @private @const {!FontLoader} */
    this.fontLoader_ = new _fontloader.FontLoader(this.getWin());
    this.startLoad_();
  };

  /**
   * Starts to download the font.
   * @private
   */

  AmpFont.prototype.startLoad_ = function startLoad_() {
    var _this = this;

    /** @type FontConfig */
    var fontConfig = {
      style: this.fontStyle_,
      variant: this.fontVariant_,
      weight: this.fontWeight_,
      size: DEFAULT_SIZE_,
      family: this.fontFamily_
    };
    this.fontLoader_.load(fontConfig, this.getTimeout_()).then(function () {
      _this.onFontLoadSuccess_();
    })['catch'](function (unusedError) {
      _this.onFontLoadError_();
      console. /* OK */warn('Font download timed out for ' + _this.fontFamily_);
    });
  };

  /**
   * @private
   */

  AmpFont.prototype.onFontLoadSuccess_ = function onFontLoadSuccess_() {
    var addClassName = this.element.getAttribute('on-load-add-class');
    var removeClassName = this.element.getAttribute('on-load-remove-class');
    this.onFontLoadFinish_(addClassName, removeClassName);
  };

  /**
   * @private
   */

  AmpFont.prototype.onFontLoadError_ = function onFontLoadError_() {
    var addClassName = this.element.getAttribute('on-error-add-class');
    var removeClassName = this.element.getAttribute('on-error-remove-class');
    this.onFontLoadFinish_(addClassName, removeClassName);
  };

  /**
   * @param {?string} addClassName css class to be added to the
   *    document-element.
   * @param {?string} removeClassName css class to be removed from the
   *    document-element.
   * @private
   */

  AmpFont.prototype.onFontLoadFinish_ = function onFontLoadFinish_(addClassName, removeClassName) {
    if (addClassName) {
      this.documentElement_.classList.add(addClassName);
    }
    if (removeClassName) {
      this.documentElement_.classList.remove(removeClassName);
      this.document_.body.classList.remove(removeClassName);
    };
    this.dispose_();
  };

  /**
   * @private
   */

  AmpFont.prototype.dispose_ = function dispose_() {
    this.fontLoader_ = null;
  };

  /**
   * Computes and returns the time (in ms) to wait for font download.
   * @returns {number} time (in ms) to wait for font download.
   * @private
   */

  AmpFont.prototype.getTimeout_ = function getTimeout_() {
    var timeoutInMs = parseInt(this.element.getAttribute('timeout'), 10);
    timeoutInMs = isNaN(timeoutInMs) || timeoutInMs < 0 ? DEFAULT_TIMEOUT_ : timeoutInMs;
    timeoutInMs = Math.max(timeoutInMs - _srcTimer.timer.timeSinceStart(), CACHED_FONT_LOAD_TIME_);
    return timeoutInMs;
  };

  return AmpFont;
})(AMP.BaseElement);

exports.AmpFont = AmpFont;

AMP.registerElement('amp-font', AmpFont);

},{"../../../src/timer":7,"./fontloader":2}],2:[function(require,module,exports){
exports.__esModule = true;

var _srcDom = require('../../../src/dom');

var _srcTimer = require('../../../src/timer');

var _srcVsync = require('../../../src/vsync');

var _srcStyle = require('../../../src/style');

var style = babelHelpers.interopRequireWildcard(_srcStyle);
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*eslint no-unused-vars: 0*/
/**
 * @typedef {{
 *  style: string,
 *  variant: string,
 *  weight: string,
 *  size: string,
 *  family: string
 * }}
 */
var FontConfigDef = undefined;

/** @private @const {Array.<string>} */
var DEFAULT_FONTS_ = ['sans-serif', 'serif'];

/** @private @const {string} */
var TEST_STRING_ = 'MAxmTYklsjo190QW';

/** @private @const {number} */
var TOLERANCE_ = 2;

var FontLoader = (function () {

  /**
   * @param {!Window} win
   */

  function FontLoader(win) {
    babelHelpers.classCallCheck(this, FontLoader);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!Document} */
    this.document_ = win.document;
    /** @private {?Element} */
    this.container_ = null;
    /** @private {?Array.<Element>} */
    this.defaultFontElements_ = null;
    /** @private {?Element} */
    this.customFontElement_ = null;
    /** @private {boolean} */
    this.fontLoadResolved_ = false;
    /** @private {boolean} */
    this.fontLoadRejected_ = false;
    /** @private {FontConfigDef} */
    this.fontConfig_ = null;
  }

  /**
   * Triggers the font load. Returns promise that will complete when loading
   * is considered to be complete.
   * @param {!FontConfigDef} fontConfig Config that describes the font to be
   *    loaded.
   * @param {number} timeout number of milliseconds after which the font load
   *    attempt would be stopped.
   * @return {!Promise}
   */

  FontLoader.prototype.load = function load(fontConfig, timeout) {
    var _this = this;

    this.fontConfig_ = fontConfig;
    return _srcTimer.timer.timeoutPromise(timeout, this.load_()).then(function () {
      _this.fontLoadResolved_ = true;
      _this.dispose_();
    })['catch'](function (reason) {
      _this.fontLoadRejected_ = true;
      _this.dispose_();
      throw reason;
    });
  };

  /**
   * Triggers the font load. Returns promise that will complete when loading
   * is considered to be complete.
   * @return {!Promise}
   * @private
   */

  FontLoader.prototype.load_ = function load_() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      /* style | variant | weight | size/line-height | family */
      /* font: italic small-caps bolder 16px/3 cursive; */
      var fontString = _this2.fontConfig_.style + ' ' + _this2.fontConfig_.variant + ' ' + _this2.fontConfig_.weight + ' ' + _this2.fontConfig_.size + ' ' + _this2.fontConfig_.family;

      if (_this2.canUseNativeApis_()) {
        // Check if font already exists.
        if (_this2.document_.fonts.check(fontString)) {
          resolve();
        } else {
          // Load font with native api if supported.
          _this2.document_.fonts.load(fontString).then(function () {
            if (_this2.document_.fonts.check(fontString)) {
              resolve();
            } else {
              reject(new Error('Font could not be loaded,' + ' probably due to incorrect @font-face.'));
            }
          })['catch'](reject);
        }
      } else {
        // Load font with polyfill if native api is not supported.
        _this2.loadWithPolyfill_().then(resolve, reject);
      }
    });
  };

  /**
   * @returns {boolean} True when native font api is supported by the browser.
   * @private
   */

  FontLoader.prototype.canUseNativeApis_ = function canUseNativeApis_() {
    return 'fonts' in this.document_;
  };

  /**
   * Make the browsers that don't support font loading events to download the
   * custom font by creating an element (with text) not visible on the viewport.
   * Font download is detected by comparing the elements height and width with
   * measurements between default fonts and custom font.
   * @private
   */

  FontLoader.prototype.loadWithPolyfill_ = function loadWithPolyfill_() {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var vsync = _srcVsync.vsyncFor(_this3.win_);
      // Create DOM elements
      _this3.createElements_();
      // Measure until timeout (or font load).
      var vsyncTask = vsync.createTask({
        measure: function () {
          if (_this3.fontLoadResolved_) {
            resolve();
          } else if (_this3.fontLoadRejected_) {
            reject(new Error('Font loading timed out.'));
          } else if (_this3.compareMeasurements_()) {
            resolve();
          } else {
            vsyncTask();
          }
        }
      });
      vsyncTask();
    });
  };

  /**
   * Step 1 for loading font on browsers that don't support font loading events.
   * Creates divs hidden from the viewport and measures dimensions for default
   * fonts.
   * @private
   */

  FontLoader.prototype.createElements_ = function createElements_() {
    var _this4 = this;

    var containerElement = this.container_ = this.document_.createElement('div');
    style.setStyles(containerElement, {
      // Use larger font-size to better detect font load.
      fontSize: '40px',
      fontVariant: this.fontConfig_.variant,
      left: '-999px',
      lineHeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: '-999px',
      visibility: 'hidden'
    });
    this.defaultFontElements_ = [];
    DEFAULT_FONTS_.forEach(function (font) {
      var defaultFontElement = _this4.document_.createElement('div');
      _this4.defaultFontElements_.push(defaultFontElement);
      defaultFontElement.textContent = TEST_STRING_;
      style.setStyles(defaultFontElement, {
        fontFamily: font,
        margin: 0,
        padding: 0,
        whiteSpace: 'nowrap'
      });
      containerElement.appendChild(defaultFontElement);
    });
    // Adding custom font family to the element to trigger load.
    // The loading will begin after the container has been appended to the body.
    var customFontElement = this.customFontElement_ = this.document_.createElement('div');
    style.setStyles(customFontElement, {
      fontFamily: this.fontConfig_.family,
      margin: 0,
      padding: 0,
      whiteSpace: 'nowrap'
    });
    customFontElement.textContent = TEST_STRING_;
    containerElement.appendChild(customFontElement);
    this.document_.body.appendChild(containerElement);
  };

  /**
   * Compare dimensions between elements styled with default fonts and custom
   * font.
   * @returns {boolean} Returns true if the dimensions are noticeably different
   * else returns false.
   * @private
   */

  FontLoader.prototype.compareMeasurements_ = function compareMeasurements_() {
    var _this5 = this;

    return this.defaultFontElements_.some(function (defaultElement) {
      var hasWidthChanged = Math.abs(defaultElement. /*OK*/offsetWidth - _this5.customFontElement_. /*OK*/offsetWidth) > TOLERANCE_;
      var hasHeightChanged = Math.abs(defaultElement. /*OK*/offsetHeight - _this5.customFontElement_. /*OK*/offsetHeight) > TOLERANCE_;
      return hasWidthChanged || hasHeightChanged;
    });
  };

  /**
   * @private
   */

  FontLoader.prototype.dispose_ = function dispose_() {
    if (this.container_) {
      _srcDom.removeElement(this.container_);
    }
    this.container_ = null;
    this.defaultFontElements_ = null;
    this.customFontElement_ = null;
  };

  return FontLoader;
})();

exports.FontLoader = FontLoader;

},{"../../../src/dom":4,"../../../src/style":6,"../../../src/timer":7,"../../../src/vsync":8}],3:[function(require,module,exports){
exports.__esModule = true;
exports.assert = assert;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws an error if the first argument isn't trueish.
 *
 * Supports argument substitution into the message via %s placeholders.
 *
 * Throws an error object that has two extra properties:
 * - associatedElement: This is the first element provided in the var args.
 *   It can be used for improved display of error messages.
 * - messageArray: The elements of the substituted message as non-stringified
 *   elements in an array. When e.g. passed to console.error this yields
 *   native displays of things like HTML elements.
 *
 * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
 *     not evaluate to true.
 * @param {string} message The assertion message
 * @param {...*} var_args Arguments substituted into %s in the message.
 * @return {T} The value of shouldBeTrueish.
 * @template T
 */
/*eslint "google-camelcase/google-camelcase": 0*/

function assert(shouldBeTrueish, message, var_args) {
  var firstElement = undefined;
  if (!shouldBeTrueish) {
    message = message || 'Assertion failed';
    var splitMessage = message.split('%s');
    var first = splitMessage.shift();
    var formatted = first;
    var messageArray = [];
    pushIfNonEmpty(messageArray, first);
    for (var i = 2; i < arguments.length; i++) {
      var val = arguments[i];
      if (val && val.tagName) {
        firstElement = val;
      }
      var nextConstant = splitMessage.shift();
      messageArray.push(val);
      pushIfNonEmpty(messageArray, nextConstant.trim());
      formatted += toString(val) + nextConstant;
    }
    var e = new Error(formatted);
    e.fromAssert = true;
    e.associatedElement = firstElement;
    e.messageArray = messageArray;
    throw e;
  }
  return shouldBeTrueish;
}

/*eslint "google-camelcase/google-camelcase": 2*/

/**
 * @param {*} val
 * @return {string}
 */
function toString(val) {
  if (val instanceof Element) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }
  return val;
}

/**
 * @param {!Array} array
 * @param {*} val
 */
function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}

},{}],4:[function(require,module,exports){
exports.__esModule = true;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.copyChildren = copyChildren;
exports.closest = closest;
exports.closestByTag = closestByTag;
exports.elementByTag = elementByTag;
exports.childElement = childElement;
exports.childElementByAttr = childElementByAttr;
exports.childElementByTag = childElementByTag;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Removes the element.
 * @param {!Element} element
 */

function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}

/**
 * Removes all child nodes of the specified element.
 * @param {!Element} parent
 */

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Copies all children nodes of element "from" to element "to". Child nodes
 * are deeply cloned. Notice, that this method should be used with care and
 * preferably on smaller subtrees.
 * @param {!Element} from
 * @param {!Element} to
 */

function copyChildren(from, to) {
  var frag = to.ownerDocument.createDocumentFragment();
  for (var n = from.firstChild; n; n = n.nextSibling) {
    frag.appendChild(n.cloneNode(true));
  }
  to.appendChild(frag);
}

/**
 * Finds the closest element that satisfies the callback from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function closest(element, callback) {
  for (var el = element; el; el = el.parentElement) {
    if (callback(el)) {
      return el;
    }
  }
  return null;
}

/**
 * Finds the closest element with the specified name from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */

function closestByTag(element, tagName) {
  tagName = tagName.toUpperCase();
  return closest(element, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Finds the first descendant element with the specified name.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */

function elementByTag(element, tagName) {
  var elements = element.getElementsByTagName(tagName);
  return elements.length > 0 ? elements[0] : null;
}

/**
 * Finds the first child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function childElement(parent, callback) {
  var children = parent.children;
  for (var i = 0; i < children.length; i++) {
    if (callback(children[i])) {
      return children[i];
    }
  }
  return null;
}

/**
 * Finds the first child element that has the specified attribute, optionally
 * with a value.
 * @param {!Element} parent
 * @param {string} attr
 * @param {string=} opt_value
 * @return {?Element}
 */

function childElementByAttr(parent, attr, opt_value) {
  return childElement(parent, function (el) {
    if (!el.hasAttribute(attr)) {
      return false;
    }
    if (opt_value !== undefined && el.getAttribute(attr) != opt_value) {
      return false;
    }
    return true;
  });
}

/**
 * Finds the first child element that has the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {?Element}
 */

function childElementByTag(parent, tagName) {
  tagName = tagName.toUpperCase();
  return childElement(parent, function (el) {
    return el.tagName == tagName;
  });
}

},{}],5:[function(require,module,exports){
exports.__esModule = true;
exports.getService = getService;
exports.getElementService = getElementService;
exports.markElementScheduledForTesting = markElementScheduledForTesting;
exports.resetServiceForTesting = resetServiceForTesting;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _asserts = require('./asserts');

/**
 * Holds info about a service.
 * - obj: Actual service implementation when available.
 * - promise: Promise for the obj.
 * - resolve: Function to resolve the promise with the object.
 * @typedef {{
 *   obj: (?Object),
 *   promise: (?Promise|undefined),
 *   resolve: (?function(!Object)|undefined),
 * }}
 */
var ServiceHolderDef = undefined;

/**
 * Returns a service for the given id and window (a per-window singleton).
 * If the service is not yet available the factory function is invoked and
 * expected to return the service.
 * Users should typically wrap this as a special purpose function (e.g.
 * viewportFor(win)) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(!Window):!Object=} opt_factory Should create the service
 *     if it does not exist yet. If the factory is not given, it is an error
 *     if the service does not exist yet.
 * @return {*}
 */

function getService(win, id, opt_factory) {
  var services = getServices(win);
  var s = services[id];
  if (!s) {
    s = services[id] = {};
  }
  if (!s.obj) {
    _asserts.assert(opt_factory, 'Factory not given and service missing %s', id);
    s.obj = opt_factory(win);
    // The service may have been requested already, in which case we have a
    // pending promise we need to fulfill.
    if (s.resolve) {
      s.resolve(s.obj);
    }
  }
  return s.obj;
}

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * viewportFor(win)) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} provideByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<*>}
 */

function getElementService(win, id, providedByElement) {
  // Call `getElementService_` in a micro-task to ensure that `stubElements`
  // has been called.
  return Promise.resolve().then(function () {
    return getElementService_(win, id, providedByElement);
  });
}

/**
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} provideByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<*>}
 * @private
 */
function getElementService_(win, id, providedByElement) {
  _asserts.assert(isElementScheduled(win, providedByElement), 'Service %s was requested to be provided through %s, ' + 'but %s is not loaded in the current page. To fix this ' + 'problem load the JavaScript file for %s in this page.', id, providedByElement, providedByElement, providedByElement);
  var services = getServices(win);
  var s = services[id];
  if (s) {
    // If a service was registered with getService, we make a promise from it
    // which we will return in future invocations.
    if (!s.promise) {
      s.promise = Promise.resolve(s.obj);
    }
    return s.promise;
  }
  // TODO(@cramforce): Add a check that if the element is eventually registered
  // that the service is actually provided and this promise resolves.
  var resolve = undefined;
  var p = new Promise(function (r) {
    resolve = r;
  });
  services[id] = {
    obj: null,
    promise: p,
    resolve: resolve
  };

  return p;
}

/**
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @return {boolean} Whether this element is scheduled to be loaded.
 */
function isElementScheduled(win, elementName) {
  _asserts.assert(win.ampExtendedElements, 'win.ampExtendedElements not created yet');
  return !!win.ampExtendedElements[elementName];
}

/**
 * In order to provide better error messages we only allow to retrieve
 * services from other elements if those elements are loaded in the page.
 * This makes it possible to mark an element as loaded in a test.
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 */

function markElementScheduledForTesting(win, elementName) {
  if (!win.ampExtendedElements) {
    win.ampExtendedElements = {};
  }
  win.ampExtendedElements[elementName] = true;
}

/**
 * Returns the object that holds the services registered in a window.
 * @param {!Window} win
 * @return {!Object<string,!ServiceHolderDef>}
 */
function getServices(win) {
  var services = win.services;
  if (!services) {
    services = win.services = {};
  }
  return services;
}

/**
 * Resets a single service, so it gets recreated on next getService invocation.
 * @param {!Window} win
 * @param {string} id of the service.
 */

function resetServiceForTesting(win, id) {
  if (win.services) {
    win.services[id] = null;
  }
}

},{"./asserts":3}],6:[function(require,module,exports){
exports.__esModule = true;
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.setStyle = setStyle;
exports.getStyle = getStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: loaded by 3p system. Cannot rely on babel polyfills.

/** @private @const {!Object<string>} */
var propertyNameCache_ = Object.create(null);

/** @private @const {!Array<string>} */
var vendorPrefixes_ = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];

/**
 * @export
 * @param {string} camelCase camel cased string
 * @return {string} title cased string
 */

function camelCaseToTitleCase(camelCase) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Checks the object if a prefixed version of a property exists and returns
 * it or returns an empty string.
 * @private
 * @param {!Object} object
 * @param {string} titleCase the title case version of a css property name
 * @return {string} the prefixed property name or null.
 */
function getVendorJsPropertyName_(object, titleCase) {
  for (var i = 0; i < vendorPrefixes_.length; i++) {
    var propertyName = vendorPrefixes_[i] + titleCase;
    if (object[propertyName] !== undefined) {
      return propertyName;
    }
  }
  return '';
}

/**
 * Returns the possibly prefixed JavaScript property name of a style property
 * (ex. WebkitTransitionDuration) given a camelCase'd version of the property
 * (ex. transitionDuration).
 * @export
 * @param {!Object} object
 * @param {string} camelCase the camel cased version of a css property name
 * @param {boolean=} opt_bypassCache bypass the memoized cache of property
 *   mapping
 * @return {string}
 */

function getVendorJsPropertyName(object, camelCase, opt_bypassCache) {
  var propertyName = propertyNameCache_[camelCase];
  if (!propertyName || opt_bypassCache) {
    propertyName = camelCase;
    if (object[camelCase] === undefined) {
      var titleCase = camelCaseToTitleCase(camelCase);
      var prefixedPropertyName = getVendorJsPropertyName_(object, titleCase);

      if (object[prefixedPropertyName] !== undefined) {
        propertyName = prefixedPropertyName;
      }
    }
    if (!opt_bypassCache) {
      propertyNameCache_[camelCase] = propertyName;
    }
  }
  return propertyName;
}

/**
 * Sets the CSS style of the specified element with optional units, e.g. "px".
 * @param {!Element} element
 * @param {string} property
 * @param {*} value
 * @param {string=} opt_units
 * @param {boolean=} opt_bypassCache
 */

function setStyle(element, property, value, opt_units, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (propertyName) {
    element.style[propertyName] = opt_units ? value + opt_units : value;
  }
}

/**
 * Returns the value of the CSS style of the specified element.
 * @param {!Element} element
 * @param {string} property
 * @param {boolean=} opt_bypassCache
 * @return {*}
 */

function getStyle(element, property, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (!propertyName) {
    return undefined;
  }
  return element.style[propertyName];
}

/**
 * Sets the CSS styles of the specified element. The styles
 * a specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, *>} styles
 */

function setStyles(element, styles) {
  for (var k in styles) {
    setStyle(element, k, styles[k]);
  }
}

/**
 * Shows or hides the specified element.
 * @param {!Element} element
 * @param {boolean=} opt_display
 */

function toggle(element, opt_display) {
  if (opt_display === undefined) {
    opt_display = !(element.style.display != 'none');
  }
  element.style.display = opt_display ? '' : 'none';
}

/**
 * Returns a pixel value.
 * @param {number} value
 * @return {string}
 */

function px(value) {
  return value + 'px';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function translateX(value) {
  if (typeof value == 'string') {
    return 'translateX(' + value + ')';
  }
  return 'translateX(' + px(value) + ')';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} x
 * @param {(number|string)=} opt_y
 * @return {string}
 */

function translate(x, opt_y) {
  if (typeof x == 'number') {
    x = px(x);
  }
  if (opt_y === undefined) {
    return 'translate(' + x + ')';
  }
  if (typeof opt_y == 'number') {
    opt_y = px(opt_y);
  }
  return 'translate(' + x + ',' + opt_y + ')';
}

/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function scale(value) {
  return 'scale(' + value + ')';
}

},{}],7:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Helper with all things Timer.
 */

var Timer = (function () {

  /**
   * @param {!Window} win
   */

  function Timer(win) {
    babelHelpers.classCallCheck(this, Timer);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Promise}  */
    this.resolved_ = Promise.resolve();

    this.taskCount_ = 0;

    this.canceled_ = {};

    /** @const {number} */
    this.startTime_ = this.now();
  }

  /**
   * Returns the current EPOC time in milliseconds.
   * @return {number}
   */

  Timer.prototype.now = function now() {
    // TODO(dvoytenko): when can we use Date.now?
    return Number(new Date());
  };

  /**
   * Returns time since start in milliseconds.
   * @return {number}
   */

  Timer.prototype.timeSinceStart = function timeSinceStart() {
    return this.now() - this.startTime_;
  };

  /**
   * Runs the provided callback after the specified delay. This uses a micro
   * task for 0 or no specified time. This means that the delay will actually
   * be close to 0 and this will NOT yield to the event queue.
   *
   * Returns the timer ID that can be used to cancel the timer (cancel method).
   * @param {!function()} callback
   * @param {number=} opt_delay
   * @return {number|string}
   */

  Timer.prototype.delay = function delay(callback, opt_delay) {
    var _this = this;

    if (!opt_delay) {
      var _ret = (function () {
        // For a delay of zero,  schedule a promise based micro task since
        // they are predictably fast.
        var id = 'p' + _this.taskCount_++;
        _this.resolved_.then(function () {
          if (_this.canceled_[id]) {
            delete _this.canceled_[id];
            return;
          }
          callback();
        });
        return {
          v: id
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
    return this.win.setTimeout(callback, opt_delay);
  };

  /**
   * Cancels the previously scheduled callback.
   * @param {number|string} timeoutId
   */

  Timer.prototype.cancel = function cancel(timeoutId) {
    if (typeof timeoutId == 'string') {
      this.canceled_[timeoutId] = true;
      return;
    }
    this.win.clearTimeout(timeoutId);
  };

  /**
   * Returns a promise that will resolve after the delay. Optionally, the
   * resolved value can be provided as opt_result argument.
   * @param {number=} opt_delay
   * @param {RESULT=} opt_result
   * @return {!Promise<RESULT>}
   * @template RESULT
   */

  Timer.prototype.promise = function promise(opt_delay, opt_result) {
    var _this2 = this;

    var timerKey = null;
    return new Promise(function (resolve, reject) {
      timerKey = _this2.delay(function () {
        timerKey = -1;
        resolve(opt_result);
      }, opt_delay);
      if (timerKey == -1) {
        reject(new Error('Failed to schedule timer.'));
      }
    })['catch'](function (error) {
      // Clear the timer. The most likely reason is "cancel" signal.
      if (timerKey != -1) {
        _this2.cancel(timerKey);
      }
      return Promise.reject(error);
    });
  };

  /**
   * Returns a promise that will fail after the specified delay. Optionally,
   * this method can take opt_racePromise parameter. In this case, the
   * resulting promise will either fail when the specified delay expires or
   * will resolve based on the opt_racePromise, whichever happens first.
   * @param {number} delay
   * @param {!Promise<RESULT>|undefined} opt_racePromise
   * @return {!Promise<RESULT>}
   * @template RESULT
   */

  Timer.prototype.timeoutPromise = function timeoutPromise(delay, opt_racePromise) {
    var _this3 = this;

    var timerKey = null;
    var delayPromise = new Promise(function (_resolve, reject) {
      timerKey = _this3.delay(function () {
        timerKey = -1;
        reject('timeout');
      }, delay);
      if (timerKey == -1) {
        reject(new Error('Failed to schedule timer.'));
      }
    })['catch'](function (error) {
      // Clear the timer. The most likely reason is "cancel" signal.
      if (timerKey != -1) {
        _this3.cancel(timerKey);
      }
      return Promise.reject(error);
    });
    if (!opt_racePromise) {
      return delayPromise;
    }
    // Avoids Promise->race due to presubmit check against it.
    return new Promise(function (resolve, reject) {
      delayPromise.then(resolve, reject);
      opt_racePromise.then(resolve, reject);
    });
  };

  return Timer;
})();

exports.Timer = Timer;
var timer = new Timer(window);
exports.timer = timer;

},{}],8:[function(require,module,exports){
exports.__esModule = true;
exports.vsyncFor = vsyncFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!Vsync}
 */

function vsyncFor(window) {
  return _service.getService(window, 'vsync');
}

;

},{"./service":5}]},{},[1])


});
//# sourceMappingURL=amp-font-0.1.max.js.map