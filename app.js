const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const {
  PORT = 3000
} = process.env;


const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));


app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден'
  });
});


app.listen(PORT);
