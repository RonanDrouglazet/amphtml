(window.AMP = window.AMP || []).push(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _slides = require('./slides');

var _carousel = require('./carousel');

var CarouselSelector = function CarouselSelector(element) {
  babelHelpers.classCallCheck(this, CarouselSelector);

  if (element.hasAttribute('type') && element.getAttribute('type') == 'slides') {
    return new (babelHelpers.bind.apply(_slides.AmpSlides, [null].concat(babelHelpers.slice.call(arguments))))();
  }
  return new (babelHelpers.bind.apply(_carousel.AmpCarousel, [null].concat(babelHelpers.slice.call(arguments))))();
};

AMP.registerElement('amp-carousel', CarouselSelector, ".amp-carousel-button{position:absolute;box-sizing:border-box;top:50%;height:34px;width:34px;border-radius:2px;z-index:10;pointer-events:all;background-color:rgba(0,0,0,.5);background-position:50% 50%;background-repeat:no-repeat;-webkit-transform:translateY(-50%);transform:translateY(-50%);visibility:hidden}.amp-mode-mouse .amp-carousel-button,amp-carousel[controls] .amp-carousel-button{visibility:visible}amp-carousel .amp-carousel-button.amp-disabled{visibility:hidden}.amp-carousel-button-prev{left:16px;background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" fill=\"#fff\" viewBox=\"0 0 18 18\"><path d=\"M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z\" /></svg>');background-size:18px 18px}.amp-carousel-button-next{right:16px;background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" fill=\"#fff\" viewBox=\"0 0 18 18\"><path d=\"M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z\" /></svg>');background-size:18px 18px}\n/*# sourceURL=/extensions/amp-carousel/0.1/amp-carousel.css*/");

},{"./carousel":3,"./slides":4}],2:[function(require,module,exports){
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

var BaseCarousel = (function (_AMP$BaseElement) {
  babelHelpers.inherits(BaseCarousel, _AMP$BaseElement);

  function BaseCarousel() {
    babelHelpers.classCallCheck(this, BaseCarousel);

    _AMP$BaseElement.apply(this, arguments);
  }

  /** @override */

  BaseCarousel.prototype.buildCallback = function buildCallback() {
    /** @private {!Element} */
    this.prevButton_;

    /** @private {!Element} */
    this.nextButton_;

    this.buildCarousel();
    this.buildButtons();
    this.setupGestures();
    this.setControlsState();

    if (this.element.hasAttribute('controls')) {
      this.element.classList.add('-amp-carousel-has-controls');
    }
  };

  BaseCarousel.prototype.buildButtons = function buildButtons() {
    var _this = this;

    this.prevButton_ = document.createElement('div');
    this.prevButton_.classList.add('amp-carousel-button');
    this.prevButton_.classList.add('amp-carousel-button-prev');
    this.prevButton_.setAttribute('role', 'button');
    // TODO(erwinm): Does label need i18n support in the future? or provide
    // a way to be overridden.
    this.prevButton_.setAttribute('aria-label', 'previous');
    this.prevButton_.onclick = function () {
      if (!_this.prevButton_.classList.contains('amp-disabled')) {
        _this.go(-1, true);
      }
    };
    this.element.appendChild(this.prevButton_);

    this.nextButton_ = document.createElement('div');
    this.nextButton_.classList.add('amp-carousel-button');
    this.nextButton_.classList.add('amp-carousel-button-next');
    this.nextButton_.setAttribute('role', 'button');
    this.nextButton_.setAttribute('aria-label', 'next');
    this.nextButton_.onclick = function () {
      if (!_this.nextButton_.classList.contains('amp-disabled')) {
        _this.go(1, true);
      }
    };
    this.element.appendChild(this.nextButton_);
  };

  /** @override */

  BaseCarousel.prototype.prerenderAllowed = function prerenderAllowed() {
    return true;
  };

  /** @override */

  BaseCarousel.prototype.isRelayoutNeeded = function isRelayoutNeeded() {
    return true;
  };

  /**
   * Subclasses should override this method to build the UI for the carousel.
   */

  BaseCarousel.prototype.buildCarousel = function buildCarousel() {}
  // Subclasses may override.

  /**
   * Subclasses should override this method to configure gestures for carousel.
   */
  ;

  BaseCarousel.prototype.setupGestures = function setupGestures() {}
  // Subclasses may override.

  /**
   * Calls `goCallback` and `setControlsState` for transition behavior.
   * @param {number} dir -1 or 1
   * @param {boolean} animate
   */
  ;

  BaseCarousel.prototype.go = function go(dir, animate) {
    this.goCallback(dir, animate);
    this.setControlsState();
  };

  /**
   * Proceeds to the next slide in the desired direction.
   * @param {number} unusedDir -1 or 1
   * @param {boolean} unusedAnimate
   */

  BaseCarousel.prototype.goCallback = function goCallback(unusedDir, unusedAnimate) {}
  // Subclasses may override.

  /**
   * Sets the previous and next button visual states.
   */
  ;

  BaseCarousel.prototype.setControlsState = function setControlsState() {
    this.prevButton_.classList.toggle('amp-disabled', !this.hasPrev());
    this.prevButton_.setAttribute('aria-disabled', !this.hasPrev());
    this.nextButton_.classList.toggle('amp-disabled', !this.hasNext());
    this.nextButton_.setAttribute('aria-disabled', !this.hasNext());
  };

  /**
   * @return {boolean}
   * @override
   */

  BaseCarousel.prototype.isReadyToBuild = function isReadyToBuild() {
    // TODO(dvoytenko, #1014): Review and try a more immediate approach.
    // Wait until DOMReady.
    return false;
  };

  /**
   * @return {boolean}
   */

  BaseCarousel.prototype.hasPrev = function hasPrev() {}
  // Subclasses may override.

  /**
   * @return {boolean}
   */
  ;

  BaseCarousel.prototype.hasNext = function hasNext() {
    // Subclasses may override.
  };

  return BaseCarousel;
})(AMP.BaseElement);

exports.BaseCarousel = BaseCarousel;

},{}],3:[function(require,module,exports){
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

var _srcAnimation = require('../../../src/animation');

var _baseCarousel = require('./base-carousel');

var _srcGesture = require('../../../src/gesture');

var _srcLayout = require('../../../src/layout');

var _srcGestureRecognizers = require('../../../src/gesture-recognizers');

var _srcCurve = require('../../../src/curve');

var _srcMotion = require('../../../src/motion');

var _srcStyle = require('../../../src/style');

var st = babelHelpers.interopRequireWildcard(_srcStyle);

var _srcTransition = require('../../../src/transition');

var tr = babelHelpers.interopRequireWildcard(_srcTransition);

var AmpCarousel = (function (_BaseCarousel) {
  babelHelpers.inherits(AmpCarousel, _BaseCarousel);

  function AmpCarousel() {
    babelHelpers.classCallCheck(this, AmpCarousel);

    _BaseCarousel.apply(this, arguments);
  }

  /** @override */

  AmpCarousel.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return layout == _srcLayout.Layout.FIXED || layout == _srcLayout.Layout.FIXED_HEIGHT;
  };

  /** @override */

  AmpCarousel.prototype.buildCarousel = function buildCarousel() {
    var _this = this;

    /** @private {number} */
    this.pos_ = 0;

    /** @private {!Array<!Element>} */
    this.cells_ = this.getRealChildren();

    /** @private {!Element} */
    this.container_ = document.createElement('div');
    st.setStyles(this.container_, {
      whiteSpace: 'nowrap',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      bottom: 0
    });
    this.element.appendChild(this.container_);

    this.cells_.forEach(function (cell) {
      _this.setAsOwner(cell);
      cell.style.display = 'inline-block';
      if (cell != _this.cells_[0]) {
        // TODO(dvoytenko): this has to be customizable
        cell.style.marginLeft = '8px';
      }
      _this.container_.appendChild(cell);
    });
  };

  /** @override */

  AmpCarousel.prototype.layoutCallback = function layoutCallback() {
    this.doLayout_(this.pos_);
    this.preloadNext_(this.pos_, 1);
    this.setControlsState();
    return Promise.resolve();
  };

  /** @override */

  AmpCarousel.prototype.viewportCallback = function viewportCallback(unusedInViewport) {
    this.updateInViewport_(this.pos_, this.pos_);
  };

  /** @override */

  AmpCarousel.prototype.goCallback = function goCallback(dir, animate) {
    var _this2 = this;

    var newPos = this.nextPos_(this.pos_, dir);
    if (newPos != this.pos_) {
      (function () {
        var oldPos = _this2.pos_;
        _this2.pos_ = newPos;

        if (!animate) {
          _this2.commitSwitch_(oldPos, newPos);
        } else {
          _srcAnimation.Animation.animate(tr.setStyles(_this2.container_, {
            transform: tr.translateX(tr.numeric(-oldPos, -newPos))
          }), 200, 'ease-out').thenAlways(function () {
            _this2.commitSwitch_(oldPos, newPos);
          });
        }
      })();
    }
  };

  /**
   * @param {number} oldPos
   * @param {number} newPos
   * @private
   */

  AmpCarousel.prototype.commitSwitch_ = function commitSwitch_(oldPos, newPos) {
    st.setStyles(this.container_, {
      transform: st.translateX(-newPos)
    });
    this.doLayout_(newPos);
    this.preloadNext_(newPos, Math.sign(newPos - oldPos));
    this.updateInViewport_(newPos, oldPos);
  };

  /**
   * @param {number} pos
   * @param {number} dir
   * @private
   */

  AmpCarousel.prototype.nextPos_ = function nextPos_(pos, dir) {
    var containerWidth = this.element. /*OK*/offsetWidth;
    var fullWidth = this.container_. /*OK*/scrollWidth;
    var newPos = pos + dir * containerWidth;
    if (newPos < 0) {
      return 0;
    }
    if (fullWidth >= containerWidth && newPos > fullWidth - containerWidth) {
      return fullWidth - containerWidth;
    }
    return newPos;
  };

  /**
   * @param {number} pos
   * @param {function()} callback
   * @private
   */

  AmpCarousel.prototype.withinWindow_ = function withinWindow_(pos, callback) {
    var containerWidth = this.getLayoutWidth();
    for (var i = 0; i < this.cells_.length; i++) {
      var cell = this.cells_[i];
      if (cell. /*OK*/offsetLeft + cell. /*OK*/offsetWidth >= pos && cell. /*OK*/offsetLeft <= pos + containerWidth) {
        callback(cell);
      }
    }
  };

  /**
   * @param {number} pos
   * @private
   */

  AmpCarousel.prototype.doLayout_ = function doLayout_(pos) {
    var _this3 = this;

    this.withinWindow_(pos, function (cell) {
      _this3.scheduleLayout(cell);
    });
  };

  /**
   * @param {number} pos
   * @param {number} dir
   * @private
   */

  AmpCarousel.prototype.preloadNext_ = function preloadNext_(pos, dir) {
    var _this4 = this;

    var nextPos = this.nextPos_(pos, dir);
    if (nextPos != pos) {
      this.withinWindow_(nextPos, function (cell) {
        _this4.schedulePreload(cell);
      });
    }
  };

  /**
   * @param {number} newPos
   * @param {number} oldPos
   * @private
   */

  AmpCarousel.prototype.updateInViewport_ = function updateInViewport_(newPos, oldPos) {
    var _this5 = this;

    var seen = [];
    this.withinWindow_(newPos, function (cell) {
      seen.push(cell);
      _this5.updateInViewport(cell, true);
    });
    if (oldPos != newPos) {
      this.withinWindow_(oldPos, function (cell) {
        if (seen.indexOf(cell) == -1) {
          _this5.updateInViewport(cell, false);
        }
      });
    }
  };

  /** @override */

  AmpCarousel.prototype.setupGestures = function setupGestures() {
    var _this6 = this;

    /** @private {number} */
    this.startPos_ = 0;
    /** @private {number} */
    this.minPos_ = 0;
    /** @private {number} */
    this.maxPos_ = 0;
    /** @private {number} */
    this.extent_ = 0;
    /** @private {?Motion} */
    this.motion_ = null;

    var gestures = _srcGesture.Gestures.get(this.element);
    gestures.onGesture(_srcGestureRecognizers.SwipeXRecognizer, function (e) {
      if (e.data.first) {
        _this6.onSwipeStart_(e.data);
      }
      _this6.onSwipe_(e.data);
      if (e.data.last) {
        _this6.onSwipeEnd_(e.data);
      }
    });
    gestures.onPointerDown(function () {
      if (_this6.motion_) {
        _this6.motion_.halt();
        _this6.motion_ = null;
      }
    });
  };

  /**
   * @param {!Swipe} unusedSwipe
   * @private
   */

  AmpCarousel.prototype.onSwipeStart_ = function onSwipeStart_(unusedSwipe) {
    this.updateBounds_();
    this.startPos_ = this.pos_;
    this.motion_ = null;
  };

  /**
   * @param {!Swipe} swipe
   * @private
   */

  AmpCarousel.prototype.onSwipe_ = function onSwipe_(swipe) {
    this.pos_ = this.boundPos_(this.startPos_ - swipe.deltaX, true);
    st.setStyles(this.container_, {
      transform: st.translateX(-this.pos_)
    });
    if (Math.abs(swipe.velocityX) < 0.05) {
      this.commitSwitch_(this.startPos_, this.pos_);
    }
  };

  /**
   * @param {!Swipe} swipe
   * @return {!Promise}
   * @private
   */

  AmpCarousel.prototype.onSwipeEnd_ = function onSwipeEnd_(swipe) {
    var _this7 = this;

    var promise = undefined;
    if (Math.abs(swipe.velocityX) > 0.1) {
      this.motion_ = _srcMotion.continueMotion(this.pos_, 0, -swipe.velocityX, 0, function (x, unusedY) {
        var newPos = (_this7.boundPos_(x, true) + _this7.boundPos_(x, false)) * 0.5;
        if (Math.abs(newPos - _this7.pos_) <= 1) {
          // Hit the wall: stop motion.
          return false;
        }
        _this7.pos_ = newPos;
        st.setStyles(_this7.container_, {
          transform: st.translateX(-_this7.pos_)
        });
        return true;
      });
      promise = this.motion_.thenAlways();
    } else {
      promise = Promise.resolve();
    }
    return promise.then(function () {
      var newPos = _this7.boundPos_(_this7.pos_, false);
      if (Math.abs(newPos - _this7.pos_) < 1) {
        return undefined;
      }
      var posFunc = tr.numeric(_this7.pos_, newPos);
      return _srcAnimation.Animation.animate(function (time) {
        _this7.pos_ = posFunc(time);
        st.setStyles(_this7.container_, {
          transform: st.translateX(-_this7.pos_)
        });
      }, 250, _srcCurve.bezierCurve(0.4, 0, 0.2, 1.4)).thenAlways();
    }).then(function () {
      _this7.commitSwitch_(_this7.startPos_, _this7.pos_);
      _this7.startPos_ = _this7.pos_;
      _this7.motion_ = null;
    });
  };

  /** @private */

  AmpCarousel.prototype.updateBounds_ = function updateBounds_() {
    var containerWidth = this.element. /*OK*/offsetWidth;
    var scrollWidth = this.container_. /*OK*/scrollWidth;
    this.minPos_ = 0;
    this.maxPos_ = Math.max(scrollWidth - containerWidth, 0);
    this.extent_ = Math.min(containerWidth * 0.4, 200);
  };

  /**
   * @param {number} pos
   * @param {boolean} allowExtent
   * @return {number}
   * @private
   */

  AmpCarousel.prototype.boundPos_ = function boundPos_(pos, allowExtent) {
    var extent = allowExtent ? this.extent_ : 0;
    return Math.min(this.maxPos_ + extent, Math.max(this.minPos_ - extent, pos));
  };

  /** @override */

  AmpCarousel.prototype.hasPrev = function hasPrev() {
    return this.pos_ != 0;
  };

  /** @override */

  AmpCarousel.prototype.hasNext = function hasNext() {
    var containerWidth = this.getLayoutWidth();
    var scrollWidth = this.container_. /*OK*/scrollWidth;
    var maxPos = Math.max(scrollWidth - containerWidth, 0);
    return this.pos_ != maxPos;
  };

  return AmpCarousel;
})(_baseCarousel.BaseCarousel);

exports.AmpCarousel = AmpCarousel;

},{"../../../src/animation":6,"../../../src/curve":8,"../../../src/gesture":10,"../../../src/gesture-recognizers":9,"../../../src/layout":11,"../../../src/motion":14,"../../../src/style":18,"../../../src/transition":20,"./base-carousel":2}],4:[function(require,module,exports){
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

var _srcStyle = require('../../../src/style');

var st = babelHelpers.interopRequireWildcard(_srcStyle);

var _srcTransition = require('../../../src/transition');

var tr = babelHelpers.interopRequireWildcard(_srcTransition);

var _srcAnimation = require('../../../src/animation');

var _baseCarousel = require('./base-carousel');

var _srcGesture = require('../../../src/gesture');

var _srcGestureRecognizers = require('../../../src/gesture-recognizers');

var _srcCurve = require('../../../src/curve');

var _srcLayout = require('../../../src/layout');

var _srcTimer = require('../../../src/timer');

var AmpSlides = (function (_BaseCarousel) {
  babelHelpers.inherits(AmpSlides, _BaseCarousel);

  function AmpSlides() {
    babelHelpers.classCallCheck(this, AmpSlides);

    _BaseCarousel.apply(this, arguments);
  }

  /** @override */

  AmpSlides.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /** @override */

  AmpSlides.prototype.buildCarousel = function buildCarousel() {
    var _this = this;

    /** @private @const {boolean} */
    this.isLooping_ = this.element.hasAttribute('loop');

    /** @private @const {boolean} */
    this.isAutoplayRequested_ = this.element.hasAttribute('autoplay');

    /** @private @const {number} */
    this.autoplayDelay_ = 5000;

    /** @private {!Array<!Element>} */
    this.slides_ = this.getRealChildren();
    this.slides_.forEach(function (slide, i) {
      _this.setAsOwner(slide);
      // Only the first element is initially visible.
      slide.style.display = i > 0 ? 'none' : 'block';
      _this.applyFillContent(slide);
    });

    /** @private {number} */
    this.currentIndex_ = 0;

    /** @private {?number} */
    this.autoplayTimeoutId_ = null;

    this.setupAutoplay_();
  };

  /** @override */

  AmpSlides.prototype.layoutCallback = function layoutCallback() {
    this.scheduleLayout(this.slides_[this.currentIndex_]);
    this.preloadNext_(1);
    return Promise.resolve();
  };

  /** @override */

  AmpSlides.prototype.viewportCallback = function viewportCallback(inViewport) {
    this.updateInViewport(this.slides_[this.currentIndex_], inViewport);
    this.tryAutoplay_(1, true);
  };

  /** @override */

  AmpSlides.prototype.goCallback = function goCallback(dir, animate) {
    var _this2 = this;

    var newIndex = this.nextIndex_(dir);
    if (newIndex != this.currentIndex_) {
      (function () {
        var newSlide = _this2.slides_[newIndex];
        var oldSlide = _this2.slides_[_this2.currentIndex_];
        _this2.currentIndex_ = newIndex;
        _this2.prepareSlide_(newSlide, dir);
        if (!animate) {
          _this2.commitSwitch_(oldSlide, newSlide);
        } else {
          oldSlide.style.zIndex = 0;
          _srcAnimation.Animation.animate(_this2.createTransition_(oldSlide, newSlide, dir), 200, 'ease-out').thenAlways(function () {
            _this2.commitSwitch_(oldSlide, newSlide);
            _this2.preloadNext_(dir);
          });
        }
      })();
    }
    this.tryAutoplay_(1, true);
  };

  /**
   * Sets up the `autoplay` configuration.
   * @private
   */

  AmpSlides.prototype.setupAutoplay_ = function setupAutoplay_() {
    if (!this.isAutoplayRequested_) {
      return;
    }

    var autoplayValue = Number(this.element.getAttribute('autoplay'));
    // If it isn't a number and is not greater than 0 then don't assign
    // and use the default.
    if (autoplayValue > 0) {
      // Guard against autoplayValue that is lower than 1s to prevent
      // people from crashing the runtime with providing very low delays.
      this.autoplayDelay_ = Math.max(1000, autoplayValue);
    }

    // By default `autoplay` should also mean that the current carousel slide
    // is looping. (to be able to advance past the last item)
    if (!this.element.hasAttribute('loop')) {
      this.element.setAttribute('loop', '');
      this.isLooping_ = true;
    }
  };

  /**
   * Sets up the autoplay delay if necessary.
   * @private
   * @param {number} dir -1 or 1
   * @param {boolean} animate
   */

  AmpSlides.prototype.tryAutoplay_ = function tryAutoplay_(dir, animate) {
    this.tryCancelAutoplayTimeout_();

    // If amp-carousel is not in viewport then no need to queue up new
    // call to `go`.
    if (!(this.isAutoplayRequested_ && this.isInViewport())) {
      return;
    }

    this.autoplayTimeoutId_ = _srcTimer.timer.delay(this.go.bind(this, dir, animate), this.autoplayDelay_);
  };

  /**
   * Cancel `autoplay` timeout if one is in queue.
   * @private
   */

  AmpSlides.prototype.tryCancelAutoplayTimeout_ = function tryCancelAutoplayTimeout_() {
    if (this.autoplayTimeoutId_ !== null) {
      _srcTimer.timer.cancel(this.autoplayTimeoutId_);
      this.autoplayTimeoutId_ = null;
    }
  };

  /**
   * @param {!Element} slide
   * @param {number} dir
   */

  AmpSlides.prototype.prepareSlide_ = function prepareSlide_(slide, dir) {
    var containerWidth = this.element. /*OK*/offsetWidth;
    st.setStyles(slide, {
      transform: st.translateX(dir * containerWidth),
      zIndex: 1,
      display: 'block'
    });

    this.scheduleLayout(slide);
  };

  /**
   * @param {!Element} oldSlide
   * @param {!Element} newSlide
   * @param {number} dir
   * @return {!Transition}
   */

  AmpSlides.prototype.createTransition_ = function createTransition_(oldSlide, newSlide, dir) {
    var containerWidth = this.element. /*OK*/offsetWidth;
    return tr.all([tr.setStyles(newSlide, {
      transform: tr.translateX(tr.numeric(dir * containerWidth, 0)),
      opacity: tr.numeric(0.8, 1)
    }), tr.setStyles(oldSlide, {
      transform: tr.scale(tr.numeric(1, 0.98)),
      opacity: tr.numeric(1, 0.4)
    })]);
  };

  /**
   * @param {!Element} oldSlide
   * @param {!Element} newSlide
   * @private
   */

  AmpSlides.prototype.commitSwitch_ = function commitSwitch_(oldSlide, newSlide) {
    st.setStyles(oldSlide, {
      display: 'none',
      zIndex: 0,
      transform: '',
      opacity: 1
    });
    st.setStyles(newSlide, {
      display: 'block',
      zIndex: 0,
      transform: '',
      opacity: 1
    });
    this.scheduleLayout(newSlide);
    this.updateInViewport(oldSlide, false);
    this.updateInViewport(newSlide, true);
  };

  /**
   * @param {number} dir
   * @private
   */

  AmpSlides.prototype.nextIndex_ = function nextIndex_(dir) {
    // TODO(dvoytenko): disable loop by spec.
    var newIndex = this.currentIndex_ + dir;
    if (newIndex < 0) {
      newIndex = this.slides_.length + newIndex;
    } else if (newIndex >= this.slides_.length) {
      newIndex = newIndex % this.slides_.length;
    }
    return newIndex;
  };

  /**
   * @param {number} dir
   * @private
   */

  AmpSlides.prototype.preloadNext_ = function preloadNext_(dir) {
    // TODO(dvoytenko): can we actually preload it here? There's no
    // guarantee of it has display!=none.
    var nextIndex = this.nextIndex_(dir);
    if (nextIndex != this.currentIndex_) {
      this.schedulePreload(this.slides_[nextIndex]);
    }
  };

  /** @override */

  AmpSlides.prototype.setupGestures = function setupGestures() {
    var _this3 = this;

    /**
     * @private {?{
     *   containerWidth: number,
     *   prevTr: !Transition,
     *   nextTr: !Transition,
     *   min: number,
     *   max: number,
     *   pos: number,
     *   currentIndex: number
     * }} */
    this.swipeState_ = null;

    var gestures = _srcGesture.Gestures.get(this.element);
    gestures.onGesture(_srcGestureRecognizers.SwipeXRecognizer, function (e) {
      if (e.data.first) {
        _this3.onSwipeStart_(e.data);
      }
      _this3.onSwipe_(e.data);
      if (e.data.last) {
        _this3.onSwipeEnd_(e.data);
      }
    });
  };

  /**
   * @param {!Swipe} unusedSwipe
   * @private
   */

  AmpSlides.prototype.onSwipeStart_ = function onSwipeStart_(unusedSwipe) {
    var currentSlide = this.slides_[this.currentIndex_];
    var containerWidth = this.element. /*OK*/offsetWidth;
    var minDelta = 0;
    var maxDelta = 0;
    var prevTr = tr.NOOP;
    var nextTr = tr.NOOP;
    var prevIndex = AmpSlides.getRelativeIndex(this.currentIndex_, -1, this.slides_.length);
    var nextIndex = AmpSlides.getRelativeIndex(this.currentIndex_, 1, this.slides_.length);

    if (this.isLooping_ || this.currentIndex_ - 1 >= 0) {
      var prevSlide = this.slides_[prevIndex];
      this.prepareSlide_(prevSlide, -1);
      prevTr = this.createTransition_(currentSlide, prevSlide, -1);
      minDelta = -1;
    }
    if (this.isLooping_ || this.currentIndex_ + 1 < this.slides_.length) {
      var nextSlide = this.slides_[nextIndex];
      this.prepareSlide_(nextSlide, 1);
      nextTr = this.createTransition_(currentSlide, nextSlide, 1);
      maxDelta = 1;
    }
    this.swipeState_ = {
      containerWidth: containerWidth,
      prevTr: prevTr,
      nextTr: nextTr,
      prevIndex: prevIndex,
      nextIndex: nextIndex,
      min: minDelta,
      max: maxDelta,
      pos: 0,
      currentIndex: this.currentIndex_
    };
  };

  /**
   * @param {!Swipe} swipe
   * @private
   */

  AmpSlides.prototype.onSwipe_ = function onSwipe_(swipe) {
    var s = this.swipeState_;
    if (!s || s.currentIndex != this.currentIndex_) {
      return;
    }

    // Translate the gesture position to be a number between -1 and 1,
    // with negative values indiamping sliding to the previous slide and
    // positive indiamping sliding to the next slide.
    var pos = Math.min(s.max, Math.max(s.min, -swipe.deltaX / s.containerWidth));

    s.nextTr(pos > 0 ? pos : 0);
    s.prevTr(pos < 0 ? -pos : 0);
    s.pos = pos;
  };

  /**
   * @param {!Swipe} swipe
   * @return {!Promise}
   * @private
   */

  AmpSlides.prototype.onSwipeEnd_ = function onSwipeEnd_(swipe) {
    var _this4 = this;

    var s = this.swipeState_;
    if (!s || s.currentIndex != this.currentIndex_) {
      return;
    }
    this.swipeState_ = null;

    var advPos = s.pos;
    if (s.pos * -swipe.velocityX >= 0) {
      advPos = s.pos - Math.sign(swipe.velocityX) * (Math.abs(swipe.velocityX) > 0.2 ? 1 : 0);
    }
    advPos = Math.min(s.max, Math.max(s.min, advPos));
    var newPos = Math.abs(advPos) >= 0.55 ? Math.sign(advPos) : 0;
    var promise = undefined;
    if (newPos != s.pos) {
      (function () {
        var posFunc = tr.numeric(s.pos, newPos);
        promise = _srcAnimation.Animation.animate(function (time) {
          var pos = posFunc(time);
          s.nextTr(pos > 0 ? pos : 0);
          s.prevTr(pos < 0 ? -pos : 0);
          s.pos = pos;
        }, 150, _srcCurve.bezierCurve(0.19, 0.49, 0.2, 1)).thenAlways();
      })();
    } else {
      promise = Promise.resolve();
    }
    return promise.then(function () {
      if (s.currentIndex != _this4.currentIndex_) {
        return;
      }
      var oldSlide = _this4.slides_[_this4.currentIndex_];
      if (newPos > 0.5) {
        s.nextTr(1);
        _this4.currentIndex_ = s.nextIndex;
        _this4.commitSwitch_(oldSlide, _this4.slides_[_this4.currentIndex_]);
      } else if (newPos < -0.5) {
        s.prevTr(1);
        _this4.currentIndex_ = s.prevIndex;
        _this4.commitSwitch_(oldSlide, _this4.slides_[_this4.currentIndex_]);
      } else {
        s.nextTr(0);
        s.prevTr(0);
      }
    });
  };

  /** @override */

  AmpSlides.prototype.hasPrev = function hasPrev() {
    if (this.isLooping_) {
      return true;
    }
    return this.currentIndex_ != 0;
  };

  /** @override */

  AmpSlides.prototype.hasNext = function hasNext() {
    if (this.isLooping_) {
      return true;
    }
    return this.currentIndex_ != this.slides_.length - 1;
  };

  /**
   * Gets the relative index using a step value that loops around even if the
   * step goes out of bounds of the current length. (less than zero, greater
   * than current length - 1)
   * @param {number} index index position of item within length exclusive.
   * @param {number} step step amount to offset from index.
   * @param {number} length length of the vector.
   */

  AmpSlides.getRelativeIndex = function getRelativeIndex(index, step, length) {
    return (index + step + length) % length;
  };

  return AmpSlides;
})(_baseCarousel.BaseCarousel);

exports.AmpSlides = AmpSlides;

},{"../../../src/animation":6,"../../../src/curve":8,"../../../src/gesture":10,"../../../src/gesture-recognizers":9,"../../../src/layout":11,"../../../src/style":18,"../../../src/timer":19,"../../../src/transition":20,"./base-carousel":2}],5:[function(require,module,exports){
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

var _curve = require('./curve');

var _log = require('./log');

var _timer = require('./timer');

var _vsync = require('./vsync');

var TAG_ = 'Animation';

var NOOP_CALLBACK = function () {};

/**
 * The animation class allows construction of arbitrary animation processes.
 * The main method is "add" that adds a segment of animation at particular
 * time offset (delay) and duration. All animation segments are simply functions
 * of type Transition which are iterated from 0 to 1 in animation frames to
 * achieve the desired effect.
 */

var Animation = (function () {

  /**
   * Creates and starts animation with a single segment. Returns AnimationPlayer
   * object that can be used to monitor or control animation.
   *
   * @param {!Transition<?>} transition Transition to animate.
   * @param {timeDef} duration Duration in milliseconds.
   * @param {(!Curve|string)=} opt_curve Optional curve to use for animation.
   *   Default is the linear animation.
   * @return {!AnimationPlayer}
   */

  Animation.animate = function animate(transition, duration, opt_curve) {
    return new Animation().setCurve(opt_curve).add(0, transition, 1).start(duration);
  };

  /**
   * @param {!Vsync=} opt_vsync
   */

  function Animation(opt_vsync) {
    babelHelpers.classCallCheck(this, Animation);

    /** @private @const */
    this.vsync_ = opt_vsync || _vsync.vsyncFor(window);

    /** @private {?Curve} */
    this.curve_ = null;

    /**
     * @private @const {!Array<!SegmentDef>}
     */
    this.segments_ = [];
  }

  /**
   * AnimationPlayer allows tracking and monitoring of the running animation.
   * Most importantly it exposes methods "then" and "thenAlways" that have the
   * semantics of a Promise and signal when the animation completed or failed.
   * Additionally, it exposes the method "halt" which allows to stop/reset the
   * animation.
   * @implements {IThenable}
   */

  /**
   * Sets the default curve for the animation. Each segment is allowed to have
   * its own curve, but this curve will be used if a segment doesn't specify
   * its own.
   * @param {!Curve|string} curve
   * @return {!Animation}
   */

  Animation.prototype.setCurve = function setCurve(curve) {
    this.curve_ = _curve.getCurve(curve);
    return this;
  };

  /**
   * Adds a segment to the animation. Each segment starts at offset (delay)
   * and runs for a portion of the overall animation (duration). Note that
   * both delay and duration and normtimeDef types which accept values from 0 to 1.
   * Optionally, the time is pushed through a curve. If curve is not specified,
   * the default animation curve will be used. The specified transition is
   * animated over the specified duration from 0 to 1.
   *
   * @param {normtimeDef} delay
   * @param {!Transition<?>} transition
   * @param {normtimeDef} duration
   * @param {(!Curve|string)=} opt_curve
   * @return {!Animation}
   */

  Animation.prototype.add = function add(delay, transition, duration, opt_curve) {
    this.segments_.push({ delay: delay, func: transition, duration: duration,
      curve: _curve.getCurve(opt_curve) });
    return this;
  };

  /**
   * Starts the animation and returns the AnimationPlayer object that can be
   * used to monitor and control the animation.
   *
   * @param {timeDef} duration Absolute time in milliseconds.
   * @return {!AnimationPlayer}
   */

  Animation.prototype.start = function start(duration) {
    var player = new AnimationPlayer(this.vsync_, this.segments_, this.curve_, duration);
    player.start_();
    return player;
  };

  return Animation;
})();

exports.Animation = Animation;

var AnimationPlayer = (function () {

  /**
   * @param {!Vsync} vsync
   * @param {!Array<!SegmentDef>} segments
   * @param {?Curve} defaultCurve
   * @param {timeDef} duration
   */

  function AnimationPlayer(vsync, segments, defaultCurve, duration) {
    var _this = this;

    babelHelpers.classCallCheck(this, AnimationPlayer);

    /** @private @const {!Vsync} */
    this.vsync_ = vsync;

    /** @private @const {!Array<!SegmentRuntimeDef>} */
    this.segments_ = [];
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      this.segments_.push({
        delay: segment.delay,
        func: segment.func,
        duration: segment.duration,
        curve: segment.curve || defaultCurve,
        started: false,
        completed: false
      });
    }

    /** @private @const */
    this.duration_ = duration;

    /** @private {timeDef} */
    this.startTime_ = 0;

    /** @private {normtimeDef} */
    this.normLinearTime_ = 0;

    /** @private {normtimeDef} */
    this.normTime_ = 0;

    /** @private {boolean} */
    this.running_ = false;

    /** @private {!Object<string, *>} */
    this.state_ = {};

    /** @const {function()} */
    this.resolve_;

    /** @const {function()} */
    this.reject_;

    /** @private {!Promise} */
    this.promise_ = new Promise(function (resolve, reject) {
      _this.resolve_ = resolve;
      _this.reject_ = reject;
    });

    /** @const */
    this.task_ = this.vsync_.createAnimTask({
      mutate: this.stepMutate_.bind(this)
    });
  }

  /**
   * @typedef {{
   *   delay: normtimeDef,
   *   func: !Transition,
   *   duration: normtimeDef,
   *   curve: ?Curve
   * }}
   */

  /**
   * Chains to the animation's promise that will resolve when the animation has
   * completed or will reject if animation has failed or was interrupted.
   * @param {!Function=} opt_resolve
   * @param {!Function=} opt_reject
   * @return {!Promise}
   */

  AnimationPlayer.prototype.then = function then(opt_resolve, opt_reject) {
    if (!opt_resolve && !opt_reject) {
      return this.promise_;
    }
    return this.promise_.then(opt_resolve, opt_reject);
  };

  /**
   * Callback for regardless whether the animation succeeds or fails.
   * @param {!Function=} opt_callback
   * @return {!Promise}
   */

  AnimationPlayer.prototype.thenAlways = function thenAlways(opt_callback) {
    var callback = opt_callback || NOOP_CALLBACK;
    return this.then(callback, callback);
  };

  /**
   * Halts the animation. Depending on the opt_dir value, the following actions
   * can be performed:
   * 0: No action. The state will be as at the moment of halting (default)
   * 1: Final state. Transitionable will be set to state = 1.
   * -1: Reset state. Transitionable will be reset to state = 0.
   * The animation's promise will be rejected since the transition has been
   * interrupted.
   * @param {number=} opt_dir
   */

  AnimationPlayer.prototype.halt = function halt(opt_dir) {
    this.complete_( /* success */false, /* dir */opt_dir || 0);
  };

  /**
   * @private
   */

  AnimationPlayer.prototype.start_ = function start_() {
    this.startTime_ = _timer.timer.now();
    this.running_ = true;
    if (this.vsync_.canAnimate()) {
      this.task_(this.state_);
    } else {
      _log.log.warn(TAG_, 'cannot animate');
      this.complete_( /* success */false, /* dir */0);
    }
  };

  /**
   * @param {boolean} success
   * @param {number} dir
   * @private
   */

  AnimationPlayer.prototype.complete_ = function complete_(success, dir) {
    if (!this.running_) {
      return;
    }
    this.running_ = false;
    if (dir != 0) {
      // Sort in the completion order.
      if (this.segments_.length > 1) {
        this.segments_.sort(function (s1, s2) {
          return s1.delay + s1.duration - (s2.delay + s2.duration);
        });
      }
      try {
        if (dir > 0) {
          // Natural order - all set to 1.
          for (var i = 0; i < this.segments_.length; i++) {
            this.segments_[i].func(1, true);
          }
        } else {
          // Reverse order - all set to 0.
          for (var i = this.segments_.length - 1; i >= 0; i--) {
            this.segments_[i].func(0, false);
          }
        }
      } catch (e) {
        _log.log.error(TAG_, 'completion failed: ' + e, e);
        success = false;
      }
    }
    if (success) {
      this.resolve_();
    } else {
      this.reject_();
    }
  };

  /**
   * @param {!Object<string, *>} unusedState
   * @private
   */

  AnimationPlayer.prototype.stepMutate_ = function stepMutate_(unusedState) {
    if (!this.running_) {
      return;
    }
    var currentTime = _timer.timer.now();
    var normLinearTime = Math.min((currentTime - this.startTime_) / this.duration_, 1);

    // Start segments due to be started
    for (var i = 0; i < this.segments_.length; i++) {
      var segment = this.segments_[i];
      if (!segment.started && normLinearTime >= segment.delay) {
        segment.started = true;
      }
    }

    // Execute all pending segments.
    for (var i = 0; i < this.segments_.length; i++) {
      var segment = this.segments_[i];
      if (!segment.started || segment.completed) {
        continue;
      }
      this.mutateSegment_(segment, normLinearTime);
    }

    // Complete or start next cycle.
    if (normLinearTime == 1) {
      this.complete_( /* success */true, /* dir */0);
    } else {
      if (this.vsync_.canAnimate()) {
        this.task_(this.state_);
      } else {
        _log.log.warn(TAG_, 'cancel animation');
        this.complete_( /* success */false, /* dir */0);
      }
    }
  };

  /**
   * @param {!SegmentRuntimeDef} segment
   * @param {number} totalLinearTime
   */

  AnimationPlayer.prototype.mutateSegment_ = function mutateSegment_(segment, totalLinearTime) {
    var normLinearTime = undefined;
    var normTime = undefined;
    if (segment.duration > 0) {
      normLinearTime = Math.min((totalLinearTime - segment.delay) / segment.duration, 1);
      normTime = normLinearTime;
      if (segment.curve && normTime != 1) {
        try {
          normTime = segment.curve(normLinearTime);
        } catch (e) {
          _log.log.error(TAG_, 'step curve failed: ' + e, e);
          this.complete_( /* success */false, /* dir */0);
          return;
        }
      }
    } else {
      normLinearTime = 1;
      normTime = 1;
    }
    if (normLinearTime == 1) {
      segment.completed = true;
    }
    try {
      segment.func(normTime, segment.completed);
    } catch (e) {
      _log.log.error(TAG_, 'step mutate failed: ' + e, e);
      this.complete_( /* success */false, /* dir */0);
      return;
    }
  };

  return AnimationPlayer;
})();

var SegmentDef = function SegmentDef() {
  babelHelpers.classCallCheck(this, SegmentDef);
}

/**
 * @typedef {{
 *   delay: normtimeDef,
 *   func: !Transition,
 *   duration: normtimeDef,
 *   curve: ?Curve,
 *   started: boolean,
 *   completed: boolean
 * }}
 */
;

var SegmentRuntimeDef = function SegmentRuntimeDef() {
  babelHelpers.classCallCheck(this, SegmentRuntimeDef);
};

},{"./curve":8,"./log":12,"./timer":19,"./vsync":22}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
exports.__esModule = true;
exports.bezierCurve = bezierCurve;
exports.getCurve = getCurve;
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
 * A CurveDef is a function that returns a normtime value (0 to 1) for another
 * normtime value.
 * @typedef {function(normtime):normtime}
 */

