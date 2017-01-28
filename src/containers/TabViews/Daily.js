import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  findNodeHandle
} from 'react-native';
import {TopSection, ListViewRow} from './../../ui';
import {data} from './../../resources/data.js';

export class Daily extends Component{
  constructor () {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { dataSource: ds.cloneWithRows(data.daily.data), };
  }

  render () {
    return (
      <View style={{flex: 1,backgroundColor: '#0A091D'}}>
        <TopSection />
        <View style={{flex: 2}}>
          <ListView dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowIndex) => <ListViewRow type={"DailyRow"} rowIndex={rowIndex} rowData={rowData} />} />
        </View>
      </View>
    );
  }
}
