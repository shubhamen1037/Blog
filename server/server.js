
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const Authentication = require('smart-auth-middleware');
const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');

const SmartHttp = require('smart-http');

const { typeDefs, resolvers } = require('./graphql');

const routes = require('./routes');

const { PORT, IDENTITY_SERVICE_URL } = require('./config');

const { verifyToken } = require('./utils/helper');
// const { Login: LoginService } = require('./services');


const app = express();

const schema = buildFederatedSchema({
  typeDefs,
  resolvers,
});

/**
 * Start the app by listening <port>
 * */
const server = app.listen(PORT);

const ignorePath = ['/login', '/posts'];

/**
 * List of all middlewares used in project cors, compression, helmet
 * */
const getAuthenticatedUser = (req, res, next) => {

  const {originalUrl} = req;  
  const isIgnoredPath = ignorePath.some((element) => {

    const paths = element.split('/');
    const originalPaths = originalUrl.split('/');

    if(paths.length ===  originalPaths.length){
      const isMatch = originalPaths.every((element, index) => {

        const path = paths[index];

        if(path.charAt(0) === ':'){
          return true;
        }
        if(path === element ){
          return true;
        }

        return false;

      });

      return isMatch;
    }
  });

  if(isIgnoredPath){
    return next();
  }

  const {authorization} = req.headers
  const data = verifyToken(authorization);

  if(data){
    req.user = data;
    return next();
  }

  return res.unAuthorized();
};

try {
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.enable('trust proxy');
  app.use(SmartHttp());

  app.use(cors({
    exposedHeaders: [ 'token', 'slug', 'message', 'set-password', 'password', 'is-password-already-set', 'public-id', 'x-coreplatform-paging-limit',
      'x-coreplatform-total-records', 'x-coreplatform-concurrencystamp' ],
  }));
  app.use(compression());
  app.use(helmet());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());

  // app.use(Authentication({
  //   IDENTITY_SERVICE_URL,
  //   AUDIENCE: 'platform',
  //   ignorePaths: [ '/graphql', '/ping', '/healthcheck', '/user' , '/user/d2905c00-3e73-11ec-a242-553cc60ea257', '/user/showAll', '/user/showOne', '/user/remove/d2905c00-3e73-11ec-a242-553cc60ea257'],
  // }));

  app.use(getAuthenticatedUser)

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      user: req && req.user,
      headers: req.headers,
    }),
    plugins: [ ApolloServerPluginInlineTraceDisabled() ],
  });

  app.use('/', routes);

  apolloServer.applyMiddleware({ app });
} catch (e) {
  server.close();
}

module.exports = server;
