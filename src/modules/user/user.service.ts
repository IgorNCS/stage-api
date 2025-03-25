import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/request/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from './enums/role';
import { ClsService } from 'nestjs-cls';
import { PaginationFilterUserRequest } from './dto/request/pagination';
import { FindAllUserResponseDTO } from './dto/response/findall-area.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private modelRepository: Repository<User>,
    private readonly clsService: ClsService,
  ) {}

  async create(createUserDTO: CreateUserRequestDTO): Promise<User | null> {
    try {
      const userId = this.clsService.get('user');
      const user = this.modelRepository.create(createUserDTO);
      user.password = await bcrypt.hash(user.password, 10);
      user.active = true;
      return await this.modelRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException('CPF ou email já cadastrado');
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao criar o usuario, tente novamente mais tarde',
      );
    }
  }

  async findAll({
    page = 1,
    limit = 10,
    name = '',
    role = '',
  }: PaginationFilterUserRequest): Promise<FindAllUserResponseDTO> {
    try {
      const user = this.clsService.get('user');
      const where: any = { active: true };
      if (user && user.role !== Role.ADMIN) {
        throw new UnauthorizedException('Access not authorized');
      }

      if (role) where.role = role;
      if (name) where.name = name;

      const [data, totalItems] = await this.modelRepository.findAndCount({
        order: { created_at: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
        where,
        relations: ['areas', 'employer_area', 'processes', 'documentations'],
      });
      return {
        total_current: data.length,
        current_page: page,
        total_pages: Math.ceil(totalItems / limit),
        total_per_pages: limit,
        list: data,
        totalItems,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.modelRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    try {
      const user = this.clsService.get('user');
      if (user && user.role !== Role.ADMIN && updateUserDTO.role) {
        delete updateUserDTO.role;
      }

      const updatedUser = await this.modelRepository.update(id, updateUserDTO);

      if (!updatedUser) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      return {
        message: `Usuário com ID ${id} atualizado com sucesso`,
        updatedUser: updatedUser,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Erro ao atualizar usuário:', error);
      throw new InternalServerErrorException(
        'Erro interno do servidor ao atualizar usuário',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
