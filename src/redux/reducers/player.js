import {
  SET_INITIAL_STATE_PLAYER,
  SET_NEW_PLAYER,
  MIN_ASSERTIONS,
  UPDATE_SCORE,
} from "../actons";

const INITIAL_STATE = {
  email: '',
  playerName: '',
  score: 0,
  assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_NEW_PLAYER:
    return {
      ...state,
      ...action.payload,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case MIN_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  case SET_INITIAL_STATE_PLAYER:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
