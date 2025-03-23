import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDTO } from './dto/request/create-area.dto';
import { UpdateAreaDTO } from './dto/request/update-area.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('area')
@UseGuards(AuthGuard('jwt'))
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() createAreaDTO: CreateAreaDTO) {
    return this.areaService.create(createAreaDTO);
  }

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDTO: UpdateAreaDTO) {
    return this.areaService.update(id, updateAreaDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(+id);
  }
}

