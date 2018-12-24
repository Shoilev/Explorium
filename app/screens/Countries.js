import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import CountryList from '../components/CountryList';
import HeaderSearch from '../components/HeaderSearch';
import { getCountries } from '../actions';
import { createStyles } from '../assets/styles';
import { CountriesStyles } from '../assets/styles/countries';

const styles = createStyles(CountriesStyles);

class Countries extends Component {
  componentWillMount() {
    this.props.getCountries();
  }

  renderItem({item, index}) {
    return <CountryList country={item.countryName} countryImage={item.countryImage} countryIndex={index} />
  }

  renderState() {
    const { countriesData, activeCountries } = this.props.countries;

    if(countriesData && countriesData.length) {
      return (
        <FlatList
          data={activeCountries}
          renderItem={this.renderItem}
          keyExtractor={(country, index)=> index}
          ListHeaderComponent={<HeaderSearch title={"Countries"} data={countriesData} />}
          stickyHeaderIndices={[0]}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  }

  render() {
    return (
        this.renderState()
    );
  }
}

const mapStateToProps = ({countries}) => {
  return { countries };
};

export default connect(mapStateToProps, { getCountries })(Countries);