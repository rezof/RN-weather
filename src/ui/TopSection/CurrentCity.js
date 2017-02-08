import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

export class _CurrentCity extends Component{
  render() {
    let {text} = this.props.currentCity;
    let fontSize = 60;
    if (text) {
      const length = text.length;
      if(length > 10){
        fontSize = 41
        text = text.slice(0, 9) + '...';
      }else if(length > 9){
        fontSize = 43
      }else if(length > 8){
        fontSize = 45
      }else if(length > 7){
        fontSize = 54
      }else if(length > 5){
        fontSize = 58
      }
    }
    return (
      <View style={this.props.style}>
        <Text style={[Styles.TextDefault, {fontSize}]}>
          {text}
        </Text>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  TextDefault: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

const mapStateToProps = (state) => ({
  ...state.cities
})

export const CurrentCity = connect(mapStateToProps, null)(_CurrentCity)
