import React from 'react';
import { Link, useParams } from 'react-router-dom';

function AnswerList() {
  const { category, threadId, questionId } = useParams();

  return (
    <div>
      <h1>{category} Thread {threadId} - Question {questionId} Answers</h1>
      <ul>
        {/* List of answers for the selected question */}
        <li>Answer 1</li>
        {/* Add more answers as needed */}
      </ul>
    </div>
  );
}

export default AnswerList;