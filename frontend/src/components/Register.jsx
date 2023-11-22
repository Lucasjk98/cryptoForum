import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {API_BASE_URL} from '../api'



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


  const handleRegistration = async() => {
    try{
      const response = await axios.post( API_BASE_URL + '/register', user)
      console.log(response.data);
      navigate('/login')
    } catch (error){
      console.log(error);
    }
  };


return (
    <div className="form-container">
      <h1 className="form-heading">Register</h1>
      <input className="form-input" type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button className="form-button" onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default Register;