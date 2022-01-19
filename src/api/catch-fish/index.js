const CatchFishHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'catch-fish',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const catchFishHandler = new CatchFishHandler(service, validator);
    server.route(routes(catchFishHandler));
  },
};
