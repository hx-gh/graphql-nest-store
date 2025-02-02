import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { OrderProductSchema } from '../../order/entities/order-products.entity';

@Entity('product')
@ObjectType('Product')
export class ProductSchema implements IProduct {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
  @Column()
  @Field()
  name: string;
  @Column()
  @Field()
  sku: string;
  @Column()
  @Field()
  value: number;
  @Column()
  @Field()
  quantity: number;
  @Column()
  @Field()
  status: ProductStatus;
  @OneToMany(
    () => OrderProductSchema,
    (orderProductSchema) => orderProductSchema.product,
  )
  public orderProduct: OrderProductSchema[];
  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
export interface IProduct {
  name: string;
  sku: string;
  value: number;
  quantity: number;
}
