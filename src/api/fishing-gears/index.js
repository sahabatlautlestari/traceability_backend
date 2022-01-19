const FishingGearsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'fishing-gears',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const fishingGearsHandler = new FishingGearsHandler(service, validator);
    server.route(routes(fishingGearsHandler));
  },
};
