import * as types from './constants';

export const startSession = () => (dispatch) => {
  dispatch({ type: types.START_SESSION });
};
