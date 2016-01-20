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

var _srcAnimation = require('../../../src/animation');

var _srcGesture = require('../../../src/gesture');

var _srcGestureRecognizers = require('../../../src/gesture-recognizers');

var _srcLayout = require('../../../src/layout');

var _srcAsserts = require('../../../src/asserts');

var _srcCurve = require('../../../src/curve');

var _srcMotion = require('../../../src/motion');

var _srcHistory = require('../../../src/history');

var _srcEventHelper = require('../../../src/event-helper');

var _srcLayoutRect = require('../../../src/layout-rect');

var _srcSrcset = require('../../../src/srcset');

var _srcTimer = require('../../../src/timer');

var _srcDom = require('../../../src/dom');

var dom = babelHelpers.interopRequireWildcard(_srcDom);

var _srcStyle = require('../../../src/style');

var st = babelHelpers.interopRequireWildcard(_srcStyle);

var _srcTransition = require('../../../src/transition');

var tr = babelHelpers.interopRequireWildcard(_srcTransition);

/** @private @const {!Object<string, boolean>} */
var SUPPORTED_ELEMENTS_ = {
  'amp-img': true,
  'amp-anim': true
};

/** @private @const {!Curve} */
var ENTER_CURVE_ = _srcCurve.bezierCurve(0.4, -0.3, 0.2, 1);

/** @private @const {!Curve} */
var EXIT_CURVE_ = _srcCurve.bezierCurve(0.4, 0, 0.2, 1);

/** @private @const {!Curve} */
var PAN_ZOOM_CURVE_ = _srcCurve.bezierCurve(0.4, 0, 0.2, 1.4);

/**
 * This class is responsible providing all operations necessary for viewing
 * an image, such as full-bleed display, zoom and pan, etc.
 * @package  Visible for testing only!
 * TODO(dvoytenko): move to the separate file once build system is ready.
 */

