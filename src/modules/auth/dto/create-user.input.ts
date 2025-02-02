import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  email: string;
  @IsString()
  @MinLength(8)
  @Field()
  password: string;
  @IsString()
  @Field()
  firstName: string;
  @IsString()
  @Field()
  lastName: string;
  @IsString()
  @Field()
  identityNumber: string;
}
