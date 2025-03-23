import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/request/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private modelRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserRequestDTO): Promise<User> {
    try {
      const user = this.modelRepository.create(createUserDTO);
      user.password = await bcrypt.hash(user.password, 10);
      user.active = true;
      return await this.modelRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException('CPF ou email já cadastrado');
      }
console.log(error)
      throw new InternalServerErrorException(
        'Erro ao criar o usuario, tente novamente mais tarde',
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.modelRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error finding user');
    }
  }

  update(id: number, updateUserDTO: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
