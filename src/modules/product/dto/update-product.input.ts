import { Field, InputType } from '@nestjs/graphql';
import { IProduct } from '../entities/product';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class UpdateProduct implements IProduct {
  @Field()
  id: number;
  @IsString()
  @Field({ nullable: true })
  name: string;
  @IsString()
  @Field({ nullable: true })
  sku: string;
  @IsNumber()
  @IsPositive()
  @Field({ nullable: true })
  value: number;
  @IsNumber()
  @IsPositive()
  @Field({ nullable: true })
  quantity: number;
}
