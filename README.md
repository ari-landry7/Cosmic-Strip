# Cosmic-Strip
Cosmic Strip is a space themed webcomic app that is available for all to use. Users must create an account to post comics or comment, but may view comics without an account.
Currently, the edit and delete buttons are visible on all posts for all users, but users are not permitted to edit or delete posts by other users. If attempted, an alert will show, and the action will be canceled.

## Features
* See featured comics without logging in
* Make an account to comment and post your own comics
* Edit your account on the profile page
* Edit your posts on the homepage by clicking the edit button

## Dependencies
Below are the dependencies needed to run this app

* Frontend
[React](https://react.dev/) and [Material UI](https://mui.com/material-ui/)

* Backend
[Express](https://expressjs.com/), [Node.js](https://nodejs.org/en), and [MongoDB](https://www.mongodb.com/)

* Testing
[Postman](https://www.postman.com/) for testing API calls. [Thunder Client](https://www.thunderclient.com/) may also be used

## Installation
After making sure you have the proper dependencies, follow these steps to get the app up and running:
1. Clone the repository: `git clone https://github.com/emma-landry7/Cosmic-Strip.git`
2. Navigate to the project directory: `cd Cosmic-Strip`
3. Install the npm packages:
   ```
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   ```
4. In the backend folder, create a .env file
5. Store your database connection string in the .env file. It may look something like this: DB_URI = mongodb://localhost:5173/yourdatabasename
6. Store your port in the .env file. It may look something like this: PORT = 8000
   **Be sure to include your .env file in your .gitignore file to keep your database credentials secure**
7. Start the server:
   * Frontend:
     ```
     cd frontend
     npm run dev
     ```
   * Backend, in a different terminal:
     ```
     cd backend
     npm run server
     ```
8. Open your web browser and navigate to http://localhost:5173
9. Explore the app!
