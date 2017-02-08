import {createAction} from 'redux-actions';
import * as types from './../reducers/types';

export const ToggleConfigPopUp = (popupState) => {
  return createAction(types.TOGGLE_CONFIG_POPUP)(popupState);
}

export const ChangeTemperatureScale = (tempScale) => {
  return createAction(types.TEMPERATURE_SCALE_CHANGE)(tempScale);
}
