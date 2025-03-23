import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDTO } from './create-area.dto';

export class UpdateAreaDTO extends PartialType(CreateAreaDTO) {}
