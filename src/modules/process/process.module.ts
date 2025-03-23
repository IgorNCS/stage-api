import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { Process } from './entities/process.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaService } from '../area/area.service';
import { Area } from '../area/entities/area.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Process,Area,User])],
  controllers: [ProcessController],
  providers: [ProcessService,AreaService],
})
export class ProcessModule {}
