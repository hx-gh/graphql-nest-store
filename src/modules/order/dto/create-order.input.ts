import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { OrderProductInput } from './order-product.input';
@InputType()
export class CreateOrder {
  @Field(() => [OrderProductInput])
  @IsArray()
  @ValidateNested({ each: true }) // Valida cada item do array
  @Type(() => OrderProductInput) // Converte os objetos corretamente
  products: OrderProductInput[];
  @Field()
  @IsNumber()
  @IsPositive()
  addressId: number;
}
