import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../api';
import { useUser } from './UserContext';

function CreateQuestionForm() {
  const { category } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState({
    title: '', content: '', category, user,
  });

  const handleQuestionSubmit = () => {
    api.createQuestion(category, newQuestion)
      .then(() => {
        // Handle question submission success
        navigate(`/threads/questions/${category}`);
      })
      .catch(() => {
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Create a New Question</h2>
      <input
        type="text"
        placeholder="Title"
        value={newQuestion.title}
        onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        className="form-input"
      />
      <textarea
        placeholder="Content"
        value={newQuestion.content}
        onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
        className="form-input"
      />
      <button type="submit" onClick={handleQuestionSubmit} className="form-button">Submit Question</button>
    </div>
  );
}

export default CreateQuestionForm;
