import React, {Component} from 'react';
import {View, Text, styleSheet} from 'react-native';
import {TextItem} from './TextItem';
import {ObjectItem} from './ObjectItem';

export const DropDownItem = (props) => {
  const {data, pressHandler, selected} = props;
  let view = <View><Text style={{color: 'white', backgroundColor: 'transparent'}}>no type</Text></View>;
  if(typeof(data) == "object"){
    const isSelected = (data.value == selected.value && data.text == selected.text) ? true : false
    view = <ObjectItem isSelected={selected} data={data} pressHandler={pressHandler}/>
  }else if(["string", "number"].indexOf(typeof(data)) > -1){
    const isSelected = (selected.text == data) ? true : false;
    view = <TextItem isSelected={isSelected} data={data} pressHandler={pressHandler}/>
  }
  return view
}