var ImageViewer = (function () {
  /**
   * @param {!AmpImageLightbox} lightbox
   */

  function ImageViewer(lightbox) {
    babelHelpers.classCallCheck(this, ImageViewer);

    /** @private {!AmpImageLightbox} */
    this.lightbox_ = lightbox;

    /** @private {!Element} */
    this.viewer_ = document.createElement('div');
    this.viewer_.classList.add('-amp-image-lightbox-viewer');

    /** @private {!Element} */
    this.image_ = document.createElement('img');
    this.image_.classList.add('-amp-image-lightbox-viewer-image');
    this.viewer_.appendChild(this.image_);

    /** @private {?Srcset} */
    this.srcset_ = null;

    /** @private {number} */
    this.sourceWidth_ = 0;

    /** @private {number} */
    this.sourceHeight_ = 0;

    /** @private {!LayoutRect} */
    this.viewerBox_ = _srcLayoutRect.layoutRectLtwh(0, 0, 0, 0);

    /** @private {!LayoutRect} */
    this.imageBox_ = _srcLayoutRect.layoutRectLtwh(0, 0, 0, 0);

    /** @private {number} */
    this.scale_ = 1;
    /** @private {number} */
    this.startScale_ = 1;
    /** @private {number} */
    this.maxSeenScale_ = 1;
    /** @private {number} */
    this.minScale_ = 1;
    /** @private {number} */
    this.maxScale_ = 2;

    /** @private {number} */
    this.startX_ = 0;
    /** @private {number} */
    this.startY_ = 0;
    /** @private {number} */
    this.posX_ = 0;
    /** @private {number} */
    this.posY_ = 0;
    /** @private {number} */
    this.minX_ = 0;
    /** @private {number} */
    this.minY_ = 0;
    /** @private {number} */
    this.maxX_ = 0;
    /** @private {number} */
    this.maxY_ = 0;

    /** @private {?Motion} */
    this.motion_ = null;

    this.setupGestures_();
  }

  /**
   * This class implements "amp-image-lightbox" extension element.
   */

  /**
   * Returns the root element of the image viewer.
   * @return {!Element}
   */

  ImageViewer.prototype.getElement = function getElement() {
    return this.viewer_;
  };

  /**
   * Returns the img element of the image viewer.
   * @return {!Element}
   */

  ImageViewer.prototype.getImage = function getImage() {
    return this.image_;
  };

  /**
   * Returns the boundaries of the viewer.
   * @return {!LayoutRect}
   */

  ImageViewer.prototype.getViewerBox = function getViewerBox() {
    return this.viewerBox_;
  };

  /**
   * Returns the boundaries of the image element.
   * @return {!LayoutRect}
   */

  ImageViewer.prototype.getImageBox = function getImageBox() {
    return this.imageBox_;
  };

  /**
   * Returns the boundaries of the image element with the offset if it was
   * moved by a gesture.
   * @return {!LayoutRect}
   */

  ImageViewer.prototype.getImageBoxWithOffset = function getImageBoxWithOffset() {
    if (this.posX_ == 0 && this.posY_ == 0) {
      return this.imageBox_;
    }
    return _srcLayoutRect.moveLayoutRect(this.imageBox_, this.posX_, this.posY_);
  };

  /**
   * Resets the image viewer to the initial state.
   */

  ImageViewer.prototype.reset = function reset() {
    this.image_.setAttribute('src', '');
    this.srcset_ = null;
    this.imageBox_ = _srcLayoutRect.layoutRectLtwh(0, 0, 0, 0);
    this.sourceWidth_ = 0;
    this.sourceHeight_ = 0;

    this.maxSeenScale_ = 1;
    this.scale_ = 1;
    this.startScale_ = 1;
    this.maxScale_ = 2;

    this.startX_ = 0;
    this.startY_ = 0;
    this.posX_ = 0;
    this.posY_ = 0;
    this.minX_ = 0;
    this.minY_ = 0;
    this.maxX_ = 0;
    this.maxY_ = 0;

    if (this.motion_) {
      this.motion_.halt();
    }
    this.motion_ = null;
  };

  /**
   * Initializes the image viewer to the target image element such as
   * "amp-img". The target image element may or may not yet have the img
   * element initialized.
   * @param {!Element} sourceElement
   * @param {?Element} sourceImage
   */

  ImageViewer.prototype.init = function init(sourceElement, sourceImage) {
    this.sourceWidth_ = sourceElement. /*OK*/offsetWidth;
    this.sourceHeight_ = sourceElement. /*OK*/offsetHeight;
    this.srcset_ = _srcSrcset.parseSrcset(sourceElement.getAttribute('srcset') || sourceElement.getAttribute('src'));
    if (sourceImage && _srcEventHelper.isLoaded(sourceImage) && sourceImage.src) {
      // Set src provisionally to the known loaded value for fast display.
      // It will be updated later.
      this.image_.setAttribute('src', sourceImage.src);
    }
  };

  /**
   * Measures the image viewer and image sizes and positioning.
   * @return {!Promise}
   */

  ImageViewer.prototype.measure = function measure() {
    this.viewerBox_ = _srcLayoutRect.layoutRectFromDomRect(this.viewer_. /*OK*/getBoundingClientRect());

    var sf = Math.min(this.viewerBox_.width / this.sourceWidth_, this.viewerBox_.height / this.sourceHeight_);
    var width = Math.min(this.sourceWidth_ * sf, this.viewerBox_.width);
    var height = Math.min(this.sourceHeight_ * sf, this.viewerBox_.height);

    // TODO(dvoytenko): This is to reduce very small expansions that often
    // look like a stutter. To be evaluated if this is still the right
    // idea.
    if (width - this.sourceWidth_ <= 16) {
      width = this.sourceWidth_;
      height = this.sourceHeight_;
    }

    this.imageBox_ = _srcLayoutRect.layoutRectLtwh(Math.round((this.viewerBox_.width - width) / 2), Math.round((this.viewerBox_.height - height) / 2), Math.round(width), Math.round(height));

    st.setStyles(this.image_, {
      top: st.px(this.imageBox_.top),
      left: st.px(this.imageBox_.left),
      width: st.px(this.imageBox_.width),
      height: st.px(this.imageBox_.height)
    });

    // Reset zoom and pan.
    this.startScale_ = this.scale_ = 1;
    this.startX_ = this.posX_ = 0;
    this.startY_ = this.posY_ = 0;
    this.updatePanZoomBounds_(this.scale_);
    this.updatePanZoom_();

    return this.updateSrc_();
  };

  /**
   * @return {!Promise}
   * @private
   */

  ImageViewer.prototype.updateSrc_ = function updateSrc_() {
    var _this = this;

    this.maxSeenScale_ = Math.max(this.maxSeenScale_, this.scale_);
    var width = this.imageBox_.width * this.maxSeenScale_;
    var src = this.srcset_.select(width, this.lightbox_.getDpr()).url;
    if (src == this.image_.getAttribute('src')) {
      return Promise.resolve();
    }
    // Notice that we will wait until the next event cycle to set the "src".
    // This ensures that the already available image will show immediately
    // and then naturally upgrade to a higher quality image.
    return _srcTimer.timer.promise(1).then(function () {
      _this.image_.setAttribute('src', src);
      return _srcEventHelper.loadPromise(_this.image_);
    });
  };

  /** @private */

  ImageViewer.prototype.setupGestures_ = function setupGestures_() {
    var _this2 = this;

    var gestures = _srcGesture.Gestures.get(this.image_);

    // Toggle viewer mode.
    gestures.onGesture(_srcGestureRecognizers.TapRecognizer, function () {
      _this2.lightbox_.toggleViewMode();
    });

    // Movable.
    gestures.onGesture(_srcGestureRecognizers.SwipeXYRecognizer, function (e) {
      _this2.onMove_(e.data.deltaX, e.data.deltaY, false);
      if (e.data.last) {
        _this2.onMoveRelease_(e.data.velocityX, e.data.velocityY);
      }
    });
    gestures.onPointerDown(function () {
      if (_this2.motion_) {
        _this2.motion_.halt();
      }
    });

    // Zoomable.
    gestures.onGesture(_srcGestureRecognizers.DoubletapRecognizer, function (e) {
      var newScale = undefined;
      if (_this2.scale_ == 1) {
        newScale = _this2.maxScale_;
      } else {
        newScale = _this2.minScale_;
      }
      var deltaX = _this2.viewerBox_.width / 2 - e.data.clientX;
      var deltaY = _this2.viewerBox_.height / 2 - e.data.clientY;
      _this2.onZoom_(newScale, deltaX, deltaY, true).then(function () {
        return _this2.onZoomRelease_(0, 0, 0, 0, 0, 0);
      });
    });
    gestures.onGesture(_srcGestureRecognizers.TapzoomRecognizer, function (e) {
      _this2.onZoomInc_(e.data.centerClientX, e.data.centerClientY, e.data.deltaX, e.data.deltaY);
      if (e.data.last) {
        _this2.onZoomRelease_(e.data.centerClientX, e.data.centerClientY, e.data.deltaX, e.data.deltaY, e.data.velocityY, e.data.velocityY);
      }
    });
  };

  /**
   * Returns value bound to min and max values +/- extent.
   * @param {number} v
   * @param {number} min
   * @param {number} max
   * @param {number} extent
   * @return {number}
   * @private
   */

  ImageViewer.prototype.boundValue_ = function boundValue_(v, min, max, extent) {
    return Math.max(min - extent, Math.min(max + extent, v));
  };

  /**
   * Returns the scale within the allowed range with possible extent.
   * @param {number} s
   * @param {boolean} allowExtent
   * @return {number}
   * @private
   */

  ImageViewer.prototype.boundScale_ = function boundScale_(s, allowExtent) {
    return this.boundValue_(s, this.minScale_, this.maxScale_, allowExtent ? 0.25 : 0);
  };

  /**
   * Returns the X position within the allowed range with possible extent.
   * @param {number} x
   * @param {boolean} allowExtent
   * @return {number}
   * @private
   */

  ImageViewer.prototype.boundX_ = function boundX_(x, allowExtent) {
    return this.boundValue_(x, this.minX_, this.maxX_, allowExtent && this.scale_ > 1 ? this.viewerBox_.width * 0.25 : 0);
  };

  /**
   * Returns the Y position within the allowed range with possible extent.
   * @param {number} y
   * @param {boolean} allowExtent
   * @return {number}
   * @private
   */

  ImageViewer.prototype.boundY_ = function boundY_(y, allowExtent) {
    return this.boundValue_(y, this.minY_, this.maxY_, allowExtent ? this.viewerBox_.height * 0.25 : 0);
  };

  /**
   * Updates X/Y bounds based on the provided scale value. The min/max bounds
   * are calculated to allow full pan of the image regardless of the scale
   * value.
   * @param {number} scale
   * @private
   */

  ImageViewer.prototype.updatePanZoomBounds_ = function updatePanZoomBounds_(scale) {
    var maxY = 0;
    var minY = 0;
    var dh = this.viewerBox_.height - this.imageBox_.height * scale;
    if (dh >= 0) {
      minY = maxY = 0;
    } else {
      minY = dh / 2;
      maxY = -minY;
    }

    var maxX = 0;
    var minX = 0;
    var dw = this.viewerBox_.width - this.imageBox_.width * scale;
    if (dw >= 0) {
      minX = maxX = 0;
    } else {
      minX = dw / 2;
      maxX = -minX;
    }

    this.minX_ = minX;
    this.minY_ = minY;
    this.maxX_ = maxX;
    this.maxY_ = maxY;
  };

  /**
   * Updates pan/zoom of the image based on the current values.
   * @private
   */

  ImageViewer.prototype.updatePanZoom_ = function updatePanZoom_() {
    st.setStyles(this.image_, {
      transform: st.translate(this.posX_, this.posY_) + ' ' + st.scale(this.scale_)
    });
    if (this.scale_ != 1) {
      this.lightbox_.toggleViewMode(true);
    }
  };

  /**
   * Performs a one-step or an animated motion (panning).
   * @param {number} deltaX
   * @param {number} deltaY
   * @param {boolean} animate
   * @private
   */

  ImageViewer.prototype.onMove_ = function onMove_(deltaX, deltaY, animate) {
    var newPosX = this.boundX_(this.startX_ + deltaX, true);
    var newPosY = this.boundY_(this.startY_ + deltaY, true);
    this.set_(this.scale_, newPosX, newPosY, animate);
  };

  /**
   * Performs actions once the motion gesture has been complete. The motion
   * may continue based on the final velocity.
   * @param {number} veloX
   * @param {number} veloY
   * @private
   */

  ImageViewer.prototype.onMoveRelease_ = function onMoveRelease_(veloX, veloY) {
    var _this3 = this;

    var deltaY = this.posY_ - this.startY_;
    if (this.scale_ == 1 && Math.abs(deltaY) > 10) {
      this.lightbox_.close();
      return;
    }

    // Continue motion.
    this.motion_ = _srcMotion.continueMotion(this.posX_, this.posY_, veloX, veloY, function (x, y) {
      var newPosX = _this3.boundX_(x, true);
      var newPosY = _this3.boundY_(y, true);
      if (Math.abs(newPosX - _this3.posX_) < 1 && Math.abs(newPosY - _this3.posY_) < 1) {
        // Hit the wall: stop motion.
        return false;
      }
      _this3.set_(_this3.scale_, newPosX, newPosY, false);
      return true;
    });

    // Snap back.
    this.motion_.thenAlways(function () {
      _this3.motion_ = null;
      return _this3.release_();
    });
  };

  /**
   * Performs a one-step zoom action.
   * @param {number} centerClientX
   * @param {number} centerClientY
   * @param {number} deltaX
   * @param {number} deltaY
   * @private
   */

  ImageViewer.prototype.onZoomInc_ = function onZoomInc_(centerClientX, centerClientY, deltaX, deltaY) {
    var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    var zoomSign = Math.abs(deltaY) > Math.abs(deltaX) ? Math.sign(deltaY) : Math.sign(-deltaX);
    if (zoomSign == 0) {
      return;
    }

    var newScale = this.startScale_ * (1 + zoomSign * dist / 100);
    var deltaCenterX = this.viewerBox_.width / 2 - centerClientX;
    var deltaCenterY = this.viewerBox_.height / 2 - centerClientY;
    deltaX = Math.min(deltaCenterX, deltaCenterX * (dist / 100));
    deltaY = Math.min(deltaCenterY, deltaCenterY * (dist / 100));
    this.onZoom_(newScale, deltaX, deltaY, false);
  };

  /**
   * Performs a one-step or an animated zoom action.
   * @param {number} scale
   * @param {number} deltaX
   * @param {number} deltaY
   * @param {boolean} animate
   * @return {!Promise}
   * @private
   */

  ImageViewer.prototype.onZoom_ = function onZoom_(scale, deltaX, deltaY, animate) {
    var newScale = this.boundScale_(scale, true);
    if (newScale == this.scale_) {
      return;
    }

    this.updatePanZoomBounds_(newScale);

    var newPosX = this.boundX_(this.startX_ + deltaX * newScale, false);
    var newPosY = this.boundY_(this.startY_ + deltaY * newScale, false);
    return this.set_(newScale, newPosX, newPosY, animate);
  };

  /**
   * Performs actions after the gesture that was performing zooming has been
   * released. The zooming may continue based on the final velocity.
   * @param {number} centerClientX
   * @param {number} centerClientY
   * @param {number} deltaX
   * @param {number} deltaY
   * @param {number} veloX
   * @param {number} veloY
   * @return {!Promise}
   * @private
   */

  ImageViewer.prototype.onZoomRelease_ = function onZoomRelease_(centerClientX, centerClientY, deltaX, deltaY, veloX, veloY) {
    var _this4 = this;

    var promise = undefined;
    if (veloX == 0 && veloY == 0) {
      promise = Promise.resolve();
    } else {
      promise = _srcMotion.continueMotion(deltaX, deltaY, veloX, veloY, function (x, y) {
        _this4.onZoomInc_(centerClientX, centerClientY, x, y);
        return true;
      }).thenAlways();
    }

    var relayout = this.scale_ > this.startScale_;
    return promise.then(function () {
      return _this4.release_();
    }).then(function () {
      if (relayout) {
        _this4.updateSrc_();
      }
    });
  };

  /**
   * Sets or animates pan/zoom parameters.
   * @param {number} newScale
   * @param {number} newPosX
   * @param {number} newPosY
   * @param {boolean} animate
   * @return {!Promise}
   * @private
   */

  ImageViewer.prototype.set_ = function set_(newScale, newPosX, newPosY, animate) {
    var _this5 = this;

    var ds = newScale - this.scale_;
    var dx = newPosX - this.posX_;
    var dy = newPosY - this.posY_;
    var dist = Math.sqrt(dx * dx + dy * dy);

    var dur = 0;
    if (animate) {
      var maxDur = 250;
      dur = Math.min(maxDur, Math.max(maxDur * dist * 0.01, // Moving component.
      maxDur * Math.abs(ds))); // Zooming component.
    }

    var promise = undefined;
    if (dur > 16 && animate) {
      (function () {
        var scaleFunc = tr.numeric(_this5.scale_, newScale);
        var xFunc = tr.numeric(_this5.posX_, newPosX);
        var yFunc = tr.numeric(_this5.posY_, newPosY);
        promise = _srcAnimation.Animation.animate(function (time) {
          _this5.scale_ = scaleFunc(time);
          _this5.posX_ = xFunc(time);
          _this5.posY_ = yFunc(time);
          _this5.updatePanZoom_();
        }, dur, PAN_ZOOM_CURVE_).thenAlways(function () {
          _this5.scale_ = newScale;
          _this5.posX_ = newPosX;
          _this5.posY_ = newPosY;
          _this5.updatePanZoom_();
        });
      })();
    } else {
      this.scale_ = newScale;
      this.posX_ = newPosX;
      this.posY_ = newPosY;
      this.updatePanZoom_();
      if (animate) {
        promise = Promise.resolve();
      } else {
        promise = undefined;
      }
    }

    return promise;
  };

  /**
   * Sets or animates pan/zoom parameters after release of the gesture.
   * @return {!Promise}
   * @private
   */

  ImageViewer.prototype.release_ = function release_() {
    var _this6 = this;

    var newScale = this.boundScale_(this.scale_, false);
    if (newScale != this.scale_) {
      this.updatePanZoomBounds_(newScale);
    }
    var newPosX = this.boundX_(this.posX_ / this.scale_ * newScale, false);
    var newPosY = this.boundY_(this.posY_ / this.scale_ * newScale, false);
    return this.set_(newScale, newPosX, newPosY, true).then(function () {
      _this6.startScale_ = _this6.scale_;
      _this6.startX_ = _this6.posX_;
      _this6.startY_ = _this6.posY_;
    });
  };

  return ImageViewer;
})();

