const CuttingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'cuttings',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const cuttingsHandler = new CuttingsHandler(service, validator);
    server.route(routes(cuttingsHandler));
  },
};
