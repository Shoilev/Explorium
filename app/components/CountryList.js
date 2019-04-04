import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { Section } from './common';
import { createStyles } from '../assets/styles';
import { CountriesStyles } from '../assets/styles/countries';
import { countryColors } from '../settings/global.json';

const styles = createStyles(CountriesStyles);

export default class CountryList extends Component {
  render() {
    const { countryImage, country, countryIndex, countryPoints, appNavigation } = this.props;
    const color = countryColors[countryIndex % countryColors.length];
    const backgroundColor = color + 'Background';
    const backgroundWithOpacityColor = color + 'BackgroundOpacity';

    return (
      <Section style={styles.countryListCard}>
        <ImageBackground source={{uri: countryImage}} style={[styles.backgroundImage, styles.countryCardBackground]}>
        </ImageBackground>
        <TouchableNativeFeedback onPress={()=>appNavigation.navigate('CitiesList',{country:country})} background={TouchableNativeFeedback.Ripple(styles[color])}>
          <View style={[styles.overlay, styles[backgroundWithOpacityColor]]}>
            <Text style={styles.countryListTitle}>{country.toUpperCase()}</Text>
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
