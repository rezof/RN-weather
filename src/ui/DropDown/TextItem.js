import React, {Component} from 'react';
import {View, Text, TouchableOpacity ,StyleSheet} from 'react-native';

export class TextItem extends Component{
  render() {
    let selected = {};
    if(this.props.isSelected){
      selected = Styles.selected
    }
    console.log(this.props.data);
    return (
      <TouchableOpacity onPress={this.pressHandler} style={[Styles.container, this.props.style, ]}>
        <View style={Styles.textContainer}>
          <Text style={[Styles.textDefault, selected]}>{this.props.data}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  pressHandler = () => {
    this.props.pressHandler({text: this.props.data});
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 5,
    paddingLeft: 5,
  },
  textContainer: {
    flex : 1,
    borderBottomWidth: 1/2,
    borderBottomColor: 'lightgrey',
    borderStyle: 'solid',
  },
  textDefault: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  },
  selected: {
    fontWeight: "bold",
  }
})
