import { Test, TestingModule } from '@nestjs/testing';
import { BicycleController } from './bicycle.controller';
import { BicycleService } from './bicycle.service';

describe('BicycleController', () => {
  let controller: BicycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleController],
      providers: [BicycleService],
    }).compile();

    controller = module.get<BicycleController>(BicycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
