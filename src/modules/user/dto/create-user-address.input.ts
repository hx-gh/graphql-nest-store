import { InputType, Field } from '@nestjs/graphql';
import { IUserAddress } from '../entities/userAddress.entity';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { BrazilStates } from '../entities/brazil-states.enum';

@InputType()
export class CreateUserAddress implements IUserAddress {
  @IsString({ message: 'O valor esperado deve ser do tipo string' })
  @Field()
  street: string;
  @IsNumber()
  @IsPositive()
  @Field()
  houseNumber: number;
  @IsString()
  @Field()
  complement: string;
  @IsString()
  @Field()
  postalCode: string;
  @IsString()
  @Field()
  city: string;
  @IsString()
  @Field()
  state: BrazilStates;
  @IsString()
  @Field()
  receiverName: string;
}
