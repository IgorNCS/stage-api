// subprocess.dto.ts
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ProcessStatus } from '../../process/enums/processStatus';

export class CreateSubprocessDto {
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
  status: ProcessStatus;
}
