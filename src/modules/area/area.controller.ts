import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
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
    paginationFilterRequest: PaginationFilterRequest,
  ) {
    return this.areaService.findAll(paginationFilterRequest);
  }

  @Get('names')
  findAllAreaNames() {
    return this.areaService.findAllAreaNames();
  }

  @Get(':id/employers')
  findAllEmployersArea(@Param('id') areaId: string) {
    return this.areaService.findAllEmployersArea(areaId);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.areaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDTO: UpdateAreaDTO) {
    return this.areaService.update(id, updateAreaDTO);
  }

  @Patch(':id/add-responsable/:userId')
  addManager(@Param('id') id: string, @Param('userId') userId: string) {
    return this.areaService.addResponsableToArea(id, userId);
  }

  @Patch(':id/rem-responsable/:userId')
  removeManager(@Param('id') id: string, @Param('userId') userId: string) {
    return this.areaService.removeResponsableFromArea(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(+id);
  }
}
