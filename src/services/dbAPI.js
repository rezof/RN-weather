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
    AsyncStorage.setItem('weatherApp', JSON.stringify({...data}), function(msg, err){
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
          dispatch(Actions.loadData(data));
        }else {
          dispatch(Actions.ToggleCityModal());
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
      let {cities: {cities, currentCity: oldCurrentCity, SearchResults, searchTerm}, weather: oldWeather, uiState, config} = getState();
      let weather = {};
      let newCities = {};
      let currentCity = {};
      Object.keys(oldWeather.data).forEach((c) => {
         if(c != city.value)
            weather[c] = oldWeather.data[c];
      })

      Object.keys(cities).forEach((key) => {
        if(!(cities[key] && cities[key].value == city.value)){
            var value = cities[key].value;
            newCities[value] = cities[key];
        }
      })
      if(Object.keys(newCities).length > 0){
        if(oldCurrentCity.value == city.value){
          currentCity = newCities[Object.keys(newCities)[0]];
        }else if(oldCurrentCity.value != city.value){
          currentCity = oldCurrentCity;
        }
      }
      this.saveAllData({weather, cities: {cities: newCities, SearchResults, searchTerm, currentCity}, config});
      dispatch(Actions.loadData({weather, cities: {cities: newCities, currentCity, SearchResults, searchTerm}, uiState, config}));
      dispatch(Actions.ToggleCityManager());
    })
  }
}
