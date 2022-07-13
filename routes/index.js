const routerCommon = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const verifyToken = require('../middlewares/verifyToken');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { errorLogger } = require('../middlewares/logger');
const handleError = require('../middlewares/handleError');
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

routerCommon.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

routerCommon.use(errorLogger);
routerCommon.use(errors());
routerCommon.use((err, req, res, next) => { handleError(err, res, next); });

module.exports = routerCommon;
