const mongoose = require('mongoose');
const Card = require('../models/card');
const { checkLinkValidation } = require('./errorLinkValidation');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ data: err.message }));
};

module.exports.deleteCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (card == null) {
          res.status(404).send({ data: 'Карточка с данным Id не найдена' });
        } else {
          res.send({ data: card });
        }
      })
      .catch((err) => res.status(500).send({ data: err.message }));
  } else {
    res.status(400).send({ data: 'Введен некорректный id карточки' });
  }
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => { checkLinkValidation(res, err); });
};
