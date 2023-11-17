import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../api'
import { useUser } from './UserContext';


function CreateQuestionForm() {
  const { category } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '', category, user });

  const handleQuestionSubmit = () => {
    console.log(newQuestion)
    api.createQuestion(category, newQuestion)
      .then((response) => {
        // Handle question submission success
        navigate(`/threads/questions/${category}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create a New Question</h2>
      <input
        type="text"
        placeholder="Title"
        value={newQuestion.title}
        onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newQuestion.content}
        onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
      />
      <button onClick={handleQuestionSubmit}>Submit Question</button>
    </div>
  );
}

export default CreateQuestionForm;