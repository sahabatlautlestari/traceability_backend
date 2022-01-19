const routes = (handler) => [
  {
    method: 'POST',
    path: '/species',
    handler: handler.postSpeciesHandler,
  },
  {
    method: 'GET',
    path: '/species/{id}',
    handler: handler.getSpeciesByIdHandler,
  },
  {
    method: 'GET',
    path: '/species',
    handler: handler.getSpeciesHandler,
  },
  {
    method: 'GET',
    path: '/species/code/{SpeciesCode}',
    handler: handler.getSpeciesBySpeciesCodeHandler,
  },
  {
    method: 'PUT',
    path: '/species/{id}',
    handler: handler.putSpeciesByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/species/{id}',
    handler: handler.deleteSpeciesByIdHandler,
  },
];

module.exports = routes;
