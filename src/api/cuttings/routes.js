const routes = (handler) => [
  {
    method: 'POST',
    path: '/cuttings',
    handler: handler.postCuttingHandler,
  },
  {
    method: 'GET',
    path: '/cuttings/{id}',
    handler: handler.getCuttingByIdHandler,
  },
  {
    method: 'GET',
    path: '/cuttings',
    handler: handler.getCuttingsHandler,
  },
  {
    method: 'GET',
    path: '/cuttings/fish/{fishId}',
    handler: handler.getCuttingsByFishIdHandler,
  },
  {
    method: 'PUT',
    path: '/cuttings/{id}',
    handler: handler.putCuttingByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/cuttings/{id}',
    handler: handler.deleteCuttingByIdHandler,
  },
];

module.exports = routes;
