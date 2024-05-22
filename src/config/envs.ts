import 'dotenv/config';
import * as joi from 'joi';

interface envConfig {
  PORT: number;
  // PRODUCTS_MICROSERVICE_HOST: string;
  // PRODUCTS_MICROSERVICE_PORT: number;
  // ORDERS_MICROSERVICE_HOST: string;
  // ORDERS_MICROSERVICE_PORT: number;
  NATS_SERVICE: string[];
}

const envsSchema: joi.ObjectSchema = joi
  .object({
    PORT: joi.number().default(3000),
    // PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    // PRODUCTS_MICROSERVICE_PORT: joi.number().default(3001),
    // ORDERS_MICROSERVICE_HOST: joi.string().required(),
    // ORDERS_MICROSERVICE_PORT: joi.number().default(3002),
    NATS_SERVICE: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVICE: process.env.NATS_SERVICE?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envConfig: envConfig = value;

export const envs = {
  port: envConfig.PORT,
  // productsMicroservice: {
  //   host: envConfig.PRODUCTS_MICROSERVICE_HOST,
  //   port: envConfig.PRODUCTS_MICROSERVICE_PORT,
  // },
  // ordersMicroservice: {
  //   host: envConfig.ORDERS_MICROSERVICE_HOST,
  //   port: envConfig.ORDERS_MICROSERVICE_PORT,
  // },
  natsServer: envConfig.NATS_SERVICE,
};
