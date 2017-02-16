import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';
import {WeatherListViewRow, TopSection} from './../../ui';

export class Daily extends Component{
  constructor () {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { ds };
  }

  render () {
    let {ds} = this.state;
    const dataSource = ds.cloneWithRows(this.props.data)
    return (
      <View style={{flex: 1,backgroundColor: '#0A091D'}}>
        <TopSection />
        <View style={{flex: 2}}>
          <ListView
            refreshControl={
              <RefreshControl
                tintColor="transparent"
                refreshing={this.props.refreshing}
              />
            }
            enableEmptySections
            dataSource={dataSource}
            renderRow={(rowData, sectionID, rowIndex) => <WeatherListViewRow type={"DailyRow"} rowIndex={rowIndex} rowData={rowData} />} />
        </View>
      </View>
    );
  }
}
