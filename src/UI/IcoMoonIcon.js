import React from 'react';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './../resources/config.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);


export const IcoMoon = (props) => (
  <Icon name={props.name} style={[{color: "white", backgroundColor: "transparent", fontSize: 20}, props.style]}/>
)
