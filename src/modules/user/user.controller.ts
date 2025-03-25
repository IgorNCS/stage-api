import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDTO } from './dto/request/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PaginationFilterUserRequest } from './dto/request/pagination';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDTO:CreateUserRequestDTO ) {
    return this.userService.create(createUserDTO);
  }

  @Get()
  findAll(@Query() paginationFilterUserRequest: PaginationFilterUserRequest) {
    return this.userService.findAll(paginationFilterUserRequest);
  }

  @Get('manager')
  findAllManager(@Query() paginationFilterUserRequest: PaginationFilterUserRequest) {
    return this.userService.findAll(paginationFilterUserRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
