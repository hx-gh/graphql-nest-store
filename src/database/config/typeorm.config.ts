import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserSchema } from '../../modules/user/entities/user.entity';
import { UserAddressSchema } from '../../modules/user/entities/userAddress.entity';
import { ProductSchema } from '../../modules/product/entities/product';
import { OrderSchema } from '../../modules/order/entities/order.entity';
import { OrderProductSchema } from '../../modules/order/entities/order-products.entity';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: 3306,
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASS'),
  database: configService.get<string>('DATABASE_NAME'),
  synchronize: false,
  entities: [
    UserSchema,
    UserAddressSchema,
    ProductSchema,
    OrderSchema,
    OrderProductSchema,
  ],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
