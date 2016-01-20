(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
exports.draw3p = draw3p;
exports.validateParentOrigin = validateParentOrigin;
exports.parseFragment = parseFragment;
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
 * @fileoverview Registers all known ad network factories and then executes
 * one of them.
 *
 * This files gets minified and published to
 * https://3p.ampproject.net/$version/f.js
 */

require('./polyfills');

var _adsTeads = require('../ads/teads');

var _adsA9 = require('../ads/a9');

var _adsAdreactor = require('../ads/adreactor');

var _adsAdsense = require('../ads/adsense');

var _adsAdtech = require('../ads/adtech');

var _adsDoubleclick = require('../ads/doubleclick');

var _twitter = require('./twitter');

var _src3p = require('../src/3p');

var _srcUrl = require('../src/url');

var _srcAsserts = require('../src/asserts');

_src3p.register('teads', _adsTeads.teads);
_src3p.register('a9', _adsA9.a9);
_src3p.register('adreactor', _adsAdreactor.adreactor);
_src3p.register('adsense', _adsAdsense.adsense);
_src3p.register('adtech', _adsAdtech.adtech);
_src3p.register('doubleclick', _adsDoubleclick.doubleclick);
_src3p.register('_ping_', function (win, data) {
  win.document.getElementById('c').textContent = data.ping;
});
_src3p.register('twitter', _twitter.twitter);

/**
 * Visible for testing.
 * Draws a 3p embed to the window. Expects the data to include the 3p type.
 * @param {!Window} win
 * @param {!Object} data
 * @param {function(!Object, function(!Object))|undefined} configCallback
 *     Optional callback that allows user code to manipulate the incoming
 *     configuration. See
 *     https://github.com/ampproject/amphtml/issues/1210 for some context
 *     on this.
 */

function draw3p(win, data, configCallback) {
  var type = data.type;
  _srcAsserts.assert(win.context.location.originValidated != null, 'Origin should have been validated');
  if (configCallback) {
    configCallback(data, function (data) {
      _srcAsserts.assert(data, 'Expected configuration to be passed as first argument');
      _src3p.run(type, win, data);
    });
  } else {
    _src3p.run(type, win, data);
  }
}

;

/**
 * Returns the "master frame" for all widgets of a given type.
 * This frame should be used to e.g. fetch scripts that can
 * be reused across frames.
 * @param {string} type
 * @return {!Window}
 */
function masterSelection(type) {
  // The master has a special name.
  var masterName = 'frame_' + type + '_master';
  var master = undefined;
  try {
    // Try to get the master from the parent. If it does not
    // exist yet we get a security exception that we catch
    // and ignore.
    master = window.parent.frames[masterName];
  } catch (expected) {
    /* ignore */
  }
  if (!master) {
    // No master yet, rename ourselves to be master. Yaihh.
    window.name = masterName;
    master = window;
  }
  return master;
}

/**
 * Draws an embed, optionally synchronously, to the DOM.
 * @param {function(!Object, function(!Object))} opt_configCallback If provided
 *     will be invoked with two arguments:
 *     1. The configuration parameters supplied to this embed.
 *     2. A callback that MUST be called for rendering to proceed. It takes
 *        no arguments. Configuration is expected to be modified in-place.
 */
window.draw3p = function (opt_configCallback) {
  var data = parseFragment(location.hash);
  window.context = data._context;
  window.context.location = _srcUrl.parseUrl(data._context.location.href);
  validateParentOrigin(window, window.context.location);
  window.context.master = masterSelection(data.type);
  window.context.isMaster = window.context.master == window;
  window.context.data = data;
  window.context.noContentAvailable = triggerNoContentAvailable;
  if (data.type == 'twitter') {
    // Only make this available to Twitter for now while
    // https://github.com/ampproject/amphtml/issues/728
    // is being implemented.
    window.context.updateDimensions = triggerDimensions;
  }
  // This only actually works for ads.
  window.context.observeIntersection = observeIntersection;
  delete data._context;
  draw3p(window, data, opt_configCallback);
};

function triggerNoContentAvailable() {
  nonSensitiveDataPostMessage('no-content');
}

function triggerDimensions(width, height) {
  nonSensitiveDataPostMessage('embed-size', {
    width: width,
    height: height
  });
}

function nonSensitiveDataPostMessage(type, opt_object) {
  if (window.parent == window) {
    return; // Nothing to do.
  }
  var object = opt_object || {};
  object.type = type;
  object.sentinel = 'amp-3p';
  window.parent. /*OK*/postMessage(object, window.context.location.origin);
}

/**
 * Registers a callback for intersections of this iframe with the current
 * viewport.
 * The passed in array has entries that aim to be compatible with
 * the IntersectionObserver spec callback.
 * http://rawgit.com/slightlyoff/IntersectionObserver/master/index.html#callbackdef-intersectionobservercallback
 * @param {function(!Array<IntersectionObserverEntry>)} observerCallback
 */
function observeIntersection(observerCallback) {
  // Send request to received records.
  nonSensitiveDataPostMessage('send-intersections');
  window.addEventListener('message', function (event) {
    if (event.source != window.parent || event.origin != window.context.location.origin || !event.data || event.data.sentinel != 'amp-3p' || event.data.type != 'intersection') {
      return;
    }
    observerCallback(event.data.changes);
  });
}

/**
 * Throws if the current frame's parent origin is not equal to
 * the claimed origin.
 * For browsers that don't support ancestorOrigins it adds
 * `originValidated = false` to the location object.
 * @param {!Window} window
 * @param {!Location} parentLocation
 * @visibleForTesting
 */

function validateParentOrigin(window, parentLocation) {
  var ancestors = window.location.ancestorOrigins;
  // Currently only webkit and blink based browsers support
  // ancestorOrigins. In that case we proceed but mark the origin
  // as non-validated.
  if (!ancestors || !ancestors.length) {
    parentLocation.originValidated = false;
    return;
  }
  _srcAsserts.assert(ancestors[0] == parentLocation.origin, 'Parent origin mismatch: %s, %s, %s', ancestors[0], parentLocation.origin);
  parentLocation.originValidated = true;
}

/**
 * Expects the fragment to contain JSON.
 * @param {string} fragment Value of location.fragment
 * @return {!JSONObject}
 * @visibleForTesting
 */

function parseFragment(fragment) {
  var json = fragment.substr(1);
  // Some browser, notably Firefox produce an encoded version of the fragment
  // while most don't. Since we know how the string should start, this is easy
  // to detect.
  if (json.indexOf('{%22') == 0) {
    json = decodeURIComponent(json);
  }
  return json ? JSON.parse(json) : {};
}

},{"../ads/a9":4,"../ads/adreactor":5,"../ads/adsense":6,"../ads/adtech":7,"../ads/doubleclick":8,"../ads/teads":9,"../src/3p":10,"../src/asserts":11,"../src/url":12,"./polyfills":2,"./twitter":3}],2:[function(require,module,exports){
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
 * @fileoverview Loads all polyfills needed by the AMP 3p integration frame.
 */

// This list should not get longer without a very good reason.

require('../third_party/babel/custom-babel-helpers');

},{"../third_party/babel/custom-babel-helpers":13}],3:[function(require,module,exports){
exports.__esModule = true;
exports.twitter = twitter;
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

// TODO(malteubl) Move somewhere else since this is not an ad.

var _src3p = require('../src/3p');

/**
 * Produces the Twitter API object for the passed in callback. If the current
 * frame is the master frame it makes a new one by injecting the respective
 * script, otherwise it schedules the callback for the script from the master
 * window.
 * @param {!Window} global
 * @param {function(!Object)} cb
 */
function getTwttr(global, cb) {
  if (context.isMaster) {
    global.twttrCbs = [cb];
    _src3p.loadScript(global, 'https://platform.twitter.com/widgets.js', function () {
      for (var i = 0; i < global.twttrCbs.length; i++) {
        global.twttrCbs[i](global.twttr);
      }
      global.twttrCbs.push = function (cb) {
        cb(global.twttr);
      };
    });
  } else {
    // Because we rely on this global existing it is important that
    // this array is created synchronously after master selection.
    context.master.twttrCbs.push(cb);
  }
}

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function twitter(global, data) {
  var tweet = document.createElement('div');
  tweet.id = 'tweet';
  tweet.style.width = '100%';
  global.document.getElementById('c').appendChild(tweet);
  getTwttr(global, function (twttr) {
    // Dimensions are given by the parent frame.
    delete data.width;
    delete data.height;
    twttr.widgets.createTweet(data.tweetid, tweet, data). /*OK*/then(function () {
      var iframe = global.document.querySelector('#c iframe');
      // Unfortunately the tweet isn't really done at this time.
      // We listen for resize to learn when things are
      // really done.
      iframe.contentWindow.addEventListener('resize', function () {
        render();
      }, true);
      render();
    });
  });

  function render() {
    var iframe = global.document.querySelector('#c iframe');
    var body = iframe.contentWindow.document.body;
    context.updateDimensions(body. /*OK*/offsetWidth, body. /*OK*/offsetHeight + /* margins */20);
  }
}

},{"../src/3p":10}],4:[function(require,module,exports){
exports.__esModule = true;
exports.a9 = a9;
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

var _src3p = require('../src/3p');

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function a9(global, data) {
  _src3p.checkData(data, ['aax_size', 'aax_pubname', 'aax_src']);
  /*eslint "google-camelcase/google-camelcase": 0*/
  global.aax_size = data.aax_size;
  global.aax_pubname = data.aax_pubname;
  global.aax_src = data.aax_src;
  _src3p.writeScript(global, 'https://c.amazon-adsystem.com/aax2/assoc.js');
}

},{"../src/3p":10}],5:[function(require,module,exports){
exports.__esModule = true;
exports.adreactor = adreactor;
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

var _src3p = require('../src/3p');

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function adreactor(global, data) {
  _src3p.checkData(data, ['zid', 'pid', 'custom3']);
  var url = 'https://adserver.adreactor.com' + '/servlet/view/banner/javascript/zone?' + 'zid=' + encodeURIComponent(data.zid) + '&pid=' + encodeURIComponent(data.pid) + '&custom3=' + encodeURIComponent(data.custom3) + '&random=' + Math.floor(89999999 * Math.random() + 10000000) + '&millis=' + new Date().getTime();
  _src3p.writeScript(global, url);
}

},{"../src/3p":10}],6:[function(require,module,exports){
exports.__esModule = true;
exports.adsense = adsense;
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

var _src3p = require('../src/3p');

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function adsense(global, data) {
  _src3p.checkData(data, ['adClient', 'adSlot']);
  /*eslint "google-camelcase/google-camelcase": 0*/
  global.google_page_url = global.context.canonicalUrl;
  var s = document.createElement('script');
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  global.document.body.appendChild(s);

  var i = document.createElement('ins');
  i.setAttribute('data-ad-client', data['adClient']);
  if (data['adSlot']) {
    i.setAttribute('data-ad-slot', data['adSlot']);
  }
  i.setAttribute('class', 'adsbygoogle');
  i.style.cssText = 'display:inline-block;width:100%;height:100%;';
  global.document.getElementById('c').appendChild(i);
  (global.adsbygoogle = global.adsbygoogle || []).push({});
}

},{"../src/3p":10}],7:[function(require,module,exports){
exports.__esModule = true;
exports.adtech = adtech;
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

var _src3p = require('../src/3p');

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function adtech(global, data) {
  var src = data.src;
  _src3p.validateSrcPrefix('https:', src);
  _src3p.validateSrcContains('/addyn/', src);
  _src3p.writeScript(global, src);
}

},{"../src/3p":10}],8:[function(require,module,exports){
exports.__esModule = true;
exports.doubleclick = doubleclick;
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

var _src3p = require('../src/3p');

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function doubleclick(global, data) {
  _src3p.checkData(data, ['slot', 'targeting', 'categoryExclusion', 'tagForChildDirectedTreatment', 'cookieOptions']);
  _src3p.loadScript(global, 'https://www.googletagservices.com/tag/js/gpt.js', function () {
    global.googletag.cmd.push(function () {
      var googletag = global.googletag;
      var dimensions = [[parseInt(data.width, 10), parseInt(data.height, 10)]];
      var pubads = googletag.pubads();
      var slot = googletag.defineSlot(data.slot, dimensions, 'c').addService(pubads);
      pubads.enableSingleRequest();
      pubads.markAsAmp();
      pubads.set('page_url', context.canonicalUrl);
      googletag.enableServices();

      if (data.targeting) {
        for (var key in data.targeting) {
          slot.setTargeting(key, data.targeting[key]);
        }
      }

      if (data.categoryExclusion) {
        slot.setCategoryExclusion(data.categoryExclusion);
      }

      if (data.tagForChildDirectedTreatment != undefined) {
        pubads.setTagForChildDirectedTreatment(data.tagForChildDirectedTreatment);
      }

      if (data.cookieOptions) {
        pubads.setCookieOptions(data.cookieOptions);
      }

      pubads.addEventListener('slotRenderEnded', function (event) {
        if (event.isEmpty) {
          context.noContentAvailable();
        }
      });

      // Exported for testing.
      c.slot = slot;
      googletag.display('c');
    });
  });
}

},{"../src/3p":10}],9:[function(require,module,exports){
exports.__esModule = true;
exports.teads = teads;
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

var _src3p = require('../src/3p');

/**
 * @param {!Window} global
 * @param {!Object} data
 */

function teads(global, data) {
  // temp for debug purpose
  global.document.cookie = ''; //'teadsDebugLevel=all,debug'

  // teads tag
  global._ttp = {};
  global._ttp[0] = [{
    pid: 123,
    format: 'inread',
    slot: {
      selector: '#c',
      insertInside: true,
      minimum: 1
    }
  }];

  global._tta = {};
  global._tta[0] = [{
    type: 'VastUrl',
    content: 'http://a.teads.tv/vast/get/26841',
    settings: {
      values: {
        threshold: 50,
        pageId: 0,
        placementId: 123,
        placementFormat: 'inread'
      },
      components: {},
      behaviors: {
        launch: 'auto',
        videoStart: 'auto',
        videoPause: 'no'
      }
    }
  }];

  window.context.observeIntersection(function (changes) {
    changes.forEach(function (c) {
      //console.info('TEADS', 'Height of intersection', c.intersectionRect.height);
    });
  });

  _src3p.loadScript(global, 'https://ebuzzing.github.io/amphtml/ads/teads-format.min.js');
  //window.context.noContentAvailable()
}

},{"../src/3p":10}],10:[function(require,module,exports){
exports.__esModule = true;
exports.register = register;
exports.run = run;
exports.writeScript = writeScript;
exports.loadScript = loadScript;
exports.validateSrcPrefix = validateSrcPrefix;
exports.validateSrcContains = validateSrcContains;
exports.checkData = checkData;
exports.validateData = validateData;
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
 * @fileoverview Utility functions for scripts running inside of a third
 * party iframe.
 */

// Note: loaded by 3p system. Cannot rely on babel polyfills.

var _asserts = require('./asserts');

/** @typedef {function(!Window, !Object)}  */
var ThirdPartyFunctionDef = undefined;

/**
 * @const {!Object<ThirdPartyFunctionDef>}
 * @visibleForTesting
 */
var registrations = {};

exports.registrations = registrations;
/** @type {number} */
var syncScriptLoads = 0;

/**
 * @param {string} id The specific 3p integration.
 * @param {ThirdPartyFunctionDef} draw Function that draws the 3p integration.
 */

function register(id, draw) {
  _asserts.assert(!registrations[id], 'Double registration %s', id);
  registrations[id] = draw;
}

/**
 * Execute the 3p integration with the given id.
 * @param {id} id
 * @param {!Window} win
 * @param {!Object} data
 */

function run(id, win, data) {
  var fn = registrations[id];
  _asserts.assert(fn, 'Unknown 3p: ' + id);
  fn(win, data);
}

/**
 * Synchronously load the given script URL. Only use this if you need a sync
 * load. Otherwise use {@link loadScript}.
 * Supports taking a callback that will be called synchronously after the given
 * script was executed.
 * @param {!Window} win
 * @param {string} url
 * @param {function()=} opt_cb
 */

function writeScript(win, url, opt_cb) {
  /*eslint no-useless-concat: 0*/
  win.document.write('<' + 'script src="' + encodeURI(url) + '"><' + '/script>');
  if (opt_cb) {
    executeAfterWriteScript(win, opt_cb);
  }
}

/**
 * Asynchronously load the given script URL.
 * @param {!Window} win
 * @param {string} url
 * @param {function()=} cb
 */

function loadScript(win, url, cb) {
  var s = win.document.createElement('script');
  s.src = url;
  s.onload = cb;
  win.document.body.appendChild(s);
}

/**
 * Run the function after all currently waiting sync scripts have been
 * executed.
 * @param {!Window} win
 * @param {function()} fn
 */
function executeAfterWriteScript(win, fn) {
  var index = syncScriptLoads++;
  win['__runScript' + index] = fn;
  win.document.write('<' + 'script>__runScript' + index + '()<' + '/script>');
}

/**
 * Throws if the given src doesn't start with prefix.
 * @param {string} prefix
 * @param {string} src
 */

function validateSrcPrefix(prefix, src) {
  if (src.indexOf(prefix) !== 0) {
    throw new Error('Invalid src ' + src);
  }
}

/**
 * Throws if the given src doesn't contain the string
 * @param {string} string
 * @param {string} src
 */

function validateSrcContains(string, src) {
  if (src.indexOf(string) === -1) {
    throw new Error('Invalid src ' + src);
  }
}

/**
 * Throws a non-interrupting exception if data contains a field not supported
 * by this embed type.
 * @param {!Object} data
 * @param {!Array<string>} allowedFields
 */

function checkData(data, allowedFields) {
  // Throw in a timeout, because we do not want to interrupt execution,
  // because that would make each removal an instant backward incompatible
  // change.
  try {
    validateData(data, allowedFields);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}

/**
 * Throws an exception if data contains a field not supported
 * by this embed type.
 * @param {!Object} data
 * @param {!Array<string>} allowedFields
 */

function validateData(data, allowedFields) {
  var defaultAvailableFields = {
    width: true,
    height: true,
    initialWindowWidth: true,
    initialWindowHeight: true,
    type: true,
    referrer: true,
    canonicalUrl: true,
    pageViewId: true,
    location: true,
    mode: true
  };
  for (var field in data) {
    if (!data.hasOwnProperty(field) || field in defaultAvailableFields) {
      continue;
    }
    _asserts.assert(allowedFields.indexOf(field) != -1, 'Unknown attribute for %s: %s.', data.type, field);
  }
}

},{"./asserts":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./asserts":11}],13:[function(require,module,exports){
(function (global){
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.get = function get(_x, _x2, _x3) {
    var _again = true;

    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      desc = parent = getter = undefined;
      _again = false;

      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
})(typeof global === "undefined" ? self : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])

//# sourceMappingURL=integration.js.map