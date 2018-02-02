'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Widget = function (_Component) {
  _inherits(Widget, _Component);

  function Widget(props) {
    _classCallCheck(this, Widget);

    var _this = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this, props));

    if (props.hasCustomGradientColor) {
      _this.fillId = 'widgetGrad' + (0, _utils.randomNumber)();
    }
    return _this;
  }

  _createClass(Widget, [{
    key: 'stopColorStyle',
    value: function stopColorStyle(color) {
      var stopColorStyle = {
        stopColor: color,
        stopOpacity: '1'
      };
      return this.props.ignoreInlineStyles ? {} : stopColorStyle;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          changeRating = _props.changeRating,
          hoverOverWidget = _props.hoverOverWidget,
          unHoverOverWidget = _props.unHoverOverWidget,
          inheritFillId = _props.inheritFillId,
          svgIconViewBox = _props.svgIconViewBox,
          svgIconPath = _props.svgIconPath,
          svg = _props.svg,
          hasCustomGradientColor = _props.hasCustomGradientColor;

      var customSvg = svg;
      if (_react2.default.isValidElement(customSvg)) {
        customSvg = _react2.default.cloneElement(customSvg, _extends({}, this.props, {
          fillId: this.fillId || inheritFillId
        }));
      }
      return _react2.default.createElement(
        'div',
        {
          className: 'widget-container',
          style: this.widgetContainerStyle,
          onMouseEnter: hoverOverWidget,
          onMouseLeave: unHoverOverWidget,
          onClick: changeRating
        },
        customSvg ? customSvg : _react2.default.createElement(
          'svg',
          {
            viewBox: svgIconViewBox,
            className: this.widgetClasses,
            style: this.widgetSvgStyle
          },
          hasCustomGradientColor ? this.renderIndividualGradient : null,
          _react2.default.createElement('path', {
            className: 'widget',
            style: this.pathStyle,
            d: svgIconPath
          })
        )
      );
    }
  }, {
    key: 'widgetContainerStyle',
    get: function get() {
      var _props2 = this.props,
          changeRating = _props2.changeRating,
          widgetSpacing = _props2.widgetSpacing,
          isFirstWidget = _props2.isFirstWidget,
          isLastWidget = _props2.isLastWidget,
          ignoreInlineStyles = _props2.ignoreInlineStyles;


      var widgetContainerStyle = {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft: isFirstWidget ? undefined : widgetSpacing,
        paddingRight: isLastWidget ? undefined : widgetSpacing,
        cursor: changeRating ? 'pointer' : undefined
      };
      return ignoreInlineStyles ? {} : widgetContainerStyle;
    }
  }, {
    key: 'widgetSvgStyle',
    get: function get() {
      var _props3 = this.props,
          ignoreInlineStyles = _props3.ignoreInlineStyles,
          isCurrentHoveredWidget = _props3.isCurrentHoveredWidget,
          widgetDimension = _props3.widgetDimension;

      var widgetSvgStyle = {
        width: widgetDimension,
        height: widgetDimension,
        transition: 'transform .2s ease-in-out',
        transform: isCurrentHoveredWidget ? 'scale(1.1)' : undefined
      };

      return ignoreInlineStyles ? {} : widgetSvgStyle;
    }
  }, {
    key: 'pathStyle',
    get: function get() {
      var _props4 = this.props,
          isSelected = _props4.isSelected,
          isPartiallyFullWidget = _props4.isPartiallyFullWidget,
          isHovered = _props4.isHovered,
          hoverMode = _props4.hoverMode,
          widgetEmptyColor = _props4.widgetEmptyColor,
          widgetRatedColor = _props4.widgetRatedColor,
          widgetHoverColor = _props4.widgetHoverColor,
          gradientPathName = _props4.gradientPathName,
          inheritFillId = _props4.inheritFillId,
          ignoreInlineStyles = _props4.ignoreInlineStyles;


      var fill = void 0;
      if (hoverMode) {
        if (isHovered) fill = widgetHoverColor;else fill = widgetEmptyColor;
      } else {
        if (isPartiallyFullWidget) fill = 'url(\'' + gradientPathName + '#' + (this.fillId || inheritFillId) + '\')';else if (isSelected) fill = widgetRatedColor;else fill = widgetEmptyColor;
      }

      var pathStyle = {
        fill: fill,
        transition: 'fill .2s ease-in-out'
      };

      return ignoreInlineStyles ? {} : pathStyle;
    }
  }, {
    key: 'widgetClasses',
    get: function get() {
      var _props5 = this.props,
          isSelected = _props5.isSelected,
          isPartiallyFullWidget = _props5.isPartiallyFullWidget,
          isHovered = _props5.isHovered,
          isCurrentHoveredWidget = _props5.isCurrentHoveredWidget,
          ignoreInlineStyles = _props5.ignoreInlineStyles;


      var widgetClasses = (0, _classnames2.default)({
        'widget-svg': true,
        'widget-selected': isSelected,
        'multi-widget-selected': isPartiallyFullWidget,
        'hovered': isHovered,
        'current-hovered': isCurrentHoveredWidget
      });

      return ignoreInlineStyles ? {} : widgetClasses;
    }
  }, {
    key: 'offsetValue',
    get: function get() {
      var selectedRating = this.props.selectedRating;
      var ratingIsInteger = Number.isInteger(selectedRating);
      var offsetValue = '0%';
      if (!ratingIsInteger) {
        var firstTwoDecimals = selectedRating.toFixed(2).split('.')[1].slice(0, 2);
        offsetValue = firstTwoDecimals + '%';
      }
      return offsetValue;
    }
  }, {
    key: 'renderIndividualGradient',
    get: function get() {
      var _props6 = this.props,
          widgetRatedColor = _props6.widgetRatedColor,
          widgetEmptyColor = _props6.widgetEmptyColor;

      return _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement(
          'linearGradient',
          { id: this.fillId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
          _react2.default.createElement('stop', { offset: '0%', className: 'stop-color-first', style: this.stopColorStyle(widgetRatedColor) }),
          _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-first', style: this.stopColorStyle(widgetRatedColor) }),
          _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-final', style: this.stopColorStyle(widgetEmptyColor) }),
          _react2.default.createElement('stop', { offset: '100%', className: 'stop-color-final', style: this.stopColorStyle(widgetEmptyColor) })
        )
      );
    }
  }]);

  return Widget;
}(_react.Component);

Widget.propTypes = {
  selectedRating: _propTypes2.default.number,
  changeRating: _propTypes2.default.func,
  hoverOverWidget: _propTypes2.default.func,
  unHoverOverWidget: _propTypes2.default.func,
  inheritFillId: _propTypes2.default.string,
  isSelected: _propTypes2.default.bool,
  isHovered: _propTypes2.default.bool,
  isCurrentHoveredWidget: _propTypes2.default.bool,
  isPartiallyFullWidget: _propTypes2.default.bool,
  isFirstWidget: _propTypes2.default.bool,
  isLastWidget: _propTypes2.default.bool,
  hoverMode: _propTypes2.default.bool,
  hasCustomGradientColor: _propTypes2.default.bool,

  // customizable
  svgIconPath: _propTypes2.default.string,
  svgIconViewBox: _propTypes2.default.string,
  svg: _propTypes2.default.node,
  widgetRatedColor: _propTypes2.default.string,
  widgetEmptyColor: _propTypes2.default.string,
  widgetHoverColor: _propTypes2.default.string,
  widgetDimension: _propTypes2.default.string,
  widgetSpacing: _propTypes2.default.string
};

exports.default = Widget;