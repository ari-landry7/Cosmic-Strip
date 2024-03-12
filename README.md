# Cosmic-Strip
Cosmic Strip is a space themed webcomic app that is available for all to use. Users must create an account to post comics or comment, but may view comics without an account.
Artists of all talents may post their comics, so you don't have to be a professional artist to share your work!
In the future, a search bar will be implemented that will only be available to logged-in users, but users without an account may still view the featured comics.

## Status
This app is currently under development. Expect new features and updates periodically

### Bugs
Currently, the edit button works to update posts by the current logged-in user, **BUT** in order to submit the changes to the database, you must click the "Submit changes" button *twice*, close the modal, and then navigate away from and then back to the home page before you see the updated post. I am working to fix this, so thank you for being patient! 

## Features
* See featured comics without logging in
* Make an account to comment and post your own comics
* Edit your account on the profile page
* Edit your posts on the homepage by clicking the edit button
* Delete your posts on the homepage by clicking the delete button

## API Calls
The URLs for Cosmic Strip's API calls are located in the routes folder, which is in the backend folder: 'Cosmic-Strip/backend/routes'. These routes can be tested in Postman or Thunder Client (links below in "Dependencies")

**Create (POST):** Used for creating a new resource in the database

**Read (GET):** Used for fetching/finding an existing resource in the database

**Update (PUT):** Used for updating an existing resource in the database

**Delete (DELETE):** Used for deleting an existing resource in the database

## Dependencies
Below are the dependencies needed to run this app

* Frontend:
  
   [React](https://react.dev/) and [Material UI](https://mui.com/material-ui/)

* Backend:

   [Express](https://expressjs.com/), [Node.js](https://nodejs.org/en), and [MongoDB](https://www.mongodb.com/)

* Testing:

   I used [Postman](https://www.postman.com/) for testing API calls, but [Thunder Client](https://www.thunderclient.com/) may also be used

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
5. Store your database connection string in the .env file. It may look something like this: DB_URI = mongodb://localhost:*yourlocalhost*/*yourdatabasename*
6. Store your port in the .env file. It may look something like this: PORT = 8000

   **Be sure to include your .env file in your .gitignore file to keep your database credentials secure**
7. Start the server:
   * Frontend:
     ```
     cd frontend
     npm run dev
     ```
   * Backend, in a different terminal:
  
   **Make sure your MongoDB server is running in the background!**
   
     ```
     cd backend
     npm run server
     ```
9. Open your web browser and navigate to http://localhost:5173
10. Explore the app!

## Future Plans
In the future, I plan to enhance the project by adding the following features:
* Adapt for mobile
* Add a light mode theme
* Add icons to the edit and delete buttons for style
* Add a comment function for users to comment on posts
* Add a search bar that is only available to logged-in users
* Add "My Posts" to the profile page
