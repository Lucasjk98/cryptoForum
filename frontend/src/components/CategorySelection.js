import React from 'react';
import { Link } from 'react-router-dom';

function CategorySelection() {
  return (
    <div>
      <h1>Choose a Category</h1>
      <ul>
        <li><Link to="/threads/questions/Bitcoin">Bitcoin</Link></li>
        <li><Link to= "/threads/questions/Ethereum">Ethereum</Link></li>
      </ul>
    </div>
  );
}

export default CategorySelection;
