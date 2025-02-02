import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
  IN_STOCK = 'AVAILABLE',
  OUT_OF_STOCK = 'UNAVAILABLE',
}

registerEnumType(ProductStatus, { name: 'ProductStatus' });
