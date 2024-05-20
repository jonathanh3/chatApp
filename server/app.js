// app.js
const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path')
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const sessionMiddleware = require('./config/session');
const routes = require('./routes');
const whoamiRoute = require('./routes/whoami.js');
const logoutRoute = require('./routes/logout.js');
const { initializeSocket } = require('./utils/socket-io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use('/', routes);
app.use('/whoami', whoamiRoute);
app.use('/logout', logoutRoute);
app.use(express.static(path.join(__dirname, '../', 'client')))

initializeSocket(http, sessionMiddleware);

http.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
