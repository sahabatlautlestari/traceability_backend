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

const mapCompanyToModel = ({
  id,
  companyid,
  companyname,
  location,
}) => ({
  id,
  companyCode: companyid,
  companyName: companyname,
  location: {
    latitude: location.x,
    longitude: location.y
  }
});

const mapFishingGearToModel = ({
  id,
  idfishinggear,
  fishinggear,
}) => ({
  id,
  fishingGearCode: idfishinggear,
  fishingGearName: fishinggear,
});

const mapPortToModel = ({
  id,
  portid,
  portname,
  plocation,
}) => ({
  id,
  portCode: portid,
  portName: portname,
  location: {
    latitude: plocation.x,
    longitude: plocation.y
  }
});

const mapSpeciesToModel = ({
  id,
  idspecies,
  species,
}) => ({
  id,
  speciesCode: idspecies,
  speciesName: species,
});

const mapSupplierToModel = ({
  id,
  supplierid,
  suppliername,
}) => ({
  id,
  supplierCode: supplierid,
  supplierName: suppliername,
});

const mapVesselToModel = ({
  id,
  vesselid,
  vesselname,
  vesselsize,
  fisherman,
}) => ({
  id,
  vesselCode: vesselid,
  vesselName: vesselname,
  vesselSize: vesselsize,
  fisherman,
});

module.exports = {
  mapBuyerToModel, 
  mapCompanyToModel, 
  mapFishingGearToModel, 
  mapPortToModel, 
  mapSpeciesToModel,
  mapSupplierToModel,
  mapVesselToModel,
};
