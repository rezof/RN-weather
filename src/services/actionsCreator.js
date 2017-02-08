import {createAction} from 'redux-actions';
import * as types from './../reducers/types';

export const loadData = (data) => {
  return createAction(types.LOAD_DATA)(data);
}
export const ToggleConfigPopUp = (popupState) => {
  return createAction(types.TOGGLE_CONFIG_POPUP)(popupState);
}

export const ChangeTemperatureScale = (tempScale) => {
  return createAction(types.TEMPERATURE_SCALE_CHANGE)(tempScale);
}

export const ToggleCityModal = (showModal) => {
  return createAction(types.TOGGLE_CITY_MODAL)(showModal);
}

export const ChangeCurrentCity = (city) => {
  return createAction(types.CURRENT_CITY_CHANGE)(city);
}

export const CitySearchTermChange = (term) => {
  return createAction(types.CITY_SEARCH_CHANGE)(term);
}

export const CitySearchRequest = (term) => {
  return createAction(types.CITY_SEARCH_REQUEST)(term);
}

export const WeatherDataFiltered = (data) => {
  return createAction(types.FILTER_WEATHER_COMPLETE)(data);
}

export const weatherFetchingFailed = () => {
  return createAction(types.UPDATE_CITY_WEATHER_FAILED)();
}

export const weatherFetching = () => {
  return createAction(types.UPDATE_CITY_WEATHER_REQUEST)();
}

export const weatherFetchingComplete = (data) => {
  return createAction(types.UPDATE_CITY_WEATHER_COMPLETE)(data);
}

export const CitySearchRequestComplete = (result) => {
  return createAction(types.CITY_SEARCH_REQUEST_COMPLETE)(result);
}

export const AddCity = (city) => {
  return createAction(types.ADD_CITY)(city)
}

export const CitySearchReset = () => {
  return createAction(types.CITY_SEARCH_RESET)();
}

// export const DynamicAction = (type, payload) => {
//   return createAction(type)(payload);
// }

export const EmptyAction = () => {
  return createAction('')({});
}
