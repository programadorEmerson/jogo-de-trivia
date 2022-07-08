import {
  SET_INITIAL_STATE_QUESTIONS,
  MARK_ANSWERED,
  SET_QUESTIONS,
  UPDATE_SEARCH_PARAMS,
  UPDATE_TIMMER,
} from "../actons";

const INITIAL_STATE = {
  questions: [],
  difficulty: '',
  category: '',
  timeLeft: 30,
  answered: false,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  case UPDATE_TIMMER:
    return {
      ...state,
      timeLeft: action.payload,
    };
  case MARK_ANSWERED:
    return {
      ...state,
      answered: action.payload,
    };
  case UPDATE_SEARCH_PARAMS:
    return {
      ...state,
      ...action.payload,
    };
  case SET_INITIAL_STATE_QUESTIONS:
    return {
      ...state,
      questions: [],
      timeLeft: 30,
      answered: false,
    };

  default:
    return state;
  }
}

export default questions;
