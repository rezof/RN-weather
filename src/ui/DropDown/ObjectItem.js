import React, {Component} from 'react';
import {View, Text, TouchableOpacity ,StyleSheet} from 'react-native';

export class ObjectItem extends Component{
  render() {
    console.log('object')
    return (
      <TouchableOpacity onPress={pressHandler} style={[Styles.container, this.props.style]}>
        <View style={Styles.textContainer}>
          <Text style={Styles.textDefault}>{this.props.data.text}</Text>
        </View>
        <View style={Styles.iconContainer}>
          <Text style={Styles.textDefault}>
            √
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  pressHandler = () => {
    this.props.pressHandler(this.props.data);
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    flex: 3
  },
  iconContainer: {
    flex: 1
  },
  textDefault:{
    backgroundColor: 'transparent',
    color: 'red'
  }
})
