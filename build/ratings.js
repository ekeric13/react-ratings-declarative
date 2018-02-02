'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _widget = require('./widget');

var _widget2 = _interopRequireDefault(_widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ratings = function (_Component) {
  _inherits(Ratings, _Component);

  function Ratings(props) {
    _classCallCheck(this, Ratings);

    var _this = _possibleConstructorReturn(this, (Ratings.__proto__ || Object.getPrototypeOf(Ratings)).call(this, props));

    _this.unHoverOverWidget = function () {
      _this.setState({
        highestWidgetHovered: -Infinity
      });
    };

    _this.hoverOverWidget = function (rating) {
      return function () {
        _this.setState({
          highestWidgetHovered: rating
        });
      };
    };

    _this.fillId = 'widgetGrad' + (0, _utils.randomNumber)();
    _this.state = {
      highestWidgetHovered: -Infinity
    };
    return _this;
  }

  _createClass(Ratings, [{
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
          widgetEmptyColors = _props.widgetEmptyColors,
          widgetRatedColors = _props.widgetRatedColors;


      return _react2.default.createElement(
        'div',
        {
          className: 'widget-ratings',
          title: this.titleText,
          style: this.widgetRatingsStyle
        },
        _react2.default.createElement(
          'svg',
          {
            className: 'widget-grad',
            style: this.widgetGradientStyle
          },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'linearGradient',
              { id: this.fillId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
              _react2.default.createElement('stop', { offset: '0%', className: 'stop-color-first', style: this.stopColorStyle(widgetRatedColors) }),
              _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-first', style: this.stopColorStyle(widgetRatedColors) }),
              _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-final', style: this.stopColorStyle(widgetEmptyColors) }),
              _react2.default.createElement('stop', { offset: '100%', className: 'stop-color-final', style: this.stopColorStyle(widgetEmptyColors) })
            )
          )
        ),
        this.childrenWithRatingState
      );
    }
  }, {
    key: 'widgetRatingsStyle',
    get: function get() {
      var widgetRatingsStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'inline-block'
      };
      return this.props.ignoreInlineStyles ? {} : widgetRatingsStyle;
    }
  }, {
    key: 'widgetGradientStyle',
    get: function get() {
      var widgetGradientStyle = {
        position: 'absolute',
        zIndex: '0',
        width: '0',
        height: '0',
        visibility: 'hidden'
      };
      return this.props.ignoreInlineStyles ? {} : widgetGradientStyle;
    }
  }, {
    key: 'titleText',
    get: function get() {
      var _props2 = this.props,
          typeOfWidget = _props2.typeOfWidget,
          selectedRating = _props2.rating;

      var hoveredRating = this.state.highestWidgetHovered;
      var currentRating = hoveredRating > 0 ? hoveredRating : selectedRating;
      // fix it at 2 decimal places and remove trailing 0s
      var formattedRating = parseFloat(currentRating.toFixed(2)).toString();
      if (Number.isInteger(currentRating)) {
        formattedRating = String(currentRating);
      }
      var widgetText = typeOfWidget + 's';
      if (formattedRating === '1') {
        widgetText = typeOfWidget;
      }
      return formattedRating + ' ' + widgetText;
    }
  }, {
    key: 'offsetValue',
    get: function get() {
      var rating = this.props.rating;
      var ratingIsInteger = Number.isInteger(rating);
      var offsetValue = '0%';
      if (!ratingIsInteger) {
        var firstTwoDecimals = rating.toFixed(2).split('.')[1].slice(0, 2);
        offsetValue = firstTwoDecimals + '%';
      }
      return offsetValue;
    }
  }, {
    key: 'childrenWithRatingState',
    get: function get() {
      var _this2 = this;

      var _props3 = this.props,
          changeRating = _props3.changeRating,
          selectedRating = _props3.rating,
          children = _props3.children,
          ignoreInlineStyles = _props3.ignoreInlineStyles,
          gradientPathName = _props3.gradientPathName,
          widgetEmptyColors = _props3.widgetEmptyColors,
          widgetHoverColors = _props3.widgetHoverColors,
          widgetRatedColors = _props3.widgetRatedColors,
          widgetDimensions = _props3.widgetDimensions,
          widgetSpacings = _props3.widgetSpacings,
          svgIconPaths = _props3.svgIconPaths,
          svgIconViewBoxes = _props3.svgIconViewBoxes,
          svgs = _props3.svgs;
      var highestWidgetHovered = this.state.highestWidgetHovered;


      var numberOfWidgets = children.length;
      return _react2.default.Children.map(children, function (child, index) {
        var _child$props = child.props,
            svgIconPath = _child$props.svgIconPath,
            svgIconViewBox = _child$props.svgIconViewBox,
            widgetHoverColor = _child$props.widgetHoverColor,
            widgetEmptyColor = _child$props.widgetEmptyColor,
            widgetRatedColor = _child$props.widgetRatedColor,
            widgetDimension = _child$props.widgetDimension,
            widgetSpacing = _child$props.widgetSpacing,
            svg = _child$props.svg;


        var widgetRating = index + 1;
        var isSelected = widgetRating <= selectedRating;

        // hovered only matters when changeRating is true
        var hoverMode = highestWidgetHovered > 0;
        var isHovered = widgetRating <= highestWidgetHovered;
        var isCurrentHoveredWidget = widgetRating === highestWidgetHovered;

        // only matters when changeRating is false
        // given widget 5 and rating 4.2:  5 > 4.2 && 4 < 4.2;
        var isPartiallyFullWidget = widgetRating > selectedRating && widgetRating - 1 < selectedRating;

        var isFirstWidget = widgetRating === 1;
        var isLastWidget = widgetRating === numberOfWidgets;

        return _react2.default.cloneElement(child, {
          selectedRating: selectedRating,
          ignoreInlineStyles: ignoreInlineStyles,
          gradientPathName: gradientPathName,
          changeRating: changeRating ? function () {
            return changeRating(widgetRating);
          } : null,
          hoverOverWidget: changeRating ? _this2.hoverOverWidget(widgetRating) : null,
          unHoverOverWidget: changeRating ? _this2.unHoverOverWidget : null,
          inheritFillId: _this2.fillId,
          isSelected: isSelected,
          isHovered: isHovered,
          isCurrentHoveredWidget: isCurrentHoveredWidget,
          isPartiallyFullWidget: isPartiallyFullWidget,
          isFirstWidget: isFirstWidget,
          isLastWidget: isLastWidget,
          hoverMode: hoverMode,
          hasCustomGradientColor: (widgetRatedColor || widgetEmptyColor) && isPartiallyFullWidget,
          svgIconPath: svgIconPath || svgIconPaths,
          svgIconViewBox: svgIconViewBox || svgIconViewBoxes,
          widgetHoverColor: widgetHoverColor || widgetHoverColors,
          widgetEmptyColor: widgetEmptyColor || widgetEmptyColors,
          widgetRatedColor: widgetRatedColor || widgetRatedColors,
          widgetDimension: widgetDimension || widgetDimensions,
          widgetSpacing: widgetSpacing || widgetSpacings,
          svg: svg || svgs
        });
      });
    }
  }]);

  return Ratings;
}(_react.Component);

