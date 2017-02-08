import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import {IcoMoon} from "./../";

const RowColors = ["#1D1B2F", "#232036"]

export class _BaseRow extends Component {
  render() {
    const {selectedTemperature} = this.props;
    const {getTemperatures, formatTime} = this.props.functions;
    const temperature = getTemperatures();
    return (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: RowColor(this.props.index || 0), paddingTop: 10, paddingBottom: 10}}>
        <View style={{flex: 1}}>
          <IcoMoon name={this.props.data.icon} style={{color: "#B3ACFF", textAlign: "center", fontSize: 22, paddingTop: 3, paddingBottom: 5}} />
        </View>
        <View style={{flex: 2,}}>
          <Text style={[Styles.textDefault, {fontSize: 20, paddingLeft: 30}]}>{formatTime(this.props.data.time)}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[Styles.textDefault, {flex: 1, color: "#54FFEC", fontSize: 13, paddingTop: 2}]}>{calcTemperature(temperature.max, selectedTemperature.text)}</Text>
          <Text style={[Styles.textDefault, {flex: 1, color: "#716D91", fontSize: 12, paddingTop: 2}]}>{calcTemperature(temperature.min, selectedTemperature.text)}</Text>
        </View>
      </View>
    )
  }
}

const RowColor = (num) => {
  return num % 2 > 0 ? RowColors[0] : RowColors[1];
}

const calcTemperature = (temp, deg = "Celsius") => {
  if(deg == "Celsius"){
    return Math.floor((parseFloat(temp) - 32) / 1.8) + " °C";
  }else{
    return Math.floor(temp) + " °F";
  }
}


const Styles = StyleSheet.create({
  textDefault:{
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        color: "white"
      },
      android: {
        color: "white"
      }
    })
  }
})

const mapStateToProps = (state) => ({
  ...state.config
})

export const BaseRow = connect(mapStateToProps, null)(_BaseRow)
