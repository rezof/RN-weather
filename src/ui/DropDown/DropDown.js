import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, findNodeHandle} from 'react-native';
import {ListView_} from './ListView';
import Icon from 'react-native-vector-icons/Ionicons';

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
      content = <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}><Text style={[Styles.textDefault]}>{this.props.selected.text}</Text><Icon name="ios-arrow-down" style={{color: '#3E3A55', fontSize: 24, marginLeft: 10, marginTop: 5}} /></View>
    }else{
      content = <ListView_ longPressHandler={this.props.longPress} data={this.props.data} itemSelected={this.itemSelected} selected={this.props.selected} />;
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
    this.props.selectedChanged(selected);
    this.setState({opened: false});
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
    minHeight: 200,
  },
  textDefault:{
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
