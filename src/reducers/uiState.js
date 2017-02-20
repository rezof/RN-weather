import * as types from './types';

const defaultState = {cityManager: false, ShowPopUp: false, showCityModal: false, fetchingWeather : false, weatherFetchingFailed: false, managedCity: {}}
export const uiState = (state = defaultState, {type, payload}) => {
  switch(type) {
    case types.LOAD_DATA:{
      const {currentCity} = payload.cities;
      let showCityModal = false;
      let {cityManager} = state;
      if(!currentCity.value){
        showCityModal = true;
        cityManager = false;
      }
      return {...state, showCityModal, cityManager};
    }
    case types.TOGGLE_CONFIG_POPUP:
      const ShowPopUp = !state.ShowPopUp;
      return {...state, ShowPopUp};
    case types.TOGGLE_CITY_MODAL:{
      let showCityModal = !state.showCityModal;
      let {ShowPopUp,} = state;
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
    case types.TOGGLE_CITY_MANAGER :
      let managedCity = {};
      let cityManager = !state.cityManager;
      if(cityManager){
        managedCity = payload.managedCity;
      }
      return {...state, cityManager, managedCity}
    default:
      return state;
  }
}
