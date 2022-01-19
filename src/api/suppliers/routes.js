const routes = (handler) => [
  {
    method: 'POST',
    path: '/suppliers',
    handler: handler.postSupplierHandler,
  },
  {
    method: 'GET',
    path: '/suppliers/{id}',
    handler: handler.getSupplierByIdHandler,
  },
  {
    method: 'GET',
    path: '/suppliers',
    handler: handler.getSuppliersHandler,
  },
  {
    method: 'GET',
    path: '/suppliers/code/{supplierCode}',
    handler: handler.getSuppliersBySupplierCodeHandler,
  },
  {
    method: 'PUT',
    path: '/suppliers/{id}',
    handler: handler.putSupplierByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/suppliers/{id}',
    handler: handler.deleteSupplierByIdHandler,
  },
];

module.exports = routes;
