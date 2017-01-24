import React , { Component } from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export class ConfigPopUp extends Component {
  constructor (props) {
    super();
    this.state = {
      transitionHeight: new Animated.Value(props.height/3),
      animationDuration: 1000
    }
  }
  componentDidMount () {
    const height = Math.floor(this.props.height);
    Animated.timing(          // Uses easing functions
       this.state.transitionHeight,    // The value to drive
       {toValue: height, duration: this.state.animationDuration}            // Configuration
     ).start();
  }
  // closePopUp = () => {
  //   const {height} = this.props;
  //   Animated.timing(
  //      this.state.transitionHeight,
  //      {toValue: height/2, duration: this.state.animationDuration}
  //    ).start(() => this.props.closePopUp());
  // }
  render () {
    const {width, height} = this.props;
    const {transitionHeight} = this.state;
    return (
      <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#0006'}} >
        <Animated.View style={{position: 'absolute', bottom: 55, height: transitionHeight, width, backgroundColor:'black'}} >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={Styles.TextDefault, {fontSize: 15, color: '#C1BBEB'}}>Location</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={Styles.TextDefault, {fontSize: 15, color: '#C1BBEB'}}>Temperature</Text>
              <View style={{position: 'absolute', top: 10, right: 15}}>
                <TouchableHighlight onPress={() => this.props.closePopUp()}>
                  <Icon name="ios-close" style={[Styles.TextDefault, {fontSize: 28}]} />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
}

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
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
});
