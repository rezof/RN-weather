import * as types from './types';

export const weather = (state = {data: {}}, {type, payload}) => {
  switch (type){
    case types.LOAD_DATA :
      const data = payload.weather || {};
      return {data: {...state.data, ...data}};
    case types.FILTER_WEATHER_COMPLETE :
      return {data: {...payload}};
    case types.UPDATE_CITY_WEATHER_COMPLETE :
      return {data: {...state.data, ...payload}};
    default:
      return state;
  }
}
