const TracesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'traces',
  version: '1.0.0',
  register: async (server, { service }) => {
    const tracesHandler = new TracesHandler(service);
    server.route(routes(tracesHandler));
  },
};
