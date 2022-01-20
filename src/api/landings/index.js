const LandingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'landings',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const landingsHandler = new LandingsHandler(service, validator);
    server.route(routes(landingsHandler));
  },
};
