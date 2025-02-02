import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderSchema } from './order.entity';
import { ProductSchema } from '../../product/entities/product';

@Entity('orderProducts')
export class OrderProductSchema {
  @PrimaryGeneratedColumn('increment')
  public OrderProductId: number;
  @Column()
  public orderId: number;
  @Column()
  public productId: number;
  @Column()
  productQuantity: number;
  @ManyToOne(() => OrderSchema, (orderSchema) => orderSchema.orderProduct)
  public order: OrderSchema;
  @ManyToOne(() => ProductSchema, (productSchema) => productSchema.orderProduct)
  public product: ProductSchema;
}
