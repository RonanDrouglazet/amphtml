(window.AMP = window.AMP || []).push(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
exports.evaluateAccessExpr = evaluateAccessExpr;
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
 * Evaluates access expression.
 * @param {string} expr
 * @param {!JSONObjectDef} data
 * @return {boolean}
 */

function evaluateAccessExpr(expr, data) {
  // TODO(dvoytenko): the complete expression semantics
  if (expr == 'access') {
    return !!data.access;
  }
  if (expr == 'NOT access') {
    return !data.access;
  }
  return false;
}

},{}],2:[function(require,module,exports){
exports.__esModule = true;
exports.installAccessService = installAccessService;
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

var _srcAction = require('../../../src/action');

var _srcUrl = require('../../../src/url');

var _srcCid = require('../../../src/cid');

var _srcDocumentState = require('../../../src/document-state');

var _accessExpr = require('./access-expr');

var _srcService = require('../../../src/service');

var _srcStyles = require('../../../src/styles');

var _srcExperiments = require('../../../src/experiments');

var _srcEventHelper = require('../../../src/event-helper');

var _srcLog = require('../../../src/log');

var _srcTimer = require('../../../src/timer');

var _srcUrlReplacements = require('../../../src/url-replacements');

var _srcViewer = require('../../../src/viewer');

var _srcViewport = require('../../../src/viewport');

var _srcVsync = require('../../../src/vsync');

var _srcXhr = require('../../../src/xhr');

/**
 * The configuration properties are:
 * - authorization: The URL of the Authorization endpoint.
 * - pingback: The URL of the Pingback endpoint.
 * - login: The URL of the Login Page.
 *
 * @typedef {{
 *   authorization: string,
 *   pingback: string,
 *   login: string
 * }}
 */
var AccessConfigDef = undefined;

/** @const {!Function} */
var assert = AMP.assert;

/** @const */
var EXPERIMENT = 'amp-access';

/** @const */
var TAG = 'AmpAccess';

/** @const {number} */
var VIEW_TIMEOUT = 2000;

/**
 * AccessService implements the complete lifecycle of the AMP Access system.
 */

var AccessService = (function () {
  /**
   * @param {!Window} win
   */

  function AccessService(win) {
    babelHelpers.classCallCheck(this, AccessService);

    /** @const {!Window} */
    this.win = win;
    _srcStyles.installStyles(this.win.document, "\n/*# sourceURL=/extensions/amp-access/0.1/amp-access.css*/", function () {});

    /** @const @private {boolean} */
    this.isExperimentOn_ = _srcExperiments.isExperimentOn(this.win, EXPERIMENT);

    var accessElement = document.getElementById('amp-access');

    /** @const @private {boolean} */
    this.enabled_ = !!accessElement;
    if (!this.enabled_) {
      return;
    }

    /** @const @private {!Element} */
    this.accessElement_ = accessElement;

    /** @const @private {!AccessConfigDef} */
    this.config_ = this.buildConfig_();

    /** @const @private {!Vsync} */
    this.vsync_ = _srcVsync.vsyncFor(this.win);

    /** @const @private {!Xhr} */
    this.xhr_ = _srcXhr.xhrFor(this.win);

    /** @const @private {!UrlReplacements} */
    this.urlReplacements_ = _srcUrlReplacements.urlReplacementsFor(this.win);

    /** @private @const {!Cid} */
    this.cid_ = _srcCid.cidFor(this.win);

    /** @private @const {!Viewer} */
    this.viewer_ = _srcViewer.viewerFor(this.win);

    /** @private @const {!DocumentState} */
    this.docState_ = _srcDocumentState.documentStateFor(this.win);

    /** @private @const {!Viewport} */
    this.viewport_ = _srcViewport.viewportFor(this.win);

    /** @private {?Promise<string>} */
    this.readerIdPromise_ = null;

    /** @private {?Promise} */
    this.reportViewPromise_ = null;
  }

  /**
   * @param {!Window} win
   * @return {!AccessService}
   */

  /**
   * @return {!AccessConfigDef}
   * @private
   */

  AccessService.prototype.buildConfig_ = function buildConfig_() {
    var config = undefined;
    try {
      config = JSON.parse(this.accessElement_.textContent);
    } catch (e) {
      throw new Error('Failed to parse "amp-access" JSON: ' + e);
    }
    return {
      authorization: _srcUrl.assertHttpsUrl(assert(config['authorization'], '"authorization" URL must be specified')),
      pingback: _srcUrl.assertHttpsUrl(assert(config['pingback'], '"pingback" URL must be specified')),
      login: _srcUrl.assertHttpsUrl(assert(config['login'], '"login" URL must be specified'))
    };
  };

  /**
   * @return {boolean}
   */

  AccessService.prototype.isEnabled = function isEnabled() {
    return this.enabled_;
  };

  /**
   * @return {!AccessService}
   * @private
   */

  AccessService.prototype.start_ = function start_() {
    if (!this.isExperimentOn_) {
      _srcLog.log.info(TAG, 'Access experiment is off: ', EXPERIMENT);
      return this;
    }
    if (!this.enabled_) {
      _srcLog.log.info(TAG, 'Access is disabled - no "id=amp-access" element');
      return this;
    }
    this.startInternal_();
    return this;
  };

  /** @private */

  AccessService.prototype.startInternal_ = function startInternal_() {
    _srcAction.actionServiceFor(this.win).installActionHandler(this.accessElement_, this.handleAction_.bind(this));

    // Start authorization XHR immediately.
    this.runAuthorization_();

    // Wait for the "view" signal.
    this.scheduleView_();
  };

  /**
   * @return {!Promise<string>}
   * @private
   */

  AccessService.prototype.getReaderId_ = function getReaderId_() {
    var _this = this;

    if (!this.readerIdPromise_) {
      (function () {
        // No consent - an essential part of the access system.
        var consent = Promise.resolve();
        _this.readerIdPromise_ = _this.cid_.then(function (cid) {
          return cid.get('amp-access', consent);
        });
      })();
    }
    return this.readerIdPromise_;
  };

  /**
   * @param {string} url
   * @return {!Promise<string>}
   * @private
   */

  AccessService.prototype.buildUrl_ = function buildUrl_(url) {
    var _this2 = this;

    return this.getReaderId_().then(function (readerId) {
      return _this2.urlReplacements_.expand(url, {
        'READER_ID': readerId
      });
    });
  };

  /**
   * @return {!Promise}
   * @private
   */

  AccessService.prototype.runAuthorization_ = function runAuthorization_() {
    var _this3 = this;

    _srcLog.log.fine(TAG, 'Start authorization via ', this.config_.authorization);
    this.toggleTopClass_('amp-access-loading', true);
    return this.buildUrl_(this.config_.authorization).then(function (url) {
      _srcLog.log.fine(TAG, 'Authorization URL: ', url);
      return _this3.xhr_.fetchJson(url, { credentials: 'include' });
    }).then(function (response) {
      _srcLog.log.fine(TAG, 'Authorization response: ', response);
      _this3.toggleTopClass_('amp-access-loading', false);
      _srcDocumentState.onDocumentReady(_this3.win.document, function () {
        _this3.applyAuthorization_(response);
      });
    })['catch'](function (error) {
      _srcLog.log.error(TAG, 'Authorization failed: ', error);
      _this3.toggleTopClass_('amp-access-loading', false);
    });
  };

  /**
   * @param {!JSONObjectDef} response
   * @private
   */

  AccessService.prototype.applyAuthorization_ = function applyAuthorization_(response) {
    var elements = this.win.document.querySelectorAll('[amp-access]');
    for (var i = 0; i < elements.length; i++) {
      this.applyAuthorizationToElement_(elements[i], response);
    }
  };

  /**
   * @param {!Element} element
   * @param {!JSONObjectDef} response
   * @private
   */

  AccessService.prototype.applyAuthorizationToElement_ = function applyAuthorizationToElement_(element, response) {
    var expr = element.getAttribute('amp-access');
    var on = _accessExpr.evaluateAccessExpr(expr, response);

    // TODO(dvoytenko): support templates

    this.vsync_.mutate(function () {
      if (on) {
        element.removeAttribute('amp-access-off');
      } else {
        element.setAttribute('amp-access-off', '');
      }
    });
  };

  /**
   * @private
   */

  AccessService.prototype.scheduleView_ = function scheduleView_() {
    var _this4 = this;

    this.docState_.onReady(function () {
      if (_this4.viewer_.isVisible()) {
        _this4.reportWhenViewed_();
      }
      _this4.viewer_.onVisibilityChanged(function () {
        if (_this4.viewer_.isVisible()) {
          _this4.reportWhenViewed_();
        }
      });
    });
  };

  /**
   * @return {!Promise}
   * @private
   */

  AccessService.prototype.reportWhenViewed_ = function reportWhenViewed_() {
    var _this5 = this;

    if (this.reportViewPromise_) {
      return this.reportViewPromise_;
    }
    _srcLog.log.fine(TAG, 'start view monitoring');
    this.reportViewPromise_ = this.whenViewed_().then(this.reportViewToServer_.bind(this), function (reason) {
      // Ignore - view has been canceled.
      _srcLog.log.fine(TAG, 'view cancelled:', reason);
      _this5.reportViewPromise_ = null;
      throw reason;
    });
    return this.reportViewPromise_;
  };

  /**
   * The promise will be resolved when a view of this document has occurred. It
   * will be rejected if the current impression should not be counted as a view.
   * @return {!Promise}
   * @private
   */

  AccessService.prototype.whenViewed_ = function whenViewed_() {
    var _this6 = this;

    // Viewing kick off: document is visible.
    var unlistenSet = [];
    return new Promise(function (resolve, reject) {
      // 1. Document becomes invisible again: cancel.
      unlistenSet.push(_this6.viewer_.onVisibilityChanged(function () {
        if (!_this6.viewer_.isVisible()) {
          reject();
        }
      }));

      // 2. After a few seconds: register a view.
      var timeoutId = _srcTimer.timer.delay(resolve, VIEW_TIMEOUT);
      unlistenSet.push(function () {
        return _srcTimer.timer.cancel(timeoutId);
      });

      // 3. If scrolled: register a view.
      unlistenSet.push(_this6.viewport_.onScroll(resolve));

      // 4. Tap: register a view.
      unlistenSet.push(_srcEventHelper.listenOnce(_this6.win.document.documentElement, 'click', resolve));
    }).then(function () {
      unlistenSet.forEach(function (unlisten) {
        return unlisten();
      });
    }, function (reason) {
      unlistenSet.forEach(function (unlisten) {
        return unlisten();
      });
      throw reason;
    });
  };

  /**
   * @return {!Promise}
   * @private
   */

  AccessService.prototype.reportViewToServer_ = function reportViewToServer_() {
    var _this7 = this;

    return this.buildUrl_(this.config_.pingback).then(function (url) {
      _srcLog.log.fine(TAG, 'Pingback URL: ', url);
      return _this7.xhr_.sendSignal(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: ''
      });
    }).then(function () {
      _srcLog.log.fine(TAG, 'Pingback complete');
    })['catch'](function (error) {
      _srcLog.log.error(TAG, 'Pingback failed: ', error);
      throw error;
    });
  };

  /**
   * @param {string} className
   * @param {boolean} on
   * @private
   */

  AccessService.prototype.toggleTopClass_ = function toggleTopClass_(className, on) {
    var _this8 = this;

    this.vsync_.mutate(function () {
      _this8.win.document.documentElement.classList.toggle(className, on);
    });
  };

  /**
   * @param {!ActionInvocation} invocation
   * @private
   */

  AccessService.prototype.handleAction_ = function handleAction_(invocation) {
    _srcLog.log.fine(TAG, 'Invocation: ', invocation);
  };

  return AccessService;
})();

exports.AccessService = AccessService;

function installAccessService(win) {
  return _srcService.getService(win, 'access', function () {
    return new AccessService(win).start_();
  });
}

;

installAccessService(AMP.win);

},{"../../../src/action":4,"../../../src/cid":6,"../../../src/document-state":9,"../../../src/event-helper":10,"../../../src/experiments":11,"../../../src/log":12,"../../../src/service":15,"../../../src/styles":17,"../../../src/timer":18,"../../../src/url":20,"../../../src/url-replacements":19,"../../../src/viewer":22,"../../../src/viewport":23,"../../../src/vsync":24,"../../../src/xhr":25,"./access-expr":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
exports.__esModule = true;
exports.actionServiceFor = actionServiceFor;
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
 * @param {!Window} win
 * @return {!Action}
 */

function actionServiceFor(win) {
  return _service.getService(win, 'action');
}

;

},{"./service":15}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./service":15}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./asserts":5,"./service":15,"./url":20}],9:[function(require,module,exports){
exports.__esModule = true;
exports.isDocumentReady = isDocumentReady;
exports.onDocumentReady = onDocumentReady;
exports.whenDocumentReady = whenDocumentReady;
exports.documentStateFor = documentStateFor;
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

var _observable = require('./observable');

var _service = require('./service');

var _style = require('./style');

/**
 * Whether the document is ready.
 * @param {!Document} doc
 * @return {boolean}
 */

function isDocumentReady(doc) {
  return doc.readyState != 'loading';
}

/**
 * Calls the callback when document is ready.
 * @param {!Document} doc
 * @param {!Function} callback
 */

function onDocumentReady(doc, callback) {
  var ready = isDocumentReady(doc);
  if (ready) {
    callback();
  } else {
    (function () {
      var readyListener = function () {
        if (doc.readyState != 'loading') {
          if (!ready) {
            ready = true;
            callback();
          }
          doc.removeEventListener('readystatechange', readyListener);
        }
      };
      doc.addEventListener('readystatechange', readyListener);
    })();
  }
}

/**
 * Returns a promise that is resolved when document is ready.
 * @param {!Document} doc
 * @return {!Promise}
 */

function whenDocumentReady(doc) {
  return new Promise(function (resolve) {
    onDocumentReady(doc, resolve);
  });
}

/**
 */

var DocumentState = (function () {
  /**
   * @param {!Window} win
   */

  function DocumentState(win) {
    babelHelpers.classCallCheck(this, DocumentState);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Document} */
    this.document_ = win.document;

    /** @private @const {string|null} */
    this.hiddenProp_ = _style.getVendorJsPropertyName(this.document_, 'hidden', true);
    if (this.document_[this.hiddenProp_] === undefined) {
      this.hiddenProp_ = null;
    }

    /** @private @const {string|null} */
    this.visibilityStateProp_ = _style.getVendorJsPropertyName(this.document_, 'visibilityState', true);
    if (this.document_[this.visibilityStateProp_] === undefined) {
      this.visibilityStateProp_ = null;
    }

    /** @private @const */
    this.visibilityObservable_ = new _observable.Observable();

    /** @private @const {string|null} */
    this.visibilityChangeEvent_ = null;
    if (this.hiddenProp_) {
      this.visibilityChangeEvent_ = 'visibilitychange';
      var vendorStop = this.hiddenProp_.indexOf('Hidden');
      if (vendorStop != -1) {
        this.visibilityChangeEvent_ = this.hiddenProp_.substring(0, vendorStop) + 'Visibilitychange';
      }
    }

    /** @private @const {!Function} */
    this.boundOnVisibilityChanged_ = this.onVisibilityChanged_.bind(this);
    if (this.visibilityChangeEvent_) {
      this.document_.addEventListener(this.visibilityChangeEvent_, this.boundOnVisibilityChanged_);
    }
  }

  /**
   * @param {!Window} window
   * @return {!DocumentState}
   * @private
   */

  /** @private */

  DocumentState.prototype.cleanup_ = function cleanup_() {
    if (this.visibilityChangeEvent_) {
      this.document_.removeEventListener(this.visibilityChangeEvent_, this.boundOnVisibilityChanged_);
    }
  };

  /**
   * Whether the document is ready.
   * @return {boolean}
   */

  DocumentState.prototype.isReady = function isReady() {
    return isDocumentReady(this.document_);
  };

  /**
   * Calls the callback when document is ready.
   * @param {!Function} callback
   */

  DocumentState.prototype.onReady = function onReady(callback) {
    return onDocumentReady(this.document_, callback);
  };

  /**
   * Returns the value of "document.hidden" property. The reasons why it may
   * not be visible include document in a non-active tab or when the document
   * is being pre-rendered via link with rel="prerender".
   * @return {boolean}
   */

  DocumentState.prototype.isHidden = function isHidden() {
    if (!this.hiddenProp_) {
      return false;
    }
    return this.document_[this.hiddenProp_];
  };

  /**
   * Returns the value of "document.visibilityState" property. Possible values
   * are: 'hidden', 'visible', 'prerender', and 'unloaded'.
   * @return {string}
   */

  DocumentState.prototype.getVisibilityState = function getVisibilityState() {
    if (!this.visibilityStateProp_) {
      return !this.isHidden() ? 'visible' : 'hidden';
    }
    return this.document_[this.visibilityStateProp_];
  };

  /**
   * @param {function()} handler
   * @return {!UnlistenDef}
   */

  DocumentState.prototype.onVisibilityChanged = function onVisibilityChanged(handler) {
    return this.visibilityObservable_.add(handler);
  };

  /** @private */

  DocumentState.prototype.onVisibilityChanged_ = function onVisibilityChanged_() {
    this.visibilityObservable_.fire();
  };

  return DocumentState;
})();

exports.DocumentState = DocumentState;
function createDocumentState_(window) {
  return new DocumentState(window);
}

/**
 * @param {!Window} window
 * @return {!DocumentState}
 */

function documentStateFor(window) {
  return _service.getService(window, 'documentState', function () {
    return createDocumentState_(window);
  });
}

;

},{"./observable":14,"./service":15,"./style":16}],10:[function(require,module,exports){
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

},{"./cookies":7,"./timer":18}],12:[function(require,module,exports){
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

},{"./url":20,"_process":3}],14:[function(require,module,exports){
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

},{"./asserts":5}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
exports.__esModule = true;
exports.installStyles = installStyles;
exports.makeBodyVisible = makeBodyVisible;
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

var _style = require('./style');

/**
 * Adds the given css text to the given document.
 *
 * The style tags will be at the beginning of the head before all author
 * styles. One element can be the main runtime CSS. This is guaranteed
 * to always be the first stylesheet in the doc.
 *
 * @param {!Document} doc The document that should get the new styles.
 * @param {string} cssText
 * @param {function()} cb Called when the new styles are available.
 *     Not using a promise, because this is synchronous when possible.
 *     for better performance.
 * @param {boolean=} opt_isRuntimeCss If true, this style tag will be inserted
 *     as the first element in head and all style elements will be positioned
 *     after.
 */

function installStyles(doc, cssText, cb, opt_isRuntimeCss) {
  var style = doc.createElement('style');
  style.textContent = cssText;
  var afterElement = null;
  // Make sure that we place style tags after the main runtime CSS. Otherwise
  // the order is random.
  if (opt_isRuntimeCss) {
    style.setAttribute('amp-runtime', '');
  } else {
    afterElement = doc.querySelector('style[amp-runtime]');
  }
  insertAfterOrAtStart(doc.head, style, afterElement);
  // Styles aren't always available synchronously. E.g. if there is a
  // pending style download, it will have to finish before the new
  // style is visible.
  // For this reason we poll until the style becomes available.
  var done = function () {
    var sheets = doc.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
      var sheet = sheets[i];
      if (sheet.ownerNode == style) {
        return true;
      }
    }
    return false;
  };
  // Sync case.
  if (done()) {
    cb();
    return;
  }
  // Poll until styles are available.
  var interval = setInterval(function () {
    if (done()) {
      clearInterval(interval);
      cb();
    }
  }, 4);
}

