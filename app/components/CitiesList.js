import React, { Component } from 'react';
import { Text, View, Dimensions, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { CitiesStyles } from '../assets/styles/cities';
import { Section, Button } from './common';
import { getCitiesPerCountry } from '../actions';
import { App } from '../resources/labels.json';

const styles = createStyles(CitiesStyles);
const itemWidthValue = 1.3;

class CitiesList extends Component {
  componentWillMount() {
    const country = this.props.navigation.getParam('country', '');
    const countryRate = this.props.navigation.getParam('countryRate', '');
    this.props.getCitiesPerCountry(country, countryRate);

    this.setState({
      viewport: {
        width: Dimensions.get('window').width
      }
    })
  }

  renderItem (item, index, navigation) {
    return (
      <Section style={styles.citiesSlide}>
        <View style={styles.citiesImageWrap}>
          <ImageBackground source={{uri: item.cityImage}} style={styles.backgroundImage}></ImageBackground>
          <Text style={styles.citiesPoints}>{item.cityPoints + ' points'}</Text>
        </View>
        <View style={styles.citiesDetails}>
          <Text style={styles.cititesTitle}>{ item.cityName }</Text>
          <ScrollView style={styles.citiesScrollableDescritpion}>
            <Text style={styles.citiesDescriptions}>{ item.cityShortDescription }</Text>
          </ScrollView>

          <Button textStyle={styles.citiesTextBtn} onPress={()=>navigation.navigate('LandmarksList',{country:navigation.getParam('country', ''), city: item.cityName, cityPoints: item.cityPoints})} buttonStyle={styles.citiesBtnStyle}>
            {App.explore}
          </Button>
        </View>
      </Section>
    );
  }

  render () {
    //activeCities is available if we decide to implement live search in the near future.
    const { citiesData } = this.props.cities;
    const { navigation } = this.props;

    if(citiesData && citiesData.length) {
      return (
        <View
          style={{flex:1}}
          onLayout={() => {
            this.setState({
                viewport: {
                    width: Dimensions.get('window').width,
                }
            });
          }}
        >
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={citiesData}
            renderItem={({item, index}) => this.renderItem(item,index,navigation)}
            sliderWidth={this.state.viewport.width}
            itemWidth={this.state.viewport.width / itemWidthValue}
            itemHeight={200}
            windowSize={1}
            firstItem={parseInt(citiesData.length / 2)}
            />
          </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}

const mapStateToProps = ({cities}) => {
  return { cities };
};

export default connect(mapStateToProps, { getCitiesPerCountry })(CitiesList);
