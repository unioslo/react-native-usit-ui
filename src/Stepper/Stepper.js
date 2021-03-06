// @flow
import React from 'react';
import { Dimensions, View } from 'react-native';
import StepperButton from './StepperButton';
import StepperValue from './StepperValue';

import { colors } from '../styles';

const { height, width } = Dimensions.get('window');

type StepperProps = {
  interval: number,
  longHoldInterval: number,
  minValue: number,
  maxValue: number,
  color: string,
  initialValue?: number,
  onChange: (result: number) => void,
};

type StepperState = {
  value: number,
};

class Stepper extends React.Component<StepperProps, StepperState> {
  static defaultProps = {
    onChange: () => {},
    interval: 0.5,
    longHoldInterval: 2,
    minValue: 0,
    maxValue: Number.MAX_VALUE,
    color: colors.primary,
  };

  constructor(props: StepperProps) {
    super(props);

    this.state = {
      value: props.initialValue || props.minValue,
    };
  }

  increase(interval: number) {
    const tempNew: number = isNumber(this.state.value)
      ? Number(this.state.value) + interval
      : this.props.minValue;
    const newValue = Math.min(tempNew, this.props.maxValue);
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  decrease(interval: number) {
    const tempNew = isNumber(this.state.value)
      ? Number(this.state.value) - interval
      : this.props.minValue;

    const newValue = Math.max(tempNew, this.props.minValue);
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  render() {
    const {
      color,
      interval,
      longHoldInterval,
      minValue,
      maxValue,
    } = this.props;
    const { value } = this.state;

    return (
      <View
        style={{
          flexDirection: 'row',
          borderColor: color,
          width: width * 0.45,
          height: height * 0.075,
          borderRadius: 5,
          borderWidth: 2,
        }}
      >
        <StepperButton
          iconName="remove"
          color={color}
          action={interval => this.decrease(interval)}
          interval={interval}
          longHoldInterval={longHoldInterval}
          enabled={isNumber(value) && Number(value) >= minValue + interval}
        />
        <StepperValue color={color} value={value} />
        <StepperButton
          iconName="add"
          color={color}
          action={interval => this.increase(interval)}
          interval={interval}
          longHoldInterval={longHoldInterval}
          enabled={!isNumber(value) || Number(value) <= maxValue - interval}
        />
      </View>
    );
  }
}

function isNumber(something: any): boolean {
  return typeof something === 'number';
}

export default Stepper;
