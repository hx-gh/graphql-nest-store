import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../user/entities/role.enum';
@ObjectType()
export class AuthPayload {
  @Field()
  userId: number;
  @Field(() => Role)
  role: Role;
  @Field()
  accessToken: string;
}
