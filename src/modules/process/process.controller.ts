import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { PaginationFilterProcessRequest } from './dto/pagination';
import { AuthGuard } from '@nestjs/passport';

@Controller('process')
@UseGuards(AuthGuard('jwt'))
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post(':areaId')
  create(
    @Param('areaId') areaId: string,
    @Body() createProcessDto: CreateProcessDto,
  ) {
    return this.processService.create(areaId, createProcessDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    paginationFilterRequest: PaginationFilterProcessRequest,
  ) {
    return this.processService.findAll(paginationFilterRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processService.update(+id, updateProcessDto);
  }

  @Patch(':id/add-responsable/:userId')
  addResponsable(@Param('id') id: string, @Param('userId') userId: string) {
    return this.processService.addResponsableFromProcess(id, userId);
  }

  @Patch(':id/rem-responsable/:userId')
  remResponsable(@Param('id') id: string, @Param('userId') userId: string) {
    return this.processService.removeResponsableFromProcess(id, userId);
  }
  @Patch(':id/set-parent/:parentId')
  setParent(@Param('id') id: string, @Param('parentId') parentId: string) {
    return this.processService.setParentProcess(id, parentId);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processService.remove(+id);
  }
}
