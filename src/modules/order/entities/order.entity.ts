import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserSchema } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { OrderProductSchema } from './order-products.entity';
import { UserAddressSchema } from '../../user/entities/userAddress.entity';

@Entity('order')
@ObjectType('Order')
export class OrderSchema {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  totalValue: number;

  @Column()
  @Field()
  status: OrderStatus;

  @Field()
  @ManyToOne(() => UserSchema)
  @JoinTable()
  user: UserSchema;

  @OneToOne(() => UserAddressSchema)
  address: UserAddressSchema;

  @OneToMany(
    () => OrderProductSchema,
    (orderProductSchema) => orderProductSchema.order,
  )
  public orderProduct: OrderProductSchema[];
  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
