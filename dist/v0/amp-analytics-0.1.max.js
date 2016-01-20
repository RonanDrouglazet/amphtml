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

var _srcUrl = require('../../../src/url');

var _srcExperiments = require('../../../src/experiments');

var _srcServiceCidImpl = require('../../../src/service/cid-impl');

var _srcLog = require('../../../src/log');

var _srcUrlReplacements = require('../../../src/url-replacements');

var _srcString = require('../../../src/string');

var _srcXhr = require('../../../src/xhr');

var _instrumentation = require('./instrumentation');

var _transport = require('./transport');

var _vendors = require('./vendors');

_srcServiceCidImpl.installCidService(AMP.win);

/** @const */
var EXPERIMENT = 'amp-analytics';

var AmpAnalytics = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpAnalytics, _AMP$BaseElement);

  function AmpAnalytics() {
    babelHelpers.classCallCheck(this, AmpAnalytics);

    _AMP$BaseElement.apply(this, arguments);
  }

  /**
   * @return {boolean}
   * @private
   */

  AmpAnalytics.prototype.isExperimentOn_ = function isExperimentOn_() {
    return _srcExperiments.isExperimentOn(this.getWin(), EXPERIMENT);
  };

  /** @override */

  AmpAnalytics.prototype.isLayoutSupported = function isLayoutSupported(unusedLayout) {
    return true;
  };

  /**
   * @override
   */

  AmpAnalytics.prototype.createdCallback = function createdCallback() {
    if (!this.isExperimentOn_()) {
      return;
    }

    /**
     * @const {!JSONObject} Copied here for tests.
     * @private
     */
    this.predefinedConfig_ = _vendors.ANALYTICS_CONFIG;
  };

  /** @override */

  AmpAnalytics.prototype.layoutCallback = function layoutCallback() {
    var _this = this;

    if (!this.isExperimentOn_()) {
      return Promise.resolve();
    }

    this.element.setAttribute('aria-hidden', 'true');

    /**
     * @private {?string} Predefinedtype associated with the tag. If specified,
     * the config from the predefined type is merged with the inline config
     */
    this.type_ = null;

    /**
     * @private {Object<string, string>} A map of request names to the request
     * format string used by the tag to send data
     */
    this.requests_ = {};

    /**
     * @private {JSONObject}
     */
    this.remoteConfig = {};

    return this.fetchRemoteConfig_().then(function () {
      /**
       * @private {!JSONObject} The analytics config associated with the tag
       */
      _this.config_ = _this.mergeConfigs_();

      if (_this.hasOptedOut_()) {
        // Nothing to do when the user has opted out.
        _srcLog.log.fine(_this.getName_(), 'User has opted out. No hits will be sent.');
        return Promise.resolve();
      }

      _this.generateRequests_();

      if (!_this.config_['triggers']) {
        _srcLog.log.error(_this.getName_(), 'No triggers were found in the config. No ' + 'analytics data will be sent.');
        return Promise.resolve();
      }

      // Trigger callback can be synchronous. Do the registration at the end.
      for (var k in _this.config_['triggers']) {
        if (_this.config_['triggers'].hasOwnProperty(k)) {
          var trigger = _this.config_['triggers'][k];
          if (!trigger['on'] || !trigger['request']) {
            _srcLog.log.warn(_this.getName_(), '"on" and "request" attributes are ' + 'required for data to be collected.');
            continue;
          }
          _instrumentation.addListener(_this.getWin(), trigger['on'], _this.handleEvent_.bind(_this, trigger), trigger['selector']);
        }
      }
    });
  };

  /**
   * Returns a promise that resolves when remote config is ready (or
   * immediately if no remote config is specified.)
   * @private
   * @return {!Promise<>}
   */

  AmpAnalytics.prototype.fetchRemoteConfig_ = function fetchRemoteConfig_() {
    var _this2 = this;

    var remoteConfigUrl = this.element.getAttribute('config');
    if (!remoteConfigUrl) {
      return Promise.resolve();
    }
    _srcUrl.assertHttpsUrl(remoteConfigUrl);
    _srcLog.log.fine(this.getName_(), 'Fetching remote config', remoteConfigUrl);
    return _srcXhr.xhrFor(this.getWin()).fetchJson(remoteConfigUrl).then(function (jsonValue) {
      _this2.remoteConfig_ = jsonValue;
      _srcLog.log.fine(_this2.getName_(), 'Remote config loaded', remoteConfigUrl);
    }, function (err) {
      _srcLog.log.warn(_this2.getName_(), 'Error loading remote config', remoteConfigUrl, err);
    });
  };

  /**
   * Merges various sources of configs and stores them in a member variable.
   *
   * Order of precedence for configs from highest to lowest:
   * - Remote config: specified through an attribute of the tag.
   * - Inline config: specified insize the tag.
   * - Predefined config: Defined as part of the platform.
   * - Default config: Built-in config shared by all amp-analytics tags.
   *
   * @private
   * @return {!JSONObject}
   */

  AmpAnalytics.prototype.mergeConfigs_ = function mergeConfigs_() {
    var inlineConfig = {};
    try {
      var children = this.element.children;
      if (children.length == 1) {
        var child = children[0];
        if (child.tagName.toUpperCase() == 'SCRIPT' && child.getAttribute('type').toUpperCase() == 'APPLICATION/JSON') {
          inlineConfig = JSON.parse(children[0].textContent);
        } else {
          _srcLog.log.warn(this.getName_(), 'The analytics config should be put in a ' + '<script> tag with type=application/json');
        }
      } else if (children.length > 1) {
        _srcLog.log.warn(this.getName_(), 'The tag should contain only one <script> child.');
      }
    } catch (er) {
      _srcLog.log.warn(this.getName_(), 'Analytics config could not be parsed. ' + 'Is it in a valid JSON format?', er);
    }

    var config = {};
    var defaultConfig = this.predefinedConfig_['default'] || {};
    var typeConfig = this.predefinedConfig_[this.element.getAttribute('type')] || {};

    config['vars'] = config['vars'] || {};

    this.mergeObjects_(defaultConfig, config);
    this.mergeObjects_(typeConfig, config);
    this.mergeObjects_(inlineConfig, config);
    this.mergeObjects_(this.remoteConfig_, config);
    return config;
  };

  /**
   * @return {boolean} true if the user has opted out.
   */

  AmpAnalytics.prototype.hasOptedOut_ = function hasOptedOut_() {
    if (!this.config_['optout']) {
      return false;
    }

    var props = this.config_['optout'].split('.');
    var k = this.getWin();
    for (var i = 0; i < props.length; i++) {
      if (!k) {
        return false;
      }
      k = k[props[i]];
    }
    return k();
  };

  /**
   * Goes through all the requests in predefined vendor config and tag's config
   * and creates a map of request name to request template. These requests can
   * then be used while sending a request to a server.
   *
   * @private
   */

  AmpAnalytics.prototype.generateRequests_ = function generateRequests_() {
    var _this3 = this;

    var requests = {};
    if (!this.config_ || !this.config_['requests']) {
      _srcLog.log.error(this.getName_(), 'No request strings defined. Analytics data ' + 'will not be sent from this page.');
      return;
    }
    for (var k in this.config_['requests']) {
      if (this.config_['requests'].hasOwnProperty(k)) {
        requests[k] = this.config_['requests'][k];
      }
    }
    this.requests_ = requests;

    // Expand any placeholders. For requests, we expand each string up to 5
    // times to support nested requests. Leave any unresolved placeholders.
    for (var k in this.requests_) {
      this.requests_[k] = _srcString.expandTemplate(this.requests_[k], function (key) {
        return _this3.requests_[key] || '${' + key + '}';
      }, 5);
    }
  };

  /**
   * Callback for events that are registered by the config's triggers. This
   * method generates the request and sends the request out.
   *
   * @param {!JSONObject} trigger JSON config block that resulted in this event.
   * @param {!Object} unusedEvent Object with details about the event.
   * @private
   */

  AmpAnalytics.prototype.handleEvent_ = function handleEvent_(trigger, unusedEvent) {
    var _this4 = this;

    var request = this.requests_[trigger['request']];
    if (!request) {
      _srcLog.log.warn(this.getName_(), 'Ignoring event. Request string not found', trigger['request']);
      return;
    }

    // Replace placeholders with URI encoded values.
    // Precedence is trigger.vars > config.vars.
    // Nested expansion not supported.
    request = _srcString.expandTemplate(request, function (key) {
      var match = key.match(/([^(]*)(\([^)]*\))?/);
      var name = match[1];
      var argList = match[2] || '';
      var val = encodeURIComponent(trigger['vars'] && trigger['vars'][name] || _this4.config_['vars'] && _this4.config_['vars'][name] || '');
      return val + argList;
    });

    // For consistentcy with amp-pixel we also expand any url replacements.
    _srcUrlReplacements.urlReplacementsFor(this.getWin()).expand(request).then(function (request) {
      return _this4.sendRequest_(request);
    });
  };

  /**
   * @param {string} request The full request string to send.
   * @private
   */

  AmpAnalytics.prototype.sendRequest_ = function sendRequest_(request) {
    if (!request) {
      _srcLog.log.warn(this.getName_(), 'Request not sent. Contents empty.');
      return;
    }
    _transport.sendRequest(this.getWin(), request, this.config_['transport'] || {});
  };

  /**
   * @return {string} Returns a string to identify this tag. May not be unique
   * if the element id is not unique.
   * @private
   */

  AmpAnalytics.prototype.getName_ = function getName_() {
    return 'AmpAnalytics ' + (this.element.getAttribute('id') || '<unknown id>');
  };

  /**
   * Merges two objects. If the value is array or plain object, the values are
   * merged otherwise the value is overwritten.
   *
   * @param {Object|Array} from Object or array to merge from
   * @param {Object|Array} to Object or Array to merge into
   * @private
   */

  AmpAnalytics.prototype.mergeObjects_ = function mergeObjects_(from, to) {
    // Checks if the given object is a plain object.
    var isObject = function (someObj) {
      return Object.prototype.toString.call(someObj) === '[object Object]';
    };

    if (to === null || to === undefined) {
      to = {};
    }

    for (var property in from) {
      if (from.hasOwnProperty(property)) {
        // Only deal with own properties.
        if (Array.isArray(from[property])) {
          if (!Array.isArray(to[property])) {
            to[property] = [];
          }
          to[property] = this.mergeObjects_(from[property], to[property]);
        } else if (isObject(from[property])) {
          if (!isObject(to[property])) {
            to[property] = {};
          }
          to[property] = this.mergeObjects_(from[property], to[property]);
        } else {
          to[property] = from[property];
        }
      }
    }
    return to;
  };

  return AmpAnalytics;
})(AMP.BaseElement);

