// src/modules/area/dto/request/create-area.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAreaDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}