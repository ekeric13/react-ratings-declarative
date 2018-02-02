import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { randomNumber } from './utils';

class Widget extends Component {
  constructor(props) {
    super(props);
    if (props.isPartiallyFullWidget && props.widgetRatedColor) {
      this.fillId = `widgetGrad${randomNumber()}`;
    }
  }

  get
  widgetContainerStyle() {
    const {
      changeRating,
      widgetSpacing,
      inheritWidgetSpacing,
      isFirstWidget,
      isLastWidget,
      ignoreInlineStyles
    } = this.props;

    const widgetContainerStyle = {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      paddingLeft: isFirstWidget ? undefined : widgetSpacing || inheritWidgetSpacing,
      paddingRight: isLastWidget ? undefined : widgetSpacing || inheritWidgetSpacing,
      cursor: changeRating ? 'pointer' : undefined
    };
    return ignoreInlineStyles ? {} : widgetContainerStyle
  }

  get
  widgetSvgStyle() {
    const {
      ignoreInlineStyles,
      isCurrentHoveredWidget,
      widgetDimension,
      inheritWidgetDimension
    } = this.props;
    const widgetSvgStyle = {
      width: widgetDimension || inheritWidgetDimension,
      height: widgetDimension || inheritWidgetDimension,
      transition: 'transform .2s ease-in-out',
      transform: isCurrentHoveredWidget ? 'scale(1.1)' : undefined
    };

    return ignoreInlineStyles ? {} : widgetSvgStyle;
  }

  get
  pathStyle() {
    const {
      isSelected,
      isPartiallyFullWidget,
      isHovered,
      hoverMode,
      widgetEmptyColor,
      widgetRatedColor,
      widgetHoverColor,
      inheritWidgetEmptyColor,
      inheritWidgetRatedColor,
      inheritWidgetHoverColor,
      gradientPathName,
      inheritFillId,
      ignoreInlineStyles
    } = this.props;

    let fill;
    if (hoverMode) {
      if (isHovered) fill = widgetHoverColor || inheritWidgetHoverColor;
      else fill = widgetEmptyColor || inheritWidgetEmptyColor;
    } else {
      if (isPartiallyFullWidget) fill = `url('${gradientPathName}#${this.fillId || inheritFillId}')`;
      else if (isSelected) fill = widgetRatedColor || inheritWidgetRatedColor;
      else fill = widgetEmptyColor || inheritWidgetEmptyColor;
    }

    const pathStyle = {
      fill: fill,
      transition: 'fill .2s ease-in-out',
    };

    return ignoreInlineStyles ? {} : pathStyle;
  }

  get
  widgetClasses() {
    const {
      isSelected,
      isPartiallyFullWidget,
      isHovered,
      isCurrentHoveredWidget,
      ignoreInlineStyles
    } = this.props;

    const widgetClasses = classNames({
      'widget-svg': true,
      'widget-selected': isSelected,
      'multi-widget-selected': isPartiallyFullWidget,
      'hovered': isHovered,
      'current-hovered': isCurrentHoveredWidget
    })

    return ignoreInlineStyles ? {} : widgetClasses
  }

  stopColorStyle(color) {
    const stopColorStyle = {
      stopColor: color,
      stopOpacity: '1'
    };
    return this.props.ignoreInlineStyles ? {} : stopColorStyle;
  }

  get
  offsetValue() {
    const selectedRating = this.props.selectedRating;
    const ratingIsInteger = Number.isInteger(selectedRating);
    let offsetValue = '0%';
    if (!ratingIsInteger) {
      const firstTwoDecimals = selectedRating.toFixed(2).split('.')[1].slice(0, 2);
      offsetValue = `${firstTwoDecimals}%`;
    }
    return offsetValue;
  }

