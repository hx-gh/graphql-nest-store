import { InjectRepository } from '@nestjs/typeorm';
import { OrderSchema } from './entities/order.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from './entities/';
import { ProductSchema } from '../product/entities/';
import { OrderProductSchema } from './entities/';
import { UserSchema } from '../user/entities/';
import { UserAddressSchema } from '../user/entities/';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderSchema)
    private readonly orderRepository: Repository<OrderSchema>,
    @InjectRepository(ProductSchema)
    private readonly productRepository: Repository<ProductSchema>,
    @InjectRepository(OrderProductSchema)
    private readonly orderProductRepository: Repository<OrderProductSchema>,
  ) {}
  getDataSource(): DataSource {
    return this.dataSource;
  }
  async findProductsBySku(skus: string[]): Promise<ProductSchema[]> {
    return this.productRepository.find({ where: { sku: In(skus) } });
  }
  async createOrder(
    user: UserSchema,
    totalValue: number,
    address: UserAddressSchema,
  ): Promise<OrderSchema> {
    return this.orderRepository.save({
      user,
      totalValue,
      address,
      status: OrderStatus.PROCESSING,
    });
  }
  async saveOrderProducts(
    orderId: number,
    products: ProductSchema[],
    quantities: number[],
  ): Promise<OrderProductSchema[]> {
    const orderProducts = products.map((product, index) => {
      const orderProduct = new OrderProductSchema();
      orderProduct.orderId = orderId;
      orderProduct.productId = product.id;
      orderProduct.productQuantity = quantities[index];
      return orderProduct;
    });

    return this.orderProductRepository.save(orderProducts);
  }
  async updateStock(
    products: { sku: string; quantity: number }[],
  ): Promise<void> {
    for (const product of products) {
      await this.productRepository
        .createQueryBuilder()
        .update(ProductSchema)
        .set({ quantity: () => 'quantity - :qty' })
        .where('sku = :sku', { sku: product.sku })
        .andWhere('quantity >= :qty', { qty: product.quantity })
        .execute();
    }
  }
  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
    totalValue?: number,
  ): Promise<void> {
    await this.orderRepository.update(orderId, { status, totalValue });
  }
  async findUserOrders(user: UserSchema) {
    return this.orderRepository.find({ where: { user } });
  }
}
