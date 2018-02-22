# React Ratings Declarative

> A customizable rating component for selecting x widgets or visualizing x widgets. SVG stars that show aggregate star ratings to the hundreths decimal point.

## [Install](https://www.npmjs.com/package/react-ratings-declarative)

```shell
npm install --save react-ratings-declarative
```

## Demo

### [codepen playground](https://codepen.io/ekeric13/project/full/DkJYpA/)


### Demo Example Image

![](http://i.imgur.com/5CwWVam.png)

## Usage

```js
import Ratings from 'react-ratings-declarative';

class Foo extends Component {
    changeRating( newRating ) {
      this.setState({
        rating: newRating
      });
    }

    render() {
      return (
          <Ratings
            rating={this.state.rating}
            widgetRatedColors="blue"
            changeRating={this.changeRating}
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget
              widgetDimension="60px"
              svgIconViewBox="0 0 5 5"
              svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
            />
            <Ratings.Widget widgetHoverColor="black" />
            <Ratings.Widget />
          </Ratings>
      );
    }
}


class Bar extends Component {
  render() {
    return (
      <Ratings
        rating={3.403}
        widgetDimensions="40px"
        widgetSpacings="15px"
      >
        <Ratings.Widget widgetRatedColor="green" />
        <Ratings.Widget widgetSpacing="30px" widgetDimension="15px" />
        <Ratings.Widget widgetRatedColor="black" />
        <Ratings.Widget widgetRatedColor="rebeccapurple" />
        <Ratings.Widget />
      </Ratings>
    );
  }
}
```

## API

### Ratings

| Prop | Type | Default | Description | Example |
| ---- | ---- | ------- | ----------- | ------- |
| rating | number | 0 | The user's rating. Number of widgets to highlight. | `3` |
| typeOfWidget | string | 'Star' | The type of widget used as a rating meter | `Point` |
| changeRating | function | ()=>{} | Callback that will be passed the new rating a user selects | `const setNewRating = (rating) => this.props.dispatch( fooActions.setRating(rating) )` |
| gradientPathName | string | '' | gradientPathname needed if app's path is not at the root | `/app/` |
| ignoreInlineStyles | boolean | false | ignore all the inline styles and write your own css using the provided classes | `true` | 
| svgIconPaths | string | 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z' | Set a path that describes the svg shape for all the children | 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z' |
| svgIconViewBoxes | string | '0 0 51 48' | Set the view box for a custom svg path you might have for all the children | '0 0 51 48' |
| svgs | node | none | Use a custom svg or react element for all the children | `<svg><circle /></svg>` |
| widgetRatedColors | string | 'rgb(109, 122, 130)' | Color of widgets that the user has rated, applied to all the children | `black` |
| widgetEmptyColors | string | 'rgb(203, 211, 227)' | Color of widgets that the use hasn't rated, applied to all the children | `grey` |
| widgetHoverColors | string | 'rgb(230, 67, 47)' | Color of widget when hovering over it in selection mode, applied to all the children | `yellow` |
| widgetDimensions | string | '50px' | The width and height of the star, applied to all the children | `15px` |
| widgetSpacings | string | '7px' | The spacing between the widgets, applied to all the children | `0` |

### Widget

| Prop | Type | Default | Description | Example |
| ---- | ---- | ------- | ----------- | ------- |
| svgIconPath | string | 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z' | Set a path that describes the svg shape | 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z' |
| svgIconViewBox | string | '0 0 51 48' | Set the view box for a custom svg path you might have | '0 0 51 48' |
| svg | node | none | Use a custom svg or react element | `<svg><circle /></svg>` |
| widgetRatedColor | string | 'rgb(109, 122, 130)' | Color of widgets that the user has rated | `black` |
| widgetEmptyColor | string | 'rgb(203, 211, 227)' | Color of widgets that the use hasn't rated | `grey` |
| widgetHoverColor | string | 'rgb(230, 67, 47)' | Color of star when hovering over it in selection mode | `yellow` |
| widgetDimension | string | '50px' | The width and height of the widget | `15px` |
| widgetSpacing | string | '7px' | The spacing between the widgets | `0` |


## Browser Support

Supports Chrome, safari, firefox, edge, and ie 9+.
The widget is SVG, so this library fails for any browser that doesn't support svg.


### Potential Gradient Path Name Issue

I use the css property `fill: 'url(#starGrad<randomNum>)';` to fill in just a percentage of a star. It has some weird bugs depending on the pathname of the app. Normally SPA's have `window.location.pathname === '/'`, but if you append `window.location.origin` with the pathname of say `app`, so that `window.location.pathname === '/app/'`, then you need a gradientPathName of `'/app/'`.

Here is a stackoverflow post that I found that was related to this issue: http://stackoverflow.com/questions/36774188/svg-internal-url-links-and-iframes-on-wirecloud

## Contribute

If you want to contribute: Make changes in the src folder. And then run `make build`.
The `make build` command compiles react and es6 stuff using babel from `src/` into `build/`.
