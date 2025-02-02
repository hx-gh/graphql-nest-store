import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_TOKEN || 'secret',
      ignoreExpiration: false,
    });
  }
  async validate(payload: AuthJwtPayload) {
    const { userId } = payload.sub;
    const jwtUser = await this.authService.validateJwtUser(userId);
    return jwtUser;
  }
}

//req.user
