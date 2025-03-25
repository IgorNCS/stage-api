import { IsString, IsOptional, IsDateString, IsArray, isNotEmpty, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDocumentationDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  documentText: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  url_image?: string;

  @IsOptional()
  @IsArray()
  tools?: string[];

  @IsOptional()
  @IsArray()
  areas?: string[];

  @IsOptional()
  @IsArray()
  processes?: string[];
}
