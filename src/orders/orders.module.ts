import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroservice.host,
          port: envs.ordersMicroservice.port,
        },
      },
    ]),
  ],
})
export class OrdersModule {}