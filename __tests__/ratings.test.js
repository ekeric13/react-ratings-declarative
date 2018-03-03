import React from 'react';
import Ratings from '../src/index';
import renderer from 'react-test-renderer';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


Math.random = () => .028199039490151;
test('Ratings renders correctly', ()=> {
  const component = renderer.create(
       <Ratings
        rating={2}
        widgetRatedColors="blue"
      >
        <Ratings.Widget />
        <Ratings.Widget
          svgIconViewBox="0 0 106.059 106.059"
          svgIconPath="M90.546,15.518C69.858-5.172,36.199-5.172,15.515,15.513C-5.173,36.198-5.171,69.858,15.517,90.547   c20.682,20.684,54.341,20.684,75.027-0.004C111.23,69.858,111.229,36.2,90.546,15.518z M84.757,84.758   c-17.494,17.494-45.96,17.496-63.455,0.002c-17.498-17.497-17.496-45.966,0-63.46C38.796,3.807,67.261,3.805,84.759,21.302   C102.253,38.796,102.251,67.265,84.757,84.758z M33.24,38.671c0-3.424,2.777-6.201,6.201-6.201c3.423,0,6.2,2.776,6.2,6.201   c0,3.426-2.777,6.202-6.2,6.202C36.017,44.873,33.24,42.097,33.24,38.671z M61.357,38.671c0-3.424,2.779-6.201,6.203-6.201   c3.423,0,6.2,2.776,6.2,6.201c0,3.426-2.776,6.202-6.2,6.202S61.357,42.097,61.357,38.671z M76.017,64.068   c-3.843,8.887-12.843,14.629-22.927,14.629c-10.301,0-19.354-5.771-23.064-14.703c-0.636-1.529,0.089-3.285,1.62-3.921   c0.376-0.155,0.766-0.229,1.15-0.229c1.176,0,2.292,0.695,2.771,1.85c2.777,6.686,9.655,11.004,17.523,11.004   c7.69,0,14.528-4.321,17.42-11.011c0.658-1.521,2.424-2.222,3.944-1.563S76.675,62.548,76.017,64.068z"
        />
        <Ratings.Widget
          widgetDimension="60px"
          svgIconViewBox="0 0 5 5"
          svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
        />
        <Ratings.Widget widgetHoverColor="black" />
        <Ratings.Widget 
        />
      </Ratings>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes rating when clicked', ()=> {
  const INITIAL_RATING = 3;
  let NEXT_RATING;
  const changeRating = (rating) => {
    NEXT_RATING = rating;
  }
  const wrapper = mount(
    <Ratings
      rating={INITIAL_RATING}
      widgetRatedColors="blue"
      changeRating={changeRating}
    >
      <Ratings.Widget />
      <Ratings.Widget
        svgIconViewBox="0 0 106.059 106.059"
        svgIconPath="M90.546,15.518C69.858-5.172,36.199-5.172,15.515,15.513C-5.173,36.198-5.171,69.858,15.517,90.547   c20.682,20.684,54.341,20.684,75.027-0.004C111.23,69.858,111.229,36.2,90.546,15.518z M84.757,84.758   c-17.494,17.494-45.96,17.496-63.455,0.002c-17.498-17.497-17.496-45.966,0-63.46C38.796,3.807,67.261,3.805,84.759,21.302   C102.253,38.796,102.251,67.265,84.757,84.758z M33.24,38.671c0-3.424,2.777-6.201,6.201-6.201c3.423,0,6.2,2.776,6.2,6.201   c0,3.426-2.777,6.202-6.2,6.202C36.017,44.873,33.24,42.097,33.24,38.671z M61.357,38.671c0-3.424,2.779-6.201,6.203-6.201   c3.423,0,6.2,2.776,6.2,6.201c0,3.426-2.776,6.202-6.2,6.202S61.357,42.097,61.357,38.671z M76.017,64.068   c-3.843,8.887-12.843,14.629-22.927,14.629c-10.301,0-19.354-5.771-23.064-14.703c-0.636-1.529,0.089-3.285,1.62-3.921   c0.376-0.155,0.766-0.229,1.15-0.229c1.176,0,2.292,0.695,2.771,1.85c2.777,6.686,9.655,11.004,17.523,11.004   c7.69,0,14.528-4.321,17.42-11.011c0.658-1.521,2.424-2.222,3.944-1.563S76.675,62.548,76.017,64.068z"
      />
      <Ratings.Widget
        widgetDimension="60px"
        svgIconViewBox="0 0 5 5"
        svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
      />
      <Ratings.Widget widgetHoverColor="black"  />
      <Ratings.Widget 
      />
    </Ratings>
  );

  expect(wrapper.prop('rating')).toEqual(INITIAL_RATING);
  let fourthStar = wrapper.find(Ratings.Widget).at(3);
  expect(fourthStar.prop('isSelected')).toBe(false);

  fourthStar.simulate('click');
  wrapper.setProps({rating: NEXT_RATING});

  fourthStar = wrapper.find(Ratings.Widget).at(3);
  expect(fourthStar.prop('isSelected')).toBe(true);
  expect(wrapper.prop('rating')).toEqual(NEXT_RATING);
});