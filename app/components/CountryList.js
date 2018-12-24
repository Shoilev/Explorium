import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableNativeFeedback } from 'react-native';
import { Section } from './common';
import { createStyles } from '../assets/styles';
import { CountriesStyles } from '../assets/styles/countries';
import { countryColors } from '../settings/global.json';

const styles = createStyles(CountriesStyles);

export default class CountryList extends Component {
  render() {
    const { countryImage, country, countryIndex } = this.props;
    const color = countryColors[countryIndex % countryColors.length];
    const backgroundColor = color + 'Background';
    const backgroundWithOpacityColor = color + 'BackgroundOpacity';

    return (
      <Section style={styles.countryListCard}>
        <ImageBackground source={{uri: countryImage}} style={[styles.backgroundImage, styles.countryCardBackground]}>
        </ImageBackground>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(styles[color])}>
          <View style={[styles.overlay, styles[backgroundWithOpacityColor]]}>
            <Text style={styles.countryListTitle}>{country.toUpperCase()}</Text>
            <Text style={[styles.countryListPoints, styles[backgroundColor]]}>{'Up to 500 pts'}</Text>
          </View>
        </TouchableNativeFeedback>
      </Section>

    );
  }
}