var CurveDef = function CurveDef() {
  babelHelpers.classCallCheck(this, CurveDef);
};

;

/**
 * Returns a cubic bezier curve.
 * @param {number} x1 X coordinate of the first control point.
 * @param {number} y1 Y coordinate of the first control point.
 * @param {number} x2 X coordinate of the second control point.
 * @param {number} y2 Y coordinate of the second control point.
 * @return {!CurveDef}
 */

function bezierCurve(x1, y1, x2, y2) {
  var bezier = new Bezier(0, 0, x1, y1, x2, y2, 1, 1);
  return bezier.solveYValueFromXValue.bind(bezier);
}

/**
 * Thanks to
 * https://closure-library.googlecode.com/git-history/docs/local_closure_goog_math_bezier.js.source.html
 */

var Bezier = (function () {

  /**
   * @param {number} x0 X coordinate of the start point.
   * @param {number} y0 Y coordinate of the start point.
   * @param {number} x1 X coordinate of the first control point.
   * @param {number} y1 Y coordinate of the first control point.
   * @param {number} x2 X coordinate of the second control point.
   * @param {number} y2 Y coordinate of the second control point.
   * @param {number} x3 X coordinate of the end point.
   * @param {number} y3 Y coordinate of the end point.
   */

  function Bezier(x0, y0, x1, y1, x2, y2, x3, y3) {
    babelHelpers.classCallCheck(this, Bezier);

    /**
     * X coordinate of the first point.
     * @type {number}
     */
    this.x0 = x0;

    /**
     * Y coordinate of the first point.
     * @type {number}
     */
    this.y0 = y0;

    /**
     * X coordinate of the first control point.
     * @type {number}
     */
    this.x1 = x1;

    /**
     * Y coordinate of the first control point.
     * @type {number}
     */
    this.y1 = y1;

    /**
     * X coordinate of the second control point.
     * @type {number}
     */
    this.x2 = x2;

    /**
     * Y coordinate of the second control point.
     * @type {number}
     */
    this.y2 = y2;

    /**
     * X coordinate of the end point.
     * @type {number}
     */
    this.x3 = x3;

    /**
     * Y coordinate of the end point.
     * @type {number}
     */
    this.y3 = y3;
  }

  /**
   * Computes the y coordinate of a point on the curve given its x coordinate.
   * @param {number} xVal The x coordinate of the point on the curve.
   * @return {number} The y coordinate of the point on the curve.
   */

  Bezier.prototype.solveYValueFromXValue = function solveYValueFromXValue(xVal) {
    return this.getPointY(this.solvePositionFromXValue(xVal));
  };

  /**
   * Computes the position t of a point on the curve given its x coordinate.
   * That is, for an input xVal, finds t s.t. getPointX(t) = xVal.
   * As such, the following should always be true up to some small epsilon:
   * t ~ solvePositionFromXValue(getPointX(t)) for t in [0, 1].
   * @param {number} xVal The x coordinate of the point to find on the curve.
   * @return {number} The position t.
   */

  Bezier.prototype.solvePositionFromXValue = function solvePositionFromXValue(xVal) {
    // Desired precision on the computation.
    var epsilon = 1e-6;

    // Initial estimate of t using linear interpolation.
    var t = (xVal - this.x0) / (this.x3 - this.x0);
    if (t <= 0) {
      return 0;
    } else if (t >= 1) {
      return 1;
    }

    // Try gradient descent to solve for t. If it works, it is very fast.
    var tMin = 0;
    var tMax = 1;
    for (var i = 0; i < 8; i++) {
      var _value = this.getPointX(t);
      var derivative = (this.getPointX(t + epsilon) - _value) / epsilon;
      if (Math.abs(_value - xVal) < epsilon) {
        return t;
      } else if (Math.abs(derivative) < epsilon) {
        break;
      } else {
        if (_value < xVal) {
          tMin = t;
        } else {
          tMax = t;
        }
        t -= (_value - xVal) / derivative;
      }
    }

    // If the gradient descent got stuck in a local minimum, e.g. because
    // the derivative was close to 0, use a Dichotomy refinement instead.
    // We limit the number of iterations to 8.
    for (var i = 0; Math.abs(value - xVal) > epsilon && i < 8; i++) {
      if (value < xVal) {
        tMin = t;
        t = (t + tMax) / 2;
      } else {
        tMax = t;
        t = (t + tMin) / 2;
      }
      value = this.getPointX(t);
    }
    return t;
  };

  /**
   * Computes the curve's X coordinate at a point between 0 and 1.
   * @param {number} t The point on the curve to find.
   * @return {number} The computed coordinate.
   */

  Bezier.prototype.getPointX = function getPointX(t) {
    // Special case start and end.
    if (t == 0) {
      return this.x0;
    } else if (t == 1) {
      return this.x3;
    }

    // Step one - from 4 points to 3
    var ix0 = this.lerp(this.x0, this.x1, t);
    var ix1 = this.lerp(this.x1, this.x2, t);
    var ix2 = this.lerp(this.x2, this.x3, t);

    // Step two - from 3 points to 2
    ix0 = this.lerp(ix0, ix1, t);
    ix1 = this.lerp(ix1, ix2, t);

    // Final step - last point
    return this.lerp(ix0, ix1, t);
  };

  /**
   * Computes the curve's Y coordinate at a point between 0 and 1.
   * @param {number} t The point on the curve to find.
   * @return {number} The computed coordinate.
   */

  Bezier.prototype.getPointY = function getPointY(t) {
    // Special case start and end.
    if (t == 0) {
      return this.y0;
    } else if (t == 1) {
      return this.y3;
    }

    // Step one - from 4 points to 3
    var iy0 = this.lerp(this.y0, this.y1, t);
    var iy1 = this.lerp(this.y1, this.y2, t);
    var iy2 = this.lerp(this.y2, this.y3, t);

    // Step two - from 3 points to 2
    iy0 = this.lerp(iy0, iy1, t);
    iy1 = this.lerp(iy1, iy2, t);

    // Final step - last point
    return this.lerp(iy0, iy1, t);
  };

  /**
   * Performs linear interpolation between values a and b. Returns the value
   * between a and b proportional to x (when x is between 0 and 1. When x is
   * outside this range, the return value is a linear extrapolation).
   * @param {number} a A number.
   * @param {number} b A number.
   * @param {number} x The proportion between a and b.
   * @return {number} The interpolated value between a and b.
   */

  Bezier.prototype.lerp = function lerp(a, b, x) {
    return a + x * (b - a);
  };

  return Bezier;
})();

