import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {CustomTabBar, ConfigPopUp} from './../ui';
import {Hourly, Daily} from './TabViews';
import {connect} from 'react-redux';
import {ToggleConfigPopUp} from './../services/actionsCreator';
import {Utils, Actions, API, dbAPI} from './../services';

const {height, width} = Dimensions.get('window');

export class _TabView extends Component {
  constructor(props) {
    super();
    props.loadState();
    this.state = {
      ShowPopUp: false
    }
  }
  componentWillMount() {
    // setInterval(() => {
    //
    // }, 60000);
    setTimeout(() => {
      const {currentCity} = this.props.cities;
      const data = Utils.filterOutDatedData(this.props.weather.data);
      if(currentCity && !data[currentCity.value] || (data[currentCity.value].hourly.data.length <= 42) || (data[currentCity.value].daily.data.length < 7)){
        console.log('fetching', currentCity)
        this.props.fetchWeatherForCity(currentCity);
      }
    }, 3000);
  }

  render() {
    const CustomTabBar_ = (
      <CustomTabBar
        style={{ backgroundColor: '#131020', marginBottom: -1, height: 50 }}
        ref="CustomTabBar"
        underlineStyle={{ backgroundColor: '#5BFFE3' }}
        inactiveTextColor={"#84809D"}
        activeTextColor={"#fff"}
        menuClickHandler= {this.ToggleConfigPopUp}
    />);
    let PopUp;
    if(this.props.uistate.ShowPopUp){
      PopUp = <ConfigPopUp closePopUp={this.ToggleConfigPopUp} height={height/3} width={width} />
    }
    const {currentCity} = this.props.cities;
    let hourly = daily = [];
    if(currentCity && currentCity.value && this.props.weather.data[currentCity.value]){
      hourly = this.props.weather.data[currentCity.value].hourly.data;
      daily = this.props.weather.data[currentCity.value].daily.data;
    }
    return (
      <View style={Styles.container}>
        <ScrollableTabView tabBarPosition="bottom"
          renderTabBar={ () => CustomTabBar_ } >
          <Hourly onRefresh={() => {this.props.fetchWeatherForCity(currentCity)}} refreshing={this.props.uistate.refreshing} tabLabel="HOURLY" data={hourly}/>
          <Daily onRefresh={() => {this.props.fetchWeatherForCity(currentCity)}} refreshing={this.props.uistate.refreshing} tabLabel="DAILY" data={daily}/>
        </ScrollableTabView>
        {PopUp}
     </View>

      );
    }
    ToggleConfigPopUp = () => {
      const {ToggleConfigPopUp, uistate: {ShowPopUp}} = this.props;
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
    uistate: state.uiState,
    weather: state.weather,
    cities: state.cities,
    config: state.config
  }
}

mapActionsToProps = (dispatch) => ({
  loadState : () => {
    dispatch(dbAPI.loadData());
  },
  ToggleConfigPopUp: (payload) => {
    dispatch({type: "TOGGLE_CONFIG_POPUP", payload});
  },
  updateWeatherData : (data) => {
    dispatch(Actions.WeatherDataFiltered(data));
    dbAPI.saveWeather(data);
  },
  fetchWeatherForCity : (city) => {
    dispatch(API.fetchCityWeather(city));
  }
})

export const TabView = connect(mapStateToProps, mapActionsToProps)(_TabView);
