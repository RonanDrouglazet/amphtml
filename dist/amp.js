try{(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
 * URLs to prefetch for a given ad type.
 *
 * This MUST be kept in sync with actual implementation.
 *
 * @const {!Object<string, (string|!Array<string>)>}
 */
var adPrefetch = {
  doubleclick: 'https://www.googletagservices.com/tag/js/gpt.js',
  a9: 'https://c.amazon-adsystem.com/aax2/assoc.js',
  adsense: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  teads: 'https://cdn.teads.tv/media/format/v3/teads-format.js'
};

exports.adPrefetch = adPrefetch;
/**
 * URLs to connect to for a given ad type.
 *
 * This MUST be kept in sync with actual implementation.
 *
 * @const {!Object<string, (string|!Array<string>)>}
 */
var adPreconnect = {
  adreactor: 'https://adserver.adreactor.com',
  adsense: 'https://googleads.g.doubleclick.net',
  teads: 'https://cdn.teads.tv',
  doubleclick: ['https://partner.googleadservices.com', 'https://securepubads.g.doubleclick.net', 'https://tpc.googlesyndication.com']
};
exports.adPreconnect = adPreconnect;

},{}],2:[function(require,module,exports){
exports.__esModule = true;
var cssText = "body{margin:0!important;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}.-amp-element{display:inline-block}.-amp-layout-fixed{display:inline-block;position:relative}.-amp-layout-container,.-amp-layout-fixed-height,.-amp-layout-responsive{display:block;position:relative}.-amp-layout-fill{display:block;position:absolute;top:0;left:0;bottom:0;right:0}.-amp-layout-fill,.-amp-layout-size-defined{overflow:hidden!important}i-amp-sizer{display:block!important}.-amp-fill-content{display:block;width:100%;height:100%;margin:auto}.-amp-layout-size-defined .-amp-fill-content{position:absolute;top:0;left:0;bottom:0;right:0}.-amp-replaced-content{padding:0!important;border:none!important}.-amp-unresolved{position:relative;overflow:hidden!important}.-amp-notbuilt{position:relative;overflow:hidden!important;color:transparent!important}.-amp-notbuilt>*{display:none}.-amp-ghost{visibility:hidden!important}.-amp-element>[placeholder]{display:block}.-amp-element>[placeholder].amp-hidden,.-amp-element>[placeholder].hidden{visibility:hidden}.-amp-element:not(.amp-notsupported)>[fallback]{display:none}.-amp-layout-size-defined>[fallback],.-amp-layout-size-defined>[placeholder]{position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1!important}.-amp-notbuilt>[placeholder]{display:block!important}.-amp-hidden-by-media-query{display:none}.-amp-element-error{background:red!important;color:#fff!important;position:relative!important}.-amp-element-error:before{content:attr(error-message)}i-amp-scroll-container{position:absolute;top:0;left:0;right:0;bottom:0;overflow:auto}.-amp-loading-container{display:block!important;z-index:1}.-amp-notbuilt>.-amp-loading-container{display:block!important}.-amp-loading-container.amp-hidden{visibility:hidden}.-amp-loader{position:absolute;display:block;height:10px;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;white-space:nowrap}.-amp-loader.amp-active .-amp-loader-dot{-webkit-animation:a 2s infinite;animation:a 2s infinite}.-amp-loader-dot{position:relative;display:inline-block;height:10px;width:10px;margin:2px;border-radius:100%;background-color:rgba(0,0,0,.3);box-shadow:2px 2px 2px 1px rgba(0,0,0,.2);will-change:transform}.-amp-loader .-amp-loader-dot:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.-amp-loader .-amp-loader-dot:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}.-amp-loader .-amp-loader-dot:nth-child(3){-webkit-animation-delay:.2s;animation-delay:.2s}@-webkit-keyframes a{0%,to{-webkit-transform:scale(.7);transform:scale(.7);background-color:rgba(0,0,0,.3)}50%{-webkit-transform:scale(.8);transform:scale(.8);background-color:rgba(0,0,0,.5)}}@keyframes a{0%,to{-webkit-transform:scale(.7);transform:scale(.7);background-color:rgba(0,0,0,.3)}50%{-webkit-transform:scale(.8);transform:scale(.8);background-color:rgba(0,0,0,.5)}}.-amp-element>[overflow]{cursor:pointer;z-index:2;visibility:hidden}.-amp-element>[overflow].amp-visible{visibility:visible}template{display:none!important}amp-pixel{position:absolute!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}amp-ad iframe{border:0!important;margin:0!important;padding:0!important}amp-instagram{padding:48px 8px!important}amp-analytics{position:absolute!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}[amp-access][amp-access-off]{display:none}\n/*# sourceURL=/css/amp.css*/";
exports.cssText = cssText;

},{}],3:[function(require,module,exports){
exports.__esModule = true;
exports.installAd = installAd;
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

var _srcBaseElement = require('../src/base-element');

var _srcAsserts = require('../src/asserts');

var _srcIntersectionObserver = require('../src/intersection-observer');

var _srcLayout = require('../src/layout');

var _srcEventHelper = require('../src/event-helper');

var _srcCustomElement = require('../src/custom-element');

var _src3pFrame = require('../src/3p-frame');

var _ads_prefetch = require('../ads/_prefetch');

var _srcTimer = require('../src/timer');

/** @private @const These tags are allowed to have fixed positioning */
var POSITION_FIXED_TAG_WHITELIST = {
  'AMP-LIGHTBOX': true
};

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installAd(win) {

  /**
   * @type {boolean} Heuristic boolean as for whether another ad is currently
   *     loading.
   */
  var loadingAdsCount = 0;

  var AmpAd = (function (_BaseElement) {
    babelHelpers.inherits(AmpAd, _BaseElement);

    function AmpAd() {
      babelHelpers.classCallCheck(this, AmpAd);

      _BaseElement.apply(this, arguments);
    }

    /** @override  */

    AmpAd.prototype.renderOutsideViewport = function renderOutsideViewport() {
      // Before the user has scrolled we only render ads in view. This prevents
      // excessive jank in situations like swiping through a lot of articles.
      if (!this.getViewport().hasScrolled()) {
        return false;
      };

      // If another ad is currently loading we only load ads that are currently
      // in viewport.
      if (loadingAdsCount > 0) {
        return false;
      }

      // Otherwise the ad is good to go.
      return true;
    };

    /** @override */

    AmpAd.prototype.isLayoutSupported = function isLayoutSupported(layout) {
      return _srcLayout.isLayoutSizeDefined(layout);
    };

    /**
     * @return {boolean}
     * @override
     */

    AmpAd.prototype.isReadyToBuild = function isReadyToBuild() {
      // TODO(dvoytenko, #1014): Review and try a more immediate approach.
      // Wait until DOMReady.
      return false;
    };

    /** @override */

    AmpAd.prototype.buildCallback = function buildCallback() {
      /** @private {?Element} */
      this.iframe_ = null;

      /** @private {?Element} */
      this.placeholder_ = this.getPlaceholder();

      /** @private {?Element} */
      this.fallback_ = this.getFallback();

      /** @private {boolean} */
      this.isInFixedContainer_ = false;

      /**
       * The layout box of the ad iframe (as opposed to the amp-ad tag).
       * In practice it often has padding to create a grey or similar box
       * around ads.
       * @private {!LayoutRect}
       */
      this.iframeLayoutBox_ = null;

      /**
       * Call to stop listening to viewport changes.
       * @private {?function()}
       */
      this.unlistenViewportChanges_ = null;

      /** @private {boolean} */
      this.shouldSendIntersectionChanges_ = false;
    };

    /**
     * Prefetches and preconnects URLs related to the ad.
     * @override
     */

    AmpAd.prototype.preconnectCallback = function preconnectCallback(onLayout) {
      var _this = this;

      // We always need the bootstrap.
      _src3pFrame.prefetchBootstrap(this.getWin());
      var type = this.element.getAttribute('type');
      var prefetch = _ads_prefetch.adPrefetch[type];
      var preconnect = _ads_prefetch.adPreconnect[type];
      if (typeof prefetch == 'string') {
        this.preconnect.prefetch(prefetch);
      } else if (prefetch) {
        prefetch.forEach(function (p) {
          _this.preconnect.prefetch(p);
        });
      }
      if (typeof preconnect == 'string') {
        this.preconnect.url(preconnect, onLayout);
      } else if (preconnect) {
        preconnect.forEach(function (p) {
          _this.preconnect.url(p, onLayout);
        });
      }
      // If fully qualified src for ad script is specified we preconnect to it.
      var src = this.element.getAttribute('src');
      if (src) {
        // We only preconnect to the src because we cannot know whether the URL
        // will have caching headers set.
        this.preconnect.url(src);
      }
    };

    /**
     * @override
     */

    AmpAd.prototype.onLayoutMeasure = function onLayoutMeasure() {
      this.isInFixedContainer_ = this.isPositionFixed();
      // We remeasured this tag, lets also remeasure the iframe. Should be
      // free now and it might have changed.
      this.measureIframeLayoutBox_();
    };

    /**
     * Measure the layout box of the iframe if we rendered it already.
     * @private
     */

    AmpAd.prototype.measureIframeLayoutBox_ = function measureIframeLayoutBox_() {
      if (this.iframe_) {
        this.iframeLayoutBox_ = this.getViewport().getLayoutRect(this.iframe_);
      }
    };

    /**
     * @return {boolean} whether this element or its ancestors have position
     * fixed (unless they are POSITION_FIXED_TAG_WHITELIST).
     * This should only be called when a layout on the page was just forced
     * anyway.
     */

    AmpAd.prototype.isPositionFixed = function isPositionFixed() {
      var el = this.element;
      var body = el.ownerDocument.body;
      do {
        if (POSITION_FIXED_TAG_WHITELIST[el.tagName]) {
          return false;
        }
        if (this.getWin() /*because only called from onLayoutMeasure */
        . /*OK*/getComputedStyle(el).position == 'fixed') {
          return true;
        }
        el = el.parentNode;
      } while (el.getAttribute && el != body);
      return false;
    };

    /** @override */

    AmpAd.prototype.layoutCallback = function layoutCallback() {
      var _this2 = this;

      loadingAdsCount++;
      _srcTimer.timer.delay(function () {
        // Unfortunately we don't really have a good way to measure how long it
        // takes to load an ad, so we'll just pretend it takes 1 second for
        // now.
        loadingAdsCount--;
      }, 1000);
      _srcAsserts.assert(!this.isInFixedContainer_, '<amp-ad> is not allowed to be placed in elements with ' + 'position:fixed: %s', this.element);
      if (!this.iframe_) {
        this.iframe_ = _src3pFrame.getIframe(this.element.ownerDocument.defaultView, this.element);
        this.applyFillContent(this.iframe_);
        this.element.appendChild(this.iframe_);

        // Triggered by context.noContentAvailable() inside the ad iframe.
        _src3pFrame.listenOnce(this.iframe_, 'no-content', function () {
          _this2.deferMutate(_this2.noContentHandler_.bind(_this2));
        });
        // Triggered by context.observeIntersection(…) inside the ad iframe.
        // We use listen instead of listenOnce, because a single ad might
        // have multiple parties wanting to receive viewability data.
        // The second time this is called, it doesn't do much but it
        // guarantees that the receiver gets an initial intersection change
        // record.
        _src3pFrame.listen(this.iframe_, 'send-intersections', function () {
          _this2.startSendingIntersectionChanges_();
        });
      }
      return _srcEventHelper.loadPromise(this.iframe_);
    };

    /** @override  */

    AmpAd.prototype.viewportCallback = function viewportCallback(inViewport) {
      // Lets the ad know that it became visible or no longer is.
      this.sendAdIntersection_();
      // And update the ad about its position in the viewport while
      // it is visible.
      if (inViewport) {
        this.unlistenViewportChanges_ = this.getViewport().onScroll(this.sendAdIntersection_.bind(this));
      } else if (this.unlistenViewportChanges_) {
        this.unlistenViewportChanges_();
        this.unlistenViewportChanges_ = null;
      }
    };

    /**
     * Called via postMessage from the child iframe when the ad starts
     * observing its position in the viewport.
     * Sets a flag, measures the iframe position if necessary and sends
     * one change record to the iframe.
     * Note that this method may be called more than once if a single ad
     * has multiple parties interested in viewability data.
     * @private
     */

    AmpAd.prototype.startSendingIntersectionChanges_ = function startSendingIntersectionChanges_() {
      var _this3 = this;

      this.shouldSendIntersectionChanges_ = true;
      this.getVsync().measure(function () {
        if (!_this3.iframeLayoutBox_) {
          _this3.measureIframeLayoutBox_();
        }
        _this3.sendAdIntersection_();
      });
    };

    /**
     * Sends 'intersection' message to ad with intersection change records
     * if this has been activated and we measured the layout box of the iframe
     * at least once.
     * @private
     */

    AmpAd.prototype.sendAdIntersection_ = function sendAdIntersection_() {
      if (!this.shouldSendIntersectionChanges_ || !this.iframeLayoutBox_) {
        return;
      }
      var rootBounds = this.getViewport().getRect();
      var change = _srcIntersectionObserver.getIntersectionChangeEntry(_srcTimer.timer.now(), rootBounds, this.iframeLayoutBox_);
      _src3pFrame.postMessage(this.iframe_, 'intersection', { changes: [change] });
    };

    /**
     * Activates the fallback if the ad reports that the ad slot cannot
     * be filled.
     * @private
     */

    AmpAd.prototype.noContentHandler_ = function noContentHandler_() {
      this.element.removeChild(this.iframe_);
      this.toggleFallback(true);
    };

    return AmpAd;
  })(_srcBaseElement.BaseElement);

  _srcCustomElement.registerElement(win, 'amp-ad', AmpAd);
}

},{"../ads/_prefetch":1,"../src/3p-frame":51,"../src/asserts":55,"../src/base-element":56,"../src/custom-element":60,"../src/event-helper":67,"../src/intersection-observer":73,"../src/layout":75,"../src/timer":100}],4:[function(require,module,exports){
exports.__esModule = true;
exports.installImg = installImg;
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

var _srcBaseElement = require('../src/base-element');

var _srcLayout = require('../src/layout');

var _srcEventHelper = require('../src/event-helper');

var _srcSrcset = require('../src/srcset');

var _srcCustomElement = require('../src/custom-element');

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installImg(win) {
  var AmpImg = (function (_BaseElement) {
    babelHelpers.inherits(AmpImg, _BaseElement);

    function AmpImg() {
      babelHelpers.classCallCheck(this, AmpImg);

      _BaseElement.apply(this, arguments);
    }

    /** @override */

    AmpImg.prototype.isLayoutSupported = function isLayoutSupported(layout) {
      return _srcLayout.isLayoutSizeDefined(layout);
    };

    /** @override */

    AmpImg.prototype.buildCallback = function buildCallback() {
      /** @private @const {!Element} */
      this.img_ = new Image();

      if (this.element.id) {
        this.img_.setAttribute('amp-img-id', this.element.id);
      }
      this.propagateAttributes(['alt'], this.img_);
      this.applyFillContent(this.img_, true);

      this.img_.width = _srcLayout.getLengthNumeral(this.element.getAttribute('width'));
      this.img_.height = _srcLayout.getLengthNumeral(this.element.getAttribute('height'));

      this.element.appendChild(this.img_);

      /** @private @const {!Srcset} */
      this.srcset_ = _srcSrcset.parseSrcset(this.element.getAttribute('srcset') || this.element.getAttribute('src'));
    };

    /** @override */

    AmpImg.prototype.prerenderAllowed = function prerenderAllowed() {
      return true;
    };

    /** @override */

    AmpImg.prototype.isRelayoutNeeded = function isRelayoutNeeded() {
      return true;
    };

    /** @override */

    AmpImg.prototype.layoutCallback = function layoutCallback() {
      return this.updateImageSrc_();
    };

    /**
     * @return {!Promise}
     * @private
     */

    AmpImg.prototype.updateImageSrc_ = function updateImageSrc_() {
      if (this.getLayoutWidth() <= 0) {
        return Promise.resolve();
      }
      var src = this.srcset_.select(this.getLayoutWidth(), this.getDpr()).url;
      if (src == this.img_.getAttribute('src')) {
        return Promise.resolve();
      }
      this.img_.setAttribute('src', src);

      return _srcEventHelper.loadPromise(this.img_);
    };

    return AmpImg;
  })(_srcBaseElement.BaseElement);

  ;

  _srcCustomElement.registerElement(win, 'amp-img', AmpImg);
}

},{"../src/base-element":56,"../src/custom-element":60,"../src/event-helper":67,"../src/layout":75,"../src/srcset":95}],5:[function(require,module,exports){
exports.__esModule = true;
exports.installPixel = installPixel;
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

var _srcBaseElement = require('../src/base-element');

var _srcLayout = require('../src/layout');

var _srcUrlReplacements = require('../src/url-replacements');

var _srcAsserts = require('../src/asserts');

var _srcCustomElement = require('../src/custom-element');

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installPixel(win) {
  var AmpPixel = (function (_BaseElement) {
    babelHelpers.inherits(AmpPixel, _BaseElement);

    function AmpPixel() {
      babelHelpers.classCallCheck(this, AmpPixel);

      _BaseElement.apply(this, arguments);
    }

    /** @override */

    AmpPixel.prototype.isLayoutSupported = function isLayoutSupported(layout) {
      return layout == _srcLayout.Layout.FIXED;
    };

    /** @override */

    AmpPixel.prototype.buildCallback = function buildCallback() {
      // Remove user defined size. Pixels should always be the default size.
      this.element.style.width = '';
      this.element.style.height = '';
      // Consider the element invisible.
      this.element.setAttribute('aria-hidden', 'true');
    };

    /** @override */

    AmpPixel.prototype.layoutCallback = function layoutCallback() {
      var _this = this;

      var src = this.element.getAttribute('src');
      return _srcUrlReplacements.urlReplacementsFor(this.getWin()).expand(this.assertSource(src)).then(function (src) {
        var image = new Image();
        image.src = src;
        image.width = 1;
        image.height = 1;
        // Make it take zero space
        _this.element.style.width = 0;
        _this.element.appendChild(image);
      });
    };

    AmpPixel.prototype.assertSource = function assertSource(src) {
      _srcAsserts.assert(/^(https\:\/\/|\/\/)/i.test(src), 'The <amp-pixel> src attribute must start with ' + '"https://" or "//". Invalid value: ' + src);
      return src;
    };

    return AmpPixel;
  })(_srcBaseElement.BaseElement);

  ;

  _srcCustomElement.registerElement(win, 'amp-pixel', AmpPixel);
}

},{"../src/asserts":55,"../src/base-element":56,"../src/custom-element":60,"../src/layout":75,"../src/url-replacements":101}],6:[function(require,module,exports){
exports.__esModule = true;
exports.installVideo = installVideo;
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

var _srcBaseElement = require('../src/base-element');

var _srcUrl = require('../src/url');

var _srcLayout = require('../src/layout');

var _srcEventHelper = require('../src/event-helper');

var _srcCustomElement = require('../src/custom-element');

var _srcStyle = require('../src/style');

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installVideo(win) {
  var AmpVideo = (function (_BaseElement) {
    babelHelpers.inherits(AmpVideo, _BaseElement);

    function AmpVideo() {
      babelHelpers.classCallCheck(this, AmpVideo);

      _BaseElement.apply(this, arguments);
    }

    /** @override */

    AmpVideo.prototype.isLayoutSupported = function isLayoutSupported(layout) {
      return _srcLayout.isLayoutSizeDefined(layout);
    };

    /** @override */

    AmpVideo.prototype.layoutCallback = function layoutCallback() {
      var width = this.element.getAttribute('width');
      var height = this.element.getAttribute('height');
      var video = document.createElement('video');
      if (!video.play) {
        this.toggleFallback(true);
        return Promise.resolve();
      }

      if (this.element.getAttribute('src')) {
        _srcUrl.assertHttpsUrl(this.element.getAttribute('src'), this.element);
      }
      this.propagateAttributes(['src', 'controls', 'autoplay', 'muted', 'loop', 'poster'], video);
      video.width = _srcLayout.getLengthNumeral(width);
      video.height = _srcLayout.getLengthNumeral(height);
      this.applyFillContent(video, true);
      this.getRealChildNodes().forEach(function (child) {
        if (child.getAttribute && child.getAttribute('src')) {
          _srcUrl.assertHttpsUrl(child.getAttribute('src'), child);
        }
        video.appendChild(child);
      });
      this.element.appendChild(video);

      /** @private {?HTMLVideoElement} */
      this.video_ = video;
      _srcStyle.setStyles(video, { visibility: 'hidden' });
      return _srcEventHelper.loadPromise(video).then(function () {
        _srcStyle.setStyles(video, { visibility: '' });
      });
    };

    /** @override */

    AmpVideo.prototype.documentInactiveCallback = function documentInactiveCallback() {
      if (this.video_) {
        this.video_.pause();
      }
      // No need to do layout later - user action will be expect to resume
      // the playback.
      return false;
    };

    return AmpVideo;
  })(_srcBaseElement.BaseElement);

  _srcCustomElement.registerElement(win, 'amp-video', AmpVideo);
}

},{"../src/base-element":56,"../src/custom-element":60,"../src/event-helper":67,"../src/layout":75,"../src/style":97,"../src/url":102}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],9:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":24}],10:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":11,"./$.wks":46}],11:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],12:[function(require,module,exports){
var core = module.exports = {version: '1.2.1'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],13:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":8}],14:[function(require,module,exports){
var global     = require('./$.global')
  , core       = require('./$.core')
  , hide       = require('./$.hide')
  , $redef     = require('./$.redef')
  , PROTOTYPE  = 'prototype';
var ctx = function(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
};
var $def = function(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)$redef(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
module.exports = $def;
},{"./$.core":12,"./$.global":18,"./$.hide":20,"./$.redef":33}],15:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":18,"./$.is-object":24}],16:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],17:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":9,"./$.ctx":13,"./$.is-array-iter":23,"./$.iter-call":25,"./$.to-length":44,"./core.get-iterator-method":47}],18:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var UNDEFINED = 'undefined';
var global = module.exports = typeof window != UNDEFINED && window.Math == Math
  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],19:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],20:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":28,"./$.property-desc":32,"./$.support-desc":40}],21:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":18}],22:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],23:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./$.iterators')
  , ITERATOR  = require('./$.wks')('iterator');
module.exports = function(it){
  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
};
},{"./$.iterators":27,"./$.wks":46}],24:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],25:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":9}],26:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":46}],27:[function(require,module,exports){
module.exports = {};
},{}],28:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],29:[function(require,module,exports){
module.exports = false;
},{}],30:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    if(domain)domain.enter();
    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
}

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":11,"./$.global":18,"./$.task":42}],31:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":33}],32:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],33:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if(!('name' in val))val.name = key;
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":12,"./$.global":18,"./$.hide":20,"./$.uid":45}],34:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],35:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line no-proto
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":28,"./$.an-object":9,"./$.ctx":13,"./$.is-object":24}],36:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":18}],37:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],38:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if(require('./$.support-desc') && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":28,"./$.support-desc":40,"./$.wks":46}],39:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],40:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":16}],41:[function(require,module,exports){
var has  = require('./$.has')
  , hide = require('./$.hide')
  , TAG  = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
};
},{"./$.has":19,"./$.hide":20,"./$.wks":46}],42:[function(require,module,exports){
'use strict';
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":11,"./$.ctx":13,"./$.dom-create":15,"./$.global":18,"./$.html":21,"./$.invoke":22}],43:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],44:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":43}],45:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],46:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || require('./$.uid'))('Symbol.' + name));
};
},{"./$.global":18,"./$.shared":36,"./$.uid":45}],47:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};
},{"./$.classof":10,"./$.core":12,"./$.iterators":27,"./$.wks":46}],48:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $def = require('./$.def');

$def($def.S, 'Math', {sign: require('./$.sign')});
},{"./$.def":14,"./$.sign":37}],49:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $def       = require('./$.def')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same')
  , species    = require('./$.species')
  , SPECIES    = require('./$.wks')('species')
  , RECORD     = require('./$.uid')('record')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.support-desc')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var isPromise = function(it){
  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
};
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    this[RECORD] = record;
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = anObject(anObject(this).constructor)[SPECIES];
      var react = {
        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
        fail: typeof onRejected == 'function'  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = res;
        react.rej = rej;
      });
      aFunction(react.res);
      aFunction(react.rej);
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
require('./$.tag')(P, PROMISE);
species(P);
species(Wrapper = require('./$.core')[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new this(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":28,"./$.a-function":8,"./$.an-object":9,"./$.classof":10,"./$.core":12,"./$.ctx":13,"./$.def":14,"./$.for-of":17,"./$.global":18,"./$.is-object":24,"./$.iter-detect":26,"./$.library":29,"./$.microtask":30,"./$.mix":31,"./$.same":34,"./$.set-proto":35,"./$.species":38,"./$.strict-new":39,"./$.support-desc":40,"./$.tag":41,"./$.uid":45,"./$.wks":46}],50:[function(require,module,exports){
/*!
Copyright (C) 2014-2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(window, document, Object, REGISTER_ELEMENT){'use strict';

// in case it's there or already patched
if (REGISTER_ELEMENT in document) return;

// DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
// THIS IS A PROJECT BASED ON A BUILD SYSTEM
// THIS FILE IS JUST WRAPPED UP RESULTING IN
// build/document-register-element.js
// and its .max.js counter part

var
  // IE < 11 only + old WebKit for attributes + feature detection
  EXPANDO_UID = '__' + REGISTER_ELEMENT + (Math.random() * 10e4 >> 0),

  // shortcuts and costants
  ATTACHED = 'attached',
  DETACHED = 'detached',
  EXTENDS = 'extends',
  ADDITION = 'ADDITION',
  MODIFICATION = 'MODIFICATION',
  REMOVAL = 'REMOVAL',
  DOM_ATTR_MODIFIED = 'DOMAttrModified',
  DOM_CONTENT_LOADED = 'DOMContentLoaded',
  DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
  PREFIX_TAG = '<',
  PREFIX_IS = '=',

  // valid and invalid node names
  validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
  invalidNames = [
    'ANNOTATION-XML',
    'COLOR-PROFILE',
    'FONT-FACE',
    'FONT-FACE-SRC',
    'FONT-FACE-URI',
    'FONT-FACE-FORMAT',
    'FONT-FACE-NAME',
    'MISSING-GLYPH'
  ],

  // registered types and their prototypes
  types = [],
  protos = [],

  // to query subnodes
  query = '',

  // html shortcut used to feature detect
  documentElement = document.documentElement,

  // ES5 inline helpers || basic patches
  indexOf = types.indexOf || function (v) {
    for(var i = this.length; i-- && this[i] !== v;){}
    return i;
  },

  // other helpers / shortcuts
  OP = Object.prototype,
  hOP = OP.hasOwnProperty,
  iPO = OP.isPrototypeOf,

  defineProperty = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  gOPN = Object.getOwnPropertyNames,
  gPO = Object.getPrototypeOf,
  sPO = Object.setPrototypeOf,

  // jshint proto: true
  hasProto = !!Object.__proto__,

  // used to create unique instances
  create = Object.create || function Bridge(proto) {
    // silly broken polyfill probably ever used but short enough to work
    return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
  },

  // will set the prototype if possible
  // or copy over all properties
  setPrototype = sPO || (
    hasProto ?
      function (o, p) {
        o.__proto__ = p;
        return o;
      } : (
    (gOPN && gOPD) ?
      (function(){
        function setProperties(o, p) {
          for (var
            key,
            names = gOPN(p),
            i = 0, length = names.length;
            i < length; i++
          ) {
            key = names[i];
            if (!hOP.call(o, key)) {
              defineProperty(o, key, gOPD(p, key));
            }
          }
        }
        return function (o, p) {
          do {
            setProperties(o, p);
          } while ((p = gPO(p)) && !iPO.call(p, o));
          return o;
        };
      }()) :
      function (o, p) {
        for (var key in p) {
          o[key] = p[key];
        }
        return o;
      }
  )),

  // DOM shortcuts and helpers, if any

  MutationObserver = window.MutationObserver ||
                     window.WebKitMutationObserver,

  HTMLElementPrototype = (
    window.HTMLElement ||
    window.Element ||
    window.Node
  ).prototype,

  IE8 = !iPO.call(HTMLElementPrototype, documentElement),

  isValidNode = IE8 ?
    function (node) {
      return node.nodeType === 1;
    } :
    function (node) {
      return iPO.call(HTMLElementPrototype, node);
    },

  targets = IE8 && [],

  cloneNode = HTMLElementPrototype.cloneNode,
  setAttribute = HTMLElementPrototype.setAttribute,
  removeAttribute = HTMLElementPrototype.removeAttribute,

  // replaced later on
  createElement = document.createElement,

  // shared observer for all attributes
  attributesObserver = MutationObserver && {
    attributes: true,
    characterData: true,
    attributeOldValue: true
  },

  // useful to detect only if there's no MutationObserver
  DOMAttrModified = MutationObserver || function(e) {
    doesNotSupportDOMAttrModified = false;
    documentElement.removeEventListener(
      DOM_ATTR_MODIFIED,
      DOMAttrModified
    );
  },

  // will both be used to make DOMNodeInserted asynchronous
  asapQueue,
  rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (fn) { setTimeout(fn, 10); },

  // internal flags
  setListener = false,
  doesNotSupportDOMAttrModified = true,
  dropDomContentLoaded = true,

  // needed for the innerHTML helper
  notFromInnerHTMLHelper = true,

  // optionally defined later on
  onSubtreeModified,
  callDOMAttrModified,
  getAttributesMirror,
  observer,

  // based on setting prototype capability
  // will check proto or the expando attribute
  // in order to setup the node once
  patchIfNotAlready,
  patch
;

if (sPO || hasProto) {
    patchIfNotAlready = function (node, proto) {
      if (!iPO.call(proto, node)) {
        setupNode(node, proto);
      }
    };
    patch = setupNode;
} else {
    patchIfNotAlready = function (node, proto) {
      if (!node[EXPANDO_UID]) {
        node[EXPANDO_UID] = Object(true);
        setupNode(node, proto);
      }
    };
    patch = patchIfNotAlready;
}
if (IE8) {
  doesNotSupportDOMAttrModified = false;
  (function (){
    var
      descriptor = gOPD(HTMLElementPrototype, 'addEventListener'),
      addEventListener = descriptor.value,
      patchedRemoveAttribute = function (name) {
        var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
        e.attrName = name;
        e.prevValue = this.getAttribute(name);
        e.newValue = null;
        e[REMOVAL] = e.attrChange = 2;
        removeAttribute.call(this, name);
        this.dispatchEvent(e);
      },
      patchedSetAttribute = function (name, value) {
        var
          had = this.hasAttribute(name),
          old = had && this.getAttribute(name),
          e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
        ;
        setAttribute.call(this, name, value);
        e.attrName = name;
        e.prevValue = had ? old : null;
        e.newValue = value;
        if (had) {
          e[MODIFICATION] = e.attrChange = 1;
        } else {
          e[ADDITION] = e.attrChange = 0;
        }
        this.dispatchEvent(e);
      },
      onPropertyChange = function (e) {
        // jshint eqnull:true
        var
          node = e.currentTarget,
          superSecret = node[EXPANDO_UID],
          propertyName = e.propertyName,
          event
        ;
        if (superSecret.hasOwnProperty(propertyName)) {
          superSecret = superSecret[propertyName];
          event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
          event.attrName = superSecret.name;
          event.prevValue = superSecret.value || null;
          event.newValue = (superSecret.value = node[propertyName] || null);
          if (event.prevValue == null) {
            event[ADDITION] = event.attrChange = 0;
          } else {
            event[MODIFICATION] = event.attrChange = 1;
          }
          node.dispatchEvent(event);
        }
      }
    ;
    descriptor.value = function (type, handler, capture) {
      if (
        type === DOM_ATTR_MODIFIED &&
        this.attributeChangedCallback &&
        this.setAttribute !== patchedSetAttribute
      ) {
        this[EXPANDO_UID] = {
          className: {
            name: 'class',
            value: this.className
          }
        };
        this.setAttribute = patchedSetAttribute;
        this.removeAttribute = patchedRemoveAttribute;
        addEventListener.call(this, 'propertychange', onPropertyChange);
      }
      addEventListener.call(this, type, handler, capture);
    };
    defineProperty(HTMLElementPrototype, 'addEventListener', descriptor);
  }());
} else if (!MutationObserver) {
  documentElement.addEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
  documentElement.setAttribute(EXPANDO_UID, 1);
  documentElement.removeAttribute(EXPANDO_UID);
  if (doesNotSupportDOMAttrModified) {
    onSubtreeModified = function (e) {
      var
        node = this,
        oldAttributes,
        newAttributes,
        key
      ;
      if (node === e.target) {
        oldAttributes = node[EXPANDO_UID];
        node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
        for (key in newAttributes) {
          if (!(key in oldAttributes)) {
            // attribute was added
            return callDOMAttrModified(
              0,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              ADDITION
            );
          } else if (newAttributes[key] !== oldAttributes[key]) {
            // attribute was changed
            return callDOMAttrModified(
              1,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              MODIFICATION
            );
          }
        }
        // checking if it has been removed
        for (key in oldAttributes) {
          if (!(key in newAttributes)) {
            // attribute removed
            return callDOMAttrModified(
              2,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              REMOVAL
            );
          }
        }
      }
    };
    callDOMAttrModified = function (
      attrChange,
      currentTarget,
      attrName,
      prevValue,
      newValue,
      action
    ) {
      var e = {
        attrChange: attrChange,
        currentTarget: currentTarget,
        attrName: attrName,
        prevValue: prevValue,
        newValue: newValue
      };
      e[action] = attrChange;
      onDOMAttrModified(e);
    };
    getAttributesMirror = function (node) {
      for (var
        attr, name,
        result = {},
        attributes = node.attributes,
        i = 0, length = attributes.length;
        i < length; i++
      ) {
        attr = attributes[i];
        name = attr.name;
        if (name !== 'setAttribute') {
          result[name] = attr.value;
        }
      }
      return result;
    };
  }
}

function loopAndVerify(list, action) {
  for (var i = 0, length = list.length; i < length; i++) {
    verifyAndSetupAndAction(list[i], action);
  }
}

function loopAndSetup(list) {
  for (var i = 0, length = list.length, node; i < length; i++) {
    node = list[i];
    patch(node, protos[getTypeIndex(node)]);
  }
}

function executeAction(action) {
  return function (node) {
    if (isValidNode(node)) {
      verifyAndSetupAndAction(node, action);
      loopAndVerify(
        node.querySelectorAll(query),
        action
      );
    }
  };
}

function getTypeIndex(target) {
  var
    is = target.getAttribute('is'),
    nodeName = target.nodeName.toUpperCase(),
    i = indexOf.call(
      types,
      is ?
          PREFIX_IS + is.toUpperCase() :
          PREFIX_TAG + nodeName
    )
  ;
  return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
}

function isInQSA(name, type) {
  return -1 < query.indexOf(name + '[is="' + type + '"]');
}

function onDOMAttrModified(e) {
  var
    node = e.currentTarget,
    attrChange = e.attrChange,
    attrName = e.attrName,
    target = e.target
  ;
  if (notFromInnerHTMLHelper &&
      (!target || target === node) &&
      node.attributeChangedCallback &&
      attrName !== 'style') {
    node.attributeChangedCallback(
      attrName,
      attrChange === e[ADDITION] ? null : e.prevValue,
      attrChange === e[REMOVAL] ? null : e.newValue
    );
  }
}

function onDOMNode(action) {
  var executor = executeAction(action);
  return function (e) {
    asapQueue.push(executor, e.target);
  };
}

function onReadyStateChange(e) {
  if (dropDomContentLoaded) {
    dropDomContentLoaded = false;
    e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
  }
  loopAndVerify(
    (e.target || document).querySelectorAll(query),
    e.detail === DETACHED ? DETACHED : ATTACHED
  );
  if (IE8) purge();
}

function patchedSetAttribute(name, value) {
  // jshint validthis:true
  var self = this;
  setAttribute.call(self, name, value);
  onSubtreeModified.call(self, {target: self});
}

function setupNode(node, proto) {
  setPrototype(node, proto);
  if (observer) {
    observer.observe(node, attributesObserver);
  } else {
    if (doesNotSupportDOMAttrModified) {
      node.setAttribute = patchedSetAttribute;
      node[EXPANDO_UID] = getAttributesMirror(node);
      node.addEventListener(DOM_SUBTREE_MODIFIED, onSubtreeModified);
    }
    node.addEventListener(DOM_ATTR_MODIFIED, onDOMAttrModified);
  }
  if (node.createdCallback && notFromInnerHTMLHelper) {
    node.created = true;
    node.createdCallback();
    node.created = false;
  }
}

function purge() {
  for (var
    node,
    i = 0,
    length = targets.length;
    i < length; i++
  ) {
    node = targets[i];
    if (!documentElement.contains(node)) {
      targets.splice(i, 1);
      verifyAndSetupAndAction(node, DETACHED);
    }
  }
}

function verifyAndSetupAndAction(node, action) {
  var
    fn,
    i = getTypeIndex(node)
  ;
  if (-1 < i) {
    patchIfNotAlready(node, protos[i]);
    i = 0;
    if (action === ATTACHED && !node[ATTACHED]) {
      node[DETACHED] = false;
      node[ATTACHED] = true;
      i = 1;
      if (IE8 && indexOf.call(targets, node) < 0) {
        targets.push(node);
      }
    } else if (action === DETACHED && !node[DETACHED]) {
      node[ATTACHED] = false;
      node[DETACHED] = true;
      i = 1;
    }
    if (i && (fn = node[action + 'Callback'])) fn.call(node);
  }
}

// set as enumerable, writable and configurable
document[REGISTER_ELEMENT] = function registerElement(type, options) {
  upperType = type.toUpperCase();
  if (!setListener) {
    // only first time document.registerElement is used
    // we need to set this listener
    // setting it by default might slow down for no reason
    setListener = true;
    if (MutationObserver) {
      observer = (function(attached, detached){
        function checkEmAll(list, callback) {
          for (var i = 0, length = list.length; i < length; callback(list[i++])){}
        }
        return new MutationObserver(function (records) {
          for (var
            current, node,
            i = 0, length = records.length; i < length; i++
          ) {
            current = records[i];
            if (current.type === 'childList') {
              checkEmAll(current.addedNodes, attached);
              checkEmAll(current.removedNodes, detached);
            } else {
              node = current.target;
              if (notFromInnerHTMLHelper &&
                  node.attributeChangedCallback &&
                  current.attributeName !== 'style') {
                node.attributeChangedCallback(
                  current.attributeName,
                  current.oldValue,
                  node.getAttribute(current.attributeName)
                );
              }
            }
          }
        });
      }(executeAction(ATTACHED), executeAction(DETACHED)));
      observer.observe(
        document,
        {
          childList: true,
          subtree: true
        }
      );
    } else {
      asapQueue = [];
      rAF(function ASAP() {
        while (asapQueue.length) {
          asapQueue.shift().call(
            null, asapQueue.shift()
          );
        }
        rAF(ASAP);
      });
      document.addEventListener('DOMNodeInserted', onDOMNode(ATTACHED));
      document.addEventListener('DOMNodeRemoved', onDOMNode(DETACHED));
    }

    document.addEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    document.addEventListener('readystatechange', onReadyStateChange);

    document.createElement = function (localName, typeExtension) {
      var
        node = createElement.apply(document, arguments),
        name = '' + localName,
        i = indexOf.call(
          types,
          (typeExtension ? PREFIX_IS : PREFIX_TAG) +
          (typeExtension || name).toUpperCase()
        ),
        setup = -1 < i
      ;
      if (typeExtension) {
        node.setAttribute('is', typeExtension = typeExtension.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), typeExtension);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    };

    HTMLElementPrototype.cloneNode = function (deep) {
      var
        node = cloneNode.call(this, !!deep),
        i = getTypeIndex(node)
      ;
      if (-1 < i) patch(node, protos[i]);
      if (deep) loopAndSetup(node.querySelectorAll(query));
      return node;
    };
  }

  if (-2 < (
    indexOf.call(types, PREFIX_IS + upperType) +
    indexOf.call(types, PREFIX_TAG + upperType)
  )) {
    throw new Error('A ' + type + ' type is already registered');
  }

  if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
    throw new Error('The type ' + type + ' is invalid');
  }

  var
    constructor = function () {
      return extending ?
        document.createElement(nodeName, upperType) :
        document.createElement(nodeName);
    },
    opt = options || OP,
    extending = hOP.call(opt, EXTENDS),
    nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
    i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1,
    upperType
  ;

  query = query.concat(
    query.length ? ',' : '',
    extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
  );

  constructor.prototype = (
    protos[i] = hOP.call(opt, 'prototype') ?
      opt.prototype :
      create(HTMLElementPrototype)
  );

  loopAndVerify(
    document.querySelectorAll(query),
    ATTACHED
  );

  return constructor;
};

}(window, document, Object, 'registerElement'));
},{}],51:[function(require,module,exports){
exports.__esModule = true;
exports.getIframe = getIframe;
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.postMessage = postMessage;
exports.addDataAndJsonAttributes_ = addDataAndJsonAttributes_;
exports.prefetchBootstrap = prefetchBootstrap;
exports.getBootstrapBaseUrl = getBootstrapBaseUrl;
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

var _srcLayout = require('../src/layout');

var _service = require('./service');

var _documentInfo = require('./document-info');

var _mode = require('./mode');

var _preconnect = require('./preconnect');

var _string = require('./string');

var _url = require('./url');

/** @type {!Object<string,number>} Number of 3p frames on the for that type. */
var count = {};

/**
 * Produces the attributes for the ad template.
 * @param {!Window} parentWindow
 * @param {!Element} element
 * @param {string=} opt_type
 * @return {!Object} Contains
 *     - type, width, height, src attributes of <amp-ad> tag. These have
 *       precedence over the data- attributes.
 *     - data-* attributes of the <amp-ad> tag with the "data-" removed.
 *     - A _context object for internal use.
 */
function getFrameAttributes(parentWindow, element, opt_type) {
  var width = element.getAttribute('width');
  var height = element.getAttribute('height');
  var type = opt_type || element.getAttribute('type');
  _asserts.assert(type, 'Attribute type required for <amp-ad>: %s', element);
  var attributes = {};
  // Do these first, as the other attributes have precedence.
  addDataAndJsonAttributes_(element, attributes);
  attributes.width = _srcLayout.getLengthNumeral(width);
  attributes.height = _srcLayout.getLengthNumeral(height);
  var box = element.getLayoutBox();
  attributes.initialWindowWidth = box.width;
  attributes.initialWindowHeight = box.height;
  attributes.type = type;
  var docInfo = _documentInfo.documentInfoFor(parentWindow);
  attributes._context = {
    referrer: parentWindow.document.referrer,
    canonicalUrl: docInfo.canonicalUrl,
    pageViewId: docInfo.pageViewId,
    location: {
      href: parentWindow.location.href
    },
    mode: _mode.getMode()
  };
  var adSrc = element.getAttribute('src');
  if (adSrc) {
    attributes.src = adSrc;
  }
  return attributes;
}

/**
 * Creates the iframe for the embed. Applies correct size and passes the embed
 * attributes to the frame via JSON inside the fragment.
 * @param {!Window} parentWindow
 * @param {!Element} element
 * @param {string=} opt_type
 * @return {!Element} The iframe.
 */

function getIframe(parentWindow, element, opt_type) {
  var attributes = getFrameAttributes(parentWindow, element, opt_type);
  var iframe = document.createElement('iframe');
  if (!count[attributes.type]) {
    count[attributes.type] = 0;
  }
  iframe.name = 'frame_' + attributes.type + '_' + count[attributes.type]++;

  // Pass ad attributes to iframe via the fragment.
  var src = getBootstrapBaseUrl(parentWindow) + '#' + JSON.stringify(attributes);

  iframe.src = src;
  iframe.ampLocation = _url.parseUrl(src);
  iframe.width = attributes.width;
  iframe.height = attributes.height;
  iframe.style.border = 'none';
  iframe.setAttribute('scrolling', 'no');
  iframe.onload = function () {
    // Chrome does not reflect the iframe readystate.
    this.readyState = 'complete';
  };
  return iframe;
}

/**
 * Allows listening for message from the iframe. Returns an unlisten
 * function to remove the listener.
 *
 * @param {!Element} iframe
 * @param {string} typeOfMessage
 * @param {function(!Object)} callback Called when a message of this type
 *     arrives for this iframe.
 * @return {!UnlistenDef}
 */

function listen(iframe, typeOfMessage, callback) {
  var win = iframe.ownerDocument.defaultView;
  var origin = iframe.ampLocation.origin;
  var listener = function (event) {
    if (event.origin != origin) {
      return;
    }
    if (event.source != iframe.contentWindow) {
      return;
    }
    if (!event.data || event.data.sentinel != 'amp-3p') {
      return;
    }
    if (event.data.type != typeOfMessage) {
      return;
    }
    callback(event.data);
  };

  win.addEventListener('message', listener);

  return function () {
    win.removeEventListener('message', listener);
  };
}

/**
 * Allows listening for a message from the iframe and then removes the listener
 *
 * @param {!Element} iframe
 * @param {string} typeOfMessage
 * @param {function(!Object)} callback Called when a message of this type
 *     arrives for this iframe.
 * @return {!UnlistenDef}
 */

function listenOnce(iframe, typeOfMessage, callback) {
  var unlisten = listen(iframe, typeOfMessage, function (data) {
    unlisten();
    return callback(data);
  });
  return unlisten;
}

/**
 * Posts a message to the iframe;
 * @param {!Element} element The 3p iframe.
 * @param {string} type Type of the message.
 * @param {!Object} object Message payload.
 */

function postMessage(iframe, type, object) {
  object.type = type;
  object.sentinel = 'amp-3p';
  iframe.contentWindow. /*OK*/postMessage(object, iframe.ampLocation.origin);
}

/**
 * Copies data- attributes from the element into the attributes object.
 * Removes the data- from the name and capitalizes after -. If there
 * is an attribute called json, parses the JSON and adds it to the
 * attributes.
 * @param {!Element} element
 * @param {!Object} attributes The destination.
 * visibleForTesting
 */

function addDataAndJsonAttributes_(element, attributes) {
  for (var i = 0; i < element.attributes.length; i++) {
    var attr = element.attributes[i];
    if (attr.name.indexOf('data-') != 0) {
      continue;
    }
    attributes[_string.dashToCamelCase(attr.name.substr(5))] = attr.value;
  }
  var json = element.getAttribute('json');
  if (json) {
    var obj = undefined;
    try {
      obj = JSON.parse(json);
    } catch (e) {
      _asserts.assert(false, 'Error parsing JSON in json attribute in element %s', element);
    }
    for (var key in obj) {
      attributes[key] = obj[key];
    }
  }
}

/**
 * Prefetches URLs related to the bootstrap iframe.
 * @param {!Window} parentWindow
 * @return {string}
 */

function prefetchBootstrap(window) {
  var url = getBootstrapBaseUrl(window);
  var preconnect = _preconnect.preconnectFor(window);
  preconnect.prefetch(url);
  // While the URL may point to a custom domain, this URL will always be
  // fetched by it.
  preconnect.prefetch('https://3p.ampproject.net/1453326962147/f.js');
}

/**
 * Returns the base URL for 3p bootstrap iframes.
 * @param {!Window} parentWindow
 * @return {string}
 * @visibleForTesting
 */

function getBootstrapBaseUrl(parentWindow) {
  return _service.getService(window, 'bootstrapBaseUrl', function () {
    return getCustomBootstrapBaseUrl(parentWindow) || getDefaultBootstrapBaseUrl(parentWindow);
  });
}

/**
 * Returns the default base URL for 3p bootstrap iframes.
 * @param {!Window} parentWindow
 * @return {string}
 */
function getDefaultBootstrapBaseUrl(parentWindow) {
  var url = 'https://3p.ampproject.net/1453326962147/frame.html';
  if (_mode.getMode().localDev) {
    url = 'http://ads.localhost:' + parentWindow.location.port + '/dist.3p/current' + (_mode.getMode().minified ? '-min/frame' : '/frame.max') + '.html';
  }
  return url;
}

/**
 * Returns the custom base URL for 3p bootstrap iframes if it exists.
 * Otherwise null.
 * @param {!Window} parentWindow
 * @return {?string}
 */
function getCustomBootstrapBaseUrl(parentWindow) {
  var meta = parentWindow.document.querySelector('meta[name="amp-3p-iframe-src"]');
  if (!meta) {
    return null;
  }
  var url = _url.assertHttpsUrl(meta.getAttribute('content'), meta);
  _asserts.assert(url.indexOf('?') == -1, '3p iframe url must not include query string %s in element %s.', url, meta);
  // This is not a security primitive, we just don't want this to happen in
  // practice. People could still redirect to the same origin, but they cannot
  // redirect to the proxy origin which is the important one.
  _asserts.assert(_url.parseUrl(url).origin != _url.parseUrl(parentWindow.location.href).origin, '3p iframe url must not be on the same origin as the current document ' + '%s in element %s.', url, meta);
  return url + '?1453326962147';
}

},{"../src/layout":75,"./asserts":55,"./document-info":62,"./mode":78,"./preconnect":84,"./service":88,"./string":96,"./url":102}],52:[function(require,module,exports){
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

// Entry point into AMP for compilation with babel. Just loads amp.js and
// Babel's helpers.

require('../third_party/babel/custom-babel-helpers');

require('./amp');

},{"../third_party/babel/custom-babel-helpers":108,"./amp":54}],53:[function(require,module,exports){
exports.__esModule = true;
exports.installCoreServices = installCoreServices;
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

var _serviceActionImpl = require('./service/action-impl');

var _serviceHistoryImpl = require('./service/history-impl');

var _serviceViewerImpl = require('./service/viewer-impl');

var _serviceViewportImpl = require('./service/viewport-impl');

var _serviceVsyncImpl = require('./service/vsync-impl');

/**
 * Services that can be assumed are always available in AMP.
 * They are installed in amp.js very early in the application lifecyle.
 * @param {!Window} window
 */

function installCoreServices(window) {
  _serviceViewerImpl.installViewerService(window);
  _serviceViewportImpl.installViewportService(window);
  _serviceHistoryImpl.installHistoryService(window);
  _serviceVsyncImpl.installVsyncService(window);
  _serviceActionImpl.installActionService(window);
}

},{"./service/action-impl":89,"./service/history-impl":90,"./service/viewer-impl":91,"./service/viewport-impl":92,"./service/vsync-impl":93}],54:[function(require,module,exports){
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

require('./polyfills');

var _pullToRefresh = require('./pull-to-refresh');

var _performance = require('./performance');

var _template = require('./template');

var _ampCoreService = require('./amp-core-service');

var _builtinsAmpAd = require('../builtins/amp-ad');

var _documentClick = require('./document-click');

var _builtinsAmpImg = require('../builtins/amp-img');

var _builtinsAmpVideo = require('../builtins/amp-video');

var _builtinsAmpPixel = require('../builtins/amp-pixel');

var _styles = require('./styles');

var _error = require('./error');

var _customElement = require('./custom-element');

var _runtime = require('./runtime');

var _buildCss = require('../build/css');

var _validatorIntegration = require('./validator-integration');

// We must under all circumstances call makeBodyVisible.
// It is much better to have AMP tags not rendered than having
// a completely blank page.
try {
  (function () {
    // Should happen first.
    _error.installErrorReporting(window); // Also calls makeBodyVisible on errors.
    var perf = _performance.performanceFor(window);

    perf.tick('is');
    _styles.installStyles(document, _buildCss.cssText, function () {
      try {
        _ampCoreService.installCoreServices(window);
        _template.templatesFor(window);

        _builtinsAmpImg.installImg(window);
        _builtinsAmpAd.installAd(window);
        _builtinsAmpPixel.installPixel(window);
        _builtinsAmpVideo.installVideo(window);

        _runtime.adopt(window);
        _customElement.stubElements(window);

        _pullToRefresh.installPullToRefreshBlocker(window);
        _documentClick.installGlobalClickListener(window);

        _validatorIntegration.maybeValidate(window);
      } finally {
        _styles.makeBodyVisible(document);
        perf.tick('e_is');
        // TODO(erwinm): move invocation of the `flush` method when we have the
        // new ticks in place to batch the ticks properly.
        perf.flush();
      }
    }, /* opt_isRuntimeCss */true);
  })();
} catch (e) {
  // In case of an error call this.
  _styles.makeBodyVisible(document);
  throw e;
}

// Output a message to the console and add an attribute to the <html>
// tag to give some information that can be used in error reports.
// (At least by sophisticated users).
if (window.console) {
  (console.info || console.log).call(console, 'Powered by AMP ⚡ HTML – Version 1453326962147');
}
document.documentElement.setAttribute('amp-version', '1453326962147');

},{"../build/css":2,"../builtins/amp-ad":3,"../builtins/amp-img":4,"../builtins/amp-pixel":5,"../builtins/amp-video":6,"./amp-core-service":53,"./custom-element":60,"./document-click":61,"./error":66,"./performance":81,"./polyfills":83,"./pull-to-refresh":85,"./runtime":87,"./styles":98,"./template":99,"./validator-integration":104}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

var _layout = require('./layout');

var _preconnect = require('./preconnect');

var _resources = require('./resources');

var _viewer = require('./viewer');

var _viewport = require('./viewport');

var _vsync = require('./vsync');

/**
 * Base class for all custom element implementations. Instead of inheriting
 * from Element this class has an Element. Among other things this allows
 * switching the element implementation when going from a stub to the full
 * implementation.
 *
 * The base class implements a set of lifecycle methods that are called by
 * the runtime as appropriate. These are mostly based on the custom element
 * lifecycle (See
 * http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
 * and adding AMP style late loading to the mix.
 *
 * The complete lifecycle of custom DOM element is:
 *
 *           ||
 *           || createdCallback
 *           ||
 *           \/
 *    State: <NOT BUILT> <NOT UPGRADED> <NOT ATTACHED>
 *           ||
 *           || upgrade
 *           ||
 *           \/
 *    State: <NOT BUILT> <NOT ATTACHED>
 *           ||
 *           || firstAttachedCallback
 *           ||
 *           \/
 *    State: <NOT BUILT>             <=
 *           ||                       ||
 *           || isReadyToBuild?  ======
 *           ||
 *           \/
 *    State: <NOT BUILT>
 *           ||
 *           || buildCallback
 *           || preconnectCallback may be called N times after this.
 *           ||
 *           \/
 *    State: <BUILT>
 *           ||
 *           || layoutCallback        <==
             || (firstLayoutCompleted)  ||
 *           ||                         ||
 *           \/                         || isRelayoutNeeded?
 *    State: <LAID OUT>                 ||
 *           ||                         ||
 *           ||                 =========
 *           ||
 *           || viewportCallback
 *           ||
 *           \/
 *    State: <IN VIEWPORT>
 *
 * The preconnectCallback is called when the systems thinks it is good
 * to preconnect to hosts needed by an element. It will never be called
 * before buildCallback and it might be called multiple times including
 * after layoutCallback.
 *
 * Additionally whenever the dimensions of an element might have changed
 * AMP remeasures its dimensions and calls `onLayoutMeasure` on the
 * element instance. This can be used to do additional style calculations
 * without triggering style recalculations.
 *
 * For more details, see {@link custom-element.js}.
 *
 * Each method is called exactly once and overriding them in subclasses
 * is optional.
 */

var BaseElement = (function () {
  /** @param {!AmpElement} element */

  function BaseElement(element) {
    babelHelpers.classCallCheck(this, BaseElement);

    /** @public @const */
    this.element = element;

    /** @package {!Layout} */
    this.layout_ = _layout.Layout.NODISPLAY;

    /** @package {number} */
    this.layoutWidth_ = -1;

    /** @package {boolean} */
    this.inViewport_ = false;

    /** @private {!Object<string, function(!ActionInvocation)>} */
    this.actionMap_ = this.getWin().Object.create(null);

    /** @protected {!Preconnect} */
    this.preconnect = _preconnect.preconnectFor(this.getWin());

    /** @private {!Resources}  */
    this.resources_ = _resources.resourcesFor(this.getWin());
  }

  /** @return {!Layout} */

  BaseElement.prototype.getLayout = function getLayout() {
    return this.layout_;
  };

  /** @protected @return {!Window} */

  BaseElement.prototype.getWin = function getWin() {
    return this.element.ownerDocument.defaultView;
  };

  /** @protected @return {!Vsync} */

  BaseElement.prototype.getVsync = function getVsync() {
    return _vsync.vsyncFor(this.getWin());
  };

  /**
   * Returns the layout width for this element. A `-1` value indicates that the
   * layout is not yet known. A `0` value indicates that the element is not
   * visible.
   * @return {number}
   * @protected
   */

  BaseElement.prototype.getLayoutWidth = function getLayoutWidth() {
    return this.layoutWidth_;
  };

  /**
   * Intended to be implemented by subclasses. Tests whether the element
   * supports the specified layout. By default only Layout.NODISPLAY is
   * supported.
   * @param {!Layout} layout
   * @return {boolean}
   * @protected
   */

  BaseElement.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return layout == _layout.Layout.NODISPLAY;
  };

  /**
   * @return {boolean}
   */

  BaseElement.prototype.isInViewport = function isInViewport() {
    return this.inViewport_;
  };

  /**
   * Called when the element is first created. Note that for element created
   * using createElement this may be before any children are added.
   */

  BaseElement.prototype.createdCallback = function createdCallback() {}
  // Subclasses may override.

  /**
   * Override in subclass to adjust the element when it is being added to the
   * DOM. Could e.g. be used to insert a fallback. Should not typically start
   * loading a resource.
   */
  ;

  BaseElement.prototype.firstAttachedCallback = function firstAttachedCallback() {}
  // Subclasses may override.

  /**
   * Override in subclass to indicate if the element is ready to rebuild its
   * DOM subtree.  If the element can proceed with building the content return
   * "true" and return "false" otherwise. The element may not be ready to build
   * e.g. because its children are not available yet.
   *
   * See {@link buildCallback} for more details.
   *
   * @return {boolean}
   */
  ;

  BaseElement.prototype.isReadyToBuild = function isReadyToBuild() {
    // Subclasses may override.
    return true;
  };

  /**
   * Override in subclass if the element needs to rebuilt its DOM content.
   * Until the element has been rebuilt its content are not shown with an only
   * exception of [placeholder] elements. From the moment the element is created
   * and until the building phase is complete it will have "amp-notbuilt" CSS
   * class set on it.
   *
   * This callback is executed early after the element has been attached to DOM
   * if "isReadyToBuild" callback returns "true" or its called later upon the
   * determination of Resources manager but definitely before first
   * "layoutCallback" is called. Notice that "isReadyToBuild" call is not
   * consulted in the later case.
   */

  BaseElement.prototype.buildCallback = function buildCallback() {}
  // Subclasses may override.

  /**
   * Called by the framework to give the element a chance to preconnect to
   * hosts and prefetch resources it is likely to need. May be called
   * multiple times because connections can time out.
   */
  ;

  BaseElement.prototype.preconnectCallback = function preconnectCallback() {}
  // Subclasses may override.

  /**
   * Sets this element as the owner of the specified element. By setting itself
   * as an owner, the element declares that it will manage the lifecycle of
   * the owned element itself. This element, as an owner, will have to call
   * {@link scheduleLayout}, {@link schedulePreload}, {@link updateInViewport}
   * and similar methods.
   * @param {!Element} element
   */
  ;

  BaseElement.prototype.setAsOwner = function setAsOwner(element) {
    this.resources_.setOwner(element, this.element);
  };

  /**
   * Subclasses can override this method to opt-in into being called to
   * prerender when document itself is not yet visible (pre-render mode).
   * @return {boolean}
   */

  BaseElement.prototype.prerenderAllowed = function prerenderAllowed() {
    return false;
  };

  /**
   * Subclasses can override this method to opt-out of rendering the element
   * when it is not currently visible.
   * @return {boolean}
   */

  BaseElement.prototype.renderOutsideViewport = function renderOutsideViewport() {
    return true;
  };

  /**
   * Subclasses can override this method to opt-in into receiving additional
   * {@link layoutCallback} calls. Note that this method is not consulted for
   * the first layout given that each element must be laid out at least once.
   * @return {boolean}
   */

  BaseElement.prototype.isRelayoutNeeded = function isRelayoutNeeded() {
    return false;
  };

  /**
   * Called when the element should perform layout. At this point the element
   * should load/reload resources associated with it. This method is called
   * by the runtime and cannot be called manually. Returns promise that will
   * complete when loading is considered to be complete.
   *
   * The first layout call is always called. If the subclass is interested in
   * receiving additional callbacks, it has to opt in to do so using
   * {@link isRelayoutNeeded} method.
   *
   * @return {!Promise}
   */

  BaseElement.prototype.layoutCallback = function layoutCallback() {
    return Promise.resolve();
  };

  /**
   * Called to notify the element that the first layout has been successfully
   * completed.
   *
   * The default behavior of this method is to hide the placeholder. However,
   * a subclass may choose to hide placeholder earlier or not hide it at all.
   *
   * @protected
   */

  BaseElement.prototype.firstLayoutCompleted = function firstLayoutCompleted() {
    this.togglePlaceholder(false);
  };

  /**
   * Instructs the resource that it has either entered or exited the visible
   * viewport. Intended to be implemented by actual components.
   * @param {boolean} unusedInViewport
   */

  BaseElement.prototype.viewportCallback = function viewportCallback(unusedInViewport) {};

  /**
   * Requests the resource to stop its activity when the document goes into
   * inactive state. The scope is up to the actual component. Among other
   * things the active playback of video or audio content must be stopped.
   * The component must return `true` if it'd like to later receive
   * {@link layoutCallback} in case document becomes active again.
   * @return {boolean}
   */

  BaseElement.prototype.documentInactiveCallback = function documentInactiveCallback() {
    return false;
  };

  /**
   * Instructs the element that its activation is requested based on some
   * user event. Intended to be implemented by actual components.
   * @param {!ActionInvocation} unusedInvocation
   */

  BaseElement.prototype.activate = function activate(unusedInvocation) {};

  /**
   * Registers the action handler for the method with the specified name.
   * @param {string} method
   * @param {function(!ActionInvocation)} handler
   * @protected
   */

  BaseElement.prototype.registerAction = function registerAction(method, handler) {
    this.actionMap_[method] = handler;
  };

  /**
   * Requests the element to execute the specified method. If method must have
   * been previously registered using {@link registerAction}, otherwise an
   * error is thrown.
   * @param {!ActionInvocation} invocation The invocation data.
   * @param {boolean} unusedDeferred Whether the invocation has had to wait any time
   *   for the element to be resolved, upgraded and built.
   * @final
   * @package
   */

  BaseElement.prototype.executeAction = function executeAction(invocation, unusedDeferred) {
    if (invocation.method == 'activate') {
      this.activate(invocation);
    } else {
      var handler = this.actionMap_[invocation.method];
      if (!handler) {
        throw new Error('Method not found: ' + invocation.method);
      }
      handler(invocation);
    }
  };

  /**
   * Returns the maximum DPR available on this device.
   * @return {number}
   */

  BaseElement.prototype.getMaxDpr = function getMaxDpr() {
    return this.resources_.getMaxDpr();
  };

  /**
   * Returns the most optimal DPR currently recommended.
   * @return {number}
   */

  BaseElement.prototype.getDpr = function getDpr() {
    return this.resources_.getDpr();
  };

  /**
   * Utility method that propagates attributes from this element
   * to the given element.
   * @param  {!Array<string>} attributes
   * @param  {!Element} element
   * @protected @final
   */

  BaseElement.prototype.propagateAttributes = function propagateAttributes(attributes, element) {
    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes[i];
      if (!this.element.hasAttribute(attr)) {
        continue;
      }
      element.setAttribute(attr, this.element.getAttribute(attr));
    }
  };

  /**
   * Returns an optional placeholder element for this custom element.
   * @return {?Element}
   * @protected @final
   */

  BaseElement.prototype.getPlaceholder = function getPlaceholder() {
    return this.element.getPlaceholder();
  };

  /**
   * Hides or shows the placeholder, if available.
   * @param {boolean} state
   * @protected @final
   */

  BaseElement.prototype.togglePlaceholder = function togglePlaceholder(state) {
    this.element.togglePlaceholder(state);
  };

  /**
   * Returns an optional fallback element for this custom element.
   * @return {?Element}
   * @protected @final
   */

  BaseElement.prototype.getFallback = function getFallback() {
    return this.element.getFallback();
  };

  /**
   * Hides or shows the fallback, if available. This function must only
   * be called inside a mutate context.
   * @param {boolean} state
   * @protected @final
   */

  BaseElement.prototype.toggleFallback = function toggleFallback(state) {
    this.element.toggleFallback(state);
  };

  /**
   * Returns an optional overflow element for this custom element.
   * @return {?Element}
   * @protected @final
   */

  BaseElement.prototype.getOverflowElement = function getOverflowElement() {
    return this.element.getOverflowElement();
  };

  /**
   * Returns the original nodes of the custom element without any service nodes
   * that could have been added for markup. These nodes can include Text,
   * Comment and other child nodes.
   * @return {!Array<!Node>}
   * @protected @final
   */

  BaseElement.prototype.getRealChildNodes = function getRealChildNodes() {
    return this.element.getRealChildNodes();
  };

  /**
   * Returns the original children of the custom element without any service
   * nodes that could have been added for markup.
   * @return {!Array<!Element>}
   * @protected @final
   */

  BaseElement.prototype.getRealChildren = function getRealChildren() {
    return this.element.getRealChildren();
  };

  /**
   * Configures the supplied element to have a "fill content" layout. The
   * exact interpretation of "fill content" depends on the element's layout.
   *
   * If `opt_replacedContent` is specified, it indicates whether the "replaced
   * content" styling should be applied. Replaced content is not allowed to
   * have its own paddings or border.
   *
   * @param {!Element} element
   * @param {boolean=} opt_replacedContent
   * @protected @final
   */

  BaseElement.prototype.applyFillContent = function applyFillContent(element, opt_replacedContent) {
    element.classList.add('-amp-fill-content');
    if (opt_replacedContent) {
      element.classList.add('-amp-replaced-content');
    }
  };

  /**
   * Returns the viewport within which the element operates.
   * @return {!Viewport}
   */

  BaseElement.prototype.getViewport = function getViewport() {
    return _viewport.viewportFor(this.getWin());
  };

  /**
   * Schedule the layout request for the children element or elements
   * specified. Resource manager will perform the actual layout based on the
   * priority of this element and its children.
   * @param {!Element|!Array<!Element>} elements
   * @param {boolean} inLocalViewport
   * @protected
   */

  BaseElement.prototype.scheduleLayout = function scheduleLayout(elements) {
    this.resources_.scheduleLayout(this.element, elements);
  };

  /**
   * Schedule the preload request for the children element or elements
   * specified. Resource manager will perform the actual preload based on the
   * priority of this element and its children.
   * @param {!Element|!Array<!Element>} elements
   * @param {boolean} inLocalViewport
   * @protected
   */

  BaseElement.prototype.schedulePreload = function schedulePreload(elements) {
    this.resources_.schedulePreload(this.element, elements);
  };

  /**
   * Update inViewport state of the specified children element or elements.
   * Resource manager will perform the actual changes to the inViewport state
   * based on the state of these elements and their parent subtree.
   * @param {!Element|!Array<!Element>} elements
   * @param {boolean} inLocalViewport
   * @protected
   */

  BaseElement.prototype.updateInViewport = function updateInViewport(elements, inLocalViewport) {
    this.resources_.updateInViewport(this.element, elements, inLocalViewport);
  };

  /**
   * Requests the runtime to update the height of this element to the specified
   * value. The runtime will schedule this request and attempt to process it
   * as soon as possible.
   * @param {number} newHeight
   * @protected
   */

  BaseElement.prototype.changeHeight = function changeHeight(newHeight) {
    this.resources_. /*OK*/changeHeight(this.element, newHeight);
  };

  /**
   * Requests the runtime to update the height of this element to the specified
   * value. The runtime will schedule this request and attempt to process it
   * as soon as possible. However, unlike in {@link changeHeight}, the runtime
   * may refuse to make a change in which case it will show the element's
   * overflow element if provided, which is supposed to provide the reader with
   * the necessary user action.
   * @param {number} newHeight
   * @protected
   */

  BaseElement.prototype.requestChangeHeight = function requestChangeHeight(newHeight) {
    this.resources_.requestChangeHeight(this.element, newHeight);
  };

  /**
   * Schedules callback to be complete within the next batch. This call is
   * intended for heavy DOM mutations that typically cause re-layouts.
   * @param {!Function} callback
   */

  BaseElement.prototype.deferMutate = function deferMutate(callback) {
    this.resources_.deferMutate(this.element, callback);
  };

  /**
   * Requests full overlay mode from the viewer.
   * @protected
   */

  BaseElement.prototype.requestFullOverlay = function requestFullOverlay() {
    _viewer.viewerFor(this.getWin()).requestFullOverlay();
  };

  /**
   * Requests to cancel full overlay mode from the viewer.
   * @protected
   */

  BaseElement.prototype.cancelFullOverlay = function cancelFullOverlay() {
    _viewer.viewerFor(this.getWin()).cancelFullOverlay();
  };

  /**
   * Called when we just measured the layout rect of this element. Doing
   * more expensive style reads should now be cheap.
   * This may currently not work with extended elements. Please file
   * an issue if that is required.
   * @protected
   */

  BaseElement.prototype.onLayoutMeasure = function onLayoutMeasure() {};

  return BaseElement;
})();

exports.BaseElement = BaseElement;
;

},{"./layout":75,"./preconnect":84,"./resources":86,"./viewer":105,"./viewport":106,"./vsync":107}],57:[function(require,module,exports){
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

},{"./service":88}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

// NOTE:
// This file contains the core-js shims that the project currently requires.
// The commented out `require` lines are shims which the team
// has deemed to not be used or ones which the team thinks
// shouldn't be used.
//
// If you feel strongly that a shim is required or should be used then
// uncomment it from the list and contact the team.
//
// This is temporary until we can build out something more sophisticated with
// gulp + browserify + cli or switch to webpack.

//require('core-js/modules/es5');
//require('core-js/modules/es6.symbol');
//require('core-js/modules/es6.object.assign');
//require('core-js/modules/es6.object.is');
//require('core-js/modules/es6.object.set-prototype-of');
//require('core-js/modules/es6.object.to-string');
//require('core-js/modules/es6.object.freeze');
//require('core-js/modules/es6.object.seal');
//require('core-js/modules/es6.object.prevent-extensions');
//require('core-js/modules/es6.object.is-frozen');
//require('core-js/modules/es6.object.is-sealed');
//require('core-js/modules/es6.object.is-extensible');
//require('core-js/modules/es6.object.get-own-property-descriptor');
//require('core-js/modules/es6.object.get-prototype-of');
//require('core-js/modules/es6.object.keys');
//require('core-js/modules/es6.object.get-own-property-names');
//require('core-js/modules/es6.function.name');
//require('core-js/modules/es6.function.has-instance');
//require('core-js/modules/es6.number.constructor');
//require('core-js/modules/es6.number.epsilon');
//require('core-js/modules/es6.number.is-finite');
//require('core-js/modules/es6.number.is-integer');
//require('core-js/modules/es6.number.is-nan');
//require('core-js/modules/es6.number.is-safe-integer');
//require('core-js/modules/es6.number.max-safe-integer');
//require('core-js/modules/es6.number.min-safe-integer');
//require('core-js/modules/es6.number.parse-float');
//require('core-js/modules/es6.number.parse-int');
//require('core-js/modules/es6.math.acosh');
//require('core-js/modules/es6.math.asinh');
//require('core-js/modules/es6.math.atanh');
//require('core-js/modules/es6.math.cbrt');
//require('core-js/modules/es6.math.clz32');
//require('core-js/modules/es6.math.cosh');
//require('core-js/modules/es6.math.expm1');
//require('core-js/modules/es6.math.fround');
//require('core-js/modules/es6.math.hypot');
//require('core-js/modules/es6.math.imul');
//require('core-js/modules/es6.math.log10');
//require('core-js/modules/es6.math.log1p');
//require('core-js/modules/es6.math.log2');
require('core-js/modules/es6.math.sign');
//require('core-js/modules/es6.math.sinh');
//require('core-js/modules/es6.math.tanh');
//require('core-js/modules/es6.math.trunc');
//require('core-js/modules/es6.string.from-code-point');
//require('core-js/modules/es6.string.raw');
//require('core-js/modules/es6.string.trim');
//require('core-js/modules/es6.string.iterator');
//require('core-js/modules/es6.string.code-point-at');
//require('core-js/modules/es6.string.ends-with');
//require('core-js/modules/es6.string.includes');
//require('core-js/modules/es6.string.repeat');
//require('core-js/modules/es6.string.starts-with');
//require('core-js/modules/es6.array.from');
//require('core-js/modules/es6.array.of');
//require('core-js/modules/es6.array.iterator');
//require('core-js/modules/es6.array.species');
//require('core-js/modules/es6.array.copy-within');
//require('core-js/modules/es6.array.fill');
//require('core-js/modules/es6.array.find');
//require('core-js/modules/es6.array.find-index');
//require('core-js/modules/es6.regexp.constructor');
//require('core-js/modules/es6.regexp.flags');
//require('core-js/modules/es6.regexp.match');
//require('core-js/modules/es6.regexp.replace');
//require('core-js/modules/es6.regexp.search');
//require('core-js/modules/es6.regexp.split');
require('core-js/modules/es6.promise');
//require('core-js/modules/es6.map');
//require('core-js/modules/es6.set');
//require('core-js/modules/es6.weak-map');
//require('core-js/modules/es6.weak-set');
//require('core-js/modules/es6.reflect.apply');
//require('core-js/modules/es6.reflect.construct');
//require('core-js/modules/es6.reflect.define-property');
//require('core-js/modules/es6.reflect.delete-property');
//require('core-js/modules/es6.reflect.enumerate');
//require('core-js/modules/es6.reflect.get');
//require('core-js/modules/es6.reflect.get-own-property-descriptor');
//require('core-js/modules/es6.reflect.get-prototype-of');
//require('core-js/modules/es6.reflect.has');
//require('core-js/modules/es6.reflect.is-extensible');
//require('core-js/modules/es6.reflect.own-keys');
//require('core-js/modules/es6.reflect.prevent-extensions');
//require('core-js/modules/es6.reflect.set');
//require('core-js/modules/es6.reflect.set-prototype-of');
//require('core-js/modules/es7.array.includes');
//require('core-js/modules/es7.string.at');
//require('core-js/modules/es7.string.pad-left');
//require('core-js/modules/es7.string.pad-right');
//require('core-js/modules/es7.string.trim-left');
//require('core-js/modules/es7.string.trim-right');
//require('core-js/modules/es7.regexp.escape');
//require('core-js/modules/es7.object.get-own-property-descriptors');
//require('core-js/modules/es7.object.values');
//require('core-js/modules/es7.object.entries');
//require('core-js/modules/es7.map.to-json');
//require('core-js/modules/es7.set.to-json');
//require('core-js/modules/js.array.statics');
//require('core-js/modules/web.timers');
//require('core-js/modules/web.immediate');
//require('core-js/modules/web.dom.iterable');
/** @const  */
module.exports = require('core-js/modules/$.core');

},{"core-js/modules/$.core":12,"core-js/modules/es6.math.sign":48,"core-js/modules/es6.promise":49}],60:[function(require,module,exports){
exports.__esModule = true;
exports.upgradeOrRegisterElement = upgradeOrRegisterElement;
exports.stubElements = stubElements;
exports.applyLayout_ = applyLayout_;
exports.createAmpElementProto = createAmpElementProto;
exports.registerElement = registerElement;
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

var _layout = require('./layout');

var _elementStub = require('./element-stub');

var _asserts = require('./asserts');

var _srcLoader = require('../src/loader');

var _log = require('./log');

var _sizeList = require('./size-list');

var _error = require('./error');

var _resources = require('./resources');

var _timer = require('./timer');

var _vsync = require('./vsync');

var _dom = require('./dom');

var dom = babelHelpers.interopRequireWildcard(_dom);

var TAG_ = 'CustomElement';

/**
 * This is the minimum width of the element needed to trigger `loading`
 * animation. This value is justified as about 1/3 of a smallish mobile
 * device viewport. Trying to put a loading indicator into a small element
 * is meaningless.
 * @private @const {number}
 */
var MIN_WIDTH_FOR_LOADING_ = 100;

/**
 * The elements positioned ahead of this threshold may have their loading
 * indicator initialized faster. This is benefitial to avoid relayout during
 * render phase or scrolling.
 * @private @const {number}
 */
var PREPARE_LOADING_THRESHOLD_ = 1000;

/**
 * Map from element name to implementation class.
 * @const {Object}
 */
var knownElements = {};

/**
 * Whether this platform supports template tags.
 * @const {boolean}
 */
var TEMPLATE_TAG_SUPPORTED = ('content' in document.createElement('template'));

/**
 * Registers an element. Upgrades it if has previously been stubbed.
 * @param {!Window} win
 * @param {string}
 * @param {function(!Function)} toClass
 */

function upgradeOrRegisterElement(win, name, toClass) {
  if (!knownElements[name]) {
    registerElement(win, name, toClass);
    return;
  }
  _asserts.assert(knownElements[name] == _elementStub.ElementStub, 'Expected ' + name + ' to be an ElementStub.');
  for (var i = 0; i < _elementStub.stubbedElements.length; i++) {
    var stub = _elementStub.stubbedElements[i];
    // There are 3 possible states here:
    // 1. We never made the stub because the extended impl. loaded first.
    //    In that case the element won't be in the array.
    // 2. We made a stub but the browser didn't attach it yet. In
    //    that case we don't need to upgrade but simply switch to the new
    //    implementation.
    // 3. A stub was attached. We upgrade which means we replay the
    //    implementation.
    var element = stub.element;
    if (element.tagName.toLowerCase() == name) {
      try {
        element.upgrade(toClass);
      } catch (e) {
        _error.reportError(e, this);
      }
    }
  }
}

/**
 * Stub extended elements missing an implementation.
 * @param {!Window} win
 */

function stubElements(win) {
  win.ampExtendedElements = {};
  var list = win.document.querySelectorAll('[custom-element]');
  for (var i = 0; i < list.length; i++) {
    var _name = list[i].getAttribute('custom-element');
    win.ampExtendedElements[_name] = true;
    if (knownElements[_name]) {
      continue;
    }
    registerElement(win, _name, _elementStub.ElementStub);
  }
}

/**
 * Applies layout to the element. Visible for testing only.
 * @param {!AmpElement} element
 */

function applyLayout_(element) {
  var layoutAttr = element.getAttribute('layout');
  var widthAttr = element.getAttribute('width');
  var heightAttr = element.getAttribute('height');
  var sizesAttr = element.getAttribute('sizes');

  // Input layout attributes.
  var inputLayout = layoutAttr ? _layout.parseLayout(layoutAttr) : null;
  _asserts.assert(inputLayout !== undefined, 'Unknown layout: %s', layoutAttr);
  var inputWidth = widthAttr && widthAttr != 'auto' ? _layout.parseLength(widthAttr) : widthAttr;
  _asserts.assert(inputWidth !== undefined, 'Invalid width value: %s', widthAttr);
  var inputHeight = heightAttr ? _layout.parseLength(heightAttr) : null;
  _asserts.assert(inputHeight !== undefined, 'Invalid height value: %s', heightAttr);

  // Effective layout attributes. These are effectively constants.
  var width = undefined;
  var height = undefined;
  var layout = undefined;

  // Calculate effective width and height.
  if ((!inputLayout || inputLayout == _layout.Layout.FIXED || inputLayout == _layout.Layout.FIXED_HEIGHT) && (!inputWidth || !inputHeight) && _layout.hasNaturalDimensions(element.tagName)) {
    // Default width and height: handle elements that do not specify a
    // width/height and are defined to have natural browser dimensions.
    var dimensions = _layout.getNaturalDimensions(element.tagName);
    width = inputWidth || inputLayout == _layout.Layout.FIXED_HEIGHT ? inputWidth : dimensions.width;
    height = inputHeight || dimensions.height;
  } else {
    width = inputWidth;
    height = inputHeight;
  }

  // Calculate effective layout.
  if (inputLayout) {
    layout = inputLayout;
  } else if (!width && !height) {
    layout = _layout.Layout.CONTAINER;
  } else if (height && (!width || width == 'auto')) {
    layout = _layout.Layout.FIXED_HEIGHT;
  } else if (height && width && sizesAttr) {
    layout = _layout.Layout.RESPONSIVE;
  } else {
    layout = _layout.Layout.FIXED;
  }

  // Verify layout attributes.
  if (layout == _layout.Layout.FIXED || layout == _layout.Layout.FIXED_HEIGHT || layout == _layout.Layout.RESPONSIVE) {
    _asserts.assert(height, 'Expected height to be available: %s', heightAttr);
  }
  if (layout == _layout.Layout.FIXED_HEIGHT) {
    _asserts.assert(!width || width == 'auto', 'Expected width to be either absent or equal "auto" ' + 'for fixed-height layout: %s', widthAttr);
  }
  if (layout == _layout.Layout.FIXED || layout == _layout.Layout.RESPONSIVE) {
    _asserts.assert(width && width != 'auto', 'Expected width to be available and not equal to "auto": %s', widthAttr);
  }
  if (layout == _layout.Layout.RESPONSIVE) {
    _asserts.assert(_layout.getLengthUnits(width) == _layout.getLengthUnits(height), 'Length units should be the same for width and height: %s, %s', widthAttr, heightAttr);
  }

  // Apply UI.
  element.classList.add(_layout.getLayoutClass(layout));
  if (_layout.isLayoutSizeDefined(layout)) {
    element.classList.add('-amp-layout-size-defined');
  }
  if (layout == _layout.Layout.NODISPLAY) {
    element.style.display = 'none';
  } else if (layout == _layout.Layout.FIXED) {
    element.style.width = width;
    element.style.height = height;
  } else if (layout == _layout.Layout.FIXED_HEIGHT) {
    element.style.height = height;
  } else if (layout == _layout.Layout.RESPONSIVE) {
    var sizer = element.ownerDocument.createElement('i-amp-sizer');
    sizer.style.display = 'block';
    sizer.style.paddingTop = _layout.getLengthNumeral(height) / _layout.getLengthNumeral(width) * 100 + '%';
    element.insertBefore(sizer, element.firstChild);
    element.sizerElement_ = sizer;
  } else if (layout == _layout.Layout.FILL) {
    // Do nothing.
  } else if (layout == _layout.Layout.CONTAINER) {
      // Do nothing. Elements themselves will check whether the supplied
      // layout value is acceptable. In particular container is only OK
      // sometimes.
    }
  return layout;
}

/**
 * Returns "true" for internal AMP nodes or for placeholder elements.
 * @param {!Node} node
 * @return {boolean}
 */
function isInternalOrServiceNode(node) {
  if (_layout.isInternalElement(node)) {
    return true;
  }
  if (node.tagName && (node.hasAttribute('placeholder') || node.hasAttribute('fallback') || node.hasAttribute('overflow'))) {
    return true;
  }
  return false;
}

/**
 * The interface that is implemented by all custom elements in the AMP
 * namespace.
 * @interface
 */

var AmpElement = function AmpElement() {
  babelHelpers.classCallCheck(this, AmpElement);
};

// TODO(dvoytenko): Add all exposed methods.

/**
 * Creates a new custom element class prototype.
 *
 * Visible for testing only.
 *
 * @param {!Window} win The window in which to register the elements.
 * @param {string} name Name of the custom element
 * @param {function(new:BaseElement, !Element)} implementationClass
 * @return {!AmpElement.prototype}
 */

function createAmpElementProto(win, name, implementationClass) {
  /**
   * @lends {AmpElement.prototype}
   */
  var ElementProto = win.Object.create(win.HTMLElement.prototype);

  /**
   * Called when elements is created. Sets instance vars since there is no
   * constructor.
   * @final
   */
  ElementProto.createdCallback = function () {
    this.classList.add('-amp-element');

    // Flag "notbuilt" is removed by Resource manager when the resource is
    // considered to be built. See "setBuilt" method.
    /** @private {boolean} */
    this.built_ = false;
    this.classList.add('-amp-notbuilt');
    this.classList.add('amp-notbuilt');

    this.readyState = 'loading';
    this.everAttached = false;

    /** @private @const {!Resources}  */
    this.resources_ = _resources.resourcesFor(win);

    /** @private {!Layout} */
    this.layout_ = _layout.Layout.NODISPLAY;

    /** @private {number} */
    this.layoutWidth_ = -1;

    /** @private {number} */
    this.layoutCount_ = 0;

    /** @private {boolean} */
    this.isInViewport_ = false;

    /** @private {string|null|undefined} */
    this.mediaQuery_;

    /** @private {!SizeList|null|undefined} */
    this.sizeList_;

    /**
     * This element can be assigned by the {@link applyLayout_} to a child
     * element that will be used to size this element.
     * @private {?Element}
     */
    this.sizerElement_ = null;

    /** @private {boolean|undefined} */
    this.loadingDisabled_;

    /** @private {boolean|undefined} */
    this.loadingState_;

    /** @private {?Element} */
    this.loadingContainer_ = null;

    /** @private {?Element} */
    this.loadingElement_ = null;

    /** @private {?Element|undefined} */
    this.overflowElement_;

    /** @private {!BaseElement} */
    this.implementation_ = new implementationClass(this);
    this.implementation_.createdCallback();

    /**
     * Action queue is initially created and kept around until the element
     * is ready to send actions directly to the implementation.
     * @private {?Array<!ActionInvocation>}
     */
    this.actionQueue_ = [];

    /**
     * Whether the element is in the template.
     * @private {boolean|undefined}
     */
    this.isInTemplate_;
  };

  /** @private */
  ElementProto.assertNotTemplate_ = function () {
    _asserts.assert(!this.isInTemplate_, 'Must never be called in template');
  };

  /**
   * Whether the element has been upgraded yet.
   * @return {boolean}
   * @final
   */
  ElementProto.isUpgraded = function () {
    return !(this.implementation_ instanceof _elementStub.ElementStub);
  };

  /**
   * Upgrades the element to the provided new implementation. If element
   * has already been attached, it's layout validation and attachment flows
   * are repeated for the new implementation.
   * @param {function(new:BaseElement, !Element)} newImplClass
   * @final @package
   */
  ElementProto.upgrade = function (newImplClass) {
    if (this.isInTemplate_) {
      return;
    }
    this.implementation_ = new newImplClass(this);
    this.classList.remove('amp-unresolved');
    this.classList.remove('-amp-unresolved');
    this.implementation_.createdCallback();
    if (this.layout_ != _layout.Layout.NODISPLAY && !this.implementation_.isLayoutSupported(this.layout_)) {
      throw new Error('Layout not supported: ' + this.layout_);
    }
    this.implementation_.layout_ = this.layout_;
    this.implementation_.layoutWidth_ = this.layoutWidth_;
    if (this.everAttached) {
      this.implementation_.firstAttachedCallback();
      this.dispatchCustomEvent('amp:attached');
    }
    this.resources_.upgraded(this);
  };

  /**
   * Whether the element has been built. A built element had its
   * {@link buildCallback} method successfully invoked.
   * @return {boolean}
   * @final
   */
  ElementProto.isBuilt = function () {
    return this.built_;
  };

  /**
   * Requests or requires the element to be built. The build is done by
   * invoking {@link BaseElement.buildCallback} method.
   *
   * If the "force" argument is "false", the element will first check if
   * implementation is ready to build by calling
   * {@link BaseElement.isReadyToBuild} method. If this method returns "true"
   * the build proceeds, otherwise no build is done.
   *
   * If the "force" argument is "true", the element performs build regardless
   * of what {@link BaseElement.isReadyToBuild} would return.
   *
   * Returned value indicates whether or not build has been performed.
   *
   * This method can only be called on a upgraded element.
   *
   * @param {boolean} force Whether or not force the build.
   * @return {boolean}
   * @final
   */
  ElementProto.build = function (force) {
    this.assertNotTemplate_();
    if (this.isBuilt()) {
      return true;
    }
    _asserts.assert(this.isUpgraded(), 'Cannot build unupgraded element');
    if (!force && !this.implementation_.isReadyToBuild()) {
      return false;
    }
    try {
      this.implementation_.buildCallback();
      this.preconnect( /* onLayout */false);
      this.built_ = true;
      this.classList.remove('-amp-notbuilt');
      this.classList.remove('amp-notbuilt');
    } catch (e) {
      _error.reportError(e, this);
      throw e;
    }
    if (this.built_ && this.isInViewport_) {
      this.updateInViewport_(true);
    }
    if (this.actionQueue_) {
      if (this.actionQueue_.length > 0) {
        // Only schedule when the queue is not empty, which should be
        // the case 99% of the time.
        _timer.timer.delay(this.dequeueActions_.bind(this), 1);
      } else {
        this.actionQueue_ = null;
      }
    }
    return true;
  };

  /**
   * Called to instruct the element to preconnect to hosts it uses during
   * layout.
   * @param {boolean} onLayout Whether this was called after a layout.
   */
  ElementProto.preconnect = function (onLayout) {
    this.implementation_.preconnectCallback(onLayout);
  };

  /**
   * @return {!Vsync}
   * @private
   */
  ElementProto.getVsync_ = function () {
    return _vsync.vsyncFor(this.ownerDocument.defaultView);
  };

  /**
   * Updates the layout box of the element.
   * See {@link BaseElement.getLayoutWidth} for details.
   * @param {!LayoutRect} layoutBox
   */
  ElementProto.updateLayoutBox = function (layoutBox) {
    var _this = this;

    this.layoutWidth_ = layoutBox.width;
    if (this.isUpgraded()) {
      this.implementation_.layoutWidth_ = this.layoutWidth_;
    }
    // TODO(malteubl): Forward for stubbed elements.
    this.implementation_.onLayoutMeasure();

    if (this.isLoadingEnabled_()) {
      if (this.isInViewport_) {
        // Already in viewport - start showing loading.
        this.toggleLoading_(true);
      } else if (layoutBox.top < PREPARE_LOADING_THRESHOLD_ && layoutBox.top >= 0) {
        // Few top elements will also be pre-initialized with a loading
        // element.
        this.getVsync_().mutate(function () {
          _this.prepareLoading_();
        });
      }
    }
  };

  /**
   * If the element has a media attribute, evaluates the value as a media
   * query and based on the result adds or removes the class
   * `-amp-hidden-by-media-query`. The class adds display:none to the element
   * which in turn prevents any of the resource loading to happen for the
   * element.
   *
   * This method is called by Resources and shouldn't be called by anyone else.
   *
   * @final
   * @package
   */
  ElementProto.applySizesAndMediaQuery = function () {
    this.assertNotTemplate_();

    // Media query.
    if (this.mediaQuery_ === undefined) {
      this.mediaQuery_ = this.getAttribute('media') || null;
    }
    if (this.mediaQuery_) {
      this.classList.toggle('-amp-hidden-by-media-query', !this.ownerDocument.defaultView.matchMedia(this.mediaQuery_).matches);
    }

    // Sizes.
    if (this.sizeList_ === undefined) {
      var sizesAttr = this.getAttribute('sizes');
      this.sizeList_ = sizesAttr ? _sizeList.parseSizeList(sizesAttr) : null;
    }
    if (this.sizeList_) {
      this.style.width = _layout.assertLength(this.sizeList_.select(this.ownerDocument.defaultView));
    }
  };

  /**
   * Changes the height of the element.
   *
   * This method is called by Resources and shouldn't be called by anyone else.
   * This method must always be called in the mutation context.
   *
   * @param {number} newHeight
   * @final
   * @package
   */
  ElementProto. /*OK*/changeHeight = function (newHeight) {
    if (this.sizerElement_) {
      // From the moment height is changed the element becomes fully
      // responsible for managing its height. Aspect ratio is no longer
      // preserved.
      this.sizerElement_.style.paddingTop = '0';
    }
    this.style.height = newHeight + 'px';
  };

  /**
   * Called when the element is first attached to the DOM. Calls
   * {@link firstAttachedCallback} if this is the first attachment.
   * @final
   */
  ElementProto.attachedCallback = function () {
    if (!TEMPLATE_TAG_SUPPORTED) {
      this.isInTemplate_ = !!dom.closestByTag(this, 'template');
    }
    if (this.isInTemplate_) {
      return;
    }
    if (!this.everAttached) {
      this.everAttached = true;
      try {
        this.firstAttachedCallback_();
      } catch (e) {
        _error.reportError(e, this);
      }
    }
    this.resources_.add(this);
  };

  /**
   * Called when the element is detached from the DOM.
   * @final
   */
  ElementProto.detachedCallback = function () {
    if (this.isInTemplate_) {
      return;
    }
    this.resources_.remove(this);
  };

  /**
   * Called when the element is attached to the DOM for the first time.
   * @private @final
   */
  ElementProto.firstAttachedCallback_ = function () {
    if (!this.isUpgraded()) {
      this.classList.add('amp-unresolved');
      this.classList.add('-amp-unresolved');
    }
    try {
      this.layout_ = applyLayout_(this);
      if (this.layout_ != _layout.Layout.NODISPLAY && !this.implementation_.isLayoutSupported(this.layout_)) {
        throw new Error('Layout not supported for: ' + this.layout_);
      }
      this.implementation_.layout_ = this.layout_;
      this.implementation_.firstAttachedCallback();
    } catch (e) {
      _error.reportError(e, this);
      throw e;
    }
    if (!this.isUpgraded()) {
      // amp:attached is dispatched from the ElementStub class when it replayed
      // the firstAttachedCallback call.
      this.dispatchCustomEvent('amp:stubbed');
    } else {
      this.dispatchCustomEvent('amp:attached');
    }
  };

  /**
   * @param {string} name
   * @param {!Object=} opt_data Event data.
   * @final
   */
  ElementProto.dispatchCustomEvent = function (name, opt_data) {
    var data = opt_data || {};
    // Constructors of events need to come from the correct window. Sigh.
    var win = this.ownerDocument.defaultView;
    var event = win.document.createEvent('Event');
    event.data = data;
    event.initEvent(name, true, true);
    this.dispatchEvent(event);
  };

  /**
   * Whether the element can pre-render.
   * @return {boolean}
   * @final
   */
  ElementProto.prerenderAllowed = function () {
    return this.implementation_.prerenderAllowed();
  };

  /**
   * Whether the element should ever render when it is not in viewport.
   * @return {boolean}
   * @final
   */
  ElementProto.renderOutsideViewport = function () {
    return this.implementation_.renderOutsideViewport();
  };

  /**
   * @return {!LayoutRect}
   * @final
   */
  ElementProto.getLayoutBox = function () {
    return this.resources_.getResourceForElement(this).getLayoutBox();
  };

  /**
   * The runtime calls this method to determine if {@link layoutCallback}
   * should be called again when layout changes.
   * @return {boolean}
   * @package @final
   */
  ElementProto.isRelayoutNeeded = function () {
    return this.implementation_.isRelayoutNeeded();
  };

  /**
   * Instructs the element to layout its content and load its resources if
   * necessary by calling the {@link BaseElement.layoutCallback} method that
   * should be implemented by BaseElement subclasses. Must return a promise
   * that will yield when the layout and associated loadings are complete.
   *
   * This method is always called for the first layout, but for subsequent
   * layouts the runtime consults {@link isRelayoutNeeded} method.
   *
   * Can only be called on a upgraded and built element.
   *
   * @return {!Promise}
   * @package @final
   */
  ElementProto.layoutCallback = function () {
    var _this2 = this;

    this.assertNotTemplate_();
    _asserts.assert(this.isUpgraded() && this.isBuilt(), 'Must be upgraded and built to receive viewport events');
    this.dispatchCustomEvent('amp:load:start');
    var promise = this.implementation_.layoutCallback();
    this.preconnect( /* onLayout */true);
    this.classList.add('-amp-layout');
    return promise.then(function () {
      _this2.readyState = 'complete';
      _this2.layoutCount_++;
      _this2.toggleLoading_(false, /* cleanup */true);
      if (_this2.layoutCount_ == 1) {
        _this2.implementation_.firstLayoutCompleted();
      }
    }, function (reason) {
      _this2.toggleLoading_(false, /* cleanup */true);
      return Promise.reject(reason);
    });
  };

  /**
   * Instructs the resource that it entered or exited the visible viewport.
   *
   * Can only be called on a upgraded and built element.
   *
   * @param {boolean} inViewport Whether the element has entered or exited
   *   the visible viewport.
   * @final @package
   */
  ElementProto.viewportCallback = function (inViewport) {
    var _this3 = this;

    this.assertNotTemplate_();
    this.isInViewport_ = inViewport;
    if (this.layoutCount_ == 0) {
      if (!inViewport) {
        this.toggleLoading_(false);
      } else {
        // Set a minimum delay in case the element loads very fast or if it
        // leaves the viewport.
        _timer.timer.delay(function () {
          if (_this3.layoutCount_ == 0 && _this3.isInViewport_) {
            _this3.toggleLoading_(true);
          }
        }, 100);
      }
    }
    if (this.isUpgraded() && this.isBuilt()) {
      this.updateInViewport_(inViewport);
    }
  };

  /**
   * @param {boolean} inViewport
   * @private
   */
  ElementProto.updateInViewport_ = function (inViewport) {
    this.implementation_.inViewport_ = inViewport;
    this.implementation_.viewportCallback(inViewport);
  };

  /**
   * Requests the resource to stop its activity when the document goes into
   * inactive state. The scope is up to the actual component. Among other
   * things the active playback of video or audio content must be stopped.
   * The component must return `true` if it'd like to later receive
   * {@link layoutCallback} in case document becomes active again.
   *
   * Calling this method on unbuilt ot unupgraded element has no effect.
   *
   * @return {!Promise}
   * @package @final
   */
  ElementProto.documentInactiveCallback = function () {
    this.assertNotTemplate_();
    if (!this.isBuilt() || !this.isUpgraded()) {
      return false;
    }
    return this.implementation_.documentInactiveCallback();
  };

  /**
   * Enqueues the action with the element. If element has been upgraded and
   * built, the action is dispatched to the implementation right away.
   * Otherwise the invocation is enqueued until the implementation is ready
   * to receive actions.
   * @param {!ActionInvocation} invocation
   * @final
   */
  ElementProto.enqueAction = function (invocation) {
    this.assertNotTemplate_();
    if (!this.isBuilt()) {
      _asserts.assert(this.actionQueue_).push(invocation);
    } else {
      this.executionAction_(invocation, false);
    }
  };

  /**
   * Dequeues events from the queue and dispatches them to the implementation
   * with "deferred" flag.
   * @private
   */
  ElementProto.dequeueActions_ = function () {
    var _this4 = this;

    if (!this.actionQueue_) {
      return;
    }

    var actionQueue = _asserts.assert(this.actionQueue_);
    this.actionQueue_ = null;

    // TODO(dvoytenko, #1260): dedupe actions.
    actionQueue.forEach(function (invocation) {
      _this4.executionAction_(invocation, true);
    });
  };

  /**
   * Executes the action immediately. All errors are consumed and reported.
   * @param {!ActionInvocation} invocation
   * @param {boolean} deferred
   * @final
   * @private
   */
  ElementProto.executionAction_ = function (invocation, deferred) {
    try {
      this.implementation_.executeAction(invocation, deferred);
    } catch (e) {
      _log.log.error(TAG_, 'Action execution failed:', invocation, e);
    }
  };

  /**
   * Returns the original nodes of the custom element without any service nodes
   * that could have been added for markup. These nodes can include Text,
   * Comment and other child nodes.
   * @return {!Array<!Node>}
   * @package @final
   */
  ElementProto.getRealChildNodes = function () {
    var nodes = [];
    for (var n = this.firstChild; n; n = n.nextSibling) {
      if (!isInternalOrServiceNode(n)) {
        nodes.push(n);
      }
    }
    return nodes;
  };

  /**
   * Returns the original children of the custom element without any service
   * nodes that could have been added for markup.
   * @return {!Array<!Element>}
   * @package @final
   */
  ElementProto.getRealChildren = function () {
    var elements = [];
    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      if (!isInternalOrServiceNode(child)) {
        elements.push(child);
      }
    }
    return elements;
  };

  /**
   * Returns an optional placeholder element for this custom element.
   * @return {?Element}
   * @package @final
   */
  ElementProto.getPlaceholder = function () {
    return dom.childElementByAttr(this, 'placeholder');
  };

  /**
   * Hides or shows the placeholder, if available.
   * @param {boolean} state
   * @package @final
   */
  ElementProto.togglePlaceholder = function (state) {
    this.assertNotTemplate_();
    var placeholder = this.getPlaceholder();
    if (placeholder) {
      placeholder.classList.toggle('amp-hidden', !state);
    }
  };

  /**
   * Returns an optional fallback element for this custom element.
   * @return {?Element}
   * @package @final
   */
  ElementProto.getFallback = function () {
    return dom.childElementByAttr(this, 'fallback');
  };

  /**
   * Hides or shows the fallback, if available. This function must only
   * be called inside a mutate context.
   * @param {boolean} state
   * @package @final
   */
  ElementProto.toggleFallback = function (state) {
    this.assertNotTemplate_();
    // This implementation is notably less efficient then placeholder toggling.
    // The reasons for this are: (a) "not supported" is the state of the whole
    // element, (b) some realyout is expected and (c) fallback condition would
    // be rare.
    this.classList.toggle('amp-notsupported', state);
  };

  /**
   * Whether the loading can be shown for this element.
   * @return {boolean}
   * @private
   */
  ElementProto.isLoadingEnabled_ = function () {
    // No loading indicator will be shown if either one of these
    // conditions true:
    // 1. `noloading` attribute is specified;
    // 2. The element has not been whitelisted;
    // 3. The element is too small or has not yet been measured;
    // 4. The element has already been laid out;
    // 5. The element is a `placeholder` or a `fallback`;
    // 6. The element's layout is not a size-defining layout.
    if (this.loadingDisabled_ === undefined) {
      this.loadingDisabled_ = this.hasAttribute('noloading');
    }
    if (this.loadingDisabled_ || !_layout.isLoadingAllowed(this.tagName) || this.layoutWidth_ < MIN_WIDTH_FOR_LOADING_ || this.layoutCount_ > 0 || isInternalOrServiceNode(this) || !_layout.isLayoutSizeDefined(this.layout_)) {
      return false;
    }
    return true;
  };

  /**
   * Creates a loading object. The caller must ensure that loading can
   * actually be shown. This method must also be called in the mutate
   * context.
   * @private
   */
  ElementProto.prepareLoading_ = function () {
    if (!this.loadingContainer_) {
      var container = document.createElement('div');
      container.classList.add('-amp-loading-container');
      container.classList.add('-amp-fill-content');
      container.classList.add('amp-hidden');

      var element = _srcLoader.createLoaderElement();
      container.appendChild(element);

      this.appendChild(container);
      this.loadingContainer_ = container;
      this.loadingElement_ = element;
    }
  };

  /**
   * Turns the loading indicator on or off.
   * @param {boolean} state
   * @param {boolean=} opt_cleanup
   * @private @final
   */
  ElementProto.toggleLoading_ = function (state, opt_cleanup) {
    var _this5 = this;

    this.assertNotTemplate_();
    this.loadingState_ = state;
    if (!state && !this.loadingContainer_) {
      return;
    }

    // Check if loading should be shown.
    if (state && !this.isLoadingEnabled_()) {
      this.loadingState_ = false;
      return;
    }

    this.getVsync_().mutate(function () {
      var state = _this5.loadingState_;
      // Repeat "loading enabled" check because it could have changed while
      // waiting for vsync.
      if (state && !_this5.isLoadingEnabled_()) {
        state = false;
      }
      if (state) {
        _this5.prepareLoading_();
      }
      if (!_this5.loadingContainer_) {
        return;
      }

      _this5.loadingContainer_.classList.toggle('amp-hidden', !state);
      _this5.loadingElement_.classList.toggle('amp-active', state);

      if (!state && opt_cleanup) {
        (function () {
          var loadingContainer = _this5.loadingContainer_;
          _this5.loadingContainer_ = null;
          _this5.loadingElement_ = null;
          _this5.resources_.deferMutate(_this5, function () {
            dom.removeElement(loadingContainer);
          });
        })();
      }
    });
  };

  /**
   * Returns an optional overflow element for this custom element.
   * @return {?Element}
   * @private
   */
  ElementProto.getOverflowElement = function () {
    if (this.overflowElement_ === undefined) {
      this.overflowElement_ = dom.childElementByAttr(this, 'overflow');
      if (this.overflowElement_) {
        if (!this.overflowElement_.hasAttribute('tabindex')) {
          this.overflowElement_.setAttribute('tabindex', '0');
        }
        if (!this.overflowElement_.hasAttribute('role')) {
          this.overflowElement_.setAttribute('role', 'button');
        }
      }
    }
    return this.overflowElement_;
  };

  /**
   * Hides or shows the overflow, if available. This function must only
   * be called inside a mutate context.
   * @param {boolean} overflown
   * @param {number} requestedHeight
   * @package @final
   */
  ElementProto.overflowCallback = function (overflown, requestedHeight) {
    var _this6 = this;

    if (!overflown && !this.overflowElement_) {
      // Overflow has never been initialized and not wanted.
      return;
    }

    var overflowElement = this.getOverflowElement();
    if (!overflowElement) {
      if (overflown) {
        _log.log.warn(TAG_, 'Cannot resize element and overlfow is not available', this);
      }
      return;
    }

    overflowElement.classList.toggle('amp-visible', overflown);

    if (overflown) {
      this.overflowElement_.onclick = function () {
        _this6.resources_. /*OK*/changeHeight(_this6, requestedHeight);
        _this6.getVsync_().mutate(function () {
          _this6.overflowCallback( /* overflown */false, requestedHeight);
        });
      };
    } else {
      this.overflowElement_.onclick = null;
    }
  };

  return ElementProto;
}

/**
 * Registers a new custom element with its implementation class.
 * @param {!Window} win The window in which to register the elements.
 * @param {string} name Name of the custom element
 * @param {function(new:BaseElement, !Element)} implementationClass
 */

function registerElement(win, name, implementationClass) {
  knownElements[name] = implementationClass;

  win.document.registerElement(name, {
    prototype: createAmpElementProto(win, name, implementationClass)
  });
}

},{"../src/loader":76,"./asserts":55,"./dom":64,"./element-stub":65,"./error":66,"./layout":75,"./log":77,"./resources":86,"./size-list":94,"./timer":100,"./vsync":107}],61:[function(require,module,exports){
exports.__esModule = true;
exports.installGlobalClickListener = installGlobalClickListener;
exports.uninstallGlobalClickListener = uninstallGlobalClickListener;
exports.onDocumentElementClick_ = onDocumentElementClick_;
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

var _dom = require('./dom');

var _service = require('./service');

var _log = require('./log');

var _url = require('./url');

var _viewport = require('./viewport');

/**
 * @param {!Window} window
 */

function installGlobalClickListener(window) {
  clickHandlerFor(window);
}

/**
 * @param {!Window} window
 */

function uninstallGlobalClickListener(window) {
  clickHandlerFor(window).cleanup();
}

/**
 * @param {!Window} window
 */
function clickHandlerFor(window) {
  return _service.getService(window, 'clickhandler', function () {
    return new ClickHandler(window);
  });
}

/**
 * Intercept any click on the current document and prevent any
 * linking to an identifier from pushing into the history stack.
 * visibleForTesting
 */

var ClickHandler = (function () {
  /**
   * @param {!Window} window
   */

  function ClickHandler(window) {
    babelHelpers.classCallCheck(this, ClickHandler);

    /** @private @const {!Window} */
    this.win = window;

    /** @private @const {!Viewport} */
    this.viewport_ = _viewport.viewportFor(window);

    /** @private @const {!Function} */
    this.boundHandle_ = this.handle_.bind(this);

    this.win.document.documentElement.addEventListener('click', this.boundHandle_);
  }

  /**
   * Intercept any click on the current document and prevent any
   * linking to an identifier from pushing into the history stack.
   * @param {!Event} e
   * @param {!Viewport} viewport
   */

  /**
   * Removes all event listeners.
   */

  ClickHandler.prototype.cleanup = function cleanup() {
    this.win.document.documentElement.removeEventListener('click', this.boundHandle_);
  };

  /**
   * Intercept any click on the current document and prevent any
   * linking to an identifier from pushing into the history stack.
   * @param {!Event} e
   */

  ClickHandler.prototype.handle_ = function handle_(e) {
    onDocumentElementClick_(e, this.viewport_);
  };

  return ClickHandler;
})();

exports.ClickHandler = ClickHandler;

function onDocumentElementClick_(e, viewport) {
  if (e.defaultPrevented) {
    return;
  }

  var target = _dom.closestByTag(e.target, 'A');
  if (!target) {
    return;
  }

  var elem = null;
  var docElement = e.currentTarget;
  var doc = docElement.ownerDocument;

  var tgtLoc = _url.parseUrl(target.href);
  if (!tgtLoc.hash) {
    return;
  }

  var curLoc = _url.parseUrl(doc.location.href);
  var tgtHref = '' + tgtLoc.origin + tgtLoc.pathname + tgtLoc.search;
  var curHref = '' + curLoc.origin + curLoc.pathname + curLoc.search;

  // If the current target anchor link is the same origin + path
  // as the current document then we know we are just linking to an
  // identifier in the document.
  if (tgtHref != curHref) {
    return;
  }

  // We prevent default so that the current click does not push
  // into the history stack as this messes up the external documents
  // history which contains the amp document.
  e.preventDefault();

  var hash = tgtLoc.hash.slice(1);
  elem = doc.getElementById(hash);

  if (!elem) {
    // Fallback to anchor[name] if element with id is not found.
    // Linking to an anchor element with name is obsolete in html5.
    elem = doc.querySelector('a[name=' + hash + ']');
  }

  if (elem) {
    // TODO(dvoytenko): consider implementing animated scroll.
    viewport. /*OK*/scrollIntoView(elem);
  } else {
    _log.log.warn('documentElement', 'failed to find element with id=' + hash + ' or a[name=' + hash + ']');
  }
}

;

},{"./dom":64,"./log":77,"./service":88,"./url":102,"./viewport":106}],62:[function(require,module,exports){
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

},{"./asserts":55,"./service":88,"./url":102}],63:[function(require,module,exports){
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

},{"./observable":79,"./service":88,"./style":97}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

var _baseElement = require('./base-element');

/** @type {!Array} */
var stubbedElements = [];

exports.stubbedElements = stubbedElements;

var ElementStub = (function (_BaseElement) {
  babelHelpers.inherits(ElementStub, _BaseElement);

  function ElementStub(element) {
    babelHelpers.classCallCheck(this, ElementStub);

    _BaseElement.call(this, element);
    stubbedElements.push(this);
  }

  /** @override */

  ElementStub.prototype.isLayoutSupported = function isLayoutSupported(unusedLayout) {
    // Always returns true and will eventually call this method on the actual
    // element.
    return true;
  };

  return ElementStub;
})(_baseElement.BaseElement);

exports.ElementStub = ElementStub;

},{"./base-element":56}],66:[function(require,module,exports){
(function (process){
exports.__esModule = true;
exports.reportError = reportError;
exports.installErrorReporting = installErrorReporting;
exports.getErrorReportUrl = getErrorReportUrl;
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

var _exponentialBackoff = require('./exponential-backoff');

var _styles = require('./styles');

var globalExponentialBackoff = _exponentialBackoff.exponentialBackoff(1.5);

/**
 * Reports an error. If the error has an "associatedElement" property
 * the element is marked with the -amp-element-error and displays
 * the message itself. The message is always send to the console.
 * If the error has a "messageArray" property, that array is logged.
 * This way one gets the native fidelity of the console for things like
 * elements instead of stringification.
 * @param {!Error} error
 * @param {!Element=} opt_associatedElement
 */

function reportError(error, opt_associatedElement) {
  if (!window.console) {
    return;
  }
  if (error.reported) {
    return;
  }
  error.reported = true;
  var element = opt_associatedElement || error.associatedElement;
  if (element) {
    element.classList.add('-amp-error');
    if (_mode.getMode().development) {
      element.classList.add('-amp-element-error');
      element.setAttribute('error-message', error.message);
    }
  }
  if (error.messageArray) {
    (console.error || console.log).apply(console, error.messageArray);
  } else {
    if (element) {
      (console.error || console.log).call(console, element.tagName + '#' + element.id, error.message);
    } else {
      (console.error || console.log).call(console, error.message);
    }
    if (!(process.env.NODE_ENV == 'production')) {
      (console.error || console.log).call(console, error.stack);
    }
  }
  if (element && element.dispatchCustomEvent) {
    element.dispatchCustomEvent('amp:error', error.message);
  }
  reportErrorToServer(undefined, undefined, undefined, undefined, error);
}

/**
 * Install handling of global unhandled exceptions.
 * @param {!Window} win
 */

function installErrorReporting(win) {
  win.onerror = reportErrorToServer;
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {!Error|undefined} error
 */
function reportErrorToServer(message, filename, line, col, error) {
  // Make an attempt to unhide the body.
  if (this && this.document) {
    _styles.makeBodyVisible(this.document);
  }
  var mode = _mode.getMode();
  if (mode.isLocalDev || mode.development || mode.test) {
    return;
  }
  var url = getErrorReportUrl(message, filename, line, col, error);
  globalExponentialBackoff(function () {
    new Image().src = url;
  });
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {!Error|undefined} error
 * visibleForTesting
 */

function getErrorReportUrl(message, filename, line, col, error) {
  message = error && error.message ? error.message : message;
  if (/_reported_/.test(message)) {
    return;
  }
  if (!message) {
    message = 'Unknown error';
  }

  // This is the App Engine app in
  // ../tools/errortracker
  // It stores error reports via https://cloud.google.com/error-reporting/
  // for analyzing production issues.
  var url = 'https://amp-error-reporting.appspot.com/r' + '?v=' + encodeURIComponent('1453326962147') + '&m=' + encodeURIComponent(message);

  if (error) {
    var tagName = error && error.associatedElement ? error.associatedElement.tagName : 'u'; // Unknown
    // We may want to consider not reporting asserts but for now
    // this should be helpful.
    url += '&a=' + (error.fromAssert ? 1 : 0) + '&el=' + encodeURIComponent(tagName) + '&s=' + encodeURIComponent(error.stack || '');
    error.message += ' _reported_';
  } else {
    url += '&f=' + encodeURIComponent(filename) + '&l=' + encodeURIComponent(line) + '&c=' + encodeURIComponent(col || '');
  }

  // Shorten URLs to a value all browsers will send.
  return url.substr(0, 2000);
}

}).call(this,require('_process'))

},{"./exponential-backoff":69,"./mode":78,"./styles":98,"_process":7}],67:[function(require,module,exports){
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

},{"./timer":100}],68:[function(require,module,exports){
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

},{"./cookies":58,"./timer":100}],69:[function(require,module,exports){
exports.__esModule = true;
exports.exponentialBackoff = exponentialBackoff;
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
 * @param {opt_base} opt_base Exponential base. Defaults to 2.
 * @return {function(function())} Function that when invoked will
 *     call the passed in function. On every invocation the next
 *     invocation of the passed in function will be exponentially
 *     later.
 */

function exponentialBackoff(opt_base) {
  var count = 0;
  return function (work) {
    var wait = Math.pow(opt_base || 2, count++);
    // Add jitter to avoid the thundering herd. This can e.g. happen when
    // we poll a backend and it fails for everyone at the same time.
    // We wait up to 30% longer or shorter than the time otherwise
    // given for this cycle.
    var jitter = wait * .3 * Math.random();
    if (Math.random() > .5) {
      jitter *= -1;
    }
    wait += jitter;
    setTimeout(work, Math.round(wait * 1000));
  };
}

},{}],70:[function(require,module,exports){
exports.__esModule = true;
exports.registerExtendedElement = registerExtendedElement;
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

var _customElement = require('./custom-element');

/**
 * Registers an extended element. This function should typically be called
 * through the registerElement method on the AMP runtime.
 * @param {!Window} win
 * @param {string} name
 * @param {!Function} implementationClass
 * @package
 */

function registerExtendedElement(win, name, implementationClass) {
  _customElement.upgradeOrRegisterElement(win, name, implementationClass);
}

},{"./custom-element":60}],71:[function(require,module,exports){
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

var _observable = require('./observable');

var _timer = require('./timer');

/**
 * FocusHistory keeps track of recent focused elements. This history can be
 * purged using `purgeBefore` method.
 */

var FocusHistory = (function () {
  /**
   * @param {!Window} win
   * @param {number} purgeTimeout
   */

  function FocusHistory(win, purgeTimeout) {
    var _this = this;

    babelHelpers.classCallCheck(this, FocusHistory);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {number} */
    this.purgeTimeout_ = purgeTimeout;

    /** @private @const {!Array<!{el: !Element, time: time}>} */
    this.history_ = [];

    /** @private @const {!Observable<!Element>} */
    this.observeFocus_ = new _observable.Observable();

    /** @private @const {function(!Event)} */
    this.captureFocus_ = function (e) {
      if (e.target) {
        _this.pushFocus_(e.target);
      }
    };
    /** @private @const {function(!Event)} */
    this.captureBlur_ = function (unusedE) {
      // IFrame elements do not receive `focus` event. An alternative way is
      // implemented here. We wait for a blur to arrive on the main window
      // and after a short time check which element is active.
      _timer.timer.delay(function () {
        _this.pushFocus_(_this.win.document.activeElement);
      }, 500);
    };
    this.win.document.addEventListener('focus', this.captureFocus_, true);
    this.win.addEventListener('blur', this.captureBlur_);
  }

  /** @private For testing. */

  FocusHistory.prototype.cleanup_ = function cleanup_() {
    this.win.document.removeEventListener('focus', this.captureFocus_, true);
    this.win.removeEventListener('blur', this.captureBlur_);
  };

  /**
   * Add a listener for focus events.
   * @param {function(!Element)} handler
   * @return {!UnlistenDef}
   */

  FocusHistory.prototype.onFocus = function onFocus(handler) {
    return this.observeFocus_.add(handler);
  };

  /**
   * @param {!Element} element
   * @private
   */

  FocusHistory.prototype.pushFocus_ = function pushFocus_(element) {
    var now = _timer.timer.now();
    if (this.history_.length == 0 || this.history_[this.history_.length - 1].el != element) {
      this.history_.push({ el: element, time: now });
    } else {
      this.history_[this.history_.length - 1].time = now;
    }
    this.purgeBefore(now - this.purgeTimeout_);
    this.observeFocus_.fire(element);
  };

  /**
   * Returns the element that was focused last.
   * @return {!Element}
   */

  FocusHistory.prototype.getLast = function getLast() {
    if (this.history_.length == 0) {
      return null;
    }
    return this.history_[this.history_.length - 1].el;
  };

  /**
   * Removes elements from the history older than the specified time.
   * @param {time} time
   */

  FocusHistory.prototype.purgeBefore = function purgeBefore(time) {
    var index = this.history_.length - 1;
    for (var i = 0; i < this.history_.length; i++) {
      if (this.history_[i].time >= time) {
        index = i - 1;
        break;
      }
    }
    if (index != -1) {
      this.history_.splice(0, index + 1);
    }
  };

  /**
   * Returns `true` if the specified element contains any of the elements in
   * the history.
   * @param {!Element} element
   * @return {boolean}
   */

  FocusHistory.prototype.hasDescendantsOf = function hasDescendantsOf(element) {
    if (this.win.document.activeElement) {
      this.pushFocus_(this.win.document.activeElement);
    }
    for (var i = 0; i < this.history_.length; i++) {
      if (element.contains(this.history_[i].el)) {
        return true;
      }
    }
    return false;
  };

  return FocusHistory;
})();

exports.FocusHistory = FocusHistory;

},{"./observable":79,"./timer":100}],72:[function(require,module,exports){
exports.__esModule = true;
exports.inputFor = inputFor;
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

var _log = require('./log');

var _eventHelper = require('./event-helper');

var TAG_ = 'Input';

var MAX_MOUSE_CONFIRM_ATTEMPS_ = 3;
var CLICK_TIMEOUT_ = 300;

/**
 * Detects and maintains different types of input such as touch, mouse or
 * keyboard.
 */

var Input = (function () {
  /**
   * @param {!Window} win
   */

  function Input(win) {
    babelHelpers.classCallCheck(this, Input);

    /** @const {!Window} */
    this.win = win;

    /** @private {!Function} */
    this.boundOnKeyDown_ = this.onKeyDown_.bind(this);

    /** @private {!Function} */
    this.boundOnMouseDown_ = this.onMouseDown_.bind(this);

    /** @private {!Function} */
    this.boundOnMouseMove_ = this.onMouseMove_.bind(this);

    /** @private {!Function} */
    this.boundMouseCanceled_ = this.mouseCanceled_.bind(this);

    /** @private {!Function} */
    this.boundMouseConfirmed_ = this.mouseConfirmed_.bind(this);

    /** @private {boolean} */
    this.hasTouch_ = 'ontouchstart' in win || win.navigator['maxTouchPoints'] !== undefined && win.navigator['maxTouchPoints'] > 0 || win['DocumentTouch'] !== undefined;
    _log.log.fine(TAG_, 'touch detected:', this.hasTouch_);

    /** @private {boolean} */
    this.keyboardActive_ = false;
    this.win.document.addEventListener('keydown', this.boundOnKeyDown_);
    this.win.document.addEventListener('mousedown', this.boundOnMouseDown_);

    /** @private {boolean} */
    this.hasMouse_ = true;

    /** @private {number} */
    this.mouseConfirmAttemptCount_ = 0;

    /** @private {!Observable<boolean>} */
    this.touchDetectedObservable_ = new _observable.Observable();

    /** @private {!Observable<boolean>} */
    this.mouseDetectedObservable_ = new _observable.Observable();

    /** @private {!Observable<boolean>} */
    this.keyboardStateObservable_ = new _observable.Observable();

    // If touch available, temporarily set hasMouse to false and wait for
    // mouse events.
    if (this.hasTouch_) {
      this.hasMouse_ = !this.hasTouch_;
      _eventHelper.listenOnce(win.document, 'mousemove', this.boundOnMouseMove_);
    }
  }

  /**
   * @param {!Window} window
   * @return {!Input}
   */

  /** @private */

  Input.prototype.cleanup_ = function cleanup_() {
    this.win.document.removeEventListener('keydown', this.boundOnKeyDown_);
    this.win.document.removeEventListener('mousedown', this.boundOnMouseDown_);
  };

  /**
   * Whether the touch input has been detected.
   * @return {boolean}
   */

  Input.prototype.isTouchDetected = function isTouchDetected() {
    return this.hasTouch_;
  };

  /**
   * Registers an event handle in case if the touch is detected.
   * @param {function(boolean)} handler
   * @param {boolean=} opt_fireImmediately
   * @return {!UnlistenDef}
   */

  Input.prototype.onTouchDetected = function onTouchDetected(handler, opt_fireImmediately) {
    if (opt_fireImmediately) {
      handler(this.isTouchDetected());
    }
    return this.touchDetectedObservable_.add(handler);
  };

  /**
   * Whether the mouse input has been detected.
   * @return {boolean}
   */

  Input.prototype.isMouseDetected = function isMouseDetected() {
    return this.hasMouse_;
  };

  /**
   * Registers an event handle in case if the mouse is detected.
   * @param {function(boolean)} handler
   * @param {boolean=} opt_fireImmediately
   * @return {!UnlistenDef}
   */

  Input.prototype.onMouseDetected = function onMouseDetected(handler, opt_fireImmediately) {
    if (opt_fireImmediately) {
      handler(this.isMouseDetected());
    }
    return this.mouseDetectedObservable_.add(handler);
  };

  /**
   * Whether the keyboard input is currently active.
   * @return {boolean}
   */

  Input.prototype.isKeyboardActive = function isKeyboardActive() {
    return this.keyboardActive_;
  };

  /**
   * Registers an event handle for changes in the keyboard input.
   * @param {function(boolean)} handler
   * @param {boolean=} opt_fireImmediately
   * @return {!UnlistenDef}
   */

  Input.prototype.onKeyboardStateChanged = function onKeyboardStateChanged(handler, opt_fireImmediately) {
    if (opt_fireImmediately) {
      handler(this.isKeyboardActive());
    }
    return this.keyboardStateObservable_.add(handler);
  };

  /**
   * @param {!Event} e
   * @private
   */

  Input.prototype.onKeyDown_ = function onKeyDown_(e) {
    if (this.keyboardActive_) {
      return;
    }

    if (e.defaultPrevented) {
      return;
    }

    // Ignore inputs.
    var target = e.target;
    if (target && (target.tagName == 'INPUT' || target.tagName == 'TEXTAREA' || target.tagName == 'SELECT' || target.tagName == 'OPTION' || target.hasAttribute('contenteditable'))) {
      return;
    }

    this.keyboardActive_ = true;
    this.keyboardStateObservable_.fire(true);
    _log.log.fine(TAG_, 'keyboard activated');
  };

  /** @private */

  Input.prototype.onMouseDown_ = function onMouseDown_() {
    if (!this.keyboardActive_) {
      return;
    }
    this.keyboardActive_ = false;
    this.keyboardStateObservable_.fire(false);
    _log.log.fine(TAG_, 'keyboard deactivated');
  };

  /** @private */

  Input.prototype.onMouseMove_ = function onMouseMove_() {
    // If "click" arrives within a timeout time, this is most likely a
    // touch/mouse emulation. Otherwise, if timeout exceeded, this looks
    // like a legitimate mouse event.
    return _eventHelper.listenOncePromise(this.win.document, 'click', false, CLICK_TIMEOUT_).then(this.boundMouseCanceled_, this.boundMouseConfirmed_);
  };

  /** @private */

  Input.prototype.mouseConfirmed_ = function mouseConfirmed_() {
    this.hasMouse_ = true;
    this.mouseDetectedObservable_.fire(true);
    _log.log.fine(TAG_, 'mouse detected');
  };

  /** @private */

  Input.prototype.mouseCanceled_ = function mouseCanceled_() {
    // Repeat, if attempts allow.
    this.mouseConfirmAttemptCount_++;
    if (this.mouseConfirmAttemptCount_ <= MAX_MOUSE_CONFIRM_ATTEMPS_) {
      _eventHelper.listenOnce(this.win.document, 'mousemove', this.boundOnMouseMove_);
    } else {
      _log.log.fine(TAG_, 'mouse detection failed');
    }
  };

  return Input;
})();

exports.Input = Input;

function inputFor(window) {
  return _service.getService(window, 'input', function () {
    return new Input(window);
  });
}

;

},{"./event-helper":67,"./log":77,"./observable":79,"./service":88}],73:[function(require,module,exports){
exports.__esModule = true;
exports.getIntersectionChangeEntry = getIntersectionChangeEntry;
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

var _layoutRect = require('./layout-rect');

/**
 * Produces a change entry for that should be compatible with
 * IntersectionObserverEntry.
 *
 * Mutates passed in rootBounds to have x and y according to spec.
 *
 * @param {number} time Time when values below were measured.
 * @param {!LayoutRect} rootBounds Equivalent to viewport.getRect()
 * @param {!LayoutRect} elementLayoutBox Layout box of the element
 *     that may intersect with the rootBounds.
 * @return {!IntersectionObserverEntry} A change entry.
 * @private
 */

function getIntersectionChangeEntry(measureTime, rootBounds, elementLayoutBox) {
    // Building an IntersectionObserverEntry.
    // http://rawgit.com/slightlyoff/IntersectionObserver/master/index.html#intersectionobserverentry
    // These should always be equal assuming rootBounds cannot have negative
    // dimension.
    rootBounds.x = rootBounds.left;
    rootBounds.y = rootBounds.top;

    var boundingClientRect = _layoutRect.moveLayoutRect(elementLayoutBox, -1 * rootBounds.x, -1 * rootBounds.y);
    _asserts.assert(boundingClientRect.width >= 0 && boundingClientRect.height >= 0, 'Negative dimensions in ad.');
    boundingClientRect.x = boundingClientRect.left;
    boundingClientRect.y = boundingClientRect.top;

    var intersectionRect = _layoutRect.rectIntersection(rootBounds, elementLayoutBox) ||
    // No intersection.
    _layoutRect.layoutRectLtwh(0, 0, 0, 0);
    intersectionRect.x = intersectionRect.left;
    intersectionRect.y = intersectionRect.top;

    return {
        time: measureTime,
        rootBounds: rootBounds,
        boundingClientRect: boundingClientRect,
        intersectionRect: intersectionRect
    };
}

},{"./asserts":55,"./layout-rect":74}],74:[function(require,module,exports){
exports.__esModule = true;
exports.layoutRectLtwh = layoutRectLtwh;
exports.layoutRectFromDomRect = layoutRectFromDomRect;
exports.layoutRectsOverlap = layoutRectsOverlap;
exports.rectIntersection = rectIntersection;
exports.expandLayoutRect = expandLayoutRect;
exports.moveLayoutRect = moveLayoutRect;
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
 * The structure that combines position and size for an element. The exact
 * interpretation of position and size depends on the use case.
 *
 * @typedef {{
 *   top: number,
 *   bottom: number,
 *   left: number,
 *   right: number,
 *   width: number,
 *   height: number
 * }}
 */
var LayoutRectDef = undefined;

/**
 * Creates a layout rect based on the left, top, width and height parameters
 * in that order.
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @return {!LayoutRectDef}
 */

function layoutRectLtwh(left, top, width, height) {
  return {
    left: left,
    top: top,
    width: width,
    height: height,
    bottom: top + height,
    right: left + width
  };
}

/**
 * Creates a layout rect based on the DOMRect, e.g. obtained from calling
 * getBoundingClientRect.
 * @param {!DOMRect} rect
 * @return {!LayoutRectDef}
 */

function layoutRectFromDomRect(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    bottom: rect.top + rect.height,
    right: rect.left + rect.width
  };
}

/**
 * Returns true if the specified two rects overlap by a single pixel.
 * @param {!LayoutRectDef} r1
 * @param {!LayoutRectDef} r2
 * @return {boolean}
 */

function layoutRectsOverlap(r1, r2) {
  return r1.top <= r2.bottom && r2.top <= r1.bottom && r1.left <= r2.right && r2.left <= r1.right;
}

/**
 * Returns the intersection between a, b or null if there is none.
 * @param {!LayoutRectDef} a
 * @param {!LayoutRectDef} b
 * @return {?LayoutRectDef}
 */

function rectIntersection(a, b) {
  var x0 = Math.max(a.left, b.left);
  var x1 = Math.min(a.left + a.width, b.left + b.width);

  if (x0 <= x1) {
    var y0 = Math.max(a.top, b.top);
    var y1 = Math.min(a.top + a.height, b.top + b.height);

    if (y0 <= y1) {
      return layoutRectLtwh(x0, y0, x1 - x0, y1 - y0);
    }
  }
  return null;
}

/**
 * Expand the layout rect using multiples of width and height.
 * @param {!LayoutRectDef} rect Original rect.
 * @param {number} dw Expansion in width, specified as a multiple of width.
 * @param {number} dh Expansion in height, specified as a multiple of height.
 * @return {!LayoutRectDef}
 */

function expandLayoutRect(rect, dw, dh) {
  return {
    top: rect.top - rect.height * dh,
    bottom: rect.bottom + rect.height * dh,
    left: rect.left - rect.width * dw,
    right: rect.right + rect.width * dw,
    width: rect.width * (1 + dw * 2),
    height: rect.height * (1 + dh * 2)
  };
}

/**
 * Moves the layout rect using dx and dy.
 * @param {!LayoutRectDef} rect Original rect.
 * @param {number} dx Move horizontally with this value.
 * @param {number} dy Move vertically with this value.
 * @return {!LayoutRectDef}
 */

function moveLayoutRect(rect, dx, dy) {
  if (dx == 0 && dy == 0) {
    return rect;
  }
  return layoutRectLtwh(rect.left + dx, rect.top + dy, rect.width, rect.height);
}

},{}],75:[function(require,module,exports){
exports.__esModule = true;
exports.parseLayout = parseLayout;
exports.getLayoutClass = getLayoutClass;
exports.isLayoutSizeDefined = isLayoutSizeDefined;
exports.isInternalElement = isInternalElement;
exports.parseLength = parseLength;
exports.assertLength = assertLength;
exports.getLengthUnits = getLengthUnits;
exports.getLengthNumeral = getLengthNumeral;
exports.hasNaturalDimensions = hasNaturalDimensions;
exports.getNaturalDimensions = getNaturalDimensions;
exports.isLoadingAllowed = isLoadingAllowed;
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
 * @fileoverview Implements element layout. See https://goo.gl/9avXuT for
 * details.
 */

var _asserts = require('./asserts');

/**
 * @enum {string}
 */
var Layout = {
  NODISPLAY: 'nodisplay',
  FIXED: 'fixed',
  FIXED_HEIGHT: 'fixed-height',
  RESPONSIVE: 'responsive',
  CONTAINER: 'container',
  FILL: 'fill'
};

exports.Layout = Layout;
/**
 * CSS Length type. E.g. "1px" or "20vh".
 * @typedef {string}
 */
var LengthDef = undefined;

/**
 * @typedef {{
 *   width: string,
 *   height: string
 * }}
 */
var DimensionsDef = undefined;

/**
 * The set of elements with natural dimensions, that is, elements
 * which have a known dimension either based on their value specified here,
 * or, if the value is null, a dimension specific to the browser.
 * `hasNaturalDimensions` checks for membership in this set.
 * `getNaturalDimensions` determines the dimensions for an element in the
 *    set and caches it.
 * @type {!Object<string, ?DimensionsDef>}
 * @private  Visible for testing only!
 */
var naturalDimensions_ = {
  'AMP-PIXEL': { width: '1px', height: '1px' },
  'AMP-ANALYTICS': { width: '1px', height: '1px' },
  // TODO(dvoytenko): audio should have width:auto.
  'AMP-AUDIO': null
};

exports.naturalDimensions_ = naturalDimensions_;
/**
 * Elements that the progess can be shown for. This set has to be externalized
 * since the element's implementation may not be downloaded yet.
 * @enum {boolean}
 * @private  Visible for testing only!
 */
var LOADING_ELEMENTS_ = {
  'AMP-ANIM': true,
  'AMP-BRIGHTCOVE': true,
  'AMP-IFRAME': true,
  'AMP-IMG': true,
  'AMP-INSTAGRAM': true,
  'AMP-LIST': true,
  'AMP-PINTEREST': true,
  'AMP-VIDEO': true
};

exports.LOADING_ELEMENTS_ = LOADING_ELEMENTS_;
/**
 * @param {string} s
 * @return {Layout|undefined} Returns undefined in case of failure to parse
 *   the layout string.
 */

function parseLayout(s) {
  for (var k in Layout) {
    if (Layout[k] == s) {
      return Layout[k];
    }
  }
  return undefined;
}

/**
 * @param {!Layout} layout
 * @return {string}
 */

function getLayoutClass(layout) {
  return '-amp-layout-' + layout;
}

/**
 * Whether an element with this layout inherently defines the size.
 * @param {!Layout} layout
 * @return {boolean}
 */

function isLayoutSizeDefined(layout) {
  return layout == Layout.FIXED || layout == Layout.FIXED_HEIGHT || layout == Layout.RESPONSIVE || layout == Layout.FILL;
}

/**
 * Whether the tag is an internal (service) AMP tag.
 * @param {!Node|string} tag
 * @return {boolean}
 */

function isInternalElement(tag) {
  var tagName = typeof tag == 'string' ? tag : tag.tagName;
  return tagName && tagName.toLowerCase().indexOf('i-') == 0;
}

/**
 * Parses the CSS length value. If no units specified, the assumed value is
 * "px". Returns undefined in case of parsing error.
 * @param {string|undefined} s
 * @return {!LengthDef|undefined}
 */

function parseLength(s) {
  if (typeof s == 'number') {
    return s + 'px';
  }
  if (!s) {
    return undefined;
  }
  if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax)?$/.test(s)) {
    return undefined;
  }
  if (/^\d+(\.\d+)?$/.test(s)) {
    return s + 'px';
  }
  return s;
}

/**
 * Asserts that the supplied value is a CSS Length value.
 * @param {!LengthDef|string} length
 * @return {!LengthDef}
 */

function assertLength(length) {
  _asserts.assert(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax)$/.test(length), 'Invalid length value: %s', length);
  return length;
}

/**
 * Returns units from the CSS length value.
 * @param {!LengthDef} length
 * @return {string}
 */

function getLengthUnits(length) {
  assertLength(length);
  var m = _asserts.assert(length.match(/[a-z]+/i), 'Failed to read units from %s', length);
  return m[0];
}

/**
 * Returns the numeric value of a CSS length value.
 * @param {!LengthDef|string} length
 * @return {number}
 */

function getLengthNumeral(length) {
  return parseFloat(length);
}

/**
 * Determines whether the tagName is a known element that has natural dimensions
 * in our runtime or the browser.
 * @param {string} tagName The element tag name.
 * @return {DimensionsDef}
 */

function hasNaturalDimensions(tagName) {
  tagName = tagName.toUpperCase();
  return naturalDimensions_[tagName] !== undefined;
}

/**
 * Determines the default dimensions for an element which could vary across
 * different browser implementations, like <audio> for instance.
 * This operation can only be completed for an element whitelisted by
 * `hasNaturalDimensions`.
 * @param {string} tagName The element tag name.
 * @return {DimensionsDef}
 */

function getNaturalDimensions(tagName) {
  tagName = tagName.toUpperCase();
  _asserts.assert(naturalDimensions_[tagName] !== undefined);
  if (!naturalDimensions_[tagName]) {
    var naturalTagName = tagName.replace(/^AMP\-/, '');
    var temp = document.createElement(naturalTagName);
    // For audio, should no-op elsewhere.
    temp.controls = true;
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    document.body.appendChild(temp);
    naturalDimensions_[tagName] = {
      width: (temp. /*OK*/offsetWidth || 1) + 'px',
      height: (temp. /*OK*/offsetHeight || 1) + 'px'
    };
    document.body.removeChild(temp);
  }
  return naturalDimensions_[tagName];
}

/**
 * Whether the loading can be shown for the specified elemeent. This set has
 * to be externalized since the element's implementation may not be
 * downloaded yet.
 * @param {string} tagName The element tag name.
 * @return {boolean}
 */

function isLoadingAllowed(tagName) {
  return LOADING_ELEMENTS_[tagName.toUpperCase()] || false;
}

},{"./asserts":55}],76:[function(require,module,exports){
exports.__esModule = true;
exports.createLoaderElement = createLoaderElement;
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
 * Creates a default "loading indicator" element. This element accepts
 * `amp-active` class in which case it may choose to run an animation.
 * @return {!Element}
 */

function createLoaderElement() {
  var loader = document.createElement('div');
  loader.classList.add('-amp-loader');
  for (var i = 0; i < 3; i++) {
    var dot = document.createElement('div');
    dot.classList.add('-amp-loader-dot');
    loader.appendChild(dot);
  }
  return loader;
}

},{}],77:[function(require,module,exports){
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

},{"./mode":78}],78:[function(require,module,exports){
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

},{"./url":102,"_process":7}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

var _timer = require('./timer');

/**
 * Pass class helps to manage single-pass process. A pass is scheduled using
 * delay method. Only one pass can be pending at a time. If no pass is pending
 * the process is considered to be "idle".
 */

var Pass = (function () {

  /**
   * Creates a new Pass instance.
   * @param {function()} handler Handler to be executed when pass is triggered.
   * @param {number=} opt_defaultDelay Default delay to be used when schedule
   *   is called without one.
   */

  function Pass(handler, opt_defaultDelay) {
    babelHelpers.classCallCheck(this, Pass);

    /** @private @const {function()} */
    this.handler_ = handler;

    /** @private @const {number|string} */
    this.defaultDelay_ = opt_defaultDelay || 0;

    /** @private {number|string} */
    this.scheduled_ = -1;

    /** @private {number} */
    this.nextTime_ = 0;

    /** @private {boolean} */
    this.running_ = false;
  }

  /**
   * Whether or not a pass is currently pending.
   * @return {boolean}
   */

  Pass.prototype.isPending = function isPending() {
    return this.scheduled_ != -1;
  };

  /**
   * Tries to schedule a new pass optionally with specified delay. If the new
   * requested pass is requested before the pending pass, the pending pass is
   * canceled. If the new pass is requested after the pending pass, the newly
   * requested pass is ignored.
   *
   * Returns {@code true} if the pass has been scheduled and {@code false} if
   * ignored.
   *
   * @param {number=} opt_delay Delay to schedule the pass. If not specified
   *   the default delay is used, falling back to 0.
   * @return {boolean}
   */

  Pass.prototype.schedule = function schedule(opt_delay) {
    var _this = this;

    var delay = opt_delay || this.defaultDelay_;
    if (this.running_ && delay < 10) {
      // If we get called recursively, wait at least 10ms for the next
      // execution.
      delay = 10;
    }
    var nextTime = _timer.timer.now() + delay;
    // Schedule anew if nothing is scheduled currently of if the new time is
    // sooner then previously requested.
    if (this.scheduled_ == -1 || nextTime - this.nextTime_ < -10) {
      if (this.scheduled_ != -1) {
        _timer.timer.cancel(this.scheduled_);
      }
      this.nextTime_ = nextTime;
      this.scheduled_ = _timer.timer.delay(function () {
        _this.scheduled_ = -1;
        _this.nextTime_ = 0;
        _this.running_ = true;
        _this.handler_();
        _this.running_ = false;
      }, delay);
      return true;
    }
    return false;
  };

  /**
   * Cancels the pending pass if any.
   */

  Pass.prototype.cancel = function cancel() {
    if (this.scheduled_ != -1) {
      _timer.timer.cancel(this.scheduled_);
      this.scheduled_ = -1;
    }
  };

  return Pass;
})();

exports.Pass = Pass;

},{"./timer":100}],81:[function(require,module,exports){
exports.__esModule = true;
exports.performanceFor = performanceFor;
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

var _timer = require('./timer');

/**
 * Maximum number of tick events we allow to accumulate in the performance
 * instance's queue before we start dropping those events and can no longer
 * be forwarded to the actual `tick` function when it is set.
 * @const {number}
 */
var QUEUE_LIMIT_ = 50;

/**
 * @typedef {{
 *   label: string,
 *   opt_from: (string|null|undefined),
 *   opt_value: (number|undefined)
 * }}
 */

var TickEventDef = function TickEventDef() {
  babelHelpers.classCallCheck(this, TickEventDef);
}

/**
 * Performance holds the mechanism to call `tick` to stamp out important
 * events in the lifecycle of the AMP runtime. It can hold a small amount
 * of tick events to forward to the external `tick` function when it is set.
 */
;

var Performance = (function () {

  /**
   * @param {!Window} win
   */

  function Performance(win) {
    babelHelpers.classCallCheck(this, Performance);

    /** @const {!Window} */
    this.win = win;

    /** @const @private {funtion(string,?string=,number=)|undefined} */
    this.tick_;

    /** @const @private {funtion()|undefined} */
    this.flush_;

    /** @const @private {!Array<TickEventDef>} */
    this.events_ = [];
  }

  /**
   * @param {!Window} window
   * @return {!Performance}
   * @export
   */

  /**
   * Forwards tick events to the tick function set or queues it up to be
   * flushed at a later time.
   *
   * @param {string} label The variable name as it will be reported.
   * @param {?string=} opt_from The label of a previous tick to use as a
   *    relative start for this tick.
   * @param {number=} opt_value The time to record the tick at. Optional, if
   *    not provided, use the current time.
   * @export
   */

  Performance.prototype.tick = function tick(label, opt_from, opt_value) {
    if (this.tick_) {
      this.tick_(label, opt_from, opt_value);
    } else {
      this.queueTick_(label, opt_from, opt_value);
    }
  };

  /**
   * Calls the flush callback function set through setTickFunction.
   * @export
   */

  Performance.prototype.flush = function flush() {
    if (this.flush_) {
      this.flush_();
    }
  };

  /**
   * Queues the events to be flushed when tick function is set.
   *
   * @param {string} label The variable name as it will be reported.
   * @param {?string=} opt_from The label of a previous tick to use as a
   *    relative start for this tick.
   * @param {number=} opt_value The time to record the tick at. Optional, if
   *    not provided, use the current time.
   * @private
   */

  Performance.prototype.queueTick_ = function queueTick_(label, opt_from, opt_value) {
    if (opt_value == undefined) {
      opt_value = _timer.timer.now();
    }

    // Start dropping the head of the queue if we've reached the limit
    // so that we don't take up too much memory in the runtime.
    if (this.events_.length >= QUEUE_LIMIT_) {
      this.events_.shift();
    }

    this.events_.push({
      label: label,
      opt_from: opt_from,
      opt_value: opt_value
    });
  };

  /** @private */

  Performance.prototype.flushQueuedTicks_ = function flushQueuedTicks_() {
    var _this = this;

    if (!this.tick_) {
      return;
    }

    this.events_.forEach(function (tickEvent) {
      _this.tick_(tickEvent.label, tickEvent.opt_from, tickEvent.opt_value);
    });
    this.events_.length = 0;
  };

  /**
   * Sets the `tick` function.
   *
   * @param {funtion(string,?string=,number=)} tick function that the tick
   *   events get forwarded to. Function can take in a `label` as the first
   *   argument and an optional `opt_from` label to use
   *   as a relative start for this tick. A third argument `opt_value` can
   *   also be provided to indicate when to record the tick at.
   * @param {function()=} opt_flush callback function that is called
   *   when we are ready for the ticks to be forwarded to an endpoint.
   * @export
   */

  Performance.prototype.setTickFunction = function setTickFunction(tick, opt_flush) {
    this.tick_ = tick;
    this.flush_ = opt_flush;
    this.flushQueuedTicks_();
    // We need to call flush right away in case `setTickFunction` is called
    // later than the amp codebase had invoked the performance services'
    // `flush` method to forward ticks.
    this.flush();
  };

  return Performance;
})();

exports.Performance = Performance;

function performanceFor(window) {
  return _service.getService(window, 'performance', function () {
    return new Performance(window);
  });
}

;

},{"./service":88,"./timer":100}],82:[function(require,module,exports){
exports.__esModule = true;
exports.platformFor = platformFor;
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
 * A helper class that provides information about device/OS/browser currently
 * running.
 */

var Platform = (function () {

  /**
   * @param {!Window} win
   */

  function Platform(win) {
    babelHelpers.classCallCheck(this, Platform);

    /** @const {!Window} */
    this.win = win;
  }

  /**
   * Whether the current platform an iOS device.
   * @return {boolean}
   */

  Platform.prototype.isIos = function isIos() {
    return (/iPhone|iPad|iPod/i.test(this.win.navigator.userAgent)
    );
  };

  /**
   * Whether the current browser is Safari.
   * @return {boolean}
   */

  Platform.prototype.isSafari = function isSafari() {
    return (/Safari/i.test(this.win.navigator.userAgent) && !this.isChrome()
    );
  };

  /**
   * Whether the current browser a Chrome browser.
   * @return {boolean}
   */

  Platform.prototype.isChrome = function isChrome() {
    // Also true for MS Edge :)
    return (/Chrome|CriOS/i.test(this.win.navigator.userAgent)
    );
  };

  return Platform;
})();

exports.Platform = Platform;
;

/**
 * @param {!Window} window
 * @return {!Platform}
 */

function platformFor(window) {
  return _service.getService(window, 'platform', function () {
    return new Platform(window);
  });
}

;

var platform = platformFor(window);
exports.platform = platform;

},{"./service":88}],83:[function(require,module,exports){
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

require('document-register-element/build/document-register-element.max');

require('./custom-core-js-shim');

},{"./custom-core-js-shim":59,"document-register-element/build/document-register-element.max":50}],84:[function(require,module,exports){
exports.__esModule = true;
exports.preconnectFor = preconnectFor;
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
 * @fileoverview Provides a services to preconnect to a url to warm up the
 * connection before the real request can be made.
 */

var _service = require('./service');

var _url2 = require('./url');

var _timer = require('./timer');

var _platform = require('./platform');

var ACTIVE_CONNECTION_TIMEOUT_MS = 180 * 1000;
var PRECONNECT_TIMEOUT_MS = 10 * 1000;

var Preconnect = (function () {

  /**
   * @param {!Window} win
   */

  function Preconnect(win) {
    babelHelpers.classCallCheck(this, Preconnect);

    /** @private @const {!Element} */
    this.head_ = win.document.head;
    /**
     * Origin we've preconnected to and when that connection
     * expires as a timestamp in MS.
     * @private @const {!Object<string, number>}
     */
    this.origins_ = {};
    /**
     * Urls we've prefetched.
     * @private @const {!Object<string, boolean>}
     */
    this.urls_ = {};
    /** @private @const {!Platform}  */
    this.platform_ = _platform.platformFor(win);
    // Mark current origin as preconnected.
    this.origins_[_url2.parseUrl(win.location.href).origin] = true;
  }

  /**
   * @param {!Window} window
   * @return {!Preconnect}
   */

  /**
   * Preconnects to a URL. Always also does a dns-prefetch because
   * browser support for that is better.
   * @param {string} url
   * @param {boolean=} opt_alsoConnecting Set this flag if you also just
   *    did or are about to connect to this host. This is for the case
   *    where preconnect is issued immediate before or after actual connect
   *    and preconnect is used to flatten a deep HTTP request chain.
   *    E.g. when you preconnect to a host that an embed will connect to
   *    when it is more fully rendered, you already know that the connection
   *    will be used very soon.
   */

  Preconnect.prototype.url = function url(_url, opt_alsoConnecting) {
    if (!this.isInterestingUrl_(_url)) {
      return;
    }
    var origin = _url2.parseUrl(_url).origin;
    var now = _timer.timer.now();
    var lastPreconnectTimeout = this.origins_[origin];
    if (lastPreconnectTimeout && now < lastPreconnectTimeout) {
      if (opt_alsoConnecting) {
        this.origins_[origin] = now + ACTIVE_CONNECTION_TIMEOUT_MS;
      }
      return;
    }
    // If we are about to use the connection, don't re-preconnect for
    // 180 seconds.
    var timeout = opt_alsoConnecting ? ACTIVE_CONNECTION_TIMEOUT_MS : PRECONNECT_TIMEOUT_MS;
    this.origins_[origin] = now + timeout;
    var dns = document.createElement('link');
    dns.setAttribute('rel', 'dns-prefetch');
    dns.setAttribute('href', origin);
    var preconnect = document.createElement('link');
    preconnect.setAttribute('rel', 'preconnect');
    preconnect.setAttribute('href', origin);
    this.head_.appendChild(dns);
    this.head_.appendChild(preconnect);

    // Remove the tags eventually to free up memory.
    _timer.timer.delay(function () {
      if (dns.parentNode) {
        dns.parentNode.removeChild(dns);
      }
      if (preconnect.parentNode) {
        preconnect.parentNode.removeChild(preconnect);
      }
    }, 10000);

    this.preconnectPolyfill_(origin);
  };

  /**
   * Asks the browser to prefetch a URL. Always also does a preconnect
   * because browser support for that is better.
   * @param {string} url
   */

  Preconnect.prototype.prefetch = function prefetch(url) {
    if (!this.isInterestingUrl_(url)) {
      return;
    }
    if (this.urls_[url]) {
      return;
    }
    this.urls_[url] = true;
    this.url(url, /* opt_alsoConnecting */true);
    var prefetch = document.createElement('link');
    prefetch.setAttribute('rel', 'prefetch');
    prefetch.setAttribute('href', url);
    this.head_.appendChild(prefetch);
    // As opposed to preconnect we do not clean this tag up, because there is
    // no expectation as to it having an immediate effect.
  };

  Preconnect.prototype.isInterestingUrl_ = function isInterestingUrl_(url) {
    if (url.indexOf('https:') == 0 || url.indexOf('http:') == 0) {
      return true;
    }
    return false;
  };

  /**
   * Safari does not support preconnecting, but due to its significant
   * performance benefits we implement this crude polyfill.
   *
   * We make an image connection to a "well-known" file on the origin adding
   * a random query string to bust the cache (no caching because we do want to
   * actually open the connection).
   *
   * This should get us an open SSL connection to these hosts and significantly
   * speed up the next connections.
   *
   * The actual URL is expected to 404. If you see errors for
   * amp_preconnect_polyfill in your DevTools console or server log:
   * This is expected and fine to leave as is. Its fine to send a non 404
   * response, but please make it small :)
   */

  Preconnect.prototype.preconnectPolyfill_ = function preconnectPolyfill_(origin) {
    // Unfortunately there is no way to feature detect whether preconnect is
    // supported, so we do this only in Safari, which is the most important
    // browser without support for it. This needs to be removed should it
    // ever add support.
    if (!this.platform_.isSafari()) {
      return;
    }
    // Don't attempt to preconnect for ACTIVE_CONNECTION_TIMEOUT_MS since
    // we effectively create an active connection.
    // TODO(@cramforce): Confirm actual http2 timeout in Safari.
    this.origins_[origin] = _timer.timer.now() + ACTIVE_CONNECTION_TIMEOUT_MS;
    var url = origin + '/amp_preconnect_polyfill?' + Math.random();
    // We use an XHR without withCredentials(true), so we do not send cookies
    // to the host and the host cannot set cookies.
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);
    xhr.send();
  };

  return Preconnect;
})();

function preconnectFor(window) {
  return _service.getService(window, 'preconnect', function () {
    return new Preconnect(window);
  });
}

;

},{"./platform":82,"./service":88,"./timer":100,"./url":102}],85:[function(require,module,exports){
exports.__esModule = true;
exports.installPullToRefreshBlocker = installPullToRefreshBlocker;
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

var _platform = require('./platform');

var _viewer = require('./viewer');

var _viewport = require('./viewport');

/**
 * Installs "pull-to-refresh" (P2R) blocker if viewer has requested. P2R can
 * be very disruptive for different viewer scenarios. This is currently only
 * done on Chrome (both Android and iOS).
 * @param {!Window} win
 */

function installPullToRefreshBlocker(win) {
  // Only do when requested and don't even try it on Safari!
  if (_viewer.viewerFor(win).getParam('p2r') == '0' && _platform.platformFor(win).isChrome()) {
    new PullToRefreshBlocker(win.document, _viewport.viewportFor(win));
  }
}

/**
 * Visible for testing only.
 * @private
 */

var PullToRefreshBlocker = (function () {
  /**
   * @param {!Document} doc
   * @param {!Viewport} viewport
   */

  function PullToRefreshBlocker(doc, viewport) {
    babelHelpers.classCallCheck(this, PullToRefreshBlocker);

    /** @private {!Document} */
    this.doc_ = doc;

    /** @private {!Viewport} */
    this.viewport_ = viewport;

    /** @private {boolean} */
    this.tracking_ = false;

    /** @private {number} */
    this.startPos_ = 0;

    /** @private {!Function} */
    this.boundTouchStart_ = this.onTouchStart_.bind(this);
    /** @private {!Function} */
    this.boundTouchMove_ = this.onTouchMove_.bind(this);
    /** @private {!Function} */
    this.boundTouchEnd_ = this.onTouchEnd_.bind(this);
    /** @private {!Function} */
    this.boundTouchCancel_ = this.onTouchCancel_.bind(this);

    this.doc_.addEventListener('touchstart', this.boundTouchStart_, true);
  }

  /** */

  PullToRefreshBlocker.prototype.cleanup = function cleanup() {
    this.stopTracking_();
    this.doc_.removeEventListener('touchstart', this.boundTouchStart_, true);
  };

  /**
   * @param {!Event} event
   * @private
   */

  PullToRefreshBlocker.prototype.onTouchStart_ = function onTouchStart_(event) {
    // P2R won't trigger when document is scrolled. Also can ignore when we are
    // already tracking this touch and for non-single-touch events.
    if (this.tracking_ || !(event.touches && event.touches.length == 1) || this.viewport_.getTop() > 0) {
      return;
    }

    this.startTracking_(event.touches[0].clientY);
  };

  /**
   * @param {number} startPos
   * @private
   */

  PullToRefreshBlocker.prototype.startTracking_ = function startTracking_(startPos) {
    this.tracking_ = true;
    this.startPos_ = startPos;
    this.doc_.addEventListener('touchmove', this.boundTouchMove_, true);
    this.doc_.addEventListener('touchend', this.boundTouchEnd_, true);
    this.doc_.addEventListener('touchcancel', this.boundTouchCancel_, true);
  };

  /** @private */

  PullToRefreshBlocker.prototype.stopTracking_ = function stopTracking_() {
    this.tracking_ = false;
    this.startPos_ = 0;
    this.doc_.removeEventListener('touchmove', this.boundTouchMove_, true);
    this.doc_.removeEventListener('touchend', this.boundTouchEnd_, true);
    this.doc_.removeEventListener('touchcancel', this.boundTouchCancel_, true);
  };

  /**
   * @param {!Event} event
   * @private
   */

  PullToRefreshBlocker.prototype.onTouchMove_ = function onTouchMove_(event) {
    if (!this.tracking_) {
      return;
    }

    var dy = event.touches[0].clientY - this.startPos_;

    // Immediately cancel the P2R if dragging down.
    if (dy > 0) {
      event.preventDefault();
    }

    // Stop tracking if there was any motion at all.
    if (dy != 0) {
      this.stopTracking_();
    }
  };

  /**
   * @param {!Event} unusedEvent
   * @private
   */

  PullToRefreshBlocker.prototype.onTouchEnd_ = function onTouchEnd_(unusedEvent) {
    this.stopTracking_();
  };

  /**
   * @param {!Event} unusedEvent
   * @private
   */

  PullToRefreshBlocker.prototype.onTouchCancel_ = function onTouchCancel_(unusedEvent) {
    this.stopTracking_();
  };

  return PullToRefreshBlocker;
})();

exports.PullToRefreshBlocker = PullToRefreshBlocker;

},{"./platform":82,"./viewer":105,"./viewport":106}],86:[function(require,module,exports){
exports.__esModule = true;
exports.getElementPriority = getElementPriority;
exports.resourcesFor = resourcesFor;
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

var _focusHistory = require('./focus-history');

var _pass = require('./pass');

var _asserts = require('./asserts');

var _dom = require('./dom');

var _documentState = require('./document-state');

var _layoutRect = require('./layout-rect');

var _service = require('./service');

var _input = require('./input');

var _log = require('./log');

var _error = require('./error');

var _timer = require('./timer');

var _viewer = require('./viewer');

var _viewport = require('./viewport');

var _vsync = require('./vsync');

var TAG_ = 'Resources';
var RESOURCE_PROP_ = '__AMP__RESOURCE';
var OWNER_PROP_ = '__AMP__OWNER';
var LAYOUT_TASK_ID_ = 'L';
var LAYOUT_TASK_OFFSET_ = 0;
var PRELOAD_TASK_ID_ = 'P';
var PRELOAD_TASK_OFFSET_ = 2;
var PRIORITY_BASE_ = 10;
var PRIORITY_PENALTY_TIME_ = 1000;
var POST_TASK_PASS_DELAY_ = 1000;
var MUTATE_DEFER_DELAY_ = 500;
var FOCUS_HISTORY_TIMEOUT_ = 1000 * 60; // 1min

/**
 * Returns the element-based priority. A value from 0 to 10.
 * @param {string} tagName
 * @return {number}
 */

function getElementPriority(tagName) {
  tagName = tagName.toLowerCase();
  if (tagName == 'amp-ad') {
    return 2;
  }
  if (tagName == 'amp-pixel') {
    return 1;
  }
  return 0;
}

var Resources = (function () {
  function Resources(window) {
    var _this = this;

    babelHelpers.classCallCheck(this, Resources);

    /** @const {!Window} */
    this.win = window;

    /** @const {!Viewer} */
    this.viewer_ = _viewer.viewerFor(window);

    /** @private {boolean} */
    this.isRuntimeOn_ = this.viewer_.isRuntimeOn();

    /** @private @const {number} */
    this.maxDpr_ = this.win.devicePixelRatio || 1;

    /** @private {number} */
    this.resourceIdCounter_ = 0;

    /** @private @const {!Array<!Resource>} */
    this.resources_ = [];

    /** @private {boolean} */
    this.visible_ = this.viewer_.isVisible();

    /** @private {number} */
    this.prerenderSize_ = this.viewer_.getPrerenderSize();

    /** @private {boolean} */
    this.documentReady_ = false;

    /**
     * We want to do some work in the first pass after
     * the document is ready.
     * @private {boolean}
     */
    this.firstPassAfterDocumentReady_ = true;

    /** @private {boolean} */
    this.relayoutAll_ = true;

    /** @private {number} */
    this.relayoutTop_ = -1;

    /** @private {boolean} */
    this.forceBuild_ = false;

    /** @private {time} */
    this.lastScrollTime_ = 0;

    /** @private {number} */
    this.lastVelocity_ = 0;

    /** @const {!Pass} */
    this.pass_ = new _pass.Pass(function () {
      return _this.doPass_();
    });

    /** @const {!TaskQueue_} */
    this.exec_ = new TaskQueue_();

    /** @const {!TaskQueue_} */
    this.queue_ = new TaskQueue_();

    /**
     * @private {!Array<{resource: !Resource, newHeight: number,
     *     force: boolean}>}
     */
    this.requestsChangeHeight_ = [];

    /** @private {!Array<!Function>} */
    this.deferredMutates_ = [];

    /** @private {number} */
    this.scrollHeight_ = 0;

    /** @private @const {!Viewport} */
    this.viewport_ = _viewport.viewportFor(this.win);

    /** @private @const {!Vsync} */
    this.vsync_ = _vsync.vsyncFor(this.win);

    /** @private @const {!DocumentState} */
    this.docState_ = _documentState.documentStateFor(this.win);

    /** @private @const {!FocusHistory} */
    this.activeHistory_ = new _focusHistory.FocusHistory(this.win, FOCUS_HISTORY_TIMEOUT_);

    /** @private {boolean} */
    this.vsyncScheduled_ = false;

    // When viewport is resized, we have to re-measure all elements.
    this.viewport_.onChanged(function (event) {
      _this.lastScrollTime_ = _timer.timer.now();
      _this.lastVelocity_ = event.velocity;
      _this.relayoutAll_ = _this.relayoutAll_ || event.relayoutAll;
      _this.schedulePass();
    });
    this.viewport_.onScroll(function () {
      _this.lastScrollTime_ = _timer.timer.now();
    });

    // When document becomes visible, e.g. from "prerender" mode, do a
    // simple pass.
    this.viewer_.onVisibilityChanged(function () {
      _this.schedulePass();
    });

    this.viewer_.onRuntimeState(function (state) {
      _log.log.fine(TAG_, 'Runtime state:', state);
      _this.isRuntimeOn_ = state;
      _this.schedulePass(1);
    });

    this.activeHistory_.onFocus(function (element) {
      _this.checkPendingChangeHeight_(element);
    });

    // Ensure that we attempt to rebuild things when DOM is ready.
    this.docState_.onReady(function () {
      _this.documentReady_ = true;
      _this.forceBuild_ = true;
      _this.relayoutAll_ = true;
      _this.schedulePass();
      _this.monitorInput_();
    });

    this.schedulePass();
  }

  /**
   * A Resource binding for an AmpElement.
   *
   * Visible for testing only!
   */

  /**
   * Returns a list of resources.
   * @return {!Array<!Resource>}
   * @export
   */

  Resources.prototype.get = function get() {
    return this.resources_.slice(0);
  };

  /** @private */

  Resources.prototype.monitorInput_ = function monitorInput_() {
    var _this2 = this;

    var input = _input.inputFor(this.win);
    input.onTouchDetected(function (detected) {
      _this2.toggleInputClass_('amp-mode-touch', detected);
    }, true);
    input.onMouseDetected(function (detected) {
      _this2.toggleInputClass_('amp-mode-mouse', detected);
    }, true);
    input.onKeyboardStateChanged(function (active) {
      _this2.toggleInputClass_('amp-mode-keyboard-active', active);
    }, true);
  };

  /**
   * @param {string} clazz
   * @param {boolean} on
   * @private
   */

  Resources.prototype.toggleInputClass_ = function toggleInputClass_(clazz, on) {
    var _this3 = this;

    this.vsync_.mutate(function () {
      _this3.win.document.body.classList.toggle(clazz, on);
    });
  };

  /** @private */

  Resources.prototype.updateScrollHeight_ = function updateScrollHeight_() {
    if (!this.win.document.body) {
      return;
    }
    var scrollHeight = this.win.document.body. /*OK*/scrollHeight;
    if (scrollHeight != this. /*OK*/scrollHeight_) {
      this. /*OK*/scrollHeight_ = scrollHeight;
      this.viewer_.postDocumentResized(this.viewport_.getSize().width, scrollHeight);
    }
  };

  /**
   * Returns the maximum DPR available on this device.
   * @return {number}
   */

  Resources.prototype.getMaxDpr = function getMaxDpr() {
    return this.maxDpr_;
  };

  /**
   * Returns the most optimal DPR currently recommended.
   * @return {number}
   */

  Resources.prototype.getDpr = function getDpr() {
    // TODO(dvoytenko): return optimal DPR.
    return this.maxDpr_;
  };

  /**
   * Returns the {@link Resource} instance corresponding to the specified AMP
   * Element. If no Resource is found, the exception is thrown.
   * @param {!AmpElement} element
   * @return {?Resource}
   * @package
   */

  Resources.prototype.getResourceForElement = function getResourceForElement(element) {
    return _asserts.assert( /** @type {!Resource} */element[RESOURCE_PROP_], 'Missing resource prop on %s', element);
  };

  /**
   * Signals that an element has been added to the DOM. Resources manager
   * will start tracking it from this point on.
   * @param {!AmpElement} element
   * @package
   */

  Resources.prototype.add = function add(element) {
    var resource = new Resource(++this.resourceIdCounter_, element, this);
    if (!element.id) {
      element.id = 'AMP_' + resource.getId();
    }
    element[RESOURCE_PROP_] = resource;
    this.resources_.push(resource);

    if (this.isRuntimeOn_) {
      // Try to immediately build element, it may already be ready.
      resource.build(this.forceBuild_);
      this.schedulePass();
    }

    _log.log.fine(TAG_, 'element added:', resource.debugid);
  };

  /**
   * Signals that an element has been removed to the DOM. Resources manager
   * will stop tracking it from this point on.
   * @param {!AmpElement} element
   * @package
   */

  Resources.prototype.remove = function remove(element) {
    var resource = this.getResourceForElement(element);
    var index = resource ? this.resources_.indexOf(resource) : -1;
    if (index != -1) {
      this.resources_.splice(index, 1);
    }
    _log.log.fine(TAG_, 'element removed:', resource.debugid);
  };

  /**
   * Signals that an element has been upgraded to the DOM. Resources manager
   * will perform build and enable layout/viewport signals for this element.
   * @param {!AmpElement} element
   * @package
   */

  Resources.prototype.upgraded = function upgraded(element) {
    var resource = this.getResourceForElement(element);
    if (this.isRuntimeOn_) {
      resource.build(this.forceBuild_);
      this.schedulePass();
    } else if (resource.onUpgraded_) {
      resource.onUpgraded_();
    }
    _log.log.fine(TAG_, 'element upgraded:', resource.debugid);
  };

  /**
   * Assigns an owner for the specified element. This means that the resources
   * within this element will be managed by the owner and not Resources manager.
   * @param {!Element} element
   * @param {!AmpElement} owner
   * @package
   */

  Resources.prototype.setOwner = function setOwner(element, owner) {
    _asserts.assert(owner.contains(element), 'Owner must contain the element');
    element[OWNER_PROP_] = owner;
  };

  /**
   * Schedules layout for the specified sub-elements that are children of the
   * parent element. The parent element may choose to send this signal either
   * because it's an owner (see {@link setOwner}) or because it wants the
   * layouts to be done sooner. In either case, both parent's and children's
   * priority is observed when scheduling this work.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.scheduleLayout = function scheduleLayout(parentElement, subElements) {
    this.scheduleLayoutOrPreloadForSubresources_(this.getResourceForElement(parentElement),
    /* layout */true, elements_(subElements));
  };

  /**
   * Schedules preload for the specified sub-elements that are children of the
   * parent element. The parent element may choose to send this signal either
   * because it's an owner (see {@link setOwner}) or because it wants the
   * preloads to be done sooner. In either case, both parent's and children's
   * priority is observed when scheduling this work.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.schedulePreload = function schedulePreload(parentElement, subElements) {
    this.scheduleLayoutOrPreloadForSubresources_(this.getResourceForElement(parentElement),
    /* layout */false, elements_(subElements));
  };

  /**
   * A parent resource, especially in when it's an owner (see {@link setOwner}),
   * may request the Resources manager to update children's inViewport state.
   * A child's inViewport state is a logical AND between inLocalViewport
   * specified here and parent's own inViewport state.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   * @param {boolean} inLocalViewport
   */

  Resources.prototype.updateInViewport = function updateInViewport(parentElement, subElements, inLocalViewport) {
    this.updateInViewportForSubresources_(this.getResourceForElement(parentElement), elements_(subElements), inLocalViewport);
  };

  /**
   * Requests the runtime to change the element's height.
   * @param {!Element} element
   * @param {number} newHeight
   */

  Resources.prototype.changeHeight = function changeHeight(element, newHeight) {
    this.scheduleChangeHeight_(this.getResourceForElement(element), newHeight,
    /* force */true);
  };

  /**
   * Requests the runtime to update the height of this element to the specified
   * value. The runtime will schedule this request and attempt to process it
   * as soon as possible. However, unlike in {@link changeHeight}, the runtime
   * may refuse to make a change in which case it will call the
   * `overflowCallback` method on the target resource with the height value.
   * Overflow callback is expected to provide the reader with the user action
   * to update the height manually.
   * @param {!Element} element
   * @param {number} newHeight
   * @protected
   */

  Resources.prototype.requestChangeHeight = function requestChangeHeight(element, newHeight) {
    this.scheduleChangeHeight_(this.getResourceForElement(element), newHeight,
    /* force */false);
  };

  /**
   * Requests mutate callback to executed at the earliest possibility.
   * @param {!Element} element
   * @param {!Function} callback
   */

  Resources.prototype.deferMutate = function deferMutate(element, callback) {
    this.scheduleDeferredMutate_(this.getResourceForElement(element), callback);
    this.schedulePassVsync();
  };

  /**
   * Schedules the work pass at the latest with the specified delay.
   * @param {number=} opt_delay
   */

  Resources.prototype.schedulePass = function schedulePass(opt_delay) {
    this.pass_.schedule(opt_delay);
  };

  /**
   * Schedules the work pass at the latest with the specified delay.
   */

  Resources.prototype.schedulePassVsync = function schedulePassVsync() {
    var _this4 = this;

    if (this.vsyncScheduled_) {
      return;
    }
    this.vsyncScheduled_ = true;
    this.vsync_.mutate(function () {
      return _this4.doPass_();
    });
  };

  /**
   * @private
   */

  Resources.prototype.doPass_ = function doPass_() {
    if (!this.isRuntimeOn_) {
      _log.log.fine(TAG_, 'runtime is off');
      return;
    }

    var prevVisible = this.visible_;
    this.visible_ = this.viewer_.isVisible();
    this.prerenderSize_ = this.viewer_.getPrerenderSize();

    if (this.documentReady_ && this.firstPassAfterDocumentReady_) {
      this.firstPassAfterDocumentReady_ = false;
      this.viewer_.postDocumentReady(this.viewport_.getSize().width, this.win.document.body. /*OK*/scrollHeight);
      this.updateScrollHeight_();
    }

    var viewportSize = this.viewport_.getSize();
    var now = _timer.timer.now();
    _log.log.fine(TAG_, 'PASS: at ' + now + ', visible=', this.visible_, ', forceBuild=', this.forceBuild_, ', relayoutAll=', this.relayoutAll_, ', relayoutTop=', this.relayoutTop_, ', viewportSize=', viewportSize.width, viewportSize.height, ', prerenderSize=', this.prerenderSize_);
    this.pass_.cancel();
    this.vsyncScheduled_ = false;

    // If document becomes invisible, bring everything into inactive state.
    if (prevVisible && !this.visible_) {
      _log.log.fine(TAG_, 'document become inactive');
      this.documentBecameInactive_();
      return;
    }

    // If viewport size is 0, the manager will wait for the resize event.
    if (viewportSize.height > 0 && viewportSize.width > 0) {
      if (this.hasMutateWork_()) {
        this.mutateWork_();
      }
      this.discoverWork_();
      var delay = this.work_();
      if (this.hasMutateWork_()) {
        // Overflow mutate work.
        delay = Math.min(delay, MUTATE_DEFER_DELAY_);
      }
      if (this.visible_) {
        _log.log.fine(TAG_, 'next pass:', delay);
        this.schedulePass(delay);
        this.updateScrollHeight_();
      } else {
        _log.log.fine(TAG_, 'document is not visible: no scheduling');
      }
    }
  };

  /**
   * Returns `true` when there's mutate work currently batched.
   * @return {boolean}
   * @private
   */

  Resources.prototype.hasMutateWork_ = function hasMutateWork_() {
    return this.deferredMutates_.length > 0 || this.requestsChangeHeight_.length > 0;
  };

  /**
   * Performs pre-discovery mutates.
   * @private
   */

  Resources.prototype.mutateWork_ = function mutateWork_() {
    var _this5 = this;

    // Read all necessary data before mutates.
    // The height changing depends largely on the target element's position
    // in the active viewport. We consider the active viewport the part of the
    // visible viewport below 10% from the top and above 25% from the bottom.
    // This is basically the portion of the viewport where the reader is most
    // likely focused right now. The main goal is to avoid drastic UI changes
    // in that part of the content. The elements below the active viewport are
    // freely resized. The elements above the viewport are resized and request
    // scroll adjustment to avoid active viewport changing without user's
    // action. The elements in the active viewport are not resized and instead
    // the overflow callbacks are called.
    var now = _timer.timer.now();
    var viewportRect = this.viewport_.getRect();
    var topOffset = viewportRect.height / 10;
    var bottomOffset = viewportRect.height / 4;
    var isScrollingStopped = Math.abs(this.lastVelocity_) < 1e-2 && now - this.lastScrollTime_ > MUTATE_DEFER_DELAY_ || now - this.lastScrollTime_ > MUTATE_DEFER_DELAY_ * 2;

    if (this.deferredMutates_.length > 0) {
      _log.log.fine(TAG_, 'deferred mutates:', this.deferredMutates_.length);
      var deferredMutates = this.deferredMutates_;
      this.deferredMutates_ = [];
      for (var i = 0; i < deferredMutates.length; i++) {
        deferredMutates[i]();
      }
    }

    if (this.requestsChangeHeight_.length > 0) {
      (function () {
        _log.log.fine(TAG_, 'change height requests:', _this5.requestsChangeHeight_.length);
        var requestsChangeHeight = _this5.requestsChangeHeight_;
        _this5.requestsChangeHeight_ = [];

        // Find minimum top position and run all mutates.
        var minTop = -1;
        var scrollAdjSet = [];
        for (var i = 0; i < requestsChangeHeight.length; i++) {
          var request = requestsChangeHeight[i];
          var resource = request.resource;
          var box = request.resource.getLayoutBox();
          if (box.height == request.newHeight) {
            // Nothing to do.
            continue;
          }

          // Check resize rules. It will either resize element immediately, or
          // wait until scrolling stops or will call the overflow callback.
          var resize = false;
          if (request.force || !_this5.visible_) {
            // 1. An immediate execution requested or the document is hidden.
            resize = true;
          } else if (_this5.activeHistory_.hasDescendantsOf(resource.element)) {
            // 2. Active elements are immediately resized. The assumption is that
            // the resize is triggered by the user action or soon after.
            resize = true;
          } else if (box.bottom >= viewportRect.bottom - bottomOffset) {
            // 3. Elements under viewport are resized immediately.
            resize = true;
          } else if (box.bottom <= viewportRect.top + topOffset) {
            // 4. Elements above the viewport can only be resized when scrolling
            // has stopped, otherwise defer util next cycle.
            if (isScrollingStopped) {
              // These requests will be executed in the next animation cycle and
              // adjust the scroll position.
              resize = false;
              scrollAdjSet.push(request);
            } else {
              // Defer till next cycle.
              _this5.requestsChangeHeight_.push(request);
            }
          } else if (request.newHeight < box.height) {
            // 5. The new height is smaller than the current one.
            // TODO(dvoytenko): Enable immediate resize in this case after
            // potential abuse scenarios are considered.
            resize = false;
          } else {
            // 6. Element is in viewport don't resize and try overflow callback
            // instead.
            request.resource.overflowCallback( /* overflown */true, request.newHeight);
          }

          if (resize) {
            if (box.top >= 0) {
              minTop = minTop == -1 ? box.top : Math.min(minTop, box.top);
            }
            request.resource. /*OK*/changeHeight(request.newHeight);
            request.resource.overflowCallback( /* overflown */false, request.newHeight);
          }
        }

        if (minTop != -1) {
          _this5.relayoutTop_ = minTop;
        }

        // Execute scroll-adjusting resize requests, if any.
        if (scrollAdjSet.length > 0) {
          _this5.vsync_.run({
            measure: function (state) {
              state. /*OK*/scrollHeight = _this5.viewport_. /*OK*/getScrollHeight();
              state. /*OK*/scrollTop = _this5.viewport_. /*OK*/getScrollTop();
            },
            mutate: function (state) {
              var minTop = -1;
              scrollAdjSet.forEach(function (request) {
                var box = request.resource.getLayoutBox();
                minTop = minTop == -1 ? box.top : Math.min(minTop, box.top);
                request.resource. /*OK*/changeHeight(request.newHeight);
              });
              if (minTop != -1) {
                _this5.relayoutTop_ = minTop;
              }
              // Sync is necessary here to avoid UI jump in the next frame.
              var newScrollHeight = _this5.viewport_. /*OK*/getScrollHeight();
              if (newScrollHeight > state. /*OK*/scrollHeight) {
                _this5.viewport_.setScrollTop(state. /*OK*/scrollTop + (newScrollHeight - state. /*OK*/scrollHeight));
              }
            }
          });
        }
      })();
    }
  };

  /**
   * Reschedules change height request when an overflown element is activated.
   * @param {!Element} element
   * @private
   */

  Resources.prototype.checkPendingChangeHeight_ = function checkPendingChangeHeight_(element) {
    var resourceElement = _dom.closest(element, function (el) {
      return el[RESOURCE_PROP_];
    });
    if (!resourceElement) {
      return;
    }
    var resource = this.getResourceForElement(resourceElement);
    var pendingChangeHeight = resource.getPendingChangeHeight();
    if (pendingChangeHeight !== undefined) {
      this.scheduleChangeHeight_(resource, pendingChangeHeight,
      /* force */true);
    }
  };

  /**
   * Discovers work that needs to be done since the last pass. If viewport
   * has changed, it will try to build new elements, measure changed elements,
   * and schedule layouts and preloads within a reasonable distance of the
   * current viewport. Finally, this process also updates inViewport state
   * of changed elements.
   *
   * Layouts and preloads are not executed immediately, but instead scheduled
   * in the queue with different priorities.
   *
   * @private
   */

  Resources.prototype.discoverWork_ = function discoverWork_() {

    // TODO(dvoytenko): vsync separation may be needed for different phases

    var now = _timer.timer.now();

    // Ensure all resources layout phase complete; when relayoutAll is requested
    // force re-layout.
    var relayoutAll = this.relayoutAll_;
    this.relayoutAll_ = false;
    var relayoutTop = this.relayoutTop_;
    this.relayoutTop_ = -1;

    // Phase 1: Build and relayout as needed. All mutations happen here.
    var relayoutCount = 0;
    for (var i = 0; i < this.resources_.length; i++) {
      var r = this.resources_[i];
      if (r.getState() == ResourceState_.NOT_BUILT) {
        r.build(this.forceBuild_);
      }
      if (r.getState() == ResourceState_.NOT_LAID_OUT || relayoutAll) {
        r.applySizesAndMediaQuery();
        relayoutCount++;
      }
    }

    // Phase 2: Remeasure if there were any relayouts. Unfortunately, currently
    // there's no way to optimize this. All reads happen here.
    if (relayoutCount > 0 || relayoutAll || relayoutTop != -1) {
      for (var i = 0; i < this.resources_.length; i++) {
        var r = this.resources_[i];
        if (r.getState() == ResourceState_.NOT_BUILT || r.hasOwner()) {
          continue;
        }
        if (relayoutAll || r.getState() == ResourceState_.NOT_LAID_OUT || relayoutTop != -1 && r.getLayoutBox().bottom >= relayoutTop) {
          r.measure();
        }
      }
    }

    var viewportRect = this.viewport_.getRect();
    // Load viewport = viewport + 3x up/down when document is visible or
    // depending on prerenderSize in pre-render mode.
    var loadRect = undefined;
    if (this.visible_) {
      loadRect = _layoutRect.expandLayoutRect(viewportRect, 0.25, 2);
    } else if (this.prerenderSize_ > 0) {
      loadRect = _layoutRect.expandLayoutRect(viewportRect, 0.25, this.prerenderSize_ - 1 + 0.25);
    } else {
      loadRect = null;
    }

    // Visible viewport = viewport + 25% up/down.
    var visibleRect = _layoutRect.expandLayoutRect(viewportRect, 0.25, 0.25);

    // Phase 3: Schedule elements for layout within a reasonable distance from
    // current viewport.
    if (loadRect) {
      for (var i = 0; i < this.resources_.length; i++) {
        var r = this.resources_[i];
        if (r.getState() != ResourceState_.READY_FOR_LAYOUT || r.hasOwner()) {
          continue;
        }
        if (r.isDisplayed() && r.overlaps(loadRect)) {
          this.scheduleLayoutOrPreload_(r, /* layout */true);
        }
      }
    }

    // Phase 4: Trigger "viewport enter/exit" events.
    for (var i = 0; i < this.resources_.length; i++) {
      var r = this.resources_[i];
      if (r.hasOwner()) {
        continue;
      }
      // Note that when the document is not visible, neither are any of its
      // elements to reduce CPU cycles.
      var shouldBeInViewport = this.visible_ && r.isDisplayed() && r.overlaps(visibleRect);
      if (r.isInViewport() != shouldBeInViewport) {
        r.setInViewport(shouldBeInViewport);
      }
    }

    // Phase 5: Idle layout: layout more if we are otherwise not doing much.
    // TODO(dvoytenko): document/estimate IDLE timeouts and other constants
    if (this.visible_ && this.exec_.getSize() == 0 && this.queue_.getSize() == 0 && now > this.exec_.getLastDequeueTime() + 5000) {
      var idleScheduledCount = 0;
      for (var i = 0; i < this.resources_.length; i++) {
        var r = this.resources_[i];
        if (r.getState() == ResourceState_.READY_FOR_LAYOUT && !r.hasOwner() && r.isDisplayed()) {
          _log.log.fine(TAG_, 'idle layout:', r.debugid);
          this.scheduleLayoutOrPreload_(r, /* layout */false);
          idleScheduledCount++;
          if (idleScheduledCount >= 4) {
            break;
          }
        }
      }
    }
  };

  /**
   * Brings all resources into inactive state. First it sets "in viewport"
   * state to false and then it calls documentInactive callback.
   * @private
   */

  Resources.prototype.documentBecameInactive_ = function documentBecameInactive_() {
    for (var i = 0; i < this.resources_.length; i++) {
      var r = this.resources_[i];
      r.documentBecameInactive();
    }
  };

  /**
   * Dequeues layout and preload tasks from the queue and initiates their
   * execution.
   *
   * There are two main drivers to dequeueing: a task's score and timeout. The
   * score is built based on the resource's priority and viewport location
   * (see {@link calcTaskScore_}). Timeout depends on the priority and age
   * of tasks currently in the execution pool (see {@link calcTaskTimeout_}).
   *
   * @return {!time}
   * @private
   */

  Resources.prototype.work_ = function work_() {
    var now = _timer.timer.now();

    var scorer = this.calcTaskScore_.bind(this, this.viewport_.getRect(), Math.sign(this.lastVelocity_));

    var timeout = -1;
    var task = this.queue_.peek(scorer);
    if (task) {
      do {
        timeout = this.calcTaskTimeout_(task);
        _log.log.fine(TAG_, 'peek from queue:', task.id, 'sched at', task.scheduleTime, 'score', scorer(task), 'timeout', timeout);
        if (timeout > 16) {
          break;
        }

        this.queue_.dequeue(task);

        // Do not override a task in execution. This task will have to wait
        // until the current one finished the execution.
        var executing = this.exec_.getTaskById(task.id);
        if (!executing) {
          // Ensure that task can prerender
          task.promise = task.callback(this.visible_);
          task.startTime = now;
          _log.log.fine(TAG_, 'exec:', task.id, 'at', task.startTime);
          this.exec_.enqueue(task);
          task.promise.then(this.taskComplete_.bind(this, task, true), this.taskComplete_.bind(this, task, false))['catch'](_error.reportError);
        } else {
          // Reschedule post execution.
          executing.promise.then(this.reschedule_.bind(this, task), this.reschedule_.bind(this, task));
        }

        task = this.queue_.peek(scorer);
        timeout = -1;
      } while (task);
    }

    _log.log.fine(TAG_, 'queue size:', this.queue_.getSize());
    _log.log.fine(TAG_, 'exec size:', this.exec_.getSize());

    if (timeout >= 0) {
      // Work pass.
      return timeout;
    }

    // Idle pass.
    var nextPassDelay = (now - this.exec_.getLastDequeueTime()) * 2;
    nextPassDelay = Math.max(Math.min(30000, nextPassDelay), 5000);
    return nextPassDelay;
  };

  /**
   * Calculates the task's score. A task with the lowest score will be dequeued
   * from the queue the first.
   *
   * There are three components of the score: element's priority, operation or
   * offset priority and viewport priority.
   *
   * Element's priority is constant of the element's name. E.g. amp-img has a
   * priority of 0, while amp-ad has a priority of 2.
   *
   * The operation (offset) priority is the priority of the task. A layout is
   * a high-priority task while preload is a lower-priority task.
   *
   * Viewport priority is a function of the distance of the element from the
   * currently visible viewports. The elements in the visible viewport get
   * higher priority and further away from the viewport get lower priority.
   * This priority also depends on whether or not the user is scrolling towards
   * this element or away from it.
   *
   * @param {!LayoutRect} viewportRect
   * @param {number} dir
   * @param {!TaskDef} task
   * @private
   */

  Resources.prototype.calcTaskScore_ = function calcTaskScore_(viewportRect, dir, task) {
    var box = task.resource.getLayoutBox();
    var posPriority = Math.floor((box.top - viewportRect.top) / viewportRect.height);
    if (posPriority != 0 && Math.sign(posPriority) != (dir || 1)) {
      posPriority *= 2;
    }
    posPriority = Math.abs(posPriority);
    return task.priority * PRIORITY_BASE_ + posPriority;
  };

  /**
   * Calculates the timeout of a task. The timeout depends on two main factors:
   * the priorities of the tasks currently in the execution pool and their age.
   * The timeout is calculated against each task in the execution pool and the
   * maximum value is returned.
   *
   * A task is penalized with higher timeout values when it's lower in priority
   * than the task in the execution pool. However, this penalty is judged
   * against the age of the executing task. If it has been in executing for
   * some time, the penalty is reduced.
   *
   * @param {!TaskDef} task
   * @private
   */

  Resources.prototype.calcTaskTimeout_ = function calcTaskTimeout_(task) {
    if (this.exec_.getSize() == 0) {
      return 0;
    }

    var now = _timer.timer.now();
    var timeout = 0;
    this.exec_.forEach(function (other) {
      // Higher priority tasks get the head start. Currently 500ms per a drop
      // in priority (note that priority is 10-based).
      var penalty = Math.max((task.priority - other.priority) * PRIORITY_PENALTY_TIME_, 0);
      // TODO(dvoytenko): Consider running total and not maximum.
      timeout = Math.max(timeout, penalty - (now - other.startTime));
    });

    return timeout;
  };

  /**
   * @param {!TaskDef} task
   * @private
   */

  Resources.prototype.reschedule_ = function reschedule_(task) {
    if (!this.queue_.getTaskById(task.id)) {
      this.queue_.enqueue(task);
    }
  };

  /**
   * @param {!TaskDef} task
   * @param {boolean} success
   * @param {*=} opt_reason
   * @return {!Promise|undefined}
   * @private
   */

  Resources.prototype.taskComplete_ = function taskComplete_(task, success, opt_reason) {
    this.exec_.dequeue(task);
    this.schedulePass(POST_TASK_PASS_DELAY_);
    if (!success) {
      _log.log.error(TAG_, 'task failed:', task.id, task.resource.debugid, opt_reason);
      return Promise.reject(opt_reason);
    }
  };

  /**
   * Schedules change of the element's height.
   * @param {!Resource} resource
   * @param {number} newHeight
   * @param {boolean} force
   * @private
   */

  Resources.prototype.scheduleChangeHeight_ = function scheduleChangeHeight_(resource, newHeight, force) {
    resource.resetPendingChangeHeight();
    if (resource.getLayoutBox().height == newHeight) {
      // Nothing to do.
      return;
    }

    var request = null;
    for (var i = 0; i < this.requestsChangeHeight_.length; i++) {
      if (this.requestsChangeHeight_[i].resource == resource) {
        request = this.requestsChangeHeight_[i];
        break;
      }
    }
    if (request) {
      request.newHeight = newHeight;
      request.force = force || request.force;
    } else {
      this.requestsChangeHeight_.push({
        resource: resource,
        newHeight: newHeight,
        force: force
      });
    }
    this.schedulePassVsync();
  };

  /**
   * Schedules deferred mutate.
   * @param {!Resource} resource
   * @param {!Function} callback
   * @private
   */

  Resources.prototype.scheduleDeferredMutate_ = function scheduleDeferredMutate_(resource, callback) {
    this.deferredMutates_.push(callback);
  };

  /**
   * Schedules layout or preload for the specified resource.
   * @param {!Resource} resource
   * @param {boolean} layout
   * @param {number=} opt_parentPriority
   * @private
   */

  Resources.prototype.scheduleLayoutOrPreload_ = function scheduleLayoutOrPreload_(resource, layout, opt_parentPriority) {
    _asserts.assert(resource.getState() != ResourceState_.NOT_BUILT && resource.isDisplayed(), 'Not ready for layout: %s (%s)', resource.debugid, resource.getState());
    // Don't schedule elements that can't prerender, they won't be allowed
    // to execute anyway.
    if (!this.visible_ && !resource.prerenderAllowed()) {
      return;
    }
    if (!resource.isInViewport() && !resource.renderOutsideViewport()) {
      return;
    }
    if (layout) {
      this.schedule_(resource, LAYOUT_TASK_ID_, LAYOUT_TASK_OFFSET_, opt_parentPriority || 0, resource.startLayout.bind(resource));
    } else {
      this.schedule_(resource, PRELOAD_TASK_ID_, PRELOAD_TASK_OFFSET_, opt_parentPriority || 0, resource.startLayout.bind(resource));
    }
  };

  /**
   * Schedules layout or preload for the sub-resources of the specified
   * resource.
   * @param {!Resource} parentResource
   * @param {boolean} layout
   * @param {!Array<!Element>} subElements
   * @private
   */

  Resources.prototype.scheduleLayoutOrPreloadForSubresources_ = function scheduleLayoutOrPreloadForSubresources_(parentResource, layout, subElements) {
    var _this6 = this;

    var resources = [];
    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      if (resource.getState() != ResourceState_.NOT_BUILT) {
        resources.push(resource);
      }
    });
    if (resources.length > 0) {
      resources.forEach(function (resource) {
        resource.measure();
        if (resource.getState() == ResourceState_.READY_FOR_LAYOUT && resource.isDisplayed()) {
          _this6.scheduleLayoutOrPreload_(resource, layout, parentResource.getPriority());
        }
      });
    }
  };

  /**
   * Schedules a task.
   * @param {!Resource} resource
   * @param {string} localId
   * @param {number} priorityOffset
   * @param {number} parentPriority
   * @param {function():!Promise} callback
   * @private
   */

  Resources.prototype.schedule_ = function schedule_(resource, localId, priorityOffset, parentPriority, callback) {
    var taskId = resource.debugid + '#' + localId;

    var task = {
      id: taskId,
      resource: resource,
      priority: Math.max(resource.getPriority(), parentPriority) + priorityOffset,
      callback: callback,
      scheduleTime: _timer.timer.now()
    };
    _log.log.fine(TAG_, 'schedule:', task.id, 'at', task.scheduleTime);

    // Only schedule a new task if there's no one enqueued yet or if this task
    // has a higher priority.
    var queued = this.queue_.getTaskById(taskId);
    if (!queued || task.priority < queued.priority) {
      if (queued) {
        this.queue_.dequeue(queued);
      }
      this.queue_.enqueue(task);
      this.schedulePass(this.calcTaskTimeout_(task));
    }
    task.resource.layoutScheduled();
  };

  /**
   * Updates inViewport state for the specified sub-resources of a resource.
   * @param {!Resource} parentResource
   * @param {!Array<!Element>} subElements
   * @param {boolean} inLocalViewport
   * @private
   */

  Resources.prototype.updateInViewportForSubresources_ = function updateInViewportForSubresources_(parentResource, subElements, inLocalViewport) {
    var inViewport = parentResource.isInViewport() && inLocalViewport;
    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      resource.setInViewport(inViewport);
    });
  };

  /**
   * Finds resources within the parent resource's shallow subtree.
   * @param {!Resource} parentResource
   * @param {!Array<!Element>} elements
   * @param {function(!Resource)} callback
   */

  Resources.prototype.discoverResourcesForArray_ = function discoverResourcesForArray_(parentResource, elements, callback) {
    var _this7 = this;

    elements.forEach(function (element) {
      _asserts.assert(parentResource.element.contains(element));
      _this7.discoverResourcesForElement_(element, callback);
    });
  };

  /**
   * @param {!Element} element
   * @param {function(!Resource)} callback
   */

  Resources.prototype.discoverResourcesForElement_ = function discoverResourcesForElement_(element, callback) {
    // Breadth-first search.
    if (element.classList.contains('-amp-element')) {
      callback(this.getResourceForElement(element));
    } else {
      var ampElements = element.getElementsByClassName('-amp-element');
      var seen = [];
      for (var i = 0; i < ampElements.length; i++) {
        var ampElement = ampElements[i];
        var covered = false;
        for (var j = 0; j < seen.length; j++) {
          if (seen[j].contains(ampElement)) {
            covered = true;
            break;
          }
        }
        if (!covered) {
          seen.push(ampElement);
          callback(this.getResourceForElement(ampElement));
        }
      }
    }
  };

  return Resources;
})();

exports.Resources = Resources;

var Resource = (function () {

  /**
   * @param {number} id
   * @param {!AmpElement} element
   * @param {!Resources} resources
   */

  function Resource(id, element, resources) {
    babelHelpers.classCallCheck(this, Resource);

    /** @private {number} */
    this.id_ = id;

    /** @export @const {!AmpElement} */
    this.element = element;

    /** @export @const {string} */
    this.debugid = element.tagName.toLowerCase() + '#' + id;

    /** @private {!Resources} */
    this.resources_ = resources;

    /** @private {boolean} */
    this.blacklisted_ = false;

    /** @const {!AmpElement|undefined|null} */
    this.owner_ = undefined;

    /** @const {number} */
    this.priority_ = getElementPriority(element.tagName);

    /** @private {!ResourceState_} */
    this.state_ = element.isBuilt() ? ResourceState_.NOT_LAID_OUT : ResourceState_.NOT_BUILT;

    /** @private {number} */
    this.layoutCount_ = 0;

    /** @private {!LayoutRect} */
    this.layoutBox_ = _layoutRect.layoutRectLtwh(-10000, -10000, 0, 0);

    /** @private {boolean} */
    this.isInViewport_ = false;

    /**
     * Only used in the "runtime off" case when the monitoring code needs to
     * known when the element is upgraded.
     * @private {!Function|undefined}
     */
    this.onUpgraded_;

    /**
     * Pending change height that was requested but could not be satisfied.
     * @private {number|undefined}
     */
    this.pendingChangeHeight_;
  }

  /**
   * A scheduling queue for Resources.
   *
   * Visible only for testing!
   *
   * @private
   */

  /**
   * Returns resource's ID.
   * @return {number}
   */

  Resource.prototype.getId = function getId() {
    return this.id_;
  };

  /**
   * Returns an owner element or null.
   * @return {?AmpElement}
   */

  Resource.prototype.getOwner = function getOwner() {
    if (this.owner_ === undefined) {
      for (var n = this.element; n; n = n.parentElement) {
        if (n[OWNER_PROP_]) {
          this.owner_ = n[OWNER_PROP_];
          break;
        }
      }
      if (this.owner_ === undefined) {
        this.owner_ = null;
      }
    }
    return this.owner_;
  };

  /**
   * Whether the resource has an owner.
   * @return {boolean}
   */

  Resource.prototype.hasOwner = function hasOwner() {
    return !!this.getOwner();
  };

  /**
   * Returns the resource's element priority.
   * @return {number}
   */

  Resource.prototype.getPriority = function getPriority() {
    return this.priority_;
  };

  /**
   * Returns the resource's state. See {@link ResourceState_} for details.
   * @return {!ResourceState_}
   */

  Resource.prototype.getState = function getState() {
    return this.state_;
  };

  /**
   * Requests the resource's element to be built. See {@link AmpElement.build}
   * for details.
   * @param {boolean} force
   * @return {boolean}
   */

  Resource.prototype.build = function build(force) {
    if (this.blacklisted_ || !this.element.isUpgraded()) {
      return false;
    }
    var built = undefined;
    try {
      built = this.element.build(force);
    } catch (e) {
      _log.log.error(TAG_, 'failed to build:', this.debugid, e);
      built = false;
      this.blacklisted_ = true;
    }
    if (!built) {
      return false;
    }
    this.state_ = ResourceState_.NOT_LAID_OUT;
    return true;
  };

  /**
   * Optionally hides or shows the element depending on the media query.
   */

  Resource.prototype.applySizesAndMediaQuery = function applySizesAndMediaQuery() {
    this.element.applySizesAndMediaQuery();
  };

  /**
   * Instructs the element to change its size and transitions to the state
   * awaiting the measure and possibly layout.
   * @param {number} newHeight
   */

  Resource.prototype.changeHeight = function changeHeight(newHeight) {
    this.element. /*OK*/changeHeight(newHeight);
    // Schedule for re-layout.
    if (this.state_ != ResourceState_.NOT_BUILT) {
      this.state_ = ResourceState_.NOT_LAID_OUT;
    }
  };

  /**
   * Informs the element that it's either overflown or not.
   * @param {boolean} overflown
   * @param {number} requestedHeight
   */

  Resource.prototype.overflowCallback = function overflowCallback(overflown, requestedHeight) {
    if (overflown) {
      this.pendingChangeHeight_ = requestedHeight;
    }
    this.element.overflowCallback(overflown, requestedHeight);
  };

  /** @private */

  Resource.prototype.resetPendingChangeHeight = function resetPendingChangeHeight() {
    this.pendingChangeHeight_ = undefined;
  };

  /**
   * @return {number|undefined}
   */

  Resource.prototype.getPendingChangeHeight = function getPendingChangeHeight() {
    return this.pendingChangeHeight_;
  };

  /**
   * Measures the resource's boundaries. Only allowed for upgraded elements.
   */

  Resource.prototype.measure = function measure() {
    _asserts.assert(this.element.isUpgraded(), 'Must be upgraded to measure: %s', this.debugid);
    if (this.state_ == ResourceState_.NOT_BUILT) {
      // Can't measure unbuilt element.
      return;
    }
    var box = this.resources_.viewport_.getLayoutRect(this.element);
    // Note that "left" doesn't affect readiness for the layout.
    if (this.state_ == ResourceState_.NOT_LAID_OUT || this.layoutBox_.top != box.top || this.layoutBox_.width != box.width || this.layoutBox_.height != box.height) {
      if (this.state_ == ResourceState_.NOT_LAID_OUT || this.element.isRelayoutNeeded()) {
        this.state_ = ResourceState_.READY_FOR_LAYOUT;
      }
    }
    this.layoutBox_ = box;
    this.element.updateLayoutBox(box);
  };

  /**
   * Returns a previously measured layout box.
   * @return {!LayoutRect}
   */

  Resource.prototype.getLayoutBox = function getLayoutBox() {
    return this.layoutBox_;
  };

  /**
   * Whether the resource is displayed, i.e. if it has non-zero width and
   * height.
   * @return {boolean}
   */

  Resource.prototype.isDisplayed = function isDisplayed() {
    return this.layoutBox_.height > 0 && this.layoutBox_.width > 0;
  };

  /**
   * Whether the element's layout box overlaps with the specified rect.
   * @param {!LayoutRect} rect
   * @return {boolean}
   */

  Resource.prototype.overlaps = function overlaps(rect) {
    return _layoutRect.layoutRectsOverlap(this.layoutBox_, rect);
  };

  /**
   * Whether this element can be pre-rendered.
   * @return {boolean}
   */

  Resource.prototype.prerenderAllowed = function prerenderAllowed() {
    return this.element.prerenderAllowed();
  };

  /**
   * Whether this is allowed to render when not in viewport.
   * @return {boolean}
   */

  Resource.prototype.renderOutsideViewport = function renderOutsideViewport() {
    return this.element.renderOutsideViewport();
  };

  /**
   * Sets the resource's state to LAYOUT_SCHEDULED.
   */

  Resource.prototype.layoutScheduled = function layoutScheduled() {
    this.state_ = ResourceState_.LAYOUT_SCHEDULED;
  };

  /**
   * Starts the layout of the resource. Returns the promise that will yield
   * once layout is complete. Only allowed to be called on a upgraded, built
   * and displayed element.
   * @param {boolean} isDocumentVisible
   * @return {!Promise}
   */

  Resource.prototype.startLayout = function startLayout(isDocumentVisible) {
    var _this8 = this;

    if (this.layoutPromise_) {
      return this.layoutPromise_;
    }
    if (this.state_ == ResourceState_.LAYOUT_COMPLETE) {
      return Promise.resolve();
    }
    if (this.state_ == ResourceState_.LAYOUT_FAILED) {
      return Promise.reject('already failed');
    }

    _asserts.assert(this.state_ != ResourceState_.NOT_BUILT, 'Not ready to start layout: %s (%s)', this.debugid, this.state_);

    if (!isDocumentVisible && !this.prerenderAllowed()) {
      _log.log.fine(TAG_, 'layout canceled due to non pre-renderable element:', this.debugid, this.state_);
      this.state_ = ResourceState_.READY_FOR_LAYOUT;
      return Promise.resolve();
    }

    if (!this.renderOutsideViewport() && !this.isInViewport()) {
      _log.log.fine(TAG_, 'layout canceled due to element not being in viewport:', this.debugid, this.state_);
      this.state_ = ResourceState_.READY_FOR_LAYOUT;
      return Promise.resolve();
    }

    // Double check that the element has not disappeared since scheduling
    this.measure();
    if (!this.isDisplayed()) {
      _log.log.fine(TAG_, 'layout canceled due to element loosing display:', this.debugid, this.state_);
      return Promise.resolve();
    }

    // Not-wanted re-layouts are ignored.
    if (this.layoutCount_ > 0 && !this.element.isRelayoutNeeded()) {
      _log.log.fine(TAG_, 'layout canceled since it wasn\'t requested:', this.debugid, this.state_);
      this.state_ = ResourceState_.LAYOUT_COMPLETE;
      return Promise.resolve();
    }

    _log.log.fine(TAG_, 'start layout:', this.debugid, 'count:', this.layoutCount_);
    this.layoutCount_++;
    this.state_ = ResourceState_.LAYOUT_SCHEDULED;

    var promise = undefined;
    try {
      promise = this.element.layoutCallback();
    } catch (e) {
      return Promise.reject(e);
    }
    this.layoutPromise_ = promise.then(function () {
      return _this8.layoutComplete_(true);
    }, function (reason) {
      return _this8.layoutComplete_(false, reason);
    });
    return this.layoutPromise_;
  };

  /**
   * @param {boolean} success
   * @param {*=} opt_reason
   * @return {!Promise|undefined}
   */

  Resource.prototype.layoutComplete_ = function layoutComplete_(success, opt_reason) {
    this.layoutPromise_ = null;
    this.state_ = success ? ResourceState_.LAYOUT_COMPLETE : ResourceState_.LAYOUT_FAILED;
    if (success) {
      _log.log.fine(TAG_, 'layout complete:', this.debugid);
    } else {
      _log.log.fine(TAG_, 'loading failed:', this.debugid, opt_reason);
      return Promise.reject(opt_reason);
    }
  };

  /**
   * Whether the resource is currently visible in the viewport.
   * @return {boolean}
   */

  Resource.prototype.isInViewport = function isInViewport() {
    return this.isInViewport_;
  };

  /**
   * Updates the inViewport state of the element.
   * @param {boolean} inViewport
   */

  Resource.prototype.setInViewport = function setInViewport(inViewport) {
    if (inViewport == this.isInViewport_) {
      return;
    }
    _log.log.fine(TAG_, 'inViewport:', this.debugid, inViewport);
    this.isInViewport_ = inViewport;
    this.element.viewportCallback(inViewport);
  };

  /**
   * Calls element's documentInactiveCallback callback and resets state for
   * relayout in case document becomes active again.
   */

  Resource.prototype.documentBecameInactive = function documentBecameInactive() {
    if (this.state_ == ResourceState_.NOT_BUILT) {
      return;
    }
    if (this.isInViewport()) {
      this.setInViewport(false);
    }
    if (this.element.documentInactiveCallback()) {
      this.state_ = ResourceState_.NOT_LAID_OUT;
    }
  };

  /**
   * Only allowed in dev mode when runtime is turned off. Performs all steps
   * necessary to render an element.
   * @return {!Promise}
   * @export
   */

  Resource.prototype.forceAll = function forceAll() {
    var _this9 = this;

    _asserts.assert(!this.resources_.isRuntimeOn_);
    var p = Promise.resolve();
    if (this.state_ == ResourceState_.NOT_BUILT) {
      if (!this.element.isUpgraded()) {
        p = p.then(function () {
          return new Promise(function (resolve) {
            _this9.onUpgraded_ = resolve;
          });
        });
      }
      p = p.then(function () {
        _this9.onUpgraded_ = undefined;
        _this9.build(true);
      });
    }
    return p.then(function () {
      _this9.applySizesAndMediaQuery();
      _this9.measure();
      if (_this9.layoutPromise_) {
        return _this9.layoutPromise_;
      }
      if (_this9.state_ == ResourceState_.LAYOUT_COMPLETE || _this9.state_ == ResourceState_.LAYOUT_FAILED || _this9.layoutCount_ > 0) {
        return Promise.resolve();
      }
      if (!_this9.isDisplayed()) {
        return Promise.resolve();
      }
      _this9.layoutCount_++;
      try {
        return _this9.element.layoutCallback();
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  return Resource;
})();

exports.Resource = Resource;

var TaskQueue_ = (function () {
  function TaskQueue_() {
    babelHelpers.classCallCheck(this, TaskQueue_);

    /** @private @const {!Array<!TaskDef>} */
    this.tasks_ = [];

    /** @private @const {!Object<string, !TaskDef>} */
    this.taskIdMap_ = {};

    /** @private {!time} */
    this.lastEnqueueTime_ = 0;

    /** @private {!time} */
    this.lastDequeueTime_ = 0;
  }

  /**
   * @param {!Element|!Array<!Element>} elements
   * @return {!Array<!Element>}
   */

  /**
   * Size of the queue.
   * @return {number}
   */

  TaskQueue_.prototype.getSize = function getSize() {
    return this.tasks_.length;
  };

  /**
   * Last time a task was enqueued.
   * @return {!time}
   */

  TaskQueue_.prototype.getLastEnqueueTime = function getLastEnqueueTime() {
    return this.lastEnqueueTime_;
  };

  /**
   * Last time a task was dequeued.
   * @return {!time}
   */

  TaskQueue_.prototype.getLastDequeueTime = function getLastDequeueTime() {
    return this.lastDequeueTime_;
  };

  /**
   * Returns the task with the specified ID or null.
   * @param {string} taskId
   * @return {?TaskDef}
   */

  TaskQueue_.prototype.getTaskById = function getTaskById(taskId) {
    return this.taskIdMap_[taskId] || null;
  };

  /**
   * Enqueues the task. If the task is already in the queue, the error is
   * thrown.
   * @param {!TaskDef} task
   */

  TaskQueue_.prototype.enqueue = function enqueue(task) {
    _asserts.assert(!this.taskIdMap_[task.id], 'Task already enqueued: %s', task.id);
    this.tasks_.push(task);
    this.taskIdMap_[task.id] = task;
    this.lastEnqueueTime_ = _timer.timer.now();
  };

  /**
   * Dequeues the task and returns "true" if dequeueing is successful. Otherwise
   * returns "false", e.g. when this task is not currently enqueued.
   * @param {!TaskDef} task
   * @return {boolean}
   */

  TaskQueue_.prototype.dequeue = function dequeue(task) {
    var existing = this.taskIdMap_[task.id];
    if (!existing) {
      return false;
    }
    this.tasks_.splice(this.tasks_.indexOf(existing), 1);
    delete this.taskIdMap_[task.id];
    this.lastDequeueTime_ = _timer.timer.now();
    return true;
  };

  /**
   * Returns the task with the minimal score based on the provided scoring
   * callback.
   * @param {function(!TaskDef):number} scorer
   * @return {?TaskDef}
   */

  TaskQueue_.prototype.peek = function peek(scorer) {
    var minScore = 1e6;
    var minTask = null;
    for (var i = 0; i < this.tasks_.length; i++) {
      var task = this.tasks_[i];
      var score = scorer(task);
      if (score < minScore) {
        minScore = score;
        minTask = task;
      }
    }
    return minTask;
  };

  /**
   * Iterates over all tasks in queue in the insertion order.
   * @param {function(!TaskDef)} callback
   */

  TaskQueue_.prototype.forEach = function forEach(callback) {
    this.tasks_.forEach(callback);
  };

  return TaskQueue_;
})();

exports.TaskQueue_ = TaskQueue_;
function elements_(elements) {
  if (elements.length !== undefined) {
    return elements;
  }
  return [elements];
}

/**
 * Resource state.
 *
 * Visible for testing only!
 *
 * @enum {number}
 * @private
 */
var ResourceState_ = {
  /**
   * The resource has not been built yet. Measures, layouts, preloads or
   * viewport signals are not allowed.
   */
  NOT_BUILT: 0,

  /**
   * The resource has been built, but not measured yet and not yet ready
   * for layout.
   */
  NOT_LAID_OUT: 1,

  /**
   * The resource has been built and measured and ready for layout.
   */
  READY_FOR_LAYOUT: 2,

  /**
   * The resource is currently scheduled for layout.
   */
  LAYOUT_SCHEDULED: 3,

  /**
   * The resource has been laid out.
   */
  LAYOUT_COMPLETE: 4,

  /**
   * The latest resource's layout failed.
   */
  LAYOUT_FAILED: 5
};

exports.ResourceState_ = ResourceState_;
/**
 * The internal structure for the task.
 * @typedef {{
 *   id: string,
 *   resource: !Resource,
 *   priority: number,
 *   callback: function(boolean),
 *   scheduleTime: time,
 *   startTime: time,
 *   promise: (!Promise|undefined)
 * }}
 * @private
 */
var TaskDef = undefined;

/**
 * @param {!Window} window
 * @return {!Resources}
 */

function resourcesFor(window) {
  return _service.getService(window, 'resources', function () {
    return new Resources(window);
  });
}

;

},{"./asserts":55,"./document-state":63,"./dom":64,"./error":66,"./focus-history":71,"./input":72,"./layout-rect":74,"./log":77,"./pass":80,"./service":88,"./timer":100,"./viewer":105,"./viewport":106,"./vsync":107}],87:[function(require,module,exports){
exports.__esModule = true;
exports.adopt = adopt;
exports.registerForUnitTest = registerForUnitTest;
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

var _baseElement = require('./base-element');

var _template = require('./template');

var _asserts = require('./asserts');

var _mode = require('./mode');

var _styles = require('./styles');

var _ampCoreService = require('./amp-core-service');

var _experiments = require('./experiments');

var _performance = require('./performance');

var _customElement = require('./custom-element');

var _extendedElement = require('./extended-element');

var _resources = require('./resources');

var _timer = require('./timer');

var _viewer = require('./viewer');

var _viewport = require('./viewport');

/** @type {!Array} */
var elementsForTesting = [];

/**
 * Applies the runtime to a given global scope.
 * Multi frame support is currently incomplete.
 * @param {!Window} global Global scope to adopt.
 */

function adopt(global) {
  // Tests can adopt the same window twice. sigh.
  if (global.AMP_TAG) {
    return;
  }
  global.AMP_TAG = true;
  // If there is already a global AMP object we assume it is an array
  // of functions
  var preregisteredElements = global.AMP || [];

  global.AMP = {
    win: global
  };

  /**
   * Registers an extended element and installs its styles.
   * @param {string} name
   * @param {!Function} implementationClass
   * @param {string=} opt_css Optional CSS to install with the component. Use
   *     the special variable $CSS$ in your code. It will be replaced with the
   *     CSS file associated with the element.
   */
  global.AMP.registerElement = function (name, implementationClass, opt_css) {
    var register = function () {
      _extendedElement.registerExtendedElement(global, name, implementationClass);
      elementsForTesting.push({
        name: name,
        implementationClass: implementationClass
      });
    };
    if (opt_css) {
      _styles.installStyles(global.document, opt_css, register);
    } else {
      register();
    }
  };

  /** @const */
  global.AMP.BaseElement = _baseElement.BaseElement;

  /** @const */
  global.AMP.BaseTemplate = _template.BaseTemplate;

  /**
   * Registers an extended template.
   * @param {string} name
   * @param {!Function} implementationClass
   */
  global.AMP.registerTemplate = function (name, implementationClass) {
    _template.registerExtendedTemplate(global, name, implementationClass);
  };

  /** @const */
  global.AMP.assert = _asserts.assert;

  _ampCoreService.installCoreServices(global);
  var viewer = _viewer.viewerFor(global);

  /** @const */
  global.AMP.viewer = viewer;

  if (_mode.getMode().development) {
    /** @const */
    global.AMP.toggleRuntime = viewer.toggleRuntime.bind(viewer);
    /** @const */
    global.AMP.resources = _resources.resourcesFor(global);
    /** @const */
    global.AMP.isExperimentOn = _experiments.isExperimentOn.bind(null, global);
    /** @const */
    global.AMP.toggleExperiment = _experiments.toggleExperiment.bind(null, global);
  }

  var viewport = _viewport.viewportFor(global);

  /** @const */
  global.AMP.viewport = {};
  global.AMP.viewport.getScrollLeft = viewport.getScrollLeft.bind(viewport);
  global.AMP.viewport.getScrollWidth = viewport.getScrollWidth.bind(viewport);
  global.AMP.viewport.getWidth = viewport.getWidth.bind(viewport);

  /**
   * Registers a new custom element.
   * @param {GlobalAmp} fn
   */
  global.AMP.push = function (fn) {
    preregisteredElements.push(fn);
    fn(global.AMP);
  };

  /**
   * Sets the function to forward tick events to.
   * @param {funtion(string,?string=,number=)} fn
   * @param {function()=} opt_flush
   * @export
   */
  global.AMP.setTickFunction = function (fn, opt_flush) {
    var perf = _performance.performanceFor(global);
    perf.setTickFunction(fn, opt_flush);
  };

  // Execute asynchronously scheduled elements.
  for (var i = 0; i < preregisteredElements.length; i++) {
    var fn = preregisteredElements[i];
    try {
      fn(global.AMP);
    } catch (e) {
      // Throw errors outside of loop in its own micro task to
      // avoid on error stopping other extensions from loading.
      _timer.timer.delay(function () {
        throw e;
      }, 1);
    }
  }
}

/**
 * Registers all extended elements as normal elements in the given
 * window.
 * Make sure to call `adopt(window)` in your unit test as well and
 * then call this on the generated iframe.
 * @param {!Window} win
 */

function registerForUnitTest(win) {
  for (var i = 0; i < elementsForTesting.length; i++) {
    var element = elementsForTesting[i];
    _customElement.registerElement(win, element.name, element.implementationClass);
  }
}

},{"./amp-core-service":53,"./asserts":55,"./base-element":56,"./custom-element":60,"./experiments":68,"./extended-element":70,"./mode":78,"./performance":81,"./resources":86,"./styles":98,"./template":99,"./timer":100,"./viewer":105,"./viewport":106}],88:[function(require,module,exports){
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

},{"./asserts":55}],89:[function(require,module,exports){
exports.__esModule = true;
exports.installActionService = installActionService;
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

var _asserts = require('../asserts');

var _service = require('../service');

var _log = require('../log');

var _timer = require('../timer');

/** @const {string} */
var TAG_ = 'Action';

/** @const {string} */
var ACTION_MAP_ = '__AMP_ACTION_MAP__' + Math.random();

/** @const {string} */
var ACTION_QUEUE_ = '__AMP_ACTION_QUEUE__';

/** @const {string} */
var DEFAULT_METHOD_ = 'activate';

/**
 * @typedef {{
 *   event: string,
 *   target: string,
 *   method: string,
 *   str: string
 * }}
 */
var ActionInfoDef = undefined;

/**
 * The structure that contains all details of the action method invocation.
 * @struct
 * @const
 * TODO(dvoytenko): add action arguments here as well.
 */

var ActionInvocation =
/**
 * @param {!Element} target
 * @param {string} method
 * @param {?Element} source
 * @param {?Event} event
 */
function ActionInvocation(target, method, source, event) {
  babelHelpers.classCallCheck(this, ActionInvocation);

  /** @const {!Element} */
  this.target = target;
  /** @const {string} */
  this.method = method;
  /** @const {?Element} */
  this.source = source;
  /** @const {?Event} */
  this.event = event;
}

/**
 * TODO(dvoytenko): consider splitting this class into two:
 * 1. A class that has a method "trigger(element, eventType, data)" and
 *    simply can search target in DOM and trigger methods on it.
 * 2. A class that configures event recognizers and rules and then
 *    simply calls action.trigger.
 */
;

var ActionService = (function () {

  /**
   * @param {!Window} win
   */

  function ActionService(win) {
    babelHelpers.classCallCheck(this, ActionService);

    /** @const {!Window} */
    this.win = win;

    // Add core events.
    this.addEvent('tap');
  }

  /**
   * @param {string} name
   * TODO(dvoytenko): switch to a system where the event recognizers are
   * registered with Action instead, e.g. "doubletap", "tap to zoom".
   */

  ActionService.prototype.addEvent = function addEvent(name) {
    var _this = this;

    if (name == 'tap') {
      // TODO(dvoytenko): if needed, also configure touch-based tap, e.g. for
      // fast-click.
      this.win.document.addEventListener('click', function (event) {
        if (!event.defaultPrevented) {
          _this.trigger(event.target, 'tap', event);
        }
      });
    }
  };

  /**
   * Triggers the specified event on the target element.
   * @param {!Element} target
   * @param {string} eventType
   * @param {?Event} event
   */

  ActionService.prototype.trigger = function trigger(target, eventType, event) {
    this.action_(target, eventType, event);
  };

  /**
   * Triggers execution of the method on a target/method.
   * @param {!Element} target
   * @param {string} method
   * @param {?Element} source
   * @param {?Event} event
   */

  ActionService.prototype.execute = function execute(target, method, source, event) {
    this.invoke_(target, method, source, event, null);
  };

  /**
   * Installs action handler for the specified element.
   * @param {!Element} target
   * @param {function(!ActionInvocation)} handler
   */

  ActionService.prototype.installActionHandler = function installActionHandler(target, handler) {
    var debugid = target.tagName + '#' + target.id;
    _asserts.assert(target.id && target.id.substring(0, 4) == 'amp-', 'AMP element is expected: %s', debugid);

    var currentQueue = target[ACTION_QUEUE_];
    if (currentQueue) {
      _asserts.assert(Object.prototype.toString.call(currentQueue) == '[object Array]', 'Expected queue to be an array: %s', debugid);
    }

    // Override queue with the handler.
    target[ACTION_QUEUE_] = { 'push': handler };

    // Dequeue the current queue.
    if (currentQueue) {
      _timer.timer.delay(function () {
        // TODO(dvoytenko, #1260): dedupe actions.
        currentQueue.forEach(function (invocation) {
          try {
            handler(invocation);
          } catch (e) {
            _log.log.error(TAG_, 'Action execution failed:', invocation, e);
          }
        });
      }, 1);
    }
  };

  /**
   * @param {!Element} source
   * @param {string} actionEventType
   * @param {!Event} event
   * @private
   */

  ActionService.prototype.action_ = function action_(source, actionEventType, event) {
    var action = this.findAction_(source, actionEventType);
    if (!action) {
      // TODO(dvoytenko): implement default (catch-all) actions.
      return;
    }

    var target = document.getElementById(action.actionInfo.target);
    if (!target) {
      this.actionInfoError_('target not found', action.actionInfo, target);
      return;
    }

    this.invoke_(target, action.actionInfo.method, action.node, event, action.actionInfo);
  };

  /**
   * The errors that are a result of action definition.
   * @param {string} s
   * @param {?ActionInfo} actionInfo
   * @param {?Element} target
   * @private
   */

  ActionService.prototype.actionInfoError_ = function actionInfoError_(s, actionInfo, target) {
    // Method not found "activate" on ' + target
    throw new Error('Action Error: ' + s + (actionInfo ? ' in [' + actionInfo.str + ']' : '') + (target ? ' on [' + target + ']' : ''));
  };

  /**
   * @param {!Element} target
   * @param {string} method
   * @param {?Element} source
   * @param {?Event} event
   * @param {?ActionInfo} actionInfo
   */

  ActionService.prototype.invoke_ = function invoke_(target, method, source, event, actionInfo) {
    var invocation = new ActionInvocation(target, method, source, event);

    // TODO(dvoytenko): implement common method handlers, e.g. "toggleClass"

    // AMP elements.
    if (target.tagName.toLowerCase().substring(0, 4) == 'amp-') {
      if (target.enqueAction) {
        target.enqueAction(invocation);
      } else {
        this.actionInfoError_('Unrecognized AMP element "' + target.tagName.toLowerCase() + '". ' + 'Did you forget to include it via <script custom-element>?', actionInfo, target);
      }
      return;
    }

    // Special elements with AMP ID.
    if (target.id && target.id.substring(0, 4) == 'amp-') {
      if (!target[ACTION_QUEUE_]) {
        target[ACTION_QUEUE_] = [];
      }
      target[ACTION_QUEUE_].push(invocation);
      return;
    }

    // Unsupported target.
    this.actionInfoError_('Target must be an AMP element or have an AMP ID', actionInfo, target);
  };

  /**
   * @param {!Element} target
   * @param {string} actionEventType
   * @return {?{node: !Element, actionInfo: !ActionInfoDef}}
   */

  ActionService.prototype.findAction_ = function findAction_(target, actionEventType) {
    // Go from target up the DOM tree and find the applicable action.
    var n = target;
    var actionInfo = null;
    while (n) {
      actionInfo = this.matchActionInfo_(n, actionEventType);
      if (actionInfo) {
        return { node: n, actionInfo: actionInfo };
      }
      n = n.parentElement;
    }
    return null;
  };

  /**
   * @param {!Element} node
   * @param {string} actionEventType
   * @return {?ActionInfoDef}
   */

  ActionService.prototype.matchActionInfo_ = function matchActionInfo_(node, actionEventType) {
    var actionMap = this.getActionMap_(node);
    if (!actionMap) {
      return null;
    }
    return actionMap[actionEventType] || null;
  };

  /**
   * @param {!Element} node
   * @return {?Object<string, ActionInfoDef>}
   */

  ActionService.prototype.getActionMap_ = function getActionMap_(node) {
    var actionMap = node[ACTION_MAP_];
    if (actionMap === undefined) {
      actionMap = null;
      if (node.hasAttribute('on')) {
        actionMap = this.parseActionMap_(node.getAttribute('on'));
      }
      node[ACTION_MAP_] = actionMap;
    }
    return actionMap;
  };

  /**
   * @param {string} s
   * @return {?Object<string, ActionInfoDef>}
   */

  ActionService.prototype.parseActionMap_ = function parseActionMap_(s) {
    var actionMap = null;
    var actions = s.split(';');
    if (actions && actions.length > 0) {
      for (var i = 0; i < actions.length; i++) {
        var actionStr = actions[i];
        var actionInfo = this.parseAction_(actionStr);
        if (actionInfo) {
          if (!actionMap) {
            actionMap = {};
          }
          actionMap[actionInfo.event] = actionInfo;
        }
      }
    }
    return actionMap;
  };

  /**
   * @param {string} s
   * @return {?ActionInfoDef}
   */

  ActionService.prototype.parseAction_ = function parseAction_(s) {
    s = s.trim();
    if (!s) {
      return null;
    }

    var eventSep = s.indexOf(':');
    var methodSep = s.indexOf('.', eventSep + 1);
    var event = (eventSep != -1 ? s.substring(0, eventSep) : '').toLowerCase().trim() || null;
    var target = s.substring(eventSep + 1, methodSep != -1 ? methodSep : s.length).trim();
    var method = (methodSep != -1 ? s.substring(methodSep + 1) : '').trim() || DEFAULT_METHOD_;

    if (!event || !target) {
      _log.log.error(TAG_, 'invalid action definition: ' + s);
      return null;
    }
    return { event: event, target: target, method: method, str: s };
  };

  return ActionService;
})();

exports.ActionService = ActionService;
;

/**
 * @param {!Window} win
 * @return {!ActionService}
 */

function installActionService(win) {
  return _service.getService(win, 'action', function () {
    return new ActionService(win);
  });
}

;

},{"../asserts":55,"../log":77,"../service":88,"../timer":100}],90:[function(require,module,exports){
exports.__esModule = true;
exports.installHistoryService = installHistoryService;
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

var _pass = require('../pass');

var _asserts = require('../asserts');

var _service = require('../service');

var _log = require('../log');

var _timer = require('../timer');

var _viewerImpl = require('./viewer-impl');

/** @private @const */
var TAG_ = 'History';

/** @private @const */
var HISTORY_PROP_ = 'AMP.History';

/**
 * @return {*}
 * @private
 */
function historyState_(stackIndex) {
  var state = {};
  state[HISTORY_PROP_] = stackIndex;
  return state;
}

/** @typedef {number} */
var HistoryIdDef = undefined;

var History = (function () {

  /**
   * @param {!HistoryBindingInterface} binding
   */

  function History(binding) {
    babelHelpers.classCallCheck(this, History);

    /** @private @const {!HistoryBindingInterface} */
    this.binding_ = binding;

    /** @private {number} */
    this.stackIndex_ = 0;

    /** @private {!Array<!Function|undefined>} */
    this.stackOnPop_ = [];

    /** @private {!Array<!{callback:function():!Promise>, resolve:!Function,reject:!Function}} */
    this.queue_ = [];

    this.binding_.setOnStackIndexUpdated(this.onStackIndexUpdated_.bind(this));
  }

  /**
   * HistoryBindingInterface is an interface that defines an underlying technology behind
   * the {@link History}.
   * @interface
   */

  /** @private */

  History.prototype.cleanup_ = function cleanup_() {
    this.binding_.cleanup_();
  };

  /**
   * Pushes new state into history stack with an optional callback to be called
   * when this state is popped.
   * @param {!Function=} opt_onPop
   * @return {!Promise<!HistoryIdDef>}
   */

  History.prototype.push = function push(opt_onPop) {
    var _this = this;

    return this.enque_(function () {
      return _this.binding_.push().then(function (stackIndex) {
        _this.onStackIndexUpdated_(stackIndex);
        if (opt_onPop) {
          _this.stackOnPop_[stackIndex] = opt_onPop;
        }
        return stackIndex;
      });
    });
  };

  /**
   * Pops a previously pushed state from the history stack. If onPop callback
   * has been registered, it will be called. All states coming after this
   * state will also be popped and their callbacks executed.
   * @param {!HistoryIdDef} stateId
   * @return {!Promise}
   */

  History.prototype.pop = function pop(stateId) {
    var _this2 = this;

    return this.enque_(function () {
      return _this2.binding_.pop(stateId).then(function (stackIndex) {
        _this2.onStackIndexUpdated_(stackIndex);
      });
    });
  };

  /**
   * @param {number} stackIndex
   * @private
   */

  History.prototype.onStackIndexUpdated_ = function onStackIndexUpdated_(stackIndex) {
    this.stackIndex_ = stackIndex;
    this.doPop_();
  };

  /** @private */

  History.prototype.doPop_ = function doPop_() {
    if (this.stackIndex_ >= this.stackOnPop_.length - 1) {
      return;
    }

    var toPop = [];
    for (var i = this.stackOnPop_.length - 1; i > this.stackIndex_; i--) {
      if (this.stackOnPop_[i]) {
        toPop.push(this.stackOnPop_[i]);
        this.stackOnPop_[i] = undefined;
      }
    }
    this.stackOnPop_.splice(this.stackIndex_ + 1);

    if (toPop.length > 0) {
      for (var i = 0; i < toPop.length; i++) {
        // With the same delay timeouts must observe the order, although
        // there's no hard requirement in this case to follow the pop order.
        _timer.timer.delay(toPop[i], 1);
      }
    }
  };

  /**
   * @param {function():!Promise<RESULT>} callback
   * @return {!Promise<RESULT>}
   * @template RESULT
   * @private
   */

  History.prototype.enque_ = function enque_(callback) {
    var resolve = undefined;
    var reject = undefined;
    var promise = new Promise(function (aResolve, aReject) {
      resolve = aResolve;
      reject = aReject;
    });

    this.queue_.push({ callback: callback, resolve: resolve, reject: reject });
    if (this.queue_.length == 1) {
      this.deque_();
    }

    return promise;
  };

  /**
   * @private
   */

  History.prototype.deque_ = function deque_() {
    var _this3 = this;

    if (this.queue_.length == 0) {
      return;
    }

    var task = this.queue_[0];
    var promise = undefined;
    try {
      promise = task.callback();
    } catch (e) {
      promise = Promise.reject(e);
    }

    promise.then(function (result) {
      task.resolve(result);
    }, function (reason) {
      _log.log.error(TAG_, 'failed to execute a task:', reason);
      task.reject(reason);
    }).then(function () {
      _this3.queue_.splice(0, 1);
      _this3.deque_();
    });
  };

  return History;
})();

exports.History = History;

var HistoryBindingInterface = (function () {
  function HistoryBindingInterface() {
    babelHelpers.classCallCheck(this, HistoryBindingInterface);
  }

  /**
   * Implementation of HistoryBindingInterface based on the native window. It uses
   * window.history properties and events.
   *
   * Visible for testing.
   *
   * @implements {HistoryBindingInterface}
   */

  /** @private */

  HistoryBindingInterface.prototype.cleanup_ = function cleanup_() {};

  /**
   * Configures a callback to be called when stack index has been updated.
   * @param {function(number)} unusedCallback
   * @protected
   */

  HistoryBindingInterface.prototype.setOnStackIndexUpdated = function setOnStackIndexUpdated(unusedCallback) {};

  /**
   * Pushes new state into the history stack. Returns promise that yields new
   * stack index.
   * @return {!Promise<number>}
   */

  HistoryBindingInterface.prototype.push = function push() {};

  /**
   * Pops a previously pushed state from the history stack. All states coming
   * after this state will also be popped. Returns promise that yields new
   * state index.
   * @param {number} unusedStackIndex
   * @return {!Promise<number>}
   */

  HistoryBindingInterface.prototype.pop = function pop(unusedStackIndex) {};

  return HistoryBindingInterface;
})();

var HistoryBindingNatural_ = (function () {

  /**
   * @param {!Window} win
   */

  function HistoryBindingNatural_(win) {
    var _this4 = this;

    babelHelpers.classCallCheck(this, HistoryBindingNatural_);

    /** @const {!Window} */
    this.win = win;

    var history = this.win.history;

    /** @private {number} */
    this.startIndex_ = history.length - 1;
    if (history.state && history.state[HISTORY_PROP_] !== undefined) {
      this.startIndex_ = Math.min(history.state[HISTORY_PROP_], this.startIndex_);
    }

    /** @private {number} */
    this.stackIndex_ = this.startIndex_;

    /**
     * @private {{promise: !Promise, resolve: !Function,
     *   reject: !Function}|undefined}
     */
    this.waitingState_;

    /** @private {?function(number)} */
    this.onStackIndexUpdated_ = null;

    // A number of browsers do not support history.state. In this cases,
    // History will track its own version. See unsupportedState_.
    /** @private {boolean} @const */
    this.supportsState_ = 'state' in history;

    /** @private {*} */
    this.unsupportedState_ = historyState_(this.stackIndex_);

    // There are still browsers who do not support push/replaceState.
    var pushState = undefined,
        replaceState = undefined;
    if (history.pushState && history.replaceState) {
      /** @private @const {function(*, string=, string=)|undefined} */
      this.origPushState_ = history.pushState.bind(history);
      /** @private @const {function(*, string=, string=)|undefined} */
      this.origReplaceState_ = history.replaceState.bind(history);
      pushState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
        _this4.origPushState_(state, opt_title, opt_url);
      };
      replaceState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
        // NOTE: check for `undefined` since IE11 and Edge
        // unexpectedly coerces it into a `string`.
        if (opt_url !== undefined) {
          _this4.origReplaceState_(state, opt_title, opt_url);
        } else {
          _this4.origReplaceState_(state, opt_title);
        }
      };
    } else {
      pushState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
      };
      replaceState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
      };
    }

    /** @private @const {function(*, string=, string=)} */
    this.pushState_ = pushState;

    /** @private @const {function(*, string=, string=)} */
    this.replaceState_ = replaceState;

    try {
      this.replaceState_(historyState_(this.stackIndex_));
    } catch (e) {
      _log.log.error(TAG_, 'Initial replaceState failed: ' + e.message);
    }

    history.pushState = this.historyPushState_.bind(this);
    history.replaceState = this.historyReplaceState_.bind(this);

    var eventPass = new _pass.Pass(this.onHistoryEvent_.bind(this), 50);
    this.popstateHandler_ = function (e) {
      _log.log.fine(TAG_, 'popstate event: ' + _this4.win.history.length + ', ' + JSON.stringify(e.state));
      eventPass.schedule();
    };
    this.hashchangeHandler_ = function () {
      _log.log.fine(TAG_, 'hashchange event: ' + _this4.win.history.length + ', ' + _this4.win.location.hash);
      eventPass.schedule();
    };
    this.win.addEventListener('popstate', this.popstateHandler_);
    this.win.addEventListener('hashchange', this.hashchangeHandler_);
  }

  /**
   * Implementation of HistoryBindingInterface that assumes a virtual history that
   * relies on viewer's "pushHistory", "popHistory" and "historyPopped"
   * protocol.
   *
   * Visible for testing.
   *
   * @implements {HistoryBindingInterface}
   */

  /** @override */

  HistoryBindingNatural_.prototype.cleanup_ = function cleanup_() {
    if (this.origPushState_) {
      this.win.history.pushState = this.origPushState_;
    }
    if (this.origReplaceState_) {
      this.win.history.replaceState = this.origReplaceState_;
    }
    this.win.removeEventListener('popstate', this.popstateHandler_);
    this.win.removeEventListener('hashchange', this.hashchangeHandler_);
  };

  /** @override */

  HistoryBindingNatural_.prototype.setOnStackIndexUpdated = function setOnStackIndexUpdated(callback) {
    this.onStackIndexUpdated_ = callback;
  };

  /** @override */

  HistoryBindingNatural_.prototype.push = function push() {
    var _this5 = this;

    return this.whenReady_(function () {
      _this5.historyPushState_();
      return Promise.resolve(_this5.stackIndex_);
    });
  };

  /** @override */

  HistoryBindingNatural_.prototype.pop = function pop(stackIndex) {
    var _this6 = this;

    // On pop, stack is not allowed to go prior to the starting point.
    stackIndex = Math.max(stackIndex, this.startIndex_);
    return this.whenReady_(function () {
      return _this6.back_(_this6.stackIndex_ - stackIndex + 1);
    });
  };

  /**
   * @param {number} stackIndex
   * @return {!Promise}
   */

  HistoryBindingNatural_.prototype.backTo = function backTo(stackIndex) {
    var _this7 = this;

    // On pop, stack is not allowed to go prior to the starting point.
    stackIndex = Math.max(stackIndex, this.startIndex_);
    return this.whenReady_(function () {
      return _this7.back_(_this7.stackIndex_ - stackIndex);
    });
  };

  /** @private */

  HistoryBindingNatural_.prototype.onHistoryEvent_ = function onHistoryEvent_() {
    var state = this.getState_();
    _log.log.fine(TAG_, 'history event: ' + this.win.history.length + ', ' + JSON.stringify(state));
    var stackIndex = state ? state[HISTORY_PROP_] : undefined;
    var newStackIndex = this.stackIndex_;
    var waitingState = this.waitingState_;
    this.waitingState_ = undefined;

    if (newStackIndex > this.win.history.length - 2) {
      // Make sure stack has enough space. Whether we are going forward or
      // backward, the stack should have at least one extra cell.
      newStackIndex = this.win.history.length - 2;
      this.updateStackIndex_(newStackIndex);
    }

    if (stackIndex == undefined) {
      // A new navigation forward by the user.
      newStackIndex = newStackIndex + 1;
    } else if (stackIndex < this.win.history.length) {
      // A simple trip back.
      newStackIndex = stackIndex;
    } else {
      // Generally not possible, but for posterity.
      newStackIndex = this.win.history.length - 1;
    }

    // If state index has been updated as the result replace the state.
    if (!state) {
      state = {};
    }
    state[HISTORY_PROP_] = newStackIndex;
    this.replaceState_(state, undefined, undefined);

    // Update the stack, pop squeezed states.
    if (newStackIndex != this.stackIndex_) {
      this.updateStackIndex_(newStackIndex);
    }

    // User navigation is allowed to move past the starting point of
    // the history stack.
    if (newStackIndex < this.startIndex_) {
      this.startIndex_ = newStackIndex;
    }

    if (waitingState) {
      waitingState.resolve();
    }
  };

  /** @private */

  HistoryBindingNatural_.prototype.getState_ = function getState_() {
    if (this.supportsState_) {
      return this.win.history.state;
    }
    return this.unsupportedState_;
  };

  /** @private */

  HistoryBindingNatural_.prototype.assertReady_ = function assertReady_() {
    _asserts.assert(!this.waitingState_, 'The history must not be in the waiting state');
  };

  /**
   * @param {function():!Promise<RESULT>} callback
   * @return {!Promise<RESULT>}
   * @template RESULT
   * @private
   */

  HistoryBindingNatural_.prototype.whenReady_ = function whenReady_(callback) {
    if (!this.waitingState_) {
      return callback();
    }
    return this.waitingState_.promise.then(callback, callback);
  };

  /**
   * @return {!Promise}
   * @private
   */

  HistoryBindingNatural_.prototype.wait_ = function wait_() {
    this.assertReady_();
    var resolve = undefined;
    var reject = undefined;
    var promise = _timer.timer.timeoutPromise(500, new Promise(function (aResolve, aReject) {
      resolve = aResolve;
      reject = aReject;
    }));
    this.waitingState_ = {
      promise: promise,
      resolve: resolve,
      reject: reject
    };
    return promise;
  };

  /**
   * @param {number} steps
   * @return {!Promise}
   */

  HistoryBindingNatural_.prototype.back_ = function back_(steps) {
    var _this8 = this;

    this.assertReady_();
    if (steps <= 0) {
      return Promise.resolve(this.stackIndex_);
    }
    this.unsupportedState_ = historyState_(this.stackIndex_ - steps);
    var promise = this.wait_();
    this.win.history.go(-steps);
    return promise.then(function () {
      return Promise.resolve(_this8.stackIndex_);
    });
  };

  /**
   * @param {*} state
   * @param {string|undefined} title
   * @param {string|undefined} url
   * @private
   */

  HistoryBindingNatural_.prototype.historyPushState_ = function historyPushState_(state, title, url) {
    this.assertReady_();
    if (!state) {
      state = {};
    }
    var stackIndex = this.stackIndex_ + 1;
    state[HISTORY_PROP_] = stackIndex;
    this.pushState_(state, title, url);
    if (stackIndex != this.win.history.length - 1) {
      stackIndex = this.win.history.length - 1;
      state[HISTORY_PROP_] = stackIndex;
      this.replaceState_(state);
    }
    this.updateStackIndex_(stackIndex);
  };

  /**
   * @param {*} state
   * @param {string|undefined} title
   * @param {string|undefined} url
   * @private
   */

  HistoryBindingNatural_.prototype.historyReplaceState_ = function historyReplaceState_(state, title, url) {
    this.assertReady_();
    if (!state) {
      state = {};
    }
    var stackIndex = Math.min(this.stackIndex_, this.win.history.length - 1);
    state[HISTORY_PROP_] = stackIndex;
    this.replaceState_(state, title, url);
    this.updateStackIndex_(stackIndex);
  };

  /**
   * @param {number} stackIndex
   * @private
   */

  HistoryBindingNatural_.prototype.updateStackIndex_ = function updateStackIndex_(stackIndex) {
    this.assertReady_();
    stackIndex = Math.min(stackIndex, this.win.history.length - 1);
    if (this.stackIndex_ != stackIndex) {
      _log.log.fine(TAG_, 'stack index changed: ' + this.stackIndex_ + ' -> ' + stackIndex);
      this.stackIndex_ = stackIndex;
      if (this.onStackIndexUpdated_) {
        this.onStackIndexUpdated_(stackIndex);
      }
    }
  };

  return HistoryBindingNatural_;
})();

exports.HistoryBindingNatural_ = HistoryBindingNatural_;

var HistoryBindingVirtual_ = (function () {

  /**
   * @param {!Viewer} viewer
   */

  function HistoryBindingVirtual_(viewer) {
    babelHelpers.classCallCheck(this, HistoryBindingVirtual_);

    /** @private @const {!Viewer} */
    this.viewer_ = viewer;

    /** @private {number} */
    this.stackIndex_ = 0;

    /** @private {?function(number)} */
    this.onStackIndexUpdated_ = null;

    /** @private {!UnlistenDef} */
    this.unlistenOnHistoryPopped_ = this.viewer_.onHistoryPoppedEvent(this.onHistoryPopped_.bind(this));
  }

  /**
   * @param {!Window} window
   * @return {!History}
   * @private
   */

  /** @override */

  HistoryBindingVirtual_.prototype.cleanup_ = function cleanup_() {
    this.unlistenOnHistoryPopped_();
  };

  /** @override */

  HistoryBindingVirtual_.prototype.setOnStackIndexUpdated = function setOnStackIndexUpdated(callback) {
    this.onStackIndexUpdated_ = callback;
  };

  /** @override */

  HistoryBindingVirtual_.prototype.push = function push() {
    // Current implementation doesn't wait for response from viewer.
    this.updateStackIndex_(this.stackIndex_ + 1);
    this.viewer_.postPushHistory(this.stackIndex_);
    return Promise.resolve(this.stackIndex_);
  };

  /** @override */

  HistoryBindingVirtual_.prototype.pop = function pop(stackIndex) {
    if (stackIndex > this.stackIndex_) {
      return Promise.resolve(this.stackIndex_);
    }
    this.viewer_.postPopHistory(stackIndex);
    this.updateStackIndex_(stackIndex - 1);
    return Promise.resolve(this.stackIndex_);
  };

  /**
   * @param {!ViewerHistoryPoppedEvent} event
   * @private
   */

  HistoryBindingVirtual_.prototype.onHistoryPopped_ = function onHistoryPopped_(event) {
    this.updateStackIndex_(event.newStackIndex);
  };

  /**
   * @param {number} stackIndex
   * @private
   */

  HistoryBindingVirtual_.prototype.updateStackIndex_ = function updateStackIndex_(stackIndex) {
    if (this.stackIndex_ != stackIndex) {
      _log.log.fine(TAG_, 'stack index changed: ' + this.stackIndex_ + ' -> ' + stackIndex);
      this.stackIndex_ = stackIndex;
      if (this.onStackIndexUpdated_) {
        this.onStackIndexUpdated_(stackIndex);
      }
    }
  };

  return HistoryBindingVirtual_;
})();

exports.HistoryBindingVirtual_ = HistoryBindingVirtual_;
function createHistory_(window) {
  var viewer = _viewerImpl.installViewerService(window);
  var binding = undefined;
  if (viewer.isOvertakeHistory()) {
    binding = new HistoryBindingVirtual_(viewer);
  } else {
    binding = new HistoryBindingNatural_(window);
  }
  return new History(binding);
};

/**
 * @param {!Window} window
 */

function installHistoryService(window) {
  _service.getService(window, 'history', function () {
    return createHistory_(window);
  });
}

;

},{"../asserts":55,"../log":77,"../pass":80,"../service":88,"../timer":100,"./viewer-impl":91}],91:[function(require,module,exports){
exports.__esModule = true;
exports.parseParams_ = parseParams_;
exports.installViewerService = installViewerService;
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

var _observable = require('../observable');

var _asserts = require('../asserts');

var _documentState = require('../document-state');

var _service = require('../service');

var _log = require('../log');

var _url = require('../url');

var _platform = require('../platform');

var TAG_ = 'Viewer';
var SENTINEL_ = '__AMP__';

/**
 * The type of the viewport.
 * @enum {string}
 */
var ViewportType = {

  /**
   * Viewer leaves sizing and scrolling up to the AMP document's window.
   */
  NATURAL: 'natural',

  /**
   * Viewer sets and updates sizing and scrolling.
   */
  VIRTUAL: 'virtual',

  /**
   * This is AMP-specific type and doesn't come from viewer. This is the type
   * that AMP sets when Viewer has requested "natural" viewport on a iOS
   * device.
   * See:
   * https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md
   * and {@link ViewportBindingNaturalIosEmbed_} for more details.
   */
  NATURAL_IOS_EMBED: 'natural-ios-embed'
};

exports.ViewportType = ViewportType;
/**
 * Visibility state of the AMP document.
 * @enum {string}
 * @private
 */
var VisibilityState = {

  /**
   * Viewer has shown the AMP document.
   */
  VISIBLE: 'visible',

  /**
   * Viewer has indicated that AMP document is hidden.
   */
  HIDDEN: 'hidden'
};

exports.VisibilityState = VisibilityState;
/**
 * An AMP representation of the Viewer. This class doesn't do any work itself
 * but instead delegates everything to the actual viewer. This class and the
 * actual Viewer are connected via "AMP.viewer" using three methods:
 * {@link getParam}, {@link receiveMessage} and {@link setMessageDeliverer}.
 */

var Viewer = (function () {

  /**
   * @param {!Window} win
   */

  function Viewer(win) {
    var _this = this;

    babelHelpers.classCallCheck(this, Viewer);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {boolean} */
    this.isEmbedded_ = this.win.parent && this.win.parent != this.win;

    /** @const {!DocumentState} */
    this.docState_ = _documentState.documentStateFor(window);

    /** @private {boolean} */
    this.isRuntimeOn_ = true;

    /** @private {boolean} */
    this.overtakeHistory_ = false;

    /** @private {string} */
    this.visibilityState_ = VisibilityState.VISIBLE;

    /** @private {number} */
    this.prerenderSize_ = 1;

    /** @private {string} */
    this.viewportType_ = ViewportType.NATURAL;

    /** @private {number} */
    this.viewportWidth_ = 0;

    /** @private {number} */
    this.viewportHeight_ = 0;

    /** @private {number} */
    this. /*OK*/scrollTop_ = 0;

    /** @private {number} */
    this.paddingTop_ = 0;

    /** @private {!Observable<boolean>} */
    this.runtimeOnObservable_ = new _observable.Observable();

    /** @private {!Observable} */
    this.visibilityObservable_ = new _observable.Observable();

    /** @private {!Observable} */
    this.viewportObservable_ = new _observable.Observable();

    /** @private {!Observable<!ViewerHistoryPoppedEventDef>} */
    this.historyPoppedObservable_ = new _observable.Observable();

    /** @private {?function(string, *, boolean):(Promise<*>|undefined)} */
    this.messageDeliverer_ = null;

    /** @private {!Array<!{eventType: string, data: *}>} */
    this.messageQueue_ = [];

    /** @const @private {!Object<string, string>} */
    this.params_ = {};

    /** @private {?function()} */
    this.whenVisibleResolve_ = null;

    /** @private @const {!Promise} */
    this.whenVisiblePromise_ = new Promise(function (resolve) {
      _this.whenVisibleResolve_ = resolve;
    });

    // Params can be passed either via iframe name or via hash. Hash currently
    // has precedence.
    if (this.win.name && this.win.name.indexOf(SENTINEL_) == 0) {
      parseParams_(this.win.name.substring(SENTINEL_.length), this.params_);
    }
    if (this.win.location.hash) {
      parseParams_(this.win.location.hash, this.params_);
    }

    _log.log.fine(TAG_, 'Viewer params:', this.params_);

    this.isRuntimeOn_ = !parseInt(this.params_['off'], 10);
    _log.log.fine(TAG_, '- runtimeOn:', this.isRuntimeOn_);

    this.overtakeHistory_ = parseInt(this.params_['history'], 10) || this.overtakeHistory_;
    _log.log.fine(TAG_, '- history:', this.overtakeHistory_);

    this.visibilityState_ = this.params_['visibilityState'] || this.visibilityState_;
    _log.log.fine(TAG_, '- visibilityState:', this.visibilityState_);

    this.prerenderSize_ = parseInt(this.params_['prerenderSize'], 10) || this.prerenderSize_;
    _log.log.fine(TAG_, '- prerenderSize:', this.prerenderSize_);

    this.viewportType_ = this.params_['viewportType'] || this.viewportType_;
    // Configure scrolling parameters when AMP is embeded in a viewer on iOS.
    if (this.viewportType_ == ViewportType.NATURAL && this.isEmbedded_ && _platform.platform.isIos()) {
      this.viewportType_ = ViewportType.NATURAL_IOS_EMBED;
    }
    _log.log.fine(TAG_, '- viewportType:', this.viewportType_);

    this.viewportWidth_ = parseInt(this.params_['width'], 10) || this.viewportWidth_;
    _log.log.fine(TAG_, '- viewportWidth:', this.viewportWidth_);

    this.viewportHeight_ = parseInt(this.params_['height'], 10) || this.viewportHeight_;
    _log.log.fine(TAG_, '- viewportHeight:', this.viewportHeight_);

    this. /*OK*/scrollTop_ = parseInt(this.params_['scrollTop'], 10) || this. /*OK*/scrollTop_;
    _log.log.fine(TAG_, '- scrollTop:', this. /*OK*/scrollTop_);

    this.paddingTop_ = parseInt(this.params_['paddingTop'], 10) || this.paddingTop_;
    _log.log.fine(TAG_, '- padding-top:', this.paddingTop_);

    // Wait for document to become visible.
    this.docState_.onVisibilityChanged(this.onVisibilityChange_.bind(this));

    // Remove hash - no reason to keep it around, but only when embedded.
    if (this.isEmbedded_) {
      var newUrl = _url.removeFragment(this.win.location.href);
      if (newUrl != this.win.location.href && this.win.history.replaceState) {
        this.win.history.replaceState({}, '', newUrl);
        _log.log.fine(TAG_, 'replace url:' + this.win.location.href);
      }
    }

    // Check if by the time the `Viewer`
    // instance is constructed, the document is already `visible`.
    this.onVisibilityChange_();
  }

  /**
   * Parses the viewer parameters as a string.
   *
   * Visible for testing only.
   *
   * @param {string} str
   * @param {!Object<string, string>} allParams
   * @private
   */

  /**
   * Handler for visibility change.
   * @private
   */

  Viewer.prototype.onVisibilityChange_ = function onVisibilityChange_() {
    if (this.isVisible()) {
      this.whenVisibleResolve_();
    }
    this.visibilityObservable_.fire();
  };

  /**
   * Returns the value of a viewer's startup parameter with the specified
   * name or "undefined" if the parameter wasn't defined at startup time.
   * @param {string} name
   * @return {string|undefined}
   * @export
   */

  Viewer.prototype.getParam = function getParam(name) {
    return this.params_[name];
  };

  /**
   * Whether the document is embedded in a iframe.
   * @return {boolean}
   */

  Viewer.prototype.isEmbedded = function isEmbedded() {
    return this.isEmbedded_;
  };

  /**
   * @return {boolean}
   */

  Viewer.prototype.isRuntimeOn = function isRuntimeOn() {
    return this.isRuntimeOn_;
  };

  /**
   */

  Viewer.prototype.toggleRuntime = function toggleRuntime() {
    this.isRuntimeOn_ = !this.isRuntimeOn_;
    _log.log.fine(TAG_, 'Runtime state:', this.isRuntimeOn_);
    this.runtimeOnObservable_.fire(this.isRuntimeOn_);
  };

  /**
   * @param {function(boolean)} handler
   * @return {!Unlisten}
   */

  Viewer.prototype.onRuntimeState = function onRuntimeState(handler) {
    return this.runtimeOnObservable_.add(handler);
  };

  /**
   * Whether the viewer overtakes the history for AMP document. If yes,
   * the viewer must implement history messages "pushHistory" and "popHistory"
   * and emit message "historyPopped"
   * @return {boolean}
   */

  Viewer.prototype.isOvertakeHistory = function isOvertakeHistory() {
    return this.overtakeHistory_;
  };

  /**
   * Returns visibility state configured by the viewer.
   * See {@link isVisible}.
   * @return {!VisibilityState}
   */

  Viewer.prototype.getVisibilityState = function getVisibilityState() {
    return this.visibilityState_;
  };

  /**
   * Whether the AMP document currently visible. The reasons why it might not
   * be visible include user switching to another tab, browser running the
   * document in the prerender mode or viewer running the document in the
   * prerender mode.
   * @return {boolean}
   */

  Viewer.prototype.isVisible = function isVisible() {
    return this.visibilityState_ == VisibilityState.VISIBLE && !this.docState_.isHidden();
  };

  /**
   * Returns a Promise that only ever resolved when the current
   * AMP document becomes visible.
   * @return {!Promise}
   */

  Viewer.prototype.whenVisible = function whenVisible() {
    return this.whenVisiblePromise_;
  };

  /**
   * How much the viewer has requested the runtime to prerender the document.
   * The values are in number of screens.
   * @return {number}
   */

  Viewer.prototype.getPrerenderSize = function getPrerenderSize() {
    return this.prerenderSize_;
  };

  /**
   * There are two types of viewports: "natural" and "virtual". "Natural" is
   * the viewport of the AMP document's window. "Virtual" is the viewport
   * provided by the viewer.
   * See {@link Viewport} and {@link ViewportBinding} for more details.
   * @return {!ViewportType}
   */

  Viewer.prototype.getViewportType = function getViewportType() {
    return this.viewportType_;
  };

  /**
   * Returns the width of the viewport provided by the viewer. This value only
   * used when viewport type is "virtual."
   * @return {number}
   */

  Viewer.prototype.getViewportWidth = function getViewportWidth() {
    return this.viewportWidth_;
  };

  /**
   * Returns the height of the viewport provided by the viewer. This value only
   * used when viewport type is "virtual."
   * @return {number}
   */

  Viewer.prototype.getViewportHeight = function getViewportHeight() {
    return this.viewportHeight_;
  };

  /**
   * Returns the scroll position of the viewport provided by the viewer. This
   * value only used when viewport type is "virtual."
   * @return {number}
   */

  Viewer.prototype.getScrollTop = function getScrollTop() {
    return this. /*OK*/scrollTop_;
  };

  /**
   * Returns the top padding requested by the viewer.
   * @return {number}
   */

  Viewer.prototype.getPaddingTop = function getPaddingTop() {
    return this.paddingTop_;
  };

  /**
   * Adds a "visibilitychange" event listener for viewer events. The
   * callback can check {@link isVisible} and {@link getPrefetchCount}
   * methods for more info.
   * @param {function()} handler
   * @return {!Unlisten}
   */

  Viewer.prototype.onVisibilityChanged = function onVisibilityChanged(handler) {
    return this.visibilityObservable_.add(handler);
  };

  /**
   * Adds a "viewport" event listener for viewer events.
   * @param {function()} handler
   * @return {!Unlisten}
   */

  Viewer.prototype.onViewportEvent = function onViewportEvent(handler) {
    return this.viewportObservable_.add(handler);
  };

  /**
   * Adds a "history popped" event listener for viewer events.
   * @param {function(ViewerHistoryPoppedEventDef)} handler
   * @return {!Unlisten}
   */

  Viewer.prototype.onHistoryPoppedEvent = function onHistoryPoppedEvent(handler) {
    return this.historyPoppedObservable_.add(handler);
  };

  /**
   * Triggers "documentLoaded" event for the viewer.
   * @param {number} width
   * @param {number} height
   */

  Viewer.prototype.postDocumentReady = function postDocumentReady(width, height) {
    this.sendMessage_('documentLoaded', { width: width, height: height }, false);
  };

  /**
   * Triggers "documentResized" event for the viewer.
   * @param {number} width
   * @param {number} height
   */

  Viewer.prototype.postDocumentResized = function postDocumentResized(width, height) {
    this.sendMessage_('documentResized', { width: width, height: height }, false);
  };

  /**
   * Requests full overlay mode from the viewer. Returns a promise that yields
   * when the viewer has switched to full overlay mode.
   * @return {!Promise}
   */

  Viewer.prototype.requestFullOverlay = function requestFullOverlay() {
    return this.sendMessage_('requestFullOverlay', {}, true);
  };

  /**
   * Requests to cancel full overlay mode from the viewer. Returns a promise
   * that yields when the viewer has switched off full overlay mode.
   * @return {!Promise}
   */

  Viewer.prototype.cancelFullOverlay = function cancelFullOverlay() {
    return this.sendMessage_('cancelFullOverlay', {}, true);
  };

  /**
   * Triggers "pushHistory" event for the viewer.
   * @param {number} stackIndex
   * @return {!Promise}
   */

  Viewer.prototype.postPushHistory = function postPushHistory(stackIndex) {
    return this.sendMessage_('pushHistory', { stackIndex: stackIndex }, true);
  };

  /**
   * Triggers "popHistory" event for the viewer.
   * @param {number} stackIndex
   * @return {!Promise}
   */

  Viewer.prototype.postPopHistory = function postPopHistory(stackIndex) {
    return this.sendMessage_('popHistory', { stackIndex: stackIndex }, true);
  };

  /**
   * Retrieves the Base CID from the viewer
   * @return {!Promise<string>}
   */

  Viewer.prototype.getBaseCid = function getBaseCid() {
    return this.sendMessage_('cid', undefined, true);
  };

  /**
   * Requests AMP document to receive a message from Viewer.
   * @param {string} eventType
   * @param {*} data
   * @param {boolean} unusedAwaitResponse
   * @return {(!Promise<*>|undefined)}
   * @package
   * @export
   */

  Viewer.prototype.receiveMessage = function receiveMessage(eventType, data, unusedAwaitResponse) {
    if (eventType == 'viewport') {
      if (data['width'] !== undefined) {
        this.viewportWidth_ = data['width'];
      }
      if (data['height'] !== undefined) {
        this.viewportHeight_ = data['height'];
      }
      if (data['paddingTop'] !== undefined) {
        this.paddingTop_ = data['paddingTop'];
      }
      if (data['scrollTop'] !== undefined) {
        this. /*OK*/scrollTop_ = data['scrollTop'];
      }
      this.viewportObservable_.fire();
      return undefined;
    }
    if (eventType == 'historyPopped') {
      this.historyPoppedObservable_.fire({
        newStackIndex: data['newStackIndex']
      });
      return Promise.resolve();
    }
    if (eventType == 'visibilitychange') {
      if (data['state'] !== undefined) {
        this.visibilityState_ = data['state'];
      }
      if (data['prerenderSize'] !== undefined) {
        this.prerenderSize_ = data['prerenderSize'];
      }
      _log.log.fine(TAG_, 'visibilitychange event:', this.visibilityState_, this.prerenderSize_);
      this.onVisibilityChange_();
      return Promise.resolve();
    }
    _log.log.fine(TAG_, 'unknown message:', eventType);
    return undefined;
  };

  /**
   * Provides a message delivery mechanism by which AMP document can send
   * messages to the viewer.
   * @param {function(string, *, boolean):(!Promise<*>|undefined)} deliverer
   * @package
   * @export
   */

  Viewer.prototype.setMessageDeliverer = function setMessageDeliverer(deliverer) {
    var _this2 = this;

    _asserts.assert(!this.messageDeliverer_, 'message deliverer can only be set once');
    this.messageDeliverer_ = deliverer;
    if (this.messageQueue_.length > 0) {
      var queue = this.messageQueue_.slice(0);
      this.messageQueue_ = [];
      queue.forEach(function (message) {
        _this2.messageDeliverer_(message.eventType, message.data, false);
      });
    }
  };

  /**
   * @param {string} eventType
   * @param {*} data
   * @param {boolean} awaitResponse
   * @return {!Promise<*>|undefined}
   * @private
   */

  Viewer.prototype.sendMessage_ = function sendMessage_(eventType, data, awaitResponse) {
    if (this.messageDeliverer_) {
      return this.messageDeliverer_(eventType, data, awaitResponse);
    }

    // Store only a last version for an event type.
    var found = null;
    for (var i = 0; i < this.messageQueue_.length; i++) {
      if (this.messageQueue_[i].eventType == eventType) {
        found = this.messageQueue_[i];
        break;
      }
    }
    if (found) {
      found.data = data;
    } else {
      this.messageQueue_.push({ eventType: eventType, data: data });
    }
    if (awaitResponse) {
      // TODO(dvoytenko): This is somewhat questionable. What do we return
      // when no one is listening?
      return Promise.resolve();
    }
    return undefined;
  };

  return Viewer;
})();

exports.Viewer = Viewer;

function parseParams_(str, allParams) {
  var params = _url.parseQueryString(str);
  for (var k in params) {
    allParams[k] = params[k];
  }
}

/**
 * @typedef {{
 *   newStackIndex: number
 * }}
 */
var ViewerHistoryPoppedEventDef = undefined;

/**
 * @param {!Window} window
 * @return {!Viewer}
 */

function installViewerService(window) {
  return _service.getService(window, 'viewer', function () {
    return new Viewer(window);
  });
}

;

},{"../asserts":55,"../document-state":63,"../log":77,"../observable":79,"../platform":82,"../service":88,"../url":102}],92:[function(require,module,exports){
exports.__esModule = true;
exports.parseViewportMeta = parseViewportMeta;
exports.stringifyViewportMeta = stringifyViewportMeta;
exports.updateViewportMetaString = updateViewportMetaString;
exports.installViewportService = installViewportService;
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

var _observable = require('../observable');

var _service = require('../service');

var _layoutRect = require('../layout-rect');

var _log = require('../log');

var _documentState = require('../document-state');

var _platform = require('../platform');

var _style = require('../style');

var _timer = require('../timer');

var _vsyncImpl = require('./vsync-impl');

var _viewerImpl = require('./viewer-impl');

var TAG_ = 'Viewport';

/**
 * @typedef {{
 *   relayoutAll: boolean,
 *   top: number,
 *   width: number,
 *   height: number,
 *   velocity: number
 * }}
 */
var ViewportChangedEventDef = undefined;

/**
 * This object represents the viewport. It tracks scroll position, resize
 * and other events and notifies interesting parties when viewport has changed
 * and how.
 */

var Viewport = (function () {

  /**
   * @param {!Window} win
   * @param {!ViewportBindingDef} binding
   * @param {!Viewer} viewer
   */

  function Viewport(win, binding, viewer) {
    var _this = this;

    babelHelpers.classCallCheck(this, Viewport);

    /** @const {!Window} */
    this.win_ = win;

    /** @const {!ViewportBindingDef} */
    this.binding_ = binding;

    /** @const {!Viewer} */
    this.viewer_ = viewer;

    /**
     * Used to cache the size of the viewport. Also used as last known size,
     * so users should call getSize early on to get a value. The timing should
     * be chosen to avoid extra style recalcs.
     * @private {{width: number, height: number}|null}
     */
    this.size_ = null;

    /** @private {?number} */
    this. /*OK*/scrollTop_ = null;

    /** @private {?number} */
    this.lastMeasureScrollTop_ = null;

    /** @private {?number} */
    this. /*OK*/scrollLeft_ = null;

    /** @private {number} */
    this.paddingTop_ = viewer.getPaddingTop();

    /** @private {number} */
    this.scrollMeasureTime_ = 0;

    /** @private {Vsync} */
    this.vsync_ = _vsyncImpl.installVsyncService(win);

    /** @private {boolean} */
    this.scrollTracking_ = false;

    /** @private {number} */
    this.scrollCount_ = 0;

    /** @private @const {!Observable<!ViewportChangedEventDef>} */
    this.changeObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private {?HTMLMetaElement|undefined} */
    this.viewportMeta_ = undefined;

    /** @private {string|undefined} */
    this.originalViewportMetaString_ = undefined;

    /** @private @const (function()) */
    this.boundThrottledScroll_ = this.throttledScroll_.bind(this);

    this.viewer_.onViewportEvent(function () {
      _this.binding_.updateViewerViewport(_this.viewer_);
      var paddingTop = _this.viewer_.getPaddingTop();
      if (paddingTop != _this.paddingTop_) {
        _this.paddingTop_ = paddingTop;
        _this.binding_.updatePaddingTop(_this.paddingTop_);
      }
    });
    this.binding_.updateViewerViewport(this.viewer_);
    this.binding_.updatePaddingTop(this.paddingTop_);

    this.binding_.onScroll(this.scroll_.bind(this));
    this.binding_.onResize(this.resize_.bind(this));
  }

  /**
   * ViewportBindingDef is an interface that defines an underlying technology behind
   * the {@link Viewport}.
   * @interface
   */

  /** For testing. */

  Viewport.prototype.cleanup_ = function cleanup_() {
    this.binding_.cleanup_();
  };

  /**
   * Returns the top padding mandated by the viewer.
   * @return {number}
   */

  Viewport.prototype.getPaddingTop = function getPaddingTop() {
    return this.paddingTop_;
  };

  /**
   * Returns the viewport's top position in the document. This is essentially
   * the scroll position.
   * @return {number}
   * @deprecated Use {@link getScrollTop}
   */

  Viewport.prototype.getTop = function getTop() {
    return this.getScrollTop();
  };

  /**
   * Returns the viewport's vertical scroll position.
   * @return {number}
   */

  Viewport.prototype.getScrollTop = function getScrollTop() {
    if (this. /*OK*/scrollTop_ == null) {
      this. /*OK*/scrollTop_ = this.binding_.getScrollTop();
    }
    return this. /*OK*/scrollTop_;
  };

  /**
   * Returns the viewport's horizontal scroll position.
   * @return {number}
   */

  Viewport.prototype.getScrollLeft = function getScrollLeft() {
    if (this. /*OK*/scrollLeft_ == null) {
      this. /*OK*/scrollLeft_ = this.binding_.getScrollLeft();
    }
    return this. /*OK*/scrollLeft_;
  };

  /**
   * Sets the desired scroll position on the viewport.
   * @param {number} scrollPos
   */

  Viewport.prototype.setScrollTop = function setScrollTop(scrollPos) {
    this. /*OK*/scrollTop_ = null;
    this.binding_.setScrollTop(scrollPos);
  };

  /**
   * Returns the size of the viewport.
   * @return {!{width: number, height: number}}
   */

  Viewport.prototype.getSize = function getSize() {
    if (this.size_) {
      return this.size_;
    }
    return this.size_ = this.binding_.getSize();
  };

  /**
   * Returns the width of the viewport.
   * @return {number}
   */

  Viewport.prototype.getWidth = function getWidth() {
    return this.getSize().width;
  };

  /**
   * Returns the scroll width of the content of the document. Note that this
   * method is not cached since we there's no indication when it might change.
   * @return {number}
   */

  Viewport.prototype.getScrollWidth = function getScrollWidth() {
    return this.binding_.getScrollWidth();
  };

  /**
   * Returns the scroll height of the content of the document. Note that this
   * method is not cached since we there's no indication when it might change.
   * @return {number}
   */

  Viewport.prototype.getScrollHeight = function getScrollHeight() {
    return this.binding_.getScrollHeight();
  };

  /**
   * Returns the rect of the viewport which includes scroll positions and size.
   * @return {!LayoutRect}
   */

  Viewport.prototype.getRect = function getRect() {
    var scrollTop = this.getScrollTop();
    var scrollLeft = this.getScrollLeft();
    var size = this.getSize();
    return _layoutRect.layoutRectLtwh(scrollLeft, scrollTop, size.width, size.height);
  };

  /**
   * Returns the rect of the element within the document.
   * @param {!Element} el
   * @return {!LayoutRect}
   */

  Viewport.prototype.getLayoutRect = function getLayoutRect(el) {
    return this.binding_.getLayoutRect(el);
  };

  /**
   * Scrolls element into view much like Element. scrollIntoView does but
   * in the AMP/Viewer environment.
   * @param {!Element} element
   */

  Viewport.prototype.scrollIntoView = function scrollIntoView(element) {
    var elementTop = this.binding_.getLayoutRect(element).top;
    var newScrollTop = Math.max(0, elementTop - this.paddingTop_);
    this.binding_.setScrollTop(newScrollTop);
  };

  /**
   * Registers the handler for ViewportChangedEventDef events.
   * @param {!function(!ViewportChangedEventDef)} handler
   * @return {!Unlisten}
   */

  Viewport.prototype.onChanged = function onChanged(handler) {
    return this.changeObservable_.add(handler);
  };

  /**
   * Registers the handler for scroll events. These events DO NOT contain
   * scrolling offset and it's discouraged to read scrolling offset in the
   * event handler. The primary use case for this handler is to inform that
   * scrolling might be going on. To get more information {@link onChanged}
   * handler should be used.
   * @param {!function()} handler
   * @return {!Unlisten}
   */

  Viewport.prototype.onScroll = function onScroll(handler) {
    return this.scrollObservable_.add(handler);
  };

  /**
   * Resets touch zoom to initial scale of 1.
   */

  Viewport.prototype.resetTouchZoom = function resetTouchZoom() {
    var _this2 = this;

    var windowHeight = this.win_. /*OK*/innerHeight;
    var documentHeight = this.win_.document.documentElement. /*OK*/clientHeight;
    if (windowHeight && documentHeight && windowHeight === documentHeight) {
      // This code only works when scrollbar overlay content and take no space,
      // which is fine on mobile. For non-mobile devices this code is
      // irrelevant.
      return;
    }
    if (this.disableTouchZoom()) {
      _timer.timer.delay(function () {
        _this2.restoreOriginalTouchZoom();
      }, 50);
    }
  };

  /**
   * Disables touch zoom on this viewport. Returns `true` if any actual
   * changes have been done.
   * @return {boolean}
   */

  Viewport.prototype.disableTouchZoom = function disableTouchZoom() {
    var viewportMeta = this.getViewportMeta_();
    if (!viewportMeta) {
      // This should never happen in a valid AMP document, thus shortcircuit.
      return false;
    }
    // Setting maximum-scale=1 and user-scalable=no zooms page back to normal
    // and prohibit further default zooming.
    var newValue = updateViewportMetaString(viewportMeta.content, {
      'maximum-scale': '1',
      'user-scalable': 'no'
    });
    return this.setViewportMetaString_(newValue);
  };

  /**
   * Restores original touch zoom parameters. Returns `true` if any actual
   * changes have been done.
   * @return {boolean}
   */

  Viewport.prototype.restoreOriginalTouchZoom = function restoreOriginalTouchZoom() {
    if (this.originalViewportMetaString_ !== undefined) {
      return this.setViewportMetaString_(this.originalViewportMetaString_);
    }
    return false;
  };

  /**
   * Returns whether the user has scrolled yet.
   * @return {boolean}
   */

  Viewport.prototype.hasScrolled = function hasScrolled() {
    return this.scrollCount_ > 0;
  };

  /**
   * Updates touch zoom meta data. Returns `true` if any actual
   * changes have been done.
   * @return {boolean}
   */

  Viewport.prototype.setViewportMetaString_ = function setViewportMetaString_(viewportMetaString) {
    var viewportMeta = this.getViewportMeta_();
    if (viewportMeta && viewportMeta.content != viewportMetaString) {
      _log.log.fine(TAG_, 'changed viewport meta to:', viewportMetaString);
      viewportMeta.content = viewportMetaString;
      return true;
    }
    return false;
  };

  /**
   * @return {?HTMLMetaElement}
   * @private
   */

  Viewport.prototype.getViewportMeta_ = function getViewportMeta_() {
    if (this.viewer_.isEmbedded()) {
      // An embedded document does not control its viewport meta tag.
      return null;
    }
    if (this.viewportMeta_ === undefined) {
      this.viewportMeta_ = this.win_.document.querySelector('meta[name=viewport]');
      if (this.viewportMeta_) {
        this.originalViewportMetaString_ = this.viewportMeta_.content;
      }
    }
    return this.viewportMeta_;
  };

  /**
   * @param {boolean} relayoutAll
   * @param {number} velocity
   * @private
   */

  Viewport.prototype.changed_ = function changed_(relayoutAll, velocity) {
    var size = this.getSize();
    var scrollTop = this.getScrollTop();
    _log.log.fine(TAG_, 'changed event:', 'relayoutAll=', relayoutAll, 'top=', scrollTop, 'bottom=', scrollTop + size.height, 'velocity=', velocity);
    this.changeObservable_.fire({
      relayoutAll: relayoutAll,
      top: scrollTop,
      width: size.width,
      height: size.height,
      velocity: velocity
    });
  };

  /** @private */

  Viewport.prototype.scroll_ = function scroll_() {
    var _this3 = this;

    this.scrollCount_++;
    this.scrollLeft_ = this.binding_.getScrollLeft();
    var newScrollTop = this.binding_.getScrollTop();
    if (newScrollTop < 0) {
      // iOS and some other browsers use negative values of scrollTop for
      // overscroll. Overscroll does not affect the viewport and thus should
      // be ignored here.
      return;
    }
    this.scrollTop_ = newScrollTop;
    if (!this.scrollTracking_) {
      (function () {
        _this3.scrollTracking_ = true;
        var now = _timer.timer.now();
        // Wait 2 frames and then request an animation frame.
        _timer.timer.delay(function () {
          return _this3.vsync_.measure(_this3.throttledScroll_.bind(_this3, now, newScrollTop));
        }, 36);
      })();
    }
    this.scrollObservable_.fire();
  };

  /**
   * This method is called about every 3 frames (assuming 60hz) and it
   * is called in a vsync measure task.
   * @param {number} referenceTime Time when the scroll measurement, that
   *     triggered this call made, was made.
   * @param {number} referenceTop Scrolltop at that time.
   * @private
   */

  Viewport.prototype.throttledScroll_ = function throttledScroll_(referenceTime, referenceTop) {
    var _this4 = this;

    this.scrollTracking_ = false;
    var newScrollTop = this.scrollTop_ = this.binding_.getScrollTop();
    var now = _timer.timer.now();
    var velocity = 0;
    if (now != referenceTime) {
      velocity = (newScrollTop - referenceTop) / (now - referenceTime);
    }
    _log.log.fine(TAG_, 'scroll: ' + 'scrollTop=' + newScrollTop + '; ' + 'velocity=' + velocity);
    // TODO(dvoytenko): confirm the desired value and document it well.
    // Currently, this is 30px/second -> 0.03px/millis
    if (Math.abs(velocity) < 0.03) {
      this.changed_( /* relayoutAll */false, velocity);
    } else {
      _timer.timer.delay(function () {
        return _this4.vsync_.measure(_this4.throttledScroll_.bind(_this4, now, newScrollTop));
      }, 20);
    }
  };

  /** @private */

  Viewport.prototype.resize_ = function resize_() {
    var oldSize = this.size_;
    this.size_ = null; // Need to recalc.
    var newSize = this.getSize();
    this.changed_(!oldSize || oldSize.width != newSize.width, 0);
  };

  return Viewport;
})();

exports.Viewport = Viewport;

var ViewportBindingDef = (function () {
  function ViewportBindingDef() {
    babelHelpers.classCallCheck(this, ViewportBindingDef);
  }

  /**
   * Implementation of ViewportBindingDef based on the native window. It assumes that
   * the native window is sized properly and events represent the actual
   * scroll/resize events. This mode is applicable to a standalone document
   * display or when an iframe has a fixed size.
   *
   * Visible for testing.
   *
   * @implements {ViewportBindingDef}
   */

  /**
   * Register a callback for scroll events.
   * @param {function()} unusedCallback
   */

  ViewportBindingDef.prototype.onScroll = function onScroll(unusedCallback) {};

  /**
   * Register a callback for resize events.
   * @param {function()} unusedCallback
   */

  ViewportBindingDef.prototype.onResize = function onResize(unusedCallback) {};

  /**
   * Updates binding with the new viewer's viewport info.
   * @param {!Viewer} unusedViewer
   */

  ViewportBindingDef.prototype.updateViewerViewport = function updateViewerViewport(unusedViewer) {};

  /**
   * Updates binding with the new padding.
   * @param {number} unusedPaddingTop
   */

  ViewportBindingDef.prototype.updatePaddingTop = function updatePaddingTop(unusedPaddingTop) {};

  /**
   * Returns the size of the viewport.
   * @return {!{width: number, height: number}}
   */

  ViewportBindingDef.prototype.getSize = function getSize() {};

  /**
   * Returns the top scroll position for the viewport.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollTop = function getScrollTop() {};

  /**
   * Sets scroll top position to the specified value or the nearest possible.
   * @param {number} unusedScrollTop
   */

  ViewportBindingDef.prototype.setScrollTop = function setScrollTop(unusedScrollTop) {};

  /**
   * Returns the left scroll position for the viewport.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollLeft = function getScrollLeft() {};

  /**
   * Returns the scroll width of the content of the document.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollWidth = function getScrollWidth() {};

  /**
   * Returns the scroll height of the content of the document.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollHeight = function getScrollHeight() {};

  /**
   * Returns the rect of the element within the document.
   * @param {!Element} unusedEl
   * @return {!LayoutRect}
   */

  ViewportBindingDef.prototype.getLayoutRect = function getLayoutRect(unusedEl) {};

  /** For testing. */

  ViewportBindingDef.prototype.cleanup_ = function cleanup_() {};

  return ViewportBindingDef;
})();

var ViewportBindingNatural_ = (function () {

  /**
   * @param {!Window} win
   */

  function ViewportBindingNatural_(win) {
    var _this5 = this;

    babelHelpers.classCallCheck(this, ViewportBindingNatural_);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.resizeObservable_ = new _observable.Observable();

    this.win.addEventListener('scroll', function () {
      return _this5.scrollObservable_.fire();
    });
    this.win.addEventListener('resize', function () {
      return _this5.resizeObservable_.fire();
    });

    _log.log.fine(TAG_, 'initialized natural viewport');
  }

  /**
   * Implementation of ViewportBindingDef based on the native window in case when
   * the AMP document is embedded in a IFrame on iOS. It assumes that the native
   * window is sized properly and events represent the actual resize events.
   * The main difference from natural binding is that in this case, the document
   * itself is not scrollable, but instead only "body" is scrollable.
   *
   * Visible for testing.
   *
   * @implements {ViewportBindingDef}
   */

  /** @override */

  ViewportBindingNatural_.prototype.cleanup_ = function cleanup_() {}
  // TODO(dvoytenko): remove listeners

  /** @override */
  ;

  ViewportBindingNatural_.prototype.onScroll = function onScroll(callback) {
    this.scrollObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNatural_.prototype.onResize = function onResize(callback) {
    this.resizeObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNatural_.prototype.updateViewerViewport = function updateViewerViewport(unusedViewer) {}
  // Viewer's viewport is ignored since this window is fully accurate.

  /** @override */
  ;

  ViewportBindingNatural_.prototype.updatePaddingTop = function updatePaddingTop(paddingTop) {
    this.win.document.documentElement.style.paddingTop = _style.px(paddingTop);
  };

  /** @override */

  ViewportBindingNatural_.prototype.getSize = function getSize() {
    // Notice, that documentElement./*OK*/clientHeight is buggy on iOS Safari
    // and thus cannot be used. But when the values are undefined, fallback to
    // documentElement./*OK*/clientHeight.
    if (_platform.platform.isIos() && !_platform.platform.isChrome()) {
      var winWidth = this.win. /*OK*/innerWidth;
      var winHeight = this.win. /*OK*/innerHeight;
      if (winWidth && winHeight) {
        return { width: winWidth, height: winHeight };
      }
    }
    var el = this.win.document.documentElement;
    return { width: el. /*OK*/clientWidth, height: el. /*OK*/clientHeight };
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollTop = function getScrollTop() {
    return this.getScrollingElement_(). /*OK*/scrollTop || this.win. /*OK*/pageYOffset;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollLeft = function getScrollLeft() {
    return this.getScrollingElement_(). /*OK*/scrollLeft || this.win. /*OK*/pageXOffset;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollWidth = function getScrollWidth() {
    return this.getScrollingElement_(). /*OK*/scrollWidth;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollHeight = function getScrollHeight() {
    return this.getScrollingElement_(). /*OK*/scrollHeight;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getLayoutRect = function getLayoutRect(el) {
    var scrollTop = this.getScrollTop();
    var scrollLeft = this.getScrollLeft();
    var b = el. /*OK*/getBoundingClientRect();
    return _layoutRect.layoutRectLtwh(Math.round(b.left + scrollLeft), Math.round(b.top + scrollTop), Math.round(b.width), Math.round(b.height));
  };

  /** @override */

  ViewportBindingNatural_.prototype.setScrollTop = function setScrollTop(scrollTop) {
    this.getScrollingElement_(). /*OK*/scrollTop = scrollTop;
  };

  /**
   * @return {!Element}
   * @private
   */

  ViewportBindingNatural_.prototype.getScrollingElement_ = function getScrollingElement_() {
    var doc = this.win.document;
    if (doc. /*OK*/scrollingElement) {
      return doc. /*OK*/scrollingElement;
    }
    if (doc.body) {
      return doc.body;
    }
    return doc.documentElement;
  };

  return ViewportBindingNatural_;
})();

exports.ViewportBindingNatural_ = ViewportBindingNatural_;

var ViewportBindingNaturalIosEmbed_ = (function () {
  /**
   * @param {!Window} win
   */

  function ViewportBindingNaturalIosEmbed_(win) {
    var _this6 = this;

    babelHelpers.classCallCheck(this, ViewportBindingNaturalIosEmbed_);

    /** @const {!Window} */
    this.win = win;

    /** @private {number} */
    this.scrollWidth_ = 0;

    /** @private {?Element} */
    this.scrollPosEl_ = null;

    /** @private {?Element} */
    this.scrollMoveEl_ = null;

    /** @private {!{x: number, y: number}} */
    this.pos_ = { x: 0, y: 0 };

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.resizeObservable_ = new _observable.Observable();

    _documentState.onDocumentReady(this.win.document, function () {
      // Microtask is necessary here to let Safari to recalculate scrollWidth
      // post DocumentReady signal.
      _timer.timer.delay(function () {
        _this6.setup_();
      }, 0);
    });
    this.win.addEventListener('resize', function () {
      return _this6.resizeObservable_.fire();
    });

    _log.log.fine(TAG_, 'initialized natural viewport for iOS embeds');
  }

  /**
   * Implementation of ViewportBindingDef that assumes a virtual viewport that is
   * sized outside of the AMP runtime (e.g. in a parent window) and passed here
   * via config and events. Applicable to cases where a parent window expands the
   * iframe to all available height and leaves scrolling to the parent window.
   *
   * Visible for testing.
   *
   * @implements {ViewportBindingDef}
   */

  /** @private */

  ViewportBindingNaturalIosEmbed_.prototype.setup_ = function setup_() {
    var documentElement = this.win.document.documentElement;
    var documentBody = this.win.document.body;

    // TODO(dvoytenko): need to also find a way to do this on resize.
    this.scrollWidth_ = documentBody. /*OK*/scrollWidth || 0;

    // Embedded scrolling on iOS is rather complicated. IFrames cannot be sized
    // and be scrollable. Sizing iframe by scrolling height has a big negative
    // that "fixed" position is essentially impossible. The only option we
    // found is to reset scrolling on the AMP doc, which overrides natural BODY
    // scrolling with overflow:auto. We need the following styling:
    // html {
    //   overflow: auto;
    //   -webkit-overflow-scrolling: touch;
    // }
    // body {
    //   position: absolute;
    //   overflow: auto;
    //   -webkit-overflow-scrolling: touch;
    // }
    _style.setStyles(documentElement, {
      overflow: 'auto',
      webkitOverflowScrolling: 'touch'
    });
    _style.setStyles(documentBody, {
      overflow: 'auto',
      webkitOverflowScrolling: 'touch',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    });

    // Insert scrollPos element into DOM. See {@link onScrolled_} for why
    // this is needed.
    this.scrollPosEl_ = this.win.document.createElement('div');
    this.scrollPosEl_.id = '-amp-scrollpos';
    _style.setStyles(this.scrollPosEl_, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      visibility: 'hidden'
    });
    documentBody.appendChild(this.scrollPosEl_);

    // Insert scrollMove element into DOM. See {@link adjustScrollPos_} for why
    // this is needed.
    this.scrollMoveEl_ = this.win.document.createElement('div');
    this.scrollMoveEl_.id = '-amp-scrollmove';
    _style.setStyles(this.scrollMoveEl_, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      visibility: 'hidden'
    });
    documentBody.appendChild(this.scrollMoveEl_);

    // Insert endPos element into DOM. See {@link getScrollHeight} for why
    // this is needed.
    this.endPosEl_ = this.win.document.createElement('div');
    this.endPosEl_.id = '-amp-endpos';
    _style.setStyles(this.endPosEl_, {
      width: 0,
      height: 0,
      visibility: 'hidden'
    });
    // TODO(dvoytenko): not only it should be at the bottom at setup time,
    // but it must always be at the bottom. Consider using BODY "childList"
    // mutations to track this. For now, however, this is ok since we don't
    // allow arbitrary content inserted into BODY.
    documentBody.appendChild(this.endPosEl_);

    documentBody.addEventListener('scroll', this.onScrolled_.bind(this));
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.updateViewerViewport = function updateViewerViewport(unusedViewer) {}
  // Viewer's viewport is ignored since this window is fully accurate.

  /** @override */
  ;

  ViewportBindingNaturalIosEmbed_.prototype.updatePaddingTop = function updatePaddingTop(paddingTop) {
    var _this7 = this;

    _documentState.onDocumentReady(this.win.document, function () {
      _this7.win.document.body.style.paddingTop = _style.px(paddingTop);
    });
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.cleanup_ = function cleanup_() {}
  // TODO(dvoytenko): remove listeners

  /** @override */
  ;

  ViewportBindingNaturalIosEmbed_.prototype.onScroll = function onScroll(callback) {
    this.scrollObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.onResize = function onResize(callback) {
    this.resizeObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getSize = function getSize() {
    return {
      width: this.win. /*OK*/innerWidth,
      height: this.win. /*OK*/innerHeight
    };
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollTop = function getScrollTop() {
    return Math.round(this.pos_.y);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollLeft = function getScrollLeft() {
    return Math.round(this.pos_.x);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollWidth = function getScrollWidth() {
    return Math.max(this.scrollWidth_, this.win. /*OK*/innerWidth);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollHeight = function getScrollHeight() {
    // We have to use a special "tail" element on iOS due to the issues outlined
    // in the {@link onScrolled_} method. Because we are forced to layout BODY
    // with position:absolute, we can no longer use BODY's scrollHeight to
    // determine scrolling height - it will always return the viewport height.
    // Instead, we append the "tail" element as the last child of BODY and use
    // it's viewport-relative position to calculate scrolling height.
    if (!this.endPosEl_) {
      return 0;
    }
    return Math.round(this.endPosEl_. /*OK*/getBoundingClientRect().top - this.scrollPosEl_. /*OK*/getBoundingClientRect().top);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getLayoutRect = function getLayoutRect(el) {
    var b = el. /*OK*/getBoundingClientRect();
    return _layoutRect.layoutRectLtwh(Math.round(b.left + this.pos_.x), Math.round(b.top + this.pos_.y), Math.round(b.width), Math.round(b.height));
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.setScrollTop = function setScrollTop(scrollTop) {
    this.setScrollPos_(scrollTop || 1);
  };

  /**
   * @param {!Event} event
   * @private
   */

  ViewportBindingNaturalIosEmbed_.prototype.onScrolled_ = function onScrolled_(event) {
    // We have to use a special "positioning" element on iOS due to the
    // following bugs:
    // - https://code.google.com/p/chromium/issues/detail?id=2891
    // - https://code.google.com/p/chromium/issues/detail?id=157855
    // - https://bugs.webkit.org/show_bug.cgi?id=106133
    // - https://bugs.webkit.org/show_bug.cgi?id=149264
    // This is an iOS-specific issue in the context of AMP, but Chrome bugs
    // are listed for reference. In a nutshell, this is because WebKit (and
    // Chrome as well) redirect body's scrollTop to documentElement instead of
    // body. Since in this case we are actually using direct body scrolling,
    // body's scrollTop would always return wrong values.
    // This will all change with a complete migration when
    // document./*OK*/scrollingElement will point to document.documentElement.
    // This already works correctly in Chrome with "scroll-top-left-interop"
    // flag turned on "chrome://flags/#scroll-top-left-interop".
    if (!this.scrollPosEl_) {
      return;
    }
    this.adjustScrollPos_(event);
    var rect = this.scrollPosEl_. /*OK*/getBoundingClientRect();
    if (this.pos_.x != -rect.left || this.pos_.y != -rect.top) {
      this.pos_.x = -rect.left;
      this.pos_.y = -rect.top;
      this.scrollObservable_.fire();
    }
  };

  /** @private */

  ViewportBindingNaturalIosEmbed_.prototype.setScrollPos_ = function setScrollPos_(scrollPos) {
    if (!this.scrollMoveEl_) {
      return;
    }
    _style.setStyle(this.scrollMoveEl_, 'transform', 'translateY(' + scrollPos + 'px)');
    this.scrollMoveEl_. /*OK*/scrollIntoView(true);
  };

  /**
   * @param {!Event=} opt_event
   * @private
   */

  ViewportBindingNaturalIosEmbed_.prototype.adjustScrollPos_ = function adjustScrollPos_(opt_event) {
    if (!this.scrollPosEl_ || !this.scrollMoveEl_) {
      return;
    }

    // Scroll document into a safe position to avoid scroll freeze on iOS.
    // This means avoiding scrollTop to be minimum (0) or maximum value.
    // This is very sad but very necessary. See #330 for more details.
    var scrollTop = -this.scrollPosEl_. /*OK*/getBoundingClientRect().top;
    if (scrollTop == 0) {
      this.setScrollPos_(1);
      if (opt_event) {
        opt_event.preventDefault();
      }
      return;
    }

    // TODO(dvoytenko, #330): Ideally we would do the same for the overscroll
    // on the bottom. Unfortunately, iOS Safari misreports scrollHeight in
    // this case.
  };

  return ViewportBindingNaturalIosEmbed_;
})();

exports.ViewportBindingNaturalIosEmbed_ = ViewportBindingNaturalIosEmbed_;

var ViewportBindingVirtual_ = (function () {

  /**
   * @param {!Window} win
   * @param {!Viewer} viewer
   */

  function ViewportBindingVirtual_(win, viewer) {
    babelHelpers.classCallCheck(this, ViewportBindingVirtual_);

    /** @private @const {!Window} */
    this.win = win;

    /** @private {number} */
    this.width_ = viewer.getViewportWidth();

    /** @private {number} */
    this.height_ = viewer.getViewportHeight();

    /** @private {number} */
    this. /*OK*/scrollTop_ = viewer.getScrollTop();

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.resizeObservable_ = new _observable.Observable();

    _log.log.fine(TAG_, 'initialized virtual viewport');
  }

  /**
   * Parses viewport meta value. It usually looks like:
   * ```
   * width=device-width,initial-scale=1,minimum-scale=1
   * ```
   * @param {string} content
   * @return {!Object<string, string>}
   * @private Visible for testing only.
   */

  /** @override */

  ViewportBindingVirtual_.prototype.cleanup_ = function cleanup_() {}
  // TODO(dvoytenko): remove listeners

  /** @override */
  ;

  ViewportBindingVirtual_.prototype.updateViewerViewport = function updateViewerViewport(viewer) {
    if (viewer.getScrollTop() != this. /*OK*/scrollTop_) {
      this. /*OK*/scrollTop_ = viewer.getScrollTop();
      this.scrollObservable_.fire();
    }
    if (viewer.getViewportWidth() != this.width_ || viewer.getViewportHeight() != this.height_) {
      this.width_ = viewer.getViewportWidth();
      this.height_ = viewer.getViewportHeight();
      this.resizeObservable_.fire();
    }
  };

  /** @override */

  ViewportBindingVirtual_.prototype.updatePaddingTop = function updatePaddingTop(paddingTop) {
    this.win.document.documentElement.style.paddingTop = _style.px(paddingTop);
  };

  /** @override */

  ViewportBindingVirtual_.prototype.onScroll = function onScroll(callback) {
    this.scrollObservable_.add(callback);
  };

  /** @override */

  ViewportBindingVirtual_.prototype.onResize = function onResize(callback) {
    this.resizeObservable_.add(callback);
  };

  /** @override */

  ViewportBindingVirtual_.prototype.getSize = function getSize() {
    return { width: this.width_, height: this.height_ };
  };

  /** @override */

  ViewportBindingVirtual_.prototype.getScrollTop = function getScrollTop() {
    return this. /*OK*/scrollTop_;
  };

  /** @override */

  ViewportBindingVirtual_.prototype.getScrollLeft = function getScrollLeft() {
    return 0;
  };

  /** @override */

  ViewportBindingVirtual_.prototype.getScrollWidth = function getScrollWidth() {
    return this.win.document.documentElement. /*OK*/scrollWidth;
  };

  /** @override */

  ViewportBindingVirtual_.prototype.getScrollHeight = function getScrollHeight() {
    return this.win.document.documentElement. /*OK*/scrollHeight;
  };

  /**
   * Returns the rect of the element within the document.
   * @param {!Element} el
   * @return {!LayoutRect}
   */

  ViewportBindingVirtual_.prototype.getLayoutRect = function getLayoutRect(el) {
    var b = el. /*OK*/getBoundingClientRect();
    return _layoutRect.layoutRectLtwh(Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height));
  };

  /** @override */

  ViewportBindingVirtual_.prototype.setScrollTop = function setScrollTop(unusedScrollTop) {
    // TODO(dvoytenko): communicate to the viewer.
  };

  return ViewportBindingVirtual_;
})();

exports.ViewportBindingVirtual_ = ViewportBindingVirtual_;

function parseViewportMeta(content) {
  // Ex: width=device-width,initial-scale=1,minimal-ui
  var params = Object.create(null);
  if (!content) {
    return params;
  }
  var pairs = content.split(',');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var split = pair.split('=');
    var _name = split[0].trim();
    var value = split[1];
    value = (value || '').trim();
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Stringifies viewport meta value based on the provided map. It usually looks
 * like:
 * ```
 * width=device-width,initial-scale=1,minimum-scale=1
 * ```
 * @param {!Object<string, string>} params
 * @return {string}
 * @private Visible for testing only.
 */

function stringifyViewportMeta(params) {
  // Ex: width=device-width,initial-scale=1,minimal-ui
  var content = '';
  for (var k in params) {
    if (content.length > 0) {
      content += ',';
    }
    if (params[k]) {
      content += k + '=' + params[k];
    } else {
      content += k;
    }
  }
  return content;
}

/**
 * This method makes a minimal effort to keep the original viewport string
 * unchanged if in fact none of the values have been updated. Returns the
 * updated string or the `currentValue` if no changes were necessary.
 *
 * @param {string} currentValue
 * @param {!Object<string, string|undefined>} updateParams
 * @return {string}
 * @private Visible for testing only.
 */

function updateViewportMetaString(currentValue, updateParams) {
  var params = parseViewportMeta(currentValue);
  var changed = false;
  for (var k in updateParams) {
    if (params[k] !== updateParams[k]) {
      changed = true;
      if (updateParams[k] !== undefined) {
        params[k] = updateParams[k];
      } else {
        delete params[k];
      }
    }
  }
  if (!changed) {
    return currentValue;
  }
  return stringifyViewportMeta(params);
}

/**
 * @param {!Window} window
 * @return {!Viewport}
 * @private
 */
function createViewport_(window) {
  var viewer = _viewerImpl.installViewerService(window);
  var binding = undefined;
  if (viewer.getViewportType() == 'virtual') {
    binding = new ViewportBindingVirtual_(window, viewer);
  } else if (viewer.getViewportType() == 'natural-ios-embed') {
    binding = new ViewportBindingNaturalIosEmbed_(window);
  } else {
    binding = new ViewportBindingNatural_(window);
  }
  return new Viewport(window, binding, viewer);
}

/**
 * @param {!Window} window
 * @return {!Viewport}
 */

function installViewportService(window) {
  return _service.getService(window, 'viewport', function () {
    return createViewport_(window);
  });
}

;

},{"../document-state":63,"../layout-rect":74,"../log":77,"../observable":79,"../platform":82,"../service":88,"../style":97,"../timer":100,"./viewer-impl":91,"./vsync-impl":93}],93:[function(require,module,exports){
exports.__esModule = true;
exports.installVsyncService = installVsyncService;
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

var _pass = require('../pass');

var _service = require('../service');

var _log = require('../log');

var _timer = require('../timer');

var _viewerImpl = require('./viewer-impl');

/** @const {time} */
var FRAME_TIME = 16;

/**
 * @typedef {Object<string, *>}
 */
var VsyncStateDef = undefined;

/**
 * @typedef {{
 *   measure: (function(!VsyncStateDef)|undefined),
 *   mutate: (function(!VsyncStateDef)|undefined)
 * }}
 */
var VsyncTaskSpecDef = undefined;

/**
 * Abstraction over requestAnimationFrame that align DOM read (measure)
 * and write (mutate) tasks in a single frame.
 *
 * NOTE: If the document is invisible due to prerendering (this includes
 * application level prerendering where the doc is rendered in a hidden
 * iframe or webview), then no frame will be scheduled.
 */

var Vsync = (function () {

  /**
   * @param {!Window} win
   * @param {!Viewer} viewer
   */

  function Vsync(win, viewer) {
    var _this = this;

    babelHelpers.classCallCheck(this, Vsync);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Viewer} */
    this.viewer_ = viewer;

    /** @private @const {function(function())}  */
    this.raf_ = this.getRaf_();

    /**
     * Tasks to run in the next frame.
     * @private {!Array<!VsyncTaskSpecDef>}
     */
    this.tasks_ = [];

    /**
     * States for tasks in the next frame in the same order.
     * @private {!Array<!VsyncStateDef>}
     */
    this.states_ = [];

    /**
     * Whether a new animation frame has been scheduled.
     * @private {boolean}
     */
    this.scheduled_ = false;

    /** @const {!Function} */
    this.boundRunScheduledTasks_ = this.runScheduledTasks_.bind(this);

    /** @const {!Pass} */
    this.pass_ = new _pass.Pass(this.boundRunScheduledTasks_, FRAME_TIME);

    // When the document changes visibility, vsync has to reschedule the queue
    // processing.
    this.viewer_.onVisibilityChanged(function () {
      if (_this.scheduled_) {
        _this.forceSchedule_();
      }
    });
  }

  /**
   * @param {!Window} window
   * @return {!Vsync}
   */

  /**
   * Runs vsync task: measure followed by mutate.
   *
   * If state is not provided, the value passed to the measure and mutate
   * will be undefined.
   *
   * @param {!VsyncTaskSpecDef} task
   * @param {!VsyncStateDef=} opt_state
   */

  Vsync.prototype.run = function run(task, opt_state) {
    this.tasks_.push(task);
    this.states_.push(opt_state || {});
    this.schedule_();
  };

  /**
   * Creates a function that will call {@link run} method.
   * @param {!VsyncTaskSpecDef} task
   * @return {function(!VsyncStateDef=)}
   */

  Vsync.prototype.createTask = function createTask(task) {
    var _this2 = this;

    return function (opt_state) {
      _this2.run(task, opt_state);
    };
  };

  /**
   * Runs the mutate operation via vsync.
   * @param {function()} mutator
   */

  Vsync.prototype.mutate = function mutate(mutator) {
    this.run({ mutate: mutator });
  };

  /**
   * Runs the measure operation via vsync.
   * @param {function()} measurer
   */

  Vsync.prototype.measure = function measure(measurer) {
    this.run({ measure: measurer });
  };

  /**
   * @param {function():TYPE} measurer
   * @return {!Promise<TYPE>}
   * @templates TYPE
   */

  Vsync.prototype.measurePromise = function measurePromise(measurer) {
    var _this3 = this;

    return new Promise(function (resolve) {
      _this3.measure(function () {
        resolve(measurer());
      });
    });
  };

  /**
   * Whether the runtime is allowed to animate at this time.
   * @return {boolean}
   */

  Vsync.prototype.canAnimate = function canAnimate() {
    return this.viewer_.isVisible();
  };

  /**
   * Runs the animation vsync task. This operation can only run when animations
   * are allowed. Otherwise, this method returns `false` and exits.
   * @param {!VsyncTaskSpecDef} task
   * @param {!VsyncStateDef=} opt_state
   * @return {boolean}
   */

  Vsync.prototype.runAnim = function runAnim(task, opt_state) {
    // Do not request animation frames when the document is not visible.
    if (!this.canAnimate()) {
      _log.log.warn('Vsync', 'Did not schedule a vsync request, because document was invisible');
      return false;
    }
    this.run(task, opt_state);
    return true;
  };

  /**
   * Creates an animation vsync task. This operation can only run when
   * animations are allowed. Otherwise, this closure returns `false` and exits.
   * @param {!VsyncTaskSpecDef} task
   * @return {function(!VsyncStateDef=):boolean}
   */

  Vsync.prototype.createAnimTask = function createAnimTask(task) {
    var _this4 = this;

    return function (opt_state) {
      return _this4.runAnim(task, opt_state);
    };
  };

  /**
   * Runs the series of mutates until the mutator returns a false value.
   * @param {function(time, time, !VsyncStateDef):boolean} mutator The
   *   mutator callback. Only expected to do DOM writes, not reads. If the
   *   returned value is true, the vsync task will be repeated, otherwise it
   *   will be completed. The arguments are: timeSinceStart:time,
   *   timeSincePrev:time and state:VsyncStateDef.
   * @param {number=} opt_timeout Optional timeout that will force the series
   *   to complete and reject the promise.
   * @return {!Promise} Returns the promise that will either resolve on when
   *   the vsync series are completed or reject in case of failure, such as
   *   timeout.
   */

  Vsync.prototype.runAnimMutateSeries = function runAnimMutateSeries(mutator, opt_timeout) {
    var _this5 = this;

    if (!this.canAnimate()) {
      return Promise.reject();
    }
    return new Promise(function (resolve, reject) {
      var startTime = _timer.timer.now();
      var prevTime = 0;
      var task = _this5.createAnimTask({
        mutate: function (state) {
          var timeSinceStart = _timer.timer.now() - startTime;
          var res = mutator(timeSinceStart, timeSinceStart - prevTime, state);
          if (!res) {
            resolve();
          } else if (opt_timeout && timeSinceStart > opt_timeout) {
            reject('timeout');
          } else {
            prevTime = timeSinceStart;
            task(state);
          }
        }
      });
      task({});
    });
  };

  /** @private */

  Vsync.prototype.schedule_ = function schedule_() {
    if (this.scheduled_) {
      return;
    }
    // Schedule actual animation frame and then run tasks.
    this.scheduled_ = true;
    this.forceSchedule_();
  };

  /** @private */

  Vsync.prototype.forceSchedule_ = function forceSchedule_() {
    if (this.canAnimate()) {
      this.raf_(this.boundRunScheduledTasks_);
    } else {
      this.pass_.schedule();
    }
  };

  /**
   * Runs all scheduled tasks. This is typically called in an RAF
   * callback. Tests may call this method to force execution of
   * tasks without waiting.
   * @private
   */

  Vsync.prototype.runScheduledTasks_ = function runScheduledTasks_() {
    this.scheduled_ = false;
    // TODO(malteubl) Avoid array allocation with a double buffer.
    var tasks = this.tasks_;
    var states = this.states_;
    this.tasks_ = [];
    this.states_ = [];
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].measure) {
        tasks[i].measure(states[i]);
      }
    }
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].mutate) {
        tasks[i].mutate(states[i]);
      }
    }
  };

  /**
   * @return {function(function())} requestAnimationFrame or polyfill.
   */

  Vsync.prototype.getRaf_ = function getRaf_() {
    var _this6 = this;

    var raf = this.win.requestAnimationFrame || this.win.webkitRequestAnimationFrame;
    if (raf) {
      return raf.bind(this.win);
    }
    var lastTime = 0;
    return function (fn) {
      var now = new Date().getTime();
      // By default we take 16ms between frames, but if the last frame is say
      // 10ms ago, we only want to wait 6ms.
      var timeToCall = Math.max(0, FRAME_TIME - (now - lastTime));
      lastTime = now + timeToCall;
      _this6.win.setTimeout(fn, timeToCall);
    };
  };

  return Vsync;
})();

exports.Vsync = Vsync;

function installVsyncService(window) {
  return _service.getService(window, 'vsync', function () {
    return new Vsync(window, _viewerImpl.installViewerService(window));
  });
}

;

},{"../log":77,"../pass":80,"../service":88,"../timer":100,"./viewer-impl":91}],94:[function(require,module,exports){
exports.__esModule = true;
exports.parseSizeList = parseSizeList;
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

var _layout = require('./layout');

/**
 * A single option within a SizeList.
 * @typedef {{
 *   mediaQuery: (string|undefined),
 *   size: (!Length)
 * }}
 */
var SizeListOptionDef = undefined;

/**
 * Parses the text representation of "sizes" into SizeList object.
 *
 * There could be any number of size options within the SizeList. They are tried
 * in the order they were defined. The final size option must not have "media"
 * condition specified. All other size options must have "media" condition
 * specified.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-sizes
 * @param {string} s
 * @return {!SizeList}
 */

function parseSizeList(s) {
  var sSizes = s.split(',');
  _asserts.assert(sSizes.length > 0, 'sizes has to have at least one size');
  var sizes = [];
  sSizes.forEach(function (sSize) {
    sSize = sSize.replace(/\s+/g, ' ').trim();
    if (sSize.length == 0) {
      return;
    }

    var mediaStr = undefined;
    var sizeStr = undefined;
    var spaceIndex = sSize.lastIndexOf(' ');
    if (spaceIndex != -1) {
      mediaStr = sSize.substring(0, spaceIndex).trim();
      sizeStr = sSize.substring(spaceIndex + 1).trim();
    } else {
      sizeStr = sSize;
      mediaStr = undefined;
    }
    sizes.push({ mediaQuery: mediaStr, size: _layout.assertLength(sizeStr) });
  });
  return new SizeList(sizes);
}

;

/**
 * A SizeList object contains one or more sizes as typically seen in "sizes"
 * attribute.
 *
 * See "select" method for details on how the size selection is performed.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-sizes
 */

var SizeList = (function () {
  /**
   * @param {!Array<!SizeListOptionDef>} sizes
   */

  function SizeList(sizes) {
    babelHelpers.classCallCheck(this, SizeList);

    _asserts.assert(sizes.length > 0, 'SizeList must have at least one option');
    /** @private @const {!Array<!SizeListOptionDef>} */
    this.sizes_ = sizes;

    // All sources except for last must have a media query. The last one must
    // not.
    for (var i = 0; i < sizes.length; i++) {
      var option = sizes[i];
      if (i < sizes.length - 1) {
        _asserts.assert(option.mediaQuery, 'All options except for the last must have a media condition');
      } else {
        _asserts.assert(!option.mediaQuery, 'The last option must not have a media condition');
      }
    }
  }

  /**
   * Selects the first size that matches media conditions. If no options match,
   * the last option is returned.
   *
   * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-sizes
   * @param {!Window} win
   * @return {!Length}
   */

  SizeList.prototype.select = function select(win) {
    for (var i = 0; i < this.sizes_.length - 1; i++) {
      var option = this.sizes_[i];
      if (win.matchMedia(option.mediaQuery).matches) {
        return option.size;
      }
    }
    return this.getLast();
  };

  /**
   * Returns the last size in the SizeList, which is the default.
   * @return {!Length}
   */

  SizeList.prototype.getLast = function getLast() {
    return this.sizes_[this.sizes_.length - 1].size;
  };

  return SizeList;
})();

exports.SizeList = SizeList;

},{"./asserts":55,"./layout":75}],95:[function(require,module,exports){
exports.__esModule = true;
exports.parseSrcset = parseSrcset;
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
 * A single source within a srcset. Only one: width or DPR can be specified at
 * a time.
 * @typedef {{
 *   url: string,
 *   width: (number|undefined),
 *   dpr: (number|undefined)
 * }}
 */
var SrcsetSourceDef = undefined;

/**
 * Parses the text representation of srcset into Srcset object.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes.
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
 * @param {string} s
 * @return {!Srcset}
 */

function parseSrcset(s) {
  // General grammar: (URL [NUM[w|x]],)*
  // Example 1: "image1.png 100w, image2.png 50w"
  // Example 2: "image1.png 2x, image2.png"
  // Example 3: "image1,100w.png 100w, image2.png 50w"
  var sSources = s.match(/\s*([^\s]*)(\s+(-?(\d+(\.(\d+)?)?|\.\d+)[a-zA-Z]))?(\s*,)?/g);
  _asserts.assert(sSources.length > 0, 'srcset has to have at least one source');
  var sources = [];
  sSources.forEach(function (sSource) {
    sSource = sSource.trim();
    if (sSource.substr(-1) == ',') {
      sSource = sSource.substr(0, sSource.length - 1).trim();
    }
    var parts = sSource.split(/\s+/, 2);
    if (parts.length == 0 || parts.length == 1 && !parts[0] || parts.length == 2 && !parts[0] && !parts[1]) {
      return;
    }
    var url = parts[0].trim();
    if (parts.length == 1 || parts.length == 2 && !parts[1]) {
      // If no "w" or "x" specified, we assume it's "1x".
      sources.push({ url: url, dpr: 1 });
    } else {
      var spec = parts[1].trim().toLowerCase();
      var lastChar = spec.substring(spec.length - 1);
      if (lastChar == 'w') {
        sources.push({ url: url, width: parseFloat(spec) });
      } else if (lastChar == 'x') {
        sources.push({ url: url, dpr: parseFloat(spec) });
      }
    }
  });
  return new Srcset(sources);
}

;

/**
 * A srcset object contains one or more sources.
 *
 * There are two types of sources: width-based and DPR-based. Only one type
 * of sources allowed to be specified within a single srcset. Depending on a
 * usecase, the components are free to choose any source that best corresponds
 * to the required rendering quality and network and CPU conditions. See
 * "select" method for details on how this selection is performed.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 */

var Srcset = (function () {

  /**
   * @param {!Array<!SrcsetSourceDef>} sources
   */

  function Srcset(sources) {
    babelHelpers.classCallCheck(this, Srcset);

    _asserts.assert(sources.length > 0, 'Srcset must have at least one source');
    /** @private @const {!Array<!SrcsetSourceDef>} */
    this.sources_ = sources;

    // Only one type of source specified can be used - width or DPR.
    var hasWidth = false;
    var hasDpr = false;
    this.sources_.forEach(function (source) {
      _asserts.assert((source.width || source.dpr) && (!source.width || !source.dpr), 'Either dpr or width must be specified');
      hasWidth = hasWidth || !!source.width;
      hasDpr = hasDpr || !!source.dpr;
    });
    _asserts.assert(!hasWidth || !hasDpr, 'Srcset cannot have both width and dpr sources');

    // Source and assert duplicates.
    if (hasWidth) {
      this.sources_.sort(function (s1, s2) {
        _asserts.assert(s1.width != s2.width, 'Duplicate width: %s', s1.width);
        return s2.width - s1.width;
      });
    } else {
      this.sources_.sort(function (s1, s2) {
        _asserts.assert(s1.dpr != s2.dpr, 'Duplicate dpr: %s', s1.dpr);
        return s2.dpr - s1.dpr;
      });
    }

    /** @private @const {boolean} */
    this.widthBased_ = hasWidth;

    /** @private @const {boolean} */
    this.dprBased_ = hasDpr;
  }

  /**
   * Performs selection for specified width and DPR. Here, width is the width
   * in screen pixels and DPR is the device-pixel-ratio or pixel density of
   * the device. Depending on the circumstances, such as low network conditions,
   * it's possible to manipulate the result of this method by passing a lower
   * DPR value.
   *
   * The source selection depends on whether this is width-based or DPR-based
   * srcset.
   *
   * In a width-based source, the source's width is the physical width of a
   * resource (e.g. an image). Depending on the provided DPR, this width is
   * converted to the screen pixels as following:
   *   pixelWidth = sourceWidth / DPR
   *
   * Then, the source closest to the requested "width" is selected using
   * the "pixelWidth". The slight preference is given to the bigger sources to
   * ensure the most optimal quality.
   *
   * In a DPR-based source, the source's DPR is used to return the source that
   * is closest to the requested DPR.
   *
   * Based on
   * http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
   * @param {number} width
   * @param {number} dpr
   * @return {!SrcsetSourceDef}
   */

  Srcset.prototype.select = function select(width, dpr) {
    _asserts.assert(width, 'width=%s', width);
    _asserts.assert(dpr, 'dpr=%s', dpr);
    var index = -1;
    if (this.widthBased_) {
      index = this.selectByWidth_(width, dpr);
    } else if (this.dprBased_) {
      index = this.selectByDpr_(width, dpr);
    }
    if (index != -1) {
      return this.sources_[index];
    }
    return this.getLast();
  };

  /**
   * @param {number} width
   * @param {number} dpr
   * @return {number}
   * @private
   */

  Srcset.prototype.selectByWidth_ = function selectByWidth_(width, dpr) {
    var minIndex = -1;
    var minWidth = 1000000;
    var minScore = 1000000;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      var sourceWidth = undefined;
      if (source.width) {
        sourceWidth = source.width / dpr;
      } else {
        // Default source: no width: assume values are half of of the
        // minimum values seen.
        sourceWidth = minWidth / 2;
      }
      minWidth = Math.min(minWidth, sourceWidth);
      // The calculation is slightly biased toward higher width by offsetting
      // score by negative 0.2.
      var score = Math.abs((sourceWidth - width) / width - 0.2);
      if (score < minScore) {
        minScore = score;
        minIndex = i;
      }
    }
    return minIndex;
  };

  /**
   * @param {number} width
   * @param {number} dpr
   * @return {number}
   * @private
   */

  Srcset.prototype.selectByDpr_ = function selectByDpr_(_width, dpr) {
    var minIndex = -1;
    var minScore = 1000000;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      // Default DPR = 1.
      var sourceDpr = source.dpr || 1;
      var score = Math.abs(sourceDpr - dpr);
      if (score < minScore) {
        minScore = score;
        minIndex = i;
      }
    }
    return minIndex;
  };

  /**
   * Returns the last source in the srcset, which is the default source.
   * @return {!SrcsetSourceDef}
   */

  Srcset.prototype.getLast = function getLast() {
    return this.sources_[this.sources_.length - 1];
  };

  return Srcset;
})();

exports.Srcset = Srcset;

},{"./asserts":55}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./style":97}],99:[function(require,module,exports){
exports.__esModule = true;
exports.registerExtendedTemplate = registerExtendedTemplate;
exports.templatesFor = templatesFor;
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

var _dom = require('./dom');

var _service = require('./service');

/**
 * @fileoverview
 * For the set of decisions made on templating see:
 * {@link https://docs.google.com/document/d/1q-5MPQHnOHLF_uL7lQsGZdzuBgrPTkCy2PdRP-YCbOw/edit#}
 */

/**
 * @typedef {function(new:!BaseTemplate, !Element)}
 */
var TemplateClassDef = {};

/** @private @const {string} */
var PROP_ = '__AMP_IMPL_';

/** @private @const {string} */
var PROP_PROMISE_ = '__AMP_WAIT_';

/**
 * The interface that is implemented by all templates.
 */

var BaseTemplate = (function () {

  /** @param {!Element} element */

  function BaseTemplate(element) {
    babelHelpers.classCallCheck(this, BaseTemplate);

    /** @public @const */
    this.element = element;

    this.compileCallback();
  }

  /**
   */

  /** @protected @return {!Window} */

  BaseTemplate.prototype.getWin = function getWin() {
    return this.element.ownerDocument.defaultView;
  };

  /**
   * Override in subclass if the element needs to compile the template.
   * @protected
   */

  BaseTemplate.prototype.compileCallback = function compileCallback() {}
  // Subclasses may override.

  /**
   * To be implemented by subclasses.
   * @param {!JSONObject} unusedData
   * @return {!Element}
   */
  ;

  BaseTemplate.prototype.render = function render(unusedData) {
    throw new Error('Not implemented');
  };

  /**
   * Helps the template implementation to unwrap the root element. The root
   * element can be unwrapped only when it contains a single element or a
   * single element surrounded by empty text nodes.
   * @param {!Element} root
   * @return {!Element}
   * @protected @final
   */

  BaseTemplate.prototype.unwrap = function unwrap(root) {
    var singleElement = null;
    for (var n = root.firstChild; n != null; n = n.nextSibling) {
      if (n.nodeType == /* TEXT */3) {
        if (n.textContent.trim()) {
          // Non-empty text node - can't unwrap.
          singleElement = null;
          break;
        }
      } else if (n.nodeType == /* COMMENT */8) {
        // Ignore comments.
      } else if (n.nodeType == /* ELEMENT */1) {
          if (!singleElement) {
            singleElement = /** @type {!Element} */n;
          } else {
            // This is not the first element - can't unwrap.
            singleElement = null;
            break;
          }
        } else {
          singleElement = null;
        }
    }
    return singleElement || root;
  };

  return BaseTemplate;
})();

exports.BaseTemplate = BaseTemplate;

var Templates = (function () {
  /** @param {!Window} win */

  function Templates(win) {
    babelHelpers.classCallCheck(this, Templates);

    /** @private @const {!Window} */
    this.win_ = win;

    /**
     * A map from template type to template's class promise.
     * @private @const {!Object<string, !Promise<!TemplateClassDef>>}
     */
    this.templateClassMap_ = {};

    /**
     * A map from template type to template's class promise. This is a transient
     * storage. As soon as the template class loaded, the entry is removed.
     * @private @const {!Object<string, function(!TemplateClassDef)>}
     */
    this.templateClassResolvers_ = {};

    /** @type {!Object<string, boolean>|undefined} */
    this.declaredTemplates_;
  }

  /**
   * Registers an extended template. This function should typically be called
   * through the registerTemplate method on the AMP runtime.
   * @param {!Window} win
   * @param {string} type
   * @param {!TemplateClassDef} templateClass
   * @package
   */

  /**
   * Renders the specified template element using the supplied data.
   * @param {!Element} templateElement
   * @param {!JSONObject} data
   * @return {!Promise<!Element>}
   */

  Templates.prototype.renderTemplate = function renderTemplate(templateElement, data) {
    return this.getImplementation_(templateElement).then(function (impl) {
      return impl.render(data);
    });
  };

  /**
   * Renders the specified template element using the supplied array of data
   * and returns an array of resulting elements.
   * @param {!Element} templateElement
   * @param {!Array<!JSONObject>} array
   * @return {!Promise<!Array<!Element>>}
   */

  Templates.prototype.renderTemplateArray = function renderTemplateArray(templateElement, array) {
    if (array.length == 0) {
      return Promise.resolve([]);
    }
    return this.getImplementation_(templateElement).then(function (impl) {
      return array.map(function (item) {
        return impl.render(item);
      });
    });
  };

  /**
   * Discovers the template for the specified parent and renders it using the
   * supplied data. The template can be specified either via "template"
   * attribute  or as a child "template" element. When specified via "template"
   * attribute, the value indicates the ID of the template element.
   * @param {!Element} parent
   * @param {!JSONObject} data
   * @return {!Promise<!Element>}
   */

  Templates.prototype.findAndRenderTemplate = function findAndRenderTemplate(parent, data) {
    return this.renderTemplate(this.findTemplate_(parent), data);
  };

  /**
   * Discovers the template for the specified parent and renders it using the
   * supplied array of data. The template can be specified either via "template"
   * attribute or as a child "template" element. When specified via "template"
   * attribute, the value indicates the ID of the template element. Returns
   * the array of the rendered elements.
   * @param {!Element} parent
   * @param {!Array<!JSONObject>} array
   * @return {!Promise<!Array<!Element>>}
   */

  Templates.prototype.findAndRenderTemplateArray = function findAndRenderTemplateArray(parent, array) {
    return this.renderTemplateArray(this.findTemplate_(parent), array);
  };

  /**
   * The template can be specified either via "template" attribute or as a
   * child "template" element. When specified via "template" attribute,
   * the value indicates the ID of the template element.
   * @param {!Element} parent
   * @return {!Element}
   * @private
   */

  Templates.prototype.findTemplate_ = function findTemplate_(parent) {
    var templateElement = null;
    var templateId = parent.getAttribute('template');
    if (templateId) {
      templateElement = parent.ownerDocument.getElementById(templateId);
    } else {
      templateElement = _dom.childElementByTag(parent, 'template');
    }
    _asserts.assert(templateElement, 'Template not found for %s', parent);
    _asserts.assert(templateElement.tagName == 'TEMPLATE', 'Template element must be a "template" tag %s', templateElement);
    return templateElement;
  };

  /**
   * Returns the promise that will eventually yield the template implementation
   * for the specified template element.
   * @param {!Element} element
   * @return {!Promise<!BaseTemplate>}
   * @private
   */

  Templates.prototype.getImplementation_ = function getImplementation_(element) {
    var impl = element[PROP_];
    if (impl) {
      return Promise.resolve(impl);
    }

    var type = _asserts.assert(element.getAttribute('type'), 'Type must be specified: %s', element);

    var promise = element[PROP_PROMISE_];
    if (promise) {
      return promise;
    }

    promise = this.waitForTemplateClass_(element, type).then(function (templateClass) {
      var impl = element[PROP_] = new templateClass(element);
      delete element[PROP_PROMISE_];
      return impl;
    });
    element[PROP_PROMISE_] = promise;
    return promise;
  };

  /**
   * Returns the promise that will eventually yield the template class. This will
   * wait until the actual template script has been downloaded and parsed.
   * @param {!Element} element
   * @param {string} type
   * @return {!Promise<!TemplateClassDef>}
   * @private
   */

  Templates.prototype.waitForTemplateClass_ = function waitForTemplateClass_(element, type) {
    if (this.templateClassMap_[type]) {
      return this.templateClassMap_[type];
    }

    this.checkTemplateDeclared_(element, type);
    var aResolve = undefined;
    var promise = new Promise(function (resolve, unusedReject) {
      aResolve = resolve;
    });
    this.templateClassMap_[type] = promise;
    this.templateClassResolvers_[type] = aResolve;
    return promise;
  };

  /**
   * Checks that the template type has actually been declared by a
   * `<script custom-template=$type>` tag in the head.
   * @param {!Element} element
   * @param {string} type
   * @private
   */

  Templates.prototype.checkTemplateDeclared_ = function checkTemplateDeclared_(element, type) {
    if (!this.declaredTemplates_) {
      this.declaredTemplates_ = this.win_.Object.create(null);
      var scriptTags = this.win_.document.querySelectorAll('script[custom-template]');
      for (var i = 0; i < scriptTags.length; i++) {
        this.declaredTemplates_[scriptTags[i].getAttribute('custom-template')] = true;
      }
    }
    _asserts.assert(this.declaredTemplates_[type], 'Template must be declared for %s as <script custom-template=%s>', element, type);
  };

  /**
   * Registers an extended template. This function should typically be called
   * through the registerTemplate method on the AMP runtime.
   * @param {string} type
   * @param {!TemplateClassDef} templateClass
   * @private
   */

  Templates.prototype.registerTemplate_ = function registerTemplate_(type, templateClass) {
    if (!this.templateClassMap_[type]) {
      this.templateClassMap_[type] = Promise.resolve(templateClass);
    } else {
      var resolver = this.templateClassResolvers_[type];
      _asserts.assert(resolver, 'Duplicate template type: %s', type);
      delete this.templateClassResolvers_[type];
      resolver(templateClass);
    }
  };

  return Templates;
})();

exports.Templates = Templates;

function registerExtendedTemplate(win, type, templateClass) {
  return templatesFor(win).registerTemplate_(type, templateClass);
}

/**
 * @param {!Window} window
 * @return {!History}
 */

function templatesFor(window) {
  return _service.getService(window, 'templates', function () {
    return new Templates(window);
  });
}

;

},{"./asserts":55,"./dom":64,"./service":88}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"./cid":57,"./document-info":62,"./log":77,"./service":88,"./url":102,"./user-notification":103,"./viewport":106,"./vsync":107}],102:[function(require,module,exports){
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

},{"./asserts":55}],103:[function(require,module,exports){
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

},{"./service":88}],104:[function(require,module,exports){
exports.__esModule = true;
exports.maybeValidate = maybeValidate;
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

/**
 * Triggers validation for the current document if there is a script in the
 * page that has a "development" attribute.
 *
 * @param {!Window} win Destination window for the new element.
 */

function maybeValidate(win) {
  if (!_mode.getMode().development) {
    return;
  }
  var filename = win.location.href;
  if (filename.indexOf('about:') == 0) {
    // Should only happen in tests.
    return;
  }
  var s = document.createElement('script');
  // TODO(@cramforce): Introduce a switch to locally built version for local
  // development.
  s.src = 'https://cdn.ampproject.org/v0/validator.js';
  s.onload = function () {
    win.document.head.removeChild(s);
    amp.validator.validateUrlAndLog(filename, win.document);
  };
  win.document.head.appendChild(s);
}

},{"./mode":78}],105:[function(require,module,exports){
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

},{"./service":88}],106:[function(require,module,exports){
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

},{"./service":88}],107:[function(require,module,exports){
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

},{"./service":88}],108:[function(require,module,exports){
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

},{}]},{},[52])

}catch(e){setTimeout(function(){document.body.style.opacity=1},1000);throw e};
//# sourceMappingURL=amp.js.map