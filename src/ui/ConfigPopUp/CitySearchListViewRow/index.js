import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const CitySearchListViewRow = (props = {data: 'no text provided'}) => (
  <TouchableOpacity onPress={() => props.citySelected(props.data)} style={{flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor: '#2C323D', height: 50, borderBottomWidth: 1/2, borderColor: 'black'}}>
    <Text style={{color: '#F3F3F3', backgroundColor: 'transparent'}}>{props.data}</Text>
  </TouchableOpacity>
)
