import React, { Component } from 'react';
import { Text, ImageBackground, Image } from 'react-native';
import { styles } from '../assets/styles';
import { Section, Button } from '../components/common';

const exploreumSrc = require('../assets/images/exploreum_background.jpg');
const exploreEarth = require('../assets/images/earth.png');

export default class Explore extends Component {

  onButtonPress() {
    console.log('TODO');
  }

  render() {
    return (
      <ImageBackground source={exploreumSrc} style={styles.backgroundImage}>
        <Section>
          <Image source={exploreEarth} />
          <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>Go Explore!</Button>
        </Section>
      </ImageBackground>
    );
  }
}
