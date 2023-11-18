import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Profile from './components/Profile'
import CategorySelection from './components/CategorySelection';
import QuestionList from './components/QuestionList';
import CreateQuestionForm from './components/CreateQuestionForm';
import Question from './components/Question';
import { UserProvider } from './components/UserContext';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navigation />
      <UserProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/threads" element={<CategorySelection />} />
        <Route path="/threads/questions/:category" element={<QuestionList />} />
        <Route path="/questions/:category/new" element={<CreateQuestionForm />} />
        <Route path="threads/questions/:category/:questionId" element={<Question />} />
      </Routes>
      </UserProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;