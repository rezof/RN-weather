import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DropDown} from './../DropDown';
import {connect} from 'react-redux';
import {Actions, API, dbAPI} from './../../services';

export class _Cities extends Component {
  render() {
    return (
      <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={Styles.TextDefault, {fontSize: 15, color: '#C1BBEB',}}>Location</Text>
        </View>
        <View style={{flex: 1}}>
          <DropDown longPress={this.props.ToggleCityManager} data={[...this.props.cities.cities, {text:'add new city', value: -1}]} selected={this.props.cities.currentCity} selectedChanged={this.cityChanged} />
        </View>
      </View>
    )
  }
  cityChanged = (city) => {
    if(city.value != this.props.cities.currentCity.value){
      if(city.value > -1){
        //should elevate this to the top
        this.props.selectedCityChanged(city);
      }else{
        this.props.popNewCity();
      }
    }
  }
}

const Styles = StyleSheet.create({
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
});

const mapStateToProps = (state) => ({
  cities: state.cities,
  uiState: state.uiState,
  weather:  state.weather
})

const mapActionsToProps = (dispatch) => ({
  selectedCityChanged: (city) => {
    dispatch(Actions.ChangeCurrentCity(city))
    dispatch(API.CheckCityWeather(city))
    dbAPI.setCurrentCity(city);
  },
  popNewCity: () => {
    dispatch(Actions.ToggleCityModal(true));
    dispatch(Actions.CitySearchReset());
  },
  ToggleCityManager: (city) => {
    dispatch(Actions.ToggleCityManager(city))
  }
})

export const Cities = connect(mapStateToProps, mapActionsToProps)(_Cities);
