const BuyersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'buyers',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const buyersHandler = new BuyersHandler(service, validator);
    server.route(routes(buyersHandler));
  },
};
