import { Injectable } from '@nestjs/common';
import { CreateDocumentationDto } from './dto/create-documentation.dto';
import { UpdateDocumentationDto } from './dto/update-documentation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentation } from './entities/documentation.entity';
import { Repository } from 'typeorm';
import { Area } from '../area/entities/area.entity';
import { Process } from '../process/entities/process.entity';

@Injectable()
export class DocumentationService {
  constructor(
    @InjectRepository(Documentation)
    private readonly modelRepository: Repository<Documentation>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
  ) {}
  async create(createDocumentationDto: CreateDocumentationDto) {
    const documentation:any = {
      name: createDocumentationDto.name,
      documentText: createDocumentationDto.documentText,
      user: createDocumentationDto.userId,

    };


    if (createDocumentationDto.tools) documentation.tools = createDocumentationDto.tools;
  
    if(createDocumentationDto.areas) documentation.areas = createDocumentationDto.areas.map(area => ({id: area}));
    if(createDocumentationDto.processes) documentation.processes = createDocumentationDto.processes.map(process => ({id: process}));
    
    return await this.modelRepository.save(documentation);
  }
  

  async findAll(paginationFilterRequest) {
    return await this.modelRepository.find({
      relations: ['areas', 'processes', 'user'],
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} documentation`;
  }

  update(id: number, updateDocumentationDto: UpdateDocumentationDto) {
    return `This action updates a #${id} documentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentation`;
  }
}
