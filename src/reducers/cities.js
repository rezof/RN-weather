import * as types from "./types.js";

export const cities = (state = [], {type, payload}) => {
  switch(type){
    case types.ADD_CITY:
      console.log('ADD CITY')
    case types.LOAD_CITIES:
      console.log("LOAD_CITIES");
    default:
      return state;
  }
}
