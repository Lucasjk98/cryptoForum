import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

function CategorySelection() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="form-container">
        <h1 className="form-heading">Choose a Category</h1>
        <div className="category-button">
          <Link to="/login" className="category-link">Login to access categories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1 className="form-heading">Choose a Category</h1>
      <div className="category-button">
        <Link to="/threads/questions/Bitcoin" className="category-link">Bitcoin</Link>
      </div>
      <div className="category-button">
        <Link to="/threads/questions/Ethereum" className="category-link">Ethereum</Link>
      </div>
    </div>
  );
}

export default CategorySelection;
