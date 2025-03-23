// add-responsable-area.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class AddResponsableAreaDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;
}