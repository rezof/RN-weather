import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

export const CitySearchListViewRow = (props = {data: 'no text provided'}) => {
  let {index, data, textStyle, style, citySelected} = props;

  return (
    <Animatable.View delay={index * 20} animation="fadeInUp">
      <TouchableOpacity onPress={() => citySelected(data)} style={style}>
        <Animatable.Text style={textStyle}>{data}</Animatable.Text>
      </TouchableOpacity>
    </Animatable.View>
  )
}
