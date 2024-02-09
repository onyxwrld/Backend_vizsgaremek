import { Test, TestingModule } from '@nestjs/testing';
import { BeercycleController } from './beercycle.controller';
import { BeercycleService } from './beercycle.service';

describe('BeercycleController', () => {
  let controller: BeercycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeercycleController],
      providers: [BeercycleService],
    }).compile();

    controller = module.get<BeercycleController>(BeercycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
