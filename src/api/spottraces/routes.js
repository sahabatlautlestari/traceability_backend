const routes = (handler) => [
  {
    method: 'POST',
    path: '/spottraces',
    handler: handler.postSpottraceHandler,
  },
  {
    method: 'GET',
    path: '/spottraces/{id}',
    handler: handler.getSpottraceByIdHandler,
  },
  {
    method: 'GET',
    path: '/spottraces',
    handler: handler.getSpottracesHandler,
  },
  {
    method: 'GET',
    path: '/spottraces/spotId/{spotId}',
    handler: handler.getSpottracesBySpottraceIdHandler,
  },
  {
    method: 'PUT',
    path: '/spottraces/{id}',
    handler: handler.putSpottraceByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/spottraces/{id}',
    handler: handler.deleteSpottraceByIdHandler,
  },
];

module.exports = routes;
