const ReceivingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'receivings',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const receivingsHandler = new ReceivingsHandler(service, validator);
    server.route(routes(receivingsHandler));
  },
};