/**
 * Sets the document's body opacity to 1.
 * If the body is not yet available (because our script was loaded
 * synchronously), polls until it is.
 * @param {!Document} doc The document who's body we should make visible.
 */

function makeBodyVisible(doc) {
  var interval = undefined;
  var set = function () {
    if (doc.body) {
      _style.setStyles(doc.body, {
        opacity: 1,
        visibility: 'visible',
        animation: 'none'
      });
      clearInterval(interval);
    }
  };
  interval = setInterval(set, 4);
  set();
}

/**
 * Insert the element in the root after the element named after or
 * if that is null at the beginning.
 * @param {!Element} root
 * @param {!Element} element
 * @param {?Element} after
 */
function insertAfterOrAtStart(root, element, after) {
  if (after) {
    if (after.nextSibling) {
      root.insertBefore(element, after.nextSibling);
    } else {
      root.appendChild(element);
    }
  } else {
    // Add at the start.
    root.insertBefore(element, root.firstChild);
  }
}

},{"./style":16}],18:[function(require,module,exports){
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

},{"./cid":6,"./document-info":8,"./log":12,"./service":15,"./url":20,"./user-notification":21,"./viewport":23,"./vsync":24}],20:[function(require,module,exports){
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

},{"./asserts":5}],21:[function(require,module,exports){
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

},{"./asserts":5,"./service":15}]},{},[2])


});
//# sourceMappingURL=amp-access-0.1.max.js.map