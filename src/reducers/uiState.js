import * as types from './types';

export const uiState = (state = {}, {type, payload}) => {
  switch(type) {
    case types.TOGGLE_CONFIG_POPUP:
      const ShowPopUp = !state.ShowPopUp;
      return {...state, ShowPopUp};
    default:
      return state;
  }
}
