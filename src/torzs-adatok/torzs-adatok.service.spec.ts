import { Test, TestingModule } from '@nestjs/testing';
import { TorzsAdatokService } from './torzs-adatok.service';

describe('TorzsAdatokService', () => {
  let service: TorzsAdatokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TorzsAdatokService],
    }).compile();

    service = module.get<TorzsAdatokService>(TorzsAdatokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
