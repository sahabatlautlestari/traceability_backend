const routes = (handler) => [
  {
    method: 'GET',
    path: '/trace/{productCode}',
    handler: handler.getTracesByProductCode,
  },
];

module.exports = routes;
