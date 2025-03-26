import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';
import { Role } from '../user/enums/role';
import { ClsService } from 'nestjs-cls';
import { In, Repository } from 'typeorm';
import { AreaService } from '../area/area.service';
import { PaginationFilterProcessRequest } from './dto/pagination';
import { FindAllProcessResponseDTO } from './dto/response/findall-process.response.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private readonly modelRepository: Repository<Process>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly clsService: ClsService,
    private readonly areaService: AreaService,
  ) {}

  async create(areaId: string, createProcess: CreateProcessDto) {
    try {
      const userId = this.clsService.get('user');
      const area = await this.areaService.findOne(areaId);
      if (!area) throw new NotFoundException('Area not found');

      if (
        userId.role !== Role.ADMIN &&
        userId.role !== Role.MANAGER &&
        !area.responsables.some(
          (responsable) => responsable.id === userId.userId,
        )
      ) {
        throw new UnauthorizedException(
          'Access not authorizedn only MANAGER and ADMIN can create process',
        );
      }
      const process: any = {
        name: createProcess.name,
        description: createProcess.description,
        systems_tools: createProcess.systems_tools,
        area: { id: areaId },
        active: true,
      };

      if (createProcess.documentation)
        process.documentation = createProcess.documentation;

      if (createProcess.responsible_people && createProcess.responsible_people.length > 0)
        process.responsible_people = createProcess.responsible_people.map(
          (person) => ({
            id: person,
          }),
        );

      // return await this.modelRepository.save(process);
      const processSaved = await this.modelRepository.save(process);

      if (createProcess.process_parent) {
        const processParent = await this.modelRepository.findOne({
          where: { id: createProcess.process_parent },
          relations: ['subProcesses'],
        });
  
        if (!processParent) {
          throw new NotFoundException(`Process with ID ${createProcess.process_parent} not found`);
        }
  
        // Inicializa subProcesses se for null ou undefined
        if (!processParent.subProcesses) {
          processParent.subProcesses = [];
        }
        console.log(processParent)
        processParent.subProcesses.push(processSaved);
        console.log(processParent)
        await this.modelRepository.save(processParent); // Salva o processParent atualizado
        console.log(processParent)
        processSaved.parent_process = { id: createProcess.process_parent };
        await this.modelRepository.save(processSaved); // Salva o processSaved com o parent_process
      }

      return processSaved;
    } catch (error) {
      throw error;
    }
  }
  async findAll(
    query: PaginationFilterProcessRequest,
  ): Promise<FindAllProcessResponseDTO> {
    const {
      page = 1,
      limit = 10,
      initialDate,
      finalDate,
      areaId,
      systems_tools,
    } = query;
    const user = this.clsService.get('user');
    const where: any = { active: true };
    if (user && user.role == Role.EMPLOYEER) {
      // where.responsables = { id: user.userId };
      where.area = { id: In(user.area.map((area) => area.id)) };
    } else if (user && user.role == Role.MANAGER) {
      where.area = { id: In(user.area.map((area) => area.id)) };
    } else if (user && user.role == Role.ADMIN && areaId) {
      where.area = { id: In(areaId) };
    }

    if (initialDate && finalDate) {
      where.created_at = {
        between: [initialDate, finalDate],
      };
    }

    if (systems_tools) {
      where.systems_tools = {
        In: systems_tools,
      };
    }

    const [data, totalItems] = await this.modelRepository.findAndCount({
      relations: ['responsible_people', 'area'],
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
    return await this.modelRepository.findOne({
      where: { id },
      relations: [
        'responsible_people',
        'area',
        'documentations',
        'parent_process',
        'subProcesses',
      ],
    });
  }

  update(id: number, updateProcessDto: UpdateProcessDto) {
    return `This action updates a #${id} process`;
  }

  async addResponsableFromProcess(
    processId: string,
    userId: string,
  ): Promise<Process> {
    try {
      const userToken = this.clsService.get('user');

      const process = await this.modelRepository.findOne({
        where: { id: processId },
        relations: ['responsible_people', 'area'],
      });
      if (!process) {
        throw new NotFoundException(`Process with ID ${processId} not found`);
      }
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      const area = await this.areaService.findOne(process.area.id);
      if (
        userToken.role !== Role.ADMIN &&
        area &&
        !area.responsables.some(
          (responsable) => responsable.id === userToken.userId,
        )
      ) {
        throw new UnauthorizedException(
          'Access not authorized: only a manager responsible for this area can update it',
        );
      }

      process.responsible_people = [...process.responsible_people, user];
      return this.modelRepository.save(process);
    } catch (error) {
      throw error;
    }
  }

  async removeResponsableFromProcess(
    processId: string,
    userId: string,
  ): Promise<Process> {
    try {
      const userToken = this.clsService.get('user');

      const process = await this.modelRepository.findOne({
        where: { id: processId },
        relations: ['responsible_people', 'area'],
      });
      if (!process) {
        throw new NotFoundException(`Process with ID ${processId} not found`);
      }
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      const area = await this.areaService.findOne(process.area.id);
      if (
        userToken.role !== Role.ADMIN &&
        area &&
        !area.responsables.some(
          (responsable) => responsable.id === userToken.userId,
        )
      ) {
        throw new UnauthorizedException(
          'Access not authorized: only a manager responsible for this area can update it',
        );
      }

      process.responsible_people = process.responsible_people.filter(
        (responsable) => responsable.id !== user.id,
      );
      return this.modelRepository.save(process);
    } catch (error) {
      throw error;
    }
  }
  async setParentProcess(
    processId: string,
    parentId: string,
  ): Promise<Process> {
    try {
      const userToken = this.clsService.get('user');

      const process = await this.modelRepository.findOne({
        where: { id: processId },
        relations: ['parent_process', 'area', 'responsible_people'],
      });
      if (!process) {
        throw new NotFoundException(`Process with ID ${processId} not found`);
      }

      const parentProcess = await this.modelRepository.findOne({
        where: { id: parentId },
      });
      if (!parentProcess) {
        throw new NotFoundException(
          `Parent process with ID ${parentId} not found`,
        );
      }

      const area = await this.areaService.findOne(process.area.id);
      if (
        userToken.role !== Role.ADMIN &&
        area &&
        !area.responsables.some(
          (responsable) => responsable.id === userToken.userId,
        )
      ) {
        throw new UnauthorizedException(
          'Access not authorized: only a manager responsible for this area can update it',
        );
      }

      process.parent_process = parentProcess;

      return this.modelRepository.save(process);
    } catch (error) {
      throw error;
    }
  }

  async unsetParentProcess(processId: string): Promise<Process> {
    try {
      const userToken = this.clsService.get('user');

      const process = await this.modelRepository.findOne({
        where: { id: processId },
        relations: ['parent_process', 'area', 'responsible_people'],
      });
      if (!process) {
        throw new NotFoundException(`Process with ID ${processId} not found`);
      }

      if (userToken.role !== Role.ADMIN) {
        throw new UnauthorizedException(
          'Access not authorized: only admin can unset parent',
        );
      }
      process.parent_process = null;

      return this.modelRepository.save(process);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} process`;
  }
}
