import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.35;
const slideWidth = wp(82);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin ;
const entryBorderRadius = 3;

export default StyleSheet.create({
  slider: {
    marginTop: 16
  },
  sliderContainer: {
  },

  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
  },

  imageContainer: {
    borderRadius: entryBorderRadius,
    height: viewportHeight * 0.25,
    margin: itemHorizontalMargin,

    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 12},
    elevation: 10
  },
  image: {
    resizeMode: 'cover',
    width: viewportWidth * 0.8,
    height: viewportHeight * 0.25,
    borderRadius: entryBorderRadius,
  },
  title: {
    color: '#999',
    marginBottom: 4,
    fontSize: 14,
    letterSpacing: 2.5,
    textAlign: 'center',
  },
});