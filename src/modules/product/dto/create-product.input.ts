import { Field, InputType } from '@nestjs/graphql';
import { IProduct } from '../entities/product';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProduct implements IProduct {
  @IsString()
  @Field()
  name: string;
  @IsString()
  @Field()
  sku: string;
  @IsNumber()
  @IsPositive()
  @Field()
  value: number;
  @IsNumber()
  @IsPositive()
  @Field()
  quantity: number;
}
