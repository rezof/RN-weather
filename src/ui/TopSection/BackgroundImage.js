import React from 'react';
import {Image, Dimensions, StyleSheet} from 'react-native';

import Gradient from 'react-native-linear-gradient';

export const BackgroundImage = (props) => (
  <Image style={props.style} source={require("./../../resources/stars.png")}>
    <Gradient colors={['#F5F5F51A', "#231F3633"]}
      style={{position: "absolute",top: 0,bottom: 0,left: 0,right: 0}}>
    </Gradient>
  </Image>
)
