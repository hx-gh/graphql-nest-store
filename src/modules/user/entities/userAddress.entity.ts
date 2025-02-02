import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSchema } from './user.entity';
import { BrazilStates } from './brazil-states.enum';

@Entity('userAddress')
@ObjectType('UserAddress')
export class UserAddressSchema implements IUserAddress {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
  @Column()
  @Field()
  street: string;
  @Column()
  @Field()
  houseNumber: number;
  @Column()
  @Field()
  complement: string;
  @Column()
  @Field()
  postalCode: string;
  @Column()
  @Field()
  city: string;
  @Column()
  @Field()
  state: BrazilStates;
  @Column()
  @Field()
  receiverName: string;
  @ManyToOne(() => UserSchema, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  @Field(() => UserSchema)
  user: UserSchema;
}

export interface IUserAddress {
  street: string;
  houseNumber: number;
  complement: string;
  postalCode: string;
  city: string;
  state: BrazilStates;
  receiverName: string;
}
