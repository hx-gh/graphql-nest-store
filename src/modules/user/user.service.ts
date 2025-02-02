import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { UserSchema } from './entities/';
import { CreateUserAddress } from './dto/';
import { UserAddressSchema } from './entities/';
import { JwtUser } from '../auth/types/';
import { UpdateUserAddressInput } from './dto/';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<UserSchema> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
  async getMe(user: JwtUser): Promise<UserSchema> {
    const me = await this.userRepository.findById(user.userId);
    return me!;
  }
  async createAddress(
    address: CreateUserAddress,
    userId,
  ): Promise<UserAddressSchema> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const newAddress = await this.userRepository.createAddress(address, user);
    return newAddress;
  }
  async updateAddress(address: UpdateUserAddressInput, jwtUser: JwtUser) {
    const user = await this.userRepository.findById(jwtUser.userId);
    const userAddress = await this.userRepository.findUserAddress(
      address.id,
      user!,
    );
    if (!userAddress) throw new NotFoundException('Address not found!');
    const updatedAddress = await this.userRepository.updateAddress(
      userAddress,
      address,
    );
    return updatedAddress;
  }
  async listUserAddresses(jwtUser: JwtUser) {
    const user = await this.userRepository.findById(jwtUser.userId);
    return this.userRepository.findUserAddresses(user!);
  }
}
