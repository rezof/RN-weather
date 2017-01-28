import React, {Component} from 'react';
import {View, Text, ListView, TouchableOpacity, StyleSheet, Dimensions, findNodeHandle} from 'react-native';
import {ListView_} from './ListView';
import Icon from 'react-native-vector-icons/Ionicons';
const RCTUIManager = require('NativeModules').UIManager;

export class DropDown extends Component {
  constructor() {
    super();
    this.state = {
      selected: {text: "default", value: null},
      opened: false
    };
  }
  render() {
    let content, stateStyle;
    if(!this.state.opened){
      content = <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}><Text style={[Styles.textDefault]}>{this.state.selected.text}</Text><Icon name="ios-arrow-down" style={{color: '#3E3A55', fontSize: 24, marginLeft: 10, marginTop: 5}} /></View>
    }else{
      content = <ListView_ data={this.props.data} itemSelected={this.itemSelected} selected={this.state.selected} />;
    }
    return (
      <TouchableOpacity style={[Styles.container,]} onPress={this.toggleList} onBlur={this.toggleList}>
        {content}
      </TouchableOpacity>
    )
  }
  toggleList = () => {
    this.setState({opened: !this.state.opened});
  }
  itemSelected = (selected) => {
    this.setState({selected, opened: false})
  }
}
const {width} = Dimensions.get('window')
if(width > 400){
  _width = 100
}else{
  _width = width/4
}
const Styles = StyleSheet.create({
  container:{
    marginTop: 5,
    width: width/2,
    position: 'relative'
  },
  textDefault:{
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
