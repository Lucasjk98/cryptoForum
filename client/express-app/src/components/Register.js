import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'



function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

const handleRegistration = () => {
    console.log('registering')
    axios.post('http://localhost:4000/register', user)
      .then((response) => {
        console.log(response.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <h1>Register</h1>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default Register;