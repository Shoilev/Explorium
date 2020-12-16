import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isEmpty } from '../../helpers';
import { createStyles } from '../../assets/styles';

const styles = createStyles();

const HeaderBar = ({children, mapViewListener, headerBarStyle, headerBarBackIconStyle, headerBarNav, headarBarMapView = {} }) => {
  return (
    <View style={[styles.headerBar, headerBarStyle]}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{headerBarNav.goBack(null)}} style={[styles.headerBarBackIconWrapper, headerBarBackIconStyle]}>
            <Icon style={styles.headerBarBackIcon} name="arrow-left"/>
        </TouchableOpacity>
        <Text style={styles.headerBarTitle}>{children}</Text>
        {!isEmpty(headarBarMapView) ?
          <TouchableOpacity activeOpacity={0.5} onPress={mapViewListener} style={[styles.headerBarMapIconWrapper, headerBarBackIconStyle]}>
            <Icon style={styles.headerBarBackIcon} name="map"/>
            <Text style={styles.headerBarMapText}>Map View</Text>
          </TouchableOpacity>
          :null
        }
    </View>
  );
};

export { HeaderBar };
