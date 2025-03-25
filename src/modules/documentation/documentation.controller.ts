import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { CreateDocumentationDto } from './dto/create-documentation.dto';
import { UpdateDocumentationDto } from './dto/update-documentation.dto';
import { PaginationFilterDocumentationRequest } from './dto/pagination';

@Controller('documentation')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Post()
  create(@Body() createDocumentationDto: CreateDocumentationDto) {
    return this.documentationService.create(createDocumentationDto);
  }

    @Get()
    findAll(
      @Query(new ValidationPipe({ transform: true }))
      paginationFilterRequest: PaginationFilterDocumentationRequest,
    ) {
      return this.documentationService.findAll(paginationFilterRequest);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentationDto: UpdateDocumentationDto) {
    return this.documentationService.update(+id, updateDocumentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentationService.remove(+id);
  }
}
