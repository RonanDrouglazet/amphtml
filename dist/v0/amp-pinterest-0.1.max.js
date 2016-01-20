(window.AMP = window.AMP || []).push(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2015 The AMP HTML Authors.
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
 * @fileoverview Shows a Pinterest widget.
 * Examples:
 * <code>
 *
 * <amp-pinterest height=20 width=40
 *   data-do="buttonPin"
 *   data-url="http://www.flickr.com/photos/kentbrew/6851755809/"
 *   data-media="http://farm8.staticflickr.com/7027/6851755809_df5b2051c9_z.jpg"
 *   data-description="Next stop: Pinterest">
 * </amp-pinterest>
 *
 * <amp-pinterest width=245 height=330
 *   data-do="embedPin"
 *   data-url="https://www.pinterest.com/pin/99360735500167749/">
 * </amp-pinterest>
 *
 * </code>
 */

var _srcLayout = require('../../../src/layout');

var _followButton = require('./follow-button');

var _pinitButton = require('./pinit-button');

var _pinWidget = require('./pin-widget');

/**
 * AMP Pinterest
 * @attr data-do
 *    - buttonPin: Pin It button
 *    - buttonFollow: User follow button
 */

var AmpPinterest = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpPinterest, _AMP$BaseElement);

  function AmpPinterest() {
    babelHelpers.classCallCheck(this, AmpPinterest);

    _AMP$BaseElement.apply(this, arguments);
  }

  /** @override */

  AmpPinterest.prototype.preconnectCallback = function preconnectCallback(onLayout) {
    // preconnect to widget APIpinMedia
    this.preconnect.url('https://widgets.pinterest.com', onLayout);
  };

  /** @override */

  AmpPinterest.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /** @override */

  AmpPinterest.prototype.layoutCallback = function layoutCallback() {
    var _this = this;

    var selector = AMP.assert(this.element.getAttribute('data-do'), 'The data-do attribute is required for <amp-pinterest> %s', this.element);

    return this.render(selector).then(function (node) {
      return _this.element.appendChild(node);
    });
  };

  AmpPinterest.prototype.render = function render(selector) {
    switch (selector) {
      case 'embedPin':
        return new _pinWidget.PinWidget(this.element).render();
      case 'buttonPin':
        return new _pinitButton.PinItButton(this.element).render();
      case 'buttonFollow':
        return new _followButton.FollowButton(this.element).render();
    }
    return Promise.resolve('Invalid selector: ', selector);
  };

  return AmpPinterest;
})(AMP.BaseElement);

;

