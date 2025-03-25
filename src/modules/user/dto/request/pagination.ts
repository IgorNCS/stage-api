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
  
  export class PaginationFilterUserRequest {
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
    name?: string;

    @IsOptional()
    @IsString()
    areaId?: string;

    @IsOptional()
    @IsString()
    role?: string;


    
  }
  