import { Test, TestingModule } from '@nestjs/testing';
import { AmdinController } from './amdin.controller';

describe('AmdinController', () => {
  let controller: AmdinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmdinController],
    }).compile();

    controller = module.get<AmdinController>(AmdinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
