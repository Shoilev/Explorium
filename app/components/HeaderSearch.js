import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { createStyles } from '../assets/styles';
import { connect } from 'react-redux';
import { updateCountries, updateFriends } from '../actions';

const styles = createStyles();

class HeaderSearch extends Component {
  handleSearch(title, text, totalResults) {
    switch (title) {
      case 'Countries':
        const countriesData = totalResults.filter(resultItem => {
          return resultItem.countryName.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        });

        return this.props.updateCountries(countriesData);
      case 'Friends':
        const friendsData = totalResults.filter(resultItem => {
          let friendName = '';

            console.log(resultItem)
          if(resultItem.givenName) {
            friendName += resultItem.givenName;
          }
          if (resultItem.middleName) {
            friendName += (" " + resultItem.middleName)
          }
          if(resultItem.familyName) {
            friendName += (" " + resultItem.familyName);
          }
          return friendName.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        });

        return this.props.updateFriends(friendsData);
      default:
        return false;
    }
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
          onChangeText={text => this.handleSearch(title, text, data)}
        />
      </View>
    );
  }
}

export default connect(null, { updateCountries, updateFriends })(HeaderSearch);