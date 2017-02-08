import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {HourlyRow, DailyRow} from './';

export const WeatherListViewRow = (props) => {
  let Row = <View></View>;
  if(props.type == "DailyRow")
    Row = (<DailyRow data={props.rowData} index={props.rowIndex} />);
  else if(props.type == "HourlyRow")
    Row = (<HourlyRow data={props.rowData} index={props.rowIndex} />);
  else
    console.warn("Row Type Property Must Me Specified");

  return Row
}
