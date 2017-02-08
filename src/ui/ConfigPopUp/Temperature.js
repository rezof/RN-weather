import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {DropDown} from './../DropDown';
import {Actions, asyncActions} from './../../services';
import axios from 'axios';

export class _Temperature extends Component {
  render() {
    return (
      <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={Styles.TextDefault, {fontSize: 15, color: '#C1BBEB'}}>Temperature</Text>
        </View>
        <View style={{flex: 1}}>
          <DropDown data={this.props.temperatures} selectedChanged={this.props.changeTemperatureScale} selected={this.props.selectedTemperature} />
        </View>
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
})

const mapStateToProps = (state) => {
  return {
    ...state.config
  }
}

const mapActionsToProps = (dispatch) => ({
  changeTemperatureScale: (payload) => {
    dispatch(Actions.ChangeTemperatureScale(payload))
  }
})

export const Temperature = connect(mapStateToProps, mapActionsToProps)(_Temperature);
