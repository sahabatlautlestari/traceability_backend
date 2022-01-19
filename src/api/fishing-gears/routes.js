const routes = (handler) => [
  {
    method: 'POST',
    path: '/fishing-gears',
    handler: handler.postFishingGearHandler,
  },
  {
    method: 'GET',
    path: '/fishing-gears/{id}',
    handler: handler.getFishingGearByIdHandler,
  },
  {
    method: 'GET',
    path: '/fishing-gears',
    handler: handler.getFishingGearsHandler,
  },
  {
    method: 'GET',
    path: '/fishing-gears/code/{fishingGearCode}',
    handler: handler.getFishingGearsByFishingGearCodeHandler,
  },
  {
    method: 'PUT',
    path: '/fishing-gears/{id}',
    handler: handler.putFishingGearByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/fishing-gears/{id}',
    handler: handler.deleteFishingGearByIdHandler,
  },
];

module.exports = routes;
