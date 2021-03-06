import React , { Component } from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDown} from './../DropDown';
import {Temperature} from './Temperature';
import {Cities} from './Cities';
import {NewCity} from './NewCity';
import {connect} from 'react-redux';
import {Actions} from './../../services';
import {CityManager} from './CityManager';

export class _ConfigPopUp extends Component {
  constructor (props) {
    super();
    this.state = {
      transitionOpacity: new Animated.Value(0),
      animationDuration: 300
    }
  }
  componentDidMount () {
    if(!this.props.showCityModal){
      Animated.timing(          // Uses easing functions
         this.state.transitionOpacity,    // The value to drive
         {toValue: 1, duration: this.state.animationDuration}            // Configuration
       ).start();
     }else{
       const height = Math.floor(this.props.height);
     }
  }
  render () {
    const {transitionOpacity} = this.state;
    if(!this.props.ShowPopUp){
      return null
    }
    return (
      <View
        style={{flex: 1, position: 'absolute', left: 0, right: 0, backgroundColor: '#0006', height}} >
        <CityManager ToggleCityManager={this.props.ToggleCityManager} enabled={this.props.cityManager} />
        <Animated.View style={[Styles.configView, {opacity: transitionOpacity}]} >
          <View style={{flex: 1, flexDirection: 'row',}}>
            <Cities />
            <Temperature />
            <View style={{flex: 1}}>
              <TouchableHighlight style={{position: 'absolute', top: 10, right: 15}} onPress={() => this.props.closePopUp()}>
                <Icon name="ios-close" style={[Styles.TextDefault, {fontSize: 28}]} />
              </TouchableHighlight>
            </View>
          </View>
        </Animated.View>
        <NewCity visible={this.props.showCityModal} cancel={this.props.closeCityModal} />
      </View>
    )
  }

}

const {height, width} = Dimensions.get('window');
const Styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  configView: {
    position: 'absolute',
    bottom: 75,
    height: height/3,
    width,
    backgroundColor: 'black'
  },
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
});

const mapStateToProps = (state) => ({
  ...state.uiState
})

const mapActionsToProps = (dispatch) => ({
  closeCityModal : () => {
    dispatch(Actions.ToggleCityModal(false))
  },
  ToggleCityManager: (city) => {
    dispatch(Actions.ToggleCityManager())
  },
  closePopUp: () => {
    dispatch(Actions.ToggleConfigPopUp());
  }
})

export const ConfigPopUp = connect(mapStateToProps, mapActionsToProps)(_ConfigPopUp);
