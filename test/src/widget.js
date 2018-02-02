import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { randomNumber } from './utils';

class Widget extends Component {
  constructor(props) {
    super(props);
    if (props.hasCustomGradientColor) {
      this.fillId = `widgetGrad${randomNumber()}`;
    }
  }

  get
  widgetContainerStyle() {
    const {
      changeRating,
      widgetSpacing,
      isFirstWidget,
      isLastWidget,
      ignoreInlineStyles
    } = this.props;

    const widgetContainerStyle = {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      paddingLeft: isFirstWidget ? undefined : widgetSpacing,
      paddingRight: isLastWidget ? undefined : widgetSpacing,
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
    } = this.props;
    const widgetSvgStyle = {
      width: widgetDimension,
      height: widgetDimension,
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
      gradientPathName,
      inheritFillId,
      ignoreInlineStyles
    } = this.props;

    let fill;
    if (hoverMode) {
      if (isHovered) fill = widgetHoverColor;
      else fill = widgetEmptyColor;
    } else {
      if (isPartiallyFullWidget) fill = `url('${gradientPathName}#${this.fillId || inheritFillId}')`;
      else if (isSelected) fill = widgetRatedColor;
      else fill = widgetEmptyColor;
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
    } = this.props;
    return (
      <defs>
        <linearGradient id={this.fillId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="stop-color-first" style={this.stopColorStyle(widgetRatedColor)} />
          <stop offset={this.offsetValue} className="stop-color-first" style={this.stopColorStyle(widgetRatedColor)} />
          <stop offset={this.offsetValue} className="stop-color-final" style={this.stopColorStyle(widgetEmptyColor)} />
          <stop offset="100%" className="stop-color-final" style={this.stopColorStyle(widgetEmptyColor)} />
        </linearGradient>
      </defs>
    );
  }

  render() {
    const {
      changeRating,
      hoverOverWidget,
      unHoverOverWidget,
      inheritFillId,
      svgIconViewBox,
      svgIconPath,
      svg,
      hasCustomGradientColor
    } = this.props;
    let customSvg = svg;
    if (React.isValidElement(customSvg)) {
      customSvg = React.cloneElement(customSvg, {
        ...this.props,
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
            viewBox={svgIconViewBox}
            className={this.widgetClasses}
            style={this.widgetSvgStyle}
          >
            {hasCustomGradientColor ? this.renderIndividualGradient : null}
            <path
              className="widget"
              style={this.pathStyle}
              d={svgIconPath}
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
  hasCustomGradientColor: PropTypes.bool,

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