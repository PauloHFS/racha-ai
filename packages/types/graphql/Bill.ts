import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus';
import { NexusGenObjects } from '@racha-ai/types/graphql/nexus-typegen';

export const Bill = objectType({
  name: 'Bill',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.int('recurrence');
    t.nonNull.int('value');
  },
});

let bills: NexusGenObjects['Bill'][] = [
  {
    id: 0,
    title: 'Conta #0',
    description: 'Agua',
    recurrence: 0,
    value: 1000,
  },
  {
    id: 1,
    title: 'Conta #1',
    description: 'Energia',
    recurrence: 0,
    value: 1000,
  },
];

export const BillQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.nonNull.field('bills', {
      type: 'Bill',
      resolve: (parent, args, context, info) => {
        return bills;
      },
    });
    t.nullable.field('bill', {
      type: 'Bill',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (parent, args, context) => {
        return bills.find(bill => bill.id === args.id) ?? null;
      },
    });
  },
});

export const BillMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.nonNull.field('createBill', {
      type: 'Bill',
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        recurrence: nonNull(intArg()),
        value: nonNull(intArg()),
      },
      resolve: (parent, args, context) => {
        const { title, description, recurrence, value } = args;

        const id = bills.length + 1;

        const new_bill = {
          id,
          title,
          description,
          recurrence,
          value,
        };

        bills.push(new_bill);

        return new_bill;
      },
    });
    // t.nonNull.field('updateBill', {
    //   type: 'Bill',
    //   args: {
    //     id: nonNull(stringArg()),
    //   },
    // });
  },
});
