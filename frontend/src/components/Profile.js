import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';


const Profile = () => {
    const { user } = useUser();
    console.log(user)



  

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Hello, {user.user.name}!</p>
          <form action="/logout?_method=DELETE" method="DELETE">
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
