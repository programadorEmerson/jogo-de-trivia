import { SET_TOKEN } from '../actons';

const INITIAL_STATE = { token: '' };

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };

  default:
    return state;
  }
}

export default token;
