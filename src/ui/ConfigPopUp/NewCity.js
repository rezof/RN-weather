import React, {Component} from 'react';
import {View, Text, TextInput, Modal, TouchableOpacity, ListView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from './../../services';
import {API} from './../../services';
import {CitySearchListViewRow} from './CitySearchListViewRow';

export class _NewCity extends Component {
  constructor(props) {
    super();
    this.state = {ds : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})}
  }
  render() {
    let {ds, showContent} = this.state;
    const SearchResults = ds.cloneWithRows(this.props.SearchResults);
    let content;
    if(showContent)
      content = (
        <View style={{flex:1, marginTop: 20}}>
          <View style={{minHeight:60, flex: 1, flexDirection: 'row', paddingBottom: 0, backgroundColor: 'black'}}>
            <View style={{flex: 5, paddingLeft: 10, justifyContent: 'center'}}>
              <TextInput underlineColorAndroid="transparent" style={{color: 'black', height: 40, backgroundColor: 'white', paddingLeft: 15, borderRadius: 20}} placeholder="city name" value={this.props.searchTerm} onChangeText={this.handleSearchTermChange} />
            </View>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.cancel()}>
              <Text style={{color: 'white'}}>close</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:9, opacity: 1}}>
            <ListView
              enableEmptySections
              dataSource={SearchResults}
              renderRow={(row) => <CitySearchListViewRow data={row} citySelected={this.props.CitySelected} />}
               />
          </View>
        </View>
      );
    return (
      <Modal
        onRequestClose={()=>{}}
        animationType="slide"
        visible={this.props.visible}
        onShow={() => {this.setState({showContent: true})}}
        >
        {content}
      </Modal>
    )
  }
  handleSearchTermChange = (val) => {
    this.props.searchTermChange(val);
  }
}

const mapStateToProps = (state) => ({
  ...state.cities
})

const mapActionsToProps = (dispatch) => ({
  searchTermChange (term) {
    dispatch(Actions.CitySearchTermChange(term));
    if(term.length >= 3)
      dispatch(API.searchCities(term));
  },
  CitySelected(city) {
    dispatch(API.addCity(city));
    dispatch(Actions.ToggleCityModal(false));
  }
})

export const NewCity = connect(mapStateToProps, mapActionsToProps)(_NewCity);
