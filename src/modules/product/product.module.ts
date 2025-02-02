import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './entities/';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repo';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema])],
  providers: [ProductResolver, ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
