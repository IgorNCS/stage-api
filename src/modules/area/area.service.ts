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

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly modelRepository: Repository<Area>,
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

  async findAll(): Promise<Area[]> {
    return await this.modelRepository.find({ relations: ['responsables'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
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

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
