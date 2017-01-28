import {combineReducers} from 'redux';

import {cities} from './cities';
import {weather} from './weather';
import {uiState} from './uiState';

export const reducers = combineReducers({
  uiState,
  cities,
  weather
})
