import { Test, TestingModule } from '@nestjs/testing';
import { TvController } from './tv.controller';

describe('TvController', () => {
  let controller: TvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvController],
    }).compile();

    controller = module.get<TvController>(TvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
