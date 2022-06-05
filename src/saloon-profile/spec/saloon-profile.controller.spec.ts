import { Test, TestingModule } from '@nestjs/testing';
import { SaloonProfileController } from '../controllers/saloon-profile.controller';

describe('SaloonProfileController', () => {
  let controller: SaloonProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaloonProfileController],
    }).compile();

    controller = module.get<SaloonProfileController>(SaloonProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
