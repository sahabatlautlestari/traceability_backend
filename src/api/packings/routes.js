const routes = (handler) => [
  {
    method: 'POST',
    path: '/packings',
    handler: handler.postPackingHandler,
  },
  {
    method: 'GET',
    path: '/packings/{id}',
    handler: handler.getPackingByIdHandler,
  },
  {
    method: 'GET',
    path: '/packings',
    handler: handler.getPackingsHandler,
  },
  {
    method: 'GET',
    path: '/packings/case/{caseNo}',
    handler: handler.getPackingsByCaseNumberHandler,
  },
  {
    method: 'PUT',
    path: '/packings/{id}',
    handler: handler.putPackingByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/packings/{id}',
    handler: handler.deletePackingByIdHandler,
  },
];

module.exports = routes;
