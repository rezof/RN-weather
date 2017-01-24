import React from 'react';
import { TouchableOpacity }  from 'react-native';

export const Button = (props) => (
  <TouchableOpacity {...props} >
    {props.children}
  </TouchableOpacity>
)
