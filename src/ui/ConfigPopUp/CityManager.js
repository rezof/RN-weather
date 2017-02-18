import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Actions, API, dbAPI} from './../../services';

class _CityManager extends Component{
  render() {
    let {props} = this;
    if(!props.enabled){
      return null
    }
    return (
      <TouchableOpacity style={Styles.windowContainer} onPress={() => props.ToggleCityManager()}>
        <View style={Styles.container}>
          <TouchableOpacity style={[Styles.textContainer, {borderBottomWidth: 1, borderBottomColor: 'grey'}]} onPress={() => this.props.refresh(props.uiState.managedCity)}>
            <Text style={Styles.textDefault}>
              Refresh
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.textContainer} onPress={() => this.props.delete(props.uiState.managedCity)}>
            <Text style={Styles.textDefault}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
  windowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: width/2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  textContainer: {
    justifyContent: 'center',
    height: 40
  },
  textDefault: {
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => ({
  uiState: state.uiState
})

const mapActionsToProps = (dispatch) => ({
  refresh(city) {
    dispatch(Actions.weatherFetching());
    dispatch(Actions.ToggleCityManager());
    dispatch(API.fetchCityWeather(city));
  },
  delete(city) {
    dispatch(dbAPI.deleteCity(city));
  }
})

export const CityManager = connect(mapStateToProps, mapActionsToProps)(_CityManager);