;

/**
 * A collection of common curves.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function
 * @enum {!CurveDef}
 */
var Curves = {
  /**
   * linear
   * @param {number} n
   * @return {number}
   */
  LINEAR: function (n) {
    return n;
  },

  /**
   * ease
   */
  EASE: bezierCurve(0.25, 0.1, 0.25, 1.0),

  /**
   * ease-out: slow out, fast in
   */
  EASE_IN: bezierCurve(0.42, 0.0, 1.0, 1.0),

  /**
   * ease-out: fast out, slow in
   */
  EASE_OUT: bezierCurve(0.0, 0.0, 0.58, 1.0),

  /**
   * ease-in-out
   */
  EASE_IN_OUT: bezierCurve(0.42, 0.0, 0.58, 1.0)
};

exports.Curves = Curves;
/**
 * @const {!Object<string, !CurveDef>}
 */
var NAME_MAP = {
  'linear': Curves.LINEAR,
  'ease': Curves.EASE,
  'ease-in': Curves.EASE_IN,
  'ease-out': Curves.EASE_OUT,
  'ease-in-out': Curves.EASE_IN_OUT
};

/**
 * If the argument is a string, this methods matches an existing curve by name.
 * @param {?CurveDef|string|undefined} curve
 * @return {?CurveDef}
 */

