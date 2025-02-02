import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import {
  createOrder,
  createProduct,
  createUserAddress,
  createUserMutation,
  listUserAddresses,
  listUserOrders,
  me,
  signInUser,
  updateProduct,
} from './queries.utils';
import { ProductStatus } from '../src/modules/product/entities';
import { OrderStatus } from '../src/modules/order/entities';

describe('GraphQL Store API', () => {
  let app: INestApplication<App>;
  let token: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  });
  describe('signUp', () => {
    it('Should create a user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(createUserMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.signUp).toEqual({
            email: 'teste@teste.com.br',
            firstName: 'Gustavo',
            lastName: 'Oliveira',
          });
        });
    });
  });
  describe('signIn', () => {
    it('Should login the user and receive the JWT Token', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(signInUser),
        });
      token = loginResponse.body.data.signIn.accessToken;
      expect(token).toBeDefined();
    });
  });
  describe('me', () => {
    it('Should fetch user data', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(me),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.me).toEqual({
            email: 'teste@teste.com.br',
            firstName: 'Gustavo',
            lastName: 'Oliveira',
          });
        });
    });
  });
  describe('createUserAddress', () => {
    it('Should create user address', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(createUserAddress),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.me).toEqual({
            street: 'Rua Manuel Mendes Ribeiro',
            houseNumber: 116,
            receiverName: 'Gustavo Oliveira',
          });
        });
    });
  });
  describe('listUserAddresses', () => {
    it('Should list all user address', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(listUserAddresses),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.listUserAddresses[0]).toEqual({
            street: 'Rua Manuel Mendes Ribeiro',
            houseNumber: 116,
            receiverName: 'Gustavo Oliveira',
          });
        });
    });
  });
  describe('createProduct', () => {
    it('Should create a product', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(createProduct),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createProduct[0]).toEqual({
            name: 'IPhone 15 256GB',
            sku: 'apple-iphone-15-256',
            value: 5500,
            quantity: 10,
            status: ProductStatus.IN_STOCK,
          });
        });
    });
  });
  describe('listAllProducts', () => {
    it('Should list all created products', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(listUserAddresses),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.listAllProducts[0]).toEqual({
            name: 'IPhone 15 256GB',
            sku: 'apple-iphone-15-256',
            value: 5500,
            quantity: 10,
            status: ProductStatus.IN_STOCK,
          });
        });
    });
  });
  describe('updateProduct', () => {
    it('Should update product quantity', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(updateProduct),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.listAllProducts[0]).toEqual({
            id: 1,
            name: 'IPhone 15 256GB',
            quantity: 20,
          });
        });
    });
  });
  describe('createOrder', () => {
    it('Should create a new order', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(createOrder),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createOrder).toEqual({
            totalValue: 5500,
            status: OrderStatus.COMPLETED,
          });
        });
    });
  });
  describe('listUserOrders', () => {
    it('Should list all user orders', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: print(listUserOrders),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.listUserOrders[0]).toEqual({
            totalValue: 5500,
            status: OrderStatus.COMPLETED,
          });
        });
    });
  });
});
