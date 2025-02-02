import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSchema } from './entities/';
import { Repository } from 'typeorm';
import { ProductStatus } from './entities/';
import { UpdateProduct } from './dto/';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductSchema)
    private readonly productRepository: Repository<ProductSchema>,
  ) {}
  async findBySku(sku: string): Promise<ProductSchema | null> {
    return this.productRepository.findOne({ where: { sku } });
  }
  async findById(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }
  async findAll() {
    return this.productRepository.find();
  }
  async createProduct(product: Partial<ProductSchema>): Promise<ProductSchema> {
    return this.productRepository.save({
      ...product,
      status:
        product.quantity! >= 0
          ? ProductStatus.IN_STOCK
          : ProductStatus.OUT_OF_STOCK,
    });
  }
  async updateProduct(product: ProductSchema, input: UpdateProduct) {
    Object.assign(product, input);
    return this.productRepository.save(product);
  }
}
