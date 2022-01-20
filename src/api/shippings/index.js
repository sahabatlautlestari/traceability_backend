const ShippingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'shippings',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const shippingsHandler = new ShippingsHandler(service, validator);
    server.route(routes(shippingsHandler));
  },
};
