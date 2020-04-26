const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./src/shared/DB');
const userRoute = require('./src/shared/server/user.route');
const bookRoute = require('./src/shared/server/book.route');
const loginRoute = require('./src/shared/server/auth.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected'); },
  (err) => { console.log('Can not connect to the database', err); },
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/auth', loginRoute);

app.listen(PORT, () => console.log('Server is running on Port', PORT));
