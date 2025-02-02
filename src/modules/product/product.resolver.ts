import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductSchema } from './entities/';
import { Role } from '../user/entities/';
import { ProductService } from './product.service';
import { CreateProduct } from './dto/';
import { AuthRoles } from '../auth/decorator/';
import { UpdateProduct } from './dto/';

@Resolver(() => ProductSchema)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @AuthRoles(Role.USER, Role.ADMIN)
  @Query(() => ProductSchema)
  async listProductBySku(@Args('sku') sku: string): Promise<ProductSchema> {
    return this.productService.listProductBySku(sku);
  }
  @AuthRoles(Role.USER, Role.ADMIN)
  @Query(() => [ProductSchema])
  async listAllProducts(): Promise<ProductSchema[]> {
    return this.productService.listAllProducts();
  }
  @AuthRoles(Role.ADMIN)
  @Mutation(() => ProductSchema)
  async createProduct(@Args('product') product: CreateProduct) {
    return this.productService.createProduct(product);
  }
  @AuthRoles(Role.ADMIN)
  @Mutation(() => ProductSchema)
  async updateProduct(@Args('product') product: UpdateProduct) {
    return this.productService.updateProduct(product);
  }
}
