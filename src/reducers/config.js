import * as types from "./types.js";

const defaultState = {
  selectedTemperature: {text: 'Celsius', value: ''},
  temperatures: [{text: 'Celsius', value: ''}, {text: 'Fahrenheit', value: ''}]
}
export const config = (state = defaultState, {type, payload}) => {
  switch(type){
    case types.LOAD_DATA :
      return {...defaultState, ...payload.config}
    case types.TEMPERATURE_SCALE_CHANGE:
      console.log('TEMPERATURE_SCALE_CHANGE', payload)
      let selectedTemperature = payload;
      return {...state, selectedTemperature};
    default:
      return state;
  }
}
