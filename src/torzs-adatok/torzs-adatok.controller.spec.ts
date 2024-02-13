import { Test, TestingModule } from '@nestjs/testing';
import { TorzsAdatokController } from './torzs-adatok.controller';
import { TorzsAdatokService } from './torzs-adatok.service';

describe('TorzsAdatokController', () => {
  let controller: TorzsAdatokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TorzsAdatokController],
      providers: [TorzsAdatokService],
    }).compile();

    controller = module.get<TorzsAdatokController>(TorzsAdatokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
