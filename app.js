const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handleCors = require('./middlewares/handleCors');
const { requestLogger } = require('./middlewares/logger');
const routerCommon = require('./routes/index');

const app = express();
app.use(handleCors);
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(routerCommon);

app.listen(PORT);
