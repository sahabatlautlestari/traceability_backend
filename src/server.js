require('dotenv').config();
const fs = require('fs');

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

// MODUL INITIALIZATION
// Users
const users = require('./api/users');
const UsersService = require('./services/mysql/UsersService');
const UsersValidator = require('./validator/users');

// Buyers
const buyers = require('./api/buyers');
const BuyersService = require('./services/mysql/BuyersService');
const BuyersValidator = require('./validator/buyers');

// Companies
const companies = require('./api/companies');
const CompaniesService = require('./services/mysql/CompaniesService');
const CompaniesValidator = require('./validator/companies');

// Fishing Gears
const fishingGears = require('./api/fishing-gears');
const FishingGearsService = require('./services/mysql/FishingGearsService');
const FishingGearsValidator = require('./validator/fishing-gears');

// Ports
const ports = require('./api/ports');
const PortsService = require('./services/mysql/PortsService');
const PortsValidator = require('./validator/ports');

// Species
const species = require('./api/species');
const SpeciesService = require('./services/mysql/SpeciesService');
const SpeciesValidator = require('./validator/species');

// Suppliers
const suppliers = require('./api/suppliers');
const SuppliersService = require('./services/mysql/SuppliersService');
const SuppliersValidator = require('./validator/suppliers');

// Vessels
const vessels = require('./api/vessels');
const VesselsService = require('./services/mysql/VesselsService');
const VesselsValidator = require('./validator/vessels');

// Spottraces
const spottraces = require('./api/spottraces');
const SpottracesService = require('./services/mysql/SpottracesService');
const SpottracesValidator = require('./validator/spottraces');

// CatchFish
const catchfish = require('./api/catch-fish');
const CatchFishService = require('./services/mysql/CatchFishService');
const CatchFishValidator = require('./validator/catch-fish');

// Landings
const landings = require('./api/landings');
const LandingsService = require('./services/mysql/LandingsService');
const LandingsValidator = require('./validator/landings');

// Receivings
const receivings = require('./api/receivings');
const ReceivingsService = require('./services/mysql/ReceivingsService');
const ReceivingsValidator = require('./validator/receivings');

// Cuttings
const cuttings = require('./api/cuttings');
const CuttingsService = require('./services/mysql/CuttingsService');
const CuttingsValidator = require('./validator/cuttings');

// Packings
const packings = require('./api/packings');
const PackingsService = require('./services/mysql/PackingsService');
const PackingsValidator = require('./validator/packings');

// Shippings
const shippings = require('./api/shippings');
const ShippingsService = require('./services/mysql/ShippingsService');
const ShippingsValidator = require('./validator/shippings');

// Tracings
const traces = require('./api/traces');
const TracesService = require('./services/mysql/TracesService');

// Authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/mysql/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
  // Services initialization
  
  const usersService = new UsersService();
  const buyersService = new BuyersService();
  const companiesService = new CompaniesService();
  const fishingGearsService = new FishingGearsService();
  const portsService = new PortsService();
  const speciesService = new SpeciesService();
  const suppliersService = new SuppliersService();
  const vesselsService = new VesselsService();
  const spottracesService = new SpottracesService();
  const catchFishService = new CatchFishService();
  const cuttingsService = new CuttingsService();
  const landingsService = new LandingsService();
  const packingsService = new PackingsService();
  const receivingsService = new ReceivingsService();
  const shippingsService = new ShippingsService();
  const tracesService = new TracesService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    tls: {
      key: fs.readFileSync('server-key.pem'),
      cert: fs.readFileSync('server-cert.pem')
    },
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // External plugin registration
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  // Defining JWT authentication strategy
  server.auth.strategy('traceability', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      }
    })
  });
  
  // Internal plugin registration
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: buyers,
      options: {
        service: buyersService,
        validator: BuyersValidator,
      },
    },
    {
      plugin: companies,
      options: {
        service: companiesService,
        validator: CompaniesValidator,
      },
    },
    {
      plugin: fishingGears,
      options: {
        service: fishingGearsService,
        validator: FishingGearsValidator,
      },
    },
    {
      plugin: ports,
      options: {
        service: portsService,
        validator: PortsValidator,
      },
    },
    {
      plugin: species,
      options: {
        service: speciesService,
        validator: SpeciesValidator,
      },
    },
    {
      plugin: suppliers,
      options: {
        service: suppliersService,
        validator: SuppliersValidator,
      },
    },
    {
      plugin: vessels,
      options: {
        service: vesselsService,
        validator: VesselsValidator,
      },
    },
    {
      plugin: spottraces,
      options: {
        service: spottracesService,
        validator: SpottracesValidator,
      },
    },
    {
      plugin: catchfish,
      options: {
        service: catchFishService,
        validator: CatchFishValidator,
      },
    },
    {
      plugin: landings,
      options: {
        service: landingsService,
        validator: LandingsValidator,
      },
    },
    {
      plugin: receivings,
      options: {
        service: receivingsService,
        validator: ReceivingsValidator,
      },
    },
    {
      plugin: cuttings,
      options: {
        service: cuttingsService,
        validator: CuttingsValidator,
      },
    },
    {
      plugin: packings,
      options: {
        service: packingsService,
        validator: PackingsValidator,
      },
    },
    {
      plugin: shippings,
      options: {
        service: shippingsService,
        validator: ShippingsValidator,
      },
    },
    {
      plugin: traces,
      options: {
        service: tracesService,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`API Server is running on ${server.info.uri}`);
};

init();
