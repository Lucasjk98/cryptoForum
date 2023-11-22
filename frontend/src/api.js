import axios from 'axios';

export const API_BASE_URL = 'https://evening-wave-27395-295955682332.herokuapp.com/api';
// export const API_BASE_URL = 'http://localhost:4000/api';

export const getQuestionsByCategory = (category) => axios.get(`${API_BASE_URL}/questions/${category}`);

export const createQuestion = (category, question) => axios.post(`${API_BASE_URL}/questions/${category}`, question);

export const getQuestion = (category, questionId) => axios.get(`${API_BASE_URL}/questions/${category}/${questionId}`);

export const getAnswers = (questionId) => axios.get(`${API_BASE_URL}/questions/${questionId}/answers`);

export const createAnswer = (category, questionId, answer) => axios.post(`${API_BASE_URL}/questions/${category}/${questionId}`, answer);
