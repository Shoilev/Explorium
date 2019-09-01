import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../../assets/styles';

const styles = createStyles();

const Button = ({ onPress, children, textStyle, buttonStyle }) => {
  const { button } = styles;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[button, buttonStyle]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };