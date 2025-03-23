import { PartialType } from '@nestjs/mapped-types';
import { CreateSubprocessDto } from './create-subprocess.dto';

export class UpdateSubprocessDto extends PartialType(CreateSubprocessDto) {}