function getCurve(curve) {
  if (!curve) {
    return null;
  }
  if (typeof curve == 'string') {
    return NAME_MAP[curve];
  }
  return curve;
}

},{}],9:[function(require,module,exports){
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

var _gesture = require('./gesture');

var _motion = require('./motion');

var _timer = require('./timer');

/**
 * A "tap" gesture.
 * @typedef {{
 *   clientX: number,
 *   clientY: number
 * }}
 */
var TapDef = undefined;

/**
 * Recognizes "tap" gestures.
 * @extends {GestureRecognizer<TapDef>}
 */

var TapRecognizer = (function (_GestureRecognizer) {
  babelHelpers.inherits(TapRecognizer, _GestureRecognizer);

  /**
   * @param {!Gestures} manager
   */

  function TapRecognizer(manager) {
    babelHelpers.classCallCheck(this, TapRecognizer);

    _GestureRecognizer.call(this, 'tap', manager);

    /** @private {number} */
    this.startX_ = 0;

    /** @private {number} */
    this.startY_ = 0;

    /** @private {number} */
    this.lastX_ = 0;

    /** @private {number} */
    this.lastY_ = 0;
  }

  /**
   * A "doubletap" gesture.
   * @typedef {{
   *   clientX: number,
   *   clientY: number
   * }}
   */

  /** @override */

  TapRecognizer.prototype.onTouchStart = function onTouchStart(e) {
    var touches = e.touches;
    if (!touches || touches.length != 1) {
      return false;
    }
    this.startX_ = touches[0].clientX;
    this.startY_ = touches[0].clientY;
    return true;
  };

  /** @override */

  TapRecognizer.prototype.onTouchMove = function onTouchMove(e) {
    var touches = e.changedTouches || e.touches;
    if (touches && touches.length == 1) {
      this.lastX_ = touches[0].clientX;
      this.lastY_ = touches[0].clientY;
      var dx = Math.abs(this.lastX_ - this.startX_) >= 8;
      var dy = Math.abs(this.lastY_ - this.startY_) >= 8;
      if (dx || dy) {
        return false;
      }
    }
    return true;
  };

  /** @override */

  TapRecognizer.prototype.onTouchEnd = function onTouchEnd(unusedE) {
    this.signalReady(0);
  };

  /** @override */

  TapRecognizer.prototype.acceptStart = function acceptStart() {
    this.signalEmit({ clientX: this.lastX_, clientY: this.lastY_ }, null);
    this.signalEnd();
  };

  return TapRecognizer;
})(_gesture.GestureRecognizer);

exports.TapRecognizer = TapRecognizer;
var DoubletapDef = undefined;

/**
 * Recognizes a "doubletap" gesture. This gesture will block a single "tap"
 * for about 300ms while it's expecting the second "tap".
 * @extends {GestureRecognizer<DoubletapDef>}
 */

var DoubletapRecognizer = (function (_GestureRecognizer2) {
  babelHelpers.inherits(DoubletapRecognizer, _GestureRecognizer2);

  /**
   * @param {!Gestures} manager
   */

  function DoubletapRecognizer(manager) {
    babelHelpers.classCallCheck(this, DoubletapRecognizer);

    _GestureRecognizer2.call(this, 'doubletap', manager);

    /** @private {number} */
    this.startX_ = 0;

    /** @private {number} */
    this.startY_ = 0;

    /** @private {number} */
    this.lastX_ = 0;

    /** @private {number} */
    this.lastY_ = 0;

    /** @private {number} */
    this.tapCount_ = 0;
  }

  /**
   * A "swipe-xy", "swipe-x" or "swipe-y" gesture. A number of these gestures
   * may be emitted for a single touch series.
   * @typedef {{
   *   first: boolean,
   *   last: boolean,
   *   deltaX: number,
   *   deltaY: number,
   *   velocityX: number,
   *   velocityY: number
   * }}
   */

  /** @override */

  DoubletapRecognizer.prototype.onTouchStart = function onTouchStart(e) {
    if (this.tapCount_ > 1) {
      return false;
    }
    var touches = e.touches;
    if (!touches || touches.length != 1) {
      return false;
    }
    this.startX_ = touches[0].clientX;
    this.startY_ = touches[0].clientY;
    return true;
  };

  /** @override */

  DoubletapRecognizer.prototype.onTouchMove = function onTouchMove(e) {
    var touches = e.changedTouches || e.touches;
    if (touches && touches.length == 1) {
      this.lastX_ = touches[0].clientX;
      this.lastY_ = touches[0].clientY;
      var dx = Math.abs(this.lastX_ - this.startX_) >= 8;
      var dy = Math.abs(this.lastY_ - this.startY_) >= 8;
      if (dx || dy) {
        this.acceptCancel();
        return false;
      }
    }
    return true;
  };

  /** @override */

  DoubletapRecognizer.prototype.onTouchEnd = function onTouchEnd(unusedE) {
    this.tapCount_++;
    if (this.tapCount_ < 2) {
      this.signalPending(300);
    } else {
      this.signalReady(0);
    }
  };

  /** @override */

  DoubletapRecognizer.prototype.acceptStart = function acceptStart() {
    this.tapCount_ = 0;
    this.signalEmit({ clientX: this.lastX_, clientY: this.lastY_ }, null);
    this.signalEnd();
  };

  /** @override */

  DoubletapRecognizer.prototype.acceptCancel = function acceptCancel() {
    this.tapCount_ = 0;
  };

  return DoubletapRecognizer;
})(_gesture.GestureRecognizer);

exports.DoubletapRecognizer = DoubletapRecognizer;
var SwipeDef = undefined;

/**
 * Recognizes swipe gestures. This gesture will yield about 10ms to other
 * gestures.
 * @extends {GestureRecognizer<SwipeDef>}
 */

var SwipeRecognizer = (function (_GestureRecognizer3) {
  babelHelpers.inherits(SwipeRecognizer, _GestureRecognizer3);

  /**
   * @param {!Gestures} manager
   */

  function SwipeRecognizer(type, manager, horiz, vert) {
    babelHelpers.classCallCheck(this, SwipeRecognizer);

    _GestureRecognizer3.call(this, type, manager);

    /** @private {boolean} */
    this.horiz_ = horiz;

    /** @private {boolean} */
    this.vert_ = vert;

    /** @private {boolean} */
    this.eventing_ = false;

    /** @private {number} */
    this.startX_ = 0;

    /** @private {number} */
    this.startY_ = 0;

    /** @private {number} */
    this.lastX_ = 0;

    /** @private {number} */
    this.lastY_ = 0;

    /** @private {number} */
    this.prevX_ = 0;

    /** @private {number} */
    this.prevY_ = 0;

    /** @private {time} */
    this.startTime_ = 0;

    /** @private {time} */
    this.lastTime_ = 0;

    /** @private {time} */
    this.prevTime_ = 0;

    /** @private {number} */
    this.velocityX_ = 0;

    /** @private {number} */
    this.velocityY_ = 0;
  }

  /**
   * Recognizes "swipe-xy" gesture. Yields about 10ms to other gestures.
   */

  /** @override */

  SwipeRecognizer.prototype.onTouchStart = function onTouchStart(e) {
    var touches = e.touches;
    if (!touches || touches.length != 1) {
      return false;
    }
    this.startTime_ = _timer.timer.now();
    this.startX_ = touches[0].clientX;
    this.startY_ = touches[0].clientY;
    return true;
  };

  /** @override */

  SwipeRecognizer.prototype.onTouchMove = function onTouchMove(e) {
    var touches = e.changedTouches || e.touches;
    if (touches && touches.length == 1) {
      var x = touches[0].clientX;
      var y = touches[0].clientY;
      this.lastX_ = x;
      this.lastY_ = y;
      if (this.eventing_) {
        this.emit_(false, false, e);
      } else {
        var dx = Math.abs(x - this.startX_);
        var dy = Math.abs(y - this.startY_);
        // Swipe is penalized slightly since it's one of the least demanding
        // gesture, thus -10 in signalReady.
        if (this.horiz_ && this.vert_) {
          if (dx >= 8 || dy >= 8) {
            this.signalReady(-10);
          }
        } else if (this.horiz_) {
          if (dx >= 8 && dx > dy) {
            this.signalReady(-10);
          } else if (dy >= 8) {
            return false;
          }
        } else if (this.vert_) {
          if (dy >= 8 && dy > dx) {
            this.signalReady(-10);
          } else if (dx >= 8) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  };

  /** @override */

  SwipeRecognizer.prototype.onTouchEnd = function onTouchEnd(e) {
    this.end_(e);
  };

  /** @override */

  SwipeRecognizer.prototype.acceptStart = function acceptStart() {
    this.eventing_ = true;
    // Reset start coordinates to where the gesture began to avoid visible
    // jump, but preserve them as "prev" coordinates to calculate the right
    // velocity.
    this.prevX_ = this.startX_;
    this.prevY_ = this.startY_;
    this.prevTime_ = this.startTime_;
    this.startX_ = this.lastX_;
    this.startY_ = this.lastY_;
    this.emit_(true, false, null);
  };

  /** @override */

  SwipeRecognizer.prototype.acceptCancel = function acceptCancel() {
    this.eventing_ = false;
  };

  /**
   * @param {boolean} first
   * @param {boolean} last
   * @param {?Event} event
   * @private
   */

  SwipeRecognizer.prototype.emit_ = function emit_(first, last, event) {
    this.lastTime_ = _timer.timer.now();
    var deltaTime = this.lastTime_ - this.prevTime_;
    // It's often that `touchend` arrives on the next frame. These should
    // be ignored to avoid a significant velocity downgrade.
    if (!last && deltaTime > 4 || last && deltaTime > 16) {
      this.velocityX_ = _motion.calcVelocity(this.lastX_ - this.prevX_, deltaTime, this.velocityX_);
      this.velocityY_ = _motion.calcVelocity(this.lastY_ - this.prevY_, deltaTime, this.velocityY_);
      this.velocityX_ = Math.abs(this.velocityX_) > 1e-4 ? this.velocityX_ : 0;
      this.velocityY_ = Math.abs(this.velocityY_) > 1e-4 ? this.velocityY_ : 0;
      this.prevX_ = this.lastX_;
      this.prevY_ = this.lastY_;
      this.prevTime_ = this.lastTime_;
    }

    this.signalEmit({
      first: first,
      last: last,
      time: this.lastTime_,
      deltaX: this.horiz_ ? this.lastX_ - this.startX_ : 0,
      deltaY: this.vert_ ? this.lastY_ - this.startY_ : 0,
      velocityX: this.horiz_ ? this.velocityX_ : 0,
      velocityY: this.vert_ ? this.velocityY_ : 0
    }, event);
  };

  /**
   * @param {?Event} event
   * @private
   */

  SwipeRecognizer.prototype.end_ = function end_(event) {
    if (this.eventing_) {
      this.eventing_ = false;
      this.emit_(false, true, event);
      this.signalEnd();
    }
  };

  return SwipeRecognizer;
})(_gesture.GestureRecognizer);

var SwipeXYRecognizer = (function (_SwipeRecognizer) {
  babelHelpers.inherits(SwipeXYRecognizer, _SwipeRecognizer);

  /**
   * @param {!Gestures} manager
   */

  function SwipeXYRecognizer(manager) {
    babelHelpers.classCallCheck(this, SwipeXYRecognizer);

    _SwipeRecognizer.call(this, 'swipe-xy', manager, true, true);
  }

  /**
   * Recognizes "swipe-x" gesture. Yields about 10ms to other gestures.
   */
  return SwipeXYRecognizer;
})(SwipeRecognizer);

exports.SwipeXYRecognizer = SwipeXYRecognizer;

var SwipeXRecognizer = (function (_SwipeRecognizer2) {
  babelHelpers.inherits(SwipeXRecognizer, _SwipeRecognizer2);

  /**
   * @param {!Gestures} manager
   */

  function SwipeXRecognizer(manager) {
    babelHelpers.classCallCheck(this, SwipeXRecognizer);

    _SwipeRecognizer2.call(this, 'swipe-x', manager, true, false);
  }

  /**
   * Recognizes "swipe-y" gesture. Yields about 10ms to other gestures.
   */
  return SwipeXRecognizer;
})(SwipeRecognizer);

exports.SwipeXRecognizer = SwipeXRecognizer;

var SwipeYRecognizer = (function (_SwipeRecognizer3) {
  babelHelpers.inherits(SwipeYRecognizer, _SwipeRecognizer3);

  /**
   * @param {!Gestures} manager
   */

  function SwipeYRecognizer(manager) {
    babelHelpers.classCallCheck(this, SwipeYRecognizer);

    _SwipeRecognizer3.call(this, 'swipe-y', manager, false, true);
  }

  /**
   * A "tapzoom" gesture. It has a center, delta off the center center and
   * the velocity of moving away from the center.
   * @typedef {{
   *   first: boolean,
   *   last: boolean,
   *   centerClientX: number,
   *   centerClientY: number,
   *   deltaX: number,
   *   deltaY: number,
   *   velocityX: number,
   *   velocityY: number
   * }}
   */
  return SwipeYRecognizer;
})(SwipeRecognizer);

exports.SwipeYRecognizer = SwipeYRecognizer;
var TapzoomDef = undefined;

/**
 * Recognizes a "tapzoom" gesture. This gesture will block other gestures
 * for about 400ms after first "tap" while it's expecting swipe.
 * @extends {GestureRecognizer<TapzoomDef>}
 */

var TapzoomRecognizer = (function (_GestureRecognizer4) {
  babelHelpers.inherits(TapzoomRecognizer, _GestureRecognizer4);

  /**
   * @param {!Gestures} manager
   */

  function TapzoomRecognizer(manager) {
    babelHelpers.classCallCheck(this, TapzoomRecognizer);

    _GestureRecognizer4.call(this, 'tapzoom', manager);

    /** @private {boolean} */
    this.eventing_ = false;

    /** @private {number} */
    this.startX_ = 0;

    /** @private {number} */
    this.startY_ = 0;

    /** @private {number} */
    this.lastX_ = 0;

    /** @private {number} */
    this.lastY_ = 0;

    /** @private {number} */
    this.tapX_ = 0;

    /** @private {number} */
    this.tapY_ = 0;

    /** @private {number} */
    this.tapCount_ = 0;

    /** @private {number} */
    this.prevX_ = 0;

    /** @private {number} */
    this.prevY_ = 0;

    /** @private {time} */
    this.startTime_ = 0;

    /** @private {time} */
    this.lastTime_ = 0;

    /** @private {time} */
    this.prevTime_ = 0;

    /** @private {number} */
    this.velocityX_ = 0;

    /** @private {number} */
    this.velocityY_ = 0;
  }

  /**
   * A "pinch" gesture. It has a center, delta off the center center and
   * the velocity of moving away from the center. "dir" component of `1`
   * indicates that it's a expand motion and `-1` indicates pinch motion.
   * @typedef {{
   *   first: boolean,
   *   last: boolean,
   *   centerClientX: number,
   *   centerClientY: number,
   *   dir: number,
   *   deltaX: number,
   *   deltaY: number,
   *   velocityX: number,
   *   velocityY: number
   * }}
   */

  /** @override */

  TapzoomRecognizer.prototype.onTouchStart = function onTouchStart(e) {
    if (this.eventing_) {
      return false;
    }
    var touches = e.touches;
    if (!touches || touches.length != 1) {
      return false;
    }
    this.startX_ = touches[0].clientX;
    this.startY_ = touches[0].clientY;
    return true;
  };

  /** @override */

  TapzoomRecognizer.prototype.onTouchMove = function onTouchMove(e) {
    var touches = e.changedTouches || e.touches;
    if (touches && touches.length == 1) {
      this.lastX_ = touches[0].clientX;
      this.lastY_ = touches[0].clientY;
      if (this.eventing_) {
        this.emit_(false, false, e);
      } else {
        var dx = Math.abs(this.lastX_ - this.startX_) >= 8;
        var dy = Math.abs(this.lastY_ - this.startY_) >= 8;
        if (dx || dy) {
          if (this.tapCount_ == 0) {
            this.acceptCancel();
            return false;
          } else {
            this.signalReady(0);
          }
        }
      }
    }
    return true;
  };

  /** @override */

  TapzoomRecognizer.prototype.onTouchEnd = function onTouchEnd(e) {
    if (this.eventing_) {
      this.end_(e);
      return;
    }

    this.tapCount_++;
    if (this.tapCount_ == 1) {
      this.signalPending(400);
      this.tapX_ = this.lastX_;
      this.tapY_ = this.lastY_;
      return;
    }

    this.acceptCancel();
  };

  /** @override */

  TapzoomRecognizer.prototype.acceptStart = function acceptStart() {
    this.tapCount_ = 0;
    this.eventing_ = true;
    this.emit_(true, false, null);
  };

  /** @override */

  TapzoomRecognizer.prototype.acceptCancel = function acceptCancel() {
    this.tapCount_ = 0;
    this.eventing_ = false;
  };

  /**
   * @param {boolean} first
   * @param {boolean} last
   * @param {?Event} event
   * @private
   */

  TapzoomRecognizer.prototype.emit_ = function emit_(first, last, event) {
    this.lastTime_ = _timer.timer.now();
    if (first) {
      this.startTime_ = this.lastTime_;
      this.velocityX_ = this.velocityY_ = 0;
    } else if (this.lastTime_ - this.prevTime_ > 2) {
      this.velocityX_ = _motion.calcVelocity(this.lastX_ - this.prevX_, this.lastTime_ - this.prevTime_, this.velocityX_);
      this.velocityY_ = _motion.calcVelocity(this.lastY_ - this.prevY_, this.lastTime_ - this.prevTime_, this.velocityY_);
    }
    this.prevX_ = this.lastX_;
    this.prevY_ = this.lastY_;
    this.prevTime_ = this.lastTime_;

    this.signalEmit({
      first: first,
      last: last,
      centerClientX: this.startX_,
      centerClientY: this.startY_,
      deltaX: this.lastX_ - this.startX_,
      deltaY: this.lastY_ - this.startY_,
      velocityX: this.velocityX_,
      velocityY: this.velocityY_
    }, event);
  };

  /**
   * @param {?Event} event
   * @private
   */

  TapzoomRecognizer.prototype.end_ = function end_(event) {
    if (this.eventing_) {
      this.eventing_ = false;
      this.emit_(false, true, event);
      this.signalEnd();
    }
  };

  return TapzoomRecognizer;
})(_gesture.GestureRecognizer);

exports.TapzoomRecognizer = TapzoomRecognizer;
var PinchDef = undefined;

/**
 * Recognizes a "pinch" gesture.
 * @extends {GestureRecognizer<PinchDef>}
 */

var PinchRecognizer = (function (_GestureRecognizer5) {
  babelHelpers.inherits(PinchRecognizer, _GestureRecognizer5);

  /**
   * @param {!Gestures} manager
   */

  function PinchRecognizer(manager) {
    babelHelpers.classCallCheck(this, PinchRecognizer);

    _GestureRecognizer5.call(this, 'pinch', manager);

    /** @private {boolean} */
    this.eventing_ = false;

    /** @private {number} */
    this.startX1_ = 0;
    /** @private {number} */
    this.startY1_ = 0;

    /** @private {number} */
    this.startX2_ = 0;
    /** @private {number} */
    this.startY2_ = 0;

    /** @private {number} */
    this.lastX1_ = 0;
    /** @private {number} */
    this.lastY1_ = 0;

    /** @private {number} */
    this.lastX2_ = 0;
    /** @private {number} */
    this.lastY2_ = 0;

    /** @private {number} */
    this.prevDeltaX_ = 0;
    /** @private {number} */
    this.prevDeltaY_ = 0;

    /** @private {number} */
    this.centerClientX_ = 0;
    /** @private {number} */
    this.centerClientY_ = 0;

    /** @private {time} */
    this.startTime_ = 0;
    /** @private {time} */
    this.lastTime_ = 0;
    /** @private {time} */
    this.prevTime_ = 0;

    /** @private {number} */
    this.velocityX_ = 0;
    /** @private {number} */
    this.velocityY_ = 0;
  }

  /** @override */

  PinchRecognizer.prototype.onTouchStart = function onTouchStart(e) {
    var touches = e.touches;
    if (!touches || touches.length != 2) {
      return false;
    }
    this.startTime_ = _timer.timer.now();
    this.startX1_ = touches[0].clientX;
    this.startY1_ = touches[0].clientY;
    this.startX2_ = touches[1].clientX;
    this.startY2_ = touches[1].clientY;
    return true;
  };

  /** @override */

  PinchRecognizer.prototype.onTouchMove = function onTouchMove(e) {
    var touches = e.touches;
    if (!touches || touches.length != 2) {
      return false;
    }
    this.lastX1_ = touches[0].clientX;
    this.lastY1_ = touches[0].clientY;
    this.lastX2_ = touches[1].clientX;
    this.lastY2_ = touches[1].clientY;
    if (this.eventing_) {
      this.emit_(false, false, e);
    } else {
      var dx1 = this.lastX1_ - this.startX1_;
      var dy1 = this.lastY1_ - this.startY1_;
      var dx2 = this.lastX2_ - this.startX2_;
      var dy2 = this.lastY2_ - this.startY2_;
      // Fingers should move in opposite directions and go over the threshold.
      if (dx1 * dx2 <= 0 && dy1 * dy2 <= 0) {
        if (Math.abs(dx1 - dx2) >= 8 || Math.abs(dy1 - dy2) >= 8) {
          this.signalReady(0);
        }
      } else if (Math.abs(dx1 + dx2) >= 8 || Math.abs(dy1 + dy2) >= 8) {
        // Moving in the same direction over a threshold.
        return false;
      }
    }
    return true;
  };

  /** @override */

  PinchRecognizer.prototype.onTouchEnd = function onTouchEnd(e) {
    this.end_(e);
  };

  /** @override */

  PinchRecognizer.prototype.acceptStart = function acceptStart() {
    this.eventing_ = true;
    this.prevTime_ = this.startTime_;
    this.prevDeltaX_ = 0;
    this.prevDeltaY_ = 0;
    this.centerClientX_ = (this.startX1_ + this.startX2_) * 0.5;
    this.centerClientY_ = (this.startY1_ + this.startY2_) * 0.5;
    this.emit_(true, false, null);
  };

  /** @override */

  PinchRecognizer.prototype.acceptCancel = function acceptCancel() {
    this.eventing_ = false;
  };

  /**
   * @param {boolean} first
   * @param {boolean} last
   * @param {?Event} event
   * @private
   */

  PinchRecognizer.prototype.emit_ = function emit_(first, last, event) {
    this.lastTime_ = _timer.timer.now();
    var deltaTime = this.lastTime_ - this.prevTime_;
    var deltaX = this.deltaX_();
    var deltaY = this.deltaY_();
    // It's often that `touchend` arrives on the next frame. These should
    // be ignored to avoid a significant velocity downgrade.
    if (!last && deltaTime > 4 || last && deltaTime > 16) {
      this.velocityX_ = _motion.calcVelocity(deltaX - this.prevDeltaX_, deltaTime, this.velocityX_);
      this.velocityY_ = _motion.calcVelocity(deltaY - this.prevDeltaY_, deltaTime, this.velocityY_);
      this.velocityX_ = Math.abs(this.velocityX_) > 1e-4 ? this.velocityX_ : 0;
      this.velocityY_ = Math.abs(this.velocityY_) > 1e-4 ? this.velocityY_ : 0;
      this.prevDeltaX_ = deltaX;
      this.prevDeltaY_ = deltaY;
      this.prevTime_ = this.lastTime_;
    }

    var startSq = this.sqDist_(this.startX1_, this.startX2_, this.startY1_, this.startY2_);
    var lastSq = this.sqDist_(this.lastX1_, this.lastX2_, this.lastY1_, this.lastY2_);
    this.signalEmit({
      first: first,
      last: last,
      time: this.lastTime_,
      centerClientX: this.centerClientX_,
      centerClientY: this.centerClientY_,
      dir: Math.sign(lastSq - startSq),
      deltaX: deltaX * 0.5,
      deltaY: deltaY * 0.5,
      velocityX: this.velocityX_ * 0.5,
      velocityY: this.velocityY_ * 0.5
    }, event);
  };

  /**
   * @param {?Event} event
   * @private
   */

  PinchRecognizer.prototype.end_ = function end_(event) {
    if (this.eventing_) {
      this.eventing_ = false;
      this.emit_(false, true, event);
      this.signalEnd();
    }
  };

  /**
   * @param {number} x1
   * @param {number} x2
   * @param {number} y1
   * @param {number} y2
   * @return {number}
   * @private
   */

  PinchRecognizer.prototype.sqDist_ = function sqDist_(x1, x2, y1, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  };

  /**
   * @return {number}
   * @private
   */

  PinchRecognizer.prototype.deltaX_ = function deltaX_() {
    return Math.abs(this.lastX1_ - this.startX1_ - (this.lastX2_ - this.startX2_));
  };

  /**
   * @return {number}
   * @private
   */

  PinchRecognizer.prototype.deltaY_ = function deltaY_() {
    return Math.abs(this.lastY1_ - this.startY1_ - (this.lastY2_ - this.startY2_));
  };

  return PinchRecognizer;
})(_gesture.GestureRecognizer);

exports.PinchRecognizer = PinchRecognizer;

},{"./gesture":10,"./motion":14,"./timer":19}],10:[function(require,module,exports){
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

var _asserts = require('./asserts');

var _pass = require('./pass');

var _timer = require('./timer');

var PROP_ = '__AMP_Gestures';

/**
 * A gesture object contains the type and data of the gesture such as
 * a tap or a double-tap or a swipe. See {@link GestureRecognizer} for
 * more details.
 * @struct
 * @const
 * @template DATA
 */

var Gesture =
/**
 * @param {string} type The gesture's string type.
 * @param {DATA} data The data of the gesture.
 * @param {time} time The time that the gesture has been emitted.
 * @param {?Event} event An optional browser event that resulted in the
 *   gesture.
 */
function Gesture(type, data, time, event) {
  babelHelpers.classCallCheck(this, Gesture);

  /** @const {string} */
  this.type = type;
  /** @const {DATA} */
  this.data = data;
  /** @const {time} */
  this.time = time;
  /** @const {?Event} */
  this.event = event;
}

/**
 * Gestures object manages all gestures on a particular element. It listens
 * to all pointer events and delegates them to individual gesture recognizers.
 * When a recognizer has recognized a gesture and ready to start emitting it
 * it requests permission to do so from this class which resolves conflicts
 * between competing recognizers to decide which gesture should go forward.
 */
;

exports.Gesture = Gesture;

var Gestures = (function () {

  /**
   * Creates if not yet created and returns the shared Gestures instance for
   * the specified element.
   * @param {!Element} element
   * @return {!Gestures}
   */

  Gestures.get = function get(element) {
    var res = element[PROP_];
    if (!res) {
      res = new Gestures(element);
      element[PROP_] = res;
    }
    return res;
  };

  /**
   * @param {!Element} element
   */

  function Gestures(element) {
    babelHelpers.classCallCheck(this, Gestures);

    /** @private {!Element} */
    this.element_ = element;

    /** @private {!Array<!GestureRecognizer>} */
    this.recognizers_ = [];

    /** @private {!Array<boolean>} */
    this.tracking_ = [];

    /** @private {!Array<time>} */
    this.ready_ = [];

    /** @private {!Array<time>} */
    this.pending_ = [];

    /** @private {?GestureRecognizer} */
    this.eventing_ = null;

    /**
     * This variable indicates that the eventing has stopped on this
     * event cycle.
     * @private {boolean}
     */
    this.wasEventing_ = false;

    /** @private {!Pass} */
    this.pass_ = new _pass.Pass(this.doPass_.bind(this));

    /** @private {!Observable} */
    this.pointerDownObservable_ = new _observable.Observable();

    /**
     * Observers for each type of registered gesture types.
     * @private {!Object<string, !Observable<!Gesture>>}
     */
    this.overservers_ = Object.create(null);

    /** @private @const {function(!Event)} */
    this.boundOnTouchStart_ = this.onTouchStart_.bind(this);
    /** @private @const {function(!Event)} */
    this.boundOnTouchEnd_ = this.onTouchEnd_.bind(this);
    /** @private @const {function(!Event)} */
    this.boundOnTouchMove_ = this.onTouchMove_.bind(this);
    /** @private @const {function(!Event)} */
    this.boundOnTouchCancel_ = this.onTouchCancel_.bind(this);

    this.element_.addEventListener('touchstart', this.boundOnTouchStart_);
    this.element_.addEventListener('touchend', this.boundOnTouchEnd_);
    this.element_.addEventListener('touchmove', this.boundOnTouchMove_);
    this.element_.addEventListener('touchcancel', this.boundOnTouchCancel_);
  }

  /**
   * The gesture recognizer receives the pointer events from Gestures instance.
   * Based on these events, it can "recognize" the gesture it's responsible for,
   * request to start emitting and emit gestures. Gestures instances manages
   * several competing recognizers and decides which ones get to emit gestures
   * and which do not.
   *
   * The recognizer can be in several main states:
   * 1. Tracking state. In this state the recognizer is receiving the series of
   *    touch events from touchstart to touchend. To get into this state the
   *    recognizer has to return "true" from the {@link onTouchStart}.
   * 2. Pending state (optional). The recognizer matched part of the gesture,
   *    but needs more time to get track more events. It requests more time
   *    by calling {@link signalPending}, By the end of this time the recognizer
   *    has either matched the gesture or has been canceled.
   * 3. Ready state. The recognizer matched the whole gesture and ready to start
   *    emitting. It communicates to the Gestures this readiness by calling
   *    {@link signalReady}.
   * 5. Emitting state. If Gestures decides to go ahead with this recognizer, it
   *    will call {@link acceptStart} method. Otherwise, it will call
   *    {@link acceptCancel} method. Once in the emitting state, the recognizer
   *    can emit any number of events by calling {@link signalEmit}.
   * 6. Complete state. Once done, the recognizer can call {@link signalEnd} to
   *    communicate that it's done.
   *
   * @template DATA
   */

  /**
   * Unsubscribes from all pointer events.
   */

  Gestures.prototype.cleanup = function cleanup() {
    this.element_.removeEventListener('touchstart', this.boundOnTouchStart_);
    this.element_.removeEventListener('touchend', this.boundOnTouchEnd_);
    this.element_.removeEventListener('touchmove', this.boundOnTouchMove_);
    this.element_.removeEventListener('touchcancel', this.boundOnTouchCancel_);
    this.pass_.cancel();
  };

  /**
   * Subscribes to a gesture emitted by the specified recognizer. For a first
   * gesture handler registered in this method the recognizer is installed
   * and from that point on it participates in the event processing.
   *
   * @param {function(new:GestureRecognizer<DATA>)} recognizerConstr
   * @param {function(!Gesture<!DATA>)} handler
   * @return {!UnlistenDef}
   * @template DATA
   */

  Gestures.prototype.onGesture = function onGesture(recognizerConstr, handler) {
    var recognizer = new recognizerConstr(this);
    var type = recognizer.getType();
    var overserver = this.overservers_[type];
    if (!overserver) {
      this.recognizers_.push(recognizer);
      overserver = new _observable.Observable();
      this.overservers_[type] = overserver;
    }
    return overserver.add(handler);
  };

  /**
   * Subscribes to pointer down events, such as "touchstart" or "mousedown".
   * @param {!Function} handler
   * @return {!UnlistenDef}
   */

  Gestures.prototype.onPointerDown = function onPointerDown(handler) {
    return this.pointerDownObservable_.add(handler);
  };

  /**
   * Handles all "touchstart" events and dispatches them to the tracking
   * recognizers.
   * @param {!Event} event
   * @private
   */

  Gestures.prototype.onTouchStart_ = function onTouchStart_(event) {
    var now = _timer.timer.now();
    this.wasEventing_ = false;

    this.pointerDownObservable_.fire(event);

    for (var i = 0; i < this.recognizers_.length; i++) {
      if (this.ready_[i]) {
        // If the recognizer is in the "ready" state, it won't receive
        // any more touch series until it's allowed to emit.
        continue;
      }
      if (this.pending_[i] && this.pending_[i] < now) {
        // Pending state expired. Reset.
        this.stopTracking_(i);
      }
      if (this.recognizers_[i].onTouchStart(event)) {
        // When a recognizer is interested in the touch series it returns "true"
        // from its onTouchStart method. For this recognizer we start tracking
        // the whole series of touch events from touchstart to touchend. Other
        // recognizers will not receive them unless they return "true" from
        // onTouchStart.
        this.startTracking_(i);
      }
    }

    this.afterEvent_(event);
  };

  /**
   * Handles all "touchmove" events and dispatches them to the tracking
   * recognizers.
   * @param {!Event} event
   * @private
   */

  Gestures.prototype.onTouchMove_ = function onTouchMove_(event) {
    var now = _timer.timer.now();

    for (var i = 0; i < this.recognizers_.length; i++) {
      if (!this.tracking_[i]) {
        // The whole touch series are ignored for non-tracking recognizers.
        continue;
      }
      if (this.pending_[i] && this.pending_[i] < now) {
        // Pending state expired. Reset.
        this.stopTracking_(i);
        continue;
      }
      if (!this.recognizers_[i].onTouchMove(event)) {
        // Recognizer lost interest in the series. Reset.
        this.stopTracking_(i);
      }
    }

    this.afterEvent_(event);
  };

  /**
   * Handles all "touchend" events and dispatches them to the tracking
   * recognizers.
   * @param {!Event} event
   * @private
   */

  Gestures.prototype.onTouchEnd_ = function onTouchEnd_(event) {
    var now = _timer.timer.now();

    for (var i = 0; i < this.recognizers_.length; i++) {
      if (!this.tracking_[i]) {
        // The whole touch series are ignored for non-tracking recognizers.
        continue;
      }
      if (this.pending_[i] && this.pending_[i] < now) {
        // Pending state expired. Reset.
        this.stopTracking_(i);
        continue;
      }
      this.recognizers_[i].onTouchEnd(event);
      if (!this.pending_[i] || this.pending_[i] < now) {
        this.stopTracking_(i);
      }
    }

    this.afterEvent_(event);
  };

  /**
   * Handles all "touchcancel" events. Cancels all tracking/emitting
   * recognizers.
   * @param {!Event} event
   * @private
   */

  Gestures.prototype.onTouchCancel_ = function onTouchCancel_(event) {
    for (var i = 0; i < this.recognizers_.length; i++) {
      this.cancelEventing_(i);
    }
    this.afterEvent_(event);
  };

  /**
   * Callback for a gesture recognizer to communicate that it's ready to
   * start emitting gestures. Gestures instance may or may not allow the
   * recognizer to proceed.
   * @param {!GestureRecognizer} recognizer
   * @param {number} offset
   * @private
   */

  Gestures.prototype.signalReady_ = function signalReady_(recognizer, offset) {
    // Somebody got here first.
    if (this.eventing_) {
      recognizer.acceptCancel();
      return;
    }

    // Set the recognizer as ready and wait for the pass to
    // make the decision.
    var now = _timer.timer.now();
    for (var i = 0; i < this.recognizers_.length; i++) {
      if (this.recognizers_[i] == recognizer) {
        this.ready_[i] = now + offset;
        this.pending_[i] = 0;
      }
    }
    this.passAfterEvent_ = true;
  };

  /**
   * Callback for a gesture recognizer to communicate that it's close to
   * start emitting gestures, but needs more time to see more events. Once
   * this time expires the recognizer should either signal readiness or it
   * will be canceled.
   * @param {!GestureRecognizer} recognizer
   * @param {number} offset
   * @private
   */

  Gestures.prototype.signalPending_ = function signalPending_(recognizer, timeLeft) {
    // Somebody got here first.
    if (this.eventing_) {
      recognizer.acceptCancel();
      return;
    }

    var now = _timer.timer.now();
    for (var i = 0; i < this.recognizers_.length; i++) {
      if (this.recognizers_[i] == recognizer) {
        this.pending_[i] = now + timeLeft;
      }
    }
  };

  /**
   * Callback for a gesture recognizer to communicate that it's done
   * emitting gestures.
   * @param {!GestureRecognizer} recognizer
   * @private
   */

  Gestures.prototype.signalEnd_ = function signalEnd_(recognizer) {
    if (this.eventing_ == recognizer) {
      this.eventing_ = null;
      this.wasEventing_ = true;
    }
  };

  /**
   * Callback for a gesture emit the gesture. Only the currently emitting
   * recognizer is allowed to emit gestures.
   * @param {!GestureRecognizer} recognizer
   * @param {*} data
   * @param {?Event} event
   * @private
   */

  Gestures.prototype.signalEmit_ = function signalEmit_(recognizer, data, event) {
    _asserts.assert(this.eventing_ == recognizer, 'Recognizer is not currently allowed: %s', recognizer.getType());
    var overserver = this.overservers_[recognizer.getType()];
    if (overserver) {
      overserver.fire(new Gesture(recognizer.getType(), data, _timer.timer.now(), event));
    }
  };

  /**
   * @param {!Event} event
   * @private
   */

  Gestures.prototype.afterEvent_ = function afterEvent_(event) {
    var cancelEvent = !!this.eventing_ || this.wasEventing_;
    this.wasEventing_ = false;
    if (!cancelEvent) {
      var now = _timer.timer.now();
      for (var i = 0; i < this.recognizers_.length; i++) {
        if (this.ready_[i] || this.pending_[i] && this.pending_[i] >= now) {
          cancelEvent = true;
          break;
        }
      }
    }
    if (cancelEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.passAfterEvent_) {
      this.passAfterEvent_ = false;
      this.doPass_();
    }
  };

  /**
   * The pass that decides which recognizers can start emitting and which
   * are canceled.
   * @param {!Event} event
   * @private
   */

  Gestures.prototype.doPass_ = function doPass_() {
    var now = _timer.timer.now();

    // The "most ready" recognizer is the youngest in the "ready" set.
    // Otherwise we wouldn't wait for it at all.
    var readyIndex = -1;
    for (var i = 0; i < this.recognizers_.length; i++) {
      if (!this.ready_[i]) {
        if (this.pending_[i] && this.pending_[i] < now) {
          // Pending state expired. Reset.
          this.stopTracking_(i);
        }
        continue;
      }
      if (readyIndex == -1 || this.ready_[i] > this.ready_[readyIndex]) {
        readyIndex = i;
      }
    }

    if (readyIndex == -1) {
      // Nothing to do.
      return;
    }

    // Look for conflicts.
    var waitTime = 0;
    for (var i = 0; i < this.recognizers_.length; i++) {
      if (this.ready_[i] || !this.tracking_[i]) {
        continue;
      }
      waitTime = Math.max(waitTime, this.pending_[i] - now);
    }

    if (waitTime < 2) {
      // We waited long enough.
      this.startEventing_(readyIndex);
      return;
    }

    // Some conflicts: have to wait to see who wins.
    this.pass_.schedule(waitTime);
  };

  /**
   * This recognizer is given "go ahead" and all others are canceled.
   * @param {number} index
   * @private
   */

  Gestures.prototype.startEventing_ = function startEventing_(index) {
    var recognizer = this.recognizers_[index];
    for (var i = 0; i < this.recognizers_.length; i++) {
      if (i != index) {
        this.cancelEventing_(i);
      }
    }
    this.ready_[index] = 0;
    this.pending_[index] = 0;
    this.eventing_ = recognizer;
    recognizer.acceptStart();
  };

  /**
   * @param {number} index
   * @private
   */

  Gestures.prototype.startTracking_ = function startTracking_(index) {
    this.tracking_[index] = true;
    this.pending_[index] = 0;
  };

  /**
   * @param {number} index
   * @private
   */

  Gestures.prototype.stopTracking_ = function stopTracking_(index) {
    this.tracking_[index] = false;
    this.pending_[index] = 0;
    if (!this.ready_[index]) {
      this.recognizers_[index].acceptCancel();
    }
  };

  /**
   * @param {number} index
   * @private
   */

  Gestures.prototype.cancelEventing_ = function cancelEventing_(index) {
    this.ready_[index] = 0;
    this.stopTracking_(index);
  };

  return Gestures;
})();

exports.Gestures = Gestures;

var GestureRecognizer = (function () {

  /**
   * @param {string} type
   * @param {!Gestures} manager
   */

  function GestureRecognizer(type, manager) {
    babelHelpers.classCallCheck(this, GestureRecognizer);

    /** @private @const {string} */
    this.type_ = type;

    /** @private @const {!Gestures} */
    this.manager_ = manager;
  }

  /**
   * Returns the type of the gesture emitted by the instance of this class.
   * It has to be unique in the scope of the Gestures instance.
   * @return {string}
   */

  GestureRecognizer.prototype.getType = function getType() {
    return this.type_;
  };

  /**
   * The recognizer can call this method to communicate that it's ready to
   * start emitting the gesture. Optionally it can pass a zero, positive or
   * negative offset - a time on how much the gesture should be penalized or
   * given advantage in conflict resolution. The recognizer at this point is
   * in the "ready" state.
   * @param {time} offset
   */

  GestureRecognizer.prototype.signalReady = function signalReady(offset) {
    this.manager_.signalReady_(this, offset);
  };

  /**
   * The recognizer can call this method to communicate that it needs more
   * time (timeLeft) to match the gesture. By the end of this time the
   * recognizer has to either transit to the ready state using
   * {@link signalReady} or it will be canceled. The recognizer is in the
   * "pending" state.
   * @param {time} timeLeft
   */

  GestureRecognizer.prototype.signalPending = function signalPending(timeLeft) {
    this.manager_.signalPending_(this, timeLeft);
  };

  /**
   * The recognizer can call this method to communicate that it's done
   * emitting the gestures. It will return to the waiting state. Recognizer
   * can only call this method if it has previously received the
   * {@link acceptStart} call.
   */

  GestureRecognizer.prototype.signalEnd = function signalEnd() {
    this.manager_.signalEnd_(this);
  };

  /**
   * The recognizer can call this method to emit the gestures while in the
   * "emitting" state. Recognizer can only call this method if it has
   * previously received the {@link acceptStart} call.
   * @param {!DATA} data
   * @param {?Event} event
   */

  GestureRecognizer.prototype.signalEmit = function signalEmit(data, event) {
    this.manager_.signalEmit_(this, data, event);
  };

  /**
   * The Gestures instance calls this method to allow the recognizer to start
   * emitting the gestures. At this point the recognizer is in the "emitting"
   * state. It will be in this state until it calls {@link signalEnd} or
   * the {@link acceptCancel} is called by the Gestures instance.
   */

  GestureRecognizer.prototype.acceptStart = function acceptStart() {};

  /**
   * The Gestures instance calls this method to reset the recognizer. At this
   * point the recognizer is in the initial waiting state.
   */

  GestureRecognizer.prototype.acceptCancel = function acceptCancel() {};

  /**
   * The Gestures instance calls this method for each "touchstart" event. If
   * the recognizer wants to receive other touch events in the series, it has
   * to return "true".
   * @param {!Event} unusedEvent
   * @return {boolean}
   */

  GestureRecognizer.prototype.onTouchStart = function onTouchStart(unusedEvent) {
    return false;
  };

  /**
   * The Gestures instance calls this method for each "touchmove" event. If
   * the recognizer wants to continue receiving touch events in the series,
   * it has to return "true".
   * @param {!Event} unusedEvent
   * @return {boolean}
   */

  GestureRecognizer.prototype.onTouchMove = function onTouchMove(unusedEvent) {
    return false;
  };

  /**
   * The Gestures instance calls this method for the "touchend" event.
   * Somewhere within this touch series the recognizer has to call
   * {@link signalReady} or {@link signalPending} or it will be reset for the
   * next touch series.
   * @param {!Event} unusedEvent
   */

  GestureRecognizer.prototype.onTouchEnd = function onTouchEnd(unusedEvent) {};

  return GestureRecognizer;
})();

exports.GestureRecognizer = GestureRecognizer;

},{"./asserts":7,"./observable":15,"./pass":16,"./timer":19}],11:[function(require,module,exports){
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

},{"./asserts":7}],12:[function(require,module,exports){
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

},{"./url":21,"_process":5}],14:[function(require,module,exports){
exports.__esModule = true;
exports.calcVelocity = calcVelocity;
exports.continueMotion = continueMotion;
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

var _vsync = require('./vsync');

/** @const {!Funtion} */
var NOOP_CALLBACK_ = function () {};

/** @const {number} */
var MIN_VELOCITY_ = 0.02;

/** @const {number} */
var FRAME_CONST_ = 16.67;

/** @const {number} */
var EXP_FRAME_CONST_ = Math.round(-FRAME_CONST_ / Math.log(0.95));

/**
 * Depreciation factor of 1/100 of a millisecond. This is how much previous
 * velocity is depreciated when calculating the new velocity.
 * @const {number}
 */
var VELOCITY_DEPR_FACTOR_ = FRAME_CONST_ * 2;

/**
 * Calculates velocity for an object traveling the distance deltaV in the
 * time deltaTime given the previous velocity prevVelocity. The calculation
 * assumes a basic informational depreciation of previous velocity.
 * @param {number} deltaV
 * @param {time} deltaTime
 * @param {number} prevVelocity
 * @return {number}
 */

function calcVelocity(deltaV, deltaTime, prevVelocity) {
  if (deltaTime < 1) {
    deltaTime = 1;
  }

  // Calculate speed and speed depreciation.
  var speed = deltaV / deltaTime;

  // Depreciation is simply an informational quality. It basically means:
  // we can't ignore the velocity we knew recently, but we'd only consider
  // it proportionally to how long ago we've seen it. Currently, this
  // depreciation factor is 1/100 of a millisecond. New average velocity is
  // calculated by weighing toward the new velocity and away from old
  // velocity based on the depreciation.
  var depr = 0.5 + Math.min(deltaTime / VELOCITY_DEPR_FACTOR_, 0.5);
  return speed * depr + prevVelocity * (1 - depr);
}

/**
 * Returns a motion process that will yield when the velocity has run down to
 * zerp. For each iteration, the velocity is depreciated and the coordinates
 * are advanced from start X/Y to the destination according to velocity
 * vectors. For each such iteration the callback is called with the new x and y.
 * @param {number} startX Start X coordinate.
 * @param {number} startY Start Y coordinate.
 * @param {number} veloX Starting X velocity.
 * @param {number} veloY Starting Y velocity.
 * @param {function(number, number):boolean} callback The callback for each
 *   step of the deceleration motion.
 * @param {!Vsync=} opt_vsync Mostly for testing only.
 * @return {!Motion}
 */

function continueMotion(startX, startY, veloX, veloY, callback, opt_vsync) {
  return new Motion(startX, startY, veloX, veloY, callback, opt_vsync).start_();
}

/**
 * Motion process that allows tracking and monitoring of the running motion.
 * Most importantly it exposes methods "then" and "thenAlways" that have the
 * semantics of a Promise and signal when the motion has completed or failed.
 * Additionally, it exposes the method "halt" which allows to stop/reset the
 * motion.
 * @implements {IThenable}
 */

var Motion = (function () {
  /**
   * @param {number} startX Start X coordinate.
   * @param {number} startY Start Y coordinate.
   * @param {number} veloX Starting X velocity.
   * @param {number} veloY Starting Y velocity.
   * @param {function(number, number):boolean} callback The callback for each
   *   step of the deceleration motion.
   * @param {!Vsync=} opt_vsync
   */

  function Motion(startX, startY, veloX, veloY, callback, opt_vsync) {
    var _this = this;

    babelHelpers.classCallCheck(this, Motion);

    /** @private @const */
    this.vsync_ = opt_vsync || _vsync.vsyncFor(window);

    /** @private @const */
    this.callback_ = callback;

    /** @private {number} */
    this.lastX_ = startX;

    /** @private {number} */
    this.lastY_ = startY;

    /** @private {number} */
    this.maxVelocityX_ = veloX;

    /** @private {number} */
    this.maxVelocityY_ = veloY;

    /** @private {number} */
    this.velocityX_ = 0;

    /** @private {number} */
    this.velocityY_ = 0;

    /** @private {time} */
    this.startTime_ = _timer.timer.now();

    /** @private {time} */
    this.lastTime_ = this.startTime_;

    /** @private {!Function} */
    this.resolve_;

    /** @private {!Function} */
    this.reject_;

    /** @private {!Promise} */
    this.promise_ = new Promise(function (resolve, reject) {
      _this.resolve_ = resolve;
      _this.reject_ = reject;
    });
  }

  /** @private */

  Motion.prototype.start_ = function start_() {
    this.continuing_ = true;
    if (Math.abs(this.maxVelocityX_) <= MIN_VELOCITY_ && Math.abs(this.maxVelocityY_) <= MIN_VELOCITY_) {
      this.fireMove_();
      this.completeContinue_(true);
    } else {
      this.runContinuing_();
    }
    return this;
  };

  /**
   * Halts the motion. The motion promise will be rejected since the motion
   * has been interrupted.
   */

  Motion.prototype.halt = function halt() {
    if (this.continuing_) {
      this.completeContinue_(false);
    }
  };

  /**
   * Chains to the motion's promise that will resolve when the motion has
   * completed or will reject if motion has failed or was interrupted.
   * @param {!Function=} opt_resolve
   * @param {!Function=} opt_reject
   * @return {!Promise}
   */

  Motion.prototype.then = function then(opt_resolve, opt_reject) {
    if (!opt_resolve && !opt_reject) {
      return this.promise_;
    }
    return this.promise_.then(opt_resolve, opt_reject);
  };

  /**
   * Callback for regardless whether the motion succeeds or fails.
   * @param {!Function=} opt_callback
   * @return {!Promise}
   */

  Motion.prototype.thenAlways = function thenAlways(opt_callback) {
    var callback = opt_callback || NOOP_CALLBACK_;
    return this.then(callback, callback);
  };

  /**
   * @return {!Promise}
   * @private
   */

  Motion.prototype.runContinuing_ = function runContinuing_() {
    this.velocityX_ = this.maxVelocityX_;
    this.velocityY_ = this.maxVelocityY_;
    var boundStep = this.stepContinue_.bind(this);
    var boundComplete = this.completeContinue_.bind(this, true);
    return this.vsync_.runAnimMutateSeries(boundStep, 5000).then(boundComplete, boundComplete);
  };

  /**
   * Returns "true" to continue and "false" to stop motion process.
   * @param {time} timeSinceStart
   * @param {time} timeSincePrev
   * @return {boolean}
   * @private
   */

  Motion.prototype.stepContinue_ = function stepContinue_(timeSinceStart, timeSincePrev) {
    if (!this.continuing_) {
      return false;
    }

    this.lastTime_ = _timer.timer.now();
    this.lastX_ += timeSincePrev * this.velocityX_;
    this.lastY_ += timeSincePrev * this.velocityY_;
    if (!this.fireMove_()) {
      return false;
    }

    var decel = Math.exp(-timeSinceStart / EXP_FRAME_CONST_);
    this.velocityX_ = this.maxVelocityX_ * decel;
    this.velocityY_ = this.maxVelocityY_ * decel;
    return Math.abs(this.velocityX_) > MIN_VELOCITY_ || Math.abs(this.velocityY_) > MIN_VELOCITY_;
  };

  /**
   * @param {boolean} success
   * @private
   */

  Motion.prototype.completeContinue_ = function completeContinue_(success) {
    if (!this.continuing_) {
      return;
    }
    this.continuing_ = false;
    this.lastTime_ = _timer.timer.now();
    this.fireMove_();
    if (success) {
      this.resolve_();
    } else {
      this.reject_();
    }
  };

  /** @private */

  Motion.prototype.fireMove_ = function fireMove_() {
    return this.callback_(this.lastX_, this.lastY_);
  };

  return Motion;
})();

},{"./timer":19,"./vsync":22}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./timer":19}],17:[function(require,module,exports){
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

},{"./asserts":7}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
exports.__esModule = true;
exports.all = all;
exports.withCurve = withCurve;
exports.setStyles = setStyles;
exports.numeric = numeric;
exports.spring = spring;
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

var _curve = require('./curve');

var _style = require('./style');

var st = babelHelpers.interopRequireWildcard(_style);

/**
 * TransitionDef function that accepts normtime, typically between 0 and 1 and
 * performs an arbitrary animation action. Notice that sometimes normtime can
 * dip above 1 or below 0. This is an acceptable case for some curves. The
 * second argument is a boolean value that equals "true" for the completed
 * transition and "false" for ongoing.
 * @typedef {function(normtime, boolean):RESULT}
 * @template RESULT
 */

var TransitionDef = function TransitionDef() {
  babelHelpers.classCallCheck(this, TransitionDef);
};

var NOOP = function (unusedTime) {
  return null;
};

exports.NOOP = NOOP;
/**
 * Returns a transition that combines a number of other transitions and
 * invokes them all in parallel.
 * @param {!Array<!TransitionDef>} transitions
 * @return {!TransitionDef<void>}
 */

function all(transitions) {
  return function (time, complete) {
    for (var i = 0; i < transitions.length; i++) {
      var tr = transitions[i];
      tr(time, complete);
    }
  };
}

/**
 * Returns the specified transition with the time curved via specified curve
 * function.
 * @param {!TransitionDef<RESULT>} transition
 * @param {!Curve|string} curve
 * @return {!TransitionDef<RESULT>}
 * @template RESULT
 */

function withCurve(transition, curve) {
  curve = _curve.getCurve(curve);
  return function (time, complete) {
    return transition(complete ? 1 : curve(time), complete);
  };
}

/**
 * A transition that sets the CSS style of the specified element. The styles
 * a specified as a map from CSS property names to transition functions for
 * each of these properties.
 * @param {!Element} element
 * @param {!Object<string, !TransitionDef>} styles
 * @return {!TransitionDef<void>}
 */

function setStyles(element, styles) {
  return function (time, complete) {
    for (var k in styles) {
      st.setStyle(element, k, styles[k](time, complete));
    }
  };
}

/**
 * A basic numeric interpolation.
 * @param {number} start
 * @param {number} end
 * @return {!TransitionDef<number>}
 */

function numeric(start, end) {
  return function (time) {
    return start + (end - start) * time;
  };
}

/**
 * Spring numeric interpolation.
 * @param {number} start
 * @param {number} end
 * @param {number} extended
 * @param {number} threshold
 * @return {!TransitionDef<number>}
 */

function spring(start, end, extended, threshold) {
  if (end == extended) {
    return function (time) {
      return numeric(start, end)(time);
    };
  }
  return function (time) {
    if (time < threshold) {
      return start + (extended - start) * (time / threshold);
    }
    return extended + (end - extended) * ((time - threshold) / (1 - threshold));
  };
}

/**
 * Adds "px" units.
 * @param {!TransitionDef<number>} transition
 * @return {!TransitionDef<string>}
 */

function px(transition) {
  return function (time) {
    return transition(time) + 'px';
  };
}

/**
 * A transition for "translateX" of CSS "transform" property.
 * @param {!TransitionDef<number|string>} transition
 * @return {!TransitionDef<string>}
 */

function translateX(transition) {
  return function (time) {
    var res = transition(time);
    if (typeof res == 'string') {
      return 'translateX(' + res + ')';
    }
    return 'translateX(' + res + 'px)';
  };
}

/**
 * A transition for "translate(x, y)" of CSS "transform" property.
 * @param {!TransitionDef<number|string>} transitionX
 * @param {!TransitionDef<number|string>|undefined} opt_transitionY
 * @return {!TransitionDef<string>}
 */

function translate(transitionX, opt_transitionY) {
  return function (time) {
    var x = transitionX(time);
    if (typeof x == 'number') {
      x = st.px(x);
    }
    if (!opt_transitionY) {
      return 'translate(' + x + ')';
    }

    var y = opt_transitionY(time);
    if (typeof y == 'number') {
      y = st.px(y);
    }
    return 'translate(' + x + ',' + y + ')';
  };
}

/**
 * A transition for "scale" of CSS "transform" property.
 * @param {!TransitionDef<number|string>} transition
 * @return {!TransitionDef<string>}
 */

function scale(transition) {
  return function (time) {
    return 'scale(' + transition(time) + ')';
  };
}

},{"./curve":8,"./style":18}],21:[function(require,module,exports){
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

},{"./asserts":7}],22:[function(require,module,exports){
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

},{"./service":17}]},{},[1])


});
//# sourceMappingURL=amp-carousel-0.1.max.js.map