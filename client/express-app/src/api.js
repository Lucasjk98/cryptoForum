import axios from 'axios';

const API_BASE_URL = 'https://evening-wave-27395-295955682332.herokuapp.com';

export const getQuestionsByCategory = (category) => {
  return axios.get(`${API_BASE_URL}/questions/${category}`);
};

export const createQuestion = (category, question) => {
  return axios.post(`${API_BASE_URL}/questions/${category}`, question);
};

export const getQuestion = (category,questionId) => {
  return axios.get(`${API_BASE_URL}/questions/${category}/${questionId}`);
};

export const getAnswers = (questionId) => {
  return axios.get(`${API_BASE_URL}/questions/${questionId}/answers`);
};

export const createAnswer = (category, questionId, answer) => {
  return axios.post(`${API_BASE_URL}/questions/${category}/${questionId}`, answer);
};


