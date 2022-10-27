import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { Touchable } from './src';
import { noop } from './src/utils';

const sharpEasingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 0.6, 1),
};

const durationValues = {
  entry: 225,
  exit: 195,
};

const moveEasingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1),
};

const styles = StyleSheet.create({
  addButton: {
    borderRadius: 20,
    alignItems: 'stretch',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: {
      height: -12,
      width: 0,
    },
    elevation: 5,
  },
  fab_box: {
    position: 'absolute',
    bottom: 4,
    right: 12,
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  addButtonInnerView: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class FAB extends Component {
  static propTypes = {
    buttonColor: PropTypes.string,
    iconTextColor: PropTypes.string,
    onClickAction: PropTypes.func,
    iconTextComponent: PropTypes.element,
    visible: PropTypes.bool,
    snackOffset: PropTypes.number,
  }

  static defaultProps = {
    buttonColor: 'red',
    iconTextColor: '#FFFFFF',
    onClickAction: noop,
    iconTextComponent: <Text>+</Text>,
    visible: true,
    snackOffset: 0,
  };

  state = {
    translateValue: new Animated.Value(0),
    shiftValue: new Animated.Value(0),
  };

  componentDidMount() {
    const { translateValue, shiftValue } = this.state;
    const { visible, snackOffset } = this.props;

    if (visible) {
      translateValue.setValue(1);
    } else {
      translateValue.setValue(0);
    }
    if (snackOffset === 0) {
      shiftValue.setValue(20);
    } else {
      shiftValue.setValue(20 + snackOffset);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { translateValue, shiftValue } = this.state;
    const { visible } = this.props;

    if ((nextProps.visible) && (!visible)) {
      Animated.timing(
        translateValue,
        {
          duration: durationValues.entry,
          toValue: 1,
          easing: sharpEasingValues.entry,
        },
      ).start();
    } else if ((!nextProps.visible) && (visible)) {
      Animated.timing(
        translateValue,
        {
          duration: durationValues.exit,
          toValue: 0,
          easing: sharpEasingValues.exit,
        },
      ).start();
    }
    if (nextProps.snackOffset !== this.props.snackOffset) {
      if (nextProps.snackOffset === 0) {
        Animated.timing(
          shiftValue,
          {
            duration: durationValues.exit,
            toValue: 20,
            easing: moveEasingValues.exit,
          },
        ).start();
      } else if (nextProps.snackOffset !== 0) {
        Animated.timing(
          shiftValue,
          {
            duration: durationValues.entry,
            toValue: 20 + nextProps.snackOffset,
            easing: moveEasingValues.entry,
          },
        ).start();
      }
    }
  }

  render() {
    const {
      translateValue, shiftValue,
    } = this.state;
    const {
      onClickAction,
      buttonColor,
      iconTextComponent,
      iconTextColor,
    } = this.props;

    const dimensionInterpolate = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 42],
    });

    const rotateInterpolate = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '0deg'],
    });

    return (
      <Animated.View style={[styles.fab_box, { bottom: shiftValue }]}>
        <Animated.View
          style={[
            styles.addButton, {
              height: dimensionInterpolate,
              width: dimensionInterpolate,
            },
          ]}
        >
          <Touchable
            onPress={onClickAction}
            style={styles.addButtonInnerView}
            buttonColor={buttonColor}
          >
            <Animated.Text
              style={{
                transform: [
                  { scaleX: translateValue },
                  { rotate: rotateInterpolate },
                ],
                fontSize: 24,
              }}
            >
              {React.cloneElement(iconTextComponent, { style: {
                fontSize: 18,
                color: iconTextColor,
              } })}
            </Animated.Text>
          </Touchable>
        </Animated.View>
      </Animated.View>
    );
  }
}

