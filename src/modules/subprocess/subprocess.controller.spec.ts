import { Test, TestingModule } from '@nestjs/testing';
import { SubprocessController } from './subprocess.controller';
import { SubprocessService } from './subprocess.service';

describe('SubprocessController', () => {
  let controller: SubprocessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubprocessController],
      providers: [SubprocessService],
    }).compile();

    controller = module.get<SubprocessController>(SubprocessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
