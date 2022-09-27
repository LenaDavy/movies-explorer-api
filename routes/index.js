const routerCommon = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const verifyToken = require('../middlewares/verifyToken');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const routerUsers = require('./users');
const routerMovies = require('./movies');

routerCommon.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

routerCommon.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routerCommon.use('/users', verifyToken, routerUsers);
routerCommon.use('/movies', verifyToken, routerMovies);

routerCommon.use('*', verifyToken, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = routerCommon;
