const routes = (handler) => [
  {
    method: 'POST',
    path: '/vessels',
    handler: handler.postVesselHandler,
  },
  {
    method: 'GET',
    path: '/vessels/{id}',
    handler: handler.getVesselByIdHandler,
  },
  {
    method: 'GET',
    path: '/vessels',
    handler: handler.getVesselsHandler,
  },
  {
    method: 'GET',
    path: '/vessels/code/{vesselCode}',
    handler: handler.getVesselsByVesselCodeHandler,
  },
  {
    method: 'PUT',
    path: '/vessels/{id}',
    handler: handler.putVesselByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/vessels/{id}',
    handler: handler.deleteVesselByIdHandler,
  },
];

module.exports = routes;
