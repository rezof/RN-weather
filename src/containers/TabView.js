import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ListView,
  Dimensions,
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {CustomTabBar, ConfigPopUp} from './../ui';
import {Hourly, Daily} from './TabViews';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {ToggleConfigPopUp} from './../actions/actions';

const {height, width} = Dimensions.get('window');

export class _TabView extends Component {
  constructor() {
    super();
    this.state = {
      ShowPopUp: false
    }
  }
  render() {
    console.log('this', this);
    const CustomTabBar_ = (
      <CustomTabBar
        style={{ backgroundColor: '#131020', marginBottom: -1 }}
        ref="CustomTabBar"
        underlineStyle={{ backgroundColor: '#5BFFE3' }}
        inactiveTextColor={"#84809D"}
        activeTextColor={"#fff"}
        menuClickHandler= {this.ToggleConfigPopUp}
    />);
    let PopUp;
    if(this.props.ShowPopUp){
      PopUp = <ConfigPopUp closePopUp={this.ToggleConfigPopUp} height={height/3} width={width} />
    }
    return (
      <View style={Styles.container}>
        <ScrollableTabView tabBarPosition="bottom"
          renderTabBar={ () => CustomTabBar_ } >
          <Hourly tabLabel="HOURLY"/>
          <Daily tabLabel="DAILY" />
        </ScrollableTabView>
        {PopUp}
     </View>

      );
    }
    ToggleConfigPopUp = () => {
      const{ToggleConfigPopUp, ShowPopUp} = this.props;
      ToggleConfigPopUp(!ShowPopUp)
    }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  TextDefault: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
  tabs: {}
});

mapStateToProps = (state) => {
  return {
    ...state.uiState
  }
}

mapActionsToProps = (dispatch) => ({
  ToggleConfigPopUp: (payload) => {
    return dispatch({type: "TOGGLE_CONFIG_POPUP", payload});
  }
})

export const TabView = connect(mapStateToProps, mapActionsToProps)(_TabView);
