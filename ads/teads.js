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

import {loadScript} from '../src/3p';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function teads(global, data) {
  // temp for debug purpose
  global.document.cookie = ''//'teadsDebugLevel=all,debug'

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
    content: 'https://a.teads.tv/vast/get/1550',
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

  window.context.observeIntersection(function(changes) {
    changes.forEach(function(c) {
      console.info('TEADS', 'Height of intersection', c.intersectionRect.height);
    });
  });

  loadScript(global, 'https://ebuzzing.github.io/amphtml/ads/teads-format.min.js');
}
