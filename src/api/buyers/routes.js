const routes = (handler) => [
  {
    method: 'POST',
    path: '/buyers',
    handler: handler.postBuyerHandler,
  },
  {
    method: 'GET',
    path: '/buyers/{id}',
    handler: handler.getBuyerByIdHandler,
  },
  {
    method: 'GET',
    path: '/buyers',
    handler: handler.getBuyersByBuyerCodeHandler,
  },
  {
    method: 'PUT',
    path: '/buyers/{id}',
    handler: handler.putBuyerByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/buyers/{id}',
    handler: handler.deleteBuyerByIdHandler,
  },
];

module.exports = routes;
