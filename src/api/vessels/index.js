const VesselsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'vessels',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const vesselsHandler = new VesselsHandler(service, validator);
    server.route(routes(vesselsHandler));
  },
};
