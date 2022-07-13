const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { storeMovie, getMovies, deleteMovieById } = require('../controllers/movies');

routerMovies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
    owner: Joi.string().hex().required(),
    movieId: Joi.string().hex().required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().required(),
  }),
}), storeMovie);

routerMovies.get('/', getMovies);
routerMovies.delete('/:movieId', deleteMovieById);

module.exports = routerMovies;
