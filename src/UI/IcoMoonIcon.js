import React from 'react';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './../resources/icoMoon.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);


export const IcoMoon = (props) => {
  Icon.getImageSource('user', 20, 'red').then((source) => {});
  return <Icon name={props.name} style={[{color: "white", backgroundColor: "transparent", fontSize: 20}, props.style]}/>
}
