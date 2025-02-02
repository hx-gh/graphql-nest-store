import { Field, InputType } from '@nestjs/graphql';
import { BrazilStates } from '../entities/brazil-states.enum';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class UpdateUserAddressInput {
  @IsNumber()
  @IsPositive()
  @Field()
  id: number;
  @IsString()
  @Field({ nullable: true })
  street?: string;
  @IsNumber()
  @IsPositive()
  @Field({ nullable: true })
  houseNumber?: number;
  @IsString()
  @Field({ nullable: true })
  complement?: string;
  @IsString()
  @Field({ nullable: true })
  postalCode?: string;
  @IsString()
  @Field({ nullable: true })
  city?: string;
  @IsString()
  @Field(() => BrazilStates, { nullable: true })
  state?: BrazilStates;
  @IsString()
  @Field({ nullable: true })
  receiverName?: string;
}
