import { Field, InputType } from '@nestjs/graphql';
import { IProduct } from '../entities/product';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProduct implements IProduct {
  @IsString()
  @Field()
  name: string;
  @IsString()
  @Field()
  sku: string;
  @IsNumber()
  @Field()
  value: number;
  @IsNumber()
  @Field()
  quantity: number;
}
