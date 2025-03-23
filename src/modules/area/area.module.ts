import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Area,User])],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
