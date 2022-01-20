const PackingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'packings',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const packingsHandler = new PackingsHandler(service, validator);
    server.route(routes(packingsHandler));
  },
};
