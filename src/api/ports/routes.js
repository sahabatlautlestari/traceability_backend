const routes = (handler) => [
  {
    method: 'POST',
    path: '/ports',
    handler: handler.postPortHandler,
  },
  {
    method: 'GET',
    path: '/ports/{id}',
    handler: handler.getPortByIdHandler,
  },
  {
    method: 'GET',
    path: '/ports',
    handler: handler.getPortsHandler,
  },
  {
    method: 'GET',
    path: '/ports/code/{portCode}',
    handler: handler.getPortsByPortCodeHandler,
  },
  {
    method: 'PUT',
    path: '/ports/{id}',
    handler: handler.putPortByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/ports/{id}',
    handler: handler.deletePortByIdHandler,
  },
];

module.exports = routes;
