import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles';

const Button = ({ onPress, children, textStyle, buttonStyle }) => {
  const { button } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[button, buttonStyle]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };