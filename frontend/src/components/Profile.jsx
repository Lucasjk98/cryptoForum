import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import {API_BASE_URL} from '../api'



const Profile = () => {
    const { user } = useUser();
    console.log(user)
    const actionVariable = API_BASE_URL + '/logout'



  

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Hello, {user.user.name}!</p>
          <form action= {actionVariable} method="DELETE">
            <button type="submit">Log Out</button>
          </form>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
