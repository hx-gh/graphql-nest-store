import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsPositive, IsString } from 'class-validator';

@InputType()
export class OrderProductInput {
  @Field()
  @IsString()
  sku: string;

  @Field()
  @IsInt()
  @IsPositive()
  quantity: number;
}
