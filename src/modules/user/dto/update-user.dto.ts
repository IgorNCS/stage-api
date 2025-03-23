import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './request/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserRequestDto) {}
