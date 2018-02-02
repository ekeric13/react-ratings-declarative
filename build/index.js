'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _widgetRatings = require('./widget-ratings');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_widgetRatings).default;
  }
});

var _widget = require('./widget');

Object.defineProperty(exports, 'Widget', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_widget).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }