import { Field, InputType } from '@nestjs/graphql';
import { BrazilStates } from '../entities/brazil-states.enum';

@InputType()
export class UpdateUserAddressInput {
  @Field()
  id: number;
  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  houseNumber?: number;

  @Field({ nullable: true })
  complement?: string;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field(() => BrazilStates, { nullable: true })
  state?: BrazilStates;

  @Field({ nullable: true })
  receiverName?: string;
}
