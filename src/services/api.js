import md5 from 'crypto-js/md5';
import {shuffleArray} from '../utils/shuffleArray';

const API_TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const handleGetAllPlayersOfLocalStorage = () => {
  const allPlayers = JSON.parse(localStorage.getItem('players'));
  return allPlayers || [];
};

export const handleAddPlayerInLocalStorage = (player) => {
  const allPlayers = handleGetAllPlayersOfLocalStorage();
  const newPlayerList = allPlayers ? [...allPlayers, player] : [player];
  localStorage.setItem('players', JSON.stringify(newPlayerList));
};

const requestApiToken = async () => {
  const response = await fetch(API_TOKEN_ENDPOINT);
  const data = await response.json();
  if (data.response_code === 0) {
    localStorage.setItem('token', data.token);
    return data.token;
  }
};

const getNewQuestion = async ({ difficulty, category, token }) => {
  try {
    let FETCH_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    if (Boolean(difficulty) && !category) {
      FETCH_URL += `&difficulty=${difficulty}`;
    } else if (!difficulty && Boolean(category)) {
      FETCH_URL += `${difficulty}&category=${category}`;
    } else if (Boolean(difficulty) && Boolean(category)) {
      FETCH_URL += `&category=${category}&difficulty=${difficulty}`;
    }
    const response = await fetch(FETCH_URL);
    const data = await response.json();
    if (data.response_code === 0) {
      return data.results.map((question) => {
        const refactQuestion = {
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          correct_answer: question.correct_answer,
          incorrect_answers: shuffleArray(question.incorrect_answers),
        };
        return refactQuestion;
      });
    }
    localStorage.removeItem('token');
    return false;
  } catch (error) {
    return false;
  }
};

export const userGravatarUrl = (email) => {
  return `https://www.gravatar.com/avatar/${md5(email)}`;
};

export { requestApiToken, getNewQuestion };
