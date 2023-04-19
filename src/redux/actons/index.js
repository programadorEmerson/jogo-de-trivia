import { getNewQuestion } from '../../services/api';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_NEW_PLAYER = 'SET_NEW_PLAYER';
export const SET_QUESTIONS = "SET_QUESTIONS";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const UPDATE_TIMMER = "UPDATE_TIMMER";
export const MARK_ANSWERED = "MARK_ANSWERED";
export const MIN_ASSERTIONS = "UPDATE_assertions";
export const UPDATE_SEARCH_PARAMS = "UPDATE_SEARCH_PARAMS";
export const GET_HELP = "GET_HELP";
export const SET_INITIAL_STATE_PLAYER = 'SET_INITIAL_STATE_PLAYER';
export const SET_INITIAL_STATE_QUESTIONS = 'SET_INITIAL_STATE_QUESTIONS';

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setPlayer = (payload) => ({
  type: SET_NEW_PLAYER,
  payload,
});

export const setInitialPlayer = () => ({
  type: SET_INITIAL_STATE_PLAYER,
  payload: {},
});

export const setAllQuestions = (payload) => ({
  type: SET_QUESTIONS,
  payload,
});

export const setNewScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const setUpdateTimmer = (payload) => ({
  type: UPDATE_TIMMER,
  payload,
});

export const setAnswered = (payload) => ({
  type: MARK_ANSWERED,
  payload,
});

export const setInitQuestions = () => ({
  type: SET_INITIAL_STATE_QUESTIONS,
  payload: {},
});

export const setAssertions = (payload) => ({
  type: MIN_ASSERTIONS,
  payload,
});

export const setSearchParams = (payload) => ({
  type: UPDATE_SEARCH_PARAMS,
  payload,
});

export const getHelp = (payload) => ({
  type: GET_HELP,
  payload,
});

export const getQuestion = (dataForRequest) => async () => getNewQuestion(dataForRequest);
