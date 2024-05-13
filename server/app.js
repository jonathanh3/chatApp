// app.js
const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path')
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const sessionMiddleware = require('./config/session');
const routes = require('./routes');
const { initializeSocket } = require('./utils/socket-io');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use('/', routes);
app.use(express.static(path.join(__dirname, '../', 'client')))
initializeSocket(http);

http.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
