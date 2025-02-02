import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from './entities/';
import { UserAddressSchema } from './entities/';
import { UpdateUserAddressInput } from './dto/';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
    @InjectRepository(UserAddressSchema)
    private readonly addressRepository: Repository<UserAddressSchema>,
  ) {}
  async findByEmail(email: string): Promise<UserSchema | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findById(id: number): Promise<UserSchema | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createAddress(
    address: Partial<UserAddressSchema>,
    user: Partial<UserSchema>,
  ): Promise<UserAddressSchema> {
    const newAddress = this.addressRepository.create({
      ...address,
      user,
    });
    return this.addressRepository.save(newAddress);
  }
  async findUserAddress(addressId: number, user: UserSchema) {
    return this.addressRepository.findOne({
      where: { id: addressId, user },
    });
  }
  async updateAddress(
    userAddress: UserAddressSchema,
    input: UpdateUserAddressInput,
  ) {
    Object.assign(userAddress, input);
    return this.addressRepository.save(userAddress);
  }
  async findUserAddresses(user: UserSchema): Promise<UserAddressSchema[]> {
    return this.addressRepository.find({ where: { user } });
  }
}
