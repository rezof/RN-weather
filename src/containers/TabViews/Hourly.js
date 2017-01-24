import React, {Component} from 'react';
import {View, ListView} from 'react-native';
import {data} from './../../resources/data.js';
import {ListViewRow, TopSection} from './../../UI';

export class Hourly extends Component{
  constructor () {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { dataSource: ds.cloneWithRows(data.hourly.data), };
  }
  render () {
    return (
        <View style={{flex: 1, backgroundColor: '#0A091D'}}>
          <TopSection />
          <View style={{flex: 2}}>
            <ListView dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowIndex) => <ListViewRow type={"HourlyRow"} rowIndex={rowIndex} rowData={rowData} />} />
          </View>
        </View>
    )
  }

}
