import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, findNodeHandle} from 'react-native';
import {connect} from 'react-redux';

import {BackgroundImage} from './BackgroundImage';
import {CurrentCity} from './CurrentCity';
import {CurrentTemperature} from './CurrentTemperature';
import {IcoMoon} from './../';

const {width, height} = Dimensions.get('window');
export class _TopSection extends Component {
  render() {
    let refreshing;
    if(this.props.uiState.refreshing){
      console.log('should show refreshing');
      refreshing = (
        <View style={Styles.refreshing}>
          <Text style={Styles.refreshingText}>
            fetching...
          </Text>
        </View>
      );
    }
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <BackgroundImage style={{height: height/3, width}} />
        <View style={{
            position: 'absolute',
            height: height/6,
            bottom: 20, left: 10,
            right: 10}}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: width*6/10}}>
              <CurrentCity style={{ flex: 1}} />
              <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                <View ref='ref' style={{flex: 1}}>
                  <IcoMoon name="clear-night" color="white" fontSize={40}
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      backgroundColor: "transparent",
                      fontSize: 40}}
                    />
                </View>
                <View style={{flex: 1}}>
                  <Text style={[Styles.TextDefault, {fontSize: 18}]}>Thursday</Text>
                  <Text style={[Styles.TextDefault, {fontSize: 14, color: "#58B1B3"}]}>Today</Text>
                </View>
              </View>
            </View>
            <CurrentTemperature style={{width: width*4/10}} />
          </View>
        </View>
        {refreshing}
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
  refreshing: {
    position: 'absolute',
    backgroundColor: '#2ecc71',
    left: 0,
    right: 0,
    height: 30,
    bottom: -40,
    justifyContent: 'center'
  },
  refreshingText: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({
  weather: state.weather,
  config: state.config,
  cities: state.cities,
  uiState: state.uiState
})

export const TopSection = connect(mapStateToProps, null)(_TopSection);
