import * as types from './types';

const defaultState = {showCityModal: false, fetchingWeather : false, weatherFetchingFailed: false}
export const uiState = (state = defaultState, {type, payload}) => {
  switch(type) {
    case types.TOGGLE_CONFIG_POPUP:
      const ShowPopUp = !state.ShowPopUp;
      return {...state, ShowPopUp};
    case types.TOGGLE_CITY_MODAL:
      const showCityModal = payload;
      return {...state, showCityModal};
    case types.UPDATE_CITY_WEATHER_FAILED :
      console.log('UPDATE_WEATHER_FAILED');
      return {...state, weatherFetchingFailed: true, refreshing: false}
    case types.UPDATE_CITY_WEATHER_COMPLETE :
      console.log('UPDATE_WEATHER_COMPLETED');
      return {...state, weatherFetchingFailed: false, refreshing: false}
    case types.UPDATE_CITY_WEATHER_REQUEST :
      console.log('UPDATE_WEATHER_REQUEST');
      return {...state, weatherFetchingFailed: false, refreshing: true}
    default:
      return state;
  }
}
