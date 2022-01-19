require('dotenv').config();

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
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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