Ratings.Widget = _widget2.default;


Ratings.propTypes = {
  rating: _propTypes2.default.number.isRequired,
  typeOfWidget: _propTypes2.default.string.isRequired,
  changeRating: _propTypes2.default.func,
  gradientPathName: _propTypes2.default.string.isRequired,
  ignoreInlineStyles: _propTypes2.default.bool.isRequired,
  svgIconPaths: _propTypes2.default.string.isRequired,
  svgIconViewBoxes: _propTypes2.default.string.isRequired,
  widgetRatedColors: _propTypes2.default.string.isRequired,
  widgetEmptyColors: _propTypes2.default.string.isRequired,
  widgetHoverColors: _propTypes2.default.string.isRequired,
  widgetDimensions: _propTypes2.default.string.isRequired,
  widgetSpacings: _propTypes2.default.string.isRequired,
  svgs: _propTypes2.default.node
};

Ratings.defaultProps = {
  rating: 0,
  typeOfWidget: 'Star',
  changeRating: null,
  ignoreInlineStyles: false,
  gradientPathName: '',
  svgIconPaths: 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z',
  svgIconViewBoxes: '0 0 51 48',
  widgetRatedColors: 'rgb(109, 122, 130)',
  widgetEmptyColors: 'rgb(203, 211, 227)',
  widgetHoverColors: 'rgb(230, 67, 47)',
  widgetDimensions: '50px',
  widgetSpacings: '7px'
};

exports.default = Ratings;