exports.AmpAnalytics = AmpAnalytics;

AMP.registerElement('amp-analytics', AmpAnalytics);

},{"../../../src/experiments":11,"../../../src/log":12,"../../../src/service/cid-impl":16,"../../../src/string":17,"../../../src/url":20,"../../../src/url-replacements":19,"../../../src/xhr":25,"./instrumentation":2,"./transport":3,"./vendors":4}],2:[function(require,module,exports){
exports.__esModule = true;
exports.addListener = addListener;
exports.instrumentationServiceFor = instrumentationServiceFor;
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

var _srcService = require('../../../src/service');

var _srcViewer = require('../../../src/viewer');

var _srcObservable = require('../../../src/observable');

var _srcLog = require('../../../src/log');

/**
 * This type signifies a callback that gets called when an analytics event that
 * the listener subscribed to fires.
 * @typedef {function(!AnalyticsEvent)}
 */
var AnalyticsEventListenerDef = undefined;

/**
 * @param {!Window} window Window object to listen on.
 * @param {!AnalyticsEventType} type Event type to listen to.
 * @param {!AnalyticsEventListenerDef} listener Callback to call when the event
 *          fires.
 * @param {string=} opt_selector If specified, the given listener
 *   should only be called if the event target matches this selector.
 */

function addListener(window, type, listener, opt_selector) {
  return instrumentationServiceFor(window).addListener(type, listener, opt_selector);
}

/**
 * Events that can result in analytics data to be sent.
 * @const
 * @enum {string}
 */
var AnalyticsEventType = {
  VISIBLE: 'visible',
  CLICK: 'click'
};

exports.AnalyticsEventType = AnalyticsEventType;
/**
 * Ignore Most of this class as it has not been thought through yet. It will
 * change completely.
 */

var AnalyticsEvent =

/**
 * @param {!AnalyticsEventType} type The type of event.
 */
function AnalyticsEvent(type) {
  babelHelpers.classCallCheck(this, AnalyticsEvent);

  this.type = type;
}

/** @private */
;

var InstrumentationService = (function () {
  /**
   * @param {!Window} window
   */

  function InstrumentationService(window) {
    babelHelpers.classCallCheck(this, InstrumentationService);

    /** @const {!Window} */
    this.win_ = window;

    /** @const {string} */
    this.TAG_ = "Analytics.Instrumentation";

    /** @const {!Viewer} */
    this.viewer_ = _srcViewer.viewerFor(window);

    /** @private {boolean} */
    this.clickHandlerRegistered_ = false;

    /** @private {!Observable<Event>} */
    this.clickObservable_ = new _srcObservable.Observable();
  }

  /**
   * @param {!Window} window
   * @return {!InstrumentationService}
   */

  /**
   * @param {!AnalyticsEventType} eventType The type of event
   * @param {!AnalyticsEventListenerDef} The callback to call when the event
   *   occurs.
   * @param {string=} opt_selector If specified, the given listener
   *   should only be called if the event target matches this selector.
   */

  InstrumentationService.prototype.addListener = function addListener(eventType, listener, opt_selector) {
    var _this = this;

    if (eventType === AnalyticsEventType.VISIBLE) {
      if (this.viewer_.isVisible()) {
        listener(new AnalyticsEvent(AnalyticsEventType.VISIBLE));
      } else {
        this.viewer_.onVisibilityChanged(function () {
          if (_this.viewer_.isVisible()) {
            listener(new AnalyticsEvent(AnalyticsEventType.VISIBLE));
          }
        });
      }
    } else if (eventType === AnalyticsEventType.CLICK) {
      if (!opt_selector) {
        _srcLog.log.warn(this.TAG_, 'Missing required selector on click trigger');
      } else {
        this.ensureClickListener_();
        this.clickObservable_.add(this.createSelectiveListener_(listener, opt_selector));
      }
    }
  };

  /**
   * Ensure we have a click listener registered on the document.
   */

  InstrumentationService.prototype.ensureClickListener_ = function ensureClickListener_() {
    if (!this.clickHandlerRegistered_) {
      this.clickHandlerRegistered_ = true;
      this.win_.document.documentElement.addEventListener('click', this.onClick_.bind(this));
    }
  };

  /**
   * @param {!Event} e
   */

  InstrumentationService.prototype.onClick_ = function onClick_(e) {
    this.clickObservable_.fire(e);
  };

  /**
   * @param {!Function} listener
   * @param {string} selector
   */

  InstrumentationService.prototype.createSelectiveListener_ = function createSelectiveListener_(listener, selector) {
    var _this2 = this;

    return function (e) {
      if (selector === '*' || _this2.matchesSelector_(e.target, selector)) {
        listener(new AnalyticsEvent(AnalyticsEventType.CLICK));
      }
    };
  };

  /**
   * @param {!Element} el
   * @param {string} selector
   * @return {boolean} True if the given element matches the given selector.
   */

  InstrumentationService.prototype.matchesSelector_ = function matchesSelector_(el, selector) {
    try {
      var matcher = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
      if (matcher) {
        return matcher.call(el, selector);
      }
      var matches = this.win_.document.querySelectorAll(selector);
      var i = matches.length;
      while (i-- > 0 && matches.item(i) != el) {};
      return i > -1;
    } catch (selectorError) {
      _srcLog.log.error(this.TAG_, 'Bad query selector: ', selector, selectorError);
    }
    return false;
  };

  return InstrumentationService;
})();

function instrumentationServiceFor(window) {
  return _srcService.getService(window, 'amp-analytics-instrumentation', function () {
    return new InstrumentationService(window);
  });
}

},{"../../../src/log":12,"../../../src/observable":14,"../../../src/service":15,"../../../src/viewer":22}],3:[function(require,module,exports){
exports.__esModule = true;
exports.sendRequest = sendRequest;
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

var _srcUrl = require('../../../src/url');

var _srcLog = require('../../../src/log');

var _srcEventHelper = require('../../../src/event-helper');

/** @const {string} */
var TAG_ = 'AmpAnalytics.Transport';

/**
 * @param {!Window} win
 * @param {string} request
 * @param {!Object<string, string>} transportOptions
 */

function sendRequest(win, request, transportOptions) {
  _srcUrl.assertHttpsUrl(request);
  if (transportOptions['beacon'] && Transport.sendRequestUsingBeacon(win, request)) {
    return;
  }
  if (transportOptions['xhrpost'] && Transport.sendRequestUsingXhr(win, request)) {
    return;
  }
  if (transportOptions['image']) {
    Transport.sendRequestUsingImage(win, request);
    return;
  }
  _srcLog.log.warn(TAG_, 'Failed to send request', request, transportOptions);
}

/**
 * @visibleForTesting
 */

var Transport = (function () {
  function Transport() {
    babelHelpers.classCallCheck(this, Transport);
  }

  /**
   * @param {!Window} unusedWin
   * @param {string} request
   */

  Transport.sendRequestUsingImage = function sendRequestUsingImage(unusedWin, request) {
    var image = new Image();
    image.src = request;
    image.width = 1;
    image.height = 1;
    _srcEventHelper.loadPromise(image).then(function () {
      _srcLog.log.fine(TAG_, 'Sent image request', request);
    })['catch'](function () {
      _srcLog.log.warn(TAG_, 'Failed to send image request', request);
    });
  };

  /**
   * @param {!Window} win
   * @param {string} request
   * @return {boolean} True if this browser supports navigator.sendBeacon.
   */

  Transport.sendRequestUsingBeacon = function sendRequestUsingBeacon(win, request) {
    if (!win.navigator.sendBeacon) {
      return false;
    }
    win.navigator.sendBeacon(request, '');
    _srcLog.log.fine(TAG_, 'Sent beacon request', request);
    return true;
  };

  /**
   * @param {!Window} win
   * @param {string} request
   * @return {boolean} True if this browser supports cross-domain XHR.
   */

  Transport.sendRequestUsingXhr = function sendRequestUsingXhr(win, request) {
    if (!win.XMLHttpRequest) {
      return false;
    }
    var xhr = new win.XMLHttpRequest();
    if (!('withCredentials' in xhr)) {
      return false; // Looks like XHR level 1 - CORS is not supported.
    }
    xhr.open('POST', request, true);
    xhr.withCredentials = true;

    // Prevent pre-flight HEAD request.
    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.onreadystatechange = function () {
      if (xhr.readystate == 4) {
        _srcLog.log.fine(TAG_, 'Sent XHR request', request);
      }
    };

    xhr.send('');
    return true;
  };

  return Transport;
})();

exports.Transport = Transport;

},{"../../../src/event-helper":10,"../../../src/log":12,"../../../src/url":20}],4:[function(require,module,exports){
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
 * @const {!JSONObject}
 */
var ANALYTICS_CONFIG = {

  // Default parent configuration applied to all amp-analytics tags.
  'default': {
    'transport': { 'beacon': true, 'xhrpost': true, 'image': true },
    'vars': {
      'random': 'RANDOM',
      'canonicalUrl': 'CANONICAL_URL',
      'canonicalHost': 'CANONICAL_HOST',
      'canonicalPath': 'CANONICAL_PATH',
      'documentReferrer': 'DOCUMENT_REFERRER',
      'title': 'TITLE',
      'ampdocUrl': 'AMPDOC_URL',
      'ampdocHost': 'AMPDOC_HOST',
      'pageViewId': 'PAGE_VIEW_ID',
      'clientId': 'CLIENT_ID',
      'timestamp': 'TIMESTAMP',
      'timezone': 'TIMEZONE',
      'scrollTop': 'SCROLL_TOP',
      'scrollLeft': 'SCROLL_LEFT',
      'scrollWidth': 'SCROLL_WIDTH',
      'scrollHeight': 'SCROLL_HEIGHT',
      'screenWidth': 'SCREEN_WIDTH',
      'screenHeight': 'SCREEN_HEIGHT'
    }
    // TODO(btownsend, #871): Add a generic hit format to make custom analytics
    // easier.
  },

  'googleanalytics': {
    'requests': {
      'host': 'https://www.google-analytics.com',
      'basePrefix': 'v=1&_v=a0&aip=true&_s=${hitCount}&dl=${canonicalUrl}&' + 'dt=${title}&sr=${screenWidth}x${screenHeight}&_utmht=${timestamp}&' + 'jid=&cid=${clientId(_ga)}&tid=${account}',
      'baseSuffix': '&z=${random}',
      'pageview': '${host}/r/collect?${basePrefix}&t=pageview&' + '_r=1${baseSuffix}',
      'event': '${host}/collect?${basePrefix}&t=event&' + 'ec=${eventCategory}&ea=${eventAction}&el=${eventLabel}&' + 'ev=${eventValue}${baseSuffix}',
      'social': '${host}/collect?${basePrefix}&t=social&' + 'sa=${socialAction}&sn=${socialNetwork}&st=${socialActionTarget}' + '${baseSuffix}'
    },
    'optout': '_gaUserPrefs.ioo'
  }
};
exports.ANALYTICS_CONFIG = ANALYTICS_CONFIG;

},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
exports.__esModule = true;
exports.cidFor = cidFor;
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
 * @fileoverview Factory for ./service/cid-impl.js
 */

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!Promise<!Cid>}
 */

