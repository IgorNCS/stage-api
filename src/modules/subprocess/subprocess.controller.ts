import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubprocessService } from './subprocess.service';
import { CreateSubprocessDto } from './dto/create-subprocess.dto';
import { UpdateSubprocessDto } from './dto/update-subprocess.dto';

@Controller('subprocess')
export class SubprocessController {
  constructor(private readonly subprocessService: SubprocessService) {}

  @Post()
  create(@Body() createSubprocessDto: CreateSubprocessDto) {
    return this.subprocessService.create(createSubprocessDto);
  }

  @Get()
  findAll() {
    return this.subprocessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subprocessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubprocessDto: UpdateSubprocessDto) {
    return this.subprocessService.update(+id, updateSubprocessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subprocessService.remove(+id);
  }
}
