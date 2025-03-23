import { Test, TestingModule } from '@nestjs/testing';
import { SubprocessService } from './subprocess.service';

describe('SubprocessService', () => {
  let service: SubprocessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubprocessService],
    }).compile();

    service = module.get<SubprocessService>(SubprocessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
