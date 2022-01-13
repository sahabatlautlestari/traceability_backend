/* eslint-disable camelcase */
const mapBuyerToModel = ({
  id,
  idbuyer,
  buyername,
  location,
}) => ({
  id,
  buyerCode: idbuyer,
  buyerName: buyername,
  location: {
    latitude: location.x,
    longitude: location.y
  }
});

module.exports = {mapBuyerToModel};
