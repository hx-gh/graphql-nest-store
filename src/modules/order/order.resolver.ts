import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderSchema } from './entities/';
import { OrderService } from './order.service';
import { AuthRoles } from '../auth/decorator/';
import { Role } from '../user/entities/';
import { CreateOrder } from './dto/';
import { CurrentUser } from '../auth/decorator/';
import { JwtUser } from '../auth/types/';

@Resolver(() => OrderSchema)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
  @AuthRoles(Role.USER, Role.ADMIN)
  @Query(() => [OrderSchema])
  async listUserOrders(@CurrentUser() user: JwtUser) {
    return this.orderService.listUserOrders(user);
  }
  @AuthRoles(Role.USER, Role.ADMIN)
  @Mutation(() => OrderSchema)
  async createOrder(
    @Args('order') order: CreateOrder,
    @CurrentUser() user: JwtUser,
  ) {
    return this.orderService.createOrder(order, user);
  }
}
