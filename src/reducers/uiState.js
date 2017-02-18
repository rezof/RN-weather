import * as types from './types';

const defaultState = {showCityModal: false, fetchingWeather : false, weatherFetchingFailed: false, managedCity: {}}
export const uiState = (state = defaultState, {type, payload}) => {
  switch(type) {
    case types.TOGGLE_CONFIG_POPUP:
      const ShowPopUp = !state.ShowPopUp;
      return {...state, ShowPopUp};
    case types.TOGGLE_CITY_MODAL:
      const showCityModal = payload;
      return {...state, showCityModal};
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