function cidFor(window) {
  return _service.getElementService(window, 'cid', 'amp-analytics');
}

;

},{"./service":15}],8:[function(require,module,exports){
exports.__esModule = true;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
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
 * Returns the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * Returns the cookie's value or `null`.
 *
 * @param {!Window} win
 * @param {string} name
 * @return {?string}
 */

function getCookie(win, name) {
  var cookieString = win.document.cookie;
  if (!cookieString) {
    return null;
  }
  var cookies = cookieString.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var eq = cookie.indexOf('=');
    if (eq == -1) {
      continue;
    }
    if (decodeURIComponent(cookie.substring(0, eq).trim()) == name) {
      return decodeURIComponent(cookie.substring(eq + 1).trim());
    }
  }
  return null;
}

/**
 * Sets the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 */

function setCookie(win, name, value, expirationTime) {
  win.document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/' + '; expires=' + new Date(expirationTime).toUTCString();
}

},{}],9:[function(require,module,exports){
exports.__esModule = true;
exports.documentInfoFor = documentInfoFor;
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

var _asserts = require('./asserts');

var _url = require('./url');

/**
 * @param {!Window} win
 * @return {{canonicalUrl: string, pageViewId: string}} Info about the doc
 *     - canonicalUrl: The doc's canonical.
 *     - pageViewId: Id for this page view. Low entropy but should be unique
 *       for concurrent page views of a user.
 */

function documentInfoFor(win) {
  return _service.getService(win, 'documentInfo', function () {
    return {
      canonicalUrl: _url.parseUrl(_asserts.assert(win.document.querySelector('link[rel=canonical]'), 'AMP files are required to have a <link rel=canonical> tag.').href).href,
      pageViewId: getPageViewId(win)
    };
  });
}

/**
 * Returns a relatively low entropy random string.
 * This should be called once per window and then cached for subsequent
 * access to the same value to be persistent per page.
 * @param {!Window} win
 * @return {string}
 */
function getPageViewId(win) {
  return String(Math.floor(win.Math.random() * 10000));
}

},{"./asserts":6,"./service":15,"./url":20}],10:[function(require,module,exports){
exports.__esModule = true;
exports.listenOnce = listenOnce;
exports.listenOncePromise = listenOncePromise;
exports.isLoaded = isLoaded;
exports.loadPromise = loadPromise;
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

var _timer = require('./timer');

/**
 * Listens for the specified event on the element and removes the listener
 * as soon as event has been received.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {function(Event)} listener
 * @param {boolean=} opt_capture
 * @return {!UnlistenDef}
 */

function listenOnce(element, eventType, listener, opt_capture) {
  var capture = opt_capture || false;
  var unlisten = undefined;
  var proxy = function (event) {
    listener(event);
    unlisten();
  };
  unlisten = function () {
    element.removeEventListener(eventType, proxy, capture);
  };
  element.addEventListener(eventType, proxy, capture);
  return unlisten;
}

/**
 * Returns  a promise that will resolve as soon as the specified event has
 * fired on the element. Optionally, opt_timeout can be specified that will
 * reject the promise if the event has not fired by then.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {boolean=} opt_capture
 * @param {number=} opt_timeout
 * @return {!Promise<!Event>}
 */

function listenOncePromise(element, eventType, opt_capture, opt_timeout) {
  var unlisten = undefined;
  var eventPromise = new Promise(function (resolve, unusedReject) {
    unlisten = listenOnce(element, eventType, resolve, opt_capture);
  });
  return racePromise_(eventPromise, unlisten, opt_timeout);
}

/**
 * Whether the specified element has been loaded already.
 * @param {!Element} element
 * @return {boolean}
 */

function isLoaded(element) {
  return element.complete || element.readyState == 'complete';
}

/**
 * Returns a promise that will resolve or fail based on the element's 'load'
 * and 'error' events. Optionally this method takes a timeout, which will reject
 * the promise if the resource has not loaded by then.
 * @param {!Element} element
 * @param {number=} opt_timeout
 * @return {!Promise<!Element>}
 */

function loadPromise(element, opt_timeout) {
  var unlistenLoad = undefined;
  var unlistenError = undefined;
  var loadingPromise = new Promise(function (resolve, reject) {
    if (isLoaded(element)) {
      resolve(element);
    } else {
      // Listen once since IE 5/6/7 fire the onload event continuously for
      // animated GIFs.
      if (element.tagName === 'AUDIO' || element.tagName === 'VIDEO') {
        unlistenLoad = listenOnce(element, 'loadstart', function () {
          return resolve(element);
        });
      } else {
        unlistenLoad = listenOnce(element, 'load', function () {
          return resolve(element);
        });
      }
      unlistenError = listenOnce(element, 'error', reject);
    }
  });
  return racePromise_(loadingPromise, function () {
    // It's critical that all listeners are removed.
    if (unlistenLoad) {
      unlistenLoad();
    }
    if (unlistenError) {
      unlistenError();
    }
  }, opt_timeout);
}

/**
 * @param {!Promise<TYPE>} promise
 * @param {Unlisten|undefined} unlisten
 * @param {number|undefined} timeout
 * @return {!Promise<TYPE>}
 * @template TYPE
 */
function racePromise_(promise, unlisten, timeout) {
  var racePromise = undefined;
  if (timeout === undefined) {
    // Timeout is not specified: return promise.
    racePromise = promise;
  } else {
    // Timeout has been specified: add a timeout condition.
    racePromise = _timer.timer.timeoutPromise(timeout || 0, promise);
  }
  if (!unlisten) {
    return racePromise;
  }
  return racePromise.then(function (result) {
    unlisten();
    return result;
  }, function (reason) {
    unlisten();
    throw reason;
  });
}

},{"./timer":18}],11:[function(require,module,exports){
exports.__esModule = true;
exports.isExperimentOn = isExperimentOn;
exports.toggleExperiment = toggleExperiment;
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
 * @fileoverview Experiments system allows a developer to opt-in to test
 * features that are not yet fully tested.
 *
 * Experiments page: https://cdn.ampproject.org/experiments.html *
 */

var _cookies = require('./cookies');

var _timer = require('./timer');

/** @const {string} */
var COOKIE_NAME = 'AMP_EXP';

/** @const {number} */
var COOKIE_MAX_AGE_DAYS = 180; // 6 month

/** @const {time} */
var COOKIE_EXPIRATION_INTERVAL = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/**
 * Whether the specified experiment is on or off.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */

function isExperimentOn(win, experimentId) {
  return getExperimentIds(win).indexOf(experimentId) != -1;
}

/**
 * Toggles the expriment on or off. Returns the actual value of the expriment
 * after toggling is done.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean=} opt_on
 * @return {boolean}
 */

function toggleExperiment(win, experimentId, opt_on) {
  var experimentIds = getExperimentIds(win);
  var currentlyOn = experimentIds.indexOf(experimentId) != -1;
  var on = opt_on !== undefined ? opt_on : !currentlyOn;
  if (on != currentlyOn) {
    if (on) {
      experimentIds.push(experimentId);
    } else {
      experimentIds.splice(experimentIds.indexOf(experimentId), 1);
    }
    saveExperimentIds(win, experimentIds);
  }
  return on;
}

/**
 * Returns a set of experiment IDs currently on.
 * @param {!Window} win
 * @return {!Array<string>}
 */
function getExperimentIds(win) {
  var experimentCookie = _cookies.getCookie(win, COOKIE_NAME);
  return experimentCookie ? experimentCookie.split(/\s*,\s*/g) : [];
}

/**
 * Saves a set of experiment IDs currently on.
 * @param {!Window} win
 * @param {!Array<string>} experimentIds
 */
function saveExperimentIds(win, experimentIds) {
  _cookies.setCookie(win, COOKIE_NAME, experimentIds.join(','), _timer.timer.now() + COOKIE_EXPIRATION_INTERVAL);
}

},{"./cookies":8,"./timer":18}],12:[function(require,module,exports){
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

var _mode = require('./mode');

/** @const Time when this JS loaded.  */
var start = new Date().getTime();

/**
 * Logging.
 * // TODO(@cramforce): Make this DCRable.
 * Add #log=1 to URL to turn on logging when in prod (providing a build with
 * logging is used and #log=0 to turn off logging in local dev.
 * @final
 */

var Log = (function () {

  /**
   * @param {!Window} win
   */

  function Log(win) {
    babelHelpers.classCallCheck(this, Log);

    /**
     * In tests we use the main test window instead of the iframe where
     * the tests runs because only the former is relayed to the console.
     * @const {!Window}
     */
    this.win = win.AMP_TEST ? win.parent : win;

    /** @private {boolean} */
    this.isEnabled_ = this.shouldBeEnabled_();
  }

  Log.prototype.shouldBeEnabled_ = function shouldBeEnabled_() {
    if (!this.win.console || !this.win.console.log) {
      return false;
    }
    // Search for #log=0 or log=1
    var match = this.win.location.hash.match(/log=(\d)/);
    var shouldLog = match && match[1];
    if (_mode.getMode().localDev && shouldLog != '0') {
      return true;
    }
    if (this.win.location.hash && shouldLog == '1') {
      return true;
    }
    return false;
  };

  /**
   * @param {string} tag
   * @param {string} level
   * @param {!Array} messages
   * @param {?} opt_error
   */

  Log.prototype.msg_ = function msg_(tag, level, messages) {
    if (this.isEnabled_) {
      var fn = this.win.console.log;
      if (level == 'ERROR') {
        fn = this.win.console.error || fn;
      } else if (level == 'INFO') {
        fn = this.win.console.info || fn;
      } else if (level == 'WARN') {
        fn = this.win.console.warn || fn;
      }
      messages.unshift(new Date().getTime() - start, '[' + tag + ']');
      fn.apply(this.win.console, messages);
    }
  };

  /**
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.fine = function fine(tag, var_args) {
    if (this.isEnabled_) {
      this.msg_(tag, 'FINE', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.info = function info(tag, var_args) {
    if (this.isEnabled_) {
      this.msg_(tag, 'INFO', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.warn = function warn(tag, var_args) {
    if (this.isEnabled_) {
      this.msg_(tag, 'WARN', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * @param {string} tag
   * @param {...*} var_args
   * @param {?} opt_error
   */

  Log.prototype.error = function error(tag, var_args) {
    if (this.isEnabled_) {
      this.msg_(tag, 'ERROR', Array.prototype.slice.call(arguments, 1));
    }
  };

  return Log;
})();

exports.Log = Log;
;

var log = new Log(window);
exports.log = log;

},{"./mode":13}],13:[function(require,module,exports){
(function (process){
exports.__esModule = true;
exports.getMode = getMode;
exports.setModeForTesting = setModeForTesting;
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

var _url = require('./url');

/**
 * @typedef {{
 *   localDev: boolean
 * }}
 */
var ModeDef = undefined;

/** @typedef {?ModeDef} */
var mode = null;

/**
 * Provides info about the current app.
 * @return {!ModeDef}
 */

function getMode() {
  if (mode) {
    return mode;
  }
  return mode = getMode_();
}

/**
 * Set mode in a test. Pass null in afterEach function to reset.
 * @param {?ModeDef} m
 */

function setModeForTesting(m) {
  mode = m;
}

/**
 * Provides info about the current app.
 * @return {!ModeDef}
 */
function getMode_() {
  var isLocalDev = (location.hostname == 'localhost' || location.ancestorOrigins && location.ancestorOrigins[0] && location.ancestorOrigins[0].indexOf('http://localhost:') == 0) &&
  // Filter out localhost running against a prod script.
  // Because all allowed scripts are ours, we know that these can only
  // occur during local dev.
  !!document.querySelector('script[src*="/dist/"],script[src*="/base/"]');

  var overrideDevelopment = _url.parseQueryString(location.hash)['development'];
  var development = overrideDevelopment != undefined ? overrideDevelopment == '1' : !!document.querySelector('script[development]');

  return {
    localDev: isLocalDev,
    // Triggers validation
    development: development,
    minified: process.env.NODE_ENV == 'production',
    test: window.AMP_TEST
  };
}

}).call(this,require('_process'))

},{"./url":20,"_process":5}],14:[function(require,module,exports){
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
 * This type signifies a callback that can be called to remove the listener.
 * @typedef {function()}
 */

var UnlistenDef = function UnlistenDef() {
  babelHelpers.classCallCheck(this, UnlistenDef);
}

/**
 * This class helps to manage observers. Observers can be added, removed or
 * fired through and instance of this class.
 * @template TYPE
 */
;

var Observable = (function () {
  function Observable() {
    babelHelpers.classCallCheck(this, Observable);

    /** @const {!Array<function(TYPE)>} */
    this.handlers_ = [];
  }

  /**
   * Adds the observer to this instance.
   * @param {function(TYPE)} handler Observer's handler.
   * @return {!UnlistenDef}
   */

  Observable.prototype.add = function add(handler) {
    var _this = this;

    this.handlers_.push(handler);
    return function () {
      _this.remove(handler);
    };
  };

  /**
   * Removes the observer from this instance.
   * @param {function(TYPE)} handler Observer's instance.
   */

  Observable.prototype.remove = function remove(handler) {
    for (var i = 0; i < this.handlers_.length; i++) {
      if (handler == this.handlers_[i]) {
        this.handlers_.splice(i, 1);
        break;
      }
    }
  };

  /**
   * Fires an event. All observers are called.
   * @param {TYPE} event
   */

  Observable.prototype.fire = function fire(event) {
    this.handlers_.forEach(function (handler) {
      handler(event);
    });
  };

  /**
   * Returns number of handlers. Mostly needed for tests.
   * @return {number}
   */

  Observable.prototype.getHandlerCount = function getHandlerCount() {
    return this.handlers_.length;
  };

  return Observable;
})();

exports.Observable = Observable;

},{}],15:[function(require,module,exports){
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

},{"./asserts":6}],16:[function(require,module,exports){
exports.__esModule = true;
exports.isProxyOrigin = isProxyOrigin;
exports.getSourceOrigin = getSourceOrigin;
exports.installCidService = installCidService;
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
 * @fileoverview Provides per AMP document source origin and use case
 * persistent client identifiers for use in analytics and similar use
 * cases.
 *
 * For details, see https://goo.gl/Mwaacs
 */

var _asserts = require('../asserts');

var _cookies = require('../cookies');

var _mode = require('../mode');

var _service = require('../service');

var _url = require('../url');

var _timer = require('../timer');

var _viewer = require('../viewer');

var _third_partyClosureLibrarySha384Generated = require('../../third_party/closure-library/sha384-generated');

var ONE_DAY_MILLIS = 24 * 3600 * 1000;

/**
 * We ignore base cids that are older than (roughly) one year.
 */
var BASE_CID_MAX_AGE_MILLIS = 365 * ONE_DAY_MILLIS;

/**
 * A base cid string value and the time it was last read / stored.
 * @typedef {{time: number, cid: string}}
 */
var BaseCidInfoDef = undefined;

var Cid = (function () {
  /** @param {!Window} win */

  function Cid(win) {
    babelHelpers.classCallCheck(this, Cid);

    /** @const */
    this.win = win;

    /** @private @const Instance for testing. */
    this.sha384Base64_ = _third_partyClosureLibrarySha384Generated.sha384Base64;

    /**
     * Cached base cid once read from storage to avoid repeated
     * reads.
     * @private {?string}
     */
    this.baseCid_ = null;
  }

  /**
   * Returns the "external cid". This is a cid for a specific purpose
   * (Say Analytics provider X). It is unique per user, that purpose
   * and the AMP origin site.
   * @param {!Cid} cid
   * @param {string} externalCidScope
   * @param {!Promise} persistenceConsent
   * @return {!Promise<?string>}
   */

  /**
   * @param {string} externalCidScope Name of the fallback cookie for the
   *     case where this doc is not served by an AMP proxy.
   * @param {!Promise} consent Promise for when the user has given consent
   *     (if deemed necessary by the publisher) for use of the client
   *     identifier.
   * @param {!Promise=} opt_persistenceConsent Dedicated promise for when
   *     it is OK to persist a new tracking identifier. This could be
   *     supplied ONLY by the code that supplies the actual consent
   *     cookie.
   *     If this is given, the consent param should be a resolved promise
   *     because this call should be only made in order to get consent.
   *     The consent promise passed to other calls should then itself
   *     depend on the opt_persistenceConsent promise (and the actual
   *     consent, of course).
   *  @return {!Promise<?string>} A client identifier that should be used
   *      within the current source origin and externalCidScope. Might be
   *      null if no identifier was found or could be made.
   *      This promise may take a long time to resolve if consent isn't
   *      given.
   */

  Cid.prototype.get = function get(externalCidScope, consent, opt_persistenceConsent) {
    var _this = this;

    _asserts.assert(/^[a-zA-Z0-9-_]+$/.test(externalCidScope), 'The client id name must only use the characters ' + '[a-zA-Z0-9-_]+\nInstead found: %s', externalCidScope);
    return consent.then(function () {
      return getExternalCid(_this, externalCidScope, opt_persistenceConsent || consent);
    });
  };

  return Cid;
})();

function getExternalCid(cid, externalCidScope, persistenceConsent) {
  var url = _url.parseUrl(cid.win.location.href);
  if (!isProxyOrigin(url)) {
    return Promise.resolve(_cookies.getCookie(cid.win, externalCidScope));
  }
  return getBaseCid(cid, persistenceConsent).then(function (baseCid) {
    return cid.sha384Base64_(baseCid + getSourceOrigin(url) + externalCidScope);
  });
}

/**
 * Returns whether the URL has the origin of a proxy.
 * @param {!Url} url URL of an AMP document.
 * @return {boolean}
 * @visibleForTesting BUT if this is needed elsewhere it could be
 *     factored into its own package.
 */

function isProxyOrigin(url) {
  // List of well known proxy hosts. New proxies must be added here
  // to generate correct tokens.
  return url.origin == 'https://cdn.ampproject.org' || url.origin.indexOf('http://localhost:') == 0;
}

/**
 * Returns the source origin of an AMP document for documents served
 * on a proxy origin. Throws an error if the doc is not on a proxy origin.
 * @param {!Url} url URL of an AMP document.
 * @return {string} The source origin of the URL.
 * @visibleForTesting BUT if this is needed elsewhere it could be
 *     factored into its own package.
 */

function getSourceOrigin(url) {
  _asserts.assert(isProxyOrigin(url), 'Expected proxy origin %s', url.origin);
  // Example path that is being matched here.
  // https://cdn.ampproject.org/c/s/www.origin.com/foo/
  // The /s/ is optional and signals a secure origin.
  var path = url.pathname.split('/');
  var prefix = path[1];
  var mode = _mode.getMode();
  // whitelist while localdev and file is in build/ or examples/
  if (!(mode.localDev && (prefix == 'examples.build' || prefix == 'examples'))) {
    _asserts.assert(prefix == 'c' || prefix == 'v', 'Unknown path prefix in url %s', url.href);
  }
  var domainOrHttpsSignal = path[2];
  var origin = domainOrHttpsSignal == 's' ? 'https://' + path[3] : 'http://' + domainOrHttpsSignal;
  // Sanity test that what we found looks like a domain.
  _asserts.assert(origin.indexOf('.') > 0, 'Expected a . in origin %s', origin);
  return origin;
}

/**
 * Returns the base cid for the current user. This string must not
 * be exposed to users without hashing with the current source origin
 * and the externalCidScope.
 * On a proxy this value is the same for a user across all source
 * origins.
 * @param {!Cid} cid
 * @param {!Promise} persistenceConsent
 * @return {!Promise<string>}
 */
function getBaseCid(cid, persistenceConsent) {
  if (cid.baseCid_) {
    return Promise.resolve(cid.baseCid_);
  }
  var win = cid.win;
  var stored = read(win);
  // See if we have a stored base cid and whether it is still valid
  // in terms of expiration.
  if (stored && !isExpired(stored)) {
    if (shouldUpdateStoredTime(stored)) {
      // Once per interval we mark the cid as used.
      store(win, stored.cid);
    }
    cid.baseCid_ = stored.cid;
    return Promise.resolve(stored.cid);
  }
  // If we are being embedded, try to get the base cid from the viewer.
  // Note, that we never try to persist to localStorage in this case.
  var viewer = _viewer.viewerFor(win);
  if (viewer.isEmbedded()) {
    return viewer.getBaseCid();
  }

  // We need to make a new one.
  var seed = getEntropy(win);
  var newVal = cid.sha384Base64_(seed);
  // Storing the value may require consent. We wait for the respective
  // promise.
  persistenceConsent.then(function () {
    // The initial CID generation is inherently racy. First one that gets
    // consent wins.
    var relookup = read(win);
    if (!relookup) {
      store(win, newVal);
    }
  });
  return Promise.resolve(newVal);
}

/**
 * Stores a new cidString in localStorage. Adds the current time to the
 * stored value.
 * @param {!Window} win
 * @param {string} cidString Actual cid string to store.
 */
function store(win, cidString) {
  var item = {};
  item['time'] = _timer.timer.now();
  item['cid'] = cidString;
  var data = JSON.stringify(item);
  try {
    win.localStorage.setItem('amp-cid', data);
  } catch (ignore) {
    // Setting localStorage may fail. In practice we don't expect that to
    // happen a lot (since we don't go anywhere near the quote, but
    // in particular in Safari private browsing mode it always fails.
    // In that case we just don't store anything, which is just fine.
  }
}

/**
 * Retrieves a stored cid item from localStorage. Returns undefined if
 * none was found
 * @param {!Window} win
 * @return {!BaseCidInfoDef|undefined}
 */
function read(win) {
  var val = undefined;
  try {
    val = win.localStorage.getItem('amp-cid');
  } catch (ignore) {
    // If reading from localStorage fails, we assume it is empty.
  }
  if (!val) {
    return undefined;
  }
  var item = JSON.parse(val);
  return {
    time: item['time'],
    cid: item['cid']
  };
}

/**
 * Whether the retrieved cid object is expired and should be ignored.
 * @param {!BaseCidInfoDef} storedCidInfo
 * @return {boolean}
 */
function isExpired(storedCidInfo) {
  var createdTime = storedCidInfo.time;
  var now = _timer.timer.now();
  return createdTime + BASE_CID_MAX_AGE_MILLIS < now;
}

/**
 * Whether we should write a new timestamp to the stored cid value.
 * We say yes if it is older than 1 day, so we only do this max once
 * per day to avoid writing to localStorage all the time.
 * @param {!BaseCidInfoDef} storedCidInfo
 * @return {boolean}
 */
function shouldUpdateStoredTime(storedCidInfo) {
  var createdTime = storedCidInfo.time;
  var now = _timer.timer.now();
  return createdTime + ONE_DAY_MILLIS < now;
}

/**
 * Returns an array with a total of 128 of random values based on the
 * `win.crypto.getRandomValues` API. If that is not available concatenates
 * a string of other values that might be hard to guess including
 * `Math.random` and the current time.
 * @param {!Window} win
 * @return {!Array<number>|string} Entropy.
 */
function getEntropy(win) {
  // Widely available in browsers we support:
  // http://caniuse.com/#search=getRandomValues
  if (win.crypto && win.crypto.getRandomValues) {
    var uint8array = new Uint8Array(16); // 128 bit
    win.crypto.getRandomValues(uint8array);
    // While closure's Hash interface would except a Uint8Array
    // sha384 does not in practice, so we copy the values into
    // a plain old array.
    var array = new Array(16);
    for (var i = 0; i < uint8array.length; i++) {
      array[i] = uint8array[i];
    }
    return array;
  }
  // Support for legacy browsers.
  return String(win.location.href + _timer.timer.now() + win.Math.random() + win.screen.width + win.screen.height);
}

/**
 * @param {!Window} window
 * @return {!Cid}
 */

function installCidService(window) {
  return _service.getService(window, 'cid', function () {
    return new Cid(window);
  });
}

;

},{"../../third_party/closure-library/sha384-generated":26,"../asserts":6,"../cookies":8,"../mode":13,"../service":15,"../timer":18,"../url":20,"../viewer":22}],17:[function(require,module,exports){
exports.__esModule = true;
exports.dashToCamelCase = dashToCamelCase;
exports.expandTemplate = expandTemplate;
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
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes removed and character after to upper case.
 * visibleForTesting
 */

function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, function (_all, character) {
    return character.toUpperCase();
  });
}

