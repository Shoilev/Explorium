import React from 'react';
import { View } from 'react-native';
import { createStyles } from '../../assets/styles';

const styles = createStyles();


const Section = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

export { Section };