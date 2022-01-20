const routes = (handler) => [
  {
    method: 'POST',
    path: '/landings',
    handler: handler.postLandingHandler,
  },
  {
    method: 'GET',
    path: '/landings/{id}',
    handler: handler.getLandingByIdHandler,
  },
  {
    method: 'GET',
    path: '/landings',
    handler: handler.getLandingsHandler,
  },
  {
    method: 'GET',
    path: '/landings/fish/{fishId}',
    handler: handler.getLandingByFishIdHandler,
  },
  {
    method: 'PUT',
    path: '/landings/{id}',
    handler: handler.putLandingByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/landings/{id}',
    handler: handler.deleteLandingByIdHandler,
  },
];

module.exports = routes;
