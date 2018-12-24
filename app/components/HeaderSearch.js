import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { createStyles } from '../assets/styles';
import { connect } from 'react-redux';
import { updateCountries } from '../actions';

const styles = createStyles();

class HeaderSearch extends Component {
  handleSearch(text, totalResults) {
    const activeData = totalResults.filter(resultItem => {
      return resultItem.countryName.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    })

    this.props.updateCountries(activeData);
  }

  render() {
    const { title, data } = this.props;

    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          autoCapitalize="none"
          placeholder={'Search ' + title}
          placeholderTextColor="#1a4e6c"
          onChangeText={text => this.handleSearch(text, data)}
        />
      </View>
    );
  }
}

export default connect(null, { updateCountries })(HeaderSearch);