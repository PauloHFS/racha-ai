import { makeSchema } from 'nexus';
import { join } from 'path';
import { GraphqlTypes } from '@racha-ai/types';

export const schema = makeSchema({
  types: GraphqlTypes,
  outputs: {
    schema: join(`${process.cwd()}/../types/graphql`, 'schema.graphql'),
    typegen: join(`${process.cwd()}/../types/graphql`, 'nexus-typegen.ts'),
  },
});
