import React, { Component } from 'react';
import { Text } from 'react-native';
import { Section } from './common';

export default class CountryList extends Component {
  render() {
    console.log('finaleeee')
    console.log(this.props)
    return (
      <Section>
        <Text>{this.props.country}</Text>
      </Section>
    );
  }
}