  get
  renderIndividualGradient() {
    const {
      widgetRatedColor,
      widgetEmptyColor,
      inheritWidgetEmptyColor
    } = this.props;
    return (
      <defs>
        <linearGradient id={this.fillId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="stop-color-first" style={this.stopColorStyle(widgetRatedColor)} />
          <stop offset={this.offsetValue} className="stop-color-first" style={this.stopColorStyle(widgetRatedColor)} />
          <stop offset={this.offsetValue} className="stop-color-final" style={this.stopColorStyle(widgetEmptyColor || inheritWidgetEmptyColor)} />
          <stop offset="100%" className="stop-color-final" style={this.stopColorStyle(widgetEmptyColor || inheritWidgetEmptyColor)} />
        </linearGradient>
      </defs>
    );
  }

  render() {
    const {
      changeRating,
      hoverOverWidget,
      unHoverOverWidget,
      isPartiallyFullWidget,
      svgIconPath,
      inheritSvgIconPath,
      svgIconViewBox,
      inheritSvgIconViewBox,
      widgetRatedColor,
      inheritWidgetRatedColor,
      widgetEmptyColor,
      inheritWidgetEmptyColor,
      widgetHoverColor,
      inheritWidgetHoverColor,
      widgetDimension,
      inheritWidgetDimension,
      widgetSpacing,
      inheritWidgetSpacing,
      inheritFillId,
      inheritSvg,
      svg
    } = this.props;
    let customSvg = svg || inheritSvg;
    if (React.isValidElement(customSvg)) {
      customSvg = React.cloneElement(customSvg, {
        ...this.props,
        widgetRatedColor: widgetRatedColor || inheritWidgetRatedColor,
        widgetEmptyColor: widgetEmptyColor || inheritWidgetEmptyColor,
        widgetHoverColor: widgetHoverColor || inheritWidgetHoverColor,
        widgetDimension: widgetDimension || inheritWidgetDimension,
        widgetSpacing: widgetSpacing || inheritWidgetSpacing,
        fillId: this.fillId || inheritFillId
      });
    }
    return (
      <div
        className="widget-container"
        style={this.widgetContainerStyle}
        onMouseEnter={hoverOverWidget}
        onMouseLeave={unHoverOverWidget}
        onClick={changeRating}
      >
        {customSvg ? customSvg :
          <svg
            viewBox={svgIconViewBox || inheritSvgIconViewBox}
            className={this.widgetClasses}
            style={this.widgetSvgStyle}
          >
            {isPartiallyFullWidget && widgetRatedColor ? this.renderIndividualGradient : null}
            <path
              className="widget"
              style={this.pathStyle}
              d={svgIconPath || inheritSvgIconPath}
            />
          </svg>
        }
      </div>
    );
  }
}

Widget.propTypes = {
  selectedRating: PropTypes.number,
  changeRating: PropTypes.func,
  hoverOverWidget: PropTypes.func,
  unHoverOverWidget: PropTypes.func,
  inheritFillId: PropTypes.string,
  isSelected: PropTypes.bool,
  isHovered: PropTypes.bool,
  isCurrentHoveredWidget: PropTypes.bool,
  isPartiallyFullWidget: PropTypes.bool,
  isFirstWidget: PropTypes.bool,
  isLastWidget: PropTypes.bool,
  hoverMode: PropTypes.bool,
  inheritSvgIconPaths: PropTypes.string,
  inheritSvgIconViewBox: PropTypes.string,
  inheritSvg: PropTypes.string,
  inheritWidgetRatedColor: PropTypes.string,
  inheritWidgetEmptyColor: PropTypes.string,
  inheritWidgetHoverColor: PropTypes.string,
  inheritWidgetDimension: PropTypes.string,
  inheritWidgetSpacing: PropTypes.string,

  // customizable
  svgIconPath: PropTypes.string,
  svgIconViewBox: PropTypes.string,
  svg: PropTypes.node,
  widgetRatedColor: PropTypes.string,
  widgetEmptyColor: PropTypes.string,
  widgetHoverColor: PropTypes.string,
  widgetDimension: PropTypes.string,
  widgetSpacing: PropTypes.string,
};

export default Widget;