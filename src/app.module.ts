import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { UserSchema } from './modules/user/entities/user.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserAddressSchema } from './modules/user/entities/userAddress.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { ProductSchema } from './modules/product/entities/product';
import { OrderSchema } from './modules/order/entities/order.entity';
import { OrderModule } from './modules/order/order.module';
import { OrderProductSchema } from './modules/order/entities/order-products.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.DATABASE_HOST}`,
      port: 3306,
      database: `${process.env.DATABASE_NAME}`,
      username: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASS}`,
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      entities: [
        UserSchema,
        UserAddressSchema,
        ProductSchema,
        OrderSchema,
        OrderProductSchema,
      ],
      migrations: ['src/migrations/*.ts'],
      migrationsTableName: 'migrations',
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
