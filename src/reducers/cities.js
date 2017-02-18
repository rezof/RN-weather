import * as types from "./types.js";

const defaultState = {
  currentCity: {},
  cities: [],
  searchTerm: '',
  SearchResults: []
}
export const cities = (state = defaultState, {type, payload}) => {
  switch(type){
    case types.LOAD_DATA:
      let {cities, currentCity} = payload.cities;
      return {...state, cities: Object.values(cities), currentCity: currentCity};
    case types.ADD_CITY:
      return {...state, cities: [...state.cities, payload], currentCity: payload}
    case types.CURRENT_CITY_CHANGE:
      return {...state, currentCity: payload}
    case types.CITY_SEARCH_CHANGE:
      return {...state, searchTerm: payload}
    case types.CITY_SEARCH_REQUEST_COMPLETE:
      return {...state, SearchResults: payload}
    case types.CITY_SEARCH_RESET:
      return {...state, SearchResults: [], searchTerm: ''}
    default:
      return state;
  }
}
