# Crypto Forum

###### Lucas Jimenez

## Technologies used
-HTML
-CSS
-JS
-REACT 
-EXPRESS
-MONGODB

## Project Overview
This is the 4th Full stack project of the University of Santa Barbara bootcamp where I am to build a system according to the principles of 3-tier architecture:

-A database schema and some example data. 
-An application layer written using node.js and express.js. 
-A single page application (client-side rich web application) that communicates with the application layer by sending and receiving JSON data. 

For this project I have created a quora/reddit style thread application that:
-Allows users to register and login to their account using passport.js
-Receives and stores in a mongoDB database user questions related to Bitcoin or Ethereum and answers to those questions 
-Allows users to publically post their questions and/answers to others questions while 
-Displays which user by name has posted each question or answer

## User Stories
- User Registration

As a user interested in cryptocurrency discussions, I want to be able to register for an account on the app. I should provide a valid email address and a secure password during the registration process. Upon successful registration, I expect to receive a verification email to confirm my account. This ensures a secure and verified entry into the cryptocurrency community.

- User Login

As a registered user of the app, I want to log in securely. Using my registered email and password, I should be able to access my account and actively contribute to discussions. The login process should include proper error handling for incorrect credentials. Additionally, I prefer the option to stay logged in for convenience, eliminating the need to log in repeatedly.

  
- Posting Questions and Answers

As a user passionate about Bitcoin and Ethereum, I want to post questions and answers publicly within dedicated threads for each cryptocurrency. I should be able to select the Bitcoin or Ethereum category when posting. Each question or answer should include a title, body, and relevant tags for easy categorization. Furthermore, I desire the ability to edit or delete my own posts, and the app should display threads with the most recent posts at the top for an engaging and current discussion experience.
  

## Ideas for Future Improvement
- Light & dark modes
- Ability to add thread categories for more topics
- Ability to edit or delete questions and answers
- More aesthetic design with CSS
