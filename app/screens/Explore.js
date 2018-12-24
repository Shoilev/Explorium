import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { ExploreStyle } from '../assets/styles/explore';
import { Section, Button } from '../components/common';
import { Screens } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const exploreumSrc = images.exploreumBackground;
const exploreEarth = images.earth;

export default class Explore extends Component {

  onButtonPress() {
    console.log('TODO');
  }

  render() {
    return (
      <ImageBackground source={exploreumSrc} style={styles.backgroundImage}>
        <Section>
          <Image source={exploreEarth} />
          <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.buttonTitle}</Button>
        </Section>
      </ImageBackground>
    );
  }
}
