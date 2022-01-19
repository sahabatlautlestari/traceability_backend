const PortsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'ports',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const portsHandler = new PortsHandler(service, validator);
    server.route(routes(portsHandler));
  },
};
