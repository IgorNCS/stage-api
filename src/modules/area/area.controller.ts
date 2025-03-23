import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDTO } from './dto/request/create-area.dto';
import { UpdateAreaDTO } from './dto/request/update-area.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationFilterRequest } from '../utils/pagination';
import { AddResponsableAreaDTO } from './dto/request/add-responsable.request.dto';

@Controller('area')
@UseGuards(AuthGuard('jwt'))
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() createAreaDTO: CreateAreaDTO) {
    return this.areaService.create(createAreaDTO);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    paginationFilterRequest: PaginationFilterRequest
  ) {
    return this.areaService.findAll(paginationFilterRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDTO: UpdateAreaDTO) {
    return this.areaService.update(id, updateAreaDTO);
  }

  @Post(':id/responsable')
  addManager(@Param('id') id: string, @Body() userId: AddResponsableAreaDTO) {
    return this.areaService.addResponsableToArea(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(+id);
  }
}

