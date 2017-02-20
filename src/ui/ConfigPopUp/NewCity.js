import React, {Component} from 'react';
import {View, Text, TextInput, Modal, TouchableOpacity, ListView, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from './../../services';
import {API} from './../../services';
import {CitySearchListViewRow} from './CitySearchListViewRow';

export class _NewCity extends Component {
  constructor(props) {
    super();
    this.state = {
      ds : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      inputOnFocus : false
    }
  }
  render() {
    let {ds, showContent} = this.state;
    const SearchResults = ds.cloneWithRows(this.props.SearchResults);
    let content, inputStyle;
    if(this.state.inputOnFocus){
      inputStyle = Styles.searchInputFocused;
    }
    if(showContent)
      content = (
        <View style={Styles.container}>
          <View style={Styles.searchBar}>
            <View style={Styles.searchContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                style={[Styles.searchInput, inputStyle]}
                placeholder="city name"
                placeholderTextColor="#B9BCC3"
                value={this.props.searchTerm}
                onFocus = {() => this.setState({inputOnFocus: true})}
                onBlur = { () => this.setState({inputOnFocus: false})}
                onChangeText={this.handleSearchTermChange} />
            </View>
            <TouchableOpacity style={Styles.closeButton} onPress={() => this.props.cancel()}>
              <Text style={Styles.closeButtonText}>close</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:9}}>
            <ListView
              enableEmptySections
              dataSource={SearchResults}
              renderRow={(row, section, rowIndex) => <CitySearchListViewRow index={rowIndex} style={Styles.cityRow} textStyle={Styles.cityRowText} data={row} citySelected={this.props.CitySelected} />}
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

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212B3C',
    ...Platform.select({
      ios: {
        marginTop: 20
      }
    })
  },
  searchBar: {
    minHeight:40,
    flex: 1,
    flexDirection: 'row'
  },
  searchContainer: {
    flex: 5,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  searchInput: {
    color: '#B9BCC3',
    height: 40,
    paddingLeft: 15,
    borderRadius: 8,
    backgroundColor: '#434B59',
    textAlign: 'left'
  },
  searchInputFocused: {
    opacity: 0.3,
  },
  closeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  cityRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    height: 50,
    borderBottomWidth: 1/2,
    borderColor: 'black'
  },
  cityRowText: {
    color: 'rgba(255, 255, 249, 0.7)',
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = (state) => ({
  ...state.cities
})

const mapActionsToProps = (dispatch) => ({
  searchTermChange (term) {
    dispatch(Actions.CitySearchTermChange(term));
    if(term.length >= 3){
      dispatch(API.searchCities(term));
    }else if(term.length == 0){
      dispatch(Actions.CitySearchReset())
    }
  },
  CitySelected(city) {
    dispatch(API.addCity(city));
    dispatch(Actions.ToggleCityModal(false));
  }
})

export const NewCity = connect(mapStateToProps, mapActionsToProps)(_NewCity);
