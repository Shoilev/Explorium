import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStyles } from '../../assets/styles';

const styles = createStyles();

const HeaderBar = ({children, headerBarStyle, headerBarNav }) => {
  return (
    <View style={[styles.headerBar, headerBarStyle]}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{headerBarNav.goBack(null)}} style={styles.headerBarBackIconWrapper}>
            <Icon style={styles.headerBarBackIcon} name="arrow-left"/>
        </TouchableOpacity>
        <Text style={styles.headerBarTitle}>{children}</Text>
    </View>
  );
};

export { HeaderBar };
