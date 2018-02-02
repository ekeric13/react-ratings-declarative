import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { randomNumber } from './utils';

import Widget from './widget';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.fillId = `widgetGrad${randomNumber()}`;
    this.state = {
      highestWidgetHovered: -Infinity
    }
  }
  static Widget = Widget

  get
  widgetRatingsStyle() {
    const widgetRatingsStyle = {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'inline-block'
    };
    return this.props.ignoreInlineStyles ? {} : widgetRatingsStyle;
  }

  get
  widgetGradientStyle() {
    const widgetGradientStyle = {
      position: 'absolute',
      zIndex: '0',
      width: '0',
      height: '0',
      visibility: 'hidden'
    };
    return this.props.ignoreInlineStyles ? {} : widgetGradientStyle;
  }

  stopColorStyle(color) {
    const stopColorStyle = {
      stopColor: color,
      stopOpacity: '1'
    };
    return this.props.ignoreInlineStyles ? {} : stopColorStyle;
  }

  get
  titleText() {
    const {
      typeOfWidget,
      rating: selectedRating
    } = this.props;
    const hoveredRating = this.state.highestWidgetHovered;
    const currentRating = hoveredRating > 0 ? hoveredRating : selectedRating;
    // fix it at 2 decimal places and remove trailing 0s
    let formattedRating = parseFloat(currentRating.toFixed(2)).toString();
    if (Number.isInteger(currentRating)) {
      formattedRating = String(currentRating);
    }
    let widgetText = `${typeOfWidget}s`;
    if (formattedRating === '1') {
      widgetText = typeOfWidget;
    }
    return `${formattedRating} ${widgetText}`;
  }

  get
  offsetValue() {
    const rating = this.props.rating;
    const ratingIsInteger = Number.isInteger(rating);
    let offsetValue = '0%';
    if (!ratingIsInteger) {
      const firstTwoDecimals = rating.toFixed(2).split('.')[1].slice(0, 2);
      offsetValue = `${firstTwoDecimals}%`;
    }
    return offsetValue;
  }

  unHoverOverWidget = () => {
    this.setState({
      highestWidgetHovered: -Infinity
    })
  }

  hoverOverWidget = (rating) => {
    return () => {
      this.setState({
        highestWidgetHovered: rating
      })
    }
  }

  get
  childrenWithRatingState() {
    const {
      changeRating,
      rating: selectedRating,
      children,
      ignoreInlineStyles,
      gradientPathName,
      widgetEmptyColors,
      widgetHoverColors,
      widgetRatedColors,
      widgetDimensions,
      widgetSpacings,
      svgIconPaths,
      svgIconViewBoxes,
      svgs
    } = this.props;
    const { highestWidgetHovered } = this.state;

    const numberOfWidgets = children.length;
    return React.Children.map(children, (child, index) => {
      const {
        svgIconPath,
        svgIconViewBox,
        widgetHoverColor,
        widgetEmptyColor,
        widgetRatedColor,
        widgetDimension,
        widgetSpacing,
        svg
      } = child.props;

      const widgetRating = index + 1;
      const isSelected = widgetRating <= selectedRating;

      // hovered only matters when changeRating is true
      const hoverMode = highestWidgetHovered > 0;
      const isHovered = widgetRating <= highestWidgetHovered;
      const isCurrentHoveredWidget = widgetRating === highestWidgetHovered;

      // only matters when changeRating is false
      // given widget 5 and rating 4.2:  5 > 4.2 && 4 < 4.2;
      const isPartiallyFullWidget = widgetRating > selectedRating && widgetRating - 1 < selectedRating

      const isFirstWidget = widgetRating === 1;
      const isLastWidget = widgetRating === numberOfWidgets;

      return React.cloneElement(child, {
        selectedRating: selectedRating,
        ignoreInlineStyles,
        gradientPathName,
        changeRating: changeRating ? () => changeRating(widgetRating) : null,
        hoverOverWidget: changeRating ? this.hoverOverWidget(widgetRating) : null,
        unHoverOverWidget: changeRating ? this.unHoverOverWidget : null,
        inheritFillId: this.fillId,
        isSelected,
        isHovered,
        isCurrentHoveredWidget,
        isPartiallyFullWidget,
        isFirstWidget,
        isLastWidget,
        hoverMode,
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

  render() {
    const {
      widgetEmptyColors,
      widgetRatedColors
    } = this.props;

    return (
      <div
        className="widget-ratings"
        title={this.titleText}
        style={this.widgetRatingsStyle}
      >
        <svg
          className="widget-grad"
          style={this.widgetGradientStyle}
        >
          <defs>
            <linearGradient id={this.fillId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="stop-color-first" style={this.stopColorStyle(widgetRatedColors)} />
              <stop offset={this.offsetValue} className="stop-color-first" style={this.stopColorStyle(widgetRatedColors)} />
              <stop offset={this.offsetValue} className="stop-color-final" style={this.stopColorStyle(widgetEmptyColors)} />
              <stop offset="100%" className="stop-color-final" style={this.stopColorStyle(widgetEmptyColors)} />
            </linearGradient>
          </defs>
        </svg>
        {this.childrenWithRatingState}
      </div>
    );
  }
}

Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
  typeOfWidget: PropTypes.string.isRequired,
  changeRating: PropTypes.func,
  gradientPathName: PropTypes.string.isRequired,
  ignoreInlineStyles: PropTypes.bool.isRequired,
  svgIconPaths: PropTypes.string.isRequired,
  svgIconViewBoxes: PropTypes.string.isRequired,
  widgetRatedColors: PropTypes.string.isRequired,
  widgetEmptyColors: PropTypes.string.isRequired,
  widgetHoverColors: PropTypes.string.isRequired,
  widgetDimensions: PropTypes.string.isRequired,
  widgetSpacings: PropTypes.string.isRequired,
  svgs: PropTypes.node
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
  widgetSpacings: '7px',
};

export default Ratings;