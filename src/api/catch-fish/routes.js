const routes = (handler) => [
  {
    method: 'POST',
    path: '/catch',
    handler: handler.postCatchFishHandler,
  },
  {
    method: 'GET',
    path: '/catch/{id}',
    handler: handler.getCatchFishByIdHandler,
  },
  {
    method: 'GET',
    path: '/catch',
    handler: handler.getCatchFishHandler,
  },
  {
    method: 'GET',
    path: '/catch/code/{fishCode}',
    handler: handler.getCatchFishByFishCodeHandler,
  },
  {
    method: 'PUT',
    path: '/catch/{id}',
    handler: handler.putCatchFishByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/catch/{id}',
    handler: handler.deleteCatchFishByIdHandler,
  },
];

module.exports = routes;