exports.ImageViewer = ImageViewer;

var AmpImageLightbox = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpImageLightbox, _AMP$BaseElement);

  function AmpImageLightbox() {
    babelHelpers.classCallCheck(this, AmpImageLightbox);

    _AMP$BaseElement.apply(this, arguments);
  }

  /** @override */

  AmpImageLightbox.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return layout == _srcLayout.Layout.NODISPLAY;
  };

  /** @override */

  AmpImageLightbox.prototype.isReadyToBuild = function isReadyToBuild() {
    return true;
  };

  /** @override */

  AmpImageLightbox.prototype.buildCallback = function buildCallback() {
    var _this7 = this;

    /** @private {number} */
    this.historyId_ = -1;

    /** @private {boolean} */
    this.active_ = false;

    /** @private {boolean} */
    this.entering_ = false;

    /** @private {?Element} */
    this.sourceElement_ = null;

    /** @private {?Element} */
    this.sourceImage_ = null;

    /** @private {?UnlistenDef} */
    this.unlistenViewport_ = null;

    /** @private {!Element} */
    this.container_ = document.createElement('div');
    this.container_.classList.add('-amp-image-lightbox-container');
    this.element.appendChild(this.container_);

    /** @private {!ImageViewer} */
    this.imageViewer_ = new ImageViewer(this);
    this.container_.appendChild(this.imageViewer_.getElement());

    /** @private {!Element} */
    this.captionElement_ = document.createElement('div');
    this.captionElement_.classList.add('amp-image-lightbox-caption');
    this.captionElement_.classList.add('-amp-image-lightbox-caption');
    this.container_.appendChild(this.captionElement_);

    var gestures = _srcGesture.Gestures.get(this.element);
    this.element.addEventListener('click', function (e) {
      if (!_this7.entering_ && !_this7.imageViewer_.getImage().contains(e.target)) {
        _this7.close();
      }
    });
    gestures.onGesture(_srcGestureRecognizers.TapRecognizer, function () {
      if (!_this7.entering_) {
        _this7.close();
      }
    });
    gestures.onGesture(_srcGestureRecognizers.SwipeXYRecognizer, function () {
      // Consume to block scroll events and side-swipe.
    });
  };

  /** @override */

  AmpImageLightbox.prototype.activate = function activate(invocation) {
    var _this8 = this;

    if (this.active_) {
      return;
    }

    var source = invocation.source;
    _srcAsserts.assert(source && SUPPORTED_ELEMENTS_[source.tagName.toLowerCase()], 'Unsupported element: %s', source.tagName);

    this.active_ = true;
    this.reset_();
    this.init_(source);

    /**  @private {function(this:AmpImageLightbox, Event)}*/
    this.boundCloseOnEscape_ = this.closeOnEscape_.bind(this);
    this.getWin().document.documentElement.addEventListener('keydown', this.boundCloseOnEscape_);

    // Prepare to enter in lightbox
    this.requestFullOverlay();
    this.getViewport().disableTouchZoom();

    this.enter_();

    this.unlistenViewport_ = this.getViewport().onChanged(function () {
      if (_this8.active_) {
        _this8.imageViewer_.measure();
      }
    });

    this.getHistory_().push(this.close.bind(this)).then(function (historyId) {
      _this8.historyId_ = historyId;
    });
  };

  /**
   * Handles closing the lightbox when the ESC key is pressed.
   * @param {!Event} event.
   * @private
   */

  AmpImageLightbox.prototype.closeOnEscape_ = function closeOnEscape_(event) {
    if (event.keyCode == 27) {
      this.close();
    }
  };

  /**
   * Closes the lightbox.
   */

  AmpImageLightbox.prototype.close = function close() {
    if (!this.active_) {
      return;
    }
    this.active_ = false;
    this.entering_ = false;

    this.exit_();

    if (this.unlistenViewport_) {
      this.unlistenViewport_();
      this.unlistenViewport_ = null;
    }

    this.cancelFullOverlay();
    this.getViewport().restoreOriginalTouchZoom();
    if (this.historyId_ != -1) {
      this.getHistory_().pop(this.historyId_);
    }
    this.getWin().document.documentElement.removeEventListener('keydown', this.boundCloseOnEscape_);
    this.boundCloseOnEscape_ = null;
  };

  /**
   * Toggles the view mode.
   * @param {boolean=} opt_on
   */

  AmpImageLightbox.prototype.toggleViewMode = function toggleViewMode(opt_on) {
    if (opt_on !== undefined) {
      this.container_.classList.toggle('-amp-image-lightbox-view-mode', opt_on);
    } else {
      this.container_.classList.toggle('-amp-image-lightbox-view-mode');
    }
  };

  /**
   * @param {!Element} sourceElement
   * @param {!Element} sourceImage
   * @private
   */

  AmpImageLightbox.prototype.init_ = function init_(sourceElement) {
    this.sourceElement_ = sourceElement;

    // Initialize the viewer.
    this.sourceImage_ = dom.elementByTag(sourceElement, 'img');
    this.imageViewer_.init(this.sourceElement_, this.sourceImage_);

    // Discover caption.
    var caption = null;

    // 1. Check <figure> and <figcaption>.
    if (!caption) {
      var figure = dom.closestByTag(sourceElement, 'figure');
      if (figure) {
        caption = dom.elementByTag(figure, 'figcaption');
      }
    }

    // 2. Check "aria-describedby".
    if (!caption) {
      var describedBy = sourceElement.getAttribute('aria-describedby');
      caption = document.getElementById(describedBy);
    }

    if (caption) {
      dom.copyChildren(caption, this.captionElement_);
    }
    this.captionElement_.classList.toggle('-amp-empty', !caption);
  };

  /** @private */

  AmpImageLightbox.prototype.reset_ = function reset_() {
    this.imageViewer_.reset();
    dom.removeChildren(this.captionElement_);
    this.sourceElement_ = null;
    this.sourceImage_ = null;
    this.toggleViewMode(false);
  };

  /**
   * @return {!Promise}
   * @private
   */

  AmpImageLightbox.prototype.enter_ = function enter_() {
    var _this9 = this;

    this.entering_ = true;

    st.setStyles(this.element, {
      opacity: 0,
      display: ''
    });
    this.imageViewer_.measure();

    var anim = new _srcAnimation.Animation();
    var dur = 500;

    // Lightbox background fades in.
    anim.add(0, tr.setStyles(this.element, {
      opacity: tr.numeric(0, 1)
    }), 0.6, ENTER_CURVE_);

    // Try to transition from the source image.
    var transLayer = null;
    if (this.sourceImage_ && _srcEventHelper.isLoaded(this.sourceImage_) && this.sourceImage_.src) {
      transLayer = document.createElement('div');
      transLayer.classList.add('-amp-image-lightbox-trans');
      document.body.appendChild(transLayer);

      var rect = _srcLayoutRect.layoutRectFromDomRect(this.sourceImage_. /*OK*/getBoundingClientRect());
      var clone = this.sourceImage_.cloneNode(true);
      st.setStyles(clone, {
        position: 'absolute',
        top: st.px(rect.top),
        left: st.px(rect.left),
        width: st.px(rect.width),
        height: st.px(rect.height)
      });
      transLayer.appendChild(clone);

      this.sourceImage_.classList.add('-amp-ghost');

      // Move the image to the location given by the lightbox.
      var imageBox = this.imageViewer_.getImageBox();
      var dx = imageBox.left - rect.left;
      var dy = imageBox.top - rect.top;
      // Duration will be somewhere between 0.2 and 0.8 depending on how far
      // the image needs to move.
      var motionTime = Math.max(0.2, Math.min(0.8, Math.abs(dy) / 250 * 0.8));
      anim.add(0, tr.setStyles(clone, {
        transform: tr.translate(tr.numeric(0, dx), tr.numeric(0, dy))
      }), motionTime, ENTER_CURVE_);

      // Fade in the container. This will mostly affect the caption.
      st.setStyles(this.container_, { opacity: 0 });
      anim.add(0.8, tr.setStyles(this.container_, {
        opacity: tr.numeric(0, 1)
      }), 0.1, ENTER_CURVE_);

      // At the end, fade out the transition image.
      anim.add(0.9, tr.setStyles(transLayer, {
        opacity: tr.numeric(1, 0.01)
      }), 0.1, EXIT_CURVE_);
    }

    return anim.start(dur).thenAlways(function () {
      _this9.entering_ = false;
      st.setStyles(_this9.element, { opacity: '' });
      st.setStyles(_this9.container_, { opacity: '' });
      if (transLayer) {
        document.body.removeChild(transLayer);
      }
    });
  };

  /**
   * @return {!Promise}
   * @private
   */

  AmpImageLightbox.prototype.exit_ = function exit_() {
    var _this10 = this;

    var image = this.imageViewer_.getImage();
    var imageBox = this.imageViewer_.getImageBoxWithOffset();

    var anim = new _srcAnimation.Animation();
    var dur = 500;

    // Lightbox background fades out.
    anim.add(0, tr.setStyles(this.element, {
      opacity: tr.numeric(1, 0)
    }), 0.9, EXIT_CURVE_);

    // Try to transition to the source image.
    var transLayer = null;
    if (_srcEventHelper.isLoaded(image) && image.src && this.sourceImage_) {
      (function () {
        transLayer = document.createElement('div');
        transLayer.classList.add('-amp-image-lightbox-trans');
        document.body.appendChild(transLayer);

        var rect = _srcLayoutRect.layoutRectFromDomRect(_this10.sourceImage_. /*OK*/getBoundingClientRect());
        var newLeft = imageBox.left + (imageBox.width - rect.width) / 2;
        var newTop = imageBox.top + (imageBox.height - rect.height) / 2;
        var clone = image.cloneNode(true);
        st.setStyles(clone, {
          position: 'absolute',
          top: st.px(newTop),
          left: st.px(newLeft),
          width: st.px(rect.width),
          height: st.px(rect.height),
          transform: ''
        });
        transLayer.appendChild(clone);

        // Fade out the container.
        anim.add(0, tr.setStyles(_this10.container_, {
          opacity: tr.numeric(1, 0)
        }), 0.1, EXIT_CURVE_);

        // Move the image back to where it is in the article.
        var dx = rect.left - newLeft;
        var dy = rect.top - newTop;
        var move = tr.setStyles(clone, {
          transform: tr.translate(tr.numeric(0, dx), tr.numeric(0, dy))
        });
        // Duration will be somewhere between 0.2 and 0.8 depending on how far
        // the image needs to move. Start the motion later too, but no later
        // than 0.2.
        var motionTime = Math.max(0.2, Math.min(0.8, Math.abs(dy) / 250 * 0.8));
        anim.add(Math.min(0.8 - motionTime, 0.2), function (time, complete) {
          move(time);
          if (complete) {
            _this10.sourceImage_.classList.remove('-amp-ghost');
          }
        }, motionTime, EXIT_CURVE_);

        // Fade out the transition image.
        anim.add(0.8, tr.setStyles(transLayer, {
          opacity: tr.numeric(1, 0.01)
        }), 0.2, EXIT_CURVE_);

        // Duration will be somewhere between 300ms and 700ms depending on
        // how far the image needs to move.
        dur = Math.max(Math.min(Math.abs(dy) / 250 * dur, dur), 300);
      })();
    }

    return anim.start(dur).thenAlways(function () {
      if (_this10.sourceImage_) {
        _this10.sourceImage_.classList.remove('-amp-ghost');
      }
      st.setStyles(_this10.element, {
        display: 'none',
        opacity: ''
      });
      st.setStyles(_this10.container_, { opacity: '' });
      if (transLayer) {
        document.body.removeChild(transLayer);
      }
      _this10.reset_();
    });
  };

  /** @private {!History} */

  AmpImageLightbox.prototype.getHistory_ = function getHistory_() {
    return _srcHistory.historyFor(this.element.ownerDocument.defaultView);
  };

  return AmpImageLightbox;
})(AMP.BaseElement);

