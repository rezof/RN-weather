import {AsyncStorage} from 'react-native';
import {Actions} from './';
import {types} from './../reducers';

export const dbAPI = {
  saveWeather(weather) {
    AsyncStorage.mergeItem('weatherApp', JSON.stringify({weather}), function(msg, err){
      console.log('saved weather', msg, err);
    })
  },
  saveAllData(data, callback){
    AsyncStorage.mergeItem('weatherApp', JSON.stringify({...data}), function(msg, err){
      if(err){
        console.log('failed to save', err);
      }else{
        console.log('saved', msg)
      }
    })
  },
  loadData() {
    // AsyncStorage.clear(() => {});
    return (dispatch => {
      AsyncStorage.getItem('weatherApp', function(err, result){
        if(result){
          const data = JSON.parse(result);
          console.log('loaded data', data);
          dispatch(Actions.loadData(data));
        }else {
          console.log('no data was loaded');
        }
      })
    })
  },
  clearData() {
    AsyncStorage.clear((msg, err) => {
      console.log('cleared data', msg);
    })
  },
  addCity(_city) {
    let city = {};
    city[_city.value] = _city;
    console.log('adding city', {...city});
    AsyncStorage.mergeItem('weatherApp', JSON.stringify({cities: {cities: {...city}, currentCity: _city}}), function(msg, err){
      if(err){
        console.log('failed to save', err);
      }else{
        console.log('saved', msg)
      }
    })
  },
  setCurrentCity(city) {
    AsyncStorage.mergeItem('weatherApp', JSON.stringify({cities: {currentCity: city}}), function(msg, err){
      if(err){
        console.log('failed to save', err);
      }else{
        console.log('saved', msg)
      }
    })
  },
  setCurrentTemperature(temp) {
    AsyncStorage.mergeItem('weatherApp', JSON.stringify({config: {selectedTemperature: temp}}), function(msg, err){
      if(err){
        console.log('failed to save', err);
      }else{
        console.log('saved', msg)
      }
    })
  },
  deleteCity(city) {
    return ((dispatch, getState) => {
      let {cities: oldCities, weather: oldWeather, uiState, config} = getState();
      let {cities, currentCity: oldCurrentCity, SearchResults, searchTerm} = oldCities;
      let weather = {};
      let newCities = {};
      let currentCity = {};
      Object.keys(oldWeather.data).forEach((c) => {
         if(c != city.value)
            weather[c] = oldWeather.data[c];
      })
      Object.keys(cities).forEach((key) => {
        if(!(cities[key] && cities[key].value == city.value)){
            newCities[Object.keys(newCities).length] = cities[key];
        }
      })
      if(Object.keys(newCities).length > 0){
        if(oldCurrentCity.value == city.value){
          currentCity = newCities[0]
        }else if(oldCurrentCity.value != city.value){
          currentCity = oldCurrentCity
        }
      }
      this.saveAllData({weather, cities: {cities: newCities, SearchResults, searchTerm, currentCity}});
      dispatch(Actions.loadData({cities: {cities: newCities, currentCity, SearchResults, searchTerm}, weather, uiState, config}));
      dispatch(Actions.ToggleCityManager());
    })
  }
}
