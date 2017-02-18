import React, {Component} from 'react';
import {View, Text, TouchableOpacity ,StyleSheet, Platform} from 'react-native';

export class ObjectItem extends Component{
  render() {
    let selected;
    let {data} = this.props;
    if(this.props.isSelected){
      selected = Styles.selected;
    }
    return (
      <TouchableOpacity onLongPress={() => this.onLongPress(data)} onPress={this.pressHandler} style={[Styles.container, this.props.style]}>
        <View style={Styles.textContainer}>
          <Text style={[Styles.textDefault, selected]}>{data.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  pressHandler = () => {
    this.props.pressHandler(this.props.data);
  }
  onLongPress = (city) => {
    this.props.longPress(city)
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    minHeight: 30
  },
  textContainer: {
    flex : 1,
    borderBottomWidth: 1/2,
    borderBottomColor: 'lightgrey',
    borderStyle: 'solid',
  },
  textDefault: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        color: 'white',
      },
      android: {
        color: 'white'
      }
    })
  },
  selected: {
    fontWeight: "bold",
  }
})
