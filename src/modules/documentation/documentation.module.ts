import { Module } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { DocumentationController } from './documentation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentation } from './entities/documentation.entity';
import { Area } from '../area/entities/area.entity';
import { Process } from '../process/entities/process.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Documentation,Area,Process,User])],
  controllers: [DocumentationController],
  providers: [DocumentationService],
})
export class DocumentationModule {}
