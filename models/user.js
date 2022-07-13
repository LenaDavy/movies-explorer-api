const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Пользователь',
  },
  email: {
    type: String,
    required: true,
    default: 'pochta@ya.ru',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('User', userSchema);
