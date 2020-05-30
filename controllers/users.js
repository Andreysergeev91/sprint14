const mongoose = require('mongoose');
const User = require('../models/user');
const { checkLinkValidation } = require('./errorLinkValidation');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ data: err.message }));
};

module.exports.getUsersById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user == null) {
          res.status(404).send({ data: 'Пользователь с данным Id не найден' });
        } else {
          res.send({ data: user });
        }
      })
      .catch((err) => {
        res.status(500).send({ data: err.message });
      });
  } else {
    res.status(400).send({ data: 'Введен некорректный id' });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkLinkValidation(res, err));
};
