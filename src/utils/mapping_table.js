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

const mapSpottraceToModel = ({
  id, 
  id_spot, 
  unixtime, 
  esn, 
  latitude, 
  longitude, 
  datetime, 
  time, 
  battery_state, 
  message_type, 
  message_content, 
  lokasi, 
  local_date, 
  local_time,
}) => ({
  id,
  spotId: id_spot, 
  unixTime: unixtime, 
  esn, 
  latitude, 
  longitude, 
  datetime, 
  time, 
  batteryState: battery_state, 
  messageType: message_type, 
  messageContent: message_content, 
  location: lokasi, 
  localDate: local_date, 
  localTime: local_time,
});

module.exports = {
  mapBuyerToModel, 
  mapCompanyToModel, 
  mapFishingGearToModel, 
  mapPortToModel, 
  mapSpeciesToModel,
  mapSupplierToModel,
  mapVesselToModel,
  mapSpottraceToModel,
};
