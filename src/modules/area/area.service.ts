import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAreaDTO } from './dto/request/create-area.dto';
import { UpdateAreaDTO } from './dto/request/update-area.dto';
import { Area } from './entities/area.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { Role } from '../user/enums/role';
import { PaginationFilterRequest } from '../utils/pagination';
import { FindAllAreaResponseDTO } from './dto/response/findall-area.response.dto';
import { AddResponsableAreaDTO } from './dto/request/add-responsable.request.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly modelRepository: Repository<Area>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly clsService: ClsService,
  ) {}
  async create(createAreaDTO: CreateAreaDTO) {
    try {
      const userId = this.clsService.get('user');
      if (userId.role !== Role.ADMIN) {
        throw new UnauthorizedException(
          'Access not authorizedn only admin can create area',
        );
      }
      return await this.modelRepository.save(createAreaDTO);
    } catch (error) {
      throw error;
    }
  }

  async findAll({
    page = 1,
    limit = 10,
    search = '',
  }: PaginationFilterRequest): Promise<FindAllAreaResponseDTO> {
    const user = this.clsService.get('user');
    const where: any = { active: true };
    if (user && user.role !== Role.ADMIN) {
      where.responsables = { id: user.userId };
    }

    const [data, totalItems] = await this.modelRepository.findAndCount({
      relations: ['responsables'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      where,
    });

    return {
      total_current: data.length,
      current_page: page,
      total_pages: Math.ceil(totalItems / limit),
      total_per_pages: limit,
      list: data,
      totalItems,
    };
  }

  async findOne(id: string) {
    return await this.modelRepository.findOne({ where: { id }, relations: ['responsables'] });
  }

  async update(id: string, updateAreaDTO: UpdateAreaDTO) {
    try {
      const userId = this.clsService.get('user');
      const area = await this.modelRepository.findOne({
        where: { id },
        relations: ['responsables'],
      });
      if (!area) throw new NotFoundException('Area not found');
      if (
        userId.role !== Role.ADMIN &&
        (userId.role !== Role.MANAGER ||
          !area.responsables.some(
            (responsable) => responsable.id === userId.userId,
          ))
      ) {
        throw new UnauthorizedException(
          'Access not authorizedn only admin or responsible can update area',
        );
      }
      return await this.modelRepository.save({ id, ...updateAreaDTO });
    } catch (error) {
      throw error;
    }
  }

  async addResponsableToArea(areaId: string, userId: string): Promise<Area> {
    try {
      const userToken = this.clsService.get('user');

      const area = await this.modelRepository.findOne({
        where: { id: areaId },
        relations: ['responsables'],
      });
      if (!area) {
        throw new NotFoundException(`Area with ID ${areaId} not found`);
      }

      const user = await this.userRepository.findOne({
        where: { id: userId, role: Role.MANAGER },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} Manager not found`);
      }

      if (
        userToken.role !== Role.ADMIN &&
        (userToken.role !== Role.MANAGER ||
          !area.responsables.some(
            (responsable) => responsable.id === userToken.userId,
          ))
      ) {
        throw new UnauthorizedException(
          'Access not authorizedn only admin or responsible can update area',
        );
      }

      // Verifica se o usuário já é responsável pela área
      if (
        !area.responsables.some((responsable) => responsable.id === user.id)
      ) {
        area.responsables.push(user);
        return this.modelRepository.save(area);
      }

      return area; // Retorna a área sem alterações se o usuário já for responsável
    } catch (error) {
      throw error;
    }
  }

  async removeResponsableFromArea(
    areaId: string,
    userId: string,
  ): Promise<Area> {
    try {
      const userToken = this.clsService.get('user');
      const area = await this.modelRepository.findOne({
        where: { id: areaId },
        relations: ['responsables'],
      });
      if (!area) {
        throw new NotFoundException(`Area with ID ${areaId} not found`);
      }

      if (userToken.role !== Role.ADMIN && userToken.userId !== userId) {
        throw new UnauthorizedException(
          'Access not authorized: only admin can remove other users',
        );
      }

      const user = await this.userRepository.findOne({
        where: { id: userId, role: Role.MANAGER },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} Manager not found`);
      }

      if (area.responsables.some((responsable) => responsable.id === user.id)) {
        area.responsables = area.responsables.filter(
          (responsable) => responsable.id !== user.id,
        );
        return this.modelRepository.save(area);
      }

      return area;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
