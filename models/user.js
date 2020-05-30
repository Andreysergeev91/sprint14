const mongoose = require('mongoose');

const validate = require('mongoose-validator');

const avatarLinkValidator = [
  validate({
    validator: 'isURL',
    message: 'There should be a link in this field'
  })
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    validate: avatarLinkValidator
  }
});

module.exports = mongoose.model('user', userSchema);
