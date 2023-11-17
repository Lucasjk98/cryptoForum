import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as api from '../api';
import { useUser } from './UserContext';

function Question() {
  const { user } = useUser();
  const { category, questionId } = useParams();
  const [question, setQuestion] = useState({ title: '', content: '', user, answers: [] });
  const [newAnswer, setNewAnswer] = useState({ content: '', user, category, questionId });

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const questionResponse = await api.getQuestion(category, questionId);
        setQuestion(questionResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestionAndAnswers();
  }, [category, questionId]);

  const handleCreateAnswer = () => {
    api.createAnswer(category, questionId, newAnswer)
      .then((response) => {
        // Assuming the API response includes the updated question data
        setQuestion(response.data);
        // Reset the form fields
        setNewAnswer({ content: '', category, questionId, user });
      })
      .catch((error) => {
        console.error('Answer creation failed:', error);
      });
  };

  return (
    <div>
      <h3>{question.title}</h3>
      <h5>posted by {question.user.user.name}</h5>
      <p>{question.content}</p>

      <ul>
        {question.answers && question.answers.map((answer) => (
          <li key={answer._id}>{answer.content} (Response by: {answer.user.user.name})</li>
        ))}
      </ul>

      <input
        type="text"
        value={newAnswer.content}
        onChange={(e) => setNewAnswer({ ...newAnswer, content: e.target.value })}
      />
      <button onClick={handleCreateAnswer}>Post Answer</button>
      <Link to={`/threads/questions/${category}`}>Back to Questions</Link>
    </div>
  );
}

export default Question;
