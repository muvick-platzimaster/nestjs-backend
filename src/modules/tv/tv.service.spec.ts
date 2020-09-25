import { Test, TestingModule } from '@nestjs/testing';
import { TvService } from './tv.service';

describe('TvService', () => {
  let service: TvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvService],
    }).compile();

    service = module.get<TvService>(TvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
