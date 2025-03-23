import { Module } from '@nestjs/common';
import { SubprocessService } from './subprocess.service';
import { SubprocessController } from './subprocess.controller';

@Module({
  controllers: [SubprocessController],
  providers: [SubprocessService],
})
export class SubprocessModule {}
