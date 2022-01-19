const SpottracesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'spottraces',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const spottracesHandler = new SpottracesHandler(service, validator);
    server.route(routes(spottracesHandler));
  },
};
