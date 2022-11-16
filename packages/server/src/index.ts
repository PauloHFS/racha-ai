import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { schema } from './schema';

dotenv.config();

export const server = new ApolloServer({
  schema,
});

const port = process.env.PORT || 8080;

server.listen({ port }).then(serverInfo => {
  console.log(`\n\tServer ready at ${serverInfo.url}\n`);
});
