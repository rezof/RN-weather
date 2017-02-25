import * as types from './types';

const defaultState = {cityManager: false, ShowPopUp: false, showCityModal: false, fetchingWeather : false, weatherFetchingFailed: false, managedCity: {}}
export const uiState = (state = defaultState, {type, payload}) => {
  switch(type) {
    case types.LOAD_DATA: {
      const {currentCity} = payload.cities;
      let showCityModal = false;
      if(!currentCity.value){
        showCityModal = true;
      }
      return {...state, showCityModal};
    }
    case types.TOGGLE_CONFIG_POPUP:
      const ShowPopUp = !state.ShowPopUp;
      return {...state, ShowPopUp};
    case types.TOGGLE_CITY_MODAL: {
      let {ShowPopUp, showCityModal} = state;
      showCityModal = !showCityModal;
      if(showCityModal){
        ShowPopUp = true;
      }
      return {...state, ShowPopUp, showCityModal};
    }
    case types.UPDATE_CITY_WEATHER_FAILED :
      return {...state, weatherFetchingFailed: true, refreshing: false}
    case types.UPDATE_CITY_WEATHER_COMPLETE :
      return {...state, weatherFetchingFailed: false, refreshing: false}
    case types.UPDATE_CITY_WEATHER_REQUEST :
      return {...state, weatherFetchingFailed: false, refreshing: true}
    case types.TOGGLE_CITY_MANAGER: {
      let managedCity = {};
      let cityManager = !state.cityManager;
      let {ShowPopUp} = state;
      if(cityManager){
        managedCity = payload.managedCity || {};
      }else{
        ShowPopUp = true;
      }
      return {...state, cityManager, managedCity, ShowPopUp}
    }
    default:
      return state;
  }
}
