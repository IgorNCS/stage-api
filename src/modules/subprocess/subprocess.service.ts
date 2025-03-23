import { Injectable } from '@nestjs/common';
import { CreateSubprocessDto } from './dto/create-subprocess.dto';
import { UpdateSubprocessDto } from './dto/update-subprocess.dto';

@Injectable()
export class SubprocessService {
  create(createSubprocessDto: CreateSubprocessDto) {
    return 'This action adds a new subprocess';
  }

  findAll() {
    return `This action returns all subprocess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subprocess`;
  }

  update(id: number, updateSubprocessDto: UpdateSubprocessDto) {
    return `This action updates a #${id} subprocess`;
  }

  remove(id: number) {
    return `This action removes a #${id} subprocess`;
  }
}
