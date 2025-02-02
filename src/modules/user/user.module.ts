import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './entities/';
import { UserAddressSchema } from './entities/';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema, UserAddressSchema])],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