AMP.registerElement('amp-pinterest', AmpPinterest, ".-amp-pinterest-round{height:16px;width:16px;background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_round_red_16_2.png);background-size:16px 16px}.-amp-pinterest-round-tall{height:32px;width:32px;background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_round_red_32_2.png);background-size:32px 32px}.-amp-pinterest-rect{height:20px;width:40px;background:url() 0 -20px no-repeat;background-size:40px 60px}.-amp-pinterest-rect:hover{background-position:0 0}.-amp-pinterest-rect:active{background-position:0 -40px}.-amp-pinterest-en-gray{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_rect_gray_20_2.png)}.-amp-pinterest-en-red{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_rect_red_20_2.png)}.-amp-pinterest-en-white{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_rect_white_20_2.png)}.-amp-pinterest-ja-gray{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_ja_rect_gray_20_2.png)}.-amp-pinterest-ja-red{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_ja_rect_red_20_2.png)}.-amp-pinterest-ja-white{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_ja_rect_white_20_2.png)}.-amp-pinterest-rect-tall{height:28px;width:56px;background:url() 0 -28px no-repeat;background-size:56px 84px}.-amp-pinterest-rect-tall:hover{background-position:0 0}.-amp-pinterest-rect-tall:active{background-position:0 -56px}.-amp-pinterest-en-gray-tall{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_rect_gray_28_2.png)}.-amp-pinterest-en-red-tall{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_rect_red_28_2.png)}.-amp-pinterest-en-white-tall{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_en_rect_white_28_2.png)}.-amp-pinterest-ja-gray-tall{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_ja_rect_gray_28_2.png)}.-amp-pinterest-ja-red-tall{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_ja_rect_red_28_2.png)}.-amp-pinterest-ja-white-tall{background-image:url(https://s-passets.pinimg.com/images/pidgets/pinit_bg_ja_rect_white_28_2.png)}.-amp-pinterest-count-pad-above{margin-top:30px}.-amp-pinterest-count-pad-above-tall{margin-top:38px}.-amp-pinterest-bubble-above{bottom:21px;height:29px;width:40px;background:transparent url(https://s-passets.pinimg.com/images/pidgets/count_north_white_rect_20_2.png) 0 0 no-repeat;background-size:40px 29px;font:12px Arial,Helvetica,sans-serif;line-height:24px}.-amp-pinterest-bubble-above,.-amp-pinterest-bubble-above-tall{position:absolute;left:0;text-align:center;text-decoration:none;color:#777}.-amp-pinterest-bubble-above-tall{bottom:29px;height:37px;width:56px;background:transparent url(https://s-passets.pinimg.com/images/pidgets/count_north_white_rect_28_2.png) 0 0 no-repeat;background-size:56px 37px;font:15px Arial,Helvetica,sans-serif;line-height:28px}.-amp-pinterest-count-pad-beside{width:86px}.-amp-pinterest-count-pad-beside-tall{width:120px}.-amp-pinterest-bubble-beside{height:20px;width:45px;text-indent:5px;background:transparent url(https://s-passets.pinimg.com/images/pidgets/count_east_white_rect_20_2.png) 0 0 no-repeat;background-size:45px 20px;font:12px Arial,Helvetica,sans-serif;line-height:20px}.-amp-pinterest-bubble-beside,.-amp-pinterest-bubble-beside-tall{position:absolute;top:0;right:0;text-align:center;text-decoration:none;color:#777}.-amp-pinterest-bubble-beside-tall{height:28px;width:63px;text-indent:7px;background:transparent url(https://s-passets.pinimg.com/images/pidgets/count_east_white_rect_28_2.png) 0 0 no-repeat;background-size:63px 28px;font:15px Arial,Helvetica,sans-serif;line-height:28px}.-amp-pinterest-follow-button{background:transparent url(https://s-passets.pinimg.com/images/pidgets/bfs2.png) 0 0 no-repeat;background-size:200px 60px;border-right:1px solid #d0d0d0;border-radius:4px;color:#444;cursor:pointer;display:inline-block;font:700 normal normal 11px/20px Helvetica Neue,helvetica,arial,san-serif;padding-right:3px;position:relative;text-decoration:none;text-indent:20px}.-amp-pinterest-follow-button:hover{background-position:0 -20px;border-right-color:#919191}.-amp-pinterest-follow-button i{background-image:url(https://s-passets.pinimg.com/images/pidgets/log2.png);background-size:14px 14px;height:14px;left:3px;position:absolute;top:3px;width:14px}.-amp-pinterest-embed-pin,.-amp-pinterest-embed-pin-medium{padding:5px;width:237px}.-amp-pinterest-embed-pin-medium{width:345px}.-amp-pinterest-embed-pin-inner{display:block;position:relative;-webkit-font-smoothing:antialiased;cursor:pointer;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.33);border-radius:3px;width:100%}.-amp-pinterest-embed-pin-text{color:#a8a8a8;white-space:normal;font-family:Helvetica Neue,arial,sans-serif;font-size:11px;line-height:18px;font-weight:700}.-amp-pinterest-embed-pin-image{border-radius:3px 3px 0 0}.-amp-pinterest-embed-pin-text-block{display:block;line-height:30px;padding:0 12px}.-amp-pinterest-embed-pin-text-icon-attrib{height:16px;width:16px;vertical-align:middle}.-amp-pinterest-embed-pin-stats{height:16px;line-height:16px;padding:8px 12px}.-amp-pinterest-embed-pin-stats-likes{padding-left:14px;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAAAAAClR+AmAAAAUElEQVR4AT2HMQpFIQwEc/+zbXhFLBW8QUihIAT2E8Q/xe6M0Jv2zK7NKUcBzAlAjzjqtdZl4c8S2nOjMPS6BoWMr/wLVnAbYJs3mGMkXzx+OeRqUf5HHRoAAAAASUVORK5CYII=) 0 2px no-repeat}.-amp-pinterest-embed-pin-stats-repins{padding:0 10px 0 18px;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAAAAABq7uO+AAAASklEQVQI10WNMQrAMBRCvf/Z3pQcImPplsIPdqhNXOSJqLxVtnWQsuUO9IM3cHlV8dSSDZQHAOPH2YA2FU+qtH7MRhaVh/xt/PQCEW6N4EV+CPEAAAAASUVORK5CYII=) 0 0 no-repeat}.-amp-pinterest-embed-pin-description{color:#363636;font-weight:400;font-size:14px;line-height:17px;padding-top:5px}.-amp-pinterest-embed-pin-pinner{padding:12px;border-top:1px solid rgba(0,0,0,.09)}.-amp-pinterest-embed-pin-pinner-avatar{border-radius:15px;border:none;height:30px;width:30px;vertical-align:middle;margin:0 8px 12px 0;float:left}.-amp-pinterest-embed-pin-board-name,.-amp-pinterest-embed-pin-pinner-name{display:block;height:15px;line-height:15px}.-amp-pinterest-embed-pin-pinner-name{color:#777}.-amp-pinterest-embed-pin-repin{position:absolute;top:12px;left:12px;cursor:pointer}\n/*# sourceURL=/extensions/amp-pinterest/0.1/amp-pinterest.css*/");

},{"../../../src/layout":7,"./follow-button":2,"./pin-widget":3,"./pinit-button":4}],2:[function(require,module,exports){
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

var _util = require('./util');

// Popup options
var POP_FOLLOW = 'status=no,resizable=yes,scrollbars=yes,\n  personalbar=no,directories=no,location=no,toolbar=no,\n  menubar=no,width=1040,height=640,left=0,top=0';

/**
 * Pinterest Follow Button
 * @attr data-href:  the url of the user's profile to follow
 * @attr data-label: the text to display (user's full name)
 */

var FollowButton = (function () {

  /** @param {!Element} rootElement */

  function FollowButton(rootElement) {
    babelHelpers.classCallCheck(this, FollowButton);

    AMP.assert(rootElement.getAttribute('data-href'), 'The data-href attribute is required for follow buttons');
    AMP.assert(rootElement.getAttribute('data-label'), 'The data-label attribute is required for follow buttons');
    this.element = rootElement;
    this.label = rootElement.getAttribute('data-label');
    this.href = _srcUrl.assertHttpsUrl(rootElement.getAttribute('data-href'));
  }

  /**
   * Override the default href click handling to log and open popup
   * @param {Event} event: the HTML event object
   */

  FollowButton.prototype.handleClick = function handleClick(event) {
    event.preventDefault();
    window.open(this.href, 'pin' + new Date().getTime(), POP_FOLLOW);
    _util.Util.log('&type=button_follow&href=' + this.href);
  };

  /**
   * Render the follow button
   * @returns {Element}
   */

  FollowButton.prototype.renderTemplate = function renderTemplate() {
    var followButton = _util.Util.make({ 'a': {
        'class': '-amp-pinterest-follow-button',
        href: this.href,
        textContent: this.label
      } });
    followButton.appendChild(_util.Util.make({ 'i': {} }));
    followButton.onclick = this.handleClick.bind(this);
    return followButton;
  };

  /**
   * Prepare the render data, create the node and add handlers
   * @returns {!Promise}
   */

  FollowButton.prototype.render = function render() {
    // Add trailing slash?
    if (this.href.substr(-1) !== '/') {
      this.href += '/';
    }
    this.href += 'pins/follow/?guid=' + _util.Util.guid;

    return Promise.resolve(this.renderTemplate());
  };

  return FollowButton;
})();

exports.FollowButton = FollowButton;

},{"../../../src/url":9,"./util":5}],3:[function(require,module,exports){
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

var _srcXhr = require('../../../src/xhr');

var _util = require('./util');

// Popup options
var POP = 'status=no,resizable=yes,scrollbars=yes,' + 'personalbar=no,directories=no,location=no,toolbar=no,' + 'menubar=no,width=900,height=500,left=0,top=0';

/**
 * Pinterest Pin Widget
 * @attr data-url: the source url for the Pin
 */

var PinWidget = (function () {

  /** @param {!Element} rootElement */

  function PinWidget(rootElement) {
    babelHelpers.classCallCheck(this, PinWidget);

    AMP.assert(rootElement.getAttribute('data-url'), 'The data-url attribute is required for Pin widgets');
    this.element = rootElement;
    this.xhr = _srcXhr.xhrFor(rootElement.ownerDocument.defaultView);
  }

  /**
   * Override the default href click handling to log and open popup
   * @param {Event} event: the HTML event object
   */

  PinWidget.prototype.handleClick = function handleClick(event) {
    event.preventDefault();
    var el = event.target;
    var shouldPop = el.getAttribute('data-pin-pop') || false;
    var href = el.getAttribute('data-pin-href');
    var log = el.getAttribute('data-pin-log');
    if (href) {
      if (shouldPop) {
        window.open(href, '_pinit', POP);
      } else {
        window.open(href + '?amp=1&guid=' + _util.Util.guid, '_blank');
      }
    }
    if (log) {
      _util.Util.log('&type=' + log);
    }
  };

  PinWidget.prototype.fetchPin = function fetchPin() {
    var baseUrl = 'https://widgets.pinterest.com/v3/pidgets/pins/info/?';
    var query = 'pin_ids=' + this.pinId + '&sub=www&base_scheme=https';
    return this.xhr.fetchJson(baseUrl + query).then(function (response) {
      try {
        return response.data[0];
      } catch (e) {
        return null;
      }
    });
  };

  PinWidget.prototype.renderPin = function renderPin(pin) {
    // start setting our class name
    var className = '-amp-pinterest-embed-pin';
    var imgUrl = _srcUrl.assertHttpsUrl(pin.images['237x'].url);

    // large widgets may come later
    if (this.width === 'medium' || this.width === 'large') {
      className = className + '-medium';
      imgUrl = imgUrl.replace(/237/, '345');
      _util.Util.log('&type=pidget&pin_count_medium=1');
    } else {
      _util.Util.log('&type=pidget&pin_count=1');
    }

    var structure = _util.Util.make({ 'span': {} });
    structure.className = className + ' -amp-fill-content';

    var container = _util.Util.make({ 'span': {
        'className': '-amp-pinterest-embed-pin-inner',
        'data-pin-log': 'embed_pin'
      } });

    var img = _util.Util.make({ 'img': {
        'src': imgUrl,
        'className': '-amp-pinterest-embed-pin-image',
        'data-pin-no-hover': true,
        'data-pin-href': 'https://www.pinterest.com/pin/' + pin.id + '/',
        'data-pin-log': 'embed_pin_img'
      } });
    container.appendChild(img);

    // repin button
    var repin = _util.Util.make({ 'span': {
        'className': '-amp-pinterest-rect -amp-pinterest-en-red' + ' -amp-pinterest-embed-pin-repin',
        'data-pin-log': 'embed_pin_repin',
        'data-pin-pop': '1',
        'data-pin-href': 'https://www.pinterest.com/pin/' + pin.id + '/repin/x/?amp=1&guid=' + _util.Util.guid
      } });
    container.appendChild(repin);

    // text container
    var text = _util.Util.make({ 'span': {
        'className': '-amp-pinterest-embed-pin-text'
      } });

    // description
    if (pin.description) {
      var description = _util.Util.make({ 'span': {
          'className': '-amp-pinterest-embed-pin-text-block ' + '-amp-pinterest-embed-pin-description',
          'textContent': _util.Util.filter(pin.description)
        } });
      text.appendChild(description);
    }

    // attribution
    if (pin.attribution) {
      var attribution = _util.Util.make({ 'span': {
          'className': '-amp-pinterest-embed-pin-text-block' + ' -amp-pinterest-embed-pin-attribution'
        } });
      attribution.appendChild(_util.Util.make({ 'img': {
          'className': '-amp-pinterest-embed-pin-text-icon-attrib',
          'src': pin.attribution.provider_icon_url
        } }));
      attribution.appendChild(_util.Util.make({ 'span': {
          'textContent': ' by '
        } }));
      attribution.appendChild(_util.Util.make({ 'span': {
          'data-pin-href': pin.attribution.url,
          'textContent': _util.Util.filter(pin.attribution.author_name)
        } }));
      text.appendChild(attribution);
    }

    // likes and repins
    if (pin.repin_count || pin.like_count) {
      var stats = _util.Util.make({ 'span': {
          'className': '-amp-pinterest-embed-pin-text-block' + ' -amp-pinterest-embed-pin-stats'
        } });
      if (pin.repin_count) {
        var repinCount = _util.Util.make({ 'span': {
            'className': '-amp-pinterest-embed-pin-stats-repins',
            'textContent': String(pin.repin_count)
          } });
        stats.appendChild(repinCount);
      }

      if (pin.like_count) {
        var likeCount = _util.Util.make({ 'span': {
            'className': '-amp-pinterest-embed-pin-stats-likes',
            'textContent': String(pin.like_count)
          } });
        stats.appendChild(likeCount);
      }
      text.appendChild(stats);
    }

    // pinner
    if (pin.pinner) {

      var pinner = _util.Util.make({ 'span': {
          'className': '-amp-pinterest-embed-pin-text-block' + ' -amp-pinterest-embed-pin-pinner'
        } });

      // avatar
      pinner.appendChild(_util.Util.make({ 'img': {
          'className': '-amp-pinterest-embed-pin-pinner-avatar',
          'alt': _util.Util.filter(pin.pinner.full_name),
          'title': _util.Util.filter(pin.pinner.full_name),
          'src': pin.pinner.image_small_url,
          'data-pin-href': pin.pinner.profile_url
        } }));

      // name
      pinner.appendChild(_util.Util.make({ 'span': {
          'className': '-amp-pinterest-embed-pin-pinner-name',
          'textContent': _util.Util.filter(pin.pinner.full_name),
          'data-pin-href': pin.pinner.profile_url
        } }));

      // board
      pinner.appendChild(_util.Util.make({ 'span': {
          'className': '-amp-pinterest-embed-pin-board-name',
          'textContent': _util.Util.filter(pin.board.name),
          'data-pin-href': 'https://www.pinterest.com/' + pin.board.url
        } }));

      text.appendChild(pinner);
    }

    container.appendChild(text);
    structure.appendChild(container);

    // listen for clicks
    structure.addEventListener('click', this.handleClick.bind(this));

    // done
    return structure;
  };

  PinWidget.prototype.render = function render() {
    this.pinUrl = this.element.getAttribute('data-url');
    this.width = this.element.getAttribute('data-width');

    this.pinId = '';
    try {
      this.pinId = this.pinUrl.split('/pin/')[1].split('/')[0];
    } catch (err) {
      return;
    }

    return this.fetchPin().then(this.renderPin.bind(this));
  };

  return PinWidget;
})();

exports.PinWidget = PinWidget;
;

},{"../../../src/url":9,"../../../src/xhr":10,"./util":5}],4:[function(require,module,exports){
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

var _srcXhr = require('../../../src/xhr');

var _util = require('./util');

// Popup options
var POP = 'status=no,resizable=yes,scrollbars=yes,' + 'personalbar=no,directories=no,location=no,toolbar=no,' + 'menubar=no,width=900,height=500,left=0,top=0';

/**
 * Pinterest Pinit Button
 * @attr data-url: the source url for the Pin
 * @attr data-media: the url of the Pin image/media
 * @attr data-description: the description of the Pin
 *
 * OPTIONAL
 * @attr data-color: the button color from [red, white, gray]
 * @attr data-count: the position of the Pin count from [beside, above]
 * @attr data-lang:  the language of the button from [en, ja]
 * @attr data-round: should the button be round (true if set)
 * @attr data-tall:  should the button be tall  (true if set)
 */

var PinItButton = (function () {

  /** @param {!Element} rootElement */

  function PinItButton(rootElement) {
    babelHelpers.classCallCheck(this, PinItButton);

    AMP.assert(rootElement.getAttribute('data-url'), 'The data-url attribute is required for Pin It buttons');
    AMP.assert(rootElement.getAttribute('data-media'), 'The data-media attribute is required for Pin It buttons');
    AMP.assert(rootElement.getAttribute('data-description'), 'The data-description attribute is required for Pin It buttons');
    this.element = rootElement;
    this.xhr = _srcXhr.xhrFor(rootElement.ownerDocument.defaultView);
    this.color = rootElement.getAttribute('data-color');
    this.count = rootElement.getAttribute('data-count');
    this.lang = rootElement.getAttribute('data-lang');
    this.round = rootElement.getAttribute('data-round');
    this.tall = rootElement.getAttribute('data-tall');
    this.description = rootElement.getAttribute('data-description');
  }

  /**
   * Override the default href click handling to log and open popup
   * @param {Event} event: the HTML event object
   */

  PinItButton.prototype.handleClick = function handleClick(event) {
    event.preventDefault();
    window.open(this.href, '_pinit', POP);
    _util.Util.log('&type=button_pinit');
  };

  /**
   * Fetch the remote Pin count for the source URL
   * @param {Event} evt: the HTML event object
   * @returns {Promise}
   */

  PinItButton.prototype.fetchCount = function fetchCount() {
    var url = 'https://widgets.pinterest.com/v1/urls/count.json?return_jsonp=false&url=' + this.url;
    return this.xhr.fetchJson(url);
  };

  /**
   * Pretty print the Pin count with english suffixes
   * @param {number} count: the Pin count for the source URL
   * @returns {string}
   */

  PinItButton.prototype.formatPinCount = function formatPinCount(count) {
    if (count > 999) {
      if (count < 1000000) {
        count = parseInt(count / 1000, 10) + 'K+';
      } else {
        if (count < 1000000000) {
          count = parseInt(count / 1000000, 10) + 'M+';
        } else {
          count = '++';
        }
      }
    }
    return count;
  };

  /**
   * Render helper for the optional count bubble
   * @param {string} count: the data-count attribute
   * @param {string} heightClass: the height class to apply for spacing
   * @returns {string}
   */

  PinItButton.prototype.renderCount = function renderCount(count, heightClass) {
    _util.Util.log('&type=pidget&button_count=1');
    return _util.Util.make({ 'span': {
        'class': '-amp-pinterest-bubble-' + this.count + heightClass,
        textContent: this.formatPinCount(count)
      } });
  };

  /**
   * Render the follow button
   * @param {number} count: optional Pin count for the source URL
   * @returns {Element}
   */

  PinItButton.prototype.renderTemplate = function renderTemplate(count) {
    var CLASS = {
      shape: this.round ? '-round' : '-rect',
      height: this.tall ? '-tall' : '',
      lang: this.lang === 'ja' ? '-ja' : '-en',
      color: ['red', 'white'].indexOf(this.color) !== -1 ? this.color : 'gray'
    };

    var clazz = ['-amp-pinterest' + CLASS.shape + CLASS.height, '-amp-fill-content'];

    var countBubble = '';
    if (!this.round) {
      clazz.push('-amp-pinterest' + CLASS.lang + '-' + CLASS.color + CLASS.height);
      if (count) {
        clazz.push('-amp-pinterest-count-pad-' + this.count + CLASS.height);
        countBubble = this.renderCount(count.count, CLASS.height);
      }
    }

    var pinitButton = _util.Util.make({ 'a': {
        'class': clazz.join(' '),
        href: this.href
      } });

    if (countBubble) {
      pinitButton.appendChild(countBubble);
    }
    pinitButton.onclick = this.handleClick.bind(this);
    return pinitButton;
  };

  /**
   * Prepare the render data, create the node and add handlers
   * @returns {!Promise}
   */

  PinItButton.prototype.render = function render() {
    this.description = encodeURIComponent(this.description);
    this.media = encodeURIComponent(this.element.getAttribute('data-media'));
    this.url = encodeURIComponent(this.element.getAttribute('data-url'));

    var query = ['amp=1', 'guid=' + _util.Util.guid, 'url=' + this.url, 'media=' + this.media, 'description=' + this.description].join('&');
    this.href = 'https://www.pinterest.com/pin/create/button/?' + query;

    var promise = undefined;
    if (this.count === 'above' || this.count === 'beside') {
      promise = this.fetchCount();
    } else {
      promise = Promise.resolve();
    }
    return promise.then(this.renderTemplate.bind(this));
  };

  return PinItButton;
})();

exports.PinItButton = PinItButton;
;

},{"../../../src/xhr":10,"./util":5}],5:[function(require,module,exports){
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

// characters to be used in the creation of guids
var BASE60 = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz';

// make a 12-digit base-60 number for performance tracking
var guid = '';
for (var i = 0; i < 12; i = i + 1) {
  guid = guid + BASE60.substr(Math.floor(Math.random() * 60), 1);
}

/**
 * Prepare the render data, create the node and add handlers
 * @param {string} queryParams - optional query string to append
 */
function log(queryParams) {
  var call = new Image();
  var query = 'https://log.pinterest.com/?guid=' + guid;
  query = query + '&amp=1';
  if (queryParams) {
    query = query + queryParams;
  }
  query = query + '&via=' + encodeURIComponent(window.location.href);
  call.src = query;
};

/**
 * Strip data from string
 * @param {string} str - the string to filter
 * @returns {string}
 */
function filter(str) {
  var decoded = undefined,
      ret = undefined;
  decoded = '';
  ret = '';
  try {
    decoded = decodeURIComponent(str);
  } catch (e) {}
  ret = decoded.replace(/</g, '&lt;');
  ret = ret.replace(/>/g, '&gt;');
  return ret;
};

/**
 * Create a DOM element with attributes
 * @param {Object} data - the string to filter
 * @returns {DOMElement}
 */
function make(data) {
  var el = false,
      tag = undefined,
      attr = undefined;
  for (tag in data) {
    el = document.createElement(tag);
    for (attr in data[tag]) {
      if (typeof data[tag][attr] === 'string') {
        set(el, attr, data[tag][attr]);
      }
    }
    break;
  }
  return el;
};

/**
 * Set a DOM element attribute
 * @param {DOMElement} data - the string to filter
 * @param {string} attr - the attribute key
 * @param {string} value - the attribute value
 */
function set(el, attr, value) {
  if (typeof el[attr] === 'string') {
    el[attr] = value;
  } else {
    el.setAttribute(attr, value);
  }
};

var Util = {
  filter: filter,
  guid: guid,
  log: log,
  make: make,
  set: set
};
exports.Util = Util;

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

},{"./asserts":6}],8:[function(require,module,exports){
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

},{"./asserts":6}],9:[function(require,module,exports){
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

},{"./asserts":6}],10:[function(require,module,exports){
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

},{"./asserts":6,"./service":8}]},{},[1])


});
//# sourceMappingURL=amp-pinterest-0.1.max.js.map