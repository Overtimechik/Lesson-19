import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager) {}
  
    async create(createUserDto: CreateUserDto) {
    const address = new Address(createUserDto.address);
    const user = new User({...createUserDto, address});
    await this.entityManager.save(user);
    return 'Добавлен новый пользователь';
  }

  async findAll() {
    return this.userRepository.find({
      relations:{
        address: true,
      }
    });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({
      where:{id},
        relations:{
          address:true
        }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
