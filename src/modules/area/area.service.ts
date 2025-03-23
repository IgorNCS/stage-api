import { Injectable } from '@nestjs/common';
import { CreateAreaDTO } from './dto/request/create-area.dto';
import { UpdateAreaDTO } from './dto/request/update-area.dto';

@Injectable()
export class AreaService {
  create(createAreaDTO: CreateAreaDTO) {
    return 'This action adds a new area';
  }

  findAll() {
    return `This action returns all area`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDTO: UpdateAreaDTO) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
