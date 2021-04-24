import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      //this.timing = 3000;
      this.resource("products");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          quantity: 1,
          image: faker.random.image(),
          price: parseFloat(faker.commerce.price()),
          brand: faker.lorem.word(),
          inStock: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5])
        });
      });
    }
  });
}
