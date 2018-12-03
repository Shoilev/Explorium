import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import CountryList from '../components/CountryList';
import { getCountries } from '../actions';

class Countries extends Component {
  componentWillMount() {
    this.props.getCountries();
  }

  renderItem({item}) {
    return <CountryList country={item.countryName}/>
  }

  render() {
    const { countries } = this.props;
    return (
      <FlatList
        data={countries}
        renderItem={this.renderItem}
        keyExtractor={(country)=> country.countryName}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const { countries } = state;
  return {countries};
};

export default connect(mapStateToProps, { getCountries })(Countries);