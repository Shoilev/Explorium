import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStyles } from '../../assets/styles';

const styles = createStyles();

const HeaderCloseBar = ({children, headerBarStyle, headerBarBackIconStyle, headerBarNav }) => {
  return (
    <View style={[styles.headerBar, headerBarStyle]}>
        <Text style={styles.headerBarTitle}>{children}</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{headerBarNav.redirect ? headerBarNav.navigation.navigate('Explore') : headerBarNav.navigation.goBack(null)}} style={[styles.headerBarCloseIconWrapper, headerBarBackIconStyle]}>
            <Icon style={styles.headerBarCloseIcon} name="times"/>
        </TouchableOpacity>
    </View>
  );
};

export { HeaderCloseBar };
