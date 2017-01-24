import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import Gradient from 'react-native-linear-gradient';

import {IcoMoon} from './../UI'

const {width, height} = Dimensions.get('window');
export const TopSection = () => (
  <View style={{flex: 1, position: 'relative'}}>
    <Image style={{height: height/3, width: width}} source={require("./../resources/stars.png")}>
      <Gradient colors={['#F5F5F51A', "#231F3633"]}
        style={{position: "absolute",top: 0,bottom: 0,left: 0,right: 0}}>
      </Gradient>
    </Image>
    <View style={{position: 'absolute', height: height/6, bottom: 20, left: 10, right: 10}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: width*6/10}}>
          <View style={{ flex: 1}}>
            <Text style={[Styles.TextDefault, {fontSize: 48}]}>
              Barcelona
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            <View style={{flex: 1}}>
              <IcoMoon name="clear-night" color="white" fontSize={40} style={{color: 'white', textAlign: 'center', backgroundColor: "transparent", fontSize: 40}} />
            </View>
            <View style={{flex: 1}}>
              <Text style={[Styles.TextDefault, {fontSize: 18}]}>Thursday</Text>
              <Text style={[Styles.TextDefault, {fontSize: 14, color: "#58B1B3"}]}>Today</Text>
            </View>
          </View>
        </View>
        <View style={{width: width*4/10}}>
          <Text style={[Styles.TextDefault, { fontSize: 85, textAlign: 'center'}]}>
            8°
          </Text>
        </View>
      </View>
    </View>
  </View>
)

const Styles = StyleSheet.create({
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  }
});
