import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAddressSchema } from './userAddress.entity';
import { Role } from './role.enum';

@Entity('user')
@ObjectType('User')
export class UserSchema {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
  @Column({ unique: true })
  @Field()
  email: string;
  @Column()
  @Field()
  hash: string;
  @Column()
  @Field()
  firstName: string;
  @Column()
  @Field()
  lastName: string;
  @Column()
  @Field()
  identityNumber: string;
  @Column()
  @Field()
  role: Role;

  @OneToMany(() => UserAddressSchema, (address) => address.user)
  addresses: UserAddressSchema[];
}
