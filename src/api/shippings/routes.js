const routes = (handler) => [
  {
    method: 'POST',
    path: '/shippings',
    handler: handler.postShippingHandler,
  },
  {
    method: 'GET',
    path: '/shippings/{id}',
    handler: handler.getShippingByIdHandler,
  },
  {
    method: 'GET',
    path: '/shippings',
    handler: handler.getShippingsHandler,
  },
  {
    method: 'GET',
    path: '/shippings/no/{shipNo}',
    handler: handler.getShippingByShipNumberHandler,
  },
  {
    method: 'PUT',
    path: '/shippings/{id}',
    handler: handler.putShippingByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/shippings/{id}',
    handler: handler.deleteShippingByIdHandler,
  },
];

module.exports = routes;
