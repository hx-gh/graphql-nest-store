import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repo';
import { JwtUser } from '../auth/types/jwt-user';
import { CreateOrder } from './dto/';
import { UserRepository } from '../user/user.repo';
import { OrderSchema } from './entities/';
import { OrderStatus } from './entities/';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async createOrder(
    order: CreateOrder,
    jwtUser: JwtUser,
  ): Promise<OrderSchema> {
    const user = await this.userRepository.findById(jwtUser.userId);
    const skus = order.products.map((product) => product.sku);
    //Listar os produtos da ordem
    const products = await this.orderRepository.findProductsBySku(skus);
    if (products.length !== order.products.length) {
      throw new NotFoundException('One or more products not found');
    }
    //Calcular o valor total e verificar se os produtos estão em estoque
    let totalValue = 0;
    const productsToUpdateStock: any = [];
    for (let i = 0; i < order.products.length; i++) {
      const product = products.find((p) => p.sku === order.products[i].sku);
      if (!product) {
        throw new NotFoundException(
          `Product with SKU ${order.products[i].sku} not found`,
        );
      }

      if (product.quantity < order.products[i].quantity) {
        throw new BadRequestException(
          `Insufficient stock for SKU ${order.products[i].sku}`,
        );
      }

      totalValue += product.value * order.products[i].quantity;
      productsToUpdateStock.push({
        sku: product.sku,
        quantity: order.products[i].quantity,
      });
    }
    //Criar ordem com status de processando
    const address = await this.userRepository.findUserAddress(
      order.addressId,
      user!,
    );
    if (!address) throw new NotFoundException('Address not found');
    const newOrder = await this.orderRepository.createOrder(
      user!,
      totalValue,
      address,
    );
    return await this.orderRepository.getDataSource().transaction(async () => {
      try {
        // Inserir os produtos na tabela de relacionamento many-to-many
        await this.orderRepository.saveOrderProducts(
          newOrder.id,
          products,
          order.products.map((p) => p.quantity),
        );

        // Atualizar o estoque dos produtos
        await this.orderRepository.updateStock(productsToUpdateStock);

        // Atualizar o status do pedido para COMPLETED
        await this.orderRepository.updateOrderStatus(
          newOrder.id,
          OrderStatus.COMPLETED,
          totalValue,
        );

        // Retornar o pedido com o valor total
        return { ...newOrder, totalValue, status: OrderStatus.COMPLETED };
      } catch (error) {
        // Caso ocorra erro, mudar o status para FAILED
        await this.orderRepository.updateOrderStatus(
          newOrder.id,
          OrderStatus.FAILED,
        );
        throw error;
      }
    });
  }
  async listUserOrders(jwtUser: JwtUser) {
    const user = await this.userRepository.findById(jwtUser.userId);
    const orders = await this.orderRepository.findUserOrders(user!);
    return orders;
  }
}
