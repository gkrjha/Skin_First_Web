import { Test, TestingModule } from '@nestjs/testing';
import { AmdinService } from './amdin.service';

describe('AmdinService', () => {
  let service: AmdinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmdinService],
    }).compile();

    service = module.get<AmdinService>(AmdinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
