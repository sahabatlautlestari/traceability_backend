const routes = (handler) => [
  {
    method: 'POST',
    path: '/companies',
    handler: handler.postCompanyHandler,
  },
  {
    method: 'GET',
    path: '/companies/{id}',
    handler: handler.getCompanyByIdHandler,
  },
  {
    method: 'GET',
    path: '/companies',
    handler: handler.getCompaniesHandler,
  },
  {
    method: 'GET',
    path: '/companies/code/{companyCode}',
    handler: handler.getCompanyByCompanyCodeHandler,
  },
  {
    method: 'PUT',
    path: '/companies/{id}',
    handler: handler.putCompanyByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/companies/{id}',
    handler: handler.deleteCompanyByIdHandler,
  },
];

module.exports = routes;
