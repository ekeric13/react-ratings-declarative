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

    if (props.isPartiallyFullWidget && props.widgetRatedColor) {
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
          isPartiallyFullWidget = _props.isPartiallyFullWidget,
          svgIconPath = _props.svgIconPath,
          inheritSvgIconPath = _props.inheritSvgIconPath,
          svgIconViewBox = _props.svgIconViewBox,
          inheritSvgIconViewBox = _props.inheritSvgIconViewBox,
          widgetRatedColor = _props.widgetRatedColor,
          inheritWidgetRatedColor = _props.inheritWidgetRatedColor,
          widgetEmptyColor = _props.widgetEmptyColor,
          inheritWidgetEmptyColor = _props.inheritWidgetEmptyColor,
          widgetHoverColor = _props.widgetHoverColor,
          inheritWidgetHoverColor = _props.inheritWidgetHoverColor,
          widgetDimension = _props.widgetDimension,
          inheritWidgetDimension = _props.inheritWidgetDimension,
          widgetSpacing = _props.widgetSpacing,
          inheritWidgetSpacing = _props.inheritWidgetSpacing,
          inheritFillId = _props.inheritFillId,
          inheritSvg = _props.inheritSvg,
          svg = _props.svg;

      var customSvg = svg || inheritSvg;
      if (_react2.default.isValidElement(customSvg)) {
        customSvg = _react2.default.cloneElement(customSvg, _extends({}, this.props, {
          widgetRatedColor: widgetRatedColor || inheritWidgetRatedColor,
          widgetEmptyColor: widgetEmptyColor || inheritWidgetEmptyColor,
          widgetHoverColor: widgetHoverColor || inheritWidgetHoverColor,
          widgetDimension: widgetDimension || inheritWidgetDimension,
          widgetSpacing: widgetSpacing || inheritWidgetSpacing,
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
            viewBox: svgIconViewBox || inheritSvgIconViewBox,
            className: this.widgetClasses,
            style: this.widgetSvgStyle
          },
          isPartiallyFullWidget && widgetRatedColor ? this.renderIndividualGradient : null,
          _react2.default.createElement('path', {
            className: 'widget',
            style: this.pathStyle,
            d: svgIconPath || inheritSvgIconPath
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
          inheritWidgetSpacing = _props2.inheritWidgetSpacing,
          isFirstWidget = _props2.isFirstWidget,
          isLastWidget = _props2.isLastWidget,
          ignoreInlineStyles = _props2.ignoreInlineStyles;


      var widgetContainerStyle = {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft: isFirstWidget ? undefined : widgetSpacing || inheritWidgetSpacing,
        paddingRight: isLastWidget ? undefined : widgetSpacing || inheritWidgetSpacing,
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
          widgetDimension = _props3.widgetDimension,
          inheritWidgetDimension = _props3.inheritWidgetDimension;

      var widgetSvgStyle = {
        width: widgetDimension || inheritWidgetDimension,
        height: widgetDimension || inheritWidgetDimension,
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
          inheritWidgetEmptyColor = _props4.inheritWidgetEmptyColor,
          inheritWidgetRatedColor = _props4.inheritWidgetRatedColor,
          inheritWidgetHoverColor = _props4.inheritWidgetHoverColor,
          gradientPathName = _props4.gradientPathName,
          inheritFillId = _props4.inheritFillId,
          ignoreInlineStyles = _props4.ignoreInlineStyles;


      var fill = void 0;
      if (hoverMode) {
        if (isHovered) fill = widgetHoverColor || inheritWidgetHoverColor;else fill = widgetEmptyColor || inheritWidgetEmptyColor;
      } else {
        if (isPartiallyFullWidget) fill = 'url(\'' + gradientPathName + '#' + (this.fillId || inheritFillId) + '\')';else if (isSelected) fill = widgetRatedColor || inheritWidgetRatedColor;else fill = widgetEmptyColor || inheritWidgetEmptyColor;
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
          widgetEmptyColor = _props6.widgetEmptyColor,
          inheritWidgetEmptyColor = _props6.inheritWidgetEmptyColor;

      return _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement(
          'linearGradient',
          { id: this.fillId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
          _react2.default.createElement('stop', { offset: '0%', className: 'stop-color-first', style: this.stopColorStyle(widgetRatedColor) }),
          _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-first', style: this.stopColorStyle(widgetRatedColor) }),
          _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-final', style: this.stopColorStyle(widgetEmptyColor || inheritWidgetEmptyColor) }),
          _react2.default.createElement('stop', { offset: '100%', className: 'stop-color-final', style: this.stopColorStyle(widgetEmptyColor || inheritWidgetEmptyColor) })
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
  inheritSvgIconPaths: _propTypes2.default.string,
  inheritSvgIconViewBox: _propTypes2.default.string,
  inheritWidgetRatedColor: _propTypes2.default.string,
  inheritWidgetEmptyColor: _propTypes2.default.string,
  inheritWidgetHoverColor: _propTypes2.default.string,
  inheritWidgetDimension: _propTypes2.default.string,
  inheritWidgetSpacing: _propTypes2.default.string,

  // customizable
  svgIconPath: _propTypes2.default.string,
  svgIconViewBox: _propTypes2.default.string,
  widgetRatedColor: _propTypes2.default.string,
  widgetEmptyColor: _propTypes2.default.string,
  widgetHoverColor: _propTypes2.default.string,
  widgetDimension: _propTypes2.default.string,
  widgetSpacing: _propTypes2.default.string,
  svg: _propTypes2.default.node
};

exports.default = Widget;