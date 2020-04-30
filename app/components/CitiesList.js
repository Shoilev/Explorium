import React, { Component } from 'react';
import { Text, View, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStyles } from '../assets/styles';
import { CitiesStyles } from '../assets/styles/cities';
import { Section, Button, HeaderBar } from './common';
import { getCitiesPerCountry } from '../actions';
import { App } from '../resources/labels.json';

const styles = createStyles(CitiesStyles);
const itemWidthValue = 1.4;

class CitiesList extends Component {
  componentWillMount() {
    const country = this.props.navigation.getParam('country', '');
    const countryRate = this.props.navigation.getParam('countryRate', '');
    this.props.getCitiesPerCountry(country, countryRate).then(result =>{
      this.setState({
        loading: false
      })
    });

    this.setState({
      viewport: {
        width: Dimensions.get('window').width
      },
      loading: true
    })
  }

  renderItem (item, index, navigation) {
    return (
      <Section style={styles.citiesSlide}>
        <TouchableOpacity onPress={()=>{navigation.navigate('LandmarksList',{country:navigation.getParam('country', ''), city: item.cityName, cityPoints: item.cityPoints})}} style={styles.citiesSlideWrapper}>
          <ImageBackground source={{uri: item.cityImage}} imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40, height: '100%' }} style={styles.citiesImage}>
            <Text style={[styles.explorePoints, styles.citiesPoints]}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + item.cityPoints + ' points'}</Text>
          </ImageBackground>
          <View style={styles.citiesDetails}>
            <Text style={styles.cititesTitle}>{ item.cityName }</Text>
            <ScrollView style={styles.citiesScrollableDescritpion}>
              <Text style={styles.citiesDescriptions}>{ item.cityShortDescription }</Text>
            </ScrollView>

            <Button textStyle={styles.citiesTextBtn} onPress={()=>navigation.navigate('LandmarksList',{country:navigation.getParam('country', ''), city: item.cityName, cityPoints: item.cityPoints})} buttonStyle={styles.citiesBtnStyle}>
              {App.explore}
            </Button>
          </View>
        </TouchableOpacity>
      </Section>
    );
  }

  render () {
    //activeCities is available if we decide to implement live search in the near future.
    const { citiesData } = this.props.cities;
    const { navigation } = this.props;

    if(citiesData && citiesData.length && !this.state.loading) {
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
          <HeaderBar headerBarNav={navigation}>{'Cities'}</HeaderBar>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={citiesData}
            renderItem={({item, index}) => this.renderItem(item,index,navigation)}
            sliderWidth={this.state.viewport.width}
            itemWidth={this.state.viewport.width / itemWidthValue}
            itemHeight={200}
            windowSize={1}
            inactiveSlideOpacity={1}
            firstItem={parseInt(citiesData.length / 2)}
            />
          </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      );
    }
  }
}

const mapStateToProps = ({cities}) => {
  return { cities };
};

export default connect(mapStateToProps, { getCitiesPerCountry })(CitiesList);
