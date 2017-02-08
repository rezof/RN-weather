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
      let {selectedTemperature} = payload.config;
      return {...state, selectedTemperature};
    default:
      return state;
  }
}