AMP.registerElement('amp-image-lightbox', AmpImageLightbox, "amp-image-lightbox{position:fixed!important;z-index:1000!important;top:0!important;left:0!important;bottom:0!important;right:0!important;margin:0!important;padding:0!important;overflow:hidden!important;-webkit-transform:translateZ(0)!important;transform:translateZ(0)!important;-ms-touch-action:none!important;touch-action:none!important;background:rgba(0,0,0,.95);color:#f2f2f2}.-amp-image-lightbox-container{position:absolute;z-index:0;top:0;left:0;right:0;bottom:0;overflow:hidden;-webkit-transform:translateZ(0);transform:translateZ(0)}.-amp-image-lightbox-trans{pointer-events:none!important;position:fixed;z-index:1001;top:0;left:0;bottom:0;right:0}.-amp-image-lightbox-caption{position:absolute!important;z-index:2!important;bottom:0!important;left:0!important;right:0!important}.-amp-image-lightbox-caption.-amp-empty,.-amp-image-lightbox-view-mode .-amp-image-lightbox-caption{visibility:hidden}.amp-image-lightbox-caption{background:rgba(0,0,0,.5);max-height:25%;padding:8px}.-amp-image-lightbox-viewer{position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;overflow:hidden;-webkit-transform:translateZ(0);transform:translateZ(0)}.-amp-image-lightbox-viewer-image{position:absolute;z-index:1;display:block;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}\n/*# sourceURL=/extensions/amp-image-lightbox/0.1/amp-image-lightbox.css*/");

},{"../../../src/animation":3,"../../../src/asserts":4,"../../../src/curve":5,"../../../src/dom":6,"../../../src/event-helper":7,"../../../src/gesture":9,"../../../src/gesture-recognizers":8,"../../../src/history":10,"../../../src/layout":12,"../../../src/layout-rect":11,"../../../src/motion":15,"../../../src/srcset":19,"../../../src/style":20,"../../../src/timer":21,"../../../src/transition":22}],2:[function(require,module,exports){
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

},{"./curve":5,"./log":13,"./timer":21,"./vsync":24}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./timer":21}],8:[function(require,module,exports){
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

},{"./gesture":9,"./motion":15,"./timer":21}],9:[function(require,module,exports){
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

},{"./asserts":4,"./observable":16,"./pass":17,"./timer":21}],10:[function(require,module,exports){
exports.__esModule = true;
exports.historyFor = historyFor;
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
 * Returns service implemented in service/history-impl.
 * @param {!Window} window
 * @return {!History}
 */

function historyFor(window) {
  return _service.getService(window, 'history');
}

;

},{"./service":18}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./asserts":4}],13:[function(require,module,exports){
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

},{"./mode":14}],14:[function(require,module,exports){
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

},{"./url":23,"_process":2}],15:[function(require,module,exports){
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

},{"./timer":21,"./vsync":24}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./timer":21}],18:[function(require,module,exports){
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

},{"./asserts":4}],19:[function(require,module,exports){
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

},{"./asserts":4}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./curve":5,"./style":20}],23:[function(require,module,exports){
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

},{"./asserts":4}],24:[function(require,module,exports){
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

},{"./service":18}]},{},[1])


});
//# sourceMappingURL=amp-image-lightbox-0.1.max.js.map