/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {!function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=1} optMaxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */

function expandTemplate(template, getter, opt_maxIterations) {
  var maxIterations = opt_maxIterations || 1;

  var _loop = function (i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });
    if (!matches) {
      return "break";
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }
  return template;
}

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
exports.__esModule = true;
exports.urlReplacementsFor = urlReplacementsFor;
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

var _cid = require('./cid');

var _documentInfo = require('./document-info');

var _service = require('./service');

var _userNotification = require('./user-notification');

var _log = require('./log');

var _url = require('./url');

var _viewport = require('./viewport');

var _vsync = require('./vsync');

/** @private {string} */
var TAG_ = 'UrlReplacements';

/**
 * This class replaces substitution variables with their values.
 */

var UrlReplacements = (function () {
  /** @param {!Window} win */

  function UrlReplacements(win) {
    var _this = this;

    babelHelpers.classCallCheck(this, UrlReplacements);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private {!RegExp|undefined} */
    this.replacementExpr_;

    /** @private @const {!Object<string, function(*):*>} */
    this.replacements_ = this.win_.Object.create(null);

    // Returns a random value for cache busters.
    this.set_('RANDOM', function () {
      return Math.random();
    });

    // Returns the canonical URL for this AMP document.
    this.set_('CANONICAL_URL', function () {
      return _documentInfo.documentInfoFor(_this.win_).canonicalUrl;
    });

    // Returns the host of the canonical URL for this AMP document.
    this.set_('CANONICAL_HOST', function () {
      var url = _url.parseUrl(_documentInfo.documentInfoFor(_this.win_).canonicalUrl);
      return url && url.hostname;
    });

    // Returns the path of the canonical URL for this AMP document.
    this.set_('CANONICAL_PATH', function () {
      var url = _url.parseUrl(_documentInfo.documentInfoFor(_this.win_).canonicalUrl);
      return url && url.pathname;
    });

    // Returns the referrer URL.
    this.set_('DOCUMENT_REFERRER', function () {
      return _this.win_.document.referrer;
    });

    // Returns the title of this AMP document.
    this.set_('TITLE', function () {
      return _this.win_.document.title;
    });

    // Returns the URL for this AMP document.
    this.set_('AMPDOC_URL', function () {
      return _url.removeFragment(_this.win_.location.href);
    });

    // Returns the host of the URL for this AMP document.
    this.set_('AMPDOC_HOST', function () {
      var url = _url.parseUrl(_this.win_.location.href);
      return url && url.hostname;
    });

    // Returns a random string that will be the constant for the duration of
    // single page view. It should have sufficient entropy to be unique for
    // all the page views a single user is making at a time.
    this.set_('PAGE_VIEW_ID', function () {
      return _documentInfo.documentInfoFor(_this.win_).pageViewId;
    });

    this.set_('CLIENT_ID', function (opt_name, opt_userNotificationId) {
      var consent = Promise.resolve();

      // If no `opt_userNotificationId` argument is provided then
      // assume consent is given by default.
      if (opt_userNotificationId) {
        consent = _userNotification.userNotificationManagerFor(_this.win_).then(function (service) {
          return service.get(opt_userNotificationId);
        });
      }

      return _cid.cidFor(_this.win_).then(function (cid) {
        return cid.get(opt_name, consent);
      });
    });

    // Returns the number of milliseconds since 1 Jan 1970 00:00:00 UTC.
    this.set_('TIMESTAMP', function () {
      return new Date().getTime();
    });

    // Returns the user's time-zone offset from UTC, in minutes.
    this.set_('TIMEZONE', function () {
      return new Date().getTimezoneOffset();
    });

    // Returns a promise resolving to viewport.getScrollTop.
    this.set_('SCROLL_TOP', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollTop();
      });
    });

    // Returns a promise resolving to viewport.getScrollLeft.
    this.set_('SCROLL_LEFT', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollLeft();
      });
    });

    // Returns a promise resolving to viewport.getScrollHeight.
    this.set_('SCROLL_HEIGHT', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollHeight();
      });
    });

    // Returns screen.width.
    this.set_('SCREEN_WIDTH', function () {
      return _this.win_.screen.width;
    });

    // Returns screen.height.
    this.set_('SCREEN_HEIGHT', function () {
      return _this.win_.screen.height;
    });
  }

  /**
   * @param {!Window} window
   * @return {!UrlReplacements}
   */

  /**
   * Sets the value resolver for the variable with the specified name. The
   * value resolver may optionally take an extra parameter.
   * @param {string} varName
   * @param {function(*):*} resolver
   * @return {!UrlReplacements}
   * @private
   */

  UrlReplacements.prototype.set_ = function set_(varName, resolver) {
    this.replacements_[varName] = resolver;
    this.replacementExpr_ = undefined;
    return this;
  };

  /**
   * Expands the provided URL by replacing all known variables with their
   * resolved values. Optional `opt_bindings` can be used to add new variables
   * or override existing ones.
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<string>}
   */

  UrlReplacements.prototype.expand = function expand(url, opt_bindings) {
    var _this2 = this;

    var expr = this.getExpr_(opt_bindings);
    var replacementPromise = undefined;
    var encodeValue = function (val) {
      // Value 0 is specialcased because the numeric 0 is a valid substitution
      // value.
      if (!val && val !== 0) {
        val = '';
      }
      return encodeURIComponent(val);
    };
    url = url.replace(expr, function (match, name, opt_strargs) {
      var args = [];
      if (typeof opt_strargs == 'string') {
        args = opt_strargs.split(',');
      }
      var val = args.length == 0 && opt_bindings && name in opt_bindings ? opt_bindings[name] : _this2.replacements_[name].apply(_this2.replacements_, args);
      // In case the produced value is a promise, we don't actually
      // replace anything here, but do it again when the promise resolves.
      if (val && val.then) {
        var _ret = (function () {
          var p = val.then(function (v) {
            url = url.replace(match, encodeValue(v));
          }, function (err) {
            _log.log.error(TAG_, 'Failed to expand: ' + name, err);
          });
          if (replacementPromise) {
            replacementPromise = replacementPromise.then(function () {
              return p;
            });
          } else {
            replacementPromise = p;
          }
          return {
            v: match
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
      return encodeValue(val);
    });

    if (replacementPromise) {
      replacementPromise = replacementPromise.then(function () {
        return url;
      });
    }

    return replacementPromise || Promise.resolve(url);
  };

  /**
   * @param {!Object<string, *>=} opt_bindings
   * @return {!RegExp}
   * @private
   */

  UrlReplacements.prototype.getExpr_ = function getExpr_(opt_bindings) {
    var _this3 = this;

    var additionalKeys = opt_bindings ? Object.keys(opt_bindings) : null;
    if (additionalKeys && additionalKeys.length > 0) {
      var _ret2 = (function () {
        var allKeys = Object.keys(_this3.replacements_);
        additionalKeys.forEach(function (key) {
          if (allKeys[key] === undefined) {
            allKeys.push(key);
          }
        });
        return {
          v: _this3.buildExpr_(allKeys)
        };
      })();

      if (typeof _ret2 === 'object') return _ret2.v;
    }
    if (!this.replacementExpr_) {
      this.replacementExpr_ = this.buildExpr_(Object.keys(this.replacements_));
    }
    return this.replacementExpr_;
  };

  /**
   * @param {!Array<string>} keys
   * @return {!RegExp}
   * @private
   */

  UrlReplacements.prototype.buildExpr_ = function buildExpr_(keys) {
    var all = keys.join('|');
    // Match the given replacement patterns, as well as optionally
    // arguments to the replacement behind it in parantheses.
    // Example string that match
    // FOO_BAR
    // FOO_BAR(arg1)
    // FOO_BAR(arg1,arg2)
    return new RegExp('\\$?(' + all + ')(?:\\(([0-9a-zA-Z-_,]+)\\))?', 'g');
  };

  return UrlReplacements;
})();

function urlReplacementsFor(window) {
  return _service.getService(window, 'url-replace', function () {
    return new UrlReplacements(window);
  });
}

;

},{"./cid":7,"./document-info":9,"./log":12,"./service":15,"./url":20,"./user-notification":21,"./viewport":23,"./vsync":24}],20:[function(require,module,exports){
exports.__esModule = true;
exports.parseUrl = parseUrl;
exports.assertHttpsUrl = assertHttpsUrl;
exports.parseQueryString = parseQueryString;
exports.getOrigin = getOrigin;
exports.removeFragment = removeFragment;
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
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * @param {string} url
 * @return {!Location}
 */

function parseUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  var info = {
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash
  };
  // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.
  info.origin = a.origin && a.origin != 'null' ? a.origin : getOrigin(info);
  _asserts.assert(info.origin, 'Origin must exist');
  return info;
}

/**
 * Asserts that a given url is HTTPS or protocol relative.
 * Provides an exception for localhost.
 * @param {string} urlString
 * @param {!Element} elementContext Element where the url was found.
 * @return {string}
 */

function assertHttpsUrl(urlString, elementContext) {
  var url = parseUrl(urlString);
  _asserts.assert(url.protocol == 'https:' || /^(\/\/)/.test(urlString) || url.hostname == 'localhost' || url.hostname.lastIndexOf('.localhost') ==
  // Poor person's endsWith
  url.hostname.length - '.localhost'.length, '%s source must start with ' + '"https://" or "//" or be relative and served from ' + 'either https or from localhost. Invalid value: %s', elementContext, urlString);
  return urlString;
}

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 * @param {string} queryString
 * @return {!Object<string, string>}
 */

function parseQueryString(queryString) {
  var params = Object.create(null);
  if (!queryString) {
    return params;
  }
  if (queryString.indexOf('?') == 0 || queryString.indexOf('#') == 0) {
    queryString = queryString.substr(1);
  }
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eqIndex = pair.indexOf('=');
    var _name = undefined;
    var value = undefined;
    if (eqIndex != -1) {
      _name = decodeURIComponent(pair.substring(0, eqIndex)).trim();
      value = decodeURIComponent(pair.substring(eqIndex + 1)).trim();
    } else {
      _name = decodeURIComponent(pair).trim();
      value = '';
    }
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Don't use this directly, only exported for testing. The value
 * is available via the origin property of the object returned by
 * parseUrl.
 * @param {!Location} info
 * @return {string}
 * @visibleForTesting
 */

function getOrigin(info) {
  if (info.protocol == 'data:' || !info.host) {
    return info.href;
  }
  return info.protocol + '//' + info.host;
}

/**
 * Returns the URL without fragment. If URL doesn't contain fragment, the same
 * string is returned.
 * @param {string} url
 * @return {string}
 */

function removeFragment(url) {
  var index = url.indexOf('#');
  if (index == -1) {
    return url;
  }
  return url.substring(0, index);
}

},{"./asserts":6}],21:[function(require,module,exports){
exports.__esModule = true;
exports.userNotificationManagerFor = userNotificationManagerFor;
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
 * @fileoverview Factory for amp-user-notification
 */

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!Promise<!UserNotification>}
 */

function userNotificationManagerFor(window) {
  return _service.getElementService(window, 'userNotificationManager', 'amp-user-notification');
}

},{"./service":15}],22:[function(require,module,exports){
exports.__esModule = true;
exports.viewerFor = viewerFor;
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
 * @return {!Viewer}
 */

function viewerFor(window) {
  return _service.getService(window, 'viewer');
}

;

},{"./service":15}],23:[function(require,module,exports){
exports.__esModule = true;
exports.viewportFor = viewportFor;
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
 * @return {!Viewport}
 */

function viewportFor(window) {
  return _service.getService(window, 'viewport');
}

;

},{"./service":15}],24:[function(require,module,exports){
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

},{"./service":15}],25:[function(require,module,exports){
exports.__esModule = true;
exports.normalizeMethod_ = normalizeMethod_;
exports.fetchPolyfill = fetchPolyfill;
exports.xhrFor = xhrFor;
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

var _service = require('./service');

/**
 * The "init" argument of the Fetch API. Currently, only "credentials: include"
 * is implemented.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * @typedef {{
 *   body: (!Object|!Array|undefined),
 *   credentials: (string|undefined),
 *   headers: (!Object|undefined),
 *   method: (string|undefined)
 * }}
 */
var FetchInitDef = undefined;

/** @private @const {!Array<string>} */
var allowedMethods_ = ['GET', 'POST'];

/** @private @const {!Array<string>} */
var allowedBodyTypes_ = ['[object Object]', '[object Array]'];

/**
 * A service that polyfills Fetch API for use within AMP.
 */

var Xhr = (function () {

  /**
   * @param {!Window} win
   */

  function Xhr(win) {
    babelHelpers.classCallCheck(this, Xhr);

    /**
     * We want to call `fetch_` unbound from any context since it could
     * be either the native fetch or our polyfill.
     * @private @const {function(string, ?FetchInitDef=):!Promise<!FetchResponse>}
     */
    this.fetch_ = (win.fetch || fetchPolyfill).bind(null);
  }

  /**
   * Normalized method name by uppercasing.
   * @param {string|undefined} method
   * @return {string}
   * @private
   */

  /**
   * Fetches and constructs JSON object based on the fetch polyfill.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
   *
   * @param {string} input
   * @param {?FetchInitDef=} opt_init
   * @return {!Promise<!JSONValue>}
   */

  Xhr.prototype.fetchJson = function fetchJson(input, opt_init) {
    var init = opt_init || {};
    init.method = normalizeMethod_(init.method);
    setupJson_(init);

    return this.fetch_(input, init).then(function (response) {
      return assertSuccess(response).json();
    });
  };

  /**
   * Sends the request, awaits result and confirms that it was successful.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
   *
   * @param {string} input
   * @param {?FetchInitDef=} opt_init
   * @return {!Promise}
   */

  Xhr.prototype.sendSignal = function sendSignal(input, opt_init) {
    return this.fetch_(input, opt_init).then(function (response) {
      assertSuccess(response);
    });
  };

  return Xhr;
})();

function normalizeMethod_(method) {
  if (method === undefined) {
    return 'GET';
  }
  return method.toUpperCase();
}

/**
* Initialize init object with headers and stringifies the body.
 * @param {!FetchInitDef} init
 * @private
 */
function setupJson_(init) {
  _asserts.assert(allowedMethods_.indexOf(init.method) != -1, 'Only one of ' + allowedMethods_.join(', ') + ' is currently allowed. Got %s', init.method);

  init.headers = {
    'Accept': 'application/json'
  };

  if (init.method == 'POST') {
    var bodyType = Object.prototype.toString.call(init.body);

    // Assume JSON strict mode where only objects or arrays are allowed
    // as body.
    _asserts.assert(allowedBodyTypes_.indexOf(bodyType) > -1, 'body must be of type object or array. %s', init.body);

    init.headers['Content-Type'] = 'application/json;charset=utf-8';
    init.body = JSON.stringify(init.body);
  }
}

/**
 * A minimal polyfill of Fetch API. It only polyfills what we currently use.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * Notice that the "fetch" method itself is not exported as that would require
 * us to immediately support a much wide API.
 *
 * @param {string} input
 * @param {!FetchInitDef=} opt_init
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */

function fetchPolyfill(input, opt_init) {
  _asserts.assert(typeof input == 'string', 'Only URL supported: %s', input);
  var init = opt_init || {};
  _asserts.assert(!init.credentials || init.credentials == 'include', 'Only credentials=include support: %s', init.credentials);

  return new Promise(function (resolve, reject) {
    var xhr = createXhrRequest(init.method || 'GET', input, init);

    if (init.credentials == 'include') {
      xhr.withCredentials = true;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState < /* STATUS_RECEIVED */2) {
        return;
      }
      if (xhr.status < 100 || xhr.status > 599) {
        xhr.onreadystatechange = null;
        reject(new Error('Unknown HTTP status ' + xhr.status));
        return;
      }

      // TODO(dvoytenko): This is currently simplified: we will wait for the
      // whole document loading to complete. This is fine for the use cases
      // we have now, but may need to be reimplemented later.
      if (xhr.readyState == /* COMPLETE */4) {
        resolve(new FetchResponse(xhr));
      }
    };
    xhr.onerror = function () {
      reject(new Error('Network failure'));
    };
    xhr.onabort = function () {
      reject(new Error('Request aborted'));
    };

    if (init.method == 'POST') {
      xhr.send(init.body);
    } else {
      xhr.send();
    }
  });
}

/**
 * @param {string} method
 * @param {string} url
 * @param {!FetchInitDef} init
 * @return {!XMLHttpRequest}
 * @private
 */
function createXhrRequest(method, url, init) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != 'undefined') {
    // IE-specific object.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    throw new Error('CORS is not supported');
  }

  if (init.headers) {
    Object.keys(init.headers).forEach(function (header) {
      xhr.setRequestHeader(header, init.headers[header]);
    });
  }
  return xhr;
}

