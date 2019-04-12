"use strict";

import Hapi from 'hapi';
import mongoose from 'mongoose';
const apollo = require('apollo-server-hapi')
const { graphqlHapi, graphiqlHapi } = apollo


import createUserRoutes from './api/v1/user'
import createStatisticRoutes from './api/v1/statistic'

import schema from './graphql/schema'

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 4000
});

createUserRoutes(server);
createStatisticRoutes(server);

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: function(request, h) {
    return "<h1>Smart Shower</h1>";
  }
});

// Start the server
const start = async function() {
  try {
    //Connect to mongo instance
    mongoose.connect(
      "mongodb+srv://stevensg97:12345@clustersoa-1ti5v.mongodb.net/test?retryWrites=true",
      { useNewUrlParser: true }
    );

    mongoose.connection.once("open", () => {
      console.log("connected to database");
    });

    await server.register({
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
         },
        route: { cors: true }
      }
    })

    await server.register({
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: { schema },
        route: { cors: true }
      }
    })

    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

start();
