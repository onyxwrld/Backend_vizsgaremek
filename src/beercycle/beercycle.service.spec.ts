import { Test, TestingModule } from '@nestjs/testing';
import { BeercycleService } from './beercycle.service';

describe('BeercycleService', () => {
  let service: BeercycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeercycleService],
    }).compile();

    service = module.get<BeercycleService>(BeercycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