/**
 * Returns the response if successful or otherwise throws an error.
 * @paran {!FetchResponse} response
 * @return {!FetchResponse}
 */
function assertSuccess(response) {
  if (response.status < 200 || response.status > 299) {
    throw new Error('HTTP error ' + response.status);
  }
  return response;
}

/**
 * Response object in the Fetch API.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 */

var FetchResponse = (function () {
  /**
   * @param {!XMLHttpRequest} xhr
   */

  function FetchResponse(xhr) {
    babelHelpers.classCallCheck(this, FetchResponse);

    /** @private @const {!XMLHttpRequest} */
    this.xhr_ = xhr;

    /** @type {number} */
    this.status = this.xhr_.status;

    /** @type {boolean} */
    this.bodyUsed = false;
  }

  /**
   * @param {!Window} window
   * @return {!Xhr}
   */

  /**
   * Drains the response and returns the text.
   * @return {!Promise<string>}
   * @private
   */

  FetchResponse.prototype.drainText_ = function drainText_() {
    _asserts.assert(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    return Promise.resolve(this.xhr_.responseText);
  };

  /**
   * Drains the response and returns the JSON object.
   * @return {!Promise<!JSONValue>}
   */

  FetchResponse.prototype.json = function json() {
    return this.drainText_().then(JSON.parse);
  };

  return FetchResponse;
})();

function xhrFor(window) {
  return _service.getService(window, 'xhr', function () {
    return new Xhr(window);
  });
}

;

},{"./asserts":6,"./service":15}],26:[function(require,module,exports){
exports.__esModule = true;
exports.sha384Base64 = sha384Base64;
/* Generated from closure library commit f9232862c8905995ed7ee8949a405cd77d8e16e2 */var m = this;
function aa(a) {
  var b = typeof a;if ("object" == b) if (a) {
    if (a instanceof Array) return "array";if (a instanceof Object) return b;var c = Object.prototype.toString.call(a);if ("[object Window]" == c) return "object";if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function";
  } else return "null";else if ("function" == b && "undefined" == typeof a.call) return "object";return b;
}function q(a, b) {
  function c() {}c.prototype = b.prototype;a.v = b.prototype;a.prototype = new c();a.prototype.constructor = a;a.u = function (a, c, f) {
    for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];return b.prototype[c].apply(a, g);
  };
};function ba() {
  this.g = -1;
};function r(a, b) {
  this.b = a | 0;this.a = b | 0;
}var ca = {},
    t = {};function u(a) {
  if (-128 <= a && 128 > a) {
    var b = ca[a];if (b) return b;
  }b = new r(a | 0, 0 > a ? -1 : 0);-128 <= a && 128 > a && (ca[a] = b);return b;
}function w(a) {
  isNaN(a) || !isFinite(a) ? a = y() : a <= -da ? a = z() : a + 1 >= da ? (t[A] || (t[A] = new r(-1, 2147483647)), a = t[A]) : a = 0 > a ? B(w(-a)) : new r(a % C | 0, a / C | 0);return a;
}var C = 4294967296,
    da = C * C / 2;function y() {
  t[D] || (t[D] = u(0));return t[D];
}function E() {
  t[F] || (t[F] = u(1));return t[F];
}function ea() {
  t[G] || (t[G] = u(-1));return t[G];
}
function z() {
  t[H] || (t[H] = new r(0, -2147483648));return t[H];
}r.prototype.toString = function (a) {
  a = a || 10;if (2 > a || 36 < a) throw Error("radix out of range: " + a);if (I(this)) return "0";if (0 > this.a) {
    if (J(this, z())) {
      var b = w(a),
          c = K(this, b),
          b = L(M(c, b), this);return c.toString(a) + b.b.toString(a);
    }return "-" + B(this).toString(a);
  }for (var c = w(Math.pow(a, 6)), b = this, d = "";;) {
    var e = K(b, c),
        f = (L(b, M(e, c)).b >>> 0).toString(a),
        b = e;if (I(b)) return f + d;for (; 6 > f.length;) f = "0" + f;d = "" + f + d;
  }
};function N(a) {
  return 0 <= a.b ? a.b : C + a.b;
}
function I(a) {
  return 0 == a.a && 0 == a.b;
}function J(a, b) {
  return a.a == b.a && a.b == b.b;
}function fa(a) {
  t[O] || (t[O] = u(16777216));return 0 > P(a, t[O]);
}function P(a, b) {
  if (J(a, b)) return 0;var c = 0 > a.a,
      d = 0 > b.a;return c && !d ? -1 : !c && d ? 1 : 0 > L(a, b).a ? -1 : 1;
}function B(a) {
  return J(a, z()) ? z() : Q(new r(~a.b, ~a.a), E());
}
function Q(a, b) {
  var c = a.a >>> 16,
      d = a.a & 65535,
      e = a.b >>> 16,
      f = b.a >>> 16,
      g = b.a & 65535,
      h = b.b >>> 16,
      n,
      p;p = 0 + ((a.b & 65535) + (b.b & 65535));n = 0 + (p >>> 16);n += e + h;e = 0 + (n >>> 16);e += d + g;d = 0 + (e >>> 16);d = d + (c + f) & 65535;return new r((n & 65535) << 16 | p & 65535, d << 16 | e & 65535);
}function L(a, b) {
  return Q(a, B(b));
}
function M(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var a = _x,
        b = _x2;
    c = d = e = f = g = h = n = p = v = l = k = x = undefined;
    _again = false;
    if (I(a) || I(b)) return y();if (J(a, z())) return 1 == (b.b & 1) ? z() : y();if (J(b, z())) return 1 == (a.b & 1) ? z() : y();if (0 > a.a) {
      if (0 > b.a) {
        _x = B(a);
        _x2 = B(b);
        _again = true;
        continue _function;
      } else {
        return B(M(B(a), b));
      }
    }if (0 > b.a) return B(M(a, B(b)));if (fa(a) && fa(b)) return w((a.a * C + N(a)) * (b.a * C + N(b)));var c = a.a >>> 16,
        d = a.a & 65535,
        e = a.b >>> 16,
        f = a.b & 65535,
        g = b.a >>> 16,
        h = b.a & 65535,
        n = b.b >>> 16,
        p = b.b & 65535,
        v,
        l,
        k,
        x;x = 0 + f * p;k = 0 + (x >>> 16);k += e * p;l = 0 + (k >>> 16);k = (k & 65535) + f * n;l += k >>> 16;k &= 65535;l += d * p;v = 0 + (l >>> 16);l = (l & 65535) + e * n;v += l >>> 16;l &= 65535;l += f * h;v += l >>> 16;l &= 65535;v = v + (c * p + d * n + e * h + f * g) & 65535;return new r(k << 16 | x & 65535, v << 16 | l);
  }
}
function K(_x3, _x4) {
  var _again2 = true;

  _function2: while (_again2) {
    var a = _x3,
        b = _x4;
    c = d = e = f = f = g = h = undefined;
    _again2 = false;
    if (I(b)) throw Error("division by zero");if (I(a)) return y();if (J(a, z())) {
      if (J(b, E()) || J(b, ea())) return z();if (J(b, z())) return E();var c;c = 1;if (0 == c) c = a;else {
        var d = a.a;c = 32 > c ? new r(a.b >>> c | d << 32 - c, d >> c) : new r(d >> c - 32, 0 <= d ? 0 : -1);
      }c = K(c, b);d = 1;if (0 != d) {
        var e = c.b;c = 32 > d ? new r(e << d, c.a << d | e >>> 32 - d) : new r(0, e << d - 32);
      }if (J(c, y())) return 0 > b.a ? E() : ea();d = L(a, M(b, c));return Q(c, K(d, b));
    }if (J(b, z())) return y();if (0 > a.a) {
      if (0 > b.a) {
        _x3 = B(a);
        _x4 = B(b);
        _again2 = true;
        continue _function2;
      } else {
        return B(K(B(a), b));
      }
    }if (0 > b.a) return B(K(a, B(b)));e = y();for (d = a; 0 <= P(d, b);) {
      c = Math.max(1, Math.floor((d.a * C + N(d)) / (b.a * C + N(b))));for (var f = Math.ceil(Math.log(c) / Math.LN2), f = 48 >= f ? 1 : Math.pow(2, f - 48), g = w(c), h = M(g, b); 0 > h.a || 0 < P(h, d);) c -= f, g = w(c), h = M(g, b);I(g) && (g = E());e = Q(e, g);d = L(d, h);
    }return e;
  }
}var A = 1,
    H = 2,
    D = 3,
    F = 4,
    G = 5,
    O = 6;var R = null,
    S = null;function T(a, b) {
  this.g = -1;this.g = 128;this.h = void 0 !== m.Uint8Array ? new Uint8Array(128) : Array(128);this.j = this.f = 0;this.c = [];this.l = a;this.s = [];this.o = ga(b);this.i = !1;this.j = this.f = 0;var c;c = this.o;var d = c.length;if (0 < d) {
    for (var e = Array(d), f = 0; f < d; f++) e[f] = c[f];c = e;
  } else c = [];this.c = c;this.i = !1;
}q(T, ba);for (var ja = [], U = 0; 127 > U; U++) ja[U] = 0;var ka = (function (a) {
  return Array.prototype.concat.apply(Array.prototype, arguments);
})([128], ja);
function V(a, b, c) {
  c = void 0 !== c ? c : b.length;if (a.i) throw Error("this hasher needs to be reset");var d = a.f;if ("string" == typeof b) for (var e = 0; e < c; e++) {
    var f = b.charCodeAt(e);if (255 < f) throw Error("Characters must be in range [0,255]");a.h[d++] = f;d == a.g && (W(a), d = 0);
  } else if ("array" == aa(b)) for (e = 0; e < c; e++) {
    f = b[e];if ("number" != typeof f || 0 > f || 255 < f || f != (f | 0)) throw Error("message must be a byte array");a.h[d++] = f;d == a.g && (W(a), d = 0);
  } else throw Error("message must be string or array");a.f = d;a.j += c;
}
function W(a) {
  for (var b = a.h, c = a.s, d = 0; 16 > d; d++) {
    var e = 8 * d;c[d] = new r(b[e + 4] << 24 | b[e + 5] << 16 | b[e + 6] << 8 | b[e + 7], b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3]);
  }for (d = 16; 80 > d; d++) {
    var e = c[d - 15],
        b = e.b,
        e = e.a,
        f = c[d - 2],
        g = f.b,
        f = f.a;c[d] = a.m(c[d - 16], c[d - 7], new r(b >>> 1 ^ e << 31 ^ b >>> 8 ^ e << 24 ^ b >>> 7 ^ e << 25, e >>> 1 ^ b << 31 ^ e >>> 8 ^ b << 24 ^ e >>> 7), new r(g >>> 19 ^ f << 13 ^ f >>> 29 ^ g << 3 ^ g >>> 6 ^ f << 26, f >>> 19 ^ g << 13 ^ g >>> 29 ^ f << 3 ^ f >>> 6));
  }for (var b = a.c[0], e = a.c[1], g = a.c[2], f = a.c[3], h = a.c[4], n = a.c[5], p = a.c[6], v = a.c[7], d = 0; 80 > d; d++) var l = b.b, k = b.a, l = Q(new r(l >>> 28 ^ k << 4 ^ k >>> 2 ^ l << 30 ^ k >>> 7 ^ l << 25, k >>> 28 ^ l << 4 ^ l >>> 2 ^ k << 30 ^ l >>> 7 ^ k << 25), new r(b.b & e.b | e.b & g.b | b.b & g.b, b.a & e.a | e.a & g.a | b.a & g.a)), k = h.b, x = h.a, ha = h.b, ia = h.a, k = a.m(v, new r(k >>> 14 ^ x << 18 ^ k >>> 18 ^ x << 14 ^ x >>> 9 ^ k << 23, x >>> 14 ^ k << 18 ^ x >>> 18 ^ k << 14 ^ k >>> 9 ^ x << 23), new r(ha & n.b | ~ha & p.b, ia & n.a | ~ia & p.a), la[d], c[d]), v = p, p = n, n = h, h = Q(f, k), f = g, g = e, e = b, b = Q(k, l);a.c[0] = Q(a.c[0], b);a.c[1] = Q(a.c[1], e);a.c[2] = Q(a.c[2], g);a.c[3] = Q(a.c[3], f);a.c[4] = Q(a.c[4], h);a.c[5] = Q(a.c[5], n);a.c[6] = Q(a.c[6], p);a.c[7] = Q(a.c[7], v);
}
T.prototype.m = function (a, b, c) {
  for (var d = (a.b ^ 2147483648) + (b.b ^ 2147483648), e = a.a + b.a, f = arguments.length - 1; 2 <= f; --f) d += arguments[f].b ^ 2147483648, e += arguments[f].a;arguments.length & 1 && (d += 2147483648);e += arguments.length >> 1;e += Math.floor(d / 4294967296);return new r(d, e);
};function ga(a) {
  for (var b = [], c = 0; c < a.length; c += 2) b.push(new r(a[c + 1], a[c]));return b;
}
var la = ga([1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591]);function ma() {
  T.call(this, 6, na);
}q(ma, T);var na = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];function oa(a) {
  var b = new ma();V(b, a);if (b.i) throw Error("this hasher needs to be reset");a = 8 * b.j;112 > b.f ? V(b, ka, 112 - b.f) : V(b, ka, b.g - b.f + 112);for (var c = 127; 112 <= c; c--) b.h[c] = a & 255, a /= 256;W(b);var d = 0;a = Array(8 * b.l);for (c = 0; c < b.l; c++) {
    for (var e = b.c[c], f = e.a, e = e.b, g = 24; 0 <= g; g -= 8) a[d++] = f >> g & 255;for (g = 24; 0 <= g; g -= 8) a[d++] = e >> g & 255;
  }b.i = !0;if (!R) for (R = {}, S = {}, b = 0; 65 > b; b++) R[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b), S[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(b);
  b = S;c = [];for (d = 0; d < a.length; d += 3) {
    var h = a[d],
        n = (f = d + 1 < a.length) ? a[d + 1] : 0,
        p = (e = d + 2 < a.length) ? a[d + 2] : 0,
        g = h >> 2,
        h = (h & 3) << 4 | n >> 4,
        n = (n & 15) << 2 | p >> 6,
        p = p & 63;e || (p = 64, f || (n = 64));c.push(b[g], b[h], b[n], b[p]);
  }return c.join("");
}var X = ["ampSha384"],
    Y = window || m;X[0] in Y || !Y.execScript || Y.execScript("var " + X[0]);for (var Z; X.length && (Z = X.shift());) X.length || void 0 === oa ? Y[Z] ? Y = Y[Z] : Y = Y[Z] = {} : Y[Z] = oa;;
function sha384Base64(input) {
  return ampSha384(input);
}

},{}]},{},[1])


});
//# sourceMappingURL=amp-analytics-0.1.max.js.map