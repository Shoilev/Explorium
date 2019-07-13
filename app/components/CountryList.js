import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { Section } from './common';
import { createStyles } from '../assets/styles';
import { CountriesStyles } from '../assets/styles/countries';
import { countryColors } from '../settings/global.json';
import { colors } from '../assets/styles/base';

const styles = createStyles(CountriesStyles);

export default class CountryList extends Component {
  render() {
    const { countryImage, country, countryIndex, countryPoints, countryOnline, appNavigation } = this.props;
    const color = countryColors[countryIndex % countryColors.length];
    const backgroundColor = color + 'Background';
    const backgroundWithOpacityColor = color + 'BackgroundOpacity';

    return (
      <Section style={[styles.countryListCard, !countryOnline ? styles.countryListCardOffline : null]}>
        <ImageBackground source={{uri: countryImage}} style={[styles.backgroundImage, styles.countryCardBackground]}>
        </ImageBackground>
        <TouchableNativeFeedback onPress={()=>{ countryOnline ? appNavigation.navigate('CitiesList',{country:country}) : null}} background={TouchableNativeFeedback.Ripple(styles[color])}>
          <View style={[styles.overlay, styles[backgroundWithOpacityColor]]}>
            <Text style={styles.countryListTitle}>{country.toUpperCase()}</Text>
            {!countryOnline ? <Text style={styles.countryListOfflineLabel}>{'(Country not available)'}</Text> : null }
            {countryPoints || countryPoints === 0 ? 
              <Text style={[styles.countryListPoints, styles[backgroundColor]]}>{'Up to ' + countryPoints + ' pts'}</Text>
              :
              <ActivityIndicator color="#ffffff" />
            }
          </View>
        </TouchableNativeFeedback>
      </Section>
    );
  }
}
