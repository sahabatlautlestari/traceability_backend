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

const mapCatchFishToModel = ({
  id, 
  idfish, 
  clocation, 
  cdatetime, 
  vesselid, 
  idfishinggear, 
  idspecies,
}) => ({
  id,
  fishId: idfish, 
  location: clocation, 
  datetime: cdatetime, 
  cesselCode: vesselid, 
  fishingGearCode: idfishinggear, 
  speciesCode: idspecies,
});

const mapCuttingToModel = ({
  id, idfish, idloin, weight, cutdate, grade, casenumber,
}) => ({
  id,
  fishId: idfish, 
  loinId: idloin, 
  weight,
  cutDate: cutdate, 
  grade,
  caseNumber: casenumber, 
});

const mapLandingToModel = ({
  id, idfish, portid, ldatetime, supplierid, weight, fishlength, 
}) => ({
  id,
  fishId: idfish, 
  portCode: portid, 
  datetime: ldatetime, 
  supplierCode: supplierid,
  weight,
  fishLength: fishlength, 
});

const mapPackingToModel = ({
  id, casenumber, grade, size, dateprod, weight, pcs, shipno,
}) => ({
  id, 
  caseNumber: casenumber, 
  grade, 
  size, 
  prodDate: dateprod, 
  weight, 
  pcs, 
  shipNo: shipno,
});

const mapReceivingToModel = ({
  id, companyid, idfish, grade, weight, supplierid, rcvdatetime,
}) => ({
  id, 
  companyCode: companyid, 
  fishId: idfish, 
  grade, 
  weight, 
  supplierCode: supplierid, 
  rcvDatetime: rcvdatetime, 
});

const mapShippingToModel = ({
  id, shipno, shipdate, idbuyer, voyageno, containerno,
}) => ({
  id, 
  shipNo: shipno, 
  shipDate: shipdate, 
  buyerCode: idbuyer, 
  voyageNo: voyageno, 
  containerNo: containerno,
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
  mapCatchFishToModel,
  mapCuttingToModel,
  mapLandingToModel,
  mapPackingToModel,
  mapReceivingToModel,
  mapShippingToModel,
};
