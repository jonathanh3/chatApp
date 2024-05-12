// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./config/session');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
