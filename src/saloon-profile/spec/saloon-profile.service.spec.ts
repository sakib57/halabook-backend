import { Test, TestingModule } from '@nestjs/testing';
import { SaloonProfileService } from '../services/saloon-profile.service';

describe('SaloonProfileService', () => {
  let service: SaloonProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaloonProfileService],
    }).compile();

    service = module.get<SaloonProfileService>(SaloonProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
