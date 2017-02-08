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
    case types.UPDATE_WEATHER_FAILED :
      return {...state, weatherFetchingFailed: true, fetchingWeather: false}
    case types.UPDATE_WEATHER_COMPLETED :
      return {...state, weatherFetchingFailed: false, fetchingWeather: false}
    case types.UPDATE_WEATHER_REQUEST :
      return {...state, fetchingWeather: true}
    default:
      return state;
  }
}
