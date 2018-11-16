import React from 'react';
import { View } from 'react-native';
import { styles } from '../../assets/styles';

const Section = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

export { Section };