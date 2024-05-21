const bodyParserMiddleware = require('./bodyParser');
const errorHandlerMiddleware = require('./errorHandler');
const requireLogin = require('./requireLogin');

module.exports = (app) => {
  bodyParserMiddleware(app);
  // Add other middleware initializations here
  app.use(errorHandlerMiddleware);
  // Export individual middleware functions if needed elsewhere
  app.requireLogin = requireLogin;
};
