import * as types from './../reducers/types';

export const ToggleConfigPopUp = (payload) => {
  return {
    type: types.TOGGLE_CONFIG_POPUP,
    payload
  }
}
