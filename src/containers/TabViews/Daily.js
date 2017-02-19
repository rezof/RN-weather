import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ListView,
  RefreshControl,
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
    let {refreshing} = this.props || false;
    const dataSource = ds.cloneWithRows(this.props.data)
    return (
      <View style={{flex: 1,backgroundColor: '#0A091D'}}>
        <TopSection />
        <View style={{flex: 2}}>
          <ListView
            refreshControl={
              <RefreshControl
                onRefresh={() => this.props.onRefresh()}
                tintColor="transparent"
                refreshing={!!refreshing}
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
