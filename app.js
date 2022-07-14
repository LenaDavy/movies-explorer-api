const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const handleCors = require('./middlewares/handleCors');
const { requestLogger } = require('./middlewares/logger');
const routerCommon = require('./routes/index');
const { dataMovies, PORT } = require('./utils/constants');
const { errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');

const app = express();
app.use(handleCors);

mongoose.connect(dataMovies);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(routerCommon);

routerCommon.use(errorLogger);
routerCommon.use(errors());
routerCommon.use((err, req, res, next) => { handleError(err, res, next); });

app.listen(PORT);
