import { Chance } from 'chance';

import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from 'miragejs';

const chance = new Chance();

interface User {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },

        email() {
          return chance.email().toLowerCase();
        },

        createdAt() {
          return chance.date({ year: 2022, month: 6 });
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get('/users', function (this: any, schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams as {
          page: number;
          per_page: number;
        };

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd,
        );

        return new Response(200, { 'x-total-count': String(total) }, users);
      });

      this.get('/users/:id');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
