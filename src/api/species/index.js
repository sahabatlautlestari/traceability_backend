const SpeciesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'species',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const speciesHandler = new SpeciesHandler(service, validator);
    server.route(routes(speciesHandler));
  },
};
