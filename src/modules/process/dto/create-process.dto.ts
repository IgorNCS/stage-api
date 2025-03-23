import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ProcessStatus } from '../enums/processStatus';

export class CreateProcessDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  systems_tools?: string[];

  @IsOptional()
  @IsArray()
  associated_documentation?: string[];

  @IsEnum(ProcessStatus)
  status: ProcessStatus = ProcessStatus.DRAFT;
}

