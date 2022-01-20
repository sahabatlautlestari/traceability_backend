const routes = (handler) => [
  {
    method: 'POST',
    path: '/receivings',
    handler: handler.postReceivingHandler,
  },
  {
    method: 'GET',
    path: '/receivings/{id}',
    handler: handler.getReceivingByIdHandler,
  },
  {
    method: 'GET',
    path: '/receivings',
    handler: handler.getReceivingsHandler,
  },
  {
    method: 'GET',
    path: '/receivings/fish/{fishId}',
    handler: handler.getReceivingsByFishIdHandler,
  },
  {
    method: 'PUT',
    path: '/receivings/{id}',
    handler: handler.putReceivingByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/receivings/{id}',
    handler: handler.deleteReceivingByIdHandler,
  },
];

module.exports = routes;
