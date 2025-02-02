import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSchema } from './entities/order.entity';
import { ProductSchema } from '../product/entities/product';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repo';
import { ProductRepository } from '../product/product.repo';
import { UserSchema } from '../user/entities/';
import { UserRepository } from '../user/user.repo';
import { UserAddressSchema } from '../user/entities/';
import { OrderProductSchema } from './entities/';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderSchema,
      ProductSchema,
      OrderProductSchema,
      UserSchema,
      UserAddressSchema,
    ]),
  ],
  providers: [
    OrderResolver,
    OrderService,
    OrderRepository,
    ProductRepository,
    UserRepository,
  ],
})
export class OrderModule {}
