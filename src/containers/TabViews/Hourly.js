import React, {Component} from 'react';
import {View, ListView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {WeatherListViewRow, TopSection} from './../../ui';

class _Hourly extends Component{
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
        <View style={{flex: 1, backgroundColor: '#0A091D'}}>
          <TopSection />
          <View style={{flex: 2}}>
            <ListView
              refreshControl={
                <RefreshControl
                  tintColor="transparent"
                  onRefresh={() => this.props.onRefresh()}
                  refreshing={!!refreshing}
                />
              }
              enableEmptySections
              dataSource={dataSource}
              renderRow={(rowData, sectionID, rowIndex) => <WeatherListViewRow type={"HourlyRow"} rowIndex={rowIndex} rowData={rowData} />} />
          </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.uiState
})

export const Hourly = connect(mapStateToProps)(_Hourly);
