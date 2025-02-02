import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../user/entities/';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_TOKEN,
      signOptions: {
        expiresIn: '60m',
      },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
