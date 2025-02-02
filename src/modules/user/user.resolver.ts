import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserSchema } from './entities/';
import { UserAddressSchema } from './entities/';
import { CreateUserAddress } from './dto/';
import { CurrentUser } from '../auth/decorator/';
import { JwtUser } from '../auth/types/';
import { Role } from './entities/';
import { AuthRoles } from '../auth/decorator/';
import { UpdateUserAddressInput } from './dto/';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => UserSchema)
  async findByEmail(@Args('email') email: string): Promise<UserSchema> {
    return this.userService.findByEmail(email);
  }
  @AuthRoles(Role.USER, Role.ADMIN)
  @Query(() => UserSchema)
  async me(@CurrentUser() user: JwtUser): Promise<UserSchema> {
    return this.userService.getMe(user);
  }
  @AuthRoles(Role.USER, Role.ADMIN)
  @Mutation(() => UserAddressSchema)
  async createAddress(
    @CurrentUser() user: JwtUser,
    @Args('address') address: CreateUserAddress,
  ): Promise<UserAddressSchema> {
    return this.userService.createAddress(address, user.userId);
  }
  @AuthRoles(Role.USER, Role.ADMIN)
  @Mutation(() => UserAddressSchema)
  async updateUserAddress(
    @CurrentUser() user: JwtUser,
    @Args('address') address: UpdateUserAddressInput,
  ) {
    return this.userService.updateAddress(address, user);
  }
  @AuthRoles(Role.USER, Role.ADMIN)
  @Query(() => [UserAddressSchema])
  async listUserAddresses(@CurrentUser() user: JwtUser) {
    return this.userService.listUserAddresses(user);
  }
}
