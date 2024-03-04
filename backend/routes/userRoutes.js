let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js

// http://localhost:8000/api/users/ GET route to return all users
router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})

// http://localhost:8000/api/users/:username GET route to return user by username param
router.get('/:username', (req, res) => {
    Controllers.userController.getUser(req, res)
})

// http://localhost:8000/api/users/create Sends data to the POST method to create a new user
router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res)
})

// http://localhost:8000/api/users/<id> PUT route to update a user
router.put('/:id', (req, res) => {
    Controllers.userController.updateUser(req, res)
})

// http://localhost:8000/api/users/<id> DELETE route to delete a user
router.delete('/:id', (req, res) => {
    Controllers.userController.deleteUser(req, res)
})


module.exports = router;