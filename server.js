import express from 'express';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

import bodyParser from 'body-parser';
import { schema } from './server/schema';
import cors from 'cors';

const PORT = 4000;

const server = express();
server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));


server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
