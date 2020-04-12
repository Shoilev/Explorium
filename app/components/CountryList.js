import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableNativeFeedback, Animated, ActivityIndicator } from 'react-native';
import { Section } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStyles } from '../assets/styles';
import { CountriesStyles } from '../assets/styles/countries';
import { countryColors } from '../settings/global.json';
import { colors } from '../assets/styles/base';

const styles = createStyles(CountriesStyles);

export default class CountryList extends Component {
  state = {
    animatedPoins: new Animated.Value(0)
  }

  render() {
    const { countryImage, country, countryRate, countryIndex, countryPoints, countryOnline, appNavigation } = this.props;
    const color = countryColors[countryIndex % countryColors.length];
    const backgroundColor = color + 'Background';
    const backgroundWithOpacityColor = color + 'BackgroundOpacity';
    let { animatedPoins } = this.state;

    if(countryPoints || countryPoints === 0) {
      Animated.timing(
        animatedPoins,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }

    return (
      <Section style={[styles.countryListCard, !countryOnline ? styles.countryListCardOffline : null]}>
        <ImageBackground source={{uri: countryImage}} style={[styles.backgroundImage, styles.countryCardBackground]}>
        </ImageBackground>
        <TouchableNativeFeedback onPress={()=>{ countryOnline ? appNavigation.navigate('CitiesList',{country:country, countryRate: countryRate}) : null}} background={TouchableNativeFeedback.Ripple(styles[color])}>
          <View style={[styles.overlay, styles[backgroundWithOpacityColor]]}>
            <Text style={styles.countryListTitle}>{country.toUpperCase()}</Text>
            {!countryOnline ? <Text style={styles.countryListOfflineLabel}>{'(Country not available)'}</Text> : null }
            {countryPoints || countryPoints === 0 ?
              <Animated.View style={{opacity: animatedPoins}}>
                <Text style={[styles.countryListPoints, styles[backgroundColor]]}><Icon style={styles.explorePointsIcon} name="star"/>{' Up to ' + countryPoints + ' pts'}</Text>
              </Animated.View>
              :
              <ActivityIndicator color="#ffffff" />
            }
          </View>
        </TouchableNativeFeedback>
      </Section>
    );
  }
}
