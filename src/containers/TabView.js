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

const {height, width} = Dimensions.get('window');

export class TabView extends Component {
  constructor() {
    super();
    this.state = {
      ShowPopUp: false
    }
  }
  render() {
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
    if(this.state.ShowPopUp){
      PopUp = <ConfigPopUp closePopUp={this.ToggleConfigPopUp} height={height/3} width={width} />
    }
    return (
      <View style={{
          flex: 1
        }}>
        <ScrollableTabView tabBarPosition="bottom"
          renderTabBar={  () => CustomTabBar_ }
          >
          <Hourly tabLabel="HOURLY"/>
          <Daily tabLabel="DAILY"></Daily>
          </ScrollableTabView>
          {PopUp}
        </View>

      );
    }
    ToggleConfigPopUp = () => {
      this.setState({ShowPopUp: !this.state.ShowPopUp})
    }
}

  const Styles = StyleSheet.create({
    container: {},
    TextDefault: {
      fontSize: 20,
      color: 'white',
      backgroundColor: 'transparent'
    },
    tabs: {}
  });
