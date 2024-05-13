/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroservice.host,
          port: envs.productsMicroservice.port,
        },
      },
      
    ]),
  ],
})
export class ProductsModule {}
