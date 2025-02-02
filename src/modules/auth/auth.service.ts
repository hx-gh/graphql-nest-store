import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '../user/entities/';
import { hash, verify } from 'argon2';
import { Role } from '../user/entities/';
import { SignInInput } from './dto/';
import { AuthJwtPayload } from './types/';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/';
import { JwtUser } from './types/';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema) private userRepo: Repository<UserSchema>,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(input: CreateUserInput) {
    const hashedPassword = await hash(input.password);
    const newUser = this.userRepo.create({
      ...input,
      hash: hashedPassword,
      role: Role.USER,
    });
    const createdUser = await this.userRepo.save(newUser);
    if (createdUser.id === 1) {
      createdUser.role = Role.ADMIN;
      return await this.userRepo.save(createdUser);
    }
    return createdUser;
  }
  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new UnauthorizedException('User not found');
    const passMatched = await verify(user.hash, password);
    if (!passMatched) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
  async generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: { userId },
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
  async login(user: UserSchema): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(user.id);
    return { userId: user.id, role: user.role, accessToken };
  }
  async validateJwtUser(userId: number) {
    const user = await this.userRepo.findOneByOrFail({ id: userId });
    const jwtUser: JwtUser = { userId: user.id, role: user.role };
    return jwtUser;
  }
}
