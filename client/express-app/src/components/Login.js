import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, useUser } from './UserContext';


function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  
  const { updateUser } = useUser(); // Use the custom hook to access the context
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


const handleLogin = async () => {
    try {
      console.log('attempting login');

      const response = await axios.post('https://evening-wave-27395-295955682332.herokuapp.com/login', user);
      console.log(response.data);

      // Assuming the response.data contains user information
      updateUser(response.data);

      // Navigate to the profile page
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <h1>Login</h1>
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
