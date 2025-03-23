import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDTO } from './request/create-user.dto';

export class UpdateUserDTO extends PartialType(CreateUserRequestDTO) {}
