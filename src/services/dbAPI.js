import {AsyncStorage} from 'react-native';
import {Actions} from './';
import {types} from './../reducers';

export const dbAPI = {
  saveWeather(weather) {
    AsyncStorage.mergeItem('weatherApp', JSON.stringify({...weather}), function(msg, err){
      console.log('saved weather', weather);
    })
  },
  saveAllData(data){
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
  }
}
