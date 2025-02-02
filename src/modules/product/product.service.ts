import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduct } from './dto/';
import { ProductRepository } from './product.repo';
import { ForbiddenError } from '@nestjs/apollo';
import { UpdateProduct } from './dto/';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async listProductBySku(sku: string) {
    const product = await this.productRepository.findBySku(sku);
    if (!product) throw new ForbiddenError('Product already exists');
    return product;
  }
  async listAllProducts() {
    const products = await this.productRepository.findAll();
    if (products.length === -1) throw new Error("There's no product created");
    return products;
  }
  async createProduct(product: CreateProduct) {
    const hasProduct = await this.productRepository.findBySku(product.sku);
    if (hasProduct) throw new ForbiddenError('Product already exists');
    return await this.productRepository.createProduct(product);
  }
  async updateProduct(product: UpdateProduct) {
    const hasProduct = await this.productRepository.findById(product.id);
    if (!hasProduct) throw new NotFoundException('Product not found!');
    const updatedProduct = await this.productRepository.updateProduct(
      hasProduct,
      product,
    );
    return updatedProduct;
  }
}
