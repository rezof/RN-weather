import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class _CurrentTemperature extends Component {
  render() {
    let currentTemp;
    const {weather: {data}, cities:{currentCity}} = this.props;
    if(data[currentCity.value] && data[currentCity.value].hourly && data[currentCity.value].hourly.data[0] && data[currentCity.value].hourly.data[0].temperature){
      currentTemp = data[currentCity.value].hourly.data[0].temperature;
    }
    return (
      <View style={[this.props.style, {justifyContent: 'center'}]}>
        <Text style={[Styles.TextDefault, { fontSize: 65, textAlign: 'center', paddingTop: 10}]}>
          {this.calcTemperature(currentTemp, this.props.config.selectedTemperature.text)}
        </Text>
      </View>
    )
  }

  calcTemperature = (temp = null, deg = "Celsius") => {
    if(temp == null){
      return 0;
    }
    if(deg == "Celsius"){
      return (Math.floor((parseFloat(temp) - 32) / 1.8) || 0) + "°";
    }else{
      return (Math.floor(temp) || 0) + "°";
    }
  }
}



const Styles = StyleSheet.create({
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  }
});

const mapStateToProps = (state) => ({
  weather: state.weather,
  config: state.config,
  cities: state.cities
})

export const CurrentTemperature = connect(mapStateToProps, null)(_CurrentTemperature);
