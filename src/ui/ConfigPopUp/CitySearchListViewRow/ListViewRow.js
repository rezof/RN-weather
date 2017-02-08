import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const CitySearchListViewRow = (props = {data: 'no text provided'}) => (
  <TouchableOpacity style={{backgroundColor: '#2C323D'}}>
    <Text style={{color: 'lightGrey', backgroundColor: 'transparent'}}>{props.data}</Text>
  </TouchableOpacity>
)
