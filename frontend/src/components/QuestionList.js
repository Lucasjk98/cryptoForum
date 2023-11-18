import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../api'

function QuestionsList() {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    // Use the API function to fetch questions by category
    api.getQuestionsByCategory(category)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [category]);

  // Render the list of questions
 return (
  <div>
    <h2>{category} Questions</h2>
    <Link to={`/questions/${category}/new`}>Create New Question</Link>
    <ul>
      {questions.map((question) => (
        <li key={question._id}>
          <Link to={`/threads/questions/${category}/${question._id}`}>{question.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);
}

export default QuestionsList;

