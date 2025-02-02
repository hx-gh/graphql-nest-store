import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });
