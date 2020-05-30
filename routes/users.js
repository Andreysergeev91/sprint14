const usersRouter = require('express').Router();

const { getUsers, getUsersById, createUser } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', getUsersById);

usersRouter.post('/users', createUser);

module.exports = usersRouter;
