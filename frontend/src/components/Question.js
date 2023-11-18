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
    <div className="form-container">
      <h3 className="form-heading">{question.title}</h3>

      <div>
        <h5 className="form-subheading">posted by {question.user.user.name}</h5>
        <p className="form-text">{question.content}</p>
      </div>

      <ul className="no-bullets">
        {question.answers && question.answers.map((answer) => (
          <li key={answer._id} className="no-bullets">
            <div className="answer-box">
              {answer.content} (Response by: {answer.user.user.name})
            </div>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newAnswer.content}
        onChange={(e) => setNewAnswer({ ...newAnswer, content: e.target.value })}
        className="form-input"
      />
      <button onClick={handleCreateAnswer} className="form-button">Post Answer</button>
      <Link to={`/threads/questions/${category}`} className="form-link">Back to Questions</Link>
    </div>
  );
}


export default Question;
