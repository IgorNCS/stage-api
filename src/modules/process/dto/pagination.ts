import {
    IsOptional,
    IsNumber,
    Min,
    IsDateString,
    IsString,
    MaxLength,
    Max,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  export class PaginationFilterProcessRequest {
    @IsOptional()
    @IsDateString()
    initialDate?: string;
  
    @IsOptional()
    @IsDateString()
    finalDate?: string;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @Min(1)
    page?: number = 1;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 10;
  
    @IsOptional()
    @IsString()
    @MaxLength(255)
    employee?: string[];

    @IsOptional()
    @IsString()
    @MaxLength(255)
    areaId?: string[];

    @IsOptional()
    @IsString()
    @MaxLength(255)
    systems_tools?: string[];
    
  }
  