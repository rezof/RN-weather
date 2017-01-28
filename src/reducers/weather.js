import * as types from './types';

export const weather = (state = [], {type, payload}) => {
  switch (type){
    case types.USER_UPDATE_WEATHER_REQUEST :
      console.log('USER_UPDATE_WEATHER_REQUEST')
      return state;
    case types.FETCH_WEATHER :
      console.log('FETCH_WEATHER')
      return state;
    default:
      return state;
  }
